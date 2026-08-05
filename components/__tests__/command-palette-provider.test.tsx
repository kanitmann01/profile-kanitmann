import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/dynamic so the lazy CommandPalette resolves to a plain marker
// component — no cmdk/jsdom dialog machinery needed for provider tests.
vi.mock("next/dynamic", () => {
  const MockPalette = ({ open, onOpenChange, children }: any) => (
    <div data-testid="lazy-palette" data-open={String(open)}>
      {children}
      <button type="button" onClick={() => onOpenChange?.(false)}>
        close
      </button>
    </div>
  );
  return { default: vi.fn(() => MockPalette) };
});

import * as React from "react";
import { CommandPaletteProvider } from "../command-palette-provider";
import { useCommandPalette } from "../command-palette-context";

function Consumer() {
  const { openPalette } = useCommandPalette();
  return (
    <button type="button" onClick={openPalette}>
      open palette
    </button>
  );
}

describe("CommandPaletteProvider (lazy mount)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not mount the palette until first use", () => {
    render(
      <CommandPaletteProvider>
        <p>content</p>
      </CommandPaletteProvider>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.queryByTestId("lazy-palette")).not.toBeInTheDocument();
  });

  it("mounts and opens the palette on ⌘K", () => {
    render(
      <CommandPaletteProvider>
        <p>content</p>
      </CommandPaletteProvider>
    );
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    const palette = screen.getByTestId("lazy-palette");
    expect(palette).toHaveAttribute("data-open", "true");
  });

  it("mounts and opens via the shared context (mobile Commands button path)", () => {
    render(
      <CommandPaletteProvider>
        <Consumer />
      </CommandPaletteProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "open palette" }));
    expect(screen.getByTestId("lazy-palette")).toHaveAttribute(
      "data-open",
      "true"
    );
  });

  it("ignores ⌘K while typing in an input", () => {
    render(
      <CommandPaletteProvider>
        <input aria-label="Search" />
      </CommandPaletteProvider>
    );
    fireEvent.keyDown(screen.getByLabelText("Search"), {
      key: "k",
      metaKey: true,
    });
    expect(screen.queryByTestId("lazy-palette")).not.toBeInTheDocument();
  });

  it("closes the palette through onOpenChange", () => {
    render(
      <CommandPaletteProvider>
        <p>content</p>
      </CommandPaletteProvider>
    );
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    fireEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.getByTestId("lazy-palette")).toHaveAttribute(
      "data-open",
      "false"
    );
  });
});
