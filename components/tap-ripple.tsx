"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useTapFeedback } from "@/hooks/use-tap-feedback"

interface TapRippleProps {
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export function TapRipple({ children, className, disabled }: TapRippleProps) {
  const { ref, handlePointerDown, ripples } = useTapFeedback({ disabled })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("relative overflow-hidden", className)}
      onPointerDown={handlePointerDown}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          data-ripple
          className="pointer-events-none absolute rounded-full bg-foreground/15 animate-tap-ripple"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
        />
      ))}
    </div>
  )
}
