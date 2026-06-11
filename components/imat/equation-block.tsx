"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import type { EquationDef } from "@/data/imat/types";

interface EquationBlockProps {
  equation: EquationDef;
  className?: string;
}

export function EquationBlock({ equation, className }: EquationBlockProps) {
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("imat-practice-equations") || "[]"
    );
    if (stored.includes(equation.id)) {
      setMarked(true);
    }
  }, [equation.id]);

  const toggleMarked = useCallback(() => {
    setMarked((m) => {
      const newMarked = !m;
      const stored = JSON.parse(
        localStorage.getItem("imat-practice-equations") || "[]"
      );
      const updated = newMarked
        ? [...stored, equation.id]
        : stored.filter((id: string) => id !== equation.id);
      localStorage.setItem("imat-practice-equations", JSON.stringify(updated));
      return newMarked;
    });
  }, [equation.id]);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group relative rounded-lg border p-4 transition-colors",
        marked
          ? "border-amber-500/50 bg-amber-500/5"
          : "border-border bg-card hover:border-muted-foreground/30",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 overflow-x-auto py-2">
          <BlockMath math={equation.latex} />
          {equation.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {equation.description}
            </p>
          )}
          {equation.variables && (
            <p className="mt-1 text-xs text-muted-foreground/70 font-mono">
              {equation.variables}
            </p>
          )}
        </div>
        <button
          onClick={toggleMarked}
          className={cn(
            "shrink-0 rounded-md p-2 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",
            marked
              ? "text-amber-500 hover:text-amber-600"
              : "text-muted-foreground/40 opacity-0 sm:group-hover:opacity-100 hover:text-muted-foreground",
            !marked && "sm:opacity-0 opacity-60"
          )}
          title={marked ? "Remove from practice" : "Mark for practice"}
        >
          {marked ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
