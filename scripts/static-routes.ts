/**
 * Static Routes - Minimal, No Dependencies
 *
 * Separate file so check-routes.ts doesn't pull in lessons/tool-ids/glob.
 * ONLY static routes, no dynamic generation.
 */

export const STATIC_ROUTES = [
  // Root pages (7)
  "/",
  "/flywheel",
  "/glossary",
  "/tools",
  "/troubleshooting",
  "/workflow",
  "/tldr",
  // Learn hub (3)
  "/learn",
  "/learn/glossary",
  "/learn/commands",
  // Wizard (14)
  "/wizard/os-selection",
  "/wizard/install-terminal",
  "/wizard/windows-terminal-setup",
  "/wizard/generate-ssh-key",
  "/wizard/rent-vps",
  "/wizard/create-vps",
  "/wizard/ssh-connect",
  "/wizard/verify-key-connection",
  "/wizard/reconnect-ubuntu",
  "/wizard/accounts",
  "/wizard/preflight-check",
  "/wizard/run-installer",
  "/wizard/status-check",
  "/wizard/launch-onboarding",
  // Docs (1)
  "/docs/security",
];
