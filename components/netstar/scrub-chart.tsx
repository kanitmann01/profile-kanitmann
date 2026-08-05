"use client";

import * as React from "react";
import { useScroll, useTransform } from "framer-motion";
import { useScrollRevealMode } from "@/hooks/use-scroll-reveal";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Minimal client island for the NetSTAR loss-landscape charts (Wave E.2).
 *
 * The SVG markup is built at build time in lib/loss-landscape/netstar.ts and
 * injected via dangerouslySetInnerHTML; this island only:
 *  - renders the figure chrome (card, injected SVG, children, caption), and
 *  - scrubs the chart on the Motion fallback path (Firefox), where
 *    `useScroll` + `useTransform` drive the `data-nsl-*` elements.
 *
 * On the CSS path (Chromium/Safari) and under reduced motion / mobile the
 * scrub hooks stay inert and the CSS classes in globals.css handle (or
 * skip) the animation. d3 never ships to the client.
 */
export function NetstarScrubChart({
  svg,
  caption,
  scrub,
  children,
}: {
  svg: string;
  caption: string;
  scrub: "dash" | "fade" | "grow";
  children?: React.ReactNode;
}) {
  const mode = useScrollRevealMode();
  const isMobile = useIsMobile();
  const isDesktop = !isMobile;
  const active = mode === "motion" && isDesktop;

  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Window-scroll mapping (same hook family as ReadingProgressRing) —
  // per-chart span measured in layout, re-measured on resize and once
  // layout settles (webfonts / lazy images shift positions after paint).
  const [span, setSpan] = React.useState<[number, number]>([0, 1]);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - vh
      );
      const top = rect.top + window.scrollY;
      setSpan([(top - vh) / scrollable, (top + rect.height) / scrollable]);
    };
    measure();
    window.addEventListener("resize", measure);
    const timer = window.setTimeout(measure, 400);
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(timer);
    };
  }, []);

  const progress = useTransform(scrollYProgress, span, [0, 1]);

  // Bind the MotionValue to the injected SVG elements. Inert when the
  // scrub isn't active or when `progress` isn't a real MotionValue (the
  // vitest mock hands back a plain number). When the scrub turns off
  // (reduced-motion, mobile, or CSS-mode swap) the inline styles this hook
  // applied are reset so the CSS animation or final static state is never
  // masked by a stale hidden value.
  React.useLayoutEffect(() => {
    const root = ref.current;
    if (!active) {
      resetScrub(root);
      return;
    }
    const m = progress as unknown as {
      on?: (event: string, cb: (v: number) => void) => () => void;
      get?: () => number;
      current?: number;
    };
    if (!root || typeof m?.on !== "function") return;
    const apply = (v: number) => SCRUBBERS[scrub](root, v);
    const unsubscribe = m.on("change", apply);
    const initial =
      typeof m.get === "function"
        ? m.get()
        : typeof m.current === "number"
          ? m.current
          : 0;
    apply(initial);
    return () => {
      unsubscribe();
      resetScrub(root);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, progress, scrub]);

  return (
    <figure className="rounded-xl border border-border bg-muted/30 p-4 md:p-6">
      <div ref={ref}>
        {/* Server-built SVG (lib/loss-landscape/netstar.ts). The data-nsl-*
            attributes drive the Motion fallback; the nsl-* classes drive
            the CSS view() scrub. */}
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      {children}
      <figcaption className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

type ScrubFn = (root: HTMLElement, progress: number) => void;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

/** Loss curve: stroke-dashoffset scrubs from each path's dash length to 0. */
function dashScrub(root: HTMLElement, progress: number) {
  root
    .querySelectorAll<HTMLElement>('[data-nsl-scrub="dash"]')
    .forEach((el) => {
      const dash = parseFloat(el.dataset.nslDash || "1");
      el.style.strokeDashoffset = String(dash * (1 - progress));
    });
}

/** Scatter: class groups fade in with a small stagger. */
function fadeScrub(root: HTMLElement, progress: number) {
  root
    .querySelectorAll<HTMLElement>('[data-nsl-scrub="fade"]')
    .forEach((el) => {
      const order = parseFloat(el.dataset.nslOrder || "0");
      el.style.opacity = String(
        clamp01((progress - order * 0.1) / (1 - order * 0.1))
      );
    });
}

/** Metrics bars: grow from the baseline with a stagger. */
function growScrub(root: HTMLElement, progress: number) {
  root
    .querySelectorAll<HTMLElement>('[data-nsl-scrub="grow"]')
    .forEach((el) => {
      const order = parseFloat(el.dataset.nslOrder || "0");
      el.style.transform = `scaleY(${clamp01(
        (progress - order * 0.1) / (1 - order * 0.1)
      )})`;
    });
}

const SCRUBBERS: Record<"dash" | "fade" | "grow", ScrubFn> = {
  dash: dashScrub,
  fade: fadeScrub,
  grow: growScrub,
};

/** Removes the inline styles a scrub applied so the element returns to its
 *  CSS-controlled / final static state (reduced-motion, mobile, CSS mode). */
function resetScrub(root: HTMLElement | null) {
  if (!root) return;
  root
    .querySelectorAll<HTMLElement>('[data-nsl-scrub="dash"]')
    .forEach((el) => el.style.removeProperty("stroke-dashoffset"));
  root
    .querySelectorAll<HTMLElement>('[data-nsl-scrub="fade"]')
    .forEach((el) => el.style.removeProperty("opacity"));
  root
    .querySelectorAll<HTMLElement>('[data-nsl-scrub="grow"]')
    .forEach((el) => el.style.removeProperty("transform"));
}
