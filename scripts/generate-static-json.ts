import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import prettier from "prettier";
import { projects } from "../data/projects";
import { articles } from "../data/articles";
import { getSiteUrl } from "../lib/site";

/**
 * Prebuild script (modeled on scripts/generate-og-image.ts): dumps the data
 * modules to static JSON snapshots served from /data/*.json, and regenerates
 * the public/.well-known/agent.json manifest from lib/site.ts's canonical URL.
 *
 * Run via `npm run generate:static-json` (wired into `prebuild`).
 */
const PUBLIC_DIR = path.resolve("public");
const DATA_DIR = path.join(PUBLIC_DIR, "data");
const WELL_KNOWN_DIR = path.join(PUBLIC_DIR, ".well-known");

async function writeJson(file: string, data: unknown): Promise<void> {
  // Format with prettier so the committed snapshot matches the repo's
  // formatting (lint-staged runs prettier on commit) and never churns.
  const json = JSON.stringify(data, null, 2) + "\n";
  const formatted = await prettier.format(json, { parser: "json" });
  writeFileSync(file, formatted, "utf-8");
  console.log(`Generated ${file}`);
}

async function generateStaticJson(): Promise<void> {
  mkdirSync(DATA_DIR, { recursive: true });
  mkdirSync(WELL_KNOWN_DIR, { recursive: true });

  // JSON snapshots consumed by llms.txt and by agents.
  await writeJson(path.join(DATA_DIR, "projects.json"), projects);
  await writeJson(path.join(DATA_DIR, "articles.json"), articles);

  // agent.json — static manifest using lib/site.ts's canonical URL.
  const siteUrl = getSiteUrl();
  await writeJson(path.join(WELL_KNOWN_DIR, "agent.json"), {
    name: "kanitmann.com",
    description:
      "Kanit Mann — Data, ML & AI Engineer. Personal portfolio: projects, articles, experience, resume, and a /now page.",
    url: siteUrl,
    search_url: `${siteUrl}/llms.txt`,
    capabilities: {
      projects: `${siteUrl}/data/projects.json`,
      articles: `${siteUrl}/data/articles.json`,
      contact: `${siteUrl}/contact`,
    },
  });
}

generateStaticJson().catch((err) => {
  console.error(err);
  process.exit(1);
});
