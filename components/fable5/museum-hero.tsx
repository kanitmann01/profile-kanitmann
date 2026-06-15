"use client";

import { SubmitSiteButton } from "@/components/fable5/submit-site-button";
import {
  fable5Sites,
  fable5Mentions,
  featuredFable5Sites,
} from "@/data/fable5";

export function MuseumHero() {
  const totalSites = fable5Sites.length;
  const featuredCount = featuredFable5Sites.length;
  const mentionCount = fable5Mentions.length;

  return (
    <section className="container mx-auto max-w-4xl px-6 pt-24 pb-16 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
        {"> CLAUDE.FABLE.5 // DIGITAL MUSEUM"}
      </p>
      <h1 className="font-serif text-5xl md:text-7xl text-foreground leading-tight mb-6">
        The Fable 5 Digital Museum
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
        A living gallery of what people have built with Claude Fable 5 —
        one-shot websites, Three.js simulations, single-file operating systems,
        and games, curated from public demos.
      </p>
      <dl className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12">
        <div>
          <dt className="sr-only">Total sites</dt>
          <dd>
            {totalSites} {totalSites === 1 ? "site" : "sites"}
          </dd>
        </div>
        <div aria-hidden="true">·</div>
        <div>
          <dt className="sr-only">Featured sites</dt>
          <dd>
            {featuredCount} {featuredCount === 1 ? "featured" : "featured"}
          </dd>
        </div>
        <div aria-hidden="true">·</div>
        <div>
          <dt className="sr-only">Mentions</dt>
          <dd>
            {mentionCount} {mentionCount === 1 ? "mention" : "mentions"}
          </dd>
        </div>
      </dl>
      <div className="flex justify-center">
        <SubmitSiteButton />
      </div>
    </section>
  );
}
