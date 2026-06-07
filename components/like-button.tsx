"use client"

import { useState, useCallback } from "react"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface LikeButtonProps {
  count: number
  isLiked: boolean
  onToggle: () => void
  isPending?: boolean
  variant?: "default" | "compact"
  className?: string
}

const PARTICLE_COUNT = 8

const particleAngles = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
  (360 / PARTICLE_COUNT) * i
)

interface Particle {
  id: number
  angle: number
}

export function LikeButton({
  count,
  isLiked,
  onToggle,
  isPending,
  variant = "default",
  className,
}: LikeButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  const spawnParticles = useCallback(() => {
    const newParticles: Particle[] = particleAngles.map((angle, i) => ({
      id: Date.now() + i,
      angle,
    }))
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 600)
  }, [])

  const handleClick = () => {
    onToggle()
    setIsAnimating(true)

    if (!isLiked) {
      spawnParticles()
    }

    setTimeout(() => setIsAnimating(false), 600)
  }

  const heartColor = isLiked ? "hsl(12, 75%, 63%)" : "currentColor"

  if (variant === "compact") {
    return (
      <span className={cn("relative inline-flex items-center", className)}>
        <motion.button
          onClick={handleClick}
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer",
            isLiked
              ? "text-[hsl(12,75%,63%)] hover:text-[hsl(12,75%,55%)]"
              : "text-muted-foreground hover:text-[hsl(12,75%,63%)]"
          )}
          title={isLiked ? "Unlike this" : "Like this"}
        >
          <motion.div
            data-heart
            animate={{
              scale: isAnimating ? 1.3 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 10,
            }}
            className="relative"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isLiked && "fill-current"
              )}
              style={{ color: heartColor }}
            />
            <AnimatePresence>
              {particles.map((particle) => {
                const rad = (particle.angle * Math.PI) / 180
                const x = Math.cos(rad) * 20
                const y = Math.sin(rad) * 20
                return (
                  <motion.span
                    key={particle.id}
                    data-particle
                    className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full"
                    style={{ background: heartColor }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x, y, opacity: 0, scale: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                )
              })}
            </AnimatePresence>
          </motion.div>
          <span className="font-medium">{count}</span>
        </motion.button>
      </span>
    )
  }

  return (
    <span className={cn("relative inline-flex", className)}>
      <motion.button
        onClick={handleClick}
        disabled={isPending}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer border",
          isLiked
            ? "bg-[hsl(12,75%,63%)] text-white border-[hsl(12,75%,63%)] hover:bg-[hsl(12,75%,55%)]"
            : "bg-transparent text-muted-foreground border-border hover:border-[hsl(12,75%,63%)] hover:text-[hsl(12,75%,63%)]"
        )}
        title={isLiked ? "Unlike this" : "Like this"}
      >
        <motion.div
          data-heart
          animate={{
            scale: isAnimating ? 1.3 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 10,
          }}
          className="relative"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isLiked && "fill-current"
            )}
            style={{ color: heartColor }}
          />
          <AnimatePresence>
            {particles.map((particle) => {
              const rad = (particle.angle * Math.PI) / 180
              const x = Math.cos(rad) * 24
              const y = Math.sin(rad) * 24
              return (
                <motion.span
                  key={particle.id}
                  data-particle
                  className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full"
                  style={{ background: heartColor }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x, y, opacity: 0, scale: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              )
            })}
          </AnimatePresence>
        </motion.div>
        <span>{count}</span>
      </motion.button>
    </span>
  )
}
