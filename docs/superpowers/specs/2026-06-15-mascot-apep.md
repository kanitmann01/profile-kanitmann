# Apep — Personal Mascot for kanit.codes

## Problem Statement

The portfolio at `kanit.codes` is a static, single-direction experience: visitors read content top-to-bottom and leave. There is no persistent presence, no sense of personality, and no way for the site to feel "alive" or react to what a visitor is doing. The owner (Kanit, a Data & ML engineer) wants a small, opinionated companion that gives the site a personal touch — a way to communicate tone, reward engagement, and react to context — without becoming a gimmick or competing with the existing hero / bento / projects content.

## Solution

Introduce **Apep**, a hand-authored SVG snake mascot mounted as a fixed bottom-right companion on every page of the site. Apep has nine distinct moods driven by clicks, hover, long-press, idle, route change, and form submission. The position is draggable and persists across sessions. The whole thing is built on top of the existing `TactileFeedback` system (sound + haptics), respects `prefers-reduced-motion`, and adds no new runtime dependencies.

The mascot is reactive, not generative — it has no LLM, no backend, no AI. Moods are pre-authored transforms of a single SVG silhouette. This keeps the asset footprint tiny (~5 KB), the runtime free, and the personality consistent.

## User Stories

1. As a visitor, I want to see a small character in the corner of the site, so that the site feels personal and alive.
2. As a visitor, I want to click the character and see it change expression, so that I can interact with it directly.
3. As a visitor, I want the click-cycle to feel predictable (next mood, or back to neutral), so that the interaction is learnable.
4. As a visitor, I want to drag the character to a position that doesn't get in the way of the content I'm reading.
5. As a visitor, I want the character's position to persist across page navigations, so that I don't have to re-position it on every page.
6. As a visitor, I want to long-press the character and see a "love" reaction, so that the interaction feels rewarding.
7. As a visitor, I want the character to react to me hovering over interactive elements (project cards, the hero CTA), so that it feels contextually aware.
8. As a visitor, I want the character to greet me the first time I visit a page in a session, so that the introduction feels personal.
9. As a visitor, I want the character to react when I successfully submit the contact form, so that the success state feels celebrated.
10. As a visitor, I want the character to look proud on the `/about` page or near certifications, so that those sections feel celebratory.
11. As a visitor, I want the character to go to sleep when I stop interacting, so that the animation feels alive but not overstimulating.
12. As a visitor, I want my sound/haptic preferences to extend to the character, so that I can mute it the same way I mute the rest of the site.
13. As a visitor who prefers reduced motion, I want the character to freeze in a static pose, so that the animation doesn't trigger my motion sensitivity.
14. As a visitor on a keyboard, I want to be able to focus the character and press Enter / Space to cycle its mood, so that I can interact without a mouse.
15. As a screen-reader user, I want the character to announce its current mood via `aria-label`, so that I know what state it's in.
16. As a developer adding a new mood, I want to add a single config entry, so that the system is easy to extend.
17. As a developer adding a new cross-component reaction, I want to add a single `data-mascot-react="<mood>"` attribute to the target element, so that I don't have to wire up event listeners.
18. As a developer, I want the character to be loaded via dynamic import, so that it doesn't bloat the initial bundle.
19. As a developer, I want the feature to live in a clear directory that follows the existing repo conventions, so that the codebase stays navigable.

## Implementation Decisions

### Asset (the SVG)

- The mascot SVG is hand-authored by the owner (Kanit) and saved at `public/mascot-source.svg`. The reference shape is the existing `public/mascot.svg` (a simple coiled snake), but the production asset will be re-drawn and group-tagged for animation.
- The SVG must have a square `viewBox` (recommended `0 0 300 300`), face left, and group the five animatable parts under stable `id` values: `body` (both coil layers + neck), `head`, `eye`, `tongue`, and optional `stroke`.
- No filters, gradients, masks, or external font references — plain fills + strokes only, so parts can be recolored via CSS variables.
- Full authoring requirements live in `temp/apep-requirements.html` (the durable reference doc).

### Component architecture

