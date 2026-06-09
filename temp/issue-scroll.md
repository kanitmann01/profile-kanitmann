## Parent

#53

## What to build

Add `scroll-mt-20` to the `#skills` and `#experience` anchor sections on the About page. Currently, clicking a hash link like `/about#experience` from a bento card scrolls the target section behind the fixed navigation bar. Adding scroll-margin-top accounts for the navbar height (~5rem / 80px) and ensures the section heading is fully visible.

## Acceptance criteria

- [ ] Navigating to `/about#experience` shows the "Professional Experience" heading below the navbar
- [ ] Navigating to `/about#skills` shows the "Toolkit" heading below the navbar
- [ ] No visual regression on normal page scroll
- [ ] Works on mobile viewport sizes

## Blocked by

None — can start immediately
