/**
 * Beads Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку Beads.
 * Технічні терміни залишаємо англійською: beads, issue, dependency, blocker, MCP, bd, bv, PageRank, betweenness, HITS, eigenvector, k-core
 */

export const beadsLessonMessagesUk = {
  goalBanner: {
    content: "Відстежуйте issue з dependency та дозвольте аналізу графу керувати вашою роботою.",
  },

  whatIsBeads: {
    title: "Що таке Beads?",
    beadsDescription: "це система відстеження issue, що враховує граф і призначена для робочих процесів агентів. Вона відстежує dependency між завданнями та використовує алгоритми графу, щоб підказати, над чим працювати далі.",
    bvDescription: "це TUI та CLI для роботи з Beads. Він надає як інтерактивні вигляди, так і машиночитаємі результати для агентів.",

    features: {
      dependencyTracking: {
        title: "Відстеження Dependency",
        description: "Issue можуть блокувати інші issue",
      },
      graphMetrics: {
        title: "Метрики графу",
        description: "PageRank, betweenness, критичний шлях",
      },
      smartTriage: {
        title: "Розумна сортування",
        description: "Знайте, над чим працювати далі",
      },
      gitIntegration: {
        title: "Інтеграція з Git",
        description: "Всі дані зберігаються в .beads/",
      },
    },
  },

  coreCommands: {
    title: "Основні команди bd",
    intro: "це CLI для керування Beads issue:",

    commands: [
      {
        command: "bd ready",
        description: "Показати issue готові до роботи (без blocker)",
      },
      {
        command: "bd list --status=open",
        description: "Всі відкриті issue",
      },
      {
        command: "bd show <id>",
        description: "Детальний вигляд з dependency",
      },
      {
        command: 'bd create "..." -t task -p 2',
        description: "Створити нове issue",
      },
      {
        command: "bd update <id> --status=in_progress",
        description: "Взяти роботу",
      },
      {
        command: "bd close <id>",
        description: "Позначити як завершене",
      },
      {
        command: "bd dep add <issue> <depends-on>",
        description: "Додати dependency",
      },
      {
        command: "bd sync",
        description: "Синхронізувати з git remote",
      },
    ],

    warning: {
      important: "Важливо:",
      neverRunBare: "Ніколи не запускайте просто",
      explanation: "це запустить TUI. Використовуйте",
      flagsNote: "прапорці для результатів агента.",
    },
  },

  robotCommands: {
    title: "Команди BV Robot",
    intro: "BV надає машиночитаємі результати з попередньо обчисленими метриками графу:",

    commands: [
      {
        command: "bv --robot-triage",
        description: "МЕГА-команда: рекомендації, швидкі перемоги, blocker для очищення",
        output: ["quick_ref", "recommendations", "quick_wins", "blockers_to_clear", "project_health"],
        primary: true,
      },
      {
        command: "bv --robot-next",
        description: "Просто один найкращий вибір + команда взяття",
        output: ["next_item", "claim_command"],
        primary: false,
      },
      {
        command: "bv --robot-plan",
        description: "Паралельні треки виконання зі списками розблокувань",
        output: ["tracks", "dependencies", "critical_path"],
        primary: false,
      },
      {
        command: "bv --robot-insights",
        description: "Повні метрики графу",
        output: ["PageRank", "betweenness", "HITS", "eigenvector", "critical_path", "cycles", "k-core"],
        primary: false,
      },
    ],
  },

  issueTypes: {
    title: "Типи Issue та Пріоритети",

    types: {
      title: "Типи",
      list: [
        { type: "bug", description: "Щось зламано" },
        { type: "feature", description: "Нова функціональність" },
        { type: "task", description: "Робота для виконання" },
        { type: "epic", description: "Велика ініціатива" },
        { type: "chore", description: "Обслуговування" },
      ],
    },

    priorities: {
      title: "Пріоритети (0-4)",
      list: [
        { priority: "0", label: "Критичний", description: "Безпека, втрата даних, зламані збірки" },
        { priority: "1", label: "Високий", description: "Важлива робота" },
        { priority: "2", label: "Середній", description: "Пріоритет за замовчуванням" },
        { priority: "3", label: "Низький", description: "Було б непогано" },
        { priority: "4", label: "Backlog", description: "Розгляд у майбутньому" },
      ],
    },
  },

  agentWorkflow: {
    title: "Робочий процес агента",

    steps: [
      { title: "bd ready", description: "Знайти розблоковану роботу" },
      { title: "bd show <id>", description: "Переглянути деталі issue" },
      { title: "bd update --status=in_progress", description: "Взяти роботу" },
      { title: "Реалізувати + тестувати", description: "Виконати справжню роботу" },
      { title: "bd close <id>", description: "Позначити як завершене" },
      { title: "bd sync", description: "Синхронізувати з remote" },
    ],
  },

  graphMetrics: {
    title: "Розуміння метрик графу",
    intro: "BV обчислює метрики графу для допомоги в пріоритизації роботи:",

    metrics: [
      {
        name: "PageRank",
        description: "Наскільки центральне це issue? Високий PageRank = багато речей залежать від нього",
        usage: "Спочатку зосередьтеся на blocker з високим PageRank",
      },
      {
        name: "Betweenness",
        description: "Як часто це issue знаходиться на критичних шляхах?",
        usage: "Очищення issue з високим betweenness розблоковує найбільше роботи",
      },
      {
        name: "Критичний шлях",
        description: "Найдовший ланцюг dependency",
        usage: "Пріоритизуйте роботу на критичному шляху для зменшення загального часу",
      },
      {
        name: "Цикли",
        description: "Циклічні dependency (А блокує Б, Б блокує А)",
        usage: "Повинні бути вирішені - вони створюють deadlock",
      },
    ],
  },

  bestPractices: {
    title: "Кращі практики",

    practices: [
      {
        title: "Почніть з bd ready",
        description: "Знайдіть роботу без blocker - ви можете почати негайно",
      },
      {
        title: "Використовуйте bd dep add для dependency",
        description: "Явні dependency дозволяють розумну пріоритизацію",
      },
      {
        title: "Беріть роботу з --status=in_progress",
        description: "Запобігає дублюванню роботи іншими агентами",
      },
      {
        title: "Швидко закривайте issue",
        description: "Швидше розблоковує залежну роботу",
      },
      {
        title: "Запускайте bd sync наприкінці сесії",
        description: "Підтримує .beads/ в синхронізації між агентами та машинами",
      },
    ],

    tipBox: {
      content: "Завжди коммітьте .beads/ разом зі змінами коду. Це авторитетне джерело істини для стану issue.",
    },
  },

  tryItNow: {
    title: "Спробуйте зараз",

    codeExample: `# See what's ready to work on
$ bd ready

# Get smart triage recommendations
$ bv --robot-triage | jq '.quick_ref'

# Create a task
$ bd create "Add login page" -t feature -p 2

# Start working on it
$ bd update bd-1 --status=in_progress

# Sync when done
$ bd sync`,
  },
};