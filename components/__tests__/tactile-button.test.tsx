import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { TactileButton } from "../tactile-button";

describe("TactileButton", () => {
  it("renders children correctly", () => {
    render(<TactileButton>Click me</TactileButton>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<TactileButton onClick={handleClick}>Click</TactileButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("applies default variant classes", () => {
    render(<TactileButton>Default</TactileButton>);
    const button = screen.getByRole("button");
    const classes = button.className;
    expect(classes).toContain("bg-primary");
  });

  it("applies destructive variant classes", () => {
    render(<TactileButton variant="destructive">Delete</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-destructive");
  });

  it("applies outline variant classes", () => {
    render(<TactileButton variant="outline">Outline</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("border");
  });

  it("applies secondary variant classes", () => {
    render(<TactileButton variant="secondary">Secondary</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-secondary");
  });

  it("applies ghost variant classes", () => {
    render(<TactileButton variant="ghost">Ghost</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("hover:bg-accent");
  });

  it("applies link variant classes", () => {
    render(<TactileButton variant="link">Link</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("text-primary");
    expect(button.className).toContain("underline-offset-4");
  });

  it("applies sm size classes", () => {
    render(<TactileButton size="sm">Small</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-9");
  });

  it("applies lg size classes", () => {
    render(<TactileButton size="lg">Large</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-11");
  });

  it("applies icon size classes", () => {
    render(<TactileButton size="icon">I</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("h-10");
    expect(button.className).toContain("w-10");
  });

  it("merges custom className", () => {
    render(<TactileButton className="custom-class">Custom</TactileButton>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-class");
  });

  it("is disabled when disabled prop is passed", () => {
    const handleClick = vi.fn();
    render(
      <TactileButton disabled onClick={handleClick}>
        Disabled
      </TactileButton>
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
