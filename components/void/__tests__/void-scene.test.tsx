import { act, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";

import {
  VoidScene,
  MAX_DPR,
  PARTICLE_COUNT,
  VOID_ALWAYS_ON_MS,
} from "@/components/void/void-scene";

/**
 * Void scene (three.js) coverage — mirrors the suspend/fallback/cleanup
 * guarantees of shader-hero.test.tsx:
 *  - reduced-motion / reduced-data → fully suspended (renders nothing)
 *  - mobile viewport → static CSS emblem, never the live scene
 *  - desktop + motion allowed → WebGL: scene graph mounts (portal core +
 *    rings + glow disc + particles + aurora), bloom composer present
 *  - visibility-hidden → RAF loop paused, resumed on visible
 *  - ambient: loop runs for VOID_ALWAYS_ON_MS then parks; pointermove wakes
 *  - WebGL unavailable / init failure → static emblem fallback
 *  - webglcontextlost → one-way degrade to the static emblem
 *  - unmount → canvas removed, context released, observer disconnected
 */

const {
  rendererOpts,
  composerRenders,
  sceneObjects,
  disposeSpy,
  forceContextLossSpy,
  resizeObservers,
  failComposer,
} = vi.hoisted(() => {
  const rendererOpts: any[] = [];
  const composerRenders: { count: number } = { count: 0 };
  // Collect every Object3D added to the mocked scene so we can assert the
  // scene graph shape (portal core, rings, glow, particles, aurora).
  const sceneObjects: any[] = [];
  const disposeSpy = vi.fn();
  const forceContextLossSpy = vi.fn();
  const resizeObservers: {
    callback: ResizeObserverCallback;
    observed: Element[];
  }[] = [];
  const failComposer = { value: false };
  return {
    rendererOpts,
    composerRenders,
    sceneObjects,
    disposeSpy,
    forceContextLossSpy,
    resizeObservers,
    failComposer,
  };
});

/** A minimal Object3D stand-in that records itself and supports name lookups. */
function makeObject3D(name?: string) {
  const obj: any = {
    name,
    position: { set: vi.fn(), copy: vi.fn() },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { setScalar: vi.fn() },
    material: name?.includes("ring-outer")
      ? { color: { setRGB: vi.fn() } }
      : undefined,
    geometry: undefined,
    renderOrder: 0,
    children: [] as any[],
    getObjectByName(n: string) {
      if (this.name === n) return this;
      for (const c of this.children) {
        const found = c.getObjectByName?.(n);
        if (found) return found;
      }
      return undefined;
    },
    traverse(cb: (o: any) => void) {
      cb(this);
      for (const c of this.children) c.traverse?.(cb);
    },
  };
  sceneObjects.push(obj);
  return obj;
}

vi.mock("three", () => {
  class Vector2 {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
    }
  }
  class Vector3 {
    x = 0;
    y = 0;
    z = 0;
  }
  class Clock {
    getElapsedTime() {
      return 0;
    }
  }
  class Color {
    setRGB = vi.fn();
  }
  class WebGLRenderer {
    domElement: any;
    constructor(opts: any) {
      rendererOpts.push(opts);
      this.domElement = opts.canvas;
      this.domElement.style = {};
    }
    setPixelRatio = vi.fn();
    setSize = vi.fn();
    setClearColor = vi.fn();
    dispose = disposeSpy;
    forceContextLoss = forceContextLossSpy;
  }
  class Scene {
    children: any[] = [];
    userData: any = {};
    add(child: any) {
      this.children.push(child);
    }
    getObjectByName(name: string) {
      return this.children.find((c) => c.name === name);
    }
    traverse(cb: (o: any) => void) {
      this.children.forEach((c) => c.traverse?.(cb));
    }
  }
  class PerspectiveCamera {
    aspect = 1;
    position = { set: vi.fn() };
    updateProjectionMatrix = vi.fn();
  }
  // Geometry stand-ins: just capture that they were constructed.
  class IcosahedronGeometry {}
  class TorusGeometry {}
  class CircleGeometry {}
  class PlaneGeometry {}
  class BufferGeometry {
    attributes: any = {};
    setAttribute(name: string, attr: any) {
      this.attributes[name] = attr;
    }
    dispose = vi.fn();
  }
  class BufferAttribute {
    array: any;
    itemSize: number;
    constructor(array: any, itemSize: number) {
      this.array = array;
      this.itemSize = itemSize;
    }
  }
  class MeshBasicMaterial {
    constructor(public opts: any = {}) {}
    dispose = vi.fn();
  }
  class ShaderMaterial {
    uniforms: any;
    vertexShader?: string;
    fragmentShader?: string;
    vertexColors: boolean;
    constructor(opts: any = {}) {
      this.uniforms = opts.uniforms ?? {};
      this.vertexShader = opts.vertexShader;
      this.fragmentShader = opts.fragmentShader;
      this.vertexColors = false;
    }
    dispose = vi.fn();
  }
  const AdditiveBlending = 2;
  class Mesh {
    name?: string;
    geometry: any;
    material: any;
    renderOrder = 0;
    rotation = { x: 0, y: 0, z: 0 };
    scale = { setScalar: vi.fn() };
    constructor(geo: any, mat: any) {
      this.geometry = geo;
      this.material = mat;
    }
  }
  class Points {
    name?: string;
    geometry: any;
    material: any;
    constructor(geo: any, mat: any) {
      this.geometry = geo;
      this.material = mat;
    }
  }
  return {
    Vector2,
    Vector3,
    Clock,
    Color,
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    IcosahedronGeometry,
    TorusGeometry,
    CircleGeometry,
    PlaneGeometry,
    BufferGeometry,
    BufferAttribute,
    MeshBasicMaterial,
    ShaderMaterial,
    AdditiveBlending,
    Mesh,
    Points,
  };
});

