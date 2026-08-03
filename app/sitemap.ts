import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  // Top-level routes — section hubs refresh more often than leaf pages.
  const sectionRoutes = ["", "/about", "/projects", "/articles", "/contact"];

  // Derive leaf routes from the data modules so the sitemap can't drift.
  const projectRoutes = projects.map((p) => `/projects/${p.slug}`);
  // Article canonical paths already encode the correct route per article
  // (e.g. "/fable-5" for the museum, "/articles/..." for the rest).
  const articleRoutes = articles.map((a) => a.canonicalPath);

  const now = new Date().toISOString();

  const entries: MetadataRoute.Sitemap = [
    ...sectionRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: (route === "" ||
      route === "/projects" ||
      route === "/articles"
        ? "weekly"
        : "monthly") as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority:
        route === ""
          ? 1
          : route === "/projects" || route === "/articles"
            ? 0.9
            : 0.8,
    })),
    ...[...projectRoutes, ...articleRoutes].map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency:
        "monthly" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.7,
    })),
  ];

  return entries;
}
