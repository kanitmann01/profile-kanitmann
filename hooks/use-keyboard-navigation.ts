"use client"

import { useState, useEffect, useCallback } from "react"

interface NavigableItem {
  slug: string
  href: string
}

export function useKeyboardNavigation(
  items: NavigableItem[],
  onNavigate?: (href: string) => void
) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (items.length === 0) return

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault()
          setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1))
          break
        case "ArrowUp":
          event.preventDefault()
          setCurrentIndex((prev) => Math.max(prev - 1, 0))
          break
        case "Enter":
          event.preventDefault()
          if (onNavigate && items[currentIndex]) {
            onNavigate(items[currentIndex].href)
          }
          break
      }
    },
    [items, currentIndex, onNavigate]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return { currentIndex, setCurrentIndex }
}
