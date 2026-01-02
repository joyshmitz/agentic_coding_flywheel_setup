/**
 * Prompt Engineering Lesson Messages - English (Default)
 *
 * All user-facing text for the prompt engineering lesson component.
 * Covers advanced prompting techniques for controlling AI agents with precision.
 */

export const promptEngineeringLessonMessages = {
  goalBanner: {
    content: "Master the art of controlling AI agents with precision and intention through advanced prompting.",
  },

  introduction: {
    title: "Why Prompts Matter",
    intro: "The difference between a mediocre agent session and a brilliant one often comes down to",
    howYouDirect: "how you direct the agent",
    dissects: "This lesson dissects the patterns that make prompts effective, based on real workflows that consistently deliver excellent results.",

    featureCards: {
      intensityCalibration: {
        title: "Intensity Calibration",
        description: "Signal how much attention to allocate",
      },
      scopeControl: {
        title: "Scope Control",
        description: "Expand or narrow the search space",
      },
      metacognition: {
        title: "Metacognition",
        description: "Force self-checking and reflection",
      },
      contextAnchoring: {
        title: "Context Anchoring",
        description: "Ground behavior in stable references",
      },
    },
  },

  fundamentals: {
    title: "Prompting Fundamentals",
    subtitle: "Building blocks of effective communication",

    clarity: {
      title: "Clarity and Specificity",
      description: "The foundation of good prompting is crystal-clear communication.",

      principles: [
        {
          principle: "Be Specific",
          bad: "\"Make this better\"",
          good: "\"Optimize this function for readability by adding comments and renaming variables to be more descriptive\"",
          why: "Specific requests get specific results",
        },
        {
          principle: "Define Success",
          bad: "\"Fix this bug\"",
          good: "\"Fix this bug so that the login form validates email format and shows appropriate error messages\"",
          why: "Clear success criteria prevent misunderstandings",
        },
        {
          principle: "Provide Context",
          bad: "\"Add error handling\"",
          good: "\"Add error handling to this API endpoint that gracefully handles network timeouts and invalid responses\"",
          why: "Context helps AI understand the full picture",
        },
      ],
    },

    structure: {
      title: "Prompt Structure",
      description: "Organize your prompts for maximum effectiveness:",

      template: {
        title: "Effective Prompt Template",
        structure: `**Context**: [What the AI needs to know]
**Task**: [What you want done]
**Constraints**: [Limitations and requirements]
**Format**: [How you want the output]
**Examples**: [If helpful, show what you mean]`,

        example: `**Context**: I'm building a REST API for a blog platform using Express.js and TypeScript.

**Task**: Create a middleware function for authentication that validates JWT tokens.

**Constraints**:
- Must work with existing user model
- Should return 401 for invalid tokens
- Must handle expired tokens gracefully

**Format**: TypeScript code with comments explaining the logic

**Examples**: Similar to how express-rate-limit middleware works`,
      },
    },

    iteration: {
      title: "Iterative Refinement",
      description: "Improve results through follow-up prompts:",

      strategies: [
        {
          strategy: "Clarifying Questions",
          description: "Ask AI to explain its reasoning",
          prompt: "\"Explain why you chose this approach over alternatives\"",
        },
        {
          strategy: "Incremental Improvement",
          description: "Build on previous responses",
          prompt: "\"Now add input validation to the function you just created\"",
        },
        {
          strategy: "Alternative Exploration",
          description: "Explore different solutions",
          prompt: "\"Show me 3 different ways to implement this feature\"",
        },
      ],
    },
  },

  techniques: {
    title: "Advanced Techniques",
    subtitle: "Sophisticated prompting patterns for complex tasks",

    chainOfThought: {
      title: "Chain-of-Thought Prompting",
      description: "Guide AI through step-by-step reasoning for complex problems.",

      technique: {
        explanation: "Ask AI to think through problems step by step, showing its work.",
        when: "Use for debugging, architecture decisions, or complex problem-solving.",
      },

      example: {
        title: "Debugging with Chain-of-Thought",
        prompt: `\"\"\"
I have a bug where users can't log in. Walk me through debugging this step by step:

1. First, tell me what could cause login failures
2. Then, suggest how to test each possibility
3. Finally, recommend the debugging order

Here's the login code:
[code snippet]
\"\"\"`,

        result: "AI provides systematic debugging approach rather than guessing",
      },
    },

    rolePrompting: {
      title: "Role-Based Prompting",
      description: "Assign specific roles to get specialized responses.",

      roles: [
        {
          role: "Senior Developer",
          prompt: "\"As a senior developer, review this code for potential issues...\"",
          use: "Code reviews and architecture advice",
        },
        {
          role: "DevOps Engineer",
          prompt: "\"From a DevOps perspective, how should we deploy this application?\"",
          use: "Deployment and infrastructure guidance",
        },
        {
          role: "Product Manager",
          prompt: "\"As a PM, how would you prioritize these feature requests?\"",
          use: "Feature planning and user experience",
        },
        {
          role: "Security Expert",
          prompt: "\"From a security standpoint, what vulnerabilities do you see?\"",
          use: "Security reviews and threat analysis",
        },
      ],
    },

    constraintPrompting: {
      title: "Constraint-Based Prompting",
      description: "Use limitations to guide better solutions.",

      constraintTypes: [
        {
          type: "Performance Constraints",
          example: "\"Optimize this function to handle 10,000+ items without blocking the UI\"",
          benefit: "Forces consideration of efficiency",
        },
        {
          type: "Technology Constraints",
          example: "\"Solve this using only vanilla JavaScript, no external libraries\"",
          benefit: "Encourages creative, minimal solutions",
        },
        {
          type: "Time Constraints",
          example: "\"Design a solution that can be implemented in 2 hours\"",
          benefit: "Prioritizes simplicity and practicality",
        },
        {
          type: "Compatibility Constraints",
          example: "\"Ensure this works with IE11 and modern browsers\"",
          benefit: "Considers real-world deployment challenges",
        },
      ],
    },

    metaPrompting: {
      title: "Meta-Prompting",
      description: "Prompts about prompting - getting AI to help you prompt better.",

      techniques: [
        {
          technique: "Prompt Optimization",
          prompt: "\"Help me improve this prompt to get better results: [your prompt]\"",
          use: "Refining your prompting skills",
        },
        {
          technique: "Task Analysis",
          prompt: "\"Break down this complex task into smaller, manageable prompts\"",
          use: "Handling large, complex projects",
        },
        {
          technique: "Context Assessment",
          prompt: "\"What additional context would you need to give a better answer?\"",
          use: "Understanding what information to provide",
        },
      ],
    },
  },

  agentWorkflows: {
    title: "Multi-Agent Workflows",
    subtitle: "Coordinating multiple AI agents for complex tasks",

    overview: {
      description: "Advanced flywheel development often involves multiple AI agents working together. Effective prompting becomes crucial for coordination.",
    },

    agentRoles: {
      title: "Specialized Agent Roles",
      description: "Different agents excel at different tasks when prompted appropriately:",

      specialists: [
        {
          role: "Code Generator Agent",
          specialty: "Writing implementation code",
          promptPattern: "\"Write production-ready [language] code that [specific requirement]...\"",
          bestPractices: [
            "Be specific about coding standards",
            "Include error handling requirements",
            "Specify testing needs",
          ],
        },
        {
          role: "Code Reviewer Agent",
          specialty: "Analyzing and improving existing code",
          promptPattern: "\"Review this code for [security/performance/readability], suggest improvements...\"",
          bestPractices: [
            "Define review criteria clearly",
            "Ask for specific feedback types",
            "Request prioritized recommendations",
          ],
        },
        {
          role: "Debugger Agent",
          specialty: "Finding and fixing issues",
          promptPattern: "\"Debug this error: [error details]. Here's the relevant code: [code]...\"",
          bestPractices: [
            "Provide complete error messages",
            "Include relevant code context",
            "Describe expected vs actual behavior",
          ],
        },
        {
          role: "Architect Agent",
          specialty: "System design and planning",
          promptPattern: "\"Design a system architecture for [requirements], considering [constraints]...\"",
          bestPractices: [
            "Clearly define requirements",
            "Specify constraints and limitations",
            "Ask for trade-off analysis",
          ],
        },
      ],
    },

    coordination: {
      title: "Agent Coordination Patterns",
      description: "Effective patterns for managing multi-agent workflows:",

      patterns: [
        {
          pattern: "Sequential Processing",
          description: "Agents work in a defined order, each building on the previous",
          example: "Architect → Code Generator → Code Reviewer → Debugger",
          promptStrategy: "Pass context and requirements through the chain",
          code: `# Sequential workflow example
architect_result = architect_agent.prompt(\"Design system for user auth\")
code_result = coder_agent.prompt(f\"Implement this design: {architect_result}\")
review_result = reviewer_agent.prompt(f\"Review this code: {code_result}\")`,
        },
        {
          pattern: "Parallel Processing",
          description: "Multiple agents work on different parts simultaneously",
          example: "Frontend agent + Backend agent + Database agent",
          promptStrategy: "Clear boundaries and interface definitions",
          code: `# Parallel workflow example
frontend_task = frontend_agent.prompt(\"Build UI for user dashboard\")
backend_task = backend_agent.prompt(\"Create API endpoints for dashboard\")
db_task = db_agent.prompt(\"Design schema for user data\")

# Coordinate results
integration_plan = coordinator.prompt(f\"Integrate: {frontend_task}, {backend_task}, {db_task}\")`,
        },
        {
          pattern: "Review and Iterate",
          description: "Agents review each other's work and iterate",
          example: "Code Generator ↔ Code Reviewer cycle",
          promptStrategy: "Structured feedback and improvement loops",
          code: `# Iterative workflow example
code = generator.prompt(\"Create user authentication system\")

for iteration in range(3):
    review = reviewer.prompt(f\"Review and suggest improvements: {code}\")
    if review.approved:
        break
    code = generator.prompt(f\"Improve based on feedback: {review.feedback}\")`,
        },
      ],
    },

    communicationProtocols: {
      title: "Inter-Agent Communication",
      description: "Structured ways for agents to share information:",

      protocols: [
        {
          protocol: "Context Handoff",
          description: "Passing complete context between agents",
          template: `\"\"\"
Previous agent output: [previous result]
Context needed: [relevant background]
Your task: [specific assignment]
Success criteria: [how to measure success]
\"\"\"`,
        },
        {
          protocol: "Status Updates",
          description: "Agents report progress and blockers",
          template: `\"\"\"
Progress: [what's been completed]
Current status: [what's happening now]
Blockers: [what's preventing progress]
Next steps: [what happens next]
\"\"\"`,
        },
        {
          protocol: "Decision Points",
          description: "Agents collaborate on decisions",
          template: `\"\"\"
Decision needed: [what needs to be decided]
Options considered: [alternatives evaluated]
Recommendation: [preferred choice with reasoning]
Approval needed: [who should sign off]
\"\"\"`,
        },
      ],
    },
  },

  contextManagement: {
    title: "Context Management",
    subtitle: "Keeping AI agents informed and focused",

    importanceOfContext: {
      title: "Why Context Matters",
      description: "AI agents perform better when they understand the full picture.",

      benefits: [
        "More accurate and relevant responses",
        "Better decision-making and recommendations",
        "Reduced need for follow-up clarifications",
        "Consistent behavior across interactions",
      ],
    },

    contextTypes: {
      title: "Types of Context",
      description: "Different kinds of information that help AI agents:",

      types: [
        {
          type: "Project Context",
          description: "Overall project goals, constraints, and requirements",
          example: "\"This is a React app for a e-commerce store, targeting mobile users, with a focus on performance\"",
          when: "Include at the start of any new conversation or major task",
        },
        {
          type: "Technical Context",
          description: "Technology stack, architecture, and technical constraints",
          example: "\"We use TypeScript, Next.js, and PostgreSQL. All API calls must handle 429 rate limiting\"",
          when: "Include when asking for implementation guidance",
        },
        {
          type: "Business Context",
          description: "User needs, business requirements, and success metrics",
          example: "\"Users need to complete checkout in under 30 seconds. Conversion rate is our key metric\"",
          when: "Include when making product or UX decisions",
        },
        {
          type: "Historical Context",
          description: "Previous decisions, attempts, and lessons learned",
          example: "\"We tried using Redux but it was too complex for our needs. State management should be simple\"",
          when: "Include to avoid repeating past mistakes",
        },
      ],
    },

    contextStrategies: {
      title: "Context Management Strategies",
      description: "Effective ways to provide and maintain context:",

      strategies: [
        {
          strategy: "Context Documents",
          description: "Maintain living documents that agents can reference",
          implementation: `# project-context.md
## Project Overview
- Goals: [project goals]
- Users: [target audience]
- Constraints: [limitations and requirements]

## Technical Stack
- Frontend: [technologies]
- Backend: [technologies]
- Database: [database choice]

## Architecture Decisions
- [Decision 1]: [reasoning]
- [Decision 2]: [reasoning]`,
          benefits: ["Consistent context across sessions", "Easy to update and maintain"],
        },
        {
          strategy: "Progressive Context Building",
          description: "Start with minimal context and add details as needed",
          example: `# Initial prompt
\"\"\"
Context: Building a user authentication system
Task: Create login form component
\"\"\"

# Follow-up with more context
\"\"\"
Additional context: This form needs to work with our existing JWT system
and handle 2FA. Security is critical.
Task: Add 2FA support to the login form
\"\"\"`,
          benefits: ["Avoids overwhelming with too much information", "Allows for focused responses"],
        },
        {
          strategy: "Context Validation",
          description: "Ask agents to confirm their understanding",
          prompt: "\"Based on this context, what do you understand about the project requirements?\"",
          benefits: ["Ensures context was understood correctly", "Identifies missing information"],
        },
      ],
    },
  },

  errorHandling: {
    title: "Handling AI Errors and Limitations",
    subtitle: "When prompts don't work as expected",

    commonProblems: {
      title: "Common Prompting Problems",
      description: "Issues you'll encounter and how to address them:",

      problems: [
        {
          problem: "Vague or Generic Responses",
          cause: "Prompt lacks specificity or context",
          solution: "Add more specific requirements and constraints",
          example: {
            bad: "\"Optimize this code\"",
            good: "\"Optimize this function for memory usage while maintaining readability\"",
          },
        },
        {
          problem: "Inconsistent Results",
          cause: "Ambiguous instructions or missing context",
          solution: "Use structured prompts with clear success criteria",
          example: {
            bad: "\"Make this better\"",
            good: "\"Improve error handling by adding try-catch blocks and user-friendly messages\"",
          },
        },
        {
          problem: "Overengineered Solutions",
          cause: "Lack of constraints or complexity guidelines",
          solution: "Specify simplicity requirements and constraints",
          example: {
            bad: "\"Build a caching system\"",
            good: "\"Build a simple in-memory caching system with a maximum of 50 lines of code\"",
          },
        },
      ],
    },

    debuggingPrompts: {
      title: "Debugging Prompt Issues",
      description: "Systematic approach to improving prompts that aren't working:",

      process: [
        {
          step: "Analyze the Response",
          description: "What specifically is wrong with the AI's output?",
          questions: [
            "Is the response too vague or too specific?",
            "Does it address the right problem?",
            "Is the format what you expected?",
            "Are there factual or logical errors?",
          ],
        },
        {
          step: "Identify the Gap",
          description: "What information or instruction was missing?",
          questions: [
            "What context did the AI not understand?",
            "What constraints weren't clear?",
            "What examples would have helped?",
            "What success criteria were missing?",
          ],
        },
        {
          step: "Refine the Prompt",
          description: "Make specific improvements based on the gap analysis",
          techniques: [
            "Add missing context or constraints",
            "Provide examples of desired output",
            "Break complex tasks into smaller steps",
            "Use more specific language",
          ],
        },
        {
          step: "Test and Iterate",
          description: "Try the improved prompt and continue refining",
          approach: "Make one change at a time to understand what works",
        },
      ],
    },

    recoveryStrategies: {
      title: "Recovery Strategies",
      description: "What to do when prompts fail completely:",

      strategies: [
        {
          strategy: "Reset and Simplify",
          description: "Start over with a much simpler version of the task",
          when: "Response is completely off-track or nonsensical",
          example: "Break 'build a complete user system' into 'create a user model'",
        },
        {
          strategy: "Ask for Clarification",
          description: "Have the AI explain what it understood from your prompt",
          when: "Responses seem to address a different problem",
          prompt: "\"What do you think I'm asking for? Explain your understanding of the task.\"",
        },
        {
          strategy: "Provide Examples",
          description: "Show exactly what you want with concrete examples",
          when: "Abstract requirements aren't being understood",
          approach: "Include input/output examples or reference implementations",
        },
        {
          strategy: "Change Perspective",
          description: "Try a completely different approach to the same problem",
          when: "Stuck in a loop of unsatisfactory responses",
          example: "Switch from 'implement X' to 'what are 3 ways to solve problem Y?'",
        },
      ],
    },
  },

  practicalExercises: {
    title: "Practical Exercises",
    subtitle: "Hands-on practice with real scenarios",

    beginnerExercises: {
      title: "Beginner Level",
      description: "Build foundational prompting skills:",

      exercises: [
        {
          exercise: "Clear Task Definition",
          goal: "Learn to write specific, actionable prompts",
          task: "Take this vague request: 'Make a website' and turn it into 5 specific, actionable prompts",
          criteria: "Each prompt should have clear success criteria and constraints",
          example: "Instead of 'Make a website', try 'Create an HTML page with a header, navigation menu, and footer using semantic HTML5 elements'",
        },
        {
          exercise: "Context Building",
          goal: "Practice providing appropriate context",
          task: "Write prompts for building a todo app, progressively adding more context in each iteration",
          iterations: [
            "Minimal context: Just the core request",
            "Technical context: Add technology requirements",
            "User context: Add user experience requirements",
            "Business context: Add project goals and constraints",
          ],
        },
        {
          exercise: "Error Prompt Improvement",
          goal: "Learn to identify and fix common prompt problems",
          task: "Fix these problematic prompts:",
          problems: [
            "\"Fix my code\" (no specifics)",
            "\"Make it faster\" (no metrics)",
            "\"Add features\" (no requirements)",
          ],
        },
      ],
    },

    intermediateExercises: {
      title: "Intermediate Level",
      description: "Develop advanced prompting techniques:",

      exercises: [
        {
          exercise: "Chain-of-Thought Debugging",
          goal: "Use systematic reasoning for complex problems",
          scenario: "Your React app is slow and users are complaining",
          task: "Write a chain-of-thought prompt to systematically diagnose and solve performance issues",
          template: "Guide the AI through: problem identification → hypothesis generation → testing approach → solution implementation",
        },
        {
          exercise: "Role-Based Architecture Review",
          goal: "Use different perspectives for comprehensive analysis",
          scenario: "You're building a microservices architecture",
          task: "Create prompts for different expert roles to review your architecture:",
          roles: ["Security expert", "Performance engineer", "DevOps specialist", "Frontend architect"],
        },
        {
          exercise: "Constraint-Based Design",
          goal: "Use limitations to drive creative solutions",
          challenge: "Design a real-time chat system with these constraints:",
          constraints: [
            "No external dependencies beyond Node.js standard library",
            "Must work with 1000+ concurrent users",
            "Must be deployable on a single server",
            "Development time: 1 week",
          ],
        },
      ],
    },

    advancedExercises: {
      title: "Advanced Level",
      description: "Master complex multi-agent workflows:",

      exercises: [
        {
          exercise: "Multi-Agent Project Planning",
          goal: "Coordinate multiple agents for a complex project",
          project: "Build a complete e-commerce platform",
          agents: [
            "Product Manager Agent: Define requirements and user stories",
            "Architect Agent: Design system architecture",
            "Frontend Agent: Build user interface",
            "Backend Agent: Implement API and business logic",
            "DevOps Agent: Handle deployment and infrastructure",
          ],
          challenge: "Create coordination prompts that ensure all agents work together effectively",
        },
        {
          exercise: "Adaptive Workflow Design",
          goal: "Create prompts that adapt based on results",
          scenario: "Build a system that automatically adjusts development strategy based on user feedback",
          requirements: [
            "Agents should analyze user feedback patterns",
            "Development priorities should shift based on data",
            "New features should be validated before full implementation",
            "System should learn from past successes and failures",
          ],
        },
        {
          exercise: "Meta-Prompt Optimization",
          goal: "Use AI to improve your own prompting",
          task: "Create a system where AI agents help you write better prompts",
          components: [
            "Prompt analyzer: Identifies weaknesses in current prompts",
            "Improvement suggester: Recommends specific enhancements",
            "Success predictor: Estimates likelihood of prompt success",
            "Feedback incorporator: Learns from prompt results",
          ],
        },
      ],
    },
  },

  realWorldPatterns: {
    title: "Real-World Patterns",
    subtitle: "Proven prompting patterns from successful projects",

    productDevelopment: {
      title: "Product Development Patterns",
      description: "Prompting patterns for building real products:",

      patterns: [
        {
          pattern: "Feature Discovery",
          description: "Systematically explore and validate new feature ideas",
          promptTemplate: `\"\"\"
As a product manager, analyze this user feedback: [feedback]

1. Identify the core user need
2. Suggest 3 potential solutions
3. Evaluate each solution for: feasibility, user impact, development effort
4. Recommend which solution to prototype first and why

Consider our current tech stack: [stack] and team size: [team]
\"\"\"`,
          useCase: "When you have user feedback but need to decide what to build",
        },
        {
          pattern: "Technical Debt Assessment",
          description: "Evaluate and prioritize technical debt",
          promptTemplate: `\"\"\"
Review this codebase for technical debt: [code/repo]

Analyze:
1. Code quality issues that impact development speed
2. Architecture problems that limit scalability
3. Security vulnerabilities that need immediate attention
4. Performance bottlenecks affecting user experience

For each issue, provide:
- Severity (High/Medium/Low)
- Effort to fix (Hours/Days/Weeks)
- Business impact if left unaddressed
- Recommended timeline for resolution
\"\"\"`,
          useCase: "Planning technical improvement sprints",
        },
      ],
    },

    codebaseManagement: {
      title: "Codebase Management Patterns",
      description: "Patterns for maintaining and evolving large codebases:",

      patterns: [
        {
          pattern: "Migration Planning",
          description: "Plan complex code migrations systematically",
          promptTemplate: `\"\"\"
Plan a migration from [old tech] to [new tech] for this project: [project description]

Create a detailed migration plan including:
1. Risk assessment and mitigation strategies
2. Step-by-step migration sequence
3. Testing strategy for each step
4. Rollback plans for each phase
5. Timeline estimates with dependencies
6. Resource requirements

Consider:
- Zero-downtime requirements: [yes/no]
- User impact tolerance: [high/medium/low]
- Team expertise with new tech: [high/medium/low]
\"\"\"`,
          useCase: "Major technology upgrades or framework migrations",
        },
        {
          pattern: "Code Review Automation",
          description: "Systematic automated code review",
          promptTemplate: `\"\"\"
Review this pull request for: [specific focus areas]

Check for:
1. Code quality: readability, maintainability, best practices
2. Security: potential vulnerabilities, data validation
3. Performance: inefficient algorithms, memory leaks
4. Architecture: design patterns, separation of concerns
5. Testing: test coverage, test quality

For each issue found:
- Severity level
- Specific line references
- Suggested improvement
- Explanation of why it matters

Files to review: [file list]
\"\"\"`,
          useCase: "Consistent, thorough code reviews",
        },
      ],
    },

    debuggingPatterns: {
      title: "Debugging Patterns",
      description: "Structured approaches to finding and fixing bugs:",

      patterns: [
        {
          pattern: "Systematic Bug Investigation",
          description: "Methodical approach to complex bugs",
          promptTemplate: `\"\"\"
Help me debug this issue: [problem description]

Error details: [error messages, stack traces]
Relevant code: [code snippets]
Steps to reproduce: [reproduction steps]

Please:
1. Analyze the error and identify the most likely causes
2. Suggest specific debugging steps in order of likelihood
3. For each step, explain what we're testing and what results to look for
4. Recommend tools or techniques for investigation
5. Suggest preventive measures to avoid similar bugs

Environment: [development/staging/production]
Urgency: [critical/high/medium/low]
\"\"\"`,
          useCase: "Complex bugs that need systematic investigation",
        },
        {
          pattern: "Performance Investigation",
          description: "Diagnosing performance issues systematically",
          promptTemplate: `\"\"\"
Investigate this performance issue: [performance problem description]

Symptoms: [what users are experiencing]
Metrics: [response times, error rates, etc.]
Recent changes: [deployments, configuration changes]

Analyze:
1. Most likely performance bottlenecks
2. Diagnostic steps to confirm each hypothesis
3. Quick wins vs. long-term solutions
4. Monitoring we should add to prevent recurrence

Current architecture: [brief description]
Scale: [users, requests, data size]
\"\"\"`,
          useCase: "Performance problems affecting users",
        },
      ],
    },
  },

  measuringSuccess: {
    title: "Measuring Prompt Effectiveness",
    subtitle: "How to know if your prompts are working",

    metrics: {
      title: "Key Metrics",
      description: "Ways to measure prompt effectiveness:",

      quantitativeMetrics: [
        {
          metric: "First Response Accuracy",
          measurement: "Percentage of prompts that get usable results on first try",
          target: "Aim for 80%+ for routine tasks",
          improvement: "Add more context and constraints to improve this metric",
        },
        {
          metric: "Iteration Count",
          measurement: "Average number of follow-up prompts needed to complete a task",
          target: "Less than 3 iterations for most tasks",
          improvement: "Better initial prompts reduce back-and-forth",
        },
        {
          metric: "Task Completion Rate",
          measurement: "Percentage of prompted tasks that get fully completed",
          target: "95%+ for clearly defined tasks",
          improvement: "Break down complex tasks into smaller, clearer subtasks",
        },
      ],

      qualitativeMetrics: [
        {
          metric: "Code Quality",
          measurement: "Subjective assessment of generated code quality",
          evaluation: "Readability, maintainability, performance, security",
          improvement: "Include quality criteria in prompts",
        },
        {
          metric: "Solution Appropriateness",
          measurement: "How well solutions fit the actual problem and constraints",
          evaluation: "Does it solve the right problem? Does it fit the context?",
          improvement: "Provide better context and validate understanding",
        },
        {
          metric: "Learning Value",
          measurement: "How much the interaction teaches you",
          evaluation: "Did you learn something new? Can you apply it elsewhere?",
          improvement: "Ask for explanations and alternative approaches",
        },
      ],
    },

    improvementProcess: {
      title: "Continuous Improvement Process",
      description: "Systematic approach to getting better at prompting:",

      steps: [
        {
          step: "Track Your Prompts",
          description: "Keep a record of prompts and their effectiveness",
          implementation: "Use a simple spreadsheet or notes app to track what works",
          fields: ["Prompt text", "Expected result", "Actual result", "Effectiveness (1-5)", "Notes"],
        },
        {
          step: "Identify Patterns",
          description: "Look for what makes your best prompts successful",
          analysis: [
            "Which prompts consistently get good results?",
            "What common elements do successful prompts share?",
            "What types of tasks are you struggling with?",
            "Where do you most often need follow-up prompts?",
          ],
        },
        {
          step: "Create Templates",
          description: "Build reusable prompt templates for common tasks",
          benefit: "Consistency and efficiency in routine prompting",
          examples: ["Code review template", "Bug analysis template", "Architecture design template"],
        },
        {
          step: "Regular Review",
          description: "Periodically review and refine your prompting approach",
          frequency: "Weekly for active development, monthly for maintenance",
          focus: "Update templates, identify new patterns, address weak areas",
        },
      ],
    },
  },

  futureDirections: {
    title: "Future of Prompt Engineering",
    subtitle: "Where the field is heading",

    emergingTrends: {
      title: "Emerging Trends",
      description: "New developments in prompt engineering:",

      trends: [
        {
          trend: "Automated Prompt Optimization",
          description: "AI systems that improve prompts automatically",
          impact: "Reduced need for manual prompt tuning",
          timeline: "Available now in some tools, expanding rapidly",
        },
        {
          trend: "Context-Aware Prompting",
          description: "Systems that automatically include relevant context",
          impact: "Less manual context management required",
          timeline: "Early implementations available, major improvements expected",
        },
        {
          trend: "Multi-Modal Prompting",
          description: "Prompts that include text, images, audio, and other media",
          impact: "More natural and comprehensive communication with AI",
          timeline: "Basic capabilities available, significant expansion coming",
        },
        {
          trend: "Collaborative Prompting",
          description: "Multiple humans and AI agents working together on prompts",
          impact: "More sophisticated problem-solving capabilities",
          timeline: "Experimental now, production-ready in 1-2 years",
        },
      ],
    },

    preparingForTheFuture: {
      title: "Preparing for the Future",
      description: "How to stay ahead in prompt engineering:",

      strategies: [
        {
          strategy: "Focus on Fundamentals",
          description: "Master core prompting principles that will remain relevant",
          actions: [
            "Understand how to communicate clearly and specifically",
            "Learn to break down complex problems",
            "Practice iterative refinement techniques",
          ],
        },
        {
          strategy: "Experiment with New Tools",
          description: "Stay current with emerging prompting tools and techniques",
          actions: [
            "Try new AI models and platforms",
            "Experiment with prompt optimization tools",
            "Explore multi-modal prompting capabilities",
          ],
        },
        {
          strategy: "Build Prompt Libraries",
          description: "Create reusable collections of effective prompts",
          actions: [
            "Document successful prompt patterns",
            "Share and collaborate on prompt libraries",
            "Contribute to open-source prompt collections",
          ],
        },
      ],
    },
  },

  conclusion: {
    title: "Mastering Prompt Engineering",
    subtitle: "Your path to AI partnership",

    keyPrinciples: {
      title: "Remember These Core Principles",
      principles: [
        "Clarity beats cleverness - simple, clear prompts work better than complex ones",
        "Context is king - the more relevant context you provide, the better the results",
        "Iteration is normal - expect to refine prompts through multiple attempts",
        "Specificity pays off - detailed requirements lead to detailed solutions",
        "Practice makes perfect - prompting is a skill that improves with use",
      ],
    },

    nextSteps: {
      title: "Your Next Steps",
      description: "How to continue improving your prompt engineering skills:",

      actions: [
        {
          action: "Start a Prompt Journal",
          description: "Track what works and what doesn't in your daily prompting",
          benefit: "Build personal expertise through systematic observation",
        },
        {
          action: "Practice Daily",
          description: "Use AI agents for real work, not just experimentation",
          benefit: "Develop intuition for effective prompting in real scenarios",
        },
        {
          action: "Study Great Prompts",
          description: "Analyze prompts that get excellent results",
          benefit: "Learn patterns and techniques from successful examples",
        },
        {
          action: "Share and Learn",
          description: "Share your prompts with others and learn from their techniques",
          benefit: "Community knowledge accelerates individual learning",
        },
      ],
    },

    finalThought: {
      content: "Prompt engineering is the bridge between human intention and AI capability. Master this bridge, and you unlock the full potential of AI-assisted development. The flywheel spins faster when you and your AI agents communicate with precision and purpose.",
    },
  },

  // Pattern-based structure (used by component)
  pattern1: {
    title: "Pattern 1: Intensity Calibration",
    intro: "AI models allocate \"compute\" based on perceived task importance.",
    stackedModifiers: "Stacked modifiers",
    maxAttention: "signal that this task deserves maximum attention:",

    intensityExamples: [
      {
        phrase: "super carefully",
        effect: "Elevates attention above baseline",
      },
      {
        phrase: "super careful, methodical, and critical",
        effect: "Triple-stacking for maximum precision",
      },
      {
        phrase: "systematically and meticulously and intelligently",
        effect: "Emphasizes both process and quality",
      },
    ],

    notFillerWords: "These aren't filler words. They're",
    calibrationSignals: "calibration signals",
    allocateReasoning: "that tell the model to allocate more reasoning depth to the task.",

    claudeCodeFeature: {
      intro: "Claude Code feature:",
      ultrathinkDesc: "The word ultrathink is a specific Claude Code directive that tells the system to allocate significantly more thinking tokens. While it's a tool-level feature in Claude Code, using intensity words like \"think deeply\" or \"reason carefully\" can help other agents/models allocate more attention to complex tasks as well.",
    },
  },

  pattern2: {
    title: "Pattern 2: Scope Control",
    intro: "Models tend to take shortcuts. Explicit scope directives push against premature narrowing:",

    scopeCards: {
      expand: {
        title: "↔ Breadth",
        phrases: [
          "take ALL of that",
          "Don't restrict yourself",
          "cast a wider net",
          "comprehensive and granular",
        ],
      },
      deepen: {
        title: "↓ Depth",
        phrases: [
          "go super deep",
          "deeply investigate and understand",
          "trace their functionality and execution flows",
          "first-principle analysis",
        ],
      },
    },
  },

  pattern3: {
    title: "Pattern 3: Forcing Self-Verification",
    intro: "Questions trigger",
    metacognition: "metacognition",
    forcingModel: "—forcing the model to evaluate its own output before finalizing:",

    verificationQuestions: [
      {
        question: "Are you sure it makes sense?",
        purpose: "Basic sanity check",
      },
      {
        question: "Is it optimal?",
        purpose: "Pushes beyond 'good enough'",
      },
      {
        question: "Could we change anything to make the system work better for users?",
        purpose: "User-centric optimization",
      },
      {
        question: "Check over each bead super carefully",
        purpose: "Item-by-item review",
      },
    ],

    planSpacePrinciple: {
      title: "Plan Space Principle:",
      description: "Revising plans is 10x cheaper than debugging implementations. Force verification at the planning stage.",
    },
  },

  pattern4: {
    title: "Pattern 4: The Fresh Eyes Technique",
    intro: "Psychological reset techniques",
    helpAgents: "help agents approach code without prior assumptions or confirmation bias:",

    freshEyesTechniques: [
      {
        technique: "Explicit Reset",
        example: 'with "fresh eyes"',
        mechanism: "Signals to discard prior assumptions",
      },
      {
        technique: "Random Exploration",
        example: '"randomly explore the code files"',
        mechanism: "Avoids tunnel vision on expected locations",
      },
      {
        technique: "Peer Framing",
        example: '"reviewing code written by your fellow agents"',
        mechanism: "Creates psychological distance from own work",
      },
    ],
  },

  pattern5: {
    title: "Pattern 5: Temporal Awareness",
    intro: "Great prompts consider",
    futureContexts: "future contexts",
    agentWillContinue: "—the agent that will continue this work, the human who will review it, the \"future self\" who needs to understand it:",

    temporalConcepts: [
      {
        concept: "Future Self",
        description: "Write as if explaining to someone with no context",
      },
      {
        concept: "Self-Contained",
        description: "Output should work independently of current conversation",
      },
      {
        concept: "Over-Arching Goals",
        description: "Connect current work to bigger picture",
      },
    ],
  },

  pattern6: {
    title: "Pattern 6: Context Anchoring",
    intro: "Stable reference documents",
    agentsMd: "(like AGENTS.md) serve as behavioral anchors. Re-reading them is especially critical after context compaction.",

    whyMatters: {
      title: "Why this matters after compaction:",
      reasons: [
        {
          title: "Context decay:",
          description: "Rules lose salience as more content is added",
        },
        {
          title: "Summarization loss:",
          description: "Compaction may miss nuances",
        },
        {
          title: "Drift prevention:",
          description: "Periodic grounding prevents behavioral divergence",
        },
        {
          title: "Fresh frame:",
          description: "Re-reading establishes correct operating context",
        },
      ],
    },
  },

  pattern7: {
    title: "Pattern 7: First Principles Analysis",
    intro: "Push for",
    deepUnderstanding: "deep understanding",
    overSurface: "over surface-level pattern matching:",

    principleCards: [
      {
        principle: "Understand Before Fixing",
        description: "Trace execution flows and dependencies first",
      },
      {
        principle: "Root Cause Over Symptom",
        description: "Diagnose underlying issues, not surface manifestations",
      },
      {
        principle: "Larger Context",
        description: "Understand how code fits into overall workflows",
      },
    ],
  },

  puttingTogether: {
    title: "Putting It All Together",
    intro: "Here's a real prompt that combines multiple patterns:",

    patternAnalysis: {
      title: "Pattern Analysis",
      patterns: [
        { name: "Anchoring", line: "Reread AGENTS.md..." },
        { name: "Intensity", line: "Use ultrathink" },
        { name: "Fresh Eyes", line: "randomly explore" },
        { name: "Scope (depth)", line: "deeply investigate and understand" },
        { name: "First Principles", line: "trace their functionality" },
        { name: "Context First", line: "Once you understand...larger context" },
        { name: "Intensity (stacked)", line: "super careful, methodical, and critical" },
        { name: "Fresh Eyes", line: 'with "fresh eyes"' },
        { name: "Scope (breadth)", line: "any obvious bugs, problems, errors, issues..." },
        { name: "Intensity (triple)", line: "systematically and meticulously and intelligently" },
        { name: "Anchoring", line: "comply with ALL rules" },
      ],
    },
  },

  quickReference: {
    title: "Quick Reference",
    tableHeaders: {
      pattern: "Pattern",
      when: "When",
      keyPhrases: "Key Phrases",
    },
    items: [
      {
        pattern: "Intensity",
        when: "Tasks requiring maximum precision",
        keyPhrases: "super carefully, methodical, use ultrathink",
      },
      {
        pattern: "Scope Expansion",
        when: "Avoiding narrow focus or shortcuts",
        keyPhrases: "take ALL, cast wider net, comprehensive",
      },
      {
        pattern: "Self-Verification",
        when: "Before implementing or finalizing",
        keyPhrases: "are you sure?, is it optimal?, revise if needed",
      },
      {
        pattern: "Fresh Eyes",
        when: "Code review, finding missed issues",
        keyPhrases: "fresh eyes, fellow agents, randomly explore",
      },
      {
        pattern: "Temporal",
        when: "Creating persistent artifacts",
        keyPhrases: "future self, self-documenting, self-contained",
      },
      {
        pattern: "Anchoring",
        when: "After compaction or drift risk",
        keyPhrases: "reread AGENTS.md, comply with ALL rules",
      },
      {
        pattern: "First Principles",
        when: "Debugging or understanding complex code",
        keyPhrases: "root causes, first-principle, larger context",
      },
    ],
  },

  codeBlocks: {
    lowIntensity: `# Low intensity (default behavior)
"Check the code for bugs"

# High intensity (elevated attention)
"Do a super careful, methodical, and critical check
with fresh eyes to find any obvious bugs, problems,
errors, issues, silly mistakes, etc. and then
systematically and meticulously and intelligently
correct them."`,

    avoidingNarrow: `# Avoiding narrow focus
"Don't restrict yourself to the latest commits,
cast a wider net and go super deep!"

# Comprehensive coverage
"Take ALL of that and elaborate on it more,
then create a comprehensive and granular set..."

# Depth with breadth
"Randomly explore the code files in this project,
choosing code files to deeply investigate and understand
and trace their functionality and execution flows
through the related code files which they import
or which they are imported by."`,

    planReview: `# The Plan Review Pattern
"Check over each bead super carefully—
are you sure it makes sense?
Is it optimal?
Could we change anything to make the system work better?
If so, revise the beads.

It's a lot easier and faster to operate in 'plan space'
before we start implementing these things!"`,

    freshEyesReview: `# The Fresh Eyes Code Review
"I want you to carefully read over all of the new code
you just wrote and other existing code you just modified
with 'fresh eyes' looking super carefully for any obvious
bugs, errors, problems, issues, confusion, etc.
Carefully fix anything you uncover."

# Peer Review Framing
"Turn your attention to reviewing the code written by
your fellow agents and checking for any issues, bugs,
errors, problems, inefficiencies, security problems,
reliability issues, etc. and carefully diagnose their
underlying root causes using first-principle analysis."`,

    selfDocumenting: `# Self-Documenting Output
"Create a comprehensive set of beads with detailed comments
so that the whole thing is totally self-contained and
self-documenting (including relevant background,
reasoning/justification, considerations, etc.—
anything we'd want our 'future self' to know about
the goals and intentions and thought process and how it
serves the over-arching goals of the project)."`,

    postCompaction: `# The Post-Compaction Refresh
"Reread AGENTS.md so it's still fresh in your mind.
Use ultrathink."`,

    grounding: `# Grounding Throughout Work
"Be sure to comply with ALL rules in AGENTS.md and
ensure that any code you write or revise conforms to
the best practice guides referenced in the AGENTS.md file."

# Making Rules Explicit
"You may NOT delete any file or directory unless I
explicitly give the exact command in this session."`,

    rootCause: `# Root Cause Emphasis
"Carefully diagnose their underlying root causes
using first-principle analysis and then fix or
revise them if necessary."

# Context Before Action
"Once you understand the purpose of the code in
the larger context of the workflows, I want you
to do a super careful, methodical check..."`,

    combinedExample: `"Reread AGENTS.md so it's still fresh in your mind.
Use ultrathink.

I want you to sort of randomly explore the code files
in this project, choosing code files to deeply investigate
and understand and trace their functionality and execution
flows through the related code files which they import or
which they are imported by.

Once you understand the purpose of the code in the larger
context of the workflows, I want you to do a super careful,
methodical, and critical check with 'fresh eyes' to find
any obvious bugs, problems, errors, issues, silly mistakes,
etc. and then systematically and meticulously and
intelligently correct them.

Be sure to comply with ALL rules in AGENTS.md and ensure
that any code you write or revise conforms to the best
practice guides referenced in the AGENTS.md file."`,
  },
};