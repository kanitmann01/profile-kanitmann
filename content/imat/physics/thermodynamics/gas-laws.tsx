"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "gas-qf-1",
    question: "What is 27°C in Kelvin?",
    answer: "300",
    hint: "K = °C + 273.15",
    context: "Always use Kelvin for gas laws!",
  },
  {
    id: "gas-qf-2",
    question:
      "If pressure doubles at constant temperature, what happens to volume?",
    answer: "halves",
    hint: "Boyle's law: P₁V₁ = P₂V₂",
    context: "Inverse proportionality",
  },
  {
    id: "gas-qf-3",
    question: "What is R in PV = nRT? (give value and units)",
    answer: "8.314 J/mol·K",
    context: "The ideal gas constant",
  },
];

export const gasLawsNote: AtomicNote = {
  slug: "gas-laws",
  subject: "physics",
  topic: "thermodynamics",
  title: "Gas Laws and the Ideal Gas Equation",
  summary:
    "Gas behaviour is described by Boyle's law (P ∝ 1/V at constant T), Charles's law (V ∝ T at constant P), and the combined ideal gas law PV = nRT. These laws relate pressure, volume, temperature, and amount of gas.",
  memoryHook:
    "'Boyle: squeeze it (↑P), it shrinks (↓V) — P₁V₁ = P₂V₂.' 'Charles: heat it (↑T), it expands (↑V) — V₁/T₁ = V₂/T₂.' 'Ideal: PV = nRT — the master equation.' CRITICAL: Temperature must be in Kelvin (K = °C + 273.15).",
  imatTrap:
    "ALWAYS convert Celsius to Kelvin before using gas laws. 0°C = 273.15 K, NOT 0 K. Also: the laws assume ideal behaviour (no intermolecular forces, negligible molecular volume). Real gases deviate at high P and low T. Do NOT use STP volume (22.4 L) unless the gas is at STP (0°C, 1 atm).",
  whyItMatters:
    "Gas laws explain breathing (Boyle's law: diaphragm expands lungs → ↓P → air flows in), syringe operation, tyre pressure changes with temperature, and decompression sickness in divers (dissolved N₂ bubbles on ascent — Boyle's law in action). In medicine, gas laws govern anaesthetic delivery and oxygen therapy.",
  imatPatterns: [
    {
      years: [2021, 2022, 2023, 2024],
      frequency: "high",
      notes: "PV = nRT calculations and combined gas law",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Boyle's law and Charles's law applications",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Kelvin conversion and STP conditions",
    },
  ],
  equations: [
    {
      id: "gas-boyle",
      latex: "P_1 V_1 = P_2 V_2",
      description: "Boyle's law: constant T, P ∝ 1/V",
      variables: "P = pressure (Pa), V = volume (m³)",
    },
    {
      id: "gas-charles",
      latex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
      description: "Charles's law: constant P, V ∝ T",
      variables: "T must be in Kelvin (K = °C + 273.15)",
    },
    {
      id: "gas-gay-lussac",
      latex: "\\frac{P_1}{T_1} = \\frac{P_2}{T_2}",
      description: "Gay-Lussac's law: constant V, P ∝ T",
    },
    {
      id: "gas-ideal",
      latex: "PV = nRT",
      description: "Ideal gas law: the master equation combining all three",
      variables:
        "P = pressure (Pa), V = volume (m³), n = moles (mol), R = 8.314 J/(mol·K), T = temperature (K)",
    },
  ],
  workedExamples: [
    {
      id: "gas-worked-1",
      question:
        "IMAT 2022 Style: A gas occupies 5 L at 27°C and 2 atm. What volume will it occupy at 127°C and constant pressure?",
      hints: [
        "Which law applies? Pressure is constant → Charles's law.",
        "Convert temperatures to Kelvin: T₁ = 300 K, T₂ = 400 K.",
        "Charles: V₁/T₁ = V₂/T₂ → V₂ = V₁ × T₂/T₁.",
      ],
      solution:
        "T₁ = 27 + 273 = 300 K. T₂ = 127 + 273 = 400 K. V₂ = V₁ × T₂/T₁ = 5 × 400/300 = 5 × 4/3 = 6.67 L.",
      imatYear: 2022,
    },
    {
      id: "gas-worked-2",
      question:
        "How many moles of gas are in a 0.05 m³ container at 300 K and 200,000 Pa? (R = 8.314 J/mol·K)",
      hints: [
        "Use the ideal gas law: PV = nRT.",
        "Solve for n = PV/(RT).",
        "Plug in the values.",
      ],
      solution:
        "n = PV/(RT) = (200,000 × 0.05)/(8.314 × 300) = 10,000/2,494.2 = 4.01 moles.",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Gas Properties",
      url: "https://phet.colorado.edu/en/simulations/gas-properties",
      type: "simulation",
      description:
        "Pump gas molecules and adjust P, V, T to see laws in action",
    },
    {
      title: "Khan Academy — Ideal Gas Equation",
      url: "https://www.khanacademy.org/science/chemistry/gases-and-kinetic-molecular-theory/ideal-gas-law/v/ideal-gas-equation-pv-nrt",
      type: "video",
      description: "Comprehensive walkthrough of all gas laws",
    },
    {
      title: "HyperPhysics — Gas Laws",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/Kinetic/idegas.html",
      type: "textbook",
      description: "Interactive gas law reference with calculators",
    },
  ],
  highYieldPoints: [
    "Boyle: P₁V₁ = P₂V₂ (constant T, inverse proportion)",
    "Charles: V₁/T₁ = V₂/T₂ (constant P, direct proportion)",
    "Gay-Lussac: P₁/T₁ = P₂/T₂ (constant V, direct proportion)",
    "Ideal: PV = nRT (R = 8.314 J/mol·K)",
    "Temperature MUST be in Kelvin! K = °C + 273.15",
    "STP: 0°C (273.15 K), 1 atm (101,325 Pa), 22.4 L/mol",
    "Real gases deviate at high P and low T",
  ],
  explanation: (
    <div>
      <p>
        <strong>Gas laws</strong> describe how pressure, volume, and temperature
        of a gas are related. The ideal gas law <strong>PV = nRT</strong>{" "}
        combines all three individual laws into one master equation.
        Understanding these relationships is essential for chemistry and physics
        questions on the IMAT.
      </p>

      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 mb-4">
        <p className="text-sm font-semibold text-red-600">⚠ THE #1 MISTAKE</p>
        <p className="text-xs text-muted-foreground mt-1">
          Always convert Celsius to Kelvin. 0°C = 273.15 K, NOT 0 K. Using
          Celsius in gas law calculations will give you a completely wrong
          answer.
        </p>
      </div>

      <h3>Boyle's Law (Constant Temperature)</h3>
      <p className="mb-2">
        At constant temperature, pressure and volume are{" "}
        <strong>inversely proportional</strong>. Squeeze a gas → it shrinks.
      </p>
      <EquationBlock
        equation={{
          id: "gas-boyle",
          latex: "P_1 V_1 = P_2 V_2",
          description: "Boyle's law: P ∝ 1/V at constant T",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Charles's Law (Constant Pressure)</h3>
      <p className="mb-2">
        At constant pressure, volume is <strong>directly proportional</strong>{" "}
        to absolute temperature. Heat a gas → it expands.
      </p>
      <EquationBlock
        equation={{
          id: "gas-charles",
          latex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2}",
          description: "Charles's law: V ∝ T at constant P",
          variables: "Temperature in Kelvin ONLY",
        }}
      />

      <h3>Gay-Lussac's Law (Constant Volume)</h3>
      <p className="mb-2">
        At constant volume, pressure is <strong>directly proportional</strong>{" "}
        to absolute temperature. Heat a gas in a rigid container → pressure
        increases.
      </p>
      <EquationBlock
        equation={{
          id: "gas-gay-lussac",
          latex: "\\frac{P_1}{T_1} = \\frac{P_2}{T_2}",
          description: "Gay-Lussac's law: P ∝ T at constant V",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>The Ideal Gas Law</h3>
      <p className="mb-3">
        The three individual laws combine into one powerful equation:
      </p>
      <EquationBlock
        equation={{
          id: "gas-ideal",
          latex: "PV = nRT",
          description: "The master equation — relates P, V, n, and T",
          variables: "R = 8.314 J/(mol·K). Memorise this value!",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border bg-card p-3">
          <h4 className="text-sm font-semibold mb-1">STP Conditions</h4>
          <p className="text-xs text-muted-foreground">
            T = 273.15 K (0°C)
            <br />
            P = 1 atm (101,325 Pa)
            <br />1 mole of ideal gas = 22.4 L
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="text-sm font-semibold mb-1">Real Gas Deviations</h4>
          <p className="text-xs text-muted-foreground">
            Ideal gas assumption fails at:
            <br />
            • High pressure (molecules too close)
            <br />• Low temperature (intermolecular forces matter)
          </p>
        </div>
      </div>

      <h3>Step Solver: Boyle's Law</h3>
      <StepSolver
        problem="A gas at 3 atm occupies 4 L. What volume at 6 atm, constant T?"
        steps={[
          { label: "Apply Boyle's law: P₁V₁ = P₂V₂", answer: "12" },
          {
            label: "Solve for V₂",
            answer: "2",
            hint: "V₂ = P₁V₁/P₂ = 3×4/6 = 2 L",
          },
        ]}
        equation="V_2 = \\frac{P_1 V_1}{P_2}"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "gas-worked-1",
            question:
              "IMAT 2022 Style: Gas at 5 L, 27°C. Volume at 127°C, constant P?",
            hints: [
              "Constant P → Charles's law.",
              "Convert to Kelvin.",
              "V₂ = V₁ × T₂/T₁.",
            ],
            solution: "T₁ = 300 K, T₂ = 400 K. V₂ = 5 × 400/300 = 6.67 L.",
            imatYear: 2022,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Boyle: P₁V₁ = P₂V₂ (constant T)",
          "Charles: V₁/T₁ = V₂/T₂ (constant P)",
          "Gay-Lussac: P₁/T₁ = P₂/T₂ (constant V)",
          "Ideal: PV = nRT (R = 8.314)",
          "Temperature ALWAYS in Kelvin",
          "STP: 0°C, 1 atm, 22.4 L/mol",
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
      id: "gaslaws-q1",
      type: "fill-blank",
      prompt:
        "A gas at 2 atm occupies 5 L. If the pressure is increased to 10 atm at constant temperature, what is the new volume in L?",
      answer: "1",
      explanation: "Boyle's law: P₁V₁ = P₂V₂ → 2 × 5 = 10 × V₂ → V₂ = 1 L.",
      difficulty: "apply",
    },
    {
      id: "gaslaws-q2",
      type: "multiple-choice",
      prompt:
        "A gas at 27°C is heated to 327°C at constant pressure. By what factor does its volume change?",
      options: [
        "Increases by factor of 2",
        "Increases by factor of 12.1",
        "Decreases by factor of 2",
        "Stays the same",
      ],
      answer: "Increases by factor of 2",
      explanation:
        "Charles's law: V₁/T₁ = V₂/T₂. Convert to Kelvin: T₁ = 300 K, T₂ = 600 K. V₂/V₁ = T₂/T₁ = 2.",
      difficulty: "apply",
    },
    {
      id: "gaslaws-q3",
      type: "multiple-choice",
      prompt: "Which condition must be met when using the gas laws?",
      options: [
        "Pressure must be in atm",
        "Volume must be in litres",
        "Temperature must be in Kelvin",
        "The gas must be ideal",
      ],
      answer: "Temperature must be in Kelvin",
      explanation:
        "All gas law calculations require absolute temperature (Kelvin). Pressure and volume units can vary as long as they're consistent.",
      difficulty: "recall",
    },
    {
      id: "gaslaws-q4",
      type: "multiple-choice",
      prompt:
        "A gas at STP has a volume of 11.2 L. How many moles of gas are present?",
      options: ["0.5 mol", "1 mol", "2 mol", "11.2 mol"],
      answer: "0.5 mol",
      explanation: "At STP, 1 mole = 22.4 L. So 11.2 L = 0.5 mol.",
      difficulty: "apply",
      imatYear: 2023,
    },
    {
      id: "gaslaws-q5",
      type: "multiple-choice",
      prompt:
        "Which of the following would cause an ideal gas to deviate from ideal behaviour?",
      options: [
        "Low pressure",
        "High temperature",
        "High pressure and low temperature",
        "Large container volume",
      ],
      answer: "High pressure and low temperature",
      explanation:
        "Real gases deviate from ideal behaviour at high pressure (molecules too close) and low temperature (intermolecular forces matter).",
      difficulty: "analyze",
    },
    {
      id: "gaslaws-q6",
      type: "fill-blank",
      prompt:
        "A 0.5 mol sample of gas at 300 K exerts a pressure of 100,000 Pa. What is its volume? (R = 8.314 J/mol·K, answer to 1 decimal place in m³)",
      answer: "0.0125",
      explanation:
        "V = nRT/P = (0.5 × 8.314 × 300)/100,000 = 1,247.1/100,000 = 0.0125 m³ = 12.5 L.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "heat-transfer",
    "pressure",
    "archimedes",
    "significant-figures",
    "si-units",
  ],
  prerequisites: ["pressure", "si-units"],
};
