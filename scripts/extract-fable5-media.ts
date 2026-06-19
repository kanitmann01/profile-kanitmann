// scripts/extract-fable5-media.ts
// Orchestrator script: extracts media for all Fable 5 sites from X posts

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import {
  fetchTweetMedia,
  pickMediaEntry,
  downloadMedia,
  buildXEmbedUrl,
  extractTweetIdFromUrl,
  type MediaEntry,
} from "./lib/extract-fable5-media";

// Import the actual fable5Sites array to avoid parsing issues with unquoted constants
type Fable5Site = {
  id: string;
  name: string;
  demoUrl: string;
  screenshotUrl: string;
  oneLiner: string;
  author: string;
  sourceUrl: string;
  tags: string[];
  featured: boolean;
  addedAt: string;
  playable: boolean;
};

type ManifestEntry = {
  id: string;
  sourceUrl: string;
  demoUrl: string;
  screenshotUrl: string;
  screenshotStatus: "downloaded" | "missing" | "failed";
  notes?: string;
};

const CONCURRENCY = 4;
const OUTPUT_DIR = "public/images/fable5";
const MANIFEST_FILE = "data/fable5-fixes.json";
const DIFF_FILE = "data/fable5-fixes.diff";

// Use dynamic import to get the actual fable5Sites array with resolved constants
// Construct a file:// URL for the data file
const dataPath = new URL("../data/fable5.ts", import.meta.url).href;

/**
 * Simple semaphore for limiting concurrent operations
 */
class Semaphore {
  private available: number;
  private waiting: Array<() => void> = [];

  constructor(available: number) {
    this.available = available;
  }

