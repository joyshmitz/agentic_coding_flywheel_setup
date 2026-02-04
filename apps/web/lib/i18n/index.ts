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
  getVpsProviders,
  getWizardStepTranslations,
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
  getCommandCardMessages,
  getConnectionCheckMessages,
  getJargonUiMessages,
  getStepperMessages,
  getFlywheelVizMessages,
  getAgentHeroCardMessages,
  getLessonComponentsMessages,
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
  getCommandReferenceMessages,
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
  // Wave 7 Safety Tools Lesson messages
  getRuLessonMessages,
  getDcgLessonMessages,
  // Wave 8 Additional Tools Lesson messages
  getMsLessonMessages,
  type ChecklistItem,
} from "./translations";
