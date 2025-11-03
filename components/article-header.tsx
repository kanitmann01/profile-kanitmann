"use client"

import { Calendar, Clock } from "lucide-react"
import { LikeButton } from "@/components/like-button"
import { useLikes } from "@/hooks/use-likes"

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
  const { likes, updateLikeCount } = useLikes()
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
  const publishedDateLabel = dateFormatter.format(new Date(publishedAt))

  return (
    <header>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time dateTime={publishedAt}>{publishedDateLabel}</time>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
        <LikeButton
          itemId={articleSlug}
          initialCount={likes[articleSlug] || 0}
          onCountChange={(count) => updateLikeCount(articleSlug, count)}
          variant="compact"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
        {title}
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{description}</p>
    </header>
  )
}

