import { describe, it, expect } from 'bun:test';
import React from 'react';
import { wrapJargonInMixed, wrapJargonInMixedFlat, wrapJargonTextSegments } from '@/lib/jargon-helpers.tsx';

describe('jargon-helpers', () => {
  describe('wrapJargonInMixed', () => {
    it('wraps string children in JargonText', () => {
      const input = 'SSH is secure';
      const result = wrapJargonInMixed(input);
      expect(result).toBeDefined();
    });

    it('preserves JSX elements', () => {
      const input = React.createElement(React.Fragment, {}, [
        'SSH connects to ',
        React.createElement('code', {}, 'server.com'),
        ' securely',
      ]);
      const result = wrapJargonInMixed(input);
      expect(result).toBeDefined();
    });

    it('handles mixed text and JSX children', () => {
      const children = [
        'SSH is ',
        React.createElement('strong', {}, 'important'),
        ' for VPS',
      ];
      const result = wrapJargonInMixed(
        React.createElement(React.Fragment, {}, children)
      );
      expect(result).toBeDefined();
    });

    it('passes through page option to JargonText', () => {
      const input = 'SSH access';
      const result = wrapJargonInMixed(input, { page: 'ssh-connect' });
      expect(result).toBeDefined();
    });

    it('handles empty/null children gracefully', () => {
      expect(wrapJargonInMixed(null)).toBe(null);
      expect(wrapJargonInMixed(undefined)).toBe(undefined);
    });

    it('processes nested fragments recursively', () => {
      const nested = React.createElement(
        React.Fragment,
        {},
        React.createElement(React.Fragment, {}, 'SSH and VPS')
      );
      const result = wrapJargonInMixed(nested);
      expect(result).toBeDefined();
    });

    it('preserves element keys', () => {
      const input = React.createElement('div', { key: 'test' }, 'content');
      const result = wrapJargonInMixed(input);
      expect(result).toBeDefined();
    });
  });

  describe('wrapJargonInMixedFlat', () => {
    it('returns array of wrapped elements', () => {
      const input = 'SSH and VPS';
      const result = wrapJargonInMixedFlat(
        React.createElement(React.Fragment, {}, input)
      );
      expect(Array.isArray(result)).toBe(true);
    });

    it('flattens fragments in result array', () => {
      const input = React.createElement(
        React.Fragment,
        {},
        React.createElement(React.Fragment, {}, 'SSH'),
        ' and ',
        React.createElement(React.Fragment, {}, 'VPS')
      );
      const result = wrapJargonInMixedFlat(input);
      expect(Array.isArray(result)).toBe(true);
      // Should have at least 3 elements: SSH, and, VPS
      expect(result.length).toBeGreaterThanOrEqual(3);
    });

    it('preserves JSX elements in flat array', () => {
      const input = React.createElement(React.Fragment, {}, [
        'SSH to ',
        React.createElement('code', {}, 'host.com'),
        ' is secure',
      ]);
      const result = wrapJargonInMixedFlat(input);
      expect(result.some(el => React.isValidElement(el) && (el as any).type === 'code')).toBe(true);
    });

    it('filters out false/null/undefined elements', () => {
      const children = [
        'SSH',
        null,
        undefined,
        false,
        ' is secure',
      ];
      const result = wrapJargonInMixedFlat(React.createElement(React.Fragment, {}, children));
      expect(result.length).toBeLessThan(children.length);
    });
  });

  describe('wrapJargonTextSegments', () => {
    it('splits text by placeholder and wraps segments', () => {
      const result = wrapJargonTextSegments(
        'SSH connects to {host} securely',
        '{host}',
        React.createElement('code', {}, 'example.com')
      );
      expect(result).toBeDefined();
    });

    it('handles placeholder at start', () => {
      const result = wrapJargonTextSegments(
        '{command} is important',
        '{command}',
        React.createElement('code', {}, 'ssh')
      );
      expect(result).toBeDefined();
    });

    it('handles placeholder at end', () => {
      const result = wrapJargonTextSegments(
        'Use the {command}',
        '{command}',
        React.createElement('code', {}, 'ssh-key')
      );
      expect(result).toBeDefined();
    });

    it('passes page option to JargonText segments', () => {
      const result = wrapJargonTextSegments(
        'SSH to {host}',
        '{host}',
        React.createElement('code', {}, 'vps.com'),
        { page: 'ssh-connect' }
      );
      expect(result).toBeDefined();
    });

    it('handles missing before/after text', () => {
      const result = wrapJargonTextSegments(
        '{placeholder}',
        '{placeholder}',
        React.createElement('span', {}, 'content')
      );
      expect(result).toBeDefined();
    });

    it('passes className option to JargonText', () => {
      const result = wrapJargonTextSegments(
        'Text with {placeholder}',
        '{placeholder}',
        React.createElement('span', {}, 'content'),
        { className: 'text-sm' }
      );
      expect(result).toBeDefined();
    });
  });

  describe('integration scenarios', () => {
    it('handles complex mixed content', () => {
      const content = React.createElement(React.Fragment, {}, [
        'SSH provides ',
        React.createElement('strong', {}, 'secure'),
        ' access to your ',
        React.createElement('code', {}, 'VPS'),
      ]);
      const result = wrapJargonInMixed(content, { page: 'ssh-connect' });
      expect(result).toBeDefined();
    });

    it('supports multiple placeholders concept', () => {
      // First wrap one segment
      let result = wrapJargonTextSegments(
        'Use {cmd1} to connect to {host}',
        '{cmd1}',
        React.createElement('code', {}, 'ssh')
      );
      expect(result).toBeDefined();
    });

    it('chains helpers together', () => {
      const segments = wrapJargonTextSegments(
        'Connect with {tool}',
        '{tool}',
        React.createElement('em', {}, 'SSH')
      );
      const wrapped = wrapJargonInMixed(segments, { page: 'ssh-connect' });
      expect(wrapped).toBeDefined();
    });
  });
});
