"use client";

import type { AtomicNote } from "@/data/imat/types";
import { CircuitSimulator } from "@/components/imat/interactive/circuit-simulator";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "ohm-qf-1",
    question:
      "If voltage is constant and resistance doubles, what happens to current?",
    answer: "halves",
    hint: "I = V/R",
    context: "Ohm's law: inverse proportionality",
  },
  {
    id: "ohm-qf-2",
    question: "Three 6 Ω resistors in parallel. Equivalent resistance?",
    answer: "2",
    hint: "1/R_eq = 1/R₁ + 1/R₂ + 1/R₃",
    context: "Parallel: reciprocal sum",
  },
  {
    id: "ohm-qf-3",
    question:
      "What is the power dissipated by a 5 Ω resistor with 2 A flowing through it?",
    answer: "20",
    hint: "P = I²R",
    context: "Electrical power formula",
  },
];

export const ohmsLawNote: AtomicNote = {
  slug: "ohms-law",
  subject: "physics",
  topic: "electrostatics-electrodynamics",
  title: "Ohm's Law and Electric Circuits",
  summary:
    "Ohm's law (V = IR) relates voltage, current, and resistance. In series circuits, current is the same through all components and resistances add. In parallel circuits, voltage is the same across all branches and reciprocal resistances add.",
  memoryHook:
    "'VIR triangle: V on top, I and R on bottom.' V = IR, I = V/R, R = V/I. 'Series: same I, add R. Parallel: same V, add 1/R.' Power: 'P = VI = I²R = V²/R.' Think of water: V = pressure, I = flow rate, R = pipe narrowness.",
  imatTrap:
    "In series: adding resistors INCREASES total resistance. In parallel: adding resistors DECREASES total resistance. Common error: for parallel, students add resistances instead of their reciprocals. Power is dissipated as heat in resistors (P = I²R). A short circuit (R → 0) causes infinite current — this is why fuses blow.",
  whyItMatters:
    "Understanding circuits is essential for medical device safety (defibrillators, ECG machines), understanding neural circuits (membrane resistance and ion currents), and everyday electrical safety (why short circuits cause fires). The human body's electrical system — from the heart's pacemaker to nerve signal propagation — follows the same circuit principles.",
  imatPatterns: [
    {
      years: [2021, 2022, 2023, 2024],
      frequency: "high",
      notes: "Series/parallel resistance combinations",
    },
    {
      years: [2020, 2023],
      frequency: "high",
      notes: "Power dissipation (P = VI = I²R = V²/R)",
    },
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Voltage and current division in circuits",
    },
  ],
  equations: [
    {
      id: "ohm-law",
      latex: "V = IR",
      description: "Ohm's law: voltage = current × resistance",
      variables: "V = voltage (V), I = current (A), R = resistance (Ω)",
    },
    {
      id: "ohm-series",
      latex: "R_{\\text{eq}} = R_1 + R_2 + R_3 + \\dots",
      description: "Series: resistances add directly",
    },
    {
      id: "ohm-parallel",
      latex:
        "\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + \\dots",
      description: "Parallel: reciprocal resistances add",
    },
    {
      id: "ohm-power",
      latex: "P = VI = I^2R = \\frac{V^2}{R}",
      description: "Electrical power: three equivalent forms",
      variables: "P = power (W), choose the form that uses known variables",
    },
  ],
  workedExamples: [
    {
      id: "ohm-worked-1",
      question:
        "IMAT 2022 Style: A 12 V battery is connected to a circuit with a 2 Ω resistor in series with a parallel combination of 3 Ω and 6 Ω resistors. Find the total current drawn from the battery.",
      hints: [
        "First simplify the parallel pair: 3 Ω ∥ 6 Ω.",
        "1/R_parallel = 1/3 + 1/6 = 1/2 → R_parallel = 2 Ω.",
        "Then total R = 2 Ω (series) + 2 Ω (parallel combination) = 4 Ω.",
        "I = V/R = 12/4 = 3 A.",
      ],
      solution:
        "Parallel combination: 1/R_p = 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2 → R_p = 2 Ω. Total R = 2 + 2 = 4 Ω. I = V/R = 12/4 = 3 A.",
      imatYear: 2022,
    },
    {
      id: "ohm-worked-2",
      question:
        "A 100 W light bulb operates at 230 V. What is its resistance and the current through it?",
      hints: [
        "P = V²/R is the most useful form here (we know P and V).",
        "Solve for R = V²/P.",
        "Then I = V/R or I = P/V.",
      ],
      solution:
        "R = V²/P = (230)²/100 = 52,900/100 = 529 Ω. I = P/V = 100/230 = 0.435 A.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Circuit Construction Kit",
      url: "https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc",
      type: "simulation",
      description:
        "Build virtual circuits with batteries, resistors, and bulbs",
    },
    {
      title: "Khan Academy — Ohm's Law and Circuits",
      url: "https://www.khanacademy.org/science/physics/circuits-topic/circuits-resistance/v/circuits-part-1",
      type: "video",
      description: "Comprehensive series on circuit analysis",
    },
    {
      title: "HyperPhysics — Electric Circuits",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/electric/dcemech.html",
      type: "textbook",
      description: "Circuit reference with interactive calculators",
    },
  ],
  highYieldPoints: [
    "V = IR (Ohm's law) — memorize all three rearrangements",
    "Series: R_eq = R₁ + R₂ + ... (current same, voltage divides)",
    "Parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (voltage same, current divides)",
    "Power: P = VI = I²R = V²/R (choose wisely)",
    "Adding resistors in parallel DECREASES total resistance",
    "Short circuit: R → 0, I → ∞ (blows fuses)",
    "Energy: E = P × t (Joules)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Ohm's law</strong> is the foundation of circuit analysis. It
        relates voltage (the &quot;push&quot;), current (the &quot;flow&quot;),
        and resistance (the &quot;opposition to flow&quot;). Once you master
        series and parallel combinations, you can analyse almost any DC circuit.
      </p>

      <h3>Ohm's Law</h3>
      <EquationBlock
        equation={{
          id: "ohm-law",
          latex: "V = IR",
          description: "Voltage = Current × Resistance",
          variables: "V in volts (V), I in amperes (A), R in ohms (Ω)",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Series Circuits</h3>
      <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 mb-4">
        <p className="text-sm font-semibold text-blue-600 mb-1">
          Key Properties
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
          <li>
            Same <strong>current</strong> flows through every component
          </li>
          <li>
            Resistances <strong>add</strong>: R_eq = R₁ + R₂ + R₃
          </li>
          <li>
            Voltage <strong>divides</strong>: V_total = V₁ + V₂ + V₃
          </li>
        </ul>
      </div>

      <EquationBlock
        equation={{
          id: "ohm-series",
          latex: "R_{\\text{eq}} = R_1 + R_2 + R_3 + \\dots",
          description: "Series: just add them up",
        }}
      />

      <h3>Parallel Circuits</h3>
      <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 mb-4">
        <p className="text-sm font-semibold text-green-600 mb-1">
          Key Properties
        </p>
        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
          <li>
            Same <strong>voltage</strong> across every branch
          </li>
          <li>
            Reciprocal resistances <strong>add</strong>
          </li>
          <li>
            Current <strong>divides</strong>: I_total = I₁ + I₂ + I₃
          </li>
        </ul>
      </div>

      <EquationBlock
        equation={{
          id: "ohm-parallel",
          latex:
            "\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + \\dots",
          description:
            "Parallel: reciprocal sum (R_eq is always smaller than the smallest R)",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Electrical Power</h3>
      <p className="mb-3">
        When current flows through a resistor, electrical energy is converted to
        heat. The rate of energy conversion is <strong>power</strong>.
      </p>
      <EquationBlock
        equation={{
          id: "ohm-power",
          latex: "P = VI = I^2R = \\frac{V^2}{R}",
          description:
            "Three equivalent forms — use the one that matches your known quantities",
          variables: "P in watts (W). Energy = P × t (J).",
        }}
      />

      <h3>Interactive Circuit Simulator</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Build circuits and see voltage, current, and resistance in action.
      </p>
      <CircuitSimulator />

      <h3>Step Solver: Parallel Resistance</h3>
      <StepSolver
        problem="Find equivalent resistance: a 4 Ω and a 12 Ω resistor in parallel."
        steps={[
          {
            label: "Apply reciprocal formula",
            answer: "0.3333",
            hint: "1/4 = 0.25, 1/12 = 0.0833, sum = 0.3333",
          },
          {
            label: "Invert to find R_eq",
            answer: "3",
            hint: "R_eq = 1/0.3333 = 3 Ω",
          },
        ]}
        equation="\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "ohm-worked-1",
            question:
              "IMAT 2022 Style: 12 V battery, 2 Ω in series with 3 Ω ∥ 6 Ω. Find total current.",
            hints: [
              "Parallel: 1/R_p = 1/3 + 1/6 = 1/2 → R_p = 2 Ω.",
              "Total R = 2 + 2 = 4 Ω.",
              "I = V/R = 12/4 = 3 A.",
            ],
            solution: "R_p = 2 Ω, R_total = 4 Ω, I = 3 A.",
            imatYear: 2022,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "V = IR — the master equation",
          "Series: R_eq = sum (same I, V divides)",
          "Parallel: 1/R_eq = sum (same V, I divides)",
          "P = VI = I²R = V²/R",
          "Parallel = lower R_eq",
          "Short circuit: R ≈ 0, I ≈ ∞",
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
      id: "ohm-q1",
      type: "fill-blank",
      prompt:
        "A 12 V battery is connected to a 4 Ω resistor. What current flows in A?",
      answer: "3",
      explanation: "I = V/R = 12/4 = 3 A.",
      difficulty: "apply",
    },
    {
      id: "ohm-q2",
      type: "multiple-choice",
      prompt:
        "Three 6 Ω resistors are connected in parallel. What is the equivalent resistance?",
      options: ["18 Ω", "6 Ω", "3 Ω", "2 Ω"],
      answer: "2 Ω",
      explanation: "1/R_eq = 1/6 + 1/6 + 1/6 = 3/6 = 1/2 → R_eq = 2 Ω.",
      difficulty: "apply",
    },
    {
      id: "ohm-q3",
      type: "multiple-choice",
      prompt:
        "If the resistance in a circuit is doubled while voltage stays constant, what happens to the power dissipated?",
      options: [
        "It doubles",
        "It halves",
        "It quadruples",
        "It stays the same",
      ],
      answer: "It halves",
      explanation:
        "P = V²/R. If R doubles and V is constant, P becomes V²/(2R) = P/2.",
      difficulty: "apply",
    },
    {
      id: "ohm-q4",
      type: "multiple-choice",
      prompt:
        "A 10 Ω and a 40 Ω resistor are in series with a 50 V supply. What is the current?",
      options: ["5 A", "2 A", "1 A", "0.5 A"],
      answer: "1 A",
      explanation: "R_eq = 10 + 40 = 50 Ω. I = V/R = 50/50 = 1 A.",
      difficulty: "apply",
      imatYear: 2021,
    },
    {
      id: "ohm-q5",
      type: "fill-blank",
      prompt:
        "How much power is dissipated by a 10 Ω resistor with 5 A through it?",
      answer: "250",
      explanation: "P = I²R = 25 × 10 = 250 W.",
      difficulty: "apply",
    },
    {
      id: "ohm-q6",
      type: "multiple-choice",
      prompt:
        "Adding an extra resistor in parallel to an existing parallel combination will:",
      options: [
        "Increase total resistance",
        "Decrease total resistance",
        "Not change total resistance",
        "Make total resistance infinite",
      ],
      answer: "Decrease total resistance",
      explanation:
        "Adding any resistor in parallel provides an additional current path, which always reduces the equivalent resistance.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["coulombs-law", "si-units", "heat-transfer", "pressure"],
  prerequisites: ["coulombs-law", "si-units"],
};
