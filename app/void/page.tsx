import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

import { VoidScene } from "@/components/void/void-scene";
import { VoidGhostNav } from "@/components/void/void-ghost-nav";
import { VoidHero } from "@/components/void/void-hero";
import { VoidFooterHint } from "@/components/void/void-footer-hint";

const TITLE = "Void | Kanit Mann";
const DESCRIPTION =
  "An immersive WebGL portal — Kanit Mann's experimental deep-space command deck.";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${siteUrl}/void` },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${siteUrl}/void`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
    },
  };
}

export default function VoidPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#000] text-white">
      <VoidScene />
      <VoidGhostNav />
      <VoidHero />
      <VoidFooterHint />
    </div>
  );
}
