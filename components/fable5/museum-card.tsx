"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Fable5Site } from "@/data/fable5";

export interface MuseumCardProps {
  site: Fable5Site;
  onActivate?: (site: Fable5Site) => void;
  onTagClick?: (tag: string, e: React.MouseEvent) => void;
  featured?: boolean;
  className?: string;
}

export function MuseumCard({
  site,
  onActivate,
  onTagClick,
  featured = false,
  className,
}: MuseumCardProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleActivate = React.useCallback(() => {
    if (onActivate) {
      onActivate(site);
      return;
    }
    if (typeof window !== "undefined") {
      window.open(site.demoUrl, "_blank", "noopener,noreferrer");
    }
  }, [onActivate, site]);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      handleActivate();
    },
    [handleActivate]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleActivate();
        return;
      }
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        handleActivate();
      }
    },
    [handleActivate]
  );

  const handleTagClick = React.useCallback(
    (tag: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      onTagClick?.(tag, e);
    },
    [onTagClick]
  );

  const ariaLabel = `${site.name} by ${site.author}`;

  const cardBody = (
    <Card
      data-museum-card
      data-featured={featured ? "true" : undefined}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "h-full flex flex-col overflow-hidden text-left cursor-pointer",
        "hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        featured && "ring-1 ring-primary/20",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full bg-muted">
        {imageFailed ? (
          <div
            data-museum-card-fallback
            className="absolute inset-0 flex items-center justify-center bg-zinc-900"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {site.name}
            </span>
          </div>
        ) : (
          <Image
            src={site.screenshotUrl}
            alt={site.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
        {site.playable ? (
          <div className="absolute top-2 right-2">
            <Badge
              variant="secondary"
              className="font-mono text-[10px] uppercase tracking-widest bg-background/80 text-foreground border-border"
            >
              ▶ PLAYABLE
            </Badge>
          </div>
        ) : null}
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-serif">{site.name}</CardTitle>
        <CardDescription className="text-xs font-mono">
          @{site.author.replace(/^@/, "")}
        </CardDescription>
        <p className="text-sm text-muted-foreground pt-1">{site.oneLiner}</p>
      </CardHeader>
      <CardContent className="mt-auto">
        <div
          data-museum-card-tags
          className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider"
        >
          {site.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              data-museum-card-tag={tag}
              onClick={handleTagClick(tag)}
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                onTagClick && "cursor-pointer"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (prefersReducedMotion) {
    return <div className="h-full">{cardBody}</div>;
  }

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {cardBody}
    </motion.div>
  );
}
