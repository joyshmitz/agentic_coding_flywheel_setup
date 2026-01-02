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
  // Component messages
  getSimplerGuideMessages,
  // Page messages
  getLearnMessages,
  getFlywheelMessages,
  getTroubleshootingMessages,
  getWorkflowMessages,
  getCommandsUiMessages,
  getGlossaryUiMessages,
  getSecurityMessages,
  getHomeMessages,
  getToolPageMessages,
  // Lesson messages
  getWelcomeLessonMessages,
  getLinuxBasicsLessonMessages,
  getTmuxBasicsLessonMessages,
  getSshBasicsLessonMessages,
  getSafetyToolsLessonMessages,
  getFlywheelLoopMessages,
  getCmLessonMessages,
  // Wave 2 Tools Lesson messages
  getNtmPaletteLessonMessages,
  getNtmCoreLessonMessages,
  getAgentsLoginLessonMessages,
  getCassLessonMessages,
  // Wave 3 Development Lesson messages
  getUbsLessonMessages,
  getGithubCliLessonMessages,
  getGitBasicsLessonMessages,
  // Wave 6 Case Study Lesson messages
  getSlbCaseStudyLessonMessages,
  getPromptEngineeringLessonMessages,
  getRealWorldCaseStudyLessonMessages,
  type ChecklistItem,
} from "./translations";
