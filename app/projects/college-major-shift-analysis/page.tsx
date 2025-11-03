import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PdfReportSection } from "@/components/pdf-report-section"
import { ArrowLeft, Database, Github, LineChart, TrendingUp, Users, Lightbulb } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"
import Link from "next/link"

export default function CollegeMajorShiftAnalysis() {
  const techStack = [
    "Python",
    "Pandas",
    "Seaborn",
    "Matplotlib",
    "IPUMS USA",
    "Data Storytelling",
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      {/* Breadcrumb JSON-LD */}
      <Script id="ld-breadcrumb-college-major-shift" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Projects", item: "https://kanit.codes/projects" },
            {
              "@type": "ListItem",
              position: 3,
              name: "College Major Selection & Shift Analysis",
              item: "https://kanit.codes/projects/college-major-shift-analysis",
            },
          ],
        })}
      </Script>

      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-4">College Major Selection & Shift Analysis</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Longitudinal look at how U.S. college majors changed from 2009–2023, linking shifts in student interest
            with wage dynamics using IPUMS USA microdata and weighted aggregation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/kanitmann01/college-major-shift-analysis"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
            <Button size="lg" asChild>
              <a
                href="https://github.com/kanitmann01/college-major-shift-analysis/blob/master/Analysis.ipynb"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                View Notebook
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mb-16">
          <Image
            src="/major-img.png"
            alt="College major shift analysis dashboard"
            width={1600}
            height={900}
            className="w-full rounded-lg shadow-lg mb-8"
            priority
          />
        </div>

        {/* Research Focus */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Research Focus</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Which majors gained and lost traction?</h3>
              <p className="text-muted-foreground">
                Ranked the top majors by graduate counts over time, highlighting growing domains like Computer Engineering
                and Psychology versus declines in General Business.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">Do wage signals precede popularity shifts?</h3>
              <p className="text-muted-foreground">
                Tracked median wages and wage growth to see how compensation correlates with enrollment changes,
                revealing strong alignment for high-growth technical majors.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">What broader socio-economic patterns emerge?</h3>
              <p className="text-muted-foreground">
                Connected trends to cultural and policy factors-e.g., psychology and biology growth alongside increased
                focus on healthcare and mental health services.
              </p>
            </div>
          </div>
        </section>

        {/* Data Pipeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Data Pipeline</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>IPUMS USA Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Filtered ACS microdata (2009–2024) for employed bachelor-degree holders with valid wages, respecting
                  IPUMS weighting guidance and omitting anomalous 2020 data.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Weighted Aggregation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Applied person-level weights (`PERWT`) to compute nationally representative graduate counts and
                  median wage benchmarks per major and year.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <LineChart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Visualization & Storytelling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Built time-series and slope charts with Seaborn/Matplotlib, layering annotations to narrate how
                  compensation, policy, and student preference intersect.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Insights</h2>
          <div className="bg-muted/30 rounded-lg p-8 space-y-6">
            <div className="flex gap-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">Wage growth and enrollment move in sync</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Computer Engineering majors enjoyed ~40% wage growth while adding thousands of graduates, suggesting
                  compensation remains a pivotal decision factor for STEM-bound students.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">Accounting’s durable appeal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Despite turbulence in other business tracks, Accounting expanded its graduate share by 16.6%, pairing
                  steady wage growth with resilient employer demand.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Lightbulb className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-semibold">Cultural shifts influence STEM vs. social sciences</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Psychology and Biology growth tracks broader interest in health, wellness, and public sector careers,
                  balancing out declines in generalist business programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Report */}
        <section className="mb-16">
          <PdfReportSection
            title="Full Analysis (PDF)"
            description="Detailed report containing methodology, visualizations, and policy takeaways. Mobile users can open or download using the buttons."
            pdfUrl="/Major%20Analysis.pdf"
            downloadLabel="Download Analysis PDF"
            downloadFileName="Major Analysis.pdf"
          />
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Next Steps</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/30 dark:border-blue-900">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Causal inference opportunities</h3>
              <p className="text-blue-800 dark:text-blue-200">
                Extend the analysis with lag models or difference-in-differences to better isolate whether wage changes
                precede enrollment shifts or follow demand signals.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 dark:bg-emerald-950/30 dark:border-emerald-900">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Equity deep dive</h3>
              <p className="text-emerald-800 dark:text-emerald-200">
                Segment by gender and race to surface representation gaps and ensure wage gains are equitably
                distributed across demographic cohorts.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 dark:bg-purple-950/30 dark:border-purple-900">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Program planning partnerships</h3>
              <p className="text-purple-800 dark:text-purple-200">
                Package recommendations for university leaders to align curriculum investments with verified demand,
                especially in high-growth engineering and health tracks.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "College Major Selection & Shift Analysis | Kanit Mann",
  description:
    "Longitudinal analysis of IPUMS USA microdata uncovering how wage growth influences U.S. college major popularity from 2009 to 2023.",
  alternates: { canonical: "/projects/college-major-shift-analysis" },
  openGraph: {
    title: "College Major Selection & Shift Analysis | Kanit Mann",
    description:
      "Longitudinal analysis of IPUMS USA microdata uncovering how wage growth influences U.S. college major popularity from 2009 to 2023.",
    url: "https://kanit.codes/projects/college-major-shift-analysis",
    images: [{ url: "https://kanit.codes/major-img.png" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "College Major Selection & Shift Analysis | Kanit Mann",
    description:
      "Longitudinal analysis of IPUMS USA microdata uncovering how wage growth influences U.S. college major popularity from 2009 to 2023.",
    images: ["https://kanit.codes/major-img.png"],
  },
}

