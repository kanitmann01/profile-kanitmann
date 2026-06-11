import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";

describe("Sitemap", () => {
  const entries = sitemap();

  it("uses www.kanit.codes as base URL", () => {
    for (const entry of entries) {
      expect(entry.url).toContain("https://www.kanit.codes");
    }
  });

  it("does not use bare kanit.codes (non-www)", () => {
    for (const entry of entries) {
      expect(entry.url).not.toMatch(/https:\/\/kanit\.codes(?!\/)/);
    }
  });

  it("includes all published articles", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://www.kanit.codes/articles/three-line-skill");
    expect(urls).toContain(
      "https://www.kanit.codes/articles/bios-issues-ubuntu"
    );
    expect(urls).toContain(
      "https://www.kanit.codes/articles/ccrb-allegations-analysis"
    );
    expect(urls).toContain(
      "https://www.kanit.codes/articles/data-viz-analysis"
    );
    expect(urls).toContain("https://www.kanit.codes/articles/technical-blog-2");
    expect(urls).toContain("https://www.kanit.codes/articles/technical-blog-3");
  });

  it("includes main pages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://www.kanit.codes");
    expect(urls).toContain("https://www.kanit.codes/about");
    expect(urls).toContain("https://www.kanit.codes/projects");
    expect(urls).toContain("https://www.kanit.codes/contact");
  });

  it("each entry has a valid lastModified date", () => {
    for (const entry of entries) {
      expect(new Date(entry.lastModified!).getTime()).not.toBeNaN();
    }
  });
});
