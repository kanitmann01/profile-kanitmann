## Parent

#73

## What to build

Build 3 interactive Physics/Math visual components: Projectile Motion, Circuit Simulator, and Function Grapher.

**End-to-end behavior:**

- Projectile Motion: adjust angle and velocity sliders, see trajectory arc animate, calculate and display range/max height/time of flight
- Circuit Simulator: add resistors in series/parallel, see current flow visualization, calculate equivalent resistance, voltage drops
- Function Grapher: quadratic and trigonometric functions with coefficient sliders, graph updates in real-time, shows key points (roots, vertex, period, amplitude)

**Key interfaces:**

- Each component is a self-contained React component
- Uses Framer Motion for animations
- Custom SVG for all visualizations
- react-katex for math equation rendering
- Mobile-responsive with touch support

## Acceptance criteria

- [ ] Projectile Motion has angle and velocity sliders
- [ ] Trajectory arc animates correctly
- [ ] Range, max height, time of flight calculate and display
- [ ] Circuit Simulator allows adding resistors
- [ ] Series and parallel configurations work
- [ ] Current flow visualization updates
- [ ] Equivalent resistance calculates correctly
- [ ] Function Grapher renders quadratic and trig functions
- [ ] Coefficient sliders update graph in real-time
- [ ] Key points (roots, vertex, etc.) are marked
- [ ] Math equations render with react-katex
- [ ] All components work on mobile
- [ ] Component tests for each interactive

## Blocked by

Slice 5 (Atomic note page)
