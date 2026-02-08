/**
 * Tool IDs - Canonical Source
 *
 * This file is the single source of truth for tool IDs.
 * tool-data.tsx imports FROM here (not vice versa).
 * This allows scripts/*.ts to import without JSX dependencies.
 */

export const TOOL_IDS = [
  "claude-code",
  "codex-cli",
  "gemini-cli",
  "ntm",
  "beads",
  "agent-mail",
  "ubs",
  "cass",
  "cm",
  "caam",
  "slb",
  "dcg",
  "ru",
  "ms",
  "apr",
  "jfp",
  "pt",
  "srps",
  "xf",
] as const;

export type ToolId = (typeof TOOL_IDS)[number];
