"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is the strongest type of non-covalent interaction?",
    answer: "Ionic (electrostatic) interactions / ion pairs",
    hint: "Full charges attract",
    context: "Between charged R groups",
  },
  {
    id: "qf-2",
    question:
      "What gives water its high surface tension and high specific heat?",
    answer: "Hydrogen bonding between water molecules",
    context: "Cohesive properties",
  },
  {
    id: "qf-3",
    question: "What is the hydrophobic effect driven by?",
    answer:
      "Entropy increase of water molecules excluded from non-polar surfaces",
    context: "Not attraction — it's solvent-driven",
  },
];

export const weakInteractionsNote: AtomicNote = {
  slug: "weak-interactions",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Weak Interactions in Biological Systems",
  summary:
    "Non-covalent interactions that collectively determine biomolecular structure, molecular recognition, and the properties of water. Includes hydrogen bonds, ionic interactions, van der Waals forces, and the hydrophobic effect. Individual weak, but collectively strong.",
  memoryHook:
    "Weak interactions ranked by strength: Ionic &gt; Hydrogen &gt; van der Waals. Individually ~1–30 kJ/mol vs covalent ~400 kJ/mol. But strength in numbers!",
  imatTrap:
    "The hydrophobic effect is NOT a force of attraction between non-polar molecules — it is the entropic exclusion of water. Non-polar molecules cluster because water molecules are forced into ordered cages around them, lowering entropy. Clustering minimises this surface area, releasing water to increase entropy. Also: van der Waals forces are always attractive AND repulsive at very close range (steric clash), but the equilibrium distance is the sum of van der Waals radii.",
  whyItMatters:
    "Weak interactions govern protein folding (getting the right 3D shape), enzyme-substrate binding (specificity), DNA base pairing (H-bonds), drug-receptor interactions, and the properties of water. Drug design requires understanding these forces to maximise binding affinity. Almost every cellular process depends on molecular recognition via weak interactions.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Hydrogen bonding in water and biomolecules",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Hydrophobic effect — entropy-driven",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Relative strengths: covalent vs non-covalent",
    },
  ],
  equations: [
    {
      id: "weak-hb",
      latex:
        "\\text{-}O\\text{-}H \\cdots \\text{O=} \\quad \\text{or} \\quad \\text{-}N\\text{-}H \\cdots \\text{O=}",
      description:
        "Hydrogen bond: X-H···Y where X and Y are electronegative (N, O, F)",
    },
    {
      id: "weak-coulombs",
      latex: "F = \\frac{k \\cdot q_1 \\cdot q_2}{\\epsilon \\cdot r^2}",
      description:
        "Coulomb's law — ionic bond strength depends on charge and distance",
      variables: "q = charge, r = distance, ε = dielectric constant",
    },
    {
      id: "weak-vdw",
      latex:
        "V(r) = 4\\epsilon\\left[\\left(\\frac{\\sigma}{r}\\right)^{12} - \\left(\\frac{\\sigma}{r}\\right)^6\\right]",
      description:
        "Lennard-Jones potential — describes van der Waals attraction + steric repulsion",
    },
  ],
  workedExamples: [
    {
      id: "weak-worked-1",
      question:
        "Explain why ice floats on water, and identify which weak interaction is responsible.",
      hints: [
        "What happens to the volume of water when it freezes?",
        "How does hydrogen bonding change in ice compared to liquid water?",
        "Does the density increase or decrease when water freezes?",
      ],
      solution:
        "Ice floats because it is less dense than liquid water. When water freezes, hydrogen bonds form a regular, open crystalline lattice (hexagonal). Each water molecule forms 4 H-bonds in ice (tetrahedral arrangement), creating more space between molecules than in liquid water. In liquid water, H-bonds are constantly breaking and reforming, allowing tighter packing. This is why ice has lower density — a rare property critical for aquatic life (ice insulates water below).",
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Hydrogen Bonding in Water",
      url: "https://www.khanacademy.org/science/biology/water-acids-and-bases/water-as-a-solid-liquid-and-gas/v/ice-has-an-unusual-structure",
      type: "video",
      description: "Why ice floats — hydrogen bonding and water structure",
    },
    {
      title: "Biochemistry by Stryer — Weak Interactions",
      url: "https://www.ncbi.nlm.nih.gov/books/NBK22562/",
      type: "textbook",
      description:
        "Detailed coverage of non-covalent interactions in biomolecules",
    },
    {
      title: "MIT OpenCourseWare — Non-covalent Interactions",
      url: "https://www.youtube.com/watch?v=Q_MmG0Pk0hU",
      type: "video",
      description: "Lecture on molecular forces in biological systems",
    },
  ],
  highYieldPoints: [
    "Hydrogen bonds: 5–30 kJ/mol, directional, vital for water, DNA base pairing, protein structure",
    "Ionic interactions: 5–30 kJ/mol (in proteins), strongest non-covalent, pH-dependent",
    "van der Waals forces: 0.5–5 kJ/mol, weak but additive, require close contact (sum of radii)",
    "Hydrophobic effect: entropy-driven, NOT a force — non-polar groups cluster to minimise ordered water",
    "Single weak interaction is fragile, but thousands together determine structure (e.g., protein folding)",
    "Water: 4 H-bonds per molecule, high specific heat, high cohesive/adhesive, universal solvent",
    "Covalent bonds (~400 kJ/mol) vs non-covalent (~1–30 kJ/mol) — huge energy difference",
  ],
  explanation: (
    <div>
      <p>
        <strong>Weak (non-covalent) interactions</strong> are the forces that
        govern molecular recognition, protein folding, DNA pairing, and the
        properties of water. Individually much weaker than covalent bonds, they
        are collectively responsible for virtually all intermolecular
        interactions in biology.
      </p>

      <h3>Hydrogen Bonds</h3>
      <p>
        A <strong>hydrogen bond</strong> forms when a hydrogen atom (covalently
        bonded to an electronegative atom like N, O, or F) is attracted to
        another electronegative atom with a lone pair. In water, each molecule
        forms up to 4 H-bonds (2 donors, 2 acceptors). H-bonds give water its
        high boiling point, surface tension, and specific heat. In biology, they
        hold DNA strands together (A=T: 2 bonds, G≡C: 3 bonds) and stabilise
        protein secondary structure.
      </p>

      <EquationBlock
        equation={{
          id: "weak-hb",
          latex:
            "\\text{-}O\\text{-}H \\cdots \\text{O=} \\quad \\text{or} \\quad \\text{-}N\\text{-}H \\cdots \\text{O=}",
          description: "Hydrogen bond — X-H···Y",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Ionic (Electrostatic) Interactions</h3>
      <p>
        Attractions between fully charged groups: e.g., −NH₃⁺ and −COO⁻ in
        proteins. Strength depends on the dielectric constant of the medium —
        much stronger in the protein interior (low ε) than in water (high ε). pH
        affects ionisation state: at low pH, COO⁻ becomes COOH; at high pH, NH₃⁺
        becomes NH₂.
      </p>

      <EquationBlock
        equation={{
          id: "weak-coulombs",
          latex: "F = \\frac{k \\cdot q_1 \\cdot q_2}{\\epsilon \\cdot r^2}",
          description: "Coulomb's law for ionic interactions",
        }}
      />

      <h3>van der Waals Forces</h3>
      <p>
        Temporary fluctuations in electron distribution create transient dipoles
        that induce dipoles in neighbouring atoms. Very weak individually
        (~0.5–5 kJ/mol), but sum over large contact surfaces. Optimised at the{" "}
        <strong>van der Waals contact distance</strong> (sum of the atoms&apos;
        van der Waals radii). Closer = repulsion (steric clash).
      </p>

      <h3>The Hydrophobic Effect</h3>
      <p>
        Non-polar molecules are poorly soluble in water because water molecules
        form ordered <strong>cages (clathrates)</strong> around them, decreasing
        entropy (ΔS negative). Non-polar groups cluster together to minimise the
        surface area exposed to water, releasing the ordered water molecules and
        increasing entropy. This is the <strong>hydrophobic effect</strong> —
        the major driving force of protein folding.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Comparative Strengths</h3>
      <div className="my-4 rounded-lg border bg-card p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-2">Interaction</th>
              <th className="text-left pb-2">Energy (kJ/mol)</th>
              <th className="text-left pb-2">Example</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr>
              <td className="py-1">Covalent bond</td>
              <td>~350–500</td>
              <td>C-C, C-N</td>
            </tr>
            <tr>
              <td className="py-1">Ionic (protein interior)</td>
              <td>~5–30</td>
              <td>−NH₃⁺···−OOC</td>
            </tr>
            <tr>
              <td className="py-1">Hydrogen bond</td>
              <td>~5–30</td>
              <td>OH···O</td>
            </tr>
            <tr>
              <td className="py-1">van der Waals</td>
              <td>~0.5–5</td>
              <td>Any close atoms</td>
            </tr>
            <tr>
              <td className="py-1">Hydrophobic effect</td>
              <td>~2–10 / CH₂</td>
              <td>Non-polar clustering</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "weak-worked-1",
            question:
              "Explain why ice floats on water, and identify which weak interaction is responsible.",
            hints: [
              "What happens to the volume of water when it freezes?",
              "How does hydrogen bonding change in ice compared to liquid water?",
              "Does the density increase or decrease when water freezes?",
            ],
            solution:
              "Ice floats because it is less dense than liquid water. When water freezes, hydrogen bonds form a regular, open crystalline lattice (hexagonal). Each water molecule forms 4 H-bonds in ice (tetrahedral arrangement), creating more space between molecules than in liquid water. In liquid water, H-bonds are constantly breaking and reforming, allowing tighter packing.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "H-bonds: 5–30 kJ/mol, directional (N-H···O, O-H···O)",
          "Ionic: 5–30 kJ/mol (strongest non-covalent)",
          "van der Waals: 0.5–5 kJ/mol, additive",
          "Hydrophobic effect: entropy-driven clustering",
          "Water: 4 H-bonds per molecule, tetrahedral",
          "Ice is less dense than water (H-bond lattice)",
          "Covalent &gt;&gt; non-covalent (400 vs 1–30 kJ/mol)",
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
      id: "weak-q1",
      type: "multiple-choice",
      prompt:
        "What is the strongest non-covalent interaction in biological systems?",
      answer: "Ionic (electrostatic) interactions",
      difficulty: "recall",
      options: [
        "Hydrogen bonds",
        "Ionic (electrostatic) interactions",
        "van der Waals forces",
        "Hydrophobic effect",
      ],
    },
    {
      id: "weak-q2",
      type: "multiple-choice",
      prompt: "How many hydrogen bonds can a single water molecule form?",
      answer: "4 (2 donors, 2 acceptors)",
      difficulty: "recall",
      options: ["2", "3", "4", "6"],
    },
    {
      id: "weak-q3",
      type: "multiple-choice",
      prompt: "What drives the hydrophobic effect?",
      answer: "Entropy increase from water released around non-polar surfaces",
      difficulty: "recall",
      options: [
        "Attraction between non-polar molecules",
        "Entropy increase from water released around non-polar surfaces",
        "Covalent bond formation",
        "Hydrogen bonding between non-polar molecules",
      ],
    },
    {
      id: "weak-q4",
      type: "multiple-choice",
      prompt: "How many hydrogen bonds form between G and C in DNA?",
      answer: "3",
      difficulty: "apply",
      options: ["1", "2", "3", "4"],
    },
    {
      id: "weak-q5",
      type: "multiple-choice",
      prompt: "Ice floats on water because:",
      answer:
        "H-bonds form a regular lattice with more space between molecules",
      difficulty: "apply",
      options: [
        "Ice is colder and therefore lighter",
        "H-bonds form a regular lattice with more space between molecules",
        "Air is trapped in ice crystals",
        "The hydrophobic effect pushes ice upward",
      ],
      imatYear: 2023,
    },
    {
      id: "weak-q6",
      type: "explain-why",
      prompt:
        "Explain why a protein's hydrophobic core is crucial for its stability.",
      answer:
        "The hydrophobic core minimises exposure of non-polar side chains to water. When the protein folds, non-polar R groups cluster in the interior, releasing ordered water molecules and increasing entropy. The core also provides van der Waals contacts that pack tightly, contributing to stability. Disruption of the core (by mutation of a hydrophobic to a charged residue) often destabilises the protein and causes misfolding.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["proteins", "dna-structure", "enzymes"],
  prerequisites: ["proteins"],
};
