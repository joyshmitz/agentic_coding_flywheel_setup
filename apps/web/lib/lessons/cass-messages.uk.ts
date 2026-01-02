/**
 * CASS Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку про CASS.
 * Технічні терміни залишаємо англійською: CASS, Claude, Codex, Gemini, Cursor, ChatGPT, TUI
 */

export const cassLessonMessagesUk = {
  goalBanner: {
    content: "Шукайте серед усіх минулих сесій агентів, щоб повторно використати розв'язані проблеми.",
  },

  whatIsCass: {
    title: "Що таке CASS?",
    description1: "CASS (Coding Agent Session Search) індексує всі ваші минулі розмови з агентами—Claude Code, Codex, Gemini, Cursor та інші—щоб ви могли знаходити рішення проблем, які вже розв'язували.",
    highlight1: "CASS (Coding Agent Session Search)",
    description2: "Це як мати пошукову пам'ять усього, що коли-небудь робили ваші агенти в усіх проектах.",

    features: {
      multiAgentIndex: {
        title: "Мультиагентний індекс",
        description: "Claude, Codex, Gemini, Cursor, ChatGPT сесії",
      },
      fullTextSearch: {
        title: "Повнотекстовий пошук",
        description: "Пошук по коду, prompts та відповідях",
      },
      crossProject: {
        title: "Між проектами",
        description: "Знаходьте рішення з будь-якого проекту чи машини",
      },
      fastRetrieval: {
        title: "Швидке отримання",
        description: "Миттєві результати з контекстними уривками",
      },
    },
  },

  whyUseCass: {
    title: "Чому використовувати CASS?",
    intro: "Ви, ймовірно, вже розв'язували багато проблем з агентами. Без CASS:",

    useCases: [
      {
        problem: "Ви натрапляєте на помилку, яку бачили раніше, але не можете згадати виправлення",
        solution: "Шукайте в CASS повідомлення про помилку → знайдіть точне рішення",
      },
      {
        problem: "Новому проекту потрібна автентифікація—ви це вже реалізовували раніше",
        solution: "Шукайте 'authentication' → знайдіть вашу минулу реалізацію",
      },
      {
        problem: "Інший агент розв'язав схожу проблему краще",
        solution: "Шукайте серед усіх агентів → знайдіть найкращий підхід",
      },
    ],

    tipBoxContent: "CASS допомагає уникнути повторного розв'язання тих самих проблем. Ваші минулі сесії агентів — золота жила рішень!",
  },

  essentialCommands: {
    title: "Основні команди",
    warning: "Важливо: Ніколи не запускайте голий cass—він запускає TUI, який може заблокувати вашу сесію. Завжди використовуйте --robot або --json.",

    commands: [
      {
        command: "cass health",
        description: "Перевірити статус індексування",
      },
      {
        command: 'cass search "auth error" --robot --limit 5',
        description: "Пошук з машиночитабельним виходом",
      },
      {
        command: "cass view /path/to/session.jsonl -n 42 --json",
        description: "Переглянути конкретне повідомлення",
      },
      {
        command: "cass expand /path/to/session.jsonl -n 42 -C 3 --json",
        description: "Переглянути з контекстом (3 повідомлення до/після)",
      },
      {
        command: "cass capabilities --json",
        description: "Побачити, які агенти індексовані",
      },
      {
        command: "cass robot-docs guide",
        description: "Повна документація для AI агентів",
      },
    ],
  },

  searchPatterns: {
    title: "Паттерни пошуку",

    patterns: {
      basicSearch: {
        title: "Базовий пошук",
        description: "Знайти будь-яку згадку терміну",
        code: 'cass search "database migration" --robot',
      },
      filterByAgent: {
        title: "Фільтр за агентом",
        description: "Шукати лише в Claude Code сесіях",
        code: 'cass search "error handling" --agent claude --robot',
      },
      recentOnly: {
        title: "Лише недавні",
        description: "Пошук за останні 7 днів",
        code: 'cass search "docker" --days 7 --robot',
      },
      minimalOutput: {
        title: "Мінімальний вихід",
        description: "Лише основні поля",
        code: 'cass search "auth" --robot --fields minimal --limit 10',
      },
      errorMessages: {
        title: "Повідомлення про помилки",
        description: "Знайти рішення для конкретних помилок",
        code: 'cass search "Cannot read property of undefined" --robot',
      },
    },
  },

  searchWorkflow: {
    title: "Робочий процес пошуку",

    steps: {
      search: {
        title: "Пошук",
        description: "Знайти відповідні минулі сесії",
      },
      review: {
        title: "Огляд",
        description: "Перевірити уривки та оцінки",
      },
      expand: {
        title: "Розширити",
        description: "Переглянути повний контекст при потребі",
      },
      apply: {
        title: "Застосувати",
        description: "Використати рішення в поточній роботі",
      },
    },
  },

  understandingOutput: {
    title: "Розуміння виходу",
    description: "CASS повертає структуровані результати з інформацією про сесію та уривки:",

    exampleOutput: `$ cass search "PostgreSQL connection" --robot --limit 2

{
  "hits": [
    {
      "source_path": "/home/ubuntu/.claude/projects/.../session.jsonl",
      "line_number": 87,
      "agent": "claude_code",
      "workspace": "/projects/myapp",
      "snippet": "...виправив PostgreSQL з'єднання встановленням pool_size=20...",
      "score": 0.92
    },
    {
      "source_path": "/home/ubuntu/.codex/sessions/2025-01-12.jsonl",
      "line_number": 45,
      "agent": "codex",
      "workspace": "/projects/backend",
      "snippet": "...формат рядка PostgreSQL з'єднання: postgres://user:pass...",
      "score": 0.85
    }
  ],
  "_meta": { "query": "PostgreSQL connection", "took_ms": 42 }
}`,

    tipBoxContent: "Використовуйте cass expand з шляхом джерела та номером рядка, щоб побачити повний контекст розмови!",
  },

  bestPractices: {
    title: "Найкращі практики",

    practices: [
      {
        title: "Використовуйте специфічні терміни пошуку",
        description: "'PostgreSQL timeout error' краще ніж просто 'error'",
      },
      {
        title: "Фільтруйте за агентом для сфокусованих результатів",
        description: "Якщо пам'ятаєте, який агент це розв'язав, використовуйте --agent",
      },
      {
        title: "Перевіряйте кілька рішень",
        description: "Різні агенти могли розв'язати це по-різному",
      },
      {
        title: "Використовуйте --days для недавнього контексту",
        description: "Старіші рішення можуть використовувати застарілі паттерни",
      },
    ],
  },

  tryItNow: {
    title: "Спробуйте зараз",
    comment1: "Перевірити ваш статус індексування",
    comment2: "Шукати поширений паттерн",
    comment3: "Переглянути повну документацію",
  },
};