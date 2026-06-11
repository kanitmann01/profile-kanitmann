"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What are the three components of a nucleotide?",
    answer:
      "Phosphate group, pentose sugar (ribose/deoxyribose), nitrogenous base",
    context: "Building block of nucleic acids",
  },
  {
    id: "qf-2",
    question: "What type of bond links nucleotides in a polynucleotide chain?",
    answer: "Phosphodiester bond (3'-5' linkage)",
    context: "Between sugar and phosphate",
  },
  {
    id: "qf-3",
    question: "How do purines differ from pyrimidines?",
    answer:
      "Purines have 2 rings (adenine, guanine); pyrimidines have 1 ring (cytosine, thymine, uracil)",
    context: "Base ring structure",
  },
];

export const nucleicAcidsNote: AtomicNote = {
  slug: "nucleic-acids",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Nucleic Acids",
  summary:
    "Polymers of nucleotides that store and transmit genetic information. DNA (deoxyribonucleic acid) is the hereditary material; RNA (ribonucleic acid) is involved in gene expression. Nucleotides also serve as energy carriers (ATP) and signalling molecules (cAMP).",
  memoryHook:
    "Nucleotide = phosphate + sugar (ribose/deoxyribose) + base. Purines (2 rings): AG (Adenine, Guanine). Pyrimidines (1 ring): CUT (Cytosine, Uracil, Thymine).",
  imatTrap:
    "The difference between DNA and RNA is NOT only the base T vs U — the sugar is also different: deoxyribose (DNA, missing 2'-OH) vs ribose (RNA, has 2'-OH). The 2'-OH makes RNA more reactive and less stable. Also: 'nucleotide' has phosphate — 'nucleoside' has NO phosphate (just sugar + base). This distinction is frequently tested.",
  whyItMatters:
    "Nucleic acids are the basis of heredity, gene therapy (fixing faulty genes), forensic DNA profiling, PCR for COVID testing, mRNA vaccines, and CRISPR gene editing. Understanding nucleic acid chemistry is essential for modern molecular medicine.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "DNA vs RNA differences (sugar + base)",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Purine vs pyrimidine identification",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Phosphodiester bond formation",
    },
  ],
  equations: [
    {
      id: "na-nucleotide",
      latex:
        "\\text{Nucleoside} + P_i \\longrightarrow \\text{Nucleotide} + H_2O",
      description: "Nucleotide = nucleoside (sugar + base) + phosphate group",
    },
    {
      id: "na-chargaff",
      latex: "A = T, \\quad G = C \\quad (\\text{DNA})",
      description: "Chargaff's rules: base pairing in DNA (A=T, G≡C)",
    },
    {
      id: "na-phosphodiester",
      latex:
        "\\text{Nucleotide}_1 + \\text{Nucleotide}_2 \\longrightarrow \\text{Dinucleotide} + H_2O",
      description:
        "Phosphodiester bond formation between adjacent nucleotides (3'-5' linkage)",
    },
  ],
  workedExamples: [
    {
      id: "na-worked-1",
      question:
        "A DNA sample is analysed and found to contain 30% adenine. Using Chargaff's rules, determine the percentages of thymine, guanine, and cytosine.",
      hints: [
        "Chargaff's rules: A pairs with T, G pairs with C",
        "A + T + G + C = 100%",
        "If A = 30%, what must T be?",
      ],
      solution:
        "A = T, so T = 30%. This accounts for 60% (A+T). Remaining 40% is G+C. Since G = C, each = 20%. So: A = 30%, T = 30%, G = 20%, C = 20%. This is a classic IMAT question pattern — every year there's a Chargaff's rule calculation.",
      imatYear: 2023,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Nucleic Acids",
      url: "https://www.khanacademy.org/science/biology/macromolecules/nucleic-acids/a/nucleic-acids",
      type: "article",
      description: "Nucleotide structure and DNA/RNA comparison",
    },
    {
      title: "OpenStax Biology 2e — Nucleic Acids",
      url: "https://openstax.org/books/biology-2e/pages/3-5-nucleic-acids",
      type: "textbook",
      description: "Free textbook chapter on nucleic acid structure",
    },
    {
      title: "Nature Scitable — DNA Structure",
      url: "https://www.nature.com/scitable/topicpage/dna-is-a-structure-that-encodes-biological-6493050/",
      type: "article",
      description: "Detailed DNA structure with historical context",
    },
  ],
  highYieldPoints: [
    "Nucleotide = phosphate + pentose sugar + nitrogenous base",
    "DNA: deoxyribose (no 2'-OH), bases: A, G, C, T (thymine)",
    "RNA: ribose (has 2'-OH), bases: A, G, C, U (uracil) — less stable",
    "Purines: A, G (2 rings); Pyrimidines: C, T, U (1 ring)",
    "Chargaff's rules: A=T and G=C in DNA",
    "Phosphodiester bonds: 3'-OH of one sugar to 5'-phosphate of next",
    "DNA = double helix (antiparallel); RNA = usually single-stranded",
  ],
  explanation: (
    <div>
      <p>
        <strong>Nucleic acids</strong> are polymers of{" "}
        <strong>nucleotides</strong>
        that carry genetic information. The two types are DNA (deoxyribonucleic
        acid) and RNA (ribonucleic acid). Each nucleotide has three components:
        a<strong>phosphate group</strong>, a <strong>pentose sugar</strong>, and
        a<strong>nitrogenous base</strong>.
      </p>

      <h3>Nucleotides vs Nucleosides</h3>
      <p>
        A <strong>nucleoside</strong> = sugar + base (no phosphate). A{" "}
        <strong>nucleotide</strong> = sugar + base + phosphate. The phosphate is
        attached to the 5' carbon of the sugar via an ester bond. Nucleotides
        are the monomers; nucleosides are nucleotides minus the phosphate.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Nitrogenous Bases</h3>
      <p>
        <strong>Purines</strong> (2 fused rings): <strong>A</strong>denine and{" "}
        <strong>G</strong>uanine. <strong>Pyrimidines</strong> (1 ring):{" "}
        <strong>C</strong>ytosine, <strong>T</strong>hymine (DNA only),{" "}
        <strong>U</strong>racil (RNA only). Mnemonic: "Purines = AG (pure as
        gold)", Pyrimidines = CUT (C, U, T).
      </p>

      <h3>Phosphodiester Bonds</h3>
      <p>
        Nucleotides are joined by <strong>phosphodiester bonds</strong> — the
        3'-hydroxyl (OH) group of one sugar reacts with the 5'-phosphate of the
        next nucleotide, releasing water. This creates a sugar-phosphate
        backbone with bases projecting sideways.
      </p>

      <EquationBlock
        equation={{
          id: "na-phosphodiester",
          latex:
            "\\text{Nucleotide}_1 + \\text{Nucleotide}_2 \\longrightarrow \\text{Dinucleotide} + H_2O",
          description: "Phosphodiester bond formation (3'-5' linkage)",
        }}
      />

      <h3>DNA vs RNA</h3>
      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-card p-4">
        <div>
          <h4 className="text-sm font-semibold text-blue-500">DNA</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>Deoxyribose (no 2'-OH)</li>
            <li>Bases: A, G, C, T</li>
            <li>Double-stranded (helix)</li>
            <li>Stable — stores info long-term</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-red-500">RNA</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>Ribose (has 2'-OH)</li>
            <li>Bases: A, G, C, U</li>
            <li>Usually single-stranded</li>
            <li>Less stable — transient roles</li>
          </ul>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Chargaff's Rules</h3>
      <p>
        Erwin Chargaff discovered that in any DNA molecule, the amount of
        adenine equals thymine (A = T) and guanine equals cytosine (G = C). This
        is because A pairs with T (2 H-bonds) and G pairs with C (3 H-bonds) in
        the double helix.
      </p>

      <EquationBlock
        equation={{
          id: "na-chargaff",
          latex: "A = T, \\quad G = C \\quad (\\text{DNA})",
          description: "Chargaff's base pairing rules",
        }}
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "na-worked-1",
            question:
              "A DNA sample is analysed and found to contain 30% adenine. Using Chargaff's rules, determine the percentages of thymine, guanine, and cytosine.",
            hints: [
              "Chargaff's rules: A pairs with T, G pairs with C",
              "A + T + G + C = 100%",
              "If A = 30%, what must T be?",
            ],
            solution:
              "A = T, so T = 30%. This accounts for 60% (A+T). Remaining 40% is G+C. Since G = C, each = 20%. So: A = 30%, T = 30%, G = 20%, C = 20%. This is a classic IMAT question pattern.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Nucleotide = phosphate + sugar + base",
          "Nucleoside = sugar + base (no phosphate)",
          "Purines: A, G (2 rings); Pyrimidines: C, T, U (1 ring)",
          "DNA: deoxyribose, A-T (2 bonds), G-C (3 bonds)",
          "RNA: ribose, A-U, G-C (single-stranded)",
          "Phosphodiester bond: 3'-5' linkage",
          "Chargaff: A=T, G=C (only for double-stranded DNA)",
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
      id: "na-q1",
      type: "multiple-choice",
      prompt: "What sugar is found in RNA?",
      answer: "Ribose",
      difficulty: "recall",
      options: ["Deoxyribose", "Ribose", "Glucose", "Fructose"],
    },
    {
      id: "na-q2",
      type: "multiple-choice",
      prompt: "Which base is found in DNA but NOT in RNA?",
      answer: "Thymine",
      difficulty: "recall",
      options: ["Adenine", "Guanine", "Cytosine", "Thymine"],
    },
    {
      id: "na-q3",
      type: "multiple-choice",
      prompt: "How many hydrogen bonds form between guanine and cytosine?",
      answer: "3",
      difficulty: "recall",
      options: ["1", "2", "3", "4"],
    },
    {
      id: "na-q4",
      type: "multiple-choice",
      prompt: "What type of bond joins nucleotides in a polynucleotide chain?",
      answer: "Phosphodiester bond",
      difficulty: "apply",
      options: [
        "Peptide bond",
        "Glycosidic bond",
        "Phosphodiester bond",
        "Hydrogen bond",
      ],
    },
    {
      id: "na-q5",
      type: "multiple-choice",
      prompt: "If a DNA molecule has 30% guanine, what percentage is adenine?",
      answer: "20%",
      difficulty: "apply",
      options: ["30%", "20%", "40%", "70%"],
      imatYear: 2024,
    },
    {
      id: "na-q6",
      type: "explain-why",
      prompt: "Why does the 2'-OH group in RNA make it less stable than DNA?",
      answer:
        "The 2'-OH group in RNA is a nucleophile that can attack the adjacent phosphodiester bond, causing spontaneous hydrolysis (cleavage). DNA lacks this OH group, making it chemically more stable — essential for long-term genetic storage.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "dna-structure",
    "dna-replication",
    "genetic-code",
    "proteins",
    "atp",
  ],
  prerequisites: ["proteins"],
};
