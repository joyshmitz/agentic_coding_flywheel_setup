/**
 * Security Messages - Ukrainian Translation
 *
 * Переклад усіх текстів для сторінки безпеки.
 * Технічні терміни (SSO, 2FA, VPS) залишені англійською.
 */

import type { ChecklistItem } from "./security-messages";

export const securityMessagesUk = {
  title: "Найкращі практики безпеки (стратегія Google SSO)",
  description:
    "ACFS створено для швидкості. Ця сторінка охоплює безпеку акаунтів, щоб ваш підхід 'один логін скрізь' залишався захищеним.",

  navigation: {
    home: "Головна",
    docs: "Документація",
    security: "Безпека",
  },

  scopeNote: {
    title: "Примітка щодо обсягу",
    description:
      "Це стосується безпеки акаунтів (SSO, паролі, відновлення). Це не повний посібник із захисту VPS.",
    accountSecurity: "безпека акаунтів",
  },

  whyGoogleSso: {
    title: "Чому ми рекомендуємо Google SSO",
    benefits: [
      {
        highlight: "Менше паролів",
        text: "означає менше слабких місць.",
      },
      {
        highlight: "Одна особистість для всіх сервісів",
        text: "робить налаштування простішим (особливо для початківців).",
      },
      {
        highlight: "Швидше відновлення",
        text: "якщо ви втратите доступ до сервісу, відновлення відбувається через Google.",
      },
    ],
    modelTitle: "Модель:",
    tree: {
      root: "Ваш акаунт Google",
      children: [
        "Tailscale (доступ до VPS)",
        "Claude (основний агент для кодування)",
        "ChatGPT / Codex (додатковий агент)",
        "Gemini (опціональний агент)",
        "Vercel (розгортання)",
        "Supabase / Cloudflare (опціонально)",
      ],
    },
  },

  tradeoff: {
    title: "Компроміс",
    description:
      "Централізація доступу — це потужно, але це створює єдину точку відмови. Тому захист вашого акаунту Google — це крок нуль.",
    singlePointOfFailure: "єдину точку відмови",
  },

  secureGoogle: {
    title: "Захистіть свій акаунт Google",
    description:
      "Якщо ви зробите лише одну дію — увімкніть двоетапну перевірку (2‑Step Verification) з додатком-аутентифікатором (не SMS).",
    buttons: {
      enable2sv: "Увімкнути двоетапну перевірку",
      advancedProtection: "Програма розширеного захисту (ключі безпеки)",
    },
    links: {
      enable2sv: "https://myaccount.google.com/signinoptions/two-step-verification",
      advancedProtection: "https://landing.google.com/advancedprotection/",
    },
  },

  servicesWithoutSso: {
    title: "Сервіси без Google SSO",
    description:
      "Деякі сервіси не підтримують Google SSO (або ви можете вирішити не використовувати його). Для них:",
    tips: [
      "Використовуйте надійний унікальний пароль (рекомендовано менеджер паролів).",
      "Увімкніть вбудовану 2FA сервісу.",
      "Віддавайте перевагу додаткам-аутентифікаторам або ключам безпеки замість SMS.",
    ],
  },

  passwordManagers: {
    title: "Рекомендації щодо менеджерів паролів",
    description:
      "Для сервісів без Google SSO використовуйте менеджер паролів для генерації та зберігання надійних унікальних паролів.",
    managers: [
      {
        name: "1Password",
        description: "Найкращий загалом. Чудовий UX, інструменти для розробників.",
        href: "https://1password.com/",
        featured: true,
      },
      {
        name: "Bitwarden",
        description: "Найкращий безкоштовний варіант. З відкритим кодом.",
        href: "https://bitwarden.com/",
        featured: false,
      },
      {
        name: "Apple Keychain",
        description: "Вбудований у macOS/iOS. Добре, якщо вже в екосистемі Apple.",
        href: undefined,
        featured: false,
      },
    ],
  },

  compromised: {
    title: "Що робити, якщо акаунт Google зламано?",
    description: "Якщо ви підозрюєте несанкціонований доступ, дійте негайно:",
    steps: [
      {
        highlight: "Змініть пароль Google",
        text: "з довіреного пристрою.",
        link: undefined,
      },
      {
        highlight: "Скасуйте всі дозволи додатків",
        text: "на",
        link: {
          text: "myaccount.google.com/permissions",
          href: "https://myaccount.google.com/permissions",
        },
      },
      {
        highlight: "Перевірте останню активність",
        text: "на",
        link: {
          text: "myaccount.google.com/device-activity",
          href: "https://myaccount.google.com/device-activity",
        },
      },
      {
        highlight: "Повторно автентифікуйтеся в усіх SSO-сервісах",
        text: "(вийдіть і знову увійдіть).",
        link: undefined,
      },
      {
        highlight: "Увімкніть розширений захист",
        text: "для запобігання майбутнім зламам.",
        link: undefined,
      },
    ],
  },

  checklist: {
    title: "Швидкий контрольний список безпеки",
    description: "Відстежуйте свій прогрес тут (зберігається в localStorage на цьому пристрої).",
    resetButton: "Скинути",
    tip: "Порада: якщо ви в майстрі налаштування, поверніться до Акаунтів після захисту вашого акаунту Google.",
    accountsPage: "Акаунтів",
    items: [
      {
        id: "google-2sv",
        label: "Увімкнути двоетапну перевірку Google (використовуйте додаток-аутентифікатор, не SMS).",
        href: "https://myaccount.google.com/signinoptions/two-step-verification",
      },
      {
        id: "google-recovery",
        label: "Встановити резервну електронну пошту + резервний телефон (для відновлення доступу).",
        href: "https://myaccount.google.com/security",
      },
      {
        id: "google-permissions",
        label: "Переглянути та відкликати невідомі підключені додатки.",
        href: "https://myaccount.google.com/permissions",
      },
      {
        id: "password-manager",
        label: "Використовувати менеджер паролів для всього, що не є Google SSO.",
      },
      {
        id: "github-2fa",
        label: "Увімкнути GitHub 2FA (сервіси з email/паролем потребують власної 2FA).",
        href: "https://github.com/settings/security",
      },
      {
        id: "cloudflare-2fa",
        label: "Увімкнути Cloudflare 2FA (сервіс з email/паролем).",
        href: "https://dash.cloudflare.com/profile/authentication",
      },
    ] as ChecklistItem[],
  },
};
