"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Void page: ambient WebGL backdrop — the Active Theory "iconic brand emblem".
 *
 * Full-bleed scene behind the /void chrome: a circular wireframe portal with
 * a cyan-to-magenta rim glow at viewport center, a particle fountain of
 * green/gold/cyan specks bursting downward from it, and a faint green aurora
 * wash bleeding from the top-left corner. Pure #000 canvas color; the page
 * background stays black and the GL buffer clears transparent.
 *
 * Scene structure (three layered passes, one renderer.render per frame):
 *   (a) AURORA   — full-screen Triangle running the domain-warped fbm shader
 *                  (ported from shader-hero) retinted dim teal-green with a
 *                  top-left corner falloff. Atmosphere, never the subject.
 *   (b) PORTAL   — custom ring geometries drawn as LINES: an outer rim +
 *                  inner ring rotating one way, a faceted hexagon core mark
 *                  rotating the other. Gradient rim from aRim per-vertex
 *                  factor, cyan -> magenta, additive for a soft glow.
 *   (c) PARTICLES— 300 point sprites (soft rounds via gl_PointCoord) in
 *                  additive blend. CPU physics (mirroring museum-particles):
 *                  downward drift from the portal center, toroidal X wrap,
 *                  bottom respawn feeds the fountain back through the emblem.
 *
 * Perf / battery gates (all client-side, decided in an effect so the SSR and
 * first client render stay hydration-safe as `null`):
 *
 *  1. MOBILE (max-width 767px) — WebGL is SKIPPED entirely. A phone gets the
 *     CSS `.void-static-emblem` fallback instead; no context, no RAF, no GPU.
 *  2. prefers-reduced-motion — fully suspended, renders nothing.
 *  3. prefers-reduced-data (data-saver) — fully suspended, same as above.
 *  4. Tab hidden (visibilitychange) — RAF loop paused, resumed on visible.
 *  5. Ambient idle-park: no pointer activity for VOID_IDLE_MS (3s) stops
 *     scheduling frames entirely; any pointer move wakes it. This scene is
 *     NOT scroll-coupled (single-viewport page), so it parks on pointer
 *     activity instead of Lenis velocity. The listener lives on `window`
 *     because the container is pointer-events-none and the scene IS the
 *     viewport — any pointer move anywhere counts as activity.
 *  6. dpr capped at 1.5, low-power context, no depth/stencil/antialias,
 *     ~500 total GL primitives. ogl is dynamic-imported inside the mount
 *     effect, so the lib lands in a post-paint chunk — never blocks LCP.
 *  7. No WebGL (or init failure) — graceful static fallback.
 *  8. CONTEXT LOSS — `webglcontextlost` is prevented, the loop stops, and
 *     the scene degrades one-way to `"static"` for the session. Rebuilding
 *     three programs/geometries/uniforms on `webglcontextrestored` is
 *     complex for a rare GPU-reset event, so we deliberately do NOT restore;
 *     the CSS fallback is safe and visually acceptable. `contextrestored`
 *     is still listened for (and ignored) to document the choice.
 */

/** Below this viewport width the live scene never mounts. */
export const MOBILE_MAX_WIDTH = 767;

/** dpr never exceeds this — halves fill rate on Retina-class screens. */
export const MAX_DPR = 1.5;

/** Ambient idle: after this long without pointer activity the RAF loop
 * parks itself (a static backdrop needs zero frames/sec). Longer than
 * shader-hero's 1s — this scene isn't scroll-coupled, it's ambient. */
export const VOID_IDLE_MS = 3000;

/** Particle fountain size — matches museum-particles' PARTICLE_COUNT. */
export const PARTICLE_COUNT = 300;

/** Portal radius as a fraction of viewport half-height (NDC y is unscaled). */
export const PORTAL_RADIUS = 0.3;

/** Margin (CSS px) past which particles wrap / respawn. */
const PARTICLE_MARGIN = 40;

type Mode = "idle" | "suspended" | "static" | "webgl";

/* ---------------------------------------------------------------------------
 * (a) Aurora — fbm fragment, ported from shader-hero (5 octaves, same domain
 * warp), retinted to a faint green and faded toward the bottom-right corner
 * so the wash bleeds from the top-left as the design specifies.
 * ------------------------------------------------------------------------- */

