import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FunctionGrapher } from "../../interactive/function-grapher";

describe("FunctionGrapher", () => {
  it("renders function selector", () => {
    render(<FunctionGrapher />);
    expect(screen.getByLabelText(/function/i)).toBeInTheDocument();
  });

  it("renders SVG coordinate plane", () => {
    const { container } = render(<FunctionGrapher />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders coefficient sliders", () => {
    render(<FunctionGrapher />);
    expect(screen.getByLabelText(/coefficient a/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coefficient b/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/coefficient c/i)).toBeInTheDocument();
  });

  it("displays equation with current values", () => {
    render(<FunctionGrapher />);
    expect(screen.getByText(/y =/i)).toBeInTheDocument();
  });

  it("switches between quadratic and trigonometric functions", () => {
    render(<FunctionGrapher />);
    const selector = screen.getByLabelText(/function/i);

    expect(screen.getByText(/quadratic/i)).toBeInTheDocument();

    fireEvent.change(selector, { target: { value: "trigonometric" } });
    expect(screen.getByText(/sin/i)).toBeInTheDocument();
  });

  it("displays vertex for quadratic function", () => {
    render(<FunctionGrapher />);
    expect(screen.getByText(/vertex/i)).toBeInTheDocument();
  });

  it("displays amplitude and period for trigonometric function", () => {
    render(<FunctionGrapher />);
    const selector = screen.getByLabelText(/function/i);
    fireEvent.change(selector, { target: { value: "trigonometric" } });

    expect(screen.getByText(/amplitude/i)).toBeInTheDocument();
    expect(screen.getByText(/period/i)).toBeInTheDocument();
  });

  it("renders grid lines in SVG", () => {
    const { container } = render(<FunctionGrapher />);
    const lines = container.querySelectorAll("line");
    expect(lines.length).toBeGreaterThan(0);
  });

  it("renders axes in SVG", () => {
    const { container } = render(<FunctionGrapher />);
    const lines = container.querySelectorAll("line");
    expect(lines.length).toBeGreaterThan(0);
  });
});
