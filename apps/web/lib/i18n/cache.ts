/**
 * Translation cache utilities
 */

// Simple in-memory cache for translations
const translationCache = new Map<string, string>();

/**
 * Clear the translation cache
 */
export function clearTranslationCache(): void {
  translationCache.clear();
}

/**
 * Get cached translation
 */
export function getCachedTranslation(key: string): string | undefined {
  return translationCache.get(key);
}

/**
 * Set cached translation
 */
export function setCachedTranslation(key: string, value: string): void {
  translationCache.set(key, value);
}