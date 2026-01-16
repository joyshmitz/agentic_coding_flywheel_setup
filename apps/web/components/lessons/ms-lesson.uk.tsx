'use client';

import {
  GraduationCap,
  Terminal,
  Zap,
  Package,
  Search,
  CheckCircle,
  Play,
  Settings,
  Download,
} from 'lucide-react';
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  CommandList,
  FeatureCard,
  FeatureGrid,
} from './lesson-components';

export function MsLessonUk() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Освойте локальне управління skills для Claude Code та інших AI агентів за допомогою Meta Skill.
      </GoalBanner>

      {/* Секція 1: Що таке Meta Skill */}
      <Section title="Що таке Meta Skill?" icon={<GraduationCap className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>Meta Skill (ms)</Highlight> це платформа управління знаннями, що працює
          локально і перетворює операційні знання на структуровані, доступні для пошуку,
          артефакти багаторазового використання з Git-backed audit trails.
        </Paragraph>
        <Paragraph>
          Він поєднує BM25 лексичне співставлення з детерміністичними hash embeddings для
          гібридного семантичного пошуку. Зовнішні API не потрібні. Skills можуть походити
          з рукописних файлів, видобування сесій CASS або імпорту пакетів.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Package className="h-5 w-5" />}
              title="Локально-перший"
              description="Skills зберігаються на вашій машині, без залежності від хмари"
              gradient="from-purple-500/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Download className="h-5 w-5" />}
              title="Легке встановлення"
              description="Одна команда для встановлення з JeffreysPrompts"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title="Перегляд Skills"
              description="Відкривайте та шукайте доступні skills"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Settings className="h-5 w-5" />}
              title="Управління"
              description="Оновлюйте, вимикайте та організовуйте ваші skills"
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Секція 2: Основні команди */}
      <Section title="Основні команди" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'ms list', description: 'Перелічити всі встановлені skills' },
            { command: 'ms install <skill>', description: 'Встановити skill з реєстру' },
            { command: 'ms uninstall <skill>', description: 'Видалити встановлений skill' },
            { command: 'ms update', description: 'Оновити всі встановлені skills' },
            { command: 'ms doctor', description: 'Перевірити здоров\'я системи skills' },
            { command: 'ms search <query>', description: 'Шукати skills у реєстрі' },
          ]}
        />

        <TipBox>
          Встановлюйте популярні skills безпосередньо: <code>ms install code-review</code>
        </TipBox>
      </Section>

      <Divider />

      {/* Секція 3: Робота з Skills */}
      <Section title="Робота з Skills" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          Після встановлення skills автоматично стають доступними в Claude Code.
          Використовуйте їх з синтаксисом slash команд.
        </Paragraph>

        <CodeBlock code={`# Перелічіть ваші встановлені skills
ms list

# Встановіть skill
ms install idea-wizard

# Використовуйте його в Claude Code
/idea-wizard "побудувати todo додаток"

# Оновіть всі skills до останніх версій
ms update`} />
      </Section>
    </div>
  );
}