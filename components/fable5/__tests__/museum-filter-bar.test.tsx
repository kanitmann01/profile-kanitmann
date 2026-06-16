import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { MuseumFilterBar } from "../museum-filter-bar";
import { FABLE5_TAGS, type Fable5Tag } from "@/data/fable5";
import type { MuseumFilterBarProps } from "../museum-filter-bar";

const makeProps = (
  overrides: Partial<MuseumFilterBarProps> = {}
): MuseumFilterBarProps => ({
  totalCount: 15,
  filteredCount: 15,
  selectedTags: [],
  onToggleTag: vi.fn(),
  onClear: vi.fn(),
  onShuffle: vi.fn(),
  ...overrides,
});

describe("MuseumFilterBar", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders all FABLE5_TAGS as pills", () => {
    render(<MuseumFilterBar {...makeProps()} />);
    FABLE5_TAGS.forEach((tag) => {
      expect(
        screen.getByRole("button", { name: `Filter by ${tag}` })
      ).toBeInTheDocument();
    });
  });

  it("each pill has aria-pressed=false initially", () => {
    render(<MuseumFilterBar {...makeProps({ selectedTags: [] })} />);
    FABLE5_TAGS.forEach((tag) => {
      const pill = screen.getByRole("button", { name: `Filter by ${tag}` });
      expect(pill).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("clicking a pill calls onToggleTag with that tag", () => {
    const onToggleTag = vi.fn();
    render(<MuseumFilterBar {...makeProps({ onToggleTag })} />);
    fireEvent.click(screen.getByRole("button", { name: "Filter by 3d" }));
    expect(onToggleTag).toHaveBeenCalledWith("3d");
  });

  it("selected pills have aria-pressed=true, others false", () => {
    render(
      <MuseumFilterBar
        {...makeProps({ selectedTags: ["3d", "game"] as Fable5Tag[] })}
      />
    );
    expect(
      screen.getByRole("button", { name: "Filter by 3d" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Filter by game" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Filter by shader" })
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("clicking Clear calls onClear", () => {
    const onClear = vi.fn();
    render(
      <MuseumFilterBar
        {...makeProps({
          selectedTags: ["3d"] as Fable5Tag[],
          onClear,
        })}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("clicking Shuffle calls onShuffle", () => {
    const onShuffle = vi.fn();
    render(<MuseumFilterBar {...makeProps({ onShuffle })} />);
    fireEvent.click(screen.getByRole("button", { name: "Shuffle" }));
    expect(onShuffle).toHaveBeenCalledTimes(1);
  });
});
