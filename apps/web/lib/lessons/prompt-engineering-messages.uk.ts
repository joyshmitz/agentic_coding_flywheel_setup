/**
 * Prompt Engineering Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку Prompt Engineering.
 * Приклади промптів залишаємо англійською з поясненням.
 * Технічні терміни: API, CLI, compute, metacognition, ultrathink
 */

export const promptEngineeringLessonMessagesUk = {
  goalBanner: {
    content: "Опануйте мистецтво керування AI агентами з точністю та наміром.",
  },

  introduction: {
    title: "Чому промпти важливі",
    intro: "Різниця між посередньою сесією з агентом і блискучою часто зводиться до того,",
    howYouDirect: "як ви керуєте агентом",
    dissects: "Цей урок аналізує паттерни, що роблять промпти ефективними, основані на реальних робочих процесах, які постійно дають відмінні результати.",

    featureCards: {
      intensityCalibration: {
        title: "Калібрування інтенсивності",
        description: "Сигналізуйте, скільки уваги виділити",
      },
      scopeControl: {
        title: "Контроль області",
        description: "Розширюйте або звужуйте простір пошуку",
      },
      metacognition: {
        title: "Метапізнання",
        description: "Примушуйте до самоперевірки та рефлексії",
      },
      contextAnchoring: {
        title: "Контекстне закріплення",
        description: "Обґрунтовуйте поведінку в стабільних посиланнях",
      },
    },
  },

  pattern1: {
    title: "Паттерн 1: Калібрування інтенсивності",
    intro: "AI моделі розподіляють \"compute\" на основі сприйнятої важливості завдання.",
    stackedModifiers: "Складені модифікатори",
    maxAttention: "сигналізують, що це завдання заслуговує максимальної уваги:",

    intensityExamples: [
      {
        phrase: "super carefully",
        effect: "Підвищує увагу вище базового рівня",
      },
      {
        phrase: "super careful, methodical, and critical",
        effect: "Потрійне складання для максимальної точності",
      },
      {
        phrase: "systematically and meticulously and intelligently",
        effect: "Підкреслює як процес, так і якість",
      },
    ],

    notFillerWords: "Це не слова-наповнювачі. Це",
    calibrationSignals: "сигнали калібрування",
    allocateReasoning: "які кажуть моделі виділити більше глибини міркувань на завдання.",

    claudeCodeFeature: {
      intro: "Claude Code функція:",
      ultrathinkDesc: "Слово ultrathink є специфічною директивою Claude Code, яка каже системі виділити значно більше thinking токенів. Хоча це функція рівня інструменту в Claude Code, використання слів інтенсивності як \"think deeply\" або \"reason carefully\" може допомогти іншим агентам/моделям виділити більше уваги на складні завдання також.",
    },
  },

  pattern2: {
    title: "Паттерн 2: Контроль області",
    intro: "Моделі схильні до коротких шляхів. Явні директиви області протидіють передчасному звуженню:",

    scopeCards: {
      expand: {
        title: "↔ Ширина",
        phrases: [
          "take ALL of that",
          "Don't restrict yourself",
          "cast a wider net",
          "comprehensive and granular",
        ],
      },
      deepen: {
        title: "↓ Глибина",
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
    title: "Паттерн 3: Примусова самоперевірка",
    intro: "Питання запускають",
    metacognition: "метапізнання",
    forcingModel: "—примушуючи модель оцінювати свій власний результат перед фіналізацією:",

    verificationQuestions: [
      {
        question: "Are you sure it makes sense?",
        purpose: "Базова перевірка розумності",
      },
      {
        question: "Is it optimal?",
        purpose: "Штовхає за межі 'достатньо хорошо'",
      },
      {
        question: "Could we change anything to make the system work better for users?",
        purpose: "Оптимізація, орієнтована на користувача",
      },
      {
        question: "Check over each bead super carefully",
        purpose: "Перегляд пункт за пунктом",
      },
    ],

    planSpacePrinciple: {
      title: "Принцип простору планування:",
      description: "Переглядання планів в 10 разів дешевше ніж відлагодження реалізації. Примушуйте до верифікації на етапі планування.",
    },
  },

  pattern4: {
    title: "Паттерн 4: Техніка свіжого погляду",
    intro: "Техніки психологічного перезавантаження",
    helpAgents: "допомагають агентам підходити до коду без попередніх припущень або упередженості підтвердження:",

    freshEyesTechniques: [
      {
        technique: "Явне перезавантаження",
        example: 'with "fresh eyes"',
        mechanism: "Сигналізує відкинути попередні припущення",
      },
      {
        technique: "Випадкове дослідження",
        example: '"randomly explore the code files"',
        mechanism: "Уникає тунельного бачення на очікуваних місцях",
      },
      {
        technique: "Фреймінг колег",
        example: '"reviewing code written by your fellow agents"',
        mechanism: "Створює психологічну відстань від власної роботи",
      },
    ],
  },

  pattern5: {
    title: "Паттерн 5: Часове усвідомлення",
    intro: "Чудові промпти враховують",
    futureContexts: "майбутні контексти",
    agentWillContinue: "—агента, який продовжить цю роботу, людину, яка переглянутиме її, \"майбутнє я\", яке повинно її розуміти:",

    temporalConcepts: [
      {
        concept: "Майбутнє я",
        description: "Пишіть, ніби пояснюєте комусь без контексту",
      },
      {
        concept: "Самодостатність",
        description: "Результат повинен працювати незалежно від поточної розмови",
      },
      {
        concept: "Загальні цілі",
        description: "Пов'язуйте поточну роботу з більшою картиною",
      },
    ],
  },

  pattern6: {
    title: "Паттерн 6: Контекстне закріплення",
    intro: "Стабільні довідкові документи",
    agentsMd: "(як AGENTS.md) служать як поведінкові якорі. Перечитування їх особливо критично після стиснення контексту.",

    whyMatters: {
      title: "Чому це важливо після стиснення:",
      reasons: [
        {
          title: "Розпад контексту:",
          description: "Правила втрачають важливість по мірі додавання більше контенту",
        },
        {
          title: "Втрати узагальнення:",
          description: "Стиснення може пропустити нюанси",
        },
        {
          title: "Запобігання дрейфу:",
          description: "Періодичне заземлення запобігає поведінковій дивергенції",
        },
        {
          title: "Свіжий фрейм:",
          description: "Перечитування встановлює правильний операційний контекст",
        },
      ],
    },
  },

  pattern7: {
    title: "Паттерн 7: Аналіз перших принципів",
    intro: "Наполягайте на",
    deepUnderstanding: "глибокому розумінні",
    overSurface: "над поверхневим зіставленням паттернів:",

    principleCards: [
      {
        principle: "Зрозумійте перед виправленням",
        description: "Спочатку простежте потоки виконання та залежності",
      },
      {
        principle: "Первопричина над симптомом",
        description: "Діагностуйте основні проблеми, а не поверхневі прояви",
      },
      {
        principle: "Більший контекст",
        description: "Зрозумійте, як код вписується в загальні робочі процеси",
      },
    ],
  },

  puttingTogether: {
    title: "Об'єднуючи все разом",
    intro: "Ось справжній промпт, який поєднує кілька паттернів:",

    patternAnalysis: {
      title: "Аналіз паттернів",
      patterns: [
        { name: "Закріплення", line: "Reread AGENTS.md..." },
        { name: "Інтенсивність", line: "Use ultrathink" },
        { name: "Свіжий погляд", line: "randomly explore" },
        { name: "Область (глибина)", line: "deeply investigate and understand" },
        { name: "Перші принципи", line: "trace their functionality" },
        { name: "Контекст спочатку", line: "Once you understand...larger context" },
        { name: "Інтенсивність (складена)", line: "super careful, methodical, and critical" },
        { name: "Свіжий погляд", line: 'with "fresh eyes"' },
        { name: "Область (ширина)", line: "any obvious bugs, problems, errors, issues..." },
        { name: "Інтенсивність (потрійна)", line: "systematically and meticulously and intelligently" },
        { name: "Закріплення", line: "comply with ALL rules" },
      ],
    },
  },

  quickReference: {
    title: "Швидка довідка",
    items: [
      {
        pattern: "Інтенсивність",
        when: "Завдання, що потребують максимальної точності",
        keyPhrases: "super carefully, methodical, use ultrathink",
      },
      {
        pattern: "Розширення області",
        when: "Уникання вузького фокусу або коротких шляхів",
        keyPhrases: "take ALL, cast wider net, comprehensive",
      },
      {
        pattern: "Самоперевірка",
        when: "Перед реалізацією або фіналізацією",
        keyPhrases: "are you sure?, is it optimal?, revise if needed",
      },
      {
        pattern: "Свіжий погляд",
        when: "Перегляд коду, знаходження пропущених проблем",
        keyPhrases: "fresh eyes, fellow agents, randomly explore",
      },
      {
        pattern: "Часове",
        when: "Створення постійних артефактів",
        keyPhrases: "future self, self-documenting, self-contained",
      },
      {
        pattern: "Закріплення",
        when: "Після стиснення або ризику дрейфу",
        keyPhrases: "reread AGENTS.md, comply with ALL rules",
      },
      {
        pattern: "Перші принципи",
        when: "Відлагодження або розуміння складного коду",
        keyPhrases: "root causes, first-principle, larger context",
      },
    ],
  },

  codeBlocks: {
    lowIntensity: "# Низька інтенсивність (поведінка за замовчуванням)\n\"Check the code for bugs\"\n\n# Висока інтенсивність (підвищена увага)\n\"Do a super careful, methodical, and critical check\nwith fresh eyes to find any obvious bugs, problems,\nerrors, issues, silly mistakes, etc. and then\nsystematically and meticulously and intelligently\ncorrect them.\"",

    avoidingNarrow: "# Уникання вузького фокусу\n\"Don't restrict yourself to the latest commits,\ncast a wider net and go super deep!\"\n\n# Всеосяжне покриття\n\"Take ALL of that and elaborate on it more,\nthen create a comprehensive and granular set...\"\n\n# Глибина з шириною\n\"Randomly explore the code files in this project,\nchoosing code files to deeply investigate and understand\nand trace their functionality and execution flows\nthrough the related code files which they import\nor which they are imported by.\"",

    planReview: "# Паттерн перегляду плану\n\"Check over each bead super carefully—\nare you sure it makes sense?\nIs it optimal?\nCould we change anything to make the system work better?\nIf so, revise the beads.\n\nIt's a lot easier and faster to operate in 'plan space'\nbefore we start implementing these things!\"",

    freshEyesReview: "# Перегляд коду свіжим поглядом\n\"I want you to carefully read over all of the new code\nyou just wrote and other existing code you just modified\nwith 'fresh eyes' looking super carefully for any obvious\nbugs, errors, problems, issues, confusion, etc.\nCarefully fix anything you uncover.\"\n\n# Фреймінг перегляду колегами\n\"Turn your attention to reviewing the code written by\nyour fellow agents and checking for any issues, bugs,\nerrors, problems, inefficiencies, security problems,\nreliability issues, etc. and carefully diagnose their\nunderlying root causes using first-principle analysis.\"",

    selfDocumenting: "# Самодокументований результат\n\"Create a comprehensive set of beads with detailed comments\nso that the whole thing is totally self-contained and\nself-documenting (including relevant background,\nreasoning/justification, considerations, etc.—\nanything we'd want our 'future self' to know about\nthe goals and intentions and thought process and how it\nserves the over-arching goals of the project).\"",

    postCompaction: "# Оновлення після стиснення\n\"Reread AGENTS.md so it's still fresh in your mind.\nUse ultrathink.\"",

    grounding: "# Заземлення протягом роботи\n\"Be sure to comply with ALL rules in AGENTS.md and\nensure that any code you write or revise conforms to\nthe best practice guides referenced in the AGENTS.md file.\"\n\n# Явне вираження правил\n\"You may NOT delete any file or directory unless I\nexplicitly give the exact command in this session.\"",

    rootCause: "# Акцент на первопричині\n\"Carefully diagnose their underlying root causes\nusing first-principle analysis and then fix or\nrevise them if necessary.\"\n\n# Контекст перед дією\n\"Once you understand the purpose of the code in\nthe larger context of the workflows, I want you\nto do a super careful, methodical check...\"",

    combinedExample: "\"Reread AGENTS.md so it's still fresh in your mind.\nUse ultrathink.\n\nI want you to sort of randomly explore the code files\nin this project, choosing code files to deeply investigate\nand understand and trace their functionality and execution\nflows through the related code files which they import or\nwhich they are imported by.\n\nOnce you understand the purpose of the code in the larger\ncontext of the workflows, I want you to do a super careful,\nmethodical, and critical check with 'fresh eyes' to find\nany obvious bugs, problems, errors, issues, silly mistakes,\netc. and then systematically and meticulously and\nintelligently correct them.\n\nBe sure to comply with ALL rules in AGENTS.md and ensure\nthat any code you write or revise conforms to the best\npractice guides referenced in the AGENTS.md file.\"",
  },
};