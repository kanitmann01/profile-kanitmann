"use client"

import * as React from "react"

export interface Ripple {
  id: number
  x: number
  y: number
}

interface UseTapFeedbackOptions {
  disabled?: boolean
  duration?: number
}

let rippleId = 0

export function useTapFeedback({
  disabled = false,
  duration = 500,
}: UseTapFeedbackOptions = {}) {
  const ref = React.useRef<HTMLElement | null>(null)
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const timersRef = React.useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = ++rippleId

      setRipples((prev) => [...prev, { id, x, y }])

      const timer = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
        timersRef.current.delete(id)
      }, duration)

      timersRef.current.set(id, timer)
    },
    [disabled, duration]
  )

  React.useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((t) => clearTimeout(t))
      timers.clear()
    }
  }, [])

  return { ref, handlePointerDown, ripples }
}
