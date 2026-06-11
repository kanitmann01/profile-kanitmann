"use client";

import type { AtomicNote } from "@/data/imat/types";
import { PHScale } from "@/components/imat/interactive/ph-scale";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ab-qf-1",
    question: "What is pH of a solution with [H⁺] = 1 × 10⁻³ M?",
    answer: "pH = 3",
    hint: "pH = −log₁₀[H⁺]",
    context: "pH calculation",
  },
  {
    id: "ab-qf-2",
    question: "Is a dilute solution of a strong acid still a strong acid?",
    answer: "Yes — strength ≠ concentration",
    context: "Strong = fully dissociates regardless of concentration",
  },
];

export const acidsBasesSaltsNote: AtomicNote = {
  slug: "acids-bases-salts",
  subject: "chemistry",
  topic: "inorganic-chemistry",
  title: "Acids, Bases & Salts",
  summary:
    "Acids donate H⁺ (protons), bases accept H⁺ or produce OH⁻. The pH scale quantifies acidity. Neutralisation produces salt + water.",
  memoryHook:
    "Arrhenius: acid → H⁺ in water, base → OH⁻ in water. Brønsted-Lowry: acid = proton donor, base = proton acceptor. 'A Beer Acid Gives Buzz, A Base Accepts'. Strong = fully dissociates; Weak = partially dissociates. pH = −log₁₀[H⁺].",
  imatTrap:
    "A strong acid is NOT the same as a concentrated acid. 'Strong' refers to degree of dissociation (HCl is always 100% dissociated), while 'concentrated' refers to amount per volume. Also, pH 0 is possible — it means [H⁺] = 1 M. And a dilute strong acid does NOT become weak — it's still fully dissociated, just less concentrated.",
  whyItMatters:
    "Acid-base chemistry underpins blood buffering (pH 7.4), enzyme function, digestion (HCl in stomach), and drug absorption. IMAT tests pH calculations, strong vs weak distinctions, and Brønsted-Lowry theory.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Strong vs weak acid — strength ≠ concentration",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "pH calculation from [H⁺] and vice versa",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Brønsted-Lowry conjugate acid-base pairs",
    },
  ],
  equations: [
    {
      id: "ph-definition",
      latex: "pH = -\\log_{10}[H^+]",
      description:
        "Definition of pH — negative logarithm of hydrogen ion concentration",
      variables: "[H⁺] = concentration of H⁺ in mol/L",
    },
    {
      id: "kw",
      latex:
        "K_w = [H^+][OH^-] = 1.0 \\times 10^{-14} \\text{ at } 25^\\circ C",
      description: "Ionic product of water — links [H⁺] and [OH⁻]",
    },
    {
      id: "ph-to-h",
      latex: "[H^+] = 10^{-pH}",
      description: "Calculate [H⁺] from pH",
    },
    {
      id: "neutralisation",
      latex:
        "HCl_{(aq)} + NaOH_{(aq)} \\longrightarrow NaCl_{(aq)} + H_2O_{(l)}",
      description: "General neutralisation: acid + base → salt + water",
    },
  ],
  workedExamples: [
    {
      id: "ab-we-1",
      question: "Calculate the pH of a 0.01 M solution of HCl (a strong acid).",
      hints: [
        "HCl is a strong acid — it fully dissociates. So [H⁺] = initial concentration of HCl.",
        "pH = −log₁₀[H⁺]",
        "log₁₀(10⁻²) = −2",
      ],
      solution:
        "HCl fully dissociates: HCl → H⁺ + Cl⁻. So [H⁺] = 0.01 M = 10⁻² M. pH = −log₁₀(10⁻²) = 2. The pH is 2 — strongly acidic.",
    },
    {
      id: "ab-we-2",
      question:
        "A student says '0.1 M HCl is a weaker acid than 0.01 M HCl because it's more dilute.' Identify and correct the error.",
      hints: [
        "What defines acid strength vs concentration?",
        "Does dilution change the degree of dissociation for a strong acid?",
        "Consider the definition of 'strong' in the context of dissociation.",
      ],
      solution:
        "The error: confusing strength with concentration. HCl is a strong acid regardless of concentration — it always fully dissociates. 0.01 M HCl is NOT 'weaker' than 0.1 M HCl — it's equally strong but less concentrated. The pH differs (2 vs 1) due to concentration, not strength.",
      imatYear: 2023,
    },
  ],
  externalResources: [
    {
      title: "PhET — pH Scale",
      url: "https://phet.colorado.edu/en/simulations/ph-scale",
      type: "simulation",
      description:
        "Interactive pH scale — add substances to see pH change in real time",
    },
    {
      title: "Khan Academy — Acid-Base Introduction",
      url: "https://www.khanacademy.org/science/chemistry/acids-and-bases-topic/a/arrhenius-bronsted-lowry-and-lewis-acids-and-bases",
      type: "article",
      description: "Covers all three acid-base theories with examples",
    },
    {
      title: "IMAT Buddy — Acids & Bases Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style acid-base and pH calculation questions",
    },
  ],
  highYieldPoints: [
    "Arrhenius: acid → H⁺, base → OH⁻ in water",
    "Brønsted-Lowry: acid = proton donor, base = proton acceptor",
    "pH = −log₁₀[H⁺]; [H⁺] = 10⁻ᵖᴴ; K_w = 10⁻¹⁴ at 25°C",
    "Strong acids fully dissociate: HCl, H₂SO₄, HNO₃",
    "Weak acids partially dissociate: CH₃COOH, H₂CO₃",
    "Strength (degree of dissociation) ≠ concentration (amount per volume)",
    "Neutralisation: H⁺ + OH⁻ → H₂O; product = salt + water",
  ],
  explanation: (
    <div>
      <h3>Definitions</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Arrhenius</h4>
          <p className="text-xs text-muted-foreground">
            Acid produces H⁺ in water; base produces OH⁻ in water.
          </p>
          <p className="text-xs mt-1">
            Limitation: only works in aqueous solutions
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Brønsted-Lowry</h4>
          <p className="text-xs text-muted-foreground">
            Acid = proton (H⁺) donor; base = proton acceptor.
          </p>
          <p className="text-xs mt-1">Works in non-aqueous systems too</p>
        </div>
      </div>

      <h3>The pH Scale</h3>
      <p>
        Use the interactive pH scale below to explore how pH changes with
        different substances:
      </p>
      <PHScale />

      <EquationBlock
        equation={{
          id: "ph-definition",
          latex: "pH = -\\log_{10}[H^+]",
          description: "Definition of pH",
        }}
      />

      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-red-600">pH &lt; 7</h4>
          <p className="text-xs text-muted-foreground">Acidic</p>
          <p className="text-xs">[H⁺] &gt; [OH⁻]</p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-green-600">pH = 7</h4>
          <p className="text-xs text-muted-foreground">Neutral</p>
          <p className="text-xs">[H⁺] = [OH⁻] = 10⁻⁷ M</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-blue-600">pH &gt; 7</h4>
          <p className="text-xs text-muted-foreground">Basic</p>
          <p className="text-xs">[OH⁻] &gt; [H⁺]</p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <EquationBlock
        equation={{
          id: "kw",
          latex:
            "K_w = [H^+][OH^-] = 1.0 \\times 10^{-14} \\text{ at } 25^\\circ C",
          description: "Ionic product of water — fundamental relationship",
        }}
      />

      <h3>Strong vs Weak</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">Strong Acids</h4>
          <p className="text-xs text-muted-foreground">
            Fully dissociate in water
          </p>
          <p className="text-xs mt-1">HCl, H₂SO₄, HNO₃, HBr, HI, HClO₄</p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">Weak Acids</h4>
          <p className="text-xs text-muted-foreground">
            Partially dissociate (equilibrium)
          </p>
          <p className="text-xs mt-1">CH₃COOH, H₂CO₃, H₃PO₄, HF</p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">Strong Bases</h4>
          <p className="text-xs text-muted-foreground">Fully dissociate</p>
          <p className="text-xs mt-1">NaOH, KOH, Ca(OH)₂, Ba(OH)₂</p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">Weak Bases</h4>
          <p className="text-xs text-muted-foreground">Partially dissociate</p>
          <p className="text-xs mt-1">NH₃, CH₃NH₂, C₅H₅N</p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Neutralisation</h3>
      <p>Acid + Base → Salt + Water</p>

      <EquationBlock
        equation={{
          id: "neutralisation",
          latex:
            "HCl_{(aq)} + NaOH_{(aq)} \\longrightarrow NaCl_{(aq)} + H_2O_{(l)}",
          description: "Neutralisation: H⁺ from acid + OH⁻ from base → H₂O",
        }}
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "ab-we-1",
            question:
              "Calculate the pH of a 0.01 M solution of HCl (a strong acid).",
            hints: [
              "HCl is a strong acid — it fully dissociates. So [H⁺] = initial concentration of HCl.",
              "pH = −log₁₀[H⁺]",
              "log₁₀(10⁻²) = −2",
            ],
            solution:
              "HCl fully dissociates: HCl → H⁺ + Cl⁻. So [H⁺] = 0.01 M = 10⁻² M. pH = −log₁₀(10⁻²) = 2. The pH is 2 — strongly acidic.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "pH = −log₁₀[H⁺]; [H⁺] = 10⁻ᵖᴴ",
          "K_w = 10⁻¹⁴ at 25°C",
          "Strong acids: fully dissociate (HCl)",
          "Weak acids: partially dissociate (CH₃COOH)",
          "Strength ≠ Concentration",
          "Brønsted-Lowry: acid = H⁺ donor",
          "Neutralisation: H⁺ + OH⁻ → H₂O",
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
      id: "ab-q1",
      type: "multiple-choice",
      prompt:
        "According to Brønsted-Lowry theory, what role does NH₃ play in the reaction NH₃ + H₂O → NH₄⁺ + OH⁻?",
      answer: "Base (proton acceptor)",
      options: [
        "Acid (proton donor)",
        "Base (proton acceptor)",
        "Neither acid nor base",
        "Catalyst",
      ],
      explanation:
        "NH₃ accepts a proton (H⁺) from water, forming NH₄⁺. By Brønsted-Lowry definition, a proton acceptor is a base.",
      difficulty: "apply",
    },
    {
      id: "ab-q2",
      type: "fill-blank",
      prompt: "A solution with pH 3 has [H⁺] = ______ M.",
      answer: "10⁻³ (or 0.001)",
      explanation: "pH = −log₁₀[H⁺], so [H⁺] = 10⁻ᵖᴴ = 10⁻³ = 0.001 M.",
      difficulty: "recall",
    },
    {
      id: "ab-q3",
      type: "true-false",
      prompt: "A dilute solution of HCl is a weak acid.",
      answer: "False",
      explanation:
        "HCl is always a strong acid — it fully dissociates regardless of concentration. 'Dilute' describes concentration (amount per volume), not acid strength (degree of dissociation).",
      difficulty: "apply",
    },
    {
      id: "ab-q4",
      type: "multiple-choice",
      prompt: "What is the pH of a 0.001 M KOH solution at 25°C?",
      answer: "11",
      options: ["3", "7", "11", "14"],
      explanation:
        "KOH fully dissociates: [OH⁻] = 0.001 = 10⁻³ M. [H⁺] = K_w/[OH⁻] = 10⁻¹⁴/10⁻³ = 10⁻¹¹ M. pH = −log₁₀(10⁻¹¹) = 11.",
      difficulty: "apply",
    },
    {
      id: "ab-q5",
      type: "multiple-choice",
      prompt: "Which is a conjugate acid-base pair?",
      answer: "H₂O and OH⁻",
      options: [
        "HCl and NaCl",
        "H₂O and OH⁻",
        "NaOH and KOH",
        "CH₃COOH and H₂O",
      ],
      explanation:
        "A conjugate acid-base pair differs by one H⁺. H₂O can donate an H⁺ to become OH⁻ (conjugate base). Conversely, OH⁻ can accept an H⁺ to become H₂O (conjugate acid).",
      difficulty: "apply",
    },
    {
      id: "ab-q6",
      type: "explain-why",
      prompt:
        "Explain why 0.1 M CH₃COOH has a higher pH than 0.1 M HCl, even though both have the same concentration.",
      answer:
        "HCl is a strong acid — it fully dissociates, giving [H⁺] = 0.1 M (pH ≈ 1). CH₃COOH is a weak acid — it only partially dissociates (K_a ≈ 1.8 × 10⁻⁵), so [H⁺] is much less than 0.1 M (pH ≈ 2.9). Same concentration, but different degree of dissociation = different pH.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "oxides",
    "concentration",
    "solubility",
    "balancing-equations",
    "mole-calculations",
  ],
  prerequisites: ["pure-substances", "balancing-equations"],
};
