"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Molecule = "O2" | "Glucose" | "Na+" | "H2O";

interface TransportResult {
  label: string;
  colorClass: string;
  bgColorClass: string;
}

const TRANSPORT_RESULTS: Record<Molecule, TransportResult> = {
  O2: {
    label: "Simple diffusion ✓",
    colorClass: "text-green-700",
    bgColorClass: "bg-green-500/10 border-green-500/30",
  },
  H2O: {
    label: "Osmosis ✓",
    colorClass: "text-green-700",
    bgColorClass: "bg-green-500/10 border-green-500/30",
  },
  "Na+": {
    label: "Active transport needed",
    colorClass: "text-red-700",
    bgColorClass: "bg-red-500/10 border-red-500/30",
  },
  Glucose: {
    label: "Facilitated diffusion via carrier protein",
    colorClass: "text-yellow-700",
    bgColorClass: "bg-yellow-500/10 border-yellow-500/30",
  },
};

const MOLECULE_COLORS: Record<Molecule, string> = {
  O2: "#ef4444",
  Glucose: "#f59e0b",
  "Na+": "#3b82f6",
  H2O: "#06b6d4",
};

export function CellMembrane() {
  const [selectedMolecule, setSelectedMolecule] = useState<Molecule | null>(
    null
  );

  const handleMoleculeClick = (molecule: Molecule) => {
    setSelectedMolecule(molecule);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <svg
        viewBox="0 0 400 300"
        className="w-full max-w-[400px]"
        role="img"
        aria-label="Cell membrane phospholipid bilayer"
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 20 + i * 38;
          return (
            <g key={`upper-${i}`}>
              <circle cx={x} cy={120} r={8} fill="#3b82f6" opacity={0.7} />
              <line
                x1={x}
                y1={128}
                x2={x - 5}
                y2={148}
                stroke="#94a3b8"
                strokeWidth={2}
              />
              <line
                x1={x}
                y1={128}
                x2={x + 5}
                y2={148}
                stroke="#94a3b8"
                strokeWidth={2}
              />
            </g>
          );
        })}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 20 + i * 38;
          return (
            <g key={`lower-${i}`}>
              <circle cx={x} cy={180} r={8} fill="#3b82f6" opacity={0.7} />
              <line
                x1={x}
                y1={172}
                x2={x - 5}
                y2={152}
                stroke="#94a3b8"
                strokeWidth={2}
              />
              <line
                x1={x}
                y1={172}
                x2={x + 5}
                y2={152}
                stroke="#94a3b8"
                strokeWidth={2}
              />
            </g>
          );
        })}

        <text x={200} y={105} textAnchor="middle" fill="#64748b" fontSize={11}>
          Extracellular
        </text>
        <text x={200} y={205} textAnchor="middle" fill="#64748b" fontSize={11}>
          Intracellular (Cytoplasm)
        </text>
        <text
          x={200}
          y={155}
          textAnchor="middle"
          fill="#475569"
          fontSize={10}
          fontWeight="bold"
        >
          Phospholipid Bilayer
        </text>
      </svg>

      <div className="flex flex-wrap justify-center gap-3">
        {(Object.keys(MOLECULE_COLORS) as Molecule[]).map((molecule) => (
          <motion.button
            key={molecule}
            onClick={() => handleMoleculeClick(molecule)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium min-h-[44px] transition-colors hover:bg-muted"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              borderColor:
                selectedMolecule === molecule
                  ? MOLECULE_COLORS[molecule]
                  : undefined,
            }}
          >
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: MOLECULE_COLORS[molecule] }}
            />
            {molecule}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedMolecule && (
          <motion.div
            key={selectedMolecule}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            data-testid="transport-result"
            className={`rounded-lg border p-3 text-center font-medium ${TRANSPORT_RESULTS[selectedMolecule].bgColorClass}`}
          >
            <p className="text-sm text-muted-foreground">
              {selectedMolecule} transport:
            </p>
            <p
              className={`text-base font-bold ${TRANSPORT_RESULTS[selectedMolecule].colorClass}`}
            >
              {TRANSPORT_RESULTS[selectedMolecule].label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
