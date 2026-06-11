import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}));

vi.mock("next/script", () => ({
  default: () => null,
}));

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    progress: {},
    getProgress: vi.fn(),
    getStats: () => ({ reviewed: 0, weak: 0, ok: 0, strong: 0, total: 0 }),
    getWeakNotes: vi.fn(() => []),
    getDueNotes: vi.fn(() => []),
    getStreak: vi.fn(() => 0),
    recordReview: vi.fn(),
    resetProgress: vi.fn(),
    getRecentReviews: vi.fn(() => []),
  }),
}));

import { SubjectPageClient } from "@/app/imat/[subject]/subject-page-client";
import { subjects } from "@/data/imat/registry";

describe("Subject page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders subject name when passed a subject", () => {
    const bio = subjects.find((s) => s.slug === "biology")!;
    render(<SubjectPageClient subject={bio} />);
    expect(
      screen.getByRole("heading", { name: /^biology$/i })
    ).toBeInTheDocument();
  });

  it("shows exam weight", () => {
    const bio = subjects.find((s) => s.slug === "biology")!;
    render(<SubjectPageClient subject={bio} />);
    expect(screen.getByText(/38%/i)).toBeInTheDocument();
  });

  it("shows progress bar", () => {
    const bio = subjects.find((s) => s.slug === "biology")!;
    render(<SubjectPageClient subject={bio} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows topics for chemistry", () => {
    const chem = subjects.find((s) => s.slug === "chemistry")!;
    render(<SubjectPageClient subject={chem} />);
    expect(screen.getByText(/topics/i)).toBeInTheDocument();
  });

  it("exports generateStaticParams for all subjects", () => {
    const params = subjects.map((s) => ({ subject: s.slug }));
    expect(params.length).toBe(6);
    expect(params[0]).toEqual({ subject: "biology" });
  });
});
