import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { CompactExperienceTimeline } from "@/components/experience-timeline"
import { ProjectCard } from "@/components/project-card"
import { Hero } from "@/components/hero"
import { TactileButton } from "@/components/tactile-button"
import { ScrollProgress } from "@/components/scroll-progress"
import { homeExperiences } from "@/data/experiences"
import { featuredProjects as highlightedProjects } from "@/data/projects"
import { articles } from "@/data/articles"

export default function Home() {
  const experiences = homeExperiences

  const featuredProjects = highlightedProjects

  const featuredArticles = articles
    .filter((article) => article.featuredOnHome)
    .map((article) => ({
      title: article.title,
      description: article.summary,
      readTime: article.readTime,
      href: article.canonicalPath,
    }))

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Hero />

      {/* Currently Seeking */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="border border-primary/20 rounded-lg p-8 md:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
                Currently Seeking
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
                Summer 2026 Opportunities
              </h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                Data &amp; ML Engineer graduating May 2026. Looking for full-time roles in data engineering,
                analytics, and machine learning. Ex-Ericsson with experience in cloud infrastructure,
                ML pipelines, and cross-functional leadership.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Python", "SQL", "Machine Learning", "Apache Spark", "GCP", "Docker", "Data Pipelines", "Snowflake"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="font-mono text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <TactileButton size="lg" asChild>
                  <Link href="/contact">Hire Me</Link>
                </TactileButton>
                <TactileButton size="lg" variant="outline" asChild>
                  <Link href="/projects">View My Work</Link>
                </TactileButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Professional Experience</h2>
              <p className="text-lg text-muted-foreground">
                My journey through various roles and companies, building expertise in cloud infrastructure and leadership
              </p>
            </div>
          </FadeIn>

          <div className="bg-muted/30 rounded-lg p-8">
            <CompactExperienceTimeline experiences={experiences} />
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href="/about">
                  View Full Experience <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
              <p className="text-lg text-muted-foreground">
                Deep dives into projects that showcase technical expertise and business impact
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((study, index) => (
              <StaggerItem key={index}>
                <ProjectCard project={study} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Featured Articles</h2>
              <p className="text-lg text-muted-foreground">Insights and analysis on data science, technology, and innovation</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-6">
            {featuredArticles.map((article, index) => (
              <StaggerItem key={index}>
                <ScaleOnHover>
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                          <CardDescription className="text-base">{article.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{article.readTime}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button asChild>
                        <Link href={article.href}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kanit Mann",
            "jobTitle": "Data & ML Engineer",
            "description": "Building intelligent applications from data and cloud. Data Science MS student with expertise in statistical analysis, machine learning, and data visualization.",
            "url": "https://kanit.codes",
            "image": "https://kanit.codes/images/profile/kanit-mann.png",
            "email": "kanitmann01@gmail.com",
            "sameAs": [
              "https://github.com/kanitmann01",
              "https://linkedin.com/in/kanitmann"
            ],
            "knowsAbout": [
              "Data Science",
              "Machine Learning",
              "Python",
              "GCP",
              "Cloud Infrastructure",
              "Statistical Analysis",
              "Data Visualization"
            ],
            "alumniOf": {
              "@type": "Organization",
              "name": "University of Arizona"
            }
          })
        }}
      />
    </div>
  )
}
