/**
 * Meta Skill Lesson Messages - English
 */

export const msMessages = {
  goalBanner: {
    content: "Master local-first skill management for Claude Code and other AI agents with Meta Skill."
  },
  sections: {
    whatIsMetaSkill: {
      title: "What Is Meta Skill?",
      intro: "Meta Skill (ms) is a local-first knowledge management platform that turns operational knowledge into structured, searchable, reusable artifacts with Git-backed audit trails.",
      details: "It combines BM25 lexical matching with deterministic hash embeddings for hybrid semantic search. No external APIs required. Skills can come from hand-written files, CASS session mining, or bundle imports."
    },
    essentialCommands: {
      title: "Essential Commands",
      tipContent: "Install popular skills directly: ms install code-review"
    },
    workingWithSkills: {
      title: "Working with Skills",
      content: "Once installed, skills are automatically available in Claude Code. Use them with the slash command syntax."
    }
  },
  featureCards: {
    localFirst: {
      title: "Local-First",
      description: "Skills stored on your machine, no cloud dependency"
    },
    easyInstall: {
      title: "Easy Install",
      description: "One command to install from JeffreysPrompts"
    },
    browseSkills: {
      title: "Browse Skills",
      description: "Discover and search available skills"
    },
    manage: {
      title: "Manage",
      description: "Update, disable, and organize your skills"
    }
  },
  commands: [
    { command: 'ms list', description: 'List all installed skills' },
    { command: 'ms install <skill>', description: 'Install a skill from registry' },
    { command: 'ms uninstall <skill>', description: 'Remove an installed skill' },
    { command: 'ms update', description: 'Update all installed skills' },
    { command: 'ms doctor', description: 'Check skill system health' },
    { command: 'ms search <query>', description: 'Search for skills in registry' },
  ],
  codeBlock: {
    content: `# List your installed skills
ms list

# Install a skill
ms install idea-wizard

# Use it in Claude Code
/idea-wizard "build a todo app"

# Update all skills to latest versions
ms update`
  }
} as const;

export type MsMessages = typeof msMessages;