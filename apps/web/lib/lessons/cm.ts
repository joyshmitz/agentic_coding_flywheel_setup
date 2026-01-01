/**
 * CM Lesson Messages - English (Default)
 *
 * All user-facing text for the CM (Context Manager) lesson component.
 * Organized by component structure for easy maintenance.
 */

export const cmLessonMessages = {
  goalBanner: {
    content: "Build procedural memory for agents that improves over time.",
  },

  whatIsCm: {
    title: "What Is CM?",
    description: "gives AI agents effective memory by extracting lessons from past sessions and making them retrievable for future work.",
    highlight: "CM (CASS Memory System)",
    humanLearning: "Think of it like how humans learn: you encounter a problem, solve it, and remember the solution. CM does this for your agents automatically.",

    features: {
      lessonExtraction: {
        title: "Lesson Extraction",
        description: "Automatically extract rules from past sessions",
      },
      contextRetrieval: {
        title: "Context Retrieval",
        description: "Get relevant rules before starting tasks",
      },
      antiPatterns: {
        title: "Anti-Patterns",
        description: "Learn what NOT to do from past mistakes",
      },
      continuousLearning: {
        title: "Continuous Learning",
        description: "Memory improves with every session",
      },
    },
  },

  howItWorks: {
    title: "How It Works",
    tipBox: "CM builds a \"playbook\" of rules over time. The more sessions you analyze, the smarter your agents become!",

    memoryDiagram: {
      pastSessions: {
        label: "Past Sessions",
        sublabel: "Raw conversations",
      },
      cmAnalysis: {
        label: "CM Analysis",
        sublabel: "Extract lessons",
      },
      playbook: {
        label: "Playbook",
        sublabel: "Actionable rules",
      },
    },
  },

  onboarding: {
    title: "Onboarding: Building Your Playbook",
    intro: "The cm onboard command guides you through analyzing past sessions and extracting valuable rules:",

    steps: [
      {
        cmd: "cm onboard status",
        desc: "Check status and see recommendations",
      },
      {
        cmd: "cm onboard sample --fill-gaps",
        desc: "Get sessions filtered by playbook gaps",
      },
      {
        cmd: "cm onboard read /path/session.jsonl --template",
        desc: "Read session with rich context",
      },
      {
        cmd: 'cm playbook add "rule" --category "category"',
        desc: "Add extracted rules",
      },
      {
        cmd: "cm onboard mark-done /path/session.jsonl",
        desc: "Mark session as processed",
      },
    ],
  },

  essentialCommands: {
    title: "Essential Commands",

    commands: [
      {
        command: "cm onboard status",
        description: "Check playbook status and recommendations",
      },
      {
        command: "cm onboard sample --fill-gaps",
        description: "Get sessions to analyze (filtered by gaps)",
      },
      {
        command: "cm onboard read /path/session.jsonl --template",
        description: "Read a session with rich context",
      },
      {
        command: 'cm playbook add "rule" --category "debugging"',
        description: "Add an extracted rule",
      },
      {
        command: "cm onboard mark-done /path/session.jsonl",
        description: "Mark session as processed",
      },
      {
        command: 'cm context "task description" --json',
        description: "Get relevant context for a task",
      },
    ],
  },

  usingContext: {
    title: "Using Context Before Tasks",
    intro: "Before starting complex tasks, retrieve relevant context from your playbook:",
    tipBox: 'Reference rule IDs in your work. For example: "Following b-8f3a2c, using bcrypt with cost 12..."',
  },

  memoryProtocol: {
    title: "The Memory Protocol",

    steps: [
      {
        number: 1,
        title: "START",
        description: 'Run cm context "<task>" --json before non-trivial work',
      },
      {
        number: 2,
        title: "WORK",
        description: 'Reference rule IDs when following them (e.g., "Following b-8f3a2c...")',
      },
      {
        number: 3,
        title: "FEEDBACK",
        description: "Leave inline comments when rules help or hurt",
      },
      {
        number: 4,
        title: "END",
        description: "Just finish your work. Learning happens automatically.",
      },
    ],
  },

  ruleCategories: {
    title: "Rule Categories",

    categories: [
      {
        name: "debugging",
        description: "Problem-solving techniques",
        color: "from-red-500/20 to-rose-500/20",
      },
      {
        name: "security",
        description: "Security best practices",
        color: "from-amber-500/20 to-orange-500/20",
      },
      {
        name: "performance",
        description: "Optimization patterns",
        color: "from-emerald-500/20 to-teal-500/20",
      },
      {
        name: "architecture",
        description: "Design decisions",
        color: "from-primary/20 to-violet-500/20",
      },
      {
        name: "testing",
        description: "Test strategies",
        color: "from-blue-500/20 to-indigo-500/20",
      },
      {
        name: "tooling",
        description: "Tool-specific knowledge",
        color: "from-pink-500/20 to-rose-500/20",
      },
    ],
  },

  bestPractices: {
    title: "Best Practices",

    practices: [
      {
        title: "Run cm context before complex tasks",
        description: "Don't reinvent the wheel—check what you've learned",
      },
      {
        title: "Extract specific, actionable rules",
        description: "'Use bcrypt cost ≥12' is better than 'be secure'",
      },
      {
        title: "Include anti-patterns",
        description: "What NOT to do is as valuable as what to do",
      },
      {
        title: "Categorize rules properly",
        description: "Makes retrieval more accurate",
      },
      {
        title: "Provide feedback on rules",
        description: "Helps the system learn which rules are actually useful",
      },
    ],
  },

  tryItNow: {
    title: "Try It Now",
  },
};