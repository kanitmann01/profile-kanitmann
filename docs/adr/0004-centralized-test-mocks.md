# ADR 0004: Centralized Test Mocks

**Date:** 2026-06-07  
**Status:** Accepted  

## Context

Every test file independently declared `vi.mock` for `next/image`, `next/link`, `framer-motion`, `next/navigation`, and `next-themes`. The framer-motion mock varied slightly between files (some filtered animation props, some didn't; different motion elements enumerated). This copy-paste drift caused inconsistencies and made mock changes require editing 15+ files.

## Decision

1. Move all shared mocks to `vitest.setup.ts` — runs before all tests.
2. **Framer-motion mock**: Enumerate all used motion elements (`div`, `nav`, `li`, `h1`, `p`, `span`, `button`, `section`, `main`, `article`, `header`, `footer`, `aside`, `form`, `input`, `textarea`, `select`, `option`, `a`, `img`, `ul`, `ol`, `dl`, `dt`, `dd`, `table`, `thead`, `tbody`, `tr`, `th`, `td`). Filter animation props (`initial`, `animate`, `exit`, `transition`, `whileHover`, `whileTap`, `variants`, `layout`, `layoutId`) before passing to DOM.
3. **Delete all `vi.mock` calls** from individual test files — the setup file handles everything.
4. **Individual test overrides**: If a test needs a custom mock, it can still call `vi.mock` after imports (Vitest allows this).

## Consequences

- Positive: ~300 lines of mock boilerplate deleted.
- Positive: Mock changes in one file (`vitest.setup.ts`).
- Positive: New tests start clean — no copy-paste needed.
- Positive: Consistent framer-motion mock across all tests.
- Negative: Slightly less explicit — test files don't show what's mocked.
- Negative: If a test needs a custom mock, it must override after imports (minor friction).

## Rejected Alternatives

- **Per-file mocks (status quo)**: Rejected because of copy-paste drift and maintenance burden.
- **Proxy-based motion mock**: Rejected in favor of explicit enumeration for type safety and clarity.
- **Pass-all-props mock**: Rejected because it leaks animation props to DOM elements, causing React warnings.
