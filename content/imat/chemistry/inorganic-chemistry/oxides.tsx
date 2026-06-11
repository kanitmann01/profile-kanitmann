import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "oxides",
  subject: "chemistry",
  topic: "inorganic-chemistry",
  title: "Oxides",
  summary:
    "Compounds of an element with oxygen. Metal oxides are generally basic; nonmetal oxides are generally acidic; some (Al₂O₃, ZnO) are amphoteric.",
  memoryHook:
    "Metal + O₂ → basic oxide (dissolves in acid). Nonmetal + O₂ → acidic oxide (dissolves in base). Amphoteric = 'ambidextrous' (reacts with both acid AND base). Remember: 'MONA' — Metal Oxides Neutralise Acid.",
  imatTrap:
    "Not all metal oxides are soluble in water — CaO reacts with water to form Ca(OH)₂, but Fe₂O₃ does not dissolve. 'Basic' means it reacts with acid, not necessarily that it dissolves in water to form an alkaline solution.",
  whyItMatters:
    "Oxide behaviour explains acid rain (SO₂ + H₂O → H₂SO₃), antacids (MgO neutralises stomach acid), and extraction of metals from ores. IMAT tests oxide classification and reactions.",
  explanation: (
    <div>
      <h3>Basic Oxides (Metal Oxides)</h3>
      <p>
        Formed when metals react with oxygen. They react with acids to form salt
        + water (neutralisation).
      </p>
      <ul>
        <li>Na₂O + H₂O → 2NaOH (dissolves to form alkali)</li>
        <li>CaO + 2HCl → CaCl₂ + H₂O (reacts with acid)</li>
        <li>CuO + H₂SO₄ → CuSO₄ + H₂O</li>
      </ul>
      <h3>Acidic Oxides (Nonmetal Oxides)</h3>
      <p>
        Formed when nonmetals react with oxygen. They react with bases to form
        salt + water.
      </p>
      <ul>
        <li>CO₂ + H₂O → H₂CO₃ (carbonic acid)</li>
        <li>SO₂ + 2NaOH → Na₂SO₃ + H₂O</li>
        <li>SO₃ + H₂O → H₂SO₄ (sulphuric acid)</li>
      </ul>
      <h3>Amphoteric Oxides</h3>
      <p>React with BOTH acids and bases:</p>
      <ul>
        <li>Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O (acts as base)</li>
        <li>Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O (acts as acid)</li>
        <li>ZnO behaves similarly.</li>
      </ul>
      <h3>Neutral Oxides</h3>
      <p>
        Some oxides are neither acidic nor basic: CO, N₂O, NO — they do not
        react with acids or bases.
      </p>
    </div>
  ),
  questions: [
    {
      id: "oxides-q1",
      type: "multiple-choice",
      prompt: "Which oxide is amphoteric?",
      answer: "Al₂O₃",
      options: ["Na₂O", "CO₂", "Al₂O₃", "SO₃"],
      explanation:
        "Al₂O₃ reacts with both acids (acting as a base) and bases (acting as an acid), making it amphoteric. Na₂O is basic; CO₂ and SO₃ are acidic.",
      difficulty: "recall",
    },
    {
      id: "oxides-q2",
      type: "multiple-choice",
      prompt:
        "Sulphur dioxide (SO₂) dissolves in rainwater. What does this produce?",
      answer:
        "Sulphurous acid (H₂SO₃) — an acidic solution contributing to acid rain.",
      options: [
        "Sulphuric acid (H₂SO₄)",
        "Sulphurous acid (H₂SO₃) — an acidic solution contributing to acid rain",
        "A basic solution",
        "A neutral solution",
      ],
      explanation:
        "SO₂ + H₂O → H₂SO₃ (sulphurous acid). This is a major cause of acid rain. Note: SO₃ + H₂O → H₂SO₄ (sulphuric acid) — a different oxide.",
      difficulty: "apply",
    },
    {
      id: "oxides-q3",
      type: "true-false",
      prompt: "All metal oxides dissolve in water to form alkaline solutions.",
      answer: "False",
      explanation:
        "Only some metal oxides (e.g. Na₂O, CaO) dissolve in water. Others like CuO and Fe₂O₃ are insoluble but still react with acids — they are basic without being soluble.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["acids-bases-salts", "ionic-bonds", "groups-periods"],
  prerequisites: ["acids-bases-salts"],
};

export default note;
