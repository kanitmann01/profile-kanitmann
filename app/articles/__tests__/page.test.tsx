import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockReplace, mockUseSearchParams, mockUsePathname, setUrl } =
  vi.hoisted(() => {
    let current = new URLSearchParams("");
    return {
      setUrl: (queryString: string) => {
        current = new URLSearchParams(queryString);
      },
      mockUseSearchParams: vi.fn(() => current),
      mockUsePathname: vi.fn(() => "/articles"),
      // Simulate the router: replace() updates the URL the page reads next.
      mockReplace: vi.fn((url: string) => {
        const queryIndex = url.indexOf("?");
        current = new URLSearchParams(
          queryIndex >= 0 ? url.slice(queryIndex + 1) : ""
        );
      }),
    };
  });

vi.mock("next/navigation", () => ({
  useSearchParams: mockUseSearchParams,
  useRouter: () => ({ replace: mockReplace }),
  usePathname: mockUsePathname,
}));

import Articles from "@/app/articles/page";
import { articles, topArticleSlug } from "@/data/articles";

const openFilters = () => {
  fireEvent.click(screen.getByRole("button", { name: /^Filters/ }));
};

describe("Articles page", () => {
  beforeEach(() => {
    setUrl("");
    mockReplace.mockClear();
  });

  it("renders all article titles", () => {
    render(<Articles />);
    articles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });

  it("renders article metadata (date and read time)", () => {
    render(<Articles />);
    articles.forEach((article) => {
      const matches = screen.getAllByText(article.readTime);
      expect(matches.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("promotes the top article (by topArticleSlug) into the hero block", () => {
    render(<Articles />);
    const expectedTop =
      articles.find((a) => a.slug === topArticleSlug) ||
      articles.find((a) => a.featuredOnHome) ||
      articles[0];
    const topHeading = screen.getByText(expectedTop.title);
    expect(topHeading).toBeInTheDocument();
    expect(topHeading.closest("a")).toHaveAttribute(
      "href",
      expectedTop.canonicalPath
    );
  });

  it("hero block links to the top article's canonicalPath", () => {
    render(<Articles />);
    const expectedTop =
      articles.find((a) => a.slug === topArticleSlug) ||
      articles.find((a) => a.featuredOnHome) ||
      articles[0];
    const topLink = screen.getByText(expectedTop.title).closest("a");
    expect(topLink).toHaveAttribute("href", expectedTop.canonicalPath);
  });

  it("hero block stays pinned to the top article (by topArticleSlug)", () => {
    render(<Articles />);
    const expectedTop =
      articles.find((a) => a.slug === topArticleSlug) ||
      articles.find((a) => a.featuredOnHome) ||
      articles[0];
    expect(screen.getByText(expectedTop.title)).toBeInTheDocument();
  });

  it("renders the Museum badge for museum-kind entries (hero and list)", () => {
    render(<Articles />);
    const badges = screen.getAllByText(/^Museum$/i);
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the article count, not dead sort controls", () => {
    render(<Articles />);
    // The count span reads like "7 articles".
    expect(screen.getByText(/^\d+ articles$/i)).toBeInTheDocument();
    // The non-functional sort Select should be gone.
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });
});

describe("Articles page - filters", () => {
  beforeEach(() => {
    setUrl("");
    mockReplace.mockClear();
  });

  it("pre-populates from ?topic= and filters the list", () => {
    setUrl("topic=AI");
    render(<Articles />);
    expect(screen.getByText("The Fable 5 Digital Museum")).toBeInTheDocument();
    expect(
      screen.getByText("The Three-Line Skill That Changed Everything")
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Technical Blog 3: The Wonderful World of Windows Registry"
      )
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Filter by AI" })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("multi-selected topics union their articles", () => {
    setUrl("topic=AI,Windows");
    render(<Articles />);
    expect(screen.getByText("The Fable 5 Digital Museum")).toBeInTheDocument();
    expect(
      screen.getByText("The Three-Line Skill That Changed Everything")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Technical Blog 3: The Wonderful World of Windows Registry"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("CCRB Allegations Analysis (Ongoing)")
    ).not.toBeInTheDocument();
  });

  it("text search narrows by title and description (case-insensitive)", () => {
    setUrl("q=registry");
    render(<Articles />);
    expect(
      screen.getByText(
        "Technical Blog 3: The Wonderful World of Windows Registry"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("The Three-Line Skill That Changed Everything")
    ).not.toBeInTheDocument();
  });

  it("topics combine with text search", () => {
    setUrl("topic=Data%20Analysis&q=ccrb");
    render(<Articles />);
    expect(
      screen.getByText("CCRB Allegations Analysis (Ongoing)")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("The Three-Line Skill That Changed Everything")
    ).not.toBeInTheDocument();
  });

  it("clicking a chip filters interactively and clear resets", () => {
    render(<Articles />);
    openFilters();
    fireEvent.click(screen.getByRole("button", { name: "Filter by AI" }));
    expect(screen.getByText("The Fable 5 Digital Museum")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Technical Blog 3: The Wonderful World of Windows Registry"
      )
    ).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/articles?topic=AI", {
      scroll: false,
    });

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(
      screen.getByText(
        "Technical Blog 3: The Wonderful World of Windows Registry"
      )
    ).toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/articles", { scroll: false });
  });

  it("typing in the search box narrows the list and syncs the URL", () => {
    render(<Articles />);
    openFilters();
    fireEvent.change(screen.getByLabelText("Search articles"), {
      target: { value: "registry" },
    });
    expect(
      screen.getByText(
        "Technical Blog 3: The Wonderful World of Windows Registry"
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText("The Three-Line Skill That Changed Everything")
    ).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/articles?q=registry", {
      scroll: false,
    });
  });

  it("renders the empty state when nothing matches and clears from it", () => {
    setUrl("q=zzz");
    render(<Articles />);
    expect(
      screen.getByText("No articles match — clear filters")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(
      screen.getByText("The Three-Line Skill That Changed Everything")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("No articles match — clear filters")
    ).not.toBeInTheDocument();
  });
});

describe("Deleted articles", () => {
  it("titanic-survival is not in the articles data", () => {
    const found = articles.find((a) => a.slug === "titanic-survival");
    expect(found).toBeUndefined();
  });
});
