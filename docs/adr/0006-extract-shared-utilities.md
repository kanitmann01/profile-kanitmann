# ADR 0006: Extract Shared Utility Modules

**Date:** 2026-06-07  
**Status:** Accepted  

## Context

The codebase had duplicated utility logic across multiple files:
- **Date formatting**: 4 call sites with 3 format variants (`Intl.DateTimeFormat` with "long" or "short" month)
- **Feed generation**: RSS and Atom routes shared 80% logic (sort, URL construction, cache headers)
- **Truncate**: `experience-timeline.tsx` had an inline pure function recreated every render

## Decision

1. **`lib/date-format.ts`**: Single `formatDate(date, format)` function with `format: "long" | "short"` parameter. Replaces all `Intl.DateTimeFormat` call sites.
2. **`lib/feed-generator.ts`**: Extract shared feed logic (sort by publishedAt, URL construction, cache headers). RSS and Atom routes use this helper.
3. **`lib/truncate.ts`**: Extract truncate function to a shared module. Used by `experience-timeline.tsx`.
4. **`use-sortable-items`**: Keep inline in projects/articles pages. The sort logic is simple enough that extraction adds complexity without clear benefit.

## Consequences

- Positive: Date formatting logic in one place — changes to format apply globally.
- Positive: Feed generation logic shared — RSS and Atom stay in sync.
- Positive: Truncate function no longer recreated every render.
- Negative: Slightly more indirection — utility logic is in `lib/` rather than inline.
- Negative: New utility modules add to the codebase surface area.

## Rejected Alternatives

- **Extract useSortableItems hook**: Rejected because the sort logic is simple (merge likes, sort by popular/recent) and extraction adds a hook abstraction without clear reuse beyond two pages.
- **Keep all utilities inline**: Rejected because date formatting and feed generation had clear duplication with drift risk.
