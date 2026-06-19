"use client"

import { formatDate } from "@/lib/date-format"

interface ArticleHeaderProps {
  title: string
  description: string
  publishedAt: string
  readTime: string
}

export function ArticleHeader({
  title,
  description,
  publishedAt,
  readTime,
}: ArticleHeaderProps) {
  const publishedDateLabel = formatDate(publishedAt, "long") ?? publishedAt

  return (
    <header>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <time dateTime={publishedAt}>{publishedDateLabel}</time>
          <span className="mx-2">/</span>
          <span>{readTime}</span>
        </div>
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
        {title}
      </h1>
      <p className="font-sans text-lg text-muted-foreground leading-relaxed">{description}</p>
    </header>
  )
}

