import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";

import {
  ShaderHero,
  MAX_DPR,
  SCROLL_VELOCITY_CLAMP,
  hslToRgb,
} from "@/components/shader-hero";

/**
 * Exp 15 suspend/fallback coverage:
 *  - reduced-motion → fully suspended (renders nothing)
 *  - prefers-reduced-data → fully suspended
 *  - mobile viewport → static gradient fallback, never the live shader
 *  - visibility-hidden → RAF loop paused, resumed on visible
 *  - WebGL unavailable → static gradient fallback
 *  - desktop + motion allowed → live shader, dpr capped
 * Wave E.4 adds:
 *  - Lenis scroll-velocity binding (clamped ±10) feeding uScrollVelocity
 *  - reduced-motion → binding skipped entirely
 *  - RAF loop parks itself once velocity is steady at 0 for >1s
 */

const { lenisCallbacks } = vi.hoisted(() => ({
  lenisCallbacks: [] as Array<
    ((lenis: { velocity: number }) => void) | undefined
  >,
}));

vi.mock("lenis/react", () => ({
  useLenis: (callback?: (lenis: { velocity: number }) => void) => {
    lenisCallbacks.push(callback);
    return undefined;
  },
}));

const { rendererOpts, renderSpy, setSizeSpy, meshPrograms, resizeObservers } =
  vi.hoisted(() => {
    const rendererOpts: any[] = [];
    const renderSpy = vi.fn();
    const setSizeSpy = vi.fn();
    const meshPrograms: any[] = [];
    const resizeObservers: {
      callback: ResizeObserverCallback;
      observed: Element[];
    }[] = [];
    return {
      rendererOpts,
      renderSpy,
      setSizeSpy,
      meshPrograms,
      resizeObservers,
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
  class FakeRenderer {
    gl: any;
    canvas: any;
    render = renderSpy;
    setSize = setSizeSpy;
    constructor(opts: any) {
      rendererOpts.push(opts);
      this.canvas = opts.canvas;
      this.gl = { getExtension: () => null };
    }
  }
  class FakeProgram {
    uniforms: any;
    constructor(_gl: any, opts: any) {
      this.uniforms = opts.uniforms;
    }
  }
  class FakeMesh {
    program: any;
    constructor(_gl: any, opts: any) {
      this.program = opts.program;
      meshPrograms.push(opts.program);
    }
  }
  class FakeTriangle {}
  return {
    Renderer: FakeRenderer,
    Program: FakeProgram,
    Mesh: FakeMesh,
    Triangle: FakeTriangle,
    Vec3: FakeVec3,
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

const getLayer = () => document.querySelector(".shader-hero-layer");
const getCanvas = () => document.querySelector("canvas.shader-hero-canvas");
const getStatic = () => document.querySelector(".shader-hero-static");

afterEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false);
  stubMatchMedia();
  vi.restoreAllMocks();
  unstubRaf();
  rendererOpts.length = 0;
  renderSpy.mockClear();
  setSizeSpy.mockClear();
  meshPrograms.length = 0;
  resizeObservers.length = 0;
  lenisCallbacks.length = 0;
});

describe("ShaderHero — suspend paths", () => {
  it("renders nothing under prefers-reduced-motion", async () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    const { container } = render(<ShaderHero />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
    expect(getLayer()).toBeNull();
    expect(getCanvas()).toBeNull();
    expect(getStatic()).toBeNull();
  });

  it("renders nothing under prefers-reduced-data", async () => {
    stubMatchMedia({ dataSaver: true });
    const { container } = render(<ShaderHero />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
    expect(getLayer()).toBeNull();
  });

  it("suspension wins even when both reduced-motion and mobile apply", async () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    stubMatchMedia({ mobile: true });
    const { container } = render(<ShaderHero />);
    await waitFor(() => {
      expect(container).toBeEmptyDOMElement();
    });
    expect(getStatic()).toBeNull();
  });
});

describe("ShaderHero — mobile fallback", () => {
  it("renders static gradient, never a canvas, on small screens", async () => {
    stubMatchMedia({ mobile: true });
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(renderSpy).not.toHaveBeenCalled();
  });
});

describe("ShaderHero — live shader", () => {
  it("mounts a low-opacity canvas behind content and animates it", async () => {
    stubWebGLAvailable(true);
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    await waitFor(() => {
      expect(renderSpy).toHaveBeenCalled();
    });
    const layer = getLayer();
    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer!.className).toContain("pointer-events-none");
    expect(getCanvas()!.className).toContain("shader-hero-canvas");
  });

  it("caps dpr at 1.5 even on high-DPI screens", async () => {
    stubWebGLAvailable(true);
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 3,
    });
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    expect(rendererOpts[0]?.dpr).toBe(MAX_DPR);
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 1,
    });
  });

  it("passes the brand palette through as uniforms", async () => {
    stubWebGLAvailable(true);
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    const uniforms = meshPrograms[0]?.uniforms;
    expect(uniforms).toBeDefined();
    expect(uniforms.uTime).toBeDefined();
    expect(uniforms.uScrollVelocity).toBeDefined();
    expect(uniforms.uScrollVelocity.value).toBe(0);
    expect(uniforms.uColorA).toBeDefined();
    expect(uniforms.uColorB).toBeDefined();
    expect(uniforms.uColorC).toBeDefined();
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

    const { unmount } = render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    // Mount pins the canvas to the container's CSS pixel size (ogl applies
    // the capped dpr to the backing buffer internally).
    expect(setSizeSpy).toHaveBeenCalledWith(800, 500);

    // The container itself is observed for layout changes.
    const observer = resizeObservers.at(-1)!;
    expect(observer.observed).toContain(getLayer());

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

    // Cleanup disconnects the observer (no leak, no reflow after unmount).
    unmount();
    expect(observer.observed).toHaveLength(0);

    delete (HTMLElement.prototype as any).clientWidth;
    delete (HTMLElement.prototype as any).clientHeight;
  });

  it("falls back to the static gradient when WebGL is unavailable", async () => {
    // jsdom default: getContext("webgl2")/("webgl") return null.
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(renderSpy).not.toHaveBeenCalled();
  });
});

