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

  it("stays closed on ⌘J while the feature ships dark", () => {
    render(
      <AskPanelProvider>
        <p>content</p>
      </AskPanelProvider>
    );
    // ASK DARK (go-live): listener disabled — docs/agent-setup.md §7.
    fireEvent.keyDown(window, { key: "j", metaKey: true });
    expect(screen.queryByTestId("lazy-ask-panel")).not.toBeInTheDocument();
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

  it("closes the panel through onOpenChange", () => {
    render(
      <AskPanelProvider>
        <Consumer />
      </AskPanelProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: "open ask" }));
    fireEvent.click(screen.getByRole("button", { name: "close" }));
    expect(screen.getByTestId("lazy-ask-panel")).toHaveAttribute(
      "data-open",
      "false"
    );
  });
});
