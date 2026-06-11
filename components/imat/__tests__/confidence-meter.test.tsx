import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ConfidenceMeter } from "../confidence-meter";

describe("ConfidenceMeter", () => {
  it("renders weak label with red styling", () => {
    render(<ConfidenceMeter confidence="weak" />);
    const label = screen.getByText(/weak/i);
    expect(label).toBeInTheDocument();
  });

  it("renders ok label with yellow styling", () => {
    render(<ConfidenceMeter confidence="ok" />);
    const label = screen.getByText(/ok/i);
    expect(label).toBeInTheDocument();
  });

  it("renders strong label with green styling", () => {
    render(<ConfidenceMeter confidence="strong" />);
    const label = screen.getByText(/strong/i);
    expect(label).toBeInTheDocument();
  });

  it("renders not started state when confidence is undefined", () => {
    render(<ConfidenceMeter confidence={undefined} />);
    const label = screen.getByText(/not started/i);
    expect(label).toBeInTheDocument();
  });

  it("applies correct data attribute for color identification", () => {
    const { container } = render(<ConfidenceMeter confidence="weak" />);
    const meter = container.querySelector("[data-confidence]");
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveAttribute("data-confidence", "weak");
  });

  it("applies correct data attribute for ok", () => {
    const { container } = render(<ConfidenceMeter confidence="ok" />);
    const meter = container.querySelector("[data-confidence]");
    expect(meter).toHaveAttribute("data-confidence", "ok");
  });

  it("applies correct data attribute for strong", () => {
    const { container } = render(<ConfidenceMeter confidence="strong" />);
    const meter = container.querySelector("[data-confidence]");
    expect(meter).toHaveAttribute("data-confidence", "strong");
  });

  it("applies correct data attribute for undefined", () => {
    const { container } = render(<ConfidenceMeter confidence={undefined} />);
    const meter = container.querySelector("[data-confidence]");
    expect(meter).toHaveAttribute("data-confidence", "none");
  });
});
