'use client';

import React, { type ReactNode, type ReactElement } from 'react';
import { JargonText } from '@/components/jargon';
import type { WizardPage } from '@/lib/feature-flags';

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
    if (React.isValidElement(child) && child.type === React.Fragment) {
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
export function wrapJargonInMixedFlat(
  children: ReactNode,
  options?: {
    page?: WizardPage;
    className?: string;
  }
): ReactNode[] {
  const result: ReactNode[] = [];

  React.Children.forEach(children, (child, index) => {
    // String: wrap in JargonText
    if (typeof child === 'string') {
      result.push(
        <JargonText key={`jargon-${index}`} page={options?.page} className={options?.className}>
          {child}
        </JargonText>
      );
    }
    // Fragment: recursively flatten
    else if (React.isValidElement(child) && child.type === React.Fragment) {
      const flattened = wrapJargonInMixedFlat(child.props.children, options);
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
  const [before = '', after = ''] = text.split(placeholder);

  return (
    <>
      {before && (
        <JargonText page={options?.page} className={options?.className}>
          {before}
        </JargonText>
      )}
      {replacement}
      {after && (
        <JargonText page={options?.page} className={options?.className}>
          {after}
        </JargonText>
      )}
    </>
  );
}
