import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NoteChrome } from "../note-chrome";
import type { AtomicNote } from "@/data/imat/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/hooks/use-imat-shortcuts", () => ({
  useIMATShortcuts: () => {},
}));

vi.mock("@/hooks/use-swipe-navigation", () => ({
  useSwipeNavigation: () => {},
}));

vi.mock("@/hooks/use-bookmarks", () => ({
  useBookmarks: () => ({
    bookmarks: [],
    removeBookmark: vi.fn(),
  }),
}));

vi.mock("@/data/imat/registry", () => ({
  getNotesByTopic: () => [],
  getNoteBySlug: (slug: string) => {
    if (slug === "carbohydrates") {
      return {
        slug: "carbohydrates",
        title: "Carbohydrates",
        subject: "biology",
        topic: "biochemistry",
        summary: "Test summary",
        memoryHook: "Test memory hook",
        imatTrap: "Test imat trap",
        whyItMatters: "Test why it matters",
        explanation: <p>Test explanation</p>,
        questions: [],
        crosslinks: [],
        prerequisites: [],
        highYieldPoints: [],
        equations: [],
        workedExamples: [],
        externalResources: [],
        imatPatterns: [],
      };
    }
    throw new Error(`Note not found: ${slug}`);
  },
}));

beforeEach(() => {
  global.IntersectionObserver = class IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
});

describe("NoteChrome", () => {
  const baseNote: AtomicNote = {
    slug: "carbohydrates",
    subject: "biology",
    topic: "biochemistry",
    title: "Carbohydrates",
    summary: "Test summary",
    memoryHook: "Test memory hook",
    imatTrap: "Test imat trap",
    whyItMatters: "Test why it matters",
    explanation: <p>Test explanation</p>,
    questions: [],
    crosslinks: [],
    prerequisites: [],
  };

  it("renders without crashing", () => {
    render(
      <NoteChrome
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
        noteSlug="carbohydrates"
      >
        <div data-testid="children">Test content</div>
      </NoteChrome>
    );
  });

  it("renders children inside the chrome", () => {
    render(
      <NoteChrome
        note={baseNote}
        subjectSlug="biology"
        topicSlug="biochemistry"
        noteSlug="carbohydrates"
      >
        <div data-testid="children">Test content</div>
      </NoteChrome>
    );
    expect(screen.getByTestId("children")).toHaveTextContent("Test content");
  });

  it("renders the note title in left sidebar breadcrumb", () => {
    render(
      <NoteChrome
        note={{ ...baseNote, title: "Carbohydrates" }}
        subjectSlug="biology"
        topicSlug="biochemistry"
        noteSlug="carbohydrates"
      >
        <div>content</div>
      </NoteChrome>
    );
    expect(screen.getByText("Carbohydrates")).toBeInTheDocument();
  });
});
