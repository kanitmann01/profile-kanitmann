"use client"

import * as React from "react"

interface MagneticOffset {
  x: number
  y: number
}

interface UseMagneticHoverOptions {
  radius?: number
  maxOffset?: number
  enabled?: boolean
}

export function useMagneticHover<T extends HTMLElement>({
  radius = 120,
  maxOffset = 8,
  enabled = true,
}: UseMagneticHoverOptions = {}) {
  const ref = React.useRef<T | null>(null)
  const [offset, setOffset] = React.useState<MagneticOffset>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = React.useState(false)

  React.useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < radius) {
        const strength = 1 - distance / radius
        const offsetX = (deltaX / distance) * maxOffset * strength
        const offsetY = (deltaY / distance) * maxOffset * strength
        setOffset({ x: offsetX, y: offsetY })
        setIsHovering(true)
      } else {
        setOffset({ x: 0, y: 0 })
        setIsHovering(false)
      }
    }

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 })
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [radius, maxOffset, enabled])

  return { ref, offset, isHovering }
}
