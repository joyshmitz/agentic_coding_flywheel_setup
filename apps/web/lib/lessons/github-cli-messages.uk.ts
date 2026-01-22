/**
 * GitHub CLI Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку GitHub CLI.
 * Технічні терміни залишаємо англійською: GitHub, CLI, gh, terminal, browser, OAuth, HTTPS, SSH, API, JSON, CI/CD, workflow, repository, pull request, PR, issue, release, tag, merge, commit, bash, jq, dry-run
 */

export const githubCliLessonMessagesUk = {
  goalBanner: {
    content: "Керуйте GitHub issue, PR, release та action з командного рядка.",
  },

  whatIsGithubCli: {
    title: "Що таке GitHub CLI?",
    highlightText: "GitHub CLI (gh)",
    description: "дозволяє взаємодіяти з GitHub безпосередньо з вашого terminal. Більше не потрібно перемикатися між редактором і browser для звичайних завдань.",

    features: {
      issues: {
        title: "Issue",
        description: "Створюйте, переглядайте та закривайте issue",
      },
      pullRequests: {
        title: "Pull Request",
        description: "Створюйте, рецензуйте та об'єднуйте PR",
      },
      releases: {
        title: "Release",
        description: "Створюйте tag та release",
      },
      actions: {
        title: "Action",
        description: "Переглядайте та керуйте workflow",
      },
    },

    tip: {
      content: "AI агенти активно використовують ",
      description: " для операцій з GitHub. Розуміння цих команд допомагає вам перевіряти те, що пропонують агенти.",
    },
  },

  authentication: {
    title: "Аутентифікація",
    intro: "Спочатку аутентифікуйтеся з вашим GitHub аккаунтом:",
    codeExample: `# Interactive login (recommended)
$ gh auth login

# Check authentication status
$ gh auth status

# View current user
$ gh api user --jq '.login'`,
    tip: {
      content: "Інтерактивний логін проведе вас через OAuth на основі browser. Виберіть HTTPS для git протоколу, якщо у вас не налаштовані SSH ключі.",
    },
  },

  workingWithIssues: {
    title: "Робота з Issue",
    commands: [
      {
        command: "gh issue list",
        description: "Список відкритих issue",
      },
      {
        command: "gh issue list --state all",
        description: "Список всіх issue (відкритих і закритих)",
      },
      {
        command: "gh issue view 123",
        description: "Переглянути деталі issue #123",
      },
      {
        command: 'gh issue create --title "Bug" --body "Description"',
        description: "Створити нову issue",
      },
      {
        command: "gh issue close 123",
        description: "Закрити issue #123",
      },
      {
        command: 'gh issue comment 123 --body "Comment text"',
        description: "Додати коментар до issue #123",
      },
    ],
    codeExample: `# Створити issue інтерактивно
$ gh issue create

# Створити з label та assignee
$ gh issue create \\
  --title "Fix login bug" \\
  --body "Users can't login with email" \\
  --label bug \\
  --assignee @me`,
  },

  pullRequests: {
    title: "Pull Request",
    intro: "Створюйте та керуйте pull request, не покидаючи ваш terminal:",
    commands: [
      {
        command: "gh pr list",
        description: "Список відкритих pull request",
      },
      {
        command: "gh pr view 456",
        description: "Переглянути деталі PR #456",
      },
      {
        command: "gh pr create",
        description: "Створити PR (інтерактивно)",
      },
      {
        command: "gh pr checkout 456",
        description: "Переключитися на PR #456 локально",
      },
      {
        command: "gh pr merge 456",
        description: "Об'єднати PR #456",
      },
      {
        command: "gh pr diff 456",
        description: "Переглянути diff PR",
      },
    ],
    codeExample: `# Створити PR з заголовком і тілом
$ gh pr create \\
  --title "Add user authentication" \\
  --body "## Summary
Implements OAuth2 login flow.

## Test plan
- [x] Unit tests pass
- [ ] Manual testing on staging"

# Створити draft PR
$ gh pr create --draft

# Запросити review
$ gh pr edit 456 --add-reviewer username

# Переглянути статус перевірок PR
$ gh pr checks 456`,
    tip: {
      content: "Агенти часто створюють PR використовуючи heredoc для тіла. Цей формат поширений: ",
    },
  },

  releasesAndTags: {
    title: "Release та Tag",
    commands: [
      {
        command: "gh release list",
        description: "Список release",
      },
      {
        command: "gh release view v1.2.0",
        description: "Переглянути деталі release",
      },
      {
        command: 'gh release create v1.2.0 --notes "Release notes"',
        description: "Створити release з tag",
      },
      {
        command: "gh release create v1.2.0 --generate-notes",
        description: "Автогенерувати нотатки з commit",
      },
      {
        command: "gh release download v1.2.0",
        description: "Завантажити asset release",
      },
    ],
    codeExample: `# Створити release з asset
$ gh release create v2.0.0 \\
  --title "Version 2.0.0" \\
  --notes "Major update with new features" \\
  ./dist/*.zip

# Створити pre-release
$ gh release create v2.1.0-beta --prerelease

# Видалити release (будьте обережні!)
$ gh release delete v1.0.0-test --yes`,
  },

  githubActions: {
    title: "GitHub Action",
    intro: "Моніторте та взаємодійте з вашими CI/CD workflow:",
    commands: [
      {
        command: "gh workflow list",
        description: "Список всіх workflow",
      },
      {
        command: "gh run list",
        description: "Список недавніх запусків workflow",
      },
      {
        command: "gh run view 123456",
        description: "Переглянути деталі запуску",
      },
      {
        command: "gh run view 123456 --log",
        description: "Переглянути логи запуску",
      },
      {
        command: "gh run watch 123456",
        description: "Слідкувати за запуском в реальному часі",
      },
      {
        command: "gh run rerun 123456",
        description: "Перезапустити невдалий workflow",
      },
    ],
    codeExample: `# Переглянути невдалі запуски
$ gh run list --status failure

# Запустити workflow вручну
$ gh workflow run build.yml

# Запустити з параметрами
$ gh workflow run deploy.yml -f environment=staging

# Переглянути логи завдання для конкретного job
$ gh run view 123456 --job 789 --log`,
  },

  repositoryOperations: {
    title: "Операції з Repository",
    commands: [
      {
        command: "gh repo view",
        description: "Переглянути інформацію поточного repository",
      },
      {
        command: "gh repo clone owner/repo",
        description: "Клонувати repository",
      },
      {
        command: "gh repo fork",
        description: "Створити fork поточного repository",
      },
      {
        command: "gh repo create my-project --public",
        description: "Створити новий repository",
      },
      {
        command: "gh browse",
        description: "Відкрити repository в browser",
      },
      {
        command: "gh browse issues",
        description: "Відкрити сторінку issue в browser",
      },
    ],
  },

  directApiAccess: {
    title: "Прямий доступ до API",
    intro: "Для продвинутих випадків використання отримайте доступ до GitHub API безпосередньо:",
    codeExample: `# Отримати інформацію про repository як JSON
$ gh api repos/owner/repo

# Список коментарів PR
$ gh api repos/owner/repo/pulls/123/comments

# Використовувати jq для вилучення конкретних полів
$ gh api user --jq '.login, .email'

# POST для створення чогось
$ gh api repos/owner/repo/issues \\
  -f title="API created issue" \\
  -f body="Created via gh api"`,
    tip: {
      content: "Агенти використовують ",
      description: " для операцій, не охоплених стандартними командами. Перевіряйте їх ретельно, оскільки вони мають повний доступ до API.",
    },
  },

  bestPractices: {
    title: "Найкращі практики",
    practices: [
      {
        title: "Завжди перевіряйте деталі PR перед merge",
        description: "Використовуйте gh pr view та gh pr diff для розуміння змін.",
      },
      {
        title: "Використовуйте --dry-run де доступно",
        description: "Деякі команди підтримують --dry-run для попереднього перегляду дій.",
      },
      {
        title: "Перевіряйте статус workflow перед deploy",
        description: "Запустіть gh run list, щоб переконатися, що CI пройшов перед release.",
      },
      {
        title: "Використовуйте label та milestone",
        description: "Організовуйте issue за допомогою прапорів --label та --milestone.",
      },
      {
        title: "Ретельно перевіряйте PR, створені агентами",
        description: "Агенти можуть створювати PR автоматично. Завжди перевіряйте перед merge.",
      },
    ],
  },

  tryItNow: {
    title: "Спробуйте зараз",
    code: `# Перевірити, чи встановлено та аутентифіковано gh
$ gh auth status

# Переглянути поточний repository
$ gh repo view

# Список недавніх issue
$ gh issue list --limit 5

# Список недавніх PR
$ gh pr list --limit 5

# Перевірити недавні запуски workflow
$ gh run list --limit 5`,
  },
};