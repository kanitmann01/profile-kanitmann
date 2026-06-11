import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConceptMap } from "../concept-map";

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    getProgress: (slug: string) => {
      const map: Record<string, { confidence: "weak" | "ok" | "strong" }> = {
        "prereq-1": { confidence: "strong" },
        "prereq-2": { confidence: "weak" },
        "cross-1": { confidence: "ok" },
      };
      return map[slug];
    },
  }),
}));

vi.mock("@/lib/imat-crosslinks", () => ({
  resolveCrosslinks: (slugs: string[]) =>
    slugs.map((slug) => ({
      slug,
      title: slug.replace(/-/g, " "),
      subject: "biology" as const,
      topic: "test-topic",
      href: `/imat/biology/test-topic/${slug}`,
    })),
}));

describe("ConceptMap", () => {
  it("renders current note, prerequisites, and crosslinks", () => {
    render(
      <ConceptMap
        currentSlug="current-note"
        currentTitle="Current Note"
        prerequisites={["prereq-1", "prereq-2"]}
        crosslinks={["cross-1"]}
      />
    );

    expect(screen.getByTestId("concept-map")).toBeInTheDocument();
    expect(screen.getByText("Current Note")).toBeInTheDocument();
    expect(screen.getByText("prereq 1")).toBeInTheDocument();
    expect(screen.getByText("prereq 2")).toBeInTheDocument();
    expect(screen.getByText("cross 1")).toBeInTheDocument();
  });

  it("shows confidence badges for each node", () => {
    render(
      <ConceptMap
        currentSlug="current-note"
        currentTitle="Current Note"
        prerequisites={["prereq-1"]}
        crosslinks={["cross-1"]}
      />
    );

    const prereqBadge = screen.getByTestId("confidence-prereq-1");
    expect(prereqBadge).toHaveTextContent("strong");

    const crossBadge = screen.getByTestId("confidence-cross-1");
    expect(crossBadge).toHaveTextContent("ok");
  });

  it("renders nodes as links", () => {
    render(
      <ConceptMap
        currentSlug="current-note"
        currentTitle="Current Note"
        prerequisites={["prereq-1"]}
        crosslinks={["cross-1"]}
      />
    );

    const prereqLink = screen.getByTestId("node-prereq-1");
    expect(prereqLink.tagName).toBe("A");
    expect(prereqLink).toHaveAttribute(
      "href",
      "/imat/biology/test-topic/prereq-1"
    );
  });

  it("renders without prerequisites (just current + crosslinks)", () => {
    render(
      <ConceptMap
        currentSlug="current-note"
        currentTitle="Current Note"
        prerequisites={[]}
        crosslinks={["cross-1"]}
      />
    );

    expect(screen.getByText("Current Note")).toBeInTheDocument();
    expect(screen.getByText("cross 1")).toBeInTheDocument();
  });

  it("renders without crosslinks (just current + prerequisites)", () => {
    render(
      <ConceptMap
        currentSlug="current-note"
        currentTitle="Current Note"
        prerequisites={["prereq-1"]}
        crosslinks={[]}
      />
    );

    expect(screen.getByText("Current Note")).toBeInTheDocument();
    expect(screen.getByText("prereq 1")).toBeInTheDocument();
  });
});
