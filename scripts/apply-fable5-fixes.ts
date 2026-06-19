import { readFileSync, writeFileSync } from "fs";

// Read the manifest
const manifest = JSON.parse(readFileSync("./data/fable5-fixes.json", "utf-8"));

// Read the original data file
const dataContent = readFileSync("./data/fable5.ts", "utf-8");

// For each entry in the manifest, update the screenshotUrl and demoUrl in the data file
for (const entry of manifest) {
  // Build regex to find and replace the site object
  // This is a simplified approach - we'll replace specific fields

  const siteId = entry.id;

  // Pattern to match screenshotUrl: PLACEHOLDER_SCREENSHOT or screenshotUrl: "..."
  const screenshotPattern = new RegExp(
    `(id:\\s*["']${siteId}["'][^}]*?)(screenshotUrl:\\s*(?:PLACEHOLDER_SCREENSHOT|["'][^"']*["']))`,
    "s"
  );

  const newScreenshotUrl = entry.screenshotUrl;
  const newDemoUrl = entry.demoUrl;

  // Replace screenshotUrl
  let updated = dataContent.replace(
    screenshotPattern,
    `$1screenshotUrl: "${newScreenshotUrl}"`
  );

  // Replace demoUrl
  const demoPattern = new RegExp(
    `(id:\\s*["']${siteId}["'][^}]*?)(demoUrl:\\s*["'][^"']*["'])`,
    "s"
  );

  updated = updated.replace(demoPattern, `$1demoUrl: "${newDemoUrl}"`);

  writeFileSync("./data/fable5.ts", updated);
  readFileSync("./data/fable5.ts", "utf-8"); // Re-read for next iteration
}

console.log("Applied fixes to data/fable5.ts");
