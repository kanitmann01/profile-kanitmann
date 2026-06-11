import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InlineReview } from "../inline-review";
import type { Question } from "@/data/imat/types";

const mockRecordReview = vi.fn();

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    recordReview: mockRecordReview,
  }),
}));

function makeQuestion(overrides: Partial<Question> & { id: string }): Question {
  return {
    type: "fill-blank",
    prompt: "What is X?",
    answer: "Y",
    difficulty: "recall",
    ...overrides,
  };
}

describe("InlineReview", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders up to 3 flashcards prioritizing recall questions", () => {
    const questions: Question[] = [
      makeQuestion({ id: "q1", difficulty: "analyze", prompt: "Analyze Q" }),
      makeQuestion({ id: "q2", difficulty: "recall", prompt: "Recall Q1" }),
      makeQuestion({ id: "q3", difficulty: "apply", prompt: "Apply Q1" }),
      makeQuestion({ id: "q4", difficulty: "recall", prompt: "Recall Q2" }),
      makeQuestion({ id: "q5", difficulty: "apply", prompt: "Apply Q2" }),
    ];

    render(<InlineReview questions={questions} noteSlug="test-note" />);

    expect(screen.getByText("Recall Q1")).toBeInTheDocument();
    expect(screen.getByText("Recall Q2")).toBeInTheDocument();
    expect(screen.getByText("Apply Q1")).toBeInTheDocument();
    expect(screen.queryByText("Analyze Q")).not.toBeInTheDocument();
    expect(screen.queryByText("Apply Q2")).not.toBeInTheDocument();
  });

  it("reveals answer on tap and records result via Got it/Missed", () => {
    const questions: Question[] = [
      makeQuestion({ id: "q1", prompt: "What is ATP?" }),
    ];

    render(<InlineReview questions={questions} noteSlug="test-note" />);

    expect(screen.queryByText("Y")).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("reveal-q1"));
    expect(screen.getByText("Y")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("got-it-q1"));
    expect(mockRecordReview).toHaveBeenCalledWith("test-note", "nailed");
    expect(screen.getByTestId("result-q1")).toHaveTextContent("Got it");
  });

  it("records missed result when Missed is clicked", () => {
    const questions: Question[] = [
      makeQuestion({ id: "q1", prompt: "What is X?" }),
    ];

    render(<InlineReview questions={questions} noteSlug="test-note" />);

    fireEvent.click(screen.getByTestId("reveal-q1"));
    fireEvent.click(screen.getByTestId("missed-q1"));
    expect(mockRecordReview).toHaveBeenCalledWith("test-note", "forgot");
    expect(screen.getByTestId("result-q1")).toHaveTextContent("Missed");
  });

  it("does not re-show answered questions on re-render within session", () => {
    const questions: Question[] = [
      makeQuestion({ id: "q1", prompt: "What is X?" }),
    ];

    const { unmount } = render(
      <InlineReview questions={questions} noteSlug="test-note" />
    );
    fireEvent.click(screen.getByTestId("reveal-q1"));
    fireEvent.click(screen.getByTestId("got-it-q1"));
    unmount();

    render(<InlineReview questions={questions} noteSlug="test-note" />);
    expect(screen.queryByTestId("reveal-q1")).not.toBeInTheDocument();
    expect(screen.getByTestId("result-q1")).toHaveTextContent("Got it");
  });
});
