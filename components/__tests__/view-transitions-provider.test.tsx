import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ViewTransitionsProvider } from "@/components/view-transitions-provider";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

// npm `react@19.2.0` doesn't export the canary `<ViewTransition>` — Next 16
// resolves it from its bundled React at build time. In the vitest module
// graph we synthesize it as a marker component so the provider's gating
// logic is observable.
const { vtCalls } = vi.hoisted(() => ({
  vtCalls: [] as Array<{ name?: string }>,
}));

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    ViewTransition: ({
      name,
      children,
    }: {
      name?: string;
      children?: React.ReactNode;
    }) => {
      vtCalls.push({ name });
      return <div data-testid="vt-wrapper">{children}</div>;
    },
  };
});

vi.mock("@/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("ViewTransitionsProvider", () => {
  beforeEach(() => {
    vtCalls.length = 0;
    mockedUseReducedMotion.mockReturnValue(false);
  });

  it("wraps children in a ViewTransition when motion is allowed", () => {
    render(
      <ViewTransitionsProvider>
        <p>page content</p>
      </ViewTransitionsProvider>
    );

    expect(screen.getByTestId("vt-wrapper")).toBeInTheDocument();
    expect(screen.getByText("page content")).toBeInTheDocument();
    // No explicit name: the whole route outlet crossfades as one unit.
    expect(vtCalls).toHaveLength(1);
    expect(vtCalls[0].name).toBeUndefined();
  });

  it("skips the ViewTransition entirely when the user prefers reduced motion", () => {
    mockedUseReducedMotion.mockReturnValue(true);

    render(
      <ViewTransitionsProvider>
        <p>page content</p>
      </ViewTransitionsProvider>
    );

    expect(screen.queryByTestId("vt-wrapper")).not.toBeInTheDocument();
    // Children still render — navigation is instant, content is intact.
    expect(screen.getByText("page content")).toBeInTheDocument();
    expect(vtCalls).toHaveLength(0);
  });
});
