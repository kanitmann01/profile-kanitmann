import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}));

vi.mock("next/script", () => ({
  default: () => null,
}));

describe("IMAT privacy metadata", () => {
  it("exports robots metadata with noindex and nofollow", async () => {
    const { metadata } = await import("../layout");
    const robots = metadata.robots as Record<string, unknown>;
    expect(robots?.index).toBe(false);
    expect(robots?.follow).toBe(false);
  });

  it("does not export JSON-LD structured data", async () => {
    const fs = await import("fs");
    const layoutContent = fs.readFileSync("app/imat/layout.tsx", "utf-8");
    expect(layoutContent).not.toContain("application/ld+json");
    expect(layoutContent).not.toContain("JSON.stringify");
  });
});
