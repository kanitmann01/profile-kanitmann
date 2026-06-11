import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuizCard } from "../quiz-card";
import type { Question } from "@/data/imat/types";

const mcQuestion: Question = {
  id: "q1",
  type: "multiple-choice",
  prompt: "What is the capital of France?",
  answer: "Paris",
  explanation: "Paris is the capital and largest city of France.",
  difficulty: "recall",
  options: ["London", "Paris", "Berlin", "Madrid"],
};

const fillQuestion: Question = {
  id: "q2",
  type: "fill-blank",
  prompt: "The powerhouse of the cell is the ____.",
  answer: "mitochondria",
  explanation: "Mitochondria generate most of the cell's ATP.",
  difficulty: "recall",
};

const tfQuestion: Question = {
  id: "q3",
  type: "true-false",
  prompt: "The speed of light is approximately 3x10^8 m/s.",
  answer: "True",
  difficulty: "recall",
};

const explainQuestion: Question = {
  id: "q4",
  type: "explain-why",
  prompt: "Why does a compass needle point north?",
  answer: "Because Earth acts as a giant magnet with a magnetic field.",
  explanation:
    "Earth's core generates a magnetic field, aligning compass needles.",
  difficulty: "analyze",
};

describe("QuizCard", () => {
  it("renders multiple-choice question with options", () => {
    render(<QuizCard question={mcQuestion} />);
    expect(screen.getByText(mcQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
  });

  it("renders fill-blank question with text input", () => {
    render(<QuizCard question={fillQuestion} />);
    expect(screen.getByText(fillQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders true-false question with two buttons", () => {
    render(<QuizCard question={tfQuestion} />);
    expect(screen.getByText(tfQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /true/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /false/i })).toBeInTheDocument();
  });

  it("renders explain-why question with textarea and show answer button", () => {
    render(<QuizCard question={explainQuestion} />);
    expect(screen.getByText(explainQuestion.prompt)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /show answer/i })
    ).toBeInTheDocument();
  });

  it("shows correct feedback for multiple-choice after selecting", () => {
    render(<QuizCard question={mcQuestion} />);
    fireEvent.click(screen.getByText("Paris"));
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Paris is the capital and largest city of France./i)
    ).toBeInTheDocument();
  });

  it("shows incorrect feedback for multiple-choice after selecting wrong answer", () => {
    render(<QuizCard question={mcQuestion} />);
    fireEvent.click(screen.getByText("London"));
    expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
    expect(screen.getByText(/— Answer:/i)).toBeInTheDocument();
  });

  it("shows feedback for fill-blank after submitting", () => {
    render(<QuizCard question={fillQuestion} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "mitochondria" } });
    fireEvent.click(screen.getByRole("button", { name: /check/i }));
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
  });

  it("shows feedback for true-false after selecting", () => {
    render(<QuizCard question={tfQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /true/i }));
    expect(screen.getByText(/correct/i)).toBeInTheDocument();
  });

  it("shows answer for explain-why after clicking show answer", () => {
    render(<QuizCard question={explainQuestion} />);
    fireEvent.click(screen.getByRole("button", { name: /show answer/i }));
    expect(
      screen.getByText(/Because Earth acts as a giant magnet/i)
    ).toBeInTheDocument();
  });

  it("disables inputs after answering", () => {
    render(<QuizCard question={mcQuestion} />);
    fireEvent.click(screen.getByText("Paris"));
    const options = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.textContent === "London" ||
          btn.textContent === "Paris" ||
          btn.textContent === "Berlin" ||
          btn.textContent === "Madrid"
      );
    options.forEach((btn) => expect(btn).toBeDisabled());
  });
});
