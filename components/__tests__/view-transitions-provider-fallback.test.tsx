import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ViewTransitionsProvider } from "@/components/view-transitions-provider";

// Runtime fallback: a React build without the canary `<ViewTransition>` export
// (npm `react@19.2` outside Next's bundler, or any runtime that doesn't ship
// it). The provider must degrade to a plain fragment — instant navigation,
// no crash. Mirrors the browser-without-API path: navigation just doesn't
// animate. (Key present, value undefined — mirrors a module that simply
// doesn't define the export, which reads as `undefined` at the import site.)
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return { ...actual, ViewTransition: undefined };
});

describe("ViewTransitionsProvider runtime fallback", () => {
  it("renders children as-is when the runtime lacks ViewTransition", () => {
    render(
      <ViewTransitionsProvider>
        <p>page content</p>
      </ViewTransitionsProvider>
    );

    expect(screen.getByText("page content")).toBeInTheDocument();
    // No wrapper, no error — navigation stays instant.
    expect(document.querySelector("[data-testid='vt-wrapper']")).toBeNull();
  });
});
