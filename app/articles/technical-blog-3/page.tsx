import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Cog, Keyboard, MousePointer2, Wrench } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"

import { getArticleBySlug } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"
const article = getArticleBySlug("technical-blog-3")
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

export default function TechnicalBlog3() {
  return (
    <>
      <Script id="ld-article-tech-blog-3" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id="ld-breadcrumb-article-tech-blog-3" type="application/ld+json" strategy="afterInteractive">
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
                  Back in 2023 I was issued a corporate laptop with "setting locked" controls. The trackpad and mouse were painfully slow, and every Windows update reset whatever the IT team fixed. After enough tickets, I gave up on the pointing devices and leaned on keyboard shortcuts—an interesting experiment, but not efficient inside a GUI-first OS.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  A tip from Reddit pointed me toward the Windows Registry. If the UI is blocked but Registry access is available, you can edit the same settings at the source. The key for mouse speed lives at <code>HKEY_CURRENT_USER\Control Panel\Mouse</code>. One tweak and a reboot later, my pointer moved at human speed again.
                </p>
              </div>
            </SlideIn>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Registry Hack in Practice</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: MousePointer2,
                  title: "Find the Bottleneck",
                  text: "Identify which OS feature feels broken. In my case, the pointer speed slider was disabled by policy.",
                },
                {
                  icon: Keyboard,
                  title: "Locate the Key",
                  text: "Search Microsoft docs or community posts for the registry path. Mouse speed maps to the `MouseSensitivity` value.",
                },
                {
                  icon: Wrench,
                  title: "Automate It",
                  text: "Create a `.reg` script or PowerShell snippet to reapply the change after every update. Automation beats annoyance.",
                },
              ].map((item, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <item.icon className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">What the Registry Taught Me</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Cog className="h-5 w-5 text-primary" /> Systems empathy matters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Locked-down environments aren’t malicious—they protect credentials and compliance. Understanding the rationale helps when searching for sanctioned workarounds.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wrench className="h-5 w-5 text-primary" /> Document the fix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Every registry tweak lives in a version-controlled snippets folder. When Windows resets a policy, reapplying the `.reg` file takes seconds.
                  </p>
                </CardContent>
              </Card>
            </div>
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

