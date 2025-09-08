"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, FileText, Layers, LineChart } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import Head from "next/head"
import Script from "next/script"

export default function CCRBAllegationsAnalysis() {
  const publishedDate = "September 8, 2025"
  const readTime = "7 min read"

  const tags = [
    "Data Analysis",
    "CCRB",
    "NYC",
    "Accountability",
    "Python",
    "Pandas",
    "Visualization",
  ]

  const weeklyReports = [
    {
      week: 1,
      title: "Week 1 — Baseline Exploration and Data Familiarization",
      date: "September 8, 2025",
      pdfPath: "/CCRB%20Allegations%20Analysis.pdf",
      summary:
        "Initial sweep across complaint categories, officer counts, temporal trends, and borough-level patterns, establishing a baseline for deeper analysis.",
    },
  ]

  return (
    <>
      <Head>
        <title>CCRB Allegations Analysis (Ongoing)</title>
        <meta
          name="description"
          content="An ongoing, multi-week analysis of CCRB allegations data. Week 1 establishes the baseline: data familiarization, preliminary trends, and a working roadmap."
        />
        <meta
          name="keywords"
          content="CCRB, NYPD, NYC, police accountability, data analysis, pandas, Python, visualization"
        />
        <meta name="author" content="Kanit Mann" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="CCRB Allegations Analysis (Ongoing)" />
        <meta
          property="og:description"
          content="An ongoing, multi-week analysis of CCRB allegations data. Week 1 establishes the baseline: data familiarization, preliminary trends, and a working roadmap."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://kanit.codes/articles/ccrb-allegations-analysis" />
        <meta property="og:image" content="https://kanit.codes/placeholder.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CCRB Allegations Analysis (Ongoing)" />
        <meta
          name="twitter:description"
          content="An ongoing, multi-week analysis of CCRB allegations data. Week 1 establishes the baseline: data familiarization, preliminary trends, and a working roadmap."
        />
        <meta name="twitter:image" content="https://kanit.codes/placeholder.jpg" />
        <link rel="canonical" href="https://kanit.codes/articles/ccrb-allegations-analysis" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "CCRB Allegations Analysis (Ongoing)",
              description:
                "An ongoing, multi-week analysis of CCRB allegations data. Week 1 establishes the baseline: data familiarization, preliminary trends, and a working roadmap.",
              image: "https://kanit.codes/placeholder.jpg",
              author: { "@type": "Person", name: "Kanit Mann" },
              publisher: {
                "@type": "Organization",
                name: "Kanit Mann Portfolio",
                logo: { "@type": "ImageObject", url: "https://kanit.codes/images/profile/kanit-mann.png" },
              },
              datePublished: "2025-09-08",
              dateModified: "2025-09-08",
              mainEntityOfPage: { "@type": "WebPage", "@id": "https://kanit.codes/articles/ccrb-allegations-analysis" },
              keywords:
                "CCRB, NYPD, NYC, police accountability, data analysis, pandas, Python, visualization",
            }),
          }}
        />
      </Head>

      {/* Breadcrumb JSON-LD */}
      <Script id="ld-breadcrumb-article-ccrb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Articles", item: "https://kanit.codes/articles" },
            {
              "@type": "ListItem",
              position: 3,
              name: "CCRB Allegations Analysis (Ongoing)",
              item: "https://kanit.codes/articles/ccrb-allegations-analysis",
            },
          ],
        })}
      </Script>

      <div className="min-h-screen bg-background py-8 px-2 sm:py-12 sm:px-6">
        <div className="container mx-auto max-w-4xl w-full">
          {/* Header */}
          <FadeIn className="mb-16">
            <header>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <time dateTime="2025-09-08">{publishedDate}</time>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
                CCRB Allegations Analysis (Ongoing)
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                A multi-week exploration of CCRB allegations data. This first week focuses on establishing a baseline,
                exploring structure, and sketching the roadmap for deeper questions.
              </p>
            </header>
          </FadeIn>

          {/* Overview / Goals */}
          <section className="mb-16">
            <SlideIn direction="left">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <FileText className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Week 1 Focus</h3>
                        <p className="text-muted-foreground">
                          Data familiarization, cleaning notes, and initial descriptive visual checks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Layers className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Dimensions Explored</h3>
                        <p className="text-muted-foreground">
                          Complaint categories, officers, time trends, borough-level patterns.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <LineChart className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Next Steps</h3>
                        <p className="text-muted-foreground">
                          Normalization, officer-level cohorts, allegation types × outcomes, borough cohorts.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SlideIn>
          </section>

          {/* Embedded PDF (Week 1) */}
          <section className="mb-16">
            <FadeIn>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Week 1 Report (PDF)</h2>
              <p className="text-muted-foreground mb-4">
                Embedded below. You can also download it to view offline.
              </p>
              <div className="mb-4">
                <Button asChild>
                  <a href={weeklyReports[0].pdfPath} target="_blank" rel="noopener noreferrer" download>
                    Download Week 1 PDF
                  </a>
                </Button>
              </div>
              <div className="w-full aspect-[4/3] bg-muted/30 rounded-lg border overflow-hidden">
                <object
                  data={weeklyReports[0].pdfPath}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <p className="p-4 text-muted-foreground">
                    Your browser cannot display PDFs. Please
                    <a href={weeklyReports[0].pdfPath} className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">download the file</a>.
                  </p>
                </object>
              </div>
            </FadeIn>
          </section>

          {/* Weekly Updates List (expandable in future weeks) */}
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Weekly Reports</h2>
            <div className="grid gap-4">
              {weeklyReports.map((w) => (
                <Card key={w.week} className="border-dashed">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{w.title}</h3>
                        <p className="text-sm text-muted-foreground">{w.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Week {w.week}</Badge>
                        <Button size="sm" variant="outline" asChild>
                          <a href={w.pdfPath} target="_blank" rel="noopener noreferrer">
                            View PDF
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Footer: tags */}
          <footer className="border-t pt-8">
            <div>
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


