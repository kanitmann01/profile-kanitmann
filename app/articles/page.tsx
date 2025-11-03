"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { articles } from "@/data/articles"
import { LikeButton } from "@/components/like-button"
import { useLikes } from "@/hooks/use-likes"
import { ProjectCardInteractive } from "@/components/project-card-interactive"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = "recent" | "popular"

export default function Articles() {
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const { likes, updateLikeCount } = useLikes()

  const sortedArticles = useMemo(() => {
    const articlesWithLikes = articles.map((article) => ({
      ...article,
      likeCount: likes[article.slug] || 0,
    }))

    if (sortBy === "popular") {
      return articlesWithLikes.sort((a, b) => b.likeCount - a.likeCount)
    }

    return articlesWithLikes.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }, [sortBy, likes])

  const featuredArticle = sortedArticles.find((a) => a.featuredOnHome) || sortedArticles[0]
  const otherArticles = sortedArticles.filter((a) => a.slug !== featuredArticle.slug)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights and analysis on data science, technology, and the stories hidden in data
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {sortedArticles.length} {sortedArticles.length === 1 ? "article" : "articles"}
            </span>
          </div>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Featured Article Hero */}
        <Card className="overflow-hidden mb-12 border-2 cursor-pointer group">
          <Link href={featuredArticle.canonicalPath}>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <Image
                  src={featuredArticle.heroImage || "/placeholder.jpg"}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground font-semibold">
                    Featured
                  </Badge>
                </div>
              </div>
              <CardHeader className="flex flex-col justify-between p-8">
                <div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {formatDate(featuredArticle.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-3xl mb-4">{featuredArticle.title}</CardTitle>
                  <CardDescription className="text-base mb-6">
                    {featuredArticle.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredArticle.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-primary flex items-center gap-2">
                    Read Article <ArrowRight className="h-4 w-4" />
                  </div>
                  <ProjectCardInteractive>
                    <LikeButton
                      itemId={featuredArticle.slug}
                      initialCount={featuredArticle.likeCount}
                      onCountChange={(count) => updateLikeCount(featuredArticle.slug, count)}
                    />
                  </ProjectCardInteractive>
                </div>
              </CardHeader>
            </div>
          </Link>
        </Card>

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherArticles.map((article) => (
            <Card
              key={article.slug}
              className="overflow-hidden hover:shadow-lg transition-all group flex flex-col cursor-pointer"
            >
              <Link href={article.canonicalPath} className="flex-1 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.heroImage || "/placeholder.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(article.publishedAt)}
                    <span>•</span>
                    <Clock className="h-3.5 w-3.5" />
                    {article.readTime}
                  </div>
                  <CardTitle className="text-lg mb-2 line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-3 flex-1">
                    {article.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Link>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Click to read</span>
                  <ProjectCardInteractive>
                    <LikeButton
                      itemId={article.slug}
                      initialCount={article.likeCount}
                      onCountChange={(count) => updateLikeCount(article.slug, count)}
                      variant="compact"
                    />
                  </ProjectCardInteractive>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
