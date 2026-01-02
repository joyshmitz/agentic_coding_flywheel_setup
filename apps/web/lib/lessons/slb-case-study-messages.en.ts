/**
 * SLB Case Study Lesson Messages - English (Default)
 *
 * All user-facing text for the SLB case study lesson component.
 * Demonstrates a complete flywheel workflow from tweet to working code.
 */

export const slbCaseStudyLessonMessages = {
  goalBanner: {
    content: "Watch how a tweet becomes working code in one evening using the flywheel workflow.",
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
    title: "Feedback Loop: Multiple Perspectives",

    models: {
      claude: {
        name: "Claude Sonnet 4",
        focus: "User experience design",
      },
      gemini: {
        name: "Gemini 3 Deep Think",
        focus: "Edge case analysis",
      },
      gpt: {
        name: "GPT 5.2 Pro",
        focus: "Safety reasoning",
      },
      synthesis: {
        name: "Claude (synthesis)",
        focus: "Best parts integration",
      },
    },

    insight: "Each model brought unique perspectives. Claude focused on UX, Gemini on edge cases, GPT on safety. The synthesis combined the best ideas into a coherent plan.",
  },

  planToBeads: {
    title: "From Plan to Beads",
    description: "The plan was broken into actionable \"beads\" - small, testable units of work that could be completed and verified quickly.",
    beadCount: "693 total beads created in the planning phase",
  },

  whatSlbDoes: {
    title: "What SLB Actually Does",
    description: "SLB (Safety Lock Buddy) provides peer review for dangerous shell commands before execution.",

    features: {
      commandAnalysis: "Analyzes commands for potential risks",
      peerReview: "Routes dangerous commands to another agent for review",
      safetyCategories: "Categorizes commands by risk level",
      contextAware: "Understands project context and user intent",
    },

    riskTiers: {
      critical: {
        title: "Critical Risk",
        commands: ["rm -rf /", "sudo chmod 777 /", "kill -9 $(pgrep .)"],
        action: "Block and require human confirmation",
      },
      dangerous: {
        title: "Dangerous",
        commands: ["kubectl delete", "git push --force", "DROP TABLE"],
        action: "Require peer agent review",
      },
      caution: {
        title: "Caution",
        commands: ["rm *.log", "git reset --hard", "npm run build"],
        action: "Show warning, proceed if confirmed",
      },
      safe: {
        title: "Safe",
        commands: ["ls", "git status", "cat README.md"],
        action: "Execute immediately",
      },
    },
  },

  implementationSprint: {
    title: "Implementation Sprint",
    description: "With the plan in place, implementation began using the agent flywheel approach.",
  },

  smallVsLarge: {
    title: "Small Projects vs. Large: Different Strategies",

    smallProject: {
      title: "Small Project Approach (SLB)",
      characteristics: [
        "Single developer, clear scope",
        "Can be completed in days/weeks",
        "Simple architecture sufficient",
      ],
      strategy: "Fast iteration, rapid feedback, minimal overhead",
      tools: "Claude Code, simple tooling, direct deployment",
    },

    largeProject: {
      title: "Large Project Approach",
      characteristics: [
        "Multiple developers, complex scope",
        "Takes months/years to complete",
        "Requires robust architecture",
      ],
      strategy: "Planned coordination, structured processes, comprehensive testing",
      tools: "Multiple agents, formal workflows, enterprise tooling",
    },
  },

  lessonsLearned: {
    title: "Lessons Learned",
    lessons: [
      {
        lesson: "Speed trumps perfection in early stages",
        explanation: "Getting something working quickly creates momentum and reveals real requirements",
      },
      {
        lesson: "Multiple model perspectives improve planning",
        explanation: "Different AI models notice different aspects of the problem",
      },
      {
        lesson: "Breaking work into beads enables progress tracking",
        explanation: "Small, testable units make progress visible and debugging easier",
      },
      {
        lesson: "Real user feedback comes from real deployment",
        explanation: "Internal testing misses issues that only appear with actual users",
      },
    ],
  },

  tryItYourself: {
    title: "Try It Yourself",
    description: "Ready to build your own tool using the flywheel approach?",
    steps: [
      "Find a problem that annoys you daily",
      "Spend 1 hour planning with AI assistance",
      "Break the plan into small, testable beads",
      "Start coding and deploy early",
      "Iterate based on real usage",
    ],
  },

  timeline: {
    title: "SLB Development Timeline",
    events: [
      {
        time: "Hour 0",
        event: "Idea sparked from Twitter conversation",
        action: "Immediate planning session with multiple AI models",
      },
      {
        time: "Hour 1",
        event: "Plan complete, 693 beads identified",
        action: "Begin implementation sprint",
      },
      {
        time: "Hour 6",
        event: "MVP working locally",
        action: "First deployment and testing",
      },
      {
        time: "Day 1",
        event: "Basic functionality complete",
        action: "Share with first users for feedback",
      },
      {
        time: "Week 1",
        event: "Production-ready version",
        action: "Public release and user onboarding",
      },
    ],
  },

  ideaCard: {
    originalIdea: "What if dangerous commands required peer review from another agent?",
    finalImplementation: "SLB provides multi-tiered safety checking for shell commands with agent-based peer review for risky operations.",
    transformation: "Simple idea → Working tool in one day",
  },

  beadsResult: {
    title: "The Power of Beads",
    totalBeads: 693,
    completedFirstDay: 589,
    percentComplete: "85%",
    insight: "Breaking work into small beads made progress visible and debugging straightforward.",
  },

  implementationResults: {
    title: "Implementation Results",
    codeGenerated: "2,847 lines across 23 files",
    testsWritten: "156 test cases with 94% coverage",
    deploymentTime: "12 minutes from code to production",
  },

  codeBlocks: {
    commandAnalysis: {
      title: "Command Risk Analysis",
      code: `def analyze_command_risk(command: str, context: dict) -> RiskLevel:
    # Parse command structure
    tokens = shlex.split(command)
    cmd = tokens[0] if tokens else ""

    # Check critical patterns
    if any(pattern in command for pattern in CRITICAL_PATTERNS):
        return RiskLevel.CRITICAL

    # Check dangerous patterns with context
    if is_dangerous_in_context(command, context):
        return RiskLevel.DANGEROUS

    # Default safety checks
    return assess_default_risk(tokens)`,
    },
    peerReview: {
      title: "Peer Review Request",
      code: `async def request_peer_review(command: str, risk: RiskLevel) -> ReviewResult:
    review_request = {
        "command": command,
        "risk_level": risk.value,
        "context": get_execution_context(),
        "requester": get_current_agent_id()
    }

    # Route to appropriate reviewer
    reviewer = await get_available_peer_agent()
    result = await reviewer.review_command(review_request)

    return ReviewResult(
        approved=result.approved,
        feedback=result.feedback,
        modifications=result.suggested_changes
    )`,
    },
    safetyGates: {
      title: "Safety Gate Implementation",
      code: `class SafetyGate:
    def __init__(self):
        self.risk_analyzer = CommandRiskAnalyzer()
        self.peer_reviewer = PeerReviewer()

    async def check_command(self, command: str) -> ExecutionDecision:
        risk = self.risk_analyzer.analyze(command)

        if risk == RiskLevel.SAFE:
            return ExecutionDecision.PROCEED

        if risk == RiskLevel.CRITICAL:
            return ExecutionDecision.BLOCK

        # Require peer review for dangerous commands
        review = await self.peer_reviewer.request_review(command, risk)
        return ExecutionDecision.PROCEED if review.approved else ExecutionDecision.BLOCK`,
    },
  },
};