import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "organelles",
  subject: "biology",
  topic: "cell-biology",
  title: "Organelles and Their Functions",
  summary:
    "Membrane-bound and non-membrane-bound structures within eukaryotic cells, each specialised for specific functions — from energy production to protein synthesis and waste disposal.",
  memoryHook:
    "The cell is a factory: Nucleus = CEO's office (blueprints), Mitochondria = power plant, Ribosomes = assembly line workers, Rough ER = quality control + packaging dept, Smooth ER = lipid workshop + detox, Golgi = post office (sort & ship), Lysosomes = recycling centre, Cytoskeleton = scaffolding + conveyor belts.",
  imatTrap:
    "Ribosomes are NOT membrane-bound — they exist in both prokaryotes and eukaryotes (70S vs 80S). Also: mitochondria have their own DNA and 70S ribosomes (endosymbiotic theory). The rough ER has ribosomes on its surface; the smooth ER does not.",
  whyItMatters:
    "Mitochondrial diseases (e.g., MELAS, Leber's optic neuropathy) arise from defects in mitochondrial DNA. Because mitochondria are maternally inherited, these diseases pass from mother to all offspring. Lysosomal storage diseases (e.g., Tay-Sachs) result from missing digestive enzymes.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Membrane-Bound Organelles</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Nucleus</strong>: Double-membrane (nuclear envelope) with
          nuclear pores. Contains DNA organised as chromatin. The nucleolus
          produces ribosomal RNA and assembles ribosomal subunits.
        </li>
        <li>
          <strong>Mitochondria</strong>: Double membrane — smooth outer, folded
          inner (cristae increase surface area). Matrix contains enzymes for the
          Krebs cycle. Site of aerobic respiration (ATP production). Have their
          own circular DNA and 70S ribosomes.
        </li>
        <li>
          <strong>Chloroplasts</strong> (plant cells only): Double membrane with
          internal thylakoid stacks (grana) surrounded by stroma. Site of
          photosynthesis. Contain chlorophyll, own circular DNA, and 70S
          ribosomes.
        </li>
        <li>
          <strong>Rough Endoplasmic Reticulum (RER)</strong>: Stacked, flattened
          sacs studded with ribosomes. Synthesises and folds proteins destined
          for secretion, membrane insertion, or lysosomes.
        </li>
        <li>
          <strong>Smooth Endoplasmic Reticulum (SER)</strong>: Tubular network
          without ribosomes. Synthesises lipids, steroids, and phospholipids.
          Detoxifies drugs and poisons (abundant in liver cells). Stores Ca²⁺ in
          muscle cells (sarcoplasmic reticulum).
        </li>
        <li>
          <strong>Golgi apparatus</strong>: Stack of flattened membrane sacs
          (cisternae). Modifies, sorts, and packages proteins and lipids from
          the ER into vesicles for transport to their destination (secretion,
          lysosomes, plasma membrane).
        </li>
        <li>
          <strong>Lysosomes</strong>: Membrane-bound sacs containing hydrolytic
          enzymes (active at pH ~5). Digest worn-out organelles, food particles,
          and pathogens. Apoptosis involves lysosomal enzyme release.
        </li>
        <li>
          <strong>Vacuoles</strong>: Large central vacuole in plant cells
          (maintains turgor pressure, stores nutrients and waste). Small,
          temporary vacuoles in animal cells.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Non-Membrane-Bound Structures
      </h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Ribosomes</strong>: Made of rRNA and protein. Two subunits
          (large + small). Site of translation (protein synthesis). 80S in
          eukaryotes, 70S in prokaryotes and mitochondria.
        </li>
        <li>
          <strong>Cytoskeleton</strong>: Network of protein fibres —
          microtubules (tubulin), microfilaments (actin), and intermediate
          filaments. Maintains cell shape, enables movement (cilia, flagella),
          and guides vesicle transport.
        </li>
        <li>
          <strong>Centrioles</strong>: Pair of cylindrical structures (9
          triplets of microtubules) in the centrosome. Organise spindle fibres
          during cell division. Absent in most plant cells.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "organelles-q1",
      type: "multiple-choice",
      prompt:
        "Which organelle would be most abundant in a cell that specialises in producing steroid hormones?",
      options: [
        "Rough endoplasmic reticulum",
        "Smooth endoplasmic reticulum",
        "Golgi apparatus",
        "Lysosomes",
      ],
      answer: "Smooth endoplasmic reticulum",
      explanation:
        "The SER synthesises lipids and steroids. Cells producing steroid hormones (e.g., adrenal cortex, testes) have abundant SER. RER is for protein synthesis, not lipids.",
      difficulty: "apply",
    },
    {
      id: "organelles-q2",
      type: "multiple-choice",
      prompt:
        "Which evidence supports the endosymbiotic theory for the origin of mitochondria?",
      options: [
        "Mitochondria have a single membrane",
        "Mitochondria have circular DNA and 70S ribosomes",
        "Mitochondria are found in all cells",
        "Mitochondria produce ATP",
      ],
      answer: "Mitochondria have circular DNA and 70S ribosomes",
      explanation:
        "Mitochondria have their own circular DNA (like bacteria) and 70S ribosomes (like prokaryotes), supporting the theory that they evolved from engulfed aerobic bacteria.",
      difficulty: "recall",
    },
    {
      id: "organelles-q3",
      type: "explain-why",
      prompt:
        "Why do pancreatic cells that secrete digestive enzymes have extensive rough ER and Golgi apparatus?",
      answer:
        "Digestive enzymes are proteins destined for secretion. The RER synthesises and folds these proteins, while the Golgi modifies, sorts, and packages them into secretory vesicles. High secretory demand requires extensive RER and Golgi.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "cell-theory",
    "prokaryotes-vs-eukaryotes",
    "proteins",
    "enzymes",
    "atp",
    "cell-cycle",
  ],
  prerequisites: ["cell-theory", "proteins"],
};

export default note;
