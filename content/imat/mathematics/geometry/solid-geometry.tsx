import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "solid-geometry",
  subject: "mathematics",
  topic: "geometry",
  title: "Solid Geometry",
  summary:
    "Volume and surface area of cubes, rectangular prisms, cylinders, spheres, and cones.",
  memoryHook:
    '"Volume = Base Area × Height" — works for prisms AND cylinders. For cones and pyramids, multiply by 1/3. Sphere = (4/3)πr³ — just memorize it.',
  imatTrap:
    "A cone's volume is (1/3)πr²h — don't forget the 1/3. Surface area of a sphere = 4πr² (NOT 4/3 πr³ — that's volume). Lateral surface area of a cone = πrl, where l is the slant height, NOT the vertical height. Don't mix up radius and diameter.",
  whyItMatters:
    "Solid geometry questions in IMAT often combine formulas with unit conversions or real-world contexts (tank filling, packaging optimization). Knowing the formulas cold saves crucial time.",
  explanation: (
    <div>
      <h3>Cube (side = a)</h3>
      <ul>
        <li>Volume = a³</li>
        <li>Surface area = 6a²</li>
      </ul>
      <h3>Rectangular Prism (l × w × h)</h3>
      <ul>
        <li>Volume = l × w × h</li>
        <li>Surface area = 2(lw + lh + wh)</li>
      </ul>
      <h3>Cylinder (radius r, height h)</h3>
      <ul>
        <li>Volume = πr²h</li>
        <li>Surface area = 2πr² + 2πrh (two circles + lateral rectangle)</li>
      </ul>
      <h3>Sphere (radius r)</h3>
      <ul>
        <li>Volume = (4/3)πr³</li>
        <li>Surface area = 4πr²</li>
      </ul>
      <h3>Cone (radius r, height h, slant height l)</h3>
      <ul>
        <li>Volume = (1/3)πr²h</li>
        <li>Lateral surface area = πrl</li>
        <li>Slant height: l = √(r² + h²)</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "solid-q1",
      type: "multiple-choice",
      prompt: "A cylinder has radius 3 cm and height 7 cm. What is its volume?",
      answer: "63π cm³",
      explanation: "V = πr²h = π(9)(7) = 63π cm³.",
      difficulty: "apply",
      options: ["21π cm³", "42π cm³", "63π cm³", "189π cm³"],
    },
    {
      id: "solid-q2",
      type: "multiple-choice",
      prompt:
        "If the radius of a sphere is doubled, its volume increases by a factor of:",
      answer: "8",
      explanation:
        "V = (4/3)πr³. If r → 2r, V → (4/3)π(2r)³ = 8 × (4/3)πr³. Volume scales with the cube of the radius.",
      difficulty: "apply",
      options: ["2", "4", "6", "8"],
    },
    {
      id: "solid-q3",
      type: "multiple-choice",
      prompt:
        "A cone has radius 4 cm and height 3 cm. What is its slant height?",
      answer: "5 cm",
      explanation:
        "l = √(r² + h²) = √(16 + 9) = √25 = 5 cm. A 3-4-5 right triangle.",
      difficulty: "apply",
      options: ["5 cm", "7 cm", "√7 cm", "12 cm"],
    },
  ],
  crosslinks: ["plane-geometry", "equations-inequalities"],
};

export default note;
