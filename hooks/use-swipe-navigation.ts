"use client";

import { useEffect, useRef } from "react";

type UseSwipeNavigationProps = {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
};

export function useSwipeNavigation({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeNavigationProps) {
  const startX = useRef(0);
  const startY = useRef(0);
  const lastFire = useRef(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = endX - startX.current;
      const dy = endY - startY.current;

      if (Math.abs(dy) > Math.abs(dx)) return;

      const now = Date.now();
      if (now - lastFire.current < 300) return;

      if (dx < -threshold) {
        lastFire.current = now;
        onSwipeLeft();
      } else if (dx > threshold) {
        lastFire.current = now;
        onSwipeRight();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, threshold]);
}
