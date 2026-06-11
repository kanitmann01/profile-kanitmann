import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MolecularGeometry } from "../../interactive/molecular-geometry";

describe("MolecularGeometry", () => {
  it("renders the component", () => {
    render(<MolecularGeometry />);
    expect(screen.getByTestId("molecular-geometry")).toBeInTheDocument();
  });

  it("displays shape selector buttons", () => {
    render(<MolecularGeometry />);
    expect(screen.getByRole("button", { name: /linear/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /trigonal planar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /tetrahedral/i })
    ).toBeInTheDocument();
  });

  it("defaults to linear shape", () => {
    render(<MolecularGeometry />);
    expect(screen.getByTestId("shape-name")).toHaveTextContent(/linear/i);
  });

  it("displays bond angle for linear (180°)", () => {
    render(<MolecularGeometry />);
    expect(screen.getByTestId("bond-angle")).toHaveTextContent(/180/);
  });

  it("switches to trigonal planar on click", () => {
    render(<MolecularGeometry />);
    fireEvent.click(screen.getByRole("button", { name: /trigonal planar/i }));
    expect(screen.getByTestId("shape-name")).toHaveTextContent(
      /trigonal planar/i
    );
    expect(screen.getByTestId("bond-angle")).toHaveTextContent(/120/);
  });

  it("switches to tetrahedral on click", () => {
    render(<MolecularGeometry />);
    fireEvent.click(screen.getByRole("button", { name: /tetrahedral/i }));
    expect(screen.getByTestId("shape-name")).toHaveTextContent(/tetrahedral/i);
    expect(screen.getByTestId("bond-angle")).toHaveTextContent(/109\.5/);
  });

  it("renders SVG visualization", () => {
    render(<MolecularGeometry />);
    const svg = screen.getByTestId("molecular-geometry").querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders bent shape option", () => {
    render(<MolecularGeometry />);
    fireEvent.click(screen.getByRole("button", { name: /bent/i }));
    expect(screen.getByTestId("shape-name")).toHaveTextContent(/bent/i);
  });

  it("renders trigonal pyramidal shape option", () => {
    render(<MolecularGeometry />);
    fireEvent.click(
      screen.getByRole("button", { name: /trigonal pyramidal/i })
    );
    expect(screen.getByTestId("shape-name")).toHaveTextContent(
      /trigonal pyramidal/i
    );
  });

  it("displays lone pair toggle", () => {
    render(<MolecularGeometry />);
    expect(screen.getByTestId("lone-pair-toggle")).toBeInTheDocument();
  });
});
