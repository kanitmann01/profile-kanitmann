"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question:
      "What is the most fundamental difference between prokaryotic and eukaryotic cells?",
    answer:
      "Eukaryotes have a true membrane-bound nucleus; prokaryotes do not (nucleoid region)",
    context: "Defining characteristic",
  },
  {
    id: "qf-2",
    question: "Which type of cell is generally larger?",
    answer: "Eukaryotic cells (10–100 μm vs prokaryotes 0.5–5 μm)",
    context: "Scale difference",
  },
  {
    id: "qf-3",
    question: "What type of ribosomes do prokaryotes have?",
    answer: "70S (50S + 30S subunits)",
    context: "Drug target difference",
  },
];

export const prokaryotesVsEukaryotesNote: AtomicNote = {
  slug: "prokaryotes-vs-eukaryotes",
  subject: "biology",
  topic: "cell-biology",
  title: "Prokaryotes vs Eukaryotes",
  summary:
    "Prokaryotes (Bacteria and Archaea) are smaller, simpler cells without membrane-bound organelles or a nucleus. Eukaryotes (protists, fungi, plants, animals) are larger, with compartmentalised organelles and a true nucleus. The differences in ribosomes, DNA organisation, reproduction, and cell structure have significant clinical implications.",
  memoryHook:
    "Pro = no nucleus (pro = before, karyon = nucleus). Eu = true nucleus. Think: prokaryotes are 'simple and ancient'; eukaryotes are 'complex and modern'.",
  imatTrap:
    "Not all prokaryotes are bacteria — Archaea are also prokaryotic but are genetically distinct from bacteria (different membrane lipids, no peptidoglycan). Also: some prokaryotes do have internal membranes (e.g., cyanobacteria have thylakoid-like membranes for photosynthesis), but they lack true membrane-bound organelles. The trap: assuming 'no nucleus = completely disorganised' — prokaryotes still have organised nucleoid regions.",
  whyItMatters:
    "The differences determine antibiotic selectivity: antibiotics targeting 70S ribosomes (tetracycline, erythromycin) kill bacteria with minimal effect on human 80S ribosomes. Differences in cell wall structure determine Gram staining, which guides antibiotic choice. Understanding prokaryotic vs eukaryotic biology underpins microbiology, infectious disease medicine, and biotechnology.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Comparison table: key differences",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Ribosome size (70S vs 80S) as antibiotic target",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Peptidoglycan cell wall (bacteria only)",
    },
  ],
  equations: [],
  workedExamples: [
    {
      id: "pro-vs-eu-worked-1",
      question:
        "A new antibiotic candidate selectively kills bacterial cells without harming human cells. Suggest which cellular target(s) the antibiotic might act on, explaining why the selectivity is possible.",
      hints: [
        "What structures are unique to bacteria?",
        "What molecular machines differ between cell types?",
        "Think about ribosomes, cell walls, and metabolic pathways",
      ],
      solution:
        "Possible targets: 1) Bacterial ribosome (70S) — antibiotics like tetracycline bind to 30S subunit, which differs from human 80S ribosomes. 2) Peptidoglycan synthesis enzymes (penicillin-binding proteins) — humans lack peptidoglycan entirely. 3) Bacterial RNA polymerase (rifampicin) — differs from eukaryotic RNA polymerases. 4) Bacterial dihydrofolate reductase (trimethoprim) — structural differences allow selective inhibition.",
      imatYear: 2024,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Prokaryotic vs Eukaryotic Cells",
      url: "https://www.khanacademy.org/science/biology/structure-of-a-cell/prokaryotic-and-eukaryotic-cells/a/prokaryotic-and-eukaryotic-cells",
      type: "article",
      description: "Clear comparison with visual diagrams",
    },
    {
      title: "Nature Scitable — Cell Differences",
      url: "https://www.nature.com/scitable/topicpage/cell-biology-13906478/",
      type: "article",
      description: "Detailed comparison of cell types",
    },
    {
      title: "OpenStax Biology 2e — Cell Types",
      url: "https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells",
      type: "textbook",
      description:
        "Free textbook covering prokaryotic and eukaryotic cell biology",
    },
  ],
  highYieldPoints: [
    "Prokaryotes: no nucleus (nucleoid), no membrane-bound organelles, smaller (0.5–5 μm)",
    "Eukaryotes: true nucleus, membrane-bound organelles, larger (10–100 μm)",
    "Prokaryotic ribosomes: 70S (30S + 50S); Eukaryotic: 80S (40S + 60S) — key antibiotic target",
    "Bacteria: peptidoglycan cell wall (Gram-positive: thick layer; Gram-negative: thin + outer membrane)",
    "Eukaryotes: have histones (proteins that package DNA); prokaryotes: DNA not wrapped in histones",
    "Both: cell membrane, cytoplasm, ribosomes, DNA (but prokaryotic DNA = circular, plasmid often present)",
    "Reproduction: prokaryotes = binary fission; eukaryotes = mitosis/meiosis",
  ],
  explanation: (
    <div>
      <p>
        The distinction between <strong>prokaryotic</strong> and{" "}
        <strong>eukaryotic</strong> cells is the most fundamental classification
        in cell biology. Prokaryotes (bacteria and archaea) are simpler;
        eukaryotes (all other life) are more complex, with compartmentalised
        internal structure.
      </p>

      <h3>Key Differences — Comparison Table</h3>
      <div className="my-4 rounded-lg border bg-card p-4 text-sm">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Feature</th>
              <th className="text-left pb-2">Prokaryotes</th>
              <th className="text-left pb-2">Eukaryotes</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="py-1">Nucleus</td>
              <td>No (nucleoid)</td>
              <td>Yes (membrane-bound)</td>
            </tr>
            <tr>
              <td className="py-1">Size</td>
              <td>0.5–5 μm</td>
              <td>10–100 μm</td>
            </tr>
            <tr>
              <td className="py-1">Ribosomes</td>
              <td>70S</td>
              <td>80S</td>
            </tr>
            <tr>
              <td className="py-1">DNA</td>
              <td>Circular, no histones</td>
              <td>Linear, wrapped around histones</td>
            </tr>
            <tr>
              <td className="py-1">Organelles</td>
              <td>None membrane-bound</td>
              <td>Mitochondria, ER, Golgi, etc.</td>
            </tr>
            <tr>
              <td className="py-1">Cell wall</td>
              <td>Peptidoglycan (bacteria)</td>
              <td>Cellulose (plants) or none (animals)</td>
            </tr>
            <tr>
              <td className="py-1">Reproduction</td>
              <td>Binary fission</td>
              <td>Mitosis / meiosis</td>
            </tr>
            <tr>
              <td className="py-1">Plasmids</td>
              <td>Common (extra-chromosomal)</td>
              <td>Rare in eukaryotes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Bacterial Cell Wall & Gram Staining</h3>
      <p>
        <strong>Gram-positive:</strong> thick peptidoglycan layer (retains
        crystal violet → purple). <strong>Gram-negative:</strong> thin
        peptidoglycan + outer membrane (loses crystal violet → pink after
        counterstain). The cell wall protects against osmotic lysis and is the
        target of many antibiotics (penicillin inhibits peptidoglycan
        cross-linking).
      </p>

      <h3>Archaea — The Third Domain</h3>
      <p>
        Archaea are prokaryotes but are genetically and biochemically distinct
        from bacteria:
      </p>
      <ul>
        <li>
          Cell membrane: ether-linked lipids (vs ester in bacteria/eukaryotes)
        </li>
        <li>No peptidoglycan (pseudopeptidoglycan or other polymers)</li>
        <li>
          RNA polymerase and ribosome structure more similar to eukaryotes
        </li>
        <li>Often extremophiles (thermophiles, halophiles)</li>
      </ul>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Antibiotic Selectivity</h3>
      <p>
        Differences between prokaryotic and eukaryotic cells allow selective
        targeting:
      </p>
      <ul>
        <li>
          Penicillin: inhibits peptidoglycan synthesis (no human equivalent)
        </li>
        <li>Tetracycline: binds 30S (70S) ribosome, blocks translation</li>
        <li>Ciprofloxacin: inhibits bacterial DNA gyrase (topoisomerase II)</li>
        <li>Sulfonamides: inhibit bacterial folic acid synthesis</li>
      </ul>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "pro-vs-eu-worked-1",
            question:
              "A new antibiotic candidate selectively kills bacterial cells without harming human cells. Suggest which cellular target(s) the antibiotic might act on, explaining why the selectivity is possible.",
            hints: [
              "What structures are unique to bacteria?",
              "What molecular machines differ between cell types?",
              "Think about ribosomes, cell walls, and metabolic pathways",
            ],
            solution:
              "Possible targets: 1) Bacterial ribosome (70S) — tetracycline binds 30S subunit. 2) Peptidoglycan synthesis — penicillin. 3) Bacterial RNA polymerase — rifampicin. 4) Bacterial dihydrofolate reductase — trimethoprim.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Pro = no nucleus, no organelles, ~1 μm",
          "Eu = nucleus + organelles, ~10–100 μm",
          "Pro ribosomes: 70S; Eu ribosomes: 80S",
          "Pro DNA: circular, no histones (plasmids)",
          "Bacteria: peptidoglycan (Gram +/-)",
          "Archaea: distinct from bacteria (ether lipids)",
          "Antibiotics target differences (70S, cell wall)",
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
      id: "pro-vs-eu-q1",
      type: "multiple-choice",
      prompt:
        "Which of the following is found in prokaryotic cells but NOT in eukaryotic cells?",
      answer: "Peptidoglycan cell wall",
      difficulty: "recall",
      options: ["Ribosomes", "Peptidoglycan cell wall", "Cell membrane", "DNA"],
    },
    {
      id: "pro-vs-eu-q2",
      type: "multiple-choice",
      prompt: "Eukaryotic ribosomes are:",
      answer: "80S",
      difficulty: "recall",
      options: ["70S", "80S", "90S", "60S"],
    },
    {
      id: "pro-vs-eu-q3",
      type: "multiple-choice",
      prompt: "Which of the following is NOT a prokaryote?",
      answer: "Yeast",
      difficulty: "recall",
      options: ["E. coli", "Yeast", "Streptococcus", "Methanogens (Archaea)"],
    },
    {
      id: "pro-vs-eu-q4",
      type: "multiple-choice",
      prompt: "Plasmids are more commonly found in:",
      answer: "Prokaryotic cells",
      difficulty: "apply",
      options: [
        "Prokaryotic cells",
        "Eukaryotic cells",
        "Both equally",
        "Neither",
      ],
    },
    {
      id: "pro-vs-eu-q5",
      type: "multiple-choice",
      prompt: "Penicillin targets bacteria by inhibiting:",
      answer: "Peptidoglycan cross-linking in the cell wall",
      difficulty: "apply",
      options: [
        "DNA replication",
        "Peptidoglycan cross-linking in the cell wall",
        "Protein synthesis (70S ribosome)",
        "RNA polymerase",
      ],
      imatYear: 2023,
    },
    {
      id: "pro-vs-eu-q6",
      type: "explain-why",
      prompt:
        "Explain why antibiotics that target the 30S ribosomal subunit are effective against bacteria but not human cells.",
      answer:
        "Bacterial ribosomes are 70S (30S + 50S subunits), while human ribosomes are 80S (40S + 60S). The structural differences in the 30S subunit (RNA sequence and protein composition) mean antibiotics like tetracycline bind selectively to bacterial 30S, blocking tRNA entry and halting translation. The human 40S subunit lacks the binding site for tetracycline.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["organelles", "cell-theory", "viruses"],
  prerequisites: ["cell-theory"],
};
