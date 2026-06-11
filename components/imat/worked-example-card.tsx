"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { WorkedExample } from "@/data/imat/types";

interface WorkedExampleCardProps {
  example: WorkedExample;
  className?: string;
}

export function WorkedExampleCard({
  example,
  className,
}: WorkedExampleCardProps) {
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const maxHints = example.hints.length;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="border-b bg-muted/30 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Worked Example</h3>
          {example.imatYear && (
            <Badge variant="outline" className="ml-auto text-xs">
              IMAT {example.imatYear}
            </Badge>
          )}
        </div>
        <p className="mt-2 text-sm">{example.question}</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {Array.from({ length: revealedHints }).map((_, i) => (
              <motion.div
                key={`hint-${i}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2 rounded-lg bg-indigo-500/5 border border-indigo-500/20 p-3"
              >
                <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-indigo-500" />
                <div>
                  <span className="text-xs font-semibold text-indigo-600">
                    Hint {i + 1}
                  </span>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {example.hints[i]}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex gap-2">
            {revealedHints < maxHints && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRevealedHints((r) => r + 1)}
                className="gap-1"
              >
                <ChevronDown className="h-4 w-4" />
                Hint {revealedHints + 1}/{maxHints}
              </Button>
            )}
            {!showSolution && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSolution(true)}
                className="ml-auto gap-1"
              >
                Show Solution
                <ChevronDown className="h-4 w-4" />
              </Button>
            )}
          </div>

          <AnimatePresence>
            {showSolution && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-green-500/30 bg-green-500/5 p-4"
              >
                <h4 className="text-sm font-semibold text-green-600 mb-1">
                  Solution
                </h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {example.solution}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
