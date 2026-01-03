/**
 * Learn Page Messages - English (Default)
 *
 * All user-facing text for the learning hub page.
 */

export const learnMessages = {
  hero: {
    title: "Learning Hub",
    subtitlePrefix: "Master your ",
    subtitleTerm: "agentic",
    subtitleSuffix: " coding environment with hands-on lessons.",
    subtitleExtended: "Start from the basics and progress to advanced workflows.",
  },

  progress: {
    title: "Your Progress",
    lessonsComplete: "lessons complete",
    continueButton: "Continue Learning",
    congratulations: "Congratulations! You've mastered all lessons.",
    upNext: "Up next:",
    beginJourney: "Begin your learning journey",
  },

  sections: {
    allLessons: "All Lessons",
    quickReference: "Quick Reference",
  },

  quickRef: {
    agentCommands: {
      title: "Agent Commands",
      description: "Claude, Codex, Gemini shortcuts",
    },
    ntmCommands: {
      title: "NTM Commands",
      description: "Session management reference",
    },
    commandReference: {
      title: "Command Reference",
      description: "Searchable list of key commands",
    },
    glossary: {
      title: "Glossary",
      description: "Definitions for all jargon terms",
    },
  },

  navigation: {
    home: "Home",
    setupWizard: "Setup Wizard",
    toNavigate: "to navigate",
  },

  footer: {
    needSetupPrefix: "Need to set up your ",
    needSetupSuffix: " first?",
    startWizard: "Start the setup wizard",
  },

  mobile: {
    upNext: "Up next",
    continue: "Continue",
  },

  lessonCard: {
    locked: "Locked",
    current: "Current",
    completed: "Completed",
  },

  // Lesson page (lesson-content.tsx)
  lessonPage: {
    sidebar: {
      title: "Learning Hub",
      academy: "ACFS Academy",
      progress: "Progress",
      of: "of",
      remaining: "remaining",
      now: "NOW",
      backToHome: "Back to Home",
    },
    header: {
      back: "Back",
      lesson: "Lesson",
    },
    meta: {
      completed: "Completed",
    },
    setupPrompt: {
      title: "New to ACFS?",
      description: "Complete the setup wizard first to get the most from these lessons.",
      goTo: "Go to",
    },
    completion: {
      mastered: "Lesson mastered!",
      readyToLevelUp: "Ready to level up?",
      outstandingWork: "Outstanding work! Continue to the next lesson.",
      allComplete: "You've completed the entire curriculum!",
      markToTrack: "Mark complete to track your learning progress.",
    },
    buttons: {
      nextLesson: "Next Lesson",
      allComplete: "All Complete",
      markComplete: "Mark Complete",
      next: "Next",
      done: "Done",
      complete: "Complete",
    },
    nav: {
      previous: "Previous",
      next: "Next",
    },
    error: {
      contentNotFound: "Lesson content not found for:",
    },
  },
};
