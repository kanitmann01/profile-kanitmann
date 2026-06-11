"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "prob-qf-1",
    question: "What is P(A) + P(not A)?",
    answer: "1",
    hint: "Something either happens or it doesn't",
    context: "Complement rule",
  },
  {
    id: "prob-qf-2",
    question: "If A and B are independent, P(A and B) = ?",
    answer: "P(A) × P(B)",
    hint: "One doesn't affect the other",
    context: "Multiplication rule for independent events",
  },
  {
    id: "prob-qf-3",
    question: "If A and B are mutually exclusive, P(A or B) = ?",
    answer: "P(A) + P(B)",
    hint: "They cannot happen together",
    context: "Addition rule for mutually exclusive events",
  },
];

export const probabilityBasicsNote: AtomicNote = {
  slug: "probability-basics",
  subject: "mathematics",
  topic: "probability-statistics",
  title: "Probability Basics",
  summary:
    "Classical probability P(A) = favourable/total, sample spaces, mutually exclusive events (P(A or B) = P(A) + P(B)), independent events (P(A and B) = P(A)×P(B)), and the complement rule (P(not A) = 1 − P(A)).",
  memoryHook:
    "'Probability = Favorable / Total — always between 0 and 1.' 'If it's easier to count what you DON'T want, use the complement: P(at least one) = 1 − P(none).' Mutually exclusive = can't both happen (OR = +). Independent = don't affect each other (AND = ×).",
  imatTrap:
    "Mutually exclusive events CANNOT happen together: P(A or B) = P(A) + P(B). Independent events don't affect each other: P(A and B) = P(A) × P(B). These are DIFFERENT concepts — do NOT confuse them. 'At least one' problems are best solved via the complement: P(at least one) = 1 − P(none). P(A|B) = P(A and B)/P(B) — this is conditional probability, not the same as P(A and B).",
  whyItMatters:
    "Probability questions appear in 1–2 IMAT items per year. Genetics (Punnett squares, inheritance probability), medical test interpretation (sensitivity, specificity), and combinatorics all build on these basics. The complement rule (1 − P) is the single biggest time-saver on IMAT probability questions.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Basic probability: P = favourable/total",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "medium",
      notes: "Independent vs mutually exclusive events",
    },
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Complement rule for 'at least one' problems",
    },
  ],
  equations: [
    {
      id: "prob-classical",
      latex:
        "P(A) = \\frac{\\text{number of favorable outcomes}}{\\text{total number of outcomes}}",
      description: "Classical probability definition",
    },
    {
      id: "prob-complement",
      latex: "P(\\text{not } A) = 1 - P(A)",
      description: "Complement rule: use when 'at least one' is asked",
    },
    {
      id: "prob-mutually-exclusive",
      latex: "P(A \\text{ or } B) = P(A) + P(B)",
      description: "Mutually exclusive events: A and B cannot occur together",
    },
    {
      id: "prob-independent",
      latex: "P(A \\text{ and } B) = P(A) \\times P(B)",
      description: "Independent events: occurrence of A does not affect B",
    },
    {
      id: "prob-general-addition",
      latex: "P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)",
      description:
        "General addition rule (for events that are NOT mutually exclusive)",
    },
  ],
  workedExamples: [
    {
      id: "prob-worked-1",
      question:
        "IMAT 2023 Style: A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. A marble is drawn at random. What is the probability it is red?",
      hints: [
        "Total marbles = 5 + 3 + 2 = 10.",
        "Favorable outcomes (red) = 5.",
        "P(red) = 5/10 = 1/2.",
      ],
      solution: "Total = 10. Favorable = 5. P(red) = 5/10 = 1/2 = 0.5.",
      imatYear: 2023,
    },
    {
      id: "prob-worked-2",
      question:
        "The probability of rain on any given day is 0.3. What is the probability that it rains on at least one of the next two days? (Assume days are independent.)",
      hints: [
        "'At least one' = 1 − P(none).",
        "P(no rain on a day) = 1 − 0.3 = 0.7.",
        "P(no rain on both days) = 0.7 × 0.7 = 0.49.",
        "P(at least one) = 1 − 0.49 = 0.51.",
      ],
      solution:
        "P(no rain) = 0.7. P(no rain both days) = 0.7² = 0.49. P(at least one rain) = 1 − 0.49 = 0.51.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Probability Basics",
      url: "https://www.khanacademy.org/math/statistics-probability/probability-library",
      type: "video",
      description: "Comprehensive series from basic to conditional probability",
    },
    {
      title: "Brilliant — Probability Fundamentals",
      url: "https://brilliant.org/wiki/probability/",
      type: "article",
      description: "Interactive probability course with practice problems",
    },
    {
      title: "Wolfram Alpha — Probability Calculator",
      url: "https://www.wolframalpha.com/input/?i=probability+of+rolling+a+6",
      type: "practice",
      description:
        "Calculate and verify probability results for common scenarios",
    },
  ],
  highYieldPoints: [
    "P(A) = favourable / total (0 ≤ P ≤ 1)",
    "Complement: P(not A) = 1 − P(A)",
    "P(at least one) = 1 − P(none) — KEY shortcut!",
    "Mutually exclusive → can't both happen: P(A or B) = P(A) + P(B)",
    "Independent → one doesn't affect the other: P(A and B) = P(A) × P(B)",
    "General addition: P(A or B) = P(A) + P(B) − P(A and B)",
    "Conditional probability: P(A|B) = P(A and B)/P(B)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Probability</strong> quantifies how likely an event is. On the
        IMAT, you need the classical definition, complement rule, and the
        critical distinction between <strong>mutually exclusive</strong> and
        <strong>independent</strong> events — a frequent trap.
      </p>

      <h3>Classical Probability</h3>
      <EquationBlock
        equation={{
          id: "prob-classical",
          latex:
            "P(A) = \\frac{\\text{favorable outcomes}}{\\text{total outcomes}}",
          description: "All outcomes equally likely — between 0 and 1",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Complement Rule</h3>
      <p className="mb-3">
        The single biggest time-saver on IMAT probability: if counting favorable
        outcomes is hard, count unfavorable instead.
      </p>
      <EquationBlock
        equation={{
          id: "prob-complement",
          latex: "P(\\text{not } A) = 1 - P(A)",
          description:
            "P(at least one) = 1 − P(none) — use this for 'at least' problems",
        }}
      />

      <h3>Mutually Exclusive vs Independent</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">
            Mutually Exclusive
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Events <strong>cannot</strong> happen at the same time.
            <br />
            Example: rolling a 2 and rolling a 5 on one die.
          </p>
          <EquationBlock
            equation={{
              id: "prob-mutually-exclusive",
              latex: "P(A \\text{ or } B) = P(A) + P(B)",
              description: "No overlap — just add",
            }}
          />
        </div>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Independent</h4>
          <p className="text-xs text-muted-foreground mt-1">
            One event <strong>does not affect</strong> the other.
            <br />
            Example: flipping a coin and rolling a die.
          </p>
          <EquationBlock
            equation={{
              id: "prob-independent",
              latex: "P(A \\text{ and } B) = P(A) \\times P(B)",
              description: "No interaction — just multiply",
            }}
          />
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>General Addition Rule</h3>
      <p className="mb-3">
        When events are <strong>not</strong> mutually exclusive, don't
        double-count the overlap:
      </p>
      <EquationBlock
        equation={{
          id: "prob-general-addition",
          latex: "P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B)",
          description: "Subtract the intersection to avoid double-counting",
        }}
      />

      <h3>Step Solver: 'At Least One' Problem</h3>
      <StepSolver
        problem="Probability of heads on a fair coin is 0.5. What is the probability of at least 1 head in 3 flips?"
        steps={[
          {
            label: "P(no heads in one flip)",
            answer: "0.5",
            hint: "P(tails) = 1 − 0.5 = 0.5",
          },
          {
            label: "P(no heads in 3 flips)",
            answer: "0.125",
            hint: "0.5 × 0.5 × 0.5 = 0.125",
          },
          {
            label: "P(at least 1 head)",
            answer: "0.875",
            hint: "1 − 0.125 = 0.875",
          },
        ]}
        equation="P(\\text{at least one}) = 1 - P(\\text{none})"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "prob-worked-1",
            question: "IMAT 2023 Style: Bag of 5 red, 3 blue, 2 green. P(red)?",
            hints: ["Total = 10.", "Red = 5."],
            solution: "P(red) = 5/10 = 1/2.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "P(A) = favourable / total",
          "Complement: P(not A) = 1 − P(A)",
          "P(at least one) = 1 − P(none)",
          "Mutually exclusive → P(A or B) = P(A) + P(B)",
          "Independent → P(A and B) = P(A) × P(B)",
          "General addition: P(A or B) = P(A) + P(B) − P(A and B)",
          "0 ≤ P(A) ≤ 1 always",
        ].map((point) => (
          <div
            key={point}
            className="flex items-start gap-2 rounded-lg border border-green-500/20 bg-green-500/5 p-2"
          >
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">{point}</span>
          </div>
        ))}
      </div>

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "prob-q1",
      type: "multiple-choice",
      prompt:
        "A fair die is rolled. What is the probability of getting a number greater than 4?",
      options: ["1/6", "1/3", "1/2", "2/3"],
      answer: "1/3",
      explanation:
        "Favorable outcomes: {5, 6} = 2 outcomes. Total = 6. P = 2/6 = 1/3.",
      difficulty: "recall",
    },
    {
      id: "prob-q2",
      type: "multiple-choice",
      prompt:
        "Events A and B are independent. P(A) = 0.3, P(B) = 0.5. What is P(A and B)?",
      options: ["0.8", "0.15", "0.2", "0.35"],
      answer: "0.15",
      explanation:
        "For independent events: P(A and B) = P(A) × P(B) = 0.3 × 0.5 = 0.15.",
      difficulty: "apply",
    },
    {
      id: "prob-q3",
      type: "multiple-choice",
      prompt:
        "The probability of rain tomorrow is 0.4. What is the probability it will NOT rain?",
      options: ["0.4", "0.5", "0.6", "1.4"],
      answer: "0.6",
      explanation: "P(not rain) = 1 − P(rain) = 1 − 0.4 = 0.6.",
      difficulty: "recall",
    },
    {
      id: "prob-q4",
      type: "multiple-choice",
      prompt:
        "Two events are mutually exclusive. P(A) = 0.3, P(B) = 0.6. What is P(A or B)?",
      options: ["0.18", "0.9", "0.3", "0.6"],
      answer: "0.9",
      explanation:
        "For mutually exclusive events: P(A or B) = P(A) + P(B) = 0.3 + 0.6 = 0.9.",
      difficulty: "apply",
    },
    {
      id: "prob-q5",
      type: "fill-blank",
      prompt:
        "A bag has 4 white and 6 black balls. A ball is drawn at random. What is P(white)?",
      answer: "0.4",
      explanation: "P(white) = 4/10 = 0.4.",
      difficulty: "recall",
    },
    {
      id: "prob-q6",
      type: "multiple-choice",
      prompt:
        "What is the probability of rolling at least one 6 in two rolls of a fair die?",
      options: ["1/36", "1/6", "11/36", "1/3"],
      answer: "11/36",
      explanation:
        "P(at least one 6) = 1 − P(no 6) = 1 − (5/6)(5/6) = 1 − 25/36 = 11/36.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["descriptive-statistics", "equations-inequalities"],
};

export default probabilityBasicsNote;
