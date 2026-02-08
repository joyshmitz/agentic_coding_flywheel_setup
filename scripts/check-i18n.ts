/**
 * Check i18n - Main Gate
 *
 * Playwright-based render check for EN violations.
 * Exit 1 on any violation.
 */

import { chromium, type Page } from "playwright";
import { isAllowedEN, isViolation } from "./en-whitelist";
import { SCOPE_ROUTES, validateScope } from "./scope";

// === SCOPE VALIDATION (catch drift before running tests) ===
const missing = validateScope();
if (missing.length > 0) {
  console.error("❌ Scope drift detected - files missing:");
  missing.forEach((f) => console.error(`  ${f}`));
  process.exit(1);
}
console.log(`✓ Scope validated: ${SCOPE_ROUTES.length} routes`);

async function waitForServer(url: string, timeout = 30000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {
      // Server not ready yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

async function extractText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const clone = document.body.cloneNode(true) as HTMLElement;
    // Remove code blocks, scripts, styles, and technical elements
    clone
      .querySelectorAll(
        "code, pre, script, style, noscript, [data-code], [data-terminal], " +
          "[class*='code'], [class*='terminal'], [class*='syntax'], " +
          "svg, canvas, [aria-hidden='true']"
      )
      .forEach((el) => el.remove());
    return clone.innerText;
  });
}

function findViolations(text: string): string[] {
  const words = text.match(/\b[A-Za-z]{2,}\b/g) || [];
  const violations: string[] = [];
  for (const word of words) {
    if (isAllowedEN(word)) continue;
    if (isViolation(word)) violations.push(word);
  }
  return [...new Set(violations)];
}

async function main() {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  console.log(`Waiting for server at ${baseUrl}...`);
  if (!(await waitForServer(baseUrl))) {
    console.error("❌ Server timeout");
    process.exit(1);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();

  // CRITICAL: set locale via localStorage BEFORE navigation
  await context.addInitScript(() => {
    localStorage.setItem("acfs-locale", "uk");
  });

  const page = await context.newPage();

  // Verify locale is set (deterministic forcing)
  await page.goto(baseUrl);
  await page.reload(); // ensure localStorage is applied
  const localeCheck = await page.evaluate(() =>
    localStorage.getItem("acfs-locale")
  );
  if (localeCheck !== "uk") {
    console.error("❌ Failed to set locale to uk");
    process.exit(1);
  }
  console.log("✓ localStorage locale: uk");

  // Verify UI actually shows Ukrainian (not just localStorage)
  const bodyText = await page.evaluate(() => document.body.innerText);
  const hasCyrillic = /[\u0400-\u04FF]/.test(bodyText);
  if (!hasCyrillic) {
    console.error("❌ UI does not contain Cyrillic text - locale not applied");
    process.exit(1);
  }
  console.log("✓ UI locale verified (contains Cyrillic)");

  let failed = 0;
  let errors = 0;

  for (const route of SCOPE_ROUTES) {
    try {
      const res = await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle",
        timeout: 15000,
      });

      // Route validation built-in (one pass)
      if (!res || !res.ok()) {
        console.error(`[ERROR] ${route}: ${res?.status() || "no response"}`);
        errors++;
        continue;
      }

      const text = await extractText(page);
      const violations = findViolations(text);

      if (violations.length > 0) {
        console.error(
          `[FAIL] ${route}: ${violations.slice(0, 5).join(", ")}${violations.length > 5 ? "..." : ""}`
        );
        failed++;
      } else {
        console.log(`[PASS] ${route}`);
      }
    } catch (err) {
      console.error(`[ERROR] ${route}: ${err}`);
      errors++;
    }
  }

  await browser.close();

  if (errors > 0) {
    console.error(`\n❌ ${errors} route errors (check scope.ts sources)`);
    process.exit(1);
  }

  if (failed > 0) {
    console.error(
      `\n❌ ${failed}/${SCOPE_ROUTES.length} routes have EN violations`
    );
    process.exit(1);
  }

  console.log(`\n✅ All ${SCOPE_ROUTES.length} routes passed`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
