## Parent

#73

## What to build

Build the atomic note page that displays a single learning note with all cognitive science layers. This is the primary learning surface.

**End-to-end behavior:**

- Page at `/imat/[subject]/[topic]/[note]` renders the full learning experience
- Layout: Back button → Title/Summary → Memory Hook → Explanation → Diagram → IMAT Trap → Why It Matters → Active Recall Questions → Related Notes → Confidence Rating
- Each section is a visually distinct card/component
- Active recall questions use QuizCard components
- Confidence rating uses the 3-button review UI
- Crosslinks render as clickable chips navigating to related notes
- Diagram section renders interactive SVG or Mermaid diagrams
- Page uses the AtomicNote data from the registry

**Key interfaces:**

- Page component loads note by slug from registry
- Renders each section as a distinct visual component
- Integrates with useSpacedRepetition hook for confidence tracking
- Uses Framer Motion for section entrance animations

## Acceptance criteria

- [ ] Atomic note page renders at `/imat/[subject]/[topic]/[note]`
- [ ] All sections render: Memory Hook, Explanation, Diagram, IMAT Trap, Why It Matters, Active Recall, Related, Confidence
- [ ] Each section has distinct visual styling (colored cards with icons)
- [ ] Active recall questions are interactive (QuizCard integration)
- [ ] Confidence rating updates localStorage via spaced repetition hook
- [ ] Crosslinks navigate to related notes
- [ ] Diagram section renders SVG or Mermaid content
- [ ] Page is mobile-responsive with proper spacing
- [ ] Framer Motion animations on section entrance
- [ ] Integration test: full flow from load → answer → rate → verify localStorage

## Blocked by

Slice 1 (Route foundation)
Slice 2 (AtomicNote data model)
Slice 3 (Spaced repetition engine)
Slice 4 (Quiz + Review UI components)
