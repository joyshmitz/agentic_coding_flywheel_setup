/**
 * CM Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку CM (Context Manager).
 * Технічні терміни залишаємо англійською: CM, context manager, context, token, prompt
 * НЕ перекладаємо: CM commands, технічні терміни
 * ПЕРЕКЛАДАЄМО: заголовки, описи, пояснення концепцій, кроки інструкцій
 */

export const cmLessonMessagesUk = {
  goalBanner: {
    content: "Створюйте процедурну пам'ять для агентів, яка покращується з часом.",
  },

  whatIsCm: {
    title: "Що таке CM?",
    description: "забезпечує ефективну пам'ять для AI агентів, витягуючи уроки з минулих сесій і роблячи їх доступними для майбутньої роботи.",
    highlight: "CM (CASS Memory System)",
    humanLearning: "Думайте про це як про те, як вчаться люди: ви зустрічаєте проблему, вирішуєте її і запам'ятовуєте рішення. CM робить це для ваших агентів автоматично.",

    features: {
      lessonExtraction: {
        title: "Вилучення уроків",
        description: "Автоматично витягуйте правила з минулих сесій",
      },
      contextRetrieval: {
        title: "Пошук context",
        description: "Отримуйте релевантні правила перед початком завдань",
      },
      antiPatterns: {
        title: "Анти-патерни",
        description: "Вчіться, що НЕ треба робити, з минулих помилок",
      },
      continuousLearning: {
        title: "Безперервне навчання",
        description: "Пам'ять покращується з кожною сесією",
      },
    },
  },

  howItWorks: {
    title: "Як це працює",
    tipBox: "CM створює \"playbook\" правил з часом. Чим більше сесій ви аналізуєте, тим розумнішими стають ваші агенти!",

    memoryDiagram: {
      pastSessions: {
        label: "Минулі сесії",
        sublabel: "Необроблені розмови",
      },
      cmAnalysis: {
        label: "Аналіз CM",
        sublabel: "Вилучення уроків",
      },
      playbook: {
        label: "Playbook",
        sublabel: "Дієві правила",
      },
    },
  },

  onboarding: {
    title: "Onboarding: Створення вашого Playbook",
    intro: "Команда cm onboard направляє вас через аналіз минулих сесій і вилучення цінних правил:",

    steps: [
      {
        cmd: "cm onboard status",
        desc: "Перевірити статус і побачити рекомендації",
      },
      {
        cmd: "cm onboard sample --fill-gaps",
        desc: "Отримати сесії, відфільтровані за прогалинами playbook",
      },
      {
        cmd: "cm onboard read /path/session.jsonl --template",
        desc: "Читати сесію з багатим context",
      },
      {
        cmd: 'cm playbook add "rule" --category "category"',
        desc: "Додати вилучені правила",
      },
      {
        cmd: "cm onboard mark-done /path/session.jsonl",
        desc: "Позначити сесію як оброблену",
      },
    ],
  },

  essentialCommands: {
    title: "Основні команди",

    commands: [
      {
        command: "cm onboard status",
        description: "Перевірити статус playbook і рекомендації",
      },
      {
        command: "cm onboard sample --fill-gaps",
        description: "Отримати сесії для аналізу (відфільтровані за прогалинами)",
      },
      {
        command: "cm onboard read /path/session.jsonl --template",
        description: "Читати сесію з багатим context",
      },
      {
        command: 'cm playbook add "rule" --category "debugging"',
        description: "Додати вилучене правило",
      },
      {
        command: "cm onboard mark-done /path/session.jsonl",
        description: "Позначити сесію як оброблену",
      },
      {
        command: 'cm context "task description" --json',
        description: "Отримати релевантний context для завдання",
      },
    ],
  },

  usingContext: {
    title: "Використання context перед завданнями",
    intro: "Перед початком складних завдань отримайте релевантний context з вашого playbook:",
    tipBox: 'Посилайтесь на ID правил у вашій роботі. Наприклад: "Дотримуючись b-8f3a2c, використовуючи bcrypt з cost 12..."',
  },

  memoryProtocol: {
    title: "Протокол пам'яті",

    steps: [
      {
        number: 1,
        title: "ПОЧАТОК",
        description: 'Запустіть cm context "<завдання>" --json перед нетривіальною роботою',
      },
      {
        number: 2,
        title: "РОБОТА",
        description: 'Посилайтесь на ID правил при їх дотриманні (наприклад, "Дотримуючись b-8f3a2c...")',
      },
      {
        number: 3,
        title: "ЗВОРОТНИЙ ЗВ'ЯЗОК",
        description: "Залишайте вбудовані коментарі, коли правила допомагають або шкодять",
      },
      {
        number: 4,
        title: "КІНЕЦЬ",
        description: "Просто закінчіть вашу роботу. Навчання відбувається автоматично.",
      },
    ],
  },

  ruleCategories: {
    title: "Категорії правил",

    categories: [
      {
        name: "debugging",
        description: "Техніки вирішення проблем",
        color: "from-red-500/20 to-rose-500/20",
      },
      {
        name: "security",
        description: "Найкращі практики безпеки",
        color: "from-amber-500/20 to-orange-500/20",
      },
      {
        name: "performance",
        description: "Патерни оптимізації",
        color: "from-emerald-500/20 to-teal-500/20",
      },
      {
        name: "architecture",
        description: "Архітектурні рішення",
        color: "from-primary/20 to-violet-500/20",
      },
      {
        name: "testing",
        description: "Стратегії тестування",
        color: "from-blue-500/20 to-indigo-500/20",
      },
      {
        name: "tooling",
        description: "Знання, специфічні для інструментів",
        color: "from-pink-500/20 to-rose-500/20",
      },
    ],
  },

  bestPractices: {
    title: "Найкращі практики",

    practices: [
      {
        title: "Запускайте cm context перед складними завданнями",
        description: "Не винаходьте велосипед — перевірте, що ви вивчили",
      },
      {
        title: "Вилучайте конкретні, дієві правила",
        description: "'Використовувати bcrypt cost ≥12' краще ніж 'бути безпечним'",
      },
      {
        title: "Включайте анти-патерни",
        description: "Що НЕ треба робити так само цінно, як і що треба робити",
      },
      {
        title: "Правильно категоризуйте правила",
        description: "Це робить пошук більш точним",
      },
      {
        title: "Надавайте зворотний зв'язок про правила",
        description: "Допомагає системі дізнатись, які правила дійсно корисні",
      },
    ],
  },

  tryItNow: {
    title: "Спробуйте зараз",
  },
};