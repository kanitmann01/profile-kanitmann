## Parent

#73

## What to build

Build 3 interactive Chemistry visual components: Periodic Table, pH Scale, and Molecular Geometry.

**End-to-end behavior:**

- Periodic Table: hover/click elements to see electron configuration, electronegativity trends highlighted, groups/periods labeled
- pH Scale: slider from 0-14, solution color changes in real-time, shows [H+] and [OH-] concentrations, common substances marked
- Molecular Geometry: VSEPR shapes you can rotate in 3D, adjust lone pairs to see shape changes (linear, trigonal, tetrahedral, etc.)

**Key interfaces:**

- Each component is a self-contained React component
- Uses Framer Motion for animations
- Custom SVG for Periodic Table and pH Scale
- 3D rotation for Molecular Geometry (CSS transforms or Three.js if needed)
- Mobile-responsive with touch support

## Acceptance criteria

- [ ] Periodic Table renders all elements with correct layout
- [ ] Hover shows electron configuration and properties
- [ ] Trends (electronegativity, atomic radius) can be highlighted
- [ ] pH Scale slider works from 0-14
- [ ] Solution color changes smoothly with pH
- [ ] [H+] and [OH-] concentrations display correctly
- [ ] Common substances marked on pH scale
- [ ] Molecular Geometry renders VSEPR shapes
- [ ] Shapes can be rotated
- [ ] Adjusting lone pairs changes shape correctly
- [ ] All components work on mobile
- [ ] Component tests for each interactive

## Blocked by

Slice 5 (Atomic note page)
