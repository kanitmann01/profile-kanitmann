import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "electron-configuration",
  subject: "chemistry",
  topic: "atomic-structure",
  title: "Electron Configuration",
  summary:
    "The arrangement of electrons in atomic orbitals, governed by the Aufbau principle, Pauli exclusion principle, and Hund's rule.",
  memoryHook:
    "Aufbau = 'building up' (fill lowest energy first: 1s → 2s → 2p → 3s → 3p → 4s → 3d). Pauli = 'no twins' (max 2 e⁻ per orbital, opposite spins). Hund's = 'bus seat rule' (fill each orbital singly before pairing).",
  imatTrap:
    "4s fills BEFORE 3d, but 4s empties BEFORE 3d when forming ions. Cr = [Ar] 3d⁵ 4s¹ and Cu = [Ar] 3d¹⁰ 4s¹ — exceptions due to half-filled/filled d-subshell stability.",
  whyItMatters:
    "Electron configuration determines an element's chemical behaviour, valence, and position on the periodic table. IMAT loves asking about exceptions and ion configurations.",
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
      <h3>Orbital Capacities</h3>
      <ul>
        <li>s: 1 orbital → max 2 e⁻</li>
        <li>p: 3 orbitals → max 6 e⁻</li>
        <li>d: 5 orbitals → max 10 e⁻</li>
        <li>f: 7 orbitals → max 14 e⁻</li>
      </ul>
      <h3>Exceptions</h3>
      <p>
        Chromium (Cr, Z=24): [Ar] <strong>3d⁵ 4s¹</strong> (not 3d⁴ 4s²) —
        half-filled d-subshell is extra stable.
      </p>
      <p>
        Copper (Cu, Z=29): [Ar] <strong>3d¹⁰ 4s¹</strong> (not 3d⁹ 4s²) —
        fully-filled d-subshell is extra stable.
      </p>
      <h3>Ion Configurations</h3>
      <p>
        When transition metals form cations,{" "}
        <strong>4s electrons are removed first</strong> before 3d. Fe²⁺ = [Ar]
        3d⁶ (not 3d⁴ 4s²).
      </p>
    </div>
  ),
  questions: [
    {
      id: "elec-config-q1",
      type: "multiple-choice",
      prompt: "What is the electron configuration of chromium (Cr, Z=24)?",
      answer: "[Ar] 3d⁵ 4s¹",
      options: ["[Ar] 3d⁴ 4s²", "[Ar] 3d⁵ 4s¹", "[Ar] 3d⁶", "[Ar] 4s² 3d⁴"],
      explanation:
        "Chromium is an exception: one 4s electron promotes to 3d to achieve a half-filled d-subshell (3d⁵), which is more stable.",
      difficulty: "recall",
    },
    {
      id: "elec-config-q2",
      type: "fill-blank",
      prompt:
        "According to ______ rule, electrons fill degenerate orbitals singly with parallel spins before pairing.",
      answer: "Hund's",
      explanation:
        "Hund's rule maximises total spin in a subshell by placing one electron in each orbital before any pairing occurs — analogous to strangers sitting in separate bus seats.",
      difficulty: "recall",
    },
    {
      id: "elec-config-q3",
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
  ],
  crosslinks: [
    "atomic-models",
    "periodic-trends",
    "groups-periods",
    "ionic-bonds",
  ],
  prerequisites: ["atomic-models"],
};

export default note;
