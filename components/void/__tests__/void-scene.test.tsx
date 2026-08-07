import { act, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";

import {
  VoidScene,
  VOID_IDLE_MS,
  MAX_DPR,
  PARTICLE_COUNT,
} from "@/components/void/void-scene";

/**
 * Void scene suspend/fallback coverage (mirrors shader-hero.test.tsx):
 *  - reduced-motion / reduced-data → fully suspended (renders nothing)
 *  - mobile viewport → static CSS emblem, never the live scene
 *  - desktop + motion allowed → WebGL: layered passes mount (aurora fbm
 *    triangle, portal line rings, particle points), dpr capped
 *  - visibility-hidden → RAF loop paused, resumed on visible
 *  - ambient idle: no pointer activity for VOID_IDLE_MS → loop parks;
 *    a window pointermove wakes it
 *  - WebGL unavailable / init failure → static emblem fallback
 *  - webglcontextlost → one-way degrade to the static emblem
 *  - unmount → canvas removed, context released, observer disconnected
 */

const {
  rendererOpts,
  renderSpy,
  setSizeSpy,
  meshPrograms,
  programRecords,
  geometries,
  resizeObservers,
  loseContextSpy,
  failRenderer,
  glConsts,
} = vi.hoisted(() => {
  const rendererOpts: any[] = [];
  const renderSpy = vi.fn();
  const setSizeSpy = vi.fn();
  const meshPrograms: any[] = [];
  const programRecords: any[] = [];
  const geometries: any[] = [];
  const resizeObservers: {
    callback: ResizeObserverCallback;
    observed: Element[];
  }[] = [];
  const loseContextSpy = vi.fn();
  const failRenderer = { value: false };
  // Stable stand-ins for the WebGL constants the scene reads off `gl`.
  const glConsts = {
    SRC_ALPHA: 1,
    ONE: 2,
    ONE_MINUS_SRC_ALPHA: 3,
    DYNAMIC_DRAW: 4,
    LINES: 5,
    TRIANGLES: 6,
    POINTS: 7,
  };
  return {
    rendererOpts,
    renderSpy,
    setSizeSpy,
    meshPrograms,
    programRecords,
    geometries,
    resizeObservers,
    loseContextSpy,
    failRenderer,
    glConsts,
  };
});

vi.mock("ogl", () => {
  class FakeVec3 {
    x: number;
    y: number;
    z: number;
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }
  class FakeVec2 {
    x: number;
    y: number;
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  }
  class FakeRenderer {
    gl: any;
    canvas: any;
    dpr: number;
    render = renderSpy;
    setSize = setSizeSpy;
    constructor(opts: any) {
      rendererOpts.push(opts);
      this.canvas = opts.canvas;
      this.dpr = opts.dpr;
      this.gl = {
        ...glConsts,
        getExtension: (name: string) =>
          name === "WEBGL_lose_context"
            ? { loseContext: loseContextSpy }
            : null,
      };
      if (failRenderer.value) {
        throw new Error("renderer init failed");
      }
    }
  }
  class FakeProgram {
    uniforms: any;
    opts: any;
    setBlendFunc: ReturnType<typeof vi.fn>;
    constructor(_gl: any, opts: any) {
      this.uniforms = opts.uniforms;
      this.opts = opts;
      this.setBlendFunc = vi.fn();
      programRecords.push(this);
    }
  }
  class FakeMesh {
    program: any;
    geometry: any;
    mode: number;
    constructor(_gl: any, opts: any) {
      this.program = opts.program;
      this.geometry = opts.geometry;
      this.mode = opts.mode ?? glConsts.TRIANGLES;
      meshPrograms.push(this);
    }
  }
  class FakeTriangle {
    constructor(_gl: any) {}
  }
  class FakeGeometry {
    attributes: any;
    updateAttribute: ReturnType<typeof vi.fn>;
    constructor(_gl: any, attributes: any) {
      this.attributes = attributes;
      this.updateAttribute = vi.fn();
      geometries.push(this);
    }
  }
  class FakeTransform {
    children: any[] = [];
    addChild(child: any) {
      this.children.push(child);
    }
    removeChild(child: any) {
      const i = this.children.indexOf(child);
      if (i !== -1) this.children.splice(i, 1);
    }
  }
  return {
    Renderer: FakeRenderer,
    Program: FakeProgram,
    Mesh: FakeMesh,
    Triangle: FakeTriangle,
    Geometry: FakeGeometry,
    Transform: FakeTransform,
    Vec3: FakeVec3,
    Vec2: FakeVec2,
  };
});

type MatchMediaOverrides = { dataSaver?: boolean; mobile?: boolean };

function stubMatchMedia(overrides: MatchMediaOverrides = {}) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("prefers-reduced-data")
          ? !!overrides.dataSaver
          : query.includes("max-width")
            ? !!overrides.mobile
            : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as any
  );
}

