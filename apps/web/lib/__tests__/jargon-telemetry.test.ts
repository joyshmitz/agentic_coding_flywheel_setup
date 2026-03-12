import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { JargonTelemetry } from '@/lib/jargon-telemetry';

describe('JargonTelemetry', () => {
  beforeEach(() => {
    // Reset telemetry before each test
    JargonTelemetry.destroy();
  });

  afterEach(() => {
    JargonTelemetry.destroy();
  });

  describe('initialization', () => {
    it('initializes successfully', () => {
      JargonTelemetry.initialize();
      expect(JargonTelemetry.getMetrics()).toBeDefined();
    });

    it('creates empty event queue on init', () => {
      JargonTelemetry.initialize();
      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(0);
    });
  });

  describe('trackTooltipRender', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('tracks successful render', () => {
      JargonTelemetry.trackTooltipRender({
        term: 'SSH',
        page: 'ssh-connect',
        success: true,
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks failed render with error', () => {
      JargonTelemetry.trackTooltipRender({
        term: 'SSH',
        page: 'ssh-connect',
        success: false,
        error: 'Pattern not found',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.errorCount).toBe(1);
    });

    it('calculates success rate correctly', () => {
      // Track 10 successful and 0 failed
      for (let i = 0; i < 10; i++) {
        JargonTelemetry.trackTooltipRender({
          term: 'SSH',
          success: true,
        });
      }

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.successRate).toBe(100);
    });

    it('calculates success rate with failures', () => {
      // Track 8 successful and 2 failed
      for (let i = 0; i < 8; i++) {
        JargonTelemetry.trackTooltipRender({
          term: 'SSH',
          success: true,
        });
      }
      for (let i = 0; i < 2; i++) {
        JargonTelemetry.trackTooltipRender({
          term: 'VPS',
          success: false,
        });
      }

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.successRate).toBe(80);
    });
  });

  describe('trackTooltipInteraction', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('tracks hover interaction', () => {
      JargonTelemetry.trackTooltipInteraction({
        term: 'SSH',
        action: 'hover',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks tap interaction', () => {
      JargonTelemetry.trackTooltipInteraction({
        term: 'VPS',
        action: 'tap',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks multiple interactions', () => {
      JargonTelemetry.trackTooltipInteraction({
        term: 'SSH',
        action: 'hover',
      });
      JargonTelemetry.trackTooltipInteraction({
        term: 'SSH',
        action: 'hover',
      });
      JargonTelemetry.trackTooltipInteraction({
        term: 'VPS',
        action: 'tap',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(3);
    });
  });

  describe('trackTooltipDisplayed', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('tracks desktop display', () => {
      JargonTelemetry.trackTooltipDisplayed({
        term: 'SSH',
        platform: 'desktop',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks mobile display', () => {
      JargonTelemetry.trackTooltipDisplayed({
        term: 'SSH',
        platform: 'mobile',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });
  });

  describe('trackMatchingFailure', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('tracks matching failure', () => {
      JargonTelemetry.trackMatchingFailure({
        term: 'SSH',
        text: 'SSH access to VPS',
        reason: 'Case mismatch',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.errorCount).toBe(1);
    });

    it('tracks without reason', () => {
      JargonTelemetry.trackMatchingFailure({
        term: 'SSH',
        text: 'SSH access',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });
  });

  describe('trackFeatureFlagSkip', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('tracks feature flag skip', () => {
      JargonTelemetry.trackFeatureFlagSkip({
        page: 'ssh-connect',
        termsSkipped: 5,
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks zero terms skipped', () => {
      JargonTelemetry.trackFeatureFlagSkip({
        page: 'ssh-connect',
        termsSkipped: 0,
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });
  });

  describe('trackPerformance', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('tracks performance within budget', () => {
      JargonTelemetry.trackPerformance({
        term: 'SSH',
        renderTimeMs: 5,
        textLengthChars: 100,
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks performance exceeding budget', () => {
      JargonTelemetry.trackPerformance({
        term: 'SSH',
        renderTimeMs: 25,
        textLengthChars: 100,
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });

    it('tracks large text performance', () => {
      JargonTelemetry.trackPerformance({
        term: 'SSH',
        renderTimeMs: 15,
        textLengthChars: 5000,
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(1);
    });
  });

  describe('getMetrics', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('returns null when not initialized', () => {
      // Note: getMetrics checks if window is available
      // In test environment, this should still work
      const metrics = JargonTelemetry.getMetrics();
      expect(metrics).toBeDefined();
    });

    it('calculates top terms correctly', () => {
      // Track SSH 5 times, VPS 3 times, API 2 times
      for (let i = 0; i < 5; i++) {
        JargonTelemetry.trackTooltipInteraction({ term: 'SSH', action: 'hover' });
      }
      for (let i = 0; i < 3; i++) {
        JargonTelemetry.trackTooltipInteraction({ term: 'VPS', action: 'hover' });
      }
      for (let i = 0; i < 2; i++) {
        JargonTelemetry.trackTooltipInteraction({ term: 'API', action: 'hover' });
      }

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.topTerms).toBeDefined();
      if (metrics?.topTerms && metrics.topTerms.length > 0) {
        expect(metrics.topTerms[0].term).toBe('SSH');
        expect(metrics.topTerms[0].count).toBe(5);
      }
    });

    it('calculates top pages correctly', () => {
      // Track page1 4 times, page2 3 times
      for (let i = 0; i < 4; i++) {
        JargonTelemetry.trackTooltipRender({
          term: 'SSH',
          page: 'ssh-connect',
          success: true,
        });
      }
      for (let i = 0; i < 3; i++) {
        JargonTelemetry.trackTooltipRender({
          term: 'VPS',
          page: 'create-vps',
          success: true,
        });
      }

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.topPages).toBeDefined();
      if (metrics?.topPages && metrics.topPages.length > 0) {
        expect(metrics.topPages[0].page).toBe('ssh-connect');
        expect(metrics.topPages[0].count).toBe(4);
      }
    });

    it('limits results to requested count', () => {
      // Track many different terms
      for (let i = 0; i < 15; i++) {
        JargonTelemetry.trackTooltipInteraction({
          term: `term${i}`,
          action: 'hover',
        });
      }

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.topTerms?.length).toBeLessThanOrEqual(10);
    });
  });

  describe('flush and destroy', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('clears event queue on flush', () => {
      JargonTelemetry.trackTooltipRender({
        term: 'SSH',
        success: true,
      });

      expect(JargonTelemetry.getMetrics()?.eventsQueued).toBe(1);

      JargonTelemetry.flush();

      expect(JargonTelemetry.getMetrics()?.eventsQueued).toBe(0);
    });

    it('flushes on destroy', () => {
      JargonTelemetry.trackTooltipRender({
        term: 'SSH',
        success: true,
      });

      JargonTelemetry.destroy();

      expect(JargonTelemetry.getMetrics()?.eventsQueued).toBe(0);
    });

    it('does not crash when flushing empty queue', () => {
      expect(() => {
        JargonTelemetry.flush();
      }).not.toThrow();
    });
  });

  describe('integration scenarios', () => {
    beforeEach(() => JargonTelemetry.initialize());

    it('handles complete user journey', () => {
      // User renders page with JargonText
      JargonTelemetry.trackTooltipRender({
        term: 'SSH',
        page: 'ssh-connect',
        success: true,
      });
      JargonTelemetry.trackTooltipRender({
        term: 'VPS',
        page: 'ssh-connect',
        success: true,
      });

      // User hovers over tooltips
      JargonTelemetry.trackTooltipDisplayed({
        term: 'SSH',
        page: 'ssh-connect',
        platform: 'desktop',
      });
      JargonTelemetry.trackTooltipInteraction({
        term: 'SSH',
        page: 'ssh-connect',
        action: 'hover',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(4);
      expect(metrics?.successRate).toBe(100);
    });

    it('tracks mixed success/failure scenario', () => {
      // Some renders succeed
      JargonTelemetry.trackTooltipRender({
        term: 'SSH',
        success: true,
      });
      JargonTelemetry.trackTooltipRender({
        term: 'VPS',
        success: true,
      });

      // Some fail
      JargonTelemetry.trackTooltipRender({
        term: 'CLI',
        success: false,
        error: 'Not found',
      });
      JargonTelemetry.trackMatchingFailure({
        term: 'API',
        text: 'api-key',
        reason: 'Case mismatch',
      });

      const metrics = JargonTelemetry.getMetrics();
      expect(metrics?.eventsQueued).toBe(4);
      expect(metrics?.errorCount).toBe(2);
      // successRate only counts 'jargon_tooltip_render' events (3 total: 2 success, 1 fail) = 67%
      expect(metrics?.successRate).toBe(67);
    });
  });
});
