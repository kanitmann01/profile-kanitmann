"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "ec-qf-1",
    question: "In a galvanic cell, is the anode positive or negative?",
    answer: "Negative (electrons flow OUT of the anode)",
    context: "Anode = oxidation = source of electrons",
  },
  {
    id: "ec-qf-2",
    question: "What is the role of the salt bridge?",
    answer: "Maintains charge balance by allowing ion flow",
    context: "Without it, charge builds up and current stops",
  },
];

export const electrochemistryNote: AtomicNote = {
  slug: "electrochemistry",
  subject: "chemistry",
  topic: "redox",
  title: "Electrochemistry",
  summary:
    "The study of chemical reactions producing or consuming electricity — galvanic (voltaic) cells generate current from spontaneous redox reactions; electrolysis uses current to drive non-spontaneous reactions.",
  memoryHook:
    "'AN OX, CAT RED' — Anode = OXidation, Cathode = REDuction. In a galvanic cell: 'A before C in the alphabet → Anode is Negative, Cathode is Positive.' In electrolysis: the signs FLIP but the reactions stay the same (anode = oxidation, cathode = reduction).",
  imatTrap:
    "In a galvanic cell, the anode is NEGATIVE (source of e⁻) and cathode is POSITIVE. In electrolysis, this is REVERSED — anode is positive, cathode is negative. The reactions (anode = oxidation) stay the same, but the signs flip. Students lose marks by assuming the signs are the same for both cell types.",
  whyItMatters:
    "Electrochemistry explains batteries (galvanic), electroplating (electrolysis), corrosion of metals, and biological electron transport chains. IMAT tests cell notation, standard potentials, and predicting spontaneity from E° values.",
  imatPatterns: [
    {
      years: [2022, 2023],
      frequency: "high",
      notes: "Galvanic cell: identify anode/cathode and direction of e⁻ flow",
    },
    {
      years: [2021, 2024],
      frequency: "medium",
      notes: "Electrolysis: predicting products at each electrode",
    },
    {
      years: [2023, 2024],
      frequency: "medium",
      notes: "E°cell calculation: E°cathode − E°anode",
    },
  ],
  equations: [
    {
      id: "emf-cell",
      latex: "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}",
      description:
        "Standard cell potential — more positive cathode vs anode gives positive E° for spontaneous reaction",
    },
    {
      id: "gibbs-redox",
      latex: "\\Delta G^\\circ = -nFE^\\circ",
      description:
        "Gibbs free energy relates to cell potential — positive E° means spontaneous (ΔG < 0)",
      variables:
        "n = moles of e⁻ transferred, F = Faraday constant (96,485 C/mol), E° = cell potential (V)",
    },
    {
      id: "faraday-law",
      latex: "m = \\frac{Q \\cdot M}{n \\cdot F} \\quad \\text{where } Q = It",
      description:
        "Faraday's law — mass deposited is proportional to charge passed",
      variables:
        "m = mass (g), Q = charge (C), M = molar mass, n = e⁻ per ion, I = current (A), t = time (s)",
    },
  ],
  workedExamples: [
    {
      id: "ec-we-1",
      question:
        "Calculate the standard cell potential for the Zn/Cu galvanic cell. Given: Cu²⁺ + 2e⁻ → Cu, E° = +0.34 V; Zn²⁺ + 2e⁻ → Zn, E° = −0.76 V. Is the reaction spontaneous?",
      hints: [
        "Which half-reaction has the more positive E°? That will be the cathode.",
        "Identify the cathode (reduction) and anode (oxidation).",
        "Apply: E°cell = E°cathode − E°anode",
        "Spontaneous if E°cell > 0.",
      ],
      solution:
        "Cathode: Cu²⁺/Cu (E° = +0.34 V) — more positive, undergoes reduction. Anode: Zn/Zn²⁺ (E° = −0.76 V) — Zn is oxidised. E°cell = +0.34 − (−0.76) = +1.10 V. E° > 0 → spontaneous reaction. ΔG = −nFE° = −2 × 96,485 × 1.10 = −212 kJ/mol (negative, confirming spontaneous).",
      imatYear: 2022,
    },
    {
      id: "ec-we-2",
      question:
        "In the electrolysis of molten NaCl, predict the products at the anode and cathode. Write the half-equations.",
      hints: [
        "In electrolysis, the anode is positive and the cathode is negative.",
        "Negative ions (anions) are attracted to the anode — they undergo oxidation.",
        "Positive ions (cations) are attracted to the cathode — they undergo reduction.",
        "Molten NaCl contains Na⁺ and Cl⁻ ions (no water).",
      ],
      solution:
        "Cathode (−): Na⁺ + e⁻ → Na (sodium metal forms). Anode (+): 2Cl⁻ → Cl₂ + 2e⁻ (chlorine gas forms). Overall: 2NaCl(l) → 2Na(s) + Cl₂(g). Note: if it were aqueous NaCl, water would compete — H₂O is more easily reduced than Na⁺, so H₂ gas forms at the cathode instead of Na.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Electrochemical Cell",
      url: "https://phet.colorado.edu/en/simulations/electrochemical-cell",
      type: "simulation",
      description:
        "Interactive galvanic cell — change electrodes and see voltage change in real time",
    },
    {
      title: "Khan Academy — Electrochemistry",
      url: "https://www.khanacademy.org/science/chemistry/redox-reactions-and-electrochemistry/electrochemistry/v/introduction-to-electrochemistry",
      type: "video",
      description:
        "Comprehensive series covering galvanic cells, electrolysis, and cell potentials",
    },
    {
      title: "Royal Society of Chemistry — Electrochemistry",
      url: "https://edu.rsc.org/resources/collections/electrochemistry",
      type: "article",
      description:
        "Collection of articles, practicals, and explanations on electrochemistry",
    },
  ],
  highYieldPoints: [
    "Galvanic cell: chemical → electrical (spontaneous, E° > 0)",
    "Electrolysis: electrical → chemical (non-spontaneous, E° < 0)",
    "Anode = oxidation (always), Cathode = reduction (always)",
    "Galvanic: anode (−), cathode (+); Electrolysis: anode (+), cathode (−)",
    "Salt bridge: maintains charge balance (allows ion migration)",
    "E°cell = E°cathode − E°anode; spontaneous when E°cell > 0",
    "Faraday's law: m = QM/(nF); Q = It; F = 96,485 C/mol",
  ],
  explanation: (
    <div>
      <p>
        Electrochemistry bridges chemistry and electricity. Two main types of
        electrochemical cells:
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">
            Galvanic (Voltaic) Cells
          </h4>
          <p className="text-xs text-muted-foreground">
            Spontaneous redox reaction produces electricity. Example: batteries.
            E°cell &gt; 0, ΔG &lt; 0.
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">Electrolysis</h4>
          <p className="text-xs text-muted-foreground">
            Electricity drives a non-spontaneous reaction. Example:
            electroplating. E°cell &lt; 0, ΔG &gt; 0.
          </p>
        </div>
      </div>

      <h3>Galvanic Cell — Key Components</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Anode (−)</h4>
          <p className="text-xs text-muted-foreground">
            Oxidation occurs — electrons leave the cell. Negative electrode.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Cathode (+)</h4>
          <p className="text-xs text-muted-foreground">
            Reduction occurs — electrons enter the cell. Positive electrode.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">Salt Bridge</h4>
          <p className="text-xs text-muted-foreground">
            Contains inert electrolyte (KNO₃). Maintains charge balance by
            allowing ion flow between half-cells.
          </p>
        </div>
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold">External Circuit</h4>
          <p className="text-xs text-muted-foreground">
            Electrons flow from anode → cathode through the wire, generating
            current.
          </p>
        </div>
      </div>

      <EquationBlock
        equation={{
          id: "emf-cell",
          latex: "E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}",
          description: "Standard cell potential",
        }}
      />

      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 mt-3">
        <h4 className="text-sm font-semibold text-amber-600">
          Sign Convention Trap
        </h4>
        <p className="text-xs text-muted-foreground">
          Galvanic: anode (−), cathode (+). Electrolysis: anode (+), cathode
          (−). <strong>Reactions stay the same</strong> (anode = oxidation,
          cathode = reduction) — only the <strong>signs flip</strong>.
          Don&apos;t memorise signs; memorise reactions.
        </p>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Standard Reduction Potentials</h3>
      <p>
        Measured relative to the{" "}
        <strong>standard hydrogen electrode (SHE, E° = 0.00 V)</strong>. More
        positive E° → stronger oxidising agent → greater tendency to be reduced.
      </p>
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2 text-center">
          <p className="text-lg font-bold text-red-600">+2.87 V</p>
          <p className="text-xs">F₂ + 2e⁻ → 2F⁻</p>
          <p className="text-xs text-muted-foreground">
            Strongest oxidising agent
          </p>
        </div>
        <div className="rounded-lg border p-2 text-center">
          <p className="text-lg font-bold">0.00 V</p>
          <p className="text-xs">2H⁺ + 2e⁻ → H₂</p>
          <p className="text-xs text-muted-foreground">SHE reference</p>
        </div>
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-2 text-center">
          <p className="text-lg font-bold text-green-600">−3.04 V</p>
          <p className="text-xs">Li⁺ + e⁻ → Li</p>
          <p className="text-xs text-muted-foreground">
            Strongest reducing agent
          </p>
        </div>
      </div>

      <h3>Faraday&apos;s Law</h3>

      <EquationBlock
        equation={{
          id: "faraday-law",
          latex:
            "m = \\frac{Q \\cdot M}{n \\cdot F} \\quad \\text{where } Q = It",
          description: "Faraday's law — mass deposited by electrolysis",
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
            id: "ec-we-1",
            question:
              "Calculate E°cell for Zn/Cu galvanic cell. Cu²⁺ + 2e⁻ → Cu, E° = +0.34 V; Zn²⁺ + 2e⁻ → Zn, E° = −0.76 V. Is it spontaneous?",
            hints: [
              "More positive E° = cathode (reduction).",
              "E°cell = E°cathode − E°anode",
              "Spontaneous if E°cell > 0.",
            ],
            solution:
              "Cathode: Cu²⁺/Cu (E° = +0.34 V). Anode: Zn/Zn²⁺ (E° = −0.76 V). E°cell = +0.34 − (−0.76) = +1.10 V. E° > 0 → spontaneous.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Galvanic: chemical → electrical",
          "Electrolysis: electrical → chemical",
          "Anode = oxidation, Cathode = reduction",
          "Galvanic: anode (−), cathode (+)",
          "Electrolysis: anode (+), cathode (−)",
          "E°cell = E°cathode − E°anode",
          "Faraday: m = QM/(nF)",
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
      id: "ec-q1",
      type: "multiple-choice",
      prompt:
        "In a galvanic cell with Zn and Cu electrodes, which is the cathode?",
      answer: "Copper (Cu) — reduction occurs here (Cu²⁺ + 2e⁻ → Cu)",
      options: [
        "Zinc (Zn) — oxidation occurs here",
        "Copper (Cu) — reduction occurs here (Cu²⁺ + 2e⁻ → Cu)",
        "Both electrodes are cathodes",
        "The salt bridge",
      ],
      explanation:
        "Cu has a more positive standard reduction potential (+0.34 V) than Zn (−0.76 V), so Cu²⁺ is reduced at the cathode. Zn is oxidised at the anode.",
      difficulty: "apply",
    },
    {
      id: "ec-q2",
      type: "true-false",
      prompt: "In electrolysis, the anode is the negative electrode.",
      answer: "False",
      explanation:
        "In electrolysis, the anode is POSITIVE (connected to the positive terminal of the power supply). This is the opposite of a galvanic cell, where the anode is negative.",
      difficulty: "apply",
    },
    {
      id: "ec-q3",
      type: "fill-blank",
      prompt:
        "A spontaneous redox reaction in an electrochemical cell has a ______ cell potential (E°).",
      answer: "positive",
      explanation:
        "A positive E° indicates a spontaneous reaction (ΔG = −nFE° — when E° is positive, ΔG is negative, meaning spontaneous).",
      difficulty: "recall",
    },
    {
      id: "ec-q4",
      type: "multiple-choice",
      prompt: "What is the Faraday constant?",
      answer: "96,485 C/mol (charge on one mole of electrons)",
      options: [
        "96,485 C/mol",
        "22.4 L/mol",
        "6.022 × 10²³ mol⁻¹",
        "4.18 J/g°C",
      ],
      explanation:
        "The Faraday constant F = 96,485 C/mol is the charge of one mole of electrons. It relates the quantity of charge to the amount of substance in electrolysis.",
      difficulty: "recall",
    },
    {
      id: "ec-q5",
      type: "multiple-choice",
      prompt:
        "In the electrolysis of aqueous NaCl, why does H₂ form at the cathode instead of Na?",
      answer:
        "H₂O is more easily reduced than Na⁺ (H⁺/H₂ has a less negative E° than Na⁺/Na)",
      options: [
        "Na⁺ is too big to be reduced",
        "H₂O is more easily reduced than Na⁺",
        "Na is a gas at room temperature",
        "Cl⁻ blocks the Na⁺ from reaching the cathode",
      ],
      explanation:
        "E°(H⁺/H₂) = 0.00 V, E°(Na⁺/Na) = −2.71 V. The less negative (more positive) reduction potential means H₂O is reduced more readily than Na⁺. So H₂ gas forms at the cathode, not Na metal.",
      difficulty: "analyze",
    },
    {
      id: "ec-q6",
      type: "explain-why",
      prompt:
        "Explain why a salt bridge is necessary for a galvanic cell to produce a sustained current.",
      answer:
        "As Zn oxidises at the anode (Zn → Zn²⁺ + 2e⁻), the Zn²⁺ concentration increases, building positive charge. At the cathode, Cu²⁺ reduction (Cu²⁺ + 2e⁻ → Cu) removes Cu²⁺, building negative charge. Without a salt bridge, these charge imbalances would stop electron flow very quickly. The salt bridge (containing inert ions like K⁺ and NO₃⁻) allows anions to migrate to the anode and cations to the cathode, neutralising charge and maintaining electrical neutrality.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "oxidation-reduction",
    "concentration",
    "ionic-bonds",
    "enthalpy",
  ],
  prerequisites: ["oxidation-reduction"],
};
