import sharp from "sharp"
import { existsSync } from "fs"
import path from "path"

const INPUT_SVG = path.resolve("public/logo.svg")
const OUTPUT_PNG = path.resolve("public/og-image.png")
const WIDTH = 1200
const HEIGHT = 630

async function generateOGImage() {
  if (!existsSync(INPUT_SVG)) {
    console.error(`Error: ${INPUT_SVG} not found`)
    process.exit(1)
  }

  await sharp(INPUT_SVG)
    .resize(WIDTH, HEIGHT, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 1 }, // black background
    })
    .png()
    .toFile(OUTPUT_PNG)

  console.log(`Generated ${OUTPUT_PNG} (${WIDTH}x${HEIGHT})`)
}

generateOGImage().catch((err) => {
  console.error(err)
  process.exit(1)
})