- A new top-level client component `<Mascot />` is mounted in `app/layout.tsx` via `next/dynamic` with `ssr: false`. It is the single state owner — no provider, no Context.
- The component is fixed-positioned bottom-right, sized to a small footprint (~120×120 px), with `pointer-events-auto` on the mascot itself and `pointer-events-none` on its wrapper.
- Internal structure: `<Mascot>` renders a `<motion.div>` (draggable, holds position state) containing `<Snake mood={...}>`, which is a presentational component that reads from the `MOODS` config and animates each part via `framer-motion`.
- The mascot is keyboard-focusable (`tabIndex={0}`) and responds to Enter / Space as a click.

### Mood system (data-driven, scalable)

- Nine moods in a `MOODS: Record<MoodId, MoodConfig>` record. Adding a 10th mood = one config entry, no other code change.
- Five click-cycleable moods: `neutral`, `happy`, `excited`, `curious`, `sleepy`.
- One pet-only mood: `love` (triggered by long-press, not part of the click cycle).
- Three system-only moods: `welcome` (first visit per session per route), `proud` (on `/about` or near certifications), `celebrate` (on contact form success).
- Each `MoodConfig` declares numeric values for `bodyScale`, `bodyRotation`, `bodyY`, `neckScaleY`, `neckRotation`, `headTilt`, `headY`, `eyeScaleY`, `eyeX`, `tongueScaleX`, `blinkInterval`, `tongueInterval`, plus `spring` (stiffness/damping), and `ariaLabel`.
- The `Eye` and `Tongue` sub-components own their own blink and flick animation loops (driven by `blinkInterval` and `tongueInterval` from the active mood). All other parts are pure mood-driven and animate on mood change only.

### Trigger system (declarative, decoupled)

- A `useMascotTriggers` hook attaches global listeners and calls back to the `<Mascot>` component with a mood to fire.
- Triggers implemented in v1:
  - **First visit per session**: `sessionStorage.getItem('apep-welcomed')` guard. Fires `welcome` (with the "Hi, I'm Apep!" bubble) on first hit, then sets the flag.
  - **Subsequent route change**: fires a smaller `welcome` (no bubble) on every `usePathname()` change.
  - **Idle >60s**: timer reset on `mousemove` and `keydown`. Fires `sleepy` on timeout.
  - **Custom event `apep:celebrate`**: dispatched by the contact form on submit success. Fires `celebrate`.
  - **`data-mascot-react="<mood>"` attribute**: a delegated `mouseover` listener on `document` walks up to the nearest element with the attribute and fires that mood (once per enter, then auto-returns to `neutral` after ~2s).
- Convention: any element anywhere in the app can opt into triggering a mood by adding `data-mascot-react="curious"` (or `excited`, etc.). No coupling between the mascot and the rest of the site.

### State + persistence

| State                  | Storage                                         | Behavior                        |
| ---------------------- | ----------------------------------------------- | ------------------------------- |
| Current mood           | `useState` in `<Mascot>`                        | Resets to `neutral` on refresh. |
| Drag position          | `localStorage[apep-position]`                   | Persists across refresh.        |
| Welcome flag           | `sessionStorage[apep-welcomed]`                 | Resets per tab.                 |
| `isMuted`              | Existing `localStorage[tactile-feedback-muted]` | Shared with tactile feedback.   |
| `prefersReducedMotion` | Existing `useReducedMotion` hook                | System-driven.                  |

### Tactile integration

- The component calls `useTactileFeedback()` from the existing `TactileFeedbackProvider`. No new feedback system; no new sounds.
- Click → `playSound("click")` + `triggerHaptic("light")`.
- Pet → `playSound("toggle")` + `triggerHaptic("success")`.
- Drag start → `playSound("whoosh")`.
- All audio and haptics respect the existing mute toggle automatically.

### Theming

- Three CSS variables on `:root`, overridden in `.dark`:
  - `--apep-light` (default `#26BBEC`; the light blue).
  - `--apep-dark` (default `#2A8EE6`; the dark blue).
  - `--apep-stroke` (default `#0a0a0a`; the black outline).
- Recoloring Apep is a three-line CSS change, no code change.

### Accessibility

- `role="img"` on the outer wrapper; `aria-label` driven by the current mood's `ariaLabel` (e.g. "Apep the snake, happy").
- `prefers-reduced-motion`: when on, freeze in a static `neutral` pose — no breathing, no blink loop, no tongue flick. No animation libraries running.
- Keyboard: `tabIndex={0}`, Enter / Space = click (cycle mood).
- `document.hidden` pauses all loops when the tab is in the background.
- The mascot is hidden from the accessibility tree entirely when `prefers-reduced-motion` is on AND the user has not interacted in this session (defensive — keeps the focus order clean).

