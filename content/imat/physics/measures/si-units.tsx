"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "si-qf-1",
    question: "How many SI base units are there?",
    answer: "7",
    context: "The seven pillars of measurement",
  },
  {
    id: "si-qf-2",
    question: "What is the SI base unit of electric current?",
    answer: "ampere",
    hint: "Symbol is A",
    context: "Named after André-Marie Ampère",
  },
  {
    id: "si-qf-3",
    question: "What is 1 nm in metres?",
    answer: "10^-9",
    hint: "Nano is 10⁻⁹",
    context: "Think of the prefix n-",
  },
];

export const siUnitsNote: AtomicNote = {
  slug: "si-units",
  subject: "physics",
  topic: "measures",
  title: "SI Units and Unit Conversions",
  summary:
    "The International System of Units defines 7 base units (m, kg, s, A, K, mol, cd) from which all derived units are built. Mastery of unit conversion and dimensional analysis is essential for every IMAT physics calculation.",
  memoryHook:
    "Base units mnemonic: 'Monkeys Keep Chasing Adequately Slim Gorillas' → Metre, Kilogram, Kelvin, Coulomb (A·s), Ampere, Second, Mole. Derived units: N = kg·m/s², J = N·m, W = J/s, Pa = N/m², V = J/C.",
  imatTrap:
    "IMAT loves tricky conversions: 1 nm = 10⁻⁹ m (not 10⁻⁶), 1 mL = 1 cm³ = 10⁻⁶ m³, 1 eV = 1.6 × 10⁻¹⁹ J. Always convert to SI base units before plugging into formulas. Confusing mass (kg) with weight (N) is a classic error — weight changes with gravity, mass does not.",
  whyItMatters:
    "Unit errors cause real disasters — NASA lost a $125M Mars orbiter because one team used pounds-force while another used newtons. In medicine, wrong unit conversions can lead to 10× dosing errors. SI prefixes from milli to micro are critical for understanding drug concentrations (mg/mL vs μg/mL).",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Unit conversion in almost every calculation-based question",
    },
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Derived unit composition (N, J, W in base units)",
    },
    {
      years: [2020, 2023],
      frequency: "low",
      notes: "Dimensional analysis for verifying equation correctness",
    },
  ],
  equations: [
    {
      id: "si-newton",
      latex:
        "1\\ \\text{N} = 1\\ \\text{kg} \\cdot \\text{m} \\cdot \\text{s}^{-2}",
      description: "Newton (force) in SI base units",
      variables: "kg = kilogram, m = metre, s = second",
    },
    {
      id: "si-joule",
      latex:
        "1\\ \\text{J} = 1\\ \\text{N} \\cdot \\text{m} = 1\\ \\text{kg} \\cdot \\text{m}^{2} \\cdot \\text{s}^{-2}",
      description: "Joule (energy) in SI base units",
    },
    {
      id: "si-watt",
      latex:
        "1\\ \\text{W} = 1\\ \\text{J} \\cdot \\text{s}^{-1} = 1\\ \\text{kg} \\cdot \\text{m}^{2} \\cdot \\text{s}^{-3}",
      description: "Watt (power) in SI base units",
    },
    {
      id: "si-pascal",
      latex:
        "1\\ \\text{Pa} = 1\\ \\text{N} \\cdot \\text{m}^{-2} = 1\\ \\text{kg} \\cdot \\text{m}^{-1} \\cdot \\text{s}^{-2}",
      description: "Pascal (pressure) in SI base units",
    },
  ],
  workedExamples: [
    {
      id: "si-worked-1",
      question:
        "IMAT 2023 Style: A car travels at 72 km/h. Convert this speed to m/s.",
      hints: [
        "How many metres in 1 km?",
        "How many seconds in 1 hour?",
        "Divide by 3.6 to convert km/h to m/s — can you see why?",
      ],
      solution:
        "72 km/h = 72 × (1000 m) / (3600 s) = 72 × 1000 / 3600 = 72 / 3.6 = 20 m/s. The factor 3.6 appears because 3600 s/h ÷ 1000 m/km = 3.6. Multiply by 3.6 to go m/s → km/h; divide by 3.6 to go km/h → m/s.",
      imatYear: 2023,
    },
    {
      id: "si-worked-2",
      question:
        "The pressure at a depth in a fluid is given by P = ρgh. If ρ = 1.0 g/cm³, g = 9.8 m/s², and h = 10 m, calculate P in pascals. First convert ρ to kg/m³.",
      hints: [
        "1 g/cm³ = ? kg/m³. How many cm³ in 1 m³?",
        "1 m³ = 10⁶ cm³, so 1 g/cm³ = 1000 kg/m³",
        "Now plug into P = ρgh with everything in SI units.",
      ],
      solution:
        "ρ = 1.0 g/cm³ = 1.0 × (10⁻³ kg) / (10⁻⁶ m³) = 1000 kg/m³. P = ρgh = 1000 × 9.8 × 10 = 98,000 Pa ≈ 0.97 atm. This is the hydrostatic pressure at 10 m underwater.",
    },
  ],
  externalResources: [
    {
      title: "NIST — SI Units Reference Guide",
      url: "https://www.nist.gov/pml/owm/metric-si/si-units",
      type: "textbook",
      description: "Official SI definitions with historical context",
    },
    {
      title: "Khan Academy — Unit Conversion",
      url: "https://www.khanacademy.org/math/cc-fourth-grade-math/imp-measurement-and-data-2/imp-converting-units-of-length/v/converting-units-of-length",
      type: "video",
      description: "Step-by-step conversion strategies with practice problems",
    },
    {
      title: "IMAT Buddy — Physics Units",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style unit conversion practice questions",
    },
  ],
  highYieldPoints: [
    "7 base units: m, kg, s, A, K, mol, cd",
    "N = kg·m·s⁻², J = N·m = kg·m²·s⁻², W = J/s = kg·m²·s⁻³",
    "Pa = N/m² = kg·m⁻¹·s⁻², V = J/C = kg·m²·s⁻³·A⁻¹",
    "SI prefixes: m (10⁻³), μ (10⁻⁶), n (10⁻⁹), p (10⁻¹²)",
    "km/h → m/s: divide by 3.6 (vice versa × 3.6)",
    "1 mL = 1 cm³ = 10⁻⁶ m³",
    "Always convert to SI base before formula substitution",
  ],
  explanation: (
    <div>
      <p>
        The <strong>International System of Units (SI)</strong> is the global
        standard for measurement. It defines <strong>7 base units</strong> from
        which every other physical quantity is derived. If you master unit
        conversion, you unlock the ability to solve any IMAT physics problem —
        even ones you haven&apos;t seen before.
      </p>

      <h3>Seven SI Base Units</h3>
      <div className="overflow-x-auto rounded-lg border mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-2 font-medium">Quantity</th>
              <th className="text-left p-2 font-medium">Unit</th>
              <th className="text-left p-2 font-medium">Symbol</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Length", "metre", "m"],
              ["Mass", "kilogram", "kg"],
              ["Time", "second", "s"],
              ["Electric current", "ampere", "A"],
              ["Temperature", "kelvin", "K"],
              ["Amount of substance", "mole", "mol"],
              ["Luminous intensity", "candela", "cd"],
            ].map(([q, u, s]) => (
              <tr key={s as string} className="border-b last:border-0">
                <td className="p-2 text-muted-foreground">{q}</td>
                <td className="p-2">{u}</td>
                <td className="p-2 font-mono text-primary">{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Derived Units</h3>
      <p>
        Every other unit is built from the 7 base units. The most common derived
        units for IMAT physics are:
      </p>

      <EquationBlock
        equation={{
          id: "si-newton",
          latex:
            "1\\ \\text{N} = 1\\ \\text{kg} \\cdot \\text{m} \\cdot \\text{s}^{-2}",
          description: "Force (Newton) = mass × acceleration",
        }}
      />

      <EquationBlock
        equation={{
          id: "si-joule",
          latex:
            "1\\ \\text{J} = 1\\ \\text{N} \\cdot \\text{m} = 1\\ \\text{kg} \\cdot \\text{m}^{2} \\cdot \\text{s}^{-2}",
          description: "Energy (Joule) = force × distance",
        }}
      />

      <EquationBlock
        equation={{
          id: "si-watt",
          latex:
            "1\\ \\text{W} = 1\\ \\text{J} \\cdot \\text{s}^{-1} = 1\\ \\text{kg} \\cdot \\text{m}^{2} \\cdot \\text{s}^{-3}",
          description: "Power (Watt) = energy per time",
        }}
      />

      <EquationBlock
        equation={{
          id: "si-pascal",
          latex:
            "1\\ \\text{Pa} = 1\\ \\text{N} \\cdot \\text{m}^{-2} = 1\\ \\text{kg} \\cdot \\text{m}^{-1} \\cdot \\text{s}^{-2}",
          description: "Pressure (Pascal) = force per area",
        }}
      />

      <h3>SI Prefixes</h3>
      <p>
        Prefixes let us express very large or very small quantities without
        scientific notation. The ones you must know for IMAT:
      </p>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-xs font-semibold text-blue-600 mb-1">Large</h4>
          <p className="text-xs text-muted-foreground">
            T (10¹²), G (10⁹), M (10⁶), k (10³)
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-xs font-semibold text-purple-600 mb-1">Small</h4>
          <p className="text-xs text-muted-foreground">
            m (10⁻³), μ (10⁻⁶), n (10⁻⁹), p (10⁻¹²)
          </p>
        </div>
      </div>

      <h3>Speed Conversion Trick</h3>
      <p>
        The most common conversion in IMAT physics: <strong>km/h ↔ m/s</strong>.
        The magic factor is <strong>3.6</strong>:
      </p>
      <ul className="list-disc pl-6 space-y-1 mb-3">
        <li>
          km/h → m/s: <strong>divide by 3.6</strong>
        </li>
        <li>
          m/s → km/h: <strong>multiply by 3.6</strong>
        </li>
      </ul>
      <p className="text-sm text-muted-foreground mb-4">
        Why? 1 km/h = 1000 m / 3600 s = 1/3.6 m/s. So 72 km/h = 72/3.6 = 20 m/s.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Dimensional Analysis</h3>
      <p>
        Every valid physics equation must be{" "}
        <strong>dimensionally consistent</strong> — both sides must have the
        same base-unit composition. This is a powerful tool for catching errors
        and even deriving formulas.
      </p>
      <p className="text-sm text-muted-foreground">
        Example: Kinetic energy Eₖ = ½mv². Left side: [E] = kg·m²·s⁻² = J. Right
        side: kg × (m/s)² = kg·m²·s⁻² ✓. The ½ is dimensionless, so the
        dimensions match.
      </p>

      <h3>Step Solver: Unit Conversion Practice</h3>
      <StepSolver
        problem="Convert 0.25 g/cm³ to kg/m³"
        steps={[
          {
            label: "Convert g to kg",
            answer: "0.00025",
            hint: "1 g = 10⁻³ kg, so 0.25 g = 0.25 × 10⁻³ kg",
          },
          {
            label: "Convert cm³ to m³",
            answer: "0.000001",
            hint: "1 cm³ = 10⁻⁶ m³",
          },
          {
            label: "Complete the conversion",
            answer: "250",
            hint: "Divide 0.00025 kg by 0.000001 m³",
          },
        ]}
        equation="\\rho = \\frac{m}{V}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "si-worked-1",
            question:
              "IMAT 2023 Style: A car travels at 72 km/h. Convert this speed to m/s.",
            hints: [
              "How many metres in 1 km?",
              "How many seconds in 1 hour?",
              "Divide by 3.6 to convert km/h to m/s — can you see why?",
            ],
            solution:
              "72 km/h = 72 × (1000 m) / (3600 s) = 72 × 1000 / 3600 = 72 / 3.6 = 20 m/s. The factor 3.6 appears because 3600 s/h ÷ 1000 m/km = 3.6.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "7 base units: m, kg, s, A, K, mol, cd",
          "N = kg·m·s⁻², J = kg·m²·s⁻²",
          "W = kg·m²·s⁻³, Pa = kg·m⁻¹·s⁻²",
          "km/h → m/s: ÷ 3.6; m/s → km/h: × 3.6",
          "1 mL = 1 cm³ = 10⁻⁶ m³",
          "Dimensional analysis: both sides must match",
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
      id: "si-q1",
      type: "multiple-choice",
      prompt: "Which of the following is NOT an SI base unit?",
      answer: "Newton",
      explanation:
        "The Newton is a derived unit (kg·m·s⁻²). The 7 SI base units are m, kg, s, A, K, mol, and cd.",
      difficulty: "recall",
      options: ["Ampere", "Kelvin", "Newton", "Mole"],
    },
    {
      id: "si-q2",
      type: "fill-blank",
      prompt: "Convert 3.5 km/h to m/s. Give your answer to 2 decimal places.",
      answer: "0.97",
      explanation:
        "3.5 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 3500/3600 = 0.97 m/s.",
      difficulty: "apply",
    },
    {
      id: "si-q3",
      type: "multiple-choice",
      prompt: "What are the SI base units of energy?",
      answer: "kg·m²·s⁻²",
      explanation:
        "Energy (Joule) = kg·m²·s⁻². Option A is momentum, C is pressure, D is power.",
      difficulty: "apply",
      options: ["kg·m·s⁻¹", "kg·m²·s⁻²", "kg·m⁻¹·s⁻²", "kg·m²·s⁻³"],
    },
    {
      id: "si-q4",
      type: "multiple-choice",
      prompt: "How many metres are in 1 nanometre?",
      answer: "10⁻⁹ m",
      explanation: "The prefix nano (n) means 10⁻⁹. So 1 nm = 10⁻⁹ m.",
      difficulty: "recall",
      options: ["10⁻⁶ m", "10⁻⁹ m", "10⁻¹² m", "10⁻³ m"],
      imatYear: 2022,
    },
    {
      id: "si-q5",
      type: "multiple-choice",
      prompt:
        "A force of 10 N acts over an area of 2 m². What is the pressure in Pa?",
      answer: "5 Pa",
      explanation: "P = F/A = 10/2 = 5 Pa. The pascal is defined as N/m².",
      difficulty: "apply",
      options: ["5 Pa", "20 Pa", "0.2 Pa", "12 Pa"],
    },
    {
      id: "si-q6",
      type: "true-false",
      prompt:
        "True or False: The kilogram is the only SI base unit defined by a physical artefact (the IPK).",
      answer: "True",
      explanation:
        "As of recent redefinitions, the kg is now defined by Planck's constant, but for IMAT purposes, it was historically the last base unit tied to a physical artefact.",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "significant-figures",
    "pressure",
    "newton-laws",
    "coulombs-law",
    "ohms-law",
  ],
  prerequisites: ["none"],
};
