'use client';

/**
 * JargonText Telemetry - Production monitoring for JargonText interactions
 *
 * Tracks:
 * - Tooltip render success/failure rates
 * - User interactions (hover/tap on tooltips)
 * - Which terms are most helpful
 * - Error patterns and silent failures
 *
 * Data can be sent to:
 * - Google Analytics (if gtag available)
 * - Custom analytics endpoint
 * - Error tracking service (e.g., Sentry)
 */

export interface TelemetryEvent {
  event: string;
  timestamp: number;
  term?: string;
  page?: string;
  action?: 'hover' | 'tap' | 'mobile' | 'desktop';
  success?: boolean;
  error?: string;
  locale?: string;
  userAgent?: string;
}

export class JargonTelemetry {
  private static eventQueue: TelemetryEvent[] = [];
  private static flushInterval: NodeJS.Timeout | null = null;
  private static isInitialized = false;
  private static beforeUnloadListener: (() => void) | null = null;

  /**
   * Initialize telemetry system
   * Should be called once at app startup (idempotent - safe to call multiple times)
   */
  static initialize() {
    // Guard against multiple initializations
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    // Flush events every 30 seconds
    this.flushInterval = setInterval(() => {
      this.flush();
    }, 30000);

    // Flush on page unload (only add listener once, but store reference for cleanup)
    if (typeof window !== 'undefined') {
      this.beforeUnloadListener = () => {
        this.flush();
      };
      window.addEventListener('beforeunload', this.beforeUnloadListener, { once: false });
    }
  }

  /**
   * Track tooltip render success/failure
   * Call this when JargonText renders a term or fails to render
   */
  static trackTooltipRender(options: {
    term: string;
    page?: string;
    success: boolean;
    error?: string;
  }) {

    const event: TelemetryEvent = {
      event: 'jargon_tooltip_render',
      timestamp: Date.now(),
      term: options.term,
      page: options.page,
      success: options.success,
      error: options.error,
      locale: this.getLocale(),
    };

    this.trackEvent(event);

    // Log errors immediately
    if (!options.success && options.error) {
      console.warn(`[JargonText] Render failed for term "${options.term}":`, options.error);
    }
  }

  /**
   * Track user interaction with tooltip
   * Call this on hover/tap of a Jargon component
   */
  static trackTooltipInteraction(options: {
    term: string;
    page?: string;
    action: 'hover' | 'tap' | 'desktop' | 'mobile';
  }) {
    

    const event: TelemetryEvent = {
      event: 'jargon_tooltip_interaction',
      timestamp: Date.now(),
      term: options.term,
      page: options.page,
      action: options.action,
      locale: this.getLocale(),
    };

    this.trackEvent(event);
  }

  /**
   * Track tooltip display (when it becomes visible)
   * Useful for "impression" metrics
   */
  static trackTooltipDisplayed(options: {
    term: string;
    page?: string;
    platform: 'desktop' | 'mobile';
  }) {
    

    const event: TelemetryEvent = {
      event: 'jargon_tooltip_displayed',
      timestamp: Date.now(),
      term: options.term,
      page: options.page,
      action: options.platform,
      locale: this.getLocale(),
    };

    this.trackEvent(event);
  }

  /**
   * Track pattern matching failure in JargonText
   * When a term should be matched but isn't
   */
  static trackMatchingFailure(options: {
    term: string;
    text: string;
    page?: string;
    reason?: string;
  }) {
    

    const event: TelemetryEvent = {
      event: 'jargon_matching_failure',
      timestamp: Date.now(),
      term: options.term,
      page: options.page,
      error: options.reason || 'Unknown reason',
      locale: this.getLocale(),
    };

    this.trackEvent(event);

    console.warn(
      `[JargonText] Pattern matching failed for "${options.term}" in "${options.text.substring(0, 50)}..."`
    );
  }

  /**
   * Track feature flag impact
   * Call when JargonText is skipped due to feature flag
   */
  static trackFeatureFlagSkip(options: {
    page: string;
    termsSkipped: number;
  }) {
    

    const event: TelemetryEvent = {
      event: 'jargon_feature_flag_skip',
      timestamp: Date.now(),
      page: options.page,
      error: `${options.termsSkipped} terms skipped`,
      locale: this.getLocale(),
    };

    this.trackEvent(event);
  }

