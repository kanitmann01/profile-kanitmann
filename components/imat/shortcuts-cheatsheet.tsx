"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ShortcutsCheatsheetProps = {
  isOpen: boolean;
  onClose: () => void;
};

const shortcuts = [
  { keys: ["j"], description: "Next section" },
  { keys: ["k"], description: "Previous section" },
  { keys: ["f"], description: "Toggle focus mode" },
  { keys: ["?"], description: "Show this cheatsheet" },
  { keys: ["Esc"], description: "Close overlays" },
];

export function ShortcutsCheatsheet({
  isOpen,
  onClose,
}: ShortcutsCheatsheetProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "fixed inset-x-4 top-[20%] z-50 mx-auto max-w-md",
              "rounded-xl border bg-background shadow-xl p-6"
            )}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-label="Keyboard shortcuts"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors min-w-[44px] min-h-[44px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid gap-2">
              {shortcuts.map(({ keys, description }) => (
                <div
                  key={description}
                  className="flex items-center justify-between py-2"
                >
                  <span className="text-sm text-muted-foreground">
                    {description}
                  </span>
                  <div className="flex gap-1">
                    {keys.map((key) => (
                      <kbd
                        key={key}
                        className="inline-flex items-center justify-center min-w-[28px] px-2 py-1 text-xs font-mono border rounded-md bg-muted"
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
