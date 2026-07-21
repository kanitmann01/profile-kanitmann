"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { useTactileFeedback } from "@/components/tactile-feedback-provider";

export interface TactileButtonProps
  extends
    Omit<HTMLMotionProps<"button">, "ref">,
    Pick<ButtonProps, "variant" | "size"> {
  asChild?: boolean;
}

const TactileButton = React.forwardRef<HTMLButtonElement, TactileButtonProps>(
  (
    { className, variant, size, asChild = false, onPointerDown, ...props },
    ref
  ) => {
    const { playSound, triggerHaptic } = useTactileFeedback();

    const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
      playSound("click");
      triggerHaptic("light");
      onPointerDown?.(e);
    };

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onPointerDown={handlePointerDown}
          {...(props as React.ComponentPropsWithoutRef<"button">)}
        />
      );
    }
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}
        whileTap={{
          scale: 0.95,
          boxShadow:
            "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onPointerDown={handlePointerDown}
        {...props}
      />
    );
  }
);
TactileButton.displayName = "TactileButton";

export { TactileButton };
