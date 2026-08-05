import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RelatedArticles } from "../related-articles";
import { articles, type ArticleMeta } from "@/data/articles";

describe("RelatedArticles", () => {
  it("renders the section heading", () => {
    const technicalBlog2 = articles.find((a) => a.slug === "technical-blog-2")!;
    render(
      <RelatedArticles currentArticle={technicalBlog2} allArticles={articles} />
    );
    expect(
      screen.getByRole("heading", { name: /Related Articles/i, level: 2 })
    ).toBeInTheDocument();
  });

  it("renders up to 3 same-topic articles", () => {
    const technicalBlog2 = articles.find((a) => a.slug === "technical-blog-2")!;
    render(
      <RelatedArticles currentArticle={technicalBlog2} allArticles={articles} />
    );
    const articleLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("/articles/"));
    expect(articleLinks.length).toBeLessThanOrEqual(3);
  });

  it("prioritizes hand-curated relatedArticleSlugs", () => {
    const technicalBlog2 = articles.find((a) => a.slug === "technical-blog-2")!;
    render(
      <RelatedArticles currentArticle={technicalBlog2} allArticles={articles} />
    );
    expect(
      screen.getByRole("link", { name: /Windows Registry/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /BIOS Issues/i })
    ).toBeInTheDocument();
  });

  it("does not include the current article in related articles", () => {
    const technicalBlog2 = articles.find((a) => a.slug === "technical-blog-2")!;
    render(
      <RelatedArticles currentArticle={technicalBlog2} allArticles={articles} />
    );
    expect(
      screen.queryByRole("link", { name: /Command Line Interface vs GUI/i })
    ).not.toBeInTheDocument();
  });

  it("links to each article's canonicalPath", () => {
    const technicalBlog3 = articles.find((a) => a.slug === "technical-blog-3")!;
    render(
      <RelatedArticles currentArticle={technicalBlog3} allArticles={articles} />
    );
    expect(
      screen.getByRole("link", { name: /Command Line Interface/i })
    ).toHaveAttribute("href", "/articles/technical-blog-2");
    expect(screen.getByRole("link", { name: /BIOS Issues/i })).toHaveAttribute(
      "href",
      "/articles/bios-issues-ubuntu"
    );
  });

  it("returns null when no related articles exist", () => {
    const loneArticle: ArticleMeta = {
      slug: "solo",
      title: "Solo Article",
      description: "Standalone piece with a unique topic.",
      summary: "Standalone piece.",
      canonicalPath: "/articles/solo",
      publishedAt: "2026-01-01",
      readTime: "1 min read",
      tags: ["Completely Unique Topic"],
    };
    const { container } = render(
      <RelatedArticles
        currentArticle={loneArticle}
        allArticles={[loneArticle]}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});
