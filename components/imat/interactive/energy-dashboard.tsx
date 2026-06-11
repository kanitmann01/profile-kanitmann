"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnergyDashboardProps {
  className?: string;
}

interface Metabolite {
  id: string;
  label: string;
  value: number;
  unit: string;
  color: string;
  icon: string;
}

const DEFAULT_STATE: Metabolite[] = [
  {
    id: "glucose",
    label: "Glucose",
    value: 1,
    unit: "mol",
    color: "text-blue-500",
    icon: "⬡",
  },
  {
    id: "atp-invested",
    label: "ATP Invested",
    value: 2,
    unit: "",
    color: "text-red-500",
    icon: "−",
  },
  {
    id: "atp-produced",
    label: "ATP Produced",
    value: 4,
    unit: "",
    color: "text-green-500",
    icon: "+",
  },
  {
    id: "atp-net",
    label: "ATP Net",
    value: 2,
    unit: "",
    color: "text-amber-500",
    icon: "=",
  },
  {
    id: "nadh",
    label: "NADH",
    value: 2,
    unit: "",
    color: "text-purple-500",
    icon: "⊕",
  },
  {
    id: "pyruvate",
    label: "Pyruvate",
    value: 2,
    unit: "mol",
    color: "text-orange-500",
    icon: "◆",
  },
];

export function EnergyDashboard({ className }: EnergyDashboardProps) {
  const [metabolites] = useState(DEFAULT_STATE);
  const [animating, setAnimating] = useState<string | null>(null);
  const [phase, setPhase] = useState<
    "idle" | "investment" | "payoff" | "complete"
  >("idle");

  const runAnimation = useCallback(async () => {
    setPhase("investment");
    setAnimating("atp-invested");
    await new Promise((r) => setTimeout(r, 800));
    setAnimating(null);
    await new Promise((r) => setTimeout(r, 400));

    setPhase("payoff");
    setAnimating("atp-produced");
    await new Promise((r) => setTimeout(r, 1200));
    setAnimating(null);
    await new Promise((r) => setTimeout(r, 400));

    setPhase("complete");
    setAnimating("atp-net");
    await new Promise((r) => setTimeout(r, 600));
    setAnimating(null);
  }, []);

  useEffect(() => {
    const timer = setTimeout(runAnimation, 500);
    return () => clearTimeout(timer);
  }, [runAnimation]);

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">Energy Balance Dashboard</h4>
        <button
          onClick={runAnimation}
          className="text-xs text-muted-foreground hover:text-foreground underline"
        >
          Replay
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {metabolites.map((m) => (
          <motion.div
            key={m.id}
            className={cn(
              "relative rounded-lg border p-3 text-center transition-colors overflow-hidden",
              animating === m.id && "ring-2 ring-primary/50",
              phase === "investment" &&
                m.id === "atp-invested" &&
                "border-red-500/50 bg-red-500/10",
              phase === "payoff" &&
                m.id === "atp-produced" &&
                "border-green-500/50 bg-green-500/10",
              phase === "complete" &&
                m.id === "atp-net" &&
                "border-amber-500/50 bg-amber-500/10"
            )}
            animate={{
              scale: animating === m.id ? [1, 1.05, 1] : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-lg">{m.icon}</span>
            <div className={cn("text-2xl font-bold mt-1", m.color)}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${m.id}-${m.value}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {m.value > 0 && m.id !== "glucose" && m.id !== "pyruvate"
                    ? "+"
                    : ""}
                  {m.value}
                  {m.id === "glucose" || m.id === "pyruvate"
                    ? ` ${m.unit}`
                    : ` ${m.unit}`}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
              {m.label}
            </p>
            {animating === m.id && (
              <motion.div
                className="absolute inset-0 bg-foreground/5"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              phase === "investment" ? "bg-red-500" : "bg-muted"
            )}
          />
          Investment
        </div>
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              phase === "payoff" ? "bg-green-500" : "bg-muted"
            )}
          />
          Payoff
        </div>
        <div className="flex items-center gap-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full transition-colors",
              phase === "complete" ? "bg-amber-500" : "bg-muted"
            )}
          />
          Complete
        </div>
        {phase !== "idle" && (
          <span className="italic text-[10px]">
            {phase === "investment" && "⚡ Investing 2 ATP..."}
            {phase === "payoff" && "⚡ Producing 4 ATP + 2 NADH..."}
            {phase === "complete" && "✓ Net: 2 ATP"}
          </span>
        )}
      </div>
    </div>
  );
}
