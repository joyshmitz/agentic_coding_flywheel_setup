/**
 * Beads Lesson Messages - English (Default)
 *
 * All user-facing text for the beads lesson component.
 * Technical terms kept in English: beads, issue, dependency, blocker, MCP, bd, bv, PageRank, betweenness, HITS, eigenvector, k-core
 */

export const beadsLessonMessages = {
  goalBanner: {
    content: "Track issues with dependencies and let graph analysis guide your work.",
  },

  whatIsBeads: {
    title: "What Is Beads?",
    beadsDescription: "is a graph-aware issue tracking system designed for agent workflows. It tracks dependencies between tasks and uses graph algorithms to tell you what to work on next.",
    bvDescription: "is the TUI and CLI for working with Beads. It provides both interactive views and machine-readable outputs for agents.",

    features: {
      dependencyTracking: {
        title: "Dependency Tracking",
        description: "Issues can block other issues",
      },
      graphMetrics: {
        title: "Graph Metrics",
        description: "PageRank, betweenness, critical path",
      },
      smartTriage: {
        title: "Smart Triage",
        description: "Know what to work on next",
      },
      gitIntegration: {
        title: "Git Integration",
        description: "All data lives in .beads/",
      },
    },
  },

  coreCommands: {
    title: "Core bd Commands",
    intro: "is the CLI for managing Beads issues:",

    commands: [
      {
        command: "bd ready",
        description: "Show issues ready to work (no blockers)",
      },
      {
        command: "bd list --status=open",
        description: "All open issues",
      },
      {
        command: "bd show <id>",
        description: "Detailed view with dependencies",
      },
      {
        command: 'bd create "..." -t task -p 2',
        description: "Create a new issue",
      },
      {
        command: "bd update <id> --status=in_progress",
        description: "Claim work",
      },
      {
        command: "bd close <id>",
        description: "Mark complete",
      },
      {
        command: "bd dep add <issue> <depends-on>",
        description: "Add a dependency",
      },
      {
        command: "bd sync",
        description: "Sync with git remote",
      },
    ],

    warning: {
      important: "Important:",
      neverRunBare: "Never run bare",
      explanation: "it launches a TUI. Use",
      flagsNote: "flags for agent output.",
    },
  },

  robotCommands: {
    title: "BV Robot Commands",
    intro: "BV provides machine-readable outputs with precomputed graph metrics:",

    commands: [
      {
        command: "bv --robot-triage",
        description: "THE mega-command: recommendations, quick wins, blockers to clear",
        output: ["quick_ref", "recommendations", "quick_wins", "blockers_to_clear", "project_health"],
        primary: true,
      },
      {
        command: "bv --robot-next",
        description: "Just the single top pick + claim command",
        output: ["next_item", "claim_command"],
        primary: false,
      },
      {
        command: "bv --robot-plan",
        description: "Parallel execution tracks with unblocks lists",
        output: ["tracks", "dependencies", "critical_path"],
        primary: false,
      },
      {
        command: "bv --robot-insights",
        description: "Full graph metrics",
        output: ["PageRank", "betweenness", "HITS", "eigenvector", "critical_path", "cycles", "k-core"],
        primary: false,
      },
    ],
  },

  issueTypes: {
    title: "Issue Types & Priorities",

    types: {
      title: "Types",
      list: [
        { type: "bug", description: "Something broken" },
        { type: "feature", description: "New functionality" },
        { type: "task", description: "Work to do" },
        { type: "epic", description: "Large initiative" },
        { type: "chore", description: "Maintenance" },
      ],
    },

    priorities: {
      title: "Priorities (0-4)",
      list: [
        { priority: "0", label: "Critical", description: "Security, data loss, broken builds" },
        { priority: "1", label: "High", description: "Important work" },
        { priority: "2", label: "Medium", description: "Default priority" },
        { priority: "3", label: "Low", description: "Nice to have" },
        { priority: "4", label: "Backlog", description: "Future consideration" },
      ],
    },
  },

  agentWorkflow: {
    title: "The Agent Workflow",

    steps: [
      { title: "bd ready", description: "Find unblocked work" },
      { title: "bd show <id>", description: "Review issue details" },
      { title: "bd update --status=in_progress", description: "Claim the work" },
      { title: "Implement + test", description: "Do the actual work" },
      { title: "bd close <id>", description: "Mark complete" },
      { title: "bd sync", description: "Sync with remote" },
    ],
  },

  graphMetrics: {
    title: "Understanding Graph Metrics",
    intro: "BV calculates graph metrics to help prioritize work:",

    metrics: [
      {
        name: "PageRank",
        description: "How central is this issue? High PageRank = many things depend on it",
        usage: "Focus on high PageRank blockers first",
      },
      {
        name: "Betweenness",
        description: "How often does this issue sit on critical paths?",
        usage: "Clearing high betweenness issues unblocks the most work",
      },
      {
        name: "Critical Path",
        description: "The longest chain of dependencies",
        usage: "Prioritize work on the critical path to reduce total time",
      },
      {
        name: "Cycles",
        description: "Circular dependencies (A blocks B, B blocks A)",
        usage: "Must be resolved—they create deadlocks",
      },
    ],
  },

  bestPractices: {
    title: "Best Practices",

    practices: [
      {
        title: "Start with bd ready",
        description: "Find work that has no blockers—you can start immediately",
      },
      {
        title: "Use bd dep add for dependencies",
        description: "Explicit dependencies enable smart prioritization",
      },
      {
        title: "Claim work with --status=in_progress",
        description: "Prevents duplicate work by other agents",
      },
      {
        title: "Close issues promptly",
        description: "Unblocks dependent work faster",
      },
      {
        title: "Run bd sync at session end",
        description: "Keeps .beads/ in sync across agents and machines",
      },
    ],

    tipBox: {
      content: "Always commit .beads/ with your code changes. It's the authoritative source of truth for issue state.",
    },
  },

  tryItNow: {
    title: "Try It Now",

    codeExample: `# See what's ready to work on
$ bd ready

# Get smart triage recommendations
$ bv --robot-triage | jq '.quick_ref'

# Create a task
$ bd create "Add login page" -t feature -p 2

# Start working on it
$ bd update bd-1 --status=in_progress

# Sync when done
$ bd sync`,
  },
};