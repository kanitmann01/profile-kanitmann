import { describe, it, expect } from "vitest";
import { notes, topics, subjects } from "@/data/imat/registry";

const TOPIC_SLUGS = [
  "composition-of-matter",
  "atomic-structure",
  "periodic-table",
  "chemical-bonding",
  "inorganic-chemistry",
  "reactions-stoichiometry",
  "solutions",
  "redox",
  "organic-chemistry",
  "thermochemistry",
];

const EXPECTED_NOTES: Record<string, string[]> = {
  "composition-of-matter": ["pure-substances", "mixtures-separation"],
  "atomic-structure": ["atomic-models", "electron-configuration"],
  "periodic-table": ["periodic-trends", "groups-periods"],
  "chemical-bonding": ["ionic-bonds", "covalent-bonds"],
  "inorganic-chemistry": ["acids-bases-salts", "oxides"],
  "reactions-stoichiometry": ["balancing-equations", "mole-calculations"],
  solutions: ["concentration", "solubility"],
  redox: ["oxidation-reduction", "electrochemistry"],
  "organic-chemistry": ["hydrocarbons", "functional-groups"],
  thermochemistry: ["enthalpy", "hess-law"],
};

const ALL_NOTE_SLUGS = notes.map((n) => n.slug);

describe("chemistry topics", () => {
  it("has a chemistry subject entry", () => {
    const chem = subjects.find((s) => s.slug === "chemistry");
    expect(chem).toBeDefined();
    expect(chem?.topics.length).toBeGreaterThanOrEqual(10);
  });

  describe.each(TOPIC_SLUGS)("topic: %s", (topicSlug) => {
    it("has a topic entry in the registry", () => {
      const topic = topics.find(
        (t) => t.slug === topicSlug && t.subject === "chemistry"
      );
      expect(topic).toBeDefined();
      expect(topic?.title).toBeTruthy();
      expect(topic?.description).toBeTruthy();
    });

    it("is listed in the chemistry subject's topics", () => {
      const chem = subjects.find((s) => s.slug === "chemistry");
      expect(chem?.topics).toContain(topicSlug);
    });

    const noteSlugs = EXPECTED_NOTES[topicSlug];
    describe.each(noteSlugs)("note: %s", (slug) => {
      const note = notes.find((n) => n.slug === slug);

      it("is registered", () => {
        expect(note, `missing note: ${slug}`).toBeDefined();
        expect(note?.subject).toBe("chemistry");
        expect(note?.topic).toBe(topicSlug);
      });

      it("has all required fields", () => {
        expect(note!.title).toBeTruthy();
        expect(note!.summary).toBeTruthy();
        expect(note!.memoryHook).toBeTruthy();
        expect(note!.imatTrap).toBeTruthy();
        expect(note!.whyItMatters).toBeTruthy();
        expect(note!.explanation).toBeDefined();
      });

      it("has 2-6 questions", () => {
        expect(note!.questions.length).toBeGreaterThanOrEqual(2);
        expect(note!.questions.length).toBeLessThanOrEqual(6);
      });

      it("each question has required fields", () => {
        for (const q of note!.questions) {
          expect(q.id).toBeTruthy();
          expect(q.type).toBeTruthy();
          expect(q.prompt).toBeTruthy();
          expect(q.answer).toBeTruthy();
          expect(q.difficulty).toBeTruthy();
        }
      });

      it("crosslinks reference valid note slugs", () => {
        for (const link of note!.crosslinks) {
          expect(ALL_NOTE_SLUGS).toContain(link);
        }
      });
    });
  });
});
