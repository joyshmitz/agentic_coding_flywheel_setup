/**
 * Feature flags for JargonText rollout phases.
 *
 * Phase 1 (Day 1 - ACTIVE):
 *   Original: launch-onboarding, ssh-connect, status-check
 *   Added: install-terminal, create-vps, accounts (dangerouslySetInnerHTML pages)
 *   Total: 6 pages, 200+ terms
 *
 * Phase 2 (Day 3 - PENDING):
 *   reconnect-ubuntu, verify-key-connection, preflight-check (3 pages)
 *
 * Phase 3 (Day 5 - DEPRECATED):
 *   Removed (pages moved to Phase 1)
 *
 * Usage:
 *   const isEnabled = isJargonTextEnabled('launch-onboarding');
 *   if (isEnabled) <JargonText>{text}</JargonText>
 *
 * Pending Coverage (not yet JargonText):
 *   - generate-ssh-key (15 dangerouslySetInnerHTML, complex HTML structure)
 *   - rent-vps (26 dangerouslySetInnerHTML, requires HTML refactoring)
 */

export type JargonPhase = 'phase1' | 'phase2' | 'phase3';
export type WizardPage =
  | 'launch-onboarding'
  | 'ssh-connect'
  | 'status-check'
  | 'reconnect-ubuntu'
  | 'verify-key-connection'
  | 'preflight-check'
  | 'install-terminal'
  | 'create-vps'
  | 'accounts';

/**
 * Wizard pages with dangerouslySetInnerHTML that still need JargonText coverage.
 * These couldn't be updated in Phase 1 due to complexity of their HTML structures.
 */
export type PendingJargonPage = 'generate-ssh-key' | 'rent-vps';

export interface PendingPageInfo {
  page: PendingJargonPage;
  reason: string;
  dangerouslySetInnerHTMLCount: number;
  estimatedEffort: string;
  priority: 'low' | 'medium' | 'high';
  blockers: string[];
}

interface RolloutConfig {
  enabled: boolean;
  pages: WizardPage[];
  rolloutDate: string;
}

/**
 * Feature flag configuration.
 * Set enabled to true to activate the phase.
 */
export const jargonTextRollout: Record<JargonPhase, RolloutConfig> = {
  phase1: {
    enabled: true,
    pages: ['launch-onboarding', 'ssh-connect', 'status-check', 'install-terminal', 'create-vps', 'accounts'],
    rolloutDate: '2026-02-28', // Today
  },
  phase2: {
    enabled: false,
    pages: ['reconnect-ubuntu', 'verify-key-connection', 'preflight-check'],
    rolloutDate: '2026-03-02', // Day 3
  },
  phase3: {
    enabled: false,
    pages: [], // Reserved for future pages (generate-ssh-key, rent-vps, or new pages)
    rolloutDate: '2026-03-05', // Day 5 - to be determined
  },
};

/**
 * Check if JargonText is enabled for a specific wizard page.
 */
export function isJargonTextEnabled(page: WizardPage): boolean {
  // Check if page is in any enabled phase
  for (const phase of Object.values(jargonTextRollout)) {
    if (phase.enabled && phase.pages.includes(page)) {
      return true;
    }
  }
  return false;
}

/**
 * Get current rollout phase status.
 */
export function getRolloutPhase(): JargonPhase | null {
  for (const [phase, config] of Object.entries(jargonTextRollout)) {
    if (config.enabled) {
      return phase as JargonPhase;
    }
  }
  return null;
}

/**
 * Get all enabled pages across all phases.
 */
export function getEnabledPages(): WizardPage[] {
  const enabled: WizardPage[] = [];
  for (const phase of Object.values(jargonTextRollout)) {
    if (phase.enabled) {
      enabled.push(...phase.pages);
    }
  }
  return enabled;
}

/**
 * Validate feature flag configuration.
 * Runs at module load time to catch errors early.
 *
 * Checks:
 * - rolloutDate is valid YYYY-MM-DD format
 * - pages array is not null
 * - no duplicate pages across phases
 * - all pages are valid WizardPage types
 */
