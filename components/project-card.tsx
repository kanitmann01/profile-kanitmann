"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScaleOnHover } from "@/components/animations/scale-on-hover";
import { ProjectCardInteractive } from "@/components/project-card-interactive";
import { TechChip } from "@/components/tech-chip";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <ScaleOnHover>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer group">
        <Link href={project.href} className="flex-1 flex flex-col">
          {/* Wave E.3: named view-transition element — morphs into the case-study
              hero image on /projects/[slug] (same slug name). Names are unique
              per page: each featured card has a distinct slug. */}
          <div
            className="relative h-48 overflow-hidden ring-1 ring-inset ring-black/5 dark:ring-white/10 border-b border-border/60"
            style={{ viewTransitionName: `project-image-${project.slug}` }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 dark:brightness-[0.92] dark:contrast-[0.98]"
            />
            {/* Status badge — theme-aware mono chip, converged with the
                /projects editorial deck (no raw palette hexes). Sits on a
                semi-opaque backing so it stays legible over any cover art. */}
            {project.status && (
              <div className="absolute top-3 right-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border bg-background/85 backdrop-blur-[2px] px-2 py-1 rounded-sm">
                  {project.status}
                </span>
              </div>
            )}
          </div>
          <CardHeader className="flex-1">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <CardDescription className="text-base">
              {project.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <TechChip key={tag} label={tag} />
              ))}
            </div>
          </CardContent>
        </Link>
        <CardContent className="pt-0">
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <span className="text-sm text-muted-foreground flex-1" />
            <ProjectCardInteractive>
              <div className="flex gap-2">
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
            </ProjectCardInteractive>
          </div>
        </CardContent>
      </Card>
    </ScaleOnHover>
  );
}
