/**
 * Flywheel Loop Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку flywheel loop.
 * Технічні терміни залишаємо англійською: flywheel, loop, NTM, CASS, UBS, Agent Mail, git, tmux
 */

export const flywheelLoopMessagesUk = {
  goalBanner: {
    content: "Зрозумійте, як всі інструменти працюють разом.",
  },

  flywheelSection: {
    title: "ACFS Flywheel",
    intro: "Це не просто набір інструментів. Це",
    highlight: "складний цикл (compounding loop)",
    cycleEffect: "Кожен цикл робить наступний кращим.",
  },

  toolsSection: {
    title: "Вісім інструментів (і коли їх використовувати)",

    tools: {
      ntm: {
        name: "NTM",
        subtitle: "Ваша кабіна керування",
        command: "ntm",
        useCases: [
          "Створення сесій агентів",
          "Надсилання запитів кільком агентам",
          "Оркестрування паралельної роботи",
        ],
      },

      agentMail: {
        name: "MCP Agent Mail",
        subtitle: "Координація",
        command: "am",
        useCases: [
          "Кілька агентів потребують обміну контекстом",
          'Ви хочете, щоб агенти "спілкувалися" один з одним',
          "Координування складних багато-агентських процесів",
        ],
      },

      ubs: {
        name: "UBS",
        subtitle: "Контроль якості",
        command: "ubs",
        useCases: [
          "Сканування коду на помилки перед комітом",
          "Виконання комплексного статичного аналізу",
          "Виявлення проблем на ранній стадії",
        ],
        example: "ubs .  # Сканувати поточну директорію",
      },

      cass: {
        name: "CASS",
        subtitle: "Пошук по сесіях",
        command: "cass",
        useCases: [
          "Пошук по всій історії сесій агентів",
          "Знаходження попередніх рішень",
          "Перегляд того, що робили агенти",
        ],
        example: 'cass search "authentication error" --robot --limit 5',
      },

      cassMemory: {
        name: "CASS Memory (CM)",
        subtitle: "Процедурна пам'ять",
        command: "cm",
        useCases: [
          "Створення стійкої пам'яті агентів",
          "Дистиляція знань з сесій",
          "Надання агентам контексту з попередньої роботи",
        ],
        example: `cm context "Building an API"  # Отримати релевантні спогади
cm reflect                     # Оновити процедурну пам'ять`,
      },

      beadsViewer: {
        name: "Beads Viewer",
        subtitle: "Управління завданнями",
        command: "bv",
        useCases: [
          "Відстеження завдань і проблем",
          "Kanban-вид роботи",
          "Утримання фокусу агентів на цілях",
        ],
        example: "bv --robot-triage  # Детерміністичний вивід сортування",
      },

      caam: {
        name: "CAAM",
        subtitle: "Перемикання акаунтів",
        command: "caam",
        useCases: [
          "Ви досягли лімітів запитів",
          "Ви хочете перемикатися між акаунтами",
          "Тестування з різними обліковими даними",
        ],
        example: `caam status         # Подивитися поточні акаунти
caam activate claude backup-account`,
      },

      slb: {
        name: "SLB",
        subtitle: "Захисні обмеження",
        command: "slb",
        useCases: [
          "Небезпечні команди (коли ви хочете їх перевірити)",
          "Правило двох осіб для руйнівних операцій",
          "Опціональний захисний шар",
        ],
      },
    },

    useCasesLabel: "Використовується для:",
  },

  workflowSection: {
    title: "Повний робочий процес",
    intro: "Ось як може виглядати справжня сесія:",
    codeComments: {
      planWork: "# 1. Плануйте вашу роботу",
      checkTasks: "# Перевірити завдання",
      seeReady: "# Подивитися, що готове до роботи",
      startAgents: "# 2. Запустити ваших агентів",
      setContext: "# 3. Встановити контекст",
      getMemories: "# Отримати релевантні спогади",
      updateMemory: "# Оновити процедурну пам'ять",
      sendPrompt: "# 4. Надіслати початковий запит",
      contextPrompt: "Давайте реалізуємо автентифікацію користувача.\nОсь контекст: [вставити вивід cm]",
      monitorGuide: "# 5. Контролювати і керувати",
      watchProgress: "# Стежити за прогресом",
      scanCommit: "# 6. Сканувати перед комітом",
      checkBugs: "# Перевірити на помилки",
      updateMemoryStep: "# 7. Оновити пам'ять",
      distillLearnings: "# Дистилювати знання",
      closeTask: "# 8. Закрити завдання",
      seeAccounts: "# Подивитися поточні акаунти",
    },
  },

  flywheelEffectSection: {
    title: "Ефект Flywheel",
    intro: "З кожним циклом:",
    effects: [
      { tool: "CASS", effect: "запам'ятовує, що спрацювало" },
      { tool: "CM", effect: "дистилює шаблони для повторного використання" },
      { tool: "UBS", effect: "виявляє більше проблем" },
      { tool: "Agent Mail", effect: "покращує координацію" },
      { tool: "NTM", effect: "сесії стають ефективнішими" },
    ],
    tipBox: {
      content: "Ось чому це називається flywheel - він стає кращим, чим більше ви його використовуєте.",
      strongText: "flywheel",
    },
  },

  firstTaskSection: {
    title: "Ваше перше справжнє завдання",
    intro: "Ви готові! Ось як почати ваш перший проект:",
    codeComments: {
      createProject: "# 1. Створити директорію проекту",
      initGit: "# 2. Ініціалізувати git",
      initBeads: "# 3. Ініціалізувати beads для відстеження завдань",
      recommended: "# (Рекомендовано) Створити окрему гілку синхронізації Beads",
      beadsExplanation: "# Beads використовує git worktrees для синхронізації; синхронізація з вашою поточною гілкою (часто `main`)",
      conflictWarning: "# може викликати конфлікти worktree. Як тільки у вас є гілка `main` і remote, виконайте:",
      spawnAgents: "# 4. Створити ваших агентів",
      startBuilding: "# 5. Почати будувати!",
      buildPrompt: "Давайте створимо щось дивовижне.\nЯкий тип проекту ми повинні створити?",
    },
  },

  helpSection: {
    title: "Отримання допомоги",
    commands: {
      doctor: {
        command: "acfs doctor",
        description: "Перевірити, що все працює",
      },
      ntmHelp: {
        command: "ntm --help",
        description: "Допомога NTM",
      },
      onboard: {
        command: "onboard",
        description: "Повторно запустити цей підручник будь-коли",
      },
    },
  },

  diagram: {
    nodes: {
      plan: {
        label: "Планування",
        sublabel: "Beads",
      },
      coordinate: {
        label: "Координація",
        sublabel: "Agent Mail",
      },
      execute: {
        label: "Виконання",
        sublabel: "NTM + Агенти",
      },
      remember: {
        label: "Запам'ятовування",
        sublabel: "CASS Memory",
      },
      scan: {
        label: "Сканування",
        sublabel: "UBS",
      },
    },
  },
};