"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Step {
  label: string;
  enzyme: string;
  substrate: string;
  product: string;
  atp: number;
  nadh: number;
  isRegulatory: boolean;
  phase: "investment" | "payoff";
}

const STEPS: Step[] = [
  {
    label: "Step 1",
    enzyme: "Hexokinase",
    substrate: "Glucose",
    product: "Glucose-6-phosphate",
    atp: -1,
    nadh: 0,
    isRegulatory: false,
    phase: "investment",
  },
  {
    label: "Step 3",
    enzyme: "PFK-1",
    substrate: "Fructose-6-phosphate",
    product: "Fructose-1,6-bisphosphate",
    atp: -1,
    nadh: 0,
    isRegulatory: true,
    phase: "investment",
  },
  {
    label: "Step 6",
    enzyme: "G3P Dehydrogenase",
    substrate: "Glyceraldehyde-3-phosphate",
    product: "1,3-Bisphosphoglycerate",
    atp: 0,
    nadh: 1,
    isRegulatory: false,
    phase: "payoff",
  },
  {
    label: "Step 7",
    enzyme: "Phosphoglycerate kinase",
    substrate: "1,3-BPG",
    product: "3-Phosphoglycerate",
    atp: 1,
    nadh: 0,
    isRegulatory: false,
    phase: "payoff",
  },
  {
    label: "Step 10",
    enzyme: "Pyruvate kinase",
    substrate: "Phosphoenolpyruvate",
    product: "Pyruvate",
    atp: 1,
    nadh: 0,
    isRegulatory: false,
    phase: "payoff",
  },
];

export function GlycolysisPathway() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setActiveStep(activeStep === index ? null : index);
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const totalATP = STEPS.reduce((sum, s) => sum + s.atp, 0);
  const totalNADH = STEPS.reduce((sum, s) => sum + s.nadh, 0);

  return (
    <div className="rounded-xl border bg-card p-4">
      <h4 className="font-semibold text-sm mb-3">Glycolysis Pathway Map</h4>
      <div className="relative">
        <svg className="absolute left-4 top-0 h-full w-0.5" aria-hidden>
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            className="text-muted-foreground/30"
            strokeWidth="2"
          />
        </svg>
        <div className="grid gap-3">
          {STEPS.map((step, i) => (
            <motion.button
              key={step.label}
              onClick={() => toggleStep(i)}
              className={cn(
                "relative flex items-start gap-3 rounded-lg border p-3 text-left transition-all w-full",
                activeStep === i && "ring-2 ring-primary/50",
                completedSteps.has(i) && "bg-primary/5",
                step.isRegulatory && "border-amber-500/30"
              )}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  "z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                  completedSteps.has(i)
                    ? "border-green-500 bg-green-500/20 text-green-600"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold",
                      step.phase === "investment"
                        ? "text-red-500"
                        : "text-green-500"
                    )}
                  >
                    {step.enzyme}
                  </span>
                  {step.isRegulatory && (
                    <span className="text-[10px] px-1 py-0.5 rounded bg-amber-500/10 text-amber-600 font-medium">
                      Rate-limiting
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.substrate} → {step.product}
                </p>
                <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span>
                    ATP:{" "}
                    <span
                      className={
                        step.atp > 0
                          ? "text-green-500"
                          : step.atp < 0
                            ? "text-red-500"
                            : ""
                      }
                    >
                      {step.atp > 0 ? `+${step.atp}` : step.atp}
                    </span>
                  </span>
                  {step.nadh > 0 && (
                    <span>
                      NADH: <span className="text-blue-500">+{step.nadh}</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex gap-4 border-t pt-3 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Net ATP:</span>
          <span className="font-bold text-green-500">+{totalATP}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Net NADH:</span>
          <span className="font-bold text-blue-500">+{totalNADH}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Investment:</span>
          <span className="font-bold text-red-500">-2 ATP</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground">Payoff:</span>
          <span className="font-bold text-green-500">+4 ATP</span>
        </div>
      </div>
    </div>
  );
}
