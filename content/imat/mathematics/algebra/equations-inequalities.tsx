"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "eq-qf-1",
    question:
      "What happens to the inequality sign when you multiply both sides by −3?",
    answer: "flips",
    hint: "Think about 2 < 5 multiplied by −1",
    context: "Critical IMAT trap",
  },
  {
    id: "eq-qf-2",
    question: "For |x − 3| < 5, the solution is:",
    answer: "−2 < x < 8",
    hint: "This is an AND inequality",
    context: "|stuff| < b → −b < stuff < b",
  },
  {
    id: "eq-qf-3",
    question: "What does the discriminant Δ = b² − 4ac tell you?",
    answer: "number and type of roots",
    hint: ">0, =0, <0",
    context: "Determines real vs complex roots",
  },
];

export const equationsInequalitiesNote: AtomicNote = {
  slug: "equations-inequalities",
  subject: "mathematics",
  topic: "algebra",
  title: "Equations & Inequalities",
  summary:
    "Solving linear, quadratic, and systems of equations; solving and graphing inequalities including absolute value inequalities. The discriminant determines the nature of quadratic roots.",
  memoryHook:
    "'Balance the Scale' — whatever you do to one side, do to the other. 'Flip on Negative' — inequality sign FLIPS when multiplying/dividing by a negative. Absolute value: |stuff| < b → AND (between); |stuff| > b → OR (outside). Quadratic formula: x = (−b ± √Δ)/2a.",
  imatTrap:
    "When multiplying or dividing both sides of an inequality by a negative number, the inequality sign FLIPS direction — this is the #1 IMAT algebra error. For |x − a| < b, the solution is a − b < x < a + b (AND). For |x − a| > b, the solution is x < a − b OR x > a + b (OR). Always check for extraneous solutions when squaring both sides or solving rational equations.",
  whyItMatters:
    "Equations and inequalities are foundational for every IMAT math problem. Systems of equations appear in mixture/rate problems. Absolute value inequalities test sign-flip awareness — a classic IMAT trap. The quadratic formula and discriminant are the most-used tools in the IMAT math section.",
  imatPatterns: [
    {
      years: [2021, 2022, 2023, 2024],
      frequency: "high",
      notes: "Quadratic formula and discriminant questions",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "medium",
      notes: "Absolute value inequalities",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Systems of two linear equations",
    },
  ],
  equations: [
    {
      id: "eq-quadratic-formula",
      latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      description: "Quadratic formula: solves ax² + bx + c = 0",
      variables: "a, b, c are coefficients; a ≠ 0",
    },
    {
      id: "eq-discriminant",
      latex: "\\Delta = b^2 - 4ac",
      description: "Discriminant determines nature of roots",
      variables:
        "Δ > 0 → 2 real roots; Δ = 0 → 1 repeated root; Δ < 0 → no real roots",
    },
  ],
  workedExamples: [
    {
      id: "eq-worked-1",
      question: "IMAT 2023 Style: Solve the inequality |2x − 5| < 3.",
      hints: [
        "|stuff| < 3 means −3 < stuff < 3.",
        "Write: −3 < 2x − 5 < 3.",
        "Add 5 to all three parts, then divide by 2.",
      ],
      solution:
        "−3 < 2x − 5 < 3 → 2 < 2x < 8 → 1 < x < 4. Solution set: (1, 4).",
      imatYear: 2023,
    },
    {
      id: "eq-worked-2",
      question:
        "A system of equations: 3x + 2y = 12 and x − y = 1. Solve for x and y.",
      hints: [
        "Solve the second equation for x: x = y + 1.",
        "Substitute into the first equation: 3(y + 1) + 2y = 12.",
        "Solve for y, then find x.",
      ],
      solution:
        "x = y + 1 → 3(y + 1) + 2y = 12 → 3y + 3 + 2y = 12 → 5y = 9 → y = 1.8. Then x = 1.8 + 1 = 2.8. Solution: (2.8, 1.8).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Quadratic Formula",
      url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations/x2f8bb11595b61c86:quadratic-formula-a1/v/quadratic-formula-1",
      type: "video",
      description: "Step-by-step derivation and usage of the quadratic formula",
    },
    {
      title: "PurpleMath — Absolute Value Inequalities",
      url: "https://www.purplemath.com/modules/absineq.htm",
      type: "article",
      description:
        "Clear explanation of AND vs OR in absolute value inequalities",
    },
    {
      title: "Desmos — Graphing Inequalities",
      url: "https://www.desmos.com/calculator",
      type: "simulation",
      description:
        "Visualise inequalities and systems of equations interactively",
    },
  ],
  highYieldPoints: [
    "Quadratic formula: x = (−b ± √Δ)/2a — MEMORISE IT",
    "Discriminant Δ = b² − 4ac: Δ > 0 → 2 real; Δ = 0 → 1; Δ < 0 → none",
    "Inequality sign FLIPS when ×/÷ by negative",
    "|stuff| < b → AND (−b < stuff < b)",
    "|stuff| > b → OR (stuff < −b OR stuff > b)",
    "Systems: substitution or elimination — both work",
    "Always check for extraneous solutions",
  ],
  explanation: (
    <div>
      <p>
        <strong>Equations</strong> and <strong>inequalities</strong> are the
        backbone of algebra. Master the quadratic formula, the discriminant,
        inequality rules, and absolute value patterns — these appear in nearly
        every IMAT mathematics section.
      </p>

      <h3>Linear Equations</h3>
      <p className="mb-3">
        A linear equation in one variable has the form{" "}
        <strong>ax + b = 0</strong>. Solve by isolating x:{" "}
        <strong>x = −b/a</strong>.
      </p>

      <h3>Quadratic Formula</h3>
      <p className="mb-3">
        For any quadratic ax² + bx + c = 0 (a ≠ 0), the roots are given by:
      </p>
      <EquationBlock
        equation={{
          id: "eq-quadratic-formula",
          latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          description: "The master formula — works for all quadratics",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>The Discriminant</h3>
      <p className="mb-3">
        The expression under the square root determines the nature of roots:
      </p>
      <EquationBlock
        equation={{
          id: "eq-discriminant",
          latex: "\\Delta = b^2 - 4ac",
          description:
            "Δ > 0 → two distinct real roots; Δ = 0 → one repeated; Δ < 0 → no real roots",
        }}
      />

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-green-600">Δ &gt; 0</p>
          <p className="text-xs text-muted-foreground">Two real roots</p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-amber-600">Δ = 0</p>
          <p className="text-xs text-muted-foreground">One repeated root</p>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-red-600">Δ &lt; 0</p>
          <p className="text-xs text-muted-foreground">No real roots</p>
        </div>
      </div>

      <h3>Systems of Equations</h3>
      <p className="mb-3">
        Two equations, two unknowns. Approach: <strong>substitution</strong>{" "}
        (solve one for x, plug into the other) or <strong>elimination</strong>{" "}
        (add/subtract to cancel a variable).
      </p>

      <h3>Inequalities — The Critical Rule</h3>
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 mb-3">
        <p className="text-sm font-semibold text-red-600">⚠ THE #1 IMAT TRAP</p>
        <p className="text-xs text-muted-foreground mt-1">
          When you multiply or divide both sides of an inequality by a
          <strong> negative</strong> number, the inequality sign{" "}
          <strong>FLIPS</strong>. Example: −2x &lt; 6 → x &gt; −3 (flip from
          &lt; to &gt;).
        </p>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Absolute Value Inequalities</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            |x − a| &lt; b
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            a − b &lt; x &lt; a + b<br />
            <strong>AND</strong> — inside interval
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">
            |x − a| &gt; b
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            x &lt; a − b OR x &gt; a + b<br />
            <strong>OR</strong> — outside interval
          </p>
        </div>
      </div>

      <h3>Step Solver: Quadratic Formula</h3>
      <StepSolver
        problem="Solve: 2x² − 7x + 3 = 0 using the quadratic formula."
        steps={[
          {
            label: "Identify a, b, c",
            answer: "2",
            hint: "a = 2, b = −7, c = 3",
          },
          {
            label: "Calculate discriminant Δ",
            answer: "25",
            hint: "Δ = (−7)² − 4(2)(3) = 49 − 24 = 25",
          },
          {
            label: "Plug into formula: x = (7 ± √25)/4",
            answer: "3",
            hint: "x = (7 + 5)/4 = 3 or x = (7 − 5)/4 = 0.5",
          },
        ]}
        equation="x = \\frac{7 \\pm \\sqrt{25}}{4}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "eq-worked-1",
            question: "IMAT 2023 Style: Solve |2x − 5| < 3.",
            hints: ["−3 < 2x − 5 < 3", "Add 5, then divide by 2."],
            solution: "1 < x < 4.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Quadratic formula: x = (−b ± √Δ)/2a",
          "Δ = b² − 4ac: >0 → 2 real; =0 → 1; <0 → 0 real",
          "Flip inequality sign when ×/÷ by negative",
          "|x−a| < b → AND (inside); |x−a| > b → OR (outside)",
          "Systems: substitution or elimination",
          "Check for extraneous solutions",
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
      id: "eq-q1",
      type: "multiple-choice",
      prompt: "Solve: 3x + 7 = 22",
      options: ["x = 3", "x = 5", "x = 7", "x = 15"],
      answer: "x = 5",
      explanation: "Subtract 7: 3x = 15. Divide by 3: x = 5.",
      difficulty: "recall",
    },
    {
      id: "eq-q2",
      type: "multiple-choice",
      prompt:
        "What happens when you multiply both sides of an inequality by −2?",
      options: [
        "The inequality sign flips direction",
        "The inequality sign stays the same",
        "Both sides become zero",
        "The inequality becomes an equation",
      ],
      answer: "The inequality sign flips direction",
      explanation:
        "Multiplying or dividing by a negative reverses the inequality sign.",
      difficulty: "recall",
    },
    {
      id: "eq-q3",
      type: "multiple-choice",
      prompt: "Solve |x − 3| < 5.",
      options: [
        "x < −2 or x > 8",
        "−2 < x < 8",
        "−2 ≤ x ≤ 8",
        "x < 2 or x > 8",
      ],
      answer: "−2 < x < 8",
      explanation: "|x − 3| < 5 means −5 < x − 3 < 5, so −2 < x < 8.",
      difficulty: "apply",
    },
    {
      id: "eq-q4",
      type: "fill-blank",
      prompt: "The discriminant of x² − 6x + 9 = 0 is:",
      answer: "0",
      explanation:
        "Δ = b² − 4ac = 36 − 36 = 0. This quadratic has one repeated root (x = 3).",
      difficulty: "apply",
    },
    {
      id: "eq-q5",
      type: "multiple-choice",
      prompt: "How many real roots does x² + 2x + 5 = 0 have?",
      options: ["0", "1", "2", "Cannot be determined"],
      answer: "0",
      explanation:
        "Δ = 4 − 20 = −16 < 0. A negative discriminant means no real roots.",
      difficulty: "apply",
    },
    {
      id: "eq-q6",
      type: "true-false",
      prompt: "The solution to |x + 1| > 3 is x < −4 OR x > 2.",
      answer: "True",
      explanation:
        "|x + 1| > 3 means x + 1 < −3 OR x + 1 > 3 → x < −4 OR x > 2.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "polynomials",
    "linear-functions",
    "quadratic-functions",
    "plane-geometry",
  ],
};

export default equationsInequalitiesNote;
