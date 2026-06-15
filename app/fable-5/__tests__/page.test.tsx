import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";

import Fable5MuseumPage from "@/app/fable-5/page";
import {
  fable5Sites,
  fable5Mentions,
  featuredFable5Sites,
} from "@/data/fable5";

beforeAll(() => {
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

describe("Fable 5 Museum page", () => {
  it("renders the page", () => {
    const { container } = render(<Fable5MuseumPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the hero H1 with Fable 5 in the text", () => {
    render(<Fable5MuseumPage />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Fable 5");
  });

  it("renders the total site count from the data", () => {
    render(<Fable5MuseumPage />);
    const total = fable5Sites.length;
    expect(
      screen.getByText(
        new RegExp(`${total}\\s+${total === 1 ? "site" : "sites"}`, "i")
      )
    ).toBeInTheDocument();
  });

  it("renders the featured count from the data", () => {
    render(<Fable5MuseumPage />);
    const featured = featuredFable5Sites.length;
    expect(
      screen.getByText(new RegExp(`${featured}\\s+featured`, "i"))
    ).toBeInTheDocument();
  });

  it("renders the mention count from the data", () => {
    render(<Fable5MuseumPage />);
    const mentions = fable5Mentions.length;
    expect(
      screen.getByText(new RegExp(`${mentions}\\s+mentions`, "i"))
    ).toBeInTheDocument();
  });

  it("renders the submit site button", () => {
    render(<Fable5MuseumPage />);
    expect(
      screen.getByRole("link", { name: /submit a site/i })
    ).toBeInTheDocument();
  });

  it("renders the museum grid with both featured and all-sites sections", () => {
    const { container } = render(<Fable5MuseumPage />);
    const grids = container.querySelectorAll("[data-museum-grid]");
    expect(grids.length).toBe(2);
    expect(grids[0].getAttribute("data-museum-grid")).toBe("featured");
    expect(grids[1].getAttribute("data-museum-grid")).toBe("all");
  });

  it("renders at least one card in the grid", () => {
    const { container } = render(<Fable5MuseumPage />);
    const cards = container.querySelectorAll("[data-museum-card]");
    expect(cards.length).toBeGreaterThan(0);
  });
});
