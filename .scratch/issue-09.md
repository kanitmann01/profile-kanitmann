## Parent

#73

## What to build

Build 4 interactive Biology visual components: DNA Strand, Cell Membrane, Mitosis/Meiosis, and Enzyme-Substrate.

**End-to-end behavior:**

- DNA Strand: 3D-ish helix you can rotate, unzip to see base pairing, click a base to see its pair (A-T, G-C)
- Cell Membrane: drag molecules (O2, glucose, ions) to see which cross via diffusion, active transport, or can't cross
- Mitosis/Meiosis: step-through animation with draggable chromosomes, shows crossing over in meiosis
- Enzyme-Substrate: adjust temperature/pH sliders, watch reaction rate change, see competitive vs non-competitive inhibition

**Key interfaces:**

- Each component is a self-contained React component
- Uses Framer Motion for animations
- Custom SVG for visual elements
- Accepts props for interactivity state
- Mobile-responsive with touch support

## Acceptance criteria

- [ ] DNA Strand component renders interactive helix
- [ ] DNA can be rotated and unzipped
- [ ] Clicking a base shows its pair
- [ ] Cell Membrane allows dragging molecules
- [ ] Molecules show correct transport method feedback
- [ ] Mitosis step-through animation works
- [ ] Meiosis shows crossing over
- [ ] Enzyme-Substrate has temp/pH sliders
- [ ] Reaction rate updates in real-time
- [ ] Competitive vs non-competitive inhibition demonstrated
- [ ] All components work on mobile (touch events)
- [ ] Component tests for each interactive

## Blocked by

Slice 5 (Atomic note page)
