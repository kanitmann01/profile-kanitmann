"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is the fluid mosaic model?",
    answer:
      "The membrane is a fluid phospholipid bilayer with proteins embedded (mosaic)",
    context: "Singer-Nicolson 1972",
  },
  {
    id: "qf-2",
    question: "What is the role of cholesterol in animal cell membranes?",
    answer:
      "Modulates fluidity — makes membranes less fluid at high temp, less rigid at low temp",
    context: "Fluidity buffer",
  },
  {
    id: "qf-3",
    question:
      "What is the difference between integral and peripheral membrane proteins?",
    answer:
      "Integral: embedded in/through bilayer (transmembrane). Peripheral: loosely attached to surface",
    context: "Protein-membrane association",
  },
];

export const cellMembraneStructureNote: AtomicNote = {
  slug: "cell-membrane-structure",
  subject: "biology",
  topic: "cell-biology",
  title: "Cell Membrane Structure",
  summary:
    "The cell membrane (plasma membrane) is a phospholipid bilayer with embedded proteins, following the fluid mosaic model. It provides selective permeability, compartmentalisation, and a platform for signalling and transport. The structure is dynamic, not static.",
  memoryHook:
    "Fluid Mosaic Model: 'Fluid' = lipids and proteins move laterally. 'Mosaic' = diverse proteins embedded in the bilayer. Imagine a crowded dance floor (lipids) with party guests (proteins) moving around.",
  imatTrap:
    "Membranes are NOT symmetrical — the outer leaflet and inner leaflet have different lipid compositions (e.g., phosphatidylcholine on outer, phosphatidylserine on inner). Flip-flop (transverse movement of lipids) is rare without enzymes (flippases). Also: plant cells have NO cholesterol — they have sterols (stigmasterol, sitosterol) instead. Cholesterol is found in animal cell membranes only.",
  whyItMatters:
    "Membrane structure determines transport, signalling, and cell adhesion. Many drugs target membrane proteins: GPCRs (~34% of all FDA-approved drugs), ion channels, and transporters. Membrane defects cause diseases: cystic fibrosis (CFTR channel mutation), muscular dystrophy (dystrophin complex).",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Fluid mosaic model description",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Role of cholesterol in membrane fluidity",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Integral vs peripheral membrane proteins",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "membrane-worked-1",
      question:
        "A cell is grown at 25°C and then shifted to 37°C. Predict how the membrane composition changes to maintain optimal fluidity (homeoviscous adaptation).",
      hints: [
        "What happens to membrane fluidity at higher temperatures?",
        "What lipid modifications decrease fluidity?",
        "What type of fatty acids make membranes more rigid?",
      ],
      solution:
        "Higher temperature increases membrane fluidity (more thermal motion). The cell compensates by: 1) increasing the proportion of saturated fatty acids (straight chains pack tighter), 2) increasing cholesterol content (stiffens the membrane), 3) decreasing unsaturated fatty acids (fewer kinks). This is homeoviscous adaptation — maintaining constant membrane fluidity across temperatures.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Cell Membrane",
      url: "https://www.khanacademy.org/science/biology/membranes-and-transport/the-plasma-membrane/a/the-plasma-membrane",
      type: "article",
      description: "Structure and function of the plasma membrane",
    },
    {
      title: "Nature Scitable — Cell Membranes",
      url: "https://www.nature.com/scitable/topicpage/cell-membranes-14052567/",
      type: "article",
      description: "Detailed coverage of membrane structure and dynamics",
    },
    {
      title: "BioNinja — Membrane Structure",
      url: "https://ib.bioninja.com.au/standard-level/topic-1-cell-biology/13-membrane-structure/",
      type: "textbook",
      description: "Interactive diagrams of the fluid mosaic model",
    },
  ],
  highYieldPoints: [
    "Fluid mosaic model (Singer-Nicolson, 1972): phospholipid bilayer + embedded proteins",
    "Phospholipids: hydrophilic phosphate head + hydrophobic fatty acid tails (amphipathic)",
    "Lateral diffusion: fast (lipids move ~2 μm/s); Flip-flop: slow (requires flippase enzymes)",
    "Cholesterol: inserts between phospholipids, buffers fluidity (animals only)",
    "Integral proteins: transmembrane (span bilayer) — channels, carriers, receptors",
    "Peripheral proteins: attached to surface via electrostatic or H-bonds — often signalling or cytoskeletal",
    "Glycocalyx: carbohydrate chains on outer surface — cell recognition, adhesion, protection",
  ],
  explanation: (
    <div>
      <p>
        The <strong>cell membrane</strong> is a thin, flexible barrier that
        surrounds all cells. It follows the <strong>fluid mosaic model</strong>
        (Singer & Nicolson, 1972): a fluid phospholipid bilayer with a 'mosaic'
        of embedded proteins. It is <strong>selectively permeable</strong> —
        only certain molecules can cross freely.
      </p>

      <h3>Phospholipid Bilayer</h3>
      <p>
        The fundamental structure is a <strong>phospholipid bilayer</strong>.
        Phospholipids are <strong>amphipathic</strong>: the phosphate-containing
        head is polar (hydrophilic) and the two fatty acid tails are non-polar
        (hydrophobic). In an aqueous environment, they spontaneously assemble
        into a bilayer with heads outward and tails inward.
      </p>

      <h3>Membrane Fluidity</h3>
      <p>
        The membrane is <strong>not static</strong>. Lipids move laterally
        (within the same leaflet) rapidly. <strong>Cholesterol</strong> (in
        animal cells) modulates fluidity: at high temperatures, it restrains
        movement → less fluid; at low temperatures, it prevents tight packing →
        more fluid.
        <strong>Fatty acid composition</strong> also affects fluidity:
        unsaturated fatty acids (kinked) → more fluid; saturated (straight) →
        less fluid.
      </p>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Membrane Proteins</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="font-semibold text-sm text-blue-600">
            Integral (Transmembrane) Proteins
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Span the entire bilayer, with hydrophobic regions in the core and
            hydrophilic ends exposed to water. Functions: channels (porins, ion
            channels), carriers (GLUT1), receptors (insulin receptor), pumps
            (Na⁺/K⁺ ATPase).
          </p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="font-semibold text-sm text-green-600">
            Peripheral Proteins
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Attached to the membrane surface (often to integral proteins or
            lipid heads) via electrostatic or hydrogen bonds. Easily removed.
            Functions: signalling (G proteins), cytoskeletal anchoring
            (spectrin).
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm text-amber-600">
            Lipid-Anchored Proteins
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Covalently attached to lipids (GPI anchors, prenylation,
            myristoylation). Found on the outer surface (GPI) or inner surface
            (prenylated).
          </p>
        </div>
      </div>

      <h3>The Glycocalyx</h3>
      <p>
        The outer surface of the membrane is coated with{" "}
        <strong>carbohydrate</strong>
        chains attached to proteins (glycoproteins) and lipids (glycolipids).
        This
        <strong>glycocalyx</strong> functions in cell-cell recognition (blood
        types ABO), adhesion, and protection against mechanical damage.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Membrane Asymmetry</h3>
      <p>
        The two leaflets of the bilayer have{" "}
        <strong>different lipid compositions</strong>:
      </p>
      <ul>
        <li>Outer leaflet: phosphatidylcholine, sphingomyelin, glycolipids</li>
        <li>
          Inner leaflet: phosphatidylethanolamine, phosphatidylserine
          (negatively charged), phosphatidylinositol
        </li>
      </ul>
      <p>
        This asymmetry is maintained by <strong>flippases</strong> (active
        transporters) and is functionally important: phosphatidylserine exposure
        on the outer leaflet is a signal for apoptosis.
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "membrane-worked-1",
            question:
              "A cell is grown at 25°C and then shifted to 37°C. Predict how the membrane composition changes to maintain optimal fluidity (homeoviscous adaptation).",
            hints: [
              "What happens to membrane fluidity at higher temperatures?",
              "What lipid modifications decrease fluidity?",
              "What type of fatty acids make membranes more rigid?",
            ],
            solution:
              "Higher temperature increases membrane fluidity (more thermal motion). The cell compensates by: 1) increasing the proportion of saturated fatty acids (straight chains pack tighter), 2) increasing cholesterol content (stiffens the membrane), 3) decreasing unsaturated fatty acids (fewer kinks). This is homeoviscous adaptation.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Fluid mosaic model (Singer-Nicolson)",
          "Phospholipid bilayer: amphipathic",
          "Cholesterol: fluidity buffer (animal cells only)",
          "Integral: transmembrane (channels, receptors)",
          "Peripheral: surface-attached (signalling)",
          "Glycocalyx: carbs for recognition/adhesion",
          "Asymmetric: different lipids in each leaflet",
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
      id: "membrane-q1",
      type: "multiple-choice",
      prompt: "Who proposed the fluid mosaic model of membrane structure?",
      answer: "Singer and Nicolson",
      difficulty: "recall",
      options: [
        "Schleiden and Schwann",
        "Singer and Nicolson",
        "Watson and Crick",
        "Hooke and Leeuwenhoek",
      ],
    },
    {
      id: "membrane-q2",
      type: "multiple-choice",
      prompt: "What is the role of cholesterol in animal cell membranes?",
      answer: "Buffers membrane fluidity",
      difficulty: "recall",
      options: [
        "Provides energy",
        "Buffers membrane fluidity",
        "Transports nutrients",
        "Synthesises proteins",
      ],
    },
    {
      id: "membrane-q3",
      type: "multiple-choice",
      prompt: "Which type of membrane protein spans the entire bilayer?",
      answer: "Integral (transmembrane) protein",
      difficulty: "recall",
      options: [
        "Peripheral protein",
        "Integral (transmembrane) protein",
        "Lipid-anchored protein",
        "Extracellular protein",
      ],
    },
    {
      id: "membrane-q4",
      type: "multiple-choice",
      prompt:
        "You want to extract a transmembrane protein. Which conditions would be most effective?",
      answer: "Detergent (e.g., SDS) to disrupt the bilayer",
      difficulty: "apply",
      options: [
        "High salt to disrupt electrostatic interactions",
        "Detergent (e.g., SDS) to disrupt the bilayer",
        "pH change to denature the protein",
        "Ultracentrifugation alone",
      ],
    },
    {
      id: "membrane-q5",
      type: "multiple-choice",
      prompt:
        "The carbohydrate moieties of the glycocalyx face which direction?",
      answer: "Outward (extracellular)",
      difficulty: "apply",
      options: [
        "Inward (cytoplasmic)",
        "Outward (extracellular)",
        "Both sides equally",
        "Embedded in the bilayer",
      ],
      imatYear: 2023,
    },
    {
      id: "membrane-q6",
      type: "explain-why",
      prompt:
        "Explain why the inner and outer leaflets of the cell membrane have different lipid compositions.",
      answer:
        "Membrane asymmetry is functionally critical: phosphatidylserine (negatively charged) on the inner leaflet creates a surface for protein binding (e.g., signalling cascades). Its exposure on the outer leaflet signals apoptosis (cell death). The asymmetry is maintained by flippases (active transporters) and is essential for membrane curvature, vesicle budding, and signal transduction.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["membrane-transport", "lipids", "organelles"],
  prerequisites: ["lipids"],
};
