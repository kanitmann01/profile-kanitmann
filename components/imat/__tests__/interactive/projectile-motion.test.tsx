import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProjectileMotion } from "../../interactive/projectile-motion";

describe("ProjectileMotion", () => {
  it("renders angle and velocity sliders", () => {
    render(<ProjectileMotion />);
    expect(screen.getByLabelText(/angle/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/velocity/i)).toBeInTheDocument();
  });

  it("renders launch button", () => {
    render(<ProjectileMotion />);
    expect(screen.getByRole("button", { name: /launch/i })).toBeInTheDocument();
  });

  it("renders SVG canvas for trajectory", () => {
    const { container } = render(<ProjectileMotion />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("displays range, max height, and time of flight calculations", () => {
    render(<ProjectileMotion />);
    expect(screen.getByText(/range/i)).toBeInTheDocument();
    expect(screen.getByText(/max height/i)).toBeInTheDocument();
    expect(screen.getByText(/time of flight/i)).toBeInTheDocument();
  });

  it("calculates correct default values for 45 degrees at 50 m/s", () => {
    render(<ProjectileMotion />);
    const g = 9.8;
    const v = 50;
    const theta = (45 * Math.PI) / 180;
    const expectedRange = (v * v * Math.sin(2 * theta)) / g;
    const expectedHeight = (v * v * Math.sin(theta) ** 2) / (2 * g);
    const expectedTime = (2 * v * Math.sin(theta)) / g;

    expect(
      screen.getByText(new RegExp(expectedRange.toFixed(1)))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(expectedHeight.toFixed(1)))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(expectedTime.toFixed(2)))
    ).toBeInTheDocument();
  });

  it("displays formulas section", () => {
    render(<ProjectileMotion />);
    expect(screen.getByText(/R = v²sin\(2θ\)\/g/i)).toBeInTheDocument();
    expect(screen.getByText(/H = v²sin²\(θ\)\/\(2g\)/i)).toBeInTheDocument();
    expect(screen.getByText(/T = 2v·sin\(θ\)\/g/i)).toBeInTheDocument();
  });
});
