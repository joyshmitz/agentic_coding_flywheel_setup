/**
 * Translation utilities
 */

import type { Locale } from "./config";

/**
 * Simple text translation (placeholder)
 */
export function translateText(key: string, locale: Locale): string {
  // This is a placeholder implementation
  // In a real app, you would have a translation dictionary
  return key;
}

/**
 * Batch translation (placeholder)
 */
export function translateBatch(keys: string[], locale: Locale): Record<string, string> {
  // This is a placeholder implementation
  return keys.reduce((acc, key) => {
    acc[key] = translateText(key, locale);
    return acc;
  }, {} as Record<string, string>);
}