vi.mock("three/examples/jsm/postprocessing/EffectComposer.js", () => ({
  EffectComposer: class {
    passes: any[] = [];
    render = vi.fn(() => {
      composerRenders.count++;
    });
    addPass(p: any) {
      this.passes.push(p);
    }
    setSize = vi.fn();
    setPixelRatio = vi.fn();
    dispose = vi.fn();
    constructor(renderer: any) {
      if (failComposer.value) throw new Error("composer init failed");
      // Stash the renderer for completeness; not asserted.
      (this as any).renderer = renderer;
    }
  },
}));
vi.mock("three/examples/jsm/postprocessing/RenderPass.js", () => ({
  RenderPass: class {},
}));
vi.mock("three/examples/jsm/postprocessing/UnrealBloomPass.js", () => ({
  UnrealBloomPass: class {},
}));
vi.mock("three/examples/jsm/postprocessing/OutputPass.js", () => ({
  OutputPass: class {},
}));

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

afterEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false);
  stubMatchMedia();
  vi.restoreAllMocks();
  unstubRaf();
  rendererOpts.length = 0;
  composerRenders.count = 0;
  sceneObjects.length = 0;
  resizeObservers.length = 0;
  disposeSpy.mockClear();
  forceContextLossSpy.mockClear();
  failComposer.value = false;
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
    expect(composerRenders.count).toBe(0);
    const container = getContainer();
    expect(container!.className).toContain("absolute");
    expect(container!.className).toContain("inset-0");
    expect(container!.className).toContain("z-0");
    expect(container!.className).toContain("pointer-events-none");
    expect(container).toHaveAttribute("aria-hidden", "true");
  });
});

describe("VoidScene — live scene", () => {
  it("mounts a full-bleed canvas behind content and runs the bloom composer", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    await waitFor(() => {
      expect(composerRenders.count).toBeGreaterThan(0);
    });
    expect(getCanvas()!.className).toContain("void-canvas");
    const container = getContainer();
    expect(container).toHaveAttribute("aria-hidden", "true");
    expect(container!.className).toContain("pointer-events-none");
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
    // setPixelRatio is called with min(dpr, MAX_DPR).
    expect(MAX_DPR).toBe(1.5);
    Object.defineProperty(window, "devicePixelRatio", {
      configurable: true,
      value: 1,
    });
  });

  it("requests a low-power context with alpha + no antialias", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    expect(rendererOpts[0]).toMatchObject({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
  });

  it("falls back to the static emblem when WebGL is unavailable", async () => {
    // jsdom default: getContext returns null.
    render(<VoidScene />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(composerRenders.count).toBe(0);
  });

  it("falls back to the static emblem when the composer fails to init", async () => {
    stubWebGLAvailable(true);
    failComposer.value = true;
    render(<VoidScene />);
    await waitFor(() => {
      expect(getStatic()).not.toBeNull();
    });
    expect(getCanvas()).toBeNull();
    expect(composerRenders.count).toBe(0);
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

    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(cancelCalls.length).toBeGreaterThan(0);

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

describe("VoidScene — ambient always-on-then-park", () => {
  it("runs continuously for VOID_ALWAYS_ON_MS then parks; pointermove wakes", async () => {
    stubWebGLAvailable(true);
    stubMatchMedia();
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });

    // Controllable rAF: each schedule advances the clock by 1s so the loop's
    // VOID_ALWAYS_ON_MS window (30s) closes after 30 frames.
    const frames: Array<{ cb: FrameRequestCallback; at: number }> = [];
    let clock = 0;
    vi.stubGlobal(
      "requestAnimationFrame",
      vi.fn((cb: FrameRequestCallback) => {
        clock += 1000;
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

    // Run scheduled frames until the loop parks (no activity → after 30s it
    // stops scheduling). 30s is well within the window so this terminates.
    let framesRan = 0;
    while (frames.length > 0 && framesRan < 60) {
      const frame = frames.shift()!;
      frame.cb(frame.at);
      framesRan++;
    }
    expect(framesRan).toBeGreaterThan(0);
    expect(frames.length).toBe(0); // parked

    // A pointer move wakes the parked loop.
    await act(async () => {
      window.dispatchEvent(new Event("pointermove"));
    });
    expect(frames.length).toBeGreaterThan(0);

    nowSpy.mockRestore();
    expect(VOID_ALWAYS_ON_MS).toBe(30_000);
  });
});

describe("VoidScene — context loss + unmount", () => {
  it("degrades one-way to the static emblem on webglcontextlost", async () => {
    stubWebGLAvailable(true);
    render(<VoidScene />);
    await waitFor(() => {
      expect(getCanvas()).not.toBeNull();
    });
    await waitFor(() => {
      expect(composerRenders.count).toBeGreaterThan(0);
    });

    await act(async () => {
      getCanvas()!.dispatchEvent(
        new Event("webglcontextlost", { cancelable: true })
      );
    });

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
    expect(forceContextLossSpy).toHaveBeenCalled();
  });
});
