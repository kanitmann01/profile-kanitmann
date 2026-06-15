import type { Metadata } from "next";
import { execSync } from "node:child_process";

import { MuseumHero } from "@/components/fable5/museum-hero";
import { MuseumGrid } from "@/components/fable5/museum-grid";
import { fable5Sites } from "@/data/fable5";

const TITLE = "Fable 5 Digital Museum | Kanit Mann";
const DESCRIPTION =
  "A living gallery of what people have built with Claude Fable 5 — one-shot websites, Three.js simulations, single-file operating systems, and games, curated from public demos.";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function getLastUpdated(): string | null {
  const buildTs = process.env.BUILD_TIMESTAMP;
  if (buildTs) {
    const parsed = new Date(buildTs);
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }
  }
  try {
    const out = execSync("git log -1 --format=%cI -- data/fable5.ts", {
      encoding: "utf-8",
    }).trim();
    if (out) {
      const parsed = new Date(out);
      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toISOString().slice(0, 10);
      }
    }
  } catch {
    // git unavailable or no history — leave the line unrendered
  }
  return null;
}

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: "https://kanit.codes/fable-5" },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: "https://kanit.codes/fable-5",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
    },
  };
}

export default function Fable5MuseumPage() {
  const lastUpdated = getLastUpdated();

  return (
    <div className="min-h-screen bg-background">
      <MuseumHero />
      {lastUpdated && DATE_RE.test(lastUpdated) ? (
        <p
          data-last-updated
          className="container mx-auto max-w-4xl px-6 -mt-10 text-center font-mono text-xs text-muted-foreground"
        >
          <span aria-hidden="true" className="text-[10px]">
            ↻
          </span>{" "}
          Last updated: {lastUpdated}
        </p>
      ) : null}
      <section className="py-20 px-6">
        <MuseumGrid sites={fable5Sites} />
      </section>
    </div>
  );
}
