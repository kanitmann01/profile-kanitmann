# Kanit Mann Portfolio — Domain Glossary

## Roles

- **Data & ML Engineer**: The unified professional title used across the site. Covers Data Engineering, Data Analysis, and ML Engineering. Signals both the "Data" breadth (analytics, pipelines, BI) and the "ML Engineer" depth (modeling, NLP, threat detection).

## Identity

- **KEN (KANIT) MANN**: Canonical name format. Nickname first (KEN) with legal name in parentheses for search discoverability.

## Experience

- **WorkType**: Discriminated union — `"Full-time" | "Part-time" | "Internship" | "Contract"`. Apprenticeships are classified as `"Internship"`.

## Architecture

- **Content Component**: Per-project/article prose lives in a thin React component. The dynamic route handles boilerplate (hero, metadata, JSON-LD); the content component handles rich prose.
- **Content Registry**: A `Record<string, ComponentType>` mapping slugs to content components. Type-safe, fails at compile time if a slug is missing.

## Tactile Feedback

- **TactileFeedback**: The unified system providing sensory feedback across the site. Combines motion (spring-based button hover/tap animations, inset shadow on press), audio (click, toggle, whoosh), and haptic (vibration patterns) feedback. Controlled by a single mute toggle.
- **AudioFeedback**: Synthesized sounds (click, toggle, whoosh) at 10-15% volume. Default muted, user opts in via speaker icon.
- **HapticFeedback**: Vibration patterns (10ms button, 20ms like, 15-50-15ms form success). Mobile only, tied to audio mute toggle.
- **TactileFeedbackProvider**: React Context at app root managing mute state. Persists to localStorage. Provides `useTactileFeedback()` hook.
- **TactileButton**: Motion-enhanced button composed over shadcn `Button`'s `buttonVariants`. Wraps a `motion.button` with hover shadow lift, press scale+inset shadow, spring transitions, and wired to `playSound("click")` + `triggerHaptic("light")` on pointer down. No magnetic hover. Supports `asChild` via Radix Slot.
- **TapRipple**: Ripple effect layer for navigation links. Uses `useTapFeedback` hook to render expanding circular ripples on pointer down.

## Digital Museum

- **Fable5Site**: A typed record for a visual, deployable Claude Fable 5 build in the museum (`data/fable5.ts`). Distinguished from `Fable5Mention` by having a `screenshotUrl` and a `demoUrl` for iframe preview.
- **Fable5Mention**: A typed record for a non-deployable Fable 5 case (X post, benchmark writeup, tutorial). Renders in the museum's monospace credits list, not in the card grid.
- **MuseumCard**: The tactile card component for a `Fable5Site`. Uses `next/image` for the poster with fallback, supports tag-chip clicks for filtering, opens the modal on activation.
- **MuseumModal**: A Radix `Dialog` that previews a `Fable5Site` with a poster first and a lazy-mounted sandboxed iframe on `▶ play live`. Auto-falls back to the poster + "visit site" CTA if the iframe is blocked or errors.
- **MuseumParticles**: The WebGL2 particle background. Pauses on `prefers-reduced-motion` and on `document.hidden`. Silent fallback to a black background if WebGL2 is unavailable.
- **MuseumFilterBar**: The tag-pill filter bar above the grid. Multi-select, URL-synced via `?tags=`, with a shuffle and a clear control.
- **SubmitSiteButton**: A server component that renders an `<a>` linking to a pre-filled `fable5-submission` GitHub Issue. No backend, no form, no email — git-native contribution.
