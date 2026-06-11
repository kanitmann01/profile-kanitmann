import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("next/font/google", () => ({
  Instrument_Serif: () => ({ variable: "--font-serif" }),
  JetBrains_Mono: () => ({ variable: "--font-mono" }),
  Geist: () => ({ variable: "--font-sans" }),
}));

const mockHook = vi.fn();

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => mockHook(),
}));

const defaultHookReturn = {
  progress: {},
  getProgress: vi.fn(),
  recordReview: vi.fn(),
  getDueNotes: vi.fn().mockReturnValue([]),
  getWeakNotes: vi.fn().mockReturnValue([]),
  getStreak: vi.fn().mockReturnValue(0),
  getStats: vi.fn().mockReturnValue({
    reviewed: 0,
    weak: 0,
    ok: 0,
    strong: 0,
    total: 0,
  }),
  getRecentReviews: vi.fn().mockReturnValue([]),
  resetProgress: vi.fn(),
};

beforeEach(() => {
  mockHook.mockReturnValue({ ...defaultHookReturn });
});

import ImatDashboard from "@/app/imat/page";

describe("IMAT Dashboard", () => {
  it("renders all five sections", () => {
    render(<ImatDashboard />);
    expect(screen.getByTestId("stats-bar")).toBeInTheDocument();
    expect(screen.getByTestId("exam-readiness")).toBeInTheDocument();
    expect(screen.getByTestId("subject-breakdown")).toBeInTheDocument();
    expect(screen.getByTestId("priority-actions")).toBeInTheDocument();
    expect(screen.getByTestId("quick-actions")).toBeInTheDocument();
  });

  it("displays stats from the spaced repetition hook", () => {
    mockHook.mockReturnValue({
      ...defaultHookReturn,
      getStats: vi.fn().mockReturnValue({
        reviewed: 12,
        weak: 3,
        ok: 4,
        strong: 5,
        total: 12,
      }),
      getStreak: vi.fn().mockReturnValue(7),
      getRecentReviews: vi.fn().mockReturnValue([
        { date: "2026-06-09", count: 5 },
        { date: "2026-06-08", count: 3 },
      ]),
    });
    render(<ImatDashboard />);
    const statsBar = screen.getByTestId("stats-bar");
    expect(statsBar.textContent).toMatch(/8/i);
    expect(statsBar.textContent).toMatch(/7/i);
    expect(statsBar.textContent).toMatch(/42/i);
  });

  it("shows all 6 subjects in the breakdown", () => {
    render(<ImatDashboard />);
    const breakdown = screen.getByTestId("subject-breakdown");
    expect(within(breakdown).getByText("Biology")).toBeInTheDocument();
    expect(within(breakdown).getByText("Chemistry")).toBeInTheDocument();
    expect(within(breakdown).getByText("Physics")).toBeInTheDocument();
    expect(within(breakdown).getByText("Mathematics")).toBeInTheDocument();
    expect(
      within(breakdown).getByText("Logical Reasoning")
    ).toBeInTheDocument();
    expect(
      within(breakdown).getByText("General Knowledge")
    ).toBeInTheDocument();
  });

  it("shows 'caught up' message when no notes are due", () => {
    render(<ImatDashboard />);
    expect(screen.getByText(/caught up/i)).toBeInTheDocument();
  });

  it("shows due notes in priority actions when they exist", () => {
    mockHook.mockReturnValue({
      ...defaultHookReturn,
      getDueNotes: vi.fn().mockReturnValue(["biology/cells/mitosis"]),
      progress: {
        "biology/cells/mitosis": {
          noteSlug: "biology/cells/mitosis",
          lastReviewed: "2026-06-01T00:00:00Z",
          confidence: "weak" as const,
          nextReviewDate: "2026-06-05T00:00:00Z",
          reviewCount: 2,
          interval: 1,
        },
      },
    });
    render(<ImatDashboard />);
    expect(screen.getByText(/Start Review/i)).toBeInTheDocument();
  });

  it("renders quick action buttons", () => {
    render(<ImatDashboard />);
    const quickActions = screen.getByTestId("quick-actions");
    expect(within(quickActions).getByText(/Random Quiz/i)).toBeInTheDocument();
    expect(within(quickActions).getByText(/Weak Topics/i)).toBeInTheDocument();
    expect(within(quickActions).getByText(/New Content/i)).toBeInTheDocument();
  });

  it("shows 0% readiness when no progress exists", () => {
    render(<ImatDashboard />);
    const readiness = screen.getByTestId("exam-readiness");
    expect(readiness.textContent).toMatch(/0\s*%/i);
  });
});
