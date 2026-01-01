/**
 * Agents Login Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку про логін агентів.
 * Технічні терміни залишаємо англійською: Claude, Anthropic, OpenAI, Google, OAuth, API
 */

export const agentsLoginLessonMessagesUk = {
  goalBanner: {
    content: "Увійдіть до ваших агентів кодування та зрозумійте ярлики.",
  },

  threeAgents: {
    title: "Три агенти",
    description: "У вас встановлено три потужні агенти кодування, кожен від різної AI-компанії:",

    agents: {
      claudeCode: {
        name: "Claude Code",
        command: "claude",
        alias: "cc",
        company: "Anthropic",
      },
      codexCli: {
        name: "Codex CLI",
        command: "codex",
        alias: "cod",
        company: "OpenAI",
      },
      geminiCli: {
        name: "Gemini CLI",
        command: "gemini",
        alias: "gmi",
        company: "Google",
      },
    },
  },

  whatAliasesDo: {
    title: "Що роблять ярлики",
    description: "Ярлики налаштовані для максимальної сили (vibe mode):",

    aliases: {
      claudeCode: {
        alias: "cc",
        name: "Claude Code",
        code: `NODE_OPTIONS="--max-old-space-size=32768" \\
  ENABLE_BACKGROUND_TASKS=1 \\
  claude --dangerously-skip-permissions`,
        features: [
          "Додаткова пам'ять для великих проектів",
          "Підтримка фонових завдань",
          "Немає запитів на дозволи",
        ],
      },
      codexCli: {
        alias: "cod",
        name: "Codex CLI",
        code: "codex --dangerously-bypass-approvals-and-sandbox",
        features: [
          "Обійти безпекові запити",
          "Немає перевірок approval/sandbox",
        ],
      },
      geminiCli: {
        alias: "gmi",
        name: "Gemini CLI",
        code: "gemini --yolo",
        features: ["YOLO режим (без підтверджень)"],
      },
    },
  },

  firstLogin: {
    title: "Перший вхід",
    description: "Кожен агент потребує одноразової автентифікації:",

    loginSteps: {
      claudeCode: {
        agent: "Claude Code",
        command: "claude auth login",
        description: "Перейдіть за посиланням у браузері для автентифікації з вашим Anthropic акаунтом.",
      },
      codexCli: {
        agent: "Codex CLI",
        command: "codex login",
        description: "Слідуйте запитам браузера для автентифікації з вашим ChatGPT Pro/Plus/Team акаунтом.",
      },
      geminiCli: {
        agent: "Gemini CLI",
        command: "gemini",
        description: "Слідуйте запитам для автентифікації з вашим Google акаунтом.",
      },
    },

    openaiWarning: {
      title: "OpenAI має ДВА типи акаунтів",
      chatgptType: {
        title: "ChatGPT (Pro/Plus/Team)",
        items: [
          "Для Codex CLI, ChatGPT web",
          "Auth через OAuth (codex login)",
          "Отримати на chat.openai.com",
        ],
      },
      apiType: {
        title: "API (pay-as-you-go)",
        items: [
          "Для OpenAI API, бібліотек",
          "Використовує OPENAI_API_KEY змінну середовища",
          "Отримати на platform.openai.com",
        ],
      },
      description: "Codex CLI використовує ChatGPT OAuth, не API ключі. Якщо у вас є OPENAI_API_KEY, це для API—інша система!",
      troubleshooting: "Якщо login не вдається: Перевірте ChatGPT Settings → Security → \"API/Device access\"",
    },
  },

  backupCredentials: {
    title: "Зробіть резервну копію ваших облікових даних!",
    description: "Після входу негайно зробіть резервну копію ваших облікових даних:",
    instructionsAfter: "Тепер ви можете перемикати акаунти пізніше з:",
    tipBoxContent: "Це надзвичайно корисно, коли ви досягаєте лімітів швидкості! Перемкніться на резервний акаунт і продовжуйте працювати.",
  },

  testAgents: {
    title: "Протестуйте ваших агентів",
    description: "Спробуйте кожного, щоб перевірити, що вони працюють:",
  },

  quickTips: {
    title: "Швидкі поради",
    tips: [
      {
        title: "Починайте просто",
        description: "Дозвольте агентам виконувати спочатку маленькі завдання",
      },
      {
        title: "Будьте конкретними",
        description: "Чіткі інструкції дають кращі результати",
      },
      {
        title: "Перевіряйте вихід",
        description: "Агенти можуть помилятися",
      },
      {
        title: "Використовуйте кількох агентів",
        description: "Різні агенти мають різні сильні сторони",
      },
    ],
  },

  practiceNow: {
    title: "Попрактикуйтеся зараз",
    description: "Давайте перевіримо, що ваші агенти готові:",
    comment1: "Перевірити, які агенти встановлені",
    comment2: "Перевірити ваші резервні копії облікових даних агентів",
    comment3: "Якщо ви ще не увійшли, почніть з Claude:",
    tipBoxContent: "Якщо ви налаштували ваші акаунти під час майстра (Крок 7: Налаштувати акаунти), у вас вже готові облікові дані—просто запустіть команди входу!",
  },
};