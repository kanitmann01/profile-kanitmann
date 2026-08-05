import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PrevNextNav } from "../prev-next-nav";

const entries = [
  { slug: "a", title: "Alpha", href: "/a", sortValue: "2026-01-01" },
  { slug: "b", title: "Bravo", href: "/b", sortValue: "2026-02-01" },
  { slug: "c", title: "Charlie", href: "/c", sortValue: "2026-03-01" },
];

describe("PrevNextNav", () => {
  it("renders the previous and next entries around the current item", () => {
    render(<PrevNextNav currentSlug="b" entries={entries} />);
    const nav = screen.getByRole("navigation", {
      name: "Previous and next",
    });
    const prev = within(nav).getByRole("link", { name: /Alpha/i });
    expect(prev).toHaveAttribute("href", "/a");
    const next = within(nav).getByRole("link", { name: /Charlie/i });
    expect(next).toHaveAttribute("href", "/c");
  });

  it("cycles within the array (first wraps to last and vice versa)", () => {
    const { unmount } = render(
      <PrevNextNav currentSlug="a" entries={entries} />
    );
    expect(
      within(
        screen.getByRole("navigation", { name: "Previous and next" })
      ).getByRole("link", { name: /Charlie/i })
    ).toHaveAttribute("href", "/c");
    unmount();

    render(<PrevNextNav currentSlug="c" entries={entries} />);
    expect(
      within(
        screen.getByRole("navigation", { name: "Previous and next" })
      ).getByRole("link", { name: /Alpha/i })
    ).toHaveAttribute("href", "/a");
  });

  it("sorts numeric sortValues (projects use order)", () => {
    const numeric = [
      { slug: "x", title: "Oldest", href: "/x", sortValue: 1 },
      { slug: "y", title: "Newest", href: "/y", sortValue: 3 },
      { slug: "z", title: "Middle", href: "/z", sortValue: 2 },
    ];
    render(<PrevNextNav currentSlug="y" entries={numeric} />);
    const nav = screen.getByRole("navigation", { name: "Previous and next" });
    expect(within(nav).getByRole("link", { name: /Middle/i })).toHaveAttribute(
      "href",
      "/z"
    );
    expect(within(nav).getByRole("link", { name: /Oldest/i })).toHaveAttribute(
      "href",
      "/x"
    );
  });

  it("returns null with fewer than 2 entries", () => {
    const { container } = render(
      <PrevNextNav currentSlug="a" entries={[entries[0]]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null when the current slug is unknown", () => {
    const { container } = render(
      <PrevNextNav currentSlug="nope" entries={entries} />
    );
    expect(container.firstChild).toBeNull();
  });
});
