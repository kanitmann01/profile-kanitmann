"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QuizCard } from "./quiz-card";
import { ReviewButtons } from "./review-buttons";
import type { Question } from "@/data/imat/types";

interface ReviewSessionProps {
  questions: Question[];
  slug: string;
  className?: string;
}

export function ReviewSession({
  questions,
  slug,
  className,
}: ReviewSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  if (questions.length === 0) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">No questions available.</p>
        </CardContent>
      </Card>
    );
  }

  const isComplete = currentIndex >= questions.length;
  const progress = (currentIndex / questions.length) * 100;

  const handleAnswered = (correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    setCurrentIndex((i) => i + 1);
    setAnswered(false);
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center gap-3">
        <Progress value={progress} className="h-2 flex-1" />
        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
          {Math.min(currentIndex + 1, questions.length)} of {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {!isComplete && (
          <motion.div
            key={questions[currentIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <QuizCard
              question={questions[currentIndex]}
              onAnswered={handleAnswered}
            />
            {answered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex justify-end"
              >
                <button
                  onClick={handleNext}
                  className="text-sm font-medium text-primary hover:underline cursor-pointer"
                  data-testid="next-button"
                >
                  {currentIndex < questions.length - 1
                    ? "Next question →"
                    : "See results →"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">
                Score: {correctCount} of {questions.length}
              </h3>
              <p className="text-sm text-muted-foreground">
                {correctCount === questions.length
                  ? "Perfect score! Great job."
                  : correctCount >= questions.length / 2
                    ? "Good effort! Review the ones you missed."
                    : "Keep practicing — you'll get there."}
              </p>
            </CardHeader>
            <CardContent>
              <ReviewButtons slug={slug} />
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
