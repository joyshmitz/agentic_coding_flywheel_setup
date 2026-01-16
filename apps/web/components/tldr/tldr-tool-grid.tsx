"use client";

import { useState, useMemo, useRef, useEffect, memo } from "react";
import { m, useReducedMotion, AnimatePresence } from "framer-motion";
import { Layers, Wrench, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { TldrToolCard } from "./tldr-tool-card";
import type { TldrFlywheelTool } from "@/lib/tldr-content";
import { useLocale } from "@/lib/i18n";
import { getTldrMessages } from "@/lib/tldr-messages.uk";

// =============================================================================
// TYPES
// =============================================================================

interface TldrToolGridProps {
  tools: TldrFlywheelTool[];
  className?: string;
}

// =============================================================================
// SEARCH BAR COMPONENT
// =============================================================================

const ToolSearchBar = memo(function ToolSearchBar({
  query,
  onQueryChange,
  resultCount,
  totalCount,
  inputRef,
  reducedMotion,
  messages,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount: number;
  totalCount: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
  reducedMotion: boolean;
  messages: ReturnType<typeof getTldrMessages>;
}) {
  return (
    <m.div
      initial={reducedMotion ? {} : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
      className="mb-8 sm:mb-10"
    >
      <div className="relative mx-auto max-w-2xl">
        {/* Glass morphism search container */}
        <div className="relative rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm sm:rounded-2xl">
          {/* Search icon */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4">
            <Search className="h-4 w-4 text-muted-foreground sm:h-5 sm:w-5" aria-hidden="true" />
          </div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={messages.toolGrid.search.placeholder}
            aria-label={messages.toolGrid.search.ariaLabel}
            className="w-full rounded-xl bg-transparent py-3 pl-10 pr-16 text-sm text-white placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 sm:rounded-2xl sm:py-4 sm:pl-12 sm:pr-20"
          />

          {/* Clear button and keyboard hint */}
          <div className="absolute inset-y-0 right-0 flex items-center gap-1.5 pr-3 sm:gap-2 sm:pr-4">
            {query && (
              <button
                onClick={() => onQueryChange("")}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
                aria-label={messages.toolGrid.search.clearAriaLabel}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <kbd className="hidden rounded-md border border-border bg-card/50 px-2 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
              /
            </kbd>
          </div>
        </div>

        {/* Results count */}
        <AnimatePresence>
          {query && (
            <m.div
              initial={reducedMotion ? {} : { opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? {} : { opacity: 0, y: -5 }}
              className="mt-2 text-center sm:mt-3"
              role="status"
              aria-live="polite"
            >
              <span className="text-xs text-muted-foreground sm:text-sm">
                {resultCount === 0 ? (
                  messages.toolGrid.search.noResultsMessage
                ) : (
                  <>
                    {messages.toolGrid.search.showingText}{" "}
                    <span className="font-semibold text-white">
                      {resultCount}
                    </span>{" "}
                    {messages.toolGrid.search.ofText}{" "}
                    <span className="font-semibold text-white">
                      {totalCount}
                    </span>{" "}
                    {messages.toolGrid.search.toolsText}
                  </>
                )}
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
});

// =============================================================================
// EMPTY STATE COMPONENT
// =============================================================================

const EmptySearchState = memo(function EmptySearchState({
  query,
  onClear,
  reducedMotion,
  messages,
}: {
  query: string;
  onClear: () => void;
  reducedMotion: boolean;
  messages: ReturnType<typeof getTldrMessages>;
}) {
  return (
    <m.div
      initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
      className="py-16 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Search className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-white">
        {messages.toolGrid.emptyState.noMatchHeading(query)}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {messages.toolGrid.emptyState.suggestions}
      </p>
      <button
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
      >
        <X className="h-4 w-4" />
        {messages.toolGrid.search.clearButtonText}
      </button>
    </m.div>
  );
});

// =============================================================================
// SECTION HEADER COMPONENT
// =============================================================================

const SectionHeader = memo(function SectionHeader({
  title,
  description,
  icon: Icon,
  count,
  reducedMotion,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  reducedMotion: boolean;
}) {
  return (
    <m.div
      initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
      className="mb-8 sm:mb-12"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 sm:h-12 sm:w-12">
          <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
              {title}
            </h2>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              {count}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </m.div>
  );
});

// =============================================================================
// SIMPLE FILTER FUNCTION (no fuse.js dependency)
// =============================================================================

function filterTools(tools: TldrFlywheelTool[], query: string): TldrFlywheelTool[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return tools;

  return tools.filter((tool) => {
    const searchFields = [
      tool.name,
      tool.shortName,
      tool.whatItDoes,
      tool.whyItsUseful,
      ...tool.techStack,
      ...tool.keyFeatures,
    ].map(s => s.toLowerCase());

    return searchFields.some(field => field.includes(normalizedQuery));
  });
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function TldrToolGrid({ tools, className }: TldrToolGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const { locale } = useLocale();
  const messages = getTldrMessages(locale);

  // Filter tools based on search query (simple filter)
  const filteredTools = useMemo(() => {
    return filterTools(tools, searchQuery);
  }, [searchQuery, tools]);

  // Group filtered tools by category
  const { coreTools, supportingTools } = useMemo(() => {
    return {
      coreTools: filteredTools.filter((t) => t.category === "core"),
      supportingTools: filteredTools.filter((t) => t.category === "supporting"),
    };
  }, [filteredTools]);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on "/" key (when not in an input)
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          (e.target as HTMLElement)?.tagName ?? ""
        )
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      // Clear search on Escape
      if (e.key === "Escape" && searchQuery) {
        setSearchQuery("");
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  const hasResults = filteredTools.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className={cn("space-y-16", className)}>
      {/* Search Bar */}
      <ToolSearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        resultCount={filteredTools.length}
        totalCount={tools.length}
        inputRef={searchInputRef}
        reducedMotion={reducedMotion}
        messages={messages}
      />

      {/* Empty State */}
      {isSearching && !hasResults && (
        <EmptySearchState
          query={searchQuery}
          onClear={() => setSearchQuery("")}
          reducedMotion={reducedMotion}
          messages={messages}
        />
      )}

      {/* Core Tools Section */}
      {coreTools.length > 0 && (
        <section id="core-tools">
          <SectionHeader
            title={messages.toolGrid.sections.coreTools.title}
            description={messages.toolGrid.sections.coreTools.description}
            icon={Layers}
            count={coreTools.length}
            reducedMotion={reducedMotion}
          />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {coreTools.map((tool, index) => (
                <m.div
                  key={tool.id}
                  layout={!reducedMotion}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    delay: reducedMotion ? 0 : index * 0.03,
                  }}
                  className="h-full"
                >
                  <TldrToolCard
                    tool={tool}
                    allTools={tools}
                  />
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Supporting Tools Section */}
      {supportingTools.length > 0 && (
        <section id="supporting-tools">
          <SectionHeader
            title={messages.toolGrid.sections.supportingTools.title}
            description={messages.toolGrid.sections.supportingTools.description}
            icon={Wrench}
            count={supportingTools.length}
            reducedMotion={reducedMotion}
          />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {supportingTools.map((tool, index) => (
                <m.div
                  key={tool.id}
                  layout={!reducedMotion}
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    delay: reducedMotion ? 0 : index * 0.03,
                  }}
                  className="h-full"
                >
                  <TldrToolCard
                    tool={tool}
                    allTools={tools}
                  />
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
}

export default TldrToolGrid;