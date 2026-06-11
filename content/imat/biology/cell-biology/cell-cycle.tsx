import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "cell-cycle",
  subject: "biology",
  topic: "cell-biology",
  title: "The Cell Cycle",
  summary:
    "The cell cycle consists of interphase (G₁, S, G₂) and the mitotic phase (mitosis + cytokinesis), regulated by checkpoints, cyclins, and cyclin-dependent kinases (CDKs).",
  memoryHook:
    "'Interphase = Is Preparing Something' (G₁ → S → G₂). The cell spends ~90% of its time in interphase. M phase is the short 'performance' — like an exam after a long semester of studying.",
  imatTrap:
    "DNA replicates in S phase, NOT in G₂. Students often say 'the cell duplicates its DNA before mitosis' and imply it happens in G₂. Also: the G₀ phase is a quiescent state where cells exit the cycle (e.g., neurones, muscle cells) — they may never divide again.",
  whyItMatters:
    "Cancer is uncontrolled cell division caused by mutations in cell cycle regulators. Tumour suppressor genes (p53) and proto-oncogenes (Ras) are the 'brakes and accelerator' of the cycle. Most chemotherapy targets rapidly dividing cells by disrupting the cell cycle.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">
        Interphase (~90% of the cycle)
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>G₁ phase (Gap 1)</strong>: Cell grows, synthesises proteins
          and organelles, carries out normal functions. The cell assesses
          conditions — if unfavourable, it may exit to G₀ (quiescent state). The{" "}
          <strong>restriction point (R point)</strong> commits the cell to
          division.
        </li>
        <li>
          <strong>S phase (Synthesis)</strong>: DNA replication occurs. Each
          chromosome duplicates to form two sister chromatids joined at the
          centromere. Centrosome also duplicates.
        </li>
        <li>
          <strong>G₂ phase (Gap 2)</strong>: Cell continues to grow, synthesises
          proteins needed for mitosis (e.g., tubulin for spindle fibres). Checks
          for DNA replication errors before entering M phase.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Mitotic Phase (M Phase)</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Mitosis</strong>: Division of the nucleus — prophase,
          metaphase, anaphase, telophase (PMAT). Produces two genetically
          identical nuclei.
        </li>
        <li>
          <strong>Cytokinesis</strong>: Division of the cytoplasm. In animal
          cells, a cleavage furrow pinches the cell in two. In plant cells, a
          cell plate forms between the two daughter cells.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Checkpoints and Regulation</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>G₁ checkpoint (restriction point)</strong>: Checks cell size,
          nutrients, growth factors, and DNA damage. If passed → S phase. If
          failed → G₀.
        </li>
        <li>
          <strong>G₂ checkpoint</strong>: Checks DNA replication completeness
          and DNA damage. Prevents entry into mitosis with damaged or
          unreplicated DNA.
        </li>
        <li>
          <strong>Spindle assembly checkpoint (M checkpoint)</strong>: At
          metaphase, ensures all chromosomes are attached to spindle fibres
          before anaphase proceeds.
        </li>
      </ul>
      <p>
        <strong>Cyclins</strong> and{" "}
        <strong>cyclin-dependent kinases (CDKs)</strong> drive the cycle. Cyclin
        levels rise and fall; CDKs are always present but only active when bound
        to cyclin. The cyclin-CDK complex phosphorylates target proteins to
        advance the cycle.
      </p>
    </div>
  ),
  questions: [
    {
      id: "cell-cycle-q1",
      type: "multiple-choice",
      prompt:
        "During which phase of the cell cycle does DNA replication occur?",
      options: ["G₁ phase", "S phase", "G₂ phase", "M phase"],
      answer: "S phase",
      explanation:
        "DNA synthesis (replication) occurs exclusively during S phase. G₁ and G₂ are growth phases; M phase is mitosis.",
      difficulty: "recall",
    },
    {
      id: "cell-cycle-q2",
      type: "multiple-choice",
      prompt:
        "What would happen if the spindle assembly checkpoint failed during mitosis?",
      options: [
        "The cell would exit to G₀ phase",
        "DNA would not replicate",
        "Chromosomes could be unequally distributed to daughter cells",
        "The cell would immediately undergo apoptosis",
      ],
      answer: "Chromosomes could be unequally distributed to daughter cells",
      explanation:
        "The spindle assembly checkpoint ensures all chromosomes are attached to spindle fibres before anaphase. If it fails, sister chromatids may not separate equally, leading to aneuploidy (abnormal chromosome number).",
      difficulty: "apply",
    },
    {
      id: "cell-cycle-q3",
      type: "explain-why",
      prompt: "Why is the p53 protein called the 'guardian of the genome'?",
      answer:
        "p53 is a tumour suppressor protein activated at the G₁ checkpoint when DNA damage is detected. It halts the cell cycle to allow DNA repair. If damage is irreparable, p53 triggers apoptosis. Mutations in p53 (found in >50% of cancers) remove this safeguard, allowing damaged cells to divide uncontrollably.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["mitosis", "meiosis", "organelles"],
  prerequisites: ["organelles"],
};

export default note;
