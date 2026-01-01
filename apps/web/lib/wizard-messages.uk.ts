/**
 * Wizard Messages - Ukrainian
 *
 * Українські переклади всіх текстів wizard.
 * Технічні терміни залишаємо англійською: VPS, SSH, API, Ubuntu, RAM, CPU, NVMe
 */

// Загальні рядки для всіх сторінок
export const commonMessagesUk = {
  buttons: {
    continue: "Продовжити",
    back: "Назад",
    next: "Далі",
    loading: "Завантаження...",
    copy: "Копіювати",
    copied: "Скопійовано!",
  },
  time: {
    minutes: "хв",
    hours: "год",
  },
  alerts: {
    success: "Успішно",
    warning: "Увага",
    error: "Помилка",
    info: "Інформація",
    tip: "Порада",
  },
  navigation: {
    learningHub: "Навчальний центр",
    home: "Головна",
    setupWizard: "Майстер налаштування",
  },
};

// rent-vps сторінка
export const rentVpsMessagesUk = {
  title: "Орендуйте VPS",
  timeEstimate: "~5 хв",
  description: "Оберіть провайдера VPS та орендуйте сервер. Тут житимуть ваші AI-агенти для кодування.",

  specChecklist: {
    title: "Що обирати",
    specs: [
      { label: "ОС", value: "Ubuntu 24.x або новіше" },
      { label: "CPU", value: "12-16 vCPU" },
      { label: "RAM", value: "64GB рекомендовано (48GB — робочий варіант, 32GB — мінімум)" },
      { label: "Сховище", value: "250GB+ NVMe SSD" },
      { label: "Ціна", value: "~$40-56/міс за 64GB (помісячно)" },
    ],
  },

  alerts: {
    beforeSignup: {
      title: "Перед реєстрацією",
      creditCard: "Потрібна кредитна картка:",
      creditCardDesc: "Обидва провайдери вимагають дійсну кредитну картку. Передплачені картки можуть не працювати.",
      emailVerification: "Підтвердження email:",
      emailVerificationDesc: "Вам потрібно підтвердити email-адресу. Перевірте папку спам, якщо не бачите листа.",
      identityNote: "Деякі провайдери (особливо Contabo) можуть вимагати додаткову верифікацію особи. Зазвичай це займає кілька хвилин, але іноді до 24 годин.",
    },
    differentProvider: {
      title: "Використовуєте іншого провайдера?",
      content: "Підійде будь-який провайдер з Ubuntu VPS та SSH-ключами. Переконайтеся, що можете додати свій публічний SSH-ключ під час налаштування.",
    },
  },

  providers: {
    title: "Рекомендовані провайдери",
    recommendedPlan: "Рекомендований план:",
    whyProvider: "Чому {name}:",
    goTo: "Перейти до {name}",
    contabo: {
      name: "Contabo",
      tagline: "Найкраще співвідношення ціна/характеристики",
      pros: [
        "Найкраще співвідношення характеристик до ціни на ринку",
        "Cloud VPS 50 (64GB RAM, 16 vCPU): ~$56/міс (US датацентр)",
        "Cloud VPS 40 (48GB RAM, 12 vCPU): ~$36/міс (US датацентр)",
        "Помісячна оплата, без зобов'язань",
      ],
      recommended: "Cloud VPS 50 (64GB RAM, 16 vCPU, ~$56/міс US) — наш топ для серйозної мультиагентної роботи",
    },
    ovh: {
      name: "OVH",
      tagline: "Надійний, хороша підтримка",
      pros: [
        "Відмінні EU та US датацентри з анти-DDoS захистом",
        "VPS-5 (64GB RAM, 16 vCore): ~$40/міс (без зобов'язань)",
        "VPS-4 (48GB RAM, 12 vCore): ~$26/міс (без зобов'язань)",
        "Помісячна оплата; довші контракти дають 5-15% знижки",
      ],
      recommended: "VPS-5 (64GB RAM, 16 vCore, ~$40/міс) для найкращої мультиагентної продуктивності",
    },
  },

  disclaimer: {
    title: "Без афіліатних угод, лише чесні рекомендації",
    content: "Я — Jeffrey Emanuel, і не маю жодних фінансових відносин з Contabo, OVH чи будь-яким хмарним провайдером. Жодних афіліатних посилань, відкатів чи спонсорованого контенту. Рекомендую їх, бо сам користуюся. Вони пропонують потужні машини (48GB+ RAM) за частку ціни AWS, GCP чи Azure. На тих великих провайдерах еквівалентні характеристики коштували б у 3-5 разів дорожче.",
  },

  guide: {
    vpsExplanation: {
      term: "VPS (Virtual Private Server)",
      content: "Виділений сервер у датацентрі, що працює 24/7, навіть коли ваш ноутбук закритий. Ви отримуєте root-доступ та повний контроль.",
      whyNeeded: "Навіщо він потрібен?",
      whyContent: "AI-асистенти для кодування найкраще працюють на виділеному сервері, що завжди увімкнений. Запуск на ноутбуці виснажував би батарею та сповільнював усе. З VPS ваші AI-асистенти працюють навіть коли ви спите.",
    },
    whyRam: {
      title: "Чому 64GB RAM?",
      highlight: "⚡ Це дуже важливо!",
      description: "Кожен AI-агент (як Claude Code) використовує близько 2GB RAM під час роботи. Щоб отримати повну потужність цього підходу, вам потрібно запускати 10-20+ агентів одночасно. Це 20-40GB лише для агентів, плюс місце для інструментів розробки та баз даних.",
      options: {
        ram32: "32GB RAM: Абсолютний мінімум. Можна запустити 5-8 агентів. Не рекомендовано.",
        ram48: "48GB RAM: Робочий, але тісно. 10+ агентів. (~$26-36/міс)",
        ram64: "64GB RAM: Просто беріть це. 20+ агентів з запасом. (~$40-56/міс)",
      },
    },
  },
};

