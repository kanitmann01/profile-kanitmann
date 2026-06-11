"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "coulomb-qf-1",
    question:
      "If distance between two charges doubles, the force becomes what fraction?",
    answer: "1/4",
    hint: "Inverse-square law: F ∝ 1/r²",
    context: "Coulomb's law is an inverse-square law",
  },
  {
    id: "coulomb-qf-2",
    question:
      "Do electric field lines go from positive to negative, or negative to positive?",
    answer: "positive to negative",
    hint: "By convention, direction of force on a positive test charge",
    context: "Field line direction",
  },
  {
    id: "coulomb-qf-3",
    question: "What is Coulomb's constant k (approximately)?",
    answer: "9e9",
    hint: "9 × 10⁹ N·m²/C²",
    context: "Memorize this value",
  },
];

export const coulombsLawNote: AtomicNote = {
  slug: "coulombs-law",
  subject: "physics",
  topic: "electrostatics-electrodynamics",
  title: "Coulomb's Law and Electric Fields",
  summary:
    "Coulomb's law describes the electrostatic force between two point charges: F = kq₁q₂/r². Like charges repel, opposite charges attract. The electric field E = F/q describes the force per unit charge at any point in space.",
  memoryHook:
    "'Coulomb looks like Newton's gravity but with charges: F = kq₁q₂/r².' k = 9 × 10⁹ N·m²/C². 'Like repels, opposites attract' — opposite to gravity which only attracts. Electric field lines go FROM positive TO negative.",
  imatTrap:
    "The force is proportional to 1/r², not 1/r. Doubling the distance quarters the force (not halves it). Also: the force on each charge is EQUAL in magnitude (Newton's 3rd law), even if one charge is much larger. Don't confuse charge (C) with electric field (N/C or V/m). The electric field due to a point charge is E = kQ/r² (not E = kQ/r).",
  whyItMatters:
    "Electrostatic forces hold atoms and molecules together (ionic bonds), drive nerve impulses (ion movement across membranes), and are fundamental to DNA structure (phosphate backbone charges). Defibrillators use electric fields to reset heart rhythm. Understanding Coulomb's law is essential for grasping chemical bonding and neurophysiology.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Inverse-square force calculations",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Electric field lines and point charge fields",
    },
    {
      years: [2022, 2024],
      frequency: "low",
      notes: "Comparison with gravitational force",
    },
  ],
  equations: [
    {
      id: "coulomb-law",
      latex: "F = k\\frac{|q_1||q_2|}{r^2}",
      description:
        "Coulomb's law: electrostatic force between two point charges",
      variables: "k = 8.99 × 10⁹ N·m²/C², q = charge (C), r = distance (m)",
    },
    {
      id: "coulomb-electric-field",
      latex: "E = \\frac{F}{q}",
      description: "Electric field = force per unit positive test charge",
      variables:
        "E = electric field (N/C or V/m), F = force (N), q = test charge (C)",
    },
    {
      id: "coulomb-point-charge",
      latex: "E = \\frac{kQ}{r^2}",
      description: "Electric field due to a point charge Q at distance r",
      variables: "Q = source charge (C), r = distance from Q (m)",
    },
  ],
  workedExamples: [
    {
      id: "coulomb-worked-1",
      question:
        "IMAT 2023 Style: Two point charges of +3 μC and −6 μC are placed 0.3 m apart. Calculate the magnitude of the electrostatic force between them. (k = 9 × 10⁹ N·m²/C², 1 μC = 10⁻⁶ C)",
      hints: [
        "Convert charges to coulombs: 1 μC = 10⁻⁶ C.",
        "Coulomb's law: F = k|q₁||q₂|/r².",
        "The force is attractive (opposite charges).",
      ],
      solution:
        "|q₁| = 3 × 10⁻⁶ C, |q₂| = 6 × 10⁻⁶ C, r = 0.3 m. F = (9×10⁹)(3×10⁻⁶)(6×10⁻⁶)/(0.3)² = (9×10⁹)(18×10⁻¹²)/0.09 = 162×10⁻³/0.09 = 1.8 N. The force is attractive.",
      imatYear: 2023,
    },
    {
      id: "coulomb-worked-2",
      question:
        "At what distance from a +4 μC charge is the electric field strength 9 × 10⁵ N/C? (k = 9 × 10⁹ N·m²/C²)",
      hints: [
        "Use E = kQ/r² and solve for r.",
        "Convert 4 μC to coulombs.",
        "r² = kQ/E, then take square root.",
      ],
      solution:
        "Q = 4 × 10⁻⁶ C. E = 9 × 10⁵ N/C. r² = kQ/E = (9×10⁹)(4×10⁻⁶)/(9×10⁵) = (36×10³)/(9×10⁵) = 4 × 10⁻² = 0.04. r = √0.04 = 0.2 m = 20 cm.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Coulomb's Law",
      url: "https://phet.colorado.edu/en/simulations/coulombs-law",
      type: "simulation",
      description:
        "Adjust charges and distance to see force change in real time",
    },
    {
      title: "Khan Academy — Coulomb's Law",
      url: "https://www.khanacademy.org/science/physics/electric-charge-electric-force-and-voltage/coulombs-law/v/coulombs-law",
      type: "video",
      description: "Conceptual explanation with worked examples",
    },
    {
      title: "HyperPhysics — Electric Field",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/elefie.html",
      type: "textbook",
      description: "Detailed reference on electric fields and Coulomb's law",
    },
  ],
  highYieldPoints: [
    "F = k|q₁||q₂|/r² — inverse-square law",
    "k = 9 × 10⁹ N·m²/C² (memorise this!)",
    "Like charges repel, opposite charges attract",
    "Electric field: E = F/q = kQ/r²",
    "Field lines: from + to −; never cross",
    "Force on each charge is equal (Newton's 3rd law)",
    "Electrostatic force ~10³⁶ × stronger than gravity",
  ],
  explanation: (
    <div>
      <p>
        <strong>Coulomb's law</strong> describes the electric force between
        charged particles. It has the same inverse-square form as Newton's law
        of gravity, but with a key difference: charges can attract{" "}
        <strong>or</strong> repel, while gravity only attracts.
      </p>

      <h3>Coulomb's Law</h3>
      <EquationBlock
        equation={{
          id: "coulomb-law",
          latex: "F = k\\frac{|q_1||q_2|}{r^2}",
          description:
            "Force magnitude: attractive if opposite signs, repulsive if like signs",
          variables: "k = 9 × 10⁹ N·m²/C², q = charge (C), r = distance (m)",
        }}
      />

      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>
          Inverse-square: double r → force drops to <strong>¼</strong>
        </li>
        <li>Attractive for opposite charges, repulsive for like charges</li>
        <li>
          Each charge experiences the <strong>same magnitude</strong> of force
          (3rd law)
        </li>
      </ul>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Electric Field</h3>
      <p className="mb-3">
        An <strong>electric field</strong> exists in the space around any
        charge. It tells us the force a positive test charge would experience at
        any point.
      </p>

      <EquationBlock
        equation={{
          id: "coulomb-electric-field",
          latex: "E = \\frac{F}{q}",
          description: "Electric field = force per unit charge",
          variables: "E in N/C or V/m",
        }}
      />

      <EquationBlock
        equation={{
          id: "coulomb-point-charge",
          latex: "E = \\frac{kQ}{r^2}",
          description: "Field due to a point charge",
          variables: "Q = source charge, r = distance",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Field Direction
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Away from <strong>+</strong> charges
            <br />
            Toward <strong>−</strong> charges
            <br />
            Lines <strong>never cross</strong>
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">
            Comparison with Gravity
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Both: F ∝ 1/r²
            <br />
            Gravity: always attractive
            <br />
            Electric: ~10³⁶ × stronger
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Step Solver: Coulomb's Law</h3>
      <StepSolver
        problem="Two charges: +2 μC and +4 μC, separated by 0.2 m. Find force (k = 9×10⁹)."
        steps={[
          {
            label: "Convert charges to C",
            answer: "0.000002",
            hint: "+2 μC = 2 × 10⁻⁶ C",
          },
          {
            label: "Apply Coulomb's law numerator",
            answer: "0.072",
            hint: "k × q₁ × q₂ = 9×10⁹ × 2×10⁻⁶ × 4×10⁻⁶",
          },
          {
            label: "Divide by r²",
            answer: "1.8",
            hint: "r² = 0.04. 0.072 / 0.04 = 1.8 N (repulsive since both +)",
          },
        ]}
        equation="F = k\\frac{q_1 q_2}{r^2}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "coulomb-worked-1",
            question:
              "IMAT 2023 Style: +3 μC and −6 μC at 0.3 m. Find force magnitude.",
            hints: [
              "Convert μC to C.",
              "F = k|q₁||q₂|/r².",
              "Force is attractive (opposite signs).",
            ],
            solution: "F = 1.8 N, attractive.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "F = k|q₁||q₂|/r² (inverse-square)",
          "k = 9 × 10⁹ N·m²/C²",
          "Like repel, opposites attract",
          "E = F/q = kQ/r²",
          "Field lines: + → − , never cross",
          "~10³⁶ × gravity's strength",
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
      id: "coulomb-q1",
      type: "multiple-choice",
      prompt:
        "Two point charges are separated by distance r. If the distance is doubled, the electrostatic force between them:",
      options: ["Is halved", "Is quartered", "Is doubled", "Remains the same"],
      answer: "Is quartered",
      explanation:
        "Coulomb's law is an inverse-square law: F ∝ 1/r². Doubling r → F becomes F/(2²) = F/4.",
      difficulty: "apply",
    },
    {
      id: "coulomb-q2",
      type: "multiple-choice",
      prompt: "In which direction do electric field lines point?",
      options: [
        "From negative to positive charges",
        "From positive to negative charges",
        "Parallel to the force on a negative charge",
        "In circles around the charges",
      ],
      answer: "From positive to negative charges",
      explanation:
        "By convention, electric field lines point in the direction of force on a positive test charge — away from positive and toward negative charges.",
      difficulty: "recall",
    },
    {
      id: "coulomb-q3",
      type: "fill-blank",
      prompt:
        "Two charges of +2 C and −3 C are 1 m apart. What is the magnitude of the force? (k = 9 × 10⁹ N·m²/C², give answer in scientific notation as '54e9')",
      answer: "54e9",
      explanation:
        "F = k|q₁||q₂|/r² = 9×10⁹ × 2 × 3 / 1² = 54 × 10⁹ = 5.4 × 10¹⁰ N.",
      difficulty: "apply",
    },
    {
      id: "coulomb-q4",
      type: "multiple-choice",
      prompt:
        "What is the electric field 0.3 m from a +9 μC charge? (k = 9 × 10⁹ N·m²/C²)",
      options: ["9 × 10⁵ N/C", "3 × 10⁵ N/C", "9 × 10³ N/C", "3 × 10³ N/C"],
      answer: "9 × 10⁵ N/C",
      explanation:
        "E = kQ/r² = (9×10⁹)(9×10⁻⁶)/(0.3)² = 81×10³/0.09 = 900,000 = 9 × 10⁵ N/C.",
      difficulty: "apply",
      imatYear: 2022,
    },
    {
      id: "coulomb-q5",
      type: "true-false",
      prompt:
        "True or False: If you triple the distance between two charges, the electric force becomes one-ninth of its original value.",
      answer: "True",
      explanation:
        "F ∝ 1/r². Tripling r means F ∝ 1/9. The force drops to 1/9 of its original value.",
      difficulty: "recall",
    },
    {
      id: "coulomb-q6",
      type: "multiple-choice",
      prompt:
        "Which statement correctly compares electric force with gravitational force?",
      options: [
        "Both can be attractive or repulsive",
        "Electric force is weaker than gravity",
        "Both follow inverse-square laws",
        "Gravity depends on charge",
      ],
      answer: "Both follow inverse-square laws",
      explanation:
        "Both F_electric = kq₁q₂/r² and F_gravity = Gm₁m₂/r² are inverse-square laws. Gravity is always attractive and much weaker.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["ohms-law", "forces", "si-units", "newton-laws"],
  prerequisites: ["si-units"],
};
