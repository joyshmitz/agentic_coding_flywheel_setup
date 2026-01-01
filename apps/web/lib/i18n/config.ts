/**
 * i18n Configuration
 */

export type Locale = "en" | "uk";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: readonly Locale[] = ["en", "uk"] as const;

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
} as const;

export const LOCALE_STORAGE_KEY = "acfs-locale";