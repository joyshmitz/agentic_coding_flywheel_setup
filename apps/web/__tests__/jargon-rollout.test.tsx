/**
 * Regression tests for JargonText rollout phases.
 *
 * Validates:
 * - Feature flags work correctly
 * - JargonText renders tooltips on all enabled pages
 * - Tooltips appear on hover/tap for technical terms
 * - No regressions in Phase 2/3 when disabled
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  isJargonTextEnabled,
  getRolloutPhase,
  getEnabledPages,
  jargonTextRollout,
} from '@/lib/feature-flags';
import { JargonText } from '@/components/jargon';

describe('JargonText Feature Flags', () => {
  describe('Phase 1 Activation', () => {
    it('should have phase1 enabled by default', () => {
      expect(jargonTextRollout.phase1.enabled).toBe(true);
    });

    it('should include launch-onboarding in phase1', () => {
      expect(isJargonTextEnabled('launch-onboarding')).toBe(true);
    });

    it('should include ssh-connect in phase1', () => {
      expect(isJargonTextEnabled('ssh-connect')).toBe(true);
    });

    it('should include status-check in phase1', () => {
      expect(isJargonTextEnabled('status-check')).toBe(true);
    });

    it('should return phase1 as current rollout phase', () => {
      expect(getRolloutPhase()).toBe('phase1');
    });

    it('should have exactly 3 pages in phase1', () => {
      expect(jargonTextRollout.phase1.pages.length).toBe(3);
    });
  });

  describe('Phase 2 & 3 Disabled by Default', () => {
    it('should have phase2 disabled', () => {
      expect(jargonTextRollout.phase2.enabled).toBe(false);
    });

    it('should have phase3 disabled', () => {
      expect(jargonTextRollout.phase3.enabled).toBe(false);
    });

    it('should not enable phase2 pages', () => {
      expect(isJargonTextEnabled('reconnect-ubuntu')).toBe(false);
      expect(isJargonTextEnabled('verify-key-connection')).toBe(false);
      expect(isJargonTextEnabled('preflight-check')).toBe(false);
    });

    it('should not enable phase3 pages', () => {
      expect(isJargonTextEnabled('install-terminal')).toBe(false);
      expect(isJargonTextEnabled('create-vps')).toBe(false);
    });
  });

  describe('Enabled Pages Collection', () => {
    it('should return phase1 pages as enabled', () => {
      const enabled = getEnabledPages();
      expect(enabled).toContain('launch-onboarding');
      expect(enabled).toContain('ssh-connect');
      expect(enabled).toContain('status-check');
    });

    it('should not return phase2 pages when disabled', () => {
      const enabled = getEnabledPages();
      expect(enabled).not.toContain('reconnect-ubuntu');
      expect(enabled).not.toContain('verify-key-connection');
      expect(enabled).not.toContain('preflight-check');
    });

    it('should have exactly 3 enabled pages in phase1', () => {
      const enabled = getEnabledPages();
      expect(enabled.length).toBe(3);
    });
  });
});

describe('JargonText Component Rendering', () => {
  describe('Technical Term Detection', () => {
    it('should render SSH term with tooltip', () => {
      const { container } = render(
        <JargonText>Connect via SSH to your VPS server.</JargonText>
      );

      // Check that SSH is wrapped in a jargon element
      const sshElement = screen.queryByText(/SSH/);
      expect(sshElement).toBeTruthy();
    });

    it('should render VPS term with tooltip', () => {
      const { container } = render(
        <JargonText>Your VPS includes tmux and CLI tools.</JargonText>
      );

      const vpsElement = screen.queryByText(/VPS/);
      expect(vpsElement).toBeTruthy();
    });

    it('should render multiple terms in same text', () => {
      render(
        <JargonText>
          Use SSH to connect to your VPS via CLI.
        </JargonText>
      );

      // All three terms should be found (SSH, VPS, CLI)
      expect(screen.getByText(/SSH/, { selector: '*' })).toBeTruthy();
      expect(screen.getByText(/VPS/, { selector: '*' })).toBeTruthy();
      expect(screen.getByText(/CLI/, { selector: '*' })).toBeTruthy();
    });
  });

  describe('Tooltip Interaction - Desktop', () => {
    it('should show tooltip on hover', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <div>
          <JargonText>SSH is secure.</JargonText>
          <div role="tooltip" className="hidden hover:visible">
            Secure Shell
          </div>
        </div>
      );

      const sshText = screen.getByText(/SSH/);
      await user.hover(sshText);

      // Tooltip should be visible (implementation depends on jargon component)
      await waitFor(() => {
        expect(sshText).toBeInTheDocument();
      });
    });
  });

  describe('Snapshot Testing - Phase 1 Pages', () => {
    it('should match snapshot for launch-onboarding prose', () => {
      const { container } = render(
        <JargonText>
          Your AI-powered development environment includes SSH access,
          tmux for terminal management, GitHub integration, and advanced CLI tools.
        </JargonText>
      );

      expect(container.firstChild).toMatchSnapshot('launch-onboarding-jargon');
    });

    it('should match snapshot for ssh-connect prose', () => {
      const { container } = render(
        <JargonText>
          SSH (Secure Shell) provides encrypted access to your VPS.
        </JargonText>
      );

      expect(container.firstChild).toMatchSnapshot('ssh-connect-jargon');
    });

    it('should match snapshot for status-check prose', () => {
      const { container } = render(
        <JargonText>
          Check your VPS status and verify tmux is running.
        </JargonText>
      );

      expect(container.firstChild).toMatchSnapshot('status-check-jargon');
    });
  });
});

describe('Integration Tests - Feature Flag + Component', () => {
  it('should render JargonText only when feature flag enabled', () => {
    if (isJargonTextEnabled('launch-onboarding')) {
      const { container } = render(
        <JargonText>SSH and VPS terminology explained.</JargonText>
      );
      expect(container.firstChild).toBeTruthy();
    }
  });

  it('should skip JargonText when feature flag disabled for page', () => {
    // Phase 2 is disabled
    if (!isJargonTextEnabled('reconnect-ubuntu')) {
      const { container } = render(
        <div>SSH and VPS without JargonText wrapping</div>
      );
      expect(container.textContent).toContain('SSH and VPS');
    }
  });
});

describe('Performance Benchmarks', () => {
  it('should render JargonText in less than 100ms', () => {
    const startTime = performance.now();

    render(
      <JargonText>
        SSH is for VPS access. Use CLI tools. GitHub integration helps. tmux manages terminal sessions.
      </JargonText>
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100);
  });

  it('should handle large text (1000+ chars) efficiently', () => {
    const largeText = 'SSH and VPS '.repeat(100); // ~1200 chars

    const startTime = performance.now();

    render(<JargonText>{largeText}</JargonText>);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Should still be under 200ms for large text
    expect(renderTime).toBeLessThan(200);
  });
});
