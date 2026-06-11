import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "solubility",
  subject: "chemistry",
  topic: "solutions",
  title: "Solubility",
  summary:
    "The maximum amount of solute that dissolves in a given amount of solvent at a specific temperature. Governed by solubility rules, temperature, pressure, and 'like dissolves like'.",
  memoryHook:
    "'NAG SAG' — all Nitrates, Acetates, Group 1 salts, and Sulfates (except Pb, Ba, Ca, Ag) are soluble. 'Like dissolves like' — polar dissolves polar, nonpolar dissolves nonpolar.",
  imatTrap:
    "Gas solubility DECREASES with increasing temperature (opposite of most solids). This is why warm soda goes flat faster. Also, increasing pressure INCREASES gas solubility (Henry's law) — this is why soda is bottled under pressure.",
  whyItMatters:
    "Solubility rules predict precipitation reactions (used in qualitative analysis). Understanding solubility is critical for drug design, kidney stone formation, and biological membrane transport.",
  explanation: (
    <div>
      <h3>Solubility Rules (Key Ones for IMAT)</h3>
      <ul>
        <li>
          <strong>Always soluble:</strong> Group 1 salts, NH₄⁺ salts, all
          nitrates (NO₃⁻), all acetates (CH₃COO⁻).
        </li>
        <li>
          <strong>Mostly soluble:</strong> Chlorides, bromides, iodides (EXCEPT
          Ag⁺, Pb²⁺, Hg₂²⁺).
        </li>
        <li>
          <strong>Mostly soluble:</strong> Sulfates (EXCEPT Ba²⁺, Pb²⁺, Ca²⁺,
          Sr²⁺).
        </li>
        <li>
          <strong>Mostly insoluble:</strong> Carbonates, phosphates, hydroxides
          (EXCEPT Group 1, NH₄⁺, and Ba(OH)₂ is slightly soluble).
        </li>
      </ul>
      <h3>Saturated, Unsaturated, Supersaturated</h3>
      <ul>
        <li>
          <strong>Saturated:</strong> maximum solute dissolved at that
          temperature — equilibrium between dissolved and undissolved.
        </li>
        <li>
          <strong>Unsaturated:</strong> more solute can still dissolve.
        </li>
        <li>
          <strong>Supersaturated:</strong> contains more solute than normally
          possible — unstable, crystallises on disturbance.
        </li>
      </ul>
      <h3>Factors Affecting Solubility</h3>
      <ul>
        <li>
          <strong>Temperature:</strong> Most solids become more soluble with ↑T.
          Gases become LESS soluble with ↑T.
        </li>
        <li>
          <strong>Pressure:</strong> Affects gas solubility — Henry&apos;s law:
          S = kH × P (solubility increases with pressure).
        </li>
        <li>
          <strong>&quot;Like dissolves like&quot;:</strong> Polar solvents
          dissolve polar/ionic solutes. Nonpolar solvents dissolve nonpolar
          solutes.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "sol-q1",
      type: "multiple-choice",
      prompt: "Which of the following compounds is insoluble in water?",
      answer: "BaSO₄",
      options: ["NaCl", "KNO₃", "BaSO₄", "NH₄Cl"],
      explanation:
        "Most sulfates are soluble, but BaSO₄ is a key exception — barium sulfate is insoluble. NaCl, KNO₃, and NH₄Cl are all soluble.",
      difficulty: "recall",
    },
    {
      id: "sol-q2",
      type: "multiple-choice",
      prompt: "Why does warm soda lose its fizz faster than cold soda?",
      answer:
        "Gas solubility decreases with increasing temperature — CO₂ escapes more readily from warm liquid.",
      options: [
        "The bottle expands in warmth",
        "Gas solubility decreases with increasing temperature — CO₂ escapes more readily from warm liquid",
        "Sugar dissolves faster in warm liquid",
        "Water evaporates faster",
      ],
      explanation:
        "CO₂ is dissolved under pressure. As temperature rises, gas solubility decreases, so CO₂ escapes the solution more readily — the soda goes flat.",
      difficulty: "apply",
    },
    {
      id: "sol-q3",
      type: "fill-blank",
      prompt:
        "According to Henry's law, the solubility of a gas in a liquid is directly proportional to the ______ of that gas above the liquid.",
      answer: "pressure",
      explanation:
        "Henry's law: S = kH × P. Increasing the partial pressure of a gas above a liquid forces more gas molecules into solution.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["concentration", "mixtures-separation", "ionic-bonds"],
  prerequisites: ["concentration", "ionic-bonds"],
};

export default note;
