import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BentoCardLift } from "@/components/animations/bento-card-lift";
import { FadeIn } from "@/components/animations/fade-in";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/stagger-container";
import { ScaleOnHover } from "@/components/animations/scale-on-hover";
import { VelocitySkew } from "@/components/animations/velocity-skew";
import { ProjectCard } from "@/components/project-card";
import { Hero } from "@/components/hero";
import { HeroStatsStrip } from "@/components/hero-stats-strip";
import { ScrollProgress } from "@/components/scroll-progress";
import { BentoExperienceCard } from "@/components/bento-experience-card";
import { BentoTechStackCard } from "@/components/bento-tech-stack-card";
import { BentoGitHubCard } from "@/components/bento-github-card";
import { homeExperiences } from "@/data/experiences";
import { featuredProjects as highlightedProjects } from "@/data/projects";
import { articles } from "@/data/articles";
import { getSiteUrl } from "@/lib/site";

export default function Home() {
  const siteUrl = getSiteUrl();
  const experiences = homeExperiences;

  const featuredProjects = highlightedProjects;

  const featuredArticles = articles
    .filter((article) => article.featuredOnHome)
    .map((article) => ({
      title: article.title,
      description: article.summary,
      readTime: article.readTime,
      href: article.canonicalPath,
    }));

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Hero />
      <HeroStatsStrip />

      {/* Bento Grid */}
      <section id="experience" className="scroll-mt-20 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Experience is the primary recruiter signal: spans 2×2 on
                desktop (fills the 6-cell grid with the two 1-col tiles),
                full-width first on mobile. The wrapper is a 1×1 grid so the
                card stretches to fill its tall span without gaps. */}
            <BentoCardLift className="md:grid md:grid-cols-[1fr] md:grid-rows-[1fr] md:col-span-2 md:row-span-2 hover:shadow-lg transition-shadow">
              <BentoExperienceCard experiences={experiences} />
            </BentoCardLift>
            <BentoCardLift className="md:grid md:grid-cols-[1fr] md:grid-rows-[1fr] md:col-span-1 hover:shadow-lg transition-shadow">
              <BentoTechStackCard />
            </BentoCardLift>
            <BentoCardLift className="md:grid md:grid-cols-[1fr] md:grid-rows-[1fr] md:col-span-1 hover:shadow-lg transition-shadow">
              {/* Wave B: the GitHub card awaits api.github.com — without a
                  cache on OpenNext that blocks every home request. Streaming
                  it in a Suspense boundary keeps the shell TTFB fast and the
                  card pops in when the fetch resolves. */}
              <Suspense
                fallback={
                  <div
                    className="rounded-xl border border-border bg-card p-6 shadow-sm animate-pulse"
                    aria-label="Loading GitHub stats"
                  >
                    <div className="h-5 w-24 bg-muted rounded mb-6" />
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-muted" />
                      <div className="h-4 w-56 bg-muted rounded" />
                      <div className="h-3 w-40 bg-muted rounded" />
                    </div>
                  </div>
                }
              >
                <BentoGitHubCard />
              </Suspense>
            </BentoCardLift>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="scroll-mt-20 py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <VelocitySkew className="font-serif text-4xl text-foreground mb-4">
                Featured <em className="font-serif-italic">Projects</em>
              </VelocitySkew>
              <p className="text-lg text-muted-foreground">
                Deep dives into projects that showcase technical expertise and
                business impact
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
      <section id="articles" className="scroll-mt-20 py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <VelocitySkew className="font-serif text-4xl text-foreground mb-4">
                Featured <em className="font-serif-italic">Articles</em>
              </VelocitySkew>
              <p className="text-lg text-muted-foreground">
                Insights and analysis on data science, technology, and
                innovation
              </p>
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
                          <CardTitle className="text-xl mb-2">
                            {article.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {article.description}
                          </CardDescription>
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
            name: "Kanit Mann",
            jobTitle: "Data, ML & AI Engineer",
            description:
              "Data, ML & AI Engineer with an MS in Data Science from the University of Arizona — pipelines, ML systems, and analytics built end-to-end.",
            url: siteUrl,
            image: `${siteUrl}/images/profile/kanit-mann.png`,
            email: "mannkanit@gmail.com",
            sameAs: ["https://github.com/kanitmann01"],
            knowsAbout: [
              "Data Science",
              "Machine Learning",
              "Python",
              "GCP",
              "Cloud Infrastructure",
              "Statistical Analysis",
              "Data Visualization",
            ],
            alumniOf: {
              "@type": "Organization",
              name: "University of Arizona",
            },
          }),
        }}
      />
    </div>
  );
}
