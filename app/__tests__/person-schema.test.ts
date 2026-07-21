import { describe, it, expect, vi } from "vitest";

// Mock Next.js font imports
vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}));

// Mock next/script
vi.mock("next/script", () => ({
  default: () => null,
}));

// We need to test the structured data that gets rendered
// Since it's inline in the component, we'll test the JSON-LD script content
describe("Person structured data", () => {
  it("includes Person schema in layout", async () => {
    // Read the layout file and check for Person schema
    const fs = await import("fs");
    const layoutContent = fs.readFileSync("app/layout.tsx", "utf-8");

    // Check for Person type in JSON-LD
    expect(layoutContent).toContain('"@type": "Person"');
    expect(layoutContent).toContain('name: "Kanit Mann"');
    expect(layoutContent).toContain('jobTitle: "Data & ML Engineer"');
  });
});
