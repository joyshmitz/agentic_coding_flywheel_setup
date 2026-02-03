/**
 * Meta Skill Lesson Messages - English
 *
 * Uses schema-based typing for i18n scalability.
 * Ukrainian and other translations use `as const satisfies MsMessagesSchema`
 * to get their own literal types while validating against the schema.
 */

// Schema interface - defines structure, values are string
export interface MsMessagesSchema {
  goalBanner: {
    content: string;
  };
  sections: {
    whatIsMetaSkill: {
      title: string;
      intro: string;
      details: string;
    };
    essentialCommands: {
      title: string;
      tipContent: string;
    };
    workingWithSkills: {
      title: string;
      content: string;
    };
  };
  featureCards: {
    localFirst: {
      title: string;
      description: string;
    };
    easyInstall: {
      title: string;
      description: string;
    };
    browseSkills: {
      title: string;
      description: string;
    };
    manage: {
      title: string;
      description: string;
    };
  };
  commands: ReadonlyArray<{
    command: string;
    description: string;
  }>;
  codeBlock: {
    content: string;
  };
}

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
} as const satisfies MsMessagesSchema;

// Export the type of English messages for components that need literal types
export type MsMessages = typeof msMessages;
