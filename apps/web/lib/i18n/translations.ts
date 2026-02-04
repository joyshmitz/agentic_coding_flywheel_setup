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
import { COMMANDS, COMMAND_CATEGORIES, ALL_COMMANDS, type CommandRef, type CommandCategory } from "../commands";
import { COMMANDS_UK, COMMAND_CATEGORIES_UK, ALL_COMMANDS_UK } from "../commands.uk";

// VPS Providers
import { VPS_PROVIDERS, PRICING_LAST_UPDATED, type VPSProvider } from "../vpsProviders";
import { VPS_PROVIDERS_UK, PRICING_LAST_UPDATED_UK } from "../vpsProviders.uk";

// VPS Comparison Messages
import { vpsComparisonMessages } from "../vps-comparison-messages";
import { vpsComparisonMessagesUk } from "../vps-comparison-messages.uk";

// Wizard Steps Translations
import { WIZARD_STEPS_UK, type WizardStepTranslation } from "../wizardSteps.uk";

// Jargon
import { jargonDictionary, type JargonTerm } from "../jargon";
import { jargonDictionaryUk } from "../jargon.uk";

// Beads Lesson
import { beadsLessonMessages } from "../lessons/beads";
import { beadsLessonMessagesUk } from "../lessons/beads.uk";

// Keeping Updated Lesson
import { keepingUpdatedLessonMessages } from "../lessons/keeping-updated";
import { keepingUpdatedLessonMessagesUk } from "../lessons/keeping-updated.uk";

// Agent Mail Lesson
import { agentMailLessonMessages } from "../lessons/agent-mail";
import { agentMailLessonMessagesUk } from "../lessons/agent-mail.uk";

// Core Lesson Messages
import { welcomeLessonMessages } from "../lessons/welcome-messages";
import { welcomeLessonMessagesUk } from "../lessons/welcome-messages.uk";
import { linuxBasicsLessonMessages } from "../lessons/linux-basics-messages";
import { linuxBasicsLessonMessagesUk } from "../lessons/linux-basics-messages.uk";
import { tmuxBasicsLessonMessages } from "../lessons/tmux-basics-messages";
import { tmuxBasicsLessonMessagesUk } from "../lessons/tmux-basics-messages.uk";
import { sshBasicsLessonMessages } from "../lessons/ssh-basics-messages";
import { sshBasicsLessonMessagesUk } from "../lessons/ssh-basics-messages.uk";
import { flywheelLoopMessages } from "../lessons/flywheel-loop";
import { flywheelLoopMessagesUk } from "../lessons/flywheel-loop.uk";
import { safetyToolsLessonMessages } from "../lessons/safety-tools";
import { safetyToolsLessonMessagesUk } from "../lessons/safety-tools.uk";
import { cmLessonMessages } from "../lessons/cm";
import { cmLessonMessagesUk } from "../lessons/cm.uk";

// Wave 2 Tools Lessons
import { ntmPaletteLessonMessages } from "../lessons/ntm-palette-messages";
import { ntmPaletteLessonMessagesUk } from "../lessons/ntm-palette-messages.uk";
import { ntmCoreLessonMessages } from "../lessons/ntm-core-messages";
import { ntmCoreLessonMessagesUk } from "../lessons/ntm-core-messages.uk";
import { agentsLoginLessonMessages } from "../lessons/agents-login-messages";
import { agentsLoginLessonMessagesUk } from "../lessons/agents-login-messages.uk";
import { cassLessonMessages } from "../lessons/cass-messages";
import { cassLessonMessagesUk } from "../lessons/cass-messages.uk";
import { msMessages } from "../lessons/ms-messages";
import { msMessagesUk } from "../lessons/ms-messages.uk";