// ssh-connect сторінка
export const sshConnectMessagesUk = {
  title: "Підключіться до VPS через SSH",
  timeEstimate: "~3 хв",
  description: "Підключіться до сервера за допомогою SSH.",

  alerts: {
    ipConfirmation: {
      title: "IP-адреса вашого VPS",
      content: "Переконайтеся, що у вас є IP-адреса з попереднього кроку.",
    },
    passwordWarning: {
      title: "Який пароль використовувати",
      correct: "Root-пароль вашого VPS (з листа провайдера або панелі керування)",
      incorrect: [
        "НЕ пароль від комп'ютера",
        "НЕ пароль від акаунту провайдера",
      ],
    },
    typeYes: {
      content: "Коли побачите 'Are you sure you want to continue connecting?', введіть 'yes' та натисніть Enter.",
    },
    passwordHidden: {
      content: "Коли вводите пароль, нічого не з'являється на екрані. Це нормально — просто введіть і натисніть Enter.",
    },
  },

  troubleshooting: {
    title: "Типові проблеми",
    connectionRefused: {
      name: "Connection refused",
      causes: ["VPS ще не повністю завантажився", "Неправильна IP-адреса", "Firewall блокує порт 22"],
      solutions: ["Зачекайте 2-3 хвилини та спробуйте знову", "Перевірте IP-адресу", "Зверніться до підтримки провайдера"],
    },
    timeout: {
      name: "Connection timed out",
      causes: ["Проблеми з мережею", "VPS не відповідає"],
      solutions: ["Перевірте інтернет-з'єднання", "Спробуйте через кілька хвилин", "Перевірте статус VPS у панелі провайдера"],
    },
    permissionDenied: {
      name: "Permission denied",
      causes: ["Неправильний пароль", "Неправильне ім'я користувача"],
      solutions: ["Перевірте пароль від провайдера", "Спробуйте 'ubuntu' замість 'root'"],
    },
  },

  guide: {
    sshExplanation: {
      term: "SSH (Secure Shell)",
      content: "Безпечний спосіб підключення до віддалених комп'ютерів через інтернет. Уявіть це як захищений тунель до вашого сервера.",
    },
  },
};

// accounts сторінка
export const accountsMessagesUk = {
  title: "Створіть акаунти",
  timeEstimate: "~10 хв",
  description: "Зареєструйтеся в сервісах, що забезпечують ваше AI-середовище для кодування.",

  tiers: {
    essential: {
      title: "Обов'язкові",
      description: "Необхідні для базової функціональності",
    },
    recommended: {
      title: "Рекомендовані",
      description: "Значно покращують досвід",
    },
    optional: {
      title: "Опціональні",
      description: "Корисні, можна додати пізніше",
    },
  },

  services: {
    anthropic: {
      name: "Anthropic (Claude)",
      description: "Забезпечує Claude Code — основного AI-агента для кодування",
      note: "Потрібен API-доступ, не лише чат",
    },
    openai: {
      name: "OpenAI",
      description: "Забезпечує Codex CLI для додаткової AI-допомоги",
    },
    google: {
      name: "Google Cloud",
      description: "Забезпечує Gemini CLI",
    },
    github: {
      name: "GitHub",
      description: "Хостинг коду та співпраця",
    },
  },

  alerts: {
    apiKeys: {
      title: "Про API-ключі",
      content: "Вам знадобляться API-ключі від цих сервісів. Не поширюйте їх публічно — ставтеся до них як до паролів.",
    },
  },
};

// Типи для wizard messages
export type WizardMessagesUk = {
  common: typeof commonMessagesUk;
  rentVps: typeof rentVpsMessagesUk;
  sshConnect: typeof sshConnectMessagesUk;
  accounts: typeof accountsMessagesUk;
};
