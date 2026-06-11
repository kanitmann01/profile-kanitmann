import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CircuitSimulator } from "../../interactive/circuit-simulator";

describe("CircuitSimulator", () => {
  it("renders series/parallel toggle", () => {
    render(<CircuitSimulator />);
    expect(screen.getByRole("button", { name: /series/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /parallel/i })
    ).toBeInTheDocument();
  });

  it("renders SVG circuit visualization", () => {
    const { container } = render(<CircuitSimulator />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders add resistor button", () => {
    render(<CircuitSimulator />);
    expect(
      screen.getByRole("button", { name: /add resistor/i })
    ).toBeInTheDocument();
  });

  it("renders remove resistor button", () => {
    render(<CircuitSimulator />);
    expect(
      screen.getByRole("button", { name: /remove resistor/i })
    ).toBeInTheDocument();
  });

  it("displays equivalent resistance", () => {
    render(<CircuitSimulator />);
    expect(screen.getByText(/equivalent resistance/i)).toBeInTheDocument();
  });

  it("displays total current", () => {
    render(<CircuitSimulator />);
    expect(screen.getByText(/total current/i)).toBeInTheDocument();
  });

  it("calculates correct default series resistance for two 100 ohm resistors", () => {
    render(<CircuitSimulator />);
    expect(screen.getByText(/200\.0/)).toBeInTheDocument();
  });

  it("calculates correct parallel resistance when toggled", () => {
    render(<CircuitSimulator />);
    const parallelBtn = screen.getByRole("button", { name: /parallel/i });
    fireEvent.click(parallelBtn);
    expect(screen.getByText(/50\.0/)).toBeInTheDocument();
  });

  it("calculates correct default current for 12V and 200 ohm", () => {
    render(<CircuitSimulator />);
    const expectedCurrent = 12 / 200;
    expect(
      screen.getByText(new RegExp(expectedCurrent.toFixed(3)))
    ).toBeInTheDocument();
  });

  it("displays voltage source", () => {
    render(<CircuitSimulator />);
    expect(screen.getByText(/12/i)).toBeInTheDocument();
  });
});
