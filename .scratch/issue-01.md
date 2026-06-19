## Parent

#73

## What to build

Set up the hidden `/imat` route structure with privacy protections. This is the foundation that all other IMAT pages will build on.

**End-to-end behavior:**

- Create `/imat` route that renders a placeholder page
- Create nested route structure: `/imat/[subject]`, `/imat/[subject]/[topic]`, `/imat/[subject]/[topic]/[note]`
- All IMAT pages use the existing root layout (nav, footer, theme)
- Privacy: no link in navigation, no sitemap entry, `<meta name="robots" content="noindex, nofollow">` on all IMAT pages, no JSON-LD structured data

**Key interfaces:**

- IMAT layout component that wraps all IMAT pages with privacy meta tags
- Route structure follows Next.js App Router conventions

## Acceptance criteria

- [ ] `/imat` route exists and renders a placeholder
- [ ] Nested routes exist: `/imat/[subject]`, `/imat/[subject]/[topic]`, `/imat/[subject]/[topic]/[note]`
- [ ] IMAT pages use existing root layout
- [ ] No link to `/imat` in navigation component
- [ ] No `/imat` entry in sitemap.ts
- [ ] All IMAT pages have `<meta name="robots" content="noindex, nofollow">`
- [ ] No JSON-LD structured data on IMAT pages
- [ ] Tests verify privacy meta tags are present

## Blocked by

None - can start immediately
