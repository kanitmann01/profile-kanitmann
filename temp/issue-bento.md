## Parent

#53

## What to build

Wire the `HeadingLink` component into the three bento cards on the homepage. Replace the current `<Link> → <h3>` / `<a> → <h3>` pattern with `HeadingLink` in:

1. **BentoExperienceCard** — "My Experience" → href `/about#experience`, chip `/about/experience`
2. **BentoTechStackCard** — "Tech Stack" → href `/about#skills`, chip `/about/skills`
3. **BentoGitHubCard** — "GitHub" → href `https://github.com/kanitmann01`, chip `github.com/kanitmann01`, external=true

The `mb-4` spacing currently on the `<h3>` should move to the `HeadingLink` wrapper so the content below remains spaced correctly. The GitHub card uses an `<a>` tag instead of `next/link` — use the `external` prop.

## Acceptance criteria

- [ ] BentoExperienceCard renders chip `/about/experience` beside the heading
- [ ] BentoTechStackCard renders chip `/about/skills` beside the heading
- [ ] BentoGitHubCard renders chip `github.com/kanitmann01` beside the heading
- [ ] Heading click navigates correctly (existing behavior preserved)
- [ ] Chip is non-interactive (pointer-events-none)
- [ ] Spacing between heading and card content is preserved
- [ ] All existing bento card tests still pass
- [ ] Tests updated to assert chip text is rendered

## Blocked by

- #55
