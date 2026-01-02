/**
 * Connection Check Component Messages - Ukrainian
 *
 * Переклад текстів для компонентів перевірки підключення до VPS.
 */

export const connectionCheckMessagesUk = {
  mainWarning: {
    title: "СТОП! Ви підключені до VPS?",
    description: "Команда нижче виконується на вашому VPS, а не на ноутбуці. Якщо ви не підключені, команда не спрацює.",
  },

  comparison: {
    wrongTitle: "Неправильно - Ви на ноутбуці",
    correctTitle: "Правильно - Ви на VPS",
    or: "або:",
  },

  howToConnect: {
    title: "Не підключені? Спочатку виконайте:",
    onWindows: "На Windows:",
  },

  twoComputers: {
    title: "Розуміння: У вас ДВА комп'ютери",
    yourComputer: "Ваш комп'ютер",
    laptopDesktop: "(ноутбук/десктоп)",
    windowsOrMac: "Windows або Mac",
    ssh: "SSH",
    yourVps: "Ваш VPS",
    remoteServer: "(віддалений сервер)",
    linuxInCloud: "Linux у хмарі",
    sshExplanation: "- це як телефонний дзвінок до вашого VPS. Коли ви \"підключені через SSH\", все що ви вводите виконується на VPS, а не на ноутбуці.",
    sshHighlight: "SSH",
    terminalExplanation: "на вашому ноутбуці - це місце, де ви починаєте SSH-з'єднання. Але після підключення ви керуєте VPS.",
    terminalHighlight: "PowerShell, Command Prompt або Terminal",
  },

  whereAmI: {
    title: "Як дізнатися, чи я підключений до VPS?",
    promptExplanation: "Подивіться на запрошення терміналу (текст перед місцем введення):",
    connectedTitle: "Ви підключені до VPS, якщо бачите:",
    connectedHint1: "або",
    connectedHint2Prefix: "Запрошення закінчується на",
    connectedHint2Or: "або",
    connectedHint3: "Кольорове запрошення (якщо вже запустили інсталятор)",
    notConnectedTitle: "Ви НЕ підключені (ще на ноутбуці), якщо бачите:",
    notConnectedHint1: "(Windows Command Prompt)",
    notConnectedHint2: "(PowerShell)",
    notConnectedHint3: "(Mac Terminal)",
    notConnectedHint4: "Будь-яку згадку імені вашого ноутбука або вашого імені користувача Windows/Mac",
    stillConfused: "Все ще не розумієте?",
    hostnameHint: "Введіть",
    hostnameAnd: "і натисніть Enter. Якщо показує ім'я вашого ноутбука (наприклад \"DESKTOP-ABC123\" або \"MacBook-Pro\"), ви не підключені. Якщо показує щось на кшталт \"vps-12345\", ви на VPS.",
  },
};
