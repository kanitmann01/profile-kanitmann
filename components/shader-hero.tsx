"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Exp 15: lightweight shader hero accent.
 *
 * Full-bleed plane behind the hero headline + photo. Hand-written fbm /
 * gradient fragment shader in the brand amber/coral palette (theme tokens
 * read from CSS vars at mount). One accent — not a 3D world.
 *
 * Perf / battery gates (all client-side, decided in an effect so the SSR
 * and first client render stay hydration-safe as `null`):
 *
 *  1. MOBILE (max-width 767px) — live shader is SKIPPED entirely. A recruiter
 *     on a phone gets a static CSS gradient instead; no WebGL context, no RAF
 *     loop, no GPU cost. This is the documented mobile strategy: it keeps
 *     LCP/INP on mobile green (CrUX-grade) by construction.
 *  2. prefers-reduced-motion — fully suspended, renders nothing. The existing
 *     CSS hero gradient behind it still paints, so the hero never looks bare.
 *  3. prefers-reduced-data (data-saver) — fully suspended, same as above.
 *  4. Tab hidden (document.hidden / visibilitychange) — RAF loop paused.
 *  5. dpr capped at 1.5, low-power context, no depth/stencil/antialias, 5
 *     fbm octaves, slow drift. ogl is dynamic-imported inside the mount
 *     effect, so the ~29KB lib lands in a post-paint chunk — never blocks
 *     first paint or LCP.
 *  6. No WebGL (or init failure) — graceful static gradient fallback.
 *
 * Contrast: the canvas sits at z-[1] behind the photo (z-[2]) and content
 * (z-10) at opacity 0.3 (dark-mode colors dimmed ×0.45), pointer-events-none,
 * aria-hidden. Text contrast stays WCAG 2.2 AA in either theme.
 */

/** Below this viewport width the live shader never mounts. */
export const MOBILE_MAX_WIDTH = 767;

/** dpr never exceeds this — plenty for a soft blurred accent, halves fill
 * rate on Retina-class phones/laptops. */
export const MAX_DPR = 1.5;

type Mode = "idle" | "suspended" | "static" | "webgl";

