"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps } from "framer-motion"

import { cn } from "@/lib/utils"
import { useMagneticHover } from "@/hooks/use-magnetic-hover"
import { useTactileFeedback } from "@/components/tactile-feedback-provider"

const tactileButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TactileButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref">,
    VariantProps<typeof tactileButtonVariants> {
  asChild?: boolean
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  ({ className, variant, size, asChild = false, onPointerDown, onPointerEnter, ...props }, ref) => {
    const { ref: magneticRef, offset } = useMagneticHover<HTMLButtonElement>({
      radius: 120,
      maxOffset: 8,
      enabled: false,
    })
    const { playSound, triggerHaptic } = useTactileFeedback()

    const combinedRef = (node: HTMLButtonElement | null) => {
      magneticRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref) {
        ref.current = node
      }
    }

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      playSound("click")
      triggerHaptic("light")
      onPointerDown?.(e)
    }

    const handlePointerEnter = (e: React.PointerEvent<HTMLButtonElement>) => {
      if (offset.x !== 0 || offset.y !== 0) {
        playSound("whoosh")
      }
      onPointerEnter?.(e)
    }

    if (asChild) {
      return (
        <Slot
          className={cn(tactileButtonVariants({ variant, size, className }))}
          ref={combinedRef}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
          onPointerDown={handlePointerDown}
          {...(props as React.ComponentPropsWithoutRef<"button">)}
        />
      )
    }
    return (
      <motion.button
        className={cn(tactileButtonVariants({ variant, size, className }))}
        ref={combinedRef}
        animate={{
          x: offset.x,
          y: offset.y,
        }}
        whileHover={{ boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.95, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onPointerDown={handlePointerDown}
        {...props}
      />
    )
  }
)
TactileButton.displayName = "TactileButton"

export { TactileButton, tactileButtonVariants }
