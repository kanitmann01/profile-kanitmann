"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TagFilterProps {
  allTags: string[]
  topTags: string[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export function TagFilter({ allTags, topTags, selectedTags, onTagsChange }: TagFilterProps) {
  const [expanded, setExpanded] = useState(false)
  const hasRemainingTags = allTags.length > topTags.length

  const displayedTags = expanded ? allTags : topTags

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayedTags.map((tag) => (
        <Badge
          key={tag}
          role="button"
          aria-pressed={selectedTags.includes(tag)}
          onClick={() => handleTagClick(tag)}
          className={`cursor-pointer transition-colors ${
            selectedTags.includes(tag)
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {tag}
        </Badge>
      ))}
      {hasRemainingTags && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-xs h-7 px-2"
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  )
}
