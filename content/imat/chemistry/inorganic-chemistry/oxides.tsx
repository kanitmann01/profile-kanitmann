"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ox-qf-1",
    question: "Are metal oxides generally acidic or basic?",
    answer: "Basic (react with acids)",
    context: "Metal + O₂ → basic oxide",
  },
  {
    id: "ox-qf-2",
    question: "Name one amphoteric oxide.",
    answer: "Al₂O₃ or ZnO",
    context: "Reacts with both acids and bases",
  },
];

export const oxidesNote: AtomicNote = {
  slug: "oxides",
  subject: "chemistry",
  topic: "inorganic-chemistry",
  title: "Oxides",
  summary:
    "Compounds of an element with oxygen. Metal oxides are generally basic; nonmetal oxides are generally acidic; some (Al₂O₃, ZnO) are amphoteric.",
  memoryHook:
    "Metal + O₂ → basic oxide (dissolves in acid). Nonmetal + O₂ → acidic oxide (dissolves in base). Amphoteric = 'ambidextrous' (reacts with both acid AND base). 'MONA' — Metal Oxides Neutralise Acid. 'NONA' — NOnmetal oxides Neutralise Alkali.",
  imatTrap:
    "Not all metal oxides are soluble in water — CaO reacts with water to form Ca(OH)₂, but Fe₂O₃ does not dissolve. 'Basic' means it reacts with acid, not necessarily that it dissolves in water. Also, CO and NO are neutral oxides — they don't react with acids or bases.",
  whyItMatters:
    "Oxide behaviour explains acid rain (SO₂ + H₂O → H₂SO₃), antacids (MgO neutralises stomach acid), and extraction of metals from ores. IMAT tests oxide classification and reactions.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Classify oxide as acidic/basic/amphoteric/neutral",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Reactions of oxides with water — acid rain formation",
    },
    {
      years: [2021],
      frequency: "medium",
      notes: "Amphoteric oxides — Al₂O₃ and ZnO reactions",
    },
  ],
  equations: [
    {
      id: "basic-oxide-reaction",
      latex: "MO + 2HX \\longrightarrow MX_2 + H_2O",
      description:
        "General reaction of a basic oxide with an acid → salt + water",
      variables: "MO = metal oxide, HX = acid",
    },
    {
      id: "acid-rain-so2",
      latex: "SO_2 + H_2O \\longrightarrow H_2SO_3",
      description:
        "Sulphur dioxide dissolves in rain to form sulphurous acid — a cause of acid rain",
    },
    {
      id: "alumina-acid",
      latex: "Al_2O_3 + 6HCl \\longrightarrow 2AlCl_3 + 3H_2O",
      description: "Aluminium oxide acts as a base — reacts with acid",
    },
    {
      id: "alumina-base",
      latex: "Al_2O_3 + 2NaOH \\longrightarrow 2NaAlO_2 + H_2O",
      description:
        "Aluminium oxide acts as an acid — reacts with base (forms aluminate)",
    },
  ],
  workedExamples: [
    {
      id: "ox-we-1",
      question:
        "Classify the following oxides as acidic, basic, amphoteric, or neutral: Na₂O, SO₃, Al₂O₃, CO, MgO, N₂O. Explain the reasoning for each.",
      hints: [
        "Is the element a metal, nonmetal, or metalloid?",
        "Metal oxides are typically basic; nonmetal oxides are typically acidic.",
        "Al and Zn are metalloids — their oxides can react both ways.",
        "Neutral oxides (CO, NO, N₂O) do not react with acids or bases.",
      ],
      solution:
        "Na₂O: basic (Group 1 metal oxide — reacts with acid). SO₃: acidic (nonmetal oxide — forms H₂SO₄ in water). Al₂O₃: amphoteric (reacts with both HCl and NaOH). CO: neutral (no reaction with acid or base). MgO: basic (metal oxide). N₂O: neutral (no acid/base reaction — laughing gas).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Acidic & Basic Oxides",
      url: "https://www.khanacademy.org/test-prep/mcat/chemical-processes/acid-base-equilibria/v/acidic-basic-and-amphoteric-oxides",
      type: "video",
      description: "Clear classification of oxides with examples",
    },
    {
      title: "BBC Bitesize — Oxides",
      url: "https://www.bbc.co.uk/bitesize/guides/zqj2pv4/revision/3",
      type: "article",
      description: "Overview of oxide types and their reactions",
    },
    {
      title: "ChemistryStudent — Oxide Classification",
      url: "https://www.chemistrystudent.com/oxides.html",
      type: "article",
      description:
        "Comprehensive guide with equation examples and practice questions",
    },
  ],
  highYieldPoints: [
    "Metal oxides = basic (react with acid → salt + water)",
    "Nonmetal oxides = acidic (react with base → salt + water)",
    "Amphoteric: Al₂O₃, ZnO (react with BOTH acid and base)",
    "Neutral: CO, NO, N₂O (no reaction with acid or base)",
    "Acid rain: SO₂/NOₓ from fossil fuels → H₂SO₃/HNO₃ in rain",
    "Basic oxides need not be soluble — Fe₂O₃ is basic but insoluble",
  ],
  explanation: (
    <div>
      <p>
        Oxides are binary compounds of an element with oxygen. Their acid-base
        behaviour depends on the position of the element in the periodic table.
      </p>

      <h3>Basic Oxides (Metal Oxides)</h3>
      <p>
        Formed when metals react with oxygen. They react with acids to form salt
        + water (neutralisation).
      </p>

      <EquationBlock
        equation={{
          id: "basic-oxide-reaction",
          latex: "MO + 2HX \\longrightarrow MX_2 + H_2O",
          description: "General reaction of a basic oxide with acid",
        }}
      />

      <ul>
        <li>
          <strong>Na₂O</strong> + H₂O → 2NaOH (dissolves to form alkali —
          soluble basic oxide)
        </li>
        <li>
          <strong>CaO</strong> + 2HCl → CaCl₂ + H₂O (reacts with acid)
        </li>
        <li>
          <strong>CuO</strong> + H₂SO₄ → CuSO₄ + H₂O (black copper oxide
          dissolves)
        </li>
        <li>
          <strong>Fe₂O₃</strong> + 6HCl → 2FeCl₃ + 3H₂O (insoluble basic oxide
          still reacts with acid)
        </li>
      </ul>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Acidic Oxides (Nonmetal Oxides)</h3>
      <p>
        Formed when nonmetals react with oxygen. They react with bases to form
        salt + water, and with water to form acids.
      </p>

      <div className="grid gap-2">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold">Carbon Dioxide</h4>
          <p className="text-xs text-muted-foreground">
            CO₂ + H₂O → H₂CO₃ (carbonic acid — makes rainwater slightly acidic)
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold">Sulphur Dioxide</h4>

          <EquationBlock
            equation={{
              id: "acid-rain-so2",
              latex: "SO_2 + H_2O \\longrightarrow H_2SO_3",
              description: "SO₂ → acid rain (sulphurous acid)",
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            SO₃ + H₂O → H₂SO₄ (sulphuric acid — stronger, more damaging)
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold">Reaction with Base</h4>
          <p className="text-xs text-muted-foreground">
            SO₂ + 2NaOH → Na₂SO₃ + H₂O (sulphur dioxide neutralised by alkali)
          </p>
        </div>
      </div>

      <h3>Amphoteric Oxides</h3>
      <p>React with BOTH acids and bases — like an acid-base chameleon:</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">With Acid</h4>
          <EquationBlock
            equation={{
              id: "alumina-acid",
              latex: "Al_2O_3 + 6HCl \\longrightarrow 2AlCl_3 + 3H_2O",
              description: "Al₂O₃ acts as a base with HCl",
            }}
          />
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">With Base</h4>
          <EquationBlock
            equation={{
              id: "alumina-base",
              latex: "Al_2O_3 + 2NaOH \\longrightarrow 2NaAlO_2 + H_2O",
              description: "Al₂O₃ acts as an acid with NaOH",
            }}
          />
        </div>
      </div>

      <p className="mt-2">
        Key amphoteric oxides: <strong>Al₂O₃</strong> (aluminium oxide),{" "}
        <strong>ZnO</strong> (zinc oxide), PbO, SnO.
      </p>

      <h3>Neutral Oxides</h3>
      <p>
        Some oxides are neither acidic nor basic — they do not react with acids
        or bases:
      </p>
      <ul>
        <li>
          <strong>CO</strong> (carbon monoxide) — neutral
        </li>
        <li>
          <strong>N₂O</strong> (nitrous oxide / laughing gas) — neutral
        </li>
        <li>
          <strong>NO</strong> (nitric oxide) — neutral
        </li>
      </ul>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "ox-we-1",
            question:
              "Classify the following oxides as acidic, basic, amphoteric, or neutral: Na₂O, SO₃, Al₂O₃, CO, MgO, N₂O.",
            hints: [
              "Is the element a metal, nonmetal, or metalloid?",
              "Metal oxides are typically basic; nonmetal oxides are typically acidic.",
              "Al and Zn are metalloids — their oxides can react both ways.",
              "Neutral oxides (CO, NO, N₂O) do not react with acids or bases.",
            ],
            solution:
              "Na₂O: basic (Group 1 metal oxide — reacts with acid). SO₃: acidic (nonmetal oxide — forms H₂SO₄ in water). Al₂O₃: amphoteric (reacts with both HCl and NaOH). CO: neutral (no reaction with acid or base). MgO: basic (metal oxide). N₂O: neutral (no acid/base reaction).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Metal oxides → basic (react with acid)",
          "Nonmetal oxides → acidic (react with base)",
          "Amphoteric: Al₂O₃, ZnO (both)",
          "Neutral: CO, NO, N₂O",
          "SO₂ + H₂O → H₂SO₃ (acid rain)",
          "Basic ≠ soluble (Fe₂O₃ insoluble)",
          "MONA: Metal Oxides Neutralise Acid",
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
      id: "ox-q1",
      type: "multiple-choice",
      prompt: "Which oxide is amphoteric?",
      answer: "Al₂O₃",
      options: ["Na₂O", "CO₂", "Al₂O₃", "SO₃"],
      explanation:
        "Al₂O₃ reacts with both acids (acting as a base) and bases (acting as an acid), making it amphoteric. Na₂O is basic; CO₂ and SO₃ are acidic.",
      difficulty: "recall",
    },
    {
      id: "ox-q2",
      type: "multiple-choice",
      prompt:
        "Sulphur dioxide (SO₂) dissolves in rainwater. What does this produce?",
      answer: "Sulphurous acid (H₂SO₃) — contributing to acid rain.",
      options: [
        "Sulphuric acid (H₂SO₄)",
        "Sulphurous acid (H₂SO₃)",
        "A basic solution",
        "A neutral solution",
      ],
      explanation:
        "SO₂ + H₂O → H₂SO₃ (sulphurous acid). Note: SO₃ + H₂O → H₂SO₄ (sulphuric acid) — a different oxide.",
      difficulty: "apply",
    },
    {
      id: "ox-q3",
      type: "true-false",
      prompt: "All metal oxides dissolve in water to form alkaline solutions.",
      answer: "False",
      explanation:
        "Only some metal oxides (e.g. Na₂O, CaO) dissolve in water. Others like CuO and Fe₂O₃ are insoluble but still react with acids — they are basic without being soluble.",
      difficulty: "apply",
    },
    {
      id: "ox-q4",
      type: "multiple-choice",
      prompt: "Which of the following is a neutral oxide?",
      answer: "CO",
      options: ["Na₂O", "CO₂", "CO", "SO₂"],
      explanation:
        "CO (carbon monoxide) is neutral — it doesn't react with acids or bases. Na₂O is basic, CO₂ and SO₂ are acidic.",
      difficulty: "recall",
    },
    {
      id: "ox-q5",
      type: "multiple-choice",
      prompt: "What is formed when zinc oxide reacts with sodium hydroxide?",
      answer: "Sodium zincate + water",
      options: [
        "Zinc hydroxide + sodium",
        "Sodium zincate + water",
        "Zinc + sodium + oxygen",
        "No reaction — ZnO is basic",
      ],
      explanation:
        "ZnO is amphoteric: ZnO + 2NaOH → Na₂ZnO₂ + H₂O (sodium zincate). This shows ZnO acting as an acid.",
      difficulty: "apply",
    },
    {
      id: "ox-q6",
      type: "explain-why",
      prompt:
        "Explain why Fe₂O₃ is classified as a basic oxide even though it does not dissolve in water to form an alkaline solution.",
      answer:
        "'Basic' refers to chemical behaviour, not solubility. Fe₂O₃ reacts with acids (e.g., Fe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O) in a neutralisation reaction, proving its basic nature. Solubility in water is a separate property — basic oxides that do dissolve (Na₂O, CaO) produce alkaline solutions, but insolubility doesn't negate basicity.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "acids-bases-salts",
    "ionic-bonds",
    "groups-periods",
    "periodic-trends",
  ],
  prerequisites: ["acids-bases-salts"],
};
