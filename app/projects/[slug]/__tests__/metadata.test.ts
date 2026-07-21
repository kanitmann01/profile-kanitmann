import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}));

vi.mock("next/script", () => ({
  default: () => null,
}));

describe("Project route generateMetadata delegation", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  it("returns preview URL in openGraph.url when NEXT_PUBLIC_SITE_URL is set", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";

    const { generateMetadata } = await import("../page");
    const md = await generateMetadata({
      params: Promise.resolve({ slug: "unified-bharat" }),
    });

    expect(md.openGraph?.url).toBe(
      "https://preview.example.com/projects/unified-bharat"
    );
  });

  it("returns fallback www.kanit.codes URL when env var is unset", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    const { generateMetadata } = await import("../page");
    const md = await generateMetadata({
      params: Promise.resolve({ slug: "unified-bharat" }),
    });

    expect(md.openGraph?.url).toBe(
      "https://www.kanit.codes/projects/unified-bharat"
    );
  });

  it("returns empty metadata for unknown slug", async () => {
    const { generateMetadata } = await import("../page");
    const md = await generateMetadata({
      params: Promise.resolve({ slug: "nonexistent-project" }),
    });

    expect(md).toEqual({});
  });
});
