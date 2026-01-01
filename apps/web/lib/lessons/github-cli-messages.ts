/**
 * GitHub CLI Lesson Messages - English
 *
 * English translations for the GitHub CLI lesson component.
 */

export const githubCliLessonMessages = {
  goalBanner: {
    content: "Manage GitHub issues, PRs, releases, and actions from the command line.",
  },

  whatIsGithubCli: {
    title: "What Is GitHub CLI?",
    highlightText: "GitHub CLI (gh)",
    description: "lets you interact with GitHub directly from your terminal. No more switching between your editor and browser for common tasks.",

    features: {
      issues: {
        title: "Issues",
        description: "Create, view, and close issues",
      },
      pullRequests: {
        title: "Pull Requests",
        description: "Create, review, and merge PRs",
      },
      releases: {
        title: "Releases",
        description: "Create tags and releases",
      },
      actions: {
        title: "Actions",
        description: "View and manage workflows",
      },
    },

    tip: {
      content: "AI agents use ",
      description: " extensively for GitHub operations. Understanding these commands helps you review what agents propose.",
    },
  },

  authentication: {
    title: "Authentication",
    intro: "First, authenticate with your GitHub account:",
    codeExample: `# Interactive login (recommended)
$ gh auth login

# Check your auth status
$ gh auth status

# View current user
$ gh api user --jq '.login'`,
    tip: {
      content: "The interactive login will guide you through browser-based OAuth. Choose HTTPS for the git protocol unless you have SSH keys set up.",
    },
  },

  workingWithIssues: {
    title: "Working with Issues",
    commands: [
      {
        command: "gh issue list",
        description: "List open issues",
      },
      {
        command: "gh issue list --state all",
        description: "List all issues (open and closed)",
      },
      {
        command: "gh issue view 123",
        description: "View issue #123 details",
      },
      {
        command: 'gh issue create --title "Bug" --body "Description"',
        description: "Create a new issue",
      },
      {
        command: "gh issue close 123",
        description: "Close issue #123",
      },
      {
        command: 'gh issue comment 123 --body "Comment text"',
        description: "Add a comment to issue #123",
      },
    ],
    codeExample: `# Create an issue interactively
$ gh issue create

# Create with labels and assignee
$ gh issue create \\
  --title "Fix login bug" \\
  --body "Users can't login with email" \\
  --label bug \\
  --assignee @me`,
  },

  pullRequests: {
    title: "Pull Requests",
    intro: "Create and manage pull requests without leaving your terminal:",
    commands: [
      {
        command: "gh pr list",
        description: "List open pull requests",
      },
      {
        command: "gh pr view 456",
        description: "View PR #456 details",
      },
      {
        command: "gh pr create",
        description: "Create a PR (interactive)",
      },
      {
        command: "gh pr checkout 456",
        description: "Check out PR #456 locally",
      },
      {
        command: "gh pr merge 456",
        description: "Merge PR #456",
      },
      {
        command: "gh pr diff 456",
        description: "View PR diff",
      },
    ],
    codeExample: `# Create a PR with title and body
$ gh pr create \\
  --title "Add user authentication" \\
  --body "## Summary
Implements OAuth2 login flow.

## Test plan
- [x] Unit tests pass
- [ ] Manual testing on staging"

# Create a draft PR
$ gh pr create --draft

# Request review
$ gh pr edit 456 --add-reviewer username

# View PR checks status
$ gh pr checks 456`,
    tip: {
      content: "Agents often create PRs using heredocs for the body. This format is common: ",
    },
  },

  releasesAndTags: {
    title: "Releases & Tags",
    commands: [
      {
        command: "gh release list",
        description: "List releases",
      },
      {
        command: "gh release view v1.2.0",
        description: "View release details",
      },
      {
        command: 'gh release create v1.2.0 --notes "Release notes"',
        description: "Create a release with tag",
      },
      {
        command: "gh release create v1.2.0 --generate-notes",
        description: "Auto-generate notes from commits",
      },
      {
        command: "gh release download v1.2.0",
        description: "Download release assets",
      },
    ],
    codeExample: `# Create a release with assets
$ gh release create v2.0.0 \\
  --title "Version 2.0.0" \\
  --notes "Major update with new features" \\
  ./dist/*.zip

# Create a pre-release
$ gh release create v2.1.0-beta --prerelease

# Delete a release (be careful!)
$ gh release delete v1.0.0-test --yes`,
  },

  githubActions: {
    title: "GitHub Actions",
    intro: "Monitor and interact with your CI/CD workflows:",
    commands: [
      {
        command: "gh workflow list",
        description: "List all workflows",
      },
      {
        command: "gh run list",
        description: "List recent workflow runs",
      },
      {
        command: "gh run view 123456",
        description: "View run details",
      },
      {
        command: "gh run view 123456 --log",
        description: "View run logs",
      },
      {
        command: "gh run watch 123456",
        description: "Watch a run in real-time",
      },
      {
        command: "gh run rerun 123456",
        description: "Re-run a failed workflow",
      },
    ],
    codeExample: `# View failed runs
$ gh run list --status failure

# Trigger a workflow manually
$ gh workflow run build.yml

# Trigger with inputs
$ gh workflow run deploy.yml -f environment=staging

# View job logs for a specific job
$ gh run view 123456 --job 789 --log`,
  },

  repositoryOperations: {
    title: "Repository Operations",
    commands: [
      {
        command: "gh repo view",
        description: "View current repo info",
      },
      {
        command: "gh repo clone owner/repo",
        description: "Clone a repository",
      },
      {
        command: "gh repo fork",
        description: "Fork current repo",
      },
      {
        command: "gh repo create my-project --public",
        description: "Create a new repository",
      },
      {
        command: "gh browse",
        description: "Open repo in browser",
      },
      {
        command: "gh browse issues",
        description: "Open issues page in browser",
      },
    ],
  },

  directApiAccess: {
    title: "Direct API Access",
    intro: "For advanced use cases, access the GitHub API directly:",
    codeExample: `# Get repo info as JSON
$ gh api repos/owner/repo

# List PR comments
$ gh api repos/owner/repo/pulls/123/comments

# Use jq to extract specific fields
$ gh api user --jq '.login, .email'

# POST to create something
$ gh api repos/owner/repo/issues \\
  -f title="API created issue" \\
  -f body="Created via gh api"`,
    tip: {
      content: "Agents use ",
      description: " for operations not covered by the standard commands. Review these carefully as they have full API access.",
    },
  },

  bestPractices: {
    title: "Best Practices",
    practices: [
      {
        title: "Always review PR details before merging",
        description: "Use gh pr view and gh pr diff to understand changes.",
      },
      {
        title: "Use --dry-run where available",
        description: "Some commands support --dry-run to preview actions.",
      },
      {
        title: "Check workflow status before deploying",
        description: "Run gh run list to ensure CI passed before releasing.",
      },
      {
        title: "Use labels and milestones",
        description: "Organize issues with --label and --milestone flags.",
      },
      {
        title: "Review agent-created PRs carefully",
        description: "Agents may create PRs automatically. Always review before merging.",
      },
    ],
  },

  tryItNow: {
    title: "Try It Now",
    code: `# Check if gh is installed and authenticated
$ gh auth status

# View the current repository
$ gh repo view

# List recent issues
$ gh issue list --limit 5

# List recent PRs
$ gh pr list --limit 5

# Check recent workflow runs
$ gh run list --limit 5`,
  },
};