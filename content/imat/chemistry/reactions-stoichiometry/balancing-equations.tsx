import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "balancing-equations",
  subject: "chemistry",
  topic: "reactions-stoichiometry",
  title: "Balancing Chemical Equations",
  summary:
    "Chemical equations must obey the law of conservation of mass — the same number of each type of atom on both sides, achieved by adjusting stoichiometric coefficients.",
  memoryHook:
    "'Count, Coefficient, Check' — count atoms on each side, add coefficients to balance, check all atoms match. Never change subscripts (that changes the substance!). Start with the most complex molecule.",
  imatTrap:
    "NEVER change subscripts to balance — H₂O → H₃ is wrong because it changes water into a different substance. Only change coefficients: 2H₂O means 2 molecules of water, not a different compound.",
  whyItMatters:
    "Balanced equations are the foundation of all stoichiometric calculations. IMAT tests your ability to balance quickly and use coefficients for mole ratios in yield calculations.",
  explanation: (
    <div>
      <p>
        The <strong>law of conservation of mass</strong> states that matter is
        neither created nor destroyed in a chemical reaction. Therefore, the
        number of atoms of each element must be equal on both sides.
      </p>
      <h3>Method</h3>
      <ol>
        <li>Write the unbalanced equation with correct formulae.</li>
        <li>Count atoms of each element on both sides.</li>
        <li>
          Add <strong>coefficients</strong> (whole numbers in front of formulae)
          to balance.
        </li>
        <li>Check all atoms balance and coefficients are in lowest ratio.</li>
      </ol>
      <h3>Example</h3>
      <p>Unbalanced: Fe + O₂ → Fe₂O₃</p>
      <ul>
        <li>Fe: 1 left, 2 right → put 2 before Fe</li>
        <li>O: 2 left, 3 right → put 3/2 before O₂, then multiply all by 2</li>
        <li>
          Balanced: <strong>4Fe + 3O₂ → 2Fe₂O₃</strong>
        </li>
      </ul>
      <h3>State Symbols</h3>
      <ul>
        <li>
          (s) = solid, (l) = liquid, (g) = gas, (aq) = aqueous (dissolved in
          water)
        </li>
      </ul>
      <h3>Types of Reaction</h3>
      <ul>
        <li>
          <strong>Combustion:</strong> fuel + O₂ → CO₂ + H₂O
        </li>
        <li>
          <strong>Neutralisation:</strong> acid + base → salt + water
        </li>
        <li>
          <strong>Decomposition:</strong> AB → A + B
        </li>
        <li>
          <strong>Displacement:</strong> A + BC → AC + B
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "bal-eq-q1",
      type: "multiple-choice",
      prompt:
        "What are the correct coefficients to balance: __C₃H₈ + __O₂ → __CO₂ + __H₂O?",
      answer: "1, 5, 3, 4",
      options: ["1, 5, 3, 4", "2, 7, 6, 8", "1, 3, 3, 4", "2, 5, 3, 4"],
      explanation:
        "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O. C: 3=3 ✓, H: 8=8 ✓, O: 10=6+4=10 ✓.",
      difficulty: "apply",
    },
    {
      id: "bal-eq-q2",
      type: "true-false",
      prompt: "To balance H₂ + O₂ → H₂O, you can change H₂O to H₂O₂.",
      answer: "False",
      explanation:
        "Changing subscripts changes the chemical identity of the substance. You must only adjust coefficients: 2H₂ + O₂ → 2H₂O.",
      difficulty: "apply",
    },
    {
      id: "bal-eq-q3",
      type: "fill-blank",
      prompt:
        "In the balanced equation: __Al + __HCl → __AlCl₃ + __H₂, the coefficient of HCl is ______.",
      answer: "6",
      explanation: "2Al + 6HCl → 2AlCl₃ + 3H₂. Al: 2=2 ✓, Cl: 6=6 ✓, H: 6=6 ✓.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["mole-calculations", "acids-bases-salts", "oxidation-reduction"],
  prerequisites: ["pure-substances"],
};

export default note;
