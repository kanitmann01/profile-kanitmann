"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  TactileButton,
  type TactileButtonProps,
} from "@/components/tactile-button";

/** Proximity radius in px — cursor must be within this to start pulling. */
export const MAGNET_RADIUS = 100;
/** Max translate in px at cursor dead-center. */
export const MAGNET_STRENGTH = 14;
/** Per-frame lerp toward the target offset. */
const SPRING = 0.18;
/** Extra margin past the radius before the pull releases (anti-jitter). */
const HYSTERESIS = 24;

/**
 * Pure magnetic math: given the cursor and the button center, return the
 * translate offset. Pull is strongest when the cursor is dead-center and
 * fades to zero at the radius boundary; outside the radius there is no pull.
 * Exported so the math can be unit-tested without DOM.
 */
export function magneticOffset(
  cursorX: number,
  cursorY: number,
  centerX: number,
  centerY: number,
  radius: number = MAGNET_RADIUS,
  strength: number = MAGNET_STRENGTH
): { x: number; y: number } {
  const dx = cursorX - centerX;
  const dy = cursorY - centerY;
  const dist = Math.hypot(dx, dy);
  if (dist === 0 || dist >= radius) {
    return { x: 0, y: 0 };
  }
  const pull = strength * (1 - dist / radius);
  return { x: (dx / dist) * pull, y: (dy / dist) * pull };
}

export interface MagneticButtonProps extends TactileButtonProps {
  /** Proximity radius in px (default MAGNET_RADIUS). */
  radius?: number;
  /** Max translate in px (default MAGNET_STRENGTH). */
  strength?: number;
  /** Extra classes for the positioning wrapper (e.g. "w-full"). */
  wrapperClassName?: string;
}

/**
 * Wraps TactileButton (sound + haptic + press scale are untouched) with a
 * hand-rolled, rAF-driven cursor-proximity pull. The magnetic translate is
 * applied to an outer span so it never fights framer-motion's transform on
 * the button itself.
 *
 * Desktop-only: gated on `(pointer: fine)`, so touch devices never register
 * the effect (the tactile ripple already covers touch feedback).
 *
 * Reduced motion: gated on an explicit framer-motion `useReducedMotion()`
 * check — `MotionConfig reducedMotion="user"` does NOT suppress hand-rolled
 * gestures, so this hook is the actual gate.
 */
const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      radius = MAGNET_RADIUS,
      strength = MAGNET_STRENGTH,
      wrapperClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [finePointer, setFinePointer] = React.useState(false);

    const wrapperRef = React.useRef<HTMLSpanElement>(null);
    const cursorRef = React.useRef({ x: 0, y: 0 });
    const currentRef = React.useRef({ x: 0, y: 0 });
    const activeRef = React.useRef(false);
    const rafRef = React.useRef<number | null>(null);
    const enabledRef = React.useRef(false);

    // Desktop-only gate: pointer: fine. Re-evaluates when the media query
    // changes (e.g. unplugging a mouse mid-session).
    React.useEffect(() => {
      const mq = window.matchMedia("(pointer: fine)");
      const update = () => setFinePointer(mq.matches);
      update();
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }, []);

    const enabled = finePointer && !prefersReducedMotion && !disabled;
    enabledRef.current = enabled;

    const stopLoop = React.useCallback(() => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, []);

    const frame = React.useCallback(() => {
      rafRef.current = null;
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.hypot(
        cursorRef.current.x - centerX,
        cursorRef.current.y - centerY
      );

      let targetX = 0;
      let targetY = 0;
      if (enabledRef.current && activeRef.current) {
        if (dist < radius + HYSTERESIS) {
          const offset = magneticOffset(
            cursorRef.current.x,
            cursorRef.current.y,
            centerX,
            centerY,
            radius,
            strength
          );
          targetX = offset.x;
          targetY = offset.y;
        } else {
          // Cursor left the proximity zone — release the pull.
          activeRef.current = false;
        }
      }

      const cur = currentRef.current;
      cur.x += (targetX - cur.x) * SPRING;
      cur.y += (targetY - cur.y) * SPRING;
      wrapper.style.transform =
        cur.x !== 0 || cur.y !== 0
          ? `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`
          : "";
      wrapper.style.willChange = cur.x !== 0 || cur.y !== 0 ? "transform" : "";

      const settled =
        !activeRef.current && Math.abs(cur.x) < 0.05 && Math.abs(cur.y) < 0.05;
      if (settled) {
        wrapper.style.transform = "";
        wrapper.style.willChange = "";
        currentRef.current = { x: 0, y: 0 };
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    }, [radius, strength]);

    const startLoop = React.useCallback(() => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }, [frame]);

    const handlePointerEnter = React.useCallback(() => {
      activeRef.current = true;
      if (enabledRef.current) {
        startLoop();
      }
    }, [startLoop]);

    const handlePointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLSpanElement>) => {
        cursorRef.current = { x: event.clientX, y: event.clientY };
      },
      []
    );

    // The button translates toward the cursor, so the pointer can "fall off"
    // while the cursor is still within the proximity zone. Keep pulling until
    // the frame's distance check (with hysteresis) releases us.
    const handlePointerLeave = React.useCallback(() => {
      if (enabledRef.current) {
        startLoop();
      }
    }, [startLoop]);

    // Cancel on unmount — no orphaned rAF, no INP regression.
    React.useEffect(() => stopLoop, [stopLoop]);

    // If the gates flip off mid-hover (reduced-motion toggled, mouse
    // unplugged, disabled), release the pull immediately and stop the loop.
    React.useEffect(() => {
      if (!enabled) {
        activeRef.current = false;
        stopLoop();
        if (wrapperRef.current) {
          wrapperRef.current.style.transform = "";
          wrapperRef.current.style.willChange = "";
        }
        currentRef.current = { x: 0, y: 0 };
      }
    }, [enabled, stopLoop]);

    return (
      <span
        ref={wrapperRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={cn("inline-block", wrapperClassName)}
      >
        <TactileButton ref={ref} disabled={disabled} {...props} />
      </span>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

export { MagneticButton };
