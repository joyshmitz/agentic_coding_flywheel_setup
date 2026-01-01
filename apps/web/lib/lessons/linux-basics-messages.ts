/**
 * Linux Basics Lesson Messages - English (Default)
 *
 * All user-facing text for the linux-basics lesson component.
 * Organized by component structure for easy maintenance.
 */

export const linuxBasicsLessonMessages = {
  goalBanner: {
    content: "Navigate the filesystem like a pro in 3 minutes.",
  },

  whereAmI: {
    title: "Where Am I?",
    intro: "First, let's find out where you are in the filesystem:",
    explanation: "This prints your current directory. You should see",
  },

  whatsHere: {
    title: "What's Here?",
    intro: "List the contents of your current directory:",
    aliasInfo: "With ACFS, this is aliased to",
    aliasDescription: "which shows beautiful icons.",

    variations: {
      title: "Try these variations:",
      commands: {
        ll: "Long format with details",
        la: "Show hidden files",
        tree: "Tree view of directories",
      },
    },
  },

  movingAround: {
    title: "Moving Around",
    intro: "Navigate the filesystem with the",
    command: "command:",

    commands: {
      cdProjects: "Go to the projects directory",
      cdHome: "Go home (shortcut)",
      cdUp: "Go up one level",
      cdPrevious: "Go to previous directory",
    },

    tipBox: {
      content: "With",
      toolName: "zoxide",
      description: "installed, you can use",
      jumpCommand: "to jump to",
      afterVisiting: "after visiting it once!",
    },
  },

  creatingThings: {
    title: "Creating Things",
    intro: "Create new directories and files:",

    commands: {
      mkdir: "Create a directory",
      mkcd: "Create AND cd into it (ACFS function)",
      touch: "Create an empty file",
    },
  },

  viewingFiles: {
    title: "Viewing Files",
    intro: "Read file contents in different ways:",

    commands: {
      cat: "Print entire file (aliased to bat)",
      less: "Scroll through file (q to quit)",
      head: "First 20 lines",
      tail: "Last 20 lines",
    },
  },

  deletingThings: {
    title: "Deleting Things",

    warningBox: {
      content: "There's no trash can in Linux.",
      emphasis: "Deleted = gone.",
    },

    commands: {
      rmFile: "Delete a file",
      rmDirectory: "Delete a directory (DANGEROUS!)",
    },
  },

  searching: {
    title: "Searching",
    intro: "Find files and search their contents:",

    commands: {
      ripgrep: "Search file contents (ripgrep)",
      fd: "Find files by name",
    },
  },

  verify: {
    title: "Verify You Learned It",
    intro: "Try this sequence to test your new skills:",

    verificationCard: {
      title: "All Commands Work?",
      subtitle: "You're ready for the next lesson!",
    },
  },
};