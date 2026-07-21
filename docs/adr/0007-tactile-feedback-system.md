# ADR 0007: Tactile Feedback System

## Status

Accepted

## Context

The portfolio site needed enhanced sensory feedback to create a "fidget toy" tactile experience. The idea was to combine motion, audio, and haptic feedback while maintaining a clean, minimalist aesthetic.

Key requirements:

- Motion feedback on interactive elements (hover shadow, press scale + inset shadow)
- Audio feedback (click, toggle, whoosh sounds)
- Haptic feedback (vibration patterns)
- Respects user preferences (reduced motion, mute)

## Decision

### 1. State Management: React Context over Zustand

**Chosen**: React Context with `TactileFeedbackProvider` at app root.

**Alternatives considered**:

- Zustand: Global state library, more powerful but adds dependency
- Per-component localStorage: Would cause inconsistent state and re-renders
- CSS custom properties: Can't control audio playback from CSS

**Rationale**: The tactile feedback system only needs to track a single boolean (`isMuted`). Context is lightweight, uses existing React patterns, and avoids adding a state management dependency for a simple toggle.

### 2. Audio Loading: Preloaded on Mount

**Chosen**: Preload synthesized audio buffers on app mount.

**Alternatives considered**:

- Lazy-load on first interaction: Smaller initial load but adds latency to first click
- Synthesize on-demand: No audio files but CPU overhead per sound

**Rationale**: Tactile feedback requires instant response. Preloading ensures zero-latency playback. Synthesized sounds are tiny (< 1KB each), so the performance cost is negligible.

### 3. Audio Default: Muted

**Chosen**: Audio is muted by default. User opts in via speaker icon in nav.

**Alternatives considered**:

- Always on with mute toggle: Audio on websites can be jarring
- Off by default with enable toggle: Same as chosen, just different wording

**Rationale**: Unexpected audio from a website is disruptive. Let users explicitly enable it. Store preference in localStorage.

### 4. Motion Feedback: Framed as Spring-Based Motion

**Chosen**:

- Hover shadow (6px blur, 15% opacity) via framer-motion `whileHover`
- Press scale (0.95) + inset shadow (2px blur, 30% opacity) via `whileTap`
- Spring transition (stiffness: 300, damping: 20)

**Alternatives considered**:

- Pure CSS transitions: Simpler but can't easily compose spring physics with pointer event wiring
- Magnetic hover (8px displacement, 120px radius): Prototyped but deleted — felt unstable on nav-scale elements and required global mousemove listeners

**Rationale**: Spring-based motion gives a physical "press into surface" feel without the complexity of cursor-tracking effects. The inset shadow on tap creates depth illusion. `prefers-reduced-motion` is respected by disabling all sensory feedback (audio + haptics follow the same toggle).

### 5. Haptic Patterns: Three Tiers

**Chosen**:

- Light tap (10ms): Button press
- Medium tap (20ms): Like toggle
- Double-tap (15-50-15ms): Form submit success

**Rationale**: Different vibration durations create distinguishable feedback for different actions. Tied to audio mute toggle for unified control.

### 6. Architecture: Layered Design

**Chosen**:

- **TactileFeedbackProvider**: React Context providing `playSound`, `triggerHaptic`, `isMuted`, `toggleMute`. Uses `useReducedMotion` to gate all feedback.
- **TactileButton**: Motion-enhanced button composed over the shared `buttonVariants` (from `@/components/ui/button`). Wraps a `motion.button` with hover/tap animations, sound, and haptic feedback. Supports `asChild` via Radix Slot.
- **TapRipple**: Ripple effect layer wrapping navigation links and other elements. Uses `useTapFeedback` hook.
- **AudioFeedback**: Three synthesized sounds (click, toggle, whoosh) generated via Web Audio API, preloaded on first mount.
- **HapticFeedback**: Vibration patterns via `navigator.vibrate`, silently fails on unsupported browsers (Safari iOS).

**Rationale**: Layered architecture keeps concerns separated — the context owns mute/state, TactileButton owns button-specific motion, and TapRipple owns the ripple effect for nav elements. No single component tries to do everything.

### 7. Implementation Order

**Chosen**:

1. Visual/motion features (remove floating shapes, spring-based button motion, TapRipple)
2. Audio/haptics (reduced motion hook, context provider, audio system, haptic system, speaker icon)

**Rationale**: Build and test motion first, then layer on sensory feedback. Catches motion issues before adding complexity.

## Consequences

### Positive

- Unified tactile experience across the site
- Single mute toggle controls all sensory feedback (audio, haptic, and motion follow `prefers-reduced-motion`)
- Respects user preferences (reduced motion, explicit audio opt-in)
- Lightweight implementation (no new dependencies beyond framer-motion)
- Instant audio playback (preloaded buffers)

### Negative

- React Context causes re-renders when mute state changes (acceptable for a single boolean)
- Haptic API not supported in Safari iOS (silently fails, acceptable)
- Preloaded audio adds ~5KB to initial load (negligible)

### Neutral

- Audio/haptics are default off, so most users won't experience them unless they opt in
- Motion effects are subtle by design, may not be immediately noticeable

## Retired Components

The following components were prototyped and subsequently deleted. Their implementations remain accessible via git history:

- **MagneticHover**: Global mousemove listener pulling elements toward cursor (8px max, 120px radius). Deleted because it felt unstable on smaller elements and required `enabled: false` to suppress at runtime.
- **CardTilt / TactileCard**: 3D card tilt based on cursor position (8deg max, 800px perspective). Deleted as a simplification pass — card content is better served by the standard shadcn Card component.
- **InsetShadow**: Was considered as a standalone component but kept as an inline `whileTap` boxShadow string on TactileButton. No promotion to a separate component is planned.
