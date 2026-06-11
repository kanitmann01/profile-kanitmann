"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

type InhibitionMode = "none" | "competitive" | "non-competitive";

const OPTIMAL_TEMP = 37;
const OPTIMAL_PH = 7;

function calcRate(temp: number, ph: number): number {
  const tempFactor = Math.max(0, 1 - Math.pow((temp - OPTIMAL_TEMP) / 30, 2));
  const phFactor = Math.max(0, 1 - Math.pow((ph - OPTIMAL_PH) / 5, 2));
  return Math.round(tempFactor * phFactor * 100);
}

function EnzymeSVG({ mode }: { mode: InhibitionMode }) {
  return (
    <svg
      viewBox="0 0 200 120"
      className="w-full max-w-[200px]"
      role="img"
      aria-label="Enzyme with active site"
    >
      <path
        d="M 40 30 Q 60 20 80 30 L 80 50 Q 70 55 60 50 L 60 60 Q 70 65 80 60 L 80 90 Q 60 100 40 90 Z"
        fill="#8b5cf6"
        opacity={0.8}
      />
      <text x={50} y={65} fill="white" fontSize={10} fontWeight="bold">
        Enzyme
      </text>

      <rect
        x={62}
        y={48}
        width={16}
        height={14}
        rx={3}
        fill={mode === "competitive" ? "#ef4444" : "#f59e0b"}
        opacity={0.9}
      />
      <text x={64} y={58} fill="white" fontSize={7}>
        {mode === "none"
          ? "Active"
          : mode === "competitive"
            ? "Blocked"
            : "Altered"}
      </text>

      {mode === "none" && (
        <>
          <circle cx={120} cy={55} r={10} fill="#22c55e" opacity={0.8} />
          <text x={115} y={58} fill="white" fontSize={7}>
            Sub
          </text>
          <motion.path
            d="M 108 55 L 82 55"
            stroke="#22c55e"
            strokeWidth={2}
            strokeDasharray="4 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </>
      )}

      {mode === "competitive" && (
        <>
          <circle cx={120} cy={40} r={8} fill="#ef4444" opacity={0.6} />
          <text x={114} y={43} fill="white" fontSize={6}>
            Inh
          </text>
          <circle cx={140} cy={70} r={10} fill="#22c55e" opacity={0.8} />
          <text x={135} y={73} fill="white" fontSize={7}>
            Sub
          </text>
        </>
      )}

      {mode === "non-competitive" && (
        <>
          <circle cx={30} cy={60} r={8} fill="#ef4444" opacity={0.6} />
          <text x={24} y={63} fill="white" fontSize={6}>
            Inh
          </text>
          <circle cx={140} cy={55} r={10} fill="#22c55e" opacity={0.8} />
          <text x={135} y={58} fill="white" fontSize={7}>
            Sub
          </text>
        </>
      )}
    </svg>
  );
}

export function EnzymeKinetics() {
  const [temperature, setTemperature] = useState(OPTIMAL_TEMP);
  const [ph, setPh] = useState(OPTIMAL_PH);
  const [inhibition, setInhibition] = useState<InhibitionMode>("none");

  const baseRate = useMemo(() => calcRate(temperature, ph), [temperature, ph]);

  const effectiveRate = useMemo(() => {
    if (inhibition === "competitive") return Math.round(baseRate * 0.6);
    if (inhibition === "non-competitive") return Math.round(baseRate * 0.4);
    return baseRate;
  }, [baseRate, inhibition]);

  const isOptimalTemp = temperature === OPTIMAL_TEMP;
  const isOptimalPh = ph === OPTIMAL_PH;

  const inhibitionLabel =
    inhibition === "competitive"
      ? "Competitive: inhibitor binds active site, increases Km"
      : inhibition === "non-competitive"
        ? "Non-competitive: inhibitor binds allosteric site, decreases Vmax"
        : "No inhibition: enzyme at normal activity";

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <EnzymeSVG mode={inhibition} />

      <div className="w-full max-w-sm space-y-4">
        <div>
          <label className="flex items-center justify-between text-sm font-medium">
            <span>Temperature</span>
            <span className={isOptimalTemp ? "text-green-600 font-bold" : ""}>
              {temperature}°C {isOptimalTemp && "(optimal: 37°C)"}
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={80}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full min-h-[44px]"
            aria-label="Temperature"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-sm font-medium">
            <span>pH</span>
            <span className={isOptimalPh ? "text-green-600 font-bold" : ""}>
              {ph} {isOptimalPh && "(optimal: pH 7)"}
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={14}
            step={0.5}
            value={ph}
            onChange={(e) => setPh(Number(e.target.value))}
            className="w-full min-h-[44px]"
            aria-label="pH"
          />
        </div>
      </div>

      <div className="w-full max-w-sm" data-testid="reaction-rate">
        <div className="flex items-center justify-between text-sm font-medium mb-1">
          <span>Reaction Rate</span>
          <span className="font-bold">{effectiveRate}%</span>
        </div>
        <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor:
                effectiveRate > 70
                  ? "#22c55e"
                  : effectiveRate > 30
                    ? "#f59e0b"
                    : "#ef4444",
            }}
            animate={{ width: `${effectiveRate}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {(["none", "competitive", "non-competitive"] as InhibitionMode[]).map(
          (mode) => (
            <button
              key={mode}
              onClick={() => setInhibition(mode)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium min-h-[44px] transition-colors ${
                inhibition === mode
                  ? "border-primary bg-primary/10 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              {mode === "none"
                ? "No Inhibition"
                : mode === "competitive"
                  ? "Competitive"
                  : "Non-competitive"}
            </button>
          )
        )}
      </div>

      <p
        className="text-center text-xs text-muted-foreground"
        data-testid="inhibition-info"
      >
        {inhibitionLabel}
      </p>
    </div>
  );
}
