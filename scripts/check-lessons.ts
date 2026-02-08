/**
 * Check Lessons - Blocker #1
 *
 * Verifies EN/UK lesson parity.
 * Exit 1 on mismatch.
 */

import { LESSONS } from "../apps/web/lib/lessons";
import { LESSONS_UK } from "../apps/web/lib/lessons.uk";

let errors = 0;

const enMap = new Map(LESSONS.map((l) => [l.slug, l]));
const ukMap = new Map(LESSONS_UK.map((l) => [l.slug, l]));

// Missing slugs
for (const slug of enMap.keys()) {
  if (!ukMap.has(slug)) {
    console.error(`[FAIL] Missing UK: ${slug}`);
    errors++;
  }
}

// Consistency check
for (const [slug, uk] of ukMap) {
  const en = enMap.get(slug);
  if (!en) continue;

  if (en.id !== uk.id) {
    console.error(`[FAIL] ${slug}: id mismatch (EN=${en.id}, UK=${uk.id})`);
    errors++;
  }
  if (en.file !== uk.file) {
    console.error(`[FAIL] ${slug}: file mismatch`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n❌ ${errors} lesson consistency errors`);
  process.exit(1);
}

console.log(`[PASS] ${enMap.size} lessons consistent`);
