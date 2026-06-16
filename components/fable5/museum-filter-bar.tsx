"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";

import { FABLE5_TAGS, type Fable5Tag } from "@/data/fable5";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface MuseumFilterBarProps {
  totalCount: number;
  filteredCount: number;
  selectedTags: Fable5Tag[];
  onToggleTag: (tag: Fable5Tag) => void;
  onClear: () => void;
  onShuffle: () => void;
  isShuffling?: boolean;
}

export function MuseumFilterBar({
  totalCount,
  filteredCount,
  selectedTags,
  onToggleTag,
  onClear,
  onShuffle,
  isShuffling = false,
}: MuseumFilterBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const showClear = selectedTags.length > 0;

  const body = (
    <section data-museum-filter-bar className="py-8 px-6">
      <div className="container mx-auto max-w-6xl">
        <div
          data-museum-filter-header
          className="flex items-center justify-between mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground"
        >
          <span>{"> FILTER TAGS"}</span>
          <span>{`> ${filteredCount} / ${totalCount} SITES`}</span>
        </div>
        <div
          data-museum-filter-pills
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          {FABLE5_TAGS.map((tag) => {
            const selected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                aria-label={`Filter by ${tag}`}
                data-museum-filter-pill={tag}
                onClick={() => onToggleTag(tag)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div data-museum-filter-actions className="flex items-center gap-2">
          {showClear ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              data-museum-filter-clear
            >
              Clear
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onShuffle}
            data-museum-filter-shuffle
            disabled={isShuffling}
          >
            <Shuffle className="h-3.5 w-3.5" />
            Shuffle
          </Button>
        </div>
      </div>
    </section>
  );

  if (prefersReducedMotion) {
    return body;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {body}
    </motion.div>
  );
}
