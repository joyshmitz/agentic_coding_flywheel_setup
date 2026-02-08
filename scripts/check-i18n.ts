/**
 * Check i18n - Main Gate
 *
 * Playwright-based render check for EN violations.
 * Exit 1 on any violation.
 */

import { chromium, type Page } from "playwright";
import { isAllowedEN, isViolation, TECHNICAL_TERMS, BRAND_NAMES, COMPOUND_BRANDS } from "./en-whitelist";
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
          "svg, canvas, [aria-hidden='true'], " +
          // Language switcher shows language names in their native form (English, Українська)
          "select, option"
      )
      .forEach((el) => el.remove());
    // Temporarily attach clone to DOM so innerText respects CSS block boundaries.
    // Detached clones lose computed styles, causing block elements (h3, p) to
    // concatenate without newlines (e.g., "Mac" + "macOS" → "MacmacOS").
    clone.style.position = "absolute";
    clone.style.left = "-99999px";
    clone.style.visibility = "hidden";
    document.body.appendChild(clone);
    const text = clone.innerText;
    clone.remove();
    return text;
  });
}

/**
 * Split glued tokens by camelCase boundaries.
 * "FlywheelGitHub" → "Flywheel Git Hub"
 * "MacmacOS" → "Macmac OS"
 * "CodeCodex" → "Code Codex"
 */
function normalizeGluedTokens(text: string): string {
  return text
    // Split on camelCase: "FlywheelGitHub" → "Flywheel Git Hub"
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // Split on case change followed by lowercase: "CLIGemini" → "CLI Gemini"
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");
}

/**
 * Split all-uppercase glued tokens by known acronyms.
 * "CLINTM" → ["CLI", "NTM"]
 * "MCPUBS" → ["MCP", "UBS"]
 * "SLBDCG" → ["SLB", "DCG"]
 * Returns null if cannot fully decompose.
 */
function splitAllCapsToken(token: string): string[] | null {
  if (!/^[A-Z]{4,}$/.test(token)) return null;

  // Collect known uppercase acronyms from whitelist, sorted longest-first
  const acronyms = [...TECHNICAL_TERMS, ...BRAND_NAMES]
    .filter((t) => /^[A-Z]{2,}$/.test(t))
    .sort((a, b) => b.length - a.length);

  const parts: string[] = [];
  let remaining = token;
  while (remaining.length > 0) {
    let matched = false;
    for (const acr of acronyms) {
      if (remaining.startsWith(acr)) {
        parts.push(acr);
        remaining = remaining.slice(acr.length);
        matched = true;
        break;
      }
    }
    if (!matched) return null; // can't decompose
  }
  return parts;
}

function findViolations(text: string): string[] {
  // Step 0: strip compound brand names so their parts don't trigger violations
  // (e.g. "Code" from "Claude Code"). Source: en-whitelist.ts COMPOUND_BRANDS.
  let cleanText = text;
  for (const brand of COMPOUND_BRANDS) {
    cleanText = cleanText.replaceAll(brand, "");
  }

  // Step 1: extract raw tokens from cleaned text
  const rawTokens = cleanText.match(/[A-Za-z]{2,}/g) || [];
  const violations: string[] = [];

  for (const raw of rawTokens) {
    // Step 2: check whitelist on the RAW token first (before splitting)
    // This preserves compound terms like "GitHub", "ChatGPT", "MacBook"
    if (isAllowedEN(raw)) continue;

    // Step 2b: try splitting all-caps glued tokens (e.g., "CLINTM" → "CLI"+"NTM")
    const allCapsParts = splitAllCapsToken(raw);
    if (allCapsParts) continue; // fully decomposed into known acronyms

    // Step 3: split glued tokens and check each part
    const parts = normalizeGluedTokens(raw).split(/\s+/).filter(p => p.length >= 2);
    for (const part of parts) {
      if (isAllowedEN(part)) continue;
      // Try splitting all-caps part (e.g., "SLBDCG" from "tmuxSLBDCG")
      if (splitAllCapsToken(part)) continue;
      if (isViolation(part)) violations.push(part);
    }
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
  const wordFreq: Record<string, number> = {};

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
        for (const v of violations) {
          wordFreq[v] = (wordFreq[v] || 0) + 1;
        }
      } else {
        console.log(`[PASS] ${route}`);
      }
    } catch (err) {
      console.error(`[ERROR] ${route}: ${err}`);
      errors++;
    }
  }

  await browser.close();

  // Top offenders report
  const sorted = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  if (sorted.length > 0) {
    console.error("\n── Top offenders (word × routes) ──");
    for (const [word, count] of sorted) {
      console.error(`  ${String(count).padStart(3)} × ${word}`);
    }
  }

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
