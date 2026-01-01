/**
 * Agent Mail Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку Agent Mail.
 * Технічні терміни залишаємо англійською: Agent Mail, MCP, JSON-RPC, webhook, project_key, agent_name, message_id
 */

export const agentMailLessonMessagesUk = {
  goalBanner: {
    content: "Координуйте кілька агентів без конфліктів використовуючи Agent Mail.",
  },

  whatIsAgentMail: {
    title: "Що таке Agent Mail?",
    mcpDescription: "це система координації, яка дозволяє кільком AI агентам працювати над одним проєктом, не заважаючи один одному.",
    thinkOfIt: "Уявіть це як email + блокування файлів для агентів. Агенти можуть надсилати повідомлення, резервувати файли, над якими працюють, і залишатися в синхронізації — все зберігається в git.",

    features: {
      messaging: {
        title: "Повідомлення",
        description: "Агенти надсилають і отримують повідомлення з контекстом",
      },
      fileReservations: {
        title: "Резервування файлів",
        description: "Консультативні блокування запобігають конфліктам редагування",
      },
      searchableThreads: {
        title: "Пошук у гілках",
        description: "Знаходьте минулі рішення та обговорення",
      },
      gitPersistence: {
        title: "Збереження в Git",
        description: "Всі артефакти можна перевірити людиною в git",
      },
    },
  },

  whyCoordination: {
    title: "Чому координація важлива",
    intro: "Без координації кілька агентів, що працюють над одною кодовою базою, можуть:",

    problems: [
      {
        problem: "Перезаписувати зміни один одного",
        solution: "Резервування файлів запобігає конфліктам",
      },
      {
        problem: "Дублювати роботу над одним завданням",
        solution: "Гілки повідомлень відстежують, хто що робить",
      },
      {
        problem: "Приймати суперечливі архітектурні рішення",
        solution: "Спільний контекст через гілки з пошуком",
      },
    ],

    tipBox: {
      content: "Agent Mail доступний як MCP server. Ваші агенти можуть використовувати його автоматично, коли налаштований!",
    },
  },

  coreConcepts: {
    title: "Основні концепції",

    projectsAndAgents: {
      title: "Проєкти та агенти",
      description: "Кожен проєкт має зареєстрованих агентів з унікальними іменами",
      codeComment: `# Імена агентів — це комбінації прикметник+іменник
# Приклади: "BlueLake", "GreenCastle", "RedStone"

# Зареєструвати агента
ensure_project(human_key="/data/projects/my-app")
register_agent(
  project_key="/data/projects/my-app",
  program="claude-code",
  model="opus-4.5"
)`,
    },

    sendingMessages: {
      title: "Надсилання повідомлень",
      description: "Агенти спілкуються через структуровані повідомлення",
      code: `send_message(
  project_key="/data/projects/my-app",
  sender_name="BlueLake",
  to=["GreenCastle"],
  subject="Питання про дизайн API",
  body_md="Чи варто використовувати REST або GraphQL для нового endpoint?"
)`,
    },

    fileReservations: {
      title: "Резервування файлів",
      description: "Резервуйте файли перед редагуванням, щоб запобігти конфліктам",
      code: `# Зарезервувати файли перед редагуванням
file_reservation_paths(
  project_key="/data/projects/my-app",
  agent_name="BlueLake",
  paths=["src/api/*.py", "src/routes/*.py"],
  ttl_seconds=3600,  # Оренда на 1 годину
  exclusive=true     # Ніхто інший не може редагувати
)

# Звільнити після завершення
release_file_reservations(
  project_key="/data/projects/my-app",
  agent_name="BlueLake"
)`,
    },

    checkingInbox: {
      title: "Перевірка вхідних",
      description: "Отримати повідомлення, адресовані вам",
      code: `# Перевірити нові повідомлення
fetch_inbox(
  project_key="/data/projects/my-app",
  agent_name="BlueLake",
  since_ts="2025-01-15T10:00:00Z",
  include_bodies=true
)

# Підтвердити важливі повідомлення
acknowledge_message(
  project_key="/data/projects/my-app",
  agent_name="BlueLake",
  message_id=1234
)`,
    },
  },

  commonPatterns: {
    title: "Поширені шаблони",

    startingSession: {
      title: "Початок сесії",
      description: "Використовуйте макрос для швидкого налаштування",
      code: `macro_start_session(
  human_key="/data/projects/my-app",
  program="claude-code",
  model="opus-4.5",
  task_description="Реалізація аутентифікації"
)`,
    },

    replyingToThread: {
      title: "Відповідь у гілці",
      description: "Підтримуйте організованість обговорень",
      code: `reply_message(
  project_key="/data/projects/my-app",
  message_id=1234,
  sender_name="GreenCastle",
  body_md="Я згоден, давайте використаємо GraphQL. Починаю роботу."
)`,
    },

    searchingDiscussions: {
      title: "Пошук минулих обговорень",
      description: "Знайдіть відповідний контекст",
      code: `search_messages(
  project_key="/data/projects/my-app",
  query="authentication AND JWT",
  limit=10
)`,
    },
  },

  coordinationFlow: {
    title: "Потік координації",

    steps: [
      {
        title: "Реєстрація",
        description: "Агент приєднується до проєкту з унікальним іменем",
      },
      {
        title: "Резервування",
        description: "Резервуйте файли перед редагуванням",
      },
      {
        title: "Спілкування",
        description: "Надсилайте повідомлення для координації",
      },
      {
        title: "Робота",
        description: "Вносьте зміни в межах вашого резервування",
      },
      {
        title: "Звільнення",
        description: "Звільніть файли для інших агентів",
      },
    ],
  },

  bestPractices: {
    title: "Кращі практики",

    practices: [
      {
        title: "Резервуйте перед редагуванням",
        description: "Завжди резервуйте файли перед внесенням змін, щоб запобігти конфліктам",
      },
      {
        title: "Робіть теми конкретними",
        description: "Використовуйте описові теми (≤80 символів) для легкого пошуку",
      },
      {
        title: "Використовуйте thread_id послідовно",
        description: "Тримайте пов'язані обговорення в одній гілці",
      },
      {
        title: "Встановлюйте реалістичні TTL",
        description: "Не тримайте резервування файлів довше, ніж потрібно",
      },
      {
        title: "Підтверджуйте, коли потрібно",
        description: "Використовуйте acknowledge_message для ack_required повідомлень",
      },
    ],

    warningTip: {
      content: `Якщо ви бачите FILE_RESERVATION_CONFLICT, інший агент має файл. Дочекайтеся завершення, скоригуйте ваші шаблони або використовуйте неексклюзивні резервування.`,
    },
  },

  quickReference: {
    title: "Швидкий довідник",
    keyFunctionsTitle: "Ключові функції",

    functions: [
      { name: "ensure_project", purpose: "Ініціалізувати проєкт" },
      { name: "register_agent", purpose: "Зареєструвати вашу особистість" },
      { name: "send_message", purpose: "Надіслати повідомлення" },
      { name: "reply_message", purpose: "Відповісти в гілці" },
      { name: "fetch_inbox", purpose: "Отримати ваші повідомлення" },
      { name: "acknowledge_message", purpose: "Підтвердити отримання" },
      { name: "file_reservation_paths", purpose: "Зарезервувати файли" },
      { name: "release_file_reservations", purpose: "Звільнити файли" },
      { name: "search_messages", purpose: "Шукати в гілках" },
      { name: "macro_start_session", purpose: "Швидке налаштування сесії" },
    ],
  },
};