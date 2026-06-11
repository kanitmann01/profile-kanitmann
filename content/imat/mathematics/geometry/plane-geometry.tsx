"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "plane-qf-1",
    question: "Pythagoras applies to which type of triangle?",
    answer: "right-angled",
    hint: "a² + b² = c²",
    context: "c is the hypotenuse, opposite the right angle",
  },
  {
    id: "plane-qf-2",
    question: "What is the circumference of a circle with radius r?",
    answer: "2πr",
    hint: "Not πr²",
    context: "Area = πr², circumference = 2πr",
  },
  {
    id: "plane-qf-3",
    question: "Sum of interior angles of a pentagon?",
    answer: "540",
    hint: "(n − 2) × 180°",
    context: "n = 5 for a pentagon",
  },
];

export const planeGeometryNote: AtomicNote = {
  slug: "plane-geometry",
  subject: "mathematics",
  topic: "geometry",
  title: "Plane Geometry",
  summary:
    "Properties of angles, triangles (Pythagoras, special triangles, area), circles (circumference, area, arcs, sectors), and polygons. Essential for 1–2 IMAT questions per year and used throughout physics (vector components).",
  memoryHook:
    "'Pythagoras: a² + b² = c² — only for RIGHT triangles. c is always the hypotenuse (longest side, opposite the right angle).' Special triangles: 3-4-5, 5-12-13, 30-60-90 (1:√3:2), 45-45-90 (1:1:√2). Circle: circumference = 2πr (the 'rim'), area = πr² (the 'inside').",
  imatTrap:
    "The Pythagorean theorem applies ONLY to right triangles. Area of a triangle = ½ × base × height (height must be perpendicular to base). Circle circumference = 2πr, NOT πr² — a classic slip. For inscribed angles, the angle is HALF the intercepted arc. Arc length uses the central angle, not the inscribed angle.",
  whyItMatters:
    "Plane geometry appears in 1–2 IMAT questions per year. Triangle and circle properties are the most tested. Pythagoras is used in physics (vector components, right-triangle trigonometry). Knowing special triangles saves time on calculation-heavy problems.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Pythagorean theorem and special right triangles",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "medium",
      notes: "Circle geometry: arc length, sector area",
    },
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Angle properties (parallel lines, triangles, polygons)",
    },
  ],
  equations: [
    {
      id: "plane-pythagoras",
      latex: "a^2 + b^2 = c^2",
      description: "Pythagorean theorem (right triangles only!)",
      variables: "c = hypotenuse (longest side, opposite the right angle)",
    },
    {
      id: "plane-triangle-area",
      latex: "A = \\frac{1}{2} \\times \\text{base} \\times \\text{height}",
      description: "Area of a triangle",
      variables: "height must be perpendicular to base",
    },
    {
      id: "plane-circle-circumference",
      latex: "C = 2\\pi r",
      description: "Circumference of a circle",
    },
    {
      id: "plane-circle-area",
      latex: "A = \\pi r^2",
      description: "Area of a circle",
    },
    {
      id: "plane-arc-length",
      latex: "s = \\frac{\\theta}{360^\\circ} \\times 2\\pi r",
      description: "Arc length for central angle θ (degrees)",
      variables: "θ = central angle in degrees",
    },
    {
      id: "plane-polygon-angles",
      latex: "\\text{Sum of interior angles} = (n - 2) \\times 180^\\circ",
      description: "Sum of interior angles of an n-sided polygon",
    },
  ],
  workedExamples: [
    {
      id: "plane-worked-1",
      question:
        "IMAT 2023 Style: A right triangle has legs of length 5 cm and 12 cm. Find the length of the hypotenuse.",
      hints: [
        "Use Pythagoras: a² + b² = c².",
        "c² = 5² + 12² = 25 + 144 = 169.",
        "c = √169 = 13. This is a 5-12-13 special triangle.",
      ],
      solution:
        "c² = 5² + 12² = 25 + 144 = 169. c = √169 = 13 cm. This is one of the classic Pythagorean triples (5-12-13).",
      imatYear: 2023,
    },
    {
      id: "plane-worked-2",
      question:
        "A circle has a radius of 8 cm. Calculate (a) the circumference and (b) the area of a sector with central angle 45°.",
      hints: [
        "Circumference = 2πr.",
        "Sector area = (θ/360°) × πr².",
        "θ = 45°, r = 8 cm.",
      ],
      solution:
        "(a) C = 2π(8) = 16π cm. (b) Sector area = (45/360) × π(64) = (1/8) × 64π = 8π cm².",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Geometry Basics",
      url: "https://www.khanacademy.org/math/geometry/hs-geo-foundations",
      type: "video",
      description: "Comprehensive series on triangles, circles, and polygons",
    },
    {
      title: "GeoGebra — Interactive Geometry",
      url: "https://www.geogebra.org/geometry",
      type: "simulation",
      description:
        "Visualise triangles, circles, and angle properties interactively",
    },
    {
      title: "Wolfram MathWorld — Pythagorean Theorem",
      url: "https://mathworld.wolfram.com/PythagoreanTheorem.html",
      type: "textbook",
      description: "Historical context, proofs, and applications of Pythagoras",
    },
  ],
  highYieldPoints: [
    "Pythagoras: a² + b² = c² (right triangles ONLY)",
    "Special triangles: 3-4-5, 5-12-13, 30-60-90, 45-45-90",
    "Triangle area = ½ × base × height",
    "Circle: C = 2πr, A = πr²",
    "Arc length = (θ/360°)×2πr; Sector area = (θ/360°)×πr²",
    "Polygon interior sum = (n − 2)×180°",
    "Angles on a line sum to 180°; around a point sum to 360°",
  ],
  explanation: (
    <div>
      <p>
        <strong>Plane geometry</strong> covers angles, triangles, circles, and
        polygons. These appear in 1–2 IMAT questions per year and are
        foundational for physics (vector components, circular motion) and
        trigonometry.
      </p>

      <h3>Angle Facts</h3>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg border bg-card p-3">
          <p className="text-sm">
            Angles on a straight line: <strong>180°</strong>
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <p className="text-sm">
            Angles around a point: <strong>360°</strong>
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <p className="text-sm">
            Vertically opposite angles: <strong>equal</strong>
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <p className="text-sm">
            Angles in a triangle: <strong>180°</strong>
          </p>
        </div>
      </div>

      <h3>Triangles</h3>
      <p className="mb-3">
        The <strong>Pythagorean theorem</strong> is the most tested geometry
        topic on the IMAT. Memorise the common triples.
      </p>
      <EquationBlock
        equation={{
          id: "plane-pythagoras",
          latex: "a^2 + b^2 = c^2",
          description: "Must be a RIGHT triangle — c is the hypotenuse",
        }}
      />

      <EquationBlock
        equation={{
          id: "plane-triangle-area",
          latex: "A = \\frac{1}{2} \\times \\text{base} \\times \\text{height}",
          description: "Height must be perpendicular to base",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">30-60-90</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Sides: 1 : √3 : 2
          </p>
          <p className="text-xs text-muted-foreground">
            Short leg opposite 30°
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">45-45-90</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Sides: 1 : 1 : √2
          </p>
          <p className="text-xs text-muted-foreground">
            Isosceles right triangle
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Circles</h3>
      <div className="grid gap-3 mb-4">
        <EquationBlock
          equation={{
            id: "plane-circle-circumference",
            latex: "C = 2\\pi r",
            description: "Circumference = distance around the circle",
          }}
        />
        <EquationBlock
          equation={{
            id: "plane-circle-area",
            latex: "A = \\pi r^2",
            description: "Area = space inside the circle",
          }}
        />
        <EquationBlock
          equation={{
            id: "plane-arc-length",
            latex: "s = \\frac{\\theta}{360^\\circ} \\times 2\\pi r",
            description: "Arc length: fraction of circumference",
          }}
        />
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Polygons</h3>
      <p className="mb-3">
        Any n-sided polygon can be divided into (n − 2) triangles:
      </p>
      <EquationBlock
        equation={{
          id: "plane-polygon-angles",
          latex: "\\text{Sum} = (n - 2) \\times 180^\\circ",
          description: "Each triangle contributes 180° to the sum",
        }}
      />

      <h3>Step Solver: Special Triangle</h3>
      <StepSolver
        problem="In a 30-60-90 triangle, the shortest side is 4 cm. Find the other sides."
        steps={[
          {
            label: "Identify the ratio",
            answer: "1",
            hint: "Sides are 1 : √3 : 2. Shortest is opposite 30°.",
          },
          {
            label: "Find the longer leg",
            answer: "6.93",
            hint: "Longer leg = short × √3 = 4 × 1.732 = 6.93 cm",
          },
          {
            label: "Find the hypotenuse",
            answer: "8",
            hint: "Hypotenuse = short × 2 = 4 × 2 = 8 cm",
          },
        ]}
        equation="30\\text{-}60\\text{-}90: 1 : \\sqrt{3} : 2"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "plane-worked-1",
            question:
              "IMAT 2023 Style: Right triangle legs 5 cm and 12 cm. Hypotenuse?",
            hints: ["Pythagoras: a² + b² = c²", "5-12-13 triple."],
            solution: "c = 13 cm.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Pythagoras: a² + b² = c² (right triangles only)",
          "Special triangles: 3-4-5, 5-12-13, 30-60-90, 45-45-90",
          "Circle: C = 2πr, A = πr²",
          "Arc: s = (θ/360°)×2πr; Sector A = (θ/360°)×πr²",
          "Polygon angles sum = (n−2)×180°",
          "Area = ½ × base × height",
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
      id: "plane-q1",
      type: "multiple-choice",
      prompt:
        "A right triangle has legs of length 6 and 8. What is the hypotenuse?",
      options: ["10", "12", "14", "√48"],
      answer: "10",
      explanation:
        "By Pythagoras: c = √(36 + 64) = √100 = 10. A 6-8-10 triangle (scaled 3-4-5).",
      difficulty: "recall",
    },
    {
      id: "plane-q2",
      type: "multiple-choice",
      prompt: "What is the sum of interior angles of a hexagon?",
      options: ["360°", "540°", "720°", "900°"],
      answer: "720°",
      explanation: "Sum = (n − 2) × 180° = (6 − 2) × 180° = 720°.",
      difficulty: "recall",
    },
    {
      id: "plane-q3",
      type: "multiple-choice",
      prompt: "A circle has radius 5 cm. What is its area?",
      options: ["10π cm²", "25π cm²", "50π cm²", "5π cm²"],
      answer: "25π cm²",
      explanation: "Area = πr² = π(5)² = 25π cm².",
      difficulty: "recall",
    },
    {
      id: "plane-q4",
      type: "fill-blank",
      prompt:
        "What is the arc length (in cm) of a 90° sector in a circle of radius 10 cm? (Answer in terms of π)",
      answer: "5π",
      explanation: "Arc = (θ/360°)×2πr = (90/360)×2π(10) = (1/4)×20π = 5π cm.",
      difficulty: "apply",
    },
    {
      id: "plane-q5",
      type: "multiple-choice",
      prompt:
        "In a 45-45-90 triangle, if one leg is 7, what is the hypotenuse?",
      options: ["7", "7√2", "14", "7√3"],
      answer: "7√2",
      explanation:
        "In a 45-45-90 triangle, sides are in ratio 1:1:√2. Hypotenuse = leg × √2 = 7√2.",
      difficulty: "apply",
    },
    {
      id: "plane-q6",
      type: "multiple-choice",
      prompt:
        "A triangle has angles 50°, 60°, and 70°. Which statement is true?",
      options: [
        "It is a right triangle",
        "It is an isosceles triangle",
        "It is a scalene triangle",
        "It cannot exist",
      ],
      answer: "It is a scalene triangle",
      explanation:
        "All three angles are different, so all three sides are different. This is a scalene triangle. 50° + 60° + 70° = 180°, so it exists.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["solid-geometry", "equations-inequalities", "trigonometry"],
};

export default planeGeometryNote;
