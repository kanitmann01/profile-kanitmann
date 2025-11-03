import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, ShieldAlert, Cpu, Wrench } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import Link from "next/link"
import Script from "next/script"
import type { Metadata } from "next"

import { getArticleBySlug } from "@/data/articles"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kanit.codes"
const article = getArticleBySlug("bios-issues-ubuntu")
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

export default function BiosIssuesUbuntuArticle() {
  return (
    <>
      <Script id="ld-article-bios" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id="ld-breadcrumb-article-bios" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="gap-2">
              <Link href="/articles">
                <ArrowLeft className="h-4 w-4" />
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
            <article>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed mb-6">
                  Every week, I try to learn something new in the tech space and share my perspective. This week I explored the Ubuntu Community Discourse and was drawn to a post titled
                  <a
                    href="https://discourse.ubuntu.com/t/issues-with-motherboard-bios-issues-appearing-on-ubuntu/66303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline ml-1"
                  >
                    "Issues with motherboard BIOS issues appearing on Ubuntu"
                  </a>
                  . The original poster described a frustrating experience on a new ASRock motherboard: stuck in manufacturing mode, hardware security checks failing, and kernel update attempts introducing “bad shim signature” errors, even after OS reinstalls and firmware updates.
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  What made the discussion fascinating (and a bit daunting) is how quickly troubleshooting becomes layered when hardware, firmware, and the OS intersect. Suggestions spanned UEFI and Secure Boot toggles, vendor firmware tools, and the Linux Vendor Firmware Service (LVFS). It was a reminder that progress often requires patience, methodical testing, and sometimes imperfect workarounds, like disabling Secure Boot temporarily or reverting kernels.
                </p>
              </div>
            </article>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Why BIOS + Ubuntu Gets Tricky</h2>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldAlert,
                  title: "Secure Boot & Shim",
                  text: "Signature verification can break boot flows when firmware, shim, or kernels get out of sync.",
                },
                {
                  icon: Cpu,
                  title: "Vendor Firmware",
                  text: "Motherboard tools and LVFS coexist; ordering and versions matter more than we think.",
                },
                {
                  icon: Wrench,
                  title: "UEFI Settings",
                  text: "Manufacturing mode, TPM, and PK/KEK/DB entries can create failure modes that look like OS bugs.",
                },
              ].map((item, idx) => (
                <StaggerItem key={idx}>
                  <ScaleOnHover>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <item.icon className="h-6 w-6 text-primary mt-1" />
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                            <p className="text-muted-foreground">{item.text}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>

          <section className="mb-16">
            <SlideIn direction="left">
              <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-6">
                <h2 className="text-xl font-semibold text-primary mb-3">Practical Checklist</h2>
                <ol className="list-decimal space-y-3 pl-6 text-muted-foreground">
                  <li>Document current firmware versions before making changes.</li>
                  <li>Test Secure Boot toggles and re-enroll keys only after confirming firmware updates succeed.</li>
                  <li>Use LVFS for vendor-approved updates but validate against motherboard utilities.</li>
                  <li>Keep a known-good kernel around. Boot it if a new kernel triggers shim errors.</li>
                  <li>Lean on community logs—dmesg, journalctl, and fwupdmgr output often hint at the root cause.</li>
                </ol>
              </div>
            </SlideIn>
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

