import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useReducedMotion } from "framer-motion";

import {
  MagneticButton,
  magneticOffset,
  MAGNET_RADIUS,
  MAGNET_STRENGTH,
} from "../magnetic-button";

/**
 * The setup file mocks matchMedia with matches: false for every query, which
 * simulates a coarse-pointer (touch) device by default. These helpers flip it
 * per-test.
 */
function mockFinePointer(fine: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({
        matches: fine && query === "(pointer: fine)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }) as unknown as MediaQueryList
  );
}

describe("magneticOffset", () => {
  it("returns zero when the cursor is dead-center", () => {
    expect(magneticOffset(200, 100, 200, 100)).toEqual({ x: 0, y: 0 });
  });

  it("returns zero outside the proximity radius", () => {
    expect(magneticOffset(400, 100, 200, 100)).toEqual({ x: 0, y: 0 });
  });

  it("returns zero exactly at the radius boundary", () => {
    expect(magneticOffset(200 + MAGNET_RADIUS, 100, 200, 100)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("pulls toward the cursor with strength fading to zero at the boundary", () => {
    // Cursor 40px right of center: pull = strength * (1 - 40/100).
    const expected = MAGNET_STRENGTH * (1 - 40 / MAGNET_RADIUS);
    const offset = magneticOffset(240, 100, 200, 100);
    expect(offset.x).toBeCloseTo(expected, 5);
    expect(offset.y).toBe(0);
  });

  it("pulls along the correct diagonal direction", () => {
    // 3-4-5 triangle: cursor (206, 103), center (200, 100) → dist 5.
    const offset = magneticOffset(206, 103, 200, 100);
    const dist = Math.hypot(6, 3);
    const expected = MAGNET_STRENGTH * (1 - dist / MAGNET_RADIUS);
    expect(offset.x).toBeCloseTo((6 / dist) * expected, 5);
    expect(offset.y).toBeCloseTo((3 / dist) * expected, 5);
  });

  it("respects a custom radius and strength", () => {
    // dist 40 < custom radius 80 → pull = 10 * (1 - 40/80) = 5.
    const offset = magneticOffset(240, 100, 200, 100, 80, 10);
    expect(offset.x).toBeCloseTo(5, 5);
    expect(offset.y).toBe(0);
  });

  it("is stronger when the cursor is closer to the center", () => {
    const near = magneticOffset(210, 100, 200, 100);
    const far = magneticOffset(280, 100, 200, 100);
    expect(Math.abs(near.x)).toBeGreaterThan(Math.abs(far.x));
  });
});

describe("MagneticButton", () => {
  let rafCallbacks: Array<FrameRequestCallback>;
  let rafSpy: ReturnType<typeof vi.spyOn>;
  let cafSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    mockFinePointer(false);
    vi.mocked(useReducedMotion).mockReturnValue(false);
    rafCallbacks = [];
    rafSpy = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb) => {
        rafCallbacks.push(cb);
        return rafCallbacks.length;
      });
    cafSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    rafSpy.mockRestore();
    cafSpy.mockRestore();
    vi.mocked(useReducedMotion).mockReset();
    vi.mocked(useReducedMotion).mockReturnValue(false);
    vi.mocked(window.matchMedia).mockReset();
  });

  /** Runs queued rAF callbacks until the loop stops or the budget runs out. */
  function driveFrames(max = 100): number {
    let ran = 0;
    while (rafCallbacks.length > 0 && ran < max) {
      const cb = rafCallbacks.shift()!;
      ran += 1;
      cb(performance.now());
    }
    return ran;
  }

  function stubRect(
    wrapper: HTMLElement,
    rect: { left: number; top: number; width: number; height: number }
  ) {
    wrapper.getBoundingClientRect = () =>
      ({
        ...rect,
        right: rect.left + rect.width,
        bottom: rect.top + rect.height,
        x: rect.left,
        y: rect.top,
        toJSON: () => ({}),
      }) as DOMRect;
  }

  it("renders the wrapped button with children and passes clicks through", () => {
    const handleClick = vi.fn();
    render(<MagneticButton onClick={handleClick}>Book a call</MagneticButton>);
    const button = screen.getByRole("button", { name: "Book a call" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("stays inert on coarse-pointer devices (no rAF, no transform)", () => {
    render(<MagneticButton>Book a call</MagneticButton>);
    const wrapper = screen.getByRole("button").parentElement as HTMLElement;
    fireEvent.pointerEnter(wrapper, { clientX: 240, clientY: 100 });
    driveFrames();
    expect(rafSpy).not.toHaveBeenCalled();
    expect(wrapper.style.transform).toBe("");
  });

  it("stays inert when the user prefers reduced motion", () => {
    mockFinePointer(true);
    vi.mocked(useReducedMotion).mockReturnValue(true);
    render(<MagneticButton>Book a call</MagneticButton>);
    const wrapper = screen.getByRole("button").parentElement as HTMLElement;
    fireEvent.pointerEnter(wrapper, { clientX: 240, clientY: 100 });
    driveFrames();
    expect(rafSpy).not.toHaveBeenCalled();
    expect(wrapper.style.transform).toBe("");
  });

  it("stays inert while disabled, even with a fine pointer", () => {
    mockFinePointer(true);
    render(<MagneticButton disabled>Send</MagneticButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    const wrapper = button.parentElement as HTMLElement;
    fireEvent.pointerEnter(wrapper, { clientX: 240, clientY: 100 });
    driveFrames();
    expect(rafSpy).not.toHaveBeenCalled();
  });

  it("pulls the button toward the cursor and springs back on release", () => {
    mockFinePointer(true);
    const { unmount } = render(<MagneticButton>Book a call</MagneticButton>);
    const button = screen.getByRole("button");
    const wrapper = button.parentElement as HTMLElement;
    stubRect(wrapper, { left: 100, top: 50, width: 200, height: 100 });

    // Cursor 40px right of center → pull of strength * (1 - 40/radius).
    fireEvent.pointerEnter(wrapper, { clientX: 240, clientY: 100 });
    fireEvent.pointerMove(wrapper, { clientX: 240, clientY: 100 });
    const frames = driveFrames();
    expect(frames).toBeGreaterThan(0);
    const expectedPull = MAGNET_STRENGTH * (1 - 40 / MAGNET_RADIUS);
    expect(wrapper.style.transform).toContain(
      `translate3d(${expectedPull.toFixed(2)}px, 0.00px, 0)`
    );

    // Cursor leaves the proximity zone → spring back to rest, loop stops.
    fireEvent.pointerMove(wrapper, { clientX: 600, clientY: 100 });
    driveFrames();
    expect(wrapper.style.transform).toBe("");
    expect(rafCallbacks).toHaveLength(0);
    unmount();
  });

  it("cancels the rAF loop on unmount", () => {
    mockFinePointer(true);
    const { unmount } = render(<MagneticButton>Book a call</MagneticButton>);
    const wrapper = screen.getByRole("button").parentElement as HTMLElement;
    stubRect(wrapper, { left: 100, top: 50, width: 200, height: 100 });
    fireEvent.pointerEnter(wrapper, { clientX: 240, clientY: 100 });
    expect(rafSpy).toHaveBeenCalledTimes(1);
    const scheduledId = rafCallbacks.length;
    unmount();
    expect(cafSpy).toHaveBeenCalledWith(scheduledId);
  });
});
