"use client"

import { useState, useEffect } from "react"

export function useLikes() {
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLikes()
  }, [])

  const fetchLikes = async () => {
    try {
      const response = await fetch("/api/likes")
      if (!response.ok) {
        throw new Error("Failed to fetch likes")
      }
      const data = await response.json()
      setLikes(data)
    } catch (error) {
      console.error("Error fetching likes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLikeCount = (itemId: string, count: number) => {
    setLikes((prev) => ({ ...prev, [itemId]: count }))
  }

  return { likes, isLoading, updateLikeCount }
}

