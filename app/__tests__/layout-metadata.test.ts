import { describe, it, expect, vi } from "vitest"

// Mock Next.js font imports
vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}))

// Mock next/script
vi.mock("next/script", () => ({
  default: () => null,
}))

const { metadata } = await import("../layout")

describe("Root layout metadata", () => {
  describe("title and description", () => {
    it('has title "Kanit Mann - Data & ML Engineer"', () => {
      expect(metadata.title).toBe("Kanit Mann - Data & ML Engineer")
    })

    it("description mentions Data & ML Engineer and cloud infrastructure", () => {
      expect(metadata.description).toContain("Data & ML Engineer")
      expect(metadata.description).toContain("cloud infrastructure")
    })
  })

  describe("OpenGraph", () => {
    it("includes og-image.png in images", () => {
      const og = metadata.openGraph as Record<string, unknown>
      expect(og.images).toContain("/og-image.png")
    })

    it("has updated title", () => {
      const og = metadata.openGraph as Record<string, unknown>
      expect(og.title).toBe("Kanit Mann - Data & ML Engineer")
    })
  })

  describe("Twitter", () => {
    it("includes og-image.png in images", () => {
      const twitter = metadata.twitter as Record<string, unknown>
      expect(twitter.images).toContain("/og-image.png")
    })

    it("has summary_large_image card type", () => {
      const twitter = metadata.twitter as Record<string, unknown>
      expect(twitter.card).toBe("summary_large_image")
    })
  })
})
