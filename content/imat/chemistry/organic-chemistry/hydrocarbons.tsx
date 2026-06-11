import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "hydrocarbons",
  subject: "chemistry",
  topic: "organic-chemistry",
  title: "Hydrocarbons",
  summary:
    "Organic compounds containing only carbon and hydrogen — alkanes (C-C single bonds), alkenes (C=C), and alkynes (C≡C). Naming follows IUPAC rules based on chain length and functional groups.",
  memoryHook:
    "AlkANES = 'single' (all single bonds, CₙH₂ₙ₊₂). AlkENES = 'double' (at least one C=C, CₙH₂ₙ). AlkYNES = 'triple' (at least one C≡C, CₙH₂ₙ₋₂). 'Meth- Eth- Prop- But- Pent- Hex- Hept- Oct- Non- Dec-' = 1-10 carbons.",
  imatTrap:
    "Isomers have the SAME molecular formula but DIFFERENT structural arrangements. Butane (C₄H₁₀) has 2 structural isomers: n-butane and isobutane. Don't confuse structural isomers with stereoisomers at this level.",
  whyItMatters:
    "Hydrocarbons are the backbone of organic chemistry and fuel science. Understanding nomenclature lets you name any organic molecule. IMAT tests IUPAC naming and isomer identification.",
  explanation: (
    <div>
      <h3>Types of Hydrocarbons</h3>
      <ul>
        <li>
          <strong>Alkanes:</strong> CₙH₂ₙ₊₂ — saturated (only C-C single bonds).
          Relatively unreactive. Combustion: CₙH₂ₙ₊₂ + O₂ → CO₂ + H₂O.
        </li>
        <li>
          <strong>Alkenes:</strong> CₙH₂ₙ — unsaturated (contain C=C double
          bond). More reactive — undergo addition reactions (with H₂, Br₂, H₂O).
        </li>
        <li>
          <strong>Alkynes:</strong> CₙH₂ₙ₋₂ — unsaturated (contain C≡C triple
          bond). Most reactive of the three.
        </li>
      </ul>
      <h3>IUPAC Nomenclature</h3>
      <ol>
        <li>
          Find the longest carbon chain → root name (meth-, eth-, prop-…).
        </li>
        <li>
          Identify the functional group suffix: -ane (alkane), -ene (alkene),
          -yne (alkyne).
        </li>
        <li>
          Number the chain to give the lowest locant to the functional group.
        </li>
        <li>
          Name and number substituents (branches) as prefixes: methyl, ethyl,
          chloro…
        </li>
      </ol>
      <p>Example: CH₃CH(CH₃)CH₂CH₃ = 2-methylbutane</p>
      <h3>Isomerism</h3>
      <p>
        <strong>Structural (constitutional) isomers</strong> have the same
        molecular formula but different connectivity of atoms.
      </p>
      <ul>
        <li>C₄H₁₀: n-butane (CH₃CH₂CH₂CH₃) and isobutane (CH₃CH(CH₃)CH₃)</li>
        <li>C₂H₆O: ethanol (CH₃CH₂OH) and dimethyl ether (CH₃OCH₃)</li>
      </ul>
      <h3>Reactions of Hydrocarbons</h3>
      <ul>
        <li>
          <strong>Combustion:</strong> all hydrocarbons burn in O₂ to give CO₂ +
          H₂O.
        </li>
        <li>
          <strong>Addition (alkenes/alkynes):</strong> Br₂ adds across C=C →
          decolourises bromine water (test for unsaturation).
        </li>
        <li>
          <strong>Substitution (alkanes):</strong> halogenation with UV light
          (free radical mechanism).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "hydro-q1",
      type: "multiple-choice",
      prompt: "What is the IUPAC name of CH₃CH₂CH=CH₂?",
      answer: "But-1-ene",
      options: ["But-1-ene", "But-2-ene", "Propene", "Pent-1-ene"],
      explanation:
        "The longest chain has 4 carbons (but-). There is a C=C double bond at position 1 (number from the end nearest the double bond). Suffix = -ene → but-1-ene.",
      difficulty: "apply",
    },
    {
      id: "hydro-q2",
      type: "multiple-choice",
      prompt: "Which reagent can distinguish between an alkane and an alkene?",
      answer:
        "Bromine water (Br₂) — decolourises with alkenes but not alkanes.",
      options: [
        "Hydrochloric acid",
        "Bromine water (Br₂) — decolourises with alkenes but not alkanes",
        "Sodium hydroxide",
        "Distilled water",
      ],
      explanation:
        "Alkenes undergo addition with Br₂, decolourising the orange-brown bromine water. Alkanes do not react with bromine water under normal conditions.",
      difficulty: "recall",
    },
    {
      id: "hydro-q3",
      type: "fill-blank",
      prompt: "The general formula for alkanes is CₙH______.",
      answer: "2n+2",
      explanation:
        "Alkanes are saturated hydrocarbons with only single bonds. Their general formula is CₙH₂ₙ₊₂ — e.g. methane CH₄ (n=1), ethane C₂H₆ (n=2).",
      difficulty: "recall",
    },
  ],
  crosslinks: ["functional-groups", "covalent-bonds", "mole-calculations"],
  prerequisites: ["covalent-bonds"],
};

export default note;
