"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What are the three tenets of classical cell theory?",
    answer:
      "1) All living things are composed of cells. 2) The cell is the basic unit of life. 3) All cells arise from pre-existing cells.",
    context: "Foundations of biology",
  },
  {
    id: "qf-2",
    question: "Who discovered cells and in what year?",
    answer: "Robert Hooke (1665) — observed cork cell walls",
    context: "First observation",
  },
  {
    id: "qf-3",
    question: "What is a key exception to cell theory?",
    answer:
      "Viruses — they are acellular (not made of cells) but can replicate",
    context: "Borderline life forms",
  },
];

export const cellTheoryNote: AtomicNote = {
  slug: "cell-theory",
  subject: "biology",
  topic: "cell-biology",
  title: "Cell Theory",
  summary:
    "The unifying principle of biology: all organisms are composed of cells, cells are the basic unit of life, and all cells arise from pre-existing cells. Developed by Schleiden, Schwann, and Virchow (1830s–1850s). Modern additions include energy flow, heredity (DNA), and cell composition.",
  memoryHook:
    "Schleiden (plants) + Schwann (animals) → cells are basic units. Virchow added: 'Omnis cellula e cellula' — all cells from cells.",
  imatTrap:
    "Viruses are NOT cells and do NOT satisfy cell theory — they are acellular. However, they are often considered 'life-like' because they contain genetic material and evolve. The trap: asking whether viruses are 'alive' — the IMAT expects you to know viruses are NOT made of cells and NOT capable of independent replication. Also: mitochondria and chloroplasts have their own DNA (endosymbiotic theory) — they are semi-autonomous, not fully independent.",
  whyItMatters:
    "Cell theory is the foundation of modern biology and medicine. Understanding that all cells come from pre-existing cells is essential for understanding cancer (uncontrolled cell division), stem cell therapy, bacterial infections, and the germ theory of disease.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "medium",
      notes: "Historical contributors and their contributions",
    },
    {
      years: [2021, 2023],
      frequency: "high",
      notes: "Viruses as exceptions to cell theory",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Endosymbiotic theory and modern additions",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "cell-theory-worked-1",
      question:
        "Evaluate whether a mitochondrion violates cell theory, given that it has its own DNA and ribosomes and reproduces by division.",
      hints: [
        "What does cell theory say about cells arising from other cells?",
        "Can mitochondria survive independently outside a host cell?",
        "What is the endosymbiotic theory explanation?",
      ],
      solution:
        "Mitochondria do NOT violate cell theory. According to the endosymbiotic theory, mitochondria evolved from free-living bacteria that were engulfed by an ancestral eukaryotic cell. Over time, they lost most of their genes and became dependent on the host. They cannot survive independently, cannot form new organisms, and are not considered cells — they are organelles. Their division is regulated by the host cell cycle.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Cell Theory",
      url: "https://www.khanacademy.org/science/biology/structure-of-a-cell/introduction-to-cells/a/introduction-to-cells",
      type: "article",
      description: "Introduction to cell theory and its history",
    },
    {
      title: "Nature Scitable — Cell Theory",
      url: "https://www.nature.com/scitable/topicpage/cell-biology-13906478/",
      type: "article",
      description: "The history and modern extensions of cell theory",
    },
    {
      title: "OpenStax Biology 2e — Cell Theory",
      url: "https://openstax.org/books/biology-2e/pages/4-1-studying-cells",
      type: "textbook",
      description: "Free textbook chapter on cell biology fundamentals",
    },
  ],
  highYieldPoints: [
    "Classical: all organisms composed of cells; cell = basic unit; all cells from pre-existing cells",
    "Schleiden (plants, 1838), Schwann (animals, 1839), Virchow (all cells from cells, 1855)",
    "Modern additions: energy flow occurs in cells; DNA is the hereditary material; all cells have similar composition",
    "Exception: viruses are acellular (not cells) — they have DNA/RNA but no cytoplasm, ribosomes, or metabolism",
    "Exception: striated muscle cells are multinucleated (syncytium), challenging 'one nucleus per cell'",
    "Exception: giant algae (Acetabularia) are single-celled but can be several cm tall",
    "Endosymbiotic theory: mitochondria and chloroplasts were once free-living prokaryotes",
  ],
  explanation: (
    <div>
      <p>
        <strong>Cell theory</strong> is the fundamental organising principle of
        biology. It was developed in the mid-19th century and has been refined
        with modern discoveries, but its core tenets remain unchanged.
      </p>

      <h3>Classical Cell Theory</h3>
      <p>
        <strong>Matthias Schleiden</strong> (1838): all plant tissues are
        composed of cells. <strong>Theodor Schwann</strong> (1839): all animal
        tissues are composed of cells — and proposed that the cell is the basic
        unit of life.
        <strong>Rudolf Virchow</strong> (1855): <em>Omnis cellula e cellula</em>{" "}
        — all cells arise from pre-existing cells.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Modern Additions</h3>
      <ul>
        <li>Energy flow (metabolism) occurs within cells</li>
        <li>Hereditary information (DNA) is passed from cell to cell</li>
        <li>All cells have fundamentally the same chemical composition</li>
        <li>
          Cells of all species are fundamentally similar at the molecular level
        </li>
      </ul>

      <h3>Notable Exceptions</h3>
      <p>
        <strong>Viruses:</strong> acellular — they have genetic material (DNA or
        RNA) but no cytoplasm, organelles, or metabolism. They cannot replicate
        independently. Whether they are 'alive' is debated; the IMAT expects you
        to know they are not cells.
      </p>
      <p>
        <strong>Skeletal muscle fibres:</strong> multinucleated syncytia (many
        nuclei per cell) — formed by fusion of myoblasts.
      </p>
      <p>
        <strong>Giant algae (Acetabularia):</strong> single cell that grows up
        to 10 cm tall — challenges the idea that cells must be microscopic.
      </p>

      <h3>Endosymbiotic Theory</h3>
      <p>
        Proposed by <strong>Lynn Margulis</strong> (1967). Mitochondria and
        chloroplasts have:
      </p>
      <ul>
        <li>Their own circular DNA (like bacteria)</li>
        <li>Their own ribosomes (70S, like bacteria)</li>
        <li>Double membranes (from engulfment)</li>
        <li>Reproduce independently by binary fission</li>
      </ul>
      <p>
        Evidence: they were once free-living prokaryotes that formed a symbiotic
        relationship with a host cell.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "cell-theory-worked-1",
            question:
              "Evaluate whether a mitochondrion violates cell theory, given that it has its own DNA and ribosomes and reproduces by division.",
            hints: [
              "What does cell theory say about cells arising from other cells?",
              "Can mitochondria survive independently outside a host cell?",
              "What is the endosymbiotic theory explanation?",
            ],
            solution:
              "Mitochondria do NOT violate cell theory. According to the endosymbiotic theory, mitochondria evolved from free-living bacteria that were engulfed by an ancestral eukaryotic cell. Over time, they lost most of their genes and became dependent on the host. They cannot survive independently, cannot form new organisms, and are not considered cells — they are organelles.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Schleiden (plants), Schwann (animals), Virchow (division)",
          "All cells come from pre-existing cells",
          "Viruses = acellular exception",
          "Modern: DNA, energy flow, similar composition",
          "Endosymbiosis: mitochondria/chloroplasts = former bacteria",
          "Exceptions: striated muscle (multinucleated)",
          "Cell is the smallest unit of life",
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
      id: "cell-theory-q1",
      type: "multiple-choice",
      prompt: "Who proposed that all cells arise from pre-existing cells?",
      answer: "Rudolf Virchow",
      difficulty: "recall",
      options: ["Schleiden", "Schwann", "Virchow", "Hooke"],
    },
    {
      id: "cell-theory-q2",
      type: "multiple-choice",
      prompt: "Which of the following is NOT part of classical cell theory?",
      answer: "Cells contain DNA",
      difficulty: "recall",
      options: [
        "All living things are composed of cells",
        "The cell is the basic unit of life",
        "All cells arise from pre-existing cells",
        "Cells contain DNA",
      ],
    },
    {
      id: "cell-theory-q3",
      type: "multiple-choice",
      prompt: "Which organisms are exceptions to cell theory?",
      answer: "Viruses",
      difficulty: "recall",
      options: ["Bacteria", "Fungi", "Viruses", "Protists"],
    },
    {
      id: "cell-theory-q4",
      type: "multiple-choice",
      prompt: "Mitochondria have their own DNA because:",
      answer: "They evolved from free-living bacteria (endosymbiosis)",
      difficulty: "apply",
      options: [
        "The nuclear DNA is too large to encode them",
        "They evolved from free-living bacteria (endosymbiosis)",
        "They are parasites within the cell",
        "They are viruses that infect mitochondria",
      ],
    },
    {
      id: "cell-theory-q5",
      type: "multiple-choice",
      prompt: "Robert Hooke is historically significant for:",
      answer: "First observing and naming cells (cork, 1665)",
      difficulty: "apply",
      options: [
        "Proposing that all cells come from cells",
        "First observing and naming cells (cork, 1665)",
        "Discovering bacteria",
        "Proposing the endosymbiotic theory",
      ],
      imatYear: 2022,
    },
    {
      id: "cell-theory-q6",
      type: "explain-why",
      prompt:
        "Explain why viruses are not considered living organisms under cell theory.",
      answer:
        "Viruses lack the defining properties of life under cell theory: they are not made of cells (no cytoplasm, no organelles, no metabolism), they cannot independently replicate (require host cell machinery), and they do not maintain homeostasis. They contain genetic material and evolve, but these alone do not satisfy cellular criteria for life.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["organelles", "prokaryotes-vs-eukaryotes", "viruses"],
  prerequisites: [],
};
