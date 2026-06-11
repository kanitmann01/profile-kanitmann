import { describe, it, expect, beforeEach } from "vitest";
import {
  subjects,
  topics,
  notes,
  getNoteBySlug,
  getNotesBySubject,
  getNotesByTopic,
  getSubjectBySlug,
  getTopicBySlug,
} from "../registry";
import type { AtomicNote, Subject } from "../types";

function makeNote(
  overrides: Partial<AtomicNote> & { slug: string }
): AtomicNote {
  return {
    subject: "biology",
    topic: "cell-biology",
    title: "Test Note",
    summary: "summary",
    memoryHook: "hook",
    imatTrap: "trap",
    whyItMatters: "why",
    explanation: "explanation",
    questions: [],
    crosslinks: [],
    ...overrides,
  };
}

describe("subjects", () => {
  it("has all 6 IMAT subjects", () => {
    expect(subjects).toHaveLength(6);
    const slugs = subjects.map((s) => s.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "biology",
        "chemistry",
        "physics",
        "mathematics",
        "logical-reasoning",
        "general-knowledge",
      ])
    );
  });

  it("has correct exam weights for each subject", () => {
    const bio = subjects.find((s) => s.slug === "biology");
    expect(bio?.questionCount).toBe(23);
    expect(bio?.examWeight).toBe("38%");

    const chem = subjects.find((s) => s.slug === "chemistry");
    expect(chem?.questionCount).toBe(15);
    expect(chem?.examWeight).toBe("25%");

    const phys = subjects.find((s) => s.slug === "physics");
    expect(phys?.questionCount).toBe(6);
    expect(phys?.examWeight).toBe("~10%");

    const math = subjects.find((s) => s.slug === "mathematics");
    expect(math?.questionCount).toBe(6);
    expect(math?.examWeight).toBe("~10%");

    const lr = subjects.find((s) => s.slug === "logical-reasoning");
    expect(lr?.questionCount).toBe(5);
    expect(lr?.examWeight).toBe("8%");

    const gk = subjects.find((s) => s.slug === "general-knowledge");
    expect(gk?.questionCount).toBe(5);
    expect(gk?.examWeight).toBe("7%");
  });
});

describe("getSubjectBySlug", () => {
  it("returns the correct subject", () => {
    const bio = getSubjectBySlug("biology");
    expect(bio.slug).toBe("biology");
    expect(bio.title).toBeTruthy();
  });

  it("throws for invalid subject", () => {
    expect(() => getSubjectBySlug("nonexistent" as Subject)).toThrow();
  });
});

describe("notes registry", () => {
  it("has registered notes", () => {
    expect(notes.length).toBeGreaterThan(0);
  });

  it("getNotesBySubject returns notes for biology", () => {
    expect(getNotesBySubject("biology").length).toBeGreaterThan(0);
  });

  it("getNotesByTopic returns notes for existing topic", () => {
    expect(getNotesByTopic("biology", "cell-biology").length).toBeGreaterThan(
      0
    );
  });

  it("getNoteBySlug throws when note not found", () => {
    expect(() => getNoteBySlug("nonexistent")).toThrow();
  });
});

describe("topics", () => {
  it("is an array", () => {
    expect(Array.isArray(topics)).toBe(true);
  });
});

describe("getTopicBySlug", () => {
  it("throws when topic not found", () => {
    expect(() => getTopicBySlug("biology", "nonexistent")).toThrow();
  });
});

describe("notes filtering", () => {
  beforeEach(() => {
    notes.length = 0;
  });

  it("getNoteBySlug returns the correct note", () => {
    notes.push(makeNote({ slug: "mitosis" }));
    notes.push(
      makeNote({ slug: "meiosis", subject: "biology", topic: "genetics" })
    );

    const note = getNoteBySlug("meiosis");
    expect(note.slug).toBe("meiosis");
    expect(note.topic).toBe("genetics");
  });

  it("getNotesBySubject filters by subject", () => {
    notes.push(makeNote({ slug: "mitosis", subject: "biology" }));
    notes.push(makeNote({ slug: "bonding", subject: "chemistry" }));
    notes.push(makeNote({ slug: "meiosis", subject: "biology" }));

    const bioNotes = getNotesBySubject("biology");
    expect(bioNotes).toHaveLength(2);
    expect(bioNotes.every((n) => n.subject === "biology")).toBe(true);
  });

  it("getNotesByTopic filters by subject and topic", () => {
    notes.push(
      makeNote({ slug: "mitosis", subject: "biology", topic: "cell-biology" })
    );
    notes.push(
      makeNote({
        slug: "organelles",
        subject: "biology",
        topic: "cell-biology",
      })
    );
    notes.push(
      makeNote({ slug: "dna", subject: "biology", topic: "genetics" })
    );

    const cellNotes = getNotesByTopic("biology", "cell-biology");
    expect(cellNotes).toHaveLength(2);
    expect(cellNotes.every((n) => n.topic === "cell-biology")).toBe(true);
  });
});
