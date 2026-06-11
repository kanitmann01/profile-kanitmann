import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "ionic-bonds",
  subject: "chemistry",
  topic: "chemical-bonding",
  title: "Ionic Bonds",
  summary:
    "Electrostatic attraction between oppositely charged ions formed by electron transfer from a metal to a nonmetal.",
  memoryHook:
    "'Ions are like a breakup — one atom gives away electrons (becomes +), the other takes them (becomes −), and the opposite charges keep them stuck together.' Metal → loses e⁻ → cation (+). Nonmetal → gains e⁻ → anion (−).",
  imatTrap:
    "Ionic compounds conduct electricity only when molten or dissolved — NOT as solids (ions are locked in the lattice). Also, not all ionic compounds are soluble — check solubility rules.",
  whyItMatters:
    "Ionic bonding explains the properties of salts, electrolytes in biology, and electrochemistry. IMAT tests lattice energy trends and conductivity conditions.",
  explanation: (
    <div>
      <p>
        An <strong>ionic bond</strong> forms when one or more electrons are
        transferred from a metal (low IE) to a nonmetal (high EA), creating
        oppositely charged ions that attract electrostatically.
      </p>
      <h3>Formation Example: NaCl</h3>
      <ul>
        <li>Na → Na⁺ + e⁻ (loses 1 e⁻, achieves Ne config)</li>
        <li>Cl + e⁻ → Cl⁻ (gains 1 e⁻, achieves Ar config)</li>
        <li>Na⁺ + Cl⁻ → NaCl (electrostatic attraction)</li>
      </ul>
      <h3>Lattice Energy</h3>
      <p>
        The energy released when one mole of an ionic compound forms from its
        gaseous ions. Depends on:
      </p>
      <ul>
        <li>
          <strong>Charge:</strong> higher charges → stronger attraction → higher
          lattice energy (MgO &gt; NaCl).
        </li>
        <li>
          <strong>Ionic radius:</strong> smaller ions → closer together →
          stronger attraction (LiF &gt; KBr).
        </li>
      </ul>
      <h3>Properties of Ionic Compounds</h3>
      <ul>
        <li>High melting/boiling points (strong lattice)</li>
        <li>Brittle (layers shift → like charges repel → shatter)</li>
        <li>
          Conduct electricity when <strong>molten or aqueous</strong> (ions free
          to move), NOT as solids
        </li>
        <li>Often soluble in water (polar solvent stabilises ions)</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "ionic-q1",
      type: "multiple-choice",
      prompt: "Which ionic compound has the highest lattice energy?",
      answer: "MgO",
      options: ["NaCl", "KBr", "MgO", "LiF"],
      explanation:
        "MgO has 2+/2− charges (vs 1+/1− for NaCl, KBr, LiF). Higher charges and small ionic radii give MgO the highest lattice energy.",
      difficulty: "apply",
    },
    {
      id: "ionic-q2",
      type: "true-false",
      prompt:
        "Solid sodium chloride conducts electricity because its ions are held in a fixed lattice.",
      answer: "False — solid NaCl does NOT conduct electricity.",
      explanation:
        "In the solid lattice, ions are locked in position and cannot move. NaCl only conducts when molten or dissolved, where ions are free to move and carry charge.",
      difficulty: "apply",
    },
    {
      id: "ionic-q3",
      type: "fill-blank",
      prompt:
        "When magnesium reacts with oxygen, magnesium forms the ion ______ (charge and symbol).",
      answer: "Mg²⁺",
      explanation:
        "Mg (Group 2) loses its 2 valence electrons to achieve a noble gas configuration, forming Mg²⁺.",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "covalent-bonds",
    "electron-configuration",
    "groups-periods",
    "solubility",
  ],
  prerequisites: ["electron-configuration", "groups-periods"],
};

export default note;
