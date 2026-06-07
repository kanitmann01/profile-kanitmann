import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RelatedProjects } from "@/components/related-projects"
import { SocialShare } from "@/components/social-share"
import { ArrowLeft, Database, Github, Layers, BarChart3, Droplets, Building2, GraduationCap } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"
import Link from "next/link"
import { projects } from "@/data/projects"

export default function UnifiedBharat() {
  const techStack = [
    "Python",
    "Apache Spark",
    "Apache Iceberg",
    "Docker",
    "PySpark",
    "MinIO",
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      {/* Breadcrumb JSON-LD */}
      <Script id="ld-breadcrumb-unified-bharat" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Projects", item: "https://kanit.codes/projects" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse",
              item: "https://kanit.codes/projects/unified-bharat",
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
          <h1 className="text-5xl font-bold text-foreground mb-4">Unified Bharat: Cross-Sector Policy Analytics Lakehouse</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Medallion Architecture for State-Level CSR, Groundwater & Institutional Data Integration
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/kanitmann01/unified-bharat"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
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
          <div className="mt-6 flex justify-center">
            <SocialShare 
              title="Unified Bharat: Cross-Sector Policy Analytics Lakehouse"
              description="Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis."
              url="https://kanit.codes/projects/unified-bharat"
            />
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="mb-16">
          <Image
            src="/images/case-studies/unified-bharat.png"
            alt="Unified Bharat Lakehouse Architecture"
            width={1600}
            height={900}
            className="w-full rounded-lg shadow-lg mb-8"
            priority
          />
        </div>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Architecture</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Bronze Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Raw data ingestion from 5 government sources: CSR spending, groundwater quality, educational institutions, LGD master codes, and population estimates. 245K+ rows preserved in original format.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Layers className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Silver Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Data cleaning, standardization, and aggregation. State-year level consolidation with quality filtering, reducing to ~1,500 rows across 4 tables.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Gold Layer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unified panel dataset with ~300 rows combining CSR, groundwater, and institutional metrics. Includes derived features like lagged CSR and per-capita normalizations.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Data Sources</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">CSR Spending (28,834 rows)</h3>
              </div>
              <p className="text-muted-foreground">
                Ministry of Corporate Affairs data on Corporate Social Responsibility expenditure at district-year granularity. Tracks INR Crores and development sectors.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Groundwater Quality (188,209 rows)</h3>
              </div>
              <p className="text-muted-foreground">
                Ministry of Jal Shakti station-level measurements including chemical parameters: Hardness, pH, Nitrate, Fluoride. Used to calculate contamination index (0-4 scale).
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Educational Institutions (2,141 rows)</h3>
              </div>
              <p className="text-muted-foreground">
                Ministry of Education data on approved intake and institution counts by state and institution type, tracking educational capacity over time.
              </p>
            </div>
          </div>
        </section>

        {/* Key Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Results</h2>
          <div className="bg-muted/30 rounded-lg p-8 space-y-6">
            <div className="flex gap-4">
              <BarChart3 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Data Reduction: 99.88%</h3>
                <p className="text-muted-foreground leading-relaxed">
                  From 245K+ raw rows to ~300 unified panel rows through intentional aggregation and quality filtering, creating a clean dataset for rigorous analysis.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Layers className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Random Forest Outperforms OLS</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Panel regression comparing OLS, Random Forest, and XGBoost models. Random Forest achieved best generalization (RMSE 0.811 on 5-fold CV), suggesting non-linear relationships between CSR and environmental outcomes.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Droplets className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Feature Importance Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Number of monitoring stations (51%) and lagged CSR spending (21%) emerged as top predictors of contamination index, with institutional capacity contributing 18.8%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Question */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Research Question</h2>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <p className="text-lg text-foreground italic">
              "Does subsequent improvement in groundwater quality associate with state-level CSR spending?"
            </p>
            <p className="text-muted-foreground mt-4">
              Using two-way fixed effects regression with state and year fixed effects to control for time-invariant state characteristics and common temporal trends.
            </p>
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Technical Implementation</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/30 dark:border-blue-900">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Distributed Processing with Apache Spark</h3>
              <p className="text-blue-800 dark:text-blue-200">
                PySpark for distributed data transformation across Bronze → Silver → Gold layers, handling 245K+ rows efficiently with partitioned operations.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 dark:bg-emerald-950/30 dark:border-emerald-900">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Lakehouse with Apache Iceberg</h3>
              <p className="text-emerald-800 dark:text-emerald-200">
                ACID transactions, schema evolution, and time travel capabilities on MinIO S3 storage. Enables reproducible analytics and audit trails.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 dark:bg-purple-950/30 dark:border-purple-900">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Docker Compose Infrastructure</h3>
              <p className="text-purple-800 dark:text-purple-200">
                Local development environment with MinIO (S3-compatible storage) and Spark + Jupyter for interactive development and visualization.
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Future Enhancements</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-950/30 dark:border-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Additional Data Sources</h3>
              <p className="text-gray-800 dark:text-gray-200">
                Integrate health outcomes, infrastructure development, and economic indicators to build a more comprehensive policy impact model.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-950/30 dark:border-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Causal Inference Methods</h3>
              <p className="text-gray-800 dark:text-gray-200">
                Apply difference-in-differences and instrumental variables approaches to strengthen causal claims beyond correlation.
              </p>
            </div>
          </div>
        </section>

        <RelatedProjects 
          currentProject={projects.find(p => p.slug === "unified-bharat")!} 
          allProjects={projects} 
        />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse | Kanit Mann",
  description:
    "Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis.",
  alternates: { canonical: "/projects/unified-bharat" },
  openGraph: {
    title: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse | Kanit Mann",
    description:
      "Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis.",
    url: "https://kanit.codes/projects/unified-bharat",
    images: [{ url: "https://kanit.codes/images/case-studies/unified-bharat.png" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unified Bharat: Cross-Sector Policy Analytics Lakehouse | Kanit Mann",
    description:
      "Distributed Medallion Lakehouse integrating cross-ministry CSR, groundwater, and education datasets using Apache Spark and Iceberg for panel regression analysis.",
    images: ["https://kanit.codes/images/case-studies/unified-bharat.png"],
  },
}
