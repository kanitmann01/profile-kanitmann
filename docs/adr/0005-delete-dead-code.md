# ADR 0005: Delete Dead Code

**Date:** 2026-06-07  
**Status:** Accepted  

## Context

The codebase contained ~600 lines of dead code (modules never imported outside their tests) and ~500 lines of corresponding tests. This included:
- `hooks/use-keyboard-navigation.ts` + test (46 + 116 lines)
- `lib/tag-filter.ts` + test (62 + 167 lines)
- `components/tag-filter.tsx` + test (57 + 178 lines)
- `components/twitch-analytics-dashboard.tsx` + test (232 lines)
- `components/certification-card.tsx` (118 lines, no test)
- `components/animations/floating-element.tsx` (28 lines, no test)
- `data/projects.ts:groupProjectsByPeriod` function (never called)

## Decision

Delete all dead code. The `tag-filter` module was considered for integration into the projects page (replacing the sort dropdown), but rejected in favor of deletion.

## Consequences

- Positive: ~1,100 lines deleted (code + tests).
- Positive: Reduced maintenance burden — no need to update dead code during refactors.
- Positive: Clearer codebase — only live code remains.
- Negative: If `tag-filter` functionality is needed later, it must be reimplemented.
- Negative: `twitch-analytics-dashboard` contained a complex component that might have been useful for the Twitch project page (but was never integrated).

## Rejected Alternatives

- **Integrate tag-filter**: Add tag filtering to the projects page, replacing the sort dropdown. Rejected because the current sort dropdown (by popular/recent) is sufficient, and tag filtering adds complexity without clear user benefit.
- **Keep dead code "just in case"**: Rejected because version control preserves history — dead code can always be recovered if needed.
