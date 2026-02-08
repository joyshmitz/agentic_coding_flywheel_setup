#!/bin/bash
# Verify Phase 0 - Final Gate
#
# Single entry point for Phase 0 completion.
# Runs all blockers + verifies proof with git audit + scope hash.

set -e  # exit on first failure

echo "=== Phase 0 Verification ==="

# === PRECONDITIONS ===
echo "--- Preconditions ---"

if [ ! -f apps/web/lib/tool-ids.ts ]; then
  echo "❌ tool-ids.ts not found"
  exit 1
fi
echo "✓ tool-ids.ts exists"

bun -e "import('glob').catch(() => process.exit(1))" 2>/dev/null || {
  echo "❌ glob not installed — run: bun add glob"
  exit 1
}
echo "✓ glob installed"

# === RUN ALL BLOCKERS ===
echo ""
echo "--- Running blockers ---"

bun run check-lessons || { echo "❌ check-lessons failed"; exit 1; }
echo "✓ check-lessons"

bun run check-tool-ids || { echo "❌ check-tool-ids failed"; exit 1; }
echo "✓ check-tool-ids"

bun run type-check || { echo "❌ type-check failed"; exit 1; }
echo "✓ type-check"

bun run lint || { echo "❌ lint failed"; exit 1; }
echo "✓ lint"

bun run i18n:check || { echo "❌ i18n:check failed"; exit 1; }
echo "✓ i18n:check"

# === VERIFY PROOF ===
echo ""
echo "--- Verifying proof ---"

if [ ! -f i18n-proof.md ]; then
  echo "❌ i18n-proof.md not found"
  exit 1
fi

# CRITICAL: proof must be committed AND match disk (no uncommitted changes)
if ! git diff --quiet -- i18n-proof.md 2>/dev/null; then
  echo "❌ i18n-proof.md has uncommitted changes"
  echo "   Run: git add i18n-proof.md && git commit -m 'update proof'"
  exit 1
fi
if ! git diff --cached --quiet -- i18n-proof.md 2>/dev/null; then
  echo "❌ i18n-proof.md has staged but uncommitted changes"
  echo "   Run: git commit -m 'update proof'"
  exit 1
fi
GIT_LOG=$(git log --oneline -1 -- i18n-proof.md 2>/dev/null) || true
if [ -z "$GIT_LOG" ]; then
  echo "❌ i18n-proof.md never committed"
  exit 1
fi
echo "✓ proof committed: $GIT_LOG"

# Get current scope hash (routes joined + md5)
SCOPE_HASH=$(bun -e "import {SCOPE_ROUTES} from './scripts/scope'; const crypto = require('crypto'); console.log(crypto.createHash('md5').update(SCOPE_ROUTES.join(',')).digest('hex').slice(0,8))")

# Check: either (SKIP + SIGNOFF + hash) or (RED + GREEN + hash)
if grep -q "^SKIP:" i18n-proof.md; then
  # SKIP path
  if ! grep -q "^SIGNOFF:" i18n-proof.md; then
    echo "❌ SKIP requires sign-off — run: ./scripts/skip-signoff.sh 'Name'"
    exit 1
  fi
  if ! grep -q "Scope: $SCOPE_HASH" i18n-proof.md; then
    echo "❌ SKIP proof scope mismatch (expected $SCOPE_HASH)"
    echo "   Re-run red/green protocol with current scope"
    exit 1
  fi
  echo "✓ SKIP with sign-off (scope: $SCOPE_HASH)"
else
  # RED→GREEN path
  if ! grep -q "^RED baseline:" i18n-proof.md; then
    echo "❌ Missing 'RED baseline:' in i18n-proof.md"
    exit 1
  fi
  if ! grep -q "^GREEN:" i18n-proof.md; then
    echo "❌ Missing 'GREEN:' in i18n-proof.md"
    exit 1
  fi
  if ! grep -q "Scope: $SCOPE_HASH" i18n-proof.md; then
    echo "❌ GREEN proof scope mismatch (expected $SCOPE_HASH)"
    echo "   Re-run red/green protocol with current scope"
    exit 1
  fi
  echo "✓ RED→GREEN proof (scope: $SCOPE_HASH)"
fi

echo ""
echo "✅ Phase 0 complete — ready for Phase 1"
