/**
 * Workflow Page Messages - English (Default)
 *
 * All user-facing text for the workflow page.
 * Prompts are kept in English as they are code for AI agents.
 */

export const workflowMessages = {
  header: {
    backLink: "Back to Part One",
  },

  hero: {
    title: "Part Two:",
    titleHighlight: "The Agentic Workflow",
    subtitle:
      "Build production software at unprecedented speed with AI agent swarms orchestrating every phase of development.",
  },

  overview: {
    title: "The Complete Development Lifecycle",
    description:
      "A full development lifecycle encompassing ideation, planning, task breakdown, implementation, review, testing, deployment, and ongoing maintenance. The workflows are highly iterative, with agents communicating via an \"email-like\" system, managing tasks through a dependency-aware graph, and forming a self-reinforcing ecosystem where agents improve each other's outputs.",
    features: [
      { label: "Best-of-all-worlds planning" },
      { label: "Beads task graph (DAG)" },
      { label: "Multi-agent swarm" },
      { label: "Agent Mail coordination" },
      { label: "SLB safety protocols" },
      { label: "Continuous iteration" },
    ],
  },

  investment: {
    label: "Investment:",
    description:
      "VPS ($40-56/mo, month-to-month) + Claude Max ($200/mo x 1-5) + ChatGPT Pro ($200/mo x 1-5) + Gemini Advanced ($20/mo). Scale your swarm as you see ROI; start with 1 subscription of each and grow!",
  },

  flywheel: {
    badge: "Ecosystem",
    title: "The Self-Reinforcing Flywheel",
    description:
      "Each tool enhances the others. Agents spawn -> coordinate -> prioritize -> check safety -> scan bugs -> remember -> search -> back to agents.",
    tools: [
      { name: "NTM", desc: "Spawns agents" },
      { name: "Mail", desc: "Coordinates" },
      { name: "Beads", desc: "Prioritizes" },
      { name: "SLB", desc: "Safety" },
      { name: "UBS", desc: "Bug scan" },
      { name: "CM", desc: "Remembers" },
      { name: "CASS", desc: "Searches" },
      { name: "CAAM", desc: "Auth switch" },
    ],
  },

  phases: {
    phase1: {
      title: "Phase 1: Ideation & Planning",
      badge: "Start Here",
      indicator: "Ideation Phase",
      description:
        "This phase starts with a human-generated idea and quickly escalates to agent-assisted refinement. The goal is to produce a comprehensive, self-contained plan document before any code is written. As Jeffrey Emanuel says: \"It's a lot easier and faster to operate in 'plan space' before we start implementing.\"",
      steps: {
        step1: {
          title: "Start with Your Primary AI",
          content:
            "Open ChatGPT 5.2 Pro and describe your project in detail. Be thorough about what you want to build, user experience, and technical requirements. Ask it to create a comprehensive implementation plan.",
        },
        step2: {
          title: "Get Competing Plans",
          content:
            "Give the same prompt to Claude Opus 4.5 and Gemini 3 with Deep Think. Each model produces different insights: GPT-5.2 excels at system design, Claude Opus 4.5 at code quality, Gemini 3 at creative features.",
        },
        step3: {
          title: "Synthesize the Best of All Worlds",
          content:
            "Paste all competing plans back into your primary AI with this magic prompt:",
          proTip:
            "Pro tip: Do multiple passes. \"I had it carefully go over everything an additional two passes and it found some small oversights in each pass.\"",
        },
        step4: {
          title: "Generate Brilliant Ideas",
          content:
            "For maximum creativity, use this prompt to generate innovative features:",
          note: "Repeat this 3+ times to generate even more ideas. The best ones compound.",
        },
      },
      guide: {
        tip: {
          title: "Why use 3 models?",
          content:
            "Each AI has different training data, architectures, and \"thinking styles\". The synthesis captures the strengths of all three while compensating for individual weaknesses.",
        },
        explain: {
          term: "Time investment",
          content:
            "This phase takes ~1-2 hours, with agents doing most work autonomously. Output: A revised markdown plan ready for task breakdown (often 5,000+ lines of detailed documentation).",
        },
      },
    },

    phase2: {
      title: "Phase 2: Task Breakdown (Beads)",
      indicator: "Task Breakdown",
      description:
        "Beads are granular tasks/epics with explicit dependencies, stored in JSONL or SQLite. This phase converts the monolithic plan into an actionable DAG (Directed Acyclic Graph) for parallel agent execution. Real examples: CASS project = 347 beads, SLB = 76 beads (14 epics, 62 tasks).",
      steps: {
        step1: {
          title: "Create Your Project Session",
          commandDesc: "Create a new tmux session for your project",
        },
        step2: {
          title: "Generate Beads from Your Plan",
          content: "In Claude Code with Opus 4.5, paste your final plan and use this prompt:",
        },
        step3: {
          title: "Review and Refine Beads",
          content: "After beads are created, have Claude review them. Iterate in \"plan space\":",
        },
        step4: {
          title: "Analyze with Beads Viewer",
          content: "Use bv (robot mode) to visualize and prioritize:",
          commands: [
            { command: "bv --robot-triage", desc: "Deterministic triage output (recommended)" },
            { command: "bd ready", desc: "Show beads ready to work on" },
            { command: "bd stats", desc: "Project statistics overview" },
            { command: "bd blocked", desc: "Show blocked issues" },
          ],
        },
      },
      guide: {
        explain: {
          term: "What are beads?",
          content: "Beads are super-powered to-do items containing:",
          items: [
            "A clear task description with context",
            "Dependencies (what must be done first)",
            "Reasoning and rationale for \"future self\"",
            "Status tracking (pending, in-progress, complete)",
          ],
          note: "BV computes metrics like PageRank (importance) and Critical Path (bottlenecks).",
        },
        tip: "Embed markdown snippets in beads for context, but avoid referring back to the full plan once beads are finalized. Each bead should be self-contained.",
      },
    },

    phase3: {
      title: "Phase 3: Agent Swarm Implementation",
      indicator: "Implementation",
      description:
        "This is where the magic happens. You'll launch multiple Claude Code, Codex, and Gemini agents in parallel, each working on different beads while coordinating through MCP Agent Mail. Real example: CASS project produced ~11k LOC in 5 hours, 204 commits, 151 tests passing.",
      steps: {
        step1: {
          title: "Spawn Agent Sessions",
          content:
            "Use ntm to create multiple terminal panes, each running a coding agent:",
          commandDesc: "Create 8 agent panes in your project session",
          note: "Run 3+ machines with multiple subscriptions (e.g., 5 ChatGPT Pro, 5 Claude Max, 3 Gemini Advanced).",
        },
        step2: {
          title: "Initialize Each Agent",
          content: "Copy this initialization prompt to each agent:",
        },
        step3: {
          title: "Agents Self-Coordinate",
          content: "Key coordination tools agents use:",
          commands: [
            { command: "bd update ID --status=in_progress", desc: "Claim a bead before working" },
            { command: "bd close ID", desc: "Mark a bead complete" },
            { command: "file_reservation_paths", desc: "Reserve files to avoid conflicts" },
            { command: "send_message / fetch_inbox", desc: "Agent Mail communication" },
          ],
        },
        step4: {
          title: "Safety with SLB",
          content:
            "For risky commands (e.g., delete Kubernetes nodes), SLB classifies as CRITICAL/DANGEROUS/CAUTION. Requires quorum: agents approve via crypto signatures and Agent Mail notifications. Think \"two-person rule\" like in WarGames.",
        },
      },
      guide: {
        caution:
          "Avoid \"communication purgatory\"! Agents should be proactive about claiming and completing tasks. If an agent gets stuck waiting, it should move to other available beads. The goal is continuous progress, not perfect coordination.",
        tip: "Agent Roles: Claude for tasteful code quality, Codex for long autonomous runs (queued prompts), Gemini for reviews. Mix and match based on the task type.",
      },
    },

    phase4: {
      title: "Phase 4: Review, Testing & Polish",
      indicator: "Quality Assurance",
      description:
        "Agents autonomously refine post-implementation. This includes fresh self-reviews, peer reviews of other agents' code, random inspections, UI/UX scrutiny, comprehensive testing, and documentation.",
      steps: {
        step1: {
          title: "Fresh Self-Review",
          content: "After any coding session, have the agent self-review:",
        },
        step2: {
          title: "Peer Reviews",
          content: "Have agents review code written by fellow agents:",
        },
        step3: {
          title: "UI/UX Scrutiny",
          content: "Polish to Stripe-level quality:",
        },
        step4: {
          title: "Bug Scanning with UBS",
          content: "Run Ultimate Bug Scanner and fix all legitimate issues:",
        },
        step5: {
          title: "Comprehensive Testing",
          content: "Ensure full test coverage:",
        },
      },
      guide: {
        explain: {
          term: "Memory with CM",
          content:
            "Agents store and retrieve: Procedural playbooks, episodic sessions, semantic facts. Core pipeline: Generate context -> Reflect -> Curate playbook -> Validate. This enables cross-session learning and improvement.",
        },
        tip: "Use ultrathink for deep reasoning on scrutinize_ui, check_orm, and other high-stakes analysis prompts. These require maximum model capability.",
      },
    },

    phase5: {
      title: "Phase 5: Deploy & Maintenance",
      indicator: "Ship & Iterate",
      description:
        "Finalize and maintain. Use dedicated agents for git commits (to avoid human edits causing conflicts), deployment, and daily maintenance across all your projects.",
      steps: {
        step1: {
          title: "Smart Git Commits",
          content: "Use a dedicated agent to commit in logical groupings:",
          note: "Repeat every 15-20 minutes for multi-agent projects.",
        },
        step2: {
          title: "Full GitHub Flow",
          content: "Complete deployment workflow:",
        },
        step3: {
          title: "Daily Maintenance Across Projects",
          content:
            "Make forward progress on ALL your active projects every day, even when too busy for deep work. Use command palette prompts (single button press) to keep agents productively improving code.",
        },
      },
      guide: {
        caution:
          "Important: No human edits post-agent work. Let agents handle git to avoid conflicts. Audit via exported mailboxes and bv time-travel features.",
      },
    },
  },

  dailyMaintenance: {
    title: "Daily Maintenance (Autopilot Mode)",
    philosophy: {
      title: "The Daily Progress Philosophy",
      paragraphs: [
        "Make forward progress on every active project, every day, even when you're too busy to spend real mental bandwidth on all of them.",
        "The models are good enough now, and with comprehensive unit tests and e2e integration tests, you don't need to worry about agents \"going rogue\". Plus, if one of them makes a mistake, the other agents will probably catch and fix it themselves.",
        "The reality: Run these prompts on 8+ projects daily, keeping 3 machines busy constantly. Come back 3+ hours later to see incredible amounts of work done autonomously. The compound effect is incredible!",
      ],
    },
    sections: {
      randomInspection: {
        title: "Random Code Inspection",
      },
      peerReview: {
        title: "Peer Review Agent Work",
      },
      uiPolish: {
        title: "UI/UX Polish Pass",
        note: "When you're dissatisfied but lack energy to engage directly (use with Opus 4.5 or GPT 5.2):",
      },
    },
    guide: {
      hierarchy: {
        title: "The Model Hierarchy",
        items: [
          "Opus 4.5 / GPT-5.2-Codex with extra-high effort: Use for scrutinize_ui, check_orm, and high-stakes analysis. These require deep reasoning.",
          "Opus 4.5 / GPT-5.2-Codex with high effort: Great for fresh_review, fix_bug, work_on_beads, and routine coding. Fast and reliable.",
          "Any capable model: check_mail, reread_agents, git_commit work fine with any model.",
        ],
      },
      routine: {
        title: "Quick Daily Routine",
        steps: [
          {
            title: "Start your machines",
            content: "Launch your VPS instances and open your agent terminals with NTM. Run ntm attach myproject to reconnect.",
          },
          {
            title: "Send autopilot prompts",
            content: "Use the command palette to send \"randomly_inspect\" or \"check_other_agents\" prompts to each agent. One button press per agent.",
          },
          {
            title: "Let agents work",
            content: "Come back in 3+ hours. Agents will have made progress on all your projects while you focused on other work.",
          },
        ],
      },
      caution:
        "Test coverage is your safety net. This autopilot approach only works safely with comprehensive unit tests and e2e integration tests acting as guardrails.",
    },
  },

  promptLibrary: {
    title: "The Complete Prompt Library",
    description:
      "Each prompt takes under a second to send using NTM's command palette. Configure once, then trigger with a single button press. Click any prompt to expand and copy.",
    categories: {
      analysis: {
        title: "Analysis & Review",
        prompts: [
          { key: "fresh_review", label: "Fresh Review", desc: "Self-review new code for bugs" },
          { key: "check_other_agents", label: "Check Other Agents", desc: "Peer review agent work" },
          { key: "randomly_inspect", label: "Randomly Inspect", desc: "Deep code exploration" },
          { key: "scrutinize_ui", label: "Scrutinize UI/UX", desc: "Polish to Stripe-level quality" },
          { key: "check_orm", label: "Check ORM/Schemas", desc: "Review database design" },
          { key: "apply_ubs", label: "Apply UBS", desc: "Run bug scanner and fix all issues" },
        ],
      },
      coding: {
        title: "Coding & Development",
        prompts: [
          { key: "fix_bug", label: "Fix Bug", desc: "Diagnose and fix root cause" },
          { key: "create_tests", label: "Create Tests", desc: "Comprehensive test coverage" },
          { key: "leverage_tanstack", label: "Leverage TanStack", desc: "Use TanStack libs where beneficial" },
          { key: "build_ui_ux", label: "Build UI/UX", desc: "World-class component development" },
        ],
      },
      planning: {
        title: "Planning & Beads",
        prompts: [
          { key: "combine_plans", label: "Combine Plans", desc: "Synthesize best of 3 AI plans" },
          { key: "100_ideas", label: "Generate Ideas", desc: "Think of 100, show best 10" },
          { key: "create_beads", label: "Create Beads", desc: "Transform plan into tasks" },
          { key: "improve_beads", label: "Improve Beads", desc: "Iterate in 'plan space'" },
          { key: "work_on_beads", label: "Work on Beads", desc: "Execute tasks in order" },
          { key: "next_bead", label: "Next Bead", desc: "Pick and start next task" },
          { key: "use_bv", label: "Use BV", desc: "Find most impactful bead" },
          { key: "analyze_beads", label: "Analyze & Allocate", desc: "Distribute work to agents" },
          { key: "do_all", label: "Do All Of It", desc: "Execute everything with tracking" },
        ],
      },
      agents: {
        title: "Agent Coordination",
        prompts: [
          { key: "new_agent", label: "New Agent", desc: "Initialize and join swarm" },
          { key: "introduce", label: "Introduce", desc: "Register with Agent Mail" },
          { key: "check_mail", label: "Check Mail", desc: "Process agent messages" },
          { key: "start_with_mail", label: "Start With Mail", desc: "Check mail then work" },
        ],
      },
      git: {
        title: "Git & Operations",
        prompts: [
          { key: "git_commit", label: "Git Commit", desc: "Smart grouped commits + push" },
          { key: "gh_flow", label: "GH Flow", desc: "Full GitHub workflow" },
        ],
      },
      investigation: {
        title: "Investigation",
        prompts: [
          { key: "read_investigate", label: "Read & Investigate", desc: "Deep project understanding" },
          { key: "reread_agents", label: "Reread AGENTS.md", desc: "Refresh context" },
        ],
      },
      documentation: {
        title: "Documentation",
        prompts: [
          { key: "complete_docs", label: "Complete Docs", desc: "Expand Docusaurus site" },
          { key: "improve_readme", label: "Improve README", desc: "Add incremental content" },
        ],
      },
    },
    guide: {
      explain: {
        term: "How to set up the command palette",
        content:
          "NTM includes a command palette feature. Add prompts to ~/.config/ntm/prompts.yaml and bind a keyboard shortcut to open the palette. Each prompt triggers in any active agent session with a single keypress.",
      },
      tip: "Hardware tip: A small programmable keypad (~$60 on Temu) can be configured to send any prompt with a single button. Keep one next to each of your machines for instant agent commands.",
    },
  },

  queuedWorkflows: {
    title: "Queued Workflows (Codex Power Move)",
    note: "Note: This works with Codex CLI but not Claude Code (which interrupts the agent when you send follow-up messages). For Claude Code, use individual prompts or the NTM palette.",
    description:
      "Codex CLI has a powerful feature: queue up multiple messages that execute sequentially. This lets you set up entire improvement cycles that run autonomously for hours.",
    cycleTitle: "The \"Improvement Cycle\" Queue",
    cycleDescription:
      "Enter these prompts upfront. Codex processes them one at a time as each completes:",
    steps: [
      { num: 1, title: "Scrutinize and find improvements:" },
      { num: 2, title: "Turn suggestions into beads:" },
      { num: 3, title: "Review the beads:" },
      { num: 4, title: "Execute the beads:" },
      { num: 5, title: "A couple \"proceed\" messages..." },
      { num: 6, title: "Final fresh review:" },
      { num: 7, title: "Finally, commit everything:" },
    ],
    guide: {
      tip: "Come back 3+ hours later to see incredible work done autonomously. This works especially well with GPT 5.2 with extra effort. Run this cycle multiple times a day across all your projects!",
      caution:
        "Test coverage is crucial! This autopilot approach only works safely with comprehensive tests acting as guardrails.",
    },
  },

  postInstall: {
    title: "Post-Install Setup Script",
    description:
      "After Part One is complete, run this script to configure all cloud service CLI tools:",
    commandDesc: "Run the cloud services setup wizard",
    services: [
      { name: "Cloudflare", purpose: "Domain purchase, DNS, CDN", tool: "wrangler" },
      { name: "Vercel", purpose: "Frontend hosting & deployment", tool: "vercel" },
      { name: "Supabase", purpose: "Database, auth, storage", tool: "supabase" },
      { name: "Google Cloud", purpose: "Analytics (GA4)", tool: "gcloud" },
    ],
    guide: {
      explain: {
        term: "Why a separate setup script?",
        content:
          "The main Agent Flywheel installer focuses on development tools. This second script handles cloud service configuration, which requires your specific accounts and API keys. Running them separately keeps initial setup fast.",
      },
      tip: "Supabase IPv4 note: some Supabase projects expose the direct Postgres host over IPv6-only. If your VPS/network is IPv4-only, use the Supabase pooler connection string instead (or upgrade/configure networking for direct IPv4).",
    },
  },

  techStack: {
    title: "Recommended Project Stack",
    description:
      "When starting new projects with your agent swarm, this battle-tested tech stack provides the best developer experience and AI compatibility. Each tool is designed for modern, type-safe development.",
    tools: [
      { name: "Next.js 16", desc: "App Router with React 19" },
      { name: "TypeScript", desc: "Strict mode enabled" },
      { name: "Supabase", desc: "Postgres + Auth + Storage" },
      { name: "Drizzle ORM", desc: "Type-safe database access" },
      { name: "Vercel AI SDK", desc: "For AI integrations" },
      { name: "Tailwind CSS", desc: "Utility-first styling" },
      { name: "Framer Motion", desc: "Smooth animations" },
      { name: "TanStack", desc: "Query, Router, Table, Form" },
    ],
    guide: {
      tip: "Why this stack? These tools have excellent TypeScript support, which AI coding agents leverage for better code generation. Type inference means fewer errors and more reliable autonomous development.",
      explain: {
        term: "AI-friendly tooling",
        content:
          "TanStack and Drizzle ORM both provide strong typing that helps agents understand your data structures. Framer Motion has declarative APIs that agents can reason about easily. Vercel AI SDK provides built-in streaming and tool calling.",
      },
    },
  },

  summary: {
    title: "Summary: The Complete Workflow",
    steps: [
      "Plan with 3 AI models: ChatGPT 5.2 Pro, Opus 4.5, Gemini 3 -> synthesize best ideas",
      "Generate feature ideas: Use the \"100 ideas, show me 10\" technique",
      "Create beads: Transform plan into granular, self-documenting tasks",
      "Review beads: Iterate in \"plan space\" before implementing",
      "Launch agent swarm: Multiple agents working in parallel via Agent Mail",
      "Review & test: Fresh reviews, peer reviews, UBS bug scanning, full tests",
      "Ship: Deploy to Vercel, iterate daily with autopilot prompts!",
    ],
  },

  footer: {
    message: "You now have everything you need to build at 10x speed.",
    backButton: "Back to Part One",
    startButton: "Start the Wizard",
  },

  ui: {
    copy: "Copy",
    copied: "Copied!",
    copyPrompt: "Copy prompt",
    showSteps: "Show workflow steps",
    hideSteps: "Hide steps",
  },
};
