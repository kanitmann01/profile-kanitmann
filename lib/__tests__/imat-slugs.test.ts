import { describe, it, expect } from "vitest";
import { formatSlug } from "@/lib/imat-slugs";

describe("formatSlug", () => {
  it("converts kebab-case to Title Case", () => {
    expect(formatSlug("carbohydrates")).toBe("Carbohydrates");
    expect(formatSlug("amino-acids")).toBe("Amino Acids");
    expect(formatSlug("nucleic-acids-and-dna")).toBe("Nucleic Acids And Dna");
  });

  it("handles single word", () => {
    expect(formatSlug("biology")).toBe("Biology");
  });

  it("handles empty string", () => {
    expect(formatSlug("")).toBe("");
  });
});
