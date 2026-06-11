"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question:
      "What is the difference between simple and facilitated diffusion?",
    answer:
      "Simple: directly through bilayer (no protein). Facilitated: via channel or carrier protein",
    context: "Both passive (no energy)",
  },
  {
    id: "qf-2",
    question: "What is osmosis?",
    answer:
      "The net movement of water across a selectively permeable membrane down its concentration gradient",
    context: "Water diffusion",
  },
  {
    id: "qf-3",
    question: "What is the Na⁺/K⁺ pump?",
    answer:
      "Active transporter that pumps 3 Na⁺ out and 2 K⁺ in per ATP hydrolysed",
    context: "Primary active transport",
  },
];

export const membraneTransportNote: AtomicNote = {
  slug: "membrane-transport",
  subject: "biology",
  topic: "cell-biology",
  title: "Membrane Transport",
  summary:
    "Mechanisms by which molecules cross cell membranes. Passive transport (diffusion, facilitated diffusion, osmosis) requires no energy. Active transport (primary and secondary) requires ATP. Bulk transport (endocytosis, exocytosis) moves large molecules or particles.",
  memoryHook:
    "Passive = downhill (no energy). Active = uphill (needs ATP). Simple diffusion: small non-polar. Facilitated: polar/big via channels. Active: against gradient via pumps.",
  imatTrap:
    "Water can cross the bilayer slowly by simple diffusion (water is small and uncharged), but aquaporins greatly accelerate it. Also: facilitated diffusion is SATURABLE (limited by number of carriers/channels), unlike simple diffusion which is not saturable. And: 'active transport' requires direct (primary) or indirect (secondary) ATP consumption — secondary active transport uses the Na⁺ gradient (established by the Na⁺/K⁺ pump), so it ultimately depends on ATP.",
  whyItMatters:
    "Transport defects cause disease: cystic fibrosis (CFTR Cl⁻ channel mutation → thick mucus), diabetes (GLUT4 translocation defect), heart failure treated with digitalis (inhibits Na⁺/K⁺ pump). Understanding transport is essential for pharmacology (drug absorption) and nephrology (kidney function).",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Simple vs facilitated vs active transport",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Osmosis — hyper/hypo/isotonic effects",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Na⁺/K⁺ pump direction and stoichiometry",
    },
  ],
  equations: [
    {
      id: "transport-diffusion",
      latex: "Fick: J = -D\\frac{dC}{dx}",
      description:
        "Fick's first law — rate of diffusion depends on concentration gradient",
      variables:
        "J = flux, D = diffusion coefficient, dC/dx = concentration gradient",
    },
    {
      id: "transport-11-nernst",
      latex:
        "E_{ion} = \\frac{RT}{zF}\\ln\\left(\\frac{[ion]_{out}}{[ion]_{in}}\\right)",
      description: "Nernst equation — equilibrium potential for an ion",
    },
    {
      id: "transport-osmotic",
      latex: "\\Pi = iMRT",
      description:
        "Van't Hoff equation — osmotic pressure depends on solute concentration",
      variables:
        "Π = osmotic pressure, i = van't Hoff factor, M = molarity, R = gas constant, T = temperature",
    },
  ],
  workedExamples: [
    {
      id: "transport-worked-1",
      question:
        "A red blood cell is placed in a 0.3 M NaCl solution, and another is placed in distilled water. Predict what happens to each cell and explain why.",
      hints: [
        "What is the approximate osmolarity of blood plasma?",
        "In which direction does water move?",
        "What happens when a cell swells too much?",
      ],
      solution:
        "0.3 M NaCl = ~0.6 Osm/L (since NaCl dissociates into 2 ions × 0.3 M). This is approximately isotonic to plasma (~0.3 Osm for non-dissociating solutes; plasma is ~0.3 Osm, so 0.3 M NaCl is hypertonic at 0.6 Osm). Actually, normal saline is 0.15 M NaCl = ~0.3 Osm, so 0.3 M NaCl would be hypertonic — water leaves the cell → crenation (shrinkage). Distilled water is hypotonic — water enters the cell → swelling → lysis (haemolysis).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Membrane Transport",
      url: "https://www.khanacademy.org/science/biology/membranes-and-transport/passive-and-active-transport-a/p/passive-and-active-transport",
      type: "article",
      description: "Overview of passive and active transport mechanisms",
    },
    {
      title: "BioNinja — Membrane Transport",
      url: "https://ib.bioninja.com.au/standard-level/topic-1-cell-biology/14-membrane-transport/",
      type: "textbook",
      description: "Interactive diagrams of all transport types",
    },
    {
      title: "OpenStax Biology 2e — Transport",
      url: "https://openstax.org/books/biology-2e/pages/5-2-passive-transport",
      type: "textbook",
      description: "Free chapter on passive and active transport",
    },
  ],
  highYieldPoints: [
    "Simple diffusion: small non-polar molecules (O₂, CO₂), directly through bilayer, no protein, not saturable",
    "Facilitated diffusion: via channels (ion channels) or carriers (GLUT), saturable, down gradient",
    "Osmosis: water moves from low solute to high solute concentration (when membrane is water-permeable)",
    "Primary active transport: Na⁺/K⁺ ATPase (3 Na⁺ out, 2 K⁺ in), Ca²⁺ ATPase, H⁺/K⁺ ATPase",
    "Secondary active transport: uses Na⁺ gradient — symport (both same direction, e.g., SGLT1) or antiport (opposite, e.g., Na⁺/Ca²⁺ exchanger)",
    "Endocytosis: phagocytosis (solid), pinocytosis (liquid), receptor-mediated (specific uptake, e.g., LDL)",
    "Exocytosis: secretion of neurotransmitters, hormones, digestive enzymes via vesicle fusion",
  ],
  explanation: (
    <div>
      <p>
        <strong>Membrane transport</strong> describes how molecules cross the
        selectively permeable cell membrane. Transport can be{" "}
        <strong>passive</strong>
        (no energy required) or <strong>active</strong> (requires ATP or an
        existing gradient).
      </p>

      <h3>Passive Transport</h3>

      <h4>Simple Diffusion</h4>
      <p>
        Small, non-polar molecules (O₂, CO₂, N₂, steroid hormones) dissolve in
        the lipid bilayer and diffuse directly through. Rate depends on the
        concentration gradient and lipid solubility. Not saturable.
      </p>

      <h4>Facilitated Diffusion</h4>
      <p>
        Polar molecules and ions use membrane proteins:
        <strong>Channels</strong> — aqueous pores (ion channels are usually
        gated: voltage, ligand, or mechanically gated).{" "}
        <strong>Carriers</strong>— bind the molecule and change shape to release
        it on the other side (GLUT1 for glucose). Saturatable (limited by number
        of proteins).
      </p>

      <h4>Osmosis</h4>
      <p>
        The <strong>net diffusion of water</strong> across a selectively
        permeable membrane. Water moves from a region of low solute
        concentration (high water concentration) to high solute concentration
        (low water concentration). <strong>Aquaporins</strong> are
        water-specific channels.
      </p>

      <EquationBlock
        equation={{
          id: "transport-osmotic",
          latex: "\\Pi = iMRT",
          description: "Osmotic pressure (van't Hoff equation)",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Active Transport</h3>

      <h4>Primary Active Transport</h4>
      <p>
        Uses ATP directly to move molecules against their gradient. The
        <strong>Na⁺/K⁺ ATPase</strong> is the most important: it pumps 3 Na⁺ out
        and 2 K⁺ in per ATP. This establishes the electrochemical gradient that
        powers secondary active transport.
      </p>

      <h4>Secondary Active Transport</h4>
      <p>
        Uses the Na⁺ gradient (established by Na⁺/K⁺ ATPase) to transport other
        molecules. <strong>Symport (cotransport):</strong> Na⁺ and glucose enter
        together (SGLT1 in kidney/intestine).{" "}
        <strong>Antiport (countertransport):</strong> Na⁺ enters, Ca²⁺ exits
        (Na⁺/Ca²⁺ exchanger).
      </p>

      <h3>Bulk Transport</h3>
      <p>
        <strong>Endocytosis:</strong> membrane invaginates to engulf
        extracellular material. Types: phagocytosis (large particles),
        pinocytosis (fluid), receptor-mediated endocytosis (specific uptake via
        coated pits). <strong>Exocytosis:</strong> intracellular vesicles fuse
        with membrane to release contents (neurotransmitters, hormones).
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Tonicity — Effect on Cells</h3>
      <div className="grid grid-cols-3 gap-3 rounded-lg border bg-card p-4 text-xs">
        <div>
          <h4 className="font-semibold text-blue-500">Hypotonic</h4>
          <p>Water enters → cell swells → lysis (animal cells)</p>
        </div>
        <div>
          <h4 className="font-semibold text-green-500">Isotonic</h4>
          <p>No net water movement → no change</p>
        </div>
        <div>
          <h4 className="font-semibold text-red-500">Hypertonic</h4>
          <p>Water leaves → cell shrinks (crenation)</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        Plant cells: hypotonic → turgid (good). Hypertonic → plasmolysis
        (membrane pulls away from cell wall).
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "transport-worked-1",
            question:
              "A red blood cell is placed in a 0.3 M NaCl solution, and another is placed in distilled water. Predict what happens to each cell and explain why.",
            hints: [
              "What is the approximate osmolarity of blood plasma?",
              "In which direction does water move?",
              "What happens when a cell swells too much?",
            ],
            solution:
              "0.3 M NaCl = ~0.6 Osm/L (since NaCl dissociates into 2 ions). Normal saline is 0.15 M NaCl = ~0.3 Osm, so 0.3 M NaCl is hypertonic — water leaves the cell → crenation (shrinkage). Distilled water is hypotonic — water enters the cell → swelling → lysis (haemolysis).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Simple diffusion: O₂, CO₂ — no protein, not saturable",
          "Facilitated: channels (fast) or carriers (slower, saturable)",
          "Osmosis: water diffusion (via bilayer + aquaporins)",
          "Na⁺/K⁺ pump: 3 out, 2 in, 1 ATP (electrogenic)",
          "Secondary active: uses Na⁺ gradient (symport/antiport)",
          "Endocytosis: phagocytosis, pinocytosis, receptor-mediated",
          "Hypotonic = swell, isotonic = no change, hypertonic = shrink",
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
      id: "transport-q1",
      type: "multiple-choice",
      prompt: "Which type of transport requires ATP?",
      answer: "Active transport",
      difficulty: "recall",
      options: [
        "Simple diffusion",
        "Facilitated diffusion",
        "Active transport",
        "Osmosis",
      ],
    },
    {
      id: "transport-q2",
      type: "multiple-choice",
      prompt: "The Na⁺/K⁺ pump pumps out/in how many ions per ATP?",
      answer: "3 Na⁺ out, 2 K⁺ in",
      difficulty: "recall",
      options: [
        "2 Na⁺ out, 3 K⁺ in",
        "3 Na⁺ out, 2 K⁺ in",
        "3 Na⁺ out, 3 K⁺ in",
        "2 Na⁺ out, 2 K⁺ in",
      ],
    },
    {
      id: "transport-q3",
      type: "multiple-choice",
      prompt: "A red blood cell in distilled water will:",
      answer: "Swell and lyse (burst)",
      difficulty: "apply",
      options: [
        "Shrink (crenate)",
        "Swell and lyse (burst)",
        "Remain unchanged",
        "Become turgid",
      ],
    },
    {
      id: "transport-q4",
      type: "multiple-choice",
      prompt: "Which is an example of secondary active transport?",
      answer: "SGLT1 — Na⁺/glucose symport in the kidney",
      difficulty: "apply",
      options: [
        "Na⁺/K⁺ ATPase",
        "SGLT1 — Na⁺/glucose symport in the kidney",
        "GLUT1 glucose transporter",
        "Aquaporin",
      ],
      imatYear: 2023,
    },
    {
      id: "transport-q5",
      type: "multiple-choice",
      prompt: "Facilitated diffusion differs from simple diffusion because:",
      answer: "It requires a membrane protein and is saturable",
      difficulty: "apply",
      options: [
        "It requires ATP",
        "It requires a membrane protein and is saturable",
        "It only moves water",
        "It moves molecules against their gradient",
      ],
    },
    {
      id: "transport-q6",
      type: "explain-why",
      prompt:
        "Explain why receptor-mediated endocytosis is more efficient than pinocytosis for nutrient uptake.",
      answer:
        "Receptor-mediated endocytosis concentrates specific molecules (e.g., LDL, iron-bound transferrin) by binding them to surface receptors before internalisation via clathrin-coated pits. This allows selective, high-affinity uptake even when the target molecule is at low concentration. Pinocytosis non-selectively takes in whatever solutes are in the extracellular fluid at their ambient concentration.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["cell-membrane-structure", "organelles", "homeostasis"],
  prerequisites: ["cell-membrane-structure"],
};
