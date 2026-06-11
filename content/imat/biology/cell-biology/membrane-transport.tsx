import type { AtomicNote } from "@/data/imat/types";

const note: AtomicNote = {
  slug: "membrane-transport",
  subject: "biology",
  topic: "cell-biology",
  title: "Membrane Transport",
  summary:
    "Movement of substances across the cell membrane via passive transport (simple diffusion, facilitated diffusion, osmosis) or active transport (pumps, endocytosis, exocytosis).",
  memoryHook:
    "'Passive = no energy, goes downhill (high → low). Active = needs ATP, goes uphill (low → high).' Think of a ball rolling down a hill (passive) vs pushing it back up (active).",
  imatTrap:
    "Osmosis is the diffusion of WATER (solvent), not solute. Water moves from HIGH water potential (dilute solution) to LOW water potential (concentrated solution). Students get this backwards — they think water moves toward the more concentrated solution, which is correct, but they phrase it as 'toward higher concentration' meaning solute, which confuses examiners.",
  whyItMatters:
    "Oral rehydration therapy (ORT) saves millions of lives in developing countries — it exploits the sodium-glucose co-transport mechanism in intestinal cells to maximise water absorption during diarrhoea.",
  explanation: (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mt-4">
        Passive Transport (No ATP Required)
      </h3>

      <p>
        Substances move <strong>down</strong> their concentration gradient (high
        → low).
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Simple diffusion</strong>: Small, non-polar molecules (O₂,
          CO₂, lipid-soluble substances) pass directly through the phospholipid
          bilayer. Rate depends on gradient, temperature, molecule size, and
          membrane surface area.
        </li>
        <li>
          <strong>Facilitated diffusion</strong>: Polar or charged molecules use
          membrane proteins.
          <ul className="list-circle pl-4 mt-1">
            <li>
              <em>Channel proteins</em>: Form pores for ions (e.g., Na⁺, K⁺,
              Ca²⁺). Some are gated (voltage or ligand-controlled).
            </li>
            <li>
              <em>Carrier proteins</em>: Change shape to transport specific
              molecules (e.g., glucose via GLUT4). Saturable — rate plateaus at
              high concentrations.
            </li>
          </ul>
        </li>
        <li>
          <strong>Osmosis</strong>: Net movement of <em>water</em> molecules
          from a region of higher water potential to lower water potential
          through a partially permeable membrane.
          <ul className="list-circle pl-4 mt-1">
            <li>
              Hypertonic solution: higher solute concentration → cell shrinks
              (crenation in animal cells, plasmolysis in plant cells)
            </li>
            <li>
              Hypotonic solution: lower solute concentration → cell swells
              (lysis in animal cells, turgid in plant cells)
            </li>
            <li>Isotonic: equal concentration → no net water movement</li>
          </ul>
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">
        Active Transport (Requires ATP)
      </h3>
      <p>
        Substances move <strong>against</strong> their concentration gradient
        (low → high).
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Protein pumps</strong>: Carrier proteins that use ATP to move
          substances. The classic example is the <strong>Na⁺/K⁺ pump</strong>{" "}
          (Na⁺/K⁺-ATPase): pumps 3 Na⁺ out and 2 K⁺ into the cell per ATP,
          maintaining the resting membrane potential.
        </li>
        <li>
          <strong>Co-transport</strong>: One substance moves down its gradient,
          providing energy to move another against its gradient. Example:
          sodium-glucose co-transporter (SGLT) in intestinal epithelia.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Bulk Transport</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Endocytosis</strong>: Cell engulfs material by invaginating
          the membrane to form a vesicle.
          <ul className="list-circle pl-4 mt-1">
            <li>
              Phagocytosis: 'cell eating' — large particles (e.g., macrophages
              engulfing bacteria)
            </li>
            <li>Pinocytosis: 'cell drinking' — fluid and dissolved solutes</li>
            <li>
              Receptor-mediated endocytosis: specific ligands bind receptors,
              triggering vesicle formation (e.g., LDL cholesterol uptake)
            </li>
          </ul>
        </li>
        <li>
          <strong>Exocytosis</strong>: Vesicles fuse with the membrane to
          release contents outside the cell (e.g., neurotransmitter release,
          hormone secretion).
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "membrane-transport-q1",
      type: "multiple-choice",
      prompt:
        "A red blood cell is placed in a hypertonic solution. What happens?",
      options: [
        "The cell swells and bursts",
        "The cell shrinks (crenation)",
        "The cell remains unchanged",
        "The cell divides",
      ],
      answer: "The cell shrinks (crenation)",
      explanation:
        "In a hypertonic solution, water potential outside is lower than inside the cell. Water leaves the cell by osmosis, causing it to shrink — this is called crenation in animal cells.",
      difficulty: "apply",
    },
    {
      id: "membrane-transport-q2",
      type: "multiple-choice",
      prompt: "The Na⁺/K⁺ pump moves how many ions per ATP hydrolysed?",
      options: [
        "3 Na⁺ in, 2 K⁺ out",
        "3 Na⁺ out, 2 K⁺ in",
        "2 Na⁺ out, 3 K⁺ in",
        "2 Na⁺ in, 2 K⁺ out",
      ],
      answer: "3 Na⁺ out, 2 K⁺ in",
      explanation:
        "The Na⁺/K⁺-ATPase pumps 3 sodium ions OUT of the cell and 2 potassium ions INTO the cell per ATP, creating an electrochemical gradient essential for nerve impulses.",
      difficulty: "recall",
    },
    {
      id: "membrane-transport-q3",
      type: "explain-why",
      prompt:
        "Why does facilitated diffusion plateau at high substrate concentrations while simple diffusion does not?",
      answer:
        "Facilitated diffusion relies on a finite number of carrier/channel proteins. Once all transport proteins are occupied (saturated), the rate cannot increase further. Simple diffusion has no such limit — rate increases linearly with concentration gradient.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["cell-membrane-structure", "organelles", "homeostasis"],
  prerequisites: ["cell-membrane-structure", "lipids"],
};

export default note;
