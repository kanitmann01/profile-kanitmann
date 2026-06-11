"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "poly-qf-1",
    question: "What is the degree of the polynomial 5x⁴ − 2x³ + 7?",
    answer: "4",
    hint: "Look for the highest exponent",
    context: "Degree = deepest power",
  },
  {
    id: "poly-qf-2",
    question: "When dividing P(x) by (x − a), the remainder equals:",
    answer: "P(a)",
    hint: "Remainder Theorem",
    context: "Plug a into P(x)",
  },
  {
    id: "poly-qf-3",
    question: "What is (x − 2)(x + 2) expanded?",
    answer: "x² − 4",
    hint: "Difference of squares pattern",
    context: "a² − b² = (a − b)(a + b)",
  },
];

export const polynomialsNote: AtomicNote = {
  slug: "polynomials",
  subject: "mathematics",
  topic: "algebra",
  title: "Polynomials",
  summary:
    "Polynomials are algebraic expressions with non-negative integer exponents. Degree, factoring techniques (common factor, difference of squares, sum/difference of cubes, trinomials), and the Remainder and Factor Theorems are core IMAT topics.",
  memoryHook:
    "'DEGree = DEepest power' — degree is the highest exponent. A degree-n polynomial has at most n real roots. Factoring flow: common factor first, then look for difference of squares, then trinomial patterns. Remainder Theorem: divide by (x − a), remainder is P(a).",
  imatTrap:
    "Remainder Theorem: P(a) is the remainder when dividing by (x − a), NOT (x + a). Factor Theorem: (x − a) is a factor iff P(a) = 0 — this is a special case of the Remainder Theorem with remainder = 0. A polynomial of degree n has AT MOST n real roots, not exactly n (complex roots can appear in conjugate pairs).",
  whyItMatters:
    "Polynomials underpin equation-solving in the IMAT. Factoring is the fastest path to roots. The Remainder/Factor Theorems let you evaluate divisibility without long division — a time-saver under exam pressure. Polynomial division and factoring appear in every IMAT mathematics section.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Remainder Theorem and Factor Theorem applications",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Factoring quadratics and difference of squares",
    },
    {
      years: [2022, 2024],
      frequency: "low",
      notes: "Polynomial long division",
    },
  ],
  equations: [
    {
      id: "poly-general-form",
      latex: "P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0",
      description: "General polynomial of degree n",
      variables:
        "aₙ = leading coefficient, a₀ = constant term, n = degree (non-negative integer)",
    },
    {
      id: "poly-remainder",
      latex:
        "P(a) = \\text{remainder when } P(x) \\text{ is divided by } (x - a)",
      description: "Remainder Theorem",
    },
    {
      id: "poly-factor",
      latex: "(x - a) \\text{ is a factor of } P(x) \\iff P(a) = 0",
      description: "Factor Theorem (Remainder Theorem with remainder = 0)",
    },
    {
      id: "poly-diff-sq",
      latex: "a^2 - b^2 = (a - b)(a + b)",
      description: "Difference of squares",
    },
    {
      id: "poly-sum-cubes",
      latex: "a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)",
      description: "Sum/difference of cubes",
    },
  ],
  workedExamples: [
    {
      id: "poly-worked-1",
      question:
        "IMAT 2023 Style: Find the remainder when P(x) = 2x³ − 3x² + 4x − 5 is divided by (x − 2).",
      hints: [
        "Use the Remainder Theorem: remainder = P(2).",
        "Substitute x = 2 into P(x): 2(8) − 3(4) + 4(2) − 5.",
        "Simplify carefully.",
      ],
      solution:
        "P(2) = 2(8) − 3(4) + 4(2) − 5 = 16 − 12 + 8 − 5 = 7. The remainder is 7.",
      imatYear: 2023,
    },
    {
      id: "poly-worked-2",
      question:
        "Show that (x + 1) is a factor of P(x) = x³ + 2x² − x − 2, then factor P(x) completely.",
      hints: [
        "(x + 1) = (x − (−1)), so evaluate P(−1).",
        "If P(−1) = 0, then (x + 1) is a factor.",
        "Divide P(x) by (x + 1) to get a quadratic, then factor the quadratic.",
      ],
      solution:
        "P(−1) = −1 + 2 + 1 − 2 = 0 → (x + 1) is a factor. Dividing: (x³ + 2x² − x − 2) ÷ (x + 1) = x² + x − 2. Then x² + x − 2 = (x + 2)(x − 1). So P(x) = (x + 1)(x + 2)(x − 1).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Polynomial Remainder Theorem",
      url: "https://www.khanacademy.org/math/algebra2/x2ec2f6f830c9fb89:poly-div/x2ec2f6f830c9fb89:remainder-theorem/v/polynomial-remainder-theorem",
      type: "video",
      description:
        "Clear explanation of Remainder and Factor Theorems with examples",
    },
    {
      title: "PurpleMath — Factoring Polynomials",
      url: "https://www.purplemath.com/modules/simpfact.htm",
      type: "article",
      description:
        "Comprehensive factoring guide from common factors to special forms",
    },
    {
      title: "Wolfram Alpha — Polynomial Factoring",
      url: "https://www.wolframalpha.com/input/?i=factor+polynomial",
      type: "practice",
      description: "Check your factoring and explore polynomial properties",
    },
  ],
  highYieldPoints: [
    "Degree = highest exponent (determines max roots)",
    "Remainder Theorem: remainder of P(x) ÷ (x − a) = P(a)",
    "Factor Theorem: (x − a) is a factor ⇔ P(a) = 0",
    "Difference of squares: a² − b² = (a − b)(a + b)",
    "Sum/difference of cubes: a³ ± b³ = (a ± b)(a² ∓ ab + b²)",
    "Look for common factor FIRST in any factoring problem",
    "Degree n → at most n real roots (complex can occur)",
  ],
  explanation: (
    <div>
      <p>
        A <strong>polynomial</strong> is an algebraic expression of the form
        aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀, where n is a non-negative integer. The{" "}
        <strong>degree</strong> is the highest power. IMAT tests your ability to
        factor, evaluate remainders, and find roots quickly.
      </p>

      <h3>Degree and Classification</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-sm font-semibold">Linear</p>
          <p className="text-xs text-muted-foreground">
            Degree 1<br />
            ax + b
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-sm font-semibold">Quadratic</p>
          <p className="text-xs text-muted-foreground">
            Degree 2<br />
            ax² + bx + c
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3 text-center">
          <p className="text-sm font-semibold">Cubic</p>
          <p className="text-xs text-muted-foreground">
            Degree 3<br />
            ax³ + bx² + cx + d
          </p>
        </div>
      </div>

      <h3>Remainder Theorem</h3>
      <p className="mb-3">
        The remainder when P(x) is divided by (x − a) is simply{" "}
        <strong>P(a)</strong>. No long division needed — just substitute and
        evaluate.
      </p>
      <EquationBlock
        equation={{
          id: "poly-remainder",
          latex: "P(a) = \\text{remainder when } P(x) \\div (x - a)",
          description:
            "Plug in a and evaluate — faster than polynomial division",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Factor Theorem</h3>
      <p className="mb-3">
        A special case: if the remainder is zero, then (x − a) is a{" "}
        <strong>factor</strong>.
      </p>
      <EquationBlock
        equation={{
          id: "poly-factor",
          latex: "(x - a) \\text{ is a factor of } P(x) \\iff P(a) = 0",
          description: "Zero remainder → factor found!",
        }}
      />

      <h3>Key Factoring Patterns</h3>
      <div className="grid gap-2 mb-4">
        <EquationBlock
          equation={{
            id: "poly-diff-sq",
            latex: "a^2 - b^2 = (a - b)(a + b)",
            description:
              "Difference of squares — most common IMAT factoring pattern",
          }}
        />
        <EquationBlock
          equation={{
            id: "poly-sum-cubes",
            latex: "a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)",
            description: "Sum/difference of cubes — note the sign alternation",
          }}
        />
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Step Solver: Remainder Theorem</h3>
      <StepSolver
        problem="Find the remainder when P(x) = 3x³ − 2x² + 5x − 1 is divided by (x − 3)."
        steps={[
          {
            label: "Evaluate P(3): substitute x = 3",
            answer: "77",
            hint: "P(3) = 3(27) − 2(9) + 5(3) − 1 = 81 − 18 + 15 − 1",
          },
          {
            label: "What is the remainder?",
            answer: "77",
            hint: "By Remainder Theorem, remainder = P(3) = 77",
          },
        ]}
        equation="P(3) = 3(3)^3 - 2(3)^2 + 5(3) - 1"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "poly-worked-1",
            question:
              "IMAT 2023 Style: Remainder when 2x³ − 3x² + 4x − 5 is divided by (x − 2).",
            hints: ["Use Remainder Theorem: P(2).", "Substitute and evaluate."],
            solution: "P(2) = 16 − 12 + 8 − 5 = 7.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Degree = highest exponent",
          "Remainder Theorem: P(a) = remainder when ÷ (x − a)",
          "Factor Theorem: P(a) = 0 ⇔ (x − a) is a factor",
          "a² − b² = (a − b)(a + b)",
          "a³ ± b³ = (a ± b)(a² ∓ ab + b²)",
          "Common factor FIRST",
          "Degree n → at most n real roots",
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
      id: "poly-q1",
      type: "multiple-choice",
      prompt:
        "What is the remainder when P(x) = x³ − 2x + 4 is divided by (x − 3)?",
      options: ["19", "25", "31", "7"],
      answer: "25",
      explanation: "By Remainder Theorem: P(3) = 27 − 6 + 4 = 25.",
      difficulty: "apply",
    },
    {
      id: "poly-q2",
      type: "multiple-choice",
      prompt: "Factor completely: x² − 9",
      options: [
        "(x − 3)(x + 3)",
        "(x − 9)(x + 1)",
        "(x − 3)²",
        "Cannot be factored",
      ],
      answer: "(x − 3)(x + 3)",
      explanation:
        "Difference of squares: a² − b² = (a − b)(a + b). Here a = x, b = 3.",
      difficulty: "recall",
    },
    {
      id: "poly-q3",
      type: "true-false",
      prompt: "A polynomial of degree 4 always has exactly 4 real roots.",
      answer: "False",
      explanation:
        "A polynomial of degree n has AT MOST n real roots. Some roots may be complex (in conjugate pairs). Example: x⁴ + 1 = 0 has no real roots.",
      difficulty: "recall",
    },
    {
      id: "poly-q4",
      type: "multiple-choice",
      prompt: "What is the degree of the polynomial 7x⁵ − 3x² + 2x − 9?",
      options: ["2", "3", "5", "9"],
      answer: "5",
      explanation: "The degree is the highest exponent of x, which is 5.",
      difficulty: "recall",
    },
    {
      id: "poly-q5",
      type: "fill-blank",
      prompt: "If (x − 2) is a factor of P(x) = x³ − kx² + 4, find k.",
      answer: "3",
      explanation:
        "By Factor Theorem: P(2) = 0 → 8 − 4k + 4 = 0 → 12 − 4k = 0 → k = 3.",
      difficulty: "apply",
    },
    {
      id: "poly-q6",
      type: "multiple-choice",
      prompt: "Factor: x³ − 27",
      options: [
        "(x − 3)(x² + 3x + 9)",
        "(x + 3)(x² − 3x + 9)",
        "(x − 3)³",
        "(x − 27)(x² + 27x + 729)",
      ],
      answer: "(x − 3)(x² + 3x + 9)",
      explanation:
        "Difference of cubes: a³ − b³ = (a − b)(a² + ab + b²). Here a = x, b = 3.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "equations-inequalities",
    "quadratic-functions",
    "linear-functions",
  ],
};

export default polynomialsNote;
