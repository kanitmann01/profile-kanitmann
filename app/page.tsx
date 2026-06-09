import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"
import { ProjectCard } from "@/components/project-card"
import { Hero } from "@/components/hero"
import { ScrollProgress } from "@/components/scroll-progress"
import { BentoExperienceCard } from "@/components/bento-experience-card"
import { BentoTechStackCard } from "@/components/bento-tech-stack-card"
import { BentoGitHubCard } from "@/components/bento-github-card"
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

      {/* Bento Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <BentoExperienceCard experiences={experiences} />
            <BentoTechStackCard />
            <BentoGitHubCard />
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
