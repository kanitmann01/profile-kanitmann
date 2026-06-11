"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";
import { FunctionGrapher } from "@/components/imat/interactive/function-grapher";

const recallQuestions = [
  {
    id: "lin-qf-1",
    question: "What is the slope of a horizontal line?",
    answer: "0",
    hint: "No rise, all run",
    context: "y = constant",
  },
  {
    id: "lin-qf-2",
    question: "What is the slope of a line perpendicular to y = 2x + 1?",
    answer: "-1/2",
    hint: "Negative reciprocal",
    context: "m₁ × m₂ = −1",
  },
  {
    id: "lin-qf-3",
    question:
      "If a line has slope 3 and passes through (0, −2), what is its equation?",
    answer: "y = 3x − 2",
    hint: "The point (0, −2) gives the y-intercept directly",
    context: "Slope-intercept form",
  },
];

export const linearFunctionsNote: AtomicNote = {
  slug: "linear-functions",
  subject: "mathematics",
  topic: "functions",
  title: "Linear Functions",
  summary:
    "Linear functions (y = mx + b) model constant-rate relationships. Slope is the rate of change, y-intercept is the starting value. Parallel lines share slopes; perpendicular slopes multiply to −1.",
  memoryHook:
    "'Slope = Rise / Run = Δy / Δx.' y = mx + b: 'm = slope (steepness), b = y-intercept (where it crosses the y-axis).' Parallel: same m. Perpendicular: m₁ × m₂ = −1 (negative reciprocal). Point-slope: y − y₁ = m(x − x₁) — great when you know a point and the slope.",
  imatTrap:
    "Perpendicular slopes are NEGATIVE RECIPROCALS: if m₁ = 2, then m₂ = −1/2 (not −2). A horizontal line has slope 0; a vertical line has UNDEFINED slope (you cannot write it in y = mx + b form). Don't confuse the y-intercept (b) with the x-intercept (−b/m).",
  whyItMatters:
    "Linear functions are the most frequently tested IMAT math concept. Rate-of-change problems, distance-time graphs, and proportion questions all reduce to linear reasoning. Slope = rate — in physics (velocity = slope of x-t graph), in biology (enzyme reaction rates), in economics (cost functions).",
  imatPatterns: [
    {
      years: [2021, 2022, 2023, 2024],
      frequency: "high",
      notes: "Finding slope, intercepts, and equation from two points",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "medium",
      notes: "Parallel and perpendicular line identification",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Word problems modelled by linear functions",
    },
  ],
  equations: [
    {
      id: "lin-slope-intercept",
      latex: "y = mx + b",
      description: "Slope-intercept form",
      variables:
        "m = slope = Δy/Δx, b = y-intercept (where line crosses y-axis)",
    },
    {
      id: "lin-point-slope",
      latex: "y - y_1 = m(x - x_1)",
      description: "Point-slope form: given point (x₁, y₁) and slope m",
    },
    {
      id: "lin-slope",
      latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      description: "Slope = change in y over change in x",
    },
    {
      id: "lin-perpendicular",
      latex: "m_1 \\times m_2 = -1",
      description: "Perpendicular lines: slopes are negative reciprocals",
    },
  ],
  workedExamples: [
    {
      id: "lin-worked-1",
      question:
        "IMAT 2023 Style: Find the equation of a line passing through (3, 5) with slope 2. Give your answer in slope-intercept form.",
      hints: [
        "Use point-slope form: y − 5 = 2(x − 3).",
        "Expand: y − 5 = 2x − 6.",
        "Add 5: y = 2x − 1.",
      ],
      solution: "y − 5 = 2(x − 3) → y − 5 = 2x − 6 → y = 2x − 1.",
      imatYear: 2023,
    },
    {
      id: "lin-worked-2",
      question:
        "Line L₁ has equation y = 3x + 2. Line L₂ passes through (1, 4) and is parallel to L₁. Find the equation of L₂.",
      hints: [
        "Parallel lines have the same slope: m₂ = 3.",
        "Use point-slope: y − 4 = 3(x − 1).",
        "Convert to slope-intercept form.",
      ],
      solution:
        "m₂ = 3 (parallel → same slope). y − 4 = 3(x − 1) → y = 3x − 3 + 4 → y = 3x + 1.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Linear Equations",
      url: "https://www.khanacademy.org/math/algebra/x2f8bb11595b61c86:linear-equations-graphs",
      type: "video",
      description: "Complete series on slope, intercepts, and graphing lines",
    },
    {
      title: "Desmos — Graphing Calculator",
      url: "https://www.desmos.com/calculator",
      type: "simulation",
      description: "Plot lines and explore slope/intercept interactively",
    },
    {
      title: "PurpleMath — Straight-Line Equations",
      url: "https://www.purplemath.com/modules/strtlneq.htm",
      type: "article",
      description: "Clear reference for all forms of linear equations",
    },
  ],
  highYieldPoints: [
    "y = mx + b: m = slope = rate, b = y-intercept = starting value",
    "Slope = (y₂ − y₁)/(x₂ − x₁) — rise over run",
    "Parallel lines: same slope (m₁ = m₂)",
    "Perpendicular: m₁ × m₂ = −1 (negative reciprocal)",
    "Horizontal line: slope = 0; Vertical line: undefined slope",
    "Point-slope: y − y₁ = m(x − x₁)",
    "x-intercept: set y = 0 → x = −b/m",
  ],
  explanation: (
    <div>
      <p>
        <strong>Linear functions</strong> model relationships with a constant
        rate of change. In the IMAT, they appear in rate problems, distance-time
        graphs, proportion questions, and as the basis for understanding more
        complex functions.
      </p>

      <h3>The Slope-Intercept Form</h3>
      <EquationBlock
        equation={{
          id: "lin-slope-intercept",
          latex: "y = mx + b",
          description: "m = slope (steepness), b = y-intercept (where x = 0)",
          variables: "Slope = rate of change; intercept = initial value",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Interactive Grapher</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Adjust the slope and intercept to see how the line changes in real time.
      </p>
      <FunctionGrapher />

      <h3>Finding Slope from Two Points</h3>
      <EquationBlock
        equation={{
          id: "lin-slope",
          latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
          description: "Slope = change in y ÷ change in x",
        }}
      />

      <h3>Point-Slope Form</h3>
      <p className="mb-3">
        When you know a point (x₁, y₁) on the line and the slope m, use:
      </p>
      <EquationBlock
        equation={{
          id: "lin-point-slope",
          latex: "y - y_1 = m(x - x_1)",
          description: "Use this form when you have one point + slope",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Parallel and Perpendicular Lines</h3>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">Parallel</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Same slope (m₁ = m₂)
            <br />
            Different y-intercepts
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">
            Perpendicular
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            m₁ × m₂ = −1
            <br />
            Negative reciprocals
          </p>
        </div>
      </div>

      <EquationBlock
        equation={{
          id: "lin-perpendicular",
          latex: "m_1 \\times m_2 = -1",
          description: "If m₁ = 2, then m₂ = −½ — NOT −2!",
        }}
      />

      <h3>Step Solver: Finding a Line Equation</h3>
      <StepSolver
        problem="Find equation of line through (4, 7) and (6, 11)."
        steps={[
          {
            label: "Calculate slope m",
            answer: "2",
            hint: "m = (11 − 7)/(6 − 4) = 4/2 = 2",
          },
          {
            label: "Use point-slope with (4, 7)",
            answer: "2",
            hint: "y − 7 = 2(x − 4)",
          },
          {
            label: "Convert to y = mx + b",
            answer: "-1",
            hint: "y = 2x − 8 + 7 = 2x − 1",
          },
        ]}
        equation="y - y_1 = m(x - x_1)"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "lin-worked-1",
            question: "IMAT 2023 Style: Line through (3, 5) with slope 2.",
            hints: ["Point-slope form.", "Solve for y."],
            solution: "y = 2x − 1.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "y = mx + b: m = slope, b = y-intercept",
          "Slope = (y₂ − y₁)/(x₂ − x₁)",
          "Parallel: same m; Perpendicular: m₁×m₂ = −1",
          "Horizontal: m = 0; Vertical: m undefined",
          "Point-slope: y − y₁ = m(x − x₁)",
          "x-intercept: solve 0 = mx + b",
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
      id: "lin-q1",
      type: "multiple-choice",
      prompt: "What is the slope of a line perpendicular to y = 3x − 7?",
      options: ["−3", "−1/3", "1/3", "3"],
      answer: "−1/3",
      explanation:
        "Perpendicular slopes are negative reciprocals. Original slope is 3, so perpendicular slope is −1/3.",
      difficulty: "recall",
    },
    {
      id: "lin-q2",
      type: "multiple-choice",
      prompt: "Find the equation of the line through (2, 5) with slope 4.",
      options: ["y = 4x + 5", "y = 4x − 3", "y = 4x + 3", "y = 2x + 1"],
      answer: "y = 4x − 3",
      explanation:
        "Point-slope: y − 5 = 4(x − 2) → y = 4x − 8 + 5 → y = 4x − 3.",
      difficulty: "apply",
    },
    {
      id: "lin-q3",
      type: "true-false",
      prompt: "Two lines with slopes m₁ = 5 and m₂ = −1/5 are perpendicular.",
      answer: "True",
      explanation:
        "m₁ × m₂ = 5 × (−1/5) = −1. When the product of slopes equals −1, the lines are perpendicular.",
      difficulty: "recall",
    },
    {
      id: "lin-q4",
      type: "fill-blank",
      prompt: "What is the y-intercept of the line 5x + 2y = 10?",
      answer: "5",
      explanation: "Rewrite: 2y = −5x + 10 → y = −(5/2)x + 5. y-intercept = 5.",
      difficulty: "apply",
    },
    {
      id: "lin-q5",
      type: "multiple-choice",
      prompt: "What is the slope of the line 3x − 6y = 12?",
      options: ["3", "1/2", "−1/2", "2"],
      answer: "1/2",
      explanation: "Rearrange: −6y = −3x + 12 → y = (1/2)x − 2. Slope = 1/2.",
      difficulty: "apply",
    },
    {
      id: "lin-q6",
      type: "multiple-choice",
      prompt: "A line has slope 0. What can you conclude?",
      options: [
        "It is vertical",
        "It is horizontal",
        "It passes through the origin",
        "It has no y-intercept",
      ],
      answer: "It is horizontal",
      explanation:
        "A line with slope 0 is horizontal (y = constant). The y-value never changes regardless of x.",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "equations-inequalities",
    "quadratic-functions",
    "uniform-motion",
    "polynomials",
  ],
};

export default linearFunctionsNote;
