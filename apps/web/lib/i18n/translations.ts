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
