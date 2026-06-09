import { type Project } from "@/data/projects"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { LinkChip } from "@/components/link-chip"
import { ArrowRight } from "lucide-react"

interface RelatedProjectsProps {
  currentProject: Project
  allProjects: Project[]
}

export function RelatedProjects({ currentProject, allProjects }: RelatedProjectsProps) {
  const relatedProjects = allProjects
    .filter((p) => p.slug !== currentProject.slug)
    .map((project) => {
      const sharedTags = project.tags.filter((tag) => currentProject.tags.includes(tag))
      return { project, sharedTags: sharedTags.length }
    })
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) {
        return b.sharedTags - a.sharedTags
      }
      return b.project.order - a.project.order
    })
    .slice(0, 3)
    .map(({ project }) => project)

  if (relatedProjects.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-foreground mb-8">Related Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedProjects.map((project) => (
          <Link key={project.slug} href={project.href} className="group">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="relative h-32 overflow-hidden rounded-t-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
                  {project.title}
                  <LinkChip path={project.href} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-primary font-medium">
                  View Project <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
