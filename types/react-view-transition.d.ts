import type { ComponentType, ReactNode } from "react";

/**
 * Type shim for React's `<ViewTransition>` (Exp 09).
 *
 * The component is a React 19 canary API that Next 16 ships through its
 * bundled React build (`next/dist/compiled/react`). The pinned
 * `@types/react@18` doesn't know about it, and npm `react@19.2.0` doesn't
 * export it — so declare the subset this app uses. Runtime resolution is
 * Next's own `react` alias; this file only satisfies `tsc --noEmit`.
 *
 * `name`: scopes the transition to the subtree and lets shared elements
 * (project card image -> detail hero, nav logo) morph between snapshots.
 */
declare module "react" {
  export const ViewTransition: ComponentType<{
    name?: string;
    children?: ReactNode;
  }>;
}