function validateRolloutConfig() {
  const errors: string[] = [];
  const seenPages = new Map<string, string>(); // page -> phase
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  for (const [phase, config] of Object.entries(jargonTextRollout)) {
    // Validate rolloutDate format
    if (!dateRegex.test(config.rolloutDate)) {
      errors.push(
        `[${phase}] Invalid rolloutDate format: "${config.rolloutDate}" (expected YYYY-MM-DD)`
      );
    }

    // Validate pages array exists
    if (!Array.isArray(config.pages)) {
      errors.push(`[${phase}] pages must be an array, got ${typeof config.pages}`);
      continue;
    }

    // Check for duplicate pages across phases
    for (const page of config.pages) {
      if (seenPages.has(page)) {
        errors.push(
          `[${phase}] Duplicate page "${page}" already in phase "${seenPages.get(page)}"`
        );
      }
      seenPages.set(page, phase);
    }
  }

  // Report errors
  if (errors.length > 0) {
    const message = errors.join('\n');
    console.error('[JargonText] Configuration validation FAILED:\n' + message);

    // In production, fail fast
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
      throw new Error(`[JargonText] Invalid configuration:\n${message}`);
    }
  }
  // Skip success log to avoid noise in server logs
}

// Run validation at module load time
if (typeof window === 'undefined') {
  // Only on server-side (avoid running on client-side on every page load)
  validateRolloutConfig();
}

/**
 * Pages pending JargonText coverage due to HTML complexity.
 * Tracked for visibility and prioritization.
 */
export const pendingJargonTextPages: PendingPageInfo[] = [
  {
    page: 'generate-ssh-key',
    reason: 'Complex HTML structure with multiple dangerouslySetInnerHTML blocks for bold formatting',
    dangerouslySetInnerHTMLCount: 15,
    estimatedEffort: '2-3 hours',
    priority: 'medium',
    blockers: [
      'Requires refactoring HTML → JSX to use <strong> elements',
      'Many nested and conditionally-rendered HTML blocks',
    ],
  },
  {
    page: 'rent-vps',
    reason: 'Most complex wizard page with extensive dangerouslySetInnerHTML usage',
    dangerouslySetInnerHTMLCount: 26,
    estimatedEffort: '3-4 hours',
    priority: 'medium',
    blockers: [
      'Substantial HTML structure refactoring required',
      'Multiple conditional HTML sections (OS-specific)',
      'Provider comparison tables with inline formatting',
    ],
  },
];

/**
 * Get JargonText rollout coverage statistics.
 * Useful for dashboards, reporting, and progress tracking.
 */
export interface CoverageStats {
  total: number; // Total wizard pages (tracked + pending)
  covered: number; // Pages with JargonText enabled
  pending: number; // Pages pending coverage
  /**
   * Coverage percentage of tracked pages only (6/9 = 67%).
   * Use this for milestone reporting: "67% of tracked wizard pages have JargonText"
   */
  percentageTracked: number;
  /**
   * Overall coverage percentage including pending (6/11 = 55%).
   * Use this for long-term goal reporting: "55% of all wizard pages have JargonText"
   */
  percentageOverall: number;
  details: {
    phase1Count: number;
    phase2Count: number;
    phase3Count: number;
  };
}

export function getCoverageStats(): CoverageStats {
  const allPages: WizardPage[] = [
    'launch-onboarding',
    'ssh-connect',
    'status-check',
    'reconnect-ubuntu',
    'verify-key-connection',
    'preflight-check',
    'install-terminal',
    'create-vps',
    'accounts',
  ];

  const covered = getEnabledPages().length;
  const pending = pendingJargonTextPages.length;
  const trackedPages = allPages.length; // 9 pages
  const total = trackedPages + pending; // 11 pages

  return {
    total,
    covered,
    pending,
    percentageTracked: Math.round((covered / trackedPages) * 100), // 6/9 = 67%
    percentageOverall: Math.round((covered / total) * 100), // 6/11 = 55%
    details: {
      phase1Count: jargonTextRollout.phase1.pages.length,
      phase2Count: jargonTextRollout.phase2.pages.length,
      phase3Count: jargonTextRollout.phase3.pages.length,
    },
  };
}
