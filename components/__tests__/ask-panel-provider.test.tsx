import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/dynamic so the lazy AskPanel resolves to a plain marker component
// — no framer-motion/jsdom machinery needed for provider tests.
vi.mock("next/dynamic", () => {
  const MockPanel = ({ open, onOpenChange, children }: any) => (
    <div data-testid="lazy-ask-panel" data-open={String(open)}>
      {children}
      <button type="button" onClick={() => onOpenChange?.(false)}>
        close
      </button>
    </div>
  );
  return { default: vi.fn(() => MockPanel) };
});

import * as React from "react";
import { AskPanelProvider } from "../ask-panel-provider";
import { useAskPanel } from "../ask-panel-context";

function Consumer() {
  const { openAsk } = useAskPanel();
  return (
    <button type="button" onClick={openAsk}>
      open ask
    </button>
  );
}

describe("AskPanelProvider (lazy mount)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not mount the panel until first use", () => {
    render(
      <AskPanelProvider>
        <p>content</p>
      </AskPanelProvider>
    );
    expect(screen.getByText("content")).toBeInTheDocument();
    expect(screen.queryByTestId("lazy-ask-panel")).not.toBeInTheDocument();
  });

  it("mounts and opens the panel on ⌘J", () => {
    render(
      <AskPanelProvider>
        <p>content</p>
      </AskPanelProvider>
    );
    fireEvent.keyDown(window, { key: "j", metaKey: true });
    expect(screen.getByTestId("lazy-ask-panel")).toHaveAttribute(
      "data-open",
      "true"
    );
  });

  it("mounts and opens via the shared context (nav ASK button path)", () => {
    render(
      <AskPanelProvider>
        <Consumer />
      </AskPanelProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "open ask" }));
    expect(screen.getByTestId("lazy-ask-panel")).toHaveAttribute(
      "data-open",
      "true"
    );
  });

  it("ignores ⌘J while typing in an input", () => {
    render(
      <AskPanelProvider>
        <input aria-label="Search" />
      </AskPanelProvider>
    );
    fireEvent.keyDown(screen.getByLabelText("Search"), {
      key: "j",
      metaKey: true,
    });
    expect(screen.queryByTestId("lazy-ask-panel")).not.toBeInTheDocument();
  });

  it("closes the panel through onOpenChange", () => {
    render(
      <AskPanelProvider>
        <p>content</p>
      </AskPanelProvider>
    );
    fireEvent.keyDown(window, { key: "j", metaKey: true });
    fireEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.getByTestId("lazy-ask-panel")).toHaveAttribute(
      "data-open",
      "false"
    );
  });
});
