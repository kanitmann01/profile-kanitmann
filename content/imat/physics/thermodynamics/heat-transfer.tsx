"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";
import { StepSolver } from "@/components/imat/interactive/step-solver";

const recallQuestions = [
  {
    id: "heat-qf-1",
    question: "Which heat transfer mechanism does NOT need a medium?",
    answer: "radiation",
    hint: "How does the Sun's energy reach Earth?",
    context: "Through the vacuum of space",
  },
  {
    id: "heat-qf-2",
    question: "Water's specific heat capacity is:",
    answer: "4186",
    hint: "J/kg·K — one of the highest known",
    context: "Why coastal climates are mild",
  },
  {
    id: "heat-qf-3",
    question:
      "During melting, temperature stays constant. Where does the heat go?",
    answer: "breaking bonds",
    hint: "Latent heat of fusion",
    context: "Phase change energy",
  },
];

export const heatTransferNote: AtomicNote = {
  slug: "heat-transfer",
  subject: "physics",
  topic: "thermodynamics",
  title: "Heat Transfer and Specific Heat",
  summary:
    "Heat transfers by three mechanisms: conduction (direct contact), convection (fluid movement), and radiation (electromagnetic waves). The heat required to change temperature is Q = mcΔT, and phase changes consume latent heat Q = mL.",
  memoryHook:
    "'Conduction = touch (metal spoon in hot soup), Convection = flow (hot air rises), Radiation = no contact (sun warming Earth).' Q = mcΔT: 'Mass × Capacity × ΔT — More stuff, more stubborn, bigger change = more energy.' Latent heat: heat hides during phase changes — temperature doesn't budge until the phase shift finishes.",
  imatTrap:
    "Temperature ≠ heat. Temperature measures average kinetic energy; heat is energy TRANSFERRED due to temperature difference. During phase change, Q = mL, NOT Q = mcΔT — ΔT = 0! Water's high specific heat (4186 J/kg·K) means it resists temperature change. Metals have low c (~100–900 J/kg·K) — they heat and cool quickly. Don't confuse latent heat of fusion (solid↔liquid) with vaporisation (liquid↔gas).",
  whyItMatters:
    "Thermoregulation in the human body relies on water's high specific heat and evaporative cooling (sweating). Understanding heat transfer is crucial for hypothermia/hyperthermia management, fever response, and metabolic heat production. Every IMAT thermodynamics question hinges on Q = mcΔT and the distinction between sensible heat (ΔT visible) and latent heat (phase change).",
  imatPatterns: [
    {
      years: [2021, 2023, 2024],
      frequency: "high",
      notes: "Q = mcΔT calculations, often with water",
    },
    {
      years: [2020, 2022],
      frequency: "medium",
      notes: "Identifying conduction vs convection vs radiation",
    },
    {
      years: [2022, 2023],
      frequency: "medium",
      notes: "Latent heat and phase change graphs",
    },
  ],
  equations: [
    {
      id: "heat-specific",
      latex: "Q = mc\\Delta T",
      description: "Heat energy for temperature change (sensible heat)",
      variables:
        "Q = heat (J), m = mass (kg), c = specific heat capacity (J/kg·K), ΔT = temperature change (K or °C)",
    },
    {
      id: "heat-latent",
      latex: "Q = mL",
      description: "Heat energy for phase change (latent heat)",
      variables:
        "L = latent heat (J/kg). L_f = 3.34×10⁵ J/kg, L_v = 2.26×10⁶ J/kg for water",
    },
    {
      id: "heat-conduction",
      latex: "\\frac{Q}{t} = \\frac{kA\\Delta T}{d}",
      description: "Rate of heat conduction through a material",
      variables:
        "k = thermal conductivity (W/m·K), A = area (m²), d = thickness (m)",
    },
    {
      id: "heat-stefan",
      latex: "P = e\\sigma A T^4",
      description: "Stefan-Boltzmann law for thermal radiation power",
      variables:
        "e = emissivity (0–1), σ = 5.67×10⁻⁸ W/m²·K⁴, T = absolute temperature (K)",
    },
  ],
  workedExamples: [
    {
      id: "heat-worked-1",
      question:
        "IMAT 2023 Style: How much heat is required to raise the temperature of 500 g of water from 20°C to 100°C? (c_water = 4186 J/kg·K)",
      hints: [
        "Convert mass to kg: 500 g = 0.5 kg.",
        "ΔT = 100 − 20 = 80°C (1°C = 1 K for temperature differences).",
        "Use Q = mcΔT directly.",
      ],
      solution: "Q = 0.5 × 4186 × 80 = 0.5 × 334,880 = 167,440 J = 167.4 kJ.",
      imatYear: 2023,
    },
    {
      id: "heat-worked-2",
      question:
        "A 2 kg block of ice at 0°C is placed in a room at 20°C and melts completely. How much heat does the ice absorb? (L_f = 334,000 J/kg) Then, if the resulting water warms to room temperature, what total heat is absorbed?",
      hints: [
        "Melting uses latent heat: Q₁ = mL_f.",
        "Then warming uses sensible heat: Q₂ = mcΔT.",
        "Total = Q₁ + Q₂.",
      ],
      solution:
        "Q₁ = 2 × 334,000 = 668,000 J. Q₂ = 2 × 4186 × 20 = 167,440 J. Total = 668,000 + 167,440 = 835,440 J ≈ 835 kJ. Notice melting requires ~4× more energy than warming the resulting water by 20°C!",
    },
  ],
  externalResources: [
    {
      title: "PhET Simulation — Energy Forms and Changes",
      url: "https://phet.colorado.edu/en/simulations/energy-forms-and-changes",
      type: "simulation",
      description:
        "Explore heat transfer, specific heat, and energy conservation",
    },
    {
      title: "Khan Academy — Thermal Energy and Heat",
      url: "https://www.khanacademy.org/science/physics/thermodynamics/specific-heat-and-heat-capacity/v/specific-heat-capacity",
      type: "video",
      description: "Specific heat capacity with worked examples",
    },
    {
      title: "HyperPhysics — Heat Transfer Overview",
      url: "http://hyperphysics.phy-astr.gsu.edu/hbase/thermo/heatra.html",
      type: "textbook",
      description: "Detailed reference on all three heat transfer mechanisms",
    },
  ],
  highYieldPoints: [
    "Q = mcΔT for sensible heat; Q = mL for latent heat (phase change, ΔT = 0)",
    "Water: c = 4186 J/kg·K (memorise this!)",
    "L_f = 334 kJ/kg (ice→water), L_v = 2260 kJ/kg (water→steam)",
    "Conduction: direct contact, rate ∝ kAΔT/d",
    "Convection: fluid movement (natural or forced)",
    "Radiation: no medium needed, P ∝ T⁴ (Stefan-Boltzmann)",
    "Dark/matte surfaces: better absorbers and emitters of radiation",
  ],
  explanation: (
    <div>
      <p>
        <strong>Heat</strong> is energy transferred from a hotter object to a
        cooler one due to a temperature difference. Temperature measures average
        kinetic energy of particles; heat is the total energy transferred. There
        are three distinct mechanisms, each with real-world signatures you must
        recognise.
      </p>

      <h3>Three Mechanisms of Heat Transfer</h3>

      <div className="grid gap-3 mb-4">
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
          <h4 className="text-sm font-semibold text-red-600">Conduction</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Energy transfer through <strong>direct molecular contact</strong>.
            Vibrating particles pass kinetic energy to neighbours. Metals are
            excellent conductors (free electrons); air and wood are insulators.
          </p>
          <EquationBlock
            equation={{
              id: "heat-conduction",
              latex: "\\frac{Q}{t} = \\frac{kA\\Delta T}{d}",
              description:
                "Conduction rate: more area & gradient → faster; thicker → slower",
            }}
          />
        </div>
        <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
          <h4 className="text-sm font-semibold text-orange-600">Convection</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Energy transfer by <strong>bulk fluid movement</strong>. Hot fluid
            expands, becomes less dense, rises. Cool fluid sinks. This creates
            <strong>convection currents</strong>. Natural (buoyancy-driven) vs
            forced (fan, pump, heart).
          </p>
        </div>
        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
          <h4 className="text-sm font-semibold text-purple-600">Radiation</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Energy transfer via <strong>electromagnetic waves</strong>. No
            medium required — works in a vacuum. All objects emit radiation.
            Power output ∝ T⁴ (Stefan-Boltzmann). Dark, matte surfaces are
            better emitters and absorbers than shiny ones.
          </p>
          <EquationBlock
            equation={{
              id: "heat-stefan",
              latex: "P = e\\sigma A T^4",
              description:
                "Radiated power depends strongly on temperature (T⁴!)",
            }}
          />
        </div>
      </div>

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Specific Heat Capacity — Q = mcΔT</h3>
      <p className="mb-3">
        Different materials require different amounts of heat to change
        temperature.
        <strong>Specific heat capacity (c)</strong> is the heat needed to raise
        1 kg of a substance by 1 K (or 1°C).
      </p>

      <EquationBlock
        equation={{
          id: "heat-specific",
          latex: "Q = mc\\Delta T",
          description: "Sensible heat: you can 'sense' the temperature change",
          variables: "c_water = 4186 J/kg·K (the IMAT favourite)",
        }}
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
          <h4 className="text-sm font-semibold text-blue-600">
            High c (water)
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Resists temperature change — takes lots of heat to warm up, releases
            lots to cool down. Why coastal climates are mild.
          </p>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
          <h4 className="text-sm font-semibold text-amber-600">
            Low c (metals)
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Heat up and cool down quickly. Aluminium (~900 J/kg·K), copper (~385
            J/kg·K). That&apos;s why metal feels hot/cold to the touch.
          </p>
        </div>
      </div>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Latent Heat — Q = mL</h3>
      <p className="mb-3">
        During a <strong>phase change</strong>, all added heat goes into
        breaking or forming intermolecular bonds. Temperature remains{" "}
        <strong>constant</strong>
        until the phase change is complete.
      </p>

      <EquationBlock
        equation={{
          id: "heat-latent",
          latex: "Q = mL",
          description: "Latent heat: 'hidden' heat — no temperature change",
          variables: "L_f = 3.34×10⁵ J/kg, L_v = 2.26×10⁶ J/kg for water",
        }}
      />

      <div className="rounded-lg border bg-card p-3 mb-4">
        <h4 className="text-sm font-semibold mb-1">Phase Changes for Water</h4>
        <p className="text-xs text-muted-foreground">
          Solid (ice) ← L_f → Liquid (water) ← L_v → Gas (steam)
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Notice: L_v is ~7× larger than L_f — turning water to steam takes far
          more energy than melting ice. This is why steam burns are so
          dangerous.
        </p>
      </div>

      <h3>Step Solver: Heating Ice to Steam</h3>
      <StepSolver
        problem="Calculate total heat to convert 0.1 kg ice at 0°C to steam at 100°C. (c_water = 4186, L_f = 334,000, L_v = 2,260,000)"
        steps={[
          {
            label: "Melt ice (Q = mL_f)",
            answer: "33400",
            hint: "0.1 × 334,000 = 33,400 J",
          },
          {
            label: "Warm water to 100°C (Q = mcΔT)",
            answer: "41860",
            hint: "0.1 × 4186 × 100 = 41,860 J",
          },
          {
            label: "Vaporise to steam (Q = mL_v)",
            answer: "226000",
            hint: "0.1 × 2,260,000 = 226,000 J",
          },
          {
            label: "Total heat absorbed",
            answer: "301260",
            hint: "33,400 + 41,860 + 226,000 = 301,260 J ≈ 301 kJ",
          },
        ]}
        equation="Q_{total} = mL_f + mc\\Delta T + mL_v"
      />

      <h3>Worked Examples</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "heat-worked-1",
            question:
              "IMAT 2023 Style: Heat to raise 500 g water from 20°C to 100°C.",
            hints: ["Convert 500 g to 0.5 kg.", "ΔT = 80°C.", "Q = mcΔT."],
            solution: "Q = 0.5 × 4186 × 80 = 167,440 J = 167.4 kJ.",
            imatYear: 2023,
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Q = mcΔT (sensible heat — temperature changes)",
          "Q = mL (latent heat — phase change, ΔT = 0)",
          "c_water = 4186 J/kg·K (high — resists temperature change)",
          "L_f = 334 kJ/kg, L_v = 2260 kJ/kg for water",
          "Conduction: touch; Convection: flow; Radiation: EM waves",
          "Dark/matte = good absorber/emitter; shiny = poor",
          "Stefan-Boltzmann: P ∝ T⁴ (doubling T → 16× power)",
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
      id: "heat-q1",
      type: "fill-blank",
      prompt:
        "How much heat (in kJ) is needed to raise 2 kg of water by 10°C? (c_water = 4186 J/kg·K)",
      answer: "83.7",
      explanation: "Q = mcΔT = 2 × 4186 × 10 = 83,720 J = 83.7 kJ.",
      difficulty: "apply",
    },
    {
      id: "heat-q2",
      type: "multiple-choice",
      prompt: "Which heat transfer mechanism does NOT require a medium?",
      options: [
        "Conduction",
        "Convection",
        "Radiation",
        "All require a medium",
      ],
      answer: "Radiation",
      explanation:
        "Radiation transfers energy via electromagnetic waves and can travel through a vacuum. This is how the Sun's energy reaches Earth.",
      difficulty: "recall",
    },
    {
      id: "heat-q3",
      type: "multiple-choice",
      prompt:
        "During a phase change (e.g., ice melting), what happens to the temperature?",
      options: [
        "It increases steadily",
        "It decreases steadily",
        "It remains constant",
        "It increases then decreases",
      ],
      answer: "It remains constant",
      explanation:
        "During a phase change, all added heat goes into breaking intermolecular bonds (latent heat), not increasing kinetic energy. Temperature stays constant until the phase change is complete.",
      difficulty: "recall",
    },
    {
      id: "heat-q4",
      type: "multiple-choice",
      prompt: "Which material has the highest specific heat capacity?",
      options: ["Copper", "Aluminium", "Water", "Glass"],
      answer: "Water",
      explanation:
        "Water's specific heat capacity (4186 J/kg·K) is much higher than metals (Cu ≈ 385, Al ≈ 900) and glass (~840).",
      difficulty: "recall",
    },
    {
      id: "heat-q5",
      type: "fill-blank",
      prompt:
        "How much heat in J is required to melt 0.5 kg of ice at 0°C? (L_f = 334,000 J/kg)",
      answer: "167000",
      explanation: "Q = mL_f = 0.5 × 334,000 = 167,000 J.",
      difficulty: "apply",
    },
    {
      id: "heat-q6",
      type: "multiple-choice",
      prompt:
        "A black object and a white object are placed in direct sunlight. Which absorbs more radiant heat?",
      options: [
        "The black object",
        "The white object",
        "Both absorb equally",
        "It depends on the material",
      ],
      answer: "The black object",
      explanation:
        "Dark/matte surfaces absorb radiation better than light/shiny surfaces. Black objects absorb most wavelengths while white objects reflect them.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["gas-laws", "significant-figures", "si-units", "pressure"],
};

export default heatTransferNote;
