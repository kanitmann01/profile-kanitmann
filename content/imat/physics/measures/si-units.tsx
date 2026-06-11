import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "si-units",
  subject: "physics",
  topic: "measures",
  title: "SI Units and Unit Conversions",
  summary:
    "The International System of Units defines 7 base units (m, kg, s, A, K, mol, cd) from which all derived units are built. Mastery of unit conversion and dimensional analysis is essential for every IMAT physics calculation.",
  memoryHook:
    "Base units mnemonic: 'Monkeys Keep Chasing Adequately Slim Gorillas' → Metre, Kilogram, Kelvin, Coulomb (A·s), Ampere, Second, Mole. Derived units: N = kg·m/s², J = N·m, W = J/s, Pa = N/m², V = J/C.",
  imatTrap:
    "IMAT loves tricky conversions: 1 nm = 10⁻⁹ m (not 10⁻⁶), 1 mL = 1 cm³ = 10⁻⁶ m³, 1 eV = 1.6 × 10⁻¹⁹ J. Always convert to SI base units before plugging into formulas. Confusing mass (kg) with weight (N) is a classic error.",
  whyItMatters:
    "Unit errors cause real disasters — NASA lost a $125M Mars orbiter because one team used pounds-force while another used newtons. In medicine, wrong unit conversions can lead to 10× dosing errors.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">7 SI Base Units</h3>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Quantity</th>
            <th className="text-left p-2">Unit</th>
            <th className="text-left p-2">Symbol</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Length", "metre", "m"],
            ["Mass", "kilogram", "kg"],
            ["Time", "second", "s"],
            ["Electric current", "ampere", "A"],
            ["Temperature", "kelvin", "K"],
            ["Amount of substance", "mole", "mol"],
            ["Luminous intensity", "candela", "cd"],
          ].map(([q, u, s]) => (
            <tr key={s} className="border-b">
              <td className="p-2">{q}</td>
              <td className="p-2">{u}</td>
              <td className="p-2 font-mono">{s}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-lg font-semibold mt-4">Common Derived Units</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Force</strong>: Newton (N) = kg·m·s⁻²
        </li>
        <li>
          <strong>Energy</strong>: Joule (J) = N·m = kg·m²·s⁻²
        </li>
        <li>
          <strong>Power</strong>: Watt (W) = J/s = kg·m²·s⁻³
        </li>
        <li>
          <strong>Pressure</strong>: Pascal (Pa) = N/m² = kg·m⁻¹·s⁻²
        </li>
        <li>
          <strong>Frequency</strong>: Hertz (Hz) = s⁻¹
        </li>
        <li>
          <strong>Voltage</strong>: Volt (V) = J/C = kg·m²·s⁻³·A⁻¹
        </li>
        <li>
          <strong>Charge</strong>: Coulomb (C) = A·s
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">SI Prefixes</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>tera (T) = 10¹², giga (G) = 10⁹, mega (M) = 10⁶, kilo (k) = 10³</li>
        <li>
          milli (m) = 10⁻³, micro (μ) = 10⁻⁶, nano (n) = 10⁻⁹, pico (p) = 10⁻¹²
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Dimensional Analysis</h3>
      <p>
        Every equation must be dimensionally consistent. Check both sides have
        the same base unit combination. Example: kinetic energy ½mv² → kg·(m/s)²
        = kg·m²·s⁻² = J ✓
      </p>
    </div>
  ),
  questions: [
    {
      id: "si-units-q1",
      type: "multiple-choice",
      prompt: "Which of the following is NOT an SI base unit?",
      options: ["Ampere", "Kelvin", "Newton", "Mole"],
      answer: "Newton",
      explanation:
        "The Newton is a derived unit (kg·m·s⁻²). The 7 SI base units are m, kg, s, A, K, mol, and cd.",
      difficulty: "recall",
    },
    {
      id: "si-units-q2",
      type: "fill-blank",
      prompt: "Convert 3.5 km/h to m/s. Give your answer to 2 decimal places.",
      answer: "0.97",
      explanation:
        "3.5 km/h × (1000 m / 1 km) × (1 h / 3600 s) = 3500/3600 = 0.97 m/s.",
      difficulty: "apply",
    },
    {
      id: "si-units-q3",
      type: "multiple-choice",
      prompt: "What are the SI base units of energy?",
      options: ["kg·m·s⁻¹", "kg·m²·s⁻²", "kg·m⁻¹·s⁻²", "kg·m²·s⁻³"],
      answer: "kg·m²·s⁻²",
      explanation:
        "Energy (Joule) = kg·m²·s⁻². Option A is momentum, C is pressure, D is power.",
      difficulty: "apply",
    },
  ],
  crosslinks: [
    "significant-figures",
    "pressure",
    "newton-laws",
    "coulombs-law",
  ],
};

export default note;
