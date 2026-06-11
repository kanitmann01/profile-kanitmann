"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ps-qf-1",
    question: "Can a compound be separated by physical methods?",
    answer: "No — only chemical methods",
    context: "Compounds require chemical reactions to separate elements",
  },
  {
    id: "ps-qf-2",
    question: "Is water (H₂O) a mixture of hydrogen and oxygen?",
    answer: "No — it is a compound",
    context: "The properties of a compound differ from its elements",
  },
];

export const pureSubstancesNote: AtomicNote = {
  slug: "pure-substances",
  subject: "chemistry",
  topic: "composition-of-matter",
  title: "Pure Substances",
  summary:
    "Matter with a fixed, definite composition — either elements (one type of atom) or compounds (two or more elements chemically bonded in fixed ratios).",
  memoryHook:
    "Elements = single Lego brick type; Compounds = pre-built Lego set (always same pieces in same ratio). You can't separate a compound by physical means — HCl is NOT a mixture of H₂ and Cl₂.",
  imatTrap:
    "Water (H₂O) is a compound, NOT a mixture of hydrogen and oxygen. The properties of a compound differ completely from its constituent elements — Na is explosive, Cl₂ is toxic, but NaCl is table salt. Elements CANNOT be decomposed chemically.",
  whyItMatters:
    "Distinguishing pure substances from mixtures is the foundation of all classification in chemistry. IMAT tests whether you can identify elements vs compounds and predict separation methods.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Element vs compound identification",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Properties differ between elements and their compounds",
    },
    { years: [2021], frequency: "low", notes: "Law of definite proportions" },
  ],
  equations: [
    {
      id: "law-definite-prop",
      latex:
        "\\text{Compound always contains same elements in fixed mass ratio}",
      description:
        "Law of definite proportions — e.g. H₂O is always 1:8 H:O by mass",
    },
    {
      id: "electrolysis-water",
      latex:
        "2H_2O_{(l)} \\xrightarrow{\\text{electrolysis}} 2H_{2(g)} + O_{2(g)}",
      description:
        "Electrolysis separates water into its elements — a chemical change",
    },
  ],
  workedExamples: [
    {
      id: "ps-we-1",
      question:
        "Classify each as element, compound, or mixture: (a) O₂ (b) NaCl (c) Air (d) Fe (e) H₂O. Justify your answers.",
      hints: [
        "Does it contain one type of atom or multiple?",
        "Are the components chemically bonded or just physically mixed?",
        "Can it be separated by physical means?",
      ],
      solution:
        "(a) Element — only O atoms (diatomic). (b) Compound — Na and Cl chemically bonded in fixed ratio. (c) Mixture (homogeneous) — N₂, O₂, Ar etc. are physically mixed, not bonded. (d) Element — only Fe atoms. (e) Compound — H and O chemically bonded. Air is the trick: it looks like a single substance but is a mixture of separable gases.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Elements, Compounds & Mixtures",
      url: "https://www.khanacademy.org/science/biology/chemistry-of-life/elements-and-atoms/v/elements-and-atoms",
      type: "video",
      description:
        "Clear visual distinction between elements, compounds, and mixtures",
    },
    {
      title: "BBC Bitesize — Pure Substances & Mixtures",
      url: "https://www.bbc.co.uk/bitesize/guides/zscv6yc/revision/1",
      type: "article",
      description: "GCSE-level overview with diagrams and quick tests",
    },
    {
      title: "ChemLibreTexts — Classification of Matter",
      url: "https://chem.libretexts.org/Bookshelves/General_Chemistry/Map%3A_General_Chemistry_(Petrucci_et_al.)/01%3A_Matter_-_Its_Properties_and_Measurement/1.2%3A_Classification_of_Matter",
      type: "textbook",
      description: "Comprehensive classification with flowcharts",
    },
  ],
  highYieldPoints: [
    "Elements: one type of atom, cannot be chemically decomposed",
    "Compounds: two+ elements chemically bonded, fixed ratio",
    "Mixtures: physically combined, variable ratio, separable physically",
    "Properties differ: Na + Cl₂ → NaCl has completely new properties",
    "Law of definite proportions: a compound always has the same composition",
    "Only chemical methods (electrolysis, thermal decomposition) separate compounds",
  ],
  explanation: (
    <div>
      <p>
        <strong>Elements</strong> are the simplest pure substances — they
        consist of only one type of atom and cannot be broken down by chemical
        means. Examples: Fe (iron), O₂ (oxygen), Au (gold).
      </p>
      <p>
        <strong>Compounds</strong> consist of two or more elements chemically
        combined in a fixed ratio. They can only be separated by chemical
        reactions (electrolysis, thermal decomposition). Examples: H₂O, NaCl,
        CO₂.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Physical vs Chemical Properties</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Physical Properties</h4>
          <p className="text-xs text-muted-foreground">
            Observed without changing composition
          </p>
          <ul className="text-xs mt-2 list-disc list-inside">
            <li>Melting/boiling point</li>
            <li>Density</li>
            <li>Colour</li>
            <li>Conductivity</li>
          </ul>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Chemical Properties</h4>
          <p className="text-xs text-muted-foreground">
            Describe how a substance reacts
          </p>
          <ul className="text-xs mt-2 list-disc list-inside">
            <li>Flammability</li>
            <li>Reactivity with acid</li>
            <li>Oxidation state</li>
            <li>Combustibility</li>
          </ul>
        </div>
      </div>

      <h3>Key Distinctions</h3>
      <ul>
        <li>
          Compounds have a <strong>fixed composition</strong> (law of definite
          proportions) — water is always H₂O, never H₃O or HO₂
        </li>
        <li>
          Elements cannot be decomposed into simpler substances by chemical
          reactions
        </li>
        <li>
          A compound&apos;s properties are entirely different from those of its
          constituent elements
        </li>
        <li>Mixtures can be separated by physical means; compounds cannot</li>
      </ul>

      <EquationBlock
        equation={{
          id: "electrolysis-water",
          latex:
            "2H_2O_{(l)} \\xrightarrow{\\text{electrolysis}} 2H_{2(g)} + O_{2(g)}",
          description:
            "Chemical decomposition of water — electrolysis breaks the compound into elements",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "ps-we-1",
            question:
              "Classify each as element, compound, or mixture: (a) O₂ (b) NaCl (c) Air (d) Fe (e) H₂O. Justify your answers.",
            hints: [
              "Does it contain one type of atom or multiple?",
              "Are the components chemically bonded or just physically mixed?",
              "Can it be separated by physical means?",
            ],
            solution:
              "(a) Element — only O atoms (diatomic). (b) Compound — Na and Cl chemically bonded in fixed ratio. (c) Mixture (homogeneous) — N₂, O₂, Ar etc. are physically mixed, not bonded. (d) Element — only Fe atoms. (e) Compound — H and O chemically bonded. Air is the trick: it looks like a single substance but is a mixture of separable gases.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Elements: one type of atom",
          "Compounds: bonded elements, fixed ratio",
          "Mixtures: physically combined",
          "Compounds need chemical separation",
          "New properties emerge in compounds",
          "Na + Cl₂ → NaCl (completely new)",
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
      id: "ps-q1",
      type: "multiple-choice",
      prompt: "Which of the following is a compound?",
      answer: "Carbon dioxide (CO₂)",
      options: [
        "Oxygen (O₂)",
        "Carbon dioxide (CO₂)",
        "Iron (Fe)",
        "Helium (He)",
      ],
      explanation:
        "CO₂ contains two different elements (C and O) chemically bonded — it is a compound. O₂, Fe, and He are all elements.",
      difficulty: "recall",
    },
    {
      id: "ps-q2",
      type: "true-false",
      prompt:
        "A compound can be separated into its elements by physical methods such as filtration or distillation.",
      answer: "False",
      explanation:
        "Compounds require chemical methods (electrolysis, thermal decomposition) to break the bonds between elements. Physical methods only separate mixtures.",
      difficulty: "apply",
    },
    {
      id: "ps-q3",
      type: "multiple-choice",
      prompt:
        "Sodium (Na) is a reactive metal and chlorine (Cl₂) is a toxic gas. What does this tell us about sodium chloride (NaCl)?",
      answer:
        "NaCl has properties different from both Na and Cl₂ — a compound's properties differ from its constituent elements.",
      options: [
        "NaCl should also be a reactive metal",
        "NaCl should be a toxic gas",
        "NaCl has properties different from both Na and Cl₂",
        "NaCl is a mixture, not a compound",
      ],
      explanation:
        "When elements form a compound, the resulting substance has entirely new properties unlike either element.",
      difficulty: "apply",
    },
    {
      id: "ps-q4",
      type: "fill-blank",
      prompt:
        "The law of ______ proportions states that a compound always contains the same elements in the same fixed ratio by mass.",
      answer: "definite",
      explanation:
        "Also called Proust's law. Water is always 11.2% H and 88.8% O by mass, regardless of source.",
      difficulty: "recall",
    },
    {
      id: "ps-q5",
      type: "multiple-choice",
      prompt: "Which process can separate water into its elements?",
      answer: "Electrolysis",
      options: ["Filtration", "Distillation", "Electrolysis", "Chromatography"],
      explanation:
        "Water (H₂O) is a compound. Breaking it requires chemical energy input — electrolysis uses electricity to split H₂O into H₂ and O₂ gases.",
      difficulty: "apply",
    },
    {
      id: "ps-q6",
      type: "explain-why",
      prompt:
        "Why is air classified as a mixture and NOT a compound, even though it seems uniform?",
      answer:
        "Air is a homogeneous mixture (solution) of N₂, O₂, Ar, CO₂, and other gases. Its composition varies by location, the components are not chemically bonded, and they can be separated by physical methods (fractional distillation of liquid air). A compound has a fixed composition and requires chemical means to separate.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "mixtures-separation",
    "atomic-models",
    "ionic-bonds",
    "balancing-equations",
  ],
  prerequisites: [],
};
