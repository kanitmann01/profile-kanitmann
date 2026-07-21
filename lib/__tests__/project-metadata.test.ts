import { describe, it, expect, afterEach } from "vitest";
import type { Project } from "@/data/projects";
import {
  buildProjectMetadata,
  buildProjectSchema,
  buildBreadcrumbSchema,
  getSiteUrl,
} from "@/lib/project-metadata";

const project: Project = {
  slug: "unified-bharat",
  title: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse",
  description:
    "Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis of Indian state-level policy outcomes.",
  image: "/images/case-studies/unified-bharat.png",
  tags: [
    "Python",
    "Apache Spark",
    "Apache Iceberg",
    "Docker",
    "PySpark",
    "Panel Regression",
  ],
  href: "/projects/unified-bharat",
  github: "https://github.com/kanitmann01/unified-bharat",
  status: "Completed",
  period: "May 2026",
  order: 202605,
  lastUpdated: "2026-05-01",
  featuredOnHome: true,
};

describe("project metadata builders", () => {
  const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
    }
  });

  describe("buildProjectMetadata", () => {
    it("emits preview URLs in openGraph.url when NEXT_PUBLIC_SITE_URL is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const md = buildProjectMetadata(project);
      expect(md.openGraph?.url).toBe(
        "https://preview.example.com/projects/unified-bharat"
      );
    });

    it("emits prod URLs in openGraph.url when env var is unset", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const md = buildProjectMetadata(project);
      expect(md.openGraph?.url).toBe(
        "https://www.kanit.codes/projects/unified-bharat"
      );
    });

    it("resolves image to an absolute URL rooted at the site origin", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const md = buildProjectMetadata(project);
      expect(md.openGraph?.images).toEqual([
        {
          url: "https://preview.example.com/images/case-studies/unified-bharat.png",
        },
      ]);
    });

    it("sets canonical alternates to /projects/<slug>", () => {
      const md = buildProjectMetadata(project);
      expect(md.alternates?.canonical).toBe("/projects/unified-bharat");
    });

    it("keeps title, description in OG and Twitter with correct format", () => {
      const md = buildProjectMetadata(project);
      const expectedTitle = `${project.title} - Project | Kanit Mann`;
      const twitter = md.twitter as
        | { card?: string; title?: string }
        | undefined;
      expect(md.openGraph?.title).toBe(expectedTitle);
      expect(md.openGraph?.description).toBe(project.description);
      expect(twitter?.title).toBe(expectedTitle);
      expect(twitter?.card).toBe("summary_large_image");
    });

    it("emits absolute image URLs in Twitter card", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const md = buildProjectMetadata(project);
      const twitter = md.twitter as { images?: string[] } | undefined;
      expect(twitter?.images).toEqual([
        "https://preview.example.com/images/case-studies/unified-bharat.png",
      ]);
    });
  });

  describe("buildProjectSchema", () => {
    it("emits a schema.org Article rooted at the preview URL when env is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const schema = buildProjectSchema(project);
      expect(schema["@type"]).toBe("Article");
      expect(schema.mainEntityOfPage["@id"]).toBe(
        "https://preview.example.com/projects/unified-bharat"
      );
      expect(schema.image).toBe(
        "https://preview.example.com/images/case-studies/unified-bharat.png"
      );
    });

    it("falls back to www.kanit.codes when env is unset", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const schema = buildProjectSchema(project);
      expect(schema.mainEntityOfPage["@id"]).toBe(
        "https://www.kanit.codes/projects/unified-bharat"
      );
    });

    it("uses lastUpdated as datePublished when available", () => {
      const schema = buildProjectSchema(project);
      expect(schema.datePublished).toBe("2026-05-01");
    });
  });

  describe("buildBreadcrumbSchema", () => {
    it("builds a three-step BreadcrumbList rooted at the preview URL when env is set", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://preview.example.com";
      const schema = buildBreadcrumbSchema(project);
      expect(schema["@type"]).toBe("BreadcrumbList");
      expect(schema.itemListElement).toHaveLength(3);
      expect(schema.itemListElement[0]).toMatchObject({
        position: 1,
        name: "Home",
        item: "https://preview.example.com/",
      });
      expect(schema.itemListElement[1]).toMatchObject({
        position: 2,
        name: "Projects",
        item: "https://preview.example.com/projects",
      });
      expect(schema.itemListElement[2]).toMatchObject({
        position: 3,
        name: project.title,
        item: "https://preview.example.com/projects/unified-bharat",
      });
    });

    it("uses the www.kanit.codes fallback when env is unset", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const schema = buildBreadcrumbSchema(project);
      expect(schema.itemListElement[0].item).toBe("https://www.kanit.codes/");
      expect(schema.itemListElement[2].item).toBe(
        "https://www.kanit.codes/projects/unified-bharat"
      );
    });
  });

  describe("getSiteUrl (re-exported from lib/site)", () => {
    it("reflects NEXT_PUBLIC_SITE_URL at call time", () => {
      process.env.NEXT_PUBLIC_SITE_URL = "https://branch-xyz.vercel.app";
      expect(getSiteUrl()).toBe("https://branch-xyz.vercel.app");
    });
  });
});
