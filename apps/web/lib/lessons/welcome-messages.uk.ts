/**
 * Welcome Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку привітання.
 * Технічні терміни залишаємо англійською: VPS, SSH, CLI, terminal, tmux, zsh, Oh My Zsh, NTM
 */

export const welcomeLessonMessagesUk = {
  goalBanner: {
    content: "Зрозумійте, що у вас є і що ви збираєтесь вивчити.",
  },

  whatYouNowHave: {
    title: "Що у вас тепер є",
    congratulations: "Вітаємо! Ви щойно налаштували повністю оснащену робочу станцію для agentic-програмування.",
    highlight: "робочу станцію для agentic-програмування",
    installedIntro: "Ось що встановлено на вашому VPS:",

    features: {
      beautifulTerminal: {
        title: "Красивий Terminal",
        description: "zsh, Oh My Zsh та Powerlevel10k для вражаючого досвіду роботи з shell",
      },
      modernCliTools: {
        title: "Сучасні CLI-інструменти",
        description: "lsd, bat, ripgrep, fzf та zoxide для підвищеної продуктивності",
      },
      languageRuntimes: {
        title: "Мови програмування",
        description: "JavaScript (Bun), Python (uv), Rust та Go готові до роботи",
      },
      threeCodingAgents: {
        title: "Три агенти кодування",
        description: "Claude Code (cc), Codex CLI (cod) та Gemini CLI (gmi)",
      },
    },

    agents: {
      claudeCode: {
        name: "Claude Code",
        shortcut: "cc",
      },
      codexCli: {
        name: "Codex CLI",
        shortcut: "cod",
      },
      geminiCli: {
        name: "Gemini CLI",
        shortcut: "gmi",
      },
    },
  },

  mentalModel: {
    title: "Ментальна модель",
    intro: "Думайте про ваше налаштування так:",
    laptopExplanation: "Ваш ноутбук - це просто пульт дистанційного керування. Справжня робота відбувається на VPS.",
    connectionExplanation: "Якщо з'єднання SSH обірвалось? Не проблема. Ваша робота продовжується у tmux.",

    diagram: {
      yourLaptop: {
        label: "Ваш ноутбук",
        sublabel: "Кабіна пілота",
      },
      yourVps: {
        label: "Ваш VPS",
        sublabel: "Машинне відділення",
      },
      sshConnection: "SSH",

      vpsComponents: {
        tmux: {
          label: "tmux",
          sublabel: "Сесії",
        },
        agents: {
          label: "Агенти",
          sublabel: "Робітники",
        },
        ntm: {
          label: "NTM",
          sublabel: "Оркестратор",
        },
      },
    },
  },

  whatYoullLearn: {
    title: "Що ви вивчите",

    steps: [
      {
        title: "Основи Linux",
        description: "Впевнена навігація файловою системою",
      },
      {
        title: "Основи SSH",
        description: "Підтримка з'єднання з вашим VPS",
      },
      {
        title: "Основи tmux",
        description: "Постійні сесії, які переживають розриви з'єднання",
      },
      {
        title: "Команди агентів",
        description: "Спілкування з Claude, Codex та Gemini",
      },
      {
        title: "Майстерність NTM",
        description: "Оркестрування кількох агентів одночасно",
      },
      {
        title: "Робочий процес flywheel",
        description: "Об'єднання всього для максимальної швидкості",
      },
    ],
  },

  tipBox: {
    content: "Якщо ви коли-небудь щось зламаєте, ви можете видалити цей VPS і повторно запустити ACFS. Ось краса розробки на VPS!",
  },
};