"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";
import { FunctionGrapher } from "@/components/imat/interactive/function-grapher";

const recallQuestions = [
  {
    id: "quad-qf-1",
    question: "What is the vertex of y = (x − 3)² + 5?",
    answer: "(3, 5)",
    hint: "Vertex form: y = a(x − h)² + k",
    context: "Watch the sign of h!",
  },
  {
    id: "quad-qf-2",
    question: "If a > 0 in y = ax² + bx + c, the parabola opens:",
    answer: "upward",
    hint: "Positive a → smile; Negative a → frown",
    context: "Leading coefficient determines direction",
  },
  {
    id: "quad-qf-3",
    question: "What is the axis of symmetry of y = 2x² − 8x + 5?",
    answer: "x = 2",
    hint: "x = −b/(2a)",
    context: "Vertex x-coordinate",
  },
];

export const quadraticFunctionsNote: AtomicNote = {
  slug: "quadratic-functions",
  subject: "mathematics",
  topic: "functions",
  title: "Quadratic Functions",
  summary:
    "Quadratic functions (f(x) = ax² + bx + c) produce parabolic graphs. Vertex form, axis of symmetry, discriminant (nature of roots), and the quadratic formula are the essential tools.",
  memoryHook:
    "'Vertex = (−b/2a, f(−b/2a))' — x-coordinate is always −b/2a. Plug it back in for y. 'a > 0 → smile (minimum), a < 0 → frown (maximum).' Vertex form: y = a(x − h)² + k — note the MINUS sign before h.",
  imatTrap:
    "The discriminant Δ = b² − 4ac tells you the NUMBER of real roots, not their values. Δ > 0 → 2 real roots, Δ = 0 → 1 repeated root, Δ < 0 → 0 real roots. Vertex form is y = a(x − h)² + k where vertex = (h, k) — note the MINUS sign: (x − 3)² has vertex at x = 3, not x = −3. Don't confuse axis of symmetry (x = h) with the vertex (h, k).",
  whyItMatters:
    "Quadratic functions appear in projectile motion (IMAT physics!), optimization (max/min area, profit), and curve-sketching questions. The vertex gives the maximum or minimum value — a classic IMAT optimisation shortcut. Understanding quadratics is essential for grasping more complex functions.",
  imatPatterns: [
    {
      years: [2021, 2022, 2023, 2024],
      frequency: "high",
      notes: "Vertex and axis of symmetry identification",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "medium",
      notes: "Discriminant and nature of roots",
    },
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Parabola graph interpretation (opens up/down, intercepts)",
    },
  ],
  equations: [
    {
      id: "quad-standard",
      latex: "f(x) = ax^2 + bx + c",
      description: "Standard form of a quadratic function",
      variables: "a ≠ 0. a > 0 → opens up; a < 0 → opens down",
    },
    {
      id: "quad-vertex-form",
      latex: "f(x) = a(x - h)^2 + k",
      description: "Vertex form: vertex = (h, k), axis of symmetry x = h",
      variables: "h = −b/2a, k = f(h)",
    },
    {
      id: "quad-axis",
      latex: "x = -\\frac{b}{2a}",
      description: "Axis of symmetry (vertical line through vertex)",
    },
    {
      id: "quad-discriminant",
      latex: "\\Delta = b^2 - 4ac",
      description: "Discriminant — determines nature of roots",
      variables: "Δ > 0 → 2 real; Δ = 0 → 1 real (repeated); Δ < 0 → 0 real",
    },
  ],
  workedExamples: [
    {
      id: "quad-worked-1",
      question:
        "IMAT 2023 Style: For the quadratic f(x) = 2x² − 12x + 10, find (a) the axis of symmetry, (b) the vertex, and (c) state whether the vertex is a max or min.",
      hints: [
        "Axis of symmetry: x = −b/(2a). Here a = 2, b = −12.",
        "Vertex x-coordinate = axis of symmetry. Plug back to find y.",
        "a > 0 → opens upward → vertex is a minimum.",
      ],
      solution:
        "(a) x = −(−12)/(4) = 12/4 = 3. (b) f(3) = 2(9) − 12(3) + 10 = 18 − 36 + 10 = −8. Vertex = (3, −8). (c) a = 2 > 0 → minimum.",
      imatYear: 2023,
    },
    {
      id: "quad-worked-2",
      question:
        "Determine the nature of the roots of f(x) = x² + 4x + 7 without solving.",
      hints: [
        "Calculate the discriminant Δ = b² − 4ac.",
        "a = 1, b = 4, c = 7.",
        "Δ < 0 means no real roots (complex).",
      ],
      solution:
        "Δ = 16 − 28 = −12 < 0. Since Δ < 0, the quadratic has no real roots. The parabola does not cross the x-axis.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Quadratic Functions",
      url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:quadratic-functions-equations",
      type: "video",
      description: "Full series on quadratics: vertex, roots, and graphing",
    },
    {
      title: "Desmos — Quadratic Grapher",
      url: "https://www.desmos.com/calculator",
      type: "simulation",
      description:
        "Plot quadratics and see vertex, roots, and discriminant visually",
    },
    {
      title: "PurpleMath — Completing the Square",
      url: "https://www.purplemath.com/modules/sqrvertx.htm",
      type: "article",
      description: "Step-by-step guide to converting standard to vertex form",
    },
  ],
  highYieldPoints: [
    "Standard: f(x) = ax² + bx + c (a ≠ 0)",
    "Vertex form: f(x) = a(x − h)² + k, vertex = (h, k)",
    "Axis of symmetry: x = −b/(2a) = h",
    "a > 0 → opens up (minimum vertex); a < 0 → opens down (maximum)",
    "Discriminant Δ = b² − 4ac: >0 → 2 real roots; =0 → 1; <0 → 0 real",
    "Parabola is symmetric about its axis",
    "y-intercept: f(0) = c; x-intercepts: roots of ax² + bx + c = 0",
  ],
  explanation: (
    <div>
      <p>
        <strong>Quadratic functions</strong> are second-degree polynomials that
        produce <strong>parabolic</strong> graphs. They model projectile motion,
        optimisation problems, and appear in nearly every IMAT mathematics
        section.
      </p>

      <h3>Standard and Vertex Forms</h3>
      <div className="grid gap-3 mb-4">
        <EquationBlock
          equation={{
            id: "quad-standard",
            latex: "f(x) = ax^2 + bx + c",
            description:
              "Standard form: a determines opening direction, c = y-intercept",
          }}
        />
        <EquationBlock
          equation={{
            id: "quad-vertex-form",
            latex: "f(x) = a(x - h)^2 + k",
            description:
              "Vertex form: vertex = (h, k), read the sign carefully!",
          }}
        />
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Interactive Grapher</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Adjust a, h, and k to see how the parabola changes. Note how a controls
        the opening direction and width.
      </p>
      <FunctionGrapher />

      <h3>Axis of Symmetry</h3>
      <p className="mb-3">
        The vertical line through the vertex dividing the parabola into mirror
        halves:
      </p>
      <EquationBlock
        equation={{
          id: "quad-axis",
          latex: "x = -\\frac{b}{2a}",
          description: "Also the x-coordinate of the vertex",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>The Discriminant</h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-green-600">Δ &gt; 0</p>
          <p className="text-xs text-muted-foreground">
            2 real roots
            <br />
            Crosses x-axis twice
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-amber-600">Δ = 0</p>
          <p className="text-xs text-muted-foreground">
            1 real root (repeated)
            <br />
            Touches x-axis
          </p>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
          <p className="text-sm font-semibold text-red-600">Δ &lt; 0</p>
          <p className="text-xs text-muted-foreground">
            No real roots
            <br />
            Doesn&apos;t cross x-axis
          </p>
        </div>
      </div>

      <EquationBlock
        equation={{
          id: "quad-discriminant",
          latex: "\\Delta = b^2 - 4ac",
          description: "Quick check — determines root type without solving",
        }}
      />

      <h3>Step Solver: Vertex from Standard Form</h3>
      <StepSolver
        problem="Find the vertex of f(x) = 3x² − 6x + 11."
        steps={[
          {
            label: "Find axis: x = −b/(2a)",
            answer: "1",
            hint: "x = −(−6)/(2×3) = 6/6 = 1",
          },
          {
            label: "Find f(1) for y-coordinate",
            answer: "8",
            hint: "f(1) = 3(1) − 6(1) + 11 = 3 − 6 + 11 = 8",
          },
        ]}
        equation="h = \\frac{-b}{2a},\\quad k = f(h)"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "quad-worked-1",
            question:
              "IMAT 2023 Style: f(x) = 2x² − 12x + 10. Find axis, vertex, and min/max.",
            hints: ["x = −b/(2a)", "Plug back for y", "a > 0 → min"],
            solution: "x = 3, vertex = (3, −8), minimum.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Standard: ax² + bx + c; Vertex: a(x − h)² + k",
          "Vertex = (h, k) = (−b/2a, f(−b/2a))",
          "Axis of symmetry: x = −b/2a",
          "a > 0 → opens up (min); a < 0 → opens down (max)",
          "Δ = b² − 4ac: root detector",
          "y-intercept = c; x-intercepts = roots",
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
      id: "quad-q1",
      type: "multiple-choice",
      prompt: "What is the vertex of f(x) = 2(x − 3)² + 5?",
      options: ["(3, 5)", "(−3, 5)", "(3, −5)", "(−3, −5)"],
      answer: "(3, 5)",
      explanation:
        "In vertex form f(x) = a(x − h)² + k, the vertex is (h, k) = (3, 5).",
      difficulty: "recall",
    },
    {
      id: "quad-q2",
      type: "multiple-choice",
      prompt: "How many real roots does x² + 4x + 5 = 0 have?",
      options: [
        "0 (no real roots)",
        "1 repeated root",
        "2 distinct roots",
        "Cannot be determined",
      ],
      answer: "0 (no real roots)",
      explanation:
        "Δ = 16 − 20 = −4 < 0. A negative discriminant means no real roots.",
      difficulty: "apply",
    },
    {
      id: "quad-q3",
      type: "multiple-choice",
      prompt: "The axis of symmetry of f(x) = 3x² − 12x + 7 is:",
      options: ["x = 2", "x = −2", "x = 4", "x = 6"],
      answer: "x = 2",
      explanation: "x = −b/(2a) = −(−12)/(2·3) = 12/6 = 2.",
      difficulty: "apply",
    },
    {
      id: "quad-q4",
      type: "multiple-choice",
      prompt: "If a = −2 in a quadratic function, the parabola:",
      options: [
        "Opens upward",
        "Opens downward",
        "Has no vertex",
        "Is a straight line",
      ],
      answer: "Opens downward",
      explanation:
        "a < 0 means the parabola opens downward (frown shape), giving a maximum at the vertex.",
      difficulty: "recall",
    },
    {
      id: "quad-q5",
      type: "fill-blank",
      prompt: "What is the y-intercept of f(x) = x² − 5x + 6?",
      answer: "6",
      explanation: "The y-intercept is f(0) = c = 6.",
      difficulty: "recall",
    },
    {
      id: "quad-q6",
      type: "multiple-choice",
      prompt:
        "Which discriminant value indicates a quadratic with one repeated real root?",
      options: ["Δ = 16", "Δ = 0", "Δ = −4", "Δ = 1"],
      answer: "Δ = 0",
      explanation:
        "Δ = 0 means the quadratic has exactly one repeated real root (the parabola touches the x-axis at one point).",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "equations-inequalities",
    "polynomials",
    "linear-functions",
    "projectile-motion",
  ],
};

export default quadraticFunctionsNote;
