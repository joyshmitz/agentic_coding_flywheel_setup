/**
 * Check Fallbacks - Advisory Only
 *
 * Detects potential EN fallback patterns.
 * Does NOT exit 1 - just hints for review.
 */

import { readFileSync, existsSync } from "fs";
import { SCOPE_FILES } from "./scope";

const FALLBACK_PATTERNS = [
  /\|\|\s*["'][A-Za-z][^"']*["']/g, // || "text"
  /\?\s*["'][A-Za-z][^"']*["']\s*:/g, // ? "text" :
  /\?\?\s*["'][A-Za-z][^"']*["']/g, // ?? "text"
];

let total = 0;

for (const file of SCOPE_FILES) {
  if (!existsSync(file)) continue;
  const content = readFileSync(file, "utf-8");

  for (const pattern of FALLBACK_PATTERNS) {
    const matches = content.match(pattern) || [];
    if (matches.length > 0) {
      console.warn(`[WARN] ${file}:`);
      matches.forEach((m) => console.warn(`  ${m}`));
      total += matches.length;
    }
  }
}

if (total > 0) {
  console.warn(`\n⚠️  ${total} potential fallbacks (review manually)`);
} else {
  console.log(`\n✓ No obvious fallbacks detected`);
}

console.log(`[INFO] Checked ${SCOPE_FILES.length} files (advisory only)`);
// NO exit 1 — this is just a hint for review
