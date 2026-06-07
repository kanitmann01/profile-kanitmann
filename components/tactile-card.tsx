"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useCardTilt } from "@/hooks/use-card-tilt"
import { useTactileFeedback } from "@/components/tactile-feedback-provider"

const TactileCard = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { href?: string }
>(({ className, children, href, onPointerDown, ...props }, ref) => {
  const {
    ref: tiltRef,
    tilt,
    perspective,
    handleMouseMove,
    handleMouseLeave,
  } = useCardTilt<HTMLDivElement>({
    maxTilt: 8,
    perspective: 800,
    scale: 1.02,
  })
  const { playSound, triggerHaptic } = useTactileFeedback()

  const combinedRef = (node: HTMLDivElement | null) => {
    tiltRef.current = node
    if (typeof ref === "function") {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    playSound("click")
    triggerHaptic("medium")
    onPointerDown?.(e)
  }

  const card = (
    <motion.div
      ref={combinedRef}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
      }}
      whileTap={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective }}
      {...props}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {card}
      </Link>
    )
  }

  return card
})
TactileCard.displayName = "TactileCard"

const TactileCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
TactileCardHeader.displayName = "TactileCardHeader"

const TactileCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
TactileCardTitle.displayName = "TactileCardTitle"

const TactileCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
TactileCardDescription.displayName = "TactileCardDescription"

const TactileCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
TactileCardContent.displayName = "TactileCardContent"

const TactileCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
TactileCardFooter.displayName = "TactileCardFooter"

export {
  TactileCard,
  TactileCardHeader,
  TactileCardFooter,
  TactileCardTitle,
  TactileCardDescription,
  TactileCardContent,
}
