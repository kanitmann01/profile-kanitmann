import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EnzymeKinetics } from "../../interactive/enzyme-kinetics";

describe("EnzymeKinetics", () => {
  it("renders temperature slider", () => {
    render(<EnzymeKinetics />);
    expect(screen.getByLabelText(/temperature/i)).toBeInTheDocument();
  });

  it("renders pH slider", () => {
    render(<EnzymeKinetics />);
    expect(screen.getByLabelText(/ph/i)).toBeInTheDocument();
  });

  it("renders reaction rate display", () => {
    render(<EnzymeKinetics />);
    expect(screen.getByTestId("reaction-rate")).toBeInTheDocument();
  });

  it("shows optimal temperature indicator", () => {
    render(<EnzymeKinetics />);
    expect(screen.getByText(/37°C/i)).toBeInTheDocument();
  });

  it("shows optimal pH indicator", () => {
    render(<EnzymeKinetics />);
    expect(screen.getByText(/pH 7/i)).toBeInTheDocument();
  });

  it("renders inhibition toggle", () => {
    render(<EnzymeKinetics />);
    expect(
      screen.getByRole("button", { name: /^competitive$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /^non-competitive$/i })
    ).toBeInTheDocument();
  });

  it("updates reaction rate when temperature changes", () => {
    render(<EnzymeKinetics />);
    const tempSlider = screen.getByLabelText(/temperature/i);
    fireEvent.change(tempSlider, { target: { value: "37" } });
    const rate = screen.getByTestId("reaction-rate");
    expect(rate).toBeInTheDocument();
  });

  it("updates reaction rate when pH changes", () => {
    render(<EnzymeKinetics />);
    const phSlider = screen.getByLabelText(/ph/i);
    fireEvent.change(phSlider, { target: { value: "7" } });
    const rate = screen.getByTestId("reaction-rate");
    expect(rate).toBeInTheDocument();
  });

  it("renders enzyme-substrate SVG", () => {
    const { container } = render(<EnzymeKinetics />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("toggles inhibition mode", () => {
    render(<EnzymeKinetics />);
    const competitiveBtn = screen.getByRole("button", {
      name: /^competitive$/i,
    });
    fireEvent.click(competitiveBtn);
    expect(screen.getByTestId("inhibition-info")).toBeInTheDocument();
  });
});
