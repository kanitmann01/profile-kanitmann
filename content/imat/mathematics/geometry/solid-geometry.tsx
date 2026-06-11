"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "solid-qf-1",
    question: "What is the volume of a sphere?",
    answer: "(4/3)πr³",
    hint: "Four-thirds pi r cubed",
    context: "Memorise this cold!",
  },
  {
    id: "solid-qf-2",
    question: "If you double the radius of a sphere, volume multiplies by:",
    answer: "8",
    hint: "Volume scales with r³",
    context: "2³ = 8",
  },
  {
    id: "solid-qf-3",
    question: "What is the slant height of a cone with r = 3, h = 4?",
    answer: "5",
    hint: "l = √(r² + h²) — Pythagoras",
    context: "3-4-5 triangle",
  },
];

export const solidGeometryNote: AtomicNote = {
  slug: "solid-geometry",
  subject: "mathematics",
  topic: "geometry",
  title: "Solid Geometry",
  summary:
    "Volume and surface area formulas for cubes, rectangular prisms, cylinders, spheres, and cones. IMAT tests formula recall combined with unit conversions or real-world contexts.",
  memoryHook:
    "'Volume = Base Area × Height' — works for prisms AND cylinders. 'Cones and pyramids: ⅓ of that — you get ⅓ the volume of a cylinder with the same base and height.' Sphere: V = ⁴⁄₃πr³, SA = 4πr². 'The 4 in SA is from 4 circles of radius r.'",
  imatTrap:
    "A cone's volume is (1/3)πr²h — don't forget the 1/3. Surface area of a sphere = 4πr² (NOT 4/3πr³ — that's volume). Lateral surface area of a cone = πrl, where l is the SLANT height (not the vertical height). Don't mix up radius and diameter. Volume scales with the CUBE of linear dimensions — doubling radius multiplies volume by 8.",
  whyItMatters:
    "Solid geometry questions in IMAT often combine formulas with unit conversions or real-world contexts (tank filling, packaging optimisation, medical dosing by body surface area). Knowing the formulas cold saves crucial time. Body surface area (BSA) formulas in medicine are derived from solid geometry principles.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Volume calculations: cylinder, sphere, cone",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Surface area calculations",
    },
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Scaling: effect of doubling dimensions on volume/SA",
    },
  ],
  equations: [
    {
      id: "solid-cube",
      latex: "V = a^3,\\quad SA = 6a^2",
      description: "Cube of side length a",
    },
    {
      id: "solid-prism",
      latex: "V = lwh,\\quad SA = 2(lw + lh + wh)",
      description: "Rectangular prism: l = length, w = width, h = height",
    },
    {
      id: "solid-cylinder",
      latex: "V = \\pi r^2 h,\\quad SA = 2\\pi r^2 + 2\\pi rh",
      description:
        "Cylinder: V = base area × height; SA = 2 circles + lateral surface",
    },
    {
      id: "solid-sphere",
      latex: "V = \\frac{4}{3}\\pi r^3,\\quad SA = 4\\pi r^2",
      description: "Sphere: formulas worth memorising verbatim",
    },
    {
      id: "solid-cone",
      latex:
        "V = \\frac{1}{3}\\pi r^2 h,\\quad SA_{\\text{lateral}} = \\pi r l",
      description:
        "Cone: V = ⅓ × cylinder volume; l = slant height = √(r² + h²)",
      variables: "l = slant height, h = vertical height, r = radius",
    },
  ],
  workedExamples: [
    {
      id: "solid-worked-1",
      question:
        "IMAT 2023 Style: A cylindrical water tank has radius 3 m and height 5 m. What is its volume in m³?",
      hints: [
        "Cylinder volume = πr²h.",
        "r = 3 m, h = 5 m.",
        "V = π(9)(5) = 45π m³.",
      ],
      solution:
        "V = πr²h = π(3²)(5) = π(9)(5) = 45π m³. This is approximately 141.4 m³.",
      imatYear: 2023,
    },
    {
      id: "solid-worked-2",
      question:
        "A cone and a cylinder have the same radius (4 cm) and the same height (9 cm). What is the ratio of their volumes?",
      hints: [
        "V_cylinder = πr²h.",
        "V_cone = (1/3)πr²h.",
        "The cone is exactly ⅓ of the cylinder.",
      ],
      solution:
        "V_cylinder = π(16)(9) = 144π cm³. V_cone = (1/3)(144π) = 48π cm³. Ratio V_cone : V_cylinder = 1 : 3.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Solid Geometry",
      url: "https://www.khanacademy.org/math/geometry/hs-geo-solids",
      type: "video",
      description: "Volume and surface area for all common 3D shapes",
    },
    {
      title: "GeoGebra — 3D Calculator",
      url: "https://www.geogebra.org/3d",
      type: "simulation",
      description:
        "Visualise 3D shapes and explore volume/surface area interactively",
    },
    {
      title: "Wolfram Alpha — Volume Calculator",
      url: "https://www.wolframalpha.com/input/?i=volume+of+cylinder",
      type: "practice",
      description: "Check your calculations for any solid shape",
    },
  ],
  highYieldPoints: [
    "Cube: V = a³, SA = 6a²",
    "Prism: V = lwh, SA = 2(lw + lh + wh)",
    "Cylinder: V = πr²h, SA = 2πr² + 2πrh",
    "Sphere: V = ⁴⁄₃πr³, SA = 4πr² (memorise!)",
    "Cone: V = ⅓πr²h, lateral SA = πrl (l = slant height)",
    "Volume scales with r³ (doubling r → 8× volume)",
    "SA scales with r² (doubling r → 4× SA)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Solid geometry</strong> deals with 3D shapes. IMAT tests your
        ability to recall and apply volume and surface area formulas quickly.
        Many problems combine formulas with unit conversions or scale factors.
      </p>

      <h3>Key Formulas</h3>

      <div className="grid gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">Cube (side a)</h4>
          <EquationBlock
            equation={{
              id: "solid-cube",
              latex: "V = a^3,\\quad SA = 6a^2",
              description: "All edges equal; 6 identical faces",
            }}
          />
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Rectangular Prism (l × w × h)
          </h4>
          <EquationBlock
            equation={{
              id: "solid-prism",
              latex: "V = lwh,\\quad SA = 2(lw + lh + wh)",
              description: "Opposite faces are equal rectangles",
            }}
          />
        </div>

        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Cylinder</h4>
          <EquationBlock
            equation={{
              id: "solid-cylinder",
              latex: "V = \\pi r^2 h,\\quad SA = 2\\pi r^2 + 2\\pi rh",
              description: "Two circles + one rolled rectangle",
            }}
          />
        </div>

        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">Sphere</h4>
          <EquationBlock
            equation={{
              id: "solid-sphere",
              latex: "V = \\frac{4}{3}\\pi r^3,\\quad SA = 4\\pi r^2",
              description: "The most-memorised formulas in geometry",
            }}
          />
        </div>

        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">Cone</h4>
          <EquationBlock
            equation={{
              id: "solid-cone",
              latex:
                "V = \\frac{1}{3}\\pi r^2 h,\\quad SA_{\\text{lateral}} = \\pi r l",
              description: "⅓ of a cylinder with same base and height",
              variables: "l = √(r² + h²) — use Pythagoras to find slant height",
            }}
          />
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Scaling Effects</h3>
      <p className="mb-3">
        When linear dimensions change, volume and surface area change
        differently:
      </p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-green-600">Volume</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Scales with r³
            <br />
            Double radius → 8× volume
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-blue-600">Surface Area</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Scales with r²
            <br />
            Double radius → 4× SA
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Step Solver: Cone Volume</h3>
      <StepSolver
        problem="Find the volume of a cone with r = 6 cm and h = 8 cm."
        steps={[
          {
            label: "Apply V = (1/3)πr²h",
            answer: "0.3333",
            hint: "V = (1/3) × π × 36 × 8",
          },
          {
            label: "Calculate πr²h",
            answer: "904.78",
            hint: "π × 36 × 8 = 904.78 cm³",
          },
          {
            label: "Final volume (⅓ of above)",
            answer: "301.6",
            hint: "904.78 / 3 = 301.6 cm³",
          },
        ]}
        equation="V = \\frac{1}{3}\\pi r^2 h"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "solid-worked-1",
            question: "IMAT 2023 Style: Cylinder r = 3 m, h = 5 m. Volume?",
            hints: ["V = πr²h", "Plug in r = 3, h = 5."],
            solution: "V = 45π m³.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Cube: V = a³, SA = 6a²",
          "Cylinder: V = πr²h, SA = 2πr² + 2πrh",
          "Sphere: V = ⁴⁄₃πr³, SA = 4πr²",
          "Cone: V = ⅓πr²h, lateral SA = πrl",
          "Slant height: l = √(r² + h²)",
          "Volume ∝ r³, SA ∝ r²",
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
      id: "solid-q1",
      type: "multiple-choice",
      prompt: "A cylinder has radius 3 cm and height 7 cm. What is its volume?",
      options: ["21π cm³", "42π cm³", "63π cm³", "189π cm³"],
      answer: "63π cm³",
      explanation: "V = πr²h = π(9)(7) = 63π cm³.",
      difficulty: "apply",
    },
    {
      id: "solid-q2",
      type: "multiple-choice",
      prompt:
        "If the radius of a sphere is doubled, its volume increases by a factor of:",
      options: ["2", "4", "6", "8"],
      answer: "8",
      explanation:
        "V = (4/3)πr³. If r → 2r, V → (4/3)π(2r)³ = 8 × (4/3)πr³. Volume scales with r³.",
      difficulty: "apply",
    },
    {
      id: "solid-q3",
      type: "multiple-choice",
      prompt:
        "A cone has radius 4 cm and height 3 cm. What is its slant height?",
      options: ["5 cm", "7 cm", "√7 cm", "12 cm"],
      answer: "5 cm",
      explanation:
        "l = √(r² + h²) = √(16 + 9) = √25 = 5 cm. A 3-4-5 right triangle.",
      difficulty: "apply",
    },
    {
      id: "solid-q4",
      type: "fill-blank",
      prompt:
        "What is the surface area of a sphere with radius 5 cm? (Answer in terms of π)",
      answer: "100π",
      explanation: "SA = 4πr² = 4π(25) = 100π cm².",
      difficulty: "apply",
    },
    {
      id: "solid-q5",
      type: "multiple-choice",
      prompt: "How many faces does a cube have?",
      options: ["4", "6", "8", "12"],
      answer: "6",
      explanation: "A cube has 6 faces, 8 vertices, and 12 edges.",
      difficulty: "recall",
    },
    {
      id: "solid-q6",
      type: "multiple-choice",
      prompt: "A cube has surface area 54 cm². What is its side length?",
      options: ["3 cm", "6 cm", "9 cm", "27 cm"],
      answer: "3 cm",
      explanation: "SA = 6a² → 54 = 6a² → a² = 9 → a = 3 cm.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["plane-geometry", "equations-inequalities", "si-units"],
};

export default solidGeometryNote;
