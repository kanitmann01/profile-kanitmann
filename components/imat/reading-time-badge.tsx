"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ReadingTimeBadgeProps = {
  minutes: number;
  className?: string;
};

export function ReadingTimeBadge({
  minutes,
  className,
}: ReadingTimeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs text-muted-foreground",
        className
      )}
    >
      <Clock className="w-3 h-3" />
      {minutes} min read
    </span>
  );
}
