import Link from "next/link";
import { FadeIn } from "@/components/animations/fade-in";

/**
 * Surfaces the strongest proof points and the recruiter-critical availability
 * signal immediately under the hero, before the bento grid. Recruiters spend
 * ~6 seconds here; the quantified wins (2,000+ servers, ~96% detection, 1B+
 * URLs, 99.9% uptime) otherwise live 2-3 scrolls deep in the experience feed.
 */
const stats = [
  { value: "2,000+", label: "servers migrated to GCP" },
  { value: "~96%", label: "zero-day phishing detection" },
  { value: "1B+", label: "phishing URLs analyzed" },
  { value: "99.9%", label: "infra uptime SLA" },
];

export function HeroStatsStrip() {
  return (
    <FadeIn>
      <section
        aria-label="At a glance"
        className="border-y border-border/40 bg-muted/20"
      >
        <div className="container mx-auto max-w-6xl px-6 py-10">
          {/* Headline metrics */}
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <dt className="sr-only">{s.label}</dt>
                <p className="font-serif text-3xl md:text-4xl text-foreground leading-none">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </dl>

          {/* Availability + authorization line */}
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="font-sans text-sm text-muted-foreground max-w-2xl leading-relaxed">
              Seeking{" "}
              <span className="text-foreground font-medium">
                ML Engineer / Data Engineer / Data Analyst
              </span>{" "}
              roles · US-based · Remote &amp; Hybrid · W2 contract OK ·
              Authorized to work in the US (STEM OPT through May 2029).
            </p>
            <div className="flex flex-shrink-0 items-center gap-3">
              <Link
                href="/Kanit%20Mann%20-%20Resume.pdf"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
              >
                Résumé
              </Link>
              <span className="text-border" aria-hidden="true">
                |
              </span>
              <Link
                href="/contact"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
