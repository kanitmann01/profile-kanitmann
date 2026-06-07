"use client"

import { useState, useMemo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/animations/fade-in"
import { projects } from "@/data/projects"
import { useLikes } from "@/hooks/use-likes"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortOption = "recent" | "popular"

function ProjectsContent() {
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

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-20">
            <h1 className="text-6xl font-serif text-foreground mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl font-mono text-sm uppercase tracking-wider">
              Data engineering, analytics, and ML — built end-to-end
            </p>
          </div>
        </FadeIn>

        <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {projects.length} {projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground mr-2">Sort</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[160px] font-mono text-xs uppercase tracking-wider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-28">
          {sortedProjects.map((project, index) => {
            const imageLeft = index % 2 === 0
            return (
              <motion.article
                key={project.slug}
                data-editorial-project
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link href={project.href} className="block group no-underline">
                  <div className={`flex flex-col ${imageLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-start`}>
                    <div className="w-full md:w-1/2 flex-shrink-0">
                      <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-muted">
                        <motion.div
                          className="absolute inset-0"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </motion.div>
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 flex flex-col justify-center py-2">
                      <div className="mb-3">
                        {project.status && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-1 rounded-sm">
                            {project.status}
                          </span>
                        )}
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground ml-2">
                          {project.period}
                        </span>
                      </div>

                      <h2
                        data-project-title
                        className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-4 group-hover:text-primary transition-colors duration-300"
                      >
                        {project.title}
                      </h2>

                      <p className="text-muted-foreground text-base leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div data-project-tags className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-muted-foreground/70 border-b border-transparent group-hover:border-primary/30 group-hover:text-muted-foreground transition-colors duration-300 pb-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-20">
            <h1 className="text-6xl font-serif text-foreground mb-4">Projects</h1>
          </div>
        </div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  )
}
