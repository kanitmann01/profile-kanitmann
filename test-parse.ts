import { readFileSync } from "fs";

function parseSitesFromDataFile(content: string): any[] {
  // Find the fable5Sites array in the file
  const arrayMatch = content.match(
    /export const fable5Sites[^=]*=\s*\[([\s\S]*?)\n\]/
  );
  if (!arrayMatch) {
    throw new Error("Could not find fable5Sites array in data file");
  }

  // Parse each site object - this is a simplified parser
  const arrayContent = arrayMatch[1];
  const sites: any[] = [];

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
        .map((t: string) => t.trim().replace(/['"]/g, ""))
        .filter(Boolean);
    }

    if (site.id && site.demoUrl) {
      sites.push(site);
    }
  }

  return sites;
}

const content = readFileSync("./data/fable5.ts", "utf-8");
const sites = parseSitesFromDataFile(content);
console.log("Parsed sites:", sites.length);
console.log("First site:", sites[0]?.name);
console.log("First site screenshotUrl:", sites[0]?.screenshotUrl);
