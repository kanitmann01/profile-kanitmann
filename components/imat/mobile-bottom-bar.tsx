"use client";

import { motion } from "framer-motion";
import {
  List,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Bookmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MobileBottomBarProps = {
  onToggleToC: () => void;
  onToggleBookmarks: () => void;
  onScrollToTop: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function MobileBottomBar({
  onToggleToC,
  onToggleBookmarks,
  onScrollToTop,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: MobileBottomBarProps) {
  const btnBase =
    "flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg transition-colors";

  return (
    <motion.div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 right-0 z-40",
        "bg-background/95 backdrop-blur border-t",
        "pb-[env(safe-area-inset-bottom,0px)]"
      )}
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        <button
          onClick={onToggleToC}
          className={cn(
            btnBase,
            "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="Toggle table of contents"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          onClick={onToggleBookmarks}
          className={cn(
            btnBase,
            "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="Toggle bookmarks"
        >
          <Bookmark className="w-5 h-5" />
        </button>

        <button
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            btnBase,
            hasPrev
              ? "text-muted-foreground hover:text-foreground hover:bg-muted"
              : "text-muted-foreground/40 cursor-not-allowed"
          )}
          aria-label="Previous note"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            btnBase,
            hasNext
              ? "text-muted-foreground hover:text-foreground hover:bg-muted"
              : "text-muted-foreground/40 cursor-not-allowed"
          )}
          aria-label="Next note"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={onScrollToTop}
          className={cn(
            btnBase,
            "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
