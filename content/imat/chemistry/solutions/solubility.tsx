"use client";

import type { AtomicNote } from "@/data/imat/types";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";

const recallQuestions = [
  {
    id: "sol-qf-1",
    question: "Is BaSO₄ soluble or insoluble in water?",
    answer: "Insoluble — barium sulfate is an exception to sulfate solubility",
    context: "Most sulfates are soluble; Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺ are exceptions",
  },
  {
    id: "sol-qf-2",
    question:
      "Does gas solubility increase or decrease with higher temperature?",
    answer: "Decrease — warm soda goes flat faster",
    context: "Solids usually become more soluble; gases become less soluble",
  },
];

export const solubilityNote: AtomicNote = {
  slug: "solubility",
  subject: "chemistry",
  topic: "solutions",
  title: "Solubility",
  summary:
    "The maximum amount of solute that dissolves in a given amount of solvent at a specific temperature. Governed by solubility rules, temperature, pressure, and 'like dissolves like'.",
  memoryHook:
    "'NAG SAG' — all Nitrates, Acetates, Group 1 salts, and most Sulfates (except Pb, Ba, Ca, Sr, Ag) are soluble. 'Like dissolves like' — polar dissolves polar, nonpolar dissolves nonpolar. Gas solubility: ↑T → ↓solubility (opposite of solids).",
  imatTrap:
    "Gas solubility DECREASES with increasing temperature (opposite of most solids). This is why warm soda goes flat faster. Also, increasing pressure INCREASES gas solubility (Henry's law) — this is why soda is bottled under pressure. Not all Group 1 compounds are soluble — though almost all are (check for exceptions like some Li salts).",
  whyItMatters:
    "Solubility rules predict precipitation reactions used in qualitative analysis and industrial purification. Understanding solubility is critical for drug design (bioavailability), kidney stone formation (calcium oxalate), and environmental chemistry (dissolved oxygen in water).",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Applying solubility rules to predict precipitation",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Gas solubility — temperature and pressure effects",
    },
    {
      years: [2024],
      frequency: "medium",
      notes: "Like dissolves like — predicting solubility from polarity",
    },
  ],
  equations: [
    {
      id: "henrys-law",
      latex: "S = k_H \\cdot P",
      description:
        "Henry's law — solubility of a gas is directly proportional to its partial pressure above the liquid",
      variables:
        "S = solubility, k_H = Henry's law constant (depends on gas and temperature), P = partial pressure",
    },
    {
      id: "solubility-product",
      latex:
        "A_xB_y(s) \\rightleftharpoons xA^{y+}(aq) + yB^{x-}(aq) \\quad K_{sp} = [A^{y+}]^x[B^{x-}]^y",
      description:
        "Solubility product constant — equilibrium between a solid and its dissolved ions",
    },
  ],
  workedExamples: [
    {
      id: "sol-we-1",
      question:
        "Predict whether a precipitate forms when 0.1 M AgNO₃ is mixed with 0.1 M NaCl. Write the net ionic equation if a reaction occurs.",
      hints: [
        "Identify the ions present in each solution.",
        "Use the solubility rules: are all nitrate salts soluble? Are all chloride salts soluble?",
        "Check the exceptions for chloride salts — which metal chlorides are insoluble?",
      ],
      solution:
        "Ions present: Ag⁺, NO₃⁻, Na⁺, Cl⁻. All nitrates are soluble (AgNO₃ stays dissolved). NaCl is soluble. But AgCl is insoluble (chloride exception: AgCl, PbCl₂, Hg₂Cl₂). Ag⁺(aq) + Cl⁻(aq) → AgCl(s). White precipitate of silver chloride forms. The spectator NO₃⁻ and Na⁺ remain in solution.",
      imatYear: 2022,
    },
    {
      id: "sol-we-2",
      question:
        "Explain why CO₂ is more soluble in cold soda than warm soda, using Henry's law and the effect of temperature.",
      hints: [
        "What is the relationship between gas solubility and temperature?",
        "How are carbonated drinks bottled under pressure?",
        "What happens to the CO₂ when you open a warm vs cold bottle?",
      ],
      solution:
        "Two factors: (1) Henry's law: S = k_H × P. Soda is bottled under high CO₂ pressure, forcing more CO₂ into solution. (2) Temperature: gas solubility decreases as temperature rises (k_H decreases with temperature). Cold soda holds more dissolved CO₂ because the lower temperature increases k_H. When the bottle is opened, pressure drops and CO₂ escapes. Warm soda goes flat faster because the CO₂ was already less soluble and escapes more readily.",
    },
  ],
  externalResources: [
    {
      title: "PhET — Sugar & Salt Solutions",
      url: "https://phet.colorado.edu/en/simulations/sugar-and-salt-solutions",
      type: "simulation",
      description:
        "Interactive — dissolve ionic and molecular compounds in water at the particle level",
    },
    {
      title: "Khan Academy — Solubility & Precipitation",
      url: "https://www.khanacademy.org/science/chemistry/chemical-reactions-stoichiome/solubility-equilibria/v/solubility-introduction",
      type: "video",
      description:
        "Covers solubility rules, precipitation reactions, and K_sp with examples",
    },
    {
      title: "BBC Bitesize — Solubility Rules",
      url: "https://www.bbc.co.uk/bitesize/guides/zmd4jty/revision/1",
      type: "article",
      description:
        "GCSE/ALevel guide with solubility table and practice questions",
    },
  ],
  highYieldPoints: [
    "NAG SAG: Nitrates, Acetates, Group 1 salts, most Sulfates are soluble",
    "Chloride exceptions: AgCl, PbCl₂, Hg₂Cl₂ (insoluble)",
    "Sulfate exceptions: BaSO₄, PbSO₄, CaSO₄, SrSO₄ (insoluble)",
    "Carbonates, phosphates, hydroxides: mostly insoluble (except Group 1 and NH₄⁺)",
    "Gas solubility: decreases with ↑T, increases with ↑P (Henry's law)",
    "Like dissolves like: polar in polar, nonpolar in nonpolar",
    "Saturated = max dissolved; supersaturated = unstable, crystallises on disturbance",
  ],
  explanation: (
    <div>
      <p>
        <strong>Solubility</strong> is the maximum amount of solute that can
        dissolve in a given amount of solvent at a specific temperature. The
        general rule: <strong>&quot;like dissolves like&quot;</strong> — polar
        solutes dissolve in polar solvents, nonpolar solutes in nonpolar
        solvents.
      </p>

      <h3>Key Solubility Rules (NAG SAG)</h3>
      <div className="grid gap-2">
        <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-3">
          <h4 className="text-sm font-semibold text-green-600">
            Always Soluble
          </h4>
          <p className="text-xs text-muted-foreground">
            <strong>N</strong>itrates (NO₃⁻), <strong>A</strong>cetates
            (CH₃COO⁻),
            <strong>G</strong>roup 1 salts (Li⁺, Na⁺, K⁺, etc.),{" "}
            <strong>NH₄⁺</strong> salts
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">
            Mostly Soluble — Watch for Exceptions
          </h4>
          <p className="text-xs text-muted-foreground">
            <strong>Chlorides (Cl⁻):</strong> exceptions are AgCl, PbCl₂, Hg₂Cl₂
            <br />
            <strong>Sulfates (SO₄²⁻):</strong> exceptions are BaSO₄, PbSO₄,
            CaSO₄, SrSO₄ (AG) —{" "}
            <em>
              &quot;Agnes, Peter, Catherine, &amp; Susan — the sulfate
              exceptions&quot;
            </em>
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">
            Mostly Insoluble
          </h4>
          <p className="text-xs text-muted-foreground">
            <strong>Carbonates (CO₃²⁻):</strong> except Group 1 and NH₄⁺
            <br />
            <strong>Phosphates (PO₄³⁻):</strong> except Group 1 and NH₄⁺
            <br />
            <strong>Hydroxides (OH⁻):</strong> except Group 1, NH₄⁺, and Ba(OH)₂
            (slightly soluble)
          </p>
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Saturated, Unsaturated, Supersaturated</h3>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">Unsaturated</h4>
          <p className="text-xs text-muted-foreground">
            More solute can still dissolve
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">Saturated</h4>
          <p className="text-xs text-muted-foreground">
            Max solute dissolved — equilibrium
          </p>
        </div>
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
          <h4 className="text-sm font-semibold">Supersaturated</h4>
          <p className="text-xs text-muted-foreground">
            Unstable — crystallises on disturbance
          </p>
        </div>
      </div>

      <h3>Factors Affecting Solubility</h3>
      <div className="grid gap-3">
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Temperature</h4>
          <p className="text-xs text-muted-foreground">
            Most <strong>solids</strong>: solubility increases with ↑T.{" "}
            <strong>Gases</strong>: solubility <strong>decreases</strong> with
            ↑T (opposite direction — common IMAT trap).
          </p>
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">Pressure — Henry&apos;s Law</h4>
          <p className="text-xs text-muted-foreground">
            Affects <strong>gas</strong> solubility only. S = k_H × P — higher
            pressure means more gas dissolves. This is why soda is bottled under
            pressure and why deep-sea divers must ascend slowly (nitrogen
            dissolves in blood under pressure).
          </p>

          <EquationBlock
            equation={{
              id: "henrys-law",
              latex: "S = k_H \\cdot P",
              description: "Henry's law — gas solubility ∝ pressure",
            }}
          />
        </div>
        <div className="rounded-lg border p-3">
          <h4 className="text-sm font-semibold">
            &quot;Like Dissolves Like&quot;
          </h4>
          <p className="text-xs text-muted-foreground">
            Polar solvents (water) dissolve polar/ionic solutes (NaCl, sugar).
            Nonpolar solvents (hexane, CCl₄) dissolve nonpolar solutes (oils,
            fats, I₂). This predicts solubility without memorising rules.
          </p>
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
            id: "sol-we-1",
            question:
              "Predict whether a precipitate forms when 0.1 M AgNO₃ is mixed with 0.1 M NaCl. Write the net ionic equation.",
            hints: [
              "Identify all ions present.",
              "Check solubility rules for each possible product.",
              "AgCl is the key exception to chloride solubility.",
            ],
            solution:
              "Ions: Ag⁺, NO₃⁻, Na⁺, Cl⁻. All nitrates soluble. All Group 1 salts soluble. AgCl is insoluble. Ag⁺(aq) + Cl⁻(aq) → AgCl(s). White precipitate.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "NAG SAG: N, A, G1, Sulfates (except AG)",
          "AgCl, PbCl₂, Hg₂Cl₂ — insoluble chlorides",
          "BaSO₄, PbSO₄, CaSO₄ — insoluble sulfates",
          "Gas solubility: ↓ with ↑T, ↑ with ↑P",
          "Henry's law: S = k_H × P",
          "Like dissolves like",
          "Saturated = equilibrium with undissolved solid",
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
      id: "sol-q1",
      type: "multiple-choice",
      prompt: "Which of the following compounds is insoluble in water?",
      answer: "BaSO₄",
      options: ["NaCl", "KNO₃", "BaSO₄", "NH₄Cl"],
      explanation:
        "Most sulfates are soluble, but BaSO₄ is a key exception — barium sulfate is insoluble and used in medical imaging.",
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
        "CO₂ is dissolved under pressure. As temperature rises, gas solubility decreases, so CO₂ escapes more readily — the soda goes flat.",
      difficulty: "apply",
    },
    {
      id: "sol-q3",
      type: "fill-blank",
      prompt:
        "According to Henry's law, the solubility of a gas in a liquid is directly proportional to the ______ of that gas above the liquid.",
      answer: "pressure",
      explanation:
        "Henry's law: S = k_H × P. Increasing the partial pressure of a gas above a liquid forces more gas molecules into solution.",
      difficulty: "recall",
    },
    {
      id: "sol-q4",
      type: "multiple-choice",
      prompt:
        "A white precipitate forms when AgNO₃(aq) is added to NaCl(aq). What is the precipitate?",
      answer: "AgCl (silver chloride)",
      options: ["AgNO₃", "NaCl", "AgCl (silver chloride)", "NaNO₃"],
      explanation:
        "Ag⁺ + Cl⁻ → AgCl(s). Silver chloride is insoluble (a key exception to the rule that chlorides are soluble). NaNO₃ remains dissolved.",
      difficulty: "apply",
    },
    {
      id: "sol-q5",
      type: "true-false",
      prompt:
        "Increasing temperature always increases solubility for all substances.",
      answer: "False",
      explanation:
        "Most solids become more soluble with increasing temperature, but gases become LESS soluble. The behaviour depends on the nature of the solute.",
      difficulty: "apply",
    },
    {
      id: "sol-q6",
      type: "explain-why",
      prompt:
        "Explain why I₂ (a nonpolar molecule) dissolves readily in CCl₄ (nonpolar) but only very slightly in water (polar).",
      answer:
        "'Like dissolves like.' I₂ is a nonpolar diatomic molecule with no charge separation. CCl₄ is also nonpolar — the intermolecular forces between I₂ and CCl₄ (London dispersion forces) are similar in strength to those within each pure substance. Water is highly polar and forms strong hydrogen bonds with itself. I₂ cannot form hydrogen bonds or significant dipole interactions with water, so the energy cost of disrupting water's hydrogen bonding network is not compensated — making I₂ very poorly soluble in water.",
      difficulty: "analyze",
    },
  ],
  crosslinks: [
    "concentration",
    "mixtures-separation",
    "ionic-bonds",
    "acids-bases-salts",
  ],
  prerequisites: ["concentration", "ionic-bonds"],
};
