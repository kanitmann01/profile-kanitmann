# ADR 0001: Project Pages via Dynamic Route + Content Components

**Date:** 2026-06-07  
**Status:** Accepted  

## Context

Six project pages (`/projects/{titanic,voicebridge,echo-effect,college-major-shift-analysis,unified-bharat,twitch-analytics-pipeline}`) each duplicate ~50 lines of boilerplate: JSON-LD breadcrumb, hero layout, image+gradient overlay, back link, tech stack rendering, metadata/OG/Twitter exports, and RelatedProjects integration. Total ~1,400 lines of repetition. Additionally, `ProjectCard` declares an inline type that duplicates the `Project` type, forcing a remap in `app/page.tsx`.

## Decision

1. Create a single dynamic route `app/projects/[slug]/page.tsx`.
2. Extract boilerplate (hero, JSON-LD, metadata builder, tech stack renderer) into shared helpers.
3. Per-project content lives in a thin content component under `data/project-content.tsx`.
4. A slug-to-component registry map (`Record<string, ComponentType>`) dispatches the correct content.
5. `ProjectCard` accepts `Project` directly, eliminating the inline type and the `app/page.tsx` remap.

## Consequences

- Positive: ~1,400 lines deleted. New project = one `projects.ts` entry + one content component.
- Positive: `Project` type is single source of truth; the `ProjectCard` type mismatch vanishes.
- Positive: Static registry is type-safe and fails at compile time if a slug is missing.
- Negative: Content components are still React components (not MDX), so non-coders can't edit them.
- Negative: The `sections` data structure was rejected in favor of rich prose components — content is expressive but not data-portable.

## Rejected Alternatives

- **Data-driven Sections**: Adding a typed `Section[]` to `Project`. Rejected because the prose varies too much (nested subsections, variable-length lists, inline emphasis) — forcing it into a type either makes the type brittle or loses expressiveness.
- **MDX**: Markdown files rendered at build time. Rejected because the project pages have a very specific visual layout (gradient hero, tech stack chips, back link) that MDX wouldn't own — the route would still need layout wrapping, reducing the benefit.
- **Dynamic convention import**: `import(@/content/${slug})`. Rejected because runtime dynamic imports are fragile and harder to mock in tests.
