import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";

import { ShaderHero, MAX_DPR, hslToRgb } from "@/components/shader-hero";

/**
 * Exp 15 suspend/fallback coverage:
 *  - reduced-motion → fully suspended (renders nothing)
 *  - prefers-reduced-data → fully suspended
 *  - mobile viewport → static gradient fallback, never the live shader
 *  - visibility-hidden → RAF loop paused, resumed on visible
 *  - WebGL unavailable → static gradient fallback
 *  - desktop + motion allowed → live shader, dpr capped
 */

const { rendererOpts, renderSpy, meshPrograms } = vi.hoisted(() => {
  const rendererOpts: any[] = [];
  const renderSpy = vi.fn();
  const meshPrograms: any[] = [];
  return { rendererOpts, renderSpy, meshPrograms };
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
  meshPrograms.length = 0;
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
    expect(uniforms.uColorA).toBeDefined();
    expect(uniforms.uColorB).toBeDefined();
    expect(uniforms.uColorC).toBeDefined();
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
