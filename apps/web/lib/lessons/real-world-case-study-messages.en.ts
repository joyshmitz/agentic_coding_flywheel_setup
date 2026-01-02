/**
 * Real World Case Study Lesson Messages - English (Default)
 *
 * All user-facing text for the real-world case study lesson component.
 * Covers the complete flywheel workflow on a real production project: cass-memory.
 */

export const realWorldCaseStudyLessonMessages = {
  goalBanner: {
    content: "Learn the complete flywheel workflow from a real project: 693 beads, 282 commits on day 1, 85% complete in hours.",
  },

  introduction: {
    title: "The Challenge: Building a Memory System",
    intro: "On December 7th, 2025, a new project was conceived:",
    cassMemory: "cass-memory",
    description: "- a procedural memory system for coding agents. The goal? Go from zero to fully functional CLI tool in one day using the flywheel workflow.",
    walkThrough: "This lesson walks you through exactly how it was done, so you can replicate this workflow on your own projects.",
  },

  phase1: {
    title: "Phase 1: Multi-Model Planning",
    intro: "The first step isn't to start coding. It's to",
    gatherPerspectives: "gather diverse perspectives",
    onProblem: "on the problem.",

    collectProposals: {
      title: "Collect Competing Proposals",
      description: "Ask multiple frontier models to propose implementation plans",
    },

    models: {
      gpt: {
        name: "GPT 5.1 Pro",
        focus: "Scientific validation approach",
      },
      gemini: {
        name: "Gemini 3 Ultra",
        focus: "Search pointers & tombstones",
      },
      grok: {
        name: "Grok 4.1",
        focus: "Cross-agent enrichment",
      },
      claude: {
        name: "Claude Opus 4.5",
        focus: "ACE pipeline design",
      },
    },

    instruction: "Each model received the same prompt with minimal guidance - just 2-3 messages to clarify the goal. The key instruction: \"Design a memory system that works for all coding agents, not just Claude.\"",

    tipSaveConversations: {
      intro: "Save each conversation as markdown.",
      toolMention: "The chat_shared_conversation_to_file tool makes this easy.",
    },
  },

  phase2: {
    title: "Phase 2: Plan Synthesis",
    intro: "Now comes the crucial step: have one model synthesize the best ideas from all proposals into a single master plan.",
    resultLines: "The resulting plan was 5,600+ lines - a comprehensive blueprint covering architecture, data models, CLI commands, the reflection pipeline, storage, and implementation roadmap.",

    synthesisResult: {
      title: "PLAN_FOR_CASS_MEMORY_SYSTEM.md",
      lines: "lines",
      sections: "major sections",
      bestIdeas: "Best ideas",
      fromModels: "from 4 models",
      complete: "Complete",
      roadmap: "implementation roadmap",
    },
  },

  planAnatomy: {
    title: "Anatomy of a Great Plan",
    intro: "The plan is the bedrock of a successful agentic project. Let's dissect what makes",
    actualPlan: "the actual 5,600+ line plan",
    soEffective: "so effective.",

    documentStructure: {
      title: "Document Structure: 11 Major Sections",
      sections: [
        {
          number: 1,
          title: "Executive Summary",
          description: "Problem statement, three-layer solution, key innovations table",
        },
        {
          number: 2,
          title: "Core Architecture",
          description: "Cognitive model, ACE pipeline, 7 design principles",
        },
        {
          number: 3,
          title: "Data Models",
          description: "TypeScript schemas, confidence decay algorithm, validation rules",
        },
        {
          number: 4,
          title: "CLI Commands",
          description: "15+ commands with usage examples and JSON outputs",
        },
        {
          number: 5,
          title: "Reflection Pipeline",
          description: "Generator, Reflector, Validator, Curator phases",
        },
        {
          number: 6,
          title: "Integration",
          description: "Search wrapper, error handling, secret sanitization",
        },
        {
          number: 7,
          title: "LLM Integration",
          description: "Provider abstraction, Zod schemas, prompt templates",
        },
        {
          number: 8,
          title: "Storage & Persistence",
          description: "Directory structure, cascading config, embeddings",
        },
        {
          number: 9,
          title: "Agent Integration",
          description: "AGENTS.md template, MCP server design",
        },
        {
          number: 10,
          title: "Implementation Roadmap",
          description: "Phased delivery with ROI priorities",
        },
        {
          number: 11,
          title: "Comparison Matrix",
          description: "Feature checklist against competing proposals",
        },
      ],
    },

    effectivePatterns: {
      title: "Patterns That Make Plans Effective",
      patterns: [
        {
          title: "Theory-First Approach",
          description: "Each major feature includes: schema definition → algorithm → usage examples → implementation notes. Never jumps to code before explaining the why.",
          gradient: "from-violet-500/20 to-purple-500/20",
        },
        {
          title: "Progressive Elaboration",
          description: "Simple concepts expand into nested detail. 'Bullet maturity' starts as a concept, becomes a state machine, then includes transition rules and decay calculations.",
          gradient: "from-emerald-500/20 to-teal-500/20",
        },
        {
          title: "Concrete Examples Throughout",
          description: "Not just 'validate inputs' but actual TypeScript interfaces, JSON outputs, bash command examples, and ASCII diagrams showing data flow.",
          gradient: "from-sky-500/20 to-blue-500/20",
        },
        {
          title: "Edge Cases Anticipated",
          description: "The plan addresses error handling for cass timeouts, toxic bullet blocking, stale rule detection, and secret sanitization before implementation begins.",
          gradient: "from-amber-500/20 to-orange-500/20",
        },
        {
          title: "Comparison Tables",
          description: "Key decisions contextualized against alternatives. Shows trade-offs between approaches from different model proposals.",
          gradient: "from-rose-500/20 to-pink-500/20",
        },
      ],
    },

    distinctiveInnovations: {
      title: "Distinctive Innovations in This Plan",
      innovations: [
        {
          title: "Confidence Decay Half-Life",
          description: "Rules lose credibility over time. Harmful events weighted 4× helpful ones. Full algorithm with decay factors specified.",
        },
        {
          title: "Anti-Pattern Inversion",
          description: "Harmful rules converted to 'DON'T do X' instead of deleted, preserving the learning while inverting the advice.",
        },
        {
          title: "Evidence-Count Gate",
          description: "Pre-LLM heuristic filter that saves API calls. Rules need minimum evidence before promotion.",
        },
        {
          title: "Cascading Config",
          description: "Global user playbooks + repo-level playbooks merged intelligently with conflict resolution.",
        },
      ],
    },

    planChecklist: {
      title: "What Your Plans Should Include:",
      items: [
        "Executive summary - Problem + solution in 1 page",
        "Data models - TypeScript/Zod schemas for all entities",
        "CLI/API surface - Every command with examples",
        "Architecture diagrams - ASCII boxes showing data flow",
        "Error handling - What can go wrong, how to recover",
        "Implementation roadmap - Prioritized phases with dependencies",
        "Comparison tables - Why this approach over alternatives",
      ],
    },

    studyTemplate: {
      intro: "The full plan is available at",
      github: "github.com/Dicklesworthstone/cass_memory_system",
      study: "Study it as a template for your own project plans.",
    },
  },

  phase3: {
    title: "Phase 3: From Plan to Beads",
    intro: "A 5,600-line markdown file is great for humans, but agents need",
    structuredTasks: "structured, trackable tasks",
    whereBead: "This is where beads comes in.",

    transformation: {
      title: "Beads Structure",
      epics: "Epics",
      tasks: "Tasks",
      leadTime: "Avg Lead Time",
      description: "Tasks linked with dependencies so blockers are visible and agents know what to work on next.",
    },

    multiplePassesToRefine: "This transformation took multiple passes to refine. The agents reviewed and improved the beads structure several times.",
  },

  phase4: {
    title: "Phase 4: Swarm Execution",
    intro: "With 350+ beads ready, it's time to",
    unleashSwarm: "unleash the swarm",
    multipleAgents: "Multiple agents work in parallel, each picking up tasks based on what's ready.",

    swarmSetup: {
      title: "The Agent Swarm",
      claudeCode: {
        name: "Claude Code",
        agents: "5-6 agents (Opus 4.5)",
      },
      codexCli: {
        name: "Codex CLI",
        agents: "3 agents (5.1 Max)",
      },
      geminiCli: {
        name: "Gemini CLI",
        agents: "2 agents (review duty)",
      },
    },

    coordination: "The agents coordinate using bv (beads viewer) to see what's ready, avoiding conflicts and ensuring the most important blockers get cleared first.",
  },

  agentCoordination: {
    title: "Agent Coordination with Agent Mail",
    intro: "When agents need to share context or coordinate on overlapping work,",
    agentMail: "Agent Mail",
    providesCommunication: "provides the communication layer.",

    features: [
      {
        title: "File reservations:",
        description: "Agents claim files before editing to avoid conflicts",
      },
      {
        title: "Status updates:",
        description: "Agents report progress so others know what's happening",
      },
      {
        title: "Handoffs:",
        description: "When one agent finishes a blocker, dependent agents get notified",
      },
      {
        title: "Review requests:",
        description: "Agents can ask each other to review their work",
      },
    ],

    fullArchivePublished: "The full Agent Mail archive from this project was published as a static site so you can see the actual agent-to-agent communication.",
  },

  commitCadence: {
    title: "The Commit Cadence",
    intro: "With many agents working simultaneously, commits need careful orchestration. A dedicated",
    commitAgent: "commit agent",
    runsContinuously: "runs continuously.",

    commitStats: {
      title: "Commit Statistics",
      day1Commits: "Day 1 Commits",
      perHour: "Per Hour",
      detailed: "Detailed",
      messages: "Messages",
      description: "The commit agent ran every 15-20 minutes, grouping changes logically and writing detailed commit messages.",
    },

    atomicCommits: "This pattern ensures atomic, well-documented commits even when 10+ agents are making changes simultaneously.",
  },

  resultsLessons: {
    title: "Results & Key Lessons",
    intro: "After one day of flywheel-powered development, the cass-memory project achieved:",

    stats: {
      linesOfCode: {
        value: "11K+",
        label: "Lines of Code",
      },
      day1Commits: {
        value: "282",
        label: "Day 1 Commits",
      },
      testsPassing: {
        value: "151",
        label: "Tests Passing",
      },
      complete: {
        value: "85-90%",
        label: "Complete",
      },
    },

    keyLessons: {
      title: "Key Lessons",
      lessons: [
        {
          title: "Planning is 80% of the work",
          description: "A detailed plan makes agent execution predictable and fast",
        },
        {
          title: "Multi-model synthesis beats single-model planning",
          description: "Each model brought unique insights that improved the final design",
        },
        {
          title: "Beads enable parallelism",
          description: "Structured tasks with dependencies let many agents work without conflicts",
        },
        {
          title: "Coordination tools are essential",
          description: "Agent Mail and file reservations prevent agents from stepping on each other",
        },
        {
          title: "Dedicated commit agent keeps history clean",
          description: "Separating commit responsibility from coding ensures atomic commits",
        },
      ],
    },
  },

  tryItYourself: {
    title: "Try It Yourself",
    intro: "Ready to try this workflow on your own project? Here's the quickstart:",

    tip: {
      intro: "Start smaller than the cass-memory example. Try this workflow with a project that would normally take you a day or two manually. Build your confidence before tackling larger projects.",
    },
  },

  dayOneResults: {
    title: "Day 1 Results",
    stats: {
      totalBeads: "Total Beads",
      day1Commits: "Day 1 Commits",
      agentsInvolved: "Agents Involved",
      toComplete: "To 85% Complete",
    },
  },

  codeBlocks: {
    competingProposals: `# Put all proposal files in the project folder
competing_proposal_plans/
  2025-12-07-gemini-*.md
  2025-12-07-grok-*.md
  gpt_pro_version.md
  claude_version/

# Ask Opus 4.5 to create the hybrid plan
cc "Read all the files in competing_proposal_plans/.
Create a hybrid plan that takes the best parts of each.
Write it to PLAN_FOR_CASS_MEMORY_SYSTEM.md"`,

    beadsInit: `# Initialize beads in the project
bd init

# Have an agent transform the plan into beads
cc "Read PLAN_FOR_CASS_MEMORY_SYSTEM.md carefully.

Transform each section, feature, and implementation detail
into individual beads using the bd CLI.

Create epics for major phases, then break them into tasks.
Set up dependencies so blockers are clear.
Use priorities: P0 for foundation, P1-P2 for core features,
P3-P4 for polish and future work.

Create at least 300 beads covering the full implementation."`,

    swarmWorkflow: `# Launch the swarm with NTM
ntm spawn cass-memory --cc=6 --cod=3 --gmi=2

# Each agent runs this workflow:
# 1. Check what's ready
bv --robot-triage

# 2. Claim a task
bd update <id> --status in_progress

# 3. Implement
# (agent does the work)

# 4. Close when done
bd close <id>

# 5. Repeat`,

    agentMailExample: `# Example Agent Mail coordination

# Agent "BlueLake" reserves files before editing
mcp.file_reservation_paths(
  project_key="/data/projects/cass-memory",
  agent_name="BlueLake",
  paths=["src/playbook/*.ts"],
  ttl_seconds=3600,
  exclusive=true
)

# Agent "GreenCastle" messages about a blocker being cleared
mcp.send_message(
  project_key="/data/projects/cass-memory",
  sender_name="GreenCastle",
  to=["BlueLake", "RedFox"],
  subject="Types foundation complete",
  body_md="Zod schemas are done. You can now work on playbook and CLI."
)`,

    commitAgent: `# The commit agent pattern (runs every 15-20 minutes)

# Step 1: Understand the project
cc "First read AGENTS.md, read the README, and explore
the project to understand what we're doing. Use ultrathink."

# Step 2: Commit in logical groupings
cc "Based on your knowledge of the project, commit all
changed files now in a series of logically connected
groupings with super detailed commit messages for each
and then push.

Take your time to do it right. Don't edit the code at all.
Don't commit ephemeral files. Use ultrathink."`,

    quickstart: `# 1. Gather proposals from multiple models
# (Use GPT Pro, Gemini, Claude, Grok - whichever you have access to)
# Save each as markdown in competing_proposal_plans/

# 2. Synthesize into a master plan
cc "Read all files in competing_proposal_plans/.
Create a hybrid plan taking the best of each.
Write to PLAN.md"

# 3. Transform plan into beads
bd init
cc "Read PLAN.md. Transform into 100+ beads with
dependencies and priorities. Use bd CLI."

# 4. Launch the swarm
ntm spawn myproject --cc=3 --cod=2 --gmi=1

# 5. Monitor with bv
bv --robot-triage  # See what's ready

# 6. Watch the magic happen
ntm attach myproject

# 7. (Every 15-20 min) Run the commit agent
cc "Commit all changes in logical groupings with
detailed messages. Don't edit code. Push when done."`,
  },
};