  async acquire(): Promise<void> {
    if (this.available > 0) {
      this.available--;
      return;
    }
    return new Promise((resolve) => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    const next = this.waiting.shift();
    if (next) {
      next();
    } else {
      this.available++;
    }
  }
}

/**
 * Extracts the Fable5Site array from the data file using a simple regex
 */
function parseSitesFromDataFile(content: string): Fable5Site[] {
  // Find the fable5Sites array in the file
  const arrayMatch = content.match(
    /export const fable5Sites[^=]*=\s*\[([\s\S]*?)\n\]/
  );
  if (!arrayMatch) {
    throw new Error("Could not find fable5Sites array in data file");
  }

  // Parse each site object - this is a simplified parser
  const arrayContent = arrayMatch[1];
  const sites: Fable5Site[] = [];

  // Match each object in the array
  const objectRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let match;
  while ((match = objectRegex.exec(arrayContent)) !== null) {
    const objContent = match[1];
    const site: any = {};

    // Extract string fields
    const fieldRegex = /(\w+):\s*"([^"]*)"/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(objContent)) !== null) {
      site[fieldMatch[1]] = fieldMatch[2];
    }

    // Extract boolean fields
    const boolRegex = /(\w+):\s*(true|false)/g;
    let boolMatch;
    while ((boolMatch = boolRegex.exec(objContent)) !== null) {
      site[boolMatch[1]] = boolMatch[2] === "true";
    }

    // Extract tags array
    const tagsMatch = objContent.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch) {
      site.tags = tagsMatch[1]
        .split(",")
        .map((t) => t.trim().replace(/['"]/g, ""))
        .filter(Boolean);
    }

    if (site.id && site.demoUrl) {
      sites.push(site as Fable5Site);
    }
  }

  return sites;
}

/**
 * Processes a single site: fetches media, downloads it, updates the manifest
 */
async function processSite(
  site: Fable5Site,
  semaphore: Semaphore
): Promise<ManifestEntry> {
  await semaphore.acquire();

  try {
    const statusId = extractTweetIdFromUrl(site.sourceUrl);
    if (!statusId) {
      return {
        id: site.id,
        sourceUrl: site.sourceUrl,
        demoUrl: site.demoUrl,
        screenshotUrl: site.screenshotUrl,
        screenshotStatus: "failed",
        notes: "Could not extract status ID from sourceUrl",
      };
    }

    // Fetch the tweet
    const tweet = await fetchTweetMedia(statusId);
    if (!tweet) {
      return {
        id: site.id,
        sourceUrl: site.sourceUrl,
        demoUrl: buildXEmbedUrl(statusId),
        screenshotUrl: site.screenshotUrl,
        screenshotStatus: "failed",
        notes: "Syndication fetch failed",
      };
    }

    // Pick the media
    const media = pickMediaEntry(tweet);
    if (!media) {
      return {
        id: site.id,
        sourceUrl: site.sourceUrl,
        demoUrl: buildXEmbedUrl(statusId),
        screenshotUrl: site.screenshotUrl,
        screenshotStatus: "missing",
        notes: "No media in tweet",
      };
    }

    // Get the media URL
    const mediaUrl = media.kind === "video" ? media.poster : media.url;

    // Download the media
    const extension = media.kind === "video" ? ".jpg" : ".jpg";
    const destPath = join(OUTPUT_DIR, `${site.id}${extension}`);

    const downloadResult = await downloadMedia(mediaUrl, destPath);

    if (!downloadResult.ok) {
      return {
        id: site.id,
        sourceUrl: site.sourceUrl,
        demoUrl: buildXEmbedUrl(statusId),
        screenshotUrl: site.screenshotUrl,
        screenshotStatus: "failed",
        notes: `Download failed: ${downloadResult.error}`,
      };
    }

    return {
      id: site.id,
      sourceUrl: site.sourceUrl,
      demoUrl: buildXEmbedUrl(statusId),
      screenshotUrl: `/${OUTPUT_DIR}/${site.id}${extension}`,
      screenshotStatus: "downloaded",
    };
  } finally {
    semaphore.release();
  }
}

/**
 * Generates a unified diff for the data/fable5.ts file
 */
function generateDiff(sites: Fable5Site[], manifest: ManifestEntry[]): string {
  // Find all sites that have a demoUrl (includes downloaded and missing, but not failed)
  const updates = manifest.filter((m) => m.screenshotStatus !== "failed");
  if (updates.length === 0) {
    return "";
  }

  // Generate a simple diff
  const lines: string[] = [];
  lines.push(`--- a/data/fable5.ts`);
  lines.push(`+++ b/data/fable5.ts`);
  lines.push(`@@ -1,1 +1,1 @@`);
  lines.push(
    `(Updated ${updates.length} sites with new screenshotUrl and demoUrl)`
  );
  lines.push("");
  lines.push("Changes:");
  for (const update of updates) {
    if (update.screenshotStatus === "downloaded") {
      lines.push(`  - ${update.id}: screenshotUrl -> ${update.screenshotUrl}`);
      lines.push(`           demoUrl -> ${update.demoUrl}`);
    } else {
      lines.push(`  - ${update.id}: demoUrl -> ${update.demoUrl}`);
    }
  }

  return lines.join("\n");
}

/**
 * Main execution function
 */
export async function extractAllMedia(): Promise<void> {
  console.log("Starting Fable 5 media extraction...");

  // Dynamically import the fable5Sites array to get proper TypeScript resolution
  // This avoids issues with parsing unquoted constants like PLACEHOLDER_SCREENSHOT
  const { fable5Sites } = await import(dataPath);
  const sites: Fable5Site[] = fable5Sites;
  console.log(`Found ${sites.length} sites`);

  // Create output directory
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  // Process sites with concurrency limit
  const semaphore = new Semaphore(CONCURRENCY);
  const manifest: ManifestEntry[] = [];

  console.log(
    `Processing ${sites.length} sites (concurrency: ${CONCURRENCY})...`
  );

  const promises = sites.map((site) => processSite(site, semaphore));
  const results = await Promise.all(promises);
  manifest.push(...results);

  // Write the manifest
  writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
  console.log(`Wrote manifest to ${MANIFEST_FILE}`);

  // Generate and write the diff
  const diff = generateDiff(sites, manifest);
  if (diff) {
    writeFileSync(DIFF_FILE, diff);
    console.log(`Wrote diff to ${DIFF_FILE}`);
  }

  // Summary
  const downloaded = manifest.filter(
    (m) => m.screenshotStatus === "downloaded"
  ).length;
  const missing = manifest.filter(
    (m) => m.screenshotStatus === "missing"
  ).length;
  const failed = manifest.filter((m) => m.screenshotStatus === "failed").length;

  console.log("\n=== Summary ===");
  console.log(`Downloaded: ${downloaded}`);
  console.log(`Missing:    ${missing}`);
  console.log(`Failed:     ${failed}`);
  console.log(`Total:      ${manifest.length}`);
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  extractAllMedia().catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
}
