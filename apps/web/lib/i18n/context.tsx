/**
 * i18n React Context
 */
"use client";

import { createContext, useContext, useState, useCallback, useSyncExternalStore, type ReactNode } from "react";
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

// localStorage subscription for locale sync
let localeListeners: Array<() => void> = [];

function subscribeToLocale(callback: () => void) {
  localeListeners.push(callback);
  return () => {
    localeListeners = localeListeners.filter((l) => l !== callback);
  };
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (saved === "en" || saved === "uk") return saved;
  return DEFAULT_LOCALE;
}

function getLocaleServerSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  // Hydration-safe locale state using useSyncExternalStore
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, getLocaleServerSnapshot);

  // Hydration-safe mounted state
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  // Save locale to localStorage and notify listeners
  const setLocale = useCallback((newLocale: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      // Notify all listeners to re-read from localStorage
      localeListeners.forEach((l) => l());
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, mounted }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}