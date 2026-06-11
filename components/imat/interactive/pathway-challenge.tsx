"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, CheckCircle2, RotateCcw, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StepCard {
  id: string;
  label: string;
  enzyme: string;
  detail: string;
}

const STEPS_CORRECT: StepCard[] = [
  {
    id: "hexokinase",
    label: "Glucose → G6P",
    enzyme: "Hexokinase",
    detail: "Traps glucose in cell",
  },
  {
    id: "pfk1",
    label: "F6P → F1,6BP",
    enzyme: "PFK-1",
    detail: "Rate-limiting step ⚡",
  },
  {
    id: "g3p-dehydro",
    label: "G3P → 1,3-BPG",
    enzyme: "G3P Dehydrogenase",
    detail: "Produces NADH",
  },
  {
    id: "pgk",
    label: "1,3-BPG → 3-PG",
    enzyme: "PGK",
    detail: "First ATP produced",
  },
  {
    id: "pyruvate-kinase",
    label: "PEP → Pyruvate",
    enzyme: "Pyruvate Kinase",
    detail: "Final ATP + product",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PathwayChallenge() {
  const [items, setItems] = useState(() => shuffle(STEPS_CORRECT));
  const [selected, setSelected] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [complete, setComplete] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  const handleClick = (id: string) => {
    if (complete) return;
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      return [...prev, id];
    });
  };

  const checkOrder = useCallback(() => {
    const correctOrder = STEPS_CORRECT.map((s) => s.id);
    const isCorrect =
      selected.length === correctOrder.length &&
      selected.every((id, i) => id === correctOrder[i]);
    setAttempts((a) => a + 1);

    if (isCorrect) {
      setComplete(true);
    }

    if (!isCorrect) {
      setTimeout(() => setSelected([]), 800);
    }
  }, [selected]);

  useEffect(() => {
    if (selected.length === STEPS_CORRECT.length && !complete) {
      checkOrder();
    }
  }, [selected, complete, checkOrder]);

  const reset = () => {
    setItems(shuffle(STEPS_CORRECT));
    setSelected([]);
    setAttempts(0);
    setComplete(false);
  };

  const handleDragStart = (idx: number) => setDraggedIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx) return;
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIdx, 1);
    newItems.splice(idx, 0, removed);
    setItems(newItems);
    setDraggedIdx(idx);
  };
  const handleDragEnd = () => setDraggedIdx(null);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">Pathway Challenge</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {attempts > 0 && `Attempts: ${attempts}`}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-7 px-2 gap-1"
          >
            <Shuffle className="h-3 w-3" />
            New
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {complete
          ? "🎉 Perfect order! You know the pathway."
          : "Arrange these glycolysis steps in the correct order. Click each step in sequence:"}
      </p>

      <AnimatePresence mode="popLayout">
        {complete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid gap-1.5"
          >
            {STEPS_CORRECT.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-2.5"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-600">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{step.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {step.enzyme} — {step.detail}
                  </p>
                </div>
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="grid gap-1.5">
            {items.map((step, idx) => {
              const isSelected = selected.includes(step.id);
              const isCorrect =
                STEPS_CORRECT[selected.indexOf(step.id)]?.id === step.id;
              const showResult = isSelected && !complete;
              const isWrong =
                showResult &&
                selected.length === STEPS_CORRECT.length &&
                !isCorrect;

              return (
                <motion.div
                  key={step.id}
                  onMouseDown={() => handleDragStart(idx)}
                  onMouseUp={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  draggable
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-2.5 transition-all cursor-grab active:cursor-grabbing select-none",
                    isSelected && !isWrong && "border-primary/40 bg-primary/5",
                    isWrong && "border-red-500/40 bg-red-500/10"
                  )}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <div
                    onClick={() => handleClick(step.id)}
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-muted-foreground/30 text-muted-foreground hover:border-primary/60"
                    )}
                  >
                    {isSelected ? selected.indexOf(step.id) + 1 : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {step.enzyme}
                    </p>
                  </div>
                  <ArrowDown className="h-3 w-3 text-muted-foreground/40" />
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
