/**
 * Tmux Basics Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку основ tmux.
 * Технічні терміни залишаємо англійською: tmux, SSH, terminal, multiplexer, panes, session
 */

export const tmuxBasicsLessonMessagesUk = {
  goalBanner: {
    content: "Ніколи не втрачайте роботу, коли SSH обривається.",
  },

  whatIsTmux: {
    title: "Що таке tmux?",
    description: "це terminal multiplexer. Він дозволяє вам:",
    highlight: "tmux",
    strong: "terminal multiplexer",

    features: [
      "Зберігати сесії після відключення",
      "Розділяти terminal на panes",
      "Мати кілька вікон в одному з'єднанні",
    ],
  },

  essentialCommands: {
    title: "Основні команди",

    startSession: {
      title: "Створити нову сесію",
      description: 'Це створює сесію з назвою "myproject".',
    },

    detachSession: {
      title: "Від'єднатися (залишити сесію працюючою)",
      description: "Ваша сесія продовжує працювати у фоновому режимі!",
    },

    listSessions: {
      title: "Показати список сесій",
      description: "Переглянути всі запущені сесії.",
    },

    reattachSession: {
      title: "Під'єднатися до сесії",
      description: "Під'єднується до останньої сесії.",
    },
  },

  prefixKey: {
    title: "Клавіша префікса",

    tipBox: {
      content: "В ACFS клавіша префікса - це Ctrl+a (а не стандартна Ctrl+b). Всі команди tmux починаються з префікса.",
    },
  },

  splittingPanes: {
    title: "Розділення panes",

    shortcuts: {
      splitVertically: {
        action: "Розділити вертикально",
      },
      splitHorizontally: {
        action: "Розділити горизонтально",
      },
      moveBetweenPanes: {
        action: "Переміщуватись між panes",
      },
      closeCurrentPane: {
        action: "Закрити поточний pane",
      },
    },
  },

  windows: {
    title: "Вікна (вкладки)",

    shortcuts: {
      newWindow: {
        action: "Нове вікно",
      },
      nextWindow: {
        action: "Наступне вікно",
      },
      previousWindow: {
        action: "Попереднє вікно",
      },
      goToWindowNumber: {
        action: "Перейти до вікна номер",
      },
    },
  },

  copyMode: {
    title: "Режим копіювання (прокрутка)",

    shortcuts: {
      enterCopyMode: {
        action: "Увійти в режим копіювання",
      },
      scroll: {
        action: "Прокручувати",
      },
      exitCopyMode: {
        action: "Вийти з режиму копіювання",
      },
      startSelection: {
        action: "Почати виділення",
      },
      copySelection: {
        action: "Копіювати виділене",
      },
    },
  },

  tryItNow: {
    title: "Спробуйте зараз",
  },

  whyItMatters: {
    title: "Чому це важливо для агентів",

    card: {
      title: "Ваші агенти працюють в tmux",
      description: "Ваші агенти кодування (Claude, Codex, Gemini) працюють в tmux panes. Якщо SSH обірветься, вони продовжують працювати. Коли ви перепід'єднаєтесь, вони все ще там!",
    },
  },

  commandSection: {
    pressLabel: "Натисніть:",
    thenLabel: "потім",
  },
};