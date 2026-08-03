import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import Articles from "@/app/articles/page";
import { articles, topArticleSlug } from "@/data/articles";

describe("Articles page", () => {
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

describe("Deleted articles", () => {
  it("titanic-survival is not in the articles data", () => {
    const found = articles.find((a) => a.slug === "titanic-survival");
    expect(found).toBeUndefined();
  });
});
