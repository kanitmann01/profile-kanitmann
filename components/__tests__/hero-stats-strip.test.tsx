import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HeroStatsStrip } from "@/components/hero-stats-strip";
import {
  animate,
  motionValue,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const mockedAnimate = vi.mocked(animate);
const mockedUseReducedMotion = vi.mocked(useReducedMotion);
const mockedUseScroll = vi.mocked(useScroll);

/**
 * Matches a stat paragraph by its full text content. getByText only sees
 * direct text-node children, so the prefix/number/suffix spans render as
 * individual nodes; checking textContent asserts they stay glued together.
 */
function statTextMatcher(text: string) {
  return (_content: string, element: Element | null) =>
    element !== null && element.tagName === "P" && element.textContent === text;
}

/**
 * Replaces the setup mock's inert `animate` with a timer-driven tween so the
 * count-up actually progresses through intermediate values under fake timers.
 * easeOutCubic matches Motion's "easeOut" well enough for these assertions.
 */
function installCountUpTween() {
  mockedAnimate.mockImplementation(((
    from: number,
    to: number,
    options?: {
      duration?: number;
      onUpdate?: (value: number) => void;
    }
  ) => {
    const durationMs = (options?.duration ?? 1.2) * 1000;
    const start = performance.now();
    const timer = setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      options?.onUpdate?.(from + (to - from) * eased);
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16);
    return { stop: () => clearInterval(timer) };
  }) as any);
}

/**
 * Renders the strip with a controllable scroll progress value (the setup
 * mock's `useScroll` returns a motionValue stand-in; the real hook computes
 * progress > 0 once the strip's top edge enters the viewport, with no
 * IntersectionObserver involved). Drive it with `set()` inside `act()`.
 */
function renderWithScrollYProgress(initial: number) {
  // The setup mock's useScroll returns only scrollYProgress (the component
  // only destructures that); pad the return to satisfy the real types.
  const scrollYProgress = motionValue(initial);
  mockedUseScroll.mockReturnValue({
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress,
  } as any);
  render(<HeroStatsStrip />);
  return scrollYProgress;
}

beforeEach(() => {
  // Default: strip still below the fold — the wedged-IO scenario where the
  // old IntersectionObserver delivered one isIntersecting:false and never
  // another. scrollYProgress stays 0 until a test drives it above 0.
  mockedUseScroll.mockReturnValue({
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
  } as any);
  mockedUseReducedMotion.mockReturnValue(false);
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("HeroStatsStrip", () => {
  it("counts up from 0 to the final values once the strip scrolls into view", async () => {
    vi.useFakeTimers();
    mockedUseReducedMotion.mockReturnValue(false);
    installCountUpTween();

    const scrollYProgress = renderWithScrollYProgress(0);

    // Below the fold: everything glued to 0, no tween started.
    expect(screen.getByText(statTextMatcher("0+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("~0%"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("0B+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("0.0%"))).toBeInTheDocument();
    expect(mockedAnimate).not.toHaveBeenCalled();

    // Scroll: the strip's top edge crosses the viewport bottom edge, which
    // flips the trigger once and starts all four tweens.
    act(() => {
      scrollYProgress.set(0.5);
    });
    expect(mockedAnimate).toHaveBeenCalledTimes(4);

    // Halfway through the 1.2s tween: moved off 0 but not yet at the target.
    await act(async () => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.queryByText(statTextMatcher("0+"))).not.toBeInTheDocument();
    expect(
      screen.queryByText(statTextMatcher("2,000+"))
    ).not.toBeInTheDocument();

    // Full duration: every stat lands on its final formatted value.
    await act(async () => {
      vi.advanceTimersByTime(700);
    });
    expect(screen.getByText(statTextMatcher("2,000+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("~96%"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("1B+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("99.9%"))).toBeInTheDocument();

    // Each stat tweened from 0 to its target over 1.2s ease-out.
    expect(mockedAnimate).toHaveBeenCalledWith(
      0,
      2000,
      expect.objectContaining({ duration: 1.2 })
    );
    expect(mockedAnimate).toHaveBeenCalledWith(
      0,
      96,
      expect.objectContaining({ duration: 1.2 })
    );
    expect(mockedAnimate).toHaveBeenCalledWith(
      0,
      1,
      expect.objectContaining({ duration: 1.2 })
    );
    expect(mockedAnimate).toHaveBeenCalledWith(
      0,
      99.9,
      expect.objectContaining({ duration: 1.2 })
    );
  });

  it("renders the final values immediately under reduced motion", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    // Scroll position must not matter — reduced motion never tweens, even
    // while the strip is still below the fold.
    renderWithScrollYProgress(0);

    expect(screen.getByText(statTextMatcher("2,000+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("~96%"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("1B+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("99.9%"))).toBeInTheDocument();
    expect(mockedAnimate).not.toHaveBeenCalled();
  });

  it("stays at 0 until the strip scrolls into view", () => {
    mockedUseReducedMotion.mockReturnValue(false);

    render(<HeroStatsStrip />);

    expect(screen.getByText(statTextMatcher("0+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("~0%"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("0B+"))).toBeInTheDocument();
    expect(screen.getByText(statTextMatcher("0.0%"))).toBeInTheDocument();
    expect(mockedAnimate).not.toHaveBeenCalled();
  });
});
