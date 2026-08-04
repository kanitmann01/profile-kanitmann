"use client";

import * as React from "react";
import { ViewTransition } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Exp 09: cross-route View Transitions.
 *
 * Wraps the route outlet (root-layout children) in React 19's
 * `<ViewTransition>`, which Next 16 resolves to its bundled React build
 * (`next/dist/compiled/react`, a canary channel that ships the component;
 * stable `react@19.2` on npm does not export it yet — see
 * `types/react-view-transition.d.ts` for the type shim).
 *
 * Next App Router client navigations are React transitions, so the outgoing
 * and incoming pages crossfade (250ms; see globals.css). Named elements
 * (project card image -> detail hero, nav logo) get their own groups and
 * morph in place.
 *
 * Reduced motion: the provider renders a plain fragment, so navigation stays
 * instant — matching `prefers-reduced-motion` end to end (the CSS
 * `::view-transition-*` kill-switch in globals.css is a second line of
 * defense for the one-frame window before the hook settles).
 *
 * Browsers without the View Transitions API: React feature-detects
 * `document.startViewTransition` and skips the animation — navigation is
 * instant, no JS fallback needed. The same guard applies here when the
 * runtime's React build doesn't export `<ViewTransition>` at all (e.g. npm
 * `react@19.2` outside Next's bundler): the provider degrades to a plain
 * fragment and navigation stays instant.
 */
export function ViewTransitionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || typeof ViewTransition === "undefined") {
    return <>{children}</>;
  }

  return <ViewTransition>{children}</ViewTransition>;
}
