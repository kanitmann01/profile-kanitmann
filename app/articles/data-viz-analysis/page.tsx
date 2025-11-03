"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, FileText, Palette, Table2 } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import Head from "next/head"
import Link from "next/link"
import Script from "next/script"

import { PdfReportSection } from "@/components/pdf-report-section"

export default function DataVizPortfolioArticle() {
  const publishedDate = "November 3, 2025"
  const readTime = "6 min read"

  const tags = [
    "Data Visualization",
    "Storytelling",
    "Accessibility",
    "R",
    "Portfolio",
  ]

  const pdfPath = "/Data%20Viz%20Analysis.pdf"

  return (
    <>
      <Head>
        <title>Data Visualization Portfolio Reflection</title>
        <meta
          name="description"
          content="A guided tour through five portfolio visualizations demonstrating polish, communication, and analytical rigor in data storytelling."
        />
        <meta
          name="keywords"
          content="data visualization, portfolio, accessibility, storytelling, R, data presentation"
        />
        <meta name="author" content="Kanit Mann" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Data Visualization Portfolio Reflection" />
        <meta
          property="og:description"
          content="Five data visualizations that showcase growth in professional polish, narrative clarity, and design intentionality."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kanit.codes/articles/data-viz-analysis" />
        <meta property="og:image" content="https://kanit.codes/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Data Visualization Portfolio Reflection" />
        <meta
          name="twitter:description"
          content="Five data visualizations that showcase growth in professional polish, narrative clarity, and design intentionality."
        />
        <meta name="twitter:image" content="https://kanit.codes/placeholder.jpg" />
        <link rel="canonical" href="https://kanit.codes/articles/data-viz-analysis" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Data Visualization Portfolio Reflection",
              description:
                "Five data visualizations that showcase growth in professional polish, narrative clarity, and design intentionality.",
              image: "https://kanit.codes/placeholder.jpg",
              author: { "@type": "Person", name: "Kanit Mann" },
              publisher: {
                "@type": "Organization",
                name: "Kanit Mann Portfolio",
                logo: { "@type": "ImageObject", url: "https://kanit.codes/images/profile/kanit-mann.png" },
              },
              datePublished: "2025-11-03",
              dateModified: "2025-11-03",
              mainEntityOfPage: { "@type": "WebPage", "@id": "https://kanit.codes/articles/data-viz-analysis" },
              keywords: "data visualization, portfolio, accessibility, storytelling, R, data presentation",
            }),
          }}
        />
      </Head>

      <Script id="ld-breadcrumb-article-data-viz" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Articles", item: "https://kanit.codes/articles" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Data Visualization Portfolio Reflection",
              item: "https://kanit.codes/articles/data-viz-analysis",
            },
          ],
        })}
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
                <time dateTime="2025-11-03">{publishedDate}</time>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                Data Visualization Portfolio Reflection
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Five visualizations, one semester of growth. This portfolio captures how detailed feedback and intentional practice sharpened my approach to polish, accessibility, and narrative clarity in data storytelling.
              </p>
            </header>
          </FadeIn>

          <section className="mb-16">
            <SlideIn direction="left">
              <div className="bg-muted/30 rounded-lg p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">What Changed This Semester</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Early drafts exposed gaps in professional finish, data comprehension, and audience-friendly communication. Iterating on the same stories with sharper intent helped me transform recurring errors into deliberate design choices that would hold up in a client review.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: Table2,
                      title: "Professional Polish",
                      text: "Eliminated artifacts, aligned tables, and introduced column spanners for executives who expect clarity at a glance.",
                    },
                    {
                      icon: FileText,
                      title: "Narrative Captions",
                      text: "Shifted from process notes to punchy insights that foreground the story each chart tells.",
                    },
                    {
                      icon: Palette,
                      title: "Accessible Design",
                      text: "Adopted colorblind-friendly palettes, readable typography, and context-aware axes to build trust.",
                    },
                  ].map((item, idx) => (
                    <Card key={idx} className="border border-muted">
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
              </div>
            </SlideIn>
          </section>

          <section className="mb-16">
            <PdfReportSection
              title="Portfolio PDF"
              description="Browse the full six-page portfolio with embedded visuals, captions, and source notes."
              pdfUrl={pdfPath}
              downloadLabel="Download Portfolio"
            >
              The PDF captures final layouts, caption placement, and annotations. Every figure is built in R with
              reproducible code available at the end of the report.
            </PdfReportSection>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Visualization Highlights</h2>
            <div className="space-y-10">
              <VisualizationHighlight
                title="Visualization 1 — Executive-Ready Health Table"
                focus="Global Health Metrics Comparison"
                summary="A polished `gt` table compares life expectancy, infant mortality, and death rates for nine countries. Column spanners, aligned ranks, and color-coded performance finally match the expectations of an analyst briefing deck."
                takeaway="Professional formatting is not a finishing touch—it is how data earns trust."
              />
              <VisualizationHighlight
                title="Visualization 2 — COVID-19 Response Storyline"
                focus="Stacked line charts for New York, California, and Florida"
                summary="Overlaying daily cases with the Oxford stringency index reveals how policy tightened as infections surged. The stacked view keeps timelines aligned while faceting ensures each state’s curve remains readable."
                takeaway="Pairing outcomes with policy inputs helped audiences see causality, not just spikes."
              />
              <VisualizationHighlight
                title="Visualization 3 — Apollo Asteroid Origins"
                focus="Scatter plot of orbital inclination versus semimajor axis"
                summary="Color-coding eccentricity and annotating the Main Asteroid Belt transform a dense point cloud into a readable map of origin stories. Choosing a dark theme improved contrast for the plasma palette."
                takeaway="Context callouts, not just legends, explain why certain clusters matter."
              />
              <VisualizationHighlight
                title="Visualization 4 — Western Flora Flows"
                focus="Sankey diagram of plant families by state"
                summary="The flow diagram surfaces how families like Asteraceae dominate Arizona and California, while grasses remain ubiquitous. Rewriting the caption around regional preferences kept the story audience-friendly."
                takeaway="When distributions diverge, a flow chart can communicate imbalance better than bar charts."
              />
              <VisualizationHighlight
                title="Visualization 5 — Occupational Risk Facets"
                focus="Facetted line charts across four hazardous industries"
                summary="Breaking fatalities into top causes across time validates that “dangerous” is industry-specific—falls devastate construction, while violent acts dominate public safety roles."
                takeaway="Faceting reduces cognitive overload when comparing trends that operate on different scales."
              />
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Process Notes & Tooling</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Everything in the portfolio is reproducible in R. Packages such as <code>ggplot2</code>, <code>patchwork</code>,
              <code>gt</code>, and <code>ggsankey</code> handle rendering, while <code>janitor</code> and <code>dplyr</code> keep the data tidy. Automating
              color palettes with <code>RColorBrewer</code> and <code>viridis</code> prevents accessibility regressions during iteration.
            </p>
            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">Takeaway</h3>
              <p className="text-muted-foreground leading-relaxed">
                Iterating on the same story with different charts made trade-offs obvious: tables foreground rankings, sankeys expose distribution, and facetted lines surface pacing. The code appendix in the PDF doubles as a knowledge base for future dashboards.
              </p>
            </div>
          </section>

          <footer className="border-t pt-8">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
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
  return <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
}

type VisualizationHighlightProps = {
  title: string
  focus: string
  summary: string
  takeaway: string
}

function VisualizationHighlight({ title, focus, summary, takeaway }: VisualizationHighlightProps) {
  return (
    <StaggerContainer>
      <StaggerItem>
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">{focus}</p>
          <p className="text-muted-foreground leading-relaxed">{summary}</p>
          <div className="border-l-4 border-primary pl-4">
            <p className="text-foreground font-medium">Key takeaway: {takeaway}</p>
          </div>
        </div>
      </StaggerItem>
    </StaggerContainer>
  )
}

