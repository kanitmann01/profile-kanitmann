"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is the purpose of meiosis?",
    answer: "To produce haploid gametes (sperm/eggs) with genetic variation",
    context: "Reduction division",
  },
  {
    id: "qf-2",
    question:
      "How many daughter cells are produced from one parent cell in meiosis?",
    answer: "4 haploid cells (genetically distinct)",
    context: "vs 2 diploid in mitosis",
  },
  {
    id: "qf-3",
    question: "What event during meiosis I generates genetic variation?",
    answer:
      "Crossing over (prophase I) and independent assortment (metaphase I)",
    context: "Sources of gamete diversity",
  },
];

export const meiosisNote: AtomicNote = {
  slug: "meiosis",
  subject: "biology",
  topic: "cell-biology",
  title: "Meiosis",
  summary:
    "A specialised type of cell division that reduces chromosome number by half (diploid → haploid), producing 4 genetically distinct daughter cells. Occurs in germ cells for gamete formation. Features: one round of replication, two rounds of division, crossing over, and independent assortment.",
  memoryHook:
    "Meiosis = 'Me' + 'osis' → I make eggs/sperm. Replication once, divide twice. Numbers: 2n → 1n. Prophase I: pairing (synapsis) + crossing over (chiasmata).",
  imatTrap:
    "Meiosis II is SIMILAR to mitosis (sister chromatids separate), but cells are haploid entering meiosis II, and there is NO DNA replication between meiosis I and II. Also: crossing over occurs in prophase I, NOT prophase II. The cells entering meiosis II are haploid, but each chromosome still has 2 sister chromatids.",
  whyItMatters:
    "Nondisjunction (failure of chromosomes to separate properly) in meiosis causes aneuploidies like Down syndrome (trisomy 21), Turner syndrome (monosomy X), and Klinefelter syndrome (XXY). Understanding meiosis is essential for reproductive medicine, prenatal screening, and understanding genetic diversity essential for evolution.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Meiosis I vs II — which reduces chromosome number",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Crossing over — which phase and effect on variation",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Comparison with mitosis",
    },
  ],
  equations: [
    {
      id: "meiosis-ploidy",
      latex:
        "2n \\xrightarrow{\\text{DNA replication}} 2n \\times 2 \\xrightarrow{\\text{Meiosis I}} n \\xrightarrow{\\text{Meiosis II}} n",
      description:
        "Ploidy changes through meiosis: replication → reduction I → equational II",
    },
    {
      id: "meiosis-variation",
      latex:
        "2^n\\ \\text{(independent assortment)} \\times \\text{crossing over}",
      description:
        "Number of possible gamete combinations = 2ⁿ (n = haploid number) × crossing over",
      variables:
        "n = haploid number (humans: n = 23 → 2²³ = ~8.4 million combinations)",
    },
  ],
  workedExamples: [
    {
      id: "meiosis-worked-1",
      question:
        "A cell with 2n = 6 undergoes meiosis. How many chromosomes does each gamete contain, and how many genetically distinct gametes can be produced from independent assortment alone?",
      hints: [
        "What is the haploid number for 2n = 6?",
        "How many chromosomes end up in each gamete?",
        "Formula for unique gametes from independent assortment?",
      ],
      solution:
        "2n = 6 means n = 3. Each gamete contains 3 chromosomes (haploid). From independent assortment alone: 2ⁿ = 2³ = 8 possible combinations. With crossing over, the number becomes essentially infinite — every gamete is unique. This enormous variation is why siblings (except identical twins) are genetically distinct.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Meiosis",
      url: "https://www.khanacademy.org/science/biology/cellular-molecular-biology/meiosis/v/phases-of-meiosis",
      type: "video",
      description: "Animated walkthrough of meiosis I and II",
    },
    {
      title: "Nature Scitable — Meiosis",
      url: "https://www.nature.com/scitable/topicpage/meiosis-12305680/",
      type: "article",
      description: "Detailed coverage of meiotic phases and recombination",
    },
    {
      title: "OpenStax Biology 2e — Meiosis",
      url: "https://openstax.org/books/biology-2e/pages/11-1-the-process-of-meiosis",
      type: "textbook",
      description: "Free textbook chapter with diagrams of meiotic stages",
    },
  ],
  highYieldPoints: [
    "Meiosis I: reduction division — homologous chromosomes separate (2n → n)",
    "Meiosis II: equational division — sister chromatids separate (like mitosis, but haploid)",
    "Prophase I: synapsis (homologous pairing) → bivalents → crossing over at chiasmata",
    "Crossing over: exchange of genetic material between non-sister chromatids — increases variation",
    "Independent assortment: homologous chromosomes align randomly at metaphase I → 2ⁿ combinations",
    "Nondisjunction: failure to separate → aneuploidy (trisomy, monosomy) — more common in maternal meiosis I",
    "Replication once (S phase of interphase), divide twice — no S phase between meiosis I and II",
  ],
  explanation: (
    <div>
      <p>
        <strong>Meiosis</strong> is a specialised cell division that produces
        <strong>haploid gametes</strong> (sperm and eggs) from diploid germ
        cells. It involves one DNA replication followed by two rounds of
        division, producing 4 genetically unique haploid cells.
      </p>

      <h3>Meiosis I — Reduction Division</h3>

      <h4>Prophase I</h4>
      <p>
        The defining stage of meiosis. <strong>Synapsis</strong> occurs:
        homologous chromosomes pair up to form <strong>bivalents</strong>{" "}
        (tetrads).
        <strong>Crossing over</strong> occurs at <strong>chiasmata</strong> —
        points where non-sister chromatids exchange genetic material. This
        creates recombinant chromatids.
      </p>

      <h4>Metaphase I</h4>
      <p>
        Bivalents align at the metaphase plate. The orientation of each bivalent
        is random — this is <strong>independent assortment</strong>. Each
        daughter cell gets a random mix of maternal and paternal chromosomes.
      </p>

      <h4>Anaphase I</h4>
      <p>
        <strong>Homologous chromosomes separate</strong> (each still consists of
        two sister chromatids). The chromosome number is reduced from 2n to n.
        Sister chromatids remain attached.
      </p>

      <h4>Telophase I</h4>
      <p>
        Chromosomes arrive at poles. Cytokinesis produces two haploid cells (but
        each chromosome has 2 chromatids). No S phase between meiosis I and II.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Meiosis II — Equational Division</h3>
      <p>
        Essentially <strong>identical to mitosis</strong> but starting with
        haploid cells. Prophase II → Metaphase II → Anaphase II (sister
        chromatids separate) → Telophase II → 4 haploid daughter cells, each
        with 1 copy of each chromosome.
      </p>

      <h3>Sources of Genetic Variation</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="font-semibold text-sm text-blue-600">
            Crossing Over (Prophase I)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Reciprocal exchange between non-sister chromatids. Creates new
            combinations of alleles on the same chromosome. Humans: average 2–3
            crossovers per chromosome pair.
          </p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="font-semibold text-sm text-green-600">
            Independent Assortment (Metaphase I)
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Random alignment of bivalents. 2²³ ≈ 8.4 million possible
            combinations per gamete in humans (before crossing over).
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm text-amber-600">
            Random Fertilisation
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Any sperm (8.4M possibilities) × any egg (8.4M possibilities) → ~70
            trillion possible zygotes.
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Meiosis vs Mitosis</h3>
      <div className="grid grid-cols-2 gap-3 rounded-lg border bg-card p-4 text-sm">
        <div>
          <h4 className="font-semibold text-blue-500">Meiosis</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>2 divisions → 4 cells</li>
            <li>Haploid daughter cells</li>
            <li>Genetically different</li>
            <li>Crossing over + independent assortment</li>
            <li>Gametes (germ cells)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-green-500">Mitosis</h4>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>1 division → 2 cells</li>
            <li>Diploid daughter cells</li>
            <li>Genetically identical</li>
            <li>No crossing over</li>
            <li>Somatic (body) cells</li>
          </ul>
        </div>
      </div>

      <h3>Nondisjunction</h3>
      <p>
        Failure of chromosomes to separate properly in anaphase I or II. Can
        lead to trisomy (extra chromosome) or monosomy (missing chromosome). The
        risk of nondisjunction increases dramatically with maternal age. Most
        common viable trisomies: 21 (Down), 18 (Edwards), 13 (Patau).
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "meiosis-worked-1",
            question:
              "A cell with 2n = 6 undergoes meiosis. How many chromosomes does each gamete contain, and how many genetically distinct gametes can be produced from independent assortment alone?",
            hints: [
              "What is the haploid number for 2n = 6?",
              "How many chromosomes end up in each gamete?",
              "Formula for unique gametes from independent assortment?",
            ],
            solution:
              "2n = 6 means n = 3. Each gamete contains 3 chromosomes (haploid). From independent assortment alone: 2ⁿ = 2³ = 8 possible combinations. With crossing over, the number becomes essentially infinite.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Meiosis I: reduction (2n → n), homologous pairs separate",
          "Meiosis II: equational, sister chromatids separate",
          "Prophase I: synapsis + crossing over (chiasmata)",
          "Independent assortment: random orientation at metaphase I",
          "4 unique haploid daughter cells (vs 2 identical diploid in mitosis)",
          "Nondisjunction → aneuploidy (trisomy/monosomy)",
          "Replication ×1, division ×2 — no S phase between I and II",
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
      id: "meiosis-q1",
      type: "multiple-choice",
      prompt: "During which phase does crossing over occur?",
      answer: "Prophase I",
      difficulty: "recall",
      options: ["Prophase I", "Prophase II", "Metaphase I", "Anaphase I"],
    },
    {
      id: "meiosis-q2",
      type: "multiple-choice",
      prompt: "How many daughter cells result from one round of meiosis?",
      answer: "4 haploid cells",
      difficulty: "recall",
      options: [
        "2 diploid cells",
        "2 haploid cells",
        "4 haploid cells",
        "4 diploid cells",
      ],
    },
    {
      id: "meiosis-q3",
      type: "multiple-choice",
      prompt: "Which of the following distinguishes meiosis I from meiosis II?",
      answer:
        "Homologous chromosomes separate in meiosis I, sister chromatids in meiosis II",
      difficulty: "recall",
      options: [
        "DNA replication occurs before meiosis I but not before meiosis II",
        "Homologous chromosomes separate in meiosis I, sister chromatids in meiosis II",
        "Meiosis I occurs in females only",
        "Meiosis II involves crossing over",
      ],
    },
    {
      id: "meiosis-q4",
      type: "multiple-choice",
      prompt:
        "For a species with 2n = 8, how many chromosomes are in each gamete?",
      answer: "4",
      difficulty: "apply",
      options: ["2", "4", "8", "16"],
    },
    {
      id: "meiosis-q5",
      type: "multiple-choice",
      prompt: "Down syndrome (trisomy 21) is most commonly caused by:",
      answer: "Nondisjunction during maternal meiosis I",
      difficulty: "apply",
      options: [
        "Nondisjunction during maternal meiosis I",
        "Crossing over during prophase I",
        "Independent assortment of chromosome 21",
        "Mutation in chromosome 21",
      ],
      imatYear: 2022,
    },
    {
      id: "meiosis-q6",
      type: "explain-why",
      prompt:
        "Explain why genetic variation from sexual reproduction is advantageous for a population.",
      answer:
        "Sexual reproduction (meiosis + fertilisation) generates enormous genetic variation. In a changing environment, diverse genotypes increase the likelihood that some individuals will have traits that confer survival advantage. Variation is the raw material for natural selection — populations with low genetic diversity (e.g., cheetahs) are more vulnerable to disease and environmental change.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "mitosis",
    "cell-cycle",
    "inheritance-patterns",
    "mendelian-genetics",
    "dna-replication",
  ],
  prerequisites: ["cell-cycle", "mitosis"],
};
