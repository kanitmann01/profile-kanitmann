"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { FilterChip } from "@/lib/list-filter";

export interface ListFilterBarProps {
  /** Selectable chips (e.g. tech stack / article topic values). */
  chips: FilterChip[];
  /** Currently selected chip values. */
  selected: string[];
  onToggle: (value: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  /** Label shown above the chip group, e.g. "Filter by stack". */
  label?: string;
  /** Visible label for the search input, e.g. "Search projects". */
  searchLabel?: string;
  /** Applied to the inner container (page width control). */
  className?: string;
  onClear: () => void;
  /**
   * Show the "Clear filters" button. Defaults to showing whenever a filter is
   * active; pages rendering their own empty-state reset button can suppress it.
   */
  showClear?: boolean;
}

export function ListFilterBar({
  chips,
  selected,
  onToggle,
  searchQuery,
  onSearch,
  searchPlaceholder = "Search…",
  label = "Filter",
  searchLabel = "Search",
  className,
  onClear,
  showClear,
}: ListFilterBarProps) {
  const prefersReducedMotion = useReducedMotion();
  const inputId = React.useId();
  const isActive = selected.length > 0 || searchQuery.trim().length > 0;
  const showClearButton = showClear ?? isActive;

  const body = (
    <section data-list-filter className="py-8 px-6">
      <div className={cn("container mx-auto", className)}>
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {`> ${label}`}
        </div>

        <div
          data-list-filter-chips
          className="flex flex-wrap items-center gap-2 mb-4"
        >
          {chips.map((chip) => {
            const isSelected = selected.includes(chip.value);
            return (
              <button
                key={chip.value}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Filter by ${chip.label}`}
                data-list-filter-chip={chip.value}
                onClick={() => onToggle(chip.value)}
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted"
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-52 max-w-sm">
            <label
              htmlFor={inputId}
              className="block mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {searchLabel}
            </label>
            <div role="search" className="relative">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
              />
              <Input
                id={inputId}
                type="search"
                value={searchQuery}
                onChange={(event) => onSearch(event.target.value)}
                placeholder={searchPlaceholder}
                data-list-filter-search
                className="pl-9"
              />
            </div>
          </div>
          {showClearButton ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClear}
              data-list-filter-clear
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );

  if (prefersReducedMotion) {
    return body;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {body}
    </motion.div>
  );
}
