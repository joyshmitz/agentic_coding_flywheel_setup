/**
 * Flywheel Loop Lesson Messages - English (Default)
 *
 * All user-facing text for the flywheel loop lesson component.
 * Organized by component structure for easy maintenance.
 */

export const flywheelLoopMessages = {
  goalBanner: {
    content: "Understand how all the tools work together.",
  },

  flywheelSection: {
    title: "The ACFS Flywheel",
    intro: "This isn't just a collection of tools. It's a",
    highlight: "compounding loop",
    cycleEffect: "Each cycle makes the next one better.",
  },

  toolsSection: {
    title: "The Eight Tools (And When To Use Them)",

    tools: {
      ntm: {
        name: "NTM",
        subtitle: "Your Cockpit",
        command: "ntm",
        useCases: [
          "Spawn agent sessions",
          "Send prompts to multiple agents",
          "Orchestrate parallel work",
        ],
      },

      agentMail: {
        name: "MCP Agent Mail",
        subtitle: "Coordination",
        command: "am",
        useCases: [
          "Multiple agents need to share context",
          'You want agents to "talk" to each other',
          "Coordinating complex multi-agent workflows",
        ],
      },

      ubs: {
        name: "UBS",
        subtitle: "Quality Guardrails",
        command: "ubs",
        useCases: [
          "Scan code for bugs before committing",
          "Run comprehensive static analysis",
          "Catch issues early",
        ],
        example: "ubs .  # Scan current directory",
      },

      cass: {
        name: "CASS",
        subtitle: "Session Search",
        command: "cass",
        useCases: [
          "Search across all agent session history",
          "Find previous solutions",
          "Review what agents have done",
        ],
        example: 'cass search "authentication error" --robot --limit 5',
      },

      cassMemory: {
        name: "CASS Memory (CM)",
        subtitle: "Procedural Memory",
        command: "cm",
        useCases: [
          "Build persistent agent memory",
          "Distill learnings from sessions",
          "Give agents context from past work",
        ],
        example: `cm context "Building an API"  # Get relevant memories
cm reflect                     # Update procedural memory`,
      },

      beadsViewer: {
        name: "Beads Viewer",
        subtitle: "Task Management",
        command: "bv",
        useCases: [
          "Track tasks and issues",
          "Kanban view of work",
          "Keep agents focused on goals",
        ],
        example: "bv --robot-triage  # Deterministic triage output",
      },

      caam: {
        name: "CAAM",
        subtitle: "Account Switching",
        command: "caam",
        useCases: [
          "You hit rate limits",
          "You want to switch between accounts",
          "Testing with different credentials",
        ],
        example: `caam status         # See current accounts
caam activate claude backup-account`,
      },

      slb: {
        name: "SLB",
        subtitle: "Safety Guardrails",
        command: "slb",
        useCases: [
          "Dangerous commands (when you want them reviewed)",
          "Two-person rule for destructive operations",
          "Optional safety layer",
        ],
      },
    },

    useCasesLabel: "Use it to:",
  },

  workflowSection: {
    title: "A Complete Workflow",
    intro: "Here's how a real session might look:",
    codeComments: {
      planWork: "# 1. Plan your work",
      checkTasks: "# Check tasks",
      seeReady: "# See what's ready to work on",
      startAgents: "# 2. Start your agents",
      setContext: "# 3. Set context",
      getMemories: "# Get relevant memories",
      updateMemory: "# Update procedural memory",
      sendPrompt: "# 4. Send initial prompt",
      contextPrompt: "Let's implement user authentication.\nHere's the context: [paste cm output]",
      monitorGuide: "# 5. Monitor and guide",
      watchProgress: "# Watch progress",
      scanCommit: "# 6. Scan before committing",
      checkBugs: "# Check for bugs",
      updateMemoryStep: "# 7. Update memory",
      distillLearnings: "# Distill learnings",
      closeTask: "# 8. Close the task",
      seeAccounts: "# See current accounts",
    },
  },

  flywheelEffectSection: {
    title: "The Flywheel Effect",
    intro: "With each cycle:",
    effects: [
      { tool: "CASS", effect: "remembers what worked" },
      { tool: "CM", effect: "distills reusable patterns" },
      { tool: "UBS", effect: "catches more issues" },
      { tool: "Agent Mail", effect: "improves coordination" },
      { tool: "NTM", effect: "sessions become more effective" },
    ],
    tipBox: {
      content: "This is why it's called a flywheel - it gets better the more you use it.",
      strongText: "flywheel",
    },
  },

  firstTaskSection: {
    title: "Your First Real Task",
    intro: "You're ready! Here's how to start your first project:",
    codeComments: {
      createProject: "# 1. Create a project directory",
      initGit: "# 2. Initialize git",
      initBeads: "# 3. Initialize beads for task tracking",
      recommended: "# (Recommended) Create a dedicated Beads sync branch",
      beadsExplanation: "# Beads uses git worktrees for syncing; syncing to your current branch (often `main`)",
      conflictWarning: "# can cause worktree conflicts. Once you have a `main` branch and a remote, run:",
      spawnAgents: "# 4. Spawn your agents",
      startBuilding: "# 5. Start building!",
      buildPrompt: "Let's build something awesome.\nWhat kind of project should we create?",
    },
  },

  helpSection: {
    title: "Getting Help",
    commands: {
      doctor: {
        command: "acfs doctor",
        description: "Check everything is working",
      },
      ntmHelp: {
        command: "ntm --help",
        description: "NTM help",
      },
      onboard: {
        command: "onboard",
        description: "Re-run this tutorial anytime",
      },
    },
  },

  diagram: {
    nodes: {
      plan: {
        label: "Plan",
        sublabel: "Beads",
      },
      coordinate: {
        label: "Coordinate",
        sublabel: "Agent Mail",
      },
      execute: {
        label: "Execute",
        sublabel: "NTM + Agents",
      },
      remember: {
        label: "Remember",
        sublabel: "CASS Memory",
      },
      scan: {
        label: "Scan",
        sublabel: "UBS",
      },
    },
  },
};