const VERTEX = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = vUv;
  vec2 q = vec2(
    fbm(p + uTime * 0.07),
    fbm(p + vec2(5.2, 1.3) + uTime * 0.05)
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + uTime * 0.04),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + uTime * 0.03)
  );
  float f = fbm(p + 4.0 * r);
  vec3 col = mix(uColorA, uColorB, clamp(f * f * 1.6, 0.0, 1.0));
  col = mix(uColorC, col, clamp(length(q) * 1.8, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;

/** hsl(triplet like "37 90% 55%") -> rgb 0..1. Pure + exported for tests. */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): [number, number, number] {
  const hn = (((h % 360) + 360) % 360) / 360;
  const sn = Math.min(Math.max(s, 0), 100) / 100;
  const ln = Math.min(Math.max(l, 0), 100) / 100;
  if (sn === 0) return [ln, ln, ln];
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue2rgb = (t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [hue2rgb(hn + 1 / 3), hue2rgb(hn), hue2rgb(hn - 1 / 3)];
}

/** Read an HSL triplet CSS var off <html> (theme tokens). */
function readCssHsl(
  varName: string,
  fallback: [number, number, number]
): [number, number, number] {
  try {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
    const parts = raw.split(/\s+/).map((part) => parseFloat(part));
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
      return hslToRgb(parts[0], parts[1], parts[2]);
    }
  } catch {
    // getComputedStyle can throw in odd embedded contexts — fall through.
  }
  return fallback;
}

export function ShaderHero() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");

  useEffect(() => {
    // Suspend first: reduced motion OR data-saver → nothing at all.
    if (reducedMotion) {
      setMode("suspended");
      return;
    }
    if (window.matchMedia("(prefers-reduced-data: reduce)").matches) {
      setMode("suspended");
      return;
    }
    // Mobile: static gradient, never the live shader (see header comment).
    if (window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches) {
      setMode("static");
      return;
    }
    setMode("webgl");
  }, [reducedMotion]);

  useEffect(() => {
    if (mode !== "webgl") return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let rafId = 0;
    let renderer: any;
    let mesh: any;
    let onVisibility: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let paused = false;

    const startLoop = () => {
      if (cancelled) return;
      paused = false;
      const loop = (t: number) => {
        if (cancelled) return;
        if (paused) return;
        try {
          if (mesh && mesh.program) {
            mesh.program.uniforms.uTime.value = t / 1000;
          }
          renderer.render({ scene: mesh });
        } catch {
          // One bad frame must never take the tab down; loop keeps going.
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      paused = true;
      cancelAnimationFrame(rafId);
    };

    (async () => {
      // Cheap capability probe BEFORE pulling in ogl (~29KB chunk).
      const probe = document.createElement("canvas");
      const hasWebGL =
        typeof probe.getContext === "function" &&
        (probe.getContext("webgl2") || probe.getContext("webgl")) != null;
      if (!hasWebGL) {
        if (!cancelled) setMode("static");
        return;
      }

      try {
        const { Renderer, Program, Mesh, Triangle, Vec3 } = await import("ogl");
        const canvas = document.createElement("canvas");
        canvas.className = "shader-hero-canvas";
        canvas.setAttribute("aria-hidden", "true");

        renderer = new Renderer({
          canvas,
          dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
          alpha: true,
          antialias: false,
          depth: false,
          stencil: false,
          powerPreference: "low-power",
        });

        // ogl's Renderer defaults to 300x150 and writes inline px styles
        // that override `.shader-hero-canvas { width/height: 100% }` (see
        // globals.css). Pin the canvas to the container and re-pin on any
        // layout change — setSize multiplies the buffer by the capped dpr
        // internally, so pass CSS pixel dims.
        const setCanvasSize = () => {
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        setCanvasSize();
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(setCanvasSize);
          resizeObserver.observe(container);
        }

        const gl = renderer.gl;

        // Brand palette from theme tokens; fallbacks mirror --primary /
        // --accent / a deep neutral for both themes. In dark mode the
        // accent colors are dimmed (×0.45) so even a full-amber fbm peak at
        // canvas opacity 0.3 keeps foreground text ≥4.5:1 (WCAG 2.2 AA).
        const dim = document.documentElement.classList.contains("dark")
          ? 0.45
          : 1;
        const colorA = readCssHsl("--primary", [0.957, 0.651, 0.149]).map(
          (v) => v * dim
        ) as [number, number, number];
        const colorB = readCssHsl("--accent", [0.902, 0.494, 0.4]).map(
          (v) => v * dim
        ) as [number, number, number];
        const colorC = readCssHsl("--background", [0.97, 0.2, 0.97]);

        const program = new Program(gl, {
          vertex: VERTEX,
          fragment: FRAGMENT,
          uniforms: {
            uTime: { value: 0 },
            uColorA: { value: new Vec3(...colorA) },
            uColorB: { value: new Vec3(...colorB) },
            uColorC: { value: new Vec3(...colorC) },
          },
        });

        mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
        container.appendChild(canvas);

        if (cancelled) {
          container.removeChild(canvas);
          return;
        }

        onVisibility = () => {
          if (document.hidden) {
            stopLoop();
          } else {
            startLoop();
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        startLoop();
      } catch {
        if (!cancelled) setMode("static");
      }
    })();

    return () => {
      cancelled = true;
      stopLoop();
      if (onVisibility) {
        document.removeEventListener("visibilitychange", onVisibility);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      const canvas = container.querySelector("canvas");
      if (canvas && container.contains(canvas)) {
        container.removeChild(canvas);
      }
      // Let the GPU reclaim the context promptly.
      try {
        renderer?.gl?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch {
        // Context may already be gone — nothing to do.
      }
    };
  }, [mode]);

  if (mode === "suspended" || mode === "idle") return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="shader-hero-layer absolute inset-0 z-[1] pointer-events-none overflow-hidden"
    >
      {mode === "static" ? <div className="shader-hero-static" /> : null}
    </div>
  );
}
