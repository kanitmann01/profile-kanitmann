"use client";

import type { AtomicNote } from "@/data/imat/types";
import { MolecularGeometry } from "@/components/imat/interactive/molecular-geometry";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "cov-qf-1",
    question: "What is the bond angle in a tetrahedral molecule?",
    answer: "109.5°",
    context: "VSEPR theory — 4 bonding pairs, 0 lone pairs",
  },
  {
    id: "cov-qf-2",
    question: "Is CO₂ polar or nonpolar?",
    answer: "Nonpolar",
    hint: "Think about the shape",
    context: "Linear geometry → dipoles cancel",
  },
];

export const covalentBondsNote: AtomicNote = {
  slug: "covalent-bonds",
  subject: "chemistry",
  topic: "chemical-bonding",
  title: "Covalent Bonds & Molecular Geometry",
  summary:
    "Bonds formed by sharing electron pairs between nonmetals — single, double, or triple — with geometry determined by VSEPR theory.",
  memoryHook:
    "Covalent = 'co-operate' (share, don't steal). VSEPR: electron pairs repel → spread out as far as possible. 2 pairs = linear (180°), 3 = trigonal planar (120°), 4 = tetrahedral (109.5°). Lone pairs repel MORE than bonding pairs → angles shrink.",
  imatTrap:
    "Lone pairs repel MORE than bonding pairs → bond angles shrink. H₂O is bent (104.5°), not tetrahedral (109.5°), because 2 lone pairs push the O-H bonds closer. Also, polar bonds ≠ polar molecule (CO₂ has polar bonds but is nonpolar overall due to symmetry). NH₃ is trigonal pyramidal (107°), NOT trigonal planar.",
  whyItMatters:
    "Molecular shape determines polarity, which determines intermolecular forces, solubility, boiling point, and biological function. Drug-receptor binding depends on molecular shape — a 1° bend difference can mean the difference between a drug and a toxin.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "VSEPR — predict shape given electron pairs",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "Polar vs nonpolar molecules — CO₂ always tested",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Bond types: sigma vs pi bonds",
    },
  ],
  equations: [
    {
      id: "vsepr-count",
      latex:
        "\\text{Electron domains} = \\text{bonding pairs} + \\text{lone pairs}",
      description:
        "Total electron domains around the central atom determine geometry",
    },
    {
      id: "bond-polarity",
      latex: "\\Delta EN = EN_{higher} - EN_{lower}",
      description: "Difference in electronegativity determines bond polarity",
      variables:
        "ΔEN < 0.4 = nonpolar covalent, 0.4-1.7 = polar covalent, > 1.7 = ionic",
    },
  ],
  workedExamples: [
    {
      id: "cov-we-1",
      question:
        "Use VSEPR theory to predict the molecular geometry and bond angle of ammonia (NH₃).",
      hints: [
        "How many valence electrons does N have? How many does each H contribute?",
        "How many bonding pairs (N-H bonds) and how many lone pairs on N?",
        "Compare to the tetrahedral arrangement — what happens when one position is a lone pair?",
      ],
      solution:
        "N has 5 val e⁻, each H contributes 1 → 8 e⁻ total = 4 electron pairs. 3 bonding pairs (N-H) and 1 lone pair. The 4 pairs are tetrahedrally arranged. Because lone pairs repel more than bonding pairs, the H-N-H angle is compressed from 109.5° to 107°. Molecular geometry (atom positions only) = trigonal pyramidal.",
      imatYear: 2022,
    },
    {
      id: "cov-we-2",
      question:
        "Explain why CO₂ is nonpolar even though it contains polar C=O bonds.",
      hints: [
        "What is the molecular geometry of CO₂?",
        "How many C=O bonds are there, and in what direction do they point?",
        "If dipoles are equal and opposite, what happens to the net dipole?",
      ],
      solution:
        "CO₂ is linear: O=C=O. Each C=O bond is polar (EN difference = 0.89), creating a bond dipole pointing from C (2.55) to O (3.44). However, the two dipoles are equal in magnitude and point in exactly opposite directions (180° apart) along the linear axis. They cancel perfectly, giving no net dipole moment. CO₂ is therefore nonpolar despite having polar bonds — a classic IMAT trap.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Molecular Shapes",
      url: "https://phet.colorado.edu/en/simulations/molecular-shapes",
      type: "simulation",
      description:
        "Interactive VSEPR simulator — add atoms and lone pairs to see shapes and angles",
    },
    {
      title: "Khan Academy — VSEPR Theory",
      url: "https://www.khanacademy.org/science/ap-chemistry/chemical-bonds-ap/vsepr-theory-ap/v/vsepr-theory-introduction",
      type: "video",
      description: "Clear explanation of VSEPR with 3D visualizations",
    },
    {
      title: "IMAT Buddy — Bonding Practice Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style bonding questions including VSEPR and polarity",
    },
  ],
  highYieldPoints: [
    "Covalent bond = shared pair of electrons between nonmetals",
    "Single bond = 1σ, double bond = 1σ + 1π, triple bond = 1σ + 2π",
    "VSEPR: electron pairs repel → maximise separation",
    "2 domains = linear (180°), 3 = trig planar (120°), 4 = tetrahedral (109.5°)",
    "Lone pairs repel MORE than bonding pairs → angles are smaller",
    "H₂O = bent (104.5°), NH₃ = trigonal pyramidal (107°)",
    "Polar bonds ≠ polar molecule — symmetry can cancel dipoles",
  ],
  explanation: (
    <div>
      <p>
        A <strong>covalent bond</strong> is a shared pair of electrons between
        two nonmetal atoms. Both atoms achieve a stable electron configuration
        without full electron transfer.
      </p>

      <h3>Bond Types</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border p-3">
          <p className="font-semibold text-sm">
            Single bond: 1 shared pair (σ bond)
          </p>
          <p className="text-xs text-muted-foreground">
            e.g. H−H, C−C. Head-on overlap of orbitals.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-semibold text-sm">
            Double bond: 2 shared pairs (1σ + 1π)
          </p>
          <p className="text-xs text-muted-foreground">
            e.g. O=O, C=O. One sigma + one pi (sideways) overlap.
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="font-semibold text-sm">
            Triple bond: 3 shared pairs (1σ + 2π)
          </p>
          <p className="text-xs text-muted-foreground">
            e.g. N≡N. One sigma + two pi bonds — shortest and strongest.
          </p>
        </div>
      </div>

      <h3>Polar vs Nonpolar Covalent Bonds</h3>

      <EquationBlock
        equation={{
          id: "bond-polarity",
          latex: "\\Delta EN = EN_{higher} - EN_{lower}",
          description: "Electronegativity difference determines bond type",
        }}
      />

      <div className="grid grid-cols-3 gap-3 mt-3">
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">ΔEN &lt; 0.4</h4>
          <p className="text-xs text-muted-foreground">Nonpolar covalent</p>
          <p className="text-xs">H₂, Cl₂, CH₄</p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">ΔEN 0.4–1.7</h4>
          <p className="text-xs text-muted-foreground">Polar covalent</p>
          <p className="text-xs">H₂O, HCl, NH₃</p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">ΔEN &gt; 1.7</h4>
          <p className="text-xs text-muted-foreground">Ionic</p>
          <p className="text-xs">NaCl, MgO</p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>VSEPR Theory & Molecular Geometry</h3>
      <p>
        Electron pairs around the central atom repel each other and arrange to
        minimise repulsion. Total electron domains = bonding pairs + lone pairs.
      </p>

      <EquationBlock
        equation={{
          id: "vsepr-count",
          latex:
            "\\text{Electron domains} = \\text{bonding pairs} + \\text{lone pairs}",
          description: "Total electron domains determine molecular shape",
        }}
      />

      <p className="text-sm text-muted-foreground mt-3 mb-3">
        Explore the shapes interactively below:
      </p>
      <MolecularGeometry />

      <div className="grid gap-2 mt-4">
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="font-semibold text-sm">
            2 domains, 0 lone pairs → <strong>Linear</strong> (180°)
          </p>
          <p className="text-xs text-muted-foreground">e.g. CO₂, BeCl₂</p>
        </div>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="font-semibold text-sm">
            3 domains, 0 lone pairs → <strong>Trigonal planar</strong> (120°)
          </p>
          <p className="text-xs text-muted-foreground">e.g. BF₃, SO₃</p>
        </div>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="font-semibold text-sm">
            4 domains, 0 lone pairs → <strong>Tetrahedral</strong> (109.5°)
          </p>
          <p className="text-xs text-muted-foreground">e.g. CH₄, CCl₄</p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="font-semibold text-sm">
            4 domains, 1 lone pair → <strong>Trigonal pyramidal</strong> (107°)
          </p>
          <p className="text-xs text-muted-foreground">
            e.g. NH₃ — lone pair repulsion compresses angle
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <p className="font-semibold text-sm">
            4 domains, 2 lone pairs → <strong>Bent</strong> (104.5°)
          </p>
          <p className="text-xs text-muted-foreground">
            e.g. H₂O — 2 lone pairs compress even more
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Polar Molecules — Why Shape Matters</h3>
      <p>
        A molecule is polar if it has a <strong>net dipole moment</strong> — the
        vector sum of all bond dipoles. Even with polar bonds, symmetry can
        cancel the dipoles:
      </p>
      <ul>
        <li>
          <strong>CO₂:</strong> linear with 2 polar C=O bonds — dipoles cancel →
          nonpolar
        </li>
        <li>
          <strong>H₂O:</strong> bent with 2 polar O-H bonds — dipoles add →
          polar
        </li>
        <li>
          <strong>CCl₄:</strong> tetrahedral with 4 polar C-Cl bonds — dipoles
          cancel → nonpolar
        </li>
        <li>
          <strong>CHCl₃:</strong> tetrahedral with asymmetrical substitution →
          polar
        </li>
      </ul>

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "cov-we-1",
            question:
              "Use VSEPR theory to predict the molecular geometry and bond angle of ammonia (NH₃).",
            hints: [
              "How many valence electrons does N have? How many does each H contribute?",
              "How many bonding pairs (N-H bonds) and how many lone pairs on N?",
              "Compare to the tetrahedral arrangement — what happens when one position is a lone pair?",
            ],
            solution:
              "N has 5 val e⁻, each H contributes 1 → 8 e⁻ total = 4 electron pairs. 3 bonding pairs (N-H) and 1 lone pair. The 4 pairs are tetrahedrally arranged. Because lone pairs repel more than bonding pairs, the H-N-H angle is compressed from 109.5° to 107°. Molecular geometry (atom positions only) = trigonal pyramidal.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Covalent = shared e⁻ pairs (nonmetals)",
          "Single (1σ), double (1σ+1π), triple (1σ+2π)",
          "VSEPR: electron pairs repel, define shape",
          "2=linear, 3=trig planar, 4=tetrahedral",
          "Lone pairs compress bond angles",
          "Polar bonds ≠ polar molecule",
          "CO₂ nonpolar (linear, dipoles cancel)",
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
    </div>
  ),
  questions: [
    {
      id: "covalent-q1",
      type: "multiple-choice",
      prompt: "What is the molecular geometry of water (H₂O)?",
      answer: "Bent (104.5°)",
      options: [
        "Linear (180°)",
        "Tetrahedral (109.5°)",
        "Bent (104.5°)",
        "Trigonal planar (120°)",
      ],
      explanation:
        "Oxygen has 2 bonding pairs and 2 lone pairs. The 4 electron pairs are tetrahedrally arranged, but the molecular shape (atom positions only) is bent, with the angle compressed to 104.5° by lone pair repulsion.",
      difficulty: "recall",
    },
    {
      id: "covalent-q2",
      type: "multiple-choice",
      prompt: "Why is CO₂ a nonpolar molecule despite having polar C=O bonds?",
      answer:
        "The linear geometry means the two C=O dipoles are equal and opposite, cancelling out.",
      options: [
        "C=O bonds are actually nonpolar",
        "The linear geometry means the two C=O dipoles are equal and opposite, cancelling out",
        "Carbon is a metal",
        "CO₂ has no bonds",
      ],
      explanation:
        "CO₂ is linear (O=C=O). Each C=O bond is polar, but the bond dipoles point in opposite directions and cancel, giving a net dipole moment of zero.",
      difficulty: "analyze",
    },
    {
      id: "covalent-q3",
      type: "fill-blank",
      prompt: "A double bond consists of one σ bond and one ______ bond.",
      answer: "π (pi)",
      explanation:
        "A double bond has one sigma (σ) bond (head-on overlap) and one pi (π) bond (sideways overlap of p orbitals). Triple bonds have 1σ + 2π.",
      difficulty: "recall",
    },
    {
      id: "covalent-q4",
      type: "multiple-choice",
      prompt:
        "What is the bond angle in a molecule with trigonal pyramidal geometry?",
      answer: "~107°",
      options: ["180°", "120°", "109.5°", "~107°"],
      explanation:
        "Trigonal pyramidal (e.g. NH₃) has 4 electron domains (3 bonding + 1 lone pair). The lone pair compresses the angle from 109.5° to ~107°.",
      difficulty: "apply",
    },
    {
      id: "covalent-q5",
      type: "multiple-choice",
      prompt: "Which molecule has a net dipole moment?",
      answer: "H₂O (bent geometry → dipoles do not cancel)",
      options: [
        "CO₂",
        "CCl₄",
        "H₂O (bent geometry → dipoles do not cancel)",
        "BF₃",
      ],
      explanation:
        "H₂O is bent (104.5°) — the two O-H dipoles add vectorially to give a net dipole. CO₂, CCl₄, and BF₃ are symmetric with no net dipole.",
      difficulty: "apply",
    },
    {
      id: "covalent-q6",
      type: "explain-why",
      prompt:
        "Explain why CCl₄ is nonpolar even though C-Cl bonds are polar (ΔEN ≈ 0.5).",
      answer:
        "CCl₄ has tetrahedral geometry with four polar C-Cl bonds. The bond dipoles are arranged symmetrically around the central carbon and point outward in three dimensions. Their vector sum is zero — they cancel perfectly. The molecule is nonpolar despite polar bonds.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "ionic-bonds",
    "periodic-trends",
    "pure-substances",
    "hydrocarbons",
    "functional-groups",
  ],
  prerequisites: ["electron-configuration", "periodic-trends"],
};
