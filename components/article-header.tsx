"use client"

import { LikeButton } from "@/components/like-button"
import { useLikeItem } from "@/hooks/use-like-item"
import { formatDate } from "@/lib/date-format"

interface ArticleHeaderProps {
  articleSlug: string
  title: string
  description: string
  publishedAt: string
  readTime: string
}

export function ArticleHeader({
  articleSlug,
  title,
  description,
  publishedAt,
  readTime,
}: ArticleHeaderProps) {
  const { count, isLiked, isPending, toggle } = useLikeItem(articleSlug)
  const publishedDateLabel = formatDate(publishedAt, "long") ?? publishedAt

  return (
    <header>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <time dateTime={publishedAt}>{publishedDateLabel}</time>
          <span className="mx-2">/</span>
          <span>{readTime}</span>
        </div>
        <LikeButton
          count={count}
          isLiked={isLiked}
          isPending={isPending}
          onToggle={toggle}
          variant="compact"
        />
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
        {title}
      </h1>
      <p className="font-sans text-lg text-muted-foreground leading-relaxed">{description}</p>
    </header>
  )
}

