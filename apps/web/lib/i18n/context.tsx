/**
 * i18n React Context
 */
"use client";

import { createContext, useContext, useState, useEffect, useSyncExternalStore, type ReactNode } from "react";
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

// useSyncExternalStore helpers for hydration-safe mounted state
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function LocaleProvider({ children }: LocaleProviderProps) {
  // Always initialize with DEFAULT_LOCALE to match server render
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydration-safe mounted state without setState in useEffect
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Sync from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && (saved === "en" || saved === "uk") && saved !== locale) {
      setLocaleState(saved);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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