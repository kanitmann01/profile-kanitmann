"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useSpacedRepetition } from "@/hooks/use-spaced-repetition";
import { resolveCrosslinks } from "@/lib/imat-crosslinks";

interface ConceptMapProps {
  currentSlug: string;
  currentTitle: string;
  prerequisites: string[];
  crosslinks: string[];
  className?: string;
}

function ConfidenceBadge({ slug }: { slug: string }) {
  const { getProgress } = useSpacedRepetition();
  const progress = getProgress(slug);
  const confidence = progress?.confidence;

  const colorMap = {
    strong:
      "bg-green-500/10 text-green-700 border-green-500/30 dark:text-green-400",
    ok: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30 dark:text-yellow-400",
    weak: "bg-red-500/10 text-red-700 border-red-500/30 dark:text-red-400",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs",
        confidence ? colorMap[confidence] : "text-muted-foreground"
      )}
      data-testid={`confidence-${slug}`}
    >
      {confidence || "not started"}
    </Badge>
  );
}

export function ConceptMap({
  currentSlug,
  currentTitle,
  prerequisites,
  crosslinks,
  className,
}: ConceptMapProps) {
  const prereqNodes = resolveCrosslinks(prerequisites);
  const crossNodes = resolveCrosslinks(crosslinks);

  return (
    <div className={cn("relative", className)} data-testid="concept-map">
      <div className="flex items-center gap-2 overflow-x-auto py-2 pb-3 scrollbar-thin">
        {prereqNodes.map((node) => (
          <div
            key={node.slug}
            className="flex flex-col items-center gap-1 min-w-[80px]"
          >
            <Link
              href={node.href}
              className="text-xs text-center px-3 py-2 rounded-md border bg-muted/50 hover:bg-muted transition-colors truncate max-w-[120px] min-h-[44px] flex items-center justify-center"
              data-testid={`node-${node.slug}`}
            >
              {node.title}
            </Link>
            <ConfidenceBadge slug={node.slug} />
          </div>
        ))}

        {prereqNodes.length > 0 && (
          <span className="text-muted-foreground shrink-0">→</span>
        )}

        <div className="flex flex-col items-center gap-1 min-w-[80px]">
          <span className="text-xs text-center px-3 py-2 rounded-md border-2 border-primary bg-primary/10 font-medium truncate max-w-[120px] min-h-[44px] flex items-center justify-center">
            {currentTitle}
          </span>
          <ConfidenceBadge slug={currentSlug} />
        </div>

        {crossNodes.length > 0 && (
          <span className="text-muted-foreground shrink-0">→</span>
        )}

        {crossNodes.map((node) => (
          <div
            key={node.slug}
            className="flex flex-col items-center gap-1 min-w-[80px]"
          >
            <Link
              href={node.href}
              className="text-xs text-center px-3 py-2 rounded-md border bg-muted/50 hover:bg-muted transition-colors truncate max-w-[120px] min-h-[44px] flex items-center justify-center"
              data-testid={`node-${node.slug}`}
            >
              {node.title}
            </Link>
            <ConfidenceBadge slug={node.slug} />
          </div>
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none rounded-r-md" />
    </div>
  );
}
