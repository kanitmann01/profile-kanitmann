"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

export function ScaleOnHover({
  children,
  className,
  scale = 1.05,
}: ScaleOnHoverProps) {
  return (
    <m.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </m.div>
  );
}
