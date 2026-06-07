import { articles } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"

export function getSortedArticles() {
  return articles
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getArticleUrl(canonicalPath: string) {
  return new URL(canonicalPath, siteUrl).toString()
}

export function getSiteUrl() {
  return siteUrl
}

export const feedHeaders = {
  rss: {
    "Content-Type": "application/rss+xml; charset=utf-8",
    "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
  },
  atom: {
    "Content-Type": "application/atom+xml; charset=utf-8",
    "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
  },
}
