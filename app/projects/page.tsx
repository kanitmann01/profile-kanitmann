"use client"

import { useState, useMemo } from "react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ProjectCard } from "@/components/project-card"
import { projects } from "@/data/projects"
import { useLikes } from "@/hooks/use-likes"
import { TrendingUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = "recent" | "popular"

export default function Projects() {
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const { likes, updateLikeCount } = useLikes()

  const sortedProjects = useMemo(() => {
    const projectsWithLikes = projects.map((project) => ({
      ...project,
      likeCount: likes[project.slug] || 0,
    }))

    if (sortBy === "popular") {
      return projectsWithLikes.sort((a, b) => b.likeCount - a.likeCount)
    }

    return projectsWithLikes.sort((a, b) => b.order - a.order)
  }, [sortBy, likes])

  // Group projects by period for display
  const projectGroups = useMemo(() => {
    const groups = new Map<string, typeof sortedProjects>()

    sortedProjects.forEach((project) => {
      if (!groups.has(project.period)) {
        groups.set(project.period, [])
      }
      groups.get(project.period)!.push(project)
    })

    return Array.from(groups.entries()).map(([period, periodProjects]) => ({
      period,
      projects: periodProjects,
    }))
  }, [sortedProjects])

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

        {/* Sort Controls */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-16">
          {projectGroups.map((group) => (
            <div key={group.period} className="space-y-6">
              {sortBy === "recent" && (
                <FadeIn>
                  <div className="text-left">
                    <h2 className="text-3xl font-semibold text-foreground">{group.period}</h2>
                  </div>
                </FadeIn>
              )}
              <StaggerContainer className="grid md:grid-cols-2 gap-8">
                {group.projects.map((project) => (
                  <StaggerItem key={project.slug}>
                    <ProjectCard
                      project={project}
                      likeCount={project.likeCount}
                      onLikeCountChange={(count) => updateLikeCount(project.slug, count)}
                    />
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
