import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TechChipProps {
  label: string;
  className?: string;
}

/**
 * Unified tech-tag chip (Wave C). One Badge-based implementation replaces the
 * three divergent tag renderings that previously lived in project-card.tsx,
 * app/projects/page.tsx, case-study-content.tsx, and the classic project-hero
 * path. Status badges are intentionally separate — they keep their own color
 * logic.
 */
export function TechChip({ label, className }: TechChipProps) {
  return (
    <Badge
      variant="outline"
      className={cn("font-mono text-xs uppercase tracking-wider", className)}
    >
      {label}
    </Badge>
  );
}
