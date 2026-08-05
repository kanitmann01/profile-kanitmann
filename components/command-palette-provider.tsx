"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  CommandPaletteContext,
  type CommandPaletteContextValue,
} from "@/components/command-palette-context";

/**
 * Async CommandPalette (cmdk + lucide icons) — `ssr: false` keeps those
 * modules out of the server render and out of the initial client bundle.
 */
const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

/**
 * Lazy-mount CommandPalette host (Wave C). Registers the ⌘K/Ctrl+K listener
 * in a useEffect BEFORE the palette mounts, so the shortcut works on the first
 * keystroke on every route. The dynamic import is gated behind that first
 * invocation — cmdk + lucide leave the initial bundle until the user (or the
 * mobile-menu Commands button) actually asks for the palette.
 */
export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const openPalette = React.useCallback(() => {
    setOpen(true);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() !== "k" ||
        !(event.metaKey || event.ctrlKey)
      ) {
        return;
      }
      // Don't steal ⌘K/Ctrl+K while the user is typing somewhere.
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      openPalette();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openPalette]);

  const contextValue = React.useMemo<CommandPaletteContextValue>(
    () => ({ openPalette }),
    [openPalette]
  );

  return (
    <CommandPaletteContext.Provider value={contextValue}>
      {mounted ? (
        <CommandPalette open={open} onOpenChange={setOpen}>
          {children}
        </CommandPalette>
      ) : (
        children
      )}
    </CommandPaletteContext.Provider>
  );
}
