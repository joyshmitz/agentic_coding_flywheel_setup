/**
 * NTM Palette Lesson Messages - English (Default)
 *
 * All user-facing text for the NTM palette lesson component.
 * Organized by component structure for easy maintenance.
 */

export const ntmPaletteLessonMessages = {
  goalBanner: {
    content: "Discover the pre-built prompts that supercharge your agents.",
  },

  whatIsCommandPalette: {
    title: "What Is The Command Palette?",
    description1: "NTM ships with a command palette - a collection of battle-tested prompts for common development tasks.",
    highlight1: "command palette",
    description2: "These aren't just prompts. They're carefully crafted instructions that get the best results from coding agents.",
    browserDescription: "This opens an interactive browser of all available prompts.",
  },

  paletteCategories: {
    title: "Palette Categories",
    intro: "The prompts are organized into categories:",

    categories: {
      architectureDesign: {
        title: "Architecture & Design",
        items: [
          "System design analysis",
          "Architecture review",
          "API design patterns",
        ],
      },
      codeQuality: {
        title: "Code Quality",
        items: [
          "Code review prompts",
          "Refactoring suggestions",
          "Bug hunting strategies",
        ],
      },
      testing: {
        title: "Testing",
        items: [
          "Test generation",
          "Coverage analysis",
          "Edge case discovery",
        ],
      },
      documentation: {
        title: "Documentation",
        items: [
          "README generation",
          "API documentation",
          "Inline comment review",
        ],
      },
      debugging: {
        title: "Debugging",
        items: [
          "Error analysis",
          "Performance profiling",
          "Memory leak detection",
        ],
      },
    },
  },

  usingPalettePrompts: {
    title: "Using Palette Prompts",

    options: {
      copyAndSend: {
        title: "Copy and Send",
        steps: [
          "Open the palette: ntm palette",
          "Select a prompt",
          "Copy it",
          "Use ntm send or paste directly",
        ],
      },
      directSend: {
        title: "Direct Send (Power Move)",
        description: "This lets you select a prompt and immediately send it to all agents!",
      },
    },
  },

  examplePrompts: {
    title: "Example Prompts",
    intro: "Here are a few examples from the palette:",

    examples: {
      codeReview: {
        title: "Code Review",
        prompt: `Review this code with an emphasis on:
1. Security vulnerabilities
2. Performance issues
3. Code readability
4. Edge cases not handled

For each issue, provide:
- The specific problem
- Why it matters
- A suggested fix`,
      },
      architectureAnalysis: {
        title: "Architecture Analysis",
        prompt: `Analyze the architecture of this codebase:
1. Identify the main components
2. Map the data flow
3. Note any anti-patterns
4. Suggest improvements

Create a simple diagram if helpful.`,
      },
    },
  },

  customizingPalette: {
    title: "Customizing The Palette",
    intro: "You can add your own prompts:",
    location: "Location of custom prompts",
    instructions: "Create .md files with your prompts, and they'll appear in the palette.",
  },

  proTips: {
    title: "Pro Tips",
    tips: [
      {
        title: "Start broad, then narrow",
        description: "Use high-level prompts first",
      },
      {
        title: "Combine agents",
        description: "Send different prompts to different agents",
      },
      {
        title: "Build on responses",
        description: "Use agent output in follow-up prompts",
      },
      {
        title: "Save good prompts",
        description: "Add working prompts to your custom palette",
      },
    ],
  },

  tryItNow: {
    title: "Try It Now",
    comment1: "Open the palette",
    comment2: "Browse the categories",
    comment3: "Select something interesting",
    comment4: "Try sending it to your test session",
  },
};