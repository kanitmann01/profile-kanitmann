"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "Which organelle is the site of aerobic respiration?",
    answer: "Mitochondria",
    context: "Powerhouse of the cell",
  },
  {
    id: "qf-2",
    question: "Which organelle modifies, sorts, and packages proteins?",
    answer: "Golgi apparatus",
    context: "Post-ER processing",
  },
  {
    id: "qf-3",
    question:
      "Which organelle contains hydrolytic enzymes for intracellular digestion?",
    answer: "Lysosomes",
    context: "Suicide bags of the cell",
  },
];

export const organellesNote: AtomicNote = {
  slug: "organelles",
  subject: "biology",
  topic: "cell-biology",
  title: "Organelles",
  summary:
    "Specialised membrane-bound compartments within eukaryotic cells that perform specific functions. Key organelles: nucleus (genetic control), mitochondria (energy), endoplasmic reticulum (protein/lipid synthesis), Golgi (modification/sorting), lysosomes (digestion), peroxisomes (detoxification), and ribosomes (protein synthesis).",
  memoryHook:
    "Nucleus = brain. Mitochondria = power plant. ER = factory. Golgi = post office. Lysosome = recycling centre. Ribosomes = construction workers.",
  imatTrap:
    "Ribosomes are NOT membrane-bound organelles — they are large RNA-protein complexes. They are not considered organelles in the strict 'membrane-bound compartment' sense. Also: mitochondria and chloroplasts have their OWN DNA and 70S ribosomes (like bacteria) — evidence for the endosymbiotic theory. RER has ribosomes on the surface, SER does not. The trap: thinking ALL organelles are membrane-bound (ribosomes are not).",
  whyItMatters:
    "Organelle dysfunction causes specific diseases: mitochondrial diseases (fatigue, neurological issues), lysosomal storage disorders (Tay-Sachs, Gaucher — enzyme deficiencies), peroxisomal disorders (Zellweger syndrome), and ER stress-related diseases (diabetes, neurodegeneration).",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Structure-function matching for each organelle",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Mitochondria and chloroplasts — own DNA, double membrane",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Ribosomes: 70S vs 80S — prokaryotes vs eukaryotes",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "organelles-worked-1",
      question:
        "A cell is treated with a drug that inhibits the function of the Golgi apparatus. Predict the immediate and long-term effects on the cell.",
      hints: [
        "What path do secretory proteins follow?",
        "What happens to proteins arriving at a non-functional Golgi?",
        "Which cellular functions depend on the Golgi?",
      ],
      solution:
        "Immediate: proteins synthesised on RER accumulate in transport vesicles because they cannot enter the Golgi for processing. Glycosylation (addition of carbohydrate chains) stops — affecting cell-surface glycoproteins and glycocalyx formation. Long-term: secretion of hormones, enzymes, and extracellular matrix components ceases. Lysosomal enzymes are not tagged with mannose-6-phosphate, so they are not delivered to lysosomes → lysosomal dysfunction. The cell would eventually die from accumulation of undigested material and loss of secretion.",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Cell Organelles",
      url: "https://www.khanacademy.org/science/biology/structure-of-a-cell/tour-of-organelles/a/tour-of-animal-cell",
      type: "article",
      description: "Comprehensive guide to eukaryotic organelles",
    },
    {
      title: "Nature Scitable — Organelles",
      url: "https://www.nature.com/scitable/topicpage/organelles-14053410/",
      type: "article",
      description: "Detailed coverage of organelle structure and function",
    },
    {
      title: "OpenStax Biology 2e — Cell Structure",
      url: "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells",
      type: "textbook",
      description: "Free textbook chapter on eukaryotic cell structure",
    },
  ],
  highYieldPoints: [
    "Nucleus: double membrane (nuclear envelope with pores), contains DNA, nucleolus = rRNA synthesis",
    "Mitochondria: double membrane (outer + inner folded into cristae), own DNA, 70S ribosomes, ATP production",
    "Rough ER: ribosomes on surface → protein synthesis + folding; Smooth ER: lipid synthesis, detoxification, Ca²⁺ storage",
    "Golgi: modifies (glycosylation), sorts, and packages proteins; tags lysosomal enzymes with mannose-6-phosphate",
    "Lysosomes: acidic (pH ~5) with hydrolytic enzymes for digestion of macromolecules and pathogens",
    "Peroxisomes: contain catalase to break down H₂O₂; involved in β-oxidation of very long-chain fatty acids",
    "Ribosomes: 80S (eukaryotic, large + small subunits) vs 70S (prokaryotic/mitochondrial/chloroplast) — NOT membrane-bound",
  ],
  explanation: (
    <div>
      <p>
        <strong>Organelles</strong> are specialised compartments within
        eukaryotic cells, each performing a specific function to maintain
        cellular homeostasis. Most organelles are{" "}
        <strong>membrane-bound</strong>, creating distinct chemical environments
        optimised for their functions.
      </p>

      <h3>Key Organelles — Structure & Function</h3>

      <div className="grid gap-3">
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Nucleus</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Largest organelle. Surrounded by the{" "}
            <strong>nuclear envelope</strong>
            (double membrane with nuclear pores). Contains chromatin (DNA +
            histones). The <strong>nucleolus</strong> is the site of rRNA
            synthesis and ribosome assembly.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Mitochondria</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Double membrane: outer membrane + inner membrane (folded into{" "}
            <strong>cristae</strong>). The matrix (inside) contains Krebs cycle
            enzymes. Site of oxidative phosphorylation (ATP production). Have
            their own <strong>circular DNA</strong> and 70S ribosomes —
            inherited maternally.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Endoplasmic Reticulum</h4>
          <p className="text-sm text-muted-foreground mt-1">
            <strong>Rough ER:</strong> studded with ribosomes — site of
            synthesis of secretory and membrane proteins, which are folded here
            (chaperones) and modified (N-linked glycosylation starts).{" "}
            <strong>Smooth ER:</strong> lipid and steroid synthesis,
            carbohydrate metabolism, Ca²⁺ storage, detoxification (liver).
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Golgi Apparatus</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Stacked flattened membrane sacs (cisternae). Receives proteins from
            the ER, modifies them (glycosylation, sulfation), sorts them, and
            packages into vesicles for secretion or delivery to other
            organelles. Has a cis (entry) and trans (exit) face.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Lysosomes</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Membrane-bound vesicles containing{" "}
            <strong>hydrolytic enzymes</strong>
            that work best at acidic pH (~5). Functions: digest materials taken
            up by endocytosis, degrade worn-out organelles (autophagy), destroy
            pathogens. The H⁺ gradient is maintained by a V-type ATPase.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Peroxisomes</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Contain <strong>catalase</strong> which breaks down H₂O₂ (a toxic
            byproduct of metabolism) into H₂O and O₂. Involved in β-oxidation of
            very long-chain fatty acids, bile acid synthesis, and plasmalogen
            synthesis.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-3">
          <h4 className="font-semibold text-sm">Ribosomes</h4>
          <p className="text-sm text-muted-foreground mt-1">
            <strong>NOT membrane-bound.</strong> Composed of rRNA and proteins.
            Eukaryotes: 80S (60S + 40S subunits). Prokaryotes: 70S (50S + 30S).
            Free ribosomes make cytoplasmic proteins; bound ribosomes (on RER)
            make secretory/membrane proteins.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Endomembrane System</h3>
      <p>
        The <strong>endomembrane system</strong> includes the nuclear envelope,
        ER, Golgi, lysosomes, vesicles, and the plasma membrane. These are
        interconnected via vesicle trafficking: ER → Golgi → plasma membrane (or
        lysosomes). This system handles the synthesis, modification, and
        transport of proteins and lipids.
      </p>

      <h3>Protein Trafficking Pathway</h3>
      <p>
        mRNA → ribosome (on RER) → protein enters RER lumen → vesicle buds →
        Golgi (cis → medial → trans) → modified and sorted → vesicle → plasma
        membrane (secretion) or lysosome (tagged with mannose-6-phosphate).
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "organelles-worked-1",
            question:
              "A cell is treated with a drug that inhibits the function of the Golgi apparatus. Predict the immediate and long-term effects on the cell.",
            hints: [
              "What path do secretory proteins follow?",
              "What happens to proteins arriving at a non-functional Golgi?",
              "Which cellular functions depend on the Golgi?",
            ],
            solution:
              "Immediate: proteins from RER accumulate. Glycosylation stops. Long-term: secretion ceases, lysosomal enzymes not delivered, cell dies from accumulation of undigested material.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Nucleus: DNA storage, transcription, rRNA synthesis",
          "Mitochondria: ATP, own DNA (maternal), double membrane",
          "RER: protein synthesis + folding; SER: lipids, detox",
          "Golgi: modification, sorting, packaging",
          "Lysosomes: acidic digestive enzymes",
          "Peroxisomes: H₂O₂ breakdown (catalase), β-oxidation",
          "Ribosomes: 80S (eukaryote) vs 70S (prokaryote), NOT membrane-bound",
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
      id: "organelles-q1",
      type: "multiple-choice",
      prompt:
        "Which organelle contains hydrolytic enzymes for intracellular digestion?",
      answer: "Lysosomes",
      difficulty: "recall",
      options: ["Peroxisomes", "Lysosomes", "Golgi apparatus", "Rough ER"],
    },
    {
      id: "organelles-q2",
      type: "multiple-choice",
      prompt: "Which of the following is NOT membrane-bound?",
      answer: "Ribosomes",
      difficulty: "recall",
      options: ["Nucleus", "Mitochondria", "Ribosomes", "Lysosomes"],
    },
    {
      id: "organelles-q3",
      type: "multiple-choice",
      prompt: "Ribosomes on the rough ER synthesise proteins destined for:",
      answer: "Secretion or membrane insertion",
      difficulty: "recall",
      options: [
        "Cytoplasmic use only",
        "Secretion or membrane insertion",
        "Mitochondrial import",
        "Nuclear import",
      ],
    },
    {
      id: "organelles-q4",
      type: "multiple-choice",
      prompt: "Mitochondria have ribosomes that are:",
      answer: "70S (like prokaryotes)",
      difficulty: "apply",
      options: [
        "80S (like eukaryotes)",
        "70S (like prokaryotes)",
        "60S only",
        "They have no ribosomes",
      ],
      imatYear: 2022,
    },
    {
      id: "organelles-q5",
      type: "multiple-choice",
      prompt: "Which enzyme is characteristic of peroxisomes?",
      answer: "Catalase",
      difficulty: "apply",
      options: ["Catalase", "Trypsin", "DNA polymerase", "ATP synthase"],
    },
    {
      id: "organelles-q6",
      type: "explain-why",
      prompt:
        "Explain why the endomembrane system is considered an 'integrated system' rather than a collection of independent organelles.",
      answer:
        "The endomembrane system components (ER, Golgi, lysosomes, vesicles, plasma membrane) are physically and functionally connected via vesicle trafficking. Proteins synthesised in the RER are transported in sequence through the Golgi for modification, then sorted to their destinations. Lipids synthesised in the SER are distributed. This continuous flow means disrupting one component (e.g., with Brefeldin A, which blocks ER→Golgi transport) affects all downstream compartments.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "prokaryotes-vs-eukaryotes",
    "cell-theory",
    "cell-membrane-structure",
    "mitosis",
  ],
  prerequisites: ["cell-theory"],
};
