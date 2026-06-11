import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "quadratic-functions",
  subject: "mathematics",
  topic: "functions",
  title: "Quadratic Functions",
  summary:
    "Standard form, vertex form, axis of symmetry, discriminant, and the nature of roots of quadratic functions.",
  memoryHook:
    '"Vertex = (−b/2a, f(−b/2a))" — The x-coordinate of the vertex is always −b/2a. Plug it back in for y. The parabola opens UP if a > 0, DOWN if a < 0.',
  imatTrap:
    "The discriminant Δ = b² − 4ac tells you the NUMBER of real roots, not their values. Δ > 0 → 2 real roots, Δ = 0 → 1 repeated root, Δ < 0 → 0 real roots. Vertex form is y = a(x − h)² + k, where vertex = (h, k) — note the MINUS sign before h.",
  whyItMatters:
    "Quadratic functions appear in projectile motion, optimization (max/min area, profit), and curve-sketching questions. The vertex gives the maximum or minimum value — a classic IMAT optimization shortcut.",
  explanation: (
    <div>
      <h3>Standard Form</h3>
      <p>
        <strong>f(x) = ax² + bx + c</strong>, where a ≠ 0.
      </p>
      <ul>
        <li>a &gt; 0 → parabola opens upward (minimum at vertex)</li>
        <li>a &lt; 0 → parabola opens downward (maximum at vertex)</li>
      </ul>
      <h3>Vertex Form</h3>
      <p>
        <strong>f(x) = a(x − h)² + k</strong>, where vertex = (h, k).
      </p>
      <p>Convert from standard form: h = −b/(2a), k = f(h).</p>
      <h3>Axis of Symmetry</h3>
      <p>
        The vertical line <strong>x = −b/(2a)</strong> passes through the vertex
        and divides the parabola into two mirror halves.
      </p>
      <h3>Discriminant & Roots</h3>
      <p>Δ = b² − 4ac determines root type:</p>
      <ul>
        <li>
          Δ &gt; 0 → two distinct real roots (parabola crosses x-axis twice)
        </li>
        <li>Δ = 0 → one repeated root (parabola touches x-axis)</li>
        <li>Δ &lt; 0 → no real roots (parabola doesn't cross x-axis)</li>
      </ul>
      <h3>Roots (x-intercepts)</h3>
      <p>
        Set f(x) = 0 and solve using factoring, completing the square, or the
        quadratic formula.
      </p>
    </div>
  ),
  questions: [
    {
      id: "quad-q1",
      type: "multiple-choice",
      prompt: "What is the vertex of f(x) = 2(x − 3)² + 5?",
      answer: "(3, 5)",
      explanation:
        "In vertex form f(x) = a(x − h)² + k, the vertex is (h, k) = (3, 5).",
      difficulty: "recall",
      options: ["(3, 5)", "(−3, 5)", "(3, −5)", "(−3, −5)"],
    },
    {
      id: "quad-q2",
      type: "multiple-choice",
      prompt: "How many real roots does x² + 4x + 5 = 0 have?",
      answer: "0 (no real roots)",
      explanation:
        "Δ = 16 − 20 = −4 < 0. A negative discriminant means no real roots.",
      difficulty: "apply",
      options: [
        "0 (no real roots)",
        "1 repeated root",
        "2 distinct roots",
        "Cannot be determined",
      ],
    },
    {
      id: "quad-q3",
      type: "multiple-choice",
      prompt: "The axis of symmetry of f(x) = 3x² − 12x + 7 is:",
      answer: "x = 2",
      explanation: "x = −b/(2a) = −(−12)/(2·3) = 12/6 = 2.",
      difficulty: "apply",
      options: ["x = 2", "x = −2", "x = 4", "x = 6"],
    },
  ],
  crosslinks: ["equations-inequalities", "polynomials", "linear-functions"],
};

export default note;
