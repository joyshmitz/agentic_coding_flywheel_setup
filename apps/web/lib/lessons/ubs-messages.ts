/**
 * UBS Lesson Messages - English
 *
 * English translations for the UBS (Ultimate Bug Scanner) lesson component.
 */

export const ubsLessonMessages = {
  goalBanner: {
    content: "Learn to catch bugs before they reach production with UBS.",
  },

  whatIsUbs: {
    title: "What Is UBS?",
    highlightText: "UBS (Ultimate Bug Scanner)",
    description: "is your safety net before every commit. It scans your code for common bugs, security issues, and anti-patterns that might slip through during development.",
    analogy: "Think of it as a code review bot that catches issues in seconds, not hours.",

    features: {
      securityScanning: {
        title: "Security Scanning",
        description: "XSS, injection, and OWASP vulnerabilities",
      },
      bugDetection: {
        title: "Bug Detection",
        description: "Null safety, async/await, type issues",
      },
      fastFeedback: {
        title: "Fast Feedback",
        description: "Scan a file in under 1 second",
      },
      multiLanguage: {
        title: "Multi-Language",
        description: "TypeScript, Python, Rust, Go, and more",
      },
    },
  },

  goldenRule: {
    title: "The Golden Rule",
    mainRule: "before every commit.",
    explanation: "Exit 0 = safe to commit. Exit >0 = fix issues first.",
  },

  essentialCommands: {
    title: "Essential Commands",
    commands: [
      {
        command: "ubs file.ts",
        description: "Scan a specific file (fastest)",
      },
      {
        command: "ubs src/",
        description: "Scan a directory",
      },
      {
        command: "ubs $(git diff --name-only --cached)",
        description: "Scan staged files before commit",
      },
      {
        command: "ubs --only=js,python src/",
        description: "Filter by language (3-5x faster)",
      },
      {
        command: "ubs .",
        description: "Scan whole project (ignores node_modules)",
      },
    ],
    tip: {
      content: "Always scope to changed files when possible. ",
      example1: " runs in under 1 second, while ",
      example2: " may take 30+ seconds.",
    },
  },

  understandingOutput: {
    title: "Understanding Output",
    intro: "UBS output follows a consistent format:",
    outputCode: `⚠️  Null Safety (3 errors)
    src/api/users.ts:42:5 – Possible null dereference
    💡 Use optional chaining: user?.profile

    src/api/users.ts:87:12 – Unchecked array access
    💡 Add bounds check before accessing array[i]

⚠️  Security (1 error)
    src/api/auth.ts:23:8 – SQL injection risk
    💡 Use parameterized queries instead of string concat

Exit code: 1`,
    explainers: [
      {
        pattern: "file:line:col",
        meaning: "Exact location of the issue",
      },
      {
        pattern: "💡",
        meaning: "Suggested fix",
      },
      {
        pattern: "Exit code 0/1",
        meaning: "Pass (safe) / Fail (needs fixes)",
      },
    ],
  },

  bugSeverityGuide: {
    title: "Bug Severity Guide",
    levels: {
      critical: {
        level: "Critical",
        examples: [
          "Null safety violations",
          "XSS/Injection vulnerabilities",
          "Async/await issues",
          "Memory leaks",
        ],
        action: "Always fix immediately",
      },
      important: {
        level: "Important",
        examples: [
          "Type narrowing issues",
          "Division by zero risks",
          "Resource leaks",
          "Missing error handling",
        ],
        action: "Fix before production",
      },
      contextual: {
        level: "Contextual",
        examples: [
          "TODO/FIXME comments",
          "Console.log statements",
          "Unused variables",
          "Magic numbers",
        ],
        action: "Use judgment",
      },
    },
  },

  fixWorkflow: {
    title: "The Fix Workflow",
    steps: [
      {
        title: "Read finding",
        desc: "Understand the category and fix suggestion",
      },
      {
        title: "Navigate to location",
        desc: "Go to file:line:col",
      },
      {
        title: "Verify it's real",
        desc: "Not all findings are bugs—some are false positives",
      },
      {
        title: "Fix root cause",
        desc: "Don't just mask the symptom",
      },
      {
        title: "Re-run UBS",
        desc: "Confirm the fix worked (exit 0)",
      },
      {
        title: "Commit",
        desc: "Now you're safe to commit!",
      },
    ],
  },

  preCommitIntegration: {
    title: "Pre-Commit Integration",
    intro: "For maximum safety, add UBS to your pre-commit workflow:",
    codeExample: `# In your workflow:
$ git add .
$ ubs $(git diff --name-only --cached)
# If exit 0: proceed with commit
# If exit 1: fix issues first

$ git commit -m "feat: add user auth"`,
    tip: {
      content: "ACFS agents are trained to run ",
      automatically: " automatically before committing. You get this protection by default!",
    },
  },

  tryItNow: {
    title: "Try It Now",
    code: `# View session logs
$ ubs sessions --entries 1

# Scan your project
$ ubs .

# Get help
$ ubs --help`,
  },
};