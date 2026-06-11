"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "gp-qf-1",
    question: "How many valence electrons do Group 1 elements have?",
    answer: "1",
    context: "Group number = valence electrons for main group elements",
  },
  {
    id: "gp-qf-2",
    question: "Is hydrogen an alkali metal?",
    answer: "No — it is a nonmetal gas",
    context: "H is in Group 1 but is not an alkali metal",
  },
];

export const groupsPeriodsNote: AtomicNote = {
  slug: "groups-periods",
  subject: "chemistry",
  topic: "periodic-table",
  title: "Groups & Periods",
  summary:
    "The periodic table is organised into vertical groups (similar valence e⁻, similar chemistry) and horizontal periods (same number of electron shells).",
  memoryHook:
    "Group 1 = alkali metals (explode in water); Group 7 = halogens (salt-formers); Group 0/18 = noble gases (inert); Groups 3-12 = transition metals (coloured compounds, variable oxidation states). 'Period number = number of electron shells'.",
  imatTrap:
    "Hydrogen is in Group 1 but is NOT an alkali metal — it's a nonmetal gas. Transition metals don't follow simple group-number = valence-electron rules like main-group elements do. Also, Group 0 is also called Group 18 — both are accepted.",
  whyItMatters:
    "Group number tells you valence electrons (main group); period number tells you electron shells. This lets you predict ion charges, reactivity, and bonding patterns instantly. IMAT tests group properties and trend reasoning.",
  imatPatterns: [
    {
      years: [2022, 2024],
      frequency: "high",
      notes: "Group properties — alkali metals vs halogens",
    },
    {
      years: [2023],
      frequency: "medium",
      notes: "Reactivity trends down groups (Group 1 vs Group 7)",
    },
    {
      years: [2021],
      frequency: "medium",
      notes: "Hydrogen — why it's not an alkali metal",
    },
  ],
  equations: [
    {
      id: "group-1-water",
      latex: "2M_{(s)} + 2H_2O_{(l)} \\longrightarrow 2MOH_{(aq)} + H_{2(g)}",
      description:
        "Alkali metal + water → metal hydroxide + hydrogen gas (vigorous reaction)",
      variables: "M = Group 1 metal (Li, Na, K, Rb, Cs)",
    },
    {
      id: "halogen-displacement",
      latex:
        "Cl_{2(aq)} + 2KBr_{(aq)} \\longrightarrow 2KCl_{(aq)} + Br_{2(aq)}",
      description:
        "A more reactive halogen displaces a less reactive one from its salt",
    },
  ],
  workedExamples: [
    {
      id: "gp-we-1",
      question:
        "Predict the charge on a strontium ion (Sr, Group 2, Period 5).",
      hints: [
        "Which group is strontium in?",
        "How many valence electrons does a Group 2 element have?",
        "Does it lose or gain electrons to achieve a noble gas configuration?",
      ],
      solution:
        "Sr is in Group 2 (alkaline earth metal), so it has 2 valence electrons. Metals tend to LOSE electrons to achieve noble gas configuration. Sr loses 2 electrons → Sr²⁺. Even though Sr is in Period 5, the group determines the charge. This is consistent with all Group 2 elements forming +2 ions.",
    },
    {
      id: "gp-we-2",
      question:
        "Explain why sodium reacts more vigorously with water than lithium, but iodine reacts less vigorously with sodium than chlorine.",
      hints: [
        "How does atomic radius change down Group 1? How does this affect electron loss?",
        "How does atomic radius change down Group 7? How does this affect electron gain?",
        "Reactivity relates to the ease of losing (Group 1) or gaining (Group 7) electrons.",
      ],
      solution:
        "Down Group 1: atomic radius increases, outer electron is further from nucleus and more easily lost → reactivity increases. So Na reacts more vigorously than Li. Down Group 7: atomic radius increases, nucleus is further from incoming electron, making it harder to gain an electron → reactivity decreases. So Cl₂ is more reactive than I₂.",
      imatYear: 2022,
    },
  ],
  externalResources: [
    {
      title: "PhET — Periodic Table",
      url: "https://phet.colorado.edu/en/simulations/periodic-table",
      type: "simulation",
      description:
        "Interactive periodic table — explore groups, periods, and trends",
    },
    {
      title: "Khan Academy — Groups & Periods",
      url: "https://www.khanacademy.org/science/chemistry/periodic-table/periodic-table-trends/v/periodic-table-groups-and-periods",
      type: "video",
      description: "Clear explanation of group and period organisation",
    },
    {
      title: "RSC — Visual Elements Periodic Table",
      url: "https://www.rsc.org/periodic-table/",
      type: "article",
      description:
        "Royal Society of Chemistry interactive periodic table with element data",
    },
  ],
  highYieldPoints: [
    "Group = vertical column; same valence electrons → similar chemistry",
    "Period = horizontal row; same number of electron shells",
    "Group 1 (Alkali metals): 1 valence e⁻, +1 ions, reactivity increases ↓ group",
    "Group 7 (Halogens): 7 valence e⁻, -1 ions, diatomic molecules, reactivity decreases ↓ group",
    "Group 0/18 (Noble gases): full outer shell, inert, monoatomic",
    "Groups 3-12 (Transition metals): variable oxidation states, coloured compounds, catalytic",
    "H is in Group 1 but is NOT an alkali metal — it's a nonmetal gas",
  ],
  explanation: (
    <div>
      <h3>Groups (Vertical Columns)</h3>
      <p>
        Elements in the same group have the same number of valence electrons →
        similar chemical properties. The group number (1-2, 13-18 for main
        group) tells you the number of valence electrons.
      </p>

      <div className="grid gap-2">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">
            Group 1 — Alkali Metals
          </h4>
          <p className="text-xs text-muted-foreground">
            Li, Na, K, Rb, Cs, Fr. One valence e⁻, form +1 ions. React
            vigorously with water producing H₂. Reactivity INCREASES down the
            group.
          </p>

          <EquationBlock
            equation={{
              id: "group-1-water",
              latex: "2M + 2H_2O \\longrightarrow 2MOH + H_2",
              description: "Alkali metal + water reaction",
            }}
          />
        </div>

        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">
            Group 2 — Alkaline Earth Metals
          </h4>
          <p className="text-xs text-muted-foreground">
            Be, Mg, Ca, Sr, Ba, Ra. Two valence e⁻, form +2 ions. Less reactive
            than Group 1.
          </p>
        </div>

        <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">
            Group 7 (17) — Halogens
          </h4>
          <p className="text-xs text-muted-foreground">
            F, Cl, Br, I, At. Seven valence e⁻, form -1 ions. Diatomic molecules
            (F₂, Cl₂, Br₂, I₂). Reactivity DECREASES down the group.
          </p>

          <EquationBlock
            equation={{
              id: "halogen-displacement",
              latex: "Cl_2 + 2KBr \\longrightarrow 2KCl + Br_2",
              description:
                "Cl₂ displaces Br⁻ — chlorine is more reactive than bromine",
            }}
          />
        </div>

        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            Group 0 (18) — Noble Gases
          </h4>
          <p className="text-xs text-muted-foreground">
            He, Ne, Ar, Kr, Xe, Rn. Full outer shell (8 e⁻ except He = 2).
            Extremely unreactive, monoatomic gases.
          </p>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">
            Groups 3-12 — Transition Metals
          </h4>
          <p className="text-xs text-muted-foreground">
            Fe, Cu, Zn, Ag, Au, etc. Variable oxidation states, coloured
            compounds, catalytic properties, form complex ions. Do NOT follow
            simple group=valence rule.
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Periods (Horizontal Rows)</h3>
      <p>
        Period number = number of occupied electron shells. Period 3 elements
        (Na → Ar) all have electrons in principal shells n=1, 2, and 3. As you
        move across a period, elements transition from metallic (left) to
        nonmetallic (right).
      </p>

      <h3>Metals vs Nonmetals</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-blue-600">Metals</h4>
          <p className="text-xs text-muted-foreground">Left + Centre</p>
          <ul className="text-xs mt-1 list-disc list-inside">
            <li>Lose e⁻ → cations</li>
            <li>Basic oxides</li>
            <li>Good conductors</li>
          </ul>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-amber-600">Metalloids</h4>
          <p className="text-xs text-muted-foreground">Staircase</p>
          <ul className="text-xs mt-1 list-disc list-inside">
            <li>B, Si, Ge, As, Sb, Te</li>
            <li>Semiconductors</li>
            <li>Intermediate properties</li>
          </ul>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-green-600">Nonmetals</h4>
          <p className="text-xs text-muted-foreground">Right</p>
          <ul className="text-xs mt-1 list-disc list-inside">
            <li>Gain/share e⁻</li>
            <li>Acidic oxides</li>
            <li>Poor conductors</li>
          </ul>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "gp-we-1",
            question:
              "Predict the charge on a strontium ion (Sr, Group 2, Period 5).",
            hints: [
              "Which group is strontium in?",
              "How many valence electrons does a Group 2 element have?",
              "Does it lose or gain electrons to achieve a noble gas configuration?",
            ],
            solution:
              "Sr is in Group 2 (alkaline earth metal), so it has 2 valence electrons. Metals tend to LOSE electrons to achieve noble gas configuration. Sr loses 2 electrons → Sr²⁺. The period number (5) affects electron shell count but not the charge — that's determined by group.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Group = valence electrons (main group)",
          "Period = number of electron shells",
          "Alkali metals: +1, reactivity ↑ down",
          "Halogens: -1, reactivity ↓ down",
          "Noble gases: full outer shell, inert",
          "Transition: coloured, variable oxidation",
          "H is NOT an alkali metal!",
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
      id: "gp-q1",
      type: "multiple-choice",
      prompt:
        "Which group of elements forms diatomic molecules and reacts with metals to produce salts?",
      answer: "Group 17 (Halogens)",
      options: [
        "Group 1 (Alkali metals)",
        "Group 17 (Halogens)",
        "Group 18 (Noble gases)",
        "Group 2 (Alkaline earth metals)",
      ],
      explanation:
        "Halogens (F₂, Cl₂, Br₂, I₂) are diatomic nonmetals that gain one electron to form −1 ions, combining with metals to make salts (e.g. NaCl, KBr).",
      difficulty: "recall",
    },
    {
      id: "gp-q2",
      type: "multiple-choice",
      prompt:
        "Why does reactivity increase down Group 1 but decrease down Group 17?",
      answer:
        "Group 1 metals lose e⁻ (easier as radius ↑); Group 17 nonmetals gain e⁻ (harder as radius ↑).",
      options: [
        "Group 1 metals lose e⁻ (easier as radius ↑); Group 17 nonmetals gain e⁻ (harder as radius ↑)",
        "Both groups become more reactive going down",
        "Group 1 gains electrons; Group 17 loses electrons",
        "Atomic mass determines reactivity in both groups",
      ],
      explanation:
        "Alkali metals react by losing their outer e⁻ — easier when it's farther from the nucleus. Halogens react by gaining e⁻ — harder when the nucleus is farther from incoming e⁻.",
      difficulty: "analyze",
    },
    {
      id: "gp-q3",
      type: "true-false",
      prompt: "Hydrogen is an alkali metal because it is in Group 1.",
      answer: "False",
      explanation:
        "Hydrogen is placed in Group 1 because it has one valence electron, but it is a nonmetal gas. It does not share the properties of alkali metals.",
      difficulty: "apply",
    },
    {
      id: "gp-q4",
      type: "multiple-choice",
      prompt:
        "Which block of elements typically has variable oxidation states?",
      answer: "d-block (transition metals)",
      options: [
        "s-block (Groups 1-2)",
        "d-block (transition metals)",
        "p-block (Groups 13-18)",
        "f-block (lanthanides/actinides)",
      ],
      explanation:
        "Transition metals (d-block) have partially filled d orbitals that can lose different numbers of electrons, giving variable oxidation states (e.g. Fe²⁺, Fe³⁺).",
      difficulty: "apply",
    },
    {
      id: "gp-q5",
      type: "multiple-choice",
      prompt: "How many valence electrons does an element in Group 16 have?",
      answer: "6",
      options: ["2", "4", "6", "16"],
      explanation:
        "For Groups 13-18, valence electrons = group number − 10. Group 16 − 10 = 6 valence electrons (e.g. oxygen, sulfur).",
      difficulty: "recall",
    },
    {
      id: "gp-q6",
      type: "explain-why",
      prompt: "Explain why Group 0 (noble gases) are chemically inert.",
      answer:
        "Noble gases have a full outer electron shell (8 electrons, except He with 2). This electron configuration is extremely stable — there is no tendency to gain, lose, or share electrons. Full valence shells mean no empty orbitals for bonding and no unpaired electrons. This makes them monoatomic and chemically unreactive under standard conditions.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "periodic-trends",
    "electron-configuration",
    "ionic-bonds",
    "covalent-bonds",
    "atomic-models",
  ],
  prerequisites: ["electron-configuration"],
};
