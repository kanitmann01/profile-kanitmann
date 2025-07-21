import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ScaleOnHover } from "@/components/animations/scale-on-hover"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    href: string
    github?: string
    demo?: string
    status?: string
    live?: boolean
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-green-500"
      case "In Progress":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <ScaleOnHover>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover" 
          />
          {/* Status badge */}
          {project.status && (
            <div className="absolute top-3 right-3">
              <Badge 
                className={`${getStatusBadgeColor(project.status)} bg-background/80 backdrop-blur-sm`}
              >
                {project.status}
              </Badge>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{project.title}</CardTitle>
          <CardDescription className="text-base">{project.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild className="flex-1">
              <Link href={project.href}>
                Read Project <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.github} target="_blank">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
            )}
            {(project.demo || (project.live && project.demo)) && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.demo!} target="_blank">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </ScaleOnHover>
  )
} 