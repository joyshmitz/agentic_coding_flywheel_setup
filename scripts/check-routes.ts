/**
 * Check Routes - Advisory Only
 *
 * Verifies STATIC_ROUTES have corresponding files.
 * Does NOT exit 1 - just warns about drift.
 */

import { existsSync } from "fs";
import { STATIC_ROUTES } from "./static-routes";

function routeToFile(route: string): string {
  if (route === "/") return "apps/web/app/page.tsx";
  return `apps/web/app${route}/page.tsx`;
}

let warnings = 0;

for (const route of STATIC_ROUTES) {
  const file = routeToFile(route);
  if (!existsSync(file)) {
    console.warn(`[WARN] Route "${route}" → file not found: ${file}`);
    warnings++;
  }
}

if (warnings > 0) {
  console.warn(`\n⚠️  ${warnings} static routes may have drifted`);
  console.warn("Action: Update STATIC_ROUTES in scripts/static-routes.ts");
} else {
  console.log(
    `✓ All ${STATIC_ROUTES.length} static routes have corresponding files`
  );
}

// Advisory only — does not block
