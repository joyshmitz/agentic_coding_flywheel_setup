/**
 * Safety Tools Lesson Messages - English (Default)
 *
 * All user-facing text for the safety-tools lesson component.
 * Organized by component structure for easy maintenance.
 */

export const safetyToolsLessonMessages = {
  goalBanner: {
    content: "Use SLB and CAAM for safety and account management.",
  },

  introduction: {
    title: "Safety First",
    intro: "AI agents are powerful but can cause damage if misused. The Dicklesworthstone stack includes two safety tools:",
    slb: {
      title: "SLB",
      description: "Two-person rule for dangerous commands",
    },
    caam: {
      title: "CAAM",
      description: "Agent authentication switching",
    },
  },

  slbSection: {
    title: "SLB: Simultaneous Launch Button",
    intro: {
      highlight: "SLB",
      text: " implements a \"two-person rule\" for dangerous commands. Just like nuclear launch codes require two keys, SLB requires two approvals before executing risky operations.",
    },
  },

  whenToUseSlb: {
    title: "When to Use SLB",
    dangerCards: {
      rmRf: {
        command: "rm -rf /",
        risk: "Deletes entire filesystem",
        slb: "Requires confirmation from two agents",
      },
      forcePush: {
        command: "git push --force origin main",
        risk: "Overwrites shared history",
        slb: "Requires explicit approval",
      },
      dropDatabase: {
        command: "DROP DATABASE production",
        risk: "Destroys production data",
        slb: "Two-person verification",
      },
      deleteNamespace: {
        command: "kubectl delete namespace prod",
        risk: "Takes down production services",
        slb: "Mandatory review",
      },
    },
    tipBox: {
      content: "Never bypass SLB protections. If a command requires two approvals, there's a reason. Get a second opinion.",
    },
  },

  slbCommands: {
    title: "SLB Commands",
    commands: {
      pending: {
        command: "slb pending",
        description: "Show pending requests",
      },
      run: {
        command: 'slb run "rm -rf /tmp" --reason "Clean build"',
        description: "Request approval and execute when approved",
      },
      approve: {
        command: "slb approve <id> --session-id <sid>",
        description: "Approve a pending request",
      },
      reject: {
        command: 'slb reject <id> --session-id <sid> --reason "..."',
        description: "Reject a pending request",
      },
      status: {
        command: "slb status <request-id>",
        description: "Check status of a specific request",
      },
    },
  },

  caamSection: {
    title: "CAAM: Coding Agent Account Manager",
    intro: {
      highlight: "CAAM",
      text: " enables sub-100ms account switching for subscription-based AI services (Claude Max, Codex CLI, Gemini Ultra). Swap OAuth tokens instantly without re-authenticating.",
    },
    features: {
      tokenManagement: {
        title: "Token Management",
        description: "Backup and restore OAuth tokens for each tool",
      },
      instantSwitching: {
        title: "Instant Switching",
        description: "Switch accounts in under 100ms via symlink swap",
      },
      multiTool: {
        title: "Multi-Tool Support",
        description: "Works with Claude, Codex, and Gemini CLIs",
      },
      profileBackup: {
        title: "Profile Backup",
        description: "Save profiles by email for easy restoration",
      },
    },
  },

  caamUseCases: {
    title: "CAAM Use Cases",
    useCases: {
      personalVsWork: {
        scenario: "Personal vs Work",
        description: "Switch between personal and work subscriptions",
      },
      rateLimits: {
        scenario: "Rate Limits",
        description: "Rotate to a fresh account when hitting usage caps",
      },
      costSeparation: {
        scenario: "Cost Separation",
        description: "Use different subscriptions for different projects",
      },
      multiAccount: {
        scenario: "Multi-Account",
        description: "Manage multiple Claude Max / Codex accounts",
      },
    },
  },

  caamCommands: {
    title: "CAAM Commands",
    commands: {
      list: {
        command: "caam ls [tool]",
        description: "List saved profiles (claude, codex, gemini)",
      },
      backup: {
        command: "caam backup <tool> <email>",
        description: "Save current auth as a named profile",
      },
      activate: {
        command: "caam activate <tool> <email>",
        description: "Activate a saved profile",
      },
      status: {
        command: "caam status [tool]",
        description: "Show currently active profile",
      },
      delete: {
        command: "caam delete <tool> <email>",
        description: "Remove a saved profile",
      },
    },
  },

  integration: {
    title: "Integration with Agents",
    intro: "Both SLB and CAAM integrate with Claude Code, Codex, and Gemini:",
    codeExample: `# Example: Dangerous command triggers SLB
$ claude "delete all test files"
> SLB: This command requires approval
> Waiting for second approval...
> Run 'slb approve req-123 --session-id <sid>' from another session

# Example: Switch Claude accounts for a project
$ caam activate claude work@company.com
> Activated profile 'work@company.com' for claude
> Symlink updated in 47ms

$ claude "continue the project"
> Using profile: work@company.com`,
  },

  bestPractices: {
    title: "Best Practices",
    slbSection: {
      title: "SLB Best Practices",
      practices: {
        neverBypass: "Never bypass approval requirements",
        reviewCommands: "Review commands before approving",
        useDescriptive: "Use descriptive request messages",
        setupNotifications: "Set up notifications for pending requests",
      },
    },
    caamSection: {
      title: "CAAM Best Practices",
      practices: {
        backupProfiles: "Backup profiles before switching",
        useEmail: "Use email as profile identifier",
        verifyActive: "Verify active profile with caam status",
        deleteOld: "Delete old profiles when no longer needed",
      },
    },
  },

  quickReference: {
    title: "Quick Reference",
    slbCommands: ["slb pending", "slb run <cmd> --reason ...", "slb approve <id> --session-id ...", "slb status <id>"],
    caamCommands: ["caam ls [tool]", "caam backup <tool> <email>", "caam activate <tool> <email>", "caam status [tool]"],
  },

  slbDiagram: {
    dangerousCommand: "Dangerous Command",
    agent1: "Agent 1",
    agent2: "Agent 2",
    safeToExecute: "Safe to Execute",
    twoApprovalsReceived: "Two approvals received",
  },
};