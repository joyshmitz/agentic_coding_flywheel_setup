/**
 * Static translations helper
 *
 * Provides localized content from pre-translated files
 * based on current locale.
 */

import type { Locale } from "./config";

// Lessons
import { LESSONS, type Lesson } from "../lessons";
import { LESSONS_UK } from "../lessons.uk";

// Commands
import { COMMANDS, COMMAND_CATEGORIES, type CommandRef, type CommandCategory } from "../commands";
import { COMMANDS_UK, COMMAND_CATEGORIES_UK } from "../commands.uk";

// Jargon
import { jargonDictionary, type JargonTerm } from "../jargon";
import { jargonDictionaryUk } from "../jargon.uk";

/**
 * Get lessons for the specified locale
 */
export function getLessons(locale: Locale): Lesson[] {
  return locale === "uk" ? LESSONS_UK : LESSONS;
}

/**
 * Get a single lesson by slug for the specified locale
 */
export function getLessonBySlug(slug: string, locale: Locale): Lesson | undefined {
  const lessons = getLessons(locale);
  return lessons.find((l) => l.slug === slug);
}

/**
 * Get commands for the specified locale
 */
export function getCommands(locale: Locale): CommandRef[] {
  return locale === "uk" ? COMMANDS_UK : COMMANDS;
}

/**
 * Get command categories for the specified locale
 */
export function getCommandCategories(
  locale: Locale
): Array<{ id: CommandCategory; label: string; description: string }> {
  return locale === "uk" ? COMMAND_CATEGORIES_UK : COMMAND_CATEGORIES;
}

/**
 * Get jargon dictionary for the specified locale
 */
export function getJargonDictionary(locale: Locale): Record<string, JargonTerm> {
  return locale === "uk" ? jargonDictionaryUk : jargonDictionary;
}

/**
 * Get a single jargon term for the specified locale
 */
export function getJargonTerm(key: string, locale: Locale): JargonTerm | undefined {
  const dict = getJargonDictionary(locale);
  const normalized = key.toLowerCase().replace(/[\s_]+/g, "-");
  return dict[normalized];
}

/**
 * Get all jargon terms as array for the specified locale
 */
export function getAllJargonTerms(locale: Locale): JargonTerm[] {
  return Object.values(getJargonDictionary(locale));
}
