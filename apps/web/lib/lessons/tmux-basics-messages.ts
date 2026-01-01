/**
 * Tmux Basics Lesson Messages - English (Default)
 *
 * All user-facing text for the tmux basics lesson component.
 * Organized by component structure for easy maintenance.
 */

export const tmuxBasicsLessonMessages = {
  goalBanner: {
    content: "Never lose work when SSH drops.",
  },

  whatIsTmux: {
    title: "What Is tmux?",
    description: "is a terminal multiplexer. It lets you:",
    highlight: "tmux",
    strong: "terminal multiplexer",

    features: [
      "Keep sessions running after you disconnect",
      "Split your terminal into panes",
      "Have multiple windows in one connection",
    ],
  },

  essentialCommands: {
    title: "Essential Commands",

    startSession: {
      title: "Start a New Session",
      description: 'This creates a session named "myproject".',
    },

    detachSession: {
      title: "Detach (Leave Session Running)",
      description: "Your session continues running in the background!",
    },

    listSessions: {
      title: "List Sessions",
      description: "See all running sessions.",
    },

    reattachSession: {
      title: "Reattach to a Session",
      description: "Attaches to the most recent session.",
    },
  },

  prefixKey: {
    title: "The Prefix Key",

    tipBox: {
      content: "In ACFS, the prefix key is Ctrl+a (not the default Ctrl+b). All tmux commands start with the prefix.",
    },
  },

  splittingPanes: {
    title: "Splitting Panes",

    shortcuts: {
      splitVertically: {
        action: "Split vertically",
      },
      splitHorizontally: {
        action: "Split horizontally",
      },
      moveBetweenPanes: {
        action: "Move between panes",
      },
      closeCurrentPane: {
        action: "Close current pane",
      },
    },
  },

  windows: {
    title: "Windows (Tabs)",

    shortcuts: {
      newWindow: {
        action: "New window",
      },
      nextWindow: {
        action: "Next window",
      },
      previousWindow: {
        action: "Previous window",
      },
      goToWindowNumber: {
        action: "Go to window number",
      },
    },
  },

  copyMode: {
    title: "Copy Mode (Scrolling)",

    shortcuts: {
      enterCopyMode: {
        action: "Enter copy mode",
      },
      scroll: {
        action: "Scroll",
      },
      exitCopyMode: {
        action: "Exit copy mode",
      },
      startSelection: {
        action: "Start selection",
      },
      copySelection: {
        action: "Copy selection",
      },
    },
  },

  tryItNow: {
    title: "Try It Now",
  },

  whyItMatters: {
    title: "Why This Matters for Agents",

    card: {
      title: "Your Agents Run in tmux",
      description: "Your coding agents (Claude, Codex, Gemini) run in tmux panes. If SSH drops, they keep running. When you reconnect and reattach, they're still there!",
    },
  },

  commandSection: {
    pressLabel: "Press:",
    thenLabel: "then",
  },
};