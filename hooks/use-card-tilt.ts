"use client"

import * as React from "react"

interface TiltValues {
  rotateX: number
  rotateY: number
  scale: number
}

interface UseCardTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  enabled?: boolean
}

export function useCardTilt<T extends HTMLElement>({
  maxTilt = 8,
  perspective = 800,
  scale = 1.02,
  enabled = true,
}: UseCardTiltOptions = {}) {
  const ref = React.useRef<T | null>(null)
  const [tilt, setTilt] = React.useState<TiltValues>({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<T>) => {
      if (!ref.current || !enabled) return

      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      setTilt({ rotateX, rotateY, scale })
    },
    [maxTilt, scale, enabled]
  )

  const handleMouseLeave = React.useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 })
  }, [])

  return {
    ref,
    tilt,
    perspective,
    handleMouseMove,
    handleMouseLeave,
  }
}
