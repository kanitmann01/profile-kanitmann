"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { useScrollRevealMode } from "@/hooks/use-scroll-reveal";
import { cn } from "@/lib/utils";

/**
 * Generic viewport-entry reveal with a progressive-enhancement split:
 *
 * 1. CSS path — browsers with `animation-timeline: view()` (Chrome/Safari)
 *    get the pure-CSS scroll-driven animation from the `.rv-*` classes in
 *    globals.css. Zero JS animation runtime.
 * 2. Motion fallback — unsupported browsers (Firefox, as of Aug 2026) keep
 *    the framer-motion `whileInView` behaviour via `motionProps`.
 * 3. Reduced motion — final, fully-visible state immediately (plain element,
 *    no hidden start). Never leaves content invisible.
 *
 * `delay`-style Motion props only apply on the fallback path; the CSS path
 * animates as each element enters the viewport via its own `view()` timeline.
 */
interface ScrollRevealProps {
  children: ReactNode;
  /** `.rv-*` scroll-driven class from globals.css, applied on the CSS path. */
  cssClass: string;
  /** DOM attributes applied in every path (e.g. data-testid). */
  domProps?: Record<string, any>;
  /** Motion props (initial/whileInView/variants/viewport/transition) for the fallback path. */
  motionProps?: Record<string, any>;
  /** Element rendered by the CSS/reduced paths (motion renders the same tag in the fallback). */
  as?: "div" | "article" | "section" | "li" | "p" | "span" | "h2" | "h3";
  className?: string;
}

type RevealTag = NonNullable<ScrollRevealProps["as"]>;

export function ScrollReveal({
  children,
  cssClass,
  domProps,
  motionProps,
  as: Tag = "div",
  className,
}: ScrollRevealProps) {
  const mode = useScrollRevealMode();

  if (mode === "css") {
    return (
      <Tag className={cn(cssClass, className)} {...domProps}>
        {children}
      </Tag>
    );
  }

  if (mode === "reduced") {
    return (
      <Tag className={className} {...domProps}>
        {children}
      </Tag>
    );
  }

  const MotionTag = (m as unknown as Record<RevealTag, typeof m.div>)[Tag];
  return (
    <MotionTag className={className} {...motionProps} {...domProps}>
      {children}
    </MotionTag>
  );
}
