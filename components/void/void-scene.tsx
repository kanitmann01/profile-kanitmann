"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Void page: ambient WebGL backdrop — the Active Theory "iconic brand emblem".
 *
 * Full-bleed scene behind the /void chrome: a luminous portal at viewport
 * center — a faceted icosahedron core wrapped in two counter-rotating
 * cyan→magenta torus rings, dense green/gold/cyan particle fountain bursting
 * downward, and a green aurora wash bleeding from the top-left. Pure #000
 * canvas; the page background stays black and the GL buffer clears transparent.
 *
 * Scene structure (three.js, rendered through an UnrealBloomPass for the glow):
 *   (a) PORTAL   — a low-poly icosahedron core (flat-shaded, emissive) inside
 *                  two wireframe + solid torus rings, counter-rotating. Rim
 *                  color animated cyan → magenta. The bloom makes the rim
 *                  genuinely luminous, not a flat alpha blend.
 *   (b) PARTICLES— ~1500 additive points in a downward fountain from the core,
 *                  green/gold/cyan, with size attenuation and a soft round
 *                  alpha falloff in the shader. GPU-side drift (no per-frame
 *                  CPU upload).
 *   (c) AURORA   — a full-screen fbm plane behind everything, retinted faint
 *                  teal-green, top-left corner falloff. Atmosphere.
 *
 * The bloom (EffectComposer + UnrealBloomPass) is what separates this from the
 * previous cheap-looking ogl pass: bright emissive geometry blooms outward into
 * a real halo, exactly the Active Theory "luminous portal" quality.
 *
 * Perf / battery gates (all client-side, decided in an effect so SSR and first
 * client render stay hydration-safe as `null`):
 *
 *  1. MOBILE (max-width 767px) — WebGL is SKIPPED entirely. A phone gets the
 *     CSS `.void-static-emblem` fallback; no context, no RAF, no GPU.
 *  2. prefers-reduced-motion — fully suspended, renders nothing.
 *  3. prefers-reduced-data (data-saver) — fully suspended.
 *  4. Tab hidden (visibilitychange) — RAF loop paused, resumed on visible.
 *  5. AMBIENT: the loop runs continuously for VOID_ALWAYS_ON_MS (30s) after
 *     load or any activity, THEN parks until the next pointer move / visibility
 *     resume. This fixes the "feels broken on load" issue — the portal is
 *     always alive on landing — while still saving battery on long-idle tabs.
 *  6. dpr capped at 1.5, low-power context, antialias false (bloom softens
 *     edges). three.js is dynamic-imported in the mount effect so the ~600KB
 *     lib lands in a post-paint chunk — never blocks first paint or LCP.
 *  7. No WebGL (or init failure) — graceful static fallback.
 *  8. CONTEXT LOSS — prevented, loop stops, one-way degrade to `"static"`.
 *     Rebuilding the composer + scene graph on restore is high-complexity for
 *     a rare GPU-reset event; the CSS fallback is safe. `contextrestored` is
 *     still listened for (and ignored) to document the choice.
 */

/** Below this viewport width the live scene never mounts. */
export const MOBILE_MAX_WIDTH = 767;

/** dpr never exceeds this — halves fill rate on Retina-class screens. */
export const MAX_DPR = 1.5;

/** Particle count — dense enough to read as a fountain, not so dense it
 *  tanks mobile/low-end GPUs (mobile never reaches here — see gate 1). */
export const PARTICLE_COUNT = 1500;

/** Portal core + ring radii in world units (scene is ~aspect-scaled). */
export const PORTAL_RADIUS = 1.0;

/** After load or any activity, the loop runs continuously for this long, then
 *  parks until the next pointer move / visibility resume. 30s = always-alive
 *  on landing without keeping the GPU warm on truly idle tabs. */
export const VOID_ALWAYS_ON_MS = 30_000;

type Mode = "idle" | "suspended" | "static" | "webgl";

