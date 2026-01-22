/**
 * TLDR Messages - English (Base)
 * Created by extracting English content from tldr-messages.uk.ts
 * Part of i18n architecture standardization
 */

export const getTldrMessages = () => {
  return {
    hero: {
      badge: {
        text: "Open Source Ecosystem",
      },
      scrollIndicator: {
        text: "Scroll to explore",
      },
    },
    footerCta: {
      title: "Get Started",
      description: "The fastest way to set up the entire flywheel ecosystem is with ACFS. One command, 30 minutes, and you're ready to go.",
      copied: "Copied!",
      copyButtonLabel: {
        default: "Copy to clipboard",
        copied: "Copied!",
      },
      wizardLinkText: "step-by-step wizard",
      wizardDescription: "for guided setup.",
    },
    flywheelExplanation: {
      title: "Why a Flywheel?",
    },
    toolGrid: {
      search: {
        placeholder: "Search tools...",
        ariaLabel: "Search flywheel tools",
        clearAriaLabel: "Clear search",
        clearButtonText: "Clear search",
        noResultsMessage: "No tools match your search",
        showingText: "Showing",
        ofText: "of",
        toolsText: "tools",
      },
      emptyState: {
        noMatchHeading: (query: string) => `No tools match "${query}"`,
        suggestions: 'Try searching for "session", "memory", or "search"',
      },
      sections: {
        coreTools: {
          title: "Core Flywheel Tools",
          description: "The backbone of multi-agent development: session management, communication, task tracking, static analysis, memory, search, safety guards, multi-repo sync, and automated setup. These tools form a self-reinforcing loop where each makes the others more powerful.",
        },
        supportingTools: {
          title: "Supporting Tools",
          description: "Extend the ecosystem with GitHub issue sync, archive search, and prompt crafting utilities. These tools enhance the core flywheel for specialized workflows.",
        },
      },
      coreToolsHeading: "Core Tools",
      supportingToolsHeading: "Supporting Tools",
      starsSuffix: "stars",
      whatItDoes: "What it does",
      whyUseful: "Why it's useful",
      keyFeatures: "Key Features",
      techStack: "Tech Stack",
      useCases: "Use Cases",
      synergies: "Synergies",
      implementationHighlights: "Implementation Highlights",
      viewOnGithub: "View on GitHub",
    },
    categories: {
      core: "core",
      supporting: "supporting",
    },
    synergyDiagram: {
      title: "Tool Synergies",
      description: "Each tool amplifies the others, creating a flywheel effect",
    },
  };
};

export type TldrMessages = ReturnType<typeof getTldrMessages>;