function stubWebGLAvailable(available: boolean) {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    available ? ({} as any) : null
  );
}

/** Non-executing rAF: ids increment, callbacks never run. */
const cancelCalls = vi.hoisted(() => [] as number[]);

function stubRaf() {
  let nextId = 1;
  vi.stubGlobal(
    "requestAnimationFrame",
    vi.fn(() => nextId++)
  );
  vi.stubGlobal(
    "cancelAnimationFrame",
    vi.fn((id: number) => cancelCalls.push(id))
  );
}

function unstubRaf() {
  vi.unstubAllGlobals();
  cancelCalls.length = 0;
}

const getCanvas = () => document.querySelector("canvas.void-canvas");
const getContainer = () =>
  (getCanvas() ?? document.querySelector(".void-static-emblem"))
    ?.parentElement ?? null;
const getStatic = () => document.querySelector(".void-static-emblem");

const getProgramWith = (uniformName: string) =>
  programRecords.find((p) => p.uniforms[uniformName] !== undefined);

const getParticleGeometry = () =>
  geometries.find(
    (g) =>
      g.attributes.aPosition?.data instanceof Float32Array &&
      g.attributes.aPosition.data.length === PARTICLE_COUNT * 2
  );

afterEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false);
  stubMatchMedia();
  vi.restoreAllMocks();
  unstubRaf();
  rendererOpts.length = 0;
  renderSpy.mockClear();
  setSizeSpy.mockClear();
  meshPrograms.length = 0;
  programRecords.length = 0;
  geometries.length = 0;
  resizeObservers.length = 0;
  loseContextSpy.mockClear();
  failRenderer.value = false;
});

describe("VoidScene — suspend paths", () => {
  it("renders nothing under prefers-reduced-motion", async () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<VoidScene />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
    expect(getCanvas()).toBeNull();
    expect(getStatic()).toBeNull();
  });

  it("renders nothing under prefers-reduced-data", async () => {
    stubMatchMedia({ dataSaver: true });
    const { container } = render(<VoidScene />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
    expect(getCanvas()).toBeNull();
  });

  it("suspension wins even when both reduced-motion and mobile apply", async () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    stubMatchMedia({ mobile: true });
    const { container } = render(<VoidScene />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
    expect(getStatic()).toBeNull();
  });
});

