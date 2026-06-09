import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { execSync } from "child_process"
import { existsSync } from "fs"
import { readFile } from "fs/promises"
import path from "path"

const OG_IMAGE_PATH = path.resolve("public/og-image.png")
const SCRIPT_PATH = path.resolve("scripts/generate-og-image.ts")

describe("OG image generation", () => {
  beforeAll(() => {
    // Clean up any existing og-image.png
    if (existsSync(OG_IMAGE_PATH)) {
      const { unlinkSync } = require("fs")
      unlinkSync(OG_IMAGE_PATH)
    }
  })

  afterAll(() => {
    // Clean up generated file
    if (existsSync(OG_IMAGE_PATH)) {
      const { unlinkSync } = require("fs")
      unlinkSync(OG_IMAGE_PATH)
    }
  })

  it("generates a 1200x630 PNG from logo.svg", async () => {
    // Run the build script
    execSync(`npx tsx ${SCRIPT_PATH}`, { cwd: process.cwd() })

    // Verify file exists
    expect(existsSync(OG_IMAGE_PATH)).toBe(true)

    // Verify it's a valid PNG (starts with PNG magic bytes)
    const buffer = await readFile(OG_IMAGE_PATH)
    const isPNG =
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 && // P
      buffer[2] === 0x4e && // N
      buffer[3] === 0x47 // G
    expect(isPNG).toBe(true)

    // Verify dimensions using sharp
    const sharp = require("sharp")
    const metadata = await sharp(OG_IMAGE_PATH).metadata()
    expect(metadata.width).toBe(1200)
    expect(metadata.height).toBe(630)
  })
})
