#!/bin/bash
# Skip Sign-off - Technical Enforcement for SKIP Review
#
# Records manual review sign-off in i18n-proof.md.
# Required when SKIP path is taken (already green).

if [ -z "$1" ]; then
  echo "Usage: ./scripts/skip-signoff.sh 'Reviewer Name'"
  exit 1
fi

REVIEWER="$1"
DATE=$(date -Iseconds)

# Verify i18n-proof.md contains SKIP
if ! grep -q "^SKIP:" i18n-proof.md 2>/dev/null; then
  echo "❌ No SKIP record in i18n-proof.md — run red/green protocol first"
  exit 1
fi

# Check if already signed off
if grep -q "^SIGNOFF:" i18n-proof.md 2>/dev/null; then
  echo "✓ Already signed off"
  exit 0
fi

# Add sign-off
echo "" >> i18n-proof.md
echo "SIGNOFF: $REVIEWER" >> i18n-proof.md
echo "DATE: $DATE" >> i18n-proof.md
echo "STATUS: Manual review completed" >> i18n-proof.md

git add i18n-proof.md
git commit -m "signoff: SKIP review by $REVIEWER"
echo "✓ Sign-off recorded and committed"
