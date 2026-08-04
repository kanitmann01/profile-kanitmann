"use client";

import Link from "next/link";
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";

/**
 * Surfaces the strongest proof points and the recruiter-critical availability
 * signal immediately under the hero, before the bento grid. Recruiters spend
 * ~6 seconds here; the quantified wins (2,000+ servers, ~96% detection, 1B+
 * URLs, 99.9% uptime) otherwise live 2-3 scrolls deep in the experience feed.
 *
 * The numeric portion counts up from 0 when the strip scrolls into view
 * (1.2s ease-out, via Motion's `animate` + `onUpdate`), triggered by a
 * scroll-position check (`useScroll` progress > 0) instead of an
 * IntersectionObserver, which wedges during hydration on this page. Prefix
 * (`~`) and suffix (`+`, `%`, `B+`) stay static so they never flash in/out
 * mid-count. Under `prefers-reduced-motion` the final value renders
 * immediately with no tween. The count always starts at 0 (server + first
 * client paint) so there is no hydration mismatch; below the fold, so no LCP
 * impact.
 */
interface Stat {
  target: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 2000, decimals: 0, suffix: "+", label: "servers migrated to GCP" },
  {
    target: 96,
    decimals: 0,
    prefix: "~",
    suffix: "%",
    label: "zero-day phishing detection",
  },
  { target: 1, decimals: 0, suffix: "B+", label: "phishing URLs analyzed" },
  {
    target: 99.9,
    decimals: 1,
    suffix: "%",
    label: "infra uptime SLA",
  },
];

function formatCount(value: number, decimals: number): string {
  if (decimals > 0) {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return Math.round(value).toLocaleString("en-US");
}

interface CountUpStatProps {
  target: number;
  decimals: number;
  start: boolean;
  reducedMotion: boolean | null;
}

function CountUpStat({
  target,
  decimals,
  start,
  reducedMotion,
}: CountUpStatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setCount(target);
      return;
    }
    if (!start) {
      return;
    }
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (value) => setCount(value),
    });
    return () => controls.stop();
  }, [reducedMotion, start, target]);

  return <span className="number">{formatCount(count, decimals)}</span>;
}

export function HeroStatsStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [start, setStart] = useState(false);

  // Scroll-position trigger, not IntersectionObserver: `useInView`'s IO
  // wedges during hydration on this page (15 observers created mid-hydration
  // + webfont/layout shift deliver one isIntersecting:false and never
  // another), leaving the stats stuck at 0. `useScroll` is scroll-event +
  // rAF driven — no IO — the same mechanism hero.tsx already relies on.
  // Progress exceeds 0 once the strip's top edge enters the viewport; the
  // latch flips once and stays.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress > 0) {
      setStart(true);
    }
  });

  return (
    <FadeIn>
      <section
        ref={sectionRef}
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
                  {s.prefix ? <span className="prefix">{s.prefix}</span> : null}
                  <CountUpStat
                    target={s.target}
                    decimals={s.decimals}
                    start={start}
                    reducedMotion={reducedMotion}
                  />
                  <span className="suffix">{s.suffix}</span>
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
