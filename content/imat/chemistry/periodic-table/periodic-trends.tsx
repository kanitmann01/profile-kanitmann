"use client";

import type { AtomicNote } from "@/data/imat/types";
import { PeriodicTable } from "@/components/imat/interactive/periodic-table";

const note: AtomicNote = {
  slug: "periodic-trends",
  subject: "chemistry",
  topic: "periodic-table",
  title: "Periodic Trends",
  summary:
    "Systematic variations in atomic radius, ionization energy, electronegativity, and electron affinity across periods and down groups.",
  memoryHook:
    "Across a period (L→R): radius ↓, IE ↑, EN ↑, EA ↑ (atoms get hungrier). Down a group: radius ↑, IE ↓, EN ↓ (outer e⁻ farther from nucleus). 'FRANC' — Fluorine is the most electronegative element.",
  imatTrap:
    "Noble gases have NO electronegativity (they don't form bonds in standard conditions) and very positive electron affinity values. Don't say F has the highest EA — Cl actually has a higher EA because F's small size causes e⁻-e⁻ repulsion.",
  whyItMatters:
    "Periodic trends let you predict reactivity, bond type, and chemical behaviour without memorising every element. IMAT tests trend reasoning, not just recall.",
  explanation: (
    <div>
      <p>
        Explore the interactive periodic table below to see how properties vary
        across elements:
      </p>
      <PeriodicTable />
      <h3>Atomic Radius</h3>
      <ul>
        <li>
          <strong>Decreases across a period</strong> — increasing nuclear charge
          pulls electrons closer (same shielding).
        </li>
        <li>
          <strong>Increases down a group</strong> — additional electron shells
          outweigh increased nuclear charge.
        </li>
      </ul>
      <h3>Ionization Energy (IE)</h3>
      <p>
        Energy required to remove one mole of electrons from one mole of gaseous
        atoms.
      </p>
      <ul>
        <li>
          <strong>Increases across a period</strong> — stronger nuclear
          attraction, smaller radius.
        </li>
        <li>
          <strong>Decreases down a group</strong> — outer electrons are farther
          from nucleus, more shielded.
        </li>
      </ul>
      <h3>Electronegativity (EN)</h3>
      <p>Ability of an atom to attract bonding electrons in a covalent bond.</p>
      <ul>
        <li>
          <strong>Increases across a period</strong> (F = 4.0, highest).
        </li>
        <li>
          <strong>Decreases down a group</strong>.
        </li>
      </ul>
      <h3>Electron Affinity (EA)</h3>
      <p>Energy change when an electron is added to a gaseous atom.</p>
      <ul>
        <li>
          Generally <strong>more exothermic across a period</strong> (halogens
          have highest EA).
        </li>
        <li>
          Cl has a higher EA than F due to F&apos;s small size causing
          electron-electron repulsion.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "per-trend-q1",
      type: "multiple-choice",
      prompt: "Which element has the highest first ionization energy?",
      answer: "Helium (He)",
      options: ["Fluorine (F)", "Helium (He)", "Francium (Fr)", "Oxygen (O)"],
      explanation:
        "Helium has the highest IE because its two electrons are very close to the nucleus with no shielding. Across period 1, He is at the far right with the smallest radius.",
      difficulty: "apply",
    },
    {
      id: "per-trend-q2",
      type: "multiple-choice",
      prompt:
        "Why does chlorine have a higher electron affinity than fluorine?",
      answer:
        "Fluorine's small 2p orbital causes significant electron-electron repulsion, making adding an electron less favourable.",
      options: [
        "Chlorine has more protons",
        "Fluorine's small 2p orbital causes significant electron-electron repulsion, making adding an electron less favourable",
        "Chlorine is a gas while fluorine is a liquid",
        "Fluorine has a larger atomic radius",
      ],
      explanation:
        "F's tiny 2p subshell causes repulsion when adding an extra e⁻. Cl's larger 3p subshell accommodates the extra e⁻ more easily, releasing more energy.",
      difficulty: "analyze",
    },
    {
      id: "per-trend-q3",
      type: "fill-blank",
      prompt:
        "Atomic radius ______ as you move from left to right across a period.",
      answer: "decreases",
      explanation:
        "Increasing nuclear charge (more protons) pulls the electron cloud closer without additional shielding from new shells.",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "groups-periods",
    "electron-configuration",
    "ionic-bonds",
    "covalent-bonds",
  ],
  prerequisites: ["electron-configuration"],
};

export default note;
