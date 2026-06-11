import { describe, it, expect } from "vitest";
import { notes, topics, subjects } from "@/data/imat/registry";

const EXPECTED_SLUGS = [
  "renaissance",
  "world-wars",
  "dante",
  "modern-italian",
  "ancient-philosophy",
  "modern-philosophy",
  "un-system",
  "eu-institutions",
];

const TOPIC_SLUGS = [
  "european-history",
  "italian-literature",
  "philosophy",
  "international-institutions",
];

const ALL_NOTE_SLUGS = notes.map((n) => n.slug);

describe("general-knowledge subject", () => {
  it("has a subject entry in the registry with topics populated", () => {
    const gk = subjects.find((s) => s.slug === "general-knowledge");
    expect(gk).toBeDefined();
    expect(gk?.topics.length).toBeGreaterThanOrEqual(4);
    for (const t of TOPIC_SLUGS) {
      expect(gk?.topics).toContain(t);
    }
  });

  describe.each(TOPIC_SLUGS)("topic: %s", (topicSlug) => {
    it("has a topic entry in the registry", () => {
      const topic = topics.find(
        (t) => t.slug === topicSlug && t.subject === "general-knowledge"
      );
      expect(topic).toBeDefined();
      expect(topic?.title).toBeTruthy();
      expect(topic?.description).toBeTruthy();
    });
  });

  it("has all 8 notes registered", () => {
    for (const slug of EXPECTED_SLUGS) {
      const note = notes.find((n) => n.slug === slug);
      expect(note, `missing note: ${slug}`).toBeDefined();
      expect(note?.subject).toBe("general-knowledge");
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
