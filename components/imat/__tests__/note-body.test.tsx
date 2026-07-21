import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NoteBody } from "../note-body";
import type { AtomicNote } from "@/data/imat/types";

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    getProgress: () => ({ confidence: "weak" as const }),
    recordReview: vi.fn(),
  }),
}));

vi.mock("@/hooks/use-bookmarks", () => ({
  useBookmarks: () => ({
    bookmarks: [],
    isBookmarked: () => false,
    addBookmark: vi.fn(),
    removeBookmark: vi.fn(),
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

vi.mock("@/lib/reading-time", () => ({
  calculateReadingTime: () => 5,
}));

vi.mock("@/data/imat/registry", () => ({
  getNotesByTopic: () => [],
  getNoteBySlug: () => null,
}));

vi.mock("@/components/imat/review-session", () => ({
  ReviewSession: ({ slug }: { slug: string }) => (
    <div data-testid="review-session">Review: {slug}</div>
  ),
}));

vi.mock("@/components/imat/review-buttons", () => ({
  ReviewButtons: ({ slug }: { slug: string }) => (
    <div data-testid="review-buttons">Confidence: {slug}</div>
  ),
}));

vi.mock("@/components/imat/inline-review", () => ({
  InlineReview: ({ noteSlug }: { noteSlug: string }) => (
    <div data-testid="inline-review">Inline: {noteSlug}</div>
  ),
}));

vi.mock("@/components/imat/concept-map", () => ({
  ConceptMap: () => <div data-testid="concept-map" />,
}));

vi.mock("@/components/imat/confidence-calibration", () => ({
  ConfidenceCalibration: ({ noteSlug }: { noteSlug: string }) => (
    <div data-testid="confidence-calibration">{noteSlug}</div>
  ),
}));

vi.mock("@/components/imat/section-bookmark", () => ({
  SectionBookmark: () => <div data-testid="section-bookmark" />,
}));

vi.mock("@/components/imat/equation-block", () => ({
  EquationBlock: () => <div data-testid="equation-block" />,
}));

vi.mock("@/components/imat/worked-example-card", () => ({
  WorkedExampleCard: () => <div data-testid="worked-example-card" />,
}));

vi.mock("@/components/imat/note-navigation", () => ({
  NoteNavigation: () => <div data-testid="note-navigation" />,
}));

describe("NoteBody", () => {
  const baseNote: AtomicNote = {
    slug: "carbohydrates",
    subject: "biology",
    topic: "biochemistry",
    title: "Carbohydrates",
    summary: "A test summary about carbohydrates",
    memoryHook: "Remember: carbs are energy!",
    imatTrap: "Don't confuse isomers",
    whyItMatters: "Essential for metabolism",
    explanation: <p>Carbohydrates are biomolecules...</p>,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "Test question?",
        answer: "Answer",
        difficulty: "recall",
      },
    ],
    crosslinks: ["proteins", "lipids"],
    prerequisites: ["basic-chemistry"],
    highYieldPoints: ["Key point 1"],
    equations: [{ id: "eq1", latex: "C_6H_{12}O_6" }],
    workedExamples: [
      {
        id: "we1",
        question: "Test?",
        hints: ["Hint 1"],
        solution: "Solution",
      },
    ],
    externalResources: [
      {
        title: "Khan Academy",
        url: "https://example.com",
        type: "video",
      },
    ],
    imatPatterns: [{ years: [2020], frequency: "high" }],
  };

  it("renders without crashing", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
  });

  it("renders the note title", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    // Title appears in both breadcrumb and h1
    const headings = screen.getAllByText("Carbohydrates");
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the memory hook", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(screen.getByText("Remember: carbs are energy!")).toBeInTheDocument();
  });

  it("renders the explanation article", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(
      screen.getByText("Carbohydrates are biomolecules...")
    ).toBeInTheDocument();
  });

  it("renders the breadcrumb back link", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(screen.getByText("Back to Biochemistry")).toBeInTheDocument();
  });

  it("renders equations section when note has equations", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(screen.getByText("Equations")).toBeInTheDocument();
  });

  it("renders worked examples section when note has worked examples", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(screen.getByText("Worked Examples")).toBeInTheDocument();
  });

  it("renders IMAT Trap callout", () => {
    render(
      <NoteBody
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(screen.getByText("Don't confuse isomers")).toBeInTheDocument();
  });

  it("renders without prerequisites or crosslinks (no concept map)", () => {
    const noteWithoutExtras: AtomicNote = {
      ...baseNote,
      prerequisites: [],
      crosslinks: [],
    };
    render(
      <NoteBody
        note={noteWithoutExtras}
        subjectSlug="biology"
        topicSlug="biochemistry"
      />
    );
    expect(screen.queryByTestId("concept-map")).not.toBeInTheDocument();
  });
});
