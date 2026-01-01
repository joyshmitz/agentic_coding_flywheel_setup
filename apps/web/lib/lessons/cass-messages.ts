/**
 * CASS Lesson Messages - English (Default)
 *
 * All user-facing text for the CASS lesson component.
 * Organized by component structure for easy maintenance.
 */

export const cassLessonMessages = {
  goalBanner: {
    content: "Search across all past agent sessions to reuse solved problems.",
  },

  whatIsCass: {
    title: "What Is CASS?",
    description1: "CASS (Coding Agent Session Search) indexes all your past agent conversations—Claude Code, Codex, Gemini, Cursor, and more—so you can find solutions to problems you've already solved.",
    highlight1: "CASS (Coding Agent Session Search)",
    description2: "It's like having a searchable memory of everything your agents have ever done across all projects.",

    features: {
      multiAgentIndex: {
        title: "Multi-Agent Index",
        description: "Claude, Codex, Gemini, Cursor, ChatGPT sessions",
      },
      fullTextSearch: {
        title: "Full-Text Search",
        description: "Search across code, prompts, and responses",
      },
      crossProject: {
        title: "Cross-Project",
        description: "Find solutions from any project or machine",
      },
      fastRetrieval: {
        title: "Fast Retrieval",
        description: "Instant results with context snippets",
      },
    },
  },

  whyUseCass: {
    title: "Why Use CASS?",
    intro: "You've likely solved many problems before with agents. Without CASS:",

    useCases: [
      {
        problem: "You hit an error you've seen before but can't remember the fix",
        solution: "Search CASS for the error message → find the exact solution",
      },
      {
        problem: "New project needs auth—you've implemented it before",
        solution: "Search 'authentication' → find your past implementation",
      },
      {
        problem: "Different agent solved a similar problem better",
        solution: "Search across all agents → find the best approach",
      },
    ],

    tipBoxContent: "CASS helps you avoid re-solving the same problems. Your past agent sessions are a goldmine of solutions!",
  },

  essentialCommands: {
    title: "Essential Commands",
    warning: "Important: Never run bare cass—it launches a TUI that may block your session. Always use --robot or --json.",

    commands: [
      {
        command: "cass health",
        description: "Check indexing status",
      },
      {
        command: 'cass search "auth error" --robot --limit 5',
        description: "Search with machine-readable output",
      },
      {
        command: "cass view /path/to/session.jsonl -n 42 --json",
        description: "View a specific message",
      },
      {
        command: "cass expand /path/to/session.jsonl -n 42 -C 3 --json",
        description: "View with context (3 messages before/after)",
      },
      {
        command: "cass capabilities --json",
        description: "See what agents are indexed",
      },
      {
        command: "cass robot-docs guide",
        description: "Full documentation for AI agents",
      },
    ],
  },

  searchPatterns: {
    title: "Search Patterns",

    patterns: {
      basicSearch: {
        title: "Basic Search",
        description: "Find any mention of a term",
        code: 'cass search "database migration" --robot',
      },
      filterByAgent: {
        title: "Filter by Agent",
        description: "Only search Claude Code sessions",
        code: 'cass search "error handling" --agent claude --robot',
      },
      recentOnly: {
        title: "Recent Only",
        description: "Search last 7 days",
        code: 'cass search "docker" --days 7 --robot',
      },
      minimalOutput: {
        title: "Minimal Output",
        description: "Just essential fields",
        code: 'cass search "auth" --robot --fields minimal --limit 10',
      },
      errorMessages: {
        title: "Error Messages",
        description: "Find solutions to specific errors",
        code: 'cass search "Cannot read property of undefined" --robot',
      },
    },
  },

  searchWorkflow: {
    title: "The Search Workflow",

    steps: [
      {
        title: "Search",
        description: "Find relevant past sessions",
      },
      {
        title: "Review",
        description: "Check snippets and scores",
      },
      {
        title: "Expand",
        description: "View full context if needed",
      },
      {
        title: "Apply",
        description: "Use the solution in your current work",
      },
    ],
  },

  understandingOutput: {
    title: "Understanding Output",
    description: "CASS returns structured results with session info and snippets:",

    exampleOutput: `$ cass search "PostgreSQL connection" --robot --limit 2

{
  "hits": [
    {
      "source_path": "/home/ubuntu/.claude/projects/.../session.jsonl",
      "line_number": 87,
      "agent": "claude_code",
      "workspace": "/projects/myapp",
      "snippet": "...fixed the PostgreSQL connection by setting pool_size=20...",
      "score": 0.92
    },
    {
      "source_path": "/home/ubuntu/.codex/sessions/2025-01-12.jsonl",
      "line_number": 45,
      "agent": "codex",
      "workspace": "/projects/backend",
      "snippet": "...PostgreSQL connection string format: postgres://user:pass...",
      "score": 0.85
    }
  ],
  "_meta": { "query": "PostgreSQL connection", "took_ms": 42 }
}`,

    tipBoxContent: "Use cass expand with the source path and line number to see the full conversation context!",
  },

  bestPractices: {
    title: "Best Practices",

    practices: [
      {
        title: "Use specific search terms",
        description: "'PostgreSQL timeout error' is better than just 'error'",
      },
      {
        title: "Filter by agent for focused results",
        description: "If you remember which agent solved it, use --agent",
      },
      {
        title: "Check multiple solutions",
        description: "Different agents may have solved it differently",
      },
      {
        title: "Use --days for recent context",
        description: "Older solutions might use outdated patterns",
      },
    ],
  },

  tryItNow: {
    title: "Try It Now",
    comment1: "Check your indexing status",
    comment2: "Search for a common pattern",
    comment3: "View full documentation",
  },
};