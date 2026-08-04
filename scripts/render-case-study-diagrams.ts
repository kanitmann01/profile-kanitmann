/**
 * Exp 14 — build-time Mermaid rendering for case-study pipeline diagrams.
 *
 * Reads the `pipelineDiagram` (Mermaid source) from every case-study project
 * in data/projects.ts and renders each to a static SVG via
 * @mermaid-js/mermaid-cli (headless Chrome). The SVG is inlined into a
 * generated TS module (data/diagrams/<slug>.ts) so the app imports the
 * diagram as a plain string at build time — ZERO client JS for diagrams.
 *
 * Manual command (regenerate after editing a pipelineDiagram):
 *   npm run render:diagrams
 *
 * Requires a Chrome/Edge binary; path lives in ./puppeteer-config.json
 * (override with CHROME_PATH env var).
 */
import { mkdirSync, writeFileSync, rmSync, readFileSync, readFile } from "fs";
import { promisify } from "util";
import { resolve } from "path";
import { run } from "@mermaid-js/mermaid-cli";
import { projects } from "../data/projects";

const readFileP = promisify(readFile);
const OUT_DIR = resolve("data/diagrams");
const TMP_MMD = resolve(".diagram-tmp.mmd");
const TMP_SVG = resolve(".diagram-tmp.svg");
const PUPPETEER_CONFIG_PATH = resolve("puppeteer-config.json");

function header(slug: string): string {
  return [
    "// GENERATED FILE — do not edit by hand.",
    "// Rendered build-time from the mermaid `pipelineDiagram` source in",
    "// data/projects.ts (Exp 14). Regenerate with: npm run render:diagrams",
    `export const ${slug.replace(/-/g, "_")}Diagram = `,
  ].join("\n");
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const puppeteerConfig = JSON.parse(
    await readFileP(PUPPETEER_CONFIG_PATH, "utf8")
  );
  const caseStudies = projects.filter((p) => p.caseStudy);
  let count = 0;

  for (const project of caseStudies) {
    const { slug, caseStudy } = project;
    if (!caseStudy) continue;
    writeFileSync(TMP_MMD, caseStudy.pipelineDiagram, "utf8");

    await run(TMP_MMD, TMP_SVG, { puppeteerConfig, quiet: true });

    let svg = readFileSync(TMP_SVG, "utf8");
    // Normalize the root <svg> tag: deterministic id, transparent background
    // (mermaid paints white by default), no inline sizing styles (the
    // component's responsive CSS controls layout).
    svg = svg.replace(
      /^<svg([^>]*)>/,
      (_m, attrs: string) =>
        `<svg${attrs
          .replace(/\s+id="[^"]*"/, "")
          .replace(
            /\s+style="[^"]*"/,
            ""
          )} id="${slug}-diagram" style="background-color: transparent;">`
    );
    svg = svg.replace(
      /background-color:\s*white/gi,
      "background-color: transparent"
    );
    // Keep the internal <style> block's font rules attached to the new root
    // id so the diagram renders with the same metrics it was laid out with.
    svg = svg.replace(/#my-svg/g, `#${slug}-diagram`);
    // Theme-adaptive colors (WCAG AA in both cream-light and warm-dark):
    // mermaid's hardcoded #333 text is unreadable on the dark theme, so text
    // that can sit on either background (cluster titles, root fill) resolves
    // to hsl(var(--cs-diagram-fg)); node/edge-label text stays dark because
    // it always sits on a light mermaid box (--cs-diagram-node-fg); arrows
    // and edges use --cs-diagram-line. Defined in app/globals.css.
    svg = svg
      .replace(
        /\.cluster text\{fill:#333;\}/g,
        `.cluster text{fill:hsl(var(--cs-diagram-fg));}`
      )
      .replace(
        /\.cluster span\{color:#333;\}/g,
        `.cluster span{color:hsl(var(--cs-diagram-fg));}`
      )
      .replace(
        /\.cluster-label span\{color:#333;\}/g,
        `.cluster-label span{color:hsl(var(--cs-diagram-fg));}`
      )
      .replace(
        /\.cluster-label text\{fill:#333;\}/g,
        `.cluster-label text{fill:hsl(var(--cs-diagram-fg));}`
      )
      .replace(/\.label\{[^}]*color:#333;\}/g, (rule) =>
        rule.replace(/#333/, "hsl(var(--cs-diagram-node-fg))")
      )
      .replace(
        /\.label text,[^{]*\{fill:#333;color:#333;\}/g,
        `.label text{fill:hsl(var(--cs-diagram-node-fg));color:hsl(var(--cs-diagram-node-fg));}`
      )
      .replace(/;fill:#333;\}/g, `;fill:hsl(var(--cs-diagram-fg));}`)
      .replace(/fill:#333333/g, `fill:hsl(var(--cs-diagram-line))`)
      .replace(/stroke:#333333/g, `stroke:hsl(var(--cs-diagram-line))`);

    writeFileSync(
      resolve(OUT_DIR, `${slug}.ts`),
      `${header(slug)}${JSON.stringify(svg)}\n`,
      "utf8"
    );
    rmSync(TMP_SVG, { force: true });
    count++;
    console.log(`Rendered diagram for /projects/${slug}`);
  }

  rmSync(TMP_MMD, { force: true });
  console.log(`render:diagrams done — ${count} diagram(s)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
