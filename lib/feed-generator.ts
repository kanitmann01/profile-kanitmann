import { articles } from "@/data/articles";
import { getSiteUrl } from "@/lib/site";

export function getSortedArticles() {
  return articles
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getArticleUrl(canonicalPath: string) {
  return new URL(canonicalPath, getSiteUrl()).toString();
}

export { getSiteUrl } from "@/lib/site";

export const feedHeaders = {
  rss: {
    "Content-Type": "application/rss+xml; charset=utf-8",
    "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
  },
  atom: {
    "Content-Type": "application/atom+xml; charset=utf-8",
    "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
  },
};
