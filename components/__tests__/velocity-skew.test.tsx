import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "framer-motion";

import {
  VelocitySkew,
  MAX_SKEW_DEG,
  clampSkew,
} from "@/components/animations/velocity-skew";

/**
 * Wave E.4 velocity-skew coverage:
 *  - renders an h2 by default, honors `as`
 *  - binds a Lenis velocity callback on fine pointers when motion is allowed
 *  - coarse pointer (touch/mobile) → no binding
 *  - prefers-reduced-motion → plain element, no binding
 *  - clampSkew caps the skew at ±3deg
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

function stubPointerFine(matches: boolean) {
  vi.mocked(window.matchMedia).mockImplementation(
    (query: string) =>
      ({
        matches: query.includes("(pointer: fine)") ? matches : false,
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

afterEach(() => {
  vi.mocked(useReducedMotion).mockReturnValue(false);
  vi.restoreAllMocks();
  lenisCallbacks.length = 0;
});

describe("VelocitySkew — rendering", () => {
  it("renders children as an h2 by default", () => {
    stubPointerFine(true);
    render(
      <VelocitySkew>
        Featured <em>Projects</em>
      </VelocitySkew>
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toContain("Featured");
    expect(screen.getByText("Projects").tagName).toBe("EM");
  });

  it("honors the `as` prop", () => {
    stubPointerFine(true);
    render(<VelocitySkew as="div">Bento Header</VelocitySkew>);
    expect(screen.getByText("Bento Header").tagName).toBe("DIV");
  });

  it("renders a plain element under reduced motion (no motion styles)", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    stubPointerFine(true);
    render(<VelocitySkew>Quiet Title</VelocitySkew>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});

describe("VelocitySkew — Lenis binding gates", () => {
  it("binds a velocity callback on fine pointers when motion is allowed", async () => {
    stubPointerFine(true);
    render(<VelocitySkew>Fast Title</VelocitySkew>);
    await waitFor(() => {
      expect(typeof lenisCallbacks.at(-1)).toBe("function");
    });
  });

  it("skips the binding entirely on coarse pointers (touch)", () => {
    stubPointerFine(false);
    render(<VelocitySkew>Mobile Title</VelocitySkew>);
    expect(lenisCallbacks.at(-1)).toBeUndefined();
  });

  it("skips the binding entirely under reduced motion", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
    stubPointerFine(true);
    render(<VelocitySkew>Reduced Title</VelocitySkew>);
    expect(lenisCallbacks.at(-1)).toBeUndefined();
  });
});

describe("VelocitySkew — clampSkew", () => {
  it("caps velocity-driven skew at ±3 degrees", () => {
    expect(clampSkew(100)).toBe(MAX_SKEW_DEG);
    expect(clampSkew(-100)).toBe(-MAX_SKEW_DEG);
    expect(clampSkew(3)).toBe(3);
    expect(clampSkew(-3)).toBe(-3);
    expect(clampSkew(1.5)).toBe(1.5);
    expect(clampSkew(-1.5)).toBe(-1.5);
    expect(clampSkew(0)).toBe(0);
  });
});
