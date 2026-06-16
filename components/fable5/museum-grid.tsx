"use client";

import * as React from "react";

import { MuseumCard } from "@/components/fable5/museum-card";
import { cn } from "@/lib/utils";
import type { Fable5Site } from "@/data/fable5";

export interface MuseumGridProps {
  sites: Fable5Site[];
  onActivate?: (site: Fable5Site) => void;
  className?: string;
}

export function MuseumGrid({ sites, onActivate, className }: MuseumGridProps) {
  const featured = React.useMemo(
    () => sites.filter((site) => site.featured),
    [sites]
  );

  return (
    <div className={cn("container mx-auto max-w-6xl", className)}>
      {featured.length > 0 ? (
        <section data-museum-featured className="mb-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"> FEATURED"}
          </h2>
          <div
            data-museum-grid="featured"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((site) => (
              <MuseumCard
                key={site.id}
                site={site}
                onActivate={onActivate}
                featured
              />
            ))}
          </div>
        </section>
      ) : null}

      <section data-museum-all>
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          {`> ALL SITES (${sites.length})`}
        </h2>
        <div
          data-museum-grid="all"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sites.map((site) => (
            <MuseumCard key={site.id} site={site} onActivate={onActivate} />
          ))}
        </div>
      </section>
    </div>
  );
}
