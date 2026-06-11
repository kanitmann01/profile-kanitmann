import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "probability-basics",
  subject: "mathematics",
  topic: "probability-statistics",
  title: "Probability Basics",
  summary:
    "Sample space, events, classical probability P(A) = favorable/total, mutually exclusive and independent events, and complementary probability.",
  memoryHook:
    '"Probability = Favorable / Total" — Always between 0 and 1. P(A) + P(not A) = 1. If it is easier to count what you DO NOT want, use the complement.',
  imatTrap:
    "Mutually exclusive events CANNOT happen together: P(A or B) = P(A) + P(B). Independent events don't affect each other: P(A and B) = P(A) × P(B). Don't confuse mutually exclusive (can't both happen) with independent (one doesn't affect the other) — they are DIFFERENT concepts.",
  whyItMatters:
    "Probability questions appear in 1–2 IMAT items per year. Genetics (Punnett squares), medical test interpretation, and combinatorics all build on these basics. The complement rule (1 − P) is a time-saver.",
  explanation: (
    <div>
      <h3>Basic Probability</h3>
      <p>
        <strong>
          P(A) = (number of favorable outcomes) / (total outcomes)
        </strong>
      </p>
      <ul>
        <li>0 ≤ P(A) ≤ 1</li>
        <li>P(certain event) = 1</li>
        <li>P(impossible event) = 0</li>
      </ul>
      <h3>Complement Rule</h3>
      <p>
        <strong>P(not A) = 1 − P(A)</strong>
      </p>
      <p>Useful when "at least one" is asked: P(at least one) = 1 − P(none).</p>
      <h3>Mutually Exclusive Events</h3>
      <p>Events A and B cannot occur simultaneously:</p>
      <p>
        <strong>P(A or B) = P(A) + P(B)</strong>
      </p>
      <h3>Independent Events</h3>
      <p>The occurrence of A does not affect B:</p>
      <p>
        <strong>P(A and B) = P(A) × P(B)</strong>
      </p>
      <h3>General Addition Rule</h3>
      <p>P(A or B) = P(A) + P(B) − P(A and B)</p>
    </div>
  ),
  questions: [
    {
      id: "prob-q1",
      type: "multiple-choice",
      prompt:
        "A fair die is rolled. What is the probability of getting a number greater than 4?",
      answer: "1/3",
      explanation:
        "Favorable outcomes: {5, 6} = 2 outcomes. Total = 6. P = 2/6 = 1/3.",
      difficulty: "recall",
      options: ["1/6", "1/3", "1/2", "2/3"],
    },
    {
      id: "prob-q2",
      type: "multiple-choice",
      prompt:
        "Events A and B are independent. P(A) = 0.3, P(B) = 0.5. What is P(A and B)?",
      answer: "0.15",
      explanation:
        "For independent events: P(A and B) = P(A) × P(B) = 0.3 × 0.5 = 0.15.",
      difficulty: "apply",
      options: ["0.8", "0.15", "0.2", "0.35"],
    },
    {
      id: "prob-q3",
      type: "multiple-choice",
      prompt:
        "The probability of rain tomorrow is 0.4. What is the probability it will NOT rain?",
      answer: "0.6",
      explanation: "P(not rain) = 1 − P(rain) = 1 − 0.4 = 0.6.",
      difficulty: "recall",
      options: ["0.4", "0.5", "0.6", "1.4"],
    },
  ],
  crosslinks: ["descriptive-statistics", "equations-inequalities"],
};

export default note;
