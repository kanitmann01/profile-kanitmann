"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StepSolverProps {
  problem: string;
  steps: {
    label: string;
    answer: string;
    hint?: string;
  }[];
  equation?: string;
  className?: string;
}

export function StepSolver({
  problem,
  steps,
  equation,
  className,
}: StepSolverProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleSubmit = () => {
    const correct =
      input.trim().toLowerCase() === steps[currentStep].answer.toLowerCase();
    const newResults = [...results, correct];
    setResults(newResults);
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setInput("");
      setShowHint(false);
    } else {
      setComplete(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setInput("");
    setResults([]);
    setShowHint(false);
    setComplete(false);
  };

  if (complete) {
    const correct = results.filter(Boolean).length;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("rounded-xl border bg-card p-4 text-center", className)}
      >
        <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 mb-2" />
        <h4 className="font-semibold">
          {correct === steps.length ? "Perfect!" : "Complete!"}
        </h4>
        <p className="text-sm text-muted-foreground mt-1">
          {correct}/{steps.length} steps correct
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={reset}
          className="mt-3 gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      {equation && <div className="mb-3 flex justify-center">{equation}</div>}
      <p className="text-sm font-medium mb-3">{problem}</p>
      <div className="flex items-center gap-2 mb-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < results.length
                ? results[i]
                  ? "bg-green-500"
                  : "bg-red-500"
                : i === currentStep
                  ? "bg-primary"
                  : "bg-muted"
            )}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <p className="text-sm text-muted-foreground mb-2">
            Step {currentStep + 1}: {steps[currentStep].label}
          </p>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your answer..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && input && handleSubmit()}
            />
            <Button
              onClick={handleSubmit}
              disabled={!input.trim()}
              size="sm"
              className="gap-1"
            >
              <ArrowRight className="h-3 w-3" />
              {currentStep < steps.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
          {steps[currentStep].hint && (
            <div className="mt-2">
              {showHint ? (
                <p className="text-xs text-muted-foreground bg-muted rounded p-2">
                  {steps[currentStep].hint}
                </p>
              ) : (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-muted-foreground/60 hover:text-muted-foreground underline"
                >
                  Need a hint?
                </button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