// Wave 3 Development Lessons
import { ubsLessonMessages } from "../lessons/ubs-messages";
import { ubsLessonMessagesUk } from "../lessons/ubs-messages.uk";
import { githubCliLessonMessages } from "../lessons/github-cli-messages";
import { githubCliLessonMessagesUk } from "../lessons/github-cli-messages.uk";
import { gitBasicsLessonMessages } from "../lessons/git-basics-messages";
import { gitBasicsLessonMessagesUk } from "../lessons/git-basics-messages.uk";

// Wave 6 Case Study Lessons
import { slbCaseStudyLessonMessages } from "../lessons/slb-case-study-messages";
import { slbCaseStudyLessonMessagesUk } from "../lessons/slb-case-study-messages.uk";
import { promptEngineeringLessonMessages } from "../lessons/prompt-engineering-messages";
import { promptEngineeringLessonMessagesUk } from "../lessons/prompt-engineering-messages.uk";
import { realWorldCaseStudyLessonMessages } from "../lessons/real-world-case-study-messages";
import { realWorldCaseStudyLessonMessagesUk } from "../lessons/real-world-case-study-messages.uk";

// Wave 7 Safety Tools Lessons
import { ruLessonMessages } from "../lessons/ru";
import { ruLessonMessagesUk } from "../lessons/ru.uk";
import { dcgLessonMessages } from "../lessons/dcg";
import { dcgLessonMessagesUk } from "../lessons/dcg.uk";

// TLDR Content
import { getTldrMessages } from "../tldr-messages";
import { getTldrMessagesUk } from "../tldr-messages.uk";
import { tldrPageData } from "../tldr-content";
import { tldrPageDataUk } from "../tldr-content.uk";
import { tldrFlywheelTools } from "../tldr-content";
import { tldrFlywheelToolsUk } from "../tldr-content.uk";

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
 * Get all commands (including auto-generated) for the specified locale
 */
export function getAllCommands(locale: Locale): CommandRef[] {
  return locale === "uk" ? ALL_COMMANDS_UK : ALL_COMMANDS;
}

/**
 * Get VPS providers for the specified locale
 */
export function getVpsProviders(locale: Locale): VPSProvider[] {
  return locale === "uk" ? VPS_PROVIDERS_UK : VPS_PROVIDERS;
}

/**
 * Get wizard step translations for the specified locale
 */
export function getWizardStepTranslations(locale: Locale): WizardStepTranslation[] | null {
  return locale === "uk" ? WIZARD_STEPS_UK : null;
}

/**
 * Get VPS comparison UI messages for the specified locale
 */
export function getVpsComparisonMessages(locale: Locale) {
  return locale === "uk" ? vpsComparisonMessagesUk : vpsComparisonMessages;
}

/**
 * Get pricing last updated date for the specified locale
 */
