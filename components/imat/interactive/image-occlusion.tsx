"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OcclusionZone {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageOcclusionProps {
  zones: OcclusionZone[];
  children: React.ReactNode;
  className?: string;
}

export function ImageOcclusion({
  zones,
  children,
  className,
}: ImageOcclusionProps) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggleZone = useCallback((id: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const revealAll = () => setRevealed(new Set(zones.map((z) => z.id)));
  const reset = () => setRevealed(new Set());

  return (
    <div
      className={cn("relative inline-block", className)}
      role="img"
      aria-label="Flashcard with hidden labels"
    >
      <div className="relative">
        {children}
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => toggleZone(zone.id)}
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
              width: `${zone.width}%`,
              height: `${zone.height}%`,
            }}
            className={cn(
              "absolute rounded transition-all duration-300",
              revealed.has(zone.id)
                ? "bg-transparent cursor-default"
                : "bg-muted/80 hover:bg-muted/60 cursor-pointer backdrop-blur-[1px]"
            )}
            title={revealed.has(zone.id) ? zone.label : "Click to reveal"}
          >
            {revealed.has(zone.id) && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-foreground">
                {zone.label}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={revealed.size < zones.length ? revealAll : reset}
          className="gap-1 text-xs h-7"
        >
          {revealed.size < zones.length ? (
            <>
              <Eye className="h-3 w-3" /> Reveal All
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3" /> Hide All
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
