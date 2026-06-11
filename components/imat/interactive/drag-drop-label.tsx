"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DragDropLabelProps {
  items: {
    id: string;
    label: string;
    target: string;
  }[];
  diagram?: React.ReactNode;
  className?: string;
}

export function DragDropLabel({
  items,
  diagram,
  className,
}: DragDropLabelProps) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [available, setAvailable] = useState(
    items.map((i) => ({ id: i.id, label: i.label }))
  );
  const [dragging, setDragging] = useState<string | null>(null);

  const handleDrop = useCallback(
    (targetId: string) => {
      if (!dragging) return;
      setPlaced((prev) => ({ ...prev, [targetId]: dragging }));
      setAvailable((prev) => prev.filter((a) => a.id !== dragging));
      setDragging(null);
    },
    [dragging]
  );

  const reset = () => {
    setPlaced({});
    setAvailable(items.map((i) => ({ id: i.id, label: i.label })));
    setDragging(null);
  };

  const allPlaced = available.length === 0;
  const correct = items.every((item) => placed[item.target] === item.id);

  return (
    <div className={cn("rounded-xl border bg-card p-4", className)}>
      <h4 className="font-semibold text-sm mb-3">Label the Diagram</h4>
      <div className="flex flex-col gap-4">
        {diagram && (
          <div className="relative flex justify-center">
            {diagram}
            {items.map((item) => (
              <div key={item.target} className="relative">
                {placed[item.target] ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-primary/10 border border-primary/30 px-2 py-0.5 text-xs font-medium whitespace-nowrap"
                    )}
                  >
                    {items.find((i) => i.id === placed[item.target])?.label}
                  </motion.div>
                ) : (
                  <div
                    onMouseEnter={() => setDragging(item.id)}
                    onClick={() => handleDrop(item.target)}
                    className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-dashed border-muted-foreground/40 cursor-pointer hover:border-primary/60"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-wrap gap-2 justify-center">
          {available.map((item) => (
            <motion.button
              key={item.id}
              layoutId={item.id}
              onMouseDown={() => setDragging(item.id)}
              className="rounded-md border bg-card px-3 py-1.5 text-sm cursor-grab active:cursor-grabbing hover:bg-accent transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
        {allPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                correct ? "text-green-500" : "text-red-500"
              )}
            >
              <Check className="h-4 w-4" />
              {correct ? "All correct!" : "Some labels are wrong"}
            </div>
            <Button variant="ghost" size="sm" onClick={reset} className="gap-1">
              <Shuffle className="h-3 w-3" />
              Reset
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