  /**
   * Track performance metrics
   * Call with render time measurements
   */
  static trackPerformance(options: {
    term: string;
    page?: string;
    renderTimeMs: number;
    textLengthChars: number;
  }) {
    

    const event: TelemetryEvent = {
      event: 'jargon_performance',
      timestamp: Date.now(),
      term: options.term,
      page: options.page,
      error: `${options.renderTimeMs}ms for ${options.textLengthChars} chars`,
      locale: this.getLocale(),
    };

    this.trackEvent(event);

    // Alert if render time exceeds budget (20ms)
    if (options.renderTimeMs > 20) {
      console.warn(
        `[JargonText] Performance alert: "${options.term}" took ${options.renderTimeMs}ms (budget: 20ms)`
      );
    }
  }

  /**
   * Get current metrics summary
   * Useful for dashboards or debugging
   */
  static getMetrics() {
    const metrics = {
      eventsQueued: this.eventQueue.length,
      successRate: this.calculateSuccessRate(),
      topTerms: this.getTopTerms(10),
      topPages: this.getTopPages(10),
      errorCount: this.eventQueue.filter(e => e.error).length,
      collectedAt: Date.now(),
    };

    return metrics;
  }

  /**
   * Manually flush all queued events to analytics
   * Called automatically every 30 seconds or on page unload
   */
  static flush() {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      events.forEach(event => {
        try {
          (window as any).gtag('event', event.event, {
            term: event.term,
            page: event.page,
            success: event.success,
            action: event.action,
            error: event.error,
            timestamp: event.timestamp,
          });
        } catch (error) {
          console.error('[JargonText] Failed to send to GA:', error);
        }
      });
    }

    // Send to custom endpoint if configured
    if (typeof fetch !== 'undefined' && typeof window !== 'undefined' && (window as any).__JARGON_TELEMETRY_ENDPOINT__) {
      fetch((window as any).__JARGON_TELEMETRY_ENDPOINT__, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events,
          page: typeof window !== 'undefined' ? window.location.pathname : null,
          timestamp: Date.now(),
        }),
      }).catch(error => {
        console.error('[JargonText] Failed to send telemetry:', error);
      });
    }
  }

  /**
   * Stop telemetry collection
   * Should be called on app shutdown or cleanup
   */
  static destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }

    // Remove beforeunload listener
    if (typeof window !== 'undefined' && this.beforeUnloadListener) {
      window.removeEventListener('beforeunload', this.beforeUnloadListener);
      this.beforeUnloadListener = null;
    }

    this.flush();
    // Clear the queue after flushing
    this.eventQueue = [];
    // Reset initialization flag
    this.isInitialized = false;
  }

  /**
   * Reset telemetry (for testing)
   * Clears all events without flushing
   */
  static reset() {
    this.eventQueue = [];
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }

    // Remove beforeunload listener
    if (typeof window !== 'undefined' && this.beforeUnloadListener) {
      window.removeEventListener('beforeunload', this.beforeUnloadListener);
      this.beforeUnloadListener = null;
    }

    // Reset initialization flag
    this.isInitialized = false;
  }

  // Private helpers

  private static trackEvent(event: TelemetryEvent) {
    this.eventQueue.push(event);

    // Flush if queue gets too large (100+ events)
    if (this.eventQueue.length > 100) {
      this.flush();
    }
  }

  private static getLocale(): string {
    if (typeof window === 'undefined') return 'unknown';
    return (document.documentElement.lang || navigator.language || 'unknown').toLowerCase();
  }

  private static calculateSuccessRate(): number {
    if (this.eventQueue.length === 0) return 100;

    const renders = this.eventQueue.filter(e => e.event === 'jargon_tooltip_render');
    if (renders.length === 0) return 100;

    const successes = renders.filter(e => e.success).length;
    return Math.round((successes / renders.length) * 100);
  }

  private static getTopTerms(limit: number): Array<{ term: string; count: number }> {
    const termCounts = new Map<string, number>();

    this.eventQueue.forEach(event => {
      if (event.term) {
        termCounts.set(event.term, (termCounts.get(event.term) || 0) + 1);
      }
    });

    return Array.from(termCounts.entries())
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  private static getTopPages(limit: number): Array<{ page: string; count: number }> {
    const pageCounts = new Map<string, number>();

    this.eventQueue.forEach(event => {
      if (event.page) {
        pageCounts.set(event.page, (pageCounts.get(event.page) || 0) + 1);
      }
    });

    return Array.from(pageCounts.entries())
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
}
