import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PeriodicTable } from "../../interactive/periodic-table";

describe("PeriodicTable", () => {
  it("renders element symbols for the first 20 elements", () => {
    render(<PeriodicTable />);
    expect(screen.getByText("H")).toBeInTheDocument();
    expect(screen.getByText("He")).toBeInTheDocument();
    expect(screen.getByText("Li")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("N")).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
    expect(screen.getByText("Ca")).toBeInTheDocument();
  });

  it("renders transition metals", () => {
    render(<PeriodicTable />);
    expect(screen.getByText("Fe")).toBeInTheDocument();
    expect(screen.getByText("Cu")).toBeInTheDocument();
    expect(screen.getByText("Zn")).toBeInTheDocument();
  });

  it("renders heavy metals", () => {
    render(<PeriodicTable />);
    expect(screen.getByText("Ag")).toBeInTheDocument();
    expect(screen.getByText("Au")).toBeInTheDocument();
    expect(screen.getByText("Pb")).toBeInTheDocument();
  });

  it("displays atomic numbers", () => {
    render(<PeriodicTable />);
    const hydrogen = screen.getByText("H").closest("[data-element]");
    expect(hydrogen).toBeInTheDocument();
    expect(hydrogen).toHaveAttribute("data-atomic-number", "1");
  });

  it("shows detail panel on element click", () => {
    render(<PeriodicTable />);
    const hydrogen = screen.getByText("H").closest("[data-element]")!;
    fireEvent.click(hydrogen);
    expect(screen.getByTestId("element-detail")).toBeInTheDocument();
    expect(screen.getByText(/1s/)).toBeInTheDocument();
  });

  it("calls onElementClick callback when element is clicked", () => {
    const handleClick = vi.fn();
    render(<PeriodicTable onElementClick={handleClick} />);
    const hydrogen = screen.getByText("H").closest("[data-element]")!;
    fireEvent.click(hydrogen);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(
      expect.objectContaining({ symbol: "H", number: 1 })
    );
  });

  it("renders a legend with category colors", () => {
    render(<PeriodicTable />);
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });

  it("color-codes elements by category via data attribute", () => {
    render(<PeriodicTable />);
    const hydrogen = screen.getByText("H").closest("[data-element]")!;
    expect(hydrogen).toHaveAttribute("data-category");
  });

  it("renders lanthanides section", () => {
    render(<PeriodicTable />);
    expect(screen.getByText("La")).toBeInTheDocument();
  });

  it("closes detail panel when clicking another element", () => {
    render(<PeriodicTable />);
    const hydrogen = screen.getByText("H").closest("[data-element]")!;
    fireEvent.click(hydrogen);
    expect(screen.getByText("1s¹")).toBeInTheDocument();

    const helium = screen.getByText("He").closest("[data-element]")!;
    fireEvent.click(helium);
    expect(screen.queryByText("1s¹")).not.toBeInTheDocument();
    expect(screen.getByText("1s²")).toBeInTheDocument();
  });
});
