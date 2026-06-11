"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InteractiveBottomSheetProps {
  children: ReactNode;
  title: string;
  className?: string;
}

export function InteractiveBottomSheet({
  children,
  title,
  className,
}: InteractiveBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className={cn("relative", className)}>
        {children}
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden absolute top-2 right-2 z-10"
          onClick={() => setIsOpen(true)}
          aria-label="Expand to full screen"
          data-testid="expand-button"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              data-testid="backdrop"
            />
            <motion.div
              className="lg:hidden fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-xl overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ height: "85vh" }}
              data-testid="bottom-sheet"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-1 bg-muted rounded-full" />
                </div>
                <h3 className="font-medium text-sm flex-1 text-center">
                  {title}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] min-w-[44px] p-0"
                  aria-label="Close"
                  data-testid="close-button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="overflow-auto h-[calc(100%-3.5rem)] p-4">
                {children}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
