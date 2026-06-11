import { describe, it, expect } from "vitest";
import { notes, topics, subjects } from "@/data/imat/registry";

const MEASURES_SLUGS = ["si-units", "significant-figures"];
const KINEMATICS_SLUGS = ["uniform-motion", "projectile-motion"];
const DYNAMICS_SLUGS = ["newton-laws", "forces"];
const FLUID_SLUGS = ["pressure", "archimedes"];
const THERMO_SLUGS = ["heat-transfer", "gas-laws"];
const ELECTRO_SLUGS = ["coulombs-law", "ohms-law"];

const ALL_PHYSICS_SLUGS = [
  ...MEASURES_SLUGS,
  ...KINEMATICS_SLUGS,
  ...DYNAMICS_SLUGS,
  ...FLUID_SLUGS,
  ...THERMO_SLUGS,
  ...ELECTRO_SLUGS,
];

const ALL_NOTE_SLUGS = notes.map((n) => n.slug);

const TOPIC_MAP: Record<string, string> = {
  "si-units": "measures",
  "significant-figures": "measures",
  "uniform-motion": "kinematics",
  "projectile-motion": "kinematics",
  "newton-laws": "dynamics",
  forces: "dynamics",
  pressure: "fluid-mechanics",
  archimedes: "fluid-mechanics",
  "heat-transfer": "thermodynamics",
  "gas-laws": "thermodynamics",
  "coulombs-law": "electrostatics-electrodynamics",
  "ohms-law": "electrostatics-electrodynamics",
};

describe("physics subject", () => {
  it("has a subject entry in the registry", () => {
    const phys = subjects.find((s) => s.slug === "physics");
    expect(phys).toBeDefined();
    expect(phys?.topics.length).toBeGreaterThan(0);
  });

  describe.each([
    ["measures", MEASURES_SLUGS],
    ["kinematics", KINEMATICS_SLUGS],
    ["dynamics", DYNAMICS_SLUGS],
    ["fluid-mechanics", FLUID_SLUGS],
    ["thermodynamics", THERMO_SLUGS],
    ["electrostatics-electrodynamics", ELECTRO_SLUGS],
  ])("%s topic", (topicSlug, noteSlugs) => {
    it("has a topic entry in the registry", () => {
      const topic = topics.find(
        (t) => t.slug === topicSlug && t.subject === "physics"
      );
      expect(topic).toBeDefined();
      expect(topic?.title).toBeTruthy();
    });

    it("is listed in the physics subject's topics", () => {
      const phys = subjects.find((s) => s.slug === "physics");
      expect(phys?.topics).toContain(topicSlug);
    });

    it.each(noteSlugs)("has note %s registered", (slug) => {
      const note = notes.find((n) => n.slug === slug);
      expect(note, `missing note: ${slug}`).toBeDefined();
      expect(note?.subject).toBe("physics");
      expect(note?.topic).toBe(topicSlug);
    });
  });

  describe.each(ALL_PHYSICS_SLUGS)("%s", (slug) => {
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

    it("has correct topic assignment", () => {
      expect(note.topic).toBe(TOPIC_MAP[slug]);
    });
  });
});
