import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Command, Monitor, Users } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"

import { getArticleBySlug } from "@/data/articles"

const CLI_MERITS = [
  "Gives detailed control to the user",
  "Faster for repetitive or automated tasks",
  "Low memory consumption",
  "Looks cooler (according to the power-user bias!)",
]

const CLI_DEMERITS = [
  "Steeper initial learning curve",
  "Low fault tolerance when commands are mistyped",
  "Syntax knowledge required to be productive",
]

const GUI_MERITS = [
  "Graphically intuitive with a gentle learning curve",
  "Guided, discoverable workflows",
  "Visually polished and easy to navigate",
]

const GUI_DEMERITS = [
  "Higher memory consumption",
  "Can feel slower for experienced users",
  "Limited automation without third-party tools",
]

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"
const article = getArticleBySlug("technical-blog-2")
const canonicalUrl = new URL(article.canonicalPath, siteUrl).toString()
const heroImageUrl = article.heroImage ? new URL(article.heroImage, siteUrl).toString() : undefined

export const metadata: Metadata = {
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

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
})

const publishedDateLabel = dateFormatter.format(new Date(article.publishedAt))

const articleSchema = {
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Articles", item: `${siteUrl}/articles` },
    { "@type": "ListItem", position: 3, name: article.title, item: canonicalUrl },
  ],
}

export default function TechnicalBlog2() {
  return (
    <>
      <Script id="ld-article-tech-blog-2" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id="ld-breadcrumb-article-tech-blog-2" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/articles">
                <ArrowLeftIcon />
                Back to Articles
              </Link>
            </Button>
          </div>

          <FadeIn className="mb-16">
            <header>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.publishedAt}>{publishedDateLabel}</time>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                {article.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
            </header>
          </FadeIn>

          <section className="mb-16">
            <SlideIn direction="left">
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  My own journey began with a CS engineering background and professional time spent deep in the terminal. The initial CLI learning curve felt manageable because file navigation, scripts, and automation were part of the job. For people new to computing, terminals can appear unforgiving, but that first exposure often ignites curiosity—either you fall in love with the power or run back to graphical menus.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  After bouncing between both worlds, I now favor a hybrid mode: terminals for reproducibility and automation; graphical interfaces for discovery, visualization, and creative flow. The key is knowing why you are reaching for one or the other.
                </p>
              </div>
            </SlideIn>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Merits and Demerits</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Command className="h-5 w-5 text-primary" /> Command Line Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MeritList title="Merits" items={CLI_MERITS} />
                  <MeritList title="Demerits" items={CLI_DEMERITS} variant="demerit" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Monitor className="h-5 w-5 text-primary" /> Graphical User Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MeritList title="Merits" items={GUI_MERITS} />
                  <MeritList title="Demerits" items={GUI_DEMERITS} variant="demerit" />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Rules of Thumb</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {["Automate repetitive tasks", "Prototype visually first", "Blend both in daily workflows"].map(
                (rule) => (
                  <Card key={rule}>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground leading-relaxed">{rule}</p>
                    </CardContent>
                  </Card>
                ),
              )}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Team Enablement</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" /> Leading balanced adoption
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  On mixed-experience teams I introduce the CLI through scripts that solve real problems, paired with GUI walkthroughs that explain the same workflow. Documentation calls out the advantages of both so teammates build confidence rather than allegiance.
                </p>
              </CardContent>
            </Card>
          </section>

          <footer className="border-t pt-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

type MeritListProps = {
  title: string
  items: string[]
  variant?: "merit" | "demerit"
}

function MeritList({ title, items, variant = "merit" }: MeritListProps) {
  const isDemerit = variant === "demerit"
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className={isDemerit ? "text-red-600 dark:text-red-400" : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ArrowLeftIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}

