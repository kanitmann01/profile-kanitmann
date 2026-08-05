import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ReadingProgressRing } from "../reading-progress-ring";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

vi.mock("@/hooks/use-reduced-motion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

const mockedUseReducedMotion = vi.mocked(useReducedMotion);

describe("ReadingProgressRing", () => {
  beforeEach(() => {
    mockedUseReducedMotion.mockReturnValue(false);
  });

  it("renders the reading-progress ring with wrapped children", () => {
    render(
      <ReadingProgressRing>
        <article>article body</article>
      </ReadingProgressRing>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("article body")).toBeInTheDocument();
  });

  it("styles the ring as a fixed viewport overlay with a circular track", () => {
    const { container } = render(
      <ReadingProgressRing>
        <div>content</div>
      </ReadingProgressRing>
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar.getAttribute("class")).toContain("fixed");
    // A progress ring is a circle: one track circle + one progress circle
    // driven by strokeDasharray / strokeDashoffset.
    const circles = progressbar.querySelectorAll("circle");
    expect(circles.length).toBe(2);
    const expectedCircumference = String(2 * Math.PI * ((44 - 3) / 2));
    expect(circles[1].style.strokeDasharray).toBe(expectedCircumference);
    expect(container.textContent).toContain("content");
  });

  it("hides the ring entirely under reduced motion but keeps children", () => {
    mockedUseReducedMotion.mockReturnValue(true);

    render(
      <ReadingProgressRing>
        <article>article body</article>
      </ReadingProgressRing>
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("article body")).toBeInTheDocument();
  });
});
