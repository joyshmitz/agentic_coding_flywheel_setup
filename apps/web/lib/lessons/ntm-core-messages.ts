/**
 * NTM Core Lesson Messages - English (Default)
 *
 * All user-facing text for the NTM core lesson component.
 * Organized by component structure for easy maintenance.
 */

export const ntmCoreLessonMessages = {
  goalBanner: {
    content: "Master NTM (Named Tmux Manager) for orchestrating agents.",
  },

  whatIsNtm: {
    title: "What Is NTM?",
    description1: "NTM is your command center for managing multiple coding agents.",
    highlight1: "command center",
    description2: "It creates organized tmux sessions with dedicated panes for each agent.",

    diagram: {
      ntmTitle: "NTM",
      commandCenter: "Command Center",
      agents: {
        claude: { name: "Claude", shortcut: "cc" },
        codex: { name: "Codex", shortcut: "cod" },
        gemini: { name: "Gemini", shortcut: "gmi" },
      },
    },
  },

  ntmTutorial: {
    title: "The NTM Tutorial",
    description1: "NTM has a built-in tutorial. Start it now:",
    description2: "This will walk you through the basics interactively.",
  },

  essentialCommands: {
    title: "Essential NTM Commands",

    commands: {
      checkDependencies: {
        title: "Check Dependencies",
        description: "Verifies all required tools are installed.",
      },
      createSession: {
        title: "Create a Project Session",
        description: "Creates a tmux session with multiple agent panes.",
        sessionComponents: {
          claudePanes: "2 Claude Code panes",
          codexPanes: "1 Codex pane",
          geminiPanes: "1 Gemini pane",
          sessionName: 'Session: "myproject"',
        },
      },
      listSessions: {
        title: "List Sessions",
        description: "See all running NTM sessions.",
      },
      attachSession: {
        title: "Attach to a Session",
        description: "Jump into an existing session to see agent output.",
      },
      sendToAllAgents: {
        title: "Send a Command to All Agents",
        description: "This sends the same prompt to ALL agents in the session!",
      },
      sendToSpecificAgent: {
        title: "Send to Specific Agent Type",
        description: "Target specific agent types with different tasks.",
      },
    },

    warningBox: {
      title: "If ntm send fails with a CASS error",
      description: "unrecognized subcommand 'robot', bypass duplicate-checking:",
    },
  },

  powerOfNtm: {
    title: "The Power of NTM",
    intro: "Imagine this workflow:",

    workflowSteps: [
      "Spawn a session with multiple agents",
      "Send a high-level task to all of them",
      "Each agent works in parallel",
      "Compare their solutions",
      "Take the best parts from each",
    ],

    tipBoxContent: "That's the power of multi-agent development—different perspectives working in parallel!",
  },

  quickSessionTemplate: {
    title: "Quick Session Template",
    intro: "For a typical project:",

    ratioCard: {
      title: "Why this ratio?",
      agents: {
        claude: {
          count: "2",
          name: "Claude",
          reason: "Great for architecture and complex reasoning",
        },
        codex: {
          count: "1",
          name: "Codex",
          reason: "Fast iteration and testing",
        },
        gemini: {
          count: "1",
          name: "Gemini",
          reason: "Different perspective, good for docs",
        },
      },
    },
  },

  sessionNavigation: {
    title: "Session Navigation",
    intro: "Once inside an NTM session:",

    shortcuts: [
      { keys: ["Ctrl+a", "n"], action: "Next window" },
      { keys: ["Ctrl+a", "p"], action: "Previous window" },
      { keys: ["Ctrl+a", "h/j/k/l"], action: "Move between panes" },
      { keys: ["Ctrl+a", "z"], action: "Zoom current pane" },
    ],

    table: {
      keysHeader: "Keys",
      actionHeader: "Action",
      thenConnector: "then",
    },
  },

  tryItNow: {
    title: "Try It Now",
    comment1: "Create a test session",
    comment2: "List sessions",
    comment3: "Send a simple task",
    comment4: "Attach to see the result",
  },
};