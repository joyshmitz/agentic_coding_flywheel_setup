/**
 * Glossary Page UI Messages - English (Default)
 *
 * All user-facing text for the glossary page.
 * Term data (definitions, analogies, etc.) comes from jargon.ts/jargon.uk.ts
 */

export const glossaryUiMessages = {
  hero: {
    title: "Glossary",
    description: "Every term used throughout ACFS, explained in plain English.",
    // Top-level glossary page description
    topLevelDescription:
      "Search and browse plain‑English definitions for terms you see in the wizard and learning hub.",
    tip: "Tip: Many",
    tipHighlight: "dotted‑underline",
    tipSuffix: "terms link here from the tooltip.",
  },

  search: {
    placeholder: "Search terms...",
    searchTermsExample: "Search terms (e.g., SSH, tmux, API key)…",
  },

  categories: {
    all: "All",
    concepts: "Concepts",
    tools: "Tools",
    protocols: "Protocols",
    acronyms: "Acronyms",
    // Top-level glossary categories
    shell: "Shell",
    networking: "Networking",
  },

  categoryDescriptions: {
    concepts: "Core ideas and mental models",
    tools: "Programs and CLIs you'll use",
    protocols: "How systems talk to each other",
    acronyms: "Short words you'll see everywhere",
  },

  termCard: {
    readMore: "Read more",
    showLess: "Show less",
    thinkOfItLike: "Think of it like...",
    whyItMatters: "Why it matters",
    relatedTerms: "Related terms",
  },

  stats: {
    showing: "Showing",
    of: "of",
    terms: "terms",
  },

  noResults: {
    title: "No terms found",
    hint: "Try adjusting your search or category filter to find what you're looking for.",
    clearFilters: "Clear filters",
  },

  navigation: {
    learningHub: "Learning Hub",
    home: "Home",
    setupWizard: "Setup Wizard",
  },

  // Top-level glossary sections
  sections: {
    whatItMeans: "What it means",
    whyWeUseIt: "Why we use it",
    thinkOfItLike: "Think of it like…",
    relatedTerms: "Related terms",
  },

  // Learn more links
  learnMore: {
    sshBasics: "Learn: SSH basics",
    generateSshKey: "Wizard: Generate SSH key",
    rentVps: "Wizard: Rent a VPS",
    tmuxBasics: "Learn: tmux basics",
    ntmCore: "Learn: NTM command center",
    flywheelLoop: "Learn: The flywheel loop",
    agentCommands: "Learn: Agent commands",
  },
};
