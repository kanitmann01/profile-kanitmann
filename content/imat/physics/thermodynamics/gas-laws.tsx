import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "gas-laws",
  subject: "physics",
  topic: "thermodynamics",
  title: "Gas Laws and the Ideal Gas Equation",
  summary:
    "Gas behaviour is described by Boyle's law (P ∝ 1/V at constant T), Charles's law (V ∝ T at constant P), and the combined ideal gas law PV = nRT. These laws relate pressure, volume, temperature, and amount of gas.",
  memoryHook:
    "'Boyle: squeeze it (↑P), it shrinks (↓V) — P₁V₁ = P₂V₂.' 'Charles: heat it (↑T), it expands (↑V) — V₁/T₁ = V₂/T₂.' 'Ideal: PV = nRT — the master equation.' CRITICAL: Temperature must be in Kelvin (K = °C + 273.15).",
  imatTrap:
    "ALWAYS convert Celsius to Kelvin before using gas laws. 0°C = 273.15 K, NOT 0 K. Also: the laws assume ideal behaviour (no intermolecular forces, negligible molecular volume). Real gases deviate at high P and low T.",
  whyItMatters:
    "Gas laws explain breathing (Boyle's law: diaphragm expands lungs → ↓P → air flows in), syringe operation, tyre pressure changes with temperature, and decompression sickness in divers (dissolved N₂ bubbles on ascent).",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Boyle's Law (constant T)</h3>
      <p className="font-mono text-center py-1">P₁V₁ = P₂V₂</p>
      <p>
        At constant temperature, pressure and volume are inversely proportional.
        Double the pressure → halve the volume.
      </p>

      <h3 className="text-lg font-semibold mt-4">Charles's Law (constant P)</h3>
      <p className="font-mono text-center py-1">V₁/T₁ = V₂/T₂</p>
      <p>
        At constant pressure, volume is directly proportional to absolute
        temperature (Kelvin). Double the Kelvin temperature → double the volume.
      </p>

      <h3 className="text-lg font-semibold mt-4">
        Gay-Lussac's Law (constant V)
      </h3>
      <p className="font-mono text-center py-1">P₁/T₁ = P₂/T₂</p>
      <p>
        At constant volume, pressure is directly proportional to absolute
        temperature.
      </p>

      <h3 className="text-lg font-semibold mt-4">Ideal Gas Law</h3>
      <p className="font-mono text-center py-1">PV = nRT</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>P = pressure (Pa), V = volume (m³), n = moles (mol)</li>
        <li>R = 8.314 J/(mol·K), T = temperature (K)</li>
        <li>Combines all three simple gas laws</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">STP Conditions</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Standard Temperature and Pressure: T = 273.15 K (0°C), P = 1 atm
          (101,325 Pa)
        </li>
        <li>1 mole of ideal gas at STP occupies 22.4 L</li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "gaslaws-q1",
      type: "fill-blank",
      prompt:
        "A gas at 2 atm occupies 5 L. If the pressure is increased to 10 atm at constant temperature, what is the new volume in L?",
      answer: "1",
      explanation: "Boyle's law: P₁V₁ = P₂V₂ → 2 × 5 = 10 × V₂ → V₂ = 1 L.",
      difficulty: "apply",
    },
    {
      id: "gaslaws-q2",
      type: "multiple-choice",
      prompt:
        "A gas at 27°C is heated to 327°C at constant pressure. By what factor does its volume change?",
      options: [
        "Increases by factor of 2",
        "Increases by factor of 12.1",
        "Decreases by factor of 2",
        "Stays the same",
      ],
      answer: "Increases by factor of 2",
      explanation:
        "Charles's law: V₁/T₁ = V₂/T₂. Convert to Kelvin: T₁ = 300 K, T₂ = 600 K. V₂/V₁ = T₂/T₁ = 600/300 = 2.",
      difficulty: "apply",
    },
    {
      id: "gaslaws-q3",
      type: "multiple-choice",
      prompt: "Which condition must be met when using the gas laws?",
      options: [
        "Pressure must be in atm",
        "Volume must be in litres",
        "Temperature must be in Kelvin",
        "The gas must be ideal",
      ],
      answer: "Temperature must be in Kelvin",
      explanation:
        "All gas law calculations require absolute temperature (Kelvin). Using Celsius gives wrong answers because 0°C ≠ zero thermal energy. Pressure and volume units can vary as long as they're consistent.",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "heat-transfer",
    "pressure",
    "archimedes",
    "significant-figures",
  ],
};

export default note;
