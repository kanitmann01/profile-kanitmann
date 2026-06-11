"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "pressure-qf-1",
    question: "What is 1 atm in Pa?",
    answer: "101325",
    hint: "Approximately 10⁵ Pa",
    context: "Standard atmospheric pressure",
  },
  {
    id: "pressure-qf-2",
    question: "Does pressure depend on the shape of the container?",
    answer: "no",
    hint: "Hydrostatic paradox",
    context: "P = ρgh depends only on depth and density",
  },
  {
    id: "pressure-qf-3",
    question:
      "In a hydraulic system, if A₂ = 10 × A₁, force multiplication is?",
    answer: "10",
    hint: "F₁/A₁ = F₂/A₂",
    context: "Pascal's principle mechanical advantage",
  },
];

export const pressureNote: AtomicNote = {
  slug: "pressure",
  subject: "physics",
  topic: "fluid-mechanics",
  title: "Pressure and Pascal's Principle",
  summary:
    "Pressure is force per unit area (P = F/A). In fluids, pressure increases with depth (P = ρgh). Pascal's principle states that pressure applied to an enclosed fluid is transmitted undiminished — the basis of hydraulic systems.",
  memoryHook:
    "'Pressure = Force / Area.' Think of a bed of nails: many nails spread the force → low pressure per nail → no puncture. One nail = same force, tiny area → huge pressure → puncture. In fluids: 'Deeper = heavier column above = more pressure.'",
  imatTrap:
    "Pressure depends on DEPTH, not shape of container. A narrow tube and a wide lake at the same depth have the same pressure — this is the 'hydrostatic paradox.' Also: atmospheric pressure (101,325 Pa ≈ 1 atm) acts on everything — gauge pressure = absolute − atmospheric. Don't forget that pressure is SCALAR (acts in all directions), not a vector.",
  whyItMatters:
    "Blood pressure (120/80 mmHg) is a direct application of fluid pressure. Hydraulic brakes, syringes, and IV drips all use Pascal's principle. Understanding pressure is essential for respiratory physiology (pressure gradients drive breathing) and for understanding how blood flows through the circulatory system.",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Hydrostatic pressure P = ρgh calculations",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Pascal's principle and hydraulic systems",
    },
    {
      years: [2022, 2023],
      frequency: "low",
      notes: "Gauge vs absolute pressure",
    },
  ],
  equations: [
    {
      id: "pressure-definition",
      latex: "P = \\frac{F}{A}",
      description: "Pressure = force per unit area",
      variables: "P = pressure (Pa = N/m²), F = force (N), A = area (m²)",
    },
    {
      id: "pressure-hydrostatic",
      latex: "P = \\rho g h",
      description: "Hydrostatic pressure at depth h in a fluid",
      variables: "ρ = fluid density (kg/m³), g = 9.8 m/s², h = depth (m)",
    },
    {
      id: "pressure-total",
      latex: "P_{\\text{abs}} = P_0 + \\rho g h",
      description: "Absolute pressure = atmospheric + hydrostatic",
      variables: "P₀ = surface/atmospheric pressure (Pa)",
    },
    {
      id: "pressure-pascal",
      latex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2}",
      description: "Pascal's principle: pressure transmitted equally",
      variables: "F₁, A₁ = input force/area; F₂, A₂ = output force/area",
    },
  ],
  workedExamples: [
    {
      id: "pressure-worked-1",
      question:
        "IMAT 2023 Style: A diver descends to a depth of 20 m in seawater (ρ = 1025 kg/m³). What is the total pressure experienced by the diver? (g = 10 m/s², atmospheric pressure = 101,325 Pa)",
      hints: [
        "The hydrostatic pressure depends on the depth and density of the fluid above.",
        "Use P_hydrostatic = ρgh.",
        "Total pressure = atmospheric + hydrostatic pressure.",
      ],
      solution:
        "P_hydrostatic = 1025 × 10 × 20 = 205,000 Pa = 2.05 × 10⁵ Pa. Total = 101,325 + 205,000 = 306,325 Pa ≈ 3.02 atm. Every 10 m of water adds approximately 1 atm of pressure.",
      imatYear: 2023,
    },
    {
      id: "pressure-worked-2",
      question:
        "A hydraulic car lift uses a piston of area 0.1 m² to lift a 1,500 kg car. The input piston has area 0.005 m². What force must be applied to the input piston? (g = 10 m/s²)",
      hints: [
        "The output force must equal the car's weight: F₂ = mg.",
        "Pascal's principle: F₁/A₁ = F₂/A₂.",
        "Solve for F₁ = F₂ × A₁/A₂.",
      ],
      solution:
        "F₂ = 1,500 × 10 = 15,000 N. F₁ = F₂ × A₁/A₂ = 15,000 × 0.005/0.1 = 15,000 × 0.05 = 750 N. The hydraulic system provides a mechanical advantage of 20.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Fluid Pressure and Flow",
      url: "https://phet.colorado.edu/en/simulations/fluid-pressure-and-flow",
      type: "simulation",
      description: "Explore pressure at depth in different fluids",
    },
    {
      title: "Khan Academy — Pressure and Pascal's Principle",
      url: "https://www.khanacademy.org/science/physics/fluids/density-and-pressure/v/fluids-part-2",
      type: "video",
      description: "Clear explanation with real-world hydraulic examples",
    },
    {
      title: "HyperPhysics — Pressure",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/pflu.html",
      type: "textbook",
      description: "Comprehensive fluid pressure reference",
    },
  ],
  highYieldPoints: [
    "P = F/A (definition, Pa = N/m²)",
    "Hydrostatic: P = ρgh (depends on depth, density, g — NOT shape)",
    "1 atm = 101,325 Pa = 760 mmHg = 1013.25 hPa",
    "Gauge pressure = absolute − atmospheric",
    "Pascal: pressure in enclosed fluid transmitted undiminished",
    "Hydraulic press: F₁/A₁ = F₂/A₂ (mechanical advantage = A₂/A₁)",
    "Blood pressure measured in mmHg (relative to atmospheric)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Pressure</strong> is a fundamental concept in fluid mechanics.
        It describes how force is distributed over an area. In fluids (liquids
        and gases), pressure acts equally in <strong>all directions</strong> at
        any point — it is a scalar quantity.
      </p>

      <h3>Definition of Pressure</h3>
      <EquationBlock
        equation={{
          id: "pressure-definition",
          latex: "P = \\frac{F}{A}",
          description: "Force per unit area",
          variables: "1 Pa = 1 N/m²",
        }}
      />

      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 mb-4">
        <p className="text-sm">
          <strong>Think:</strong> A sharp knife cuts easily because the force is
          concentrated on a tiny area → high pressure. A dull knife spreads the
          same force over a larger area → low pressure.
        </p>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Hydrostatic Pressure</h3>
      <p className="mb-3">
        In a static fluid, pressure increases with depth because of the weight
        of the fluid column above.
      </p>
      <EquationBlock
        equation={{
          id: "pressure-hydrostatic",
          latex: "P = \\rho g h",
          description: "Pressure at depth h in a fluid of density ρ",
        }}
      />

      <EquationBlock
        equation={{
          id: "pressure-total",
          latex: "P_{\\text{abs}} = P_0 + \\rho g h",
          description: "Don't forget to add the surface/atmospheric pressure!",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Key Insight</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Pressure depends on depth and density only — NOT on the shape of the
            container. A narrow tube at depth h has the same pressure as a lake
            at depth h.
          </p>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">Common Units</h4>
          <p className="text-xs text-muted-foreground mt-1">
            1 atm = 101,325 Pa
            <br />
            1 atm = 760 mmHg
            <br />1 atm = 1013.25 hPa
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Pascal's Principle</h3>
      <p className="mb-3">
        When pressure is applied to an <strong>enclosed fluid</strong>, it is
        transmitted equally to every point in the fluid. This is the principle
        behind hydraulic systems.
      </p>
      <EquationBlock
        equation={{
          id: "pressure-pascal",
          latex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2}",
          description: "Pressure is the same at both pistons",
          variables: "Mechanical advantage = A₂/A₁",
        }}
      />

      <div className="rounded-lg border bg-card p-3 mb-4">
        <p className="text-sm">
          <strong>Real-world example:</strong> A car brake system. The driver
          presses the brake pedal (small piston). This pressure is transmitted
          through brake fluid to larger pistons at each wheel, multiplying the
          force.
        </p>
      </div>

      <h3>Gauge vs Absolute Pressure</h3>
      <ul className="list-disc pl-6 space-y-1 mb-4">
        <li>
          <strong>Absolute pressure</strong> = total pressure (atmospheric +
          gauge)
        </li>
        <li>
          <strong>Gauge pressure</strong> = pressure above atmospheric (what a
          tyre gauge reads)
        </li>
        <li>P_abs = P_atm + P_gauge</li>
      </ul>

      <h3>Step Solver: Hydraulic Lift</h3>
      <StepSolver
        problem="Input piston area = 0.002 m², output piston area = 0.1 m². Lift a 2,000 kg car (g = 10). Find input force."
        steps={[
          {
            label: "Find output force needed",
            answer: "20000",
            hint: "F₂ = mg = 2,000 × 10 = 20,000 N",
          },
          {
            label: "Apply Pascal's principle",
            answer: "400",
            hint: "F₁ = F₂ × A₁/A₂ = 20,000 × 0.002/0.1 = 400 N",
          },
        ]}
        equation="F_1 = F_2 \\times \\frac{A_1}{A_2}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "pressure-worked-1",
            question:
              "IMAT 2023 Style: Diver at 20 m in seawater (ρ = 1025 kg/m³). Total pressure? (g = 10 m/s²)",
            hints: [
              "P_hydrostatic = ρgh.",
              "Add atmospheric pressure.",
              "Every 10 m of water ≈ 1 atm.",
            ],
            solution:
              "P_hydrostatic = 205,000 Pa. Total = 306,325 Pa ≈ 3.02 atm.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "P = F/A — definition",
          "P = ρgh — hydrostatic (depth only, not shape!)",
          "1 atm = 101,325 Pa = 760 mmHg",
          "P_abs = P₀ + ρgh",
          "Gauge = absolute − atmospheric",
          "Pascal: F₁/A₁ = F₂/A₂",
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
      id: "pressure-q1",
      type: "fill-blank",
      prompt:
        "A force of 500 N is applied uniformly over an area of 2.5 m². What is the pressure in Pa?",
      answer: "200",
      explanation: "P = F/A = 500/2.5 = 200 Pa.",
      difficulty: "apply",
    },
    {
      id: "pressure-q2",
      type: "multiple-choice",
      prompt:
        "In a hydraulic system, a 10 N force is applied to a piston with area 0.01 m². What force is exerted by a second piston with area 0.5 m²?",
      options: ["50 N", "200 N", "500 N", "5000 N"],
      answer: "500 N",
      explanation:
        "By Pascal's principle: F₁/A₁ = F₂/A₂ → F₂ = F₁ × A₂/A₁ = 10 × 0.5/0.01 = 500 N.",
      difficulty: "apply",
    },
    {
      id: "pressure-q3",
      type: "multiple-choice",
      prompt:
        "Which factor does NOT affect the pressure at a point in a static fluid?",
      options: [
        "Depth below the surface",
        "Density of the fluid",
        "Shape of the container",
        "Acceleration due to gravity",
      ],
      answer: "Shape of the container",
      explanation:
        "P = ρgh depends only on density (ρ), gravity (g), and depth (h). The shape of the container is irrelevant.",
      difficulty: "recall",
    },
    {
      id: "pressure-q4",
      type: "multiple-choice",
      prompt:
        "At what depth in water (ρ = 1000 kg/m³) is the hydrostatic pressure equal to 1 atm? (g = 10 m/s², 1 atm = 100,000 Pa)",
      options: ["5 m", "10 m", "15 m", "20 m"],
      answer: "10 m",
      explanation:
        "P = ρgh → h = P/(ρg) = 100,000/(1000 × 10) = 10 m. Every 10 m of water ≈ 1 atm.",
      difficulty: "apply",
      imatYear: 2022,
    },
    {
      id: "pressure-q5",
      type: "true-false",
      prompt:
        "True or False: If you double the area over which a force is applied, the pressure doubles.",
      answer: "False",
      explanation:
        "P = F/A. If area doubles and force is constant, pressure is halved (inversely proportional).",
      difficulty: "recall",
    },
    {
      id: "pressure-q6",
      type: "multiple-choice",
      prompt:
        "The gauge pressure in a tyre reads 200 kPa. If atmospheric pressure is 100 kPa, what is the absolute pressure inside the tyre?",
      options: ["100 kPa", "200 kPa", "300 kPa", "100,200 kPa"],
      answer: "300 kPa",
      explanation: "P_abs = P_atm + P_gauge = 100 + 200 = 300 kPa.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["archimedes", "newton-laws", "gas-laws", "si-units", "forces"],
  prerequisites: ["si-units", "forces"],
};
