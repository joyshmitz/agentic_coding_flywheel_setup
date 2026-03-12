'use client';

import React, { type ReactNode, type ReactElement } from 'react';
import { JargonText } from '@/components/jargon';
import type { WizardPage } from '@/lib/feature-flags';

type FragmentElement = ReactElement<{ children?: ReactNode }>;

function isFragmentElement(node: ReactNode): node is FragmentElement {
  return React.isValidElement<{ children?: ReactNode }>(node) && node.type === React.Fragment;
}

/**
 * Wraps text segments in JargonText while preserving JSX elements
 *
 * Problem this solves:
 * <JargonText>SSH connects to <code>server.com</code> securely</JargonText>
 * ❌ Only "SSH" gets wrapped, <code> and "securely" are lost
 *
 * Solution:
 * <p>
 *   {wrapJargonInMixed(
 *     <>
 *       SSH connects to <code>server.com</code> securely
 *     </>
 *   )}
 * </p>
 * ✅ "SSH" → <JargonText>SSH</JargonText>
 * ✅ <code>server.com</code> → preserved
 * ✅ "securely" → <JargonText>securely</JargonText>
 *
 * @param children - ReactNode containing mixed text and JSX
 * @param options - Optional configuration for JargonText
 * @returns ReactNode with text wrapped in JargonText, JSX preserved
 *
 * @example
 * // Before: Text after JSX is lost
 * <JargonText>SSH connects to <code>example.com</code> securely</JargonText>
 *
 * // After: All text and JSX preserved
 * <>{wrapJargonInMixed(
 *   <>SSH connects to <code>example.com</code> securely</>
 * )}</>
 * // Renders: <JargonText>SSH</JargonText> connects to <code>example.com</code> <JargonText>securely</JargonText>
 */
export function wrapJargonInMixed(
  children: ReactNode,
  options?: {
    /** Optional: wizard page for feature flag control */
    page?: WizardPage;
    /** Optional: additional class names */
    className?: string;
  }
): ReactNode {
  return React.Children.map(children, (child, index) => {
    // String: wrap in JargonText
    if (typeof child === 'string') {
      return (
        <JargonText key={`jargon-${index}`} page={options?.page} className={options?.className}>
          {child}
        </JargonText>
      );
    }

    // Fragment: recursively process its children
    if (isFragmentElement(child)) {
      return (
        <React.Fragment key={`fragment-${index}`}>
          {wrapJargonInMixed(child.props.children, options)}
        </React.Fragment>
      );
    }

    // JSX Element: preserve as-is
    if (React.isValidElement(child)) {
      return child;
    }

    // Number, boolean, null, undefined: pass through
    return child;
  });
}

/**
 * Variant of wrapJargonInMixed for use in Fragment/conditional rendering
 *
 * Useful when you want to keep the JSX flat without extra wrappers
 *
 * @example
 * // Old: Had to manually segment text
 * <p>
 *   <JargonText>SSH is used for</JargonText>
 *   <code>remote access</code>
 *   <JargonText>to your VPS</JargonText>
 * </p>
 *
 * // New: All in one helper
 * <p>{wrapJargonInMixed(
 *   <>SSH is used for <code>remote access</code> to your VPS</>
 * )}</p>
 */
// Global key counter to ensure unique keys across nested fragments
let keyCounter = 0;

/**
 * Internal recursive helper for wrapJargonInMixedFlat
 * Uses keyCounter to ensure globally unique keys
 */
function flattenJargonInMixed(
  children: ReactNode,
  options?: {
    page?: WizardPage;
    className?: string;
  }
): ReactNode[] {
  const result: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    // String: wrap in JargonText
    if (typeof child === 'string') {
      result.push(
        <JargonText key={`jargon-${keyCounter++}`} page={options?.page} className={options?.className}>
          {child}
        </JargonText>
      );
    }
    // Fragment: recursively flatten (FIXED: no index reset on recursion)
    else if (isFragmentElement(child)) {
      const flattened = flattenJargonInMixed(child.props.children, options);
      result.push(...flattened);
    }
    // JSX Element: preserve as-is
    else if (React.isValidElement(child)) {
      result.push(child);
    }
    // Other types: pass through
    else if (child !== null && child !== undefined && child !== false) {
      result.push(child);
    }
  });

  return result;
}

export function wrapJargonInMixedFlat(
  children: ReactNode,
  options?: {
    page?: WizardPage;
    className?: string;
  }
): ReactNode[] {
  // Reset key counter for each top-level call
  keyCounter = 0;
  return flattenJargonInMixed(children, options);
}

/**
 * Type-safe helper for wrapping specific segments of text
 *
 * Useful when you have a template with placeholders and want to apply
 * JargonText only to certain segments
 *
 * @example
 * const text = "SSH connects to {host} securely";
 * wrapJargonTextSegments(text, '{host}', <code>example.com</code>)
 * // Result: <JargonText>SSH connects to</JargonText> <code>example.com</code> <JargonText>securely</JargonText>
 */
export function wrapJargonTextSegments(
  text: string,
  placeholder: string,
  replacement: ReactNode,
  options?: {
    page?: WizardPage;
    className?: string;
  }
): ReactNode {
  // FIXED: Support N placeholders, not just 1 (was: const [before = '', after = ''] = split())
  const parts = text.split(placeholder);

  // If only one part, placeholder not found - return text wrapped in JargonText
  if (parts.length === 1) {
    return (
      <JargonText page={options?.page} className={options?.className}>
        {text}
      </JargonText>
    );
  }

  // Interleave text parts with replacements
  // For "A {x} B {x} C" split by "{x}" gives ["A ", " B ", " C"]
  // Result: [<JargonText>A </JargonText>, replacement, <JargonText> B </JargonText>, replacement, <JargonText> C</JargonText>]
  const result: ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Add text segment (wrapped in JargonText if non-empty)
    if (part) {
      result.push(
        <JargonText key={`text-${i}`} page={options?.page} className={options?.className}>
          {part}
        </JargonText>
      );
    }

    // Add replacement between segments (but not after the last segment)
    if (i < parts.length - 1) {
      result.push(<React.Fragment key={`repl-${i}`}>{replacement}</React.Fragment>);
    }
  }

  return <>{result}</>;
}
