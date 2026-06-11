"use client";

import type { AtomicNote } from "@/data/imat/types";
import { MolecularGeometry } from "@/components/imat/interactive/molecular-geometry";

const note: AtomicNote = {
  slug: "covalent-bonds",
  subject: "chemistry",
  topic: "chemical-bonding",
  title: "Covalent Bonds & Molecular Geometry",
  summary:
    "Bonds formed by sharing electron pairs between nonmetals — single, double, or triple — with geometry determined by VSEPR theory.",
  memoryHook:
    "Covalent = 'co-operate' (share, don't steal). VSEPR: electron pairs repel → spread out as far as possible. 2 pairs = linear (180°), 3 = trigonal planar (120°), 4 = tetrahedral (109.5°).",
  imatTrap:
    "Lone pairs repel MORE than bonding pairs → bond angles shrink. H₂O is bent (104.5°), not tetrahedral (109.5°), because 2 lone pairs push the O-H bonds closer. Also, polar bonds ≠ polar molecule (CO₂ has polar bonds but is nonpolar overall due to symmetry).",
  whyItMatters:
    "Molecular shape determines polarity, which determines intermolecular forces, solubility, boiling point, and biological function. IMAT tests VSEPR predictions and polarity reasoning.",
  explanation: (
    <div>
      <p>
        A <strong>covalent bond</strong> is a shared pair of electrons between
        two nonmetal atoms. Both atoms achieve a stable electron configuration
        without full electron transfer.
      </p>
      <h3>Bond Types</h3>
      <ul>
        <li>
          <strong>Single bond:</strong> 1 shared pair (σ bond). e.g. H−H, C−C.
        </li>
        <li>
          <strong>Double bond:</strong> 2 shared pairs (1σ + 1π). e.g. O=O, C=O.
        </li>
        <li>
          <strong>Triple bond:</strong> 3 shared pairs (1σ + 2π). e.g. N≡N.
        </li>
      </ul>
      <h3>Polar vs Nonpolar</h3>
      <ul>
        <li>
          <strong>Nonpolar covalent:</strong> equal sharing (ΔEN &lt; 0.4). e.g.
          H₂, Cl₂, CH₄.
        </li>
        <li>
          <strong>Polar covalent:</strong> unequal sharing (ΔEN 0.4–1.7). e.g.
          H₂O, HCl.
        </li>
      </ul>
      <h3>VSEPR Theory & Molecular Geometry</h3>
      <p>
        Electron pairs around the central atom repel each other and arrange to
        minimise repulsion. Explore the shapes below:
      </p>
      <MolecularGeometry />
      <ul>
        <li>
          2 bonding pairs, 0 lone pairs → <strong>Linear</strong> (180°)
        </li>
        <li>
          3 bonding pairs, 0 lone pairs → <strong>Trigonal planar</strong>{" "}
          (120°)
        </li>
        <li>
          2 bonding pairs, 2 lone pairs → <strong>Bent</strong> (104.5°)
        </li>
        <li>
          4 bonding pairs, 0 lone pairs → <strong>Tetrahedral</strong> (109.5°)
        </li>
        <li>
          3 bonding pairs, 1 lone pair → <strong>Trigonal pyramidal</strong>{" "}
          (107°)
        </li>
      </ul>
    </div>
  ),
  questions: [
    {
      id: "covalent-q1",
      type: "multiple-choice",
      prompt: "What is the molecular geometry of water (H₂O)?",
      answer: "Bent (104.5°)",
      options: [
        "Linear (180°)",
        "Tetrahedral (109.5°)",
        "Bent (104.5°)",
        "Trigonal planar (120°)",
      ],
      explanation:
        "Oxygen has 2 bonding pairs and 2 lone pairs. The 4 electron pairs are tetrahedrally arranged, but the molecular shape (atom positions only) is bent, with the angle compressed to 104.5° by lone pair repulsion.",
      difficulty: "recall",
    },
    {
      id: "covalent-q2",
      type: "multiple-choice",
      prompt: "Why is CO₂ a nonpolar molecule despite having polar C=O bonds?",
      answer:
        "The linear geometry means the two C=O dipoles are equal and opposite, cancelling out.",
      options: [
        "C=O bonds are actually nonpolar",
        "The linear geometry means the two C=O dipoles are equal and opposite, cancelling out",
        "Carbon is a metal",
        "CO₂ has no bonds",
      ],
      explanation:
        "CO₂ is linear (O=C=O). Each C=O bond is polar, but the bond dipoles point in opposite directions and cancel, giving a net dipole moment of zero.",
      difficulty: "analyze",
    },
    {
      id: "covalent-q3",
      type: "fill-blank",
      prompt: "A double bond consists of one σ bond and one ______ bond.",
      answer: "π (pi)",
      explanation:
        "A double bond has one sigma (σ) bond (head-on overlap) and one pi (π) bond (sideways overlap of p orbitals). Triple bonds have 1σ + 2π.",
      difficulty: "recall",
    },
  ],
  crosslinks: [
    "ionic-bonds",
    "periodic-trends",
    "pure-substances",
    "hydrocarbons",
  ],
  prerequisites: ["electron-configuration", "periodic-trends"],
};

export default note;
