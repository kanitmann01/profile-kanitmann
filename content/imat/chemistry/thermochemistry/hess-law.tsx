"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "hess-qf-1",
    question: "What happens to ΔH when you reverse a reaction?",
    answer: "The sign of ΔH flips",
    context: "If A→B has ΔH = +100, then B→A has ΔH = −100",
  },
  {
    id: "hess-qf-2",
    question: "Why does Hess's law work?",
    answer: "Enthalpy is a state function — ΔH depends only on start and end",
    context: "Path independence: any route gives the same ΔH",
  },
];

export const hessLawNote: AtomicNote = {
  slug: "hess-law",
  subject: "chemistry",
  topic: "thermochemistry",
  title: "Hess's Law",
  summary:
    "The total enthalpy change for a reaction is independent of the route taken — it depends only on the initial and final states, because enthalpy is a state function.",
  memoryHook:
    "'Hess = Height' — like hiking a mountain: whether you take the direct trail or a winding path, the change in altitude (ΔH) is the same. ΔH_total = ΔH₁ + ΔH₂ + ΔH₃… 'Formation = products − reactants; Combustion = reactants − products — DON'T mix them up!'",
  imatTrap:
    "When reversing a reaction, FLIP the sign of ΔH. When multiplying a reaction by a factor, MULTIPLY ΔH by the same factor. These are the two most common errors. Also: formation ΔH uses products − reactants; combustion ΔH uses reactants − products. Mixing these up loses marks.",
  whyItMatters:
    "Hess's law lets you calculate ΔH for reactions that can't be measured directly — too slow, dangerous side reactions, or impractical (e.g., C + ½O₂ → CO produces CO₂ as well). IMAT tests enthalpy cycle calculations using formation and combustion data. It's a staple of the thermochemistry section.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Hess's law using standard enthalpies of formation",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Constructing enthalpy cycles from combustion data",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Manipulating equations: reverse and multiply ΔH",
    },
  ],
  equations: [
    {
      id: "hess-general",
      latex:
        "\\Delta H_{total} = \\Delta H_1 + \\Delta H_2 + \\Delta H_3 + \\dots",
      description:
        "Hess's law — the total enthalpy change is the sum of the enthalpy changes of each step",
    },
    {
      id: "hess-formation",
      latex:
        "\\Delta H^\\circ_{rxn} = \\sum \\Delta H^\\circ_f(\\text{products}) - \\sum \\Delta H^\\circ_f(\\text{reactants})",
      description: "Calculate ΔH°rxn from standard enthalpies of formation",
    },
    {
      id: "hess-combustion",
      latex:
        "\\Delta H^\\circ_{rxn} = \\sum \\Delta H^\\circ_c(\\text{reactants}) - \\sum \\Delta H^\\circ_c(\\text{products})",
      description:
        "Calculate ΔH°rxn from standard enthalpies of combustion (note: reactants − products!)",
    },
  ],
  workedExamples: [
    {
      id: "hess-we-1",
      question:
        "Calculate ΔH for the formation of methane: C(s) + 2H₂(g) → CH₄(g). Given: C(s) + O₂(g) → CO₂(g), ΔH = −393 kJ; H₂(g) + ½O₂(g) → H₂O(l), ΔH = −286 kJ; CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), ΔH = −890 kJ.",
      hints: [
        "We need C + 2H₂ → CH₄. We have combustion data — use the combustion formula.",
        "ΔH°rxn = ΣΔH°c(reactants) − ΣΔH°c(products)",
        "Or construct an enthalpy cycle: all paths from elements to CO₂ + H₂O must give the same ΔH.",
      ],
      solution:
        "Method 1 (combustion formula): Reactants: C (−393) + 2H₂ (2 × −286 = −572) = −965 kJ. Products: CH₄ (−890 kJ). ΔH = (−965) − (−890) = −75 kJ/mol. Method 2 (cycle): C + 2H₂ → CO₂ + 2H₂O via combustion (−965) and CH₄ → CO₂ + 2H₂O (−890). The difference gives C + 2H₂ → CH₄ = −75 kJ/mol.",
      imatYear: 2022,
    },
    {
      id: "hess-we-2",
      question:
        "Using enthalpies of formation, calculate ΔH for: 2NO(g) + O₂(g) → 2NO₂(g). Given ΔH°f(NO) = +90 kJ/mol, ΔH°f(NO₂) = +34 kJ/mol.",
      hints: [
        "Use the formation formula: ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants)",
        "Remember to multiply by stoichiometric coefficients.",
        "O₂ is an element in standard state — its ΔH°f = 0.",
      ],
      solution:
        "ΔH°rxn = [2 × ΔH°f(NO₂)] − [2 × ΔH°f(NO) + 1 × ΔH°f(O₂)] = [2 × 34] − [2 × 90 + 0] = 68 − 180 = −112 kJ. The reaction is exothermic (ΔH < 0). Note: O₂ is an element in its standard state, so ΔH°f = 0.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Energy Skate Park",
      url: "https://phet.colorado.edu/en/simulations/energy-skate-park",
      type: "simulation",
      description:
        "Interactive conservation of energy — shows path independence (like Hess's law)",
    },
    {
      title: "Khan Academy — Hess's Law",
      url: "https://www.khanacademy.org/science/chemistry/thermodynamics-chemistry/hess-law/v/hess-law",
      type: "video",
      description:
        "Clear walkthrough of Hess's law with enthalpy cycles and worked examples",
    },
    {
      title: "ChemGuide — Hess's Law & Enthalpy Cycles",
      url: "https://www.chemguide.co.uk/physical/energetics/hess.html",
      type: "article",
      description:
        "Detailed explanation with multiple worked examples of enthalpy cycles",
    },
  ],
  highYieldPoints: [
    "Enthalpy is a state function — ΔH depends only on start and end states",
    "Reversing a reaction → FLIP the sign of ΔH",
    "Multiplying coefficients → MULTIPLY ΔH by the same factor",
    "Formation formula: ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants)",
    "Combustion formula: ΔH°rxn = ΣΔH°c(reactants) − ΣΔH°c(products)",
    "Elements in standard state have ΔH°f = 0",
    "Always check: did you flip the sign when reversing?",
  ],
  explanation: (
    <div>
      <p>
        <strong>Hess&apos;s law</strong> states that the total enthalpy change
        for a reaction is independent of the route taken — because enthalpy is a
        <strong>state function</strong>. It depends only on the initial and
        final states, not the path between them.
      </p>

      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
        <h4 className="text-sm font-semibold text-green-600">
          The Mountain Analogy
        </h4>
        <p className="text-xs text-muted-foreground">
          Hiking from base camp to the summit: whether you take the direct trail
          or a winding path, the change in altitude is the same. Similarly, ΔH
          for A → B is the same whether it occurs directly or via C: A → C → B.
        </p>
      </div>

      <EquationBlock
        equation={{
          id: "hess-general",
          latex:
            "\\Delta H_{total} = \\Delta H_1 + \\Delta H_2 + \\Delta H_3 + \\dots",
          description: "Hess's law — sum of step enthalpies gives total ΔH",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Rules for Manipulating Equations</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Reverse a Reaction</h4>
          <p className="text-xs text-muted-foreground">
            <strong>FLIP the sign of ΔH.</strong> If A → B has ΔH = +100 kJ,
            then B → A has ΔH = −100 kJ.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Multiply Coefficients</h4>
          <p className="text-xs text-muted-foreground">
            <strong>MULTIPLY ΔH by the same factor.</strong> If 2A → B has ΔH =
            +100 kJ, then 4A → 2B has ΔH = +200 kJ.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Add Reactions</h4>
          <p className="text-xs text-muted-foreground">
            <strong>ADD their ΔH values</strong> to get the overall ΔH.
            Substances that appear on both sides cancel out.
          </p>
        </div>
      </div>

      <h3>Using Formation Data</h3>

      <EquationBlock
        equation={{
          id: "hess-formation",
          latex:
            "\\Delta H^\\circ_{rxn} = \\sum \\Delta H^\\circ_f(\\text{products}) - \\sum \\Delta H^\\circ_f(\\text{reactants})",
          description: "ΔH°rxn from formation enthalpies",
        }}
      />

      <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
        <p className="text-xs">
          Elements in their standard states (O₂, H₂, C(graphite), etc.) have{" "}
          <strong>ΔH°f = 0</strong>.
        </p>
      </div>

      <h3>Using Combustion Data</h3>

      <EquationBlock
        equation={{
          id: "hess-combustion",
          latex:
            "\\Delta H^\\circ_{rxn} = \\sum \\Delta H^\\circ_c(\\text{reactants}) - \\sum \\Delta H^\\circ_c(\\text{products})",
          description:
            "ΔH°rxn from combustion data (note: reactants − products!)",
        }}
      />

      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
        <h4 className="text-sm font-semibold text-red-600">
          IMAT Trap: Formation vs Combustion
        </h4>
        <p className="text-xs text-muted-foreground">
          Formation: <strong>products − reactants</strong>. Combustion:{" "}
          <strong>reactants − products</strong>. They are REVERSED because
          formation is from elements (like building up) and combustion is to CO₂
          + H₂O (like burning down). Memorise this distinction — it&apos;s a
          common IMAT trap.
        </p>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "hess-we-1",
            question:
              "Calculate ΔH for C(s) + 2H₂(g) → CH₄(g) given combustion data.",
            hints: [
              "Use the combustion formula: ΔH = ΣΔH°c(reactants) − ΣΔH°c(products)",
              "Reactants: C + 2H₂. Products: CH₄.",
            ],
            solution:
              "ΔH = [−393 + 2(−286)] − [−890] = −965 + 890 = −75 kJ/mol.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Hess: path-independent (state function)",
          "Reverse → flip ΔH sign",
          "Multiply → multiply ΔH",
          "Formation: ΣΔH°f(prod) − ΣΔH°f(react)",
          "Combustion: ΣΔH°c(react) − ΣΔH°c(prod)",
          "Elements in std state: ΔH°f = 0",
          "Construct cycles and add the ΔHs",
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
      id: "hess-q1",
      type: "multiple-choice",
      prompt: "If A → B has ΔH = +50 kJ, what is ΔH for 2B → 2A?",
      answer: "−100 kJ",
      options: ["+50 kJ", "−50 kJ", "+100 kJ", "−100 kJ"],
      explanation:
        "Reversing A → B gives B → A with ΔH = −50 kJ. Multiplying by 2 gives 2B → 2A with ΔH = −100 kJ.",
      difficulty: "apply",
    },
    {
      id: "hess-q2",
      type: "multiple-choice",
      prompt: "Using enthalpies of formation, how do you calculate ΔH°rxn?",
      answer: "ΣΔH°f(products) − ΣΔH°f(reactants)",
      options: [
        "ΣΔH°f(reactants) − ΣΔH°f(products)",
        "ΣΔH°f(products) − ΣΔH°f(reactants)",
        "ΣΔH°f(products) + ΣΔH°f(reactants)",
        "ΣΔH°c(reactants) − ΣΔH°c(products)",
      ],
      explanation:
        "With formation data: ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants). This is because formation enthalpies are defined from elements in standard states.",
      difficulty: "recall",
    },
    {
      id: "hess-q3",
      type: "true-false",
      prompt:
        "Hess's law works because enthalpy is a state function — it depends only on initial and final states, not the path taken.",
      answer: "True",
      explanation:
        "Enthalpy is a state function, meaning ΔH is path-independent. This is the fundamental reason Hess's law works.",
      difficulty: "recall",
    },
    {
      id: "hess-q4",
      type: "multiple-choice",
      prompt:
        "Calculate ΔH for: N₂ + 3H₂ → 2NH₃. Given ΔH°f(NH₃) = −46 kJ/mol.",
      answer: "−92 kJ",
      options: ["+46 kJ", "−46 kJ", "+92 kJ", "−92 kJ"],
      explanation:
        "ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants) = [2 × (−46)] − [0 + 0] = −92 kJ. N₂ and H₂ are elements in standard state (ΔH°f = 0).",
      difficulty: "apply",
    },
    {
      id: "hess-q5",
      type: "fill-blank",
      prompt:
        "When calculating ΔH°rxn from combustion data, the formula is ΣΔH°c(______) − ΣΔH°c(______).",
      answer: "reactants, products",
      explanation:
        "Combustion formula: ΔH°rxn = ΣΔH°c(reactants) − ΣΔH°c(products). This is the reverse of the formation formula.",
      difficulty: "recall",
    },
    {
      id: "hess-q6",
      type: "explain-why",
      prompt:
        "Explain why the formulas for ΔH°rxn differ when using formation data vs combustion data.",
      answer:
        "Formation enthalpies (ΔH°f) are defined as the enthalpy change when one mole of a compound is formed from its elements in their standard states. So to calculate ΔH for a reaction, you subtract the formation enthalpies of reactants from products — 'what you make minus what you break down.' Combustion enthalpies (ΔH°c) are defined as the enthalpy change when one mole of a substance burns completely in O₂. Using combustion data, you subtract products from reactants because the combustion pathway goes 'through' CO₂ and H₂O — you're comparing what you burn (reactants) vs what the products would release if they also burned. The two formulas are mathematical mirrors of each other.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "enthalpy",
    "balancing-equations",
    "mole-calculations",
    "chemical-bonding",
  ],
  prerequisites: ["enthalpy"],
};
