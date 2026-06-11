"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ec-qf-1",
    question: "Which fills first: 4s or 3d?",
    answer: "4s",
    context: "Aufbau principle",
  },
  {
    id: "ec-qf-2",
    question: "Which empties first when forming ions: 4s or 3d?",
    answer: "4s",
    context: "Ion configurations",
  },
];

export const electronConfigurationNote: AtomicNote = {
  slug: "electron-configuration",
  subject: "chemistry",
  topic: "atomic-structure",
  title: "Electron Configuration",
  summary:
    "The arrangement of electrons in atomic orbitals, governed by the Aufbau principle, Pauli exclusion principle, and Hund's rule.",
  memoryHook:
    "Aufbau = 'building up' (fill lowest energy first: 1s → 2s → 2p → 3s → 3p → 4s → 3d). Pauli = 'no twins' (max 2 e⁻ per orbital, opposite spins). Hund's = 'bus seat rule' (fill each orbital singly before pairing). Cr and Cu are the exceptions: Cr = [Ar] 3d⁵ 4s¹, Cu = [Ar] 3d¹⁰ 4s¹.",
  imatTrap:
    "4s fills BEFORE 3d, but 4s empties BEFORE 3d when forming ions. Cr = [Ar] 3d⁵ 4s¹ and Cu = [Ar] 3d¹⁰ 4s¹ — exceptions due to half-filled/filled d-subshell stability. Students lose marks by writing Fe²⁺ as [Ar] 3d⁴ 4s² — it's [Ar] 3d⁶.",
  whyItMatters:
    "Electron configuration determines an element's chemical behaviour, valence, and position on the periodic table. IMAT loves asking about exceptions and ion configurations — especially for d-block elements.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Cr and Cu electron configuration exceptions",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Order of filling vs order of removal for ions",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Hund's rule and orbital box diagrams",
    },
  ],
  equations: [
    {
      id: "max-electrons",
      latex: "\\text{Max electrons in shell } n = 2n^2",
      description: "Maximum number of electrons in a given principal shell",
      variables:
        "n = principal quantum number (n = 1, 2, 3…). Example: n=2 → max 8 e⁻",
    },
    {
      id: "orbital-occupancy",
      latex: "\\text{Orbital occupancy: } s^2 p^6 d^{10} f^{14}",
      description: "Maximum electrons per subshell type",
    },
  ],
  workedExamples: [
    {
      id: "ec-we-1",
      question:
        "Write the full electron configuration of Fe (Z=26) and Fe²⁺. Explain why the 4s electrons are removed first.",
      hints: [
        "Start with the order: 1s → 2s → 2p → 3s → 3p → 4s → 3d",
        "Fe has 26 electrons total. How many fit in each subshell?",
        "For the ion, compare the relative energies of 4s and 3d AFTER filling.",
      ],
      solution:
        "Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ (or [Ar] 4s² 3d⁶). For Fe²⁺, the 4s electrons are removed first: Fe²⁺ = [Ar] 3d⁶. Although 4s fills before 3d (lower energy when empty), once 3d orbitals are occupied, the 4s is at higher energy and empties first. Common trap: writing Fe²⁺ as [Ar] 3d⁴ 4s².",
    },
    {
      id: "ec-we-2",
      question:
        "Explain why chromium (Z=24) has configuration [Ar] 3d⁵ 4s¹ instead of [Ar] 3d⁴ 4s².",
      hints: [
        "How many d-orbitals are there?",
        "Half-filled subshells have extra stability due to exchange energy.",
        "Consider what happens if one 4s electron 'promotes' to the 3d subshell.",
      ],
      solution:
        "In a half-filled d⁵ configuration, all five d-orbitals contain one electron each with parallel spins. This maximises exchange energy and reduces electron-electron repulsion. The energy gain from achieving half-filled d-subshell exceeds the small energy cost of promoting one electron from 4s to 3d.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Build an Atom",
      url: "https://phet.colorado.edu/en/simulations/build-an-atom",
      type: "simulation",
      description:
        "Interactive atom builder — add protons, neutrons, and electrons to see config",
    },
    {
      title: "Khan Academy — Electron Configurations",
      url: "https://www.khanacademy.org/science/chemistry/electronic-structure-of-atoms/electron-configurations-jay/v/electron-configurations",
      type: "video",
      description:
        "Clear walkthrough of writing electron configurations with examples",
    },
    {
      title: "ChemGuide — Electronic Structures",
      url: "https://www.chemguide.co.uk/atoms/properties/atomorbs.html",
      type: "article",
      description:
        "Detailed explanation of orbitals, order of filling, and exceptions",
    },
  ],
  highYieldPoints: [
    "Aufbau: fill lowest energy orbitals first (1s→2s→2p→3s→3p→4s→3d→4p)",
    "Pauli: max 2 e⁻ per orbital, opposite spins",
    "Hund: fill degenerate orbitals singly first, then pair up",
    "Cr exception: [Ar] 3d⁵ 4s¹ (not 3d⁴ 4s²) — half-filled d subshell stability",
    "Cu exception: [Ar] 3d¹⁰ 4s¹ (not 3d⁹ 4s²) — filled d subshell stability",
    "Ion formation: 4s electrons removed BEFORE 3d electrons",
    "Fe²⁺ = [Ar] 3d⁶; Fe³⁺ = [Ar] 3d⁵",
  ],
  explanation: (
    <div>
      <h3>Three Governing Rules</h3>
      <ul>
        <li>
          <strong>Aufbau Principle:</strong> Electrons fill the lowest energy
          orbital first. Order: 1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d
          → 5p → 6s → 4f → 5d…
        </li>
        <li>
          <strong>Pauli Exclusion Principle:</strong> A maximum of 2 electrons
          per orbital, with opposite spins (↑↓).
        </li>
        <li>
          <strong>Hund&apos;s Rule:</strong> In degenerate orbitals (e.g. the
          three 2p orbitals), electrons fill singly with parallel spins before
          pairing.
        </li>
      </ul>

      <EquationBlock
        equation={{
          id: "max-electrons",
          latex: "\\text{Max electrons in shell } n = 2n^2",
          description: "Maximum electrons per principal quantum shell",
        }}
      />

      <EquationBlock
        equation={{
          id: "orbital-occupancy",
          latex: "\\text{Orbital occupancy: } s^2 p^6 d^{10} f^{14}",
          description: "Maximum electrons per subshell type",
        }}
      />

      <h3>Orbital Capacities</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="text-sm font-semibold">
            s-subshell: 1 orbital → max 2 e⁻
          </p>
          <p className="text-xs text-muted-foreground">
            Contains all elements in Groups 1-2
          </p>
        </div>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="text-sm font-semibold">
            p-subshell: 3 orbitals → max 6 e⁻
          </p>
          <p className="text-xs text-muted-foreground">
            Contains Groups 13-18 (main group elements)
          </p>
        </div>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="text-sm font-semibold">
            d-subshell: 5 orbitals → max 10 e⁻
          </p>
          <p className="text-xs text-muted-foreground">
            Contains transition metals (Groups 3-12)
          </p>
        </div>
        <div className="rounded-lg border border-sky-500/30 bg-sky-500/5 p-3">
          <p className="text-sm font-semibold">
            f-subshell: 7 orbitals → max 14 e⁻
          </p>
          <p className="text-xs text-muted-foreground">
            Contains lanthanides and actinides
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Exceptions — The Half-Filled & Filled d-shell Bonus</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">Chromium (Cr, Z=24)</h4>
          <p className="text-sm text-muted-foreground">
            Expected: [Ar] 3d⁴ 4s²
            <br />
            Actual: <strong>[Ar] 3d⁵ 4s¹</strong>
            <br />
            Reason: half-filled d⁵ is extra stable (all 5 d-orbitals
            single-occupied)
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm">Copper (Cu, Z=29)</h4>
          <p className="text-sm text-muted-foreground">
            Expected: [Ar] 3d⁹ 4s²
            <br />
            Actual: <strong>[Ar] 3d¹⁰ 4s¹</strong>
            <br />
            Reason: fully-filled d¹⁰ is extra stable
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Ion Configurations</h3>
      <p>
        When transition metals form cations,{" "}
        <strong>4s electrons are removed first</strong>
        before 3d. Although 4s fills first (lower energy when empty), once
        occupied, the 4s orbital has higher energy than 3d and empties first:
      </p>
      <ul>
        <li>
          Fe (Z=26): [Ar] 4s² 3d⁶ → <strong>Fe²⁺ = [Ar] 3d⁶</strong>
        </li>
        <li>
          Fe (Z=26): [Ar] 4s² 3d⁶ → <strong>Fe³⁺ = [Ar] 3d⁵</strong>
        </li>
        <li>
          Cu (Z=29): [Ar] 3d¹⁰ 4s¹ → <strong>Cu⁺ = [Ar] 3d¹⁰</strong>
        </li>
      </ul>

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "ec-we-1",
            question:
              "Write the full electron configuration of Fe (Z=26) and Fe²⁺. Explain why the 4s electrons are removed first.",
            hints: [
              "Start with the order: 1s → 2s → 2p → 3s → 3p → 4s → 3d",
              "Fe has 26 electrons total. How many fit in each subshell?",
              "For the ion, compare the relative energies of 4s and 3d AFTER filling.",
            ],
            solution:
              "Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ (or [Ar] 4s² 3d⁶). For Fe²⁺, the 4s electrons are removed first: Fe²⁺ = [Ar] 3d⁶. Although 4s fills before 3d (lower energy when empty), once 3d orbitals are occupied, the 4s is at higher energy and empties first. Common trap: writing Fe²⁺ as [Ar] 3d⁴ 4s².",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Aufbau: fill lowest energy first",
          "Pauli: max 2 e⁻ per orbital, opposite spins",
          "Hund: fill singly before pairing",
          "Cr: [Ar] 3d⁵ 4s¹ (half-filled bonus)",
          "Cu: [Ar] 3d¹⁰ 4s¹ (filled d bonus)",
          "Ions: 4s empties BEFORE 3d",
          "Fe²⁺ = [Ar] 3d⁶, NOT 3d⁴ 4s²",
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
      id: "ec-q1",
      type: "multiple-choice",
      prompt: "What is the electron configuration of chromium (Cr, Z=24)?",
      answer: "[Ar] 3d⁵ 4s¹",
      options: ["[Ar] 3d⁴ 4s²", "[Ar] 3d⁵ 4s¹", "[Ar] 3d⁶", "[Ar] 4s² 3d⁴"],
      explanation:
        "Chromium is an exception: one 4s electron promotes to 3d to achieve a half-filled d-subshell (3d⁵), which is more stable.",
      difficulty: "recall",
    },
    {
      id: "ec-q2",
      type: "fill-blank",
      prompt:
        "According to ______ rule, electrons fill degenerate orbitals singly with parallel spins before pairing.",
      answer: "Hund's",
      explanation:
        "Hund's rule maximises total spin in a subshell by placing one electron in each orbital before any pairing occurs.",
      difficulty: "recall",
    },
    {
      id: "ec-q3",
      type: "multiple-choice",
      prompt: "When iron (Fe) forms Fe²⁺, which electrons are removed first?",
      answer: "The 4s electrons",
      options: [
        "The 3d electrons",
        "The 4s electrons",
        "Both 4s and 3d simultaneously",
        "The 4p electrons",
      ],
      explanation:
        "Although 4s fills before 3d, when forming cations the 4s electrons are removed first because they are at higher energy once 3d starts filling.",
      difficulty: "apply",
    },
    {
      id: "ec-q4",
      type: "multiple-choice",
      prompt: "What is the maximum number of electrons in an f-subshell?",
      answer: "14",
      options: ["2", "6", "10", "14"],
      explanation:
        "f-orbitals: 7 orbitals × 2 e⁻ each = 14 e⁻. s=2, p=6, d=10, f=14.",
      difficulty: "recall",
    },
    {
      id: "ec-q5",
      type: "multiple-choice",
      prompt: "What is the electron configuration of Cu⁺ (Z=29)?",
      answer: "[Ar] 3d¹⁰",
      options: ["[Ar] 3d⁹ 4s¹", "[Ar] 3d¹⁰", "[Ar] 3d⁸ 4s²", "[Ar] 3d¹⁰ 4s¹"],
      explanation:
        "Cu has configuration [Ar] 3d¹⁰ 4s¹. Cu⁺ removes the 4s electron first: [Ar] 3d¹⁰, a fully filled d-subshell.",
      difficulty: "apply",
    },
    {
      id: "ec-q6",
      type: "explain-why",
      prompt:
        "Why does the electron configuration of Cu ([Ar] 3d¹⁰ 4s¹) differ from the expected [Ar] 3d⁹ 4s²?",
      answer:
        "A fully filled 3d¹⁰ subshell provides extra stability (exchange energy, symmetry) that outweighs the energy cost of promoting one 4s electron to 3d.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "atomic-models",
    "periodic-trends",
    "groups-periods",
    "ionic-bonds",
  ],
  prerequisites: ["atomic-models"],
};
