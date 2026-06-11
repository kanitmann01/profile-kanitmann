import { describe, it, expect } from "vitest";
import { notes, topics, subjects } from "@/data/imat/registry";

const EXPECTED_SLUGS = [
  "main-conclusion",
  "premises",
  "drawing-conclusion",
  "assumptions",
  "additional-evidence",
  "reasoning-errors",
  "matching-arguments",
  "applying-principles",
  "data-interpretation",
  "numerical-reasoning",
];

const EXPECTED_TOPICS = [
  "argument-structure",
  "conclusion-types",
  "evaluation",
  "application",
  "problem-solving",
];

const ALL_NOTE_SLUGS = notes.map((n) => n.slug);

describe("logical-reasoning topic", () => {
  it("has topic entries in the registry for all 5 topics", () => {
    for (const topicSlug of EXPECTED_TOPICS) {
      const topic = topics.find(
        (t) => t.slug === topicSlug && t.subject === "logical-reasoning"
      );
      expect(topic, `missing topic: ${topicSlug}`).toBeDefined();
      expect(topic?.title).toBeTruthy();
    }
  });

  it("is listed in the logical-reasoning subject's topics", () => {
    const lr = subjects.find((s) => s.slug === "logical-reasoning");
    expect(lr).toBeDefined();
    for (const topicSlug of EXPECTED_TOPICS) {
      expect(lr?.topics).toContain(topicSlug);
    }
  });

  it("has all 10 notes registered", () => {
    for (const slug of EXPECTED_SLUGS) {
      const note = notes.find((n) => n.slug === slug);
      expect(note, `missing note: ${slug}`).toBeDefined();
      expect(note?.subject).toBe("logical-reasoning");
    }
  });

  describe.each(EXPECTED_SLUGS)("%s", (slug) => {
    const note = notes.find((n) => n.slug === slug)!;

    it("has all required fields", () => {
      expect(note.title).toBeTruthy();
      expect(note.summary).toBeTruthy();
      expect(note.memoryHook).toBeTruthy();
      expect(note.imatTrap).toBeTruthy();
      expect(note.whyItMatters).toBeTruthy();
      expect(note.explanation).toBeDefined();
    });

    it("has 2-3 questions", () => {
      expect(note.questions.length).toBeGreaterThanOrEqual(2);
      expect(note.questions.length).toBeLessThanOrEqual(3);
    });

    it("each question has required fields", () => {
      for (const q of note.questions) {
        expect(q.id).toBeTruthy();
        expect(q.type).toBeTruthy();
        expect(q.prompt).toBeTruthy();
        expect(q.answer).toBeTruthy();
        expect(q.difficulty).toBeTruthy();
      }
    });

    it("crosslinks reference valid note slugs", () => {
      for (const link of note.crosslinks) {
        expect(ALL_NOTE_SLUGS).toContain(link);
      }
    });
  });
});
