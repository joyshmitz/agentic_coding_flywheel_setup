/**
 * Real World Case Study Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку Real World Case Study.
 * Назви проєктів залишаємо англійською: cass-memory, AGENTS.md, beads, flywheel
 * Технічні терміни: CLI, API, TypeScript, Zod, git, commit, Agent Mail, MCP
 */

export const realWorldCaseStudyLessonMessagesUk = {
  goalBanner: {
    content: "Вивчіть повний flywheel робочий процес на реальному проєкті: 693 beads, 282 коміти в перший день, 85% завершено за години.",
  },

  introduction: {
    title: "Виклик: Побудова системи пам'яті",
    intro: "7 грудня 2025 року був задуманий новий проєкт:",
    cassMemory: "cass-memory",
    description: "- система процедурної пам'яті для агентів кодування. Ціль? Піти від нуля до повністю функціонального CLI інструменту за один день, використовуючи flywheel робочий процес.",
    walkThrough: "Цей урок проводить вас точно через те, як це було зроблено, щоб ви могли відтворити цей робочий процес на власних проєктах.",
  },

  phase1: {
    title: "Фаза 1: Планування з кількома моделями",
    intro: "Перший крок - це не почати кодувати. Це",
    gatherPerspectives: "зібрати різноманітні перспективи",
    onProblem: "на проблему.",

    collectProposals: {
      title: "Зібрати конкуруючі пропозиції",
      description: "Попросіть кілька frontier моделей запропонувати плани реалізації",
    },

    models: {
      gpt: {
        name: "GPT 5.1 Pro",
        focus: "Підхід наукової валідації",
      },
      gemini: {
        name: "Gemini 3 Ultra",
        focus: "Пошукові покажчики & tombstones",
      },
      grok: {
        name: "Grok 4.1",
        focus: "Міжагентське збагачення",
      },
      claude: {
        name: "Claude Opus 4.5",
        focus: "Дизайн ACE pipeline",
      },
    },

    instruction: "Кожна модель отримала однаковий промпт з мінімальним керівництвом - лише 2-3 повідомлення для уточнення цілі. Ключова інструкція: \"Розробіть систему пам'яті, яка працює для всіх агентів кодування, а не лише для Claude.\"",

    tipSaveConversations: {
      intro: "Збережіть кожну розмову як markdown.",
      toolMention: "Інструмент chat_shared_conversation_to_file робить це легко.",
    },
  },

  phase2: {
    title: "Фаза 2: Синтез плану",
    intro: "Тепер приходить вирішальний крок: одна модель синтезує найкращі ідеї з усіх пропозицій в один головний план.",
    resultLines: "Отриманий план мав 5,600+ рядків - всеосяжний план, що охоплює архітектуру, моделі даних, CLI команди, reflection pipeline, зберігання та дорожню карту реалізації.",

    synthesisResult: {
      title: "PLAN_FOR_CASS_MEMORY_SYSTEM.md",
      lines: "рядків",
      sections: "основні секції",
      bestIdeas: "Найкращі ідеї",
      fromModels: "від 4 моделей",
      complete: "Повна",
      roadmap: "дорожня карта реалізації",
    },
  },

  planAnatomy: {
    title: "Анатомія чудового плану",
    intro: "План - це основа успішного agentic проєкту. Розберемо, що робить",
    actualPlan: "справжній план з 5,600+ рядків",
    soEffective: "таким ефективним.",

    documentStructure: {
      title: "Структура документа: 11 основних секцій",
      sections: [
        {
          number: 1,
          title: "Виконавче резюме",
          description: "Постановка проблеми, рішення з трьох шарів, таблиця ключових інновацій",
        },
        {
          number: 2,
          title: "Основна архітектура",
          description: "Когнітивна модель, ACE pipeline, 7 принципів дизайну",
        },
        {
          number: 3,
          title: "Моделі даних",
          description: "TypeScript схеми, алгоритм розпаду довіри, правила валідації",
        },
        {
          number: 4,
          title: "CLI команди",
          description: "15+ команд з прикладами використання та JSON виводами",
        },
        {
          number: 5,
          title: "Reflection Pipeline",
          description: "Фази Generator, Reflector, Validator, Curator",
        },
        {
          number: 6,
          title: "Інтеграція",
          description: "Пошукова обгортка, обробка помилок, санітизація секретів",
        },
        {
          number: 7,
          title: "Інтеграція LLM",
          description: "Абстракція провайдерів, Zod схеми, шаблони промптів",
        },
        {
          number: 8,
          title: "Зберігання та постійність",
          description: "Структура директорій, каскадна конфігурація, embeddings",
        },
        {
          number: 9,
          title: "Інтеграція агентів",
          description: "Шаблон AGENTS.md, дизайн MCP сервера",
        },
        {
          number: 10,
          title: "Дорожня карта реалізації",
          description: "Поетапне постачання з пріоритетами ROI",
        },
        {
          number: 11,
          title: "Матриця порівняння",
          description: "Чекліст функцій проти конкуруючих пропозицій",
        },
      ],
    },

    effectivePatterns: {
      title: "Паттерни, що роблять плани ефективними",
      patterns: [
        {
          title: "Підхід теорії-спочатку",
          description: "Кожна основна функція включає: визначення схеми → алгоритм → приклади використання → нотатки реалізації. Ніколи не стрибає до коду перед поясненням чому.",
          gradient: "from-violet-500/20 to-purple-500/20",
        },
        {
          title: "Прогресивна деталізація",
          description: "Прості концепції розширюються в вкладені деталі. 'Bullet maturity' починається як концепція, стає машиною станів, потім включає правила переходів та обчислення розпаду.",
          gradient: "from-emerald-500/20 to-teal-500/20",
        },
        {
          title: "Конкретні приклади повсюди",
          description: "Не лише 'валідувати входи', а справжні TypeScript інтерфейси, JSON виводи, приклади bash команд та ASCII діаграми, що показують потік даних.",
          gradient: "from-sky-500/20 to-blue-500/20",
        },
        {
          title: "Передбачені крайні випадки",
          description: "План адресує обробку помилок для timeouts cass, блокування токсичних bullet, виявлення застарілих правил та санітизації секретів перед початком реалізації.",
          gradient: "from-amber-500/20 to-orange-500/20",
        },
        {
          title: "Таблиці порівняння",
          description: "Ключові рішення контекстуалізовані проти альтернатив. Показує компроміси між підходами з різних пропозицій моделей.",
          gradient: "from-rose-500/20 to-pink-500/20",
        },
      ],
    },

    distinctiveInnovations: {
      title: "Особливі інновації в цьому плані",
      innovations: [
        {
          title: "Період напіврозпаду довіри",
          description: "Правила втрачають довіру з часом. Шкідливі події зважені в 4× від корисних. Повний алгоритм з факторами розпаду специфікований.",
        },
        {
          title: "Інверсія анти-паттерну",
          description: "Шкідливі правила перетворені на 'НЕ робіть X' замість видалення, зберігаючи навчання при інверсії поради.",
        },
        {
          title: "Ворота кількості доказів",
          description: "Пре-LLM евристичний фільтр, що зберігає API дзвінки. Правила потребують мінімальних доказів перед просуванням.",
        },
        {
          title: "Каскадна конфігурація",
          description: "Глобальні користувацькі playbooks + playbooks рівня репо інтелігентно об'єднані з розв'язанням конфліктів.",
        },
      ],
    },

    planChecklist: {
      title: "Що ваші плани повинні включати:",
      items: [
        "Виконавче резюме - Проблема + рішення на 1 сторінці",
        "Моделі даних - TypeScript/Zod схеми для всіх сутностей",
        "CLI/API поверхня - Кожна команда з прикладами",
        "Архітектурні діаграми - ASCII коробки, що показують потік даних",
        "Обробка помилок - Що може піти не так, як відновитися",
        "Дорожня карта реалізації - Пріоритетні фази з залежностями",
        "Таблиці порівняння - Чому цей підхід над альтернативами",
      ],
    },

    studyTemplate: {
      intro: "Повний план доступний на",
      github: "github.com/Dicklesworthstone/cass_memory_system",
      study: "Вивчіть його як шаблон для власних планів проєктів.",
    },
  },

  phase3: {
    title: "Фаза 3: Від плану до Beads",
    intro: "Файл markdown з 5,600 рядків чудовий для людей, але агенти потребують",
    structuredTasks: "структурованих, відстежуваних завдань",
    whereBead: "Ось де приходять beads.",

    transformation: {
      title: "Структура Beads",
      epics: "Епіки",
      tasks: "Завдання",
      leadTime: "Серед. час виконання",
      description: "Завдання пов'язані з залежностями, щоб блокери були видимими і агенти знали, над чим працювати далі.",
    },

    multiplePassesToRefine: "Ця трансформація зайняла кілька проходів для вдосконалення. Агенти переглянули та покращили структуру beads кілька разів.",
  },

  phase4: {
    title: "Фаза 4: Виконання роєм",
    intro: "З 350+ beads готовими, настав час",
    unleashSwarm: "вивільнити рій",
    multipleAgents: "Кілька агентів працюють паралельно, кожен вибираючи завдання на основі того, що готове.",

    swarmSetup: {
      title: "Рій агентів",
      claudeCode: {
        name: "Claude Code",
        agents: "5-6 агентів (Opus 4.5)",
      },
      codexCli: {
        name: "Codex CLI",
        agents: "3 агенти (5.1 Max)",
      },
      geminiCli: {
        name: "Gemini CLI",
        agents: "2 агенти (обов'язок перегляду)",
      },
    },

    coordination: "Агенти координуються, використовуючи bv (beads viewer), щоб бачити, що готове, уникаючи конфліктів і забезпечуючи, щоб найважливіші блокери очищувались першими.",
  },

  agentCoordination: {
    title: "Координація агентів з Agent Mail",
    intro: "Коли агенти потребують ділитися контекстом або координуватися над перекриваючою роботою,",
    agentMail: "Agent Mail",
    providesCommunication: "забезпечує комунікаційний шар.",

    features: [
      {
        title: "Резервації файлів:",
        description: "Агенти заявляють файли перед редагуванням, щоб уникнути конфліктів",
      },
      {
        title: "Оновлення статусу:",
        description: "Агенти звітують про прогрес, щоб інші знали, що відбувається",
      },
      {
        title: "Передачі:",
        description: "Коли один агент закінчує блокер, залежні агенти отримують сповіщення",
      },
      {
        title: "Запити перегляду:",
        description: "Агенти можуть просити один одного переглянути їх роботу",
      },
    ],

    fullArchivePublished: "Повний архів Agent Mail з цього проєкту був опублікований як статичний сайт, тож ви можете побачити справжню комунікацію агент-до-агента.",
  },

  commitCadence: {
    title: "Ритм комітів",
    intro: "З багатьма агентами, що працюють одночасно, коміти потребують ретельної оркестрації. Виділений",
    commitAgent: "агент комітів",
    runsContinuously: "працює безперервно.",

    commitStats: {
      title: "Статистика комітів",
      day1Commits: "Коміти дня 1",
      perHour: "На годину",
      detailed: "Детальні",
      messages: "Повідомлення",
      description: "Агент комітів запускався кожні 15-20 хвилин, групуючи зміни логічно та пишучи детальні повідомлення комітів.",
    },

    atomicCommits: "Цей паттерн забезпечує атомні, добре документовані коміти навіть коли 10+ агентів роблять зміни одночасно.",
  },

  resultsLessons: {
    title: "Результати та ключові уроки",
    intro: "Після одного дня flywheel-powered розробки, проєкт cass-memory досяг:",

    stats: {
      linesOfCode: {
        value: "11K+",
        label: "Рядків коду",
      },
      day1Commits: {
        value: "282",
        label: "Коміти дня 1",
      },
      testsPassing: {
        value: "151",
        label: "Тести проходять",
      },
      complete: {
        value: "85-90%",
        label: "Завершено",
      },
    },

    keyLessons: {
      title: "Ключові уроки",
      lessons: [
        {
          title: "Планування - це 80% роботи",
          description: "Детальний план робить виконання агентів передбачуваним і швидким",
        },
        {
          title: "Синтез з кільком моделями перемагає планування однією моделлю",
          description: "Кожна модель принесла унікальні розуміння, які покращили фінальний дизайн",
        },
        {
          title: "Beads забезпечують паралелізм",
          description: "Структуровані завдання з залежностями дозволяють багатьом агентам працювати без конфліктів",
        },
        {
          title: "Інструменти координації обов'язкові",
          description: "Agent Mail та резервації файлів запобігають агентам заступати один одному на ноги",
        },
        {
          title: "Виділений агент комітів підтримує історію чистою",
          description: "Відокремлення відповідальності за коміти від кодування забезпечує атомні коміти",
        },
      ],
    },
  },

  tryItYourself: {
    title: "Спробуйте самі",
    intro: "Готові спробувати цей робочий процес на власному проєкті? Ось швидкий старт:",

    tip: {
      intro: "Починайте з меншого за приклад cass-memory. Спробуйте цей робочий процес з проєктом, який зазвичай зайняв би у вас день-два вручну. Побудуйте свою впевненість перед тим, як братися за більші проєкти.",
    },
  },

  dayOneResults: {
    title: "Результати дня 1",
    stats: {
      totalBeads: "Всього Beads",
      day1Commits: "Коміти дня 1",
      agentsInvolved: "Агенти задіяні",
      toComplete: "До 85% завершено",
    },
  },

  codeBlocks: {
    competingProposals: "# Розмістіть всі файли пропозицій у папці проєкту\ncompeting_proposal_plans/\n  2025-12-07-gemini-*.md\n  2025-12-07-grok-*.md\n  gpt_pro_version.md\n  claude_version/\n\n# Попросіть Opus 4.5 створити гібридний план\ncc \"Read all the files in competing_proposal_plans/.\nCreate a hybrid plan that takes the best parts of each.\nWrite it to PLAN_FOR_CASS_MEMORY_SYSTEM.md\"",

    beadsInit: "# Ініціалізуйте beads у проєкті\nbd init\n\n# Нехай агент трансформує план у beads\ncc \"Read PLAN_FOR_CASS_MEMORY_SYSTEM.md carefully.\n\nTransform each section, feature, and implementation detail\ninto individual beads using the bd CLI.\n\nCreate epics for major phases, then break them into tasks.\nSet up dependencies so blockers are clear.\nUse priorities: P0 for foundation, P1-P2 for core features,\nP3-P4 for polish and future work.\n\nCreate at least 300 beads covering the full implementation.\"",

    swarmWorkflow: "# Запустіть рій з NTM\nntm spawn cass-memory --cc=6 --cod=3 --gmi=2\n\n# Кожен агент виконує цей робочий процес:\n# 1. Перевірити що готове\nbv --robot-triage\n\n# 2. Заявити завдання\nbd update <id> --status in_progress\n\n# 3. Реалізувати\n# (агент виконує роботу)\n\n# 4. Закрити коли готово\nbd close <id>\n\n# 5. Повторити",

    agentMailExample: "# Приклад координації Agent Mail\n\n# Агент \"BlueLake\" резервує файли перед редагуванням\nmcp.file_reservation_paths(\n  project_key=\"/data/projects/cass-memory\",\n  agent_name=\"BlueLake\",\n  paths=[\"src/playbook/*.ts\"],\n  ttl_seconds=3600,\n  exclusive=true\n)\n\n# Агент \"GreenCastle\" повідомляє про очищення блокера\nmcp.send_message(\n  project_key=\"/data/projects/cass-memory\",\n  sender_name=\"GreenCastle\",\n  to=[\"BlueLake\", \"RedFox\"],\n  subject=\"Types foundation complete\",\n  body_md=\"Zod schemas are done. You can now work on playbook and CLI.\"\n)",

    commitAgent: "# Паттерн агента комітів (працює кожні 15-20 хвилин)\n\n# Крок 1: Зрозумій проєкт\ncc \"First read AGENTS.md, read the README, and explore\nthe project to understand what we're doing. Use ultrathink.\"\n\n# Крок 2: Коміт у логічних групах\ncc \"Based on your knowledge of the project, commit all\nchanged files now in a series of logically connected\ngroupings with super detailed commit messages for each\nand then push.\n\nTake your time to do it right. Don't edit the code at all.\nDon't commit ephemeral files. Use ultrathink.\"",

    quickstart: "# 1. Зібрати пропозиції з кількох моделей\n# (Використайте GPT Pro, Gemini, Claude, Grok - до яких у вас є доступ)\n# Збережіть кожну як markdown у competing_proposal_plans/\n\n# 2. Синтезуйте в головний план\ncc \"Read all files in competing_proposal_plans/.\nCreate a hybrid plan taking the best of each.\nWrite to PLAN.md\"\n\n# 3. Трансформуйте план у beads\nbd init\ncc \"Read PLAN.md. Transform into 100+ beads with\ndependencies and priorities. Use bd CLI.\"\n\n# 4. Запустіть рій\nntm spawn myproject --cc=3 --cod=2 --gmi=1\n\n# 5. Моніторте з bv\nbv --robot-triage  # Подивіться що готове\n\n# 6. Спостерігайте за магією\nntm attach myproject\n\n# 7. (Кожні 15-20 хв) Запустіть агента комітів\ncc \"Commit all changes in logical groupings with\ndetailed messages. Don't edit code. Push when done.\"",
  },
};