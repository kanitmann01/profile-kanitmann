"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface LikeButtonProps {
  itemId: string
  initialCount?: number
  onCountChange?: (count: number) => void
  variant?: "default" | "compact"
  className?: string
}

export function LikeButton({ 
  itemId, 
  initialCount = 0, 
  onCountChange,
  variant = "default",
  className 
}: LikeButtonProps) {
  const [count, setCount] = useState(initialCount)
  const [hasLiked, setHasLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Check if user has already liked this item
    const likedItems = JSON.parse(localStorage.getItem("likedItems") || "{}")
    setHasLiked(!!likedItems[itemId])
  }, [itemId])

  const handleLike = async () => {
    const likedItems = JSON.parse(localStorage.getItem("likedItems") || "{}")
    const isCurrentlyLiked = likedItems[itemId]

    // Optimistic update
    const newCount = isCurrentlyLiked ? Math.max(0, count - 1) : count + 1
    setCount(newCount)
    setHasLiked(!isCurrentlyLiked)
    setIsAnimating(true)

    // Update localStorage
    if (isCurrentlyLiked) {
      delete likedItems[itemId]
    } else {
      likedItems[itemId] = true
    }
    localStorage.setItem("likedItems", JSON.stringify(likedItems))

    // Notify parent
    if (onCountChange) {
      onCountChange(newCount)
    }

    // Call API
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, action: isCurrentlyLiked ? "unlike" : "like" }),
      })

      if (!response.ok) {
        throw new Error("Failed to update like")
      }

      const data = await response.json()
      setCount(data.count)
      if (onCountChange) {
        onCountChange(data.count)
      }
    } catch (error) {
      console.error("Error updating like:", error)
      // Revert on error
      setCount(count)
      setHasLiked(isCurrentlyLiked)
      if (isCurrentlyLiked) {
        likedItems[itemId] = true
      } else {
        delete likedItems[itemId]
      }
      localStorage.setItem("likedItems", JSON.stringify(likedItems))
      if (onCountChange) {
        onCountChange(count)
      }
    } finally {
      setTimeout(() => setIsAnimating(false), 600)
    }
  }

  if (variant === "compact") {
    return (
      <button
        onClick={handleLike}
        className={cn(
          "inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer",
          hasLiked ? "text-pink-600 hover:text-pink-700" : "text-muted-foreground hover:text-pink-600",
          className
        )}
        title={hasLiked ? "Unlike this" : "Like this"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all",
            hasLiked && "fill-current",
            isAnimating && "scale-125"
          )}
        />
        <span className="font-medium">{count}</span>
      </button>
    )
  }

  return (
    <Button
      variant={hasLiked ? "default" : "outline"}
      size="sm"
      onClick={handleLike}
      className={cn(
        "gap-2",
        hasLiked && "bg-pink-600 hover:bg-pink-700",
        className
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all",
          hasLiked && "fill-current",
          isAnimating && "scale-125"
        )}
      />
      <span>{count}</span>
    </Button>
  )
}

