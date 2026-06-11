"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Heading = { id: string; text: string; level: 2 | 3 };
type TableOfContentsProps = { headings: Heading[] };

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aIdx = headings.findIndex((h) => h.id === a.target.id);
            const bIdx = headings.findIndex((h) => h.id === b.target.id);
            return aIdx - bIdx;
          });

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [headings]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }, []);

  const desktopContent = (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="text-sm font-semibold mb-3 text-muted-foreground">
        On this page
      </h2>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => scrollToSection(heading.id)}
              className={cn(
                "block w-full text-left text-sm py-1.5 px-3 rounded-md transition-colors min-h-[44px] flex items-center",
                heading.level === 3 && "pl-6",
                activeId === heading.id
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  const mobileToggle = (
    <div className="lg:hidden fixed bottom-4 right-4 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full shadow-lg",
          "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
          "min-w-[44px] min-h-[44px]"
        )}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <List className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );

  const mobileDrawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className={cn(
              "lg:hidden fixed bottom-20 right-4 z-50",
              "w-72 max-h-[70vh] overflow-y-auto",
              "rounded-xl border bg-background shadow-xl p-4"
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-muted-foreground">
                On this page
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors min-w-[44px] min-h-[44px]"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToSection(heading.id)}
                    className={cn(
                      "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors min-h-[44px] flex items-center",
                      heading.level === 3 && "pl-6",
                      activeId === heading.id
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {desktopContent}
      {mobileToggle}
      {mobileDrawer}
    </>
  );
}
