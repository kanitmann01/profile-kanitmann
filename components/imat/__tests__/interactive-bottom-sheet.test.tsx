import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InteractiveBottomSheet } from "../interactive-bottom-sheet";

describe("InteractiveBottomSheet", () => {
  it("renders children", () => {
    render(
      <InteractiveBottomSheet title="Test Interactive">
        <div data-testid="child-content">Interactive content</div>
      </InteractiveBottomSheet>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });

  it("shows expand button on mobile", () => {
    render(
      <InteractiveBottomSheet title="Test Interactive">
        <div>Content</div>
      </InteractiveBottomSheet>
    );

    expect(screen.getByTestId("expand-button")).toBeInTheDocument();
  });

  it("opens bottom sheet when expand button clicked", () => {
    render(
      <InteractiveBottomSheet title="Test Interactive">
        <div data-testid="child-content">Content</div>
      </InteractiveBottomSheet>
    );

    fireEvent.click(screen.getByTestId("expand-button"));

    expect(screen.getByTestId("bottom-sheet")).toBeInTheDocument();
    expect(screen.getByText("Test Interactive")).toBeInTheDocument();
  });

  it("renders children inside bottom sheet when open", () => {
    render(
      <InteractiveBottomSheet title="Test Interactive">
        <div data-testid="child-content">Content</div>
      </InteractiveBottomSheet>
    );

    fireEvent.click(screen.getByTestId("expand-button"));

    const children = screen.getAllByTestId("child-content");
    expect(children.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByTestId("bottom-sheet")).toContainElement(
      children[children.length - 1]
    );
  });

  it("closes bottom sheet when close button clicked", () => {
    render(
      <InteractiveBottomSheet title="Test Interactive">
        <div>Content</div>
      </InteractiveBottomSheet>
    );

    fireEvent.click(screen.getByTestId("expand-button"));
    expect(screen.getByTestId("bottom-sheet")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-button"));
    expect(screen.queryByTestId("bottom-sheet")).not.toBeInTheDocument();
  });

  it("closes bottom sheet when backdrop clicked", () => {
    render(
      <InteractiveBottomSheet title="Test Interactive">
        <div>Content</div>
      </InteractiveBottomSheet>
    );

    fireEvent.click(screen.getByTestId("expand-button"));
    expect(screen.getByTestId("bottom-sheet")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("backdrop"));
    expect(screen.queryByTestId("bottom-sheet")).not.toBeInTheDocument();
  });
});
