import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "oxidation-reduction",
  subject: "chemistry",
  topic: "redox",
  title: "Oxidation & Reduction",
  summary:
    "Redox reactions involve transfer of electrons — oxidation is loss of electrons (increase in oxidation state), reduction is gain of electrons (decrease in oxidation state).",
  memoryHook:
    "'OIL RIG' — Oxidation Is Loss (of e⁻), Reduction Is Gain (of e⁻). Or 'LEO says GER' — Lose Electrons Oxidation, Gain Electrons Reduction.",
  imatTrap:
    "The oxidizing agent is the substance that gets REDUCED (it takes electrons from something else). The reducing agent gets OXIDIZED. Students consistently mix these up — the agent does the opposite of its name.",
  whyItMatters:
    "Redox underpins combustion, corrosion, cellular respiration, photosynthesis, and electrochemistry. IMAT tests oxidation state assignment, identifying agents, and balancing half-reactions.",
  explanation: (
    <div>
      <h3>Oxidation States (Rules)</h3>
      <ul>
        <li>Uncombined element = 0 (Fe, O₂, H₂ all have oxidation state 0)</li>
        <li>Monatomic ion = its charge (Na⁺ = +1, Cl⁻ = −1, Fe³⁺ = +3)</li>
        <li>
          Oxygen = −2 in most compounds (except peroxides: −1, and OF₂: +2)
        </li>
        <li>Hydrogen = +1 with nonmetals, −1 with metals (NaH: H is −1)</li>
        <li>Sum of oxidation states = overall charge of species</li>
      </ul>
      <h3>Oxidation & Reduction</h3>
      <ul>
        <li>
          <strong>Oxidation:</strong> loss of e⁻ → oxidation state increases.
          e.g. Fe²⁺ → Fe³⁺ + e⁻
        </li>
        <li>
          <strong>Reduction:</strong> gain of e⁻ → oxidation state decreases.
          e.g. Cu²⁺ + 2e⁻ → Cu
        </li>
      </ul>
      <h3>Agents</h3>
      <ul>
        <li>
          <strong>Oxidizing agent:</strong> the substance reduced (it causes
          oxidation of something else by accepting e⁻). e.g. KMnO₄, O₂, Cl₂.
        </li>
        <li>
          <strong>Reducing agent:</strong> the substance oxidized (it causes
          reduction by donating e⁻). e.g. Na, H₂, C.
        </li>
      </ul>
      <h3>Half-Reactions</h3>
      <p>Split any redox into oxidation and reduction halves:</p>
      <p>Zn + Cu²⁺ → Zn²⁺ + Cu</p>
      <ul>
        <li>Oxidation: Zn → Zn²⁺ + 2e⁻</li>
        <li>Reduction: Cu²⁺ + 2e⁻ → Cu</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "redox-q1",
      type: "multiple-choice",
      prompt:
        "In the reaction 2Na + Cl₂ → 2NaCl, which substance is the oxidizing agent?",
      answer: "Cl₂",
      options: ["Na", "Cl₂", "NaCl", "Neither"],
      explanation:
        "Cl₂ is reduced (0 → −1), gaining electrons from Na. The oxidizing agent is the substance that gets reduced — Cl₂ causes Na to be oxidized.",
      difficulty: "apply",
    },
    {
      id: "redox-q2",
      type: "multiple-choice",
      prompt: "What is the oxidation state of sulfur in H₂SO₄?",
      answer: "+6",
      options: ["+4", "+6", "−2", "+2"],
      explanation:
        "H = +1 (×2 = +2), O = −2 (×4 = −8). Sum must = 0: +2 + S + (−8) = 0 → S = +6.",
      difficulty: "apply",
    },
    {
      id: "redox-q3",
      type: "fill-blank",
      prompt: "In the acronym OIL RIG, 'OIL' stands for Oxidation Is ______.",
      answer: "Loss (of electrons)",
      explanation:
        "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons). A simple mnemonic for remembering which process involves losing vs gaining electrons.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["electrochemistry", "mole-calculations", "balancing-equations"],
  prerequisites: ["balancing-equations", "mole-calculations"],
};

export default note;
