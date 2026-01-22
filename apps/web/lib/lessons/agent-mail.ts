/**
 * Agent Mail Lesson Messages - English (Default)
 *
 * All user-facing text for the agent-mail lesson component.
 * Technical terms kept in English: Agent Mail, MCP, JSON-RPC, webhook, project_key, agent_name, message_id
 */

export const agentMailLessonMessages = {
  goalBanner: {
    content: "Coordinate multiple agents without conflicts using Agent Mail.",
  },

  whatIsAgentMail: {
    title: "What Is Agent Mail?",
    mcpDescription: "is a coordination system that lets multiple AI agents work on the same project without stepping on each other's toes.",
    thinkOfIt: "Think of it as email + file locking for agents. Agents can send messages, claim files they're working on, and stay in sync—all persisted in git.",

    features: {
      messaging: {
        title: "Messaging",
        description: "Agents send and receive messages with context",
      },
      fileReservations: {
        title: "File Reservations",
        description: "Advisory locks prevent edit conflicts",
      },
      searchableThreads: {
        title: "Searchable Threads",
        description: "Find past decisions and discussions",
      },
      gitPersistence: {
        title: "Git Persistence",
        description: "All artifacts are human-auditable in git",
      },
    },
  },

  whyCoordination: {
    title: "Why Coordination Matters",
    intro: "Without coordination, multiple agents working on the same codebase can:",

    problems: [
      {
        problem: "Overwrite each other's changes",
        solution: "File reservations prevent conflicts",
      },
      {
        problem: "Duplicate work on the same task",
        solution: "Message threads track who's doing what",
      },
      {
        problem: "Make conflicting architectural decisions",
        solution: "Shared context via searchable threads",
      },
    ],

    tipBox: {
      content: "Agent Mail is available as an MCP server. Your agents can use it automatically when configured!",
    },
  },

  coreConcepts: {
    title: "Core Concepts",

    projectsAndAgents: {
      title: "Projects & Agents",
      description: "Each project has registered agents with unique names",
      codeComment: `# Agent names are adjective+noun combinations
# Examples: "BlueLake", "GreenCastle", "RedStone"

# Register an agent
ensure_project(human_key="/data/projects/my-app")
register_agent(
  project_key="/data/projects/my-app",
  program="claude-code",
  model="opus-4.5"
)`,
    },

    sendingMessages: {
      title: "Sending Messages",
      description: "Agents communicate via structured messages",
      code: `send_message(
  project_key="/data/projects/my-app",
  sender_name="BlueLake",
  to=["GreenCastle"],
  subject="API design question",
  body_md="Should we use REST or GraphQL for the new endpoint?"
)`,
    },

    fileReservations: {
      title: "File Reservations",
      description: "Claim files before editing to prevent conflicts",
      code: `# Reserve files before editing
file_reservation_paths(
  project_key="/data/projects/my-app",
  agent_name="BlueLake",
  paths=["src/api/*.py", "src/routes/*.py"],
  ttl_seconds=3600,  # 1 hour lease
  exclusive=true     # No one else can edit
)

# Release when done
release_file_reservations(
  project_key="/data/projects/my-app",
  agent_name="BlueLake"
)`,
    },

    checkingInbox: {
      title: "Checking Your Inbox",
      description: "Fetch messages addressed to you",
      code: `# Check for new messages
fetch_inbox(
  project_key="/data/projects/my-app",
  agent_name="BlueLake",
  since_ts="2025-01-15T10:00:00Z",
  include_bodies=true
)

# Acknowledge important messages
acknowledge_message(
  project_key="/data/projects/my-app",
  agent_name="BlueLake",
  message_id=1234
)`,
    },
  },

  commonPatterns: {
    title: "Common Patterns",

    startingSession: {
      title: "Starting a Session",
      description: "Use the macro for quick setup",
      code: `macro_start_session(
  human_key="/data/projects/my-app",
  program="claude-code",
  model="opus-4.5",
  task_description="Implementing auth"
)`,
    },

    replyingToThread: {
      title: "Replying to a Thread",
      description: "Keep discussions organized",
      code: `reply_message(
  project_key="/data/projects/my-app",
  message_id=1234,
  sender_name="GreenCastle",
  body_md="I agree, let's use GraphQL. Starting work now."
)`,
    },

    searchingDiscussions: {
      title: "Searching Past Discussions",
      description: "Find relevant context",
      code: `search_messages(
  project_key="/data/projects/my-app",
  query="authentication AND JWT",
  limit=10
)`,
    },
  },

  coordinationFlow: {
    title: "The Coordination Flow",

    steps: [
      {
        title: "Register",
        description: "Agent joins the project with a unique name",
      },
      {
        title: "Reserve",
        description: "Claim files before editing",
      },
      {
        title: "Communicate",
        description: "Send messages to coordinate",
      },
      {
        title: "Work",
        description: "Make changes within your reservation",
      },
      {
        title: "Release",
        description: "Free files for other agents",
      },
    ],
  },

  bestPractices: {
    title: "Best Practices",

    practices: [
      {
        title: "Reserve before editing",
        description: "Always claim files before making changes to prevent conflicts",
      },
      {
        title: "Keep subjects specific",
        description: "Use descriptive subjects (≤80 chars) for easy searching",
      },
      {
        title: "Use thread_id consistently",
        description: "Keep related discussions in the same thread",
      },
      {
        title: "Set realistic TTLs",
        description: "Don't hold file reservations longer than needed",
      },
      {
        title: "Acknowledge when required",
        description: "Use acknowledge_message for ack_required messages",
      },
    ],

    warningTip: {
      content: `If you see FILE_RESERVATION_CONFLICT, another agent has the file. Wait for expiry, adjust your patterns, or use non-exclusive reservations.`,
    },
  },

  quickReference: {
    title: "Quick Reference",
    keyFunctionsTitle: "Key Functions",

    functions: [
      { name: "ensure_project", purpose: "Initialize a project" },
      { name: "register_agent", purpose: "Register your identity" },
      { name: "send_message", purpose: "Send a message" },
      { name: "reply_message", purpose: "Reply to a thread" },
      { name: "fetch_inbox", purpose: "Get your messages" },
      { name: "acknowledge_message", purpose: "Confirm receipt" },
      { name: "file_reservation_paths", purpose: "Claim files" },
      { name: "release_file_reservations", purpose: "Release files" },
      { name: "search_messages", purpose: "Search threads" },
      { name: "macro_start_session", purpose: "Quick session setup" },
    ],
  },
};