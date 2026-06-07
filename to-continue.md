# Architecture Review — profile-kanitmann

**Report**: `C:\Users\mannk\AppData\Local\Temp\opencode\architecture-review-20260607.html`

**Skill**: `improve-codebase-architecture`

**Date**: 2026-06-07

---

## Status

Exploration complete. HTML report generated with 6 deepening candidates. User has not yet selected a candidate for the grilling loop.

**Next step**: User picks a candidate → enter grilling conversation (design tree, constraints, seam shape, tests). Side effects: update CONTEXT.md with new domain terms, optionally record ADRs for rejected candidates.

---

## Candidates

### 1. Collapse Article pages into one dynamic route — **Strong**

**Files**: `app/articles/titanic-survival/page.tsx`, `app/articles/data-viz-analysis/page.tsx`, `app/articles/technical-blog-2/page.tsx`, `app/articles/technical-blog-3/page.tsx`, `app/articles/ccrb-allegations-analysis/page.tsx`, `app/articles/bios-issues-ubuntu/page.tsx`

**Problem**: Each article page repeats ~50 lines of identical metadata, JSON-LD schema, and URL construction. Adding an article means copying boilerplate.

**Solution**: Single `app/articles/[slug]/page.tsx` with `generateMetadata()`. Extract `buildArticleMetadata()` and `buildArticleSchema()` into a shared module. Per-article JSX becomes a content component dispatched by slug.

**Wins**: Locality (metadata logic in one place), leverage (one interface, six articles), delete ~300 lines, new article = data + content not boilerplate.

---

### 2. Collapse Project pages into one dynamic route — **Strong** (TOP PICK)

**Files**: `app/projects/titanic/page.tsx` (258 lines), `app/projects/voicebridge/page.tsx` (250 lines), `app/projects/echo-effect/page.tsx` (401 lines), `app/projects/college-major-shift-analysis/page.tsx` (251 lines), `app/projects/unified-bharat/page.tsx` (249 lines), `app/projects/twitch-analytics-pipeline/page.tsx` (272 lines), `components/project-card.tsx`, `app/page.tsx`

**Problem**: Six project pages share identical skeleton (hero, JSON-LD, metadata, tech stack, sections, related projects) hardcoded as JSX. `ProjectCard` declares an inline type duplicating `Project`, forcing a pointless field remap in `app/page.tsx`.

**Solution**: Add `sections` field to `Project` type. One `[slug]/page.tsx` renders from data. `ProjectCard` accepts `Project` directly. Delete the remap.

**Wins**: Delete ~1,400 lines, locality (project page logic in one module), leverage (Project type is single source of truth), type mismatch vanishes.

---

### 3. Deepen the Likes system into one module — **Strong**

**Files**: `app/api/likes/route.ts`, `hooks/use-likes.ts`, `components/like-button.tsx`, `components/article-header.tsx`, `app/projects/page.tsx`, `app/articles/page.tsx`

**Problem**: Like state owned by both `LikeButton` (localStorage + fetch) and `useLikes` (separate fetch + callback sync). `ArticleHeader` silently requires likes API via hidden `useLikes()` call. Optimistic updates race between two state stores.

**Solution**: Create `useLikeItem(id)` as the single seam — owns API call, localStorage cache, optimistic update. `LikeButton` becomes presentational (count, isLiked, onToggle). `ArticleHeader` no longer hides a data dependency.

**Wins**: Locality (like logic in one hook), race condition eliminated, LikeButton testable as pure presentational, hidden dependency made explicit.

---

### 4. Centralize test mock infrastructure — **Worth exploring**

**Files**: `vitest.setup.ts`, all `**/__tests__/*.test.tsx` (15+ files)

**Problem**: Every test file independently declares `vi.mock` for next/image, next/link, framer-motion. Framer-motion mock varies slightly between files (copy-paste drift).

**Solution**: Move all shared mocks into `vitest.setup.ts`. Comprehensive framer-motion mock covering all `motion.*` variants.

**Wins**: Delete ~300 lines of mock boilerplate, locality (mock changes in one file), new tests start clean.

---

### 5. Delete or activate dead code — **Worth exploring**

**Dead modules**:
- `hooks/use-keyboard-navigation.ts` — never imported (46 lines + 116 test)
- `lib/tag-filter.ts` — all exports unused (62 lines + 167 test)
- `components/tag-filter.tsx` — never rendered (57 lines + 178 test)
- `components/twitch-analytics-dashboard.tsx` — never imported (232 lines)
- `components/certification-card.tsx` — never imported (118 lines)
- `components/animations/floating-element.tsx` — never imported (28 lines)
- `data/projects.ts:groupProjectsByPeriod` — never called

**Dead code within files**:
- `app/articles/data-viz-analysis/page.tsx:241-256` — unused `ArrowLeftIcon` component (file imports `ArrowLeft` from lucide-react instead)

**Decision**: Either integrate `tag-filter` into the projects page (replacing sort dropdown), or delete it with all other dead modules. Total: ~600 lines code + ~500 lines tests.

---

### 6. Extract shared utility modules — **Speculative**

**New modules**:
- `lib/date-format.ts` — 4 call sites, 3 format variants (about/page, certification-card, article-header, articles/page)
- `lib/feed-generator.ts` — RSS + Atom routes share 80% logic (sort, URL construction, cache headers)
- `hooks/use-sortable-items.ts` — projects + articles sort identically (merge likes, sort by popular or recent)
- `lib/truncate.ts` — `experience-timeline.tsx` has inline pure function recreated every render

**Animation wrappers**:
- `components/animations/` — 5 files (`fade-in`, `slide-in`, `scale-on-hover`, `stagger-container`, `stagger-item`) are thin `motion.div` wrappers. Could consolidate into a single `motion-wrapper.tsx` with variants, or replace with CSS transitions for simpler cases.

---

### 7. Add tests for high-risk untested areas — **Worth exploring**

**Untested modules**:
- `app/api/likes/route.ts` — File I/O with no tests. Should add tests for GET/POST handlers.
- `hooks/use-likes.ts` — Fetch logic untested. Should add tests for `fetchLikes` and `updateLikeCount`.
- `components/contact-form.tsx` — Mailto URL construction untested. Should add tests for email body encoding.

**Decision**: Add test coverage for these high-risk areas (file I/O, fetch logic, URL construction).

---

## Additional Findings (integrated into candidates)

- **GPA contradiction**: `app/about/page.tsx` line 103 says "GPA: 4.0/4.0", line 221 passes `gpa="3.75"` to `GraduationSection` → **Added to content plan P0**
- **Projects subtitle**: "analytics" and "machine learning" overlap → **Already in content plan item #20**
- **Dead function**: `app/articles/data-viz-analysis/page.tsx` has unused `ArrowLeftIcon` component (lines 241-256) → **Added to Candidate 5**
- **Shallow animation primitives**: 5 files in `components/animations/`, each a thin `motion.div` wrapper → **Added to Candidate 6**
- **Untested high-risk areas**: `app/api/likes/route.ts` (file I/O, no auth), `hooks/use-likes.ts` (fetch logic), `components/contact-form.tsx` (mailto URL construction) → **Added as Candidate 7**
