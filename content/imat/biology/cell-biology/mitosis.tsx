import type { AtomicNote } from "@/data/imat/types";
import { MitosisSteps } from "@/components/imat/interactive/mitosis-steps";

const note: AtomicNote = {
  slug: "mitosis",
  subject: "biology",
  topic: "cell-biology",
  title: "Mitosis",
  summary:
    "Mitosis is the division of the nucleus into two genetically identical daughter nuclei, occurring in four phases: Prophase, Metaphase, Anaphase, and Telophase (PMAT).",
  memoryHook:
    "'PMAT — Please Make Another Tea': Prophase (Pack/condense), Metaphase (Middle/align), Anaphase (Apart/pull apart), Telophase (Two nuclei). Cytokinesis then splits the cell.",
  imatTrap:
    "In anaphase, SISTER CHROMATIDS separate (not homologous pairs — that's meiosis I). The chromosome number does NOT change in mitosis — a human cell starts with 46 chromosomes and each daughter cell has 46. Students confuse chromosome number with chromatid number.",
  whyItMatters:
    "Mitosis is how the body grows, repairs wounds, and replaces worn-out cells (e.g., skin, gut lining). When mitosis is uncontrolled, tumours form. Colchicine (gout treatment) and vinca alkaloids (cancer drugs) work by disrupting spindle fibre formation, arresting cells in metaphase.",
  explanation: (
    <div className="space-y-4">
      <MitosisSteps />

      <h3 className="text-lg font-semibold mt-4">Purpose of Mitosis</h3>
      <p>
        Produces two genetically identical diploid (2n) daughter cells. Used for
        growth, repair, and asexual reproduction. Maintains the chromosome
        number.
      </p>

      <h3 className="text-lg font-semibold mt-4">The Four Phases (PMAT)</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Prophase</strong>:
          <ul className="list-circle pl-4 mt-1">
            <li>
              Chromatin condenses into visible chromosomes (each = two sister
              chromatids joined at the centromere)
            </li>
            <li>Nuclear envelope begins to break down</li>
            <li>Centrioles move to opposite poles (in animal cells)</li>
            <li>Spindle fibres (microtubules) begin to form</li>
          </ul>
        </li>
        <li>
          <strong>Metaphase</strong>:
          <ul className="list-circle pl-4 mt-1">
            <li>Chromosomes align at the cell equator (metaphase plate)</li>
            <li>
              Spindle fibres from each pole attach to the centromere of each
              chromosome
            </li>
            <li>
              This is the stage where chromosomes are most condensed and visible
            </li>
          </ul>
        </li>
        <li>
          <strong>Anaphase</strong>:
          <ul className="list-circle pl-4 mt-1">
            <li>Centromeres split — sister chromatids separate</li>
            <li>
              Spindle fibres pull individual chromatids (now called chromosomes)
              to opposite poles
            </li>
            <li>Cell elongates</li>
          </ul>
        </li>
        <li>
          <strong>Telophase</strong>:
          <ul className="list-circle pl-4 mt-1">
            <li>
              Chromosomes arrive at poles and begin to decondense (back to
              chromatin)
            </li>
            <li>Nuclear envelopes reform around each set of chromosomes</li>
            <li>Spindle fibres disassemble</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Cytokinesis</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Animal cells</strong>: Cleavage furrow forms — actin
          microfilaments contract, pinching the cell membrane inward until the
          cell splits.
        </li>
        <li>
          <strong>Plant cells</strong>: Cell plate forms at the equator from
          Golgi-derived vesicles carrying cell wall materials. The plate grows
          outward until it fuses with the existing cell wall.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "mitosis-q1",
      type: "multiple-choice",
      prompt:
        "A human cell has 46 chromosomes. After mitosis and cytokinesis, how many chromosomes does each daughter cell have?",
      options: ["23", "46", "92", "12"],
      answer: "46",
      explanation:
        "Mitosis produces genetically identical diploid daughter cells. The chromosome number is maintained — 46 in, 46 out. Each chromosome was duplicated in S phase and the sister chromatids separated in anaphase.",
      difficulty: "recall",
    },
    {
      id: "mitosis-q2",
      type: "multiple-choice",
      prompt: "During which phase of mitosis do sister chromatids separate?",
      options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      answer: "Anaphase",
      explanation:
        "In anaphase, centromeres split and spindle fibres pull sister chromatids to opposite poles. In metaphase they align; in telophase they decondense.",
      difficulty: "recall",
    },
    {
      id: "mitosis-q3",
      type: "explain-why",
      prompt:
        "Why do drugs that disrupt spindle fibre formation (e.g., vinca alkaloids) effectively slow tumour growth?",
      answer:
        "Without functional spindle fibres, chromosomes cannot align or separate during mitosis. Cells arrest in metaphase and cannot complete division. Since cancer cells divide rapidly, disrupting mitosis preferentially kills them. However, this also affects other rapidly dividing cells (hair follicles, gut lining, bone marrow), causing side effects.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["cell-cycle", "meiosis", "organelles"],
  prerequisites: ["cell-cycle"],
};

export default note;
