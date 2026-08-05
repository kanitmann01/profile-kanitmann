import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";

/**
 * Fresh-domain launch date (kanitmann.com went live 2026-08-03, replacing
 * kanit.codes). Static pages that carry no data-driven date use this as an
 * honest lastmod instead of `new Date()` (build-time clock is a lie).
 */
const SITE_LAUNCH_LASTMOD = "2026-08-03";

function isoDate(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? SITE_LAUNCH_LASTMOD : value;
}

// Sitemap honesty: lastmod comes from real content dates, never from the
// build clock. `lastUpdated ?? period` / `updatedAt ?? publishedAt` fall back
// to the launch date only if the data itself is unparsable.
function projectLastmod(project: (typeof projects)[number]): string {
  return isoDate(project.lastUpdated ?? project.period);
}

function articleLastmod(article: (typeof articles)[number]): string {
  return isoDate(article.updatedAt ?? article.publishedAt);
}

function latestLastmod(values: string[]): string {
  const maxTs = values.reduce(
    (max, v) => Math.max(max, new Date(v).getTime()),
    0
  );
  return new Date(maxTs).toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const projectLastmods = projects.map(projectLastmod);
  const articleLastmods = articles.map(articleLastmod);

  // Section hubs derive lastmod from their content; static pages use the
  // launch date. No changeFrequency/priority — Google ignores them and
  // honest dates are the only signal that matters.
  const sectionRoutes = [
    {
      route: "",
      lastmod: latestLastmod([...projectLastmods, ...articleLastmods]),
    },
    { route: "/about", lastmod: SITE_LAUNCH_LASTMOD },
    { route: "/projects", lastmod: latestLastmod(projectLastmods) },
    { route: "/articles", lastmod: latestLastmod(articleLastmods) },
    { route: "/contact", lastmod: SITE_LAUNCH_LASTMOD },
  ];

  const entries: MetadataRoute.Sitemap = [
    ...sectionRoutes.map(({ route, lastmod }) => ({
      url: `${baseUrl}${route}`,
      lastModified: lastmod,
      images: [`${baseUrl}/og-image.png`],
    })),
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: projectLastmod(project),
      images: [new URL(project.image, baseUrl).toString()],
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}${article.canonicalPath}`,
      lastModified: articleLastmod(article),
      ...(article.heroImage
        ? { images: [new URL(article.heroImage, baseUrl).toString()] }
        : {}),
    })),
  ];

  return entries;
}
