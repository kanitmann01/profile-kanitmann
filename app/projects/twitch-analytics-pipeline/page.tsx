import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RelatedProjects } from "@/components/related-projects"
import { ArrowLeft, Database, Github, ExternalLink, Radio, Server, BarChart3, Zap } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"
import Link from "next/link"
import { projects } from "@/data/projects"

export default function TwitchAnalyticsPipeline() {
  const techStack = [
    "Python",
    "Apache Kafka",
    "Snowflake",
    "dbt",
    "Looker Studio",
    "ELT",
  ]

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      {/* Breadcrumb JSON-LD */}
      <Script id="ld-breadcrumb-twitch-analytics" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Projects", item: "https://kanit.codes/projects" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Real-Time Twitch Analytics Pipeline",
              item: "https://kanit.codes/projects/twitch-analytics-pipeline",
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
          <h1 className="text-5xl font-bold text-foreground mb-4">Real-Time Twitch Analytics Pipeline</h1>
          <p className="text-xl text-muted-foreground mb-8">
            End-to-end ELT streaming pipeline that ingests real-time Twitch viewership data through Apache Kafka, warehouses in Snowflake, and transforms with dbt for Looker Studio dashboards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/kanitmann01/twitch_stat_board"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
            <Button size="lg" asChild>
              <a
                href="https://lookerstudio.google.com/s/jyb_uKEUcmo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Looker Studio Dashboard
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
            src="/images/case-studies/twitch-analytics.png"
            alt="Twitch Analytics Pipeline Architecture"
            width={1600}
            height={900}
            className="w-full rounded-lg shadow-lg mb-8"
            priority
          />
        </div>

        {/* Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Architecture</h2>
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <p className="text-lg font-mono text-center">
              Twitch API → Python Producer → Apache Kafka → Snowflake (Raw) → dbt (Transformation) → Looker Studio
            </p>
          </div>
          <p className="text-muted-foreground">
            This pipeline demonstrates a modern data stack architecture capable of handling real-time data ingestion, cloud warehousing, and automated transformation. The system monitors live streams for Age of Empires II, processing events through Apache Kafka, loading them into Snowflake via a custom Python consumer, and transforming the raw JSON data using dbt for analytics.
          </p>
        </section>

        {/* Pipeline Stages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Pipeline Stages</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <Radio className="h-8 w-8 text-primary mb-2" />
                <CardTitle>1. Ingestion (Producer)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Python script polls Twitch API every 60 seconds for live Age of Empires II streams. Extracts metadata (streamer_name, viewer_count, started_at, language), serializes to JSON, and pushes to Kafka topic.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Server className="h-8 w-8 text-primary mb-2" />
                <CardTitle>2. Storage (Consumer)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Python consumer listens to Kafka topic, batches messages for efficiency, and loads raw JSON directly into Snowflake VARIANT column (RAW_DATA) in the STREAM_LOGS table.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Database className="h-8 w-8 text-primary mb-2" />
                <CardTitle>3. Transformation (dbt)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  dbt models clean and normalize data. Parses JSON fields into structured columns, calculates stream duration, and filters out streams with 0 viewers to prevent visualization skew.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Key Features</h2>
          <div className="bg-muted/30 rounded-lg p-8 space-y-6">
            <div className="flex gap-4">
              <Zap className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Real-Time Processing</h3>
                <p className="text-muted-foreground leading-relaxed">
                  60-second polling interval with Kafka buffering ensures near real-time data availability while handling API rate limits and network variability.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Database className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Schema-on-Read with VARIANT</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Raw JSON stored in Snowflake VARIANT column allows flexible schema evolution without pipeline changes. dbt handles transformation logic separately.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <BarChart3 className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Automated Visualization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Looker Studio dashboard automatically reflects transformed data, showing concurrent viewers, top streamers by popularity, and peak viewership metrics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Details */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Technology Stack</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950/30 dark:border-blue-900">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Source: Twitch API (Helix)</h3>
              <p className="text-blue-800 dark:text-blue-200">
                Official Twitch API providing real-time stream metadata for Age of Empires II category.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 dark:bg-emerald-950/30 dark:border-emerald-900">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">Streaming: Apache Kafka (Confluent Cloud)</h3>
              <p className="text-emerald-800 dark:text-emerald-200">
                Managed Kafka service handling message buffering, partitioning, and consumer group management with free tier support.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 dark:bg-purple-950/30 dark:border-purple-900">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Warehouse: Snowflake (Standard Edition)</h3>
              <p className="text-purple-800 dark:text-purple-200">
                Cloud data warehouse with VARIANT column support for semi-structured data, automatic scaling, and separation of storage and compute.
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 dark:bg-orange-950/30 dark:border-orange-900">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Transformation: dbt (data build tool)</h3>
              <p className="text-orange-800 dark:text-orange-200">
                SQL-based transformation framework with testing, documentation, and lineage tracking. Models parse JSON and calculate derived metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Dashboard Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Concurrent Viewers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Real-time viewer count across all tracked streams, updated every 60 seconds.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Streamers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ranked list of streamers by current viewership, showing audience distribution.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Peak Viewership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Historical maximum viewer counts with timestamps for trend analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Future Improvements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Future Enhancements</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-950/30 dark:border-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Containerization & Orchestration</h3>
              <p className="text-gray-800 dark:text-gray-200">
                Dockerize producer and consumer scripts, schedule dbt runs with Apache Airflow for production-grade orchestration.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-950/30 dark:border-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Alerting System</h3>
              <p className="text-gray-800 dark:text-gray-200">
                Slack notifications when viewership spikes (e.g., {">"} 10k viewers) for real-time monitoring.
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 dark:bg-gray-950/30 dark:border-gray-900">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">CI/CD Pipeline</h3>
              <p className="text-gray-800 dark:text-gray-200">
                Automate dbt testing on GitHub merge, ensuring data quality and model reliability before deployment.
              </p>
            </div>
          </div>
        </section>

        <RelatedProjects 
          currentProject={projects.find(p => p.slug === "twitch-analytics-pipeline")!} 
          allProjects={projects} 
        />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Real-Time Twitch Analytics Pipeline | Kanit Mann",
  description:
    "End-to-end ELT streaming pipeline ingesting real-time Twitch viewership data through Apache Kafka, Snowflake, and dbt for Looker Studio dashboards.",
  alternates: { canonical: "/projects/twitch-analytics-pipeline" },
  openGraph: {
    title: "Real-Time Twitch Analytics Pipeline | Kanit Mann",
    description:
      "End-to-end ELT streaming pipeline ingesting real-time Twitch viewership data through Apache Kafka, Snowflake, and dbt for Looker Studio dashboards.",
    url: "https://kanit.codes/projects/twitch-analytics-pipeline",
    images: [{ url: "https://kanit.codes/images/case-studies/twitch-analytics.png" }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Twitch Analytics Pipeline | Kanit Mann",
    description:
      "End-to-end ELT streaming pipeline ingesting real-time Twitch viewership data through Apache Kafka, Snowflake, and dbt for Looker Studio dashboards.",
    images: ["https://kanit.codes/images/case-studies/twitch-analytics.png"],
  },
}
