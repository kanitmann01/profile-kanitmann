import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LenisProvider } from "@/components/lenis-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

vi.mock("@/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

// Capture the props ReactLenis is rendered with (and whether it renders at
// all) so we can assert the conditional-init path.
const { reactLenisCalls } = vi.hoisted(() => ({
  reactLenisCalls: [] as Array<{
    root: boolean;
    options: Record<string, unknown>;
  }>,
}));

vi.mock("lenis/react", () => ({
  ReactLenis: ({ children, root, options }: any) => {
    reactLenisCalls.push({ root, options });
    return <div data-testid="lenis-root">{children}</div>;
  },
  useLenis: () => undefined,
}));

describe("LenisProvider", () => {
  beforeEach(() => {
    reactLenisCalls.length = 0;
    mockedUseReducedMotion.mockReturnValue(false);
  });

  it("mounts ReactLenis on the root when motion is allowed", () => {
    render(
      <LenisProvider>
        <div>page content</div>
      </LenisProvider>
    );

    expect(screen.getByTestId("lenis-root")).toBeInTheDocument();
    expect(screen.getByText("page content")).toBeInTheDocument();
    expect(reactLenisCalls).toHaveLength(1);
    expect(reactLenisCalls[0].root).toBe(true);
    // Touch scrolling stays native — never a touch override.
    expect(reactLenisCalls[0].options.syncTouch).toBe(false);
  });

  it("does not initialize Lenis when the user prefers reduced motion", () => {
    mockedUseReducedMotion.mockReturnValue(true);

    render(
      <LenisProvider>
        <div>page content</div>
      </LenisProvider>
    );

    expect(screen.queryByTestId("lenis-root")).not.toBeInTheDocument();
    expect(reactLenisCalls).toHaveLength(0);
    // Children render as-is, so scrolling stays fully native.
    expect(screen.getByText("page content")).toBeInTheDocument();
  });
});
