import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "pure-substances",
  subject: "chemistry",
  topic: "composition-of-matter",
  title: "Pure Substances",
  summary:
    "Matter with a fixed, definite composition — either elements (one type of atom) or compounds (two or more elements chemically bonded in fixed ratios).",
  memoryHook:
    "Elements = single Lego brick type; Compounds = pre-built Lego set (always same pieces in same ratio). You can't separate a compound by physical means.",
  imatTrap:
    "Water (H₂O) is a compound, NOT a mixture of hydrogen and oxygen. The properties of a compound differ completely from its constituent elements — Na is explosive, Cl₂ is toxic, but NaCl is table salt.",
  whyItMatters:
    "Distinguishing pure substances from mixtures is the foundation of all classification in chemistry. IMAT tests whether you can identify elements vs compounds and predict separation methods.",
  explanation: (
    <div>
      <p>
        <strong>Elements</strong> are the simplest pure substances — they
        consist of only one type of atom and cannot be broken down by chemical
        means. Examples: Fe, O₂, Au.
      </p>
      <p>
        <strong>Compounds</strong> consist of two or more elements chemically
        combined in a fixed ratio. They can only be separated by chemical
        reactions (electrolysis, thermal decomposition). Examples: H₂O, NaCl,
        CO₂.
      </p>
      <h3>Physical vs Chemical Properties</h3>
      <ul>
        <li>
          <strong>Physical properties</strong> — observed without changing
          composition: melting point, boiling point, density, colour,
          conductivity.
        </li>
        <li>
          <strong>Chemical properties</strong> — describe how a substance
          reacts: flammability, reactivity with acid, oxidation state.
        </li>
      </ul>
      <h3>Key Distinctions</h3>
      <ul>
        <li>
          Compounds have a <strong>fixed composition</strong> (law of definite
          proportions) — water is always H₂O.
        </li>
        <li>
          Elements cannot be decomposed into simpler substances by chemical
          reactions.
        </li>
        <li>
          A compound&apos;s properties are entirely different from those of its
          constituent elements.
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "pure-sub-q1",
      type: "multiple-choice",
      prompt: "Which of the following is a compound, not an element?",
      answer: "Carbon dioxide (CO₂)",
      options: [
        "Oxygen (O₂)",
        "Carbon dioxide (CO₂)",
        "Iron (Fe)",
        "Helium (He)",
      ],
      explanation:
        "CO₂ contains two different elements (C and O) chemically bonded — it is a compound. O₂, Fe, and He are all elements.",
      difficulty: "recall",
    },
    {
      id: "pure-sub-q2",
      type: "true-false",
      prompt:
        "A compound can be separated into its elements by physical methods such as filtration or distillation.",
      answer: "False",
      explanation:
        "Compounds require chemical methods (electrolysis, thermal decomposition) to break the bonds between elements. Physical methods only separate mixtures.",
      difficulty: "apply",
    },
    {
      id: "pure-sub-q3",
      type: "multiple-choice",
      prompt:
        "Sodium (Na) is a reactive metal and chlorine (Cl₂) is a toxic gas. What does this tell us about sodium chloride (NaCl)?",
      answer:
        "NaCl has properties different from both Na and Cl₂ — a compound's properties differ from its constituent elements.",
      options: [
        "NaCl should also be a reactive metal",
        "NaCl should be a toxic gas",
        "NaCl has properties different from both Na and Cl₂",
        "NaCl is a mixture, not a compound",
      ],
      explanation:
        "When elements form a compound, the resulting substance has entirely new properties unlike either element.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["mixtures-separation", "atomic-models", "ionic-bonds"],
  prerequisites: [],
};

export default note;
