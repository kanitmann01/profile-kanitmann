import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "prokaryotes-vs-eukaryotes",
  subject: "biology",
  topic: "cell-biology",
  title: "Prokaryotes vs Eukaryotes",
  summary:
    "Prokaryotes (bacteria, archaea) lack a nucleus and membrane-bound organelles, have circular DNA, and are smaller. Eukaryotes (animals, plants, fungi, protists) have a nucleus, membrane-bound organelles, and linear DNA.",
  memoryHook:
    "'Pro-KARYOTE = Pro (before) KARYON (nucleus)' — no nucleus. 'EU (true) KARYOTE = true nucleus.' Prokaryotes are like a studio flat (everything in one room); eukaryotes are like a mansion with separate rooms (organelles).",
  imatTrap:
    "Prokaryotic ribosomes are 70S; eukaryotic cytoplasmic ribosomes are 80S. BUT eukaryotic mitochondria and chloroplasts also have 70S ribosomes (endosymbiotic theory). Prokaryotes DO have ribosomes — they just aren't membrane-bound. Also: not all eukaryotes have cell walls (animals don't; plants and fungi do).",
  whyItMatters:
    "Antibiotics target differences between prokaryotic and eukaryotic cells — e.g., penicillin attacks peptidoglycan cell walls (found only in bacteria), and tetracycline targets 70S ribosomes. Understanding these differences is why antibiotics don't harm human cells.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">Key Differences</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Feature</th>
              <th className="text-left p-2">Prokaryotes</th>
              <th className="text-left p-2">Eukaryotes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2 font-medium">Nucleus</td>
              <td className="p-2">No nucleus — DNA in nucleoid region</td>
              <td className="p-2">True nucleus with nuclear envelope</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">DNA form</td>
              <td className="p-2">Circular, naked (no histones in bacteria)</td>
              <td className="p-2">Linear, associated with histone proteins</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Plasmids</td>
              <td className="p-2">Common (small circular DNA)</td>
              <td className="p-2">Rare (found in yeast)</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Membrane-bound organelles</td>
              <td className="p-2">Absent</td>
              <td className="p-2">Present (mitochondria, ER, Golgi, etc.)</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Ribosomes</td>
              <td className="p-2">70S (smaller)</td>
              <td className="p-2">
                80S (larger); 70S in mitochondria/chloroplasts
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Cell size</td>
              <td className="p-2">0.1–5.0 µm</td>
              <td className="p-2">10–100 µm</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Cell division</td>
              <td className="p-2">Binary fission (asexual)</td>
              <td className="p-2">Mitosis (or meiosis for gametes)</td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Cell wall</td>
              <td className="p-2">Peptidoglycan (bacteria)</td>
              <td className="p-2">
                Cellulose (plants), chitin (fungi), or absent (animals)
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-2 font-medium">Flagella</td>
              <td className="p-2">Simple structure (flagellin protein)</td>
              <td className="p-2">Complex 9+2 microtubule arrangement</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mt-4">Similarities</h3>
      <p>Both have:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Plasma membrane (phospholipid bilayer)</li>
        <li>Cytoplasm</li>
        <li>Ribosomes for protein synthesis</li>
        <li>DNA as genetic material</li>
        <li>Same genetic code (universal)</li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Endosymbiotic Theory</h3>
      <p>
        Mitochondria and chloroplasts evolved from free-living prokaryotes
        engulfed by an ancestral eukaryotic cell. Evidence: both have double
        membranes, their own circular DNA, 70S ribosomes, and reproduce by
        binary fission-like division.
      </p>
    </div>
  ),
  questions: [
    {
      id: "prok-vs-euk-q1",
      type: "multiple-choice",
      prompt:
        "Which feature is found in eukaryotic cells but NOT in prokaryotic cells?",
      options: [
        "Ribosomes",
        "Plasma membrane",
        "Membrane-bound organelles",
        "Circular DNA",
      ],
      answer: "Membrane-bound organelles",
      explanation:
        "Eukaryotes have membrane-bound organelles (nucleus, mitochondria, ER, etc.). Prokaryotes lack these. Both have ribosomes, plasma membranes, and prokaryotes have circular DNA.",
      difficulty: "recall",
    },
    {
      id: "prok-vs-euk-q2",
      type: "multiple-choice",
      prompt:
        "Why do antibiotics like tetracycline target bacterial (70S) ribosomes without harming human cells?",
      options: [
        "Human cells do not have ribosomes",
        "Human cytoplasmic ribosomes are 80S, structurally different from 70S",
        "Human cells have a cell wall that blocks the antibiotic",
        "Bacterial ribosomes are made of RNA, human ribosomes are made of protein",
      ],
      answer:
        "Human cytoplasmic ribosomes are 80S, structurally different from 70S",
      explanation:
        "Tetracycline binds specifically to 70S ribosomes. Human cytoplasmic ribosomes are 80S and have a different structure, so the drug does not affect them. (Mitochondrial 70S ribosomes can be mildly affected, which is why some antibiotics have side effects.)",
      difficulty: "apply",
    },
    {
      id: "prok-vs-euk-q3",
      type: "explain-why",
      prompt:
        "Describe three pieces of evidence that support the endosymbiotic theory for the origin of mitochondria.",
      answer:
        "(1) Mitochondria have their own circular DNA, similar to bacterial DNA. (2) Mitochondria have 70S ribosomes (like prokaryotes), not 80S (like eukaryotic cytoplasm). (3) Mitochondria have a double membrane — the inner membrane resembles a bacterial plasma membrane. (4) Mitochondria reproduce independently by binary fission-like division. (5) Mitochondrial DNA sequences are closely related to alpha-proteobacteria.",
      difficulty: "recall",
    },
  ],
  crosslinks: ["cell-theory", "organelles", "cell-cycle", "nucleic-acids"],
  prerequisites: ["cell-theory"],
};

export default note;
