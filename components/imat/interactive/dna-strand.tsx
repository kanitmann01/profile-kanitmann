"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DNAStrandProps {
  onBaseClick?: (base: string) => void;
}

const BASE_PAIRS: Record<
  string,
  { complement: string; color: string; letter: string }
> = {
  Adenine: { complement: "Thymine", color: "#ef4444", letter: "A" },
  Thymine: { complement: "Adenine", color: "#3b82f6", letter: "T" },
  Guanine: { complement: "Cytosine", color: "#22c55e", letter: "G" },
  Cytosine: { complement: "Guanine", color: "#f59e0b", letter: "C" },
};

const SEQUENCE = [
  { left: "Adenine", right: "Thymine" },
  { left: "Guanine", right: "Cytosine" },
  { left: "Thymine", right: "Adenine" },
  { left: "Cytosine", right: "Guanine" },
  { left: "Adenine", right: "Thymine" },
];

export function DNAStrand({ onBaseClick }: DNAStrandProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleBaseClick = (base: string) => {
    setSelected(base);
    onBaseClick?.(base);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <svg
        viewBox="0 0 300 400"
        className="w-full max-w-[300px]"
        role="img"
        aria-label="DNA double helix"
      >
        {SEQUENCE.map((pair, i) => {
          const y = 40 + i * 70;
          const xOffset = Math.sin(i * 1.2) * 30;
          const leftInfo = BASE_PAIRS[pair.left];
          const rightInfo = BASE_PAIRS[pair.right];
          const isSelected = selected === pair.left || selected === pair.right;

          return (
            <g key={i}>
              <line
                x1={120 + xOffset}
                y1={y}
                x2={180 - xOffset}
                y2={y}
                stroke={isSelected ? "#fbbf24" : "#94a3b8"}
                strokeWidth={isSelected ? 3 : 2}
              />
              <motion.circle
                cx={120 + xOffset}
                cy={y}
                r={18}
                fill={leftInfo.color}
                opacity={isSelected ? 1 : 0.8}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => handleBaseClick(pair.left)}
                role="button"
                aria-label={pair.left}
              />
              <text
                x={120 + xOffset}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                pointerEvents="none"
              >
                {leftInfo.letter}
              </text>
              <motion.circle
                cx={180 - xOffset}
                cy={y}
                r={18}
                fill={rightInfo.color}
                opacity={isSelected ? 1 : 0.8}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => handleBaseClick(pair.right)}
                role="button"
                aria-label={pair.right}
              />
              <text
                x={180 - xOffset}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontSize={14}
                fontWeight="bold"
                pointerEvents="none"
              >
                {rightInfo.letter}
              </text>
            </g>
          );
        })}

        <path
          d="M 120 20 Q 150 100 180 180 Q 150 260 120 340"
          fill="none"
          stroke="#64748b"
          strokeWidth={2}
          opacity={0.4}
        />
        <path
          d="M 180 20 Q 150 100 120 180 Q 150 260 180 340"
          fill="none"
          stroke="#64748b"
          strokeWidth={2}
          opacity={0.4}
        />
      </svg>

      <div className="flex flex-wrap justify-center gap-2">
        {Object.entries(BASE_PAIRS).map(([name, info]) => (
          <button
            key={name}
            onClick={() => handleBaseClick(name)}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90 min-h-[44px]"
            style={{ backgroundColor: info.color }}
          >
            <span className="font-bold">{info.letter}</span>
            {name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-lg border bg-muted p-3 text-center"
            data-testid="complement-info"
          >
            <p className="text-sm text-muted-foreground">Complement of</p>
            <p
              className="text-lg font-bold"
              style={{ color: BASE_PAIRS[selected].color }}
            >
              {selected} ({BASE_PAIRS[selected].letter})
            </p>
            <p className="text-sm text-muted-foreground">pairs with</p>
            <p
              className="text-lg font-bold"
              style={{
                color: BASE_PAIRS[BASE_PAIRS[selected].complement].color,
              }}
            >
              {BASE_PAIRS[selected].complement} (
              {BASE_PAIRS[BASE_PAIRS[selected].complement].letter})
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
