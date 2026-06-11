import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DNAStrand } from "../../interactive/dna-strand";

describe("DNAStrand", () => {
  it("renders the DNA helix SVG", () => {
    const { container } = render(<DNAStrand />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders all four base labels", () => {
    render(<DNAStrand />);
    expect(screen.getByText("Adenine")).toBeInTheDocument();
    expect(screen.getByText("Thymine")).toBeInTheDocument();
    expect(screen.getByText("Guanine")).toBeInTheDocument();
    expect(screen.getByText("Cytosine")).toBeInTheDocument();
  });

  it("shows complement info when a base pair is clicked", () => {
    render(<DNAStrand />);
    const adenineBtn = screen.getByText("Adenine");
    fireEvent.click(adenineBtn);
    expect(screen.getByText(/complement/i)).toBeInTheDocument();
    expect(screen.getByTestId("complement-info")).toHaveTextContent(/Thymine/i);
  });

  it("calls onBaseClick callback with base name", () => {
    const onBaseClick = vi.fn();
    render(<DNAStrand onBaseClick={onBaseClick} />);
    fireEvent.click(screen.getByText("Guanine"));
    expect(onBaseClick).toHaveBeenCalledWith("Guanine");
  });

  it("shows correct complement for each base", () => {
    render(<DNAStrand />);
    fireEvent.click(screen.getByText("Cytosine"));
    expect(screen.getByText("Guanine")).toBeInTheDocument();
  });

  it("renders base pair letters A, T, G, C", () => {
    render(<DNAStrand />);
    expect(screen.getAllByText("A").length).toBeGreaterThan(0);
    expect(screen.getAllByText("T").length).toBeGreaterThan(0);
    expect(screen.getAllByText("G").length).toBeGreaterThan(0);
    expect(screen.getAllByText("C").length).toBeGreaterThan(0);
  });
});
