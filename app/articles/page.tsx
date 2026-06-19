"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { articles, topArticleSlug, type ArticleMeta } from "@/data/articles";
import { LinkChip } from "@/components/link-chip";
import { ProjectCardInteractive } from "@/components/project-card-interactive";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "recent" | "popular";

function MuseumBadge() {
  return (
    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2 py-0.5 ml-2 align-middle">
      Museum
    </span>
  );
}

export default function Articles() {
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const sortedArticles = useMemo(() => {
    // Without server-side likes, sort by recent only
    return [...articles].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [sortBy]);

  const topArticle: ArticleMeta =
    (topArticleSlug && articles.find((a) => a.slug === topArticleSlug)) ||
    articles.find((a) => a.featuredOnHome) ||
    articles[0];

  const otherArticles = sortedArticles.filter(
    (a) => a.slug !== topArticle.slug
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-16">
          <h1 className="font-serif text-5xl text-foreground mb-4">Articles</h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl">
            Insights and analysis on data science, technology, and the stories
            hidden in data
          </p>
        </header>

        <div className="flex items-center justify-end mb-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground">
              {sortedArticles.length} articles
            </span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[150px] font-mono text-xs border-0 border-b border-border rounded-none px-0 h-auto py-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Link
          href={topArticle.canonicalPath}
          className="group block mb-16"
        >
          <article className="relative overflow-hidden">
            <div className="relative h-[400px] w-full overflow-hidden">
              <Image
                src={topArticle.heroImage || "/placeholder.jpg"}
                alt={topArticle.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>
            <div className="relative mt-[-120px] px-2 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-primary uppercase tracking-wider">
                  Featured
                </span>
                {topArticle.kind === "museum" && <MuseumBadge />}
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mt-3 mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                {topArticle.title}
                <LinkChip path={topArticle.canonicalPath} />
              </h2>
              <p className="font-serif text-lg text-muted-foreground italic max-w-2xl mb-4">
                {topArticle.description}
              </p>
              <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                <time>{formatDate(topArticle.publishedAt)}</time>
                <span className="text-border">|</span>
                <span>{topArticle.readTime}</span>
              </div>
            </div>
          </article>
        </Link>

        <div className="divide-y divide-border">
          {otherArticles.map((article) => (
            <Link
              key={article.slug}
              href={article.canonicalPath}
              className="group block py-8"
            >
              <article>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-foreground mb-2 leading-snug group-hover:text-primary transition-colors duration-300 relative">
                      {article.title}
                      {article.kind === "museum" && <MuseumBadge />}
                      <LinkChip path={article.canonicalPath} />
                      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
                      <time>{formatDate(article.publishedAt)}</time>
                      <span className="text-border">|</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
