import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "cell-theory",
  subject: "biology",
  topic: "cell-biology",
  title: "Cell Theory",
  summary:
    "All living organisms are composed of cells, the cell is the basic unit of life, and all cells arise from pre-existing cells.",
  memoryHook:
    "Three tenets = 'All made of cells, cells are the LEGO brick of life, cells come from more cells.' Exceptions break the rules: viruses skip cells entirely, striated muscle fibres are multinucleated giants, and aseptate fungi have no cross-walls.",
  imatTrap:
    "Cell theory states cells come from pre-existing cells (Virchow's 'omnis cellula e cellula'). Students forget the exceptions — striated muscle (multinucleated), aseptate fungal hyphae (continuous cytoplasm), and giant algae (single huge cell) all challenge the 'small, simple unit' idea.",
  whyItMatters:
    "Cell theory underpins modern pathology: Virchow showed diseases arise from cellular dysfunction, not spontaneous generation. Cancer is fundamentally a breakdown of normal cell division — understanding cell theory is the foundation of oncology.",
  explanation: (
    <div className="space-y-4">
      <p>
        <strong>Cell theory</strong> is one of the foundational principles of
        biology, developed in the 1830s–1850s by Schleiden, Schwann, and
        Virchow.
      </p>
      <h3 className="text-lg font-semibold mt-4">Three Core Principles</h3>
      <ol className="list-decimal pl-6 space-y-1">
        <li>
          <strong>
            All living organisms are composed of one or more cells.
          </strong>{" "}
          From bacteria (unicellular) to humans (~37 trillion cells), life is
          cellular.
        </li>
        <li>
          <strong>
            The cell is the basic unit of structure and function in living
            things.
          </strong>{" "}
          All metabolic reactions, hereditary information transfer, and
          homeostatic mechanisms occur within cells.
        </li>
        <li>
          <strong>All cells arise from pre-existing cells</strong> (Rudolf
          Virchow, 1855 — <em>omnis cellula e cellula</em>). This disproved
          spontaneous generation.
        </li>
      </ol>

      <h3 className="text-lg font-semibold mt-4">
        Exceptions That Challenge Cell Theory
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Viruses</strong>: Not made of cells — just genetic material
          (DNA or RNA) in a protein capsid. They are acellular and can only
          reproduce inside a host cell.
        </li>
        <li>
          <strong>Striated muscle fibres</strong>: Extremely long,
          multinucleated cells formed by fusion of myoblasts. Challenge the idea
          that a cell has a single nucleus and is a 'simple' unit.
        </li>
        <li>
          <strong>Aseptate fungal hyphae</strong>: Continuous cytoplasm with
          many nuclei and no cross-walls (septa). Challenge the idea that cells
          are discrete, separated units.
        </li>
        <li>
          <strong>Giant algae</strong> (e.g., <em>Acetabularia</em>):
          Single-celled organisms that can grow up to 10 cm. Challenge the idea
          that cells are microscopic.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "cell-theory-q1",
      type: "multiple-choice",
      prompt:
        "Which of the following is NOT a principle of classical cell theory?",
      options: [
        "All living things are made of cells",
        "The cell is the basic unit of life",
        "All cells contain a nucleus",
        "All cells come from pre-existing cells",
      ],
      answer: "All cells contain a nucleus",
      explanation:
        "Classical cell theory has three principles: (1) all organisms are made of cells, (2) the cell is the basic unit of life, (3) cells come from pre-existing cells. Prokaryotic cells lack a nucleus, so this is not a principle.",
      difficulty: "recall",
    },
    {
      id: "cell-theory-q2",
      type: "multiple-choice",
      prompt:
        "Which of these challenges the idea that cells are discrete, individual units?",
      options: [
        "Viruses",
        "Striated muscle fibres",
        "Aseptate fungal hyphae",
        "Red blood cells",
      ],
      answer: "Aseptate fungal hyphae",
      explanation:
        "Aseptate fungi have continuous cytoplasm with many nuclei and no cross-walls, making it hard to define where one cell ends and another begins.",
      difficulty: "apply",
    },
    {
      id: "cell-theory-q3",
      type: "explain-why",
      prompt: "Why are viruses considered an exception to cell theory?",
      answer:
        "Viruses are acellular — they are not composed of cells. They consist of genetic material (DNA or RNA) enclosed in a protein capsid and lack cellular machinery for independent metabolism. They can only reproduce by hijacking a host cell's machinery.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["prokaryotes-vs-eukaryotes", "viruses", "organelles"],
  prerequisites: [],
};

export default note;
