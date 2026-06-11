import type { AtomicNote } from "@/data/imat/types";
import { CellMembrane } from "@/components/imat/interactive/cell-membrane";

const note: AtomicNote = {
  slug: "cell-membrane-structure",
  subject: "biology",
  topic: "cell-biology",
  title: "Cell Membrane Structure",
  summary:
    "The cell membrane is a phospholipid bilayer with embedded proteins, cholesterol, and carbohydrates described by the fluid mosaic model — selectively permeable and dynamically organised.",
  memoryHook:
    "Think of the membrane as a 'mosaic swimming pool': the phospholipids are the water (fluid base), proteins are the floating tiles (mosaic pattern), cholesterol are the lane dividers (stability), and glycoproteins are the pool signs (cell recognition).",
  imatTrap:
    "The hydrophilic heads face OUTWARD (toward water on both sides), while hydrophobic tails face INWARD. Students flip this. Also: cholesterol does NOT make the membrane rigid — it modulates fluidity (prevents too-fluid at high temps and too-rigid at low temps).",
  whyItMatters:
    "Cystic fibrosis results from a defective chloride channel protein (CFTR) in the cell membrane. Understanding membrane structure is essential for pharmacology — most drugs target membrane receptors (GPCRs, ion channels).",
  explanation: (
    <div className="space-y-4">
      <CellMembrane />

      <h3 className="text-lg font-semibold mt-4">Phospholipid Bilayer</h3>
      <p>
        Each phospholipid has a <strong>hydrophilic phosphate head</strong> and
        two <strong>hydrophobic fatty acid tails</strong>. They spontaneously
        arrange into a bilayer:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Heads face outward — toward extracellular fluid and cytoplasm (both
          aqueous)
        </li>
        <li>
          Tails face inward — creating a hydrophobic core that blocks polar
          molecules
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Fluid Mosaic Model</h3>
      <p>
        Proposed by Singer & Nicolson (1972). <strong>Fluid</strong> =
        phospholipids and proteins can move laterally. <strong>Mosaic</strong> =
        proteins are scattered throughout like tiles in a mosaic.
      </p>

      <h3 className="text-lg font-semibold mt-4">Membrane Components</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          <strong>Phospholipids</strong>: Form the bilayer barrier. Saturated
          tails = less fluid; unsaturated tails (kinked) = more fluid.
        </li>
        <li>
          <strong>Cholesterol</strong>: Wedged between phospholipids. At high
          temperatures, restricts movement (stabilises). At low temperatures,
          prevents tight packing (maintains fluidity).
        </li>
        <li>
          <strong>Integral proteins</strong>: Span the entire membrane
          (transmembrane). Include channel proteins, carrier proteins, and
          pumps.
        </li>
        <li>
          <strong>Peripheral proteins</strong>: Attached to the surface (inner
          or outer). Often involved in signalling or cytoskeleton attachment.
        </li>
        <li>
          <strong>Glycoproteins & glycolipids</strong>: Carbohydrate chains on
          the extracellular surface. Function in cell recognition, adhesion, and
          immune response.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4">Selective Permeability</h3>
      <p>
        Small, non-polar molecules (O₂, CO₂) pass freely. Small polar molecules
        (H₂O) pass slowly. Ions and large polar molecules (glucose, amino acids)
        require transport proteins.
      </p>
    </div>
  ),
  questions: [
    {
      id: "cell-membrane-q1",
      type: "multiple-choice",
      prompt:
        "In the fluid mosaic model, what is the role of cholesterol in the cell membrane?",
      options: [
        "It makes the membrane completely rigid",
        "It modulates fluidity — stabilises at high temps, prevents solidification at low temps",
        "It acts as a channel protein for ion transport",
        "It serves as a receptor for hormones",
      ],
      answer:
        "It modulates fluidity — stabilises at high temps, prevents solidification at low temps",
      explanation:
        "Cholesterol is a fluidity buffer. At high temperatures it restricts phospholipid movement, and at low temperatures it prevents tight packing of fatty acid tails.",
      difficulty: "apply",
    },
    {
      id: "cell-membrane-q2",
      type: "multiple-choice",
      prompt:
        "Which molecules can pass directly through the phospholipid bilayer without a transport protein?",
      options: [
        "Glucose and amino acids",
        "Na⁺ and K⁺ ions",
        "O₂ and CO₂",
        "Starch and proteins",
      ],
      answer: "O₂ and CO₂",
      explanation:
        "Small, non-polar molecules like O₂ and CO₂ dissolve in the hydrophobic core and diffuse freely. Ions, large polar molecules, and macromolecules require transport proteins.",
      difficulty: "recall",
    },
    {
      id: "cell-membrane-q3",
      type: "explain-why",
      prompt:
        "Why are glycoproteins important for the immune system's ability to distinguish 'self' from 'non-self'?",
      answer:
        "Glycoproteins have unique carbohydrate chains on the extracellular surface that act as identity markers. The immune system recognises these markers — cells with 'self' markers are tolerated, while foreign markers (on pathogens or transplanted tissue) trigger an immune response.",
      difficulty: "analyze",
    },
  ],
  crosslinks: ["membrane-transport", "organelles", "proteins", "lipids"],
  prerequisites: ["lipids", "proteins"],
};

export default note;
