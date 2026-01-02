/**
 * Git Basics Lesson Messages - English
 *
 * English translations for the Git Basics lesson component.
 */

export const gitBasicsLessonMessages = {
  goalBanner: {
    content: "Master git basics and recognize dangerous operations before they happen.",
  },

  whatIsGit: {
    title: "What Is Git?",
    highlightText: "Git",
    description: "is a version control system that tracks changes to your code over time. Think of it like a detailed history of every change you've ever made, with the ability to go back to any point.",

    features: {
      fullHistory: {
        title: "Full History",
        description: "Every change is recorded and reversible",
      },
      branching: {
        title: "Branching",
        description: "Work on features without affecting main code",
      },
      collaboration: {
        title: "Collaboration",
        description: "Multiple people can work on the same project",
      },
      safetyNet: {
        title: "Safety Net",
        description: "Recover from mistakes (if you know how)",
      },
    },
  },

  coreConcepts: {
    title: "Core Concepts",
    concepts: [
      {
        term: "Repository",
        definition: "A project folder tracked by git (contains a .git directory)",
        example: "git init creates a new repository",
      },
      {
        term: "Commit",
        definition: "A snapshot of your code at a point in time",
        example: "Like saving a checkpoint in a game",
      },
      {
        term: "Staging Area",
        definition: "Where you prepare changes before committing",
        example: "git add puts files in staging",
      },
      {
        term: "Branch",
        definition: "An independent line of development",
        example: "main, feature/login, bugfix/auth",
      },
      {
        term: "Remote",
        definition: "A copy of your repository on a server (like GitHub)",
        example: "origin is the default remote name",
      },
    ],
  },

  essentialCommands: {
    title: "Essential Commands",
    commands: [
      {
        command: "git status",
        description: "See what's changed (run this often!)",
      },
      {
        command: "git add <file>",
        description: "Stage a file for commit",
      },
      {
        command: "git add .",
        description: "Stage all changes",
      },
      {
        command: 'git commit -m "message"',
        description: "Create a commit with a message",
      },
      {
        command: "git push",
        description: "Upload commits to remote",
      },
      {
        command: "git pull",
        description: "Download and merge remote changes",
      },
      {
        command: "git log --oneline",
        description: "View commit history",
      },
      {
        command: "git diff",
        description: "See uncommitted changes",
      },
    ],
  },

  understandingGitignore: {
    title: "Understanding .gitignore",
    intro: "The ",
    description: " file tells git which files to ignore. This is ",
    criticalText: "critical for security",
    because: " because you never want to commit:",

    ignoreItems: [
      {
        pattern: ".env",
        reason: "Contains API keys and secrets",
        critical: true,
      },
      {
        pattern: "node_modules/",
        reason: "Dependencies (huge, regeneratable)",
        critical: false,
      },
      {
        pattern: ".venv/",
        reason: "Python virtual environments",
        critical: false,
      },
      {
        pattern: "*.log",
        reason: "Log files with potentially sensitive data",
        critical: false,
      },
      {
        pattern: "credentials.json",
        reason: "Service account keys",
        critical: true,
      },
      {
        pattern: ".claude/",
        reason: "Claude Code session data",
        critical: false,
      },
    ],

    warning: {
      bold: "Never commit secrets!",
      text: " If you accidentally commit an API key, consider it compromised. Rotate it immediately.",
    },
  },

  workingWithBranches: {
    title: "Working with Branches",
    commands: [
      {
        command: "git branch",
        description: "List all local branches",
      },
      {
        command: "git branch <name>",
        description: "Create a new branch",
      },
      {
        command: "git checkout <branch>",
        description: "Switch to a branch",
      },
      {
        command: "git checkout -b <name>",
        description: "Create and switch in one command",
      },
      {
        command: "git merge <branch>",
        description: "Merge branch into current branch",
      },
      {
        command: "git branch -d <name>",
        description: "Delete a merged branch",
      },
    ],
    tip: {
      content: "Always create a new branch for features or experiments. Keep ",
      stable: " stable.",
    },
  },

  dangerousOperations: {
    title: "Dangerous Operations",
    warning: {
      bold: "AI agents may propose these commands.",
      text: " Know what they do before approving them:",
    },

    commands: [
      {
        command: "git reset --hard",
        effect: "Destroys all uncommitted changes permanently",
        alternative: "git stash (saves changes for later)",
      },
      {
        command: "git clean -fd",
        effect: "Deletes all untracked files permanently",
        alternative: "Review with git clean -n first (dry run)",
      },
      {
        command: "git push --force",
        effect: "Overwrites remote history, can delete teammates' work",
        alternative: "git push --force-with-lease (safer)",
      },
      {
        command: "git checkout .",
        effect: "Discards all uncommitted changes to tracked files",
        alternative: "git stash or commit first",
      },
      {
        command: "git rebase main",
        effect: "Rewrites commit history (can cause conflicts)",
        alternative: "Only rebase unpushed commits",
      },
      {
        command: "rm -rf .git",
        effect: "Destroys entire repository history forever",
        alternative: "There is no alternative. Never do this.",
      },
    ],

    warningTip: {
      bold: "Before approving any git command from an agent:",
      steps: [
        "Run ",
        " to see current state",
        "Run ",
        " to save uncommitted work",
        "Only then proceed with destructive commands",
      ],
    },
  },

  recoveryTools: {
    title: "Recovery Tools",
    intro: "When things go wrong, these commands can help:",
    commands: [
      {
        command: "git stash",
        description: "Temporarily save uncommitted changes",
      },
      {
        command: "git stash pop",
        description: "Restore stashed changes",
      },
      {
        command: "git reflog",
        description: "View history of HEAD (find lost commits)",
      },
      {
        command: "git reset --soft HEAD~1",
        description: "Undo last commit, keep changes staged",
      },
      {
        command: "git checkout <file>",
        description: "Discard changes to a specific file",
      },
      {
        command: "git revert <commit>",
        description: "Create new commit that undoes a previous one",
      },
    ],
    codeExample: `# Lost a commit after reset --hard? Find it!
$ git reflog
# Look for your commit hash, then:
$ git checkout <hash>
# Or create a branch at that commit:
$ git branch recovery <hash>`,
  },

  bestPracticesWithAgents: {
    title: "Best Practices with Agents",
    practices: [
      {
        title: "Commit early and often",
        description: "Small commits are easier to revert. Agents work better with clear history.",
      },
      {
        title: "Always run git status before destructive commands",
        description: "Know what you're about to lose before you lose it.",
      },
      {
        title: "Use git stash as your safety net",
        description: "Stash uncommitted work before letting agents run risky operations.",
      },
      {
        title: "Review agent-proposed git commands",
        description: "Agents may suggest --force or reset --hard. Always understand before approving.",
      },
      {
        title: "Push your work frequently",
        description: "Remote backups protect against local disasters.",
      },
    ],
  },

  tryItNow: {
    title: "Try It Now",
    code: `# Check your repository status
$ git status

# View recent commits
$ git log --oneline -5

# See what's in your .gitignore
$ cat .gitignore

# Practice stashing (safe to try!)
$ echo "test" > temp.txt
$ git stash
$ git stash pop
$ rm temp.txt`,
  },

  // UI labels for helper components
  componentLabels: {
    examplePrefix: "Example:",
    securityRisk: "Security Risk",
  },
};