describe("VoidScene — mobile fallback", () => {
  it("renders the static emblem, never a canvas, on small screens", async () => {
    stubMatchMedia({ mobile: true });
    render(<VoidScene />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(renderSpy).not.toHaveBeenCalled();
    const container = getContainer();
    expect(container!.className).toContain("absolute");
    expect(container!.className).toContain("inset-0");
    expect(container!.className).toContain("z-0");
    expect(container!.className).toContain("pointer-events-none");
    expect(container).toHaveAttribute("aria-hidden", "true");
  });
});

describe("VoidScene — live scene", () => {
  it("mounts a full-bleed canvas behind content and animates it", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    await waitFor(() => {
      expect(renderSpy).toHaveBeenCalled();
    });
    // One scene graph, all three passes drawn in a single render call.
    expect(renderSpy.mock.calls[0][0].scene.children).toHaveLength(4);
    const container = getContainer();
    expect(container).toHaveAttribute("aria-hidden", "true");
    expect(container!.className).toContain("pointer-events-none");
    expect(getCanvas()!.className).toContain("void-canvas");
  });

  it("caps dpr at 1.5 even on high-DPI screens", async () => {
    stubWebGLAvailable(true);
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 3,
    });
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    expect(rendererOpts[0]?.dpr).toBe(MAX_DPR);
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 1,
    });
  });

  it("requests a low-power, depth-less context", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    expect(rendererOpts[0]).toMatchObject({
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
  });

  it("lays out the three passes: aurora triangle, portal lines, particle points", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    // Aurora fbm triangle + two portal line meshes + one points mesh.
    expect(meshPrograms).toHaveLength(4);
    const modes = meshPrograms.map((m) => m.mode);
    expect(modes).toContain(glConsts.TRIANGLES);
    expect(modes.filter((m: number) => m === glConsts.LINES)).toHaveLength(2);
    expect(modes).toContain(glConsts.POINTS);

    // Portal geometries: outer rim (96) + inner ring (64) segments, then the
    // hexagon + spokes core — all explicit LINE pairs (4 floats per segment).
    const lineGeometries = geometries.filter((g) => g.attributes.aRim);
    expect(lineGeometries).toHaveLength(2);
    const [outer, core] = lineGeometries;
    expect(outer.attributes.position.data.length).toBe((96 + 64) * 4);
    expect(core.attributes.position.data.length).toBe(12 * 4);

    // Particles: PARTICLE_COUNT positions (CSS px), colors, sizes; the
    // position buffer is DYNAMIC for the per-frame CPU physics upload.
    const particles = getParticleGeometry();
    expect(particles).toBeDefined();
    expect(particles.attributes.aPosition.usage).toBe(glConsts.DYNAMIC_DRAW);
    expect(particles.attributes.aColor.data.length).toBe(PARTICLE_COUNT * 3);
    expect(particles.attributes.aSize.data.length).toBe(PARTICLE_COUNT);
  });

  it("uses additive blending for the portal and particle programs", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    const portalProgram = getProgramWith("uAspect");
    const particlesProgram = getProgramWith("uResolution");
    const auroraProgram = getProgramWith("uColorA");
    expect(portalProgram).toBeDefined();
    expect(particlesProgram).toBeDefined();
    expect(portalProgram.setBlendFunc).toHaveBeenCalledWith(
      glConsts.SRC_ALPHA,
      glConsts.ONE
    );
    expect(particlesProgram.setBlendFunc).toHaveBeenCalledWith(
      glConsts.SRC_ALPHA,
      glConsts.ONE
    );
    // The aurora wash keeps normal alpha blending (soft fade-out).
    expect(auroraProgram.setBlendFunc).not.toHaveBeenCalled();

    for (const program of programRecords) {
      expect(program.opts.depthTest).toBe(false);
      expect(program.opts.transparent).toBe(true);
      expect(program.uniforms.uTime).toBeDefined();
    }
  });

  it("passes the scene palette through as uniforms", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    const aurora = getProgramWith("uColorA");
    expect(aurora.uniforms.uColorA).toBeDefined();
    expect(aurora.uniforms.uColorB).toBeDefined();
    expect(aurora.uniforms.uColorC).toBeDefined();

    // Two portal programs, counter-rotating (opposite speeds).
    const portals = programRecords.filter((p) => p.uniforms.uAspect);
    expect(portals).toHaveLength(2);
    expect(
      portals.map((p) => p.uniforms.uSpeed.value).sort((a, b) => a - b)
    ).toEqual([-0.22, 0.14]);
  });

  it("sizes the canvas to the container and keeps it pinned on resize", async () => {
    stubWebGLAvailable(true);
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 800,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 500,
    });

    class FakeResizeObserver {
      callback: ResizeObserverCallback;
      observed: Element[] = [];
      constructor(cb: ResizeObserverCallback) {
        this.callback = cb;
        resizeObservers.push(this);
      }
      observe(el: Element) {
        this.observed.push(el);
      }
      unobserve() {}
      disconnect() {
        this.observed.length = 0;
      }
    }
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);

    const { unmount } = render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    // Mount pins the canvas to the container's CSS pixel size (ogl applies
    // the capped dpr to the backing buffer internally).
    expect(setSizeSpy).toHaveBeenCalledWith(800, 500);

    // The container itself is observed for layout changes (bug-#204 lesson:
    // window resize misses container-driven layout shifts).
    const observer = resizeObservers.at(-1)!;
    expect(observer.observed).toContain(getContainer());

    // Uniforms follow the pinned size: aspect for the portal, resolution
    // for the particles.
    const particlesProgram = getProgramWith("uResolution");
    expect(particlesProgram.uniforms.uResolution.value.x).toBe(800);
    expect(particlesProgram.uniforms.uResolution.value.y).toBe(500);
    const portalProgram = getProgramWith("uAspect");
    expect(portalProgram.uniforms.uAspect.value).toBe(800 / 500);

    // Container grows → setSize re-called with the new dims.
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
      configurable: true,
      value: 640,
    });
    (observer.callback as any)([], observer);
    expect(setSizeSpy).toHaveBeenCalledWith(1024, 640);
    expect(particlesProgram.uniforms.uResolution.value.x).toBe(1024);

    // Cleanup disconnects the observer (no leak, no reflow after unmount).
    unmount();
    expect(observer.observed).toHaveLength(0);

    delete (HTMLElement.prototype as any).clientWidth;
    delete (HTMLElement.prototype as any).clientHeight;
  });

  it("falls back to the static emblem when WebGL is unavailable", async () => {
    // jsdom default: getContext("webgl2")/("webgl") return null.
    render(<VoidScene />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(renderSpy).not.toHaveBeenCalled();
  });

  it("falls back to the static emblem when scene init fails", async () => {
    stubWebGLAvailable(true);
    failRenderer.value = true;
    render(<VoidScene />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(renderSpy).not.toHaveBeenCalled();
  });
});

