import { describe, it, expect } from "vitest";
import { notes, topics, subjects } from "@/data/imat/registry";

const EXPECTED_SLUGS = [
  "carbohydrates",
  "lipids",
  "proteins",
  "nucleic-acids",
  "enzymes",
  "weak-interactions",
];

const ALL_NOTE_SLUGS = notes.map((n) => n.slug);

describe("chemistry-of-living-things topic", () => {
  it("has a topic entry in the registry", () => {
    const topic = topics.find(
      (t) => t.slug === "chemistry-of-living-things" && t.subject === "biology"
    );
    expect(topic).toBeDefined();
    expect(topic?.title).toBeTruthy();
  });

  it("is listed in the biology subject's topics", () => {
    const bio = subjects.find((s) => s.slug === "biology");
    expect(bio?.topics).toContain("chemistry-of-living-things");
  });

  it("has all 6 notes registered", () => {
    for (const slug of EXPECTED_SLUGS) {
      const note = notes.find((n) => n.slug === slug);
      expect(note, `missing note: ${slug}`).toBeDefined();
      expect(note?.subject).toBe("biology");
      expect(note?.topic).toBe("chemistry-of-living-things");
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
