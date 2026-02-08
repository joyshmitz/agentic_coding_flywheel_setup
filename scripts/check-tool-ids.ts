/**
 * Check Tool IDs - Blocker #2
 *
 * Verifies TOOL_IDS ↔ TOOLS consistency.
 * NOTE: Run via `bun run` - supports TSX import.
 * Exit 1 on mismatch.
 */

import { TOOL_IDS } from "../apps/web/lib/tool-ids";
import { TOOLS } from "../apps/web/app/learn/tools/[tool]/tool-data";

let errors = 0;

// Check: no duplicates in TOOL_IDS
const seen = new Set<string>();
for (const id of TOOL_IDS) {
  if (seen.has(id)) {
    console.error(`[FAIL] Duplicate in TOOL_IDS: "${id}"`);
    errors++;
  }
  seen.add(id);
}

const toolIdsSet = new Set(TOOL_IDS);
const toolsKeys = new Set(Object.keys(TOOLS));

// Check: every TOOL_ID has entry in TOOLS
for (const id of TOOL_IDS) {
  if (!toolsKeys.has(id)) {
    console.error(`[FAIL] TOOL_IDS has "${id}" but TOOLS doesn't`);
    errors++;
  }
}

// Check: every TOOLS key is in TOOL_IDS
for (const key of toolsKeys) {
  if (!toolIdsSet.has(key as (typeof TOOL_IDS)[number])) {
    console.error(`[FAIL] TOOLS has "${key}" but TOOL_IDS doesn't`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n❌ TOOL_IDS ↔ TOOLS consistency check failed`);
  process.exit(1);
}

console.log(
  `[PASS] ${TOOL_IDS.length} tool IDs (no duplicates) ↔ ${toolsKeys.size} TOOLS entries`
);