describe("VoidScene — visibility pause", () => {
  it("cancels the RAF loop while hidden and resumes when visible", async () => {
    stubWebGLAvailable(true);
    stubRaf();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });

    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    const scheduled = vi.mocked(requestAnimationFrame).mock.calls.length;
    expect(scheduled).toBeGreaterThan(0);
    expect(cancelCalls).toHaveLength(0);

    // Tab hides → loop must cancel its pending frame.
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(cancelCalls.length).toBeGreaterThan(0);

    // Tab visible again → a fresh frame is scheduled.
    const scheduledAfterHide = vi.mocked(requestAnimationFrame).mock.calls
      .length;
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(vi.mocked(requestAnimationFrame).mock.calls.length).toBeGreaterThan(
      scheduledAfterHide
    );
  });
});

describe("VoidScene — ambient idle park", () => {
  it("parks the RAF loop after VOID_IDLE_MS and wakes on pointer move", async () => {
    stubWebGLAvailable(true);
    stubMatchMedia();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });

    // Controllable rAF: each schedule advances the clock by 500ms so the
    // loop's idle window (>VOID_IDLE_MS since the last activity at t=0)
    // closes after six frames.
    const frames: Array<{ cb: FrameRequestCallback; at: number }> = [];
    let clock = 0;
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((cb: FrameRequestCallback) => {
        clock += 500;
        frames.push({ cb, at: clock });
        return frames.length;
      })
    );
    vi.stubGlobal(
      "cancelAnimationFrame",
      vi.fn(() => {})
    );
    const nowSpy = vi.spyOn(performance, "now").mockImplementation(() => clock);

    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    // Run every scheduled frame (times 500ms … 3500ms). No pointer activity
    // happens, so once 3000ms of idle elapses the loop must park itself.
    let framesRan = 0;
    while (frames.length > 0 && framesRan < 20) {
      const frame = frames.shift()!;
      frame.cb(frame.at);
      framesRan++;
    }
    expect(framesRan).toBeGreaterThan(0); // loop ran
    expect(frames.length).toBe(0); // and parked (nothing left scheduled)

    // Any pointer move over the viewport wakes the parked loop.
    await act(async () => {
      window.dispatchEvent(new Event("pointermove"));
    });
    expect(frames.length).toBeGreaterThan(0);

    nowSpy.mockRestore();
  });
});

describe("VoidScene — context loss", () => {
  it("degrades one-way to the static emblem on webglcontextlost", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    await waitFor(() => {
      expect(renderSpy).toHaveBeenCalled();
    });

    await act(async () => {
      getCanvas()!.dispatchEvent(
        new Event("webglcontextlost", { cancelable: true })
      );
    });

    // One-way degrade: the CSS fallback takes over for the session.
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
  });

  it("releases the WebGL context and removes the canvas on unmount", async () => {
    stubWebGLAvailable(true);
    const { unmount } = render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    unmount();
    expect(getCanvas()).toBeNull();
    expect(loseContextSpy).toHaveBeenCalled();
  });
});
