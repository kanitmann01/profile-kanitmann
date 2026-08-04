import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { ListFilterBar } from "../list-filter-bar";
import type { ListFilterBarProps } from "../list-filter-bar";

const CHIPS = [
  { label: "Python", value: "Python" },
  { label: "Flask", value: "Flask" },
];

const makeProps = (
  overrides: Partial<ListFilterBarProps> = {}
): ListFilterBarProps => ({
  chips: CHIPS,
  selected: [],
  onToggle: vi.fn(),
  searchQuery: "",
  onSearch: vi.fn(),
  onClear: vi.fn(),
  ...overrides,
});

const openPanel = () => {
  fireEvent.click(screen.getByRole("button", { name: /^Filters/ }));
};

describe("ListFilterBar", () => {
  it("renders collapsed by default with an accessible trigger", () => {
    render(<ListFilterBar {...makeProps()} />);
    const trigger = screen.getByRole("button", { name: /^Filters/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls");
    expect(
      screen.queryByRole("button", { name: "Filter by Python" })
    ).not.toBeInTheDocument();
  });

  it("auto-opens when a filter is active", () => {
    render(<ListFilterBar {...makeProps({ selected: ["Python"] })} />);
    expect(screen.getByRole("button", { name: /^Filters/ })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(
      screen.getByRole("button", { name: "Filter by Python" })
    ).toBeInTheDocument();
  });

  it("shows the active filter count badge", () => {
    render(
      <ListFilterBar
        {...makeProps({ selected: ["Python"], searchQuery: "rag" })}
      />
    );
    expect(screen.getByLabelText("2 active filters")).toBeInTheDocument();
    expect(screen.queryByLabelText("1 active filter")).not.toBeInTheDocument();
  });

  it("hides the badge when no filter is active", () => {
    render(<ListFilterBar {...makeProps()} />);
    expect(screen.queryByText(/active filter/)).not.toBeInTheDocument();
  });

  it("expands and collapses on trigger click", () => {
    render(<ListFilterBar {...makeProps()} />);
    openPanel();
    expect(screen.getByRole("button", { name: /^Filters/ })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(
      screen.getByRole("button", { name: "Filter by Python" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Filters/ }));
    expect(screen.getByRole("button", { name: /^Filters/ })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
    expect(
      screen.queryByRole("button", { name: "Filter by Python" })
    ).not.toBeInTheDocument();
  });

  it("renders all chips as buttons with aria-pressed=false", () => {
    render(<ListFilterBar {...makeProps()} />);
    openPanel();
    CHIPS.forEach((chip) => {
      const button = screen.getByRole("button", {
        name: `Filter by ${chip.label}`,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("marks selected chips with aria-pressed=true", () => {
    render(<ListFilterBar {...makeProps({ selected: ["Python"] })} />);
    expect(
      screen.getByRole("button", { name: "Filter by Python" })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("button", { name: "Filter by Flask" })
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("clicking a chip calls onToggle with its value", () => {
    const onToggle = vi.fn();
    render(<ListFilterBar {...makeProps({ onToggle })} />);
    openPanel();
    fireEvent.click(screen.getByRole("button", { name: "Filter by Flask" }));
    expect(onToggle).toHaveBeenCalledWith("Flask");
  });

  it("renders a labelled search input and fires onSearch on change", () => {
    const onSearch = vi.fn();
    render(<ListFilterBar {...makeProps({ onSearch })} />);
    openPanel();
    const input = screen.getByLabelText("Search");
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "rag" } });
    expect(onSearch).toHaveBeenCalledWith("rag");
  });

  it("renders the search placeholder", () => {
    render(
      <ListFilterBar
        {...makeProps({ searchPlaceholder: "Search projects…" })}
      />
    );
    openPanel();
    expect(screen.getByPlaceholderText("Search projects…")).toBeInTheDocument();
  });

  it("hides the clear button when no filter is active", () => {
    render(<ListFilterBar {...makeProps()} />);
    openPanel();
    expect(
      screen.queryByRole("button", { name: "Clear filters" })
    ).not.toBeInTheDocument();
  });

  it("shows the clear button when a chip is selected and clears on click", () => {
    const onClear = vi.fn();
    render(<ListFilterBar {...makeProps({ selected: ["Python"], onClear })} />);
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("shows the clear button when a query is typed", () => {
    render(<ListFilterBar {...makeProps({ searchQuery: "rag" })} />);
    expect(
      screen.getByRole("button", { name: "Clear filters" })
    ).toBeInTheDocument();
  });
});