describe("ShaderHero — visibility pause", () => {
  it("cancels the RAF loop while hidden and resumes when visible", async () => {
    stubWebGLAvailable(true);
    stubRaf();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });

    render(<ShaderHero />);
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

describe("ShaderHero — scroll velocity warp (Wave E.4)", () => {
  it("registers a Lenis scroll callback when motion is allowed", async () => {
    stubWebGLAvailable(true);
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    // Called with a function → binding is live.
    expect(lenisCallbacks.length).toBeGreaterThan(0);
    expect(typeof lenisCallbacks.at(-1)).toBe("function");
  });

  it("skips the Lenis binding entirely under reduced motion", async () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    render(<ShaderHero />);
    await waitFor(() => {
      expect(document.querySelector(".shader-hero-layer")).toBeNull();
    });
    // useLenis is invoked with `undefined` → no callback registered.
    expect(lenisCallbacks.length).toBeGreaterThan(0);
    expect(lenisCallbacks.at(-1)).toBeUndefined();
  });

  it("clamps Lenis velocity to ±10 and feeds uScrollVelocity", async () => {
    stubWebGLAvailable(true);
    render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    const callback = lenisCallbacks.at(-1);
    const uniforms = meshPrograms.at(-1)?.uniforms;
    expect(typeof callback).toBe("function");
    expect(uniforms).toBeDefined();

    await act(async () => {
      callback!({ velocity: 50 });
    });
    expect(uniforms.uScrollVelocity.value).toBe(SCROLL_VELOCITY_CLAMP);

    await act(async () => {
      callback!({ velocity: -25 });
    });
    expect(uniforms.uScrollVelocity.value).toBe(-SCROLL_VELOCITY_CLAMP);

    await act(async () => {
      callback!({ velocity: 3.2 });
    });
    expect(uniforms.uScrollVelocity.value).toBe(3.2);

    await act(async () => {
      callback!({ velocity: 0 });
    });
    expect(uniforms.uScrollVelocity.value).toBe(0);
  });

  it("parks the RAF loop once velocity stays ~0 for >1s", async () => {
    stubWebGLAvailable(true);
    stubMatchMedia();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });

    // Controllable rAF: each schedule advances the clock by 200ms so the
    // loop's idle window (>1s since the last velocity update at t=0) closes.
    const frames: Array<{ cb: FrameRequestCallback; at: number }> = [];
    let clock = 0;
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((cb: FrameRequestCallback) => {
        clock += 200;
        frames.push({ cb, at: clock });
        return frames.length;
      })
    );
    vi.stubGlobal(
      "cancelAnimationFrame",
      vi.fn(() => {})
    );
    const nowSpy = vi.spyOn(performance, "now").mockImplementation(() => clock);

    render(<ShaderHero />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });

    // Run every scheduled frame (times 200ms, 400ms, … 1200ms). No scroll
    // happens, so after 1000ms of idle the loop must park itself.
    let framesRan = 0;
    while (frames.length > 0 && framesRan < 20) {
      const frame = frames.shift()!;
      frame.cb(frame.at);
      framesRan++;
    }
    expect(framesRan).toBeGreaterThan(0); // loop ran
    expect(frames.length).toBe(0); // and parked (nothing left scheduled)

    // A nonzero velocity restarts the loop.
    const callback = lenisCallbacks.at(-1)!;
    await act(async () => {
      callback({ velocity: 4 });
    });
    expect(frames.length).toBeGreaterThan(0);

    nowSpy.mockRestore();
  });
});

describe("ShaderHero — hslToRgb", () => {
  it("converts theme token triplets to 0..1 rgb", () => {
    // hsl(37 90% 55%) = amber brand token
    const [r, g, b] = hslToRgb(37, 90, 55);
    expect(r).toBeGreaterThan(0.9);
    expect(g).toBeGreaterThan(0.5);
    expect(g).toBeLessThan(0.75);
    expect(b).toBeLessThan(0.3);
  });

  it("returns grayscale when saturation is zero", () => {
    const [r, g, b] = hslToRgb(120, 0, 40);
    expect(r).toBeCloseTo(0.4);
    expect(g).toBeCloseTo(0.4);
    expect(b).toBeCloseTo(0.4);
  });
});
