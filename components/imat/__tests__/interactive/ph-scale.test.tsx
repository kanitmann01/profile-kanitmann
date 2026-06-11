import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PHScale } from "../../interactive/ph-scale";

describe("PHScale", () => {
  it("renders the pH slider", () => {
    render(<PHScale />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renders with default pH of 7", () => {
    render(<PHScale />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "7");
  });

  it("displays H+ concentration", () => {
    render(<PHScale />);
    expect(screen.getByTestId("h-concentration")).toBeInTheDocument();
  });

  it("displays OH- concentration", () => {
    render(<PHScale />);
    expect(screen.getByTestId("oh-concentration")).toBeInTheDocument();
  });

  it("calculates correct H+ at pH 7", () => {
    render(<PHScale />);
    const hConc = screen.getByTestId("h-concentration");
    expect(hConc.textContent).toMatch(/1\.0/);
    expect(hConc.textContent).toMatch(/10/);
  });

  it("updates slider value on change", () => {
    render(<PHScale />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "3" } });
    expect(slider).toHaveAttribute("aria-valuenow", "3");
  });

  it("shows common substance markers", () => {
    render(<PHScale />);
    expect(screen.getByText(/stomach/i)).toBeInTheDocument();
    expect(screen.getByText(/lemon/i)).toBeInTheDocument();
    expect(screen.getByText(/blood/i)).toBeInTheDocument();
    expect(screen.getByText(/bleach/i)).toBeInTheDocument();
  });

  it("renders a solution circle", () => {
    render(<PHScale />);
    expect(screen.getByTestId("solution-circle")).toBeInTheDocument();
  });

  it("slider has min 0 and max 14", () => {
    render(<PHScale />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "14");
  });

  it("shows acidic label at low pH", () => {
    render(<PHScale />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "2" } });
    expect(screen.getByTestId("ph-label")).toHaveTextContent(/acidic/i);
  });

  it("shows basic label at high pH", () => {
    render(<PHScale />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "12" } });
    expect(screen.getByTestId("ph-label")).toHaveTextContent(/basic/i);
  });

  it("shows neutral label at pH 7", () => {
    render(<PHScale />);
    expect(screen.getByTestId("ph-label")).toHaveTextContent(/neutral/i);
  });
});
