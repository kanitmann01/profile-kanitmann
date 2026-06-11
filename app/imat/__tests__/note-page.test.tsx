import { describe, it, expect, vi, beforeEach } from "vitest";
import { getNoteBySlug, subjects } from "@/data/imat/registry";

describe("Note page data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads existing note by slug", () => {
    const note = getNoteBySlug("carbohydrates");
    expect(note.title).toBe("Carbohydrates");
  });

  it("note has required sections", () => {
    const note = getNoteBySlug("carbohydrates");
    expect(note.memoryHook).toBeTruthy();
    expect(note.imatTrap).toBeTruthy();
    expect(note.whyItMatters).toBeTruthy();
    expect(note.questions.length).toBeGreaterThanOrEqual(2);
  });

  it("note has crosslinks", () => {
    const note = getNoteBySlug("carbohydrates");
    expect(note.crosslinks.length).toBeGreaterThan(0);
  });

  it("throws for unknown note slug", () => {
    expect(() => getNoteBySlug("nonexistent")).toThrow();
  });

  it("notes exist for all biology subjects", () => {
    const bio = subjects.find((s) => s.slug === "biology")!;
    expect(bio.topics.length).toBeGreaterThan(0);
  });
});
