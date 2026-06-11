"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const SUBSTANCES = [
  { name: "Stomach acid", pH: 1.5 },
  { name: "Lemon", pH: 2.5 },
  { name: "Blood", pH: 7.4 },
  { name: "Bleach", pH: 12.5 },
];

function phToColor(pH: number): string {
  const clamped = Math.max(0, Math.min(14, pH));
  if (clamped <= 7) {
    const t = clamped / 7;
    const r = Math.round(255);
    const g = Math.round(t * 255);
    const b = Math.round(t * 50);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const t = (clamped - 7) / 7;
    const r = Math.round(255 * (1 - t));
    const g = Math.round(255 * (1 - t * 0.5));
    const b = Math.round(50 + t * 205);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

function formatScientific(value: number): string {
  if (value === 0) return "0";
  const exp = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exp);
  return `${mantissa.toFixed(1)} × 10^${exp}`;
}

export function PHScale() {
  const [pH, setPH] = useState(7);

  const hConc = useMemo(() => Math.pow(10, -pH), [pH]);
  const ohConc = useMemo(() => Math.pow(10, pH - 14), [pH]);
  const color = useMemo(() => phToColor(pH), [pH]);

  const label = pH < 7 ? "Acidic" : pH > 7 ? "Basic" : "Neutral";

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <motion.div
          data-testid="solution-circle"
          animate={{ backgroundColor: color }}
          transition={{ duration: 0.3 }}
          className="h-24 w-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
        >
          <span className="text-white font-bold text-lg drop-shadow-md">
            {pH.toFixed(1)}
          </span>
        </motion.div>

        <div className="text-center sm:text-left">
          <p data-testid="ph-label" className="text-xl font-semibold">
            {label}
          </p>
          <p className="text-sm text-gray-500">pH {pH.toFixed(1)}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="ph-slider"
          className="block text-sm font-medium text-gray-700"
        >
          Adjust pH
        </label>
        <input
          id="ph-slider"
          type="range"
          min={0}
          max={14}
          step={0.1}
          value={pH}
          onChange={(e) => setPH(parseFloat(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #ff0000, #ffff00, #0000ff)`,
          }}
          aria-valuemin={0}
          aria-valuemax={14}
          aria-valuenow={pH}
          aria-label="pH scale"
          role="slider"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span>
          <span>7</span>
          <span>14</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg bg-red-50 p-3">
          <p className="text-xs text-gray-500 mb-1">[H⁺] concentration</p>
          <p
            data-testid="h-concentration"
            className="font-mono text-sm font-semibold text-red-700"
          >
            {formatScientific(hConc)} M
          </p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3">
          <p className="text-xs text-gray-500 mb-1">[OH⁻] concentration</p>
          <p
            data-testid="oh-concentration"
            className="font-mono text-sm font-semibold text-blue-700"
          >
            {formatScientific(ohConc)} M
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          className="h-2 rounded-full"
          style={{
            background: "linear-gradient(to right, #ff0000, #ffff00, #0000ff)",
          }}
        />
        {SUBSTANCES.map((substance) => {
          const pct = (substance.pH / 14) * 100;
          return (
            <div
              key={substance.name}
              className="absolute top-4 flex flex-col items-center"
              style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
            >
              <div className="h-3 w-0.5 bg-gray-400" />
              <span className="text-[0.6rem] text-gray-600 whitespace-nowrap mt-0.5">
                {substance.name}
              </span>
              <span className="text-[0.55rem] text-gray-400">
                {substance.pH}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
