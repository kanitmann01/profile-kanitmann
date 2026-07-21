import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

import { MuseumHero } from "@/components/fable5/museum-hero";
import { MuseumGrid } from "@/components/fable5/museum-grid";
import { fable5Sites } from "@/data/fable5";

const TITLE = "Fable 5 Digital Museum | Kanit Mann";
const DESCRIPTION =
  "A living gallery of what people have built with Claude Fable 5 — one-shot websites, Three.js simulations, single-file operating systems, and games, curated from public demos.";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${siteUrl}/fable-5` },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${siteUrl}/fable-5`,
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
  return (
    <div className="min-h-screen bg-background">
      <MuseumHero />
      <section className="py-20 px-6">
        <MuseumGrid sites={fable5Sites} />
      </section>
    </div>
  );
}
