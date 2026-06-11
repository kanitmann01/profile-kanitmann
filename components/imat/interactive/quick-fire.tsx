"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Zap, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuickFireQuestion {
  id: string;
  question: string;
  answer: string;
  hint?: string;
  context?: string;
}

interface QuickFireProps {
  questions: QuickFireQuestion[];
  title?: string;
  className?: string;
}

export function QuickFire({
  questions,
  title = "Quick-Fire Recall",
  className,
}: QuickFireProps) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const submit = useCallback(() => {
    const correct =
      input.trim().toLowerCase() === questions[current].answer.toLowerCase();
    setResults((r) => [...r, correct]);
    setShowResult(true);
  }, [input, current, questions]);

  const next = useCallback(() => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setInput("");
      setShowResult(false);
      setShowHint(false);
      setStartTime(Date.now());
    }
  }, [current, questions.length]);

  const resetAll = () => {
    setCurrent(0);
    setInput("");
    setResults([]);
    setShowResult(false);
    setShowHint(false);
    setStartTime(Date.now());
  };

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const correctCount = results.filter(Boolean).length;
  const isDone = current >= questions.length;

  if (isDone) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("rounded-xl border bg-card p-4 text-center", className)}
      >
        <Zap className="mx-auto h-8 w-8 text-amber-500 mb-2" />
        <h4 className="font-semibold">{title} — Complete!</h4>
        <p className="text-sm text-muted-foreground mt-1">
          {correctCount}/{questions.length} correct
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={resetAll}
          className="mt-3 gap-1"
        >
          <RotateCcw className="h-3 w-3" />
          Retry
        </Button>
      </motion.div>
    );
  }

  const q = questions[current];

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-sm flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-amber-500" />
          {title}
        </h4>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {results.length}/{questions.length}
          </span>
          <span className="text-[10px] text-muted-foreground/60">
            {elapsed}s
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {q.context && (
            <p className="text-xs text-muted-foreground/70 mb-1 italic">
              {q.context}
            </p>
          )}
          <p className="text-sm font-medium mb-2">{q.question}</p>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && input && !showResult) submit();
                if (e.key === "Enter" && showResult) next();
              }}
              autoFocus
            />
            {!showResult && (
              <Button
                onClick={submit}
                disabled={!input.trim()}
                size="sm"
                className="gap-1"
              >
                <Zap className="h-3 w-3" />
                Check
              </Button>
            )}
          </div>

          {!showResult && q.hint && (
            <div className="mt-2">
              {showHint ? (
                <p className="text-xs text-muted-foreground bg-muted rounded p-2">
                  {q.hint}
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

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg p-2",
                  results[results.length - 1]
                    ? "bg-green-500/10 text-green-600"
                    : "bg-red-500/10 text-red-600"
                )}
              >
                {results[results.length - 1] ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 shrink-0" />
                )}
                <span className="text-sm">
                  {results[results.length - 1]
                    ? "Correct!"
                    : `Incorrect — Answer: ${q.answer}`}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={next}
                  className="ml-auto h-7 text-xs"
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-3 flex gap-1">
        {questions.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < results.length
                ? results[i]
                  ? "bg-green-500"
                  : "bg-red-500"
                : i === current
                  ? "bg-primary"
                  : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
