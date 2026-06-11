"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSpacedRepetition } from "@/hooks/use-spaced-repetition";
import type { Question } from "@/data/imat/types";

interface InlineReviewProps {
  questions: Question[];
  noteSlug: string;
  className?: string;
}

function selectInlineQuestions(questions: Question[], max = 3): Question[] {
  const recall = questions.filter((q) => q.difficulty === "recall");
  const apply = questions.filter((q) => q.difficulty === "apply");
  const selected = [...recall, ...apply].slice(0, max);
  return selected;
}

export function InlineReview({
  questions,
  noteSlug,
  className,
}: InlineReviewProps) {
  const { recordReview } = useSpacedRepetition();
  const storageKey = `imat-inline-review-${noteSlug}`;

  const inlineQuestions = useMemo(
    () => selectInlineQuestions(questions),
    [questions]
  );

  const [answered, setAnswered] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setAnswered(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const persistAnswered = (next: Record<string, boolean>) => {
    setAnswered(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleReveal = (qId: string) => {
    setRevealed((prev) => ({ ...prev, [qId]: true }));
  };

  const handleResult = (qId: string, gotIt: boolean) => {
    recordReview(noteSlug, gotIt ? "nailed" : "forgot");
    persistAnswered({ ...answered, [qId]: gotIt });
  };

  if (inlineQuestions.length === 0) return null;

  return (
    <div className={cn("grid gap-3", className)} data-testid="inline-review">
      <p className="text-sm font-medium text-muted-foreground">Quick check</p>
      {inlineQuestions.map((q) => {
        const isAnswered = q.id in answered;
        const isRevealed = revealed[q.id] || isAnswered;

        return (
          <Card key={q.id} data-testid={`inline-card-${q.id}`}>
            <CardContent className="pt-4">
              <p className="font-medium">{q.prompt}</p>

              {!isRevealed && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => handleReveal(q.id)}
                  data-testid={`reveal-${q.id}`}
                >
                  Show answer
                </Button>
              )}

              {isRevealed && !isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 space-y-2"
                >
                  <p className="text-sm text-muted-foreground">{q.answer}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500/50 text-green-700 dark:text-green-400"
                      onClick={() => handleResult(q.id, true)}
                      data-testid={`got-it-${q.id}`}
                    >
                      Got it
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-700 dark:text-red-400"
                      onClick={() => handleResult(q.id, false)}
                      data-testid={`missed-${q.id}`}
                    >
                      Missed
                    </Button>
                  </div>
                </motion.div>
              )}

              {isAnswered && (
                <div className="mt-2 text-sm" data-testid={`result-${q.id}`}>
                  {answered[q.id] ? (
                    <span className="text-green-600 dark:text-green-400">
                      ✓ Got it
                    </span>
                  ) : (
                    <span className="text-red-600 dark:text-red-400">
                      ✗ Missed
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
