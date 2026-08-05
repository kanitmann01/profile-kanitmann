import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RelatedWork } from "../related-work";
import { articles, type ArticleMeta } from "@/data/articles";
import { projects, type Project } from "@/data/projects";

const ccrb = articles.find((a) => a.slug === "ccrb-allegations-analysis")!;
const noLinks: ArticleMeta = {
  slug: "solo",
  title: "Solo Article",
  description: "No linked work.",
  summary: "No linked work.",
  canonicalPath: "/articles/solo",
  publishedAt: "2026-01-01",
  readTime: "1 min read",
  tags: ["Unique"],
};

describe("RelatedWork", () => {
  it("renders the Related work heading and project cross-links", () => {
    render(<RelatedWork article={ccrb} allProjects={projects} />);
    expect(
      screen.getByRole("heading", { name: /Related Work/i, level: 2 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /Zero-Day Phishing Threat Intelligence Platform/i,
      })
    ).toHaveAttribute("href", "/projects/netstar");
    expect(
      screen.getByRole("link", { name: /Unified Bharat/i })
    ).toHaveAttribute("href", "/projects/unified-bharat");
  });

  it("links only to projects that exist in the data", () => {
    const articleWithMissingSlug: ArticleMeta = {
      ...ccrb,
      relatedProjectSlugs: ["netstar", "does-not-exist"],
    };
    render(
      <RelatedWork article={articleWithMissingSlug} allProjects={projects} />
    );
    expect(
      screen.getByRole("link", { name: /Zero-Day Phishing/i })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("returns null when the article has no relatedProjectSlugs", () => {
    const { container } = render(
      <RelatedWork article={noLinks} allProjects={projects} />
    );
    expect(container.firstChild).toBeNull();
  });
});
