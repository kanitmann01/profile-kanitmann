"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Phase {
  name: string;
  description: string;
}

const PHASES: Phase[] = [
  {
    name: "Interphase",
    description:
      "Cell grows, replicates DNA, and prepares for division. Chromosomes are in chromatin form.",
  },
  {
    name: "Prophase",
    description:
      "Chromatin condenses into visible chromosomes. Nuclear envelope begins to break down. Spindle fibers form.",
  },
  {
    name: "Metaphase",
    description:
      "Chromosomes align at the cell equator (metaphase plate). Spindle fibers attach to centromeres.",
  },
  {
    name: "Anaphase",
    description:
      "Sister chromatids separate and move to opposite poles. Cell elongates.",
  },
  {
    name: "Telophase",
    description:
      "Chromosomes decondense at each pole. Nuclear envelopes reform around both sets of chromosomes.",
  },
  {
    name: "Cytokinesis",
    description:
      "Cytoplasm divides. Two identical daughter cells are formed, each with a complete set of chromosomes.",
  },
];

function CellDiagram({ stepIndex }: { stepIndex: number }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full max-w-[200px]"
      role="img"
      aria-label={PHASES[stepIndex].name}
    >
      {stepIndex <= 4 && (
        <ellipse
          cx={100}
          cy={100}
          rx={stepIndex === 5 ? 0 : 80}
          ry={stepIndex === 5 ? 0 : 70}
          fill="none"
          stroke="#64748b"
          strokeWidth={2}
          strokeDasharray={stepIndex >= 4 ? "4 4" : "none"}
        />
      )}

      {stepIndex === 5 && (
        <>
          <ellipse
            cx={65}
            cy={100}
            rx={45}
            ry={50}
            fill="none"
            stroke="#64748b"
            strokeWidth={2}
          />
          <ellipse
            cx={135}
            cy={100}
            rx={45}
            ry={50}
            fill="none"
            stroke="#64748b"
            strokeWidth={2}
          />
        </>
      )}

      {stepIndex === 0 && (
        <circle cx={100} cy={100} r={20} fill="#8b5cf6" opacity={0.3} />
      )}

      {stepIndex === 1 && (
        <>
          <line
            x1={80}
            y1={80}
            x2={90}
            y2={100}
            stroke="#ef4444"
            strokeWidth={3}
          />
          <line
            x1={90}
            y1={100}
            x2={80}
            y2={120}
            stroke="#ef4444"
            strokeWidth={3}
          />
          <line
            x1={110}
            y1={85}
            x2={120}
            y2={100}
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <line
            x1={120}
            y1={100}
            x2={110}
            y2={115}
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </>
      )}

      {stepIndex === 2 && (
        <>
          <line
            x1={85}
            y1={95}
            x2={95}
            y2={105}
            stroke="#ef4444"
            strokeWidth={3}
          />
          <line
            x1={95}
            y1={95}
            x2={85}
            y2={105}
            stroke="#ef4444"
            strokeWidth={3}
          />
          <line
            x1={105}
            y1={95}
            x2={115}
            y2={105}
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <line
            x1={115}
            y1={95}
            x2={105}
            y2={105}
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <line
            x1={40}
            y1={100}
            x2={160}
            y2={100}
            stroke="#94a3b8"
            strokeWidth={1}
            strokeDasharray="4 2"
          />
        </>
      )}

      {stepIndex === 3 && (
        <>
          <line
            x1={55}
            y1={75}
            x2={65}
            y2={85}
            stroke="#ef4444"
            strokeWidth={3}
          />
          <line
            x1={55}
            y1={115}
            x2={65}
            y2={125}
            stroke="#ef4444"
            strokeWidth={3}
          />
          <line
            x1={135}
            y1={75}
            x2={145}
            y2={85}
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <line
            x1={135}
            y1={115}
            x2={145}
            y2={125}
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </>
      )}

      {stepIndex === 4 && (
        <>
          <circle cx={60} cy={100} r={15} fill="#8b5cf6" opacity={0.3} />
          <circle cx={140} cy={100} r={15} fill="#8b5cf6" opacity={0.3} />
        </>
      )}

      {stepIndex === 5 && (
        <>
          <circle cx={65} cy={100} r={10} fill="#8b5cf6" opacity={0.3} />
          <circle cx={135} cy={100} r={10} fill="#8b5cf6" opacity={0.3} />
        </>
      )}
    </svg>
  );
}

export function MitosisSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () =>
    setCurrentStep((s) => Math.min(s + 1, PHASES.length - 1));
  const goPrev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <h3 className="text-xl font-bold">{PHASES[currentStep].name}</h3>
          <CellDiagram stepIndex={currentStep} />
          <p
            className="max-w-sm text-center text-sm text-muted-foreground"
            data-testid="phase-description"
          >
            {PHASES[currentStep].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2">
        {PHASES.map((_, i) => (
          <button
            key={i}
            data-testid="step-dot"
            onClick={() => setCurrentStep(i)}
            className={`h-3 w-3 rounded-full transition-colors min-h-[12px] ${
              i === currentStep ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={goPrev}
          disabled={currentStep === 0}
          className="rounded-lg border px-4 py-2 text-sm font-medium min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
        >
          Prev
        </button>
        <button
          onClick={goNext}
          disabled={currentStep === PHASES.length - 1}
          className="rounded-lg border px-4 py-2 text-sm font-medium min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
