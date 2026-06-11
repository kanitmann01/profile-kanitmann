import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "hess-law",
  subject: "chemistry",
  topic: "thermochemistry",
  title: "Hess's Law",
  summary:
    "The total enthalpy change for a reaction is independent of the route taken — it depends only on the initial and final states, because enthalpy is a state function.",
  memoryHook:
    "'Hess = Height' — like hiking a mountain: whether you take the direct trail or a winding path, the change in altitude (ΔH) is the same. ΔH_total = ΔH₁ + ΔH₂ + ΔH₃…",
  imatTrap:
    "When reversing a reaction, FLIP the sign of ΔH. When multiplying a reaction by a factor, MULTIPLY ΔH by the same factor. These are the two most common errors in Hess's law calculations.",
  whyItMatters:
    "Hess's law lets you calculate ΔH for reactions that can't be measured directly (too slow, dangerous side reactions). IMAT tests enthalpy cycle calculations and formation/combustion data.",
  explanation: (
    <div>
      <h3>The Principle</h3>
      <p>
        Enthalpy is a <strong>state function</strong> — ΔH depends only on the
        initial and final states, not on the path taken.
      </p>
      <p>
        If A → B can occur directly or via intermediate steps (A → C → B), then:
      </p>
      <p>
        <strong>ΔH(A→B) = ΔH(A→C) + ΔH(C→B)</strong>
      </p>
      <h3>Rules for Manipulating Equations</h3>
      <ul>
        <li>
          <strong>Reverse a reaction:</strong> flip the sign of ΔH.
          <br />
          If A → B has ΔH = +100 kJ, then B → A has ΔH = −100 kJ.
        </li>
        <li>
          <strong>Multiply coefficients:</strong> multiply ΔH by the same
          factor.
          <br />
          If 2A → B has ΔH = +100 kJ, then 4A → 2B has ΔH = +200 kJ.
        </li>
        <li>
          <strong>Add reactions:</strong> add their ΔH values to get the overall
          ΔH.
        </li>
      </ul>
      <h3>Using Standard Enthalpies</h3>
      <p>
        <strong>From formation data:</strong>
      </p>
      <p>ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants)</p>
      <p>
        <strong>From combustion data:</strong>
      </p>
      <p>ΔH°rxn = ΣΔH°c(reactants) − ΣΔH°c(products)</p>
      <p>
        Note the reversal: formation uses products − reactants; combustion uses
        reactants − products.
      </p>
      <h3>Worked Example</h3>
      <p>Find ΔH for: C(s) + 2H₂(g) → CH₄(g)</p>
      <p>Given:</p>
      <ul>
        <li>C + O₂ → CO₂, ΔH = −393 kJ</li>
        <li>H₂ + ½O₂ → H₂O, ΔH = −286 kJ</li>
        <li>CH₄ + 2O₂ → CO₂ + 2H₂O, ΔH = −890 kJ</li>
      </ul>
      <p>
        ΔH = (−393) + 2(−286) − (−890) = −393 − 572 + 890 ={" "}
        <strong>−75 kJ/mol</strong>
      </p>
    </div>
  ),
  questions: [
    {
      id: "hess-q1",
      type: "multiple-choice",
      prompt: "If A → B has ΔH = +50 kJ, what is ΔH for 2B → 2A?",
      answer: "−100 kJ",
      options: ["+50 kJ", "−50 kJ", "+100 kJ", "−100 kJ"],
      explanation:
        "Reversing A → B gives B → A with ΔH = −50 kJ. Multiplying by 2 gives 2B → 2A with ΔH = 2 × (−50) = −100 kJ.",
      difficulty: "apply",
    },
    {
      id: "hess-q2",
      type: "multiple-choice",
      prompt: "Using enthalpies of formation, how do you calculate ΔH°rxn?",
      answer: "ΣΔH°f(products) − ΣΔH°f(reactants)",
      options: [
        "ΣΔH°f(reactants) − ΣΔH°f(products)",
        "ΣΔH°f(products) − ΣΔH°f(reactants)",
        "ΣΔH°f(products) + ΣΔH°f(reactants)",
        "ΣΔH°c(reactants) − ΣΔH°c(products)",
      ],
      explanation:
        "With formation data: ΔH°rxn = ΣΔH°f(products) − ΣΔH°f(reactants). This is because formation enthalpies are defined from elements in standard states.",
      difficulty: "recall",
    },
    {
      id: "hess-q3",
      type: "true-false",
      prompt:
        "Hess's law works because enthalpy is a state function — it depends only on initial and final states, not the path taken.",
      answer: "True",
      explanation:
        "Enthalpy is a state function, meaning ΔH is path-independent. This is the fundamental reason Hess's law works — you can add any series of steps to find the overall enthalpy change.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["enthalpy", "balancing-equations", "mole-calculations"],
  prerequisites: ["enthalpy"],
};

export default note;
