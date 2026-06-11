"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "fg-qf-1",
    question: "What suffix do aldehydes use in IUPAC naming?",
    answer: "-al",
    context: "Aldehyde = -CHO at end of chain",
  },
  {
    id: "fg-qf-2",
    question: "Can ketones be oxidised to carboxylic acids?",
    answer: "No — no H on carbonyl carbon",
    context: "Only aldehydes can be oxidised",
  },
];

export const functionalGroupsNote: AtomicNote = {
  slug: "functional-groups",
  subject: "chemistry",
  topic: "organic-chemistry",
  title: "Functional Groups",
  summary:
    "Specific groups of atoms within organic molecules that determine chemical reactivity — alcohols (-OH), aldehydes (-CHO), ketones (C=O), carboxylic acids (-COOH), esters (-COO-), and amines (-NH₂).",
  memoryHook:
    "Alcohol = '-ol' (OH); Aldehyde = '-al' (CHO at end); Ketone = '-one' (C=O in middle); Carboxylic acid = '-oic acid' (COOH); Ester = '-oate' (COO); Amine = '-amine' (NH₂). 'Aldehydes are terminal, ketones are internal.'",
  imatTrap:
    "Carboxylic acids are weak acids (partial dissociation) — don't confuse them with strong mineral acids. Esters smell fruity — this is a common IMAT fact. Aldehydes can be oxidised to carboxylic acids, but ketones cannot (no H on the carbonyl carbon). Also: ethanol (alcohol) and dimethyl ether (ether) are functional group isomers — same formula C₂H₆O.",
  whyItMatters:
    "Functional groups determine the properties and reactions of organic molecules. Biological macromolecules (amino acids, sugars, fats) are defined by their functional groups. IMAT tests identification, naming, and interconversion reactions.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Identify functional group from structure or name",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Oxidation of primary vs secondary alcohols",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "Esterification reaction and products",
    },
  ],
  equations: [
    {
      id: "esterification",
      latex:
        "RCOOH + R'OH \\overset{H_2SO_4}{\\rightleftharpoons} RCOOR' + H_2O",
      description:
        "Esterification: carboxylic acid + alcohol → ester + water (reversible, H₂SO₄ catalyst)",
    },
    {
      id: "alcohol-oxidation-primary",
      latex: "RCH_2OH \\xrightarrow{[O]} RCHO \\xrightarrow{[O]} RCOOH",
      description:
        "Oxidation of primary alcohol: first to aldehyde, then to carboxylic acid",
    },
    {
      id: "ester-hydrolysis",
      latex: "RCOOR' + NaOH \\longrightarrow RCOO^-Na^+ + R'OH",
      description: "Saponification: ester + base → carboxylate salt + alcohol",
    },
  ],
  workedExamples: [
    {
      id: "fg-we-1",
      question:
        "Propan-1-ol is oxidised under reflux with acidified potassium dichromate(VI). Identify the product and explain the colour change observed.",
      hints: [
        "Propan-1-ol is a primary alcohol — what does that mean for the oxidation pathway?",
        "What colour is dichromate(VI) (Cr₂O₇²⁻) and what colour is the Cr³⁺ product?",
        "Under reflux, does the oxidation stop at the aldehyde or proceed to the carboxylic acid?",
      ],
      solution:
        "Propan-1-ol (primary alcohol) → propanal (aldehyde) → propanoic acid (carboxylic acid) under reflux. The orange Cr₂O₇²⁻ (dichromate) is reduced to green Cr³⁺. The colour change: orange → green. If distilled immediately, the aldehyde can be collected before further oxidation.",
    },
    {
      id: "fg-we-2",
      question:
        "Name the functional group in each: (a) CH₃COCH₃ (b) CH₃CH₂NH₂ (c) CH₃COOCH₂CH₃ (d) CH₃CH₂CHO",
      hints: [
        "Look at the suffix/IUPAC class",
        "C=O in middle vs at end",
        "-NH₂ is characteristic of which group?",
        "COO linkage suggests an ester",
      ],
      solution:
        "(a) CH₃COCH₃ = propanone — ketone (C=O in middle). (b) CH₃CH₂NH₂ = ethylamine — amine (-NH₂). (c) CH₃COOCH₂CH₃ = ethyl ethanoate — ester (-COO-). (d) CH₃CH₂CHO = propanal — aldehyde (CHO at end).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Functional Groups",
      url: "https://www.khanacademy.org/science/organic-chemistry/functional-groups/v/functional-groups",
      type: "video",
      description: "Comprehensive overview of all major functional groups",
    },
    {
      title: "Chemistry Steps — Functional Groups Summary",
      url: "https://www.chemistrysteps.com/functional-groups-organic-chemistry/",
      type: "article",
      description: "Reference guide with naming rules and key reactions",
    },
    {
      title: "RSC — Organic Functional Groups Flash Cards",
      url: "https://edu.rsc.org/resources/functional-groups-flash-cards/",
      type: "practice",
      description:
        "Interactive flash cards for functional group identification",
    },
  ],
  highYieldPoints: [
    "Alcohol (-OH): suffix -ol; polar, H-bonding; can be oxidised",
    "Aldehyde (-CHO): suffix -al; terminal carbonyl; can be oxidised to carboxylic acid",
    "Ketone (C=O): suffix -one; internal carbonyl; CANNOT be easily oxidised",
    "Carboxylic acid (-COOH): suffix -oic acid; weak acid; reacts with alcohols → esters",
    "Ester (-COO-): suffix -oate; fruity smell; formed by esterification",
    "Amine (-NH₂): suffix -amine; basic (lone pair on N accepts H⁺)",
    "Primary alcohol → aldehyde → carboxylic acid (reflux). Secondary alcohol → ketone.",
  ],
  explanation: (
    <div>
      <h3>Key Functional Groups</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border-l-4 border-l-blue-500 p-3">
          <h4 className="font-semibold text-sm">
            Alcohol (−OH) — suffix: <strong>-ol</strong>
          </h4>
          <p className="text-xs text-muted-foreground">
            Ethanol (CH₃CH₂OH). Polar, hydrogen-bonding, soluble in water (short
            chains). Primary (RCH₂OH), secondary (RR'CHOH), tertiary
            (RR'R''COH).
          </p>
        </div>
        <div className="rounded-lg border-l-4 border-l-amber-500 p-3">
          <h4 className="font-semibold text-sm">
            Aldehyde (−CHO) — suffix: <strong>-al</strong>
          </h4>
          <p className="text-xs text-muted-foreground">
            Ethanal (CH₃CHO). Carbonyl at the END of chain. Can be oxidised to
            carboxylic acids — used to distinguish from ketones.
          </p>
        </div>
        <div className="rounded-lg border-l-4 border-l-red-500 p-3">
          <h4 className="font-semibold text-sm">
            Ketone (C=O) — suffix: <strong>-one</strong>
          </h4>
          <p className="text-xs text-muted-foreground">
            Propanone (CH₃COCH₃). Carbonyl in the MIDDLE. Cannot be oxidised —
            no H on carbonyl carbon. This is the key difference from aldehydes.
          </p>
        </div>
        <div className="rounded-lg border-l-4 border-l-green-500 p-3">
          <h4 className="font-semibold text-sm">
            Carboxylic Acid (−COOH) — suffix: <strong>-oic acid</strong>
          </h4>
          <p className="text-xs text-muted-foreground">
            Ethanoic acid (CH₃COOH). Weak acid (Kₐ ≈ 1.8 × 10⁻⁵). Reacts with
            bases to form salts and with alcohols to form esters.
          </p>
        </div>
        <div className="rounded-lg border-l-4 border-l-purple-500 p-3">
          <h4 className="font-semibold text-sm">
            Ester (−COO−) — suffix: <strong>-oate</strong>
          </h4>
          <p className="text-xs text-muted-foreground">
            Ethyl ethanoate (CH₃COOCH₂CH₃). Fruity smells (pear, banana, apple).
            Formed by esterification. Hydrolysed by NaOH in saponification.
          </p>
        </div>
        <div className="rounded-lg border-l-4 border-l-pink-500 p-3">
          <h4 className="font-semibold text-sm">
            Amine (−NH₂) — suffix: <strong>-amine</strong>
          </h4>
          <p className="text-xs text-muted-foreground">
            Methylamine (CH₃NH₂). Derivatives of ammonia. Basic (lone pair on N
            accepts H⁺). Found in amino acids and neurotransmitters.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Key Reactions</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold">Esterification</h4>
          <EquationBlock
            equation={{
              id: "esterification",
              latex:
                "RCOOH + R'OH \\overset{H_2SO_4}{\\rightleftharpoons} RCOOR' + H_2O",
              description: "Carboxylic acid + alcohol ⇌ ester + water",
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Reversible, conc. H₂SO₄ catalyst, heat under reflux
          </p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Oxidation of Alcohols</h4>
          <EquationBlock
            equation={{
              id: "alcohol-oxidation-primary",
              latex: "RCH_2OH \\xrightarrow{[O]} RCHO \\xrightarrow{[O]} RCOOH",
              description: "Primary alcohol → aldehyde → carboxylic acid",
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Secondary alcohol → ketone. Tertiary — no reaction (no H on C-OH).
          </p>
        </div>

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold">
            Saponification (Ester Hydrolysis)
          </h4>
          <EquationBlock
            equation={{
              id: "ester-hydrolysis",
              latex: "RCOOR' + NaOH \\longrightarrow RCOO^-Na^+ + R'OH",
              description:
                "Ester + base → carboxylate salt + alcohol (soap-making)",
            }}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Used in soap making — triglycerides + NaOH → soap + glycerol
          </p>
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
            id: "fg-we-1",
            question:
              "Propan-1-ol is oxidised under reflux with acidified potassium dichromate(VI). Identify the product and explain the colour change observed.",
            hints: [
              "Propan-1-ol is a primary alcohol — what does that mean for the oxidation pathway?",
              "What colour is dichromate(VI) and what colour is the Cr³⁺ product?",
              "Under reflux, does the oxidation stop at the aldehyde or proceed further?",
            ],
            solution:
              "Propan-1-ol (primary alcohol) → propanal (aldehyde) → propanoic acid (carboxylic acid) under reflux. The orange Cr₂O₇²⁻ is reduced to green Cr³⁺. Colour change: orange → green.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Alcohol (-ol): OH, can be oxidised",
          "Aldehyde (-al): terminal CHO, oxidisable",
          "Ketone (-one): internal C=O, not oxidisable",
          "Carboxylic acid (-oic acid): weak acid",
          "Ester (-oate): fruity, from acid + alcohol",
          "Amine (-amine): basic, NH₂ group",
          "Esterification: acid + alc ↔ ester + H₂O",
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
      id: "fg-q1",
      type: "multiple-choice",
      prompt: "Which functional group is present in ethanal (CH₃CHO)?",
      answer: "Aldehyde (−CHO)",
      options: [
        "Alcohol (−OH)",
        "Aldehyde (−CHO)",
        "Ketone (C=O)",
        "Carboxylic acid (−COOH)",
      ],
      explanation:
        "Ethanal has the suffix '-al', indicating an aldehyde. The carbonyl group (C=O) is at the end of the chain: CH₃-CHO.",
      difficulty: "recall",
    },
    {
      id: "fg-q2",
      type: "multiple-choice",
      prompt: "What are the products of esterification?",
      answer: "Ester + water",
      options: [
        "Acid + alcohol",
        "Ester + water",
        "Aldehyde + water",
        "Ketone + hydrogen",
      ],
      explanation:
        "Esterification: carboxylic acid + alcohol ⇌ ester + water. It is a condensation reaction (water is released) catalysed by concentrated H₂SO₄.",
      difficulty: "recall",
    },
    {
      id: "fg-q3",
      type: "true-false",
      prompt:
        "Ketones can be oxidised to carboxylic acids using acidified dichromate.",
      answer: "False",
      explanation:
        "Ketones cannot be easily oxidised because there is no hydrogen atom on the carbonyl carbon. Aldehydes (which have this H) can be oxidised to carboxylic acids.",
      difficulty: "apply",
    },
    {
      id: "fg-q4",
      type: "multiple-choice",
      prompt: "What is the IUPAC suffix for an ester?",
      answer: "-oate",
      options: ["-ol", "-al", "-oate", "-oic acid"],
      explanation:
        "Esters end in -oate. Ethyl ethanoate (CH₃COOCH₂CH₃) is a common example with a fruity smell.",
      difficulty: "recall",
    },
    {
      id: "fg-q5",
      type: "multiple-choice",
      prompt: "Propan-2-ol is oxidised. What is the product?",
      answer: "Propanone (a ketone)",
      options: [
        "Propanal (an aldehyde)",
        "Propanoic acid",
        "Propanone (a ketone)",
        "No reaction",
      ],
      explanation:
        "Propan-2-ol is a secondary alcohol. Oxidation of secondary alcohols yields ketones. Propan-2-ol → propanone.",
      difficulty: "apply",
    },
    {
      id: "fg-q6",
      type: "explain-why",
      prompt:
        "Explain why aldehydes can be oxidised to carboxylic acids but ketones cannot.",
      answer:
        "Aldehydes have at least one H atom bonded to the carbonyl carbon (R-CHO). This H can be removed during oxidation, converting the C=O to COOH. Ketones have the carbonyl carbon bonded to two R groups (R-CO-R') — no H to remove — so oxidation cannot occur without breaking C-C bonds, which requires harsh conditions.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "hydrocarbons",
    "covalent-bonds",
    "acids-bases-salts",
    "oxidation-reduction",
  ],
  prerequisites: ["hydrocarbons", "covalent-bonds"],
};
