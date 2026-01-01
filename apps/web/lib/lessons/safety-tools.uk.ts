/**
 * Safety Tools Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку інструментів безпеки.
 * Технічні терміни залишаємо англійською: SLB, CAAM, Claude, OAuth, API, CLI, bash, git, kubectl, symlink
 */

export const safetyToolsLessonMessagesUk = {
  goalBanner: {
    content: "Використовуйте SLB та CAAM для безпеки та керування обліковими записами.",
  },

  introduction: {
    title: "Безпека понад усе",
    intro: "AI агенти потужні, але можуть завдати шкоди при неправильному використанні. Стек Dicklesworthstone включає два інструменти безпеки:",
    slb: {
      title: "SLB",
      description: "Правило двох осіб для небезпечних команд",
    },
    caam: {
      title: "CAAM",
      description: "Перемикання аутентифікації агентів",
    },
  },

  slbSection: {
    title: "SLB: Simultaneous Launch Button",
    intro: {
      highlight: "SLB",
      text: " реалізує \"правило двох осіб\" для небезпечних команд. Так само, як коди ядерного запуску потребують два ключі, SLB вимагає два схвалення перед виконанням ризикованих операцій.",
    },
  },

  whenToUseSlb: {
    title: "Коли використовувати SLB",
    dangerCards: {
      rmRf: {
        command: "rm -rf /",
        risk: "Видаляє всю файлову систему",
        slb: "Потребує підтвердження від двох агентів",
      },
      forcePush: {
        command: "git push --force origin main",
        risk: "Перезаписує спільну історію",
        slb: "Потребує явного схвалення",
      },
      dropDatabase: {
        command: "DROP DATABASE production",
        risk: "Знищує продакшн дані",
        slb: "Перевірка двох осіб",
      },
      deleteNamespace: {
        command: "kubectl delete namespace prod",
        risk: "Вимикає продакшн сервіси",
        slb: "Обов'язковий огляд",
      },
    },
    tipBox: {
      content: "Ніколи не обходьте захист SLB. Якщо команда потребує два схвалення, на це є причина. Отримайте другу думку.",
    },
  },

  slbCommands: {
    title: "Команди SLB",
    commands: {
      pending: {
        command: "slb pending",
        description: "Показати запити, що очікують",
      },
      run: {
        command: 'slb run "rm -rf /tmp" --reason "Clean build"',
        description: "Запросити схвалення та виконати після схвалення",
      },
      approve: {
        command: "slb approve <id> --session-id <sid>",
        description: "Схвалити запит, що очікує",
      },
      reject: {
        command: 'slb reject <id> --session-id <sid> --reason "..."',
        description: "Відхилити запит, що очікує",
      },
      status: {
        command: "slb status <request-id>",
        description: "Перевірити статус конкретного запиту",
      },
    },
  },

  caamSection: {
    title: "CAAM: Coding Agent Account Manager",
    intro: {
      highlight: "CAAM",
      text: " забезпечує перемикання облікових записів менш ніж за 100мс для AI сервісів на основі підписки (Claude Max, Codex CLI, Gemini Ultra). Миттєво міняйте OAuth токени без повторної аутентифікації.",
    },
    features: {
      tokenManagement: {
        title: "Керування токенами",
        description: "Резервне копіювання та відновлення OAuth токенів для кожного інструменту",
      },
      instantSwitching: {
        title: "Миттєве перемикання",
        description: "Перемикання облікових записів менш ніж за 100мс через swap symlink",
      },
      multiTool: {
        title: "Підтримка багатьох інструментів",
        description: "Працює з Claude, Codex та Gemini CLI",
      },
      profileBackup: {
        title: "Резервне копіювання профілів",
        description: "Зберігання профілів за email для легкого відновлення",
      },
    },
  },

  caamUseCases: {
    title: "Випадки використання CAAM",
    useCases: {
      personalVsWork: {
        scenario: "Особисте проти робочого",
        description: "Перемикання між особистими та робочими підписками",
      },
      rateLimits: {
        scenario: "Ліміти швидкості",
        description: "Перехід до нового облікового запису при досягненні лімітів використання",
      },
      costSeparation: {
        scenario: "Розділення витрат",
        description: "Використання різних підписок для різних проектів",
      },
      multiAccount: {
        scenario: "Багато облікових записів",
        description: "Керування множинними Claude Max / Codex обліковими записами",
      },
    },
  },

  caamCommands: {
    title: "Команди CAAM",
    commands: {
      list: {
        command: "caam ls [tool]",
        description: "Список збережених профілів (claude, codex, gemini)",
      },
      backup: {
        command: "caam backup <tool> <email>",
        description: "Зберегти поточну аутентифікацію як іменований профіль",
      },
      activate: {
        command: "caam activate <tool> <email>",
        description: "Активувати збережений профіль",
      },
      status: {
        command: "caam status [tool]",
        description: "Показати поточний активний профіль",
      },
      delete: {
        command: "caam delete <tool> <email>",
        description: "Видалити збережений профіль",
      },
    },
  },

  integration: {
    title: "Інтеграція з агентами",
    intro: "Як SLB, так і CAAM інтегруються з Claude Code, Codex та Gemini:",
    codeExample: `# Приклад: Небезпечна команда запускає SLB
$ claude "delete all test files"
> SLB: Ця команда потребує схвалення
> Очікування другого схвалення...
> Запустіть 'slb approve req-123 --session-id <sid>' з іншої сесії

# Приклад: Перемикання Claude облікових записів для проекту
$ caam activate claude work@company.com
> Активовано профіль 'work@company.com' для claude
> Symlink оновлено за 47мс

$ claude "continue the project"
> Використовується профіль: work@company.com`,
  },

  bestPractices: {
    title: "Кращі практики",
    slbSection: {
      title: "Кращі практики SLB",
      practices: {
        neverBypass: "Ніколи не обходьте вимоги схвалення",
        reviewCommands: "Переглядайте команди перед схваленням",
        useDescriptive: "Використовуйте описові повідомлення запитів",
        setupNotifications: "Налаштуйте сповіщення для запитів, що очікують",
      },
    },
    caamSection: {
      title: "Кращі практики CAAM",
      practices: {
        backupProfiles: "Робіть резервні копії профілів перед перемиканням",
        useEmail: "Використовуйте email як ідентифікатор профілю",
        verifyActive: "Перевіряйте активний профіль за допомогою caam status",
        deleteOld: "Видаляйте старі профілі, коли вони більше не потрібні",
      },
    },
  },

  quickReference: {
    title: "Швидкий довідник",
    slbCommands: ["slb pending", "slb run <cmd> --reason ...", "slb approve <id> --session-id ...", "slb status <id>"],
    caamCommands: ["caam ls [tool]", "caam backup <tool> <email>", "caam activate <tool> <email>", "caam status [tool]"],
  },

  slbDiagram: {
    dangerousCommand: "Небезпечна команда",
    agent1: "Агент 1",
    agent2: "Агент 2",
    safeToExecute: "Безпечно виконувати",
    twoApprovalsReceived: "Отримано два схвалення",
  },
};