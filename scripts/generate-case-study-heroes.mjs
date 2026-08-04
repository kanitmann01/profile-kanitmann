/**
 * Exp 14 — generates hero images for case-study projects that have no real
 * screenshot (NetSTAR, Ericsson). Abstract, text-labeled art rendered from
 * SVG via sharp (librsvg). Manual command:
 *   npx tsx scripts/generate-case-study-heroes.mjs
 */
import sharp from "sharp";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";

const OUT_DIR = resolve("public/images/case-studies");

const heroes = [
  {
    file: "netstar.png",
    title: "THREAT INTELLIGENCE",
    subtitle: "Zero-day phishing detection platform",
    accent: "#60a5fa",
  },
  {
    file: "ericsson.png",
    title: "CLOUD MIGRATION",
    subtitle: "2,000+ servers to Google Cloud Platform",
    accent: "#fbbf24",
  },
];

function heroSvg(title, subtitle, accent) {
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#14121f"/>
      <stop offset="0.55" stop-color="#1c1a2b"/>
      <stop offset="1" stop-color="#241f33"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>
  <g stroke="#ffffff" stroke-opacity="0.06">
    <line x1="0" y1="126" x2="1200" y2="126"/>
    <line x1="0" y1="252" x2="1200" y2="252"/>
    <line x1="0" y1="378" x2="1200" y2="378"/>
    <line x1="0" y1="504" x2="1200" y2="504"/>
    <line x1="240" y1="0" x2="240" y2="630"/>
    <line x1="480" y1="0" x2="480" y2="630"/>
    <line x1="720" y1="0" x2="720" y2="630"/>
    <line x1="960" y1="0" x2="960" y2="630"/>
  </g>
  <g stroke="${accent}" stroke-opacity="0.5" fill="none" stroke-width="2">
    <circle cx="300" cy="180" r="3"/>
    <circle cx="560" cy="260" r="3"/>
    <circle cx="820" cy="190" r="3"/>
    <circle cx="1000" cy="300" r="3"/>
    <path d="M300 180 L560 260 L820 190 L1000 300"/>
  </g>
  <circle cx="300" cy="180" r="7" fill="${accent}" fill-opacity="0.85"/>
  <text x="80" y="330" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="#f5f4f8" letter-spacing="2">${title}</text>
  <text x="80" y="392" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#a8a3b8" letter-spacing="1">${subtitle}</text>
  <rect x="80" y="430" width="120" height="6" fill="${accent}"/>
</svg>`;
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const hero of heroes) {
    await sharp(Buffer.from(heroSvg(hero.title, hero.subtitle, hero.accent)))
      .png()
      .toFile(resolve(OUT_DIR, hero.file));
    console.log(`Generated ${hero.file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
