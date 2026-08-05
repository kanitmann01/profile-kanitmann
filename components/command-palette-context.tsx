"use client";

import * as React from "react";

export type CommandPaletteContextValue = {
  openPalette: () => void;
};

/**
 * Lightweight CommandPalette context (Wave C). Split out of command-palette.tsx
 * so consumers (Navigation, the lazy-mount provider) can read the context
 * WITHOUT pulling cmdk + lucide-react into the initial bundle. The palette
 * component itself imports this module, not the other way around.
 */
export const CommandPaletteContext =
  React.createContext<CommandPaletteContextValue>({
    openPalette: () => {},
  });

export function useCommandPalette() {
  return React.useContext(CommandPaletteContext);
}
