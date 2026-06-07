import { RelatedProjects } from "@/components/related-projects"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"
import Link from "next/link"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import { projectContent } from "@/data/project-content"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  return {
    title: `${project.title} - Project | Kanit Mann`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} - Project | Kanit Mann`,
      description: project.description,
      url: `https://kanit.codes/projects/${slug}`,
      images: [
        { url: `https://kanit.codes${project.image}` }
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - Project | Kanit Mann`,
      description: project.description,
      images: [`https://kanit.codes${project.image}`],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const ContentComponent = projectContent[slug]

  if (!ContentComponent) {
    notFound()
  }

  const techStack = project.tags

  return (
    <div className="min-h-screen bg-background">
      <Script id={`ld-breadcrumb-${slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://kanit.codes/" },
            { "@type": "ListItem", position: 2, name: "Projects", item: "https://kanit.codes/projects" },
            {
              "@type": "ListItem",
              position: 3,
              name: project.title,
              item: `https://kanit.codes/projects/${slug}`,
            },
          ],
        })}
      </Script>

      <div className="relative w-full min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={`${project.title} Dashboard`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="relative z-10 w-full px-6 pb-16 pt-24">
          <div className="mx-auto max-w-[680px]">
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed max-w-[580px]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-sans hover:opacity-90 transition-opacity"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-md text-sm font-sans text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[680px] px-6 py-20">
        <div className="mb-16">
          <div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
            {techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 border border-primary/30 text-primary rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <ContentComponent />

        <RelatedProjects
          currentProject={project}
          allProjects={projects}
        />
      </div>
    </div>
  )
}
