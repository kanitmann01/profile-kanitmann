import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";

export type PrevNextEntry = {
  slug: string;
  title: string;
  href: string;
  /** Sort key — articles pass `publishedAt`, projects pass `order`. */
  sortValue: string | number;
};

interface PrevNextNavProps {
  currentSlug: string;
  entries: PrevNextEntry[];
  ariaLabel?: string;
}

/**
 * Previous/next navigation (Wave C). Reusable across projects and articles:
 * sorts the entry array by `sortValue` (date for articles, order for
 * projects), then cycles within the array — the first item's "previous" wraps
 * to the last, and vice versa. Reveal runs through FadeIn, so the reveal is
 * fully visible under prefers-reduced-motion.
 */
export function PrevNextNav({
  currentSlug,
  entries,
  ariaLabel,
}: PrevNextNavProps) {
  if (entries.length < 2) {
    return null;
  }

  const sorted = [...entries].sort((a, b) =>
    typeof a.sortValue === "number" && typeof b.sortValue === "number"
      ? a.sortValue - b.sortValue
      : String(a.sortValue).localeCompare(String(b.sortValue))
  );

  const index = sorted.findIndex((entry) => entry.slug === currentSlug);
  if (index === -1) {
    return null;
  }

  const prev = sorted[(index - 1 + sorted.length) % sorted.length];
  const next = sorted[(index + 1) % sorted.length];

  return (
    <FadeIn className="mt-20">
      <nav
        aria-label={ariaLabel ?? "Previous and next"}
        className="flex flex-col sm:flex-row justify-between gap-6 border-t border-border pt-8"
      >
        <Link
          href={prev.href}
          className="group flex flex-col gap-1 no-underline max-w-xs"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
            <ArrowLeft className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
            Previous
          </span>
          <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
            {prev.title}
          </span>
        </Link>
        <Link
          href={next.href}
          className="group flex flex-col gap-1 no-underline max-w-xs sm:text-right"
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
            Next
            <ArrowRight className="inline h-3.5 w-3.5 ml-1 -mt-0.5" />
          </span>
          <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      </nav>
    </FadeIn>
  );
}
