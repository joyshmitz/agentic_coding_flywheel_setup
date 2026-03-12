/**
 * Feature-flag-aware JargonText wrapper.
 *
 * Usage:
 *   <RolloutJargonText page="launch-onboarding">
 *     SSH and VPS are important.
 *   </RolloutJargonText>
 *
 * When feature flag is disabled for this page, renders plain text.
 * When enabled, renders JargonText with tooltips.
 */

import React, { ReactNode } from 'react';
import { JargonText } from '@/components/jargon';
import { isJargonTextEnabled, getEnabledPages, WizardPage } from '@/lib/feature-flags';

interface RolloutJargonTextProps {
  children: string | ReactNode;
  page: WizardPage;
  /**
   * If true, always render as plain text (useful for testing/debugging)
   */
  forceDisabled?: boolean;
}

export function RolloutJargonText({
  children,
  page,
  forceDisabled = false,
}: RolloutJargonTextProps) {
  const isEnabled = !forceDisabled && isJargonTextEnabled(page);

  if (!isEnabled) {
    // Render without JargonText wrapper
    return <>{children}</>;
  }

  // Only pass string children to JargonText
  if (typeof children === 'string') {
    return <JargonText>{children}</JargonText>;
  }

  // If children contains JSX, wrap it carefully
  // (developers should use JargonText directly for mixed JSX)
  return <>{children}</>;
}

/**
 * Debug helper: Show which pages have JargonText enabled.
 * Remove from production.
 */
export function RolloutDebugBanner() {
  if (typeof window === 'undefined') return null;

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  const enabledPages = getEnabledPages();

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-amber-100 border border-amber-400 rounded px-3 py-2 text-xs max-w-xs">
      <p className="font-semibold text-amber-900">JargonText Rollout Debug</p>
      <p className="text-amber-800">
        Enabled pages ({enabledPages.length}): <strong>{enabledPages.join(', ')}</strong>
      </p>
    </div>
  );
}
