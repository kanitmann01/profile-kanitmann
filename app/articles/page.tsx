import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { articles as allArticles } from "@/data/articles"

export default function Articles() {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const articles = allArticles.map((article) => ({
    title: article.title,
    description: article.summary,
    readTime: article.readTime,
    date: dateFormatter.format(new Date(article.publishedAt)),
    publishedAt: article.publishedAt,
    tags: article.tags,
    href: article.canonicalPath,
  }))

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights and analysis on data science, technology, and the stories hidden in data
          </p>
        </div>

        <div className="space-y-8">
          {[...articles]
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .map((article, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                  <span>•</span>
                  <Badge variant="outline">{article.readTime}</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{article.title}</CardTitle>
                <CardDescription className="text-base">{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild>
                  <Link href={article.href}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Articles - Kanit Mann",
  description: "Articles and insights by Kanit Mann on data science, technology, and analytics.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles - Kanit Mann",
    description: "Articles and insights by Kanit Mann on data science, technology, and analytics.",
    url: "https://kanit.codes/articles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles - Kanit Mann",
    description: "Articles and insights by Kanit Mann on data science, technology, and analytics.",
  },
}
