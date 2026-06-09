## Parent

#53

## What to build

Add `LinkChip` to heading-level links on the listing pages:

1. **Projects listing** (`app/projects/page.tsx`): Insert `<LinkChip path={project.href} />` inside the `<h2 data-project-title>` element. The chip sits inline after the project title text.

2. **Articles listing** (`app/articles/page.tsx`): Two headings:
   - Featured article `<h2>`: Insert `LinkChip` after the featured article title
   - Article list `<h3>`: Insert `LinkChip` after the article title, before the underline animation `<span>`

In all cases, the chip is placed inside the existing heading element (inline) since the `<Link>` wraps the entire card/article structure and the chip needs to appear alongside the heading text.

## Acceptance criteria

- [ ] Projects listing page shows project href chips next to each project title heading
- [ ] Articles listing page shows article path chips next to featured article title
- [ ] Articles listing page shows article path chips next to each list item title
- [ ] All existing page functionality and tests remain intact
- [ ] Chip styling matches the accent-colored pill design

## Blocked by

- #55
