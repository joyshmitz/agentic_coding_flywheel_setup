"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
  type CSSProperties,
  type ReactNode,
} from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, springs } from "@/components/motion";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JargonTerm } from "@/lib/jargon";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useLocale, getJargonUiMessages, getJargonTerm } from "@/lib/i18n";
import { BottomSheet } from "@/components/ui/bottom-sheet";

type Messages = ReturnType<typeof getJargonUiMessages>;

interface JargonProps {
  /** The term key to look up in the dictionary */
  term: string;
  /** Optional: override the display text (defaults to term.term) */
  children?: ReactNode;
  /** Optional: additional class names */
  className?: string;
  /**
   * When true, applies gradient text styling to match h1/h2 gradient headings.
   * Use this when Jargon is placed inside a heading with `text-transparent bg-clip-text` gradient.
   */
  gradientHeading?: boolean;
}

/**
 * Jargon component - makes technical terms accessible to beginners.
 *
 * - Desktop: Shows tooltip on hover
 * - Mobile: Shows bottom sheet on tap
 * - Styled with dotted underline to indicate interactivity
 */
export function Jargon({ term, children, className, gradientHeading }: JargonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tooltipLayout, setTooltipLayout] = useState<{
    position: "top" | "bottom";
    style: CSSProperties;
  }>({ position: "top", style: {} });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prefersReducedMotion = useReducedMotion();

  const { locale, mounted } = useLocale();
  const messages = getJargonUiMessages(locale);

  const termKey = term.toLowerCase().replace(/[\s_]+/g, "-");
  const jargonData = getJargonTerm(termKey, locale);

  // Check if we can use portals (client-side only after hydration)
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate tooltip position and style to avoid viewport edges
  // useLayoutEffect is correct here as we're measuring DOM elements
  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current || isMobile) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const offsetWidth = triggerRef.current.offsetWidth;

    // If near top of viewport, show below
    const position: "top" | "bottom" = rect.top < 200 ? "bottom" : "top";

    // Calculate left position (centered on trigger, clamped to viewport)
    const left = Math.min(
      Math.max(16, rect.left - 140 + offsetWidth / 2),
      Math.max(16, window.innerWidth - 336)
    );

    // Calculate vertical position
    const verticalStyle = position === "top"
      ? { bottom: window.innerHeight - rect.top + 8 }
      : { top: rect.bottom + 8 };

    setTooltipLayout({ position, style: { left, ...verticalStyle } });
  }, [isOpen, isMobile]);


  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, [isMobile]);

  const handleFocus = useCallback(() => {
    if (isMobile) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  }, [isMobile]);

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (isMobile) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    // Check if focus is moving to an element inside the tooltip
    // If so, don't close immediately - let the user interact with tooltip links
    const relatedTarget = e.relatedTarget as Node | null;
    if (relatedTarget && tooltipRef.current?.contains(relatedTarget)) {
      return;
    }
    // Use a small delay to allow focus to settle (same as mouse leave)
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  }, [isMobile]);

  const handleClick = useCallback(() => {
    // Always open on click - supports both mobile tap and desktop keyboard activation
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);


  if (!jargonData) {
    // If term not found, just render children without styling
    return <>{children || term}</>;
  }

  const displayText = children || jargonData.term;

  // Pre-hydration: render non-interactive span to prevent hydration mismatch
  if (!mounted) {
    return (
      <span
        className={cn(
          "relative inline cursor-help",
          "decoration-[1.5px] underline underline-offset-[3px]",
          "decoration-primary/30 decoration-dotted",
          gradientHeading && "bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent",
          className
        )}
      >
        {displayText}
      </span>
    );
  }

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "relative inline cursor-help",
          // Subtle dotted underline - very gentle visual hint
          "decoration-[1.5px] underline underline-offset-[3px]",
          "decoration-primary/30 decoration-dotted",
          // Hover/active state - slightly more visible
          "transition-colors duration-150",
          "hover:decoration-primary/60 hover:text-primary/90",
          // Focus state for accessibility
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
          // Gradient heading mode: applies gradient text styling to match surrounding h1/h2
          gradientHeading && "bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent",
          className
        )}
        aria-label={`${messages.ariaLabel.learnAbout} ${jargonData.term}`}
        aria-expanded={isOpen}
      >
        {displayText}
      </button>

      {/* Desktop Tooltip - rendered via portal to escape stacking contexts */}
      {canUsePortal && createPortal(
        <AnimatePresence>
          {isOpen && !isMobile && (
            <motion.div
              ref={tooltipRef}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: tooltipLayout.position === "top" ? 8 : -8, scale: 0.95 }
              }
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: tooltipLayout.position === "top" ? 8 : -8, scale: 0.95 }
              }
              transition={prefersReducedMotion ? { duration: 0.12 } : springs.snappy}
              className={cn(
                "fixed z-50 w-80 max-w-[calc(100vw-2rem)]",
                "rounded-xl border border-border/50 bg-card/95 p-4 shadow-2xl backdrop-blur-xl",
                // Gradient accent line at top
                "before:absolute before:inset-x-0 before:h-1 before:rounded-t-xl before:bg-gradient-to-r before:from-primary/50 before:via-[oklch(0.7_0.2_330/0.5)] before:to-primary/50",
                tooltipLayout.position === "top" ? "before:top-0" : "before:bottom-0 before:rounded-t-none before:rounded-b-xl"
              )}
              style={tooltipLayout.style}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onBlur={(e: React.FocusEvent) => {
                // Close tooltip when focus leaves it entirely (not moving to trigger)
                const relatedTarget = e.relatedTarget as Node | null;
                if (relatedTarget && triggerRef.current?.contains(relatedTarget)) {
                  return;
                }
                if (relatedTarget && tooltipRef.current?.contains(relatedTarget)) {
                  return;
                }
                closeTimeoutRef.current = setTimeout(() => {
                  setIsOpen(false);
                }, 150);
              }}
            >
              <TooltipContent term={jargonData} termKey={termKey} messages={messages} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile Bottom Sheet */}
      {canUsePortal && (
        <BottomSheet
          open={isOpen && isMobile}
          onClose={handleClose}
          title={jargonData.term}
          showHandle
          closeOnBackdrop
          swipeable={!prefersReducedMotion}
        >
          <SheetContent term={jargonData} termKey={termKey} messages={messages} />
        </BottomSheet>
      )}
    </>
  );
}

