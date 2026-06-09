## Parent

#53

## What to build

Create two new components:

**`LinkChip`**: A pure presentational component that renders a given path string as a decorative accent-colored pill. Takes a single `path` prop. Non-interactive (`pointer-events-none`, `select-none`). Styled with `bg-primary/10`, `border-primary/20`, `font-mono text-[10px]`, `rounded-full` pill shape.

**`HeadingLink`**: A convenience wrapper that composes a `<Link>` (from next/link) or `<a>` (for external URLs) wrapping an `<h3>` alongside a `LinkChip`. Props: `href` (string), `chip` (string — cleaned path to display), `external` (boolean, default false), `children` (ReactNode). The chip sits beside the heading in a flex container with `items-baseline gap-2 mb-4` spacing.

## Acceptance criteria

- [ ] `LinkChip` renders the given `path` string inside an accent-colored pill
- [ ] `LinkChip` is non-interactive (pointer events pass through)
- [ ] `HeadingLink` renders an `<h3>` inside a `<Link>` (internal) or `<a>` (external)
- [ ] `HeadingLink` places the `LinkChip` beside the heading text
- [ ] `HeadingLink` applies `group-hover:text-primary` transition to the heading
- [ ] Unit tests exist for both components

## Blocked by

None — can start immediately
