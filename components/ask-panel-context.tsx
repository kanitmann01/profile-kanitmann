"use client";

import * as React from "react";

export type AskPanelContextValue = {
  openAsk: () => void;
};

/**
 * Lightweight AskPanel context (Wave E.1). Split out of ask-panel.tsx so
 * consumers (Navigation, the lazy-mount provider) can read the context
 * WITHOUT pulling framer-motion + lucide-react into the initial bundle. The
 * panel component itself imports this module, not the other way around.
 */
export const AskPanelContext = React.createContext<AskPanelContextValue>({
  openAsk: () => {},
});

export function useAskPanel() {
  return React.useContext(AskPanelContext);
}
