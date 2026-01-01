/**
 * SSH Basics Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку основ SSH.
 * Технічні терміни залишаємо англійською: SSH, VPS, Secure Shell, encrypted, tunnel, tmux, root, ubuntu
 */

export const sshBasicsLessonMessagesUk = {
  goalBanner: {
    content: "Зрозумійте, як залишатися під'єднаним до вашого VPS.",
  },

  whatIsSSH: {
    title: "Що таке SSH?",
    description: "це те, як ви зараз під'єднані до цього VPS.",
    highlight: "SSH (Secure Shell)",
    tunnelDescription: "Це зашифрований тунель між вашим ноутбуком та цим сервером.",
  },

  connectionDiagram: {
    yourLaptop: "Ваш ноутбук",
    encryptedSSH: "Зашифрований SSH",
    yourVPS: "Ваш VPS",
  },

  howYouGotHere: {
    title: "Як ви сюди потрапили",
    description: "Ваше з'єднання з VPS відбулося у два етапи:",

    breakdownTitle: "Розбір команди:",

    stages: {
      passwordLogin: {
        number: 1,
        title: "Вхід за паролем",
        subtitle: "Під час налаштування",
        description: "Коли ви вперше створили ваш VPS, ви під'єдналися як root з паролем",
      },
      keyBasedLogin: {
        number: 2,
        title: "Вхід на основі ключа",
        subtitle: "Зараз",
        description: "Установник скопіював ваш SSH ключ, тому зараз ви під'єднуєтесь безпечно",
      },
    },

    commandParts: {
      ssh: {
        label: "ssh",
        description: "Команда",
      },
      privateKey: {
        label: "-i ~/.ssh/acfs_ed25519",
        description: "Ваш приватний ключ",
      },
      user: {
        label: "ubuntu",
        description: "Ваш звичайний користувач (безпечніше ніж root)",
      },
      serverAddress: {
        label: "@YOUR_SERVER_IP",
        description: "Адреса сервера",
      },
    },
  },

  connectionDrops: {
    title: "Якщо ваше з'єднання обривається",

    tipBox: {
      content: "Не хвилюйтесь! SSH з'єднання іноді обриваються. Просто перепід'єднайтесь—ваша робота в безпеці в tmux (наступний урок).",
    },
  },

  sshKeysVsPasswords: {
    title: "SSH ключі проти паролів",
    description: "Ви тепер використовуєте автентифікацію на основі ключа:",

    keyTypes: {
      privateKey: {
        title: "Приватний ключ",
        description: "Залишається на вашому ноутбуці в ~/.ssh/acfs_ed25519",
      },
      publicKey: {
        title: "Публічний ключ",
        description: "Знаходиться на VPS в ~/.ssh/authorized_keys",
      },
    },

    securityNote: "Це більш безпечно ніж паролі і дозволяє під'єднуватися без введення чого-небудь.",
  },

  keepingConnectionsAlive: {
    title: "Підтримка з'єднання живим",
    description: "Додайте це до ~/.ssh/config на вашому ноутбуці:",
    keepaliveNote: "Це надсилає keepalive пакети кожні 60 секунд.",
  },

  quickConnectAlias: {
    title: "Швидкий alias для під'єднання",
    description: "На вашому ноутбуці додайте до ~/.zshrc або ~/.bashrc:",
    usage: "Тоді просто введіть vps щоб під'єднатися!",
  },

  verifyUnderstanding: {
    title: "Перевірте ваше розуміння",

    questions: [
      {
        question: "Де знаходиться ваш приватний ключ?",
        answer: "~/.ssh/acfs_ed25519 на вашому ноутбуці",
      },
      {
        question: "Що станеться якщо SSH обірветься?",
        answer: "Перепід'єднайтесь; tmux зберігає вашу роботу",
      },
      {
        question: "Який швидкий спосіб перепід'єднатися?",
        answer: "Використайте alias",
      },
    ],
  },

  practiceNow: {
    title: "Практикуйте це зараз",
    description: "Спробуйте ці команди щоб підтвердити, що ваше SSH налаштування працює:",

    tipBox: {
      content: "Коли ви побачите ваш публічний ключ (починається з ssh-ed25519), ви знаєте що налаштування спрацювало!",
    },
  },
};