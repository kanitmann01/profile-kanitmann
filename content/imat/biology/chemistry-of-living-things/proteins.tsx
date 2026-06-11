"use client";

import type { AtomicNote } from "@/data/imat/types";
import { EquationBlock } from "@/components/imat/equation-block";
import { WorkedExampleCard } from "@/components/imat/worked-example-card";
import { QuickFire } from "@/components/imat/interactive/quick-fire";

const recallQuestions = [
  {
    id: "qf-1",
    question: "What type of bond links amino acids in a polypeptide chain?",
    answer: "Peptide bond (covalent bond between carboxyl and amino groups)",
    context: "Formed by condensation",
  },
  {
    id: "qf-2",
    question: "What are the four levels of protein structure?",
    answer: "Primary, secondary, tertiary, quaternary",
    context: "From sequence to complex",
  },
  {
    id: "qf-3",
    question: "What type of bonds stabilise alpha helices and beta sheets?",
    answer: "Hydrogen bonds between backbone NH and CO groups",
    context: "Secondary structure",
  },
];

export const proteinsNote: AtomicNote = {
  slug: "proteins",
  subject: "biology",
  topic: "chemistry-of-living-things",
  title: "Proteins",
  summary:
    "Polymers of amino acids (20 standard) linked by peptide bonds. Proteins are the most diverse biomolecules, functioning as enzymes, structural components, transporters, antibodies, signalling molecules, and more. Structure determines function.",
  memoryHook:
    "Amino acid = amino group (NH₂) + carboxyl group (COOH) + R group (variable) — all attached to the central α-carbon. Peptide bond = COOH of one + NH₂ of another = CONH + H₂O.",
  imatTrap:
    "Peptide bonds are formed by condensation reactions between the carboxyl group (−COOH) of one amino acid and the amino group (−NH₂) of another — NOT between two amino groups or between R groups. Also: protein denaturation disrupts 2°, 3°, and 4° structure but NOT 1° structure (the sequence stays intact). Disulfide bridges (covalent) are NOT broken by denaturation with heat or mild pH changes.",
  whyItMatters:
    "Misfolded proteins cause diseases: Alzheimer's (β-amyloid plaques), Parkinson's (α-synuclein aggregates), and prion diseases (Creutzfeldt-Jakob). Understanding protein structure enables rational drug design, antibody engineering, and the development of protein-based therapeutics (insulin, growth factors).",
  imatPatterns: [
    {
      years: [2022, 2023, 2024],
      frequency: "high",
      notes: "Levels of protein structure",
    },
    {
      years: [2021, 2023],
      frequency: "medium",
      notes: "Peptide bond formation (condensation)",
    },
    {
      years: [2020, 2022, 2024],
      frequency: "high",
      notes: "Denaturation and what it affects",
    },
  ],
  equations: [
    {
      id: "protein-peptide",
      latex:
        "H_2N\\text{-}CHR\\text{-}COOH + H_2N\\text{-}CHR'\\text{-}COOH \\longrightarrow H_2N\\text{-}CHR\\text{-}CONH\\text{-}CHR'\\text{-}COOH + H_2O",
      description:
        "Peptide bond formation between two amino acids (condensation)",
    },
    {
      id: "protein-hydrolysis",
      latex:
        "\\text{Polypeptide} + n\\ H_2O \\longrightarrow n\\ \\text{Amino acids}",
      description: "Protein digestion: hydrolysis of peptide bonds",
    },
    {
      id: "protein-isoelectric",
      latex:
        "pH(I) = \\text{p}K_a(\\text{NH}_3^+) + \\text{p}K_a(\\text{COOH})",
      description: "Isoelectric point (pI) — pH where net charge = 0",
    },
    {
      id: "protein-disulfide",
      latex:
        "2\\ \\text{Cysteine} \\xrightarrow{\\text{oxidation}} \\text{Cystine} \\ (\\text{-S-S-}) + 2\\ H^+ + 2\\ e^-",
      description: "Disulfide bridge formation between cysteine residues",
    },
  ],
  workedExamples: [
    {
      id: "protein-worked-1",
      question:
        "A protein is boiled in strong acid for 24 hours. After this treatment, what level(s) of structure remain intact? Explain your reasoning.",
      hints: [
        "What is the difference between 1°, 2°, 3°, and 4° structure?",
        "What type of bonds hold each level together?",
        "Which bonds are covalent and which are non-covalent?",
      ],
      solution:
        "Strong acid and prolonged boiling hydrolyse peptide bonds (covalent). Since peptide bonds ARE the primary structure, even the 1° structure is destroyed. All levels of structure are lost. Contrast with mild denaturation (heat alone): only non-covalent interactions (2°, 3°, 4°) are disrupted. The difference between denaturation (mild, reversible sometimes) and hydrolysis (harsh, irreversible) is a common IMAT distinction.",
      imatYear: 2022,
    },
  ],
  externalResources: [
    {
      title: "Khan Academy — Proteins",
      url: "https://www.khanacademy.org/science/biology/macromolecules/proteins-and-amino-acids/a/introduction-to-proteins-and-amino-acids",
      type: "article",
      description: "Amino acid structure and protein levels",
    },
    {
      title: "OpenStax Biology 2e — Proteins",
      url: "https://openstax.org/books/biology-2e/pages/3-4-proteins",
      type: "textbook",
      description: "Free textbook chapter on protein structure and function",
    },
    {
      title: "IMAT Buddy — Biomolecules Questions",
      url: "https://www.imatbuddy.com/imat-science-question-banks/",
      type: "practice",
      description: "IMAT-style questions on proteins and amino acids",
    },
  ],
  highYieldPoints: [
    "20 standard amino acids — each has a unique R group (side chain)",
    "Peptide bond: covalent C-N bond formed by condensation (−H₂O)",
    "Primary: linear amino acid sequence (peptide bonds)",
    "Secondary: α-helices and β-sheets (H-bonds between backbone atoms)",
    "Tertiary: overall 3D shape (H-bonds, ionic, hydrophobic, disulfide bridges)",
    "Quaternary: multiple polypeptide subunits (e.g., haemoglobin = 4 subunits)",
    "Denaturation: disrupts 2°–4° (not 1° unless hydrolysed) — loss of function",
  ],
  explanation: (
    <div>
      <p>
        <strong>Proteins</strong> are polymers of <strong>amino acids</strong>
        linked by <strong>peptide bonds</strong>. There are 20 standard amino
        acids, each consisting of a central α-carbon bonded to an amino group
        (−NH₂), a carboxyl group (−COOH), a hydrogen atom, and a variable R
        group (side chain). The R group determines the amino acid&apos;s
        chemical properties.
      </p>

      <h3>Peptide Bond Formation</h3>
      <p>
        A <strong>condensation reaction</strong> joins the carboxyl group of one
        amino acid to the amino group of another, releasing H₂O and forming a
        covalent C-N bond (peptide bond). Short chains are called{" "}
        <strong>peptides</strong>
        (&lt;50 residues), longer ones are <strong>polypeptides</strong> or
        proteins.
      </p>

      <EquationBlock
        equation={{
          id: "protein-peptide",
          latex:
            "H_2N\\text{-}CHR\\text{-}COOH + H_2N\\text{-}CHR'\\text{-}COOH \\longrightarrow H_2N\\text{-}CHR\\text{-}CONH\\text{-}CHR'\\text{-}COOH + H_2O",
          description: "Peptide bond formation",
        }}
      />

      <QuickFire questions={recallQuestions.slice(0, 1)} title="Quick Check" />

      <h3>Four Levels of Protein Structure</h3>

      <h4>Primary Structure</h4>
      <p>
        The linear sequence of amino acids. Dictated by the genetic code (DNA
        sequence). Any change = mutation. Example: sickle cell disease = one
        amino acid substitution (Glu → Val at position 6 of β-globin).
      </p>

      <h4>Secondary Structure</h4>
      <p>
        Local folding patterns stabilised by <strong>hydrogen bonds</strong>
        between backbone −NH and −C=O groups. Two common motifs:
        <strong>α-helix</strong> (right-handed coil, 3.6 residues/turn) and{" "}
        <strong>β-pleated sheet</strong> (parallel or antiparallel strands).
      </p>

      <h4>Tertiary Structure</h4>
      <p>The overall 3D conformation of a single polypeptide, stabilised by:</p>
      <ul>
        <li>Hydrophobic interactions (non-polar R groups cluster interior)</li>
        <li>Hydrogen bonds (between R groups)</li>
        <li>Ionic bonds (electrostatic attractions)</li>
        <li>Disulfide bridges (covalent −S−S− between cysteines)</li>
      </ul>

      <h4>Quaternary Structure</h4>
      <p>
        Assembly of multiple polypeptide subunits into a functional complex.
        Example: haemoglobin = 2 α-globin + 2 β-globin subunits. The bonds are
        the same types as tertiary (non-covalent + disulfide).
      </p>

      <QuickFire
        questions={recallQuestions.slice(1, 2)}
        title="Check Understanding"
      />

      <h3>Denaturation</h3>
      <p>
        Denaturation is the <strong>loss of 3D structure</strong> (2°, 3°, 4°)
        without breaking the primary sequence. Caused by heat, extreme pH, or
        chemicals (urea, SDS). Usually <strong>irreversible</strong>. Loss of
        structure → loss of function. Hydrolysis (e.g., boiling in strong acid)
        breaks peptide bonds → destroys 1° structure.
      </p>

      <h3>Worked Example</h3>
      <div className="grid gap-4">
        <WorkedExampleCard
          example={{
            id: "protein-worked-1",
            question:
              "A protein is boiled in strong acid for 24 hours. After this treatment, what level(s) of structure remain intact? Explain your reasoning.",
            hints: [
              "What is the difference between 1°, 2°, 3°, and 4° structure?",
              "What type of bonds hold each level together?",
              "Which bonds are covalent and which are non-covalent?",
            ],
            solution:
              "Strong acid and prolonged boiling hydrolyse peptide bonds (covalent). Since peptide bonds ARE the primary structure, even the 1° structure is destroyed. All levels of structure are lost. Contrast with mild denaturation (heat alone): only non-covalent interactions (2°, 3°, 4°) are disrupted.",
          }}
        />
      </div>

      <h3>High-Yield Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {[
          "Amino acids: α-carbon + NH₂ + COOH + R group",
          "Peptide bond: COOH + NH₂ → CONH + H₂O",
          "1°: sequence (peptide bonds)",
          "2°: α-helix, β-sheet (backbone H-bonds)",
          "3°: 3D folding (R-group interactions)",
          "4°: multiple subunits",
          "Denaturation: loses 2°–4°, not 1° (unless hydrolysed)",
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
      id: "proteins-q1",
      type: "multiple-choice",
      prompt: "What type of reaction forms a peptide bond?",
      answer: "Condensation (releasing H₂O)",
      difficulty: "recall",
      options: [
        "Hydrolysis",
        "Condensation (releasing H₂O)",
        "Oxidation",
        "Reduction",
      ],
    },
    {
      id: "proteins-q2",
      type: "multiple-choice",
      prompt:
        "Which level of protein structure is determined solely by hydrogen bonds between backbone atoms?",
      answer: "Secondary structure",
      difficulty: "recall",
      options: ["Primary", "Secondary", "Tertiary", "Quaternary"],
    },
    {
      id: "proteins-q3",
      type: "multiple-choice",
      prompt: "What type of bond links two cysteine residues in a protein?",
      answer: "Disulfide bridge",
      difficulty: "recall",
      options: [
        "Hydrogen bond",
        "Ionic bond",
        "Disulfide bridge",
        "Peptide bond",
      ],
    },
    {
      id: "proteins-q4",
      type: "multiple-choice",
      prompt: "Which of the following does NOT disrupt tertiary structure?",
      answer: "Breaking peptide bonds",
      difficulty: "apply",
      options: [
        "Heat denaturation",
        "pH change",
        "Breaking peptide bonds",
        "Adding urea",
      ],
    },
    {
      id: "proteins-q5",
      type: "multiple-choice",
      prompt: "Haemoglobin has four polypeptide chains. This is an example of:",
      answer: "Quaternary structure",
      difficulty: "apply",
      options: [
        "Primary structure",
        "Secondary structure",
        "Tertiary structure",
        "Quaternary structure",
      ],
      imatYear: 2022,
    },
    {
      id: "proteins-q6",
      type: "explain-why",
      prompt:
        "Explain why frying an egg changes it from liquid to solid (denaturation) but does not alter its nutritional value in terms of amino acid content.",
      answer:
        "Heat denatures the proteins: it disrupts hydrogen bonds, ionic bonds, and hydrophobic interactions that maintain 2°, 3°, and 4° structure. The egg white solidifies because denatured proteins aggregate. However, peptide bonds (1° structure) remain intact — all amino acids are still present. Digestion will hydrolyse the peptide bonds to release the same amino acids as before.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["nucleic-acids", "enzymes", "weak-interactions", "genetic-code"],
  prerequisites: ["nucleic-acids"],
};
