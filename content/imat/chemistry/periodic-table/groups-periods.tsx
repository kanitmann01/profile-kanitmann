import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "groups-periods",
  subject: "chemistry",
  topic: "periodic-table",
  title: "Groups & Periods",
  summary:
    "The periodic table is organised into vertical groups (similar valence e⁻, similar chemistry) and horizontal periods (same number of electron shells).",
  memoryHook:
    "Group 1 = alkali metals (explode in water); Group 7 = halogens (salt-formers); Group 0/18 = noble gases (inert); Groups 3-12 = transition metals (coloured compounds, variable oxidation states).",
  imatTrap:
    "Hydrogen is in Group 1 but is NOT an alkali metal — it's a nonmetal gas. Transition metals don't follow simple group-number = valence-electron rules like main-group elements do.",
  whyItMatters:
    "Group number tells you valence electrons (main group); period number tells you electron shells. This lets you predict ion charges, reactivity, and bonding patterns instantly.",
  explanation: (
    <div>
      <h3>Groups (Vertical Columns)</h3>
      <p>
        Elements in the same group have the same number of valence electrons →
        similar chemical properties.
      </p>
      <ul>
        <li>
          <strong>Group 1 (Alkali Metals):</strong> Li, Na, K, Rb, Cs — one
          valence e⁻, form +1 ions, react vigorously with water, reactivity
          increases down the group.
        </li>
        <li>
          <strong>Group 2 (Alkaline Earth Metals):</strong> Be, Mg, Ca — two
          valence e⁻, form +2 ions, less reactive than Group 1.
        </li>
        <li>
          <strong>Group 7 / 17 (Halogens):</strong> F, Cl, Br, I — seven valence
          e⁻, form −1 ions, diatomic molecules, reactivity decreases down the
          group.
        </li>
        <li>
          <strong>Group 0 / 18 (Noble Gases):</strong> He, Ne, Ar — full outer
          shell, extremely unreactive, monoatomic gases.
        </li>
        <li>
          <strong>Groups 3–12 (Transition Metals):</strong> Fe, Cu, Zn, Ag —
          variable oxidation states, coloured compounds, catalytic properties,
          form complex ions.
        </li>
      </ul>
      <h3>Periods (Horizontal Rows)</h3>
      <p>
        Period number = number of occupied electron shells. Period 3 elements
        (Na → Ar) all have electrons in n=1, 2, 3.
      </p>
      <h3>Metals vs Nonmetals</h3>
      <ul>
        <li>
          <strong>Metals</strong> (left + centre): lose e⁻, form cations, basic
          oxides, good conductors.
        </li>
        <li>
          <strong>Nonmetals</strong> (right): gain/share e⁻, form anions or
          covalent bonds, acidic oxides, poor conductors.
        </li>
        <li>
          <strong>Metalloids</strong> (staircase: B, Si, Ge, As, Sb, Te):
          intermediate properties, semiconductors.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "grp-per-q1",
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
      id: "grp-per-q2",
      type: "multiple-choice",
      prompt:
        "Why does reactivity increase down Group 1 but decrease down Group 17?",
      answer:
        "Group 1 metals lose e⁻ (easier as radius ↑); Group 17 nonmetals gain e⁻ (harder as radius ↑ and attraction ↓).",
      options: [
        "Group 1 metals lose e⁻ (easier as radius ↑); Group 17 nonmetals gain e⁻ (harder as radius ↑ and attraction ↓)",
        "Both groups become more reactive going down",
        "Group 1 gains electrons; Group 17 loses electrons",
        "Atomic mass determines reactivity in both groups",
      ],
      explanation:
        "Alkali metals react by losing their outer e⁻ — easier when it's farther from the nucleus. Halogens react by gaining e⁻ — harder when the nucleus is farther from incoming e⁻.",
      difficulty: "analyze",
    },
    {
      id: "grp-per-q3",
      type: "true-false",
      prompt: "Hydrogen is an alkali metal because it is in Group 1.",
      answer: "False",
      explanation:
        "Hydrogen is placed in Group 1 because it has one valence electron, but it is a nonmetal gas. It does not share the properties of alkali metals (it doesn't form +1 ions in solution readily, isn't metallic, etc.).",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "periodic-trends",
    "electron-configuration",
    "ionic-bonds",
    "covalent-bonds",
  ],
  prerequisites: ["electron-configuration"],
};

export default note;
