import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MitosisSteps } from "../../interactive/mitosis-steps";

describe("MitosisSteps", () => {
  it("renders the component with the first phase", () => {
    render(<MitosisSteps />);
    expect(screen.getByText(/interphase/i)).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<MitosisSteps />);
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
  });

  it("renders step indicator dots", () => {
    const { container } = render(<MitosisSteps />);
    const dots = container.querySelectorAll("[data-testid='step-dot']");
    expect(dots.length).toBe(6);
  });

  it("navigates to next step when Next is clicked", () => {
    render(<MitosisSteps />);
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText(/prophase/i)).toBeInTheDocument();
  });

  it("navigates through all phases", () => {
    render(<MitosisSteps />);
    const next = screen.getByRole("button", { name: /next/i });
    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: /prophase/i })
    ).toBeInTheDocument();
    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: /metaphase/i })
    ).toBeInTheDocument();
    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: /anaphase/i })
    ).toBeInTheDocument();
    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: /telophase/i })
    ).toBeInTheDocument();
    fireEvent.click(next);
    expect(
      screen.getByRole("heading", { name: /cytokinesis/i })
    ).toBeInTheDocument();
  });

  it("navigates back with Previous button", () => {
    render(<MitosisSteps />);
    const next = screen.getByRole("button", { name: /next/i });
    const prev = screen.getByRole("button", { name: /prev/i });
    fireEvent.click(next);
    expect(screen.getByText(/prophase/i)).toBeInTheDocument();
    fireEvent.click(prev);
    expect(screen.getByText(/interphase/i)).toBeInTheDocument();
  });

  it("disables Previous on first step", () => {
    render(<MitosisSteps />);
    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
  });

  it("disables Next on last step", () => {
    render(<MitosisSteps />);
    const next = screen.getByRole("button", { name: /next/i });
    for (let i = 0; i < 5; i++) fireEvent.click(next);
    expect(next).toBeDisabled();
  });

  it("renders cell diagram SVG", () => {
    const { container } = render(<MitosisSteps />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("shows description text for current phase", () => {
    render(<MitosisSteps />);
    expect(screen.getByTestId("phase-description")).toBeInTheDocument();
  });
});
