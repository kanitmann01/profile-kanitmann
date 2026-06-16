"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Fable5Mention, Fable5MentionType } from "@/data/fable5";

type MentionFilter = Fable5MentionType | "All";

const FILTERS: readonly MentionFilter[] = [
  "All",
  "Demo",
  "Tutorial",
  "Evaluation",
  "Integration",
] as const;

const COMPARE_LATEST = (a: Fable5Mention, b: Fable5Mention) =>
  b.addedAt.localeCompare(a.addedAt);

const filterMentions = (
  mentions: Fable5Mention[],
  filter: MentionFilter
): Fable5Mention[] =>
  filter === "All"
    ? mentions
    : mentions.filter((mention) => mention.type === filter);

export interface MuseumMentionsProps {
  mentions: Fable5Mention[];
  className?: string;
}

export function MuseumMentions({ mentions, className }: MuseumMentionsProps) {
  const [filter, setFilter] = React.useState<MentionFilter>("All");

  const visible = React.useMemo(
    () => filterMentions(mentions, filter).slice().sort(COMPARE_LATEST),
    [mentions, filter]
  );

  return (
    <section
      data-museum-mentions
      className={cn("py-20 px-6 bg-background/30", className)}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {`> MENTIONS (${mentions.length})`}
          </h2>
          <div
            role="group"
            aria-label="Filter mentions by type"
            className="flex flex-wrap gap-2"
          >
            {FILTERS.map((option) => {
              const isActive = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isActive}
                  data-mention-filter={option}
                  onClick={() => setFilter(option)}
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/50 text-muted-foreground border-border hover:text-foreground hover:border-foreground/40"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <p
          data-mention-source
          className="font-mono text-xs text-muted-foreground mb-4"
        >
          Source: awesome-claude-fable-5 (Anil Matcha, MIT), synced weekly.
        </p>

        <ul className="font-mono text-sm space-y-2" data-mention-list>
          {visible.map((mention) => (
            <li
              key={mention.id}
              data-mention-row
              data-mention-type={mention.type}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
            >
              <span className="text-muted-foreground shrink-0">
                [{mention.addedAt}]
              </span>
              <span className="shrink-0">
                <Badge
                  variant="secondary"
                  className="font-mono text-[10px] uppercase tracking-widest bg-background/80 text-foreground border-border"
                >
                  {mention.type}
                </Badge>
              </span>
              <span className="text-foreground">{mention.title}</span>
              <span className="text-muted-foreground">
                — @{mention.author.replace(/^@/, "")}
              </span>
              <a
                href={mention.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
                aria-label={`Open ${mention.title} source`}
              >
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>

        {visible.length === 0 ? (
          <p
            data-mention-empty
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
          >
            no mentions in this category yet
          </p>
        ) : null}
      </div>
    </section>
  );
}
