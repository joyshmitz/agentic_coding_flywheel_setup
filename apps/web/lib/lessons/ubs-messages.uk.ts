/**
 * UBS Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку UBS (Ultimate Bug Scanner).
 * Технічні терміни залишаємо англійською: UBS, commit, git, node_modules, XSS, SQL injection, TypeScript, Python, Rust, Go, bash, exit code
 */

export const ubsLessonMessagesUk = {
  goalBanner: {
    content: "Навчіться ловити баги до того, як вони потраплять у продакшн за допомогою UBS.",
  },

  whatIsUbs: {
    title: "Що таке UBS?",
    highlightText: "UBS (Ultimate Bug Scanner)",
    description: "це ваша страхувальна сітка перед кожним commit. Він сканує ваш код на звичайні баги, проблеми безпеки та анти-патерни, які можуть прослизнути під час розробки.",
    analogy: "Думайте про нього як про бота для code review, який ловить проблеми за секунди, а не години.",

    features: {
      securityScanning: {
        title: "Сканування безпеки",
        description: "XSS, injection та OWASP уразливості",
      },
      bugDetection: {
        title: "Виявлення багів",
        description: "Null safety, async/await, проблеми типів",
      },
      fastFeedback: {
        title: "Швидкий фідбек",
        description: "Сканує файл менше ніж за 1 секунду",
      },
      multiLanguage: {
        title: "Багато мов",
        description: "TypeScript, Python, Rust, Go і більше",
      },
    },
  },

  goldenRule: {
    title: "Золоте правило",
    mainRule: "перед кожним commit.",
    explanation: "Exit 0 = безпечно комітити. Exit >0 = спочатку виправ проблеми.",
  },

  essentialCommands: {
    title: "Основні команди",
    commands: [
      {
        command: "ubs file.ts",
        description: "Сканувати конкретний файл (найшвидше)",
      },
      {
        command: "ubs src/",
        description: "Сканувати каталог",
      },
      {
        command: "ubs $(git diff --name-only --cached)",
        description: "Сканувати staged файли перед commit",
      },
      {
        command: "ubs --only=js,python src/",
        description: "Фільтрувати за мовою (у 3-5 разів швидше)",
      },
      {
        command: "ubs .",
        description: "Сканувати весь проєкт (ігнорує node_modules)",
      },
    ],
    tip: {
      content: "Завжди обмежуйте область до змінених файлів, коли це можливо. ",
      example1: " виконується менше ніж за 1 секунду, тоді як ",
      example2: " може зайняти 30+ секунд.",
    },
  },

  understandingOutput: {
    title: "Розуміння виводу",
    intro: "Вивід UBS дотримується послідовного формату:",
    outputCode: `⚠️  Null Safety (3 errors)
    src/api/users.ts:42:5 – Possible null dereference
    💡 Use optional chaining: user?.profile

    src/api/users.ts:87:12 – Unchecked array access
    💡 Add bounds check before accessing array[i]

⚠️  Security (1 error)
    src/api/auth.ts:23:8 – SQL injection risk
    💡 Use parameterized queries instead of string concat

Exit code: 1`,
    explainers: [
      {
        pattern: "file:line:col",
        meaning: "Точне розташування проблеми",
      },
      {
        pattern: "💡",
        meaning: "Пропонований виправлення",
      },
      {
        pattern: "Exit code 0/1",
        meaning: "Пройдено (безпечно) / Провалено (потрібні виправлення)",
      },
    ],
  },

  bugSeverityGuide: {
    title: "Посібник з серйозності багів",
    levels: {
      critical: {
        level: "Критичний",
        examples: [
          "Порушення null safety",
          "XSS/Injection уразливості",
          "Проблеми async/await",
          "Витоки пам'яті",
        ],
        action: "Завжди виправляйте негайно",
      },
      important: {
        level: "Важливий",
        examples: [
          "Проблеми звуження типів",
          "Ризики ділення на нуль",
          "Витоки ресурсів",
          "Відсутня обробка помилок",
        ],
        action: "Виправляйте перед продакшеном",
      },
      contextual: {
        level: "Контекстуальний",
        examples: [
          "TODO/FIXME коментарі",
          "Console.log заяви",
          "Невикористані змінні",
          "Магічні числа",
        ],
        action: "Використовуйте розсуд",
      },
    },
  },

  fixWorkflow: {
    title: "Процес виправлення",
    steps: [
      {
        title: "Прочитати знахідку",
        desc: "Зрозумійте категорію та пропозицію виправлення",
      },
      {
        title: "Перейти до розташування",
        desc: "Йдіть до file:line:col",
      },
      {
        title: "Перевірити, що це реально",
        desc: "Не всі знахідки є багами—деякі це хибні спрацьовування",
      },
      {
        title: "Виправити корінну причину",
        desc: "Не просто маскуйте симптом",
      },
      {
        title: "Перезапустити UBS",
        desc: "Підтвердіть, що виправлення спрацювало (exit 0)",
      },
      {
        title: "Commit",
        desc: "Тепер безпечно комітити!",
      },
    ],
  },

  preCommitIntegration: {
    title: "Інтеграція Pre-Commit",
    intro: "Для максимальної безпеки додайте UBS до вашого pre-commit workflow:",
    codeExample: `# У вашому workflow:
$ git add .
$ ubs $(git diff --name-only --cached)
# Якщо exit 0: продовжуйте з commit
# Якщо exit 1: спочатку виправте проблеми

$ git commit -m "feat: add user auth"`,
    tip: {
      content: "ACFS агенти навчені запускати ",
      automatically: " автоматично перед комітом. Ви отримуєте цей захист за замовчуванням!",
    },
  },

  tryItNow: {
    title: "Спробуйте зараз",
    code: `# Переглянути логи сесії
$ ubs sessions --entries 1

# Сканувати ваш проєкт
$ ubs .

# Отримати допомогу
$ ubs --help`,
  },
};