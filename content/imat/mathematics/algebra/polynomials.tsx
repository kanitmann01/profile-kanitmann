import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "polynomials",
  subject: "mathematics",
  topic: "algebra",
  title: "Polynomials",
  summary:
    "Polynomial operations (addition, multiplication, factoring), degree, the Remainder Theorem, and the Factor Theorem.",
  memoryHook:
    '"DEGree = DEepest power" — The degree of a polynomial is the highest exponent. A polynomial of degree n has at most n roots.',
  imatTrap:
    "The Remainder Theorem says dividing P(x) by (x − a) gives remainder P(a) — not P(−a). The Factor Theorem: (x − a) is a factor iff P(a) = 0. Don't confuse degree with number of terms. A polynomial of degree n has at most n real roots, not exactly n.",
  whyItMatters:
    "Polynomials underpin equation-solving in the IMAT. Factoring is the fastest path to roots. The Remainder/Factor Theorems let you evaluate divisibility without long division — a time-saver under exam pressure.",
  explanation: (
    <div>
      <h3>Polynomial Basics</h3>
      <p>
        A polynomial in x: <strong>aₙxⁿ + aₙ₋₁xⁿ⁻¹ + … + a₁x + a₀</strong>. The{" "}
        <strong>degree</strong> is the highest power n.
      </p>
      <ul>
        <li>Degree 1 → linear (ax + b)</li>
        <li>Degree 2 → quadratic (ax² + bx + c)</li>
        <li>Degree 3 → cubic</li>
      </ul>
      <h3>Operations</h3>
      <ul>
        <li>
          <strong>Addition/Subtraction:</strong> Combine like terms only.
        </li>
        <li>
          <strong>Multiplication:</strong> Distribute each term (FOIL for
          binomials).
        </li>
      </ul>
      <h3>Factoring Techniques</h3>
      <ul>
        <li>
          <strong>Common factor:</strong> ab + ac = a(b + c)
        </li>
        <li>
          <strong>Difference of squares:</strong> a² − b² = (a − b)(a + b)
        </li>
        <li>
          <strong>Sum/difference of cubes:</strong> a³ ± b³ = (a ± b)(a² ∓ ab +
          b²)
        </li>
        <li>
          <strong>Quadratic trinomials:</strong> x² + 5x + 6 = (x + 2)(x + 3)
        </li>
      </ul>
      <h3>Remainder & Factor Theorems</h3>
      <p>
        <strong>Remainder Theorem:</strong> Dividing P(x) by (x − a) gives
        remainder P(a).
      </p>
      <p>
        <strong>Factor Theorem:</strong> (x − a) is a factor of P(x) if and only
        if P(a) = 0.
      </p>
    </div>
  ),
  questions: [
    {
      id: "poly-q1",
      type: "multiple-choice",
      prompt:
        "What is the remainder when P(x) = x³ − 2x + 4 is divided by (x − 3)?",
      answer: "25",
      explanation:
        "By the Remainder Theorem, the remainder is P(3) = 27 − 6 + 4 = 25.",
      difficulty: "apply",
      options: ["19", "25", "31", "7"],
    },
    {
      id: "poly-q2",
      type: "multiple-choice",
      prompt: "Factor completely: x² − 9",
      answer: "(x − 3)(x + 3)",
      explanation:
        "Difference of squares: a² − b² = (a − b)(a + b). Here a = x, b = 3.",
      difficulty: "recall",
      options: [
        "(x − 3)(x + 3)",
        "(x − 9)(x + 1)",
        "(x − 3)²",
        "Cannot be factored",
      ],
    },
    {
      id: "poly-q3",
      type: "true-false",
      prompt: "A polynomial of degree 4 always has exactly 4 real roots.",
      answer: "False",
      explanation:
        "A polynomial of degree n has AT MOST n real roots. Some roots may be complex. For example, x⁴ + 1 = 0 has no real roots.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["equations-inequalities", "quadratic-functions"],
};

export default note;
