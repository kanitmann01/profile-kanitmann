"use client";

import { useState } from "react";
import {
  ExternalLink,
  Video,
  BookOpen,
  FlaskConical,
  GraduationCap,
  FileQuestion,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ResourceLink, ResourceType } from "@/data/imat/types";

const resourceIcons: Record<ResourceType, typeof ExternalLink> = {
  video: Video,
  article: BookOpen,
  practice: FileQuestion,
  textbook: GraduationCap,
  simulation: FlaskConical,
  "past-paper": FileQuestion,
};

const resourceLabels: Record<ResourceType, string> = {
  video: "Video",
  article: "Article",
  practice: "Practice",
  textbook: "Textbook",
  simulation: "Simulation",
  "past-paper": "Past Paper",
};

interface ExternalResourceCardProps {
  resource: ResourceLink;
  className?: string;
}

export function ExternalResourceCard({
  resource,
  className,
}: ExternalResourceCardProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null);

  const Icon = resourceIcons[resource.type] || ExternalLink;

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 transition-colors hover:border-muted-foreground/30",
        helpful === true && "border-green-500/40 bg-green-500/5",
        helpful === false && "border-red-500/40 bg-red-500/5",
        className
      )}
    >
      <Icon className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline truncate"
          >
            {resource.title}
          </a>
          <Badge variant="outline" className="shrink-0 text-[10px] px-1.5 py-0">
            {resourceLabels[resource.type]}
          </Badge>
        </div>
        {resource.description && (
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {resource.description}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs gap-1"
            asChild
          >
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
              Open
            </a>
          </Button>
          <button
            onClick={() => setHelpful(true)}
            className={cn(
              "text-xs px-2 py-0.5 rounded transition-colors",
              helpful === true
                ? "bg-green-500/20 text-green-600"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            )}
          >
            Helpful
          </button>
          <button
            onClick={() => setHelpful(false)}
            className={cn(
              "text-xs px-2 py-0.5 rounded transition-colors",
              helpful === false
                ? "bg-red-500/20 text-red-600"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            )}
          >
            Not helpful
          </button>
        </div>
      </div>
    </div>
  );
}
