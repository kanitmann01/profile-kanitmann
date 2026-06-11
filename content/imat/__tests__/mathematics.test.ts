import { describe, it, expect } from "vitest";
import { notes, topics, subjects } from "@/data/imat/registry";

const EXPECTED_SLUGS = [
  "equations-inequalities",
  "polynomials",
  "linear-functions",
  "quadratic-functions",
  "plane-geometry",
  "solid-geometry",
  "probability-basics",
  "descriptive-statistics",
];

const ALL_NOTE_SLUGS = notes.map((n) => n.slug);

const TOPIC_SLUGS = [
  "algebra",
  "functions",
  "geometry",
  "probability-statistics",
];

describe("mathematics topic", () => {
  it("has topic entries in the registry for all 4 topics", () => {
    for (const slug of TOPIC_SLUGS) {
      const topic = topics.find(
        (t) => t.slug === slug && t.subject === "mathematics"
      );
      expect(topic, `missing topic: ${slug}`).toBeDefined();
      expect(topic?.title).toBeTruthy();
    }
  });

  it("lists all 4 topics in the mathematics subject's topics array", () => {
    const math = subjects.find((s) => s.slug === "mathematics");
    expect(math).toBeDefined();
    for (const slug of TOPIC_SLUGS) {
      expect(math?.topics, `mathematics missing topic: ${slug}`).toContain(
        slug
      );
    }
  });

  it("has all 8 notes registered", () => {
    for (const slug of EXPECTED_SLUGS) {
      const note = notes.find((n) => n.slug === slug);
      expect(note, `missing note: ${slug}`).toBeDefined();
      expect(note?.subject).toBe("mathematics");
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

    it("has 2-6 questions", () => {
      expect(note.questions.length).toBeGreaterThanOrEqual(2);
      expect(note.questions.length).toBeLessThanOrEqual(6);
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
