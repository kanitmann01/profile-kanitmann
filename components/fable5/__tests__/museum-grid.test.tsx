import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { MuseumGrid } from "../museum-grid";
import type { Fable5Site } from "@/data/fable5";

const sites: Fable5Site[] = [
  {
    id: "featured-1",
    name: "Featured Site Alpha",
    demoUrl: "https://example.com/alpha",
    screenshotUrl: "https://example.com/alpha.png",
    oneLiner: "First featured site.",
    author: "@alpha",
    sourceUrl: "https://x.com/alpha",
    tags: ["3d", "game"],
    featured: true,
    addedAt: "2026-06-09",
    playable: true,
  },
  {
    id: "featured-2",
    name: "Featured Site Beta",
    demoUrl: "https://example.com/beta",
    screenshotUrl: "https://example.com/beta.png",
    oneLiner: "Second featured site.",
    author: "@beta",
    sourceUrl: "https://x.com/beta",
    tags: ["shader"],
    featured: true,
    addedAt: "2026-06-09",
    playable: false,
  },
  {
    id: "regular-1",
    name: "Regular Site Gamma",
    demoUrl: "https://example.com/gamma",
    screenshotUrl: "https://example.com/gamma.png",
    oneLiner: "A non-featured site.",
    author: "@gamma",
    sourceUrl: "https://x.com/gamma",
    tags: ["tooling"],
    featured: false,
    addedAt: "2026-06-09",
    playable: false,
  },
  {
    id: "regular-2",
    name: "Regular Site Delta",
    demoUrl: "https://example.com/delta",
    screenshotUrl: "https://example.com/delta.png",
    oneLiner: "Another non-featured site.",
    author: "@delta",
    sourceUrl: "https://x.com/delta",
    tags: ["art"],
    featured: false,
    addedAt: "2026-06-09",
    playable: true,
  },
];

describe("MuseumGrid", () => {
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

  it("renders the FEATURED heading when there are featured sites", () => {
    render(<MuseumGrid sites={sites} />);
    expect(
      screen.getByRole("heading", { name: /FEATURED/i })
    ).toBeInTheDocument();
  });

  it("renders the ALL SITES heading with the total count", () => {
    render(<MuseumGrid sites={sites} />);
    expect(
      screen.getByRole("heading", {
        name: new RegExp(`ALL SITES \\(${sites.length}\\)`, "i"),
      })
    ).toBeInTheDocument();
  });

  it("renders every site name in the document", () => {
    render(<MuseumGrid sites={sites} />);
    sites.forEach((site) => {
      expect(screen.getAllByText(site.name).length).toBeGreaterThan(0);
    });
  });

  it("does not render the FEATURED section when no sites are featured", () => {
    const noFeatured = sites.map((s) => ({ ...s, featured: false }));
    render(<MuseumGrid sites={noFeatured} />);
    expect(
      screen.queryByRole("heading", { name: /FEATURED/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: new RegExp(`ALL SITES \\(${noFeatured.length}\\)`, "i"),
      })
    ).toBeInTheDocument();
  });

  it("renders both a featured and an all-sites grid with data-museum-grid attribute", () => {
    const { container } = render(<MuseumGrid sites={sites} />);
    const grids = container.querySelectorAll("[data-museum-grid]");
    expect(grids.length).toBe(2);
    expect(grids[0].getAttribute("data-museum-grid")).toBe("featured");
    expect(grids[1].getAttribute("data-museum-grid")).toBe("all");
  });

  it("renders at least one card element per site in the DOM", () => {
    const { container } = render(<MuseumGrid sites={sites} />);
    const cards = container.querySelectorAll("[data-museum-card]");
    expect(cards.length).toBeGreaterThanOrEqual(sites.length);
  });
});