export function VoidScene() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");

  // Decide the mode up-front so the SSR + first client render stay null.
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
    let renderer: any;
    let composer: any;
    let scene: any;
    let camera: any;
    let onVisibility: (() => void) | null = null;
    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    let onContextLost: ((e: Event) => void) | null = null;
    let onContextRestored: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let paused = false;
    let contextLost = false;
    let lastActivityAt = performance.now();
    // Clock for animation; created once three is imported.
    let clock: any;
    // Pointer parallax: normalized cursor position (-1..1 on each axis) drives
    // a camera offset that lerps toward target each frame, so moving the mouse
    // visibly tilts the portal toward the cursor. This is the "explore"
    // interaction the footer hint promises.
    const pointer = { tx: 0, ty: 0, x: 0, y: 0 };

    const startLoop = () => {
      if (cancelled || contextLost) return;
      paused = false;
      const loop = () => {
        if (cancelled || paused) return;
        try {
          const t = clock.getElapsedTime();
          // Pointer parallax: ease the camera toward the cursor target so the
          // portal tilts as you move. A gentle lerp (0.05) keeps it floaty.
          pointer.x += (pointer.tx - pointer.x) * 0.05;
          pointer.y += (pointer.ty - pointer.y) * 0.05;
          if (camera) {
            camera.position.x = pointer.x * 0.8;
            camera.position.y = pointer.y * 0.6;
            camera.lookAt(0, 0, 0);
          }
          // Animate portal: counter-rotating rings, pulsing core.
          const core = scene.getObjectByName("portal-core");
          const ringOuter = scene.getObjectByName("ring-outer");
          const ringInner = scene.getObjectByName("ring-inner");
          if (core) {
            core.rotation.x = t * 0.3;
            core.rotation.y = t * 0.4;
            const pulse = 1 + 0.06 * Math.sin(t * 1.5);
            core.scale.setScalar(pulse);
          }
          if (ringOuter) {
            ringOuter.rotation.z = t * 0.14;
            const m = ringOuter.material;
            if (m?.color) {
              // Cyan → magenta drift around the rim.
              const k = 0.5 + 0.5 * Math.sin(t * 0.4);
              m.color.setRGB(0.0 + k * 1.0, 0.8 - k * 0.8, 1.0 - k * 0.4);
            }
          }
          if (ringInner) {
            ringInner.rotation.z = -t * 0.22;
          }
          // composer.render() wrapper syncs all shader uniforms (glow,
          // particles, aurora) from the clock before rendering.
          composer.render();
        } catch {
          // One bad frame must never take the tab down; loop keeps going.
        }
        // Ambient: stay alive for VOID_ALWAYS_ON_MS after last activity, then
        // park. Any pointer move (or visibility resume) bumps lastActivityAt.
        if (performance.now() - lastActivityAt > VOID_ALWAYS_ON_MS) {
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

    (async () => {
      // Cheap capability probe BEFORE pulling in three (~600KB chunk).
      const probe = document.createElement("canvas");
      const hasWebGL =
        typeof probe.getContext === "function" &&
        (probe.getContext("webgl2") || probe.getContext("webgl")) != null;
      if (!hasWebGL) {
        if (!cancelled) setMode("static");
        return;
      }

      try {
        // Dynamic import keeps three out of the main bundle.
        const THREE = await import("three");
        const { EffectComposer } =
          await import("three/examples/jsm/postprocessing/EffectComposer.js");
        const { RenderPass } =
          await import("three/examples/jsm/postprocessing/RenderPass.js");
        const { UnrealBloomPass } =
          await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");
        const { OutputPass } =
          await import("three/examples/jsm/postprocessing/OutputPass.js");

        if (cancelled) return;

        clock = new THREE.Clock();
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;

        const canvas = document.createElement("canvas");
        canvas.className = "void-canvas";
        canvas.setAttribute("aria-hidden", "true");

        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));
        renderer.setSize(w, h);
        renderer.setClearColor(0x000000, 0); // transparent — page bg shows through

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        camera.position.set(0, 0, 5);

        // ── (a) PORTAL ────────────────────────────────────────────────────
        // Faceted icosahedron core (flat-shaded, emissive cyan) — the
        // "faceted geometric mark at its core" from the design doc.
        const coreGeo = new THREE.IcosahedronGeometry(PORTAL_RADIUS * 0.4, 0);
        const coreMat = new THREE.MeshBasicMaterial({
          color: 0x66e6ff,
          wireframe: true,
          transparent: true,
          opacity: 1.0,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.name = "portal-core";
        scene.add(core);

        // Outer ring — solid torus, emissive, counter-rotates. Thick tube so
        // the rim reads as a chunky luminous band once bloomed.
        const outerGeo = new THREE.TorusGeometry(PORTAL_RADIUS, 0.045, 16, 160);
        const outerMat = new THREE.MeshBasicMaterial({
          color: 0x00ccff,
          transparent: true,
          opacity: 1.0,
        });
        const ringOuter = new THREE.Mesh(outerGeo, outerMat);
        ringOuter.name = "ring-outer";
        scene.add(ringOuter);

        // Inner ring — thinner, counter-rotates, offset magenta.
        const innerGeo = new THREE.TorusGeometry(
          PORTAL_RADIUS * 0.66,
          0.028,
          12,
          120
        );
        const innerMat = new THREE.MeshBasicMaterial({
          color: 0xff0099,
          transparent: true,
          opacity: 0.95,
        });
        const ringInner = new THREE.Mesh(innerGeo, innerMat);
        ringInner.name = "ring-inner";
        scene.add(ringInner);

        // A soft additive glow disc behind the rings so the portal reads as
        // emanating light, not just an outline. Larger + brighter so the bloom
        // has something to grab onto for a real halo.
        const glowGeo = new THREE.CircleGeometry(PORTAL_RADIUS * 1.6, 64);
        const glowMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { uTime: { value: 0 } },
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: /* glsl */ `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            void main() {
              float d = distance(vUv, vec2(0.5));
              float glow = smoothstep(0.5, 0.0, d);
              glow = pow(glow, 1.6);
              vec3 cyan = vec3(0.0, 0.85, 1.0);
              vec3 magenta = vec3(1.0, 0.0, 0.65);
              vec3 col = mix(cyan, magenta, 0.5 + 0.5 * sin(uTime * 0.5));
              float pulse = 0.75 + 0.2 * sin(uTime * 1.4);
              gl_FragColor = vec4(col * glow * pulse, glow);
            }
          `,
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.name = "portal-glow";
        scene.add(glow);

        // ── (b) PARTICLES ─────────────────────────────────────────────────
        // Dense downward fountain from the portal center. Positions and
        // velocities on the CPU (one-time upload), motion on the GPU via a
        // time-driven y-fall in the vertex shader. Additive, soft round points.
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const seeds = new Float32Array(PARTICLE_COUNT);
        const palette = [
          [0.2, 1.0, 0.4], // green
          [1.0, 0.8, 0.2], // gold
          [0.2, 0.9, 1.0], // cyan
        ];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 0.15;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = Math.random() * 0.4; // start near core
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
          const c = palette[Math.floor(Math.random() * palette.length)];
          colors[i * 3] = c[0];
          colors[i * 3 + 1] = c[1];
          colors[i * 3 + 2] = c[2];
          seeds[i] = Math.random();
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        pGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

        const pMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: { uTime: { value: 0 } },
          vertexShader: /* glsl */ `
            attribute float aSeed;
            varying vec3 vColor;
            varying float vAlpha;
            uniform float uTime;
            void main() {
              vColor = color;
              // Each particle falls on its own clock; wraps to reuse the pool.
              float life = 4.0;
              float t = mod(uTime * 0.5 + aSeed * life, life);
              float fall = t / life; // 0..1
              vec3 pos = position;
              pos.y -= fall * 3.0; // downward fountain
              pos.x += sin(uTime * 0.6 + aSeed * 30.0) * 0.15 * fall;
              pos.z += cos(uTime * 0.5 + aSeed * 20.0) * 0.12 * fall;
              vec4 mv = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = (18.0 + aSeed * 22.0) * (1.0 / -mv.z);
              gl_Position = projectionMatrix * mv;
              // Fade in then out over the particle's life.
              vAlpha = sin(fall * 3.14159) * 1.0;
            }
          `,
        });
        pMat.vertexColors = true;
        const pFrag = /* glsl */ `
            precision highp float;
            varying vec3 vColor;
            varying float vAlpha;
            void main() {
              // Soft round point.
              float d = distance(gl_PointCoord, vec2(0.5));
              if (d > 0.5) discard;
              float a = smoothstep(0.5, 0.0, d) * vAlpha;
              gl_FragColor = vec4(vColor, a);
            }
          `;
        // ShaderMaterial needs fragmentShader set explicitly.
        (pMat as any).fragmentShader = pFrag;
        const particles = new THREE.Points(pGeo, pMat);
        particles.name = "particles";
        // vertexColors flag already drives `color` attribute; ensure it's used.
        particles.geometry.setAttribute(
          "color",
          new THREE.BufferAttribute(colors, 3)
        );
        scene.add(particles);

        // ── (c) AURORA ────────────────────────────────────────────────────
        // Full-screen background plane running a faint fbm wash, top-left
        // corner falloff. Behind everything (renderOrder + depthTest false).
        const auroraGeo = new THREE.PlaneGeometry(2, 2);
        const auroraMat = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          depthTest: false,
          uniforms: { uTime: { value: 0 } },
          vertexShader: /* glsl */ `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = vec4(position.xy, 0.0, 1.0); // full-screen
            }
          `,
          fragmentShader: /* glsl */ `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
            float noise(vec2 p){
              vec2 i=floor(p); vec2 f=fract(p);
              f=f*f*(3.0-2.0*f);
              return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
                         mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
            }
            float fbm(vec2 p){
              float v=0.0; float a=0.5;
              for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}
              return v;
            }
            void main(){
              vec2 p=vUv;
              vec2 q=vec2(fbm(p+uTime*0.07),fbm(p+vec2(5.2,1.3)+uTime*0.05));
              vec2 r=vec2(fbm(p+4.0*q+vec2(1.7,9.2)+uTime*0.04),
                          fbm(p+4.0*q+vec2(8.3,2.8)+uTime*0.03));
              float f=fbm(p+4.0*r);
              // Faint teal-green aurora; UV origin bottom-left so (1-x)*y
              // peaks at the top-left corner.
              float corner=smoothstep(0.0,0.85,(1.0-vUv.x)*vUv.y);
              vec3 greenA=vec3(0.05,0.35,0.22);
              vec3 greenB=vec3(0.02,0.12,0.08);
              vec3 col=mix(greenA,greenB,clamp(f*f*1.6,0.0,1.0));
              gl_FragColor=vec4(col,corner*0.6);
            }
          `,
        });
        const aurora = new THREE.Mesh(auroraGeo, auroraMat);
        aurora.name = "aurora";
        aurora.renderOrder = -1;
        scene.add(aurora);

        // ── POST-PROCESSING: bloom (the premium glow) ─────────────────────
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloom = new UnrealBloomPass(
          new THREE.Vector2(w, h),
          1.6, // strength — generous, the reference is genuinely luminous
          0.8, // radius — wider halo
          0.0 // threshold — bloom everything emissive
        );
        composer.addPass(bloom);
        composer.addPass(new OutputPass());
        composer.setSize(w, h);
        composer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR));

        // Keep the glow + aurora uniforms in sync with time. The core/ring
        // animation reads from the scene graph (handled in the loop above);
        // these shader-material uniforms need explicit writes.
        const shaderUniforms = [
          glowMat.uniforms.uTime,
          pMat.uniforms.uTime,
          auroraMat.uniforms.uTime,
        ];
        // Stash for the loop.
        (scene as any).userData.shaderUniforms = shaderUniforms;

        container.appendChild(canvas);

        if (cancelled) {
          container.removeChild(canvas);
          return;
        }

        // ── RESIZE ────────────────────────────────────────────────────────
        const onResize = () => {
          const nw = container.clientWidth || window.innerWidth;
          const nh = container.clientHeight || window.innerHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
          composer.setSize(nw, nh);
        };
        if (typeof ResizeObserver !== "undefined") {
          resizeObserver = new ResizeObserver(onResize);
          resizeObserver.observe(container);
        }

        // ── CONTEXT LOSS ──────────────────────────────────────────────────
        onContextLost = (e: Event) => {
          e.preventDefault();
          contextLost = true;
          stopLoop();
          if (!cancelled) setMode("static");
        };
        onContextRestored = () => {
          // Deliberate no-op — see header comment (8).
        };
        canvas.addEventListener("webglcontextlost", onContextLost);
        canvas.addEventListener("webglcontextrestored", onContextRestored);

        // ── VISIBILITY + ACTIVITY ─────────────────────────────────────────
        onVisibility = () => {
          if (document.hidden) {
            stopLoop();
          } else {
            lastActivityAt = performance.now();
            startLoop();
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        onPointerMove = (e: Event) => {
          lastActivityAt = performance.now();
          // Record normalized cursor position (-1..1) for the parallax camera.
          const ev = e as PointerEvent;
          pointer.tx = (ev.clientX / window.innerWidth) * 2 - 1;
          pointer.ty = -((ev.clientY / window.innerHeight) * 2 - 1);
          if (paused && !document.hidden) startLoop();
        };
        window.addEventListener("pointermove", onPointerMove);

        // Sync shader time uniforms each frame via a tiny wrapper on loop:
        // (the loop already advances these; wire the hook here for clarity)
        const origRender = composer.render.bind(composer);
        composer.render = () => {
          const t = clock.getElapsedTime();
          for (const u of shaderUniforms) u.value = t;
          origRender();
        };

        startLoop();
      } catch {
        // Any init failure (GPU reset mid-init, OOM, bad context) → static.
        if (!cancelled) setMode("static");
      }
    })();

    return () => {
      cancelled = true;
      stopLoop();
      if (onVisibility)
        document.removeEventListener("visibilitychange", onVisibility);
      if (onPointerMove)
        window.removeEventListener("pointermove", onPointerMove);
      if (onContextLost && renderer?.domElement) {
        renderer.domElement.removeEventListener(
          "webglcontextlost",
          onContextLost
        );
      }
      if (onContextRestored && renderer?.domElement) {
        renderer.domElement.removeEventListener(
          "webglcontextrestored",
          onContextRestored
        );
      }
      if (resizeObserver) resizeObserver.disconnect();
      // Dispose three resources to avoid GPU leaks.
      try {
        scene?.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose?.();
          if (obj.material) {
            if (Array.isArray(obj.material))
              obj.material.forEach((m: any) => m.dispose?.());
            else obj.material.dispose?.();
          }
        });
        composer?.dispose?.();
        renderer?.dispose?.();
      } catch {
        // Best-effort — context may already be gone.
      }
      const canvas = container.querySelector("canvas");
      if (canvas && container.contains(canvas)) container.removeChild(canvas);
      try {
        renderer?.forceContextLoss?.();
      } catch {
        // Context may already be gone.
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
