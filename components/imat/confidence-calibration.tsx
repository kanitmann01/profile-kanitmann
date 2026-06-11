"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Confidence } from "@/data/imat/types";

interface ConfidenceCalibrationProps {
  noteSlug: string;
  className?: string;
}

interface CalibrationData {
  before: Confidence;
  after: Confidence;
  timestamp: string;
}

const STORAGE_PREFIX = "imat-calibration-";

function loadCalibration(noteSlug: string): CalibrationData | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${noteSlug}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveCalibration(noteSlug: string, data: CalibrationData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${noteSlug}`, JSON.stringify(data));
  } catch {
    // ignore
  }
}

function getDeltaLabel(before: Confidence, after: Confidence): string {
  const order: Record<Confidence, number> = { weak: 0, ok: 1, strong: 2 };
  const diff = order[after] - order[before];
  if (diff > 0) return "↑ improved";
  if (diff < 0) return "↓ dropped";
  return "→ same";
}

function getDeltaColor(before: Confidence, after: Confidence): string {
  const order: Record<Confidence, number> = { weak: 0, ok: 1, strong: 2 };
  const diff = order[after] - order[before];
  if (diff > 0) return "text-green-600 dark:text-green-400";
  if (diff < 0) return "text-red-600 dark:text-red-400";
  return "text-muted-foreground";
}

const ratingButtons: { value: Confidence; label: string }[] = [
  { value: "weak", label: "Weak" },
  { value: "ok", label: "OK" },
  { value: "strong", label: "Strong" },
];

export function ConfidenceCalibration({
  noteSlug,
  className,
}: ConfidenceCalibrationProps) {
  const [data, setData] = useState<CalibrationData | null>(null);
  const [phase, setPhase] = useState<"before" | "after" | "complete">("before");

  useEffect(() => {
    const existing = loadCalibration(noteSlug);
    if (existing) {
      setData(existing);
      setPhase("complete");
    }
  }, [noteSlug]);

  const handleBeforeRating = (rating: Confidence) => {
    const newData: CalibrationData = {
      before: rating,
      after: rating,
      timestamp: new Date().toISOString(),
    };
    setData(newData);
    saveCalibration(noteSlug, newData);
    setPhase("after");
  };

  const handleAfterRating = (rating: Confidence) => {
    if (!data) return;
    const updated: CalibrationData = {
      ...data,
      after: rating,
      timestamp: new Date().toISOString(),
    };
    setData(updated);
    saveCalibration(noteSlug, updated);
    setPhase("complete");
  };

  return (
    <Card
      className={cn("mb-4", className)}
      data-testid="confidence-calibration"
    >
      <CardContent className="pt-4">
        {phase === "before" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-sm font-medium mb-3">
              How confident do you feel about this topic?
            </p>
            <div className="flex flex-wrap gap-2">
              {ratingButtons.map(({ value, label }) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="min-h-[44px] flex-1 sm:flex-none"
                  onClick={() => handleBeforeRating(value)}
                  data-testid={`rating-${value}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "after" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium mb-3">
              Now that you've read it, how confident do you feel?
            </p>
            <div className="flex flex-wrap gap-2">
              {ratingButtons.map(({ value, label }) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className="min-h-[44px] flex-1 sm:flex-none"
                  onClick={() => handleAfterRating(value)}
                  data-testid={`rating-${value}`}
                >
                  {label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "complete" && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <p className="text-sm text-muted-foreground">
              Confidence:{" "}
              <span className="font-medium capitalize">{data.before}</span>
              {" → "}
              <span className="font-medium capitalize">{data.after}</span>
            </p>
            <p
              className={cn(
                "text-sm font-medium",
                getDeltaColor(data.before, data.after)
              )}
              data-testid="delta-indicator"
            >
              {getDeltaLabel(data.before, data.after)}
            </p>
            {getDeltaLabel(data.before, data.after).includes("dropped") && (
              <p className="text-xs text-muted-foreground italic">
                Consider reviewing the prerequisites
              </p>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
