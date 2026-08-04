import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

vi.mock("@/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

// Mutable theme for the next-themes mock (resolvedTheme is undefined during
// SSR, then "dark"/"light" after mount).
const { themeState } = vi.hoisted(() => ({
  themeState: { resolvedTheme: undefined as string | undefined },
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: themeState.resolvedTheme }),
}));

// Per-query matchMedia control. vitest.setup's default mock always returns
// matches: false, so the pointer gate must be explicitly flipped on.
const { mediaQueries } = vi.hoisted(() => ({
  mediaQueries: new Map<string, boolean>(),
}));

function installMatchMedia() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => {
    const matches = mediaQueries.get(query) ?? false;
    return {
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };
  });
}

async function moveMouse(clientX: number, clientY: number) {
  fireEvent.pointerMove(window, { clientX, clientY, pointerType: "mouse" });
  // Let the rAF-throttled transform apply.
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  );
}

describe("CursorSpotlight", () => {
  beforeEach(() => {
    themeState.resolvedTheme = "dark";
    mediaQueries.clear();
    mediaQueries.set("(pointer: fine)", true);
    mockedUseReducedMotion.mockReturnValue(false);
    installMatchMedia();
  });

  it("renders the glow in dark mode on fine pointers when motion is allowed", async () => {
    const { container } = render(<CursorSpotlight />);

    const glow = screen.getByTestId("cursor-spotlight");
    expect(glow).toBeInTheDocument();
    // Never intercepts clicks or selection; hidden from AT.
    expect(glow).toHaveClass("pointer-events-none");
    expect(glow).toHaveAttribute("aria-hidden", "true");
    // Starts off-screen; only transform (never top/left) drives position.
    expect(glow.style.transform).toContain("translate3d(-600px");

    await moveMouse(200, 150);
    expect(glow.style.transform).toContain("translate3d(-100px, -150px");
    expect(glow.style.top).toBe("");
    expect(glow.style.left).toBe("");
  });

  it("renders nothing in light mode", async () => {
    themeState.resolvedTheme = "light";
    const { container } = render(<CursorSpotlight />);

    expect(screen.queryByTestId("cursor-spotlight")).not.toBeInTheDocument();
    await moveMouse(200, 150);
    expect(container.querySelector("div")).toBeNull();
  });

  it("renders nothing when the user prefers reduced motion", () => {
    mockedUseReducedMotion.mockReturnValue(true);
    const { container } = render(<CursorSpotlight />);

    expect(screen.queryByTestId("cursor-spotlight")).not.toBeInTheDocument();
    expect(container.querySelector("div")).toBeNull();
  });

  it("renders nothing on coarse pointers (touch)", () => {
    mediaQueries.set("(pointer: fine)", false);
    const { container } = render(<CursorSpotlight />);

    expect(screen.queryByTestId("cursor-spotlight")).not.toBeInTheDocument();
    expect(container.querySelector("div")).toBeNull();
  });
});
