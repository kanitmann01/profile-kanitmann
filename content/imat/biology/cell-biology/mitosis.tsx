"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is the result of mitosis?",
    answer: "Two genetically identical diploid daughter cells",
    context: "Growth and repair",
  },
  {
    id: "qf-2",
    question: "In which phase do sister chromatids separate?",
    answer: "Anaphase",
    context: "Pulled by spindle fibres",
  },
  {
    id: "qf-3",
    question: "What structure forms in prophase to help move chromosomes?",
    answer: "The mitotic spindle (microtubules from centrosomes)",
    context: "Molecular machinery",
  },
];

export const mitosisNote: AtomicNote = {
  slug: "mitosis",
  subject: "biology",
  topic: "cell-biology",
  title: "Mitosis",
  summary:
    "The process of nuclear division that produces two genetically identical daughter nuclei. Phases: prophase → prometaphase → metaphase → anaphase → telophase. Followed by cytokinesis (cytoplasmic division). Mitosis ensures faithful chromosome segregation for growth, repair, and asexual reproduction.",
  memoryHook:
    "IPMAT: Interphase (chromosomes duplicated), Prophase (condense), Metaphase (align at equator), Anaphase (separate), Telophase (re-form nuclei).",
  imatTrap:
    "Cytokinesis is NOT part of mitosis — it is a separate process that usually overlaps with the end of mitosis. Also: the number of chromosomes does NOT change during mitosis (chromatid number changes). Each daughter cell has the same number of chromosomes as the parent. The confusion: at anaphase, chromatids separate, so the CHROMATID count doubles, but the CHROMOSOME count per pole remains the same as the parent cell.",
  whyItMatters:
    "Mitosis is essential for embryonic development, wound healing, and tissue turnover. Errors in chromosome segregation (mitotic nondisjunction) contribute to cancer (aneuploidy, chromosomal instability). Many chemotherapy drugs target the mitotic spindle: taxanes stabilise microtubules (block anaphase), vinca alkaloids prevent spindle formation.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Events of each mitotic phase",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Cytokinesis differences: plant vs animal",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Chromosome vs chromatid counting",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "mitosis-worked-1",
      question:
        "A cell with 2n = 4 (two pairs of chromosomes) is in metaphase of mitosis. How many chromosomes and chromatids are present?",
      hints: [
        "In metaphase, are chromosomes duplicated or unduplicated?",
        "How many chromatids per duplicated chromosome?",
        "What is the relationship between 2n and chromosome count?",
      ],
      solution:
        "2n = 4 means the cell has 4 chromosomes before S phase. After DNA replication, each chromosome consists of 2 sister chromatids (still 4 chromosomes, but 8 chromatids). At metaphase, the 4 duplicated chromosomes (8 chromatids) align at the plate. Anaphase: 8 chromatids → separate → 8 chromosomes (4 going to each pole). After mitosis: each daughter cell has 4 chromosomes (unduplicated, 2n = 4).",
      imatYear: 2024,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Mitosis",
      url: "https://www.khanacademy.org/science/biology/cellular-molecular-biology/mitosis/v/mitosis",
      type: "video",
      description: "Animated walkthrough of mitotic phases",
    },
    {
      title: "Nature Scitable — Mitosis",
      url: "https://www.nature.com/scitable/topicpage/mitosis-and-cell-division-205/",
      type: "article",
      description:
        "Detailed coverage of spindle assembly and chromosome segregation",
    },
    {
      title: "OpenStax Biology 2e — Mitosis",
      url: "https://openstax.org/books/biology-2e/pages/10-3-mitosis",
      type: "textbook",
      description: "Free textbook chapter with mitotic stage diagrams",
    },
  ],
  highYieldPoints: [
    "Result: 2 genetically identical diploid daughter cells (same chromosome number as parent)",
    "Prophase: chromosomes condense, nuclear envelope breaks down, spindle forms",
    "Metaphase: chromosomes align at metaphase plate, spindle fibres attach to kinetochores",
    "Anaphase: sister chromatids separate (now called chromosomes), pulled to opposite poles",
    "Telophase: nuclear envelopes re-form, chromosomes decondense",
    "Cytokinesis: animal cells = cleavage furrow (actin/myosin ring); plant cells = cell plate (vesicles from Golgi)",
    "Number of chromosomes constant; number of chromatids doubles in S phase and halves at anaphase",
  ],
  explanation: (
    <div>
      <p>
        <strong>Mitosis</strong> is nuclear division that produces two
        genetically identical daughter nuclei. It is essential for{" "}
        <strong>growth</strong>,<strong>tissue repair</strong>, and{" "}
        <strong>asexual reproduction</strong>. While mitosis divides the
        nucleus, <strong>cytokinesis</strong> divides the cytoplasm.
      </p>

      <h3>The Phases of Mitosis</h3>

      <h4>Prophase</h4>
      <p>
        Chromatin condenses into visible <strong>chromosomes</strong> (each
        consisting of 2 sister chromatids). The <strong>mitotic spindle</strong>{" "}
        forms, extending from centrosomes (which have moved to opposite poles).
        The nucleolus disappears.
      </p>

      <h4>Prometaphase</h4>
      <p>
        The nuclear envelope breaks down.{" "}
        <strong>Kinetochore microtubules</strong>
        attach to kinetochore proteins at the centromere of each chromosome.
      </p>

      <h4>Metaphase</h4>
      <p>
        Chromosomes align at the <strong>metaphase plate</strong> (equatorial
        plane). Each chromosome is attached to spindle fibres from both poles.
        This is the most common stage for chromosome counting (karyotyping).
      </p>

      <h4>Anaphase</h4>
      <p>
        <strong>Sister chromatids separate</strong> at the centromere and are
        pulled to opposite poles by kinetochore microtubules (shortening of the
        spindle). The cell elongates. Once separated, each chromatid is now
        considered a full chromosome.
      </p>

      <h4>Telophase</h4>
      <p>
        Chromosomes arrive at poles and decondense. Nuclear envelopes re-form.
        The spindle disassembles. Mitosis is complete.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Cytokinesis</h3>
      <p>
        <strong>Animal cells:</strong> a <strong>cleavage furrow</strong> forms
        from the contracting ring of actin and myosin filaments, pinching the
        cell in two.
      </p>
      <p>
        <strong>Plant cells:</strong> vesicles from the Golgi apparatus fuse at
        the metaphase plate to form a <strong>cell plate</strong>, which grows
        outward to become the new cell wall.
      </p>

      <h3>Chromosome Counting During Mitosis</h3>
      <p>
        Key to IMAT questions: the number of chromosomes is determined by the
        centromere count (each centromere = 1 chromosome), not the number of
        chromatids.
      </p>
      <div className="rounded-lg border bg-card p-4 text-sm">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-1">Stage</th>
              <th className="text-left pb-1">Chromosomes</th>
              <th className="text-left pb-1">Chromatids</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="py-1">G₁ (before S)</td>
              <td>2n = 4</td>
              <td>4</td>
            </tr>
            <tr>
              <td className="py-1">G₂ (after S)</td>
              <td>2n = 4</td>
              <td>8</td>
            </tr>
            <tr>
              <td className="py-1">Metaphase</td>
              <td>2n = 4</td>
              <td>8</td>
            </tr>
            <tr>
              <td className="py-1">Anaphase (each pole)</td>
              <td>2n = 4</td>
              <td>4</td>
            </tr>
            <tr>
              <td className="py-1">After mitosis</td>
              <td>2n = 4</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "mitosis-worked-1",
            question:
              "A cell with 2n = 4 (two pairs of chromosomes) is in metaphase of mitosis. How many chromosomes and chromatids are present?",
            hints: [
              "In metaphase, are chromosomes duplicated or unduplicated?",
              "How many chromatids per duplicated chromosome?",
              "What is the relationship between 2n and chromosome count?",
            ],
            solution:
              "2n = 4 means the cell has 4 chromosomes before S phase. After DNA replication, each chromosome consists of 2 sister chromatids (still 4 chromosomes, but 8 chromatids). At metaphase, the 4 duplicated chromosomes (8 chromatids) align at the plate. Anaphase: 8 chromatids → separate → 8 chromosomes (4 going to each pole). After mitosis: each daughter cell has 4 chromosomes (unduplicated, 2n = 4).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Prophase: condense, spindle forms, NE breaks",
          "Metaphase: align at plate (karyotype stage)",
          "Anaphase: sister chromatids separate",
          "Telophase: re-form nuclei, decondense",
          "Animal cytokinesis: cleavage furrow",
          "Plant cytokinesis: cell plate",
          "Chromosome # stays same; chromatid # halves at anaphase",
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
      id: "mitosis-q1",
      type: "multiple-choice",
      prompt:
        "In which phase of mitosis do chromosomes align at the equatorial plate?",
      answer: "Metaphase",
      difficulty: "recall",
      options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
    },
    {
      id: "mitosis-q2",
      type: "multiple-choice",
      prompt: "What separates during anaphase of mitosis?",
      answer: "Sister chromatids",
      difficulty: "recall",
      options: [
        "Homologous chromosomes",
        "Sister chromatids",
        "Non-sister chromatids",
        "Centrosomes",
      ],
    },
    {
      id: "mitosis-q3",
      type: "multiple-choice",
      prompt: "Cytokinesis in plant cells involves formation of:",
      answer: "A cell plate from Golgi-derived vesicles",
      difficulty: "recall",
      options: [
        "A cleavage furrow",
        "A cell plate from Golgi-derived vesicles",
        "A spindle apparatus",
        "A contractile ring",
      ],
    },
    {
      id: "mitosis-q4",
      type: "multiple-choice",
      prompt:
        "A cell has 8 chromatids in metaphase. How many centromeres are present?",
      answer: "4",
      difficulty: "apply",
      options: ["2", "4", "8", "16"],
    },
    {
      id: "mitosis-q5",
      type: "multiple-choice",
      prompt: "At the end of mitosis, daughter cells are:",
      answer: "Genetically identical to the parent cell",
      difficulty: "apply",
      options: [
        "Genetically identical to the parent cell",
        "Haploid (half the chromosomes)",
        "Genetically different from the parent",
        "In G₀ phase",
      ],
      imatYear: 2023,
    },
    {
      id: "mitosis-q6",
      type: "explain-why",
      prompt:
        "Explain why chemotherapy drugs that target microtubules (e.g., taxanes) are effective against cancer cells but may cause nerve damage as a side effect.",
      answer:
        "Taxanes stabilise microtubules, preventing their depolymerisation and blocking anaphase — this stops cancer cells from dividing and triggers apoptosis. However, microtubules are also essential for neuronal function (axonal transport along microtubules). Rapidly dividing cancer cells are most affected, but long-lived neurons experience cumulative microtubule disruption, causing peripheral neuropathy.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["meiosis", "cell-cycle", "dna-replication"],
  prerequisites: ["cell-cycle"],
};
