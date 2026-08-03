import { describe, it, expect } from "vitest";

import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import {
  filterArticles,
  filterProjects,
  matchesAny,
  matchesQuery,
  uniqueChips,
} from "@/lib/list-filter";

describe("matchesQuery", () => {
  it("matches everything for an empty or whitespace query", () => {
    expect(matchesQuery("", "anything")).toBe(true);
    expect(matchesQuery("   ", "anything")).toBe(true);
  });

  it("matches case-insensitively on any field", () => {
    expect(matchesQuery("RAG", "A rag pipeline", "other")).toBe(true);
    expect(matchesQuery("rag", "unrelated", "A RAG pipeline")).toBe(true);
  });

  it("does not match when no field contains the query", () => {
    expect(matchesQuery("zzz", "unrelated", "also unrelated")).toBe(false);
  });
});

describe("matchesAny", () => {
  it("matches everything when nothing is selected", () => {
    expect(matchesAny([], ["a", "b"])).toBe(true);
  });

  it("unions selections (OR semantics)", () => {
    expect(matchesAny(["a"], ["b", "a"])).toBe(true);
    expect(matchesAny(["a", "c"], ["b"])).toBe(false);
  });
});

describe("filterProjects", () => {
  it("returns everything when no filters are active", () => {
    expect(filterProjects(projects, [], "")).toHaveLength(projects.length);
  });

  it("narrows to projects using a selected stack", () => {
    const filtered = filterProjects(projects, ["Snowflake"], "");
    expect(filtered.map((p) => p.slug)).toEqual(["twitch-analytics-pipeline"]);
  });

  it("unions multiple selected stacks", () => {
    const filtered = filterProjects(projects, ["Flask", "Pandas"], "");
    expect(filtered.map((p) => p.slug).sort()).toEqual([
      "college-major-shift-analysis",
      "titanic",
      "voicebridge",
    ]);
  });

  it("matches search against title (case-insensitive)", () => {
    const filtered = filterProjects(projects, [], "titanic");
    expect(filtered.map((p) => p.slug)).toEqual(["titanic"]);
  });

  it("matches search against description", () => {
    const filtered = filterProjects(projects, [], "medallion");
    expect(filtered.map((p) => p.slug)).toEqual(["unified-bharat"]);
  });

  it("combines stack and search with AND semantics", () => {
    const filtered = filterProjects(projects, ["Python"], "medallion");
    expect(filtered.map((p) => p.slug)).toEqual(["unified-bharat"]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterProjects(projects, ["Snowflake"], "titanic")).toEqual([]);
  });
});

describe("filterArticles", () => {
  it("returns everything when no filters are active", () => {
    expect(filterArticles(articles, [], "")).toHaveLength(articles.length);
  });

  it("narrows to articles with a selected topic", () => {
    const filtered = filterArticles(articles, ["AI"], "");
    expect(filtered.map((a) => a.slug).sort()).toEqual([
      "fable-5",
      "three-line-skill",
    ]);
  });

  it("unions multiple selected topics", () => {
    const filtered = filterArticles(articles, ["AI", "Windows"], "");
    expect(filtered.map((a) => a.slug).sort()).toEqual([
      "fable-5",
      "technical-blog-3",
      "three-line-skill",
    ]);
  });

  it("matches search against title and description", () => {
    expect(filterArticles(articles, [], "registry").map((a) => a.slug)).toEqual(
      ["technical-blog-3"]
    );
    expect(
      filterArticles(articles, [], "three-line skill").map((a) => a.slug)
    ).toEqual(["three-line-skill"]);
  });

  it("combines topic and search with AND semantics", () => {
    const filtered = filterArticles(articles, ["Data Analysis"], "ccrb");
    expect(filtered.map((a) => a.slug)).toEqual(["ccrb-allegations-analysis"]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterArticles(articles, ["AI"], "registry")).toEqual([]);
  });
});

describe("uniqueChips", () => {
  it("dedupes, sorts alphabetically, and labels with the value", () => {
    expect(uniqueChips(["b", "a", "b", "c"])).toEqual([
      { label: "a", value: "a" },
      { label: "b", value: "b" },
      { label: "c", value: "c" },
    ]);
  });
});
