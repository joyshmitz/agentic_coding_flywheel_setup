/**
 * Integration tests for feature-flags.ts
 *
 * Tests the actual rollout logic without E2E complexity:
 * - isJargonTextEnabled() function
 * - getEnabledPages() function
 * - getCoverageStats() function
 * - getRolloutPhase() function
 * - Configuration validation
 */

import { describe, test, expect } from 'bun:test';
import {
  isJargonTextEnabled,
  getEnabledPages,
  getCoverageStats,
  getRolloutPhase,
  jargonTextRollout,
  pendingJargonTextPages,
} from '@/lib/feature-flags';

describe('feature-flags integration tests', () => {
  describe('Phase Configuration', () => {
    test('Phase 1 should be enabled', () => {
      expect(jargonTextRollout.phase1.enabled).toBe(true);
    });

    test('Phase 2 should be disabled', () => {
      expect(jargonTextRollout.phase2.enabled).toBe(false);
    });

    test('Phase 3 should be disabled', () => {
      expect(jargonTextRollout.phase3.enabled).toBe(false);
    });

    test('Phase 1 should have 6 pages', () => {
      expect(jargonTextRollout.phase1.pages.length).toBe(6);
    });

    test('Phase 2 should have 3 pages', () => {
      expect(jargonTextRollout.phase2.pages.length).toBe(3);
    });

    test('Phase 3 should have 0 pages', () => {
      expect(jargonTextRollout.phase3.pages.length).toBe(0);
    });
  });

  describe('isJargonTextEnabled() function', () => {
    describe('Phase 1 pages (enabled)', () => {
      test('launch-onboarding should be enabled', () => {
        expect(isJargonTextEnabled('launch-onboarding')).toBe(true);
      });

      test('ssh-connect should be enabled', () => {
        expect(isJargonTextEnabled('ssh-connect')).toBe(true);
      });

      test('status-check should be enabled', () => {
        expect(isJargonTextEnabled('status-check')).toBe(true);
      });

      test('install-terminal should be enabled', () => {
        expect(isJargonTextEnabled('install-terminal')).toBe(true);
      });

      test('create-vps should be enabled', () => {
        expect(isJargonTextEnabled('create-vps')).toBe(true);
      });

      test('accounts should be enabled', () => {
        expect(isJargonTextEnabled('accounts')).toBe(true);
      });
    });

    describe('Phase 2 pages (disabled)', () => {
      test('reconnect-ubuntu should be disabled', () => {
        expect(isJargonTextEnabled('reconnect-ubuntu')).toBe(false);
      });

      test('verify-key-connection should be disabled', () => {
        expect(isJargonTextEnabled('verify-key-connection')).toBe(false);
      });

      test('preflight-check should be disabled', () => {
        expect(isJargonTextEnabled('preflight-check')).toBe(false);
      });
    });
  });

  describe('getEnabledPages() function', () => {
    test('should return exactly 6 enabled pages', () => {
      const enabled = getEnabledPages();
      expect(enabled.length).toBe(6);
    });

    test('should include all Phase 1 pages', () => {
      const enabled = getEnabledPages();
      expect(enabled).toContain('launch-onboarding');
      expect(enabled).toContain('ssh-connect');
      expect(enabled).toContain('status-check');
      expect(enabled).toContain('install-terminal');
      expect(enabled).toContain('create-vps');
      expect(enabled).toContain('accounts');
    });

    test('should NOT include any Phase 2 pages', () => {
      const enabled = getEnabledPages();
      expect(enabled).not.toContain('reconnect-ubuntu');
      expect(enabled).not.toContain('verify-key-connection');
      expect(enabled).not.toContain('preflight-check');
    });
  });

  describe('getRolloutPhase() function', () => {
    test('should return phase1 as current phase', () => {
      expect(getRolloutPhase()).toBe('phase1');
    });

    test('should return phase1 when only phase1 is enabled', () => {
      // Setup: verify precondition
      expect(jargonTextRollout.phase1.enabled).toBe(true);
      expect(jargonTextRollout.phase2.enabled).toBe(false);
      expect(jargonTextRollout.phase3.enabled).toBe(false);

      // Test
      expect(getRolloutPhase()).toBe('phase1');
    });
  });

  describe('getCoverageStats() function', () => {
    test('should return stats object with required fields', () => {
      const stats = getCoverageStats();

      expect(stats).toHaveProperty('total');
      expect(stats).toHaveProperty('covered');
      expect(stats).toHaveProperty('pending');
      expect(stats).toHaveProperty('percentageTracked');
      expect(stats).toHaveProperty('percentageOverall');
      expect(stats).toHaveProperty('details');
    });

    test('should have 6 covered pages', () => {
      const stats = getCoverageStats();
      expect(stats.covered).toBe(6);
    });

    test('should have 2 pending pages', () => {
      const stats = getCoverageStats();
      expect(stats.pending).toBe(2);
    });

    test('should have 9 tracked pages (6 enabled + 3 disabled Phase 2)', () => {
      const stats = getCoverageStats();
      const trackedPages = 6 + 3; // Phase 1 + Phase 2
      expect(stats.total).toBe(trackedPages + stats.pending); // 9 + 2 = 11
    });

    test('percentageTracked should be 67% (6 covered / 9 tracked)', () => {
      const stats = getCoverageStats();
      expect(stats.percentageTracked).toBe(67); // Math.round(6/9 * 100) = 67
    });

    test('percentageOverall should be 55% (6 covered / 11 total)', () => {
      const stats = getCoverageStats();
      expect(stats.percentageOverall).toBe(55); // Math.round(6/11 * 100) = 55
    });

    test('details should show correct phase counts', () => {
      const stats = getCoverageStats();
      expect(stats.details.phase1Count).toBe(6);
      expect(stats.details.phase2Count).toBe(3);
      expect(stats.details.phase3Count).toBe(0);
    });

    test('percentages should be mathematically correct', () => {
      const stats = getCoverageStats();

      // percentageTracked = covered / (phase1 + phase2)
      const expectedTracked = Math.round((stats.covered / 9) * 100);
      expect(stats.percentageTracked).toBe(expectedTracked);

      // percentageOverall = covered / (phase1 + phase2 + pending)
      const expectedOverall = Math.round((stats.covered / (9 + stats.pending)) * 100);
      expect(stats.percentageOverall).toBe(expectedOverall);
    });
  });

  describe('Pending Pages Tracking', () => {
    test('should track 2 pending pages', () => {
      expect(pendingJargonTextPages.length).toBe(2);
    });

    test('should include generate-ssh-key in pending pages', () => {
      const page = pendingJargonTextPages.find((p) => p.page === 'generate-ssh-key');
      expect(page).toBeDefined();
      expect(page?.dangerouslySetInnerHTMLCount).toBe(15);
      expect(page?.estimatedEffort).toBe('2-3 hours');
    });

    test('should include rent-vps in pending pages', () => {
      const page = pendingJargonTextPages.find((p) => p.page === 'rent-vps');
      expect(page).toBeDefined();
      expect(page?.dangerouslySetInnerHTMLCount).toBe(26);
      expect(page?.estimatedEffort).toBe('3-4 hours');
    });

    test('each pending page should have effort estimate', () => {
      pendingJargonTextPages.forEach((page) => {
        expect(page.estimatedEffort).toBeDefined();
        expect(page.estimatedEffort.length).toBeGreaterThan(0);
      });
    });

    test('each pending page should have blockers list', () => {
      pendingJargonTextPages.forEach((page) => {
        expect(Array.isArray(page.blockers)).toBe(true);
        expect(page.blockers.length).toBeGreaterThan(0);
      });
    });
  });

  describe('No Page Duplication', () => {
    test('Phase 1 and Phase 2 should not share pages', () => {
      const phase1Set = new Set(jargonTextRollout.phase1.pages);
      const phase2Set = new Set(jargonTextRollout.phase2.pages);

      for (const page of phase2Set) {
        expect(phase1Set.has(page)).toBe(false);
      }
    });

    test('Phase 1 and Phase 3 should not share pages', () => {
      const phase1Set = new Set(jargonTextRollout.phase1.pages);
      const phase3Set = new Set(jargonTextRollout.phase3.pages);

      for (const page of phase3Set) {
        expect(phase1Set.has(page)).toBe(false);
      }
    });

    test('Phase 2 and Phase 3 should not share pages', () => {
      const phase2Set = new Set(jargonTextRollout.phase2.pages);
      const phase3Set = new Set(jargonTextRollout.phase3.pages);

      for (const page of phase3Set) {
        expect(phase2Set.has(page)).toBe(false);
      }
    });
  });

  describe('Configuration Integrity', () => {
    test('all Phase 1 pages should have valid names', () => {
      jargonTextRollout.phase1.pages.forEach((page) => {
        expect(typeof page).toBe('string');
        expect(page.length).toBeGreaterThan(0);
      });
    });

    test('all Phase 2 pages should have valid names', () => {
      jargonTextRollout.phase2.pages.forEach((page) => {
        expect(typeof page).toBe('string');
        expect(page.length).toBeGreaterThan(0);
      });
    });

    test('rollout dates should be valid YYYY-MM-DD format', () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(dateRegex.test(jargonTextRollout.phase1.rolloutDate)).toBe(true);
      expect(dateRegex.test(jargonTextRollout.phase2.rolloutDate)).toBe(true);
      expect(dateRegex.test(jargonTextRollout.phase3.rolloutDate)).toBe(true);
    });

    test('rollout dates should be in chronological order', () => {
      const date1 = new Date(jargonTextRollout.phase1.rolloutDate);
      const date2 = new Date(jargonTextRollout.phase2.rolloutDate);
      const date3 = new Date(jargonTextRollout.phase3.rolloutDate);

      expect(date1.getTime()).toBeLessThanOrEqual(date2.getTime());
      expect(date2.getTime()).toBeLessThanOrEqual(date3.getTime());
    });
  });

  describe('Rollout State Consistency', () => {
    test('enabled pages should always come from enabled phases', () => {
      const enabledPages = getEnabledPages();
      const enabledSet = new Set(enabledPages);

      // All enabled pages should be in an enabled phase
      for (const phase of Object.values(jargonTextRollout)) {
        if (phase.enabled) {
          for (const page of phase.pages) {
            expect(enabledSet.has(page)).toBe(true);
          }
        }
      }
    });

    test('disabled phase pages should NOT be in enabled list', () => {
      const enabledPages = getEnabledPages();
      const enabledSet = new Set(enabledPages);

      // Phase 2 pages should not be in enabled list
      for (const page of jargonTextRollout.phase2.pages) {
        expect(enabledSet.has(page)).toBe(false);
      }

      // Phase 3 pages should not be in enabled list
      for (const page of jargonTextRollout.phase3.pages) {
        expect(enabledSet.has(page)).toBe(false);
      }
    });

    test('isJargonTextEnabled should match getEnabledPages', () => {
      const enabledPages = getEnabledPages();

      // All pages in enabled list should return true from isJargonTextEnabled
      for (const page of enabledPages) {
        expect(isJargonTextEnabled(page)).toBe(true);
      }

      // All pages NOT in enabled list should return false
      const allPages = [
        ...jargonTextRollout.phase1.pages,
        ...jargonTextRollout.phase2.pages,
        ...jargonTextRollout.phase3.pages,
      ];

      for (const page of allPages) {
        if (!enabledPages.includes(page)) {
          expect(isJargonTextEnabled(page)).toBe(false);
        }
      }
    });
  });

  describe('Phase Transition Readiness', () => {
    test('Phase 2 pages exist and are ready for activation', () => {
      const phase2Pages = jargonTextRollout.phase2.pages;
      expect(phase2Pages.length).toBeGreaterThan(0);

      // All Phase 2 pages should be valid
      phase2Pages.forEach((page) => {
        expect(typeof page).toBe('string');
        expect(page.length).toBeGreaterThan(0);
      });
    });

    test('Phase 2 can be activated by changing enabled flag', () => {
      // This test verifies the structure is correct for activation
      // (doesn't actually change the config)
      expect(jargonTextRollout.phase2).toHaveProperty('enabled');
      expect(typeof jargonTextRollout.phase2.enabled).toBe('boolean');
    });

    test('when Phase 2 is activated, coverage should become 9/9 (100%)', () => {
      // Hypothetical: if Phase 2 was enabled
      const totalIfPhase2Enabled = jargonTextRollout.phase1.pages.length +
        jargonTextRollout.phase2.pages.length;

      expect(totalIfPhase2Enabled).toBe(9);
      // Coverage would be 9/9 = 100%
    });
  });
});
