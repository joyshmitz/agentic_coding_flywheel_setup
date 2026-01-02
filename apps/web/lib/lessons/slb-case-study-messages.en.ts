/**
 * SLB Case Study Lesson Messages - English (Default)
 *
 * All user-facing text for the SLB case study lesson component.
 * Demonstrates a complete flywheel workflow from tweet to working code.
 */

export const slbCaseStudyLessonMessages = {
  goalBanner: {
    content: "Watch how a tweet becomes working code in one evening: 76 beads, 268 commits, from idea to ~70% complete in hours.",
  },

  theSpark: {
    title: "The Spark: From Tweet to Tool",
    tweetContext: "On December 13, 2025, a conversation on X about AI agents accidentally deleting Kubernetes nodes sparked an idea: what if dangerous commands required",
    peerReview: "review from another agent",
    twoPersonRule: "The idea was simple: like the \"two-person rule\" for nuclear launch codes, agents should require a second opinion before executing destructive commands like",
  },

  immediateAction: {
    title: "Immediate Action: First Hour",
    intro: "Instead of just writing down the idea for later, the flywheel approach is to",
    startImmediately: "start immediately",
    freshIdea: "while the idea is fresh.",
    keyInsight: "Key insight: an initial plan within the first hour, even if rough, is worth more than a perfect plan days later. Agents will help refine it.",
  },

  feedbackLoop: {
    title: "The Feedback Loop: Four Models, One Plan",
    intro: "Once the initial plan existed, it was sent to multiple frontier models for review and improvement:",
    models: {
      claude: {
        name: "Claude Opus 4.5",
        focus: "Architecture refinement",
      },
      gemini: {
        name: "Gemini 3 Deep Think",
        focus: "Edge case analysis",
      },
      gpt: {
        name: "GPT 5.2 Pro",
        focus: "Security considerations",
      },
      synthesis: {
        name: "Claude (synthesis)",
        focus: "Combining all feedback",
      },
    },
    integration: "The feedback was then integrated by Claude Code, with",
    multipleVerification: "multiple verification passes",
    ensureNothing: "to ensure nothing was missed:",
    foundSomething: "Each verification pass found something. This is why multiple passes are critical - they catch problems in the planning phase when they're easiest to fix.",
  },

  planToBeads: {
    title: "Plan to Beads: Making It Executable",
    intro: "The refined plan was then transformed into structured, trackable beads. The prompt was carefully crafted to ensure thoroughness:",
    verificationIntro: "Then, just like the plan itself, the beads went through verification passes:",
  },

  whatSlbDoes: {
    title: "What SLB Does",
    intro: "The Simultaneous Launch Button implements a",
    twoPersonRuleHighlight: "two-person rule",
    forAgents: "for AI coding agents:",
    features: {
      clientSide: "Client-side execution: Commands run in the user's shell, inheriting all credentials",
      hashBinding: "Command hash binding: Approvals tied to exact commands via SHA-256",
      preflightValidation: "Pre-flight validation: Automatic dry-runs for supported commands",
      rollbackCapture: "Rollback capture: System state saved before dangerous operations",
      agentMailIntegration: "Agent Mail integration: Reviewers notified automatically",
    },
    riskTiers: {
      critical: {
        name: "CRITICAL",
        approvals: "2+",
        examples: "System destruction, database drops",
      },
      dangerous: {
        name: "DANGEROUS",
        approvals: "1",
        examples: "rm -rf, git push --force",
      },
      caution: {
        name: "CAUTION",
        approvals: "Auto (30s)",
        examples: "Single file delete, branch remove",
      },
      safe: {
        name: "SAFE",
        approvals: "Skip",
        examples: "Temp file cleanup, cache clear",
      },
    },
  },

  implementationSprint: {
    title: "The Implementation Sprint",
    intro: "With beads ready, the agent swarm began implementation. The project was smaller than cass-memory, but the workflow was identical:",
    resultIntro: "By dinner time, about two-thirds of the project was complete. The agent swarm continued working while the developer ate, pushing commits autonomously.",
  },

  smallVsLarge: {
    title: "Small vs Large Projects",
    intro: "Compared to the 693-bead cass-memory project, SLB's 76 beads allowed for some workflow optimizations:",
    smallProject: {
      title: "Small Project (SLB)",
      items: [
        "76 beads (14 epics, 62 tasks)",
        "3-5 agents sufficient",
        "Faster verification passes",
        "Easier to track in bv",
        "One evening to ~70%",
      ],
    },
    largeProject: {
      title: "Large Project (cass-memory)",
      items: [
        "693 beads (14 epics, 350+ tasks)",
        "10+ agents needed",
        "Multiple planning sessions",
        "Graph analysis critical",
        "One day to ~85%",
      ],
    },
    tip: "Start with smaller projects to learn the workflow. Once you're comfortable with 50-100 beads, scale up to larger projects.",
  },

  lessonsLearned: {
    title: "Lessons Learned",
    steps: [
      {
        title: "Act immediately on good ideas",
        description: "An hour from idea to initial plan keeps momentum high",
      },
      {
        title: "Multi-model feedback finds blind spots",
        description: "Each model brings different perspectives and catches different issues",
      },
      {
        title: "Multiple verification passes are essential",
        description: "Each pass found something - never skip this step",
      },
      {
        title: "Smaller projects are great for learning",
        description: "76 beads is manageable while still demonstrating the full workflow",
      },
      {
        title: "Document everything",
        description: "The conversation transcripts become valuable learning resources",
      },
    ],
  },

  tryItYourself: {
    title: "Try It Yourself: Weekend Project",
    intro: "Pick a small tool idea (something that would take you a day or two manually) and try this workflow:",
    tip: "For your first flywheel project, aim for something with 50-100 beads. CLI tools, utilities, and small libraries are perfect candidates.",
  },

  timeline: {
    title: "December 13, 2025 Timeline",
    events: [
      {
        time: "3:55 PM",
        event: "Idea sparked from tweet",
      },
      {
        time: "~4:30 PM",
        event: "Initial plan drafted with Claude Code",
      },
      {
        time: "5:25 PM",
        event: "Plan document published",
      },
      {
        time: "Evening",
        event: "Multi-model feedback gathered",
      },
      {
        time: "Night",
        event: "Beads created, implementation started",
      },
    ],
  },

  ideaCard: {
    title: "The WarGames Insight",
    quote: "You know how in movies like WarGames they show how the two guys have to turn the keys at the same time to arm the nuclear warheads? I want to make something like that where for potentially damaging commands, the agents have to get one other agent to agree with their reasoning and sign off on the command.",
    subtitle: "Two-person rule for AI agents",
  },

  beadsResult: {
    title: "Final Beads Structure",
    epics: "Epics",
    tasks: "Tasks",
    total: "Total Beads",
    description: "Smaller than cass-memory's 693 beads, but still comprehensive enough to capture the full implementation.",
  },

  implementationResults: {
    title: "Implementation Results",
    totalCommits: "Total Commits",
    builtIn: "Built In",
    dayOneComplete: "Day 1 Complete",
  },

  codeBlocks: {
    firstPass: `# First pass: Integrate all feedback
cc "Revise the plan document using all the feedback.
Make sure ALL changes are reflected properly."

# Second pass: Verification
cc "Go over everything again. Did we miss anything?"
# Result: Found small oversights

# Third pass: Final check
cc "One more careful review. Any remaining gaps?"
# Result: Found 2 more edge cases`,

    beadsCreation: `cc "First read ALL of the AGENTS.md file and
PLAN_TO_MAKE_SLB.md file super carefully.
Understand ALL of both! Use ultrathink.

Take ALL of that and elaborate on it more, then create
a comprehensive and granular set of beads with:
- Tasks and subtasks
- Dependency structure
- Detailed comments making everything self-contained
- Background, reasoning, justification
- Anything our 'future self' would need to know

Use the bd tool repeatedly to create the actual beads."`,

    beadsVerification: `# Beads verification prompt
cc "Check over each bead super carefully:
- Does it make sense?
- Is it optimal?
- Could we change anything to make the system work better?

If so, revise the beads. It's a lot easier and faster
to operate in 'plan space' before implementing!"`,

    implementation: `# Launch agents
ntm spawn slb --cc=3 --cod=2

# Each agent runs:
bv --robot-triage        # What's ready?
bd update <id> --status in_progress
# ... implement ...
bd close <id>

# Commit agent runs every 15-20 min
cc "Commit all changes in logical groupings with
detailed messages. Don't edit code. Push when done."`,

    tryItYourself: `# Hour 1: Draft initial plan
cc "I want to build [your idea]. Help me create a
detailed plan document covering architecture,
features, and implementation approach."

# Hour 2: Multi-model feedback
# Send plan to 2-3 different frontier models
# Collect their suggestions and improvements

# Hour 3: Synthesize and create beads
cc "Read the plan and all feedback. Create a
revised plan incorporating the best suggestions."

cc "Convert the plan into 50-100 beads with
dependencies. Use bd CLI."

# Hour 4+: Implementation
ntm spawn myproject --cc=2 --cod=1
# Let the swarm work!

# Every 15-20 min: Commit agent
cc "Commit all changes with detailed messages."`,
  },
};
