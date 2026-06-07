"use client"

import * as React from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

type SoundType = "click" | "toggle" | "whoosh"
type HapticType = "light" | "medium" | "success"

interface TactileFeedbackContextValue {
  isMuted: boolean
  toggleMute: () => void
  playSound: (type: SoundType) => void
  triggerHaptic: (type: HapticType) => void
}

const TactileFeedbackContext = React.createContext<TactileFeedbackContextValue | null>(null)

const STORAGE_KEY = "tactile-feedback-muted"

function getInitialMuted(): boolean {
  if (typeof window === "undefined") return true
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === null ? true : stored === "true"
}

function synthesizeClick(audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = 0.05
  const length = sampleRate * duration
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    const envelope = Math.exp(-t * 80)
    data[i] = Math.sin(2 * Math.PI * 300 * t) * envelope * 0.3
  }

  return buffer
}

function synthesizeToggle(audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = 0.08
  const length = sampleRate * duration
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    const envelope = Math.exp(-t * 50)
    data[i] = Math.sin(2 * Math.PI * 700 * t) * envelope * 0.25
  }

  return buffer
}

function synthesizeWhoosh(audioContext: AudioContext): AudioBuffer {
  const sampleRate = audioContext.sampleRate
  const duration = 0.1
  const length = sampleRate * duration
  const buffer = audioContext.createBuffer(1, length, sampleRate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate
    const envelope = Math.sin((Math.PI * t) / duration) * Math.exp(-t * 20)
    data[i] = (Math.random() * 2 - 1) * envelope * 0.15
  }

  return buffer
}

export function TactileFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = React.useState(getInitialMuted)
  const prefersReducedMotion = useReducedMotion()
  const audioContextRef = React.useRef<AudioContext | null>(null)
  const buffersRef = React.useRef<Map<SoundType, AudioBuffer>>(new Map())

  React.useEffect(() => {
    if (isMuted || prefersReducedMotion) return

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    const ctx = audioContextRef.current
    if (buffersRef.current.size === 0) {
      buffersRef.current.set("click", synthesizeClick(ctx))
      buffersRef.current.set("toggle", synthesizeToggle(ctx))
      buffersRef.current.set("whoosh", synthesizeWhoosh(ctx))
    }
  }, [isMuted, prefersReducedMotion])

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  const playSound = React.useCallback(
    (type: SoundType) => {
      if (isMuted || prefersReducedMotion) return
      if (!audioContextRef.current) return

      const ctx = audioContextRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }

      const buffer = buffersRef.current.get(type)
      if (!buffer) return

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const gainNode = ctx.createGain()
      gainNode.gain.value = 0.15

      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      source.start()
    },
    [isMuted, prefersReducedMotion]
  )

  const triggerHaptic = React.useCallback(
    (type: HapticType) => {
      if (isMuted || prefersReducedMotion) return
      if (typeof navigator === "undefined" || !navigator.vibrate) return

      const patterns: Record<HapticType, number | number[]> = {
        light: 10,
        medium: 20,
        success: [15, 50, 15],
      }

      navigator.vibrate(patterns[type])
    },
    [isMuted, prefersReducedMotion]
  )

  const value = React.useMemo(
    () => ({
      isMuted,
      toggleMute,
      playSound,
      triggerHaptic,
    }),
    [isMuted, toggleMute, playSound, triggerHaptic]
  )

  return (
    <TactileFeedbackContext.Provider value={value}>
      {children}
    </TactileFeedbackContext.Provider>
  )
}

export function useTactileFeedback(): TactileFeedbackContextValue {
  const context = React.useContext(TactileFeedbackContext)
  if (!context) {
    throw new Error("useTactileFeedback must be used within TactileFeedbackProvider")
  }
  return context
}
