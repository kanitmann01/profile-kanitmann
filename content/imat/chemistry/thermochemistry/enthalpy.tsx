"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "enth-qf-1",
    question: "Is bond breaking endothermic or exothermic?",
    answer: "Endothermic (requires energy input)",
    context: "Breaking bonds absorbs energy; making bonds releases energy",
  },
  {
    id: "enth-qf-2",
    question: "If ΔH is negative, is the reaction exothermic or endothermic?",
    answer: "Exothermic (heat is released)",
    context: "Negative ΔH = products have less energy than reactants",
  },
];

export const enthalpyNote: AtomicNote = {
  slug: "enthalpy",
  subject: "chemistry",
  topic: "thermochemistry",
  title: "Enthalpy & Calorimetry",
  summary:
    "Enthalpy (H) is the heat content of a system at constant pressure. Exothermic reactions release heat (ΔH < 0); endothermic reactions absorb heat (ΔH > 0). Calorimetry measures these changes experimentally.",
  memoryHook:
    "Exothermic = 'EXit' (heat EXITS the system, ΔH negative, surroundings get hot). Endothermic = 'ENter' (heat ENTERS the system, ΔH positive, surroundings get cold). Bond breaking = ENDO (energy in), Bond making = EXO (energy out).",
  imatTrap:
    "ΔH is negative for exothermic, positive for endothermic — don't mix up the sign. Also, bond BREAKING is endothermic (requires energy), bond MAKING is exothermic (releases energy). ΔH = Σ(bonds broken) − Σ(bonds formed). Students often forget the negative sign in q = mcΔT → ΔH = −q/n.",
  whyItMatters:
    "Enthalpy changes determine whether reactions are energetically favourable. IMAT tests calorimetry calculations (q = mcΔT), bond enthalpy, and interpreting energy profile diagrams. These concepts are essential for understanding metabolism, fuel efficiency, and industrial chemistry.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Calorimetry: q = mcΔT calculations",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Bond enthalpy: ΔH = Σ broken − Σ formed",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Energy profile diagrams — activation energy and ΔH",
    },
  ],
  equations: [
    {
      id: "calorimetry",
      latex: "q = mc\\Delta T",
      description: "Heat energy absorbed by water/solution in calorimetry",
      variables:
        "q = heat energy (J), m = mass (g), c = specific heat capacity (J/g°C), ΔT = temperature change (°C)",
    },
    {
      id: "enthalpy-from-q",
      latex: "\\Delta H = -\\frac{q}{n}",
      description:
        "Enthalpy change per mole from calorimetry data (negative for exothermic)",
      variables:
        "q = heat energy (J), n = moles of reactant, ΔH in kJ/mol (divide by 1000)",
    },
    {
      id: "bond-enthalpy",
      latex:
        "\\Delta H = \\sum \\text{(bond enthalpies broken)} - \\sum \\text{(bond enthalpies formed)}",
      description:
        "Enthalpy change from bond energies — breaking requires energy, making releases it",
    },
  ],
  workedExamples: [
    {
      id: "enth-we-1",
      question:
        "In a calorimetry experiment, 50 g of water increases in temperature by 10°C. The reaction used 0.1 mol of fuel. Calculate the enthalpy change of combustion. (c = 4.18 J/g°C)",
      hints: [
        "Use q = mcΔT to find the heat absorbed by water.",
        "Heat released by reaction = −q (reaction heats the water).",
        "ΔH = −q / n — convert J to kJ by dividing by 1000.",
      ],
      solution:
        "q = mcΔT = 50 × 4.18 × 10 = 2090 J = 2.09 kJ. The reaction released 2.09 kJ. ΔH = −q/n = −2.09/0.1 = −20.9 kJ/mol. Negative because exothermic (temperature increased).",
      imatYear: 2022,
    },
    {
      id: "enth-we-2",
      question:
        "Using bond enthalpies, estimate ΔH for: H₂ + Cl₂ → 2HCl. Given: H−H = 436 kJ/mol, Cl−Cl = 243 kJ/mol, H−Cl = 431 kJ/mol.",
      hints: [
        "Identify bonds broken (reactants) and bonds formed (products).",
        "Bonds broken: 1 H−H, 1 Cl−Cl. Bonds formed: 2 H−Cl.",
        "Apply: ΔH = Σ(broken) − Σ(formed).",
      ],
      solution:
        "Bonds broken: 436 + 243 = 679 kJ (endothermic). Bonds formed: 2 × 431 = 862 kJ (exothermic). ΔH = 679 − 862 = −183 kJ/mol. The reaction is exothermic because more energy is released making H−Cl bonds than consumed breaking H−H and Cl−Cl bonds.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Energy Forms & Changes",
      url: "https://phet.colorado.edu/en/simulations/energy-forms-and-changes",
      type: "simulation",
      description:
        "Interactive energy conservation simulation — see how heat transfers between systems",
    },
    {
      title: "Khan Academy — Enthalpy & Calorimetry",
      url: "https://www.khanacademy.org/science/chemistry/thermodynamics-chemistry/enthalpy-chemistry-sal/v/enthalpy",
      type: "video",
      description:
        "Comprehensive explanation of enthalpy, calorimetry, and bond enthalpies",
    },
    {
      title: "ChemGuide — Bond Enthalpy Calculations",
      url: "https://www.chemguide.co.uk/physical/energetics/bond.html",
      type: "article",
      description:
        "Detailed guide to bond enthalpy calculations with worked examples",
    },
  ],
  highYieldPoints: [
    "ΔH < 0 = exothermic (heat released), ΔH > 0 = endothermic (heat absorbed)",
    "Calorimetry: q = mcΔT; then ΔH = −q/n",
    "c(water) = 4.18 J/g°C — memorise this constant",
    "Bond breaking = endothermic (+); Bond making = exothermic (−)",
    "ΔH = Σ(broken) − Σ(formed) — always this order",
    "Standard conditions: 298 K, 100 kPa, 1 mol/dm³ solutions",
    "Activation energy (E_a) is the energy barrier — different from ΔH",
  ],
  explanation: (
    <div>
      <p>
        <strong>Enthalpy (H)</strong> is the heat content of a chemical system
        at constant pressure. We measure the{" "}
        <strong>change in enthalpy (ΔH)</strong>
        during a reaction — this tells us whether heat is absorbed or released.
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-red-600">Exothermic</h4>
          <p className="text-lg font-bold text-red-600">ΔH &lt; 0</p>
          <p className="text-xs text-muted-foreground">
            Heat released to surroundings
          </p>
          <p className="text-xs">Combustion, neutralisation</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-blue-600">Endothermic</h4>
          <p className="text-lg font-bold text-blue-600">ΔH &gt; 0</p>
          <p className="text-xs text-muted-foreground">
            Heat absorbed from surroundings
          </p>
          <p className="text-xs">Photosynthesis, thermal decomposition</p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Calorimetry — Measuring ΔH</h3>
      <p>
        In a calorimetry experiment, a reaction is carried out in an insulated
        container. The heat released/absorbed changes the temperature of a known
        mass of water.
      </p>

      <EquationBlock
        equation={{
          id: "calorimetry",
          latex: "q = mc\\Delta T",
          description:
            "Heat energy = mass × specific heat × temperature change",
        }}
      />

      <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 mt-3">
        <h4 className="text-sm font-semibold">Step-by-Step Calorimetry</h4>
        <ol className="text-sm space-y-1 mt-1">
          <li>
            <strong>1.</strong> Measure mass of water (m) and initial
            temperature
          </li>
          <li>
            <strong>2.</strong> Perform reaction — record maximum/minimum
            temperature
          </li>
          <li>
            <strong>3.</strong> Calculate q = mcΔT (heat absorbed by water)
          </li>
          <li>
            <strong>4.</strong> The reaction released −q (conservation of
            energy)
          </li>
          <li>
            <strong>5.</strong> Divide by moles of reactant: ΔH = −q/n
          </li>
        </ol>
      </div>

      <EquationBlock
        equation={{
          id: "enthalpy-from-q",
          latex: "\\Delta H = -\\frac{q}{n}",
          description:
            "Enthalpy change per mole — negative sign for exothermic",
        }}
      />

      <h3>Bond Enthalpy</h3>
      <p>
        Bond breaking requires energy (<strong>endothermic</strong>). Bond
        making releases energy (<strong>exothermic</strong>). The overall
        enthalpy change depends on the balance:
      </p>

      <EquationBlock
        equation={{
          id: "bond-enthalpy",
          latex: "\\Delta H = \\sum \\text{(broken)} - \\sum \\text{(formed)}",
          description: "ΔH from bond enthalpies",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-red-600">Bond Breaking</h4>
          <p className="text-xs text-muted-foreground">
            Endothermic (energy IN)
          </p>
          <p className="text-sm font-bold text-red-600">+ΔH</p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-green-600">Bond Making</h4>
          <p className="text-xs text-muted-foreground">
            Exothermic (energy OUT)
          </p>
          <p className="text-sm font-bold text-green-600">−ΔH</p>
        </div>
      </div>

      <h3>Standard Conditions</h3>
      <p>
        ΔH° is measured under standard conditions: <strong>298 K (25°C)</strong>
        ,<strong>100 kPa (≈1 atm)</strong>, and <strong>1 mol/dm³</strong> for
        solutions.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "enth-we-1",
            question:
              "In a calorimetry experiment, 50 g of water increases in temperature by 10°C. The reaction used 0.1 mol of fuel. Calculate ΔH. (c = 4.18 J/g°C)",
            hints: [
              "Use q = mcΔT.",
              "Heat released = −q.",
              "ΔH = −q/n — convert to kJ.",
            ],
            solution:
              "q = 50 × 4.18 × 10 = 2090 J = 2.09 kJ. ΔH = −2.09/0.1 = −20.9 kJ/mol.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "ΔH < 0 exothermic, ΔH > 0 endothermic",
          "q = mcΔT (c = 4.18 J/g°C for water)",
          "ΔH = −q/n (calorimetry to per-mole)",
          "Bond breaking = endothermic",
          "Bond making = exothermic",
          "ΔH = Σ(broken) − Σ(formed)",
          "Standard: 298 K, 100 kPa, 1 M",
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
      id: "enth-q1",
      type: "multiple-choice",
      prompt:
        "In a calorimetry experiment, 50 g of water increases in temperature by 10°C. What is the heat energy absorbed? (c = 4.18 J/g°C)",
      answer: "2090 J",
      options: ["418 J", "2090 J", "4180 J", "209 J"],
      explanation: "q = mcΔT = 50 × 4.18 × 10 = 2090 J = 2.09 kJ.",
      difficulty: "apply",
    },
    {
      id: "enth-q2",
      type: "true-false",
      prompt: "Bond breaking is an exothermic process.",
      answer: "False",
      explanation:
        "Bond breaking requires energy input — it is endothermic. Bond making releases energy — it is exothermic. A reaction is exothermic overall when more energy is released in making bonds than used in breaking them.",
      difficulty: "recall",
    },
    {
      id: "enth-q3",
      type: "multiple-choice",
      prompt:
        "A reaction causes a temperature increase in the surrounding water. What type of reaction is this?",
      answer: "Exothermic (ΔH < 0)",
      options: [
        "Endothermic (ΔH > 0)",
        "Exothermic (ΔH < 0)",
        "Neither",
        "Isothermic (ΔH = 0)",
      ],
      explanation:
        "If the surrounding water heats up, the reaction released heat — it is exothermic with ΔH < 0. The system lost energy to the surroundings.",
      difficulty: "apply",
    },
    {
      id: "enth-q4",
      type: "multiple-choice",
      prompt: "What is the specific heat capacity of water?",
      answer: "4.18 J/g°C",
      options: ["2.09 J/g°C", "4.18 J/g°C", "8.36 J/g°C", "1.00 J/g°C"],
      explanation:
        "Water has a high specific heat capacity of 4.18 J/g°C. This is why water is used in calorimetry — it absorbs significant heat without changing temperature too much.",
      difficulty: "recall",
    },
    {
      id: "enth-q5",
      type: "multiple-choice",
      prompt:
        "Using bond enthalpies: H−H = 436 kJ/mol, Cl−Cl = 243 kJ/mol, H−Cl = 431 kJ/mol. Estimate ΔH for H₂ + Cl₂ → 2HCl.",
      answer: "−183 kJ/mol",
      options: ["+183 kJ/mol", "−183 kJ/mol", "−248 kJ/mol", "+248 kJ/mol"],
      explanation:
        "Broken: 436 + 243 = 679 kJ. Formed: 2 × 431 = 862 kJ. ΔH = 679 − 862 = −183 kJ/mol. Exothermic — more energy released in forming bonds than consumed breaking them.",
      difficulty: "apply",
    },
    {
      id: "enth-q6",
      type: "explain-why",
      prompt:
        "Explain why ΔH for a reaction calculated from bond enthalpies is an estimate, not an exact value.",
      answer:
        "Bond enthalpy values are averages taken from many different compounds containing that bond. For example, the C−H bond enthalpy (412 kJ/mol) is an average — the actual energy varies depending on the molecule (CH₄ vs C₆H₆). Additionally, bond enthalpies assume all reactants and products are in the gas phase and do not account for intermolecular forces or changes in physical state. The actual ΔH depends on the specific molecular environment.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["hess-law", "balancing-equations", "mole-calculations"],
  prerequisites: ["mole-calculations", "balancing-equations"],
};
