import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { ArticleMeta } from "@/data/articles";
import {
  buildArticleMetadata,
  buildArticleSchema,
  buildBreadcrumbSchema,
  getSiteUrl,
} from "@/lib/article-metadata";

const article: ArticleMeta = {
  slug: "three-line-skill",
  title: "The Three-Line Skill That Changed Everything",
  description: "How a three-line AI skill transformed my workflow.",
  summary: "A three-line skill that interviews you before coding.",
  canonicalPath: "/articles/three-line-skill",
  heroImage: "/images/articles/three-line-skill.png",
  publishedAt: "2026-06-09",
  updatedAt: "2026-06-10",
  readTime: "3 min read",
  tags: ["AI", "Claude Code"],
  keywords: ["ai coding", "claude code"],
  kind: "article",
};

describe("article metadata builders", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  describe("buildArticleMetadata", () => {
    it("emits preview URLs in openGraph.url when NEXT_PUBLIC_SITE_URL is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const md = buildArticleMetadata(article);
      expect(md.openGraph?.url).toBe(
        "https://preview.example.com/articles/three-line-skill"
      );
    });

    it("emits prod URLs in openGraph.url when env var is unset", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const md = buildArticleMetadata(article);
      expect(md.openGraph?.url).toBe(
        "https://www.kanit.codes/articles/three-line-skill"
      );
    });

    it("resolves heroImage to an absolute URL rooted at the site origin", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const md = buildArticleMetadata(article);
      expect(md.openGraph?.images).toEqual([
        {
          url: "https://preview.example.com/images/articles/three-line-skill.png",
        },
      ]);
    });

    it("sets canonical alternates to the article's canonicalPath", () => {
      const md = buildArticleMetadata(article);
      expect(md.alternates?.canonical).toBe("/articles/three-line-skill");
    });

    it("keeps title, description, and keywords in OG and Twitter", () => {
      const md = buildArticleMetadata(article);
      const twitter = md.twitter as
        | { card?: string; title?: string }
        | undefined;
      expect(md.openGraph?.title).toBe(article.title);
      expect(md.openGraph?.description).toBe(article.description);
      expect(twitter?.title).toBe(article.title);
      expect(twitter?.card).toBe("summary_large_image");
    });

    it("does not emit images when heroImage is absent", () => {
      const noHero: ArticleMeta = { ...article, heroImage: undefined };
      const md = buildArticleMetadata(noHero);
      expect(md.openGraph?.images).toBeUndefined();
    });
  });

  describe("buildArticleSchema", () => {
    it("emits a schema.org Article rooted at the preview URL when env is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const schema = buildArticleSchema(article);
      expect(schema["@type"]).toBe("Article");
      expect(schema.mainEntityOfPage["@id"]).toBe(
        "https://preview.example.com/articles/three-line-skill"
      );
      expect(schema.image).toBe(
        "https://preview.example.com/images/articles/three-line-skill.png"
      );
    });

    it("falls back to www.kanit.codes when env is unset", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const schema = buildArticleSchema(article);
      expect(schema.mainEntityOfPage["@id"]).toBe(
        "https://www.kanit.codes/articles/three-line-skill"
      );
    });
  });

  describe("buildBreadcrumbSchema", () => {
    it("builds a three-step BreadcrumbList rooted at the preview URL when env is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const schema = buildBreadcrumbSchema(article);
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]).toMatchObject({
        position: 1,
        name: "Home",
        item: "https://preview.example.com/",
      });
      expect(schema.itemListElement[1]).toMatchObject({
        position: 2,
        name: "Articles",
        item: "https://preview.example.com/articles",
      });
      expect(schema.itemListElement[2]).toMatchObject({
        position: 3,
        name: article.title,
        item: "https://preview.example.com/articles/three-line-skill",
      });
    });

    it("uses the www.kanit.codes fallback when env is unset", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const schema = buildBreadcrumbSchema(article);
      expect(schema.itemListElement[0].item).toBe("https://www.kanit.codes/");
      expect(schema.itemListElement[2].item).toBe(
        "https://www.kanit.codes/articles/three-line-skill"
      );
    });
  });

  describe("getSiteUrl (re-exported from lib/site)", () => {
    // Pin the contract that article-metadata exposes the same site-url seam
    // as lib/site, so feed-generator and any future caller can import either.
    it("reflects NEXT_PUBLIC_SITE_URL at call time", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://branch-xyz.vercel.app";
      expect(getSiteUrl()).toBe("https://branch-xyz.vercel.app");
    });
  });
});
