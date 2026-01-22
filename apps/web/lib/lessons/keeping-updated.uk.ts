/**
 * Keeping Updated Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку оновлення.
 * Технічні терміни залишаємо англійською: ACFS, VPS, apt, acfs-update, CLI, cron
 */

export const keepingUpdatedLessonMessagesUk = {
  goalBanner: {
    content: "Навчіться підтримувати ваші ACFS інструменти в актуальному стані.",
  },

  whyUpdatesMatter: {
    title: "Чому важливі оновлення",
    intro: "На вашому VPS встановлено понад 30 інструментів. Кожен з них отримує покращення:",

    benefits: [
      "Виправлення помилок та патчі безпеки",
      "Нові функції та можливості",
      "Кращу продуктивність",
    ],

    updateBenefitsCard: {
      title: "Підтримання оновлень означає:",
      benefits: [
        "Менше загадкових помилок",
        "Кращу безпеку",
        "Доступ до нових можливостей агентів",
      ],
    },
  },

  updateCommand: {
    title: "Команда оновлення",
    intro: "ACFS надає одну команду для оновлення всього:",
    command: "acfs-update",
    description: "От і все! Це оновлює:",

    updateItems: [
      {
        label: "Системні пакети",
        description: "apt",
      },
      {
        label: "Інструменти shell",
        description: "OMZ, P10K, plugins",
      },
      {
        label: "Агентів кодування",
        description: "Claude, Codex, Gemini",
      },
      {
        label: "Cloud CLI",
        description: "Wrangler, Supabase, Vercel",
      },
    ],
  },

  commonPatterns: {
    title: "Поширені шаблони оновлення",

    patterns: [
      {
        title: "Швидке оновлення агентів",
        description: "Якщо вам потрібні лише останні версії агентів:",
        command: "acfs-update --agents-only",
      },
      {
        title: "Пропустити системні пакети",
        description: "Оновлення apt можуть бути повільними. Пропустіть їх, коли поспішаєте:",
        command: "acfs-update --no-apt",
      },
      {
        title: "Переглянути зміни",
        description: "Побачити, що буде оновлено, не змінюючи нічого:",
        command: "acfs-update --dry-run",
      },
      {
        title: "Включити Stack інструменти",
        description: "Stack Dicklesworthstone (ntm, slb, ubs тощо) пропускається за замовчуванням, бо займає більше часу. Включити його можна з:",
        command: "acfs-update --stack",
      },
    ],
  },

  automatedUpdates: {
    title: "Автоматизовані оновлення",
    intro: "Для обслуговування без втручання використовуйте тихий режим:",
    command: "acfs-update --yes --quiet",
    description: "Це запускається без запитань і показує лише помилки.",
    tip: "Ви можете додати це до cron job для щотижневих оновлень!",

    cronExample: {
      comment1: "# Редагувати crontab",
      command1: "crontab -e",
      comment2: "# Додати цей рядок для щотижневих оновлень у неділю о 3 ранку",
      cronLine: "0 3 * * 0 $HOME/.local/bin/acfs-update --yes --quiet >> $HOME/.acfs/logs/cron-update.log 2>&1",
    },
  },

  checkingLogs: {
    title: "Перевірка логів оновлення",
    intro: "Кожне оновлення логується:",

    commands: [
      {
        comment: "# Список останніх логів",
        command: "ls -lt ~/.acfs/logs/updates/ | head -5",
      },
      {
        comment: "# Переглянути найостанніший лог",
        command: "cat ~/.acfs/logs/updates/$(ls -1t ~/.acfs/logs/updates | head -1)",
      },
      {
        comment: "# Спостерігати за поточним оновленням",
        command: "tail -f ~/.acfs/logs/updates/$(ls -1t ~/.acfs/logs/updates | head -1)",
      },
    ],
  },

  troubleshooting: {
    title: "Усунення проблем",

    issues: [
      {
        title: "apt заблоковано",
        description: 'Якщо ви бачите "apt is locked by another process":',
        solution: `# Wait for other apt operations to finish, or:
sudo rm /var/lib/dpkg/lock-frontend
sudo dpkg --configure -a`,
      },
      {
        title: "Оновлення агента невдале",
        description: "Спробуйте оновити напряму:",
        solution: `# Claude
claude update

# Codex
bun install -g --trust @openai/codex@latest

# Gemini
bun install -g --trust @google/gemini-cli@latest`,
      },
      {
        title: "Shell інструменти не оновлюються",
        description: "Перевірте доступ до git remote:",
        solution: "git -C ~/.oh-my-zsh remote -v",
      },
    ],
  },

  quickReference: {
    title: "Швидка довідка",

    commands: [
      { command: "acfs-update", description: "Оновити все (крім stack)" },
      { command: "acfs-update --stack", description: "Включити stack інструменти" },
      { command: "acfs-update --agents-only", description: "Оновити лише агентів" },
      { command: "acfs-update --no-apt", description: "Пропустити apt (швидше)" },
      { command: "acfs-update --dry-run", description: "Переглянути зміни" },
      { command: "acfs-update --yes --quiet", description: "Автоматичний режим" },
      { command: "acfs-update --help", description: "Повна довідка" },
    ],

    tableHeaders: {
      command: "Команда",
      description: "Що робить",
    },
  },

  howOften: {
    title: "Як часто оновлювати?",
    intro: "Рекомендації:",

    frequencies: [
      {
        frequency: "Щотижня",
        recommendation: "Повне оновлення включаючи stack",
      },
      {
        frequency: "Після проблем",
        recommendation: "Якщо щось зламалося, спочатку оновіть",
      },
      {
        frequency: "Перед великою роботою",
        recommendation: "Отримайте останні версії агентів",
      },
    ],
  },

  congratulations: {
    title: "Вітаємо!",
    subtitle: "Ви завершили адаптацію ACFS!",
    description: "Тепер у вас є:",

    achievements: [
      "Повністю налаштований VPS для розробки",
      "Три потужних агента кодування",
      "Повний набір інструментів координації",
      "Знання, як це все використовувати",
    ],

    finalMessage: "Йдіть і створюйте щось дивовижне!",
  },
};