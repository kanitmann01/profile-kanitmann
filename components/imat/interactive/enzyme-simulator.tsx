"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnzymeSimulatorProps {
  className?: string;
}

function pfk1Activity(atpLevel: number, ampLevel: number, ph: number): number {
  let activity = 100;
  activity -= Math.max(0, (atpLevel - 30) * 1.2);
  activity -= Math.max(0, (7.4 - ph) * 60);
  activity += Math.max(0, ampLevel * 0.8);
  return Math.max(0, Math.min(100, activity));
}

function pathwayFlux(atpLevel: number, ampLevel: number, ph: number): number {
  const base = 100;
  const atpEffect =
    atpLevel > 50 ? -(atpLevel - 50) * 1.5 : (50 - atpLevel) * 0.5;
  const ampEffect = ampLevel * 1.2;
  const phEffect = Math.abs(ph - 7.4) * 80;
  return Math.max(0, Math.min(150, base + atpEffect + ampEffect - phEffect));
}

export function EnzymeSimulator({ className }: EnzymeSimulatorProps) {
  const [atpLevel, setAtpLevel] = useState(70);
  const [ampLevel, setAmpLevel] = useState(30);
  const [ph, setPh] = useState(7.4);
  const [showDetail, setShowDetail] = useState(false);

  const activity = useMemo(
    () => pfk1Activity(atpLevel, ampLevel, ph),
    [atpLevel, ampLevel, ph]
  );
  const flux = useMemo(
    () => pathwayFlux(atpLevel, ampLevel, ph),
    [atpLevel, ampLevel, ph]
  );

  const activityColor =
    activity > 70
      ? "text-green-500"
      : activity > 30
        ? "text-amber-500"
        : "text-red-500";
  const fluxColor =
    flux > 80
      ? "text-green-500"
      : flux > 30
        ? "text-amber-500"
        : "text-red-500";

  const atpPresets = [20, 50, 80, 100];
  const ampPresets = [10, 30, 60, 90];

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">Enzyme Regulation Simulator</h4>
        <span className="text-[10px] text-muted-foreground">
          Drag to see PFK-1 respond
        </span>
      </div>

      <div className="grid gap-4">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">ATP Level</span>
            <span
              className={cn(
                "font-bold",
                atpLevel > 60 ? "text-red-500" : "text-green-500"
              )}
            >
              {atpLevel}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={atpLevel}
            onChange={(e) => setAtpLevel(Number(e.target.value))}
            className="w-full accent-red-500"
          />
          <div className="flex gap-1 mt-1">
            {atpPresets.map((v) => (
              <button
                key={v}
                onClick={() => setAtpLevel(v)}
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded transition-colors",
                  atpLevel === v
                    ? "bg-red-500/20 text-red-600"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">AMP Level</span>
            <span
              className={cn(
                "font-bold",
                ampLevel > 50 ? "text-green-500" : "text-muted-foreground"
              )}
            >
              {ampLevel}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={ampLevel}
            onChange={(e) => setAmpLevel(Number(e.target.value))}
            className="w-full accent-green-500"
          />
          <div className="flex gap-1 mt-1">
            {ampPresets.map((v) => (
              <button
                key={v}
                onClick={() => setAmpLevel(v)}
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded transition-colors",
                  ampLevel === v
                    ? "bg-green-500/20 text-green-600"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-medium">pH</span>
            <span className="font-bold">{ph.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min={6.5}
            max={8.0}
            step={0.1}
            value={ph}
            onChange={(e) => setPh(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5 }}
          className={cn(
            "rounded-lg border p-3 text-center transition-colors",
            activity > 70
              ? "border-green-500/30 bg-green-500/10"
              : activity > 30
                ? "border-amber-500/30 bg-amber-500/10"
                : "border-red-500/30 bg-red-500/10"
          )}
        >
          <p className="text-xs text-muted-foreground mb-1">PFK-1 Activity</p>
          <p className={cn("text-2xl font-bold", activityColor)}>
            {Math.round(activity)}%
          </p>
          <motion.div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full",
                activity > 70
                  ? "bg-green-500"
                  : activity > 30
                    ? "bg-amber-500"
                    : "bg-red-500"
              )}
              animate={{ width: `${activity}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "rounded-lg border p-3 text-center transition-colors",
            flux > 80
              ? "border-green-500/30 bg-green-500/10"
              : flux > 30
                ? "border-amber-500/30 bg-amber-500/10"
                : "border-red-500/30 bg-red-500/10"
          )}
        >
          <p className="text-xs text-muted-foreground mb-1">Pathway Flux</p>
          <p className={cn("text-2xl font-bold", fluxColor)}>
            {Math.round(flux)}%
          </p>
          <motion.div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              className={cn(
                "h-full rounded-full",
                flux > 80
                  ? "bg-green-500"
                  : flux > 30
                    ? "bg-amber-500"
                    : "bg-red-500"
              )}
              animate={{ width: `${flux}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.div>
        </motion.div>
      </div>

      <button
        onClick={() => setShowDetail(!showDetail)}
        className="mt-3 text-xs text-muted-foreground hover:text-foreground underline w-full text-center"
      >
        {showDetail ? "Hide" : "Show"} regulation details
      </button>

      {showDetail && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mt-2 text-[11px] text-muted-foreground bg-muted rounded-lg p-3 space-y-1"
        >
          <p>High ATP ({">"}60%) → inhibits PFK-1 → slows glycolysis</p>
          <p>High AMP ({">"}50%) → activates PFK-1 → speeds up glycolysis</p>
          <p>Low pH (&lt;7.2) → inhibits PFK-1 → prevents lactic acidosis</p>
          <p className="text-[10px] italic mt-1">
            Current: PFK-1 is{" "}
            {activity > 70
              ? "highly active"
              : activity > 30
                ? "moderately active"
                : "strongly inhibited"}
            .
            {flux > 80
              ? " Glycolysis is running at full speed."
              : flux > 30
                ? " Glycolysis is partially active."
                : " Glycolysis is nearly halted."}
          </p>
        </motion.div>
      )}
    </div>
  );
}