/**
 * Desktop tooltip content
 */
function TooltipContent({ term, termKey, messages }: { term: JargonTerm; termKey: string; messages: Messages }) {
  const glossaryHref = `/glossary#${encodeURIComponent(termKey)}`;

  return (
    <div className="space-y-2">
      {/* Term header */}
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/20 text-primary">
          <Lightbulb className="h-3.5 w-3.5" />
        </div>
        <span className="font-semibold text-foreground">{term.term}</span>
      </div>

      {/* Short definition */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {term.short}
      </p>

      {/* Analogy if available */}
      {term.analogy && (
        <div className="rounded-lg bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">{messages.tooltip.thinkOfItLike}</span>{" "}
          {term.analogy}
        </div>
      )}

      {/* Tap for more hint */}
      <p className="text-xs text-muted-foreground/60">
        {messages.tooltip.hoverHint}
      </p>

      <Link
        href={glossaryHref}
        className={cn(
          "inline-block text-xs font-medium text-primary underline-offset-4 hover:underline",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        )}
      >
        {messages.tooltip.openInGlossary}
      </Link>
    </div>
  );
}

/**
 * Mobile bottom sheet content
 */
function SheetContent({ term, termKey, messages }: { term: JargonTerm; termKey: string; messages: Messages }) {
  const glossaryHref = `/glossary#${encodeURIComponent(termKey)}`;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-[oklch(0.7_0.2_330/0.2)] shadow-lg">
          <Lightbulb className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 id={`jargon-sheet-title-${termKey}`} className="text-xl font-bold text-foreground">{term.term}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {term.short}
          </p>
        </div>
      </div>

      {/* Full explanation */}
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {messages.sheet.whatIsIt}
          </h4>
          <p className="text-sm leading-relaxed text-foreground">
            {term.long}
          </p>
        </div>

        {/* Why we use it */}
        {term.why && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {messages.sheet.whyWeUseIt}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {term.why}
            </p>
          </div>
        )}

        {/* Analogy */}
        {term.analogy && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
              {messages.sheet.thinkOfItLike}
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              {term.analogy}
            </p>
          </div>
        )}

        {/* Related terms */}
        {term.related && term.related.length > 0 && (
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {messages.sheet.relatedTerms}
            </h4>
            <div className="flex flex-wrap gap-2">
              {term.related.map((relatedTerm) => (
                <span
                  key={relatedTerm}
                  className="rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {relatedTerm}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2">
          <Link
            href={glossaryHref}
            className={cn(
              "inline-block text-sm font-medium text-primary underline-offset-4 hover:underline",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            )}
          >
            {messages.sheet.viewInGlossary}
          </Link>
        </div>
      </div>
    </div>
  );
}

/**
 * Convenience component for inline jargon that matches surrounding text style
 */
export function JargonInline({ term, children, className }: JargonProps) {
  return (
    <Jargon term={term} className={cn("font-normal", className)}>
      {children}
    </Jargon>
  );
}

/**
 * Term mapping for JargonText auto-wrapping
 * Maps display text patterns to jargon dictionary keys
 */
export interface JargonTermMapping {
  /** The text pattern to match (case-insensitive) */
  pattern: string;
  /** The jargon dictionary key to use */
  term: string;
}

/**
 * Default term mappings for common technical terms
 * Only includes terms that exist in the jargon dictionary
 */
export const defaultJargonMappings: JargonTermMapping[] = [
  { pattern: "VPS", term: "vps" },
  { pattern: "SSH", term: "ssh" },
  { pattern: "SSH key", term: "ssh-key" },
  { pattern: "tmux", term: "tmux" },
  { pattern: "ntm", term: "ntm" },
  { pattern: "curl", term: "curl" },
  { pattern: "API key", term: "api-key" },
  { pattern: "sudo", term: "sudo" },
  { pattern: "zsh", term: "zsh" },
  { pattern: "Powerlevel10k", term: "powerlevel10k" },
  { pattern: "P10k", term: "powerlevel10k" },
  { pattern: "GitHub", term: "github" },
  { pattern: "Claude", term: "claude-code" },
  { pattern: "terminal", term: "terminal" },
  { pattern: "bash", term: "bash" },
];

interface JargonTextProps {
  /** The text to process for jargon terms */
  children: string;
  /** Optional: custom term mappings (defaults to defaultJargonMappings) */
  mappings?: JargonTermMapping[];
  /** Optional: additional class name for the wrapper span */
  className?: string;
}

/**
 * JargonText - Automatically wraps known technical terms in Jargon tooltips
 *
 * Takes a plain text string and replaces known terms with interactive Jargon components.
 * Useful for data-driven content where you can't manually wrap each term.
 *
 * @example
 * <JargonText>Your VPS needs SSH access on port 22.</JargonText>
 * // Renders: Your <Jargon term="vps">VPS</Jargon> needs <Jargon term="ssh">SSH</Jargon> access on <Jargon term="port-22">port 22</Jargon>.
 */
export function JargonText({ children, mappings = defaultJargonMappings, className }: JargonTextProps) {
  // Build a regex that matches any of the patterns (case-insensitive, word boundaries)
  // Sort by pattern length descending to match longer patterns first (e.g., "API key" before "API")
  const sortedMappings = [...mappings].sort((a, b) => b.pattern.length - a.pattern.length);

  // Create a map for quick lookup
  const patternToTerm = new Map(sortedMappings.map(m => [m.pattern.toLowerCase(), m.term]));

  // Build regex pattern - escape special chars and use word boundaries
  const escapedPatterns = sortedMappings.map(m =>
    m.pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  if (escapedPatterns.length === 0) {
    return <span className={className}>{children}</span>;
  }

  // Use word boundaries for most terms, but not for patterns with spaces
  const regexPattern = escapedPatterns
    .map(p => p.includes(' ') ? `(${p})` : `\\b(${p})\\b`)
    .join('|');

  const regex = new RegExp(regexPattern, 'gi');

  // Split text by matches and rebuild with Jargon components
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = regex.exec(children)) !== null) {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(children.slice(lastIndex, match.index));
    }

    // Find which term this matched
    const matchedText = match[0];
    const termKey = patternToTerm.get(matchedText.toLowerCase());

    if (termKey) {
      parts.push(
        <Jargon key={keyIndex++} term={termKey}>
          {matchedText}
        </Jargon>
      );
    } else {
      // Fallback: just add the text
      parts.push(matchedText);
    }

    lastIndex = match.index + matchedText.length;
  }

  // Add remaining text after last match
  if (lastIndex < children.length) {
    parts.push(children.slice(lastIndex));
  }

  // If no matches found, return original text
  if (parts.length === 0) {
    return <span className={className}>{children}</span>;
  }

  return <span className={className}>{parts}</span>;
}
