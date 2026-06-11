"use client";

import type { AtomicNote } from "@/data/imat/types";
import { PeriodicTable } from "@/components/imat/interactive/periodic-table";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "pt-qf-1",
    question: "Which element has the highest electronegativity?",
    answer: "Fluorine (F, 4.0)",
    context: "Top right of the periodic table (excluding noble gases)",
  },
  {
    id: "pt-qf-2",
    question: "Does atomic radius increase or decrease across a period?",
    answer: "Decrease — more protons pull e⁻ closer",
    context: "Same shielding, stronger nuclear charge",
  },
];

export const periodicTrendsNote: AtomicNote = {
  slug: "periodic-trends",
  subject: "chemistry",
  topic: "periodic-table",
  title: "Periodic Trends",
  summary:
    "Systematic variations in atomic radius, ionization energy, electronegativity, and electron affinity across periods and down groups — driven by nuclear charge, shielding, and distance from nucleus.",
  memoryHook:
    "Across a period (L→R): radius ↓, IE ↑, EN ↑, EA ↑ (atoms get hungrier). Down a group: radius ↑, IE ↓, EN ↓ (outer e⁻ farther from nucleus). 'FRANC' — Fluorine is the most electronegative element, but Chlorine has the highest electron affinity.",
  imatTrap:
    "Noble gases have NO electronegativity (they don't form bonds in standard conditions) and very positive electron affinity values. Don't say F has the highest EA — Cl actually has a higher EA because F's small size causes e⁻-e⁻ repulsion. Also, first IE drops from Group 2 to Group 13 (p-orbital starts) and from Group 15 to Group 16 (pairing starts) — these exceptions are classic IMAT traps.",
  whyItMatters:
    "Periodic trends let you predict reactivity, bond type (ionic vs covalent), and ionisation behaviour without memorising every element. IMAT loves trend reasoning — especially explaining WHY a trend occurs and identifying exceptions.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Electronegativity trend — F highest, noble gases have none",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "IE exceptions: Group 2→13 drop, Group 15→16 drop",
    },
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "EA: Cl > F due to F's small size",
    },
  ],
  equations: [
    {
      id: "coulombs-law",
      latex: "F = \\frac{1}{4\\pi\\epsilon_0}\\cdot\\frac{q_1 q_2}{r^2}",
      description:
        "Coulomb's law — the electrostatic force between nucleus and electron drives all periodic trends",
      variables:
        "q₁, q₂ = charges, r = distance, ε₀ = permittivity of free space",
    },
    {
      id: "ionization-energy-def",
      latex: "X_{(g)} \\longrightarrow X^+_{(g)} + e^- \\quad \\Delta H = IE_1",
      description:
        "First ionisation energy — energy required to remove one mole of electrons from one mole of gaseous atoms",
    },
    {
      id: "electron-affinity-def",
      latex: "X_{(g)} + e^- \\longrightarrow X^-_{(g)} \\quad \\Delta H = EA",
      description:
        "Electron affinity — energy change when one mole of electrons is added to one mole of gaseous atoms",
    },
  ],
  workedExamples: [
    {
      id: "pt-we-1",
      question:
        "Explain why the first ionisation energy of oxygen (Z=8) is lower than that of nitrogen (Z=7), even though oxygen has more protons.",
      hints: [
        "Write the electron configurations: N = 1s² 2s² 2p³, O = 1s² 2s² 2p⁴",
        "Consider Hund's rule — how are the 2p orbitals occupied in each?",
        "In oxygen, the 4th 2p electron must pair with an existing electron — what effect does this have?",
      ],
      solution:
        "N: 1s² 2s² 2p³ (each 2p orbital has one e⁻, all parallel spins). O: 1s² 2s² 2p⁴ (one 2p orbital now has 2 paired e⁻). The paired electrons in oxygen experience electron-electron repulsion, making one of them easier to remove. So IE₁(O) < IE₁(N) despite the higher nuclear charge. This is a well-known exception to the general trend.",
      imatYear: 2022,
    },
    {
      id: "pt-we-2",
      question:
        "Arrange the following in order of increasing atomic radius: Mg, Cl, Na, Ar. Explain your reasoning.",
      hints: [
        "Which period are all these elements in?",
        "How does nuclear charge change from Na → Mg → Cl → Ar?",
        "Does shielding change across a period?",
      ],
      solution:
        "All four are Period 3 elements: Na (Z=11), Mg (12), Cl (17), Ar (18). Across a period, nuclear charge increases while shielding remains similar, so the electron cloud is pulled inward. Order of increasing radius: Ar < Cl < Mg < Na. Ar has the smallest radius (highest Z_eff), Na has the largest (lowest Z_eff).",
    },
  ],
  externalResources: [
    {
      title: "PhET — Periodic Table",
      url: "https://phet.colorado.edu/en/simulations/periodic-table",
      type: "simulation",
      description:
        "Interactive periodic table — explore groups, periods, and trends visually",
    },
    {
      title: "Khan Academy — Periodic Trends",
      url: "https://www.khanacademy.org/science/chemistry/periodic-table/periodic-table-trends/v/periodic-table-trends",
      type: "video",
      description:
        "Comprehensive walkthrough of all four major trends with clear visuals",
    },
    {
      title: "ChemGuide — Periodic Trends Explained",
      url: "https://www.chemguide.co.uk/atoms/properties/atradius.html",
      type: "article",
      description:
        "Detailed explanations of atomic radius, IE, EN, and EA with graphs",
    },
  ],
  highYieldPoints: [
    "Atomic radius: decreases across period (↑Z_eff), increases down group (↑shells)",
    "Ionization energy: increases across period (↑Z_eff), decreases down group (↑shielding)",
    "Electronegativity: increases across period, decreases down group (F = 4.0 highest)",
    "Noble gases: NO electronegativity, very positive EA",
    "EA exception: Cl > F despite F being more EN (F's small 2p causes repulsion)",
    "IE exception: Group 2→13 (p-orbital starts), Group 15→16 (pairing starts)",
    "Coulomb's law (F ∝ q₁q₂/r²) drives ALL periodic trends",
  ],
  explanation: (
    <div>
      <p>
        Periodic trends are predictable variations in atomic properties across
        the periodic table. They arise from three factors:{" "}
        <strong>nuclear charge</strong> (Z),
        <strong>shielding</strong> by inner electrons, and{" "}
        <strong>distance</strong> from the nucleus. All three are quantified by
        Coulomb&apos;s law:
      </p>

      <EquationBlock
        equation={{
          id: "coulombs-law",
          latex: "F = \\frac{1}{4\\pi\\epsilon_0}\\cdot\\frac{q_1 q_2}{r^2}",
          description:
            "Coulomb's law — electrostatic force between nucleus and electron",
        }}
      />

      <p className="text-sm text-muted-foreground mb-3">
        Explore the trends interactively — click elements to see how properties
        change:
      </p>
      <PeriodicTable />

      <h3>Atomic Radius</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Across a Period ↓</h4>
          <p className="text-xs text-muted-foreground">
            Increasing nuclear charge pulls electrons closer — same shielding,
            stronger pull.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold">Down a Group ↑</h4>
          <p className="text-xs text-muted-foreground">
            New electron shells added, outweighing increased nuclear charge.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Ionization Energy (IE)</h3>
      <p>
        The energy required to remove one mole of electrons from one mole of
        gaseous atoms. First IE increases across a period and decreases down a
        group.
      </p>

      <EquationBlock
        equation={{
          id: "ionization-energy-def",
          latex:
            "X_{(g)} \\longrightarrow X^+_{(g)} + e^- \\quad \\Delta H = IE_1",
          description: "First ionisation energy",
        }}
      />

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 mt-3">
        <h4 className="text-sm font-semibold">
          Key Exception: IE Drops at Groups 2→13 and 15→16
        </h4>
        <p className="text-xs text-muted-foreground">
          Group 2 (e.g. Be: 2s²) → Group 13 (B: 2s²2p¹): The new p-electron is
          at a higher energy level, easier to remove. Group 15 (e.g. N: 2p³,
          half-filled) → Group 16 (O: 2p⁴): The paired electron experiences
          repulsion, easier to remove.
        </p>
      </div>

      <h3>Electronegativity (EN)</h3>
      <p>
        The ability of an atom to attract bonding electrons in a covalent bond.
        Increases across a period, decreases down a group.{" "}
        <strong>Fluorine (4.0)</strong>
        is the most electronegative element. Noble gases have no EN — they
        don&apos;t form bonds.
      </p>

      <h3>Electron Affinity (EA)</h3>
      <p>
        Energy change when an electron is added to a gaseous atom. Generally
        becomes more exothermic across a period (halogens have highest EA).
      </p>

      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
        <h4 className="text-sm font-semibold text-red-600">
          IMAT Trap: Cl &gt; F in EA
        </h4>
        <p className="text-xs text-muted-foreground">
          Although F has higher EN,{" "}
          <strong>Cl has a higher electron affinity</strong>. F&apos;s 2p
          orbitals are so small that adding an extra electron causes significant
          electron-electron repulsion, releasing less energy. Cl&apos;s larger
          3p orbitals accommodate the extra electron more easily.
        </p>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "pt-we-1",
            question:
              "Explain why the first ionisation energy of oxygen (Z=8) is lower than that of nitrogen (Z=7), even though oxygen has more protons.",
            hints: [
              "Write the electron configurations: N = 1s² 2s² 2p³, O = 1s² 2s² 2p⁴",
              "Consider Hund's rule — how are the 2p orbitals occupied in each?",
              "In oxygen, the 4th 2p electron must pair with an existing electron — what effect does this have?",
            ],
            solution:
              "N: 1s² 2s² 2p³ (each 2p orbital has one e⁻, all parallel spins). O: 1s² 2s² 2p⁴ (one 2p orbital now has 2 paired e⁻). The paired electrons in oxygen experience electron-electron repulsion, making one of them easier to remove. So IE₁(O) < IE₁(N) despite the higher nuclear charge. This is a well-known exception to the general trend.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Radius: ↓ across period, ↑ down group",
          "IE: ↑ across period, ↓ down group",
          "EN: ↑ across period, ↓ down group",
          "F has highest EN, Cl has highest EA",
          "IE drops at G2→13 and G15→16",
          "Noble gases: no EN, positive EA",
          "Coulomb's law drives all trends",
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
      id: "pt-q1",
      type: "multiple-choice",
      prompt: "Which element has the highest first ionisation energy?",
      answer: "Helium (He)",
      options: ["Fluorine (F)", "Helium (He)", "Francium (Fr)", "Oxygen (O)"],
      explanation:
        "Helium has the highest IE because its two electrons are very close to the nucleus (n=1) with no shielding electrons. Across period 1, He is at the far right with the smallest radius.",
      difficulty: "apply",
    },
    {
      id: "pt-q2",
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
        "F's tiny 2p subshell causes repulsion when adding an extra e⁻. Cl's larger 3p subshell accommodates the extra e⁻ more easily, releasing more energy (more exothermic EA).",
      difficulty: "analyze",
    },
    {
      id: "pt-q3",
      type: "fill-blank",
      prompt:
        "Atomic radius ______ as you move from left to right across a period.",
      answer: "decreases",
      explanation:
        "Increasing nuclear charge (more protons) pulls the electron cloud inward without additional shielding from new shells.",
      difficulty: "recall",
    },
    {
      id: "pt-q4",
      type: "multiple-choice",
      prompt:
        "Which factor is primarily responsible for the decrease in ionisation energy down Group 1?",
      answer: "Increased atomic radius and shielding",
      options: [
        "Decreased nuclear charge",
        "Increased atomic radius and shielding",
        "More electrons in outer shell",
        "Increased electronegativity",
      ],
      explanation:
        "Down Group 1, atomic radius increases and shielding by inner electrons increases. The outer electron is farther from the nucleus and experiences less effective nuclear charge, making it easier to remove.",
      difficulty: "apply",
    },
    {
      id: "pt-q5",
      type: "true-false",
      prompt:
        "Noble gases have the highest electronegativity values on the periodic table.",
      answer: "False",
      explanation:
        "Noble gases have full outer shells and do not typically form bonds. They have NO electronegativity values. Fluorine (4.0) has the highest electronegativity.",
      difficulty: "recall",
    },
    {
      id: "pt-q6",
      type: "explain-why",
      prompt:
        "Explain why the first IE drops from beryllium (Group 2) to boron (Group 13), even though boron has more protons.",
      answer:
        "Be has configuration 1s² 2s² — its outermost electrons are in the 2s subshell. B has 1s² 2s² 2p¹ — its outermost electron is in the higher-energy 2p subshell. The 2p electron is slightly easier to remove because it is at a higher energy level and is more shielded from the nucleus than the 2s electrons. The drop reflects the energy difference between s and p subshells.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "groups-periods",
    "electron-configuration",
    "ionic-bonds",
    "covalent-bonds",
    "atomic-models",
  ],
  prerequisites: ["electron-configuration", "groups-periods"],
};
