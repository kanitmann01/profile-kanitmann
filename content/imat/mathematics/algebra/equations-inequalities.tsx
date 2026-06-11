import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "equations-inequalities",
  subject: "mathematics",
  topic: "algebra",
  title: "Equations & Inequalities",
  summary:
    "Solving linear, quadratic, and systems of equations; solving and graphing inequalities including absolute value inequalities.",
  memoryHook:
    '"Balance the Scale" — Whatever you do to one side of an equation, do to the other. For inequalities, flip the sign when multiplying/dividing by a negative.',
  imatTrap:
    "When multiplying or dividing both sides of an inequality by a negative number, the inequality sign FLIPS direction. For |x − a| < b, the solution is a − b < x < a + b (AND). For |x − a| > b, the solution is x < a − b OR x > a + b. Don't forget to check for extraneous solutions in rational equations.",
  whyItMatters:
    "Equations and inequalities are foundational for every IMAT math problem. Systems of equations appear in mixture/rate problems. Absolute value inequalities test sign-flip awareness — a classic IMAT trap.",
  explanation: (
    <div>
      <h3>Linear Equations</h3>
      <p>
        A linear equation in one variable has the form{" "}
        <strong>ax + b = 0</strong>. Solve by isolating x: x = −b/a.
      </p>
      <h3>Systems of Linear Equations</h3>
      <p>
        Two equations, two unknowns. Solve by <strong>substitution</strong> or{" "}
        <strong>elimination</strong>:
      </p>
      <ul>
        <li>
          <strong>Substitution:</strong> Solve one equation for x, plug into the
          other.
        </li>
        <li>
          <strong>Elimination:</strong> Add/subtract equations to cancel a
          variable.
        </li>
      </ul>
      <p>
        A system can have <strong>one solution</strong> (intersecting lines),{" "}
        <strong>no solution</strong> (parallel lines), or{" "}
        <strong>infinitely many</strong> (same line).
      </p>
      <h3>Quadratic Formula</h3>
      <p>For ax² + bx + c = 0:</p>
      <p className="font-mono text-center text-lg">
        x = (−b ± √(b² − 4ac)) / 2a
      </p>
      <p>
        The <strong>discriminant</strong> Δ = b² − 4ac determines root type:
      </p>
      <ul>
        <li>Δ &gt; 0 → two distinct real roots</li>
        <li>Δ = 0 → one repeated real root</li>
        <li>Δ &lt; 0 → no real roots (complex)</li>
      </ul>
      <h3>Inequalities</h3>
      <p>
        Solved like equations, but <strong>flip the sign</strong> when
        multiplying/dividing by a negative. Graph on a number line with
        open/closed circles.
      </p>
      <h3>Absolute Value Inequalities</h3>
      <ul>
        <li>|x − a| &lt; b ⟹ a − b &lt; x &lt; a + b</li>
        <li>|x − a| &gt; b ⟹ x &lt; a − b or x &gt; a + b</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "eq-q1",
      type: "multiple-choice",
      prompt: "Solve: 3x + 7 = 22",
      answer: "x = 5",
      explanation: "Subtract 7: 3x = 15. Divide by 3: x = 5.",
      difficulty: "recall",
      options: ["x = 3", "x = 5", "x = 7", "x = 15"],
    },
    {
      id: "eq-q2",
      type: "multiple-choice",
      prompt:
        "What happens when you multiply both sides of an inequality by −2?",
      answer: "The inequality sign flips direction",
      explanation:
        "Multiplying or dividing both sides of an inequality by a negative number reverses the inequality sign.",
      difficulty: "recall",
      options: [
        "The inequality sign flips direction",
        "The inequality sign stays the same",
        "Both sides become zero",
        "The inequality becomes an equation",
      ],
    },
    {
      id: "eq-q3",
      type: "multiple-choice",
      prompt: "Solve |x − 3| < 5.",
      answer: "−2 < x < 8",
      explanation: "|x − 3| < 5 means −5 < x − 3 < 5, so −2 < x < 8.",
      difficulty: "apply",
      options: [
        "x < −2 or x > 8",
        "−2 < x < 8",
        "−2 ≤ x ≤ 8",
        "x < 2 or x > 8",
      ],
    },
  ],
  crosslinks: ["polynomials", "linear-functions", "quadratic-functions"],
};

export default note;
