import type { Metadata } from "next";
import type { Project } from "@/data/projects";
import { getSiteUrl } from "@/lib/site";

export function buildProjectMetadata(project: Project): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(`/projects/${project.slug}`, siteUrl).toString();
  const imageUrl = new URL(project.image, siteUrl).toString();
  // Case-study titles drop the " - Project " infix to stay under ~60 chars.
  const title = `${project.title} | Kanit Mann`;

  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.description,
      url: canonicalUrl,
      images: [{ url: imageUrl }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [imageUrl],
    },
  };
}

export function buildProjectSchema(project: Project) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(`/projects/${project.slug}`, siteUrl).toString();
  const imageUrl = new URL(project.image, siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    url: canonicalUrl,
    applicationCategory: "DeveloperApplication",
    ...(project.github ? { codeRepository: project.github } : {}),
    featureList: project.tags,
    screenshot: imageUrl,
    datePublished: project.lastUpdated ?? project.period,
  };
}

export function buildBreadcrumbSchema(project: Project) {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(`/projects/${project.slug}`, siteUrl).toString();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: canonicalUrl,
      },
    ],
  };
}

export { getSiteUrl } from "@/lib/site";
