import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "linear-functions",
  subject: "mathematics",
  topic: "functions",
  title: "Linear Functions",
  summary:
    "Slope-intercept form (y = mx + b), point-slope form, parallel and perpendicular lines, and real-world linear modelling.",
  memoryHook:
    '"Slope = Rise over Run = Move up / Move across" — m = (y₂ − y₁)/(x₂ − x₁). Parallel lines share the same slope; perpendicular slopes multiply to −1.',
  imatTrap:
    "Perpendicular slopes are NEGATIVE RECIPROCALS: if m₁ = 2, then m₂ = −1/2 (not −2). A horizontal line has slope 0; a vertical line has UNDEFINED slope. Don't confuse the y-intercept (b) with the x-intercept (−b/m).",
  whyItMatters:
    "Linear functions are the most frequently tested IMAT math concept. Rate-of-change problems, distance-time graphs, and proportion questions all reduce to linear reasoning. Slope = rate.",
  explanation: (
    <div>
      <h3>Slope-Intercept Form</h3>
      <p>
        <strong>y = mx + b</strong>, where m = slope, b = y-intercept.
      </p>
      <ul>
        <li>
          <strong>Slope (m):</strong> Rate of change. m = (y₂ − y₁)/(x₂ − x₁)
        </li>
        <li>
          <strong>y-intercept (b):</strong> Where the line crosses the y-axis
          (0, b).
        </li>
      </ul>
      <h3>Point-Slope Form</h3>
      <p>
        Given point (x₁, y₁) and slope m: <strong>y − y₁ = m(x − x₁)</strong>
      </p>
      <h3>Parallel & Perpendicular Lines</h3>
      <ul>
        <li>
          <strong>Parallel:</strong> Same slope (m₁ = m₂), different intercepts.
        </li>
        <li>
          <strong>Perpendicular:</strong> Slopes are negative reciprocals (m₁ ×
          m₂ = −1).
        </li>
      </ul>
      <h3>X-Intercept</h3>
      <p>
        Set y = 0 and solve for x: x = −b/m. The line crosses the x-axis at
        (−b/m, 0).
      </p>
    </div>
  ),
  questions: [
    {
      id: "lin-q1",
      type: "multiple-choice",
      prompt: "What is the slope of a line perpendicular to y = 3x − 7?",
      answer: "−1/3",
      explanation:
        "Perpendicular slopes are negative reciprocals. The original slope is 3, so the perpendicular slope is −1/3.",
      difficulty: "recall",
      options: ["−3", "−1/3", "1/3", "3"],
    },
    {
      id: "lin-q2",
      type: "multiple-choice",
      prompt: "Find the equation of the line through (2, 5) with slope 4.",
      answer: "y = 4x − 3",
      explanation:
        "Using point-slope: y − 5 = 4(x − 2) → y = 4x − 8 + 5 → y = 4x − 3.",
      difficulty: "apply",
      options: ["y = 4x + 5", "y = 4x − 3", "y = 4x + 3", "y = 2x + 1"],
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
  ],
  crosslinks: ["equations-inequalities", "quadratic-functions"],
};

export default note;
