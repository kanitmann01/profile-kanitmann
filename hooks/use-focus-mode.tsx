"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

const STORAGE_KEY = "imat-focus-mode";

type FocusModeContextValue = {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
};

const FocusModeContext = createContext<FocusModeContextValue>({
  isFocusMode: false,
  toggleFocusMode: () => {},
});

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") setIsFocusMode(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isFocusMode));
    } catch {}
  }, [isFocusMode]);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode((prev) => !prev);
  }, []);

  return (
    <FocusModeContext.Provider value={{ isFocusMode, toggleFocusMode }}>
      {children}
    </FocusModeContext.Provider>
  );
}

export function useFocusMode() {
  return useContext(FocusModeContext);
}
