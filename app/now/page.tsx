import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import { formatDate } from "@/lib/date-format";
import { now } from "@/data/now";

/**
 * /now — build-time static, human- and agent-readable. Content lives in
 * data/now.ts; the "Last updated" timestamp is stamped at build time.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Now - Kanit Mann",
  description:
    "What Kanit Mann is currently building, reading, and available for.",
  alternates: { canonical: "/now" },
  openGraph: {
    title: "Now - Kanit Mann",
    description:
      "What Kanit Mann is currently building, reading, and available for.",
    url: getSiteUrl() + "/now",
    type: "website",
  },
};

export default function NowPage() {
  const lastUpdated =
    formatDate(new Date().toISOString(), "long") ?? "Recently";

  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
          Now
        </p>
        <h1 className="font-serif text-5xl sm:text-6xl text-foreground leading-none mb-12">
          What I&apos;m up to
        </h1>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Currently building
          </h2>
          <ul className="space-y-3">
            {now.currentlyBuilding.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="text-primary-text mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-foreground mb-4">Reading</h2>
          <ul className="space-y-3">
            {now.reading.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 text-muted-foreground leading-relaxed"
              >
                <span className="text-primary-text mt-0.5 flex-shrink-0">
                  —
                </span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Available for
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {now.availableFor}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Last updated
          </h2>
          <p className="font-mono text-sm text-muted-foreground">
            {lastUpdated} — build timestamp
          </p>
        </section>
      </div>
    </div>
  );
}
