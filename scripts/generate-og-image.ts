import sharp from "sharp";
import { existsSync } from "fs";
import path from "path";

const INPUT_SVG = path.resolve("public/logo.svg");
const OUTPUT_PNG = path.resolve("public/og-image.png");
const WIDTH = 1200;
const HEIGHT = 630;

const LOGO_SIZE = 420;

// Text overlay: name + role + site URL composited on the logo-on-black
// canvas. Rendered as a transparent SVG so it layers over the logo.
function buildTextOverlay(): string {
  return `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <text x="${WIDTH / 2}" y="515" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#ffffff">Kanit Mann</text>
  <text x="${WIDTH / 2}" y="570" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="#E62129">ML Engineer</text>
  <text x="${WIDTH / 2}" y="610" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="24" letter-spacing="2" fill="#9ca3af">kanitmann.com</text>
</svg>`;
}

async function generateOGImage() {
  if (!existsSync(INPUT_SVG)) {
    console.error(`Error: ${INPUT_SVG} not found`);
    process.exit(1);
  }

  const canvas = sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }, // black background
    },
  });

  const logo = sharp(INPUT_SVG).resize(LOGO_SIZE, LOGO_SIZE, {
    fit: "contain",
  });

  await canvas
    .composite([
      {
        input: await logo.png().toBuffer(),
        top: 48,
        left: Math.round((WIDTH - LOGO_SIZE) / 2),
      },
      { input: Buffer.from(buildTextOverlay()), top: 0, left: 0 },
    ])
    .png()
    .toFile(OUTPUT_PNG);

  console.log(`Generated ${OUTPUT_PNG} (${WIDTH}x${HEIGHT})`);
}

generateOGImage().catch((err) => {
  console.error(err);
  process.exit(1);
});
