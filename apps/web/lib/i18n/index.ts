export { LOCALES, LOCALE_NAMES, DEFAULT_LOCALE, LOCALE_STORAGE_KEY } from "./config";
export type { Locale } from "./config";
export { LocaleProvider, useLocale } from "./context";
export { translateText, translateBatch } from "./translate";
export { clearTranslationCache } from "./cache";

// Static translations
export {
  getLessons,
  getLessonBySlug,
  getCommands,
  getCommandCategories,
  getJargonDictionary,
  getJargonTerm,
  getAllJargonTerms,
  // Wizard messages
  getCommonMessages,
  getRentVpsMessages,
  getSshConnectMessages,
  getAccountsMessages,
} from "./translations";
