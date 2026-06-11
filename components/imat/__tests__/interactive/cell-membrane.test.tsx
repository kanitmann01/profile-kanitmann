import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CellMembrane } from "../../interactive/cell-membrane";

describe("CellMembrane", () => {
  it("renders the membrane SVG", () => {
    const { container } = render(<CellMembrane />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders all four draggable molecules", () => {
    render(<CellMembrane />);
    expect(screen.getByText("O2")).toBeInTheDocument();
    expect(screen.getByText("Glucose")).toBeInTheDocument();
    expect(screen.getByText("Na+")).toBeInTheDocument();
    expect(screen.getByText("H2O")).toBeInTheDocument();
  });

  it("shows transport result when a molecule is clicked", () => {
    render(<CellMembrane />);
    fireEvent.click(screen.getByText("O2"));
    expect(screen.getByText(/simple diffusion/i)).toBeInTheDocument();
  });

  it("shows correct result for water (osmosis)", () => {
    render(<CellMembrane />);
    fireEvent.click(screen.getByText("H2O"));
    expect(screen.getByText(/osmosis/i)).toBeInTheDocument();
  });

  it("shows correct result for sodium (active transport)", () => {
    render(<CellMembrane />);
    fireEvent.click(screen.getByText("Na+"));
    expect(screen.getByText(/active transport/i)).toBeInTheDocument();
  });

  it("shows correct result for glucose (facilitated diffusion)", () => {
    render(<CellMembrane />);
    fireEvent.click(screen.getByText("Glucose"));
    expect(screen.getByText(/facilitated diffusion/i)).toBeInTheDocument();
  });

  it("applies green color class for O2 (passes freely)", () => {
    render(<CellMembrane />);
    fireEvent.click(screen.getByText("O2"));
    const result = screen.getByTestId("transport-result");
    expect(result.className).toMatch(/green/);
  });

  it("applies red color class for Na+ (blocked)", () => {
    render(<CellMembrane />);
    fireEvent.click(screen.getByText("Na+"));
    const result = screen.getByTestId("transport-result");
    expect(result.className).toMatch(/red/);
  });
});
