import { describe, it, expect, vi } from "vitest"

vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}))

vi.mock("next/script", () => ({
  default: () => null,
}))

const { metadata } = await import("../layout")

describe("Projects layout metadata", () => {
  it("exports canonical for /projects", () => {
    const alternates = metadata.alternates as Record<string, unknown>
    expect(alternates?.canonical).toBe("/projects")
  })

  it("has a title", () => {
    expect(metadata.title).toBeDefined()
  })
})
