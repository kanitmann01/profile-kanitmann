"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "redox-qf-1",
    question: "What is the oxidation state of oxygen in H₂O₂?",
    answer: "-1 (peroxide exception)",
    context: "Oxygen is usually −2, but peroxides are −1",
  },
  {
    id: "redox-qf-2",
    question: "In OIL RIG, what does the RIG stand for?",
    answer: "Reduction Is Gain (of electrons)",
    context: "OIL RIG — Oxidation Is Loss, Reduction Is Gain",
  },
];

export const oxidationReductionNote: AtomicNote = {
  slug: "oxidation-reduction",
  subject: "chemistry",
  topic: "redox",
  title: "Oxidation & Reduction",
  summary:
    "Redox reactions involve transfer of electrons — oxidation is loss of electrons (increase in oxidation state), reduction is gain of electrons (decrease in oxidation state). The two always occur together.",
  memoryHook:
    "'OIL RIG' — Oxidation Is Loss (of e⁻), Reduction Is Gain (of e⁻). Or 'LEO says GER' — Lose Electrons Oxidation, Gain Electrons Reduction. For agents: 'The OXidizing agent gets REDuced' — it does the opposite of its name.",
  imatTrap:
    "The oxidizing agent is the substance that gets REDUCED (it takes electrons from something else). The reducing agent gets OXIDIZED. Students consistently mix these up — the agent does the opposite of its name. Also: oxygen in peroxides (H₂O₂) has oxidation state −1, NOT −2. Hydrogen in metal hydrides (NaH) has −1, NOT +1.",
  whyItMatters:
    "Redox underpins combustion, corrosion, cellular respiration, photosynthesis, batteries, and electrochemistry. IMAT tests oxidation state assignment, identifying agents, and balancing half-reactions — these are fundamental skills for the chemistry section.",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Assigning oxidation states to elements in compounds",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Identifying oxidizing and reducing agents in reactions",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Balancing half-equations in acidic conditions",
    },
  ],
  equations: [
    {
      id: "oxidation-half",
      latex: "Zn \\longrightarrow Zn^{2+} + 2e^-",
      description:
        "Oxidation half-reaction — zinc loses 2 electrons (oxidation state 0 → +2)",
    },
    {
      id: "reduction-half",
      latex: "Cu^{2+} + 2e^- \\longrightarrow Cu",
      description:
        "Reduction half-reaction — copper gains 2 electrons (oxidation state +2 → 0)",
    },
    {
      id: "overall-redox",
      latex: "Zn + Cu^{2+} \\longrightarrow Zn^{2+} + Cu",
      description:
        "Overall redox reaction — electron transfer from Zn (reducing agent) to Cu²⁺ (oxidizing agent)",
    },
  ],
  workedExamples: [
    {
      id: "redox-we-1",
      question:
        "Identify the oxidizing agent and reducing agent in: 2Na + Cl₂ → 2NaCl. Explain your reasoning.",
      hints: [
        "Assign oxidation states to all elements on both sides.",
        "Which element increases in oxidation state (loses e⁻)? That's oxidised — it's the reducing agent.",
        "Which element decreases in oxidation state (gains e⁻)? That's reduced — it's the oxidizing agent.",
      ],
      solution:
        "Na: 0 → +1 (oxidised — lost e⁻). Cl₂: 0 → −1 (reduced — gained e⁻). Na is the reducing agent (it causes Cl₂ to be reduced). Cl₂ is the oxidizing agent (it causes Na to be oxidised). The agent always does the opposite of what happens to it.",
      imatYear: 2022,
    },
    {
      id: "redox-we-2",
      question:
        "Assign oxidation states to all elements in K₂Cr₂O₇ (potassium dichromate).",
      hints: [
        "K is in Group 1 — what is its oxidation state?",
        "O is almost always −2 (exceptions: peroxides, OF₂).",
        "The sum of oxidation states for a neutral compound = 0.",
      ],
      solution:
        "K = +1 (Group 1) → 2K = +2. O = −2 → 7O = −14. Sum = 0 → 2Cr = 0 − (+2) − (−14) = +12 → each Cr = +6. So K = +1, Cr = +6, O = −2.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Redox Reactions",
      url: "https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers",
      type: "simulation",
      description: "Explore electron transfer in simple redox reactions",
    },
    {
      title: "Khan Academy — Redox Reactions",
      url: "https://www.khanacademy.org/science/chemistry/redox-reactions-and-electrochemistry/oxidation-reduction-redox-reactions/v/redox-reactions",
      type: "video",
      description:
        "Clear explanation of oxidation states, agents, and half-reactions",
    },
    {
      title: "ChemGuide — Oxidation States",
      url: "https://www.chemguide.co.uk/inorganic/redox/oxidationstates.html",
      type: "article",
      description:
        "Comprehensive rules for assigning oxidation states with examples",
    },
  ],
  highYieldPoints: [
    "OIL RIG: Oxidation Is Loss (e⁻), Reduction Is Gain (e⁻)",
    "Oxidizing agent = gets reduced (accepts e⁻); Reducing agent = gets oxidised (donates e⁻)",
    "Oxidation state rules: uncombined = 0, monatomic ion = charge, O = −2 (except peroxides −1, OF₂ +2)",
    "H = +1 with nonmetals, −1 with metals (NaH)",
    "Sum of oxidation states = total charge of species",
    "Half-reactions split redox into oxidation and reduction halves",
    "Common oxidising agents: KMnO₄, K₂Cr₂O₇, O₂, Cl₂",
  ],
  explanation: (
    <div>
      <p>
        <strong>Redox</strong> (reduction-oxidation) reactions involve the
        transfer of electrons between species. They are the most common type of
        chemical reaction — occurring in combustion, corrosion, biology, and
        electrochemistry.
      </p>

      <h3>OIL RIG — The Golden Mnemonic</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-red-600">Oxidation</h4>
          <p className="text-xs text-muted-foreground">Loss of electrons</p>
          <p className="text-xs">Oxidation state INCREASES</p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold text-green-600">Reduction</h4>
          <p className="text-xs text-muted-foreground">Gain of electrons</p>
          <p className="text-xs">Oxidation state DECREASES</p>
        </div>
      </div>

      <h3>Rules for Assigning Oxidation States</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">Rule 1</p>
          <p className="text-xs text-muted-foreground">
            Uncombined element = 0 (Fe, O₂, H₂, Cl₂)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">Rule 2</p>
          <p className="text-xs text-muted-foreground">
            Monatomic ion = its charge (Na⁺ = +1, Cl⁻ = −1)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">Rule 3</p>
          <p className="text-xs text-muted-foreground">
            O = −2 (except peroxides H₂O₂ = −1, OF₂ = +2)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">Rule 4</p>
          <p className="text-xs text-muted-foreground">
            H = +1 with nonmetals, −1 with metals (NaH)
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <p className="text-sm font-semibold">Rule 5</p>
          <p className="text-xs text-muted-foreground">
            Sum of oxidation states = overall charge of the species
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Oxidising & Reducing Agents</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">
            Oxidising Agent
          </h4>
          <p className="text-xs text-muted-foreground">
            Gets <strong>reduced</strong> (accepts e⁻)
          </p>
          <p className="text-xs mt-1">E.g. KMnO₄, O₂, Cl₂, K₂Cr₂O₇</p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">
            Reducing Agent
          </h4>
          <p className="text-xs text-muted-foreground">
            Gets <strong>oxidised</strong> (donates e⁻)
          </p>
          <p className="text-xs mt-1">E.g. Na, H₂, C, Zn, Mg</p>
        </div>
      </div>

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 mt-3">
        <h4 className="text-sm font-semibold text-amber-600">
          IMAT Trap: Agents Do the Opposite
        </h4>
        <p className="text-xs text-muted-foreground">
          The oxidising agent gets <strong>reduced</strong>. The reducing agent
          gets <strong>oxidised</strong>. The agent is the cause, not the effect
          — it does to others what doesn&apos;t happen to itself.
        </p>
      </div>

      <h3>Half-Reactions</h3>
      <p>
        Every redox reaction can be split into two half-reactions — one for
        oxidation and one for reduction:
      </p>

      <div className="grid grid-cols-2 gap-3">
        <EquationBlock
          equation={{
            id: "oxidation-half",
            latex: "Zn \\longrightarrow Zn^{2+} + 2e^-",
            description: "Oxidation half (Zn → Zn²⁺)",
          }}
        />
        <EquationBlock
          equation={{
            id: "reduction-half",
            latex: "Cu^{2+} + 2e^- \\longrightarrow Cu",
            description: "Reduction half (Cu²⁺ → Cu)",
          }}
        />
      </div>

      <EquationBlock
        equation={{
          id: "overall-redox",
          latex: "Zn + Cu^{2+} \\longrightarrow Zn^{2+} + Cu",
          description: "Overall redox — Zn reduces Cu²⁺",
        }}
      />

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "redox-we-1",
            question:
              "Identify the oxidising agent and reducing agent in: 2Na + Cl₂ → 2NaCl. Explain your reasoning.",
            hints: [
              "Assign oxidation states to all elements on both sides.",
              "Which element increases in oxidation state (loses e⁻)? That's the reducing agent.",
              "Which element decreases in oxidation state (gains e⁻)? That's the oxidising agent.",
            ],
            solution:
              "Na: 0 → +1 (oxidation — lost e⁻). Cl₂: 0 → −1 (reduction — gained e⁻). Na is the reducing agent (causes Cl₂ reduction). Cl₂ is the oxidising agent (causes Na oxidation).",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "OIL RIG: Ox Is Loss, Red Is Gain",
          "Oxidising agent = gets reduced",
          "Reducing agent = gets oxidised",
          "O: usually −2 (exceptions: −1, +2)",
          "H: +1 with nonmetals, −1 with metals",
          "Sum of states = charge of species",
          "Split redox into half-reactions",
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
      id: "redox-q1",
      type: "multiple-choice",
      prompt:
        "In the reaction 2Na + Cl₂ → 2NaCl, which substance is the oxidising agent?",
      answer: "Cl₂",
      options: ["Na", "Cl₂", "NaCl", "Neither"],
      explanation:
        "Cl₂ is reduced (0 → −1), gaining electrons from Na. The oxidising agent is the substance that gets reduced — Cl₂ causes Na to be oxidised.",
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
      prompt: "In OIL RIG, 'OIL' stands for Oxidation Is ______.",
      answer: "Loss (of electrons)",
      explanation:
        "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons).",
      difficulty: "recall",
    },
    {
      id: "redox-q4",
      type: "multiple-choice",
      prompt: "What is the oxidation state of manganese in KMnO₄?",
      answer: "+7",
      options: ["+5", "+6", "+7", "+4"],
      explanation:
        "K = +1, O = −2 (×4 = −8). Sum = 0: +1 + Mn + (−8) = 0 → Mn = +7.",
      difficulty: "apply",
    },
    {
      id: "redox-q5",
      type: "true-false",
      prompt: "In H₂O₂, oxygen has an oxidation state of −2.",
      answer: "False",
      explanation:
        "H₂O₂ is hydrogen peroxide — a peroxide. Oxygen in peroxides has oxidation state −1, not −2. The usual −2 rule applies to oxides and most other compounds.",
      difficulty: "recall",
    },
    {
      id: "redox-q6",
      type: "explain-why",
      prompt:
        "Explain why the oxidising agent in a redox reaction is always the substance that gets reduced.",
      answer:
        "The oxidising agent causes oxidation in another substance. To do this, it must accept electrons from that substance. Accepting electrons means it undergoes reduction (gain of e⁻). So the oxidising agent always gets reduced — it does to another what doesn't happen to itself. Example: Cl₂ in 2Na + Cl₂ → 2NaCl accepts electrons from Na (causing Na to be oxidised), so Cl₂ is reduced.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "electrochemistry",
    "mole-calculations",
    "balancing-equations",
    "functional-groups",
  ],
  prerequisites: ["balancing-equations", "mole-calculations"],
};
