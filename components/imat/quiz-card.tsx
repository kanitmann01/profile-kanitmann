"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/imat/types";

interface QuizCardProps {
  question: Question;
  onAnswered?: (correct: boolean) => void;
  className?: string;
}

export function QuizCard({ question, onAnswered, className }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isCorrect =
    selectedAnswer.toLowerCase().trim() ===
    question.answer.toLowerCase().trim();

  const submit = (answer: string) => {
    setSelectedAnswer(answer);
    setIsSubmitted(true);
    const correct =
      answer.toLowerCase().trim() === question.answer.toLowerCase().trim();
    onAnswered?.(correct);
  };

  const handleSelect = (answer: string) => {
    if (isSubmitted) return;
    if (question.type === "multiple-choice" || question.type === "true-false") {
      submit(answer);
    } else {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer.trim() || isSubmitted) return;
    submit(selectedAnswer);
  };

  const feedbackColor = isCorrect
    ? "bg-green-500/10 border-green-500/30"
    : "bg-red-500/10 border-red-500/30";

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-medium">{question.prompt}</p>
          <Badge variant="outline" className="shrink-0 capitalize">
            {question.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
              "mb-4 flex items-center gap-2 rounded-lg border p-3",
              feedbackColor
            )}
            data-feedback={isCorrect ? "correct" : "incorrect"}
          >
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span className="font-medium capitalize">
              {isCorrect ? "Correct!" : "Incorrect"}
            </span>
            {!isCorrect && (
              <span className="text-sm text-muted-foreground">
                — Answer: {question.answer}
              </span>
            )}
          </motion.div>
        )}

        {question.type === "multiple-choice" && (
          <div className="grid gap-2">
            {question.options?.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectOption = isSubmitted && option === question.answer;
              const isWrongSelection = isSubmitted && isSelected && !isCorrect;

              return (
                <Button
                  key={option}
                  variant="outline"
                  disabled={isSubmitted}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "justify-start min-h-[44px] text-left h-auto py-3",
                    isCorrectOption &&
                      "border-green-500 bg-green-500/10 text-green-700",
                    isWrongSelection &&
                      "border-red-500 bg-red-500/10 text-red-700"
                  )}
                  data-testid={`option-${option}`}
                >
                  {option}
                </Button>
              );
            })}
          </div>
        )}

        {question.type === "fill-blank" && (
          <div className="flex gap-2">
            <Input
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your answer..."
              className="min-h-[44px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
            />
            {!isSubmitted && (
              <Button
                onClick={handleSubmit}
                disabled={!selectedAnswer.trim()}
                className="min-h-[44px] min-w-[80px]"
              >
                Check
              </Button>
            )}
          </div>
        )}

        {question.type === "true-false" && (
          <div className="grid grid-cols-2 gap-3">
            {["True", "False"].map((val) => {
              const isSelected = selectedAnswer === val;
              const isCorrectOption = isSubmitted && val === question.answer;
              const isWrongSelection = isSubmitted && isSelected && !isCorrect;

              return (
                <Button
                  key={val}
                  variant="outline"
                  disabled={isSubmitted}
                  onClick={() => handleSelect(val)}
                  className={cn(
                    "min-h-[44px] text-lg",
                    isCorrectOption &&
                      "border-green-500 bg-green-500/10 text-green-700",
                    isWrongSelection &&
                      "border-red-500 bg-red-500/10 text-red-700"
                  )}
                >
                  {val}
                </Button>
              );
            })}
          </div>
        )}

        {question.type === "explain-why" && (
          <div className="grid gap-3">
            <Textarea
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={isSubmitted}
              placeholder="Type your explanation..."
              className="min-h-[100px]"
            />
            {!isSubmitted && (
              <Button
                onClick={() => submit(question.answer)}
                variant="secondary"
                className="min-h-[44px]"
              >
                Show Answer
              </Button>
            )}
          </div>
        )}

        {isSubmitted && question.explanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground"
          >
            <span className="font-medium text-foreground">Explanation: </span>
            {question.explanation}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
