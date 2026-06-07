# ADR 0002: Article Pages via Dynamic Route + Content Components

**Date:** 2026-06-07  
**Status:** Accepted  

## Context

Six article pages (`/articles/{titanic-survival,data-viz-analysis,technical-blog-2,technical-blog-3,ccrb-allegations-analysis,bios-issues-ubuntu}`) each duplicate ~50 lines of boilerplate: JSON-LD Article schema, JSON-LD BreadcrumbList, metadata export (title, description, keywords, OG, Twitter), back button, `<ArticleHeader>` wrapper, and footer (Tech Stack + Tags). Total ~300 lines of repetition. The Titanic article is outdated and will be deleted, leaving 5 articles.

## Decision

1. Create a single dynamic route `app/articles/[slug]/page.tsx`.
2. Extract metadata/schema builders into `lib/article-metadata.ts` — exports `buildArticleMetadata()` and `buildArticleSchema()`.
3. Per-article content lives in a thin content component under `content/articles/`.
4. A slug-to-component registry map (`Record<string, ComponentType>`) in `data/article-content.tsx` dispatches the correct content.
5. Delete the Titanic article (`app/articles/titanic-survival/` and its entry in `data/articles.ts`).

## Consequences

- Positive: ~300 lines deleted. New article = one `articles.ts` entry + one content component.
- Positive: Metadata/schema logic in one place — changes to OG tags or JSON-LD structure apply globally.
- Positive: Static registry is type-safe and fails at compile time if a slug is missing.
- Negative: Content components are still React components (not MDX), so non-coders can't edit them.
- Negative: Article-specific data (e.g., chart data arrays) lives in content components rather than a centralized data file.

## Rejected Alternatives

- **Data-driven Sections**: Adding a typed `Section[]` to `ArticleMeta`. Rejected because article prose varies too much (nested subsections, custom charts, variable-length lists) — forcing it into a type either makes the type brittle or loses expressiveness.
- **MDX**: Markdown files rendered at build time. Rejected because the article pages have a very specific visual layout (back button, ArticleHeader, footer with Tech Stack + Tags) that MDX wouldn't own — the route would still need layout wrapping, reducing the benefit.
- **Dynamic convention import**: `import(@/content/articles/${slug})`. Rejected because runtime dynamic imports are fragile and harder to mock in tests.
