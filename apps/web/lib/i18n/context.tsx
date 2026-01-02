/**
 * i18n React Context
 */
"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from "./config";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  mounted: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  mounted: false,
});

interface LocaleProviderProps {
  children: ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: SSR hydration detection requires setState after mount
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && (saved === "en" || saved === "uk")) {
        setLocaleState(saved);
      }
    }
  }, []);

  // Save locale to localStorage when changed
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, mounted }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}