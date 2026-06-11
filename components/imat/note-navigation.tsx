"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getNotesByTopic } from "@/data/imat/registry";
import type { Subject } from "@/data/imat/types";

type NoteNavigationProps = {
  currentSlug: string;
  topic: string;
  subject: string;
};

export function NoteNavigation({
  currentSlug,
  topic,
  subject,
}: NoteNavigationProps) {
  const { prev, next } = useMemo(() => {
    const notes = getNotesByTopic(subject as Subject, topic);
    const idx = notes.findIndex((n) => n.slug === currentSlug);
    return {
      prev: idx > 0 ? notes[idx - 1] : null,
      next: idx >= 0 && idx < notes.length - 1 ? notes[idx + 1] : null,
    };
  }, [currentSlug, topic, subject]);

  const baseBtn =
    "flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors min-h-[44px] min-w-[44px] text-sm font-medium";

  return (
    <nav className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t">
      {prev ? (
        <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
          <Link
            href={`/imat/${subject}/${topic}/${prev.slug}`}
            className={cn(
              baseBtn,
              "justify-start",
              "text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border"
            )}
          >
            <ChevronLeft className="w-4 h-4 shrink-0 hidden sm:block" />
            <span className="hidden sm:inline truncate">{prev.title}</span>
            <ChevronLeft className="w-4 h-4 shrink-0 sm:hidden" />
          </Link>
        </motion.div>
      ) : (
        <div className="flex-1">
          <button
            disabled
            className={cn(
              baseBtn,
              "opacity-40 cursor-not-allowed justify-start border-transparent"
            )}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Previous</span>
          </button>
        </div>
      )}

      {next ? (
        <motion.div whileTap={{ scale: 0.98 }} className="flex-1">
          <Link
            href={`/imat/${subject}/${topic}/${next.slug}`}
            className={cn(
              baseBtn,
              "sm:justify-end",
              "text-muted-foreground hover:text-foreground hover:bg-muted border-transparent hover:border-border"
            )}
          >
            <span className="hidden sm:inline truncate">{next.title}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </Link>
        </motion.div>
      ) : (
        <div className="flex-1">
          <button
            disabled
            className={cn(
              baseBtn,
              "opacity-40 cursor-not-allowed sm:justify-end border-transparent"
            )}
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}
    </nav>
  );
}
