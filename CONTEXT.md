# Kanit Mann Portfolio — Domain Glossary

## Roles

- **Data & ML Engineer**: The unified professional title used across the site. Covers Data Engineering, Data Analysis, and ML Engineering. Signals both the "Data" breadth (analytics, pipelines, BI) and the "ML Engineer" depth (modeling, NLP, threat detection).

## Identity

- **KEN (KANIT) MANN**: Canonical name format. Nickname first (KEN) with legal name in parentheses for search discoverability.

## Experience

- **WorkType**: Discriminated union — `"Full-time" | "Part-time" | "Internship"`. Apprenticeships are classified as `"Internship"`.

## Architecture

- **Content Component**: Per-project/article prose lives in a thin React component. The dynamic route handles boilerplate (hero, metadata, JSON-LD); the content component handles rich prose.
- **Content Registry**: A `Record<string, ComponentType>` mapping slugs to content components. Type-safe, fails at compile time if a slug is missing.
- **Two-Hook Likes**: `useLikes()` is a read-only bulk fetcher; `useLikeItem(id)` is an independent per-item toggle manager. They don't sync state.
- **Presentational LikeButton**: Receives `count`, `isLiked`, `onToggle` as props. No internal state or localStorage.

