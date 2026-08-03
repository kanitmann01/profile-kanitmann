import { describe, it, expect } from "vitest";
import sitemap from "../sitemap";

describe("Sitemap", () => {
  const entries = sitemap();

  it("uses kanitmann.com as base URL", () => {
    for (const entry of entries) {
      expect(entry.url).toContain("https://kanitmann.com");
    }
  });

  it("does not use the www form (apex is canonical)", () => {
    for (const entry of entries) {
      expect(entry.url).not.toMatch(/https:\/\/www\.kanitmann\.com/);
    }
  });

  it("includes all published articles", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://kanitmann.com/articles/three-line-skill");
    expect(urls).toContain("https://kanitmann.com/articles/bios-issues-ubuntu");
    expect(urls).toContain(
      "https://kanitmann.com/articles/ccrb-allegations-analysis"
    );
    expect(urls).toContain("https://kanitmann.com/articles/data-viz-analysis");
    expect(urls).toContain("https://kanitmann.com/articles/technical-blog-2");
    expect(urls).toContain("https://kanitmann.com/articles/technical-blog-3");
  });

  it("includes main pages", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://kanitmann.com");
    expect(urls).toContain("https://kanitmann.com/about");
    expect(urls).toContain("https://kanitmann.com/projects");
    expect(urls).toContain("https://kanitmann.com/contact");
  });

  it("each entry has a valid lastModified date", () => {
    for (const entry of entries) {
      expect(new Date(entry.lastModified!).getTime()).not.toBeNaN();
    }
  });

  it("includes the Fable-5 museum (canonical article path)", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://kanitmann.com/fable-5");
  });

  it("includes every project derived from data/projects.ts", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://kanitmann.com/projects/unified-bharat");
    expect(urls).toContain(
      "https://kanitmann.com/projects/twitch-analytics-pipeline"
    );
    expect(urls).toContain(
      "https://kanitmann.com/projects/college-major-shift-analysis"
    );
  });
});
