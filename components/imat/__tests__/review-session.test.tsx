import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ReviewSession } from "../review-session";
import type { Question } from "@/data/imat/types";

vi.mock("@/hooks/use-spaced-repetition", () => ({
  useSpacedRepetition: () => ({
    recordReview: vi.fn(),
  }),
}));

const questions: Question[] = [
  {
    id: "q1",
    type: "multiple-choice",
    prompt: "What is 2+2?",
    answer: "4",
    difficulty: "recall",
    options: ["3", "4", "5"],
  },
  {
    id: "q2",
    type: "true-false",
    prompt: "The sun is a star.",
    answer: "True",
    difficulty: "recall",
  },
  {
    id: "q3",
    type: "fill-blank",
    prompt: "H2O is ___.",
    answer: "water",
    difficulty: "recall",
  },
];

describe("ReviewSession", () => {
  it("renders progress indicator showing X of Y", () => {
    render(<ReviewSession questions={questions} slug="test-slug" />);
    expect(screen.getByText(/1 of 3/)).toBeInTheDocument();
  });

  it("renders the first question", () => {
    render(<ReviewSession questions={questions} slug="test-slug" />);
    expect(screen.getByText("What is 2+2?")).toBeInTheDocument();
  });

  it("advances to next question after answering and clicking next", () => {
    render(<ReviewSession questions={questions} slug="test-slug" />);
    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByTestId("next-button"));
    expect(screen.getByText(/2 of 3/)).toBeInTheDocument();
    expect(screen.getByText("The sun is a star.")).toBeInTheDocument();
  });

  it("shows review buttons after all questions answered", () => {
    render(<ReviewSession questions={questions} slug="test-slug" />);

    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByTestId("next-button"));

    fireEvent.click(screen.getByRole("button", { name: /true/i }));
    fireEvent.click(screen.getByTestId("next-button"));

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "water" } });
    fireEvent.click(screen.getByRole("button", { name: /check/i }));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByRole("button", { name: /forgot/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nailed/i })).toBeInTheDocument();
  });

  it("shows score summary at the end", () => {
    render(<ReviewSession questions={questions} slug="test-slug" />);

    fireEvent.click(screen.getByText("4"));
    fireEvent.click(screen.getByTestId("next-button"));

    fireEvent.click(screen.getByRole("button", { name: /true/i }));
    fireEvent.click(screen.getByTestId("next-button"));

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "water" } });
    fireEvent.click(screen.getByRole("button", { name: /check/i }));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByText(/score: \d+ of \d+/i)).toBeInTheDocument();
  });

  it("shows empty state when no questions provided", () => {
    render(<ReviewSession questions={[]} slug="test-slug" />);
    expect(screen.getByText(/no questions/i)).toBeInTheDocument();
  });
});
