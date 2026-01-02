/**
 * NTM Core Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку про NTM core.
 * Технічні терміни залишаємо англійською: NTM, tmux, panes, session, window
 */

export const ntmCoreLessonMessagesUk = {
  goalBanner: {
    content: "Оволодійте NTM (Named Tmux Manager) для оркестрування агентів.",
  },

  whatIsNtm: {
    title: "Що таке NTM?",
    description1: "NTM - це ваш командний центр для керування кількома агентами кодування.",
    highlight1: "командний центр",
    description2: "Він створює організовані tmux session з виділеними panes для кожного агента.",

    diagram: {
      ntmTitle: "NTM",
      commandCenter: "Командний центр",
      agents: {
        claude: { name: "Claude", shortcut: "cc" },
        codex: { name: "Codex", shortcut: "cod" },
        gemini: { name: "Gemini", shortcut: "gmi" },
      },
    },
  },

  ntmTutorial: {
    title: "Туторіал NTM",
    description1: "NTM має вбудований туторіал. Запустіть його зараз:",
    description2: "Це проведе вас через основи в інтерактивному режимі.",
  },

  essentialCommands: {
    title: "Основні команди NTM",

    commands: {
      checkDependencies: {
        title: "Перевірити залежності",
        description: "Перевіряє, чи встановлені всі необхідні інструменти.",
      },
      createSession: {
        title: "Створити session проекту",
        description: "Створює tmux session з кількома panes агентів.",
        sessionComponents: {
          claudePanes: "2 Claude Code panes",
          codexPanes: "1 Codex pane",
          geminiPanes: "1 Gemini pane",
          sessionName: 'Session: "myproject"',
        },
      },
      listSessions: {
        title: "Список sessions",
        description: "Переглянути всі запущені NTM sessions.",
      },
      attachSession: {
        title: "Приєднатися до session",
        description: "Перейти в існуючий session, щоб побачити вихід агентів.",
      },
      sendToAllAgents: {
        title: "Надіслати команду всім агентам",
        description: "Це надсилає той самий prompt ВСІМ агентам у session!",
      },
      sendToSpecificAgent: {
        title: "Надіслати конкретному типу агента",
        description: "Націлювати конкретні типи агентів різними завданнями.",
      },
    },

    warningBox: {
      title: "Якщо ntm send не вдається з помилкою CASS",
      description: "unrecognized subcommand 'robot', обійдіть перевірку дублікатів:",
    },
  },

  powerOfNtm: {
    title: "Сила NTM",
    intro: "Уявіть цей робочий процес:",

    workflowSteps: [
      "Створити session з кількома агентами",
      "Надіслати високорівневе завдання всім",
      "Кожен агент працює паралельно",
      "Порівняти їх рішення",
      "Взяти найкращі частини від кожного",
    ],

    tipBoxContent: "Ось сила багатоагентної розробки — різні перспективи працюють паралельно!",
  },

  quickSessionTemplate: {
    title: "Швидкий шаблон session",
    intro: "Для типового проекту:",

    ratioCard: {
      title: "Чому таке співвідношення?",
      agents: {
        claude: {
          count: "2",
          name: "Claude",
          reason: "Чудовий для архітектури та складних міркувань",
        },
        codex: {
          count: "1",
          name: "Codex",
          reason: "Швидка ітерація та тестування",
        },
        gemini: {
          count: "1",
          name: "Gemini",
          reason: "Інша перспектива, хороший для документації",
        },
      },
    },
  },

  sessionNavigation: {
    title: "Навігація session",
    intro: "Всередині NTM session:",

    shortcuts: [
      { keys: ["Ctrl+a", "n"], action: "Наступне window" },
      { keys: ["Ctrl+a", "p"], action: "Попереднє window" },
      { keys: ["Ctrl+a", "h/j/k/l"], action: "Переміщення між panes" },
      { keys: ["Ctrl+a", "z"], action: "Збільшити поточний pane" },
    ],

    table: {
      keysHeader: "Клавіші",
      actionHeader: "Дія",
      thenConnector: "потім",
    },
  },

  tryItNow: {
    title: "Спробуйте зараз",
    comment1: "Створити тестовий session",
    comment2: "Перелічити sessions",
    comment3: "Надіслати просте завдання",
    comment4: "Приєднатися, щоб побачити результат",
  },
};