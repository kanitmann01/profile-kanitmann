"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What is the active site of an enzyme?",
    answer: "The region where the substrate binds and catalysis occurs",
    context: "Specific 3D pocket",
  },
  {
    id: "qf-2",
    question:
      "What is the difference between lock-and-key and induced fit models?",
    answer:
      "Lock-and-key: pre-shaped active site. Induced fit: active site moulds around substrate",
    context: "Enzyme-substrate interaction",
  },
  {
    id: "qf-3",
    question: "What happens to enzyme activity at very high temperatures?",
    answer:
      "Denaturation — the enzyme loses its 3D structure and activity is permanently lost",
    context: "Protein structure affected",
  },
];

export const enzymesNote: AtomicNote = {
  slug: "enzymes",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Enzymes",
  summary:
    "Biological catalysts (mostly proteins) that accelerate reactions by lowering activation energy without being consumed. Key properties: specificity, saturability, catalytic efficiency, and regulation by inhibitors, pH, temperature, and cofactors.",
  memoryHook:
    "Enzymes lower the activation energy hill — they don't change ΔG or equilibrium, just speed up the journey. E + S ⇌ ES → E + P.",
  imatTrap:
    "Enzymes do NOT change the equilibrium constant (Kₑq) or ΔG of a reaction — they only lower the activation energy, speeding up both forward and reverse reactions equally. Also: saturation ≠ denaturation. Saturation (Vₘₐₓ) is when all active sites are occupied; denaturation is irreversible structural unfolding.",
  whyItMatters:
    "Enzyme defects cause metabolic diseases (phenylketonuria, lactose intolerance). Thousands of drugs target enzymes (statins inhibit HMG-CoA reductase, ACE inhibitors lower blood pressure). Understanding enzyme kinetics is essential for drug development and clinical diagnostics (measuring cardiac troponin, liver enzymes).",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Competitive vs non-competitive inhibition",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Factors affecting enzyme activity (pH, temp)",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Lock-and-key vs induced fit",
    },
  ],
  equations: [
    {
      id: "enzyme-general",
      latex: "E + S \\rightleftharpoons ES \\longrightarrow E + P",
      description:
        "General enzyme-catalysed reaction: E = enzyme, S = substrate, P = product",
    },
    {
      id: "enzyme-michaelis",
      latex: "V = \\frac{V_{max}[S]}{K_m + [S]}",
      description:
        "Michaelis-Menten equation — describes hyperbolic relationship between [S] and reaction velocity",
      variables:
        "V = velocity, Vₘₐₓ = maximum velocity, Kₘ = Michaelis constant, [S] = substrate concentration",
    },
    {
      id: "enzyme-dg",
      latex:
        "\\Delta G^\\ddagger = \\text{Activation energy (lowered by enzyme)}",
      description: "Activation energy — the energy barrier enzymes reduce",
    },
    {
      id: "enzyme-tc",
      latex:
        "Q_{10} = \\frac{\\text{Rate at } (T+10)^\\circ C}{\\text{Rate at } T^\\circ C} \\approx 2",
      description:
        "Temperature coefficient: reaction rate doubles per 10°C (until denaturation)",
    },
  ],
  workedExamples: [
    {
      id: "enzyme-worked-1",
      question:
        "IMAT 2023 Style: An enzyme has Kₘ = 2 mM and Vₘₐₓ = 100 μmol/min. An inhibitor increases the apparent Kₘ to 4 mM without changing Vₘₐₓ. What type of inhibition is occurring? Calculate the velocity at [S] = 2 mM in the presence of the inhibitor.",
      hints: [
        "What happens to Kₘ and Vₘₐₓ in competitive vs non-competitive inhibition?",
        "Which type of inhibition increases Kₘ?",
        "Plug values into the Michaelis-Menten equation",
      ],
      solution:
        "Vₘₐₓ unchanged + Kₘ increased = competitive inhibition. Without inhibitor: V = (100 × 2)/(2 + 2) = 50 μmol/min. With inhibitor (Kₘ + inhibitor = 4 mM): V = (100 × 2)/(2 + 4) = 33.3 μmol/min. Competitive inhibitors increase Kₘ because they compete for the active site, requiring higher [S] to reach half Vₘₐₓ.",
      imatYear: 2023,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Enzymes",
      url: "https://www.khanacademy.org/science/biology/energy-and-enzymes/enzyme-regulation/a/enzymes-review",
      type: "article",
      description: "Comprehensive enzyme review with kinetics and inhibition",
    },
    {
      title: "BioNinja — Enzyme Kinetics",
      url: "https://ib.bioninja.com.au/higher-level/topic-8-metabolism-cell/untitled/",
      type: "textbook",
      description:
        "Clear diagrams of Michaelis-Menten and Lineweaver-Burk plots",
    },
    {
      title: "IMAT Buddy — Enzymes Practice Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style questions on enzyme inhibition",
    },
  ],
  highYieldPoints: [
    "Enzymes lower activation energy (Eₐ) — do NOT change ΔG or equilibrium",
    "Active site: specific 3D region where substrate binds",
    "Induced fit: conformational change upon substrate binding (more accepted than lock-and-key)",
    "Competitive inhibition: ↑Kₘ, Vₘₐₓ unchanged — can be overcome by ↑[S]",
    "Non-competitive inhibition: Vₘₐₓ ↓, Kₘ unchanged — cannot be overcome by ↑[S]",
    "Optimal pH for most enzymes: ~7.4 (except pepsin: pH 2, trypsin: pH 8)",
    "Cofactors (inorganic ions) and coenzymes (organic, e.g., NAD⁺) often required for activity",
  ],
  explanation: (
    <div>
      <p>
        <strong>Enzymes</strong> are biological catalysts that accelerate
        biochemical reactions by <strong>lowering the activation energy</strong>
        . They are highly specific (each enzyme typically catalyses one reaction
        or class of reactions) and are subject to precise regulation.
      </p>

      <h3>How Enzymes Work</h3>
      <p>
        The substrate (S) binds to the <strong>active site</strong> of the
        enzyme (E), forming an <strong>enzyme-substrate complex</strong> (ES).
        The transition state is stabilised, lowering the activation energy
        barrier. Then the product (P) is released, and the enzyme is
        regenerated.
      </p>

      <EquationBlock
        equation={{
          id: "enzyme-general",
          latex: "E + S \\rightleftharpoons ES \\longrightarrow E + P",
          description: "The enzyme-catalysed reaction cycle",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Models of Catalysis</h3>
      <p>
        <strong>Lock-and-key (Fischer):</strong> the active site is pre-shaped
        to perfectly fit the substrate. <strong>Induced fit (Koshland):</strong>{" "}
        the active site undergoes conformational changes upon substrate binding,
        moulding around the substrate. Induced fit is the more accepted model.
      </p>

      <h3>Factors Affecting Enzyme Activity</h3>

      <h4>Substrate Concentration</h4>
      <p>
        At low [S], velocity increases linearly with [S] (first-order kinetics).
        At high [S], all active sites are saturated — velocity reaches Vₘₐₓ
        (zero-order kinetics). The Michaelis constant Kₘ is the [S] at half
        Vₘₐₓ.
      </p>

      <EquationBlock
        equation={{
          id: "enzyme-michaelis",
          latex: "V = \\frac{V_{max}[S]}{K_m + [S]}",
          description: "Michaelis-Menten equation",
        }}
      />

      <h4>Temperature</h4>
      <p>
        Rate doubles per ~10°C (Q₁₀ ≈ 2) until the optimal temperature (~37°C
        for human enzymes). Above ~45°C, <strong>denaturation</strong> occurs —
        the 3D structure unfolds irreversibly, destroying the active site.
      </p>

      <h4>pH</h4>
      <p>
        Each enzyme has an optimal pH. Most human enzymes work best near pH 7.4.
        <strong>Pepsin</strong> (stomach): pH 2. <strong>Trypsin</strong> (small
        intestine): pH 8. Extreme pH denatures enzymes by disrupting ionic and
        hydrogen bonds.
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Enzyme Inhibition</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
          <h4 className="font-semibold text-sm text-blue-600">
            Competitive Inhibition
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Inhibitor resembles substrate and binds the active site. Effect: ↑Kₘ
            (apparent), Vₘₐₓ unchanged. Can be overcome by increasing [S].
            <br />
            Example: statins compete with HMG-CoA for HMG-CoA reductase.
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="font-semibold text-sm text-red-600">
            Non-Competitive Inhibition
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Inhibitor binds elsewhere (allosteric site), changing enzyme shape.
            Effect: Vₘₐₓ ↓, Kₘ unchanged. Cannot be overcome by ↑[S].
            <br />
            Example: heavy metals (Pb²⁺, Hg²⁺) binding to SH groups.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="font-semibold text-sm text-amber-600">
            Allosteric Regulation
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Regulatory molecules bind at allosteric sites, causing
            conformational changes. Allosteric activators ↑ activity; allosteric
            inhibitors ↓ activity. Often involved in feedback inhibition (e.g.,
            ATP inhibits PFK-1 in glycolysis).
          </p>
        </div>
      </div>

      <h3>Cofactors & Coenzymes</h3>
      <p>
        Many enzymes require additional non-protein components:
        <strong>Cofactors</strong> = inorganic ions (Mg²⁺, Zn²⁺, Fe²⁺).{" "}
        <strong>Coenzymes</strong> = organic molecules (NAD⁺, FAD, CoA,
        vitamins). Tightly bound coenzymes are called{" "}
        <strong>prosthetic groups</strong>
        (e.g., haem in haemoglobin).
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "enzyme-worked-1",
            question:
              "IMAT 2023 Style: An enzyme has Kₘ = 2 mM and Vₘₐₓ = 100 μmol/min. An inhibitor increases the apparent Kₘ to 4 mM without changing Vₘₐₓ. What type of inhibition is occurring? Calculate the velocity at [S] = 2 mM in the presence of the inhibitor.",
            hints: [
              "What happens to Kₘ and Vₘₐₓ in competitive vs non-competitive inhibition?",
              "Which type of inhibition increases Kₘ?",
              "Plug values into the Michaelis-Menten equation",
            ],
            solution:
              "Vₘₐₓ unchanged + Kₘ increased = competitive inhibition. Without inhibitor: V = (100 × 2)/(2 + 2) = 50 μmol/min. With inhibitor (Kₘ + inhibitor = 4 mM): V = (100 × 2)/(2 + 4) = 33.3 μmol/min. Competitive inhibitors increase Kₘ because they compete for the active site, requiring higher [S] to reach half Vₘₐₓ.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Enzymes lower Eₐ — do NOT change ΔG or Kₑq",
          "Induced fit model (most accepted)",
          "Competitive: ↑Kₘ, Vₘₐₓ same — overcome by ↑[S]",
          "Non-competitive: Vₘₐₓ↓, Kₘ same — not overcome",
          "Denaturation: irreversible (high temp, extreme pH)",
          "Cofactors (metals) / Coenzymes (vitamins)",
          "Allosteric regulation: feedback inhibition",
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

      <QuickFire questions={recallQuestions.slice(2, 3)} title="Final Check" />
    </div>
  ),
  questions: [
    {
      id: "enzymes-q1",
      type: "multiple-choice",
      prompt: "What is the function of an enzyme?",
      answer: "Lower activation energy without being consumed",
      difficulty: "recall",
      options: [
        "Change the equilibrium constant",
        "Lower activation energy without being consumed",
        "Increase the ΔG of a reaction",
        "Supply energy for the reaction",
      ],
    },
    {
      id: "enzymes-q2",
      type: "multiple-choice",
      prompt: "What effect does a competitive inhibitor have on Kₘ?",
      answer: "Increases Kₘ",
      difficulty: "recall",
      options: ["Increases Kₘ", "Decreases Kₘ", "No change", "Eliminates Kₘ"],
    },
    {
      id: "enzymes-q3",
      type: "multiple-choice",
      prompt:
        "Which model describes the active site moulding around the substrate?",
      answer: "Induced fit",
      difficulty: "recall",
      options: [
        "Lock-and-key",
        "Induced fit",
        "Fluid mosaic",
        "Saturation model",
      ],
    },
    {
      id: "enzymes-q4",
      type: "multiple-choice",
      prompt: "The optimal pH for pepsin is approximately:",
      answer: "pH 2",
      difficulty: "apply",
      options: ["pH 2", "pH 7", "pH 8", "pH 10"],
      imatYear: 2022,
    },
    {
      id: "enzymes-q5",
      type: "multiple-choice",
      prompt:
        "Which of the following would NOT overcome competitive inhibition?",
      answer: "Adding more inhibitor",
      difficulty: "apply",
      options: [
        "Adding more substrate",
        "Adding more inhibitor",
        "Removing the inhibitor",
        "Changing to a different enzyme",
      ],
    },
    {
      id: "enzymes-q6",
      type: "explain-why",
      prompt:
        "Explain why allosteric inhibition is considered more 'efficient' than competitive inhibition for metabolic regulation.",
      answer:
        "Allosteric inhibition targets the enzyme at a regulatory site distinct from the active site. Small changes in allosteric effector concentration cause large, coordinated shifts in enzyme activity (cooperativity). Competitive inhibition requires the inhibitor to compete directly at the active site, needing higher concentrations and being less sensitive to subtle regulatory signals.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["proteins", "weak-interactions"],
  prerequisites: ["proteins"],
};