export function getPricingLastUpdated(locale: Locale): string {
  return locale === "uk" ? PRICING_LAST_UPDATED_UK : PRICING_LAST_UPDATED;
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

// Wizard messages
import {
  commonMessages,
  generateSshKeyMessages,
  createVpsMessages,
  windowsTerminalSetupMessages,
  installTerminalMessages,
  osSelectionMessages,
  rentVpsMessages,
  sshConnectMessages,
  accountsMessages,
  verifyKeyConnectionMessages,
  reconnectUbuntuMessages,
  preflightCheckMessages,
  runInstallerMessages,
  statusCheckMessages,
  launchOnboardingMessages,
} from "../wizard-messages";
import {
  commonMessagesUk,
  generateSshKeyMessagesUk,
  createVpsMessagesUk,
  windowsTerminalSetupMessagesUk,
  installTerminalMessagesUk,
  osSelectionMessagesUk,
  rentVpsMessagesUk,
  sshConnectMessagesUk,
  accountsMessagesUk,
  verifyKeyConnectionMessagesUk,
  reconnectUbuntuMessagesUk,
  preflightCheckMessagesUk,
  runInstallerMessagesUk,
  statusCheckMessagesUk,
  launchOnboardingMessagesUk,
} from "../wizard-messages.uk";

// SimplerGuide component messages
import { simplerGuideMessages } from "../simpler-guide-messages";
import { simplerGuideMessagesUk } from "../simpler-guide-messages.uk";

// CommandCard component messages
import { commandCardMessages } from "../command-card-messages";
import { commandCardMessagesUk } from "../command-card-messages.uk";

// ConnectionCheck component messages
import { connectionCheckMessages } from "../connection-check-messages";
import { connectionCheckMessagesUk } from "../connection-check-messages.uk";

// Jargon component messages
import { jargonUiMessages } from "../jargon-ui-messages";
import { jargonUiMessagesUk } from "../jargon-ui-messages.uk";

// Stepper component messages
import { stepperMessages } from "../stepper-messages";
import { stepperMessagesUk } from "../stepper-messages.uk";

// Flywheel visualization component messages
import { flywheelVizMessages } from "../flywheel-viz-messages";
import { flywheelVizMessagesUk } from "../flywheel-viz-messages.uk";

// AgentHeroCard component messages
import { agentHeroCardMessages } from "../agent-hero-card-messages";
import { agentHeroCardMessagesUk } from "../agent-hero-card-messages.uk";

// Lesson components messages
import { lessonComponentsMessages } from "../lesson-components-messages";
import { lessonComponentsMessagesUk } from "../lesson-components-messages.uk";

/**
 * Get common wizard messages for the specified locale
 */
export function getCommonMessages(locale: Locale) {
  return locale === "uk" ? commonMessagesUk : commonMessages;
}

/**
 * Get generate-ssh-key page messages for the specified locale
 */
export function getGenerateSshKeyMessages(locale: Locale) {
  return locale === "uk" ? generateSshKeyMessagesUk : generateSshKeyMessages;
}

/**
 * Get create-vps page messages for the specified locale
 */
export function getCreateVpsMessages(locale: Locale) {
  return locale === "uk" ? createVpsMessagesUk : createVpsMessages;
}

/**
 * Get windows-terminal-setup page messages for the specified locale
 */
export function getWindowsTerminalSetupMessages(locale: Locale) {
  return locale === "uk" ? windowsTerminalSetupMessagesUk : windowsTerminalSetupMessages;
}

/**
 * Get install-terminal page messages for the specified locale
 */
export function getInstallTerminalMessages(locale: Locale) {
  return locale === "uk" ? installTerminalMessagesUk : installTerminalMessages;
}

/**
 * Get os-selection page messages for the specified locale
 */
export function getOsSelectionMessages(locale: Locale) {
  return locale === "uk" ? osSelectionMessagesUk : osSelectionMessages;
}

/**
 * Get rent-vps page messages for the specified locale
 */
export function getRentVpsMessages(locale: Locale) {
  return locale === "uk" ? rentVpsMessagesUk : rentVpsMessages;
}

/**
 * Get ssh-connect page messages for the specified locale
 */
export function getSshConnectMessages(locale: Locale) {
  return locale === "uk" ? sshConnectMessagesUk : sshConnectMessages;
}

/**
 * Get accounts page messages for the specified locale
 */
export function getAccountsMessages(locale: Locale) {
  return locale === "uk" ? accountsMessagesUk : accountsMessages;
}

/**
 * Get verify-key-connection page messages for the specified locale
 */
export function getVerifyKeyConnectionMessages(locale: Locale) {
  return locale === "uk" ? verifyKeyConnectionMessagesUk : verifyKeyConnectionMessages;
}

/**
 * Get reconnect-ubuntu page messages for the specified locale
 */
export function getReconnectUbuntuMessages(locale: Locale) {
  return locale === "uk" ? reconnectUbuntuMessagesUk : reconnectUbuntuMessages;
}

/**
 * Get preflight-check page messages for the specified locale
 */
export function getPreflightCheckMessages(locale: Locale) {
  return locale === "uk" ? preflightCheckMessagesUk : preflightCheckMessages;
}

/**
 * Get run-installer page messages for the specified locale
 */
export function getRunInstallerMessages(locale: Locale) {
  return locale === "uk" ? runInstallerMessagesUk : runInstallerMessages;
}

/**
 * Get status-check page messages for the specified locale
 */
export function getStatusCheckMessages(locale: Locale) {
  return locale === "uk" ? statusCheckMessagesUk : statusCheckMessages;
}

/**
 * Get launch-onboarding page messages for the specified locale
 */
export function getLaunchOnboardingMessages(locale: Locale) {
  return locale === "uk" ? launchOnboardingMessagesUk : launchOnboardingMessages;
}

/**
 * Get SimplerGuide component messages for the specified locale
 */
export function getSimplerGuideMessages(locale: Locale) {
  return locale === "uk" ? simplerGuideMessagesUk : simplerGuideMessages;
}

/**
 * Get CommandCard component messages for the specified locale
 */
export function getCommandCardMessages(locale: Locale) {
  return locale === "uk" ? commandCardMessagesUk : commandCardMessages;
}

/**
 * Get ConnectionCheck component messages for the specified locale
 */
export function getConnectionCheckMessages(locale: Locale) {
  return locale === "uk" ? connectionCheckMessagesUk : connectionCheckMessages;
}

/**
 * Get Jargon component UI messages for the specified locale
 */
export function getJargonUiMessages(locale: Locale) {
  return locale === "uk" ? jargonUiMessagesUk : jargonUiMessages;
}

/**
 * Get Stepper component messages for the specified locale
 */
export function getStepperMessages(locale: Locale) {
  return locale === "uk" ? stepperMessagesUk : stepperMessages;
}

/**
 * Get Flywheel Visualization component messages for the specified locale
 */
export function getFlywheelVizMessages(locale: Locale) {
  return locale === "uk" ? flywheelVizMessagesUk : flywheelVizMessages;
}

/**
 * Get AgentHeroCard component messages for the specified locale
 */
export function getAgentHeroCardMessages(locale: Locale) {
  return locale === "uk" ? agentHeroCardMessagesUk : agentHeroCardMessages;
}

/**
 * Get Lesson Components messages for the specified locale
 */
export function getLessonComponentsMessages(locale: Locale) {
  return locale === "uk" ? lessonComponentsMessagesUk : lessonComponentsMessages;
}

// Page messages
import { learnMessages } from "../learn-messages";
import { learnMessagesUk } from "../learn-messages.uk";
import { flywheelMessages } from "../flywheel-messages";
import { flywheelMessagesUk } from "../flywheel-messages.uk";
import { troubleshootingMessages } from "../troubleshooting-messages";
import { troubleshootingMessagesUk } from "../troubleshooting-messages.uk";
import { workflowMessages } from "../workflow-messages";
import { workflowMessagesUk } from "../workflow-messages.uk";
import { commandsUiMessages } from "../commands-ui-messages";
import { commandsUiMessagesUk } from "../commands-ui-messages.uk";
import { glossaryUiMessages } from "../glossary-ui-messages";
import { glossaryUiMessagesUk } from "../glossary-ui-messages.uk";
import { securityMessages, type ChecklistItem } from "../security-messages";
import { securityMessagesUk } from "../security-messages.uk";
import { homeMessages } from "../home-messages";
import { homeMessagesUk } from "../home-messages.uk";
import { toolPageMessages } from "../tool-page-messages";
import { toolPageMessagesUk } from "../tool-page-messages.uk";
import { commandReferenceMessages } from "../command-reference-messages";
import { commandReferenceMessagesUk } from "../command-reference-messages.uk";

// Re-export type for consumers
export type { ChecklistItem };

/**
 * Get learn page messages for the specified locale
 */
export function getLearnMessages(locale: Locale) {
  return locale === "uk" ? learnMessagesUk : learnMessages;
}

/**
 * Get flywheel page messages for the specified locale
 */
export function getFlywheelMessages(locale: Locale) {
  return locale === "uk" ? flywheelMessagesUk : flywheelMessages;
}

/**
 * Get troubleshooting page messages for the specified locale
 */
export function getTroubleshootingMessages(locale: Locale) {
  return locale === "uk" ? troubleshootingMessagesUk : troubleshootingMessages;
}

/**
 * Get workflow page messages for the specified locale
 */
export function getWorkflowMessages(locale: Locale) {
  return locale === "uk" ? workflowMessagesUk : workflowMessages;
}

/**
 * Get commands UI messages for the specified locale
 */
export function getCommandsUiMessages(locale: Locale) {
  return locale === "uk" ? commandsUiMessagesUk : commandsUiMessages;
}

/**
 * Get glossary UI messages for the specified locale
 */
export function getGlossaryUiMessages(locale: Locale) {
  return locale === "uk" ? glossaryUiMessagesUk : glossaryUiMessages;
}

/**
 * Get security page messages for the specified locale
 */
export function getSecurityMessages(locale: Locale) {
  return locale === "uk" ? securityMessagesUk : securityMessages;
}

/**
 * Get home page messages for the specified locale
 */
export function getHomeMessages(locale: Locale) {
  return locale === "uk" ? homeMessagesUk : homeMessages;
}

/**
 * Get tool page messages for the specified locale
 */
export function getToolPageMessages(locale: Locale) {
  return locale === "uk" ? toolPageMessagesUk : toolPageMessages;
}

/**
 * Get command reference page messages for the specified locale
 */
export function getCommandReferenceMessages(locale: Locale) {
  return locale === "uk" ? commandReferenceMessagesUk : commandReferenceMessages;
}

/**
 * Get beads lesson messages for the specified locale
 */
export function getBeadsLessonMessages(locale: Locale) {
  return locale === "uk" ? beadsLessonMessagesUk : beadsLessonMessages;
}

/**
 * Get keeping updated lesson messages for the specified locale
 */
export function getKeepingUpdatedLessonMessages(locale: Locale) {
  return locale === "uk" ? keepingUpdatedLessonMessagesUk : keepingUpdatedLessonMessages;
}

/**
 * Get agent mail lesson messages for the specified locale
 */
export function getAgentMailLessonMessages(locale: Locale) {
  return locale === "uk" ? agentMailLessonMessagesUk : agentMailLessonMessages;
}

/**
 * Get welcome lesson messages for the specified locale
 */
export function getWelcomeLessonMessages(locale: Locale) {
  return locale === "uk" ? welcomeLessonMessagesUk : welcomeLessonMessages;
}

/**
 * Get linux-basics lesson messages for the specified locale
 */
export function getLinuxBasicsLessonMessages(locale: Locale) {
  return locale === "uk" ? linuxBasicsLessonMessagesUk : linuxBasicsLessonMessages;
}

/**
 * Get tmux-basics lesson messages for the specified locale
 */
export function getTmuxBasicsLessonMessages(locale: Locale) {
  return locale === "uk" ? tmuxBasicsLessonMessagesUk : tmuxBasicsLessonMessages;
}

/**
 * Get ssh-basics lesson messages for the specified locale
 */
export function getSshBasicsLessonMessages(locale: Locale) {
  return locale === "uk" ? sshBasicsLessonMessagesUk : sshBasicsLessonMessages;
}

/**
 * Get safety-tools lesson messages for the specified locale
 */
export function getSafetyToolsLessonMessages(locale: Locale) {
  return locale === "uk" ? safetyToolsLessonMessagesUk : safetyToolsLessonMessages;
}

/**
 * Get flywheel-loop lesson messages for the specified locale
 */
export function getFlywheelLoopMessages(locale: Locale) {
  return locale === "uk" ? flywheelLoopMessagesUk : flywheelLoopMessages;
}

/**
 * Get CM lesson messages for the specified locale
 */
export function getCmLessonMessages(locale: Locale) {
  return locale === "uk" ? cmLessonMessagesUk : cmLessonMessages;
}

/**
 * Get NTM Palette lesson messages for the specified locale
 */
export function getNtmPaletteLessonMessages(locale: Locale) {
  return locale === "uk" ? ntmPaletteLessonMessagesUk : ntmPaletteLessonMessages;
}

/**
 * Get NTM Core lesson messages for the specified locale
 */
export function getNtmCoreLessonMessages(locale: Locale) {
  return locale === "uk" ? ntmCoreLessonMessagesUk : ntmCoreLessonMessages;
}

/**
 * Get Agents Login lesson messages for the specified locale
 */
export function getAgentsLoginLessonMessages(locale: Locale) {
  return locale === "uk" ? agentsLoginLessonMessagesUk : agentsLoginLessonMessages;
}

/**
 * Get CASS lesson messages for the specified locale
 */
export function getCassLessonMessages(locale: Locale) {
  return locale === "uk" ? cassLessonMessagesUk : cassLessonMessages;
}

/**
 * Get Meta Skill lesson messages for the specified locale
 */
export function getMsLessonMessages(locale: Locale) {
  return locale === "uk" ? msMessagesUk : msMessages;
}

/**
 * Get UBS lesson messages for the specified locale
 */
export function getUbsLessonMessages(locale: Locale) {
  return locale === "uk" ? ubsLessonMessagesUk : ubsLessonMessages;
}

/**
 * Get GitHub CLI lesson messages for the specified locale
 */
export function getGithubCliLessonMessages(locale: Locale) {
  return locale === "uk" ? githubCliLessonMessagesUk : githubCliLessonMessages;
}

/**
 * Get Git Basics lesson messages for the specified locale
 */
export function getGitBasicsLessonMessages(locale: Locale) {
  return locale === "uk" ? gitBasicsLessonMessagesUk : gitBasicsLessonMessages;
}

/**
 * Get SLB Case Study lesson messages for the specified locale
 */
export function getSlbCaseStudyLessonMessages(locale: Locale) {
  return locale === "uk" ? slbCaseStudyLessonMessagesUk : slbCaseStudyLessonMessages;
}

/**
 * Get Prompt Engineering lesson messages for the specified locale
 */
export function getPromptEngineeringLessonMessages(locale: Locale) {
  return locale === "uk" ? promptEngineeringLessonMessagesUk : promptEngineeringLessonMessages;
}

/**
 * Get Real World Case Study lesson messages for the specified locale
 */
export function getRealWorldCaseStudyLessonMessages(locale: Locale) {
  return locale === "uk" ? realWorldCaseStudyLessonMessagesUk : realWorldCaseStudyLessonMessages;
}

/**
 * Get RU lesson messages for the specified locale
 */
export function getRuLessonMessages(locale: Locale) {
  return locale === "uk" ? ruLessonMessagesUk : ruLessonMessages;
}

/**
 * Get DCG lesson messages for the specified locale
 */
export function getDcgLessonMessages(locale: Locale) {
  return locale === "uk" ? dcgLessonMessagesUk : dcgLessonMessages;
}

/**
 * Get TLDR messages for the specified locale
 */
export function getTldrMessagesForLocale(locale: Locale) {
  return locale === "uk" ? getTldrMessagesUk() : getTldrMessages();
}

/**
 * Get TLDR page data for the specified locale
 */
export function getTldrPageDataForLocale(locale: Locale) {
  return locale === "uk" ? tldrPageDataUk : tldrPageData;
}

/**
 * Get TLDR flywheel tools for the specified locale
 */
export function getTldrFlywheelToolsForLocale(locale: Locale) {
  return locale === "uk" ? tldrFlywheelToolsUk : tldrFlywheelTools;
}
