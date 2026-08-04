import { describe, it, expect, afterEach } from "vitest";
import {
  getArticleUrl,
  getSortedArticles,
  getSiteUrl,
} from "@/lib/feed-generator";

describe("feed-generator", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  describe("getArticleUrl", () => {
    it("resolves to the preview origin when NEXT_PUBLIC_SITE_URL is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      expect(getArticleUrl("/articles/foo")).toBe(
        "https://preview.example.com/articles/foo"
      );
    });

    it("uses the canonical kanitmann.com fallback", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      // Locked in by lib/site.ts + app/__tests__/sitemap.test.ts — canonical
      // form is the apex https://kanitmann.com (see #191).
      expect(getArticleUrl("/articles/foo")).toBe(
        "https://kanitmann.com/articles/foo"
      );
    });
  });

  describe("getSiteUrl (re-exported from lib/site)", () => {
    it("reflects NEXT_PUBLIC_SITE_URL at call time", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://branch-xyz.vercel.app";
      expect(getSiteUrl()).toBe("https://branch-xyz.vercel.app");
    });
  });

  describe("getSortedArticles", () => {
    it("returns articles sorted by publishedAt descending", () => {
      const sorted = getSortedArticles();
      for (let i = 1; i < sorted.length; i++) {
        expect(
          new Date(sorted[i - 1].publishedAt).getTime()
        ).toBeGreaterThanOrEqual(new Date(sorted[i].publishedAt).getTime());
      }
    });
  });
});
