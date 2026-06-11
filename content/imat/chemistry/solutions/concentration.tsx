"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "conc-qf-1",
    question: "Does molarity or molality change with temperature?",
    answer: "Molarity — volume expands with heat",
    context: "Molality uses mass (kg), which is temperature-independent",
  },
  {
    id: "conc-qf-2",
    question: "What does M₁V₁ = M₂V₂ represent?",
    answer: "Dilution formula — moles stay constant",
    context: "Adding solvent changes total volume, not total moles",
  },
];

export const concentrationNote: AtomicNote = {
  slug: "concentration",
  subject: "chemistry",
  topic: "solutions",
  title: "Concentration",
  summary:
    "Measures how much solute is dissolved in a given amount of solvent or solution. Key measures: molarity (mol/L), molality (mol/kg), percent composition, and dilution calculations.",
  memoryHook:
    "Molarity (M) = moles ÷ litres of solution. 'M = n/V — like MoVies per Volume.' Dilution: M₁V₁ = M₂V₂ — 'moles stay the same, just add water.' Molality uses mass (kg) so temperature doesn't affect it.",
  imatTrap:
    "Molarity uses volume of SOLUTION (not solvent). Adding solute changes total volume. Also, M₁V₁ = M₂V₂ requires SAME UNITS on both sides — any volume unit works as long as they match. Don't confuse % (w/w) with % (w/v) — IMAT often tests this distinction.",
  whyItMatters:
    "Concentration calculations are essential for titration, IV fluid preparation, drug dosing, and enzyme kinetics (K_m). IMAT frequently tests dilution and molarity in combined stoichiometry questions — especially in titration contexts.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Molarity calculation from mass and volume",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Dilution calculations — M₁V₁ = M₂V₂",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Molality vs molarity comparison",
    },
  ],
  equations: [
    {
      id: "molarity-def",
      latex: "M = \\frac{n}{V}",
      description: "Molarity = moles of solute ÷ volume of solution in litres",
      variables:
        "M = molarity (mol/L), n = moles of solute, V = volume of solution (L)",
    },
    {
      id: "dilution-formula",
      latex: "M_1 V_1 = M_2 V_2",
      description:
        "Dilution formula — moles of solute remain constant when adding solvent",
      variables:
        "M₁, V₁ = initial concentration & volume; M₂, V₂ = final concentration & volume",
    },
    {
      id: "molality-def",
      latex: "m = \\frac{n}{\\text{mass of solvent (kg)}}",
      description:
        "Molality = moles of solute ÷ mass of solvent in kg (temperature-independent)",
    },
    {
      id: "mass-conc-to-molarity",
      latex:
        "M = \\frac{\\text{concentration (g/L)}}{\\text{molar mass (g/mol)}}",
      description: "Convert mass concentration to molarity",
    },
  ],
  workedExamples: [
    {
      id: "conc-we-1",
      question:
        "Calculate the molarity of a solution containing 4 g of NaOH (M = 40 g/mol) in 500 mL of solution.",
      hints: [
        "Convert mass to moles using n = m/M.",
        "Convert volume to litres.",
        "Apply M = n/V.",
      ],
      solution:
        "n(NaOH) = 4/40 = 0.1 mol. V = 500 mL = 0.5 L. M = 0.1/0.5 = 0.2 M.",
      imatYear: 2022,
    },
    {
      id: "conc-we-2",
      question:
        "You dilute 100 mL of 0.5 M H₂SO₄ to 500 mL. What is the new concentration?",
      hints: [
        "M₁V₁ = M₂V₂ — which values do you have?",
        "M₁ = 0.5 M, V₁ = 100 mL, V₂ = 500 mL. Solve for M₂.",
        "Make sure volume units match.",
      ],
      solution: "M₁V₁ = M₂V₂ → (0.5)(100) = M₂(500) → M₂ = 50/500 = 0.1 M.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Concentration",
      url: "https://phet.colorado.edu/en/simulations/concentration",
      type: "simulation",
      description:
        "Interactive — add solute to water and see concentration change in real time",
    },
    {
      title: "Khan Academy — Molarity & Dilution",
      url: "https://www.khanacademy.org/science/chemistry/states-of-matter-and-intermolecular-forces/mixtures-and-solutions/a/molarity",
      type: "article",
      description:
        "Clear explanations of molarity, molality, and dilution with worked examples",
    },
    {
      title: "Chemistry Steps — Concentration Calculations",
      url: "https://general.chemistrysteps.com/molarity/",
      type: "practice",
      description:
        "Practice problems with step-by-step solutions for all concentration types",
    },
  ],
  highYieldPoints: [
    "Molarity (M) = n/V(L) — most common concentration unit in IMAT",
    "Dilution: M₁V₁ = M₂V₂ (moles of solute conserved)",
    "Molality (m) = n/kg solvent — temperature-independent",
    "Molarity uses volume of SOLUTION, not solvent",
    "% w/w = mass of solute / total mass × 100; % w/v = mass solute / volume solution × 100",
    "Convert g/L to M: M = (g/L) / molar mass",
    "M₁V₁ = M₂V₂ works with any volume units as long as they match",
  ],
  explanation: (
    <div>
      <p>
        Concentration measures how much solute is dissolved in a given amount of
        solvent or solution. The most important unit for IMAT is{" "}
        <strong>molarity</strong>.
      </p>

      <h3>Molarity — The Standard</h3>

      <EquationBlock
        equation={{
          id: "molarity-def",
          latex: "M = \\frac{n}{V}",
          description: "Molarity = moles per litre of solution",
        }}
      />

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
        <h4 className="text-sm font-semibold text-amber-600">
          Important: V = volume of SOLUTION, not solvent
        </h4>
        <p className="text-xs text-muted-foreground">
          When you dissolve solute in solvent, the total volume changes.
          Molarity is moles divided by the final volume of the solution, not the
          volume of solvent you started with.
        </p>
      </div>

      <h3>Example Calculation</h3>
      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
        <p className="text-sm">
          <strong>0.5 mol NaCl</strong> in <strong>250 mL</strong> solution:
        </p>
        <p className="text-sm font-bold">
          M = 0.5 / 0.250 = <span className="text-green-600">2.0 M</span>
        </p>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Dilution — M₁V₁ = M₂V₂</h3>
      <p>
        When you add solvent, the number of moles of solute stays the same. The
        concentration decreases proportionally to the volume increase.
      </p>

      <EquationBlock
        equation={{
          id: "dilution-formula",
          latex: "M_1 V_1 = M_2 V_2",
          description: "Dilution formula — moles conserved",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Before Dilution</h4>
          <p className="text-xs text-muted-foreground">
            M₁ = initial concentration
          </p>
          <p className="text-xs text-muted-foreground">V₁ = initial volume</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">After Dilution</h4>
          <p className="text-xs text-muted-foreground">
            M₂ = final concentration
          </p>
          <p className="text-xs text-muted-foreground">V₂ = final volume</p>
        </div>
      </div>

      <h3>Molality (m)</h3>
      <p>
        Similar to molarity but uses mass of solvent (kg) instead of volume of
        solution. <strong>Advantage:</strong> mass doesn&apos;t change with
        temperature, so molality is temperature-independent.
      </p>

      <EquationBlock
        equation={{
          id: "molality-def",
          latex: "m = \\frac{n}{\\text{mass of solvent (kg)}}",
          description: "Molality — temperature-independent concentration",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">Molarity (M)</h4>
          <p className="text-xs text-muted-foreground">mol/L of SOLUTION</p>
          <p className="text-xs">Changes with temperature</p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">Molality (m)</h4>
          <p className="text-xs text-muted-foreground">mol/kg of SOLVENT</p>
          <p className="text-xs">Temperature-independent</p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "conc-we-1",
            question:
              "Calculate the molarity of a solution containing 4 g of NaOH (M = 40 g/mol) in 500 mL of solution.",
            hints: [
              "Convert mass to moles using n = m/M.",
              "Convert volume to litres.",
              "Apply M = n/V.",
            ],
            solution:
              "n(NaOH) = 4/40 = 0.1 mol. V = 500 mL = 0.5 L. M = 0.1/0.5 = 0.2 M.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "M = n/V(L) — molarity",
          "M₁V₁ = M₂V₂ — dilution",
          "Molality: n/kg solvent",
          "Molarity changes with temperature",
          "% w/w vs % w/v — know the difference",
          "V = volume of SOLUTION, not solvent",
          "Convert g/L to M: ÷ molar mass",
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
    </div>
  ),
  questions: [
    {
      id: "conc-q1",
      type: "multiple-choice",
      prompt:
        "What is the molarity of a solution containing 4 g of NaOH (M = 40 g/mol) in 500 mL of solution?",
      answer: "0.2 M",
      options: ["0.1 M", "0.2 M", "0.4 M", "2.0 M"],
      explanation:
        "n = 4/40 = 0.1 mol. V = 500 mL = 0.5 L. M = 0.1/0.5 = 0.2 M.",
      difficulty: "apply",
    },
    {
      id: "conc-q2",
      type: "multiple-choice",
      prompt:
        "You dilute 100 mL of 0.5 M H₂SO₄ to 500 mL. What is the new concentration?",
      answer: "0.1 M",
      options: ["0.01 M", "0.1 M", "0.25 M", "0.5 M"],
      explanation: "M₁V₁ = M₂V₂ → (0.5)(100) = M₂(500) → M₂ = 50/500 = 0.1 M.",
      difficulty: "apply",
    },
    {
      id: "conc-q3",
      type: "true-false",
      prompt:
        "Molality changes with temperature because the volume of solvent expands.",
      answer: "False",
      explanation:
        "Molality uses mass of solvent (kg), not volume. Mass is unaffected by temperature, so molality is temperature-independent — unlike molarity, which depends on volume.",
      difficulty: "apply",
    },
    {
      id: "conc-q4",
      type: "multiple-choice",
      prompt: "What volume of 2 M NaCl is needed to obtain 0.5 mol of NaCl?",
      answer: "250 mL",
      options: ["100 mL", "250 mL", "500 mL", "1000 mL"],
      explanation: "M = n/V → V = n/M = 0.5/2 = 0.25 L = 250 mL.",
      difficulty: "recall",
    },
    {
      id: "conc-q5",
      type: "fill-blank",
      prompt:
        "A 10% w/v NaCl solution contains ______ grams of NaCl per 100 mL of solution.",
      answer: "10",
      explanation:
        "% w/v = (mass of solute in g / volume of solution in mL) × 100. So 10% w/v = 10 g per 100 mL.",
      difficulty: "recall",
    },
    {
      id: "conc-q6",
      type: "explain-why",
      prompt:
        "Explain why molarity is temperature-dependent but molality is not.",
      answer:
        "Molarity uses volume of solution (L) in its denominator. Volume changes with temperature — liquids expand when heated and contract when cooled — so the same solution has different molarity at different temperatures. Molality uses mass of solvent (kg), which does not change with temperature. Mass is an intrinsic property unaffected by thermal expansion. This makes molality the preferred concentration unit for experiments involving temperature changes.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "mole-calculations",
    "solubility",
    "acids-bases-salts",
    "balancing-equations",
  ],
  prerequisites: ["mole-calculations"],
};
