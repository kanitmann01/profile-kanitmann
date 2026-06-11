"use client";

import { cn } from "@/lib/utils";
import type { Confidence } from "@/data/imat/types";

interface ConfidenceMeterProps {
  confidence: Confidence | undefined;
  className?: string;
}

const config = {
  weak: {
    label: "Weak",
    bg: "bg-red-500/10",
    text: "text-red-600",
    bar: "bg-red-500",
    width: "w-1/3",
  },
  ok: {
    label: "OK",
    bg: "bg-yellow-500/10",
    text: "text-yellow-600",
    bar: "bg-yellow-500",
    width: "w-2/3",
  },
  strong: {
    label: "Strong",
    bg: "bg-green-500/10",
    text: "text-green-600",
    bar: "bg-green-500",
    width: "w-full",
  },
  none: {
    label: "Not started",
    bg: "bg-gray-500/10",
    text: "text-gray-500",
    bar: "bg-gray-300",
    width: "w-0",
  },
} as const;

export function ConfidenceMeter({
  confidence,
  className,
}: ConfidenceMeterProps) {
  const key = confidence ?? "none";
  const { label, bg, text, bar, width } = config[key];

  return (
    <div
      data-confidence={confidence ?? "none"}
      className={cn("rounded-lg p-3", bg, className)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={cn("text-sm font-medium", text)}>{label}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/50 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            bar,
            width
          )}
        />
      </div>
    </div>
  );
}
