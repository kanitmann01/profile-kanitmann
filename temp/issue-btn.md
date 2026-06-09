## Parent

#53

## What to build

Disable the magnetic hover effect on `TactileButton` to eliminate the cursor-following shaking on hover. The `useMagneticHover` hook already accepts an `enabled` option — set it to `false` in `tactile-button.tsx`. Retain all other tactile feedback: press-scale-down (0.95), inset-shadow, synthesized audio (click/toggle/whoosh), and haptic vibration patterns.

This is a one-line prop change. The magnetic hover code and component API remain intact for future re-enabling.

## Acceptance criteria

- [ ] `TactileButton` no longer moves toward the cursor on hover
- [ ] Press effects (scale 0.95, inset shadow) still work on click/tap
- [ ] Sound effects and haptic vibrations still fire on interaction
- [ ] Existing `TactileButton` render tests pass
- [ ] All tactile card and article page button interactions remain unchanged

## Blocked by

None — can start immediately
