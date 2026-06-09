import type { Metadata } from "next"
import type { ArticleMeta } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kanit.codes"

export function buildArticleMetadata(article: ArticleMeta): Metadata {
  const canonicalUrl = new URL(article.canonicalPath, siteUrl).toString()
  const heroImageUrl = article.heroImage ? new URL(article.heroImage, siteUrl).toString() : undefined

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: article.canonicalPath },
    authors: [{ name: "Kanit Mann" }],
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: heroImageUrl ? [{ url: heroImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: heroImageUrl ? [heroImageUrl] : undefined,
    },
  }
}

export function buildArticleSchema(article: ArticleMeta) {
  const canonicalUrl = new URL(article.canonicalPath, siteUrl).toString()
  const heroImageUrl = article.heroImage ? new URL(article.heroImage, siteUrl).toString() : undefined
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: heroImageUrl,
    author: { "@type": "Person", name: "Kanit Mann" },
    publisher: {
      "@type": "Organization",
      name: "Kanit Mann Portfolio",
      logo: { "@type": "ImageObject", url: new URL("/images/profile/kanit-mann.png", siteUrl).toString() },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: article.keywords?.join(", "),
  }
}

export function buildBreadcrumbSchema(article: ArticleMeta) {
  const canonicalUrl = new URL(article.canonicalPath, siteUrl).toString()
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${siteUrl}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
    ],
  }
}

export function getSiteUrl() {
  return siteUrl
}
