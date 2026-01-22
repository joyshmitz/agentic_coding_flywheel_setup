/**
 * DCG Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку DCG.
 * Технічні терміни залишаємо англійською: DCG, Destructive Command Guard, git, reset, delete, rm,
 * Claude Code, PreToolUse, hook, pack, allow-once, fail-open, CLI, TOML, bash, binary, config
 */

import type { DcgLessonMessages } from "./dcg.en";

export const dcgLessonMessagesUk: DcgLessonMessages = {
  // ========================================
  // SECTION: GoalBanner
  // ========================================
  goalBanner: {
    content: "Використовуйте DCG для блокування деструктивних команд до того як вони завдадуть шкоди.",
  },

  // ========================================
  // SECTION 1: What Is DCG?
  // ========================================
  whatIsDcg: {
    title: "Що таке DCG?",

    description: "це hook для Claude Code, який блокує небезпечні команди до їх виконання. Він захищає ваші репозиторії від hard reset, рекурсивного видалення, деструктивних команд баз даних та інших.",
    // ✅ "hook" технічний термін
    // ✅ "hard reset" git термін
    // ✅ "Claude Code" назва інструменту

    thinkOfIt: "Подумайте про це як про блокування безпеки: якщо команда виглядає деструктивною, DCG зупиняє її і пропонує безпечнішу альтернативу.",

    features: {
      preExecutionBlocking: {
        title: "Блокування перед виконанням",
        description: "Зупиняє шкоду до її виникнення",
      },
      protectionPacks: {
        title: "Protection Packs",
        // ❌ НЕ перекладаємо - назва функції DCG
        description: "Git, filesystem, database, cloud та інші",
        // ✅ Назви packs не перекладаємо
      },
      allowOnceCodes: {
        title: "Allow-Once Codes",
        // ❌ НЕ перекладаємо - назва функції DCG
        description: "Явний обхід коли ви впевнені що це безпечно",
      },
      failOpenDesign: {
        title: "Fail-Open Design",
        // ❌ НЕ перекладаємо - архітектурний патерн
        description: "Помилки ніколи не блокують ваш workflow",
        // ✅ "workflow" технічний термін
      },
    },
  },

  // ========================================
  // SECTION 2: How DCG Intercepts Commands
  // ========================================
  howItWorks: {
    title: "Як DCG перехоплює команди",

    description: "DCG працює як PreToolUse hook всередині Claude Code. Кожна команда перевіряється на відповідність набору правил перед запуском.",
    // ✅ "PreToolUse hook" технічний термін не перекладаємо

    example: {
      language: "bash",
      code: `# Example: test command before running
$ dcg test "git reset --hard" --explain
> BLOCKED: git.reset.hard
> Why: hard reset discards uncommitted work
> Safer: git restore --staged .`,
      // ✅ Перший рядок (коментар) перекладаємо
      // ❌ Output dcg НЕ перекладаємо (це фактичний output команди)
    },

    warning: {
      content: "Якщо DCG блокує команду, зупиніться і прочитайте пояснення. Воно показує вам небезпечну частину та безпечніший шлях.",
      // ✅ "зупиніться" більш природне ніж "сповільніться" (дослівний переклад "slow down")
    },
  },

  // ========================================
  // SECTION 3: Essential Commands
  // ========================================
  essentialCommands: {
    title: "Основні команди",

    commands: [
      {
        command: "dcg test '<command>'",
        description: "Перевірити чи буде команда заблокована",
      },
      {
        command: "dcg test '<command>' --explain",
        description: "Пояснити чому команда небезпечна",
      },
      {
        command: "dcg packs",
        description: "Показати доступні protection packs",
        // ✅ "protection packs" технічний термін
      },
      {
        command: "dcg install",
        description: "Зареєструвати hook для Claude Code",
        // ✅ "hook" технічний термін
      },
      {
        command: "dcg uninstall",
        description: "Видалити hook (використовуйте --purge для повного видалення)",
      },
      {
        command: "dcg allow-once <code>",
        description: "Обхід для однієї затвердженої команди",
      },
      {
        command: "dcg doctor",
        description: "Перевірити інсталяцію та статус hook",
      },
    ],
  },

  // ========================================
  // SECTION 4: Uninstalling DCG
  // ========================================
  uninstalling: {
    title: "Видалення DCG",

    description: "Якщо вам потрібно видалити DCG, ви можете деінсталювати hook і опціонально видалити binary та config. Ви завжди можете повторно увімкнути його пізніше за допомогою dcg install.",
    // ✅ "hook", "binary", "config", "dcg install" - технічні терміни

    example: {
      language: "bash",
      code: `# Видалити тільки hook (залишає dcg встановленим)
$ dcg uninstall

# Повне видалення (hook + binary + config)
$ dcg uninstall --purge

# Перевірити видалення
$ dcg doctor
$ claude /hooks`,
      // ✅ Коментарі перекладаємо
      // ✅ Команди залишаємо англійською
    },

    tip: {
      content: "Якщо ви все ще хочете безпеку команд але менше блокувань, віддайте перевагу налаштуванню packs замість видалення.",
      // ✅ "packs" технічний термін
    },
  },

  // ========================================
  // SECTION 5: Protection Packs
  // ========================================
  protectionPacks: {
    title: "Protection Packs",

    description: "Packs дозволяють вам увімкнути або вимкнути правила на основі вашого workflow. Залишайте ті, які вам потрібні, щоб уникнути хибних спрацювань.",
    // ✅ "Packs", "workflow" - технічні терміни

    example: {
      filename: "config.toml",
      language: "toml",
      code: `# ~/.config/dcg/config.toml
[packs]
enabled = ["git", "filesystem", "database.postgresql", "containers.docker"]`,
      // ✅ Коментар перекладаємо
      // ✅ TOML syntax та значення НЕ змінюємо
    },

    tip: {
      content: "Почніть з git та filesystem packs. Додавайте database або cloud packs тільки коли ви використовуєте ці інструменти.",
      // ✅ Назви packs залишаємо англійською
    },
  },

  // ========================================
  // SECTION 6: When You See a Block
  // ========================================
  whenBlocked: {
    title: "Коли ви бачите блокування",

    description: "Блокування — це попередження, а не тупик. Використовуйте його як контрольну точку:",

    steps: [
      "Уважно прочитайте пояснення.",
      "Віддавайте перевагу безпечнішій альтернативі коли це можливо.",
      "Використовуйте allow-once тільки якщо ви впевнені.",
      // ✅ "allow-once" команда залишається англійською
      "Задокументуйте рішення у вашому коміті або нотатках.",
      // ✅ "коміті" від "commit"
    ],
  },

  // ========================================
  // SECTION 7: DCG + SLB
  // ========================================
  dcgPlusSLB: {
    title: "DCG + SLB",

    description: "DCG блокує очевидні деструктивні команди миттєво. SLB обробляє контекстний ризик, що потребує людського схвалення. Разом вони формують багаторівневу систему безпеки.",
    // ✅ "DCG", "SLB" - назви інструментів
  },
};
