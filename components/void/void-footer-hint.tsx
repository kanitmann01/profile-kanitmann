"use client";

import { m } from "framer-motion";

export function VoidFooterHint(): JSX.Element {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#4d4d4d] bg-black/50 px-4 py-1 backdrop-blur-[4px]"
    >
      <span className="font-grotesk text-[10px] text-[#c6c6c6]">
        Move to explore
      </span>
    </m.div>
  );
}
