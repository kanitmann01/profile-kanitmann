"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CollapsibleCalloutProps = {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function CollapsibleCallout({
  children,
  title,
  icon,
  defaultOpen = true,
  className,
}: CollapsibleCalloutProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn(className)}>
      <CardHeader className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-3 w-full px-4 sm:px-6 py-4 text-left",
            "hover:bg-muted/50 transition-colors",
            "min-h-[44px]"
          )}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span className="font-semibold flex-1">{title}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0"
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.span>
        </button>
      </CardHeader>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <CardContent className="pt-0">{children}</CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
