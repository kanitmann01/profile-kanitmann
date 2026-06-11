import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "plane-geometry",
  subject: "mathematics",
  topic: "geometry",
  title: "Plane Geometry",
  summary:
    "Angles, triangles (area, Pythagoras, special triangles), circles (area, circumference, arc), and regular polygons.",
  memoryHook:
    '"Pythagoras: a² + b² = c² — only for RIGHT triangles. c is always the hypotenuse (longest side, opposite the right angle)."',
  imatTrap:
    "The Pythagorean theorem applies ONLY to right triangles. Area of a triangle = ½ × base × height (height must be perpendicular to base). Circle circumference = 2πr, NOT πr². For inscribed angles, the angle is HALF the intercepted arc — a frequent IMAT trick.",
  whyItMatters:
    "Plane geometry appears in 1–2 IMAT questions per year. Triangle and circle properties are the most tested. Pythagoras is used in physics (vector components) as well.",
  explanation: (
    <div>
      <h3>Angles</h3>
      <ul>
        <li>Angles on a straight line sum to 180°</li>
        <li>Angles around a point sum to 360°</li>
        <li>Vertically opposite angles are equal</li>
        <li>Angles in a triangle sum to 180°</li>
      </ul>
      <h3>Triangles</h3>
      <ul>
        <li>
          <strong>Area</strong> = ½ × base × height
        </li>
        <li>
          <strong>Pythagorean theorem:</strong> a² + b² = c² (right triangles
          only)
        </li>
        <li>
          <strong>Special right triangles:</strong> 3-4-5, 5-12-13, 30-60-90
          (sides 1:√3:2), 45-45-90 (sides 1:1:√2)
        </li>
      </ul>
      <h3>Circles</h3>
      <ul>
        <li>
          <strong>Circumference</strong> = 2πr
        </li>
        <li>
          <strong>Area</strong> = πr²
        </li>
        <li>
          <strong>Arc length</strong> = (θ/360°) × 2πr (θ in degrees)
        </li>
        <li>
          <strong>Sector area</strong> = (θ/360°) × πr²
        </li>
      </ul>
      <h3>Polygons</h3>
      <ul>
        <li>Sum of interior angles of an n-gon = (n − 2) × 180°</li>
        <li>Each interior angle of a regular n-gon = (n − 2) × 180° / n</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "plane-q1",
      type: "multiple-choice",
      prompt:
        "A right triangle has legs of length 6 and 8. What is the hypotenuse?",
      answer: "10",
      explanation:
        "By Pythagoras: c = √(36 + 64) = √100 = 10. This is a 6-8-10 (scaled 3-4-5) triangle.",
      difficulty: "recall",
      options: ["10", "12", "14", "√48"],
    },
    {
      id: "plane-q2",
      type: "multiple-choice",
      prompt: "What is the sum of interior angles of a hexagon?",
      answer: "720°",
      explanation: "Sum = (n − 2) × 180° = (6 − 2) × 180° = 720°.",
      difficulty: "recall",
      options: ["360°", "540°", "720°", "900°"],
    },
    {
      id: "plane-q3",
      type: "multiple-choice",
      prompt: "A circle has radius 5 cm. What is its area?",
      answer: "25π cm²",
      explanation: "Area = πr² = π(5)² = 25π cm².",
      difficulty: "recall",
      options: ["10π cm²", "25π cm²", "50π cm²", "5π cm²"],
    },
  ],
  crosslinks: ["solid-geometry", "equations-inequalities"],
};

export default note;
