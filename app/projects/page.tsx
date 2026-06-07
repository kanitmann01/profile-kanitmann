"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/animations/stagger-container"
import { ProjectCard } from "@/components/project-card"
import { TagFilter } from "@/components/tag-filter"
import { projects } from "@/data/projects"
import { useLikes } from "@/hooks/use-likes"
import { filterProjectsByTags, tagsToQueryString, queryStringToTags, getTopTagsByFrequency } from "@/lib/tag-filter"
import { TrendingUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

type SortOption = "recent" | "popular"

const TOP_TAGS_LIMIT = 8

function ProjectsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const { likes, updateLikeCount } = useLikes()

  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    queryStringToTags(searchParams.toString() ? `?${searchParams.toString()}` : "")
  )

  useEffect(() => {
    const tagsFromUrl = queryStringToTags(searchParams.toString() ? `?${searchParams.toString()}` : "")
    setSelectedTags(tagsFromUrl)
  }, [searchParams])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    projects.forEach((project) => project.tags.forEach((tag) => tagSet.add(tag)))
    return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
  }, [])

  const topTags = useMemo(() => getTopTagsByFrequency(projects, TOP_TAGS_LIMIT), [])

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
    const queryString = tagsToQueryString(tags)
    const currentSort = searchParams.get("sort")
    const params = new URLSearchParams()
    if (currentSort && currentSort !== "recent") {
      params.set("sort", currentSort)
    }
    if (tags.length > 0) {
      const normalizedTags = tags.map((tag) => tag.toLowerCase().replace(/\s+/g, "-"))
      params.set("tags", normalizedTags.join(","))
    }
    const newUrl = params.toString() ? `?${params.toString()}` : "/projects"
    router.push(newUrl, { scroll: false })
  }

  const handleClearFilters = () => {
    handleTagsChange([])
  }

  const filteredProjects = useMemo(
    () => filterProjectsByTags(projects, selectedTags),
    [selectedTags]
  )

  const sortedProjects = useMemo(() => {
    const projectsWithLikes = filteredProjects.map((project) => ({
      ...project,
      likeCount: likes[project.slug] || 0,
    }))

    if (sortBy === "popular") {
      return projectsWithLikes.sort((a, b) => b.likeCount - a.likeCount)
    }

    return projectsWithLikes.sort((a, b) => b.order - a.order)
  }, [sortBy, likes, filteredProjects])

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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
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

        {/* Tag Filter */}
        <div className="mb-12">
          <TagFilter
            allTags={allTags}
            topTags={topTags}
            selectedTags={selectedTags}
            onTagsChange={handleTagsChange}
          />
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <FadeIn>
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No projects match these filters</p>
              <Button variant="outline" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </div>
          </FadeIn>
        )}

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

export default function Projects() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Projects</h1>
          </div>
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  )
}
