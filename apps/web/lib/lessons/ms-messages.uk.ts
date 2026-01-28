/**
 * Meta Skill Lesson Messages - Ukrainian
 */

import type { MsMessages } from './ms-messages';

export const msMessagesUk: MsMessages = {
  goalBanner: {
    content: "Освойте локальне управління skills для Claude Code та інших AI агентів за допомогою Meta Skill."
  },
  sections: {
    whatIsMetaSkill: {
      title: "Що таке Meta Skill?",
      intro: "Meta Skill (ms) це платформа управління знаннями, що працює локально і перетворює операційні знання на структуровані, доступні для пошуку, артефакти багаторазового використання з Git-backed audit trails.",
      details: "Він поєднує BM25 лексичне співставлення з детерміністичними hash embeddings для гібридного семантичного пошуку. Зовнішні API не потрібні. Skills можуть походити з рукописних файлів, видобування сесій CASS або імпорту пакетів."
    },
    essentialCommands: {
      title: "Основні команди",
      tipContent: "Встановлюйте популярні skills безпосередньо: ms install code-review"
    },
    workingWithSkills: {
      title: "Робота з Skills",
      content: "Після встановлення skills автоматично стають доступними в Claude Code. Використовуйте їх з синтаксисом slash команд."
    }
  },
  featureCards: {
    localFirst: {
      title: "Локально-перший",
      description: "Skills зберігаються на вашій машині, без залежності від хмари"
    },
    easyInstall: {
      title: "Легке встановлення",
      description: "Одна команда для встановлення з JeffreysPrompts"
    },
    browseSkills: {
      title: "Перегляд Skills",
      description: "Відкривайте та шукайте доступні skills"
    },
    manage: {
      title: "Управління",
      description: "Оновлюйте, вимикайте та організовуйте ваші skills"
    }
  },
  commands: [
    { command: 'ms list', description: 'Перелічити всі встановлені skills' },
    { command: 'ms install <skill>', description: 'Встановити skill з реєстру' },
    { command: 'ms uninstall <skill>', description: 'Видалити встановлений skill' },
    { command: 'ms update', description: 'Оновити всі встановлені skills' },
    { command: 'ms doctor', description: 'Перевірити здоров\'я системи skills' },
    { command: 'ms search <query>', description: 'Шукати skills у реєстрі' },
  ],
  codeBlock: {
    content: `# List your installed skills
ms list

# Install a skill
ms install idea-wizard

# Use it in Claude Code
/idea-wizard "build a todo app"

# Update all skills to latest versions
ms update`
  }
};