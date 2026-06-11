import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

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

import ImatPage from "@/app/imat/page";

describe("IMAT pages render", () => {
  it("renders the IMAT dashboard page", () => {
    render(<ImatPage />);
    expect(screen.getByText("IMAT Dashboard")).toBeInTheDocument();
  });
});
