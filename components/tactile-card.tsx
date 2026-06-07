"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"

const TactileCard = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & { href?: string }
>(({ className, children, href, ...props }, ref) => {
  const card = (
    <motion.div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm cursor-pointer",
        className
      )}
      whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.98, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
