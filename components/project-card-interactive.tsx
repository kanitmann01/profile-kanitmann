"use client"

import { ReactNode } from "react"

interface ProjectCardInteractiveProps {
  children: ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export function ProjectCardInteractive({ children, onClick }: ProjectCardInteractiveProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <div className="relative z-10" onClickCapture={handleClick}>
      {children}
    </div>
  )
}

