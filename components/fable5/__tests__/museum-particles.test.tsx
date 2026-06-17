import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { MuseumParticles } from "../museum-particles";

const buildGlMock = () => {
  const shader = { __isShader: true };
  const program = { __isProgram: true };
  const buffer = { __isBuffer: true };
  const uniformLocation = { __isUniform: true };
  return {
    clearColor: vi.fn(),
    clear: vi.fn(),
    viewport: vi.fn(),
    bufferData: vi.fn(),
    createBuffer: vi.fn(() => buffer),
    createShader: vi.fn(() => shader),
    createProgram: vi.fn(() => program),
    getUniformLocation: vi.fn(() => uniformLocation),
    getAttribLocation: vi.fn(() => 0),
    enableVertexAttribArray: vi.fn(),
    vertexAttribPointer: vi.fn(),
    uniform1f: vi.fn(),
    uniform2f: vi.fn(),
    useProgram: vi.fn(),
    drawArrays: vi.fn(),
    getExtension: vi.fn(() => ({ loseContext: vi.fn() })),
    getParameter: vi.fn(),
    getShaderParameter: vi.fn(() => true),
    getProgramParameter: vi.fn(() => true),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    bindBuffer: vi.fn(),
    enable: vi.fn(),
    blendFunc: vi.fn(),
    deleteShader: vi.fn(),
    deleteProgram: vi.fn(),
    ARRAY_BUFFER: 34962,
    STATIC_DRAW: 35044,
    DYNAMIC_DRAW: 35048,
    POINTS: 0,
    FLOAT: 5126,
    VERTEX_SHADER: 35633,
    FRAGMENT_SHADER: 35632,
    COMPILE_STATUS: 35713,
    LINK_STATUS: 35714,
    COLOR_BUFFER_BIT: 16384,
    BLEND: 3042,
    SRC_ALPHA: 770,
    ONE: 1,
  };
};

describe("MuseumParticles", () => {
  let getContextSpy: ReturnType<typeof vi.spyOn>;
  let rafSpy: ReturnType<typeof vi.spyOn>;
  let rafFired: boolean;

  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    Object.defineProperty(document, "hidden", {
      configurable: true,
      get: () => false,
    });

    getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, "getContext");

    rafFired = false;
    rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        if (!rafFired) {
          rafFired = true;
          cb(performance.now());
        }
        return 1;
      });

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a canvas element when WebGL2 is available", () => {
    getContextSpy.mockReturnValue(
      buildGlMock() as unknown as WebGL2RenderingContext
    );
    const { container } = render(<MuseumParticles />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("data-museum-particles");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("calls getContext with webgl2", () => {
    getContextSpy.mockReturnValue(
      buildGlMock() as unknown as WebGL2RenderingContext
    );
    render(<MuseumParticles />);
    expect(getContextSpy).toHaveBeenCalledWith(
      "webgl2",
      expect.objectContaining({ alpha: true })
    );
  });

  it("drives the render loop with requestAnimationFrame", () => {
    getContextSpy.mockReturnValue(
      buildGlMock() as unknown as WebGL2RenderingContext
    );
    render(<MuseumParticles />);
    expect(rafSpy).toHaveBeenCalled();
  });

  it("uses additive blending with a transparent clear color", () => {
    const glMock = buildGlMock();
    getContextSpy.mockReturnValue(glMock as unknown as WebGL2RenderingContext);
    render(<MuseumParticles />);
    expect(glMock.enable).toHaveBeenCalledWith(glMock.BLEND);
    expect(glMock.blendFunc).toHaveBeenCalledWith(glMock.SRC_ALPHA, glMock.ONE);
    expect(glMock.clearColor).toHaveBeenCalledWith(0, 0, 0, 0);
  });

  it("renders nothing when WebGL2 is unavailable (silent fallback)", () => {
    getContextSpy.mockReturnValue(null);
    const { container } = render(<MuseumParticles />);
    expect(container.querySelector("canvas")).not.toBeInTheDocument();
  });

  it("does not call requestAnimationFrame when WebGL2 is unavailable", () => {
    getContextSpy.mockReturnValue(null);
    render(<MuseumParticles />);
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("removes the resize and visibility listeners on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const docRemoveSpy = vi.spyOn(document, "removeEventListener");
    getContextSpy.mockReturnValue(
      buildGlMock() as unknown as WebGL2RenderingContext
    );
    const { unmount } = render(<MuseumParticles />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(docRemoveSpy).toHaveBeenCalledWith(
      "visibilitychange",
      expect.any(Function)
    );
  });
});
