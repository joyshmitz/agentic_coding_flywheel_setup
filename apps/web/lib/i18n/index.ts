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
  getGenerateSshKeyMessages,
  getCreateVpsMessages,
  getWindowsTerminalSetupMessages,
  getInstallTerminalMessages,
  getOsSelectionMessages,
  getRentVpsMessages,
  getSshConnectMessages,
  getAccountsMessages,
  getVerifyKeyConnectionMessages,
  getReconnectUbuntuMessages,
  getPreflightCheckMessages,
  getRunInstallerMessages,
  getStatusCheckMessages,
  getLaunchOnboardingMessages,
} from "./translations";
