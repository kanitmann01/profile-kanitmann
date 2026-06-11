import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "functional-groups",
  subject: "chemistry",
  topic: "organic-chemistry",
  title: "Functional Groups",
  summary:
    "Specific groups of atoms within organic molecules that determine chemical reactivity — alcohols (-OH), aldehydes (-CHO), ketones (C=O), carboxylic acids (-COOH), esters (-COO-), and amines (-NH₂).",
  memoryHook:
    "Alcohol = '-ol' (OH); Aldehyde = '-al' (CHO at end); Ketone = '-one' (C=O in middle); Carboxylic acid = '-oic acid' (COOH); Ester = '-oate' (COO); Amine = '-amine' (NH₂). 'Aldehydes are terminal, ketones are internal.'",
  imatTrap:
    "Carboxylic acids are weak acids (partial dissociation) — don't confuse them with strong mineral acids. Also, esters smell fruity — this is a common IMAT fact. Aldehydes can be oxidised to carboxylic acids, but ketones cannot (no H on the carbonyl carbon).",
  whyItMatters:
    "Functional groups determine the properties and reactions of organic molecules. Biological molecules (amino acids, sugars, fats) are defined by their functional groups. IMAT tests identification and naming.",
  explanation: (
    <div>
      <h3>Key Functional Groups</h3>
      <ul>
        <li>
          <strong>Alcohol (−OH):</strong> suffix −ol. e.g. ethanol (CH₃CH₂OH).
          Polar, hydrogen-bonding, soluble in water (short chains).
        </li>
        <li>
          <strong>Aldehyde (−CHO):</strong> suffix −al. Carbonyl (C=O) at the{" "}
          <em>end</em> of a chain. e.g. ethanal (CH₃CHO). Can be oxidised to
          carboxylic acids.
        </li>
        <li>
          <strong>Ketone (C=O):</strong> suffix −one. Carbonyl in the{" "}
          <em>middle</em> of a chain. e.g. propanone (CH₃COCH₃). Cannot be
          easily oxidised.
        </li>
        <li>
          <strong>Carboxylic acid (−COOH):</strong> suffix −oic acid. e.g.
          ethanoic acid (CH₃COOH). Weak acids, react with bases and alcohols.
        </li>
        <li>
          <strong>Ester (−COO−):</strong> suffix −oate. Formed from acid +
          alcohol (esterification). e.g. ethyl ethanoate (CH₃COOCH₂CH₃). Fruity
          smells.
        </li>
        <li>
          <strong>Amine (−NH₂):</strong> suffix −amine. Derivatives of ammonia.
          Basic (lone pair on N accepts H⁺). e.g. methylamine (CH₃NH₂).
        </li>
      </ul>
      <h3>Key Reactions</h3>
      <ul>
        <li>
          <strong>Esterification:</strong> carboxylic acid + alcohol{" "}
          <span className="font-italic">⇌</span> ester + water (H₂SO₄ catalyst,
          reversible).
        </li>
        <li>
          <strong>Oxidation of alcohols:</strong> primary alcohol → aldehyde →
          carboxylic acid. Secondary alcohol → ketone.
        </li>
        <li>
          <strong>Hydrolysis of esters:</strong> ester + NaOH → carboxylate salt
          + alcohol (saponification).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "func-grp-q1",
      type: "multiple-choice",
      prompt: "Which functional group is present in ethanal (CH₃CHO)?",
      answer: "Aldehyde (−CHO)",
      options: [
        "Alcohol (−OH)",
        "Aldehyde (−CHO)",
        "Ketone (C=O)",
        "Carboxylic acid (−COOH)",
      ],
      explanation:
        "Ethanal has the suffix '-al', indicating an aldehyde. The carbonyl group (C=O) is at the end of the chain: CH₃-CHO.",
      difficulty: "recall",
    },
    {
      id: "func-grp-q2",
      type: "multiple-choice",
      prompt: "What are the products of esterification?",
      answer: "Ester + water",
      options: [
        "Acid + alcohol",
        "Ester + water",
        "Aldehyde + water",
        "Ketone + hydrogen",
      ],
      explanation:
        "Esterification: carboxylic acid + alcohol ⇌ ester + water. It is a condensation reaction (water is released) catalysed by concentrated H₂SO₄.",
      difficulty: "recall",
    },
    {
      id: "func-grp-q3",
      type: "true-false",
      prompt:
        "Ketones can be oxidised to carboxylic acids using acidified dichromate.",
      answer: "False",
      explanation:
        "Ketones cannot be easily oxidised because there is no hydrogen atom on the carbonyl carbon. Aldehydes (which have this H) can be oxidised to carboxylic acids.",
      difficulty: "apply",
    },
  ],
  crosslinks: ["hydrocarbons", "covalent-bonds", "acids-bases-salts"],
  prerequisites: ["hydrocarbons", "covalent-bonds"],
};

export default note;
