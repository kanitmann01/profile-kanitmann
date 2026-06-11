import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "heat-transfer",
  subject: "physics",
  topic: "thermodynamics",
  title: "Heat Transfer and Specific Heat",
  summary:
    "Heat transfers by three mechanisms: conduction (direct contact), convection (fluid movement), and radiation (electromagnetic waves). The heat required to change temperature is Q = mcΔT, where c is the specific heat capacity.",
  memoryHook:
    "'Conduction = touch (metal spoon in hot soup), Convection = flow (hot air rises, boiling water), Radiation = no contact needed (sun warming Earth).' Q = mcΔT: 'Mass × Capacity × ΔT — More stuff, more stubborn, bigger change = more energy.'",
  imatTrap:
    "Temperature ≠ heat. Temperature measures average kinetic energy; heat is energy TRANSFERRED due to temperature difference. Water has an unusually high specific heat (4186 J/kg·K) — this is why coastal climates are mild and why water is used as a coolant.",
  whyItMatters:
    "Thermoregulation in the human body relies on water's high specific heat and evaporative cooling (sweating). Understanding heat transfer is crucial for hypothermia/hyperthermia management and for understanding metabolic heat production.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Three Mechanisms</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Conduction</strong>: energy transfer through direct molecular
          contact. Rate depends on thermal conductivity, area, temperature
          gradient, and thickness. Metals are good conductors; air and wood are
          insulators.
        </li>
        <li>
          <strong>Convection</strong>: energy transfer by bulk fluid movement.
          Hot fluid rises (lower density), cool fluid sinks → convection
          currents. Natural (driven by buoyancy) vs forced (fan, pump).
        </li>
        <li>
          <strong>Radiation</strong>: energy transfer via electromagnetic waves
          (no medium needed). All objects emit radiation. Rate ∝ T⁴
          (Stefan-Boltzmann law). Dark/matte surfaces absorb and emit better
          than shiny ones.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Specific Heat Capacity</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Q = mcΔT</strong>
        </li>
        <li>
          Q = heat energy (J), m = mass (kg), c = specific heat (J/kg·K), ΔT =
          temperature change (K or °C)
        </li>
        <li>Water: c = 4186 J/kg·K (very high)</li>
        <li>Metals: c ≈ 100–900 J/kg·K (low → heat up quickly)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Latent Heat</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Q = mL</strong> (phase change at constant temperature)
        </li>
        <li>L_fusion (ice → water) = 334,000 J/kg</li>
        <li>L_vaporisation (water → steam) = 2,260,000 J/kg</li>
        <li>
          During phase change, temperature stays constant despite heat input
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "heat-q1",
      type: "fill-blank",
      prompt:
        "How much heat (in kJ) is needed to raise 2 kg of water by 10°C? (c_water = 4186 J/kg·K, give answer to 1 decimal place)",
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
        "Radiation transfers energy via electromagnetic waves and can travel through a vacuum. This is how the Sun's energy reaches Earth through space.",
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
  ],
  crosslinks: ["gas-laws", "significant-figures", "si-units"],
};

export default note;
