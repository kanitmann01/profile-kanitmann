import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

function parseSitesFromDataFile(content) {
  const arrayMatch = content.match(
    /export const fable5Sites[^=]*=\s*\[([\s\S]*?)\n\]/
  );
  if (!arrayMatch) {
    throw new Error("Could not find fable5Sites array in data file");
  }

  const arrayContent = arrayMatch[1];
  const sites = [];

  const objectRegex = /\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g;
  let match;
  while ((match = objectRegex.exec(arrayContent)) !== null) {
    const objContent = match[1];
    const site = {};

    const fieldRegex = /(\w+):\s*"([^"]*)"/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(objContent)) !== null) {
      site[fieldMatch[1]] = fieldMatch[2];
    }

    const boolRegex = /(\w+):\s*(true|false)/g;
    let boolMatch;
    while ((boolMatch = boolRegex.exec(objContent)) !== null) {
      site[boolMatch[1]] = boolMatch[2] === "true";
    }

    const tagsMatch = objContent.match(/tags:\s*\[([^\]]*)\]/);
    if (tagsMatch) {
      site.tags = tagsMatch[1]
        .split(",")
        .map((t) => t.trim().replace(/['"]/g, ""))
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
console.log("First site:", sites[0]);
