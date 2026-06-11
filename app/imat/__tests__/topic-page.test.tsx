import { describe, it, expect, vi, beforeEach } from "vitest";
import { subjects, getNotesByTopic } from "@/data/imat/registry";

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    getProgress: vi.fn(),
    progress: {},
  }),
}));

describe("Topic page data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads notes for a valid topic", () => {
    const bio = subjects.find((s) => s.slug === "biology");
    expect(bio).toBeDefined();

    const notes = getNotesByTopic("biology", "cell-biology");
    expect(notes.length).toBeGreaterThan(0);
  });

  it("returns empty for nonexistent topic", () => {
    const notes = getNotesByTopic("biology", "nonexistent-topic");
    expect(notes).toEqual([]);
  });

  it("returns empty for invalid subject", () => {
    const notes = getNotesByTopic("invalid" as any, "cell-biology" as any);
    expect(notes).toEqual([]);
  });

  it("returns notes for chemistry topics", () => {
    const notes = getNotesByTopic("chemistry", "atomic-structure");
    expect(notes.length).toBeGreaterThan(0);
  });

  it("returns notes for physics topics", () => {
    const notes = getNotesByTopic("physics", "kinematics");
    expect(notes.length).toBeGreaterThan(0);
  });
});
