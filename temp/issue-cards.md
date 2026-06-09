## Parent

#53

## What to build

Add `LinkChip` to heading-level links inside card components on the homepage and project detail pages:

1. **ProjectCard** (`components/project-card.tsx`): Insert `<LinkChip path={project.href} />` inside `<CardTitle>` (renders as `<h3>`). The card title currently links to the project detail page.

2. **RelatedProjects** (`components/related-projects.tsx`): Insert `<LinkChip path={project.href} />` inside `<CardTitle>` for each related project card. These cards link to the respective project detail pages.

In both cases, the chip sits inline inside the heading element after the title text, since the `<Link>` wraps the entire card structure.

## Acceptance criteria

- [ ] Homepage project cards show project href chips next to each card title
- [ ] Related projects section on project detail pages shows href chips next to each related project title
- [ ] All existing card functionality, hover effects, and click behavior preserved
- [ ] Existing tests pass

## Blocked by

- #55
