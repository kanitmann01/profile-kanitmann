import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ProjectCard } from "@/components/project-card"
import { groupProjectsByPeriod } from "@/data/projects"
import type { Metadata } from "next"

export default function Projects() {
  const projectGroups = groupProjectsByPeriod()

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dives into projects that showcase technical expertise, problem-solving approach, and business impact
            </p>
          </div>
        </FadeIn>

        <div className="space-y-16">
          {projectGroups.map((group) => (
            <div key={group.period} className="space-y-6">
              <FadeIn>
                <div className="text-left">
                  <h2 className="text-3xl font-semibold text-foreground">{group.period}</h2>
                </div>
              </FadeIn>
              <StaggerContainer className="grid md:grid-cols-2 gap-8">
                {group.projects.map((project) => (
                  <StaggerItem key={project.title}>
                    <ProjectCard project={project} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Projects - Kanit Mann",
  description: "Featured projects by Kanit Mann showcasing AI, ML, and data-driven applications.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects - Kanit Mann",
    description: "Featured projects by Kanit Mann showcasing AI, ML, and data-driven applications.",
    url: "https://kanit.codes/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Kanit Mann",
    description: "Featured projects by Kanit Mann showcasing AI, ML, and data-driven applications.",
  },
}
