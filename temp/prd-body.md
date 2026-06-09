## Problem Statement

Headings that link to other pages or external destinations provide no visual hint about where they lead. A user seeing "My Experience" in a bento card has no way of knowing it links to /about#experience without clicking. Similarly, buttons use a magnetic hover effect that feels unstable — the cursor-following movement causes visible shaking on hover, making the site feel janky rather than polished.

## Solution

Two-part solution:

**Part 1: Link destination chips on headings.** Add a small, decorative accent-colored chip next to every heading that is wrapped in a link (both internal `Link` and external `<a>`). The chip displays a cleaned version of the destination path — internal hash anchors are rewritten as path segments (e.g. `/about#experience` → `/about/experience`), and external URLs are stripped to domain+path (e.g. `https://github.com/kanitmann01` → `github.com/kanitmann01`). The chip is purely decorative (non-interactive, `pointer-events-none`) — the heading itself remains the clickable element.

**Part 2: Fix button shaking.** Disable the magnetic hover effect on `TactileButton` while retaining the tactile press feedback (inset shadow, scale-down), sound effects, and haptic vibration. This eliminates the cursor-following movement that caused the shaking.

## User Stories

1. As a site visitor, I want to see where a heading-level link will take me before clicking, so that I can decide whether to navigate there.
2. As a site visitor, I want external link destinations displayed on headings, so I know when I'm leaving the site.
3. As a site visitor, I want buttons to feel stable on hover, so the interface feels polished and trustworthy.
4. As a site visitor, I want internal hash-anchor links to show their destination as a clean path, so the URL is readable.
5. As a developer, I want a reusable component for heading-level link chips, so the pattern is consistent across the site and easy to maintain.
6. As a developer, I want the magnetic hover effect removed from buttons, so future contributors don't need to debug the shaking.
7. As a site visitor, I want hash-anchor navigation to scroll with proper offset for the fixed navbar, so the target section is fully visible.
8. As a site visitor, I want the chip to be non-interactive, so I don't accidentally click it instead of the heading.
9. As a developer, I want existing bento card tests to continue passing after adding chips, so I know existing behavior is preserved.
10. As a developer, I want the chip's visual style (accent-colored pill, monospace font, no icon) consistent with the site's design language.

## Implementation Decisions

### Component Architecture

Two new components:
- **`LinkChip`**: A pure presentational chip that renders a given path string as an accent-colored pill. Receives `path` as a prop. Non-interactive (`pointer-events-none`, `select-none`).
- **`HeadingLink`**: A convenience wrapper for the bento card pattern that composes a `<Link>` (or `<a>` for external) wrapping an `<h3>` alongside a `LinkChip`. Takes `href`, `chip`, optional `external`, and `children`.

### Scope: 8 Heading-Level Links

| Heading | Destination | Display |
|---------|-------------|---------|
| My Experience | /about#experience | /about/experience |
| Tech Stack | /about#skills | /about/skills |
| GitHub | https://github.com/kanitmann01 | github.com/kanitmann01 |
| Project title (projects listing) | /projects/[slug] | /projects/[slug] |
| Featured article title | /articles/[slug] | /articles/[slug] |
| Article list title | /articles/[slug] | /articles/[slug] |
| Project card title (homepage) | /projects/[slug] | /projects/[slug] |
| Related project card title | /projects/[slug] | /projects/[slug] |

For the listing/card cases (#4-8), the `LinkChip` is inserted directly inside the heading element rather than beside it, since the link wraps the entire card structure.

### Magnetic Hover: Disabled, Not Removed

The `useMagneticHover` hook and `TactileButton` remain in the codebase. The magnetic effect is disabled by passing `enabled: false` to the hook. This preserves the component API and makes re-enabling trivial if a refined version is developed later. The tactile press effects (scale-down 0.95, inset shadow) and feedback sounds/haptics are fully retained.

### Cleaned Path Rules

- Internal hash: `/about#experience` → `/about/experience` (replace `#` with `/`)
- External URL: `https://github.com/kanitmann01` → `github.com/kanitmann01` (strip protocol)
- Already-clean paths: `/projects/some-project` → `/projects/some-project` (no change)

### Scroll Offset Fix

Add `scroll-mt-20` to the `#skills` and `#experience` anchor sections on the About page so that hash navigation accounts for the fixed navbar height.

### Chip Styling

- Background: `bg-primary/10` (10% primary color fill)
- Border: `border-primary/20` (20% primary color stroke)
- Text: `text-primary` (full primary color)
- Font: `font-mono text-[10px]` (monospace, small)
- Shape: `rounded-full` pill
- Padding: `px-2 py-0.5`
- No icon — text only
- Class: `pointer-events-none select-none whitespace-nowrap`

## Testing Decisions

### Good tests
- Test the rendered output (path string, link href) rather than implementation details (class names, internal state)
- Use `screen.getByText()` for chip presence rather than testing exact DOM nesting
- Prefer testing at the component integration level (bento card renders chip) over isolated unit tests of LinkChip

### Modules to Test
- **LinkChip**: Unit test — renders path string, applies correct styling
- **HeadingLink**: Unit test — renders heading + link + chip, uses correct href, handles external vs internal
- **BentoExperienceCard**: Existing test extended — assert chip text `/about/experience` is present
- **BentoTechStackCard**: Existing test extended — assert chip text `/about/skills` is present
- **BentoGitHubCard**: Existing test extended — assert chip text `github.com/kanitmann01` is present
- **TactileButton**: No new test — existing render tests suffice. The fix is internal (prop change) with no behavioral API change visible to consumers

### Prior Art
Existing bento card tests at `components/__tests__/bento-*.test.tsx` use `@testing-library/react` with `screen.getByText()` assertions. New tests follow the same pattern.

## Out of Scope

- Adding chips to section anchor headings (e.g., `<h2 id="experience">` on the About page) — those are anchor targets, not linked headings
- Adding link icons (Link / ExternalLink) to the chip — user chose text-only
- Changing the underlying URL scheme from hash-based to path-based routing
- Making the chip clickable or interactive — decorative only
- Removing `useMagneticHover` code — only disabling it
- Replacing `TactileButton` with standard `Button` — keeping tactile feedback intact

## Further Notes

- The cleaned path transformation from `/about#experience` to `/about/experience` is a display-only change. The actual `href` remains `/about#experience` for hash-anchor behavior.
- The `scroll-mt-20` fix on About page sections is a small UX improvement directly tied to the link chip work — without it, clicking the chip's associated link would scroll the target behind the navbar.