### Loading

- `const Mascot = dynamic(() => import("@/components/mascot/mascot").then(m => m.Mascot), { ssr: false })` in `app/layout.tsx`. Mounts the component below the main content with a small `loading` placeholder (a single div with the right footprint to avoid CLS).

## Testing Decisions

### What makes a good test

Tests assert behavior, not implementation. We don't check framer-motion's internal state machine; we check that clicking the mascot changed its `aria-label`, that dragging it wrote to `localStorage`, that hovering a `data-mascot-react` element fired the right callback, etc. If a future refactor swaps framer-motion for a different animation lib, the tests should still pass.

### Test seams (highest to lowest)

1. **`MOODS` config (data seam)** — every `MoodId` has a `MOODS[id]` entry, all required fields are present and finite (no `NaN`), all `ariaLabel`s are unique, all interval tuples have `min < max`.
   - _Prior art_: `lib/validations/contact.test.ts` (pure data unit test pattern).

2. **`useMascotTriggers` hook (trigger seam)** — first-visit fires `welcome` + sets session flag, idle 60s fires `sleepy`, custom `apex:celebrate` event fires `celebrate`, `data-mascot-react` attribute fires expected mood on `mouseover`, route change re-fires welcome without the bubble.
   - _Prior art_: `hooks/__tests__/use-bookmarks.test.ts`, `hooks/__tests__/use-fable5-filter.test.ts` (hook test pattern with `renderHook` and `act`).

3. **`useMascotState` hook (state seam)** — reads position from `localStorage[apep-position]` on mount, writes on `savePosition`, falls back to default if absent, survives a full reload.
   - _Prior art_: same as above.

4. **`<Mascot />` component (integration seam)** — renders without crashing, click advances mood through the 5-mood cycle, pointer-down >600ms sets `love` and spawns hearts, drag persists position to `localStorage`, reduced-motion freezes animations, `aria-label` updates per mood, keyboard Enter / Space = click.
   - _Prior art_: `components/__tests__/contact-form.test.tsx` (RTL `render` + `fireEvent` + `waitFor` pattern).

### Test infrastructure

- Vitest, `@testing-library/react`, `vitest.setup.ts` (centralized mocks per ADR 0004 — `framer-motion`, `next/navigation`, `next/image` etc. are already mocked).
- No new test utilities required.

## Out of Scope

- Multiple mascot variants or a "mascot picker" — there is one Apep, that's it.
- Lottie / Rive / After Effects — framer-motion + inline SVG only.
- LLM integration, AI-generated speech, or any generative text — moods are pre-authored transforms of a single silhouette.
- A second mascot, seasonal variants, or a "wardrobe" system.
- A friendship counter, leaderboard, or any persistence beyond drag position.
- Recolor-to-site-primary in v1 — CSS variables are in place, but the default palette stays the reference blue.
- Audio beyond the existing tactile feedback system.
- Dark-mode-specific art — CSS variables handle the color shift.

## Further Notes

- The throwaway prototype at `app/prototype/apep/` was built to explore three design directions (`Coiled Sentinel`, `Slithering S`, `Pixel Buddy`). Kanit decided to hand-author the final SVG himself rather than adopt any of the three. **The prototype should be deleted** as part of the cleanup once the durable component is shipped.
- The hand-authoring reference (the SVG skeleton, the color spec, the authoring checklist) lives in `temp/apep-requirements.html`. That file is the durable reference for what the SVG should look like.
- A new ADR (`docs/adr/0008-mascot-apep.md`) capturing the architectural decisions — mood-config-as-data, data-attribute convention, hook-based trigger system, no-Context-for-single-owner — should be written as part of the implementation, not before.
- The implementation should follow the contact-page workflow: this spec → `docs/superpowers/plans/2026-06-15-mascot-apep.md` (task-by-task plan) → `to-issues` (split into independent issues) → `subagent-driven-development` (execute).
- A future v2 (out of scope here) could add: a small "mood journal" that shows Apep's recent mood history, an LLM-driven welcome message variant, and a `data-mascot-react` authoring guide added to `docs/agents/`.
