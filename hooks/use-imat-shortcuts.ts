"use client";

import { useEffect, useCallback } from "react";
import { useScrollTo } from "@/hooks/use-scroll-to";

type UseIMATShortcutsProps = {
  sectionIds: string[];
  onClose?: () => void;
};

export function useIMATShortcuts({
  sectionIds,
  onClose,
}: UseIMATShortcutsProps) {
  // Wave E.5: Lenis glide when smooth scroll is active; native jump otherwise.
  const scrollToSection = useScrollTo();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      if (e.key === "j" || e.key === "k") {
        e.preventDefault();

        const visibleSections = sectionIds
          .map((id) => ({ id, el: document.getElementById(id) }))
          .filter((s): s is { id: string; el: HTMLElement } => s.el !== null);

        if (visibleSections.length === 0) return;

        const scrollY = window.scrollY + 100;
        let currentIndex = -1;

        for (let i = visibleSections.length - 1; i >= 0; i--) {
          if (visibleSections[i].el.offsetTop <= scrollY) {
            currentIndex = i;
            break;
          }
        }

        let targetIndex: number;
        if (e.key === "j") {
          targetIndex = Math.min(currentIndex + 1, visibleSections.length - 1);
        } else {
          targetIndex = Math.max(currentIndex - 1, 0);
        }

        scrollToSection(visibleSections[targetIndex].el);
      }
    },
    [sectionIds, onClose, scrollToSection]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
