# ADR 0007: Tactile Feedback System

## Status

Accepted

## Context

The portfolio site needed enhanced sensory feedback to create a "fidget toy" tactile experience. The idea was to combine physics-based motion, audio, and haptic feedback while maintaining a clean, minimalist aesthetic.

Key requirements:
- Magnetic hover effect on interactive elements
- 3D card tilt based on cursor position
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

### 4. Motion Limits: 8px / 8deg

**Chosen**: 
- Magnetic hover: 8px max displacement, 120px activation radius
- 3D card tilt: 8deg max rotation, 800px perspective

**Alternatives considered**:
- More intense (16px / 16deg): Would feel unstable and disorienting
- Less intense (4px / 4deg): Too subtle to notice

**Rationale**: The goal is "physical object" feel, not "broken interface." 8px/8deg is the sweet spot between perceptible and natural. Respects `prefers-reduced-motion` by disabling all motion.

### 5. Scope: Buttons and Cards Only

**Chosen**: Apply magnetic hover and 3D tilt to `TactileButton` and `TactileCard` only.

**Alternatives considered**:
- All interactive elements (including nav links): Nav links are too small, would feel unstable
- Only buttons: Misses the opportunity to make project cards feel physical

**Rationale**: Buttons and cards are large enough for the displacement to feel proportional. Nav links are small text elements where 8px movement would make them hard to click.

### 6. Haptic Patterns: Three Tiers

**Chosen**:
- Light tap (10ms): Button press
- Medium tap (20ms): Like toggle
- Double-tap (15-50-15ms): Form submit success

**Rationale**: Different vibration durations create distinguishable feedback for different actions. Tied to audio mute toggle for unified control.

### 7. Implementation Order: Two Phases

**Chosen**:
1. Phase 1: Visual/motion features (remove floating shapes, inset shadow, magnetic hover, 3D tilt)
2. Phase 2: Audio/haptics (reduced motion hook, context provider, audio system, haptic system, speaker icon)

**Rationale**: Build and test motion first, then layer on sensory feedback. Catches motion issues before adding complexity.

## Consequences

### Positive
- Unified tactile experience across the site
- Single mute toggle controls all sensory feedback
- Respects user preferences (reduced motion, explicit audio opt-in)
- Lightweight implementation (no new dependencies)
- Instant audio playback (preloaded buffers)

### Negative
- React Context causes re-renders when mute state changes (acceptable for a single boolean)
- Haptic API not supported in Safari iOS (silently fails, acceptable)
- Preloaded audio adds ~5KB to initial load (negligible)

### Neutral
- Audio/haptics are default off, so most users won't experience them unless they opt in
- Motion effects are subtle by design, may not be immediately noticeable
