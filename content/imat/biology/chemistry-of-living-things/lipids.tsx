"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What are the three components of a triglyceride?",
    answer: "One glycerol molecule + three fatty acid chains",
    context: "Ester bonds link them",
  },
  {
    id: "qf-2",
    question: "What type of bond joins a fatty acid to glycerol?",
    answer: "Ester bond (ester linkage)",
    context: "Formed by condensation",
  },
  {
    id: "qf-3",
    question:
      "What is the key structural difference between saturated and unsaturated fatty acids?",
    answer:
      "Saturated: no double bonds. Unsaturated: one or more double bonds (cis → kink)",
    context: "Affects melting point and fluidity",
  },
];

export const lipidsNote: AtomicNote = {
  slug: "lipids",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Lipids",
  summary:
    "Hydrophobic biomolecules that include fats (triglycerides), phospholipids, and steroids. Functions: energy storage (9 kcal/g — double that of carbs), membrane structure (phospholipid bilayer), signalling (steroid hormones), and insulation.",
  memoryHook:
    "Triglyceride = glycerol (3C alcohol) + 3 fatty acids (long hydrocarbon chains). Ester bonds connect them. Phospholipids = glycerol + 2 fatty acids + phosphate group.",
  imatTrap:
    "Unsaturated fatty acids have C=C double bonds in the cis configuration (H atoms on same side), which introduces a kink — this prevents tight packing and explains why unsaturated fats are liquid at room temperature. Trans fats (artificial) are worse for health because they pack like saturated fats. Trap: all unsaturated fats are healthy — trans fats are NOT.",
  whyItMatters:
    "Dietary fat types directly impact cardiovascular disease risk. LDL ('bad') cholesterol transports lipids to tissues; HDL ('good') removes excess. Statins lower cholesterol by inhibiting HMG-CoA reductase. Phospholipid bilayers are the foundation of cell membranes. Steroid hormones (testosterone, oestrogen, cortisol) regulate development and metabolism.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Saturated vs unsaturated fatty acid structure",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Phospholipid bilayer properties",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Ester bond formation in triglycerides",
    },
  ],
  equations: [
    {
      id: "lipid-triglyceride",
      latex:
        "\\text{Glycerol} + 3\\ \\text{Fatty acids} \\longrightarrow \\text{Triglyceride} + 3\\ H_2O",
      description:
        "Triglyceride formation via 3 condensation reactions (3 ester bonds)",
    },
    {
      id: "lipid-energy",
      latex:
        "\\text{Triglyceride} + 23\\ O_2 \\longrightarrow 5\\ H_2O + 16\\ CO_2 \\quad (\\text{approx})",
      description:
        "Complete oxidation of a typical triglyceride releases ~9 kcal/g",
    },
    {
      id: "lipid-saponification",
      latex:
        "\\text{Triglyceride} + 3\\ NaOH \\longrightarrow \\text{Glycerol} + 3\\ \\text{Soap (fatty acid salts)}",
      description:
        "Saponification — base hydrolysis of triglycerides to produce soap",
    },
    {
      id: "lipid-iodine",
      latex:
        "R\\text{-}CH\\text{=}CH\\text{-}R' + I_2 \\longrightarrow R\\text{-}CHI\\text{-}CHI\\text{-}R'",
      description:
        "Iodine adds across double bonds — iodine number measures unsaturation",
    },
  ],
  workedExamples: [
    {
      id: "lipid-worked-1",
      question:
        "A cooking fat advertisement claims 'high in monounsaturated fats.' Chemically, what does this mean in terms of fatty acid structure and why might this be relevant at room temperature?",
      hints: [
        "What does 'monounsaturated' refer to chemically?",
        "How does the cis double bond affect molecular shape?",
        "How does shape affect packing and melting point?",
      ],
      solution:
        "Monounsaturated means each fatty acid chain contains exactly one cis C=C double bond. The cis double bond introduces a kink (bend) in the hydrocarbon chain. This kink prevents the chains from packing closely together, lowering the melting point — so monounsaturated fats remain liquid at room temperature (e.g., olive oil). This contrasts with saturated fats, which have straight chains, tight packing, and are solid at room temperature (e.g., butter).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Lipids",
      url: "https://www.khanacademy.org/science/biology/macromolecules/lipids/a/lipids",
      type: "article",
      description: "Overview of lipid classes and functions",
    },
    {
      title: "OpenStax Biology 2e — Lipids",
      url: "https://openstax.org/books/biology-2e/pages/3-3-lipids",
      type: "textbook",
      description: "Free textbook chapter with diagrams of lipid structures",
    },
    {
      title: "Biochemistry by Stryer — Lipid Structure",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK22594/",
      type: "textbook",
      description: "Detailed biochemistry of membrane lipids",
    },
  ],
  highYieldPoints: [
    "Triglycerides: 1 glycerol + 3 fatty acids (ester bonds), energy storage (9 kcal/g)",
    "Saturated: no C=C, straight chains, solid at RT (butter, lard)",
    "Unsaturated: ≥1 cis C=C, kinked chains, liquid at RT (oils)",
    "Phospholipids: 2 fatty acids + phosphate group → amphipathic (polar head + non-polar tails)",
    "Phospholipid bilayer: hydrophobic tails inward, hydrophilic heads outward — fundamental membrane structure",
    "Steroids: 4 fused carbon rings (cyclopentanoperhydrophenanthrene), e.g., cholesterol, testosterone, oestrogen",
    "HDL vs LDL: HDL removes cholesterol (good), LDL delivers cholesterol (high = bad for arteries)",
  ],
  explanation: (
    <div>
      <p>
        <strong>Lipids</strong> are a diverse group of hydrophobic biomolecules.
        Unlike carbohydrates and proteins, they are not polymers — they are
        built from different components. Their common feature is that they are
        <strong>non-polar</strong> and thus insoluble in water.
      </p>

      <h3>Triglycerides (Fats & Oils)</h3>
      <p>
        A triglyceride consists of one <strong>glycerol</strong> molecule (a 3C
        alcohol) with three <strong>fatty acids</strong> attached via{" "}
        <strong>ester bonds</strong> (formed by condensation, releasing H₂O).
        Fatty acids are long hydrocarbon chains (typically 14–24 C) with a
        terminal carboxyl group (−COOH).
      </p>

      <EquationBlock
        equation={{
          id: "lipid-triglyceride",
          latex:
            "\\text{Glycerol} + 3\\ \\text{Fatty acids} \\longrightarrow \\text{Triglyceride} + 3\\ H_2O",
          description: "Triglyceride formation",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Saturated vs Unsaturated</h3>
      <p>
        <strong>Saturated:</strong> no C=C double bonds in the hydrocarbon
        chain. Straight chains pack tightly → solid at room temperature (animal
        fats: butter, lard).
      </p>
      <p>
        <strong>Unsaturated:</strong> one or more cis C=C double bonds. Each
        double bond creates a kink → chains cannot pack tightly → liquid at room
        temperature (plant oils: olive, sunflower). <strong>Trans fats</strong>{" "}
        (artificially hydrogenated) have the trans configuration → straight like
        saturated → solid and unhealthy.
      </p>

      <h3>Phospholipids — Membrane Builders</h3>
      <p>
        Similar to triglycerides but with a <strong>phosphate group</strong>
        replacing one fatty acid. This makes them <strong>amphipathic</strong>:
        the phosphate head is polar (hydrophilic) and the fatty acid tails are
        non-polar (hydrophobic). In water, they spontaneously form a{" "}
        <strong>bilayer</strong> — the fundamental structure of all cell
        membranes.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Steroids</h3>
      <p>
        Lipids with a distinctive structure: four fused carbon rings
        (cyclopentanoperhydrophenanthrene). <strong>Cholesterol</strong> is a
        membrane component that modulates fluidity. It is the precursor for:
      </p>
      <ul>
        <li>
          Steroid hormones (testosterone, oestrogen, cortisol, aldosterone)
        </li>
        <li>Bile acids (needed for fat digestion)</li>
        <li>Vitamin D (synthesised from cholesterol in skin)</li>
      </ul>

      <h3>Clinical: Cholesterol & Heart Disease</h3>
      <p>
        Lipids are transported in blood by <strong>lipoproteins</strong>:
        <strong>LDL</strong> carries cholesterol to tissues (contributes to
        plaque in arteries — 'bad'), while <strong>HDL</strong> removes excess
        cholesterol ('good'). Statins (HMG-CoA reductase inhibitors) lower
        cholesterol production and reduce cardiovascular risk.
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "lipid-worked-1",
            question:
              "A cooking fat advertisement claims 'high in monounsaturated fats.' Chemically, what does this mean in terms of fatty acid structure and why might this be relevant at room temperature?",
            hints: [
              "What does 'monounsaturated' refer to chemically?",
              "How does the cis double bond affect molecular shape?",
              "How does shape affect packing and melting point?",
            ],
            solution:
              "Monounsaturated means each fatty acid chain contains exactly one cis C=C double bond. The cis double bond introduces a kink (bend) in the hydrocarbon chain. This kink prevents the chains from packing closely together, lowering the melting point — so monounsaturated fats remain liquid at room temperature (e.g., olive oil).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Triglyceride: glycerol + 3 fatty acids (ester bonds)",
          "Fats store 9 kcal/g (double carbs/protein)",
          "Saturated: no C=C, solid at RT",
          "Unsaturated: cis C=C kinks, liquid at RT",
          "Phospholipids: amphipathic → bilayer",
          "Steroids: 4 fused rings → cholesterol, hormones",
          "LDL = bad, HDL = good for heart health",
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
      id: "lipids-q1",
      type: "multiple-choice",
      prompt:
        "What type of bond links fatty acids to glycerol in a triglyceride?",
      answer: "Ester bond",
      difficulty: "recall",
      options: [
        "Peptide bond",
        "Glycosidic bond",
        "Ester bond",
        "Phosphodiester bond",
      ],
    },
    {
      id: "lipids-q2",
      type: "multiple-choice",
      prompt: "How many fatty acid chains are in a phospholipid?",
      answer: "2",
      difficulty: "recall",
      options: ["1", "2", "3", "4"],
    },
    {
      id: "lipids-q3",
      type: "multiple-choice",
      prompt: "What makes unsaturated fatty acids liquid at room temperature?",
      answer: "Cis double bonds create kinks that prevent tight packing",
      difficulty: "recall",
      options: [
        "They are shorter chains",
        "Cis double bonds create kinks that prevent tight packing",
        "They contain more oxygen",
        "They have higher molecular weight",
      ],
    },
    {
      id: "lipids-q4",
      type: "multiple-choice",
      prompt:
        "Which steroid is the precursor for vitamin D and steroid hormones?",
      answer: "Cholesterol",
      difficulty: "apply",
      options: ["Testosterone", "Cholesterol", "Cortisol", "Oestrogen"],
    },
    {
      id: "lipids-q5",
      type: "multiple-choice",
      prompt:
        "Which lipoprotein is considered 'good' for cardiovascular health?",
      answer: "HDL",
      difficulty: "apply",
      options: ["LDL", "HDL", "VLDL", "Chylomicron"],
      imatYear: 2023,
    },
    {
      id: "lipids-q6",
      type: "explain-why",
      prompt:
        "Explain why trans fats are considered worse for health than cis unsaturated fats.",
      answer:
        "Trans fats have the trans configuration where H atoms are on opposite sides of the C=C bond, making the chain straight like saturated fats. This allows them to pack tightly, raising LDL ('bad') and lowering HDL ('good') cholesterol, increasing cardiovascular disease risk more than cis unsaturated fats, which have kinked chains.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["carbohydrates", "proteins", "cell-membrane-structure"],
  prerequisites: ["carbohydrates"],
};
