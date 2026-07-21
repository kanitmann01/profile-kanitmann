import type { Metadata } from "next";
import type { Project } from "@/data/projects";
import { getSiteUrl } from "@/lib/site";

export function buildProjectMetadata(project: Project): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalUrl = new URL(`/projects/${project.slug}`, siteUrl).toString();
  const imageUrl = new URL(project.image, siteUrl).toString();

  return {
    title: `${project.title} - Project | Kanit Mann`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} - Project | Kanit Mann`,
      description: project.description,
      url: canonicalUrl,
      images: [{ url: imageUrl }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Project | Kanit Mann`,
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
    "@type": "Article",
    headline: project.title,
    description: project.description,
    image: imageUrl,
    author: { "@type": "Person", name: "Kanit Mann" },
    publisher: {
      "@type": "Organization",
      name: "Kanit Mann Portfolio",
      logo: {
        "@type": "ImageObject",
        url: new URL("/images/profile/kanit-mann.png", siteUrl).toString(),
      },
    },
    datePublished: project.lastUpdated ?? project.period,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
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
