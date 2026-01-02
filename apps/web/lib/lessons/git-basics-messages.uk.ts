/**
 * Git Basics Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку основ Git.
 * Технічні терміни залишаємо англійською: git, commit, staging, branch, remote, repository, merge, push, pull, rebase, reset, stash, reflog, checkout, .gitignore, .git, main, API, OAuth, SSH, terminal, browser, CLI
 */

export const gitBasicsLessonMessagesUk = {
  goalBanner: {
    content: "Опануйте основи git та розпізнавайте небезпечні операції до того, як вони відбудуться.",
  },

  whatIsGit: {
    title: "Що таке Git?",
    highlightText: "Git",
    description: "це система контролю версій, яка відстежує зміни у вашому коді з часом. Думайте про неї як про детальну історію кожної зміни, яку ви коли-небудь робили, з можливістю повернутися до будь-якого моменту.",

    features: {
      fullHistory: {
        title: "Повна історія",
        description: "Кожна зміна записується і її можна відмінити",
      },
      branching: {
        title: "Розгалуження",
        description: "Працюйте над функціями, не впливаючи на основний код",
      },
      collaboration: {
        title: "Співпраця",
        description: "Кілька людей можуть працювати над одним проєктом",
      },
      safetyNet: {
        title: "Мережа безпеки",
        description: "Відновлення після помилок (якщо знаєте як)",
      },
    },
  },

  coreConcepts: {
    title: "Основні концепції",
    concepts: [
      {
        term: "Repository",
        definition: "Папка проєкту, що відстежується git (містить каталог .git)",
        example: "git init створює новий repository",
      },
      {
        term: "Commit",
        definition: "Знімок вашого коду в певний момент часу",
        example: "Як збереження checkpoint у грі",
      },
      {
        term: "Staging Area",
        definition: "Де ви готуєте зміни перед commit",
        example: "git add поміщає файли в staging",
      },
      {
        term: "Branch",
        definition: "Незалежна лінія розробки",
        example: "main, feature/login, bugfix/auth",
      },
      {
        term: "Remote",
        definition: "Копія вашого repository на сервері (як GitHub)",
        example: "origin це назва remote за замовчуванням",
      },
    ],
  },

  essentialCommands: {
    title: "Основні команди",
    commands: [
      {
        command: "git status",
        description: "Побачити що змінилося (запускайте це часто!)",
      },
      {
        command: "git add <file>",
        description: "Додати файл для commit",
      },
      {
        command: "git add .",
        description: "Додати всі зміни",
      },
      {
        command: 'git commit -m "message"',
        description: "Створити commit з повідомленням",
      },
      {
        command: "git push",
        description: "Завантажити commit на remote",
      },
      {
        command: "git pull",
        description: "Завантажити та об'єднати зміни з remote",
      },
      {
        command: "git log --oneline",
        description: "Переглянути історію commit",
      },
      {
        command: "git diff",
        description: "Побачити незакомічені зміни",
      },
    ],
  },

  understandingGitignore: {
    title: "Розуміння .gitignore",
    intro: "Файл ",
    description: " повідомляє git, які файли ігнорувати. Це ",
    criticalText: "критично для безпеки",
    because: ", бо ви ніколи не хочете комітити:",

    ignoreItems: [
      {
        pattern: ".env",
        reason: "Містить API ключі та секрети",
        critical: true,
      },
      {
        pattern: "node_modules/",
        reason: "Залежності (величезні, відновлювані)",
        critical: false,
      },
      {
        pattern: ".venv/",
        reason: "Python віртуальні середовища",
        critical: false,
      },
      {
        pattern: "*.log",
        reason: "Лог файли з потенційно чутливими даними",
        critical: false,
      },
      {
        pattern: "credentials.json",
        reason: "Ключі службових аккаунтів",
        critical: true,
      },
      {
        pattern: ".claude/",
        reason: "Дані сесії Claude Code",
        critical: false,
      },
    ],

    warning: {
      bold: "Ніколи не комітьте секрети!",
      text: " Якщо ви випадково закомітили API ключ, вважайте його скомпрометованим. Негайно оновіть його.",
    },
  },

  workingWithBranches: {
    title: "Робота з Branch",
    commands: [
      {
        command: "git branch",
        description: "Список всіх локальних branch",
      },
      {
        command: "git branch <name>",
        description: "Створити новий branch",
      },
      {
        command: "git checkout <branch>",
        description: "Переключитися на branch",
      },
      {
        command: "git checkout -b <name>",
        description: "Створити і переключитися однією командою",
      },
      {
        command: "git merge <branch>",
        description: "Об'єднати branch в поточний branch",
      },
      {
        command: "git branch -d <name>",
        description: "Видалити об'єднаний branch",
      },
    ],
    tip: {
      content: "Завжди створюйте новий branch для функцій або експериментів. Тримайте ",
      stable: " стабільним.",
    },
  },

  dangerousOperations: {
    title: "Небезпечні операції",
    warning: {
      bold: "AI агенти можуть пропонувати ці команди.",
      text: " Знайте що вони роблять перед схваленням:",
    },

    commands: [
      {
        command: "git reset --hard",
        effect: "Назавжди знищує всі незакомічені зміни",
        alternative: "git stash (зберігає зміни на потім)",
      },
      {
        command: "git clean -fd",
        effect: "Назавжди видаляє всі невідстежувані файли",
        alternative: "Спочатку перегляньте з git clean -n (пробний запуск)",
      },
      {
        command: "git push --force",
        effect: "Перезаписує історію remote, може видалити роботу товаришів по команді",
        alternative: "git push --force-with-lease (безпечніше)",
      },
      {
        command: "git checkout .",
        effect: "Відкидає всі незакомічені зміни до відстежуваних файлів",
        alternative: "git stash або спочатку зробіть commit",
      },
      {
        command: "git rebase main",
        effect: "Переписує історію commit (може викликати конфлікти)",
        alternative: "Робіть rebase тільки непушенних commit",
      },
      {
        command: "rm -rf .git",
        effect: "Назавжди знищує всю історію repository",
        alternative: "Альтернативи немає. Ніколи не робіть цього.",
      },
    ],

    warningTip: {
      bold: "Перед схваленням будь-якої git команди від агента:",
      steps: [
        "Запустіть ",
        " щоб побачити поточний стан",
        "Запустіть ",
        " щоб зберегти незакомічену роботу",
        "Тільки тоді продовжуйте з деструктивними командами",
      ],
    },
  },

  recoveryTools: {
    title: "Інструменти відновлення",
    intro: "Коли щось іде не так, ці команди можуть допомогти:",
    commands: [
      {
        command: "git stash",
        description: "Тимчасово зберегти незакомічені зміни",
      },
      {
        command: "git stash pop",
        description: "Відновити схоплені зміни",
      },
      {
        command: "git reflog",
        description: "Переглянути історію HEAD (знайти втрачені commit)",
      },
      {
        command: "git reset --soft HEAD~1",
        description: "Відмінити останній commit, залишити зміни staged",
      },
      {
        command: "git checkout <file>",
        description: "Відкинути зміни до конкретного файлу",
      },
      {
        command: "git revert <commit>",
        description: "Створити новий commit, що відміняє попередній",
      },
    ],
    codeExample: `# Втратили commit після reset --hard? Знайдіть його!
$ git reflog
# Шукайте ваш commit hash, потім:
$ git checkout <hash>
# Або створіть branch на тому commit:
$ git branch recovery <hash>`,
  },

  bestPracticesWithAgents: {
    title: "Найкращі практики з агентами",
    practices: [
      {
        title: "Комітьте рано і часто",
        description: "Маленькі commit легше відмінити. Агенти краще працюють з чіткою історією.",
      },
      {
        title: "Завжди запускайте git status перед деструктивними командами",
        description: "Знайте, що ви збираєтеся втратити, перед тим як втратите це.",
      },
      {
        title: "Використовуйте git stash як вашу мережу безпеки",
        description: "Схоплюйте незакомічену роботу перед тим, як дозволити агентам запускати ризиковані операції.",
      },
      {
        title: "Перевіряйте git команди, запропоновані агентами",
        description: "Агенти можуть пропонувати --force або reset --hard. Завжди розумійте перед схваленням.",
      },
      {
        title: "Пушьте вашу роботу часто",
        description: "Віддалені резервні копії захищають від локальних катастроф.",
      },
    ],
  },

  tryItNow: {
    title: "Спробуйте зараз",
    code: `# Перевірити статус вашого repository
$ git status

# Переглянути недавні commit
$ git log --oneline -5

# Побачити що у вашому .gitignore
$ cat .gitignore

# Попрактикуйтеся з stash (безпечно спробувати!)
$ echo "test" > temp.txt
$ git stash
$ git stash pop
$ rm temp.txt`,
  },

  // UI labels for helper components
  componentLabels: {
    examplePrefix: "Приклад:",
    securityRisk: "Ризик безпеки",
  },
};