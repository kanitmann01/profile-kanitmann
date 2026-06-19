import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InteractiveMascot from "@/components/interactive-mascot";

describe("InteractiveMascot", () => {
  it("renders without crashing", () => {
    const { container } = render(<InteractiveMascot />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("contains an SVG element", () => {
    const { container } = render(<InteractiveMascot />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has a mascot-container data-testid", () => {
    render(<InteractiveMascot />);
    const mascot = screen.getByTestId("mascot-container");
    expect(mascot).toBeInTheDocument();
  });

  it("renders eyes with mascot-eyes data-testid", () => {
    render(<InteractiveMascot />);
    const eyes = screen.getByTestId("mascot-eyes");
    expect(eyes).toBeInTheDocument();
  });

  it("renders emotion panel with 5 emotion buttons", () => {
    render(<InteractiveMascot />);
    const panel = screen.getByTestId("emotion-panel");
    expect(panel).toBeInTheDocument();
    const buttons = panel.querySelectorAll("button");
    expect(buttons).toHaveLength(5);
    expect(screen.getByTestId("emotion-btn-idle")).toBeInTheDocument();
    expect(screen.getByTestId("emotion-btn-happy")).toBeInTheDocument();
    expect(screen.getByTestId("emotion-btn-love")).toBeInTheDocument();
    expect(screen.getByTestId("emotion-btn-think")).toBeInTheDocument();
    expect(screen.getByTestId("emotion-btn-confused")).toBeInTheDocument();
  });

  it("each button has an accessible label", () => {
    render(<InteractiveMascot />);
    expect(screen.getByTestId("emotion-btn-idle")).toHaveAccessibleName();
    expect(screen.getByTestId("emotion-btn-happy")).toHaveAccessibleName();
    expect(screen.getByTestId("emotion-btn-love")).toHaveAccessibleName();
    expect(screen.getByTestId("emotion-btn-think")).toHaveAccessibleName();
    expect(screen.getByTestId("emotion-btn-confused")).toHaveAccessibleName();
  });

  it("default emotion is idle", () => {
    render(<InteractiveMascot />);
    const mascot = screen.getByTestId("mascot-container");
    expect(mascot).toHaveAttribute("data-emotion", "idle");
  });

  it("clicking happy button changes the active emotion", () => {
    render(<InteractiveMascot />);
    const happyBtn = screen.getByTestId("emotion-btn-happy");
    fireEvent.click(happyBtn);
    const mascot = screen.getByTestId("mascot-container");
    expect(mascot).toHaveAttribute("data-emotion", "happy");
  });

  it.each([
    ["emotion-btn-idle", "idle"],
    ["emotion-btn-happy", "happy"],
    ["emotion-btn-love", "love"],
    ["emotion-btn-think", "think"],
    ["emotion-btn-confused", "confused"],
  ])("clicking %s changes emotion to %s", (testId, emotion) => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId(testId));
    expect(screen.getByTestId("mascot-container")).toHaveAttribute(
      "data-emotion",
      emotion
    );
  });

  it("in idle state, normal round eyes are rendered", () => {
    const { container } = render(<InteractiveMascot />);
    const eyes = screen.getByTestId("mascot-eyes");
    const circles = eyes.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThanOrEqual(2);
  });

  it("in happy state, a mouth element is rendered", () => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId("emotion-btn-happy"));
    const mouth = screen.getByTestId("mascot-mouth");
    expect(mouth).toBeInTheDocument();
  });

  it("in love state, heart-shaped eyes are rendered as paths", () => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId("emotion-btn-love"));
    const eyes = screen.getByTestId("mascot-eyes");
    const paths = eyes.querySelectorAll("path");
    expect(paths.length).toBeGreaterThanOrEqual(2);
  });

  it("in confused state, eyes are asymmetric with different radii", () => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId("emotion-btn-confused"));
    const eyes = screen.getByTestId("mascot-eyes");
    const circles = eyes.querySelectorAll("circle");
    const radii = Array.from(circles).map((c) => c.getAttribute("r"));
    const hasDifferentRadii = radii.some((r) => r !== radii[0]);
    expect(hasDifferentRadii).toBe(true);
  });

  it("in think state, eyes are positioned looking upward", () => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId("emotion-btn-think"));
    const eyes = screen.getByTestId("mascot-eyes");
    const circles = eyes.querySelectorAll("circle");
    const cyValues = Array.from(circles).map((c) =>
      Number(c.getAttribute("cy"))
    );
    expect(cyValues.some((cy) => cy < 80)).toBe(true);
  });

  it("clicking the mascot SVG changes emotion to happy", () => {
    const { container } = render(<InteractiveMascot />);
    const svg = container.querySelector("svg")!;
    fireEvent.click(svg);
    expect(screen.getByTestId("mascot-container")).toHaveAttribute(
      "data-emotion",
      "happy"
    );
  });

  it("in love state, particles container is rendered", () => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId("emotion-btn-love"));
    expect(screen.getByTestId("mascot-particles")).toBeInTheDocument();
  });

  it("in think state, particles container is rendered", () => {
    render(<InteractiveMascot />);
    fireEvent.click(screen.getByTestId("emotion-btn-think"));
    expect(screen.getByTestId("mascot-particles")).toBeInTheDocument();
  });

  it.each([["idle"], ["happy"], ["confused"]])(
    "in %s state, particles container is not rendered",
    (emotion) => {
      render(<InteractiveMascot />);
      fireEvent.click(screen.getByTestId(`emotion-btn-${emotion}`));
      expect(screen.queryByTestId("mascot-particles")).not.toBeInTheDocument();
    }
  );

  it("mascot SVG is keyboard-accessible with role button", () => {
    const { container } = render(<InteractiveMascot />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "button");
    expect(svg).toHaveAttribute("tabindex", "0");
  });
});
