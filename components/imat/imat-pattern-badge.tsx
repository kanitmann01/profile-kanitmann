import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { IMATPattern, IMATFrequency } from "@/data/imat/types";

const frequencyConfig: Record<
  IMATFrequency,
  { label: string; color: string; icon: typeof BarChart3 }
> = {
  high: {
    label: "High Yield",
    color: "border-red-500/40 bg-red-500/10 text-red-600",
    icon: TrendingUp,
  },
  medium: {
    label: "Medium Yield",
    color: "border-amber-500/40 bg-amber-500/10 text-amber-600",
    icon: BarChart3,
  },
  low: {
    label: "Low Yield",
    color: "border-blue-500/40 bg-blue-500/10 text-blue-600",
    icon: AlertTriangle,
  },
};

interface IMATPatternBadgeProps {
  pattern: IMATPattern;
  className?: string;
  showYears?: boolean;
}

export function IMATPatternBadge({
  pattern,
  className,
  showYears = true,
}: IMATPatternBadgeProps) {
  const cfg = frequencyConfig[pattern.frequency];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <Badge variant="outline" className={cn("gap-1.5 px-3 py-1", cfg.color)}>
        <Icon className="h-3.5 w-3.5" />
        {cfg.label}
      </Badge>
      {showYears && pattern.years.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {pattern.years.map((year) => (
            <Badge
              key={year}
              variant="secondary"
              className="px-2 py-0.5 text-xs"
            >
              {year}
            </Badge>
          ))}
        </div>
      )}
      {pattern.notes && (
        <span className="text-xs text-muted-foreground ml-1">
          {pattern.notes}
        </span>
      )}
    </motion.div>
  );
}
