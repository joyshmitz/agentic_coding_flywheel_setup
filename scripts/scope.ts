/**
 * Scope - Routing Aggregator
 *
 * Combines canonical sources into SCOPE_ROUTES and SCOPE_FILES.
 * Used by check-i18n.ts for render testing.
 */

import { existsSync } from "fs";
import { glob } from "glob";
import { LESSONS } from "../apps/web/lib/lessons";
import { TOOL_IDS } from "../apps/web/lib/tool-ids";
import { STATIC_ROUTES } from "./static-routes";

// Re-export for convenience
export { STATIC_ROUTES };

// === ROUTES (for render checks) ===
export const SCOPE_ROUTES = [
  ...STATIC_ROUTES,
  ...LESSONS.map((l) => `/learn/${l.slug}`),
  ...TOOL_IDS.map((id) => `/learn/tools/${id}`),
];
// Total: STATIC_ROUTES.length + LESSONS.length + TOOL_IDS.length

// === FILES (for source checks) ===
export const SCOPE_FILES = [
  // Root pages (7)
  "apps/web/app/page.tsx",
  "apps/web/app/glossary/page.tsx",
  "apps/web/app/flywheel/page.tsx",
  "apps/web/app/tools/page.tsx",
  "apps/web/app/troubleshooting/page.tsx",
  "apps/web/app/workflow/page.tsx",
  "apps/web/app/tldr/page.tsx",
  // Learn (5)
  "apps/web/app/learn/page.tsx",
  "apps/web/app/learn/[slug]/page.tsx",
  "apps/web/app/learn/glossary/page.tsx",
  "apps/web/app/learn/commands/page.tsx",
  "apps/web/app/learn/tools/[tool]/page.tsx",
  // Wizard (15)
  "apps/web/app/wizard/layout.tsx",
  "apps/web/app/wizard/generate-ssh-key/page.tsx",
  "apps/web/app/wizard/install-terminal/page.tsx",
  "apps/web/app/wizard/accounts/page.tsx",
  "apps/web/app/wizard/create-vps/page.tsx",
  "apps/web/app/wizard/run-installer/page.tsx",
  "apps/web/app/wizard/rent-vps/page.tsx",
  "apps/web/app/wizard/preflight-check/page.tsx",
  "apps/web/app/wizard/os-selection/page.tsx",
  "apps/web/app/wizard/reconnect-ubuntu/page.tsx",
  "apps/web/app/wizard/launch-onboarding/page.tsx",
  "apps/web/app/wizard/ssh-connect/page.tsx",
  "apps/web/app/wizard/verify-key-connection/page.tsx",
  "apps/web/app/wizard/windows-terminal-setup/page.tsx",
  "apps/web/app/wizard/status-check/page.tsx",
  // Docs (1)
  "apps/web/app/docs/security/page.tsx",
  // Shared components (9)
  "apps/web/components/stepper.tsx",
  "apps/web/components/language-switcher.tsx",
  "apps/web/components/alert-card.tsx",
  "apps/web/components/command-card.tsx",
  "apps/web/components/command-ref-card.tsx",
  "apps/web/components/connection-check.tsx",
  "apps/web/components/jargon.tsx",
  "apps/web/components/simpler-guide.tsx",
  "apps/web/components/flywheel-visualization.tsx",
  // Lesson components (dynamic via glob)
  ...glob.sync("apps/web/components/lessons/*-lesson.tsx"),
];

// === SCOPE VALIDATION ===
// Checks that files exist (catches drift)
export function validateScope(): string[] {
  const missing: string[] = [];
  for (const f of SCOPE_FILES) {
    if (!f.includes("*") && !existsSync(f)) {
      missing.push(f);
    }
  }
  return missing;
}
