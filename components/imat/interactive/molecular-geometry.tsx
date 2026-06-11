"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type ShapeType =
  | "linear"
  | "trigonal-planar"
  | "bent"
  | "tetrahedral"
  | "trigonal-pyramidal";

interface ShapeConfig {
  name: string;
  angle: string;
  bondCount: number;
  lonePairs: number;
  atoms: { x: number; y: number }[];
}

const SHAPES: Record<ShapeType, ShapeConfig> = {
  linear: {
    name: "Linear",
    angle: "180°",
    bondCount: 2,
    lonePairs: 0,
    atoms: [
      { x: 50, y: 15 },
      { x: 50, y: 85 },
    ],
  },
  "trigonal-planar": {
    name: "Trigonal Planar",
    angle: "120°",
    bondCount: 3,
    lonePairs: 0,
    atoms: [
      { x: 50, y: 10 },
      { x: 15, y: 72 },
      { x: 85, y: 72 },
    ],
  },
  bent: {
    name: "Bent",
    angle: "104.5°",
    bondCount: 2,
    lonePairs: 2,
    atoms: [
      { x: 25, y: 75 },
      { x: 75, y: 75 },
    ],
  },
  tetrahedral: {
    name: "Tetrahedral",
    angle: "109.5°",
    bondCount: 4,
    lonePairs: 0,
    atoms: [
      { x: 50, y: 10 },
      { x: 20, y: 55 },
      { x: 80, y: 55 },
      { x: 50, y: 85 },
    ],
  },
  "trigonal-pyramidal": {
    name: "Trigonal Pyramidal",
    angle: "107°",
    bondCount: 3,
    lonePairs: 1,
    atoms: [
      { x: 50, y: 15 },
      { x: 18, y: 75 },
      { x: 82, y: 75 },
    ],
  },
};

const SHAPE_BUTTONS: ShapeType[] = [
  "linear",
  "trigonal-planar",
  "bent",
  "tetrahedral",
  "trigonal-pyramidal",
];

export function MolecularGeometry() {
  const [shape, setShape] = useState<ShapeType>("linear");
  const [showLonePairs, setShowLonePairs] = useState(true);

  const config = SHAPES[shape];
  const cx = 50;
  const cy = 50;

  const lonePairPositions = useMemo(() => {
    if (!showLonePairs || config.lonePairs === 0) return [];
    const positions: { x: number; y: number }[] = [];
    if (shape === "bent") {
      positions.push({ x: 35, y: 30 });
      positions.push({ x: 65, y: 30 });
    } else if (shape === "trigonal-pyramidal") {
      positions.push({ x: 50, y: 75 });
    }
    return positions;
  }, [shape, showLonePairs, config.lonePairs]);

  return (
    <div
      data-testid="molecular-geometry"
      className="w-full max-w-lg mx-auto p-4 space-y-4"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        {SHAPE_BUTTONS.map((s) => (
          <motion.button
            key={s}
            onClick={() => setShape(s)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              shape === s
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {SHAPES[s].name}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="text-center">
          <p data-testid="shape-name" className="text-lg font-semibold">
            {config.name}
          </p>
          <p className="text-sm text-gray-500">
            Bond angle:{" "}
            <span
              data-testid="bond-angle"
              className="font-mono font-semibold text-blue-700"
            >
              {config.angle}
            </span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {config.bondCount} bond{config.bondCount !== 1 ? "s" : ""} &middot;{" "}
            {config.lonePairs} lone pair{config.lonePairs !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-64 h-64"
          aria-label={`${config.name} molecular geometry`}
        >
          {config.atoms.map((atom, i) => (
            <motion.line
              key={`bond-${i}`}
              x1={cx}
              y1={cy}
              x2={atom.x}
              y2={atom.y}
              stroke="#94a3b8"
              strokeWidth={2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            />
          ))}

          {lonePairPositions.map((pos, i) => (
            <motion.g
              key={`lone-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <circle
                cx={pos.x - 2}
                cy={pos.y}
                r={2}
                fill="#f59e0b"
                opacity={0.7}
              />
              <circle
                cx={pos.x + 2}
                cy={pos.y}
                r={2}
                fill="#f59e0b"
                opacity={0.7}
              />
            </motion.g>
          ))}

          <motion.circle
            cx={cx}
            cy={cy}
            r={8}
            fill="#3b82f6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <text
            x={cx}
            y={cy + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={6}
            fontWeight="bold"
          >
            A
          </text>

          {config.atoms.map((atom, i) => (
            <motion.g key={`atom-${i}`}>
              <motion.circle
                cx={atom.x}
                cy={atom.y}
                r={6}
                fill="#ef4444"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  delay: 0.1 + i * 0.05,
                }}
              />
              <text
                x={atom.x}
                y={atom.y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={5}
                fontWeight="bold"
              >
                B
              </text>
            </motion.g>
          ))}

          {config.atoms.length >= 2 && (
            <motion.path
              d={describeArc(cx, cy, 15, config.atoms[0], config.atoms[1])}
              fill="none"
              stroke="#6366f1"
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          )}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-2">
        <label className="text-sm text-gray-600">Show lone pairs</label>
        <button
          data-testid="lone-pair-toggle"
          onClick={() => setShowLonePairs((p) => !p)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
            showLonePairs ? "bg-blue-600" : "bg-gray-300"
          }`}
          role="switch"
          aria-checked={showLonePairs}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
              showLonePairs ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function describeArc(
  cx: number,
  cy: number,
  radius: number,
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): string {
  const angle1 = Math.atan2(p1.y - cy, p1.x - cx);
  const angle2 = Math.atan2(p2.y - cy, p2.x - cx);

  const startX = cx + radius * Math.cos(angle1);
  const startY = cy + radius * Math.sin(angle1);
  const endX = cx + radius * Math.cos(angle2);
  const endY = cy + radius * Math.sin(angle2);

  let angleDiff = angle2 - angle1;
  if (angleDiff < 0) angleDiff += 2 * Math.PI;
  const largeArc = angleDiff > Math.PI ? 1 : 0;

  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`;
}
