/**
 * NTM Palette Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку про NTM palette.
 * Технічні терміни залишаємо англійською: NTM, tmux, command palette, prompts
 */

export const ntmPaletteLessonMessagesUk = {
  goalBanner: {
    content: "Відкрийте готові prompts, які заряджають ваших агентів суперсилою.",
  },

  whatIsCommandPalette: {
    title: "Що таке Command Palette?",
    description1: "NTM постачається з command palette - колекцією випробуваних у бою prompts для типових завдань розробки.",
    highlight1: "command palette",
    description2: "Це не просто prompts. Це ретельно створені інструкції, які дають найкращі результати від агентів кодування.",
    browserDescription: "Це відкриває інтерактивний браузер усіх доступних prompts.",
  },

  paletteCategories: {
    title: "Категорії Palette",
    intro: "Prompts організовані по категоріях:",

    categories: {
      architectureDesign: {
        title: "Архітектура та дизайн",
        items: [
          "Аналіз дизайну системи",
          "Огляд архітектури",
          "Паттерни дизайну API",
        ],
      },
      codeQuality: {
        title: "Якість коду",
        items: [
          "Prompts для огляду коду",
          "Пропозиції рефакторингу",
          "Стратегії полювання на баги",
        ],
      },
      testing: {
        title: "Тестування",
        items: [
          "Генерація тестів",
          "Аналіз покриття",
          "Виявлення граничних випадків",
        ],
      },
      documentation: {
        title: "Документація",
        items: [
          "Генерація README",
          "Документація API",
          "Огляд коментарів у коді",
        ],
      },
      debugging: {
        title: "Налагодження",
        items: [
          "Аналіз помилок",
          "Профілювання продуктивності",
          "Виявлення витоків пам'яті",
        ],
      },
    },
  },

  usingPalettePrompts: {
    title: "Використання Palette Prompts",

    options: {
      copyAndSend: {
        title: "Скопіювати і відправити",
        steps: [
          "Відкрити palette: ntm palette",
          "Вибрати prompt",
          "Скопіювати його",
          "Використати ntm send або вставити напряму",
        ],
      },
      directSend: {
        title: "Прямо відправити (силовий хід)",
        description: "Це дозволяє вибрати prompt і негайно відправити його всім агентам!",
      },
    },
  },

  examplePrompts: {
    title: "Приклади Prompts",
    intro: "Ось кілька прикладів з palette:",

    examples: {
      codeReview: {
        title: "Огляд коду",
        prompt: `Перегляньте цей код з акцентом на:
1. Уразливості безпеки
2. Проблеми продуктивності
3. Читабельність коду
4. Необроблені граничні випадки

Для кожної проблеми надайте:
- Конкретну проблему
- Чому це важливо
- Запропоновані виправлення`,
      },
      architectureAnalysis: {
        title: "Аналіз архітектури",
        prompt: `Проаналізуйте архітектуру цієї кодової бази:
1. Визначте основні компоненти
2. Намалюйте потік даних
3. Відзначте будь-які анти-паттерни
4. Запропонуйте покращення

Створіть просту діаграму, якщо це допоможе.`,
      },
    },
  },

  customizingPalette: {
    title: "Налаштування Palette",
    intro: "Ви можете додати власні prompts:",
    location: "Розташування власних prompts",
    instructions: "Створіть .md файли з вашими prompts, і вони з'являться в palette.",
  },

  proTips: {
    title: "Професійні поради",
    tips: [
      {
        title: "Починайте широко, потім звужуйте",
        description: "Спочатку використовуйте prompts високого рівня",
      },
      {
        title: "Поєднуйте агентів",
        description: "Надсилайте різні prompts різним агентам",
      },
      {
        title: "Будуйте на відповідях",
        description: "Використовуйте вихід агента в наступних prompts",
      },
      {
        title: "Зберігайте хороші prompts",
        description: "Додавайте робочі prompts до власного palette",
      },
    ],
  },

  tryItNow: {
    title: "Спробуйте зараз",
    comment1: "Відкрити palette",
    comment2: "Переглянути категорії",
    comment3: "Вибрати щось цікаве",
    comment4: "Спробувати відправити це у вашу тестову сесію",
  },
};