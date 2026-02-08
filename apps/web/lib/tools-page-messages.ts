/**
 * Tools Page Messages - English (Default)
 *
 * All user-facing text for the /tools listing page.
 */

export const toolsPageMessages = {
  search: {
    placeholder: "Search tools...",
    ariaLabel: "Search tools",
    clear: "Clear search",
  },

  hero: {
    title: "ACFS Tool Status",
    description: (count: number) =>
      `All ${count} tools installed by the Agentic Coding Flywheel Setup. Search, filter, and explore the complete toolkit.`,
  },

  stats: {
    showing: "Showing",
    of: "of",
    tools: "tools",
  },

  categories: {
    all: "All",
    flywheelStack: "Flywheel Stack",
    utilities: "Utilities",
    other: "Other",
  },

  card: {
    viewOnGithub: (name: string) => `View ${name} on GitHub`,
    moreFeatures: (count: number) => `+${count} more`,
    builtWith: "Built with:",
  },

  empty: {
    title: "No tools found",
    description: "Try adjusting your search or filter criteria.",
    clearFilters: "Clear filters",
  },
};
