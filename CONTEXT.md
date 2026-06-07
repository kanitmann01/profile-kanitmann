# Kanit Mann Portfolio — Domain Glossary

## Roles

- **Data & ML Engineer**: The unified professional title used across the site. Covers Data Engineering, Data Analysis, and ML Engineering. Signals both the "Data" breadth (analytics, pipelines, BI) and the "ML Engineer" depth (modeling, NLP, threat detection).

## Identity

- **KEN (KANIT) MANN**: Canonical name format. Nickname first (KEN) with legal name in parentheses for search discoverability.

## Experience

- **WorkType**: Discriminated union — `"Full-time" | "Part-time" | "Internship"`. Apprenticeships are classified as `"Internship"`.

## Architecture

- **Content Component**: Per-project/article prose lives in a thin React component. The dynamic route handles boilerplate (hero, metadata, JSON-LD); the content component handles rich prose.
- **Content Registry**: A `Record<string, ComponentType>` mapping slugs to content components. Type-safe, fails at compile time if a slug is missing.
- **Two-Hook Likes**: `useLikes()` is a read-only bulk fetcher; `useLikeItem(id)` is an independent per-item toggle manager. They don't sync state.
- **Presentational LikeButton**: Receives `count`, `isLiked`, `onToggle` as props. No internal state or localStorage.

## Tactile Feedback

- **TactileFeedback**: The unified system providing sensory feedback across the site. Combines motion (magnetic hover, 3D tilt, inset shadow), audio (click, toggle, whoosh), and haptic (vibration patterns) feedback. Controlled by a single mute toggle.
- **MagneticHover**: Interactive elements (buttons, cards) pull toward the cursor within a 120px radius, max 8px displacement. Uses spring physics for snap-back.
- **CardTilt**: Project cards rotate up to 8deg on X/Y axes based on cursor position, creating parallax depth. Perspective: 800px.
- **InsetShadow**: Press state adds inset shadow (4px blur, 30% opacity) to create "sinking into surface" illusion.
- **AudioFeedback**: Synthesized sounds (click, toggle, whoosh) at 10-15% volume. Default muted, user opts in via speaker icon.
- **HapticFeedback**: Vibration patterns (10ms button, 20ms like, 15-50-15ms form success). Mobile only, tied to audio mute toggle.
- **TactileFeedbackProvider**: React Context at app root managing mute state. Persists to localStorage. Provides `useTactileFeedback()` hook.

