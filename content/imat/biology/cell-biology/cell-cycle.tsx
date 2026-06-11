"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What are the phases of the cell cycle?",
    answer: "Interphase (G₁, S, G₂) and M phase (mitosis + cytokinesis)",
    context: "Ordered sequence",
  },
  {
    id: "qf-2",
    question: "What happens during S phase?",
    answer: "DNA replication (synthesis) — each chromosome is copied",
    context: "Genetic material duplication",
  },
  {
    id: "qf-3",
    question: "What are the main cell cycle checkpoints?",
    answer: "G₁/S (restriction), G₂/M, and M (spindle assembly) checkpoints",
    context: "Quality control",
  },
];

export const cellCycleNote: AtomicNote = {
  slug: "cell-cycle",
  subject: "biology",
  topic: "cell-biology",
  title: "The Cell Cycle",
  summary:
    "The ordered sequence of events by which a cell grows, duplicates its DNA, and divides. Phases: Interphase (G₁, S, G₂) → Mitosis (M) → Cytokinesis. Regulation by cyclins and CDKs ensures faithful replication and chromosome segregation.",
  memoryHook:
    "Go → Grow → Copy → Go Again → Split! G₁ (Gap 1: grow + proteins), S (Synthesis: DNA copied), G₂ (Gap 2: check + prep), M (Mitosis: divide).",
  imatTrap:
    "Interphase is NOT a 'resting' phase — it is the most metabolically active phase (G₁: growth and protein synthesis; S: DNA replication; G₂: preparation for mitosis). The term 'resting phase' is outdated and misleading. G₀ is the true resting/quiescent phase (cells that have exited the cycle). Also: cyclin levels oscillate throughout the cycle but CDK levels remain constant — CDKs are only active when bound to cyclins.",
  whyItMatters:
    "Cancer is fundamentally a disease of uncontrolled cell cycle regulation. Mutations in cyclins, CDKs, or tumour suppressors (p53, Rb) lead to unchecked proliferation. Chemotherapy drugs often target dividing cells (taxanes block M phase, antimetabolites block S phase). Understanding the cell cycle is essential for oncology.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Cell cycle phases — what happens in each",
    },
    {
      years: [2021, 2023],
      frequency: "high",
      notes: "Checkpoint control and p53 role",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Cyclin-CDK regulation",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "cell-cycle-worked-1",
      question:
        "After DNA damage, a cell arrests at the G₁/S checkpoint. Describe the molecular pathway that causes this arrest and what happens if the damage is too severe.",
      hints: [
        "What protein 'senses' DNA damage?",
        "What tumour suppressor is activated and how?",
        "What does p53 do when activated?",
      ],
      solution:
        "DNA damage is sensed by ATM/ATR kinases. They phosphorylate and stabilise p53 (tumour suppressor). p53 upregulates p21 (CDK inhibitor), which binds to cyclin-CDK complexes and blocks G₁→S progression. This gives time for DNA repair. If damage is irreparable, p53 triggers apoptosis (programmed cell death). This is why p53 is called 'guardian of the genome' — it's mutated in &gt;50% of cancers.",
      imatYear: 2023,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Cell Cycle",
      url: "https://www.khanacademy.org/science/biology/cell-division/cell-cycle/v/cell-cycle-phases",
      type: "video",
      description: "Animated walkthrough of the eukaryotic cell cycle",
    },
    {
      title: "Nature Scitable — Cell Cycle",
      url: "https://www.nature.com/scitable/topicpage/cell-cycle-regulation-11393070/",
      type: "article",
      description: "Detailed coverage of cyclins, CDKs, and checkpoints",
    },
    {
      title: "OpenStax Biology 2e — Cell Cycle",
      url: "https://openstax.org/books/biology-2e/pages/10-2-the-cell-cycle",
      type: "textbook",
      description: "Free textbook chapter on cell cycle regulation",
    },
  ],
  highYieldPoints: [
    "Interphase: G₁ (growth, protein synthesis) → S (DNA replication) → G₂ (preparation, checkpoint)",
    "M phase: mitosis (nuclear division) + cytokinesis (cytoplasmic division)",
    "Cyclins: regulatory subunits that oscillate; CDKs: catalytic subunits (constant levels) — active only with cyclin",
    "G₁/S checkpoint (restriction point): decides whether to commit to division; regulated by p53/p21",
    "G₂/M checkpoint: checks DNA replication completeness and damage",
    "M checkpoint (spindle assembly): ensures all chromosomes are attached to spindle before anaphase",
    "G₀: reversible quiescence (most human cells) — enter when conditions unfavourable or differentiation signals",
  ],
  explanation: (
    <div>
      <p>
        The <strong>cell cycle</strong> is the series of events that leads to
        cell division. It consists of <strong>interphase</strong> (growth and
        DNA replication) and the <strong>M phase</strong> (mitosis and
        cytokinesis). Accurate regulation is critical — errors can lead to
        cancer.
      </p>

      <h3>Interphase</h3>
      <p>
        <strong>G₁ phase:</strong> cell growth, protein synthesis, organelle
        duplication. Most variable phase — duration depends on cell type. At the
        G₁/S checkpoint (restriction point), the cell checks: is the environment
        favourable? Are nutrients available? Is DNA intact?
      </p>
      <p>
        <strong>S phase:</strong> DNA replication. Each chromosome is duplicated
        into two sister chromatids. The centrosome is also duplicated.
      </p>
      <p>
        <strong>G₂ phase:</strong> continued growth, preparation for mitosis.
        The G₂/M checkpoint checks: is all DNA replicated? Is there damage?
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>M Phase: Mitosis + Cytokinesis</h3>
      <p>
        Mitosis (prophase → prometaphase → metaphase → anaphase → telophase)
        divides the nucleus. Cytokinesis divides the cytoplasm. See the separate
        <strong>Mitosis</strong> note for details.
      </p>

      <h3>Regulation: Cyclins and CDKs</h3>
      <p>
        <strong>Cyclin-Dependent Kinases (CDKs)</strong> are the engine of the
        cell cycle. They are present at constant levels but are only active when
        bound to <strong>cyclins</strong>, whose concentrations oscillate:
      </p>
      <ul>
        <li>Cyclin D: G₁ phase (growth signals)</li>
        <li>Cyclin E: G₁/S transition (triggers DNA replication)</li>
        <li>Cyclin A: S phase (maintains replication)</li>
        <li>Cyclin B: G₂/M transition (triggers mitosis)</li>
      </ul>
      <p>
        CDKs phosphorylate target proteins to drive cell cycle progression. CDK
        inhibitors (p21, p27, p16) can halt the cycle.
      </p>

      <h3>Checkpoints & p53</h3>
      <p>
        <strong>p53</strong> is the 'guardian of the genome.' In response to DNA
        damage, it:
      </p>
      <ol>
        <li>Activates p21 (CDK inhibitor) → arrests at G₁/S</li>
        <li>Activates DNA repair genes</li>
        <li>If damage is irreparable → triggers apoptosis</li>
      </ol>
      <p>p53 is the most commonly mutated gene in human cancers (&gt;50%).</p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>G₀ Phase — Quiescence</h3>
      <p>
        Cells that exit the cell cycle enter <strong>G₀</strong>. Most human
        cells are in G₀ (neurons, muscle cells). Some cells can re-enter G₁ when
        stimulated (liver cells, lymphocytes). Others remain permanently in G₀
        (cardiac muscle, neurons).
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "cell-cycle-worked-1",
            question:
              "After DNA damage, a cell arrests at the G₁/S checkpoint. Describe the molecular pathway that causes this arrest and what happens if the damage is too severe.",
            hints: [
              "What protein 'senses' DNA damage?",
              "What tumour suppressor is activated and how?",
              "What does p53 do when activated?",
            ],
            solution:
              "DNA damage is sensed by ATM/ATR kinases. They phosphorylate and stabilise p53. p53 upregulates p21, which binds to cyclin-CDK complexes and blocks G₁→S progression. If damage is irreparable, p53 triggers apoptosis. This is why p53 is called 'guardian of the genome' — it's mutated in &gt;50% of cancers.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Cell cycle: G₁ → S → G₂ → M → cytokinesis",
          "S phase: DNA replication (sister chromatids)",
          "G₀: quiescence (most cells in body are here)",
          "Cyclins oscillate, CDKs constant — active only bound",
          "Checkpoints: G₁/S, G₂/M, M (spindle assembly)",
          "p53: guardian of the genome (apoptosis if damage)",
          "Cancer = loss of cell cycle control",
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
      id: "cell-cycle-q1",
      type: "multiple-choice",
      prompt: "During which phase does DNA replication occur?",
      answer: "S phase",
      difficulty: "recall",
      options: ["G₁ phase", "S phase", "G₂ phase", "M phase"],
    },
    {
      id: "cell-cycle-q2",
      type: "multiple-choice",
      prompt: "What is the G₁/S checkpoint also called?",
      answer: "The restriction point",
      difficulty: "recall",
      options: [
        "The mitotic checkpoint",
        "The restriction point",
        "The spindle checkpoint",
        "The replication checkpoint",
      ],
    },
    {
      id: "cell-cycle-q3",
      type: "multiple-choice",
      prompt: "What happens when p53 detects irreparable DNA damage?",
      answer: "It triggers apoptosis",
      difficulty: "recall",
      options: [
        "It triggers apoptosis",
        "It continues the cell cycle",
        "It repairs the DNA",
        "It causes uncontrolled division",
      ],
    },
    {
      id: "cell-cycle-q4",
      type: "multiple-choice",
      prompt:
        "Which of the following is TRUE about CDK levels during the cell cycle?",
      answer:
        "CDK levels remain constant, but they are only active with cyclins",
      difficulty: "apply",
      options: [
        "CDK levels oscillate like cyclins",
        "CDK levels remain constant, but they are only active with cyclins",
        "CDKs are only present during M phase",
        "CDKs are active without cyclins",
      ],
      imatYear: 2024,
    },
    {
      id: "cell-cycle-q5",
      type: "multiple-choice",
      prompt: "Most human neurons are in which cell cycle phase?",
      answer: "G₀ (quiescence)",
      difficulty: "apply",
      options: ["G₁", "S", "G₂", "G₀ (quiescence)"],
    },
    {
      id: "cell-cycle-q6",
      type: "explain-why",
      prompt:
        "Explain why chemotherapeutic drugs that target rapidly dividing cells are more effective against cancer but also cause side effects in hair follicles and digestive tract.",
      answer:
        "Cancer cells are continuously cycling (loss of checkpoint control), so they are selectively sensitive to drugs that target M phase (taxanes: block spindle) or S phase (antimetabolites: block nucleotide synthesis). However, hair follicle cells and intestinal epithelial cells also divide rapidly — these are the most affected normal tissues, causing hair loss and gastrointestinal distress.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["mitosis", "meiosis", "dna-replication"],
  prerequisites: ["dna-replication"],
};