const AURORA_VERTEX = /* glsl */ `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const AURORA_FRAGMENT = /* glsl */ `
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
  // Top-left bleed: uv origin is bottom-left, so (1-x)*y peaks at the
  // top-left corner and falls to zero toward the bottom-right. Very low
  // alpha — it is atmosphere, not the subject.
  float corner = smoothstep(0.0, 0.85, (1.0 - vUv.x) * vUv.y);
  gl_FragColor = vec4(col, corner * 0.5);
}
`;

/* ---------------------------------------------------------------------------
 * (b) Portal — explicit LINE-pair ring geometry. aRim is the per-vertex
 * position on a full cyan->magenta cycle around the emblem, precomputed in
 * JS (no atan in the shader). Rotation happens in the vertex shader from
 * uSpeed, and p.x /= uAspect keeps the circle circular under any aspect.
 * ------------------------------------------------------------------------- */

const PORTAL_VERTEX = /* glsl */ `
attribute vec2 position;
attribute float aRim;
uniform float uTime;
uniform float uAspect;
uniform float uSpeed;
varying float vRim;
void main() {
  float ang = uTime * uSpeed;
  float c = cos(ang);
  float s = sin(ang);
  vec2 p = mat2(c, -s, s, c) * position;
  p.x /= uAspect;
  gl_Position = vec4(p, 0.0, 1.0);
  vRim = aRim + 0.06 * sin(uTime * 0.35);
}
`;

const PORTAL_FRAGMENT = /* glsl */ `
precision highp float;
uniform float uTime;
varying float vRim;
void main() {
  vec3 cyan = vec3(0.0, 0.8, 1.0);
  vec3 magenta = vec3(1.0, 0.0, 0.6);
  float glow = 1.0 + 0.12 * sin(uTime * 1.4);
  vec3 col = mix(cyan, magenta, clamp(vRim, 0.0, 1.0)) * glow;
  gl_FragColor = vec4(col, 0.92);
}
`;

/* ---------------------------------------------------------------------------
 * (c) Particles — point sprites in CSS-pixel space (same math as
 * museum-particles: clip = pos/res * 2 - 1, y flipped). Soft round points,
 * additive blend.
 * ------------------------------------------------------------------------- */

const PARTICLES_VERTEX = /* glsl */ `
attribute vec2 aPosition;
attribute vec3 aColor;
attribute float aSize;
uniform vec2 uResolution;
uniform float uTime;
varying vec3 vColor;
void main() {
  vec2 clip = (aPosition / uResolution) * 2.0 - 1.0;
  clip.y = -clip.y;
  gl_Position = vec4(clip, 0.0, 1.0);
  float pulse = 1.0 + 0.35 * sin(uTime * 1.5 + aPosition.x * 0.01);
  gl_PointSize = aSize * pulse;
  vColor = aColor;
}
`;

const PARTICLES_FRAGMENT = /* glsl */ `
precision mediump float;
varying vec3 vColor;
void main() {
  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);
  if (d > 0.5) discard;
  float alpha = (1.0 - d * 2.0) * 0.45;
  gl_FragColor = vec4(vColor, alpha);
}
`;

/** Green / gold / cyan speck palette (design: particle field of these). */
const PARTICLE_COLORS: ReadonlyArray<readonly [number, number, number]> = [
  [0.25, 0.95, 0.55], // green
  [1.0, 0.78, 0.25], // gold
  [0.3, 0.9, 1.0], // cyan
];

/* ---------------------------------------------------------------------------
 * Theme helpers — copied from shader-hero (pure + exported for tests).
 * ------------------------------------------------------------------------- */

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

/** Component-wise lerp for the green retint below. */
function mixVec(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export function VoidScene(): JSX.Element | null {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");

  // Gates: same order as shader-hero — suspension first, then mobile, then
  // the live scene.
  useEffect(() => {
    if (reducedMotion) {
      setMode("suspended");
      return;
    }
    if (window.matchMedia("(prefers-reduced-data: reduce)").matches) {
      setMode("suspended");
      return;
    }
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
    let renderer: any = null;
    let scene: any = null;
    let canvas: HTMLCanvasElement | null = null;
    let onVisibility: (() => void) | null = null;
    let onPointerMove: (() => void) | null = null;
    let onContextLost: ((e: Event) => void) | null = null;
    let onContextRestored: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let paused = false;
    let loopErrorLogged = false;
    let lastActivityAt = performance.now();
    let lastT = 0;
    let dt = 0;
    let contextLost = false;

    // Viewport dims in CSS px, kept current by the ResizeObserver.
    const size = { w: 0, h: 0 };
    // Programs we own — uTime is pushed to each one every frame.
    const programs: any[] = [];

    const startLoop = () => {
      if (cancelled || contextLost) return;
      paused = false;
      const loop = (t: number) => {
        if (cancelled || paused) return;
        try {
          dt = Math.min(0.1, (t - lastT) / 1000);
          lastT = t;
          const time = t / 1000;
          for (const program of programs) {
            if (program.uniforms.uTime) {
              program.uniforms.uTime.value = time;
            }
          }
          stepParticles(time);
          renderer.render({ scene });
        } catch (err) {
          // One bad frame must never take the tab down; loop keeps going.
          if (!loopErrorLogged) {
            loopErrorLogged = true;
            // eslint-disable-next-line no-console
            console.error("[void-scene] render loop error:", err);
          }
        }
        // Ambient idle-park: no pointer activity for VOID_IDLE_MS → stop
        // scheduling frames. Any pointer move (or visibility change) wakes
        // the loop via the listeners below.
        if (performance.now() - lastActivityAt > VOID_IDLE_MS) {
          paused = true;
          return;
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      paused = true;
      cancelAnimationFrame(rafId);
    };

    // ---------------------------------------------------------------------
    // Particle physics — CPU side, museum-particles style. Positions live in
    // CSS pixels; the shader maps them to clip space via uResolution.
    // ---------------------------------------------------------------------
    const particleData = {
      positions: new Float32Array(PARTICLE_COUNT * 2),
      velocities: new Float32Array(PARTICLE_COUNT * 2),
      phases: new Float32Array(PARTICLE_COUNT),
    };
    let particleGeometry: any = null;

    /** Reset particle i at the portal center with a downward burst velocity
     * (the "constellation collapsing into a fountain" feed). */
    const spawnParticle = (i: number) => {
      const spread = Math.min(size.w, size.h) * 0.04;
      const angle = Math.random() * Math.PI * 2;
      particleData.positions[i * 2] = size.w / 2 + Math.cos(angle) * spread;
      particleData.positions[i * 2 + 1] =
        size.h / 2 + Math.random() * size.h * 0.05;
      particleData.velocities[i * 2] = (Math.random() - 0.5) * 10;
      particleData.velocities[i * 2 + 1] = -(14 + Math.random() * 34);
      particleData.phases[i] = Math.random() * Math.PI * 2;
    };

    const stepParticles = (time: number) => {
      const pos = particleData.positions;
      const vel = particleData.velocities;
      const phases = particleData.phases;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = i * 2;
        const y = i * 2 + 1;
        // Slow horizontal wander keeps the stream organic.
        pos[x] += vel[x] * dt + Math.sin(time * 0.6 + phases[i]) * 10 * dt;
        pos[y] += vel[y] * dt;
        // Toroidal wrap: X wraps at the screen edges; anything that falls
        // out of the viewport re-enters at the portal (the fountain feed).
        if (pos[y] < -PARTICLE_MARGIN || pos[y] > size.h + PARTICLE_MARGIN) {
          spawnParticle(i);
        }
        if (pos[x] < -PARTICLE_MARGIN) pos[x] += size.w + PARTICLE_MARGIN * 2;
        else if (pos[x] > size.w + PARTICLE_MARGIN) {
          pos[x] -= size.w + PARTICLE_MARGIN * 2;
        }
      }
      particleGeometry.updateAttribute(particleGeometry.attributes.aPosition);
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
        const {
          Renderer,
          Program,
          Mesh,
          Triangle,
          Vec3,
          Vec2,
          Geometry,
          Transform,
        } = await import("ogl");

        /** Build an explicit LINE-pair ring geometry (no index buffer — the
         * loop is closed by emitting both endpoints of every segment). */
        const buildRingGeometry = (
          gl: any,
          ring: Array<{ radius: number; segments: number }>
        ) => {
          const positions: number[] = [];
          const rims: number[] = [];
          for (const { radius, segments } of ring) {
            for (let i = 0; i < segments; i++) {
              const a0 = (i / segments) * Math.PI * 2;
              const a1 = ((i + 1) / segments) * Math.PI * 2;
              const rim0 = 0.5 + 0.5 * Math.sin(a0);
              const rim1 = 0.5 + 0.5 * Math.sin(a1);
              positions.push(
                Math.cos(a0) * radius,
                Math.sin(a0) * radius,
                Math.cos(a1) * radius,
                Math.sin(a1) * radius
              );
              rims.push(rim0, rim1);
            }
          }
          return new Geometry(gl, {
            position: { size: 2, data: new Float32Array(positions) },
            aRim: { size: 1, data: new Float32Array(rims) },
          });
        };

        /** Faceted core mark: hexagon + spokes out to the inner ring. */
        const buildCoreGeometry = (gl: any) => {
          const positions: number[] = [];
          const rims: number[] = [];
          const hexR = PORTAL_RADIUS * 0.3;
          const innerR = PORTAL_RADIUS * 0.64;
          const hex: Array<[number, number]> = [];
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            hex.push([Math.cos(a) * hexR, Math.sin(a) * hexR]);
          }
          // Hexagon edges.
          for (let i = 0; i < 6; i++) {
            const [x0, y0] = hex[i];
            const [x1, y1] = hex[(i + 1) % 6];
            const rim = 0.5 + 0.5 * Math.sin((i / 6) * Math.PI * 2);
            positions.push(x0, y0, x1, y1);
            rims.push(rim, rim);
          }
          // Spokes from each vertex out to the inner ring.
          for (let i = 0; i < 6; i++) {
            const a = (i / 6) * Math.PI * 2;
            const [x0, y0] = hex[i];
            const rim = 0.5 + 0.5 * Math.sin(a);
            positions.push(x0, y0, Math.cos(a) * innerR, Math.sin(a) * innerR);
            rims.push(rim, rim);
          }
          return new Geometry(gl, {
            position: { size: 2, data: new Float32Array(positions) },
            aRim: { size: 1, data: new Float32Array(rims) },
          });
        };
        canvas = document.createElement("canvas");
        canvas.className = "void-canvas";
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
        // that override `.void-canvas { width/height: 100% }` in globals.css.
        // Pin the canvas to the container via a ResizeObserver on the
        // CONTAINER (bug-#204 lesson: window resize misses layout shifts).
        const setCanvasSize = () => {
          const w = container.clientWidth;
          const h = container.clientHeight;
          renderer.setSize(w, h);
          size.w = w;
          size.h = h;
          const aspect = h > 0 ? w / h : 1;
          for (const program of programs) {
            if (program.uniforms.uAspect)
              program.uniforms.uAspect.value = aspect;
            if (program.uniforms.uResolution) {
              program.uniforms.uResolution.value = new Vec2(
                Math.max(w, 1),
                Math.max(h, 1)
              );
            }
          }
        };
        setCanvasSize();
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(setCanvasSize);
          resizeObserver.observe(container);
        }

        const gl = renderer.gl;

        // Aurora colors: the design fixes the wash as green, so the palette
        // is a dim teal-green / near-black / cyan-hint identity, softened
        // only 20% toward whatever the theme tokens say.
        const GREEN_A: [number, number, number] = [0.028, 0.14, 0.1];
        const GREEN_B: [number, number, number] = [0.004, 0.032, 0.02];
        const GREEN_C: [number, number, number] = [0.02, 0.1, 0.14];
        const colorA = mixVec(readCssHsl("--primary", GREEN_A), GREEN_A, 0.8);
        const colorB = mixVec(readCssHsl("--accent", GREEN_B), GREEN_B, 0.8);
        const colorC = mixVec(
          readCssHsl("--background", GREEN_C),
          GREEN_C,
          0.8
        );

        // (a) Aurora wash — full-screen fbm triangle behind everything.
        const auroraProgram = new Program(gl, {
          vertex: AURORA_VERTEX,
          fragment: AURORA_FRAGMENT,
          transparent: true,
          depthTest: false,
          uniforms: {
            uTime: { value: 0 },
            uColorA: { value: new Vec3(...colorA) },
            uColorB: { value: new Vec3(...colorB) },
            uColorC: { value: new Vec3(...colorC) },
          },
        });
        const auroraMesh = new Mesh(gl, {
          geometry: new Triangle(gl),
          program: auroraProgram,
          renderOrder: 0,
        });

        // (b) Portal — outer rim + inner ring rotate one way; the faceted
        // hexagon core rotates the other. Both additive for a soft glow.
        const portalProgram = (speed: number) =>
          new Program(gl, {
            vertex: PORTAL_VERTEX,
            fragment: PORTAL_FRAGMENT,
            transparent: true,
            depthTest: false,
            uniforms: {
              uTime: { value: 0 },
              uAspect: { value: 1 },
              uSpeed: { value: speed },
            },
          });
        const outerProgram = portalProgram(0.14);
        outerProgram.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        const coreProgram = portalProgram(-0.22);
        coreProgram.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        const portalOuterMesh = new Mesh(gl, {
          geometry: buildRingGeometry(gl, [
            { radius: PORTAL_RADIUS, segments: 96 },
            { radius: PORTAL_RADIUS * 0.64, segments: 64 },
          ]),
          program: outerProgram,
          mode: gl.LINES,
          renderOrder: 1,
        });
        const portalCoreMesh = new Mesh(gl, {
          geometry: buildCoreGeometry(gl),
          program: coreProgram,
          mode: gl.LINES,
          renderOrder: 2,
        });

        // (c) Particles — 300 point sprites, CPU physics.
        const particlesProgram = new Program(gl, {
          vertex: PARTICLES_VERTEX,
          fragment: PARTICLES_FRAGMENT,
          transparent: true,
          depthTest: false,
          uniforms: {
            uTime: { value: 0 },
            uResolution: {
              value: new Vec2(Math.max(size.w, 1), Math.max(size.h, 1)),
            },
          },
        });
        particlesProgram.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const [r, g, b] =
            PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
          colors[i * 3] = r;
          colors[i * 3 + 1] = g;
          colors[i * 3 + 2] = b;
          // Point sizes are in device pixels; scale by dpr so specks keep
          // the same visual size on high-DPI screens.
          sizes[i] = (1.6 + Math.random() * 1.8) * (renderer.dpr || 1);
          spawnParticle(i);
        }
        particleGeometry = new Geometry(gl, {
          aPosition: {
            size: 2,
            data: particleData.positions,
            usage: gl.DYNAMIC_DRAW,
          },
          aColor: { size: 3, data: colors },
          aSize: { size: 1, data: sizes },
        });
        const particlesMesh = new Mesh(gl, {
          geometry: particleGeometry,
          program: particlesProgram,
          mode: gl.POINTS,
          renderOrder: 3,
        });

        // One scene graph, one render call per frame (ogl sorts children by
        // renderOrder: aurora → portal outer → portal core → particles).
        scene = new Transform();
        scene.addChild(auroraMesh);
        scene.addChild(portalOuterMesh);
        scene.addChild(portalCoreMesh);
        scene.addChild(particlesMesh);

        programs.push(
          auroraProgram,
          outerProgram,
          coreProgram,
          particlesProgram
        );

        // Re-pin now that every program exists — the first setCanvasSize ran
        // before the uniforms were registered, so uAspect/uResolution would
        // otherwise sit at their defaults until the first resize.
        setCanvasSize();

        container.appendChild(canvas);

        if (cancelled) {
          container.removeChild(canvas);
          return;
        }

        // Context loss: prevent the default (which would kill the buffer),
        // stop the loop, and degrade one-way to the static CSS fallback for
        // the session — see the header comment for the rationale.
        onContextLost = (e: Event) => {
          e.preventDefault();
          contextLost = true;
          stopLoop();
          setMode("static");
        };
        onContextRestored = () => {
          // Deliberate no-op: we stay in "static" after a loss. Rebuilding
          // all three programs after a GPU reset is a lot of surface for a
          // rare event; the CSS fallback is safe and looks intentional.
        };
        canvas.addEventListener("webglcontextlost", onContextLost);
        canvas.addEventListener("webglcontextrestored", onContextRestored);

        onVisibility = () => {
          if (document.hidden) {
            stopLoop();
          } else {
            startLoop();
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        // Ambient wake: any pointer move bumps the idle clock and restarts a
        // parked loop. Lives on `window` — the container is
        // pointer-events-none, and the scene spans the whole viewport.
        onPointerMove = () => {
          lastActivityAt = performance.now();
          if (paused && !document.hidden) startLoop();
        };
        window.addEventListener("pointermove", onPointerMove);

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
      if (onPointerMove) {
        window.removeEventListener("pointermove", onPointerMove);
      }
      if (canvas && onContextLost) {
        canvas.removeEventListener("webglcontextlost", onContextLost);
      }
      if (canvas && onContextRestored) {
        canvas.removeEventListener("webglcontextrestored", onContextRestored);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
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
      className="absolute inset-0 z-0 pointer-events-none"
    >
      {mode === "static" ? <div className="void-static-emblem" /> : null}
    </div>
  );
}
