import { describe, it, expect } from "vitest"
import { readFileSync } from "fs"

describe("site.webmanifest", () => {
  const manifest = JSON.parse(readFileSync("public/site.webmanifest", "utf-8"))

  it("has name field", () => {
    expect(manifest.name).toBeTruthy()
    expect(manifest.name).toContain("Kanit Mann")
  })

  it("has short_name field", () => {
    expect(manifest.short_name).toBeTruthy()
    expect(manifest.short_name).toBe("Kanit Mann")
  })

  it("has description field", () => {
    expect(manifest.description).toBeTruthy()
    expect(manifest.description).toContain("Data & ML Engineer")
  })

  it("has valid icons array", () => {
    expect(manifest.icons).toBeDefined()
    expect(Array.isArray(manifest.icons)).toBe(true)
    expect(manifest.icons.length).toBeGreaterThan(0)
  })
})
