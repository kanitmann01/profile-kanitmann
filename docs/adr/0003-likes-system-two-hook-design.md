# ADR 0003: Likes System — Two-Hook Design

**Date:** 2026-06-07  
**Status:** Accepted  

## Context

The likes system had two state stores racing: `LikeButton` (localStorage + optimistic updates) and `useLikes` (fetch all + callback sync). `ArticleHeader` silently required the likes API via a hidden `useLikes()` call. Optimistic updates could race between the two stores.

## Decision

1. **`useLikes()`** — Read-only bulk fetcher. Calls `GET /api/likes` once, returns `{ likes, isLoading }`. Used on list pages (projects, articles) to get all counts at once. Does not manage updates.
2. **`useLikeItem(id, initialCount?)`** — Per-item toggle manager. Accepts optional `initialCount` from `useLikes()`. Handles optimistic updates, localStorage cache, and API calls (`POST /api/likes`). Independent state — does not sync back to `useLikes()`.
3. **`LikeButton`** — Becomes presentational. Receives `count`, `isLiked`, `onToggle` as props. No longer manages its own state or localStorage.
4. **`ArticleHeader`** — Receives `likeCount`, `isLiked`, `onLike` as props. No longer hides a `useLikes()` dependency.
5. **API endpoints** — Keep both `GET /api/likes` (bulk) and `POST /api/likes` (individual). No auth (acceptable risk for portfolio site).

## Consequences

- Positive: Single seam for like logic (`useLikeItem`). Race condition eliminated.
- Positive: `LikeButton` is testable as pure presentational component.
- Positive: `ArticleHeader` dependency is explicit (props, not hidden hook).
- Positive: List pages use bulk fetch (1 request), individual pages use per-item fetch.
- Negative: Two hooks (`useLikes` + `useLikeItem`) — slightly more API surface than one hook.
- Negative: No auth on likes endpoint — counts can be manipulated (acceptable for portfolio).

## Rejected Alternatives

- **Single hook only**: `useLikeItem(id)` as the only hook, no bulk fetcher. Rejected because list pages with many items would make N API calls on mount.
- **Synced state**: `useLikeItem(id)` calls `updateLikeCount` to sync back to `useLikes()` bulk state. Rejected because it reintroduces the race condition and coupling we're trying to eliminate.
- **Auth/rate limiting**: Add fingerprinting or rate limiting to prevent abuse. Rejected as overkill for a portfolio site where likes are a fun engagement metric, not critical data.
