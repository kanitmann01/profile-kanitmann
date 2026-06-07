"use client"

import { useState, useEffect, useCallback } from "react"

export function useLikeItem(itemId: string, initialCount: number = 0) {
  const [count, setCount] = useState(initialCount)
  const [isLiked, setIsLiked] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems") || "{}")
    setIsLiked(!!likedItems[itemId])
  }, [itemId])

  const toggle = useCallback(async () => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems") || "{}")
    const wasLiked = !!likedItems[itemId]
    const newCount = wasLiked ? Math.max(0, count - 1) : count + 1

    setCount(newCount)
    setIsLiked(!wasLiked)
    setIsPending(true)

    if (wasLiked) {
      delete likedItems[itemId]
    } else {
      likedItems[itemId] = true
    }
    localStorage.setItem("likedItems", JSON.stringify(likedItems))

    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, action: wasLiked ? "unlike" : "like" }),
      })

      if (!response.ok) throw new Error("Failed to update like")

      const data = await response.json()
      setCount(data.count)
    } catch {
      setCount(count)
      setIsLiked(wasLiked)
      if (wasLiked) {
        likedItems[itemId] = true
      } else {
        delete likedItems[itemId]
      }
      localStorage.setItem("likedItems", JSON.stringify(likedItems))
    } finally {
      setTimeout(() => setIsPending(false), 600)
    }
  }, [itemId, count])

  return { count, isLiked, isPending, toggle }
}
