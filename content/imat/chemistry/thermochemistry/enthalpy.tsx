import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "enthalpy",
  subject: "chemistry",
  topic: "thermochemistry",
  title: "Enthalpy & Calorimetry",
  summary:
    "Enthalpy (H) is the heat content of a system at constant pressure. Exothermic reactions release heat (ΔH < 0); endothermic reactions absorb heat (ΔH > 0).",
  memoryHook:
    "Exothermic = 'exit' (heat EXITS the system, ΔH negative, feels hot). Endothermic = 'enter' (heat ENTERS the system, ΔH positive, feels cold). 'EXO = EXits, ENDO = ENters.'",
  imatTrap:
    "ΔH is negative for exothermic, positive for endothermic — don't mix up the sign. Also, bond BREAKING is endothermic (requires energy), bond MAKING is exothermic (releases energy). ΔH = Σ(bonds broken) − Σ(bonds formed).",
  whyItMatters:
    "Enthalpy changes determine whether reactions are energetically favourable. IMAT tests calorimetry calculations (q = mcΔT), bond enthalpy, and interpreting energy profile diagrams.",
  explanation: (
    <div>
      <h3>Enthalpy Change (ΔH)</h3>
      <p>The heat energy change at constant pressure. Measured in kJ/mol.</p>
      <ul>
        <li>
          <strong>Exothermic (ΔH &lt; 0):</strong> products have less energy
          than reactants. Heat is released. e.g. combustion, neutralisation.
        </li>
        <li>
          <strong>Endothermic (ΔH &gt; 0):</strong> products have more energy
          than reactants. Heat is absorbed. e.g. thermal decomposition,
          photosynthesis.
        </li>
      </ul>
      <h3>Calorimetry</h3>
      <p>Experimental measurement of heat changes using:</p>
      <p>
        <strong>q = mcΔT</strong>
      </p>
      <ul>
        <li>q = heat energy (J)</li>
        <li>m = mass of water/solution (g)</li>
        <li>c = specific heat capacity (4.18 J/g°C for water)</li>
        <li>ΔT = temperature change (°C)</li>
      </ul>
      <p>
        Then: ΔH = −q ÷ n (where n = moles of reactant). Negative sign for
        exothermic (temperature rises).
      </p>
      <h3>Bond Enthalpy</h3>
      <p>
        Energy required to break one mole of a specific bond in gaseous
        molecules.
      </p>
      <p>
        <strong>
          ΔH = Σ(bond enthalpies broken) − Σ(bond enthalpies formed)
        </strong>
      </p>
      <ul>
        <li>Breaking bonds = endothermic (+)</li>
        <li>Making bonds = exothermic (−)</li>
      </ul>
      <h3>Standard Conditions</h3>
      <p>
        ΔH° is measured at: 298 K (25°C), 100 kPa (1 atm), 1 mol/dm³ for
        solutions.
      </p>
    </div>
  ),
  questions: [
    {
      id: "enthalpy-q1",
      type: "multiple-choice",
      prompt:
        "In a calorimetry experiment, 50 g of water increases in temperature by 10°C. What is the heat energy absorbed? (c = 4.18 J/g°C)",
      answer: "2090 J",
      options: ["418 J", "2090 J", "4180 J", "209 J"],
      explanation: "q = mcΔT = 50 × 4.18 × 10 = 2090 J = 2.09 kJ.",
      difficulty: "apply",
    },
    {
      id: "enthalpy-q2",
      type: "true-false",
      prompt: "Bond breaking is an exothermic process.",
      answer: "False",
      explanation:
        "Bond breaking requires energy input — it is endothermic. Bond making releases energy — it is exothermic. A reaction is exothermic overall when more energy is released in making bonds than is used in breaking them.",
      difficulty: "recall",
    },
    {
      id: "enthalpy-q3",
      type: "multiple-choice",
      prompt:
        "A reaction has a temperature increase in the surrounding water. What type of reaction is this?",
      answer: "Exothermic (ΔH < 0)",
      options: [
        "Endothermic (ΔH > 0)",
        "Exothermic (ΔH < 0)",
        "Neither — temperature changes are unrelated to enthalpy",
        "Isothermic (ΔH = 0)",
      ],
      explanation:
        "If the surrounding water heats up, the reaction released heat — it is exothermic with ΔH < 0. The system lost energy to the surroundings.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["hess-law", "balancing-equations", "mole-calculations"],
  prerequisites: ["mole-calculations", "balancing-equations"],
};

export default note;
