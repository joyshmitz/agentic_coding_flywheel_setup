/**
 * Linux Basics Lesson Messages - Ukrainian
 *
 * Українські переклади для компонента уроку основ Linux.
 * Технічні терміни залишаємо англійською: ls, cd, ssh, tmux, pwd, mkdir, rm, grep, VPS, SSH, CLI, terminal, zsh, bash, bat, ripgrep, fd, zoxide
 */

export const linuxBasicsLessonMessagesUk = {
  goalBanner: {
    content: "Навігуйтесь файловою системою як професіонал за 3 хвилини.",
  },

  whereAmI: {
    title: "Де я знаходжусь?",
    intro: "Спочатку з'ясуємо, де ви знаходитесь у файловій системі:",
    explanation: "Це виводить ваш поточний каталог. Ви повинні побачити",
  },

  whatsHere: {
    title: "Що тут є?",
    intro: "Перерахуйте вміст вашого поточного каталогу:",
    aliasInfo: "З ACFS це має псевдонім",
    aliasDescription: "який показує красиві іконки.",

    variations: {
      title: "Спробуйте ці варіанти:",
      commands: {
        ll: "Довгий формат з деталями",
        la: "Показати приховані файли",
        tree: "Вигляд дерева каталогів",
      },
    },
  },

  movingAround: {
    title: "Переміщення",
    intro: "Навігуйтесь файловою системою за допомогою команди",
    command: ":",

    commands: {
      cdProjects: "Перейти до каталогу проектів",
      cdHome: "Перейти додому (скорочення)",
      cdUp: "Піднятися на один рівень вгору",
      cdPrevious: "Перейти до попереднього каталогу",
    },

    tipBox: {
      content: "З встановленим",
      toolName: "zoxide",
      description: "ви можете використовувати",
      jumpCommand: "щоб перейти до",
      afterVisiting: "після одного відвідування!",
    },
  },

  creatingThings: {
    title: "Створення файлів і каталогів",
    intro: "Створюйте нові каталоги та файли:",

    commands: {
      mkdir: "Створити каталог",
      mkcd: "Створити І перейти до нього (функція ACFS)",
      touch: "Створити порожній файл",
    },
  },

  viewingFiles: {
    title: "Перегляд файлів",
    intro: "Читайте вміст файлів різними способами:",

    commands: {
      cat: "Вивести весь файл (псевдонім для bat)",
      less: "Прокрутити файл (q для виходу)",
      head: "Перші 20 рядків",
      tail: "Останні 20 рядків",
    },
  },

  deletingThings: {
    title: "Видалення",

    warningBox: {
      content: "У Linux немає кошика для сміття.",
      emphasis: "Видалено = втрачено назавжди.",
    },

    commands: {
      rmFile: "Видалити файл",
      rmDirectory: "Видалити каталог (НЕБЕЗПЕЧНО!)",
    },
  },

  searching: {
    title: "Пошук",
    intro: "Знаходьте файли та шукайте їх вміст:",

    commands: {
      ripgrep: "Пошук вмісту файлів (ripgrep)",
      fd: "Знайти файли за назвою",
    },
  },

  verify: {
    title: "Перевірте, що ви це вивчили",
    intro: "Спробуйте цю послідовність, щоб перевірити ваші нові навички:",

    verificationCard: {
      title: "Усі команди працюють?",
      subtitle: "Ви готові до наступного уроку!",
    },
  },
};