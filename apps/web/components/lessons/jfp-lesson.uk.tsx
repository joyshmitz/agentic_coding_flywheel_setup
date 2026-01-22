'use client';

import {
  GraduationCap,
  Terminal,
  Globe,
  Search,
  Download,
  Copy,
  Play,
  Zap,
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

export function JfpLessonUk() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Відкрийте та встановлюйте куровані промпти для агентного кодування за допомогою JeffreysPrompts.
      </GoalBanner>

      {/* Секція 1: Що таке JFP */}
      <Section title="Що таке JFP?" icon={<GraduationCap className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>JFP (JeffreysPrompts.com CLI)</Highlight> надає доступ до курованої
          бібліотеки випробуваних промптів для Claude, GPT та інших AI агентів кодування.
          Переглядайте, копіюйте та встановлюйте промпти безпосередньо як skills Claude Code.
        </Paragraph>
        <Paragraph>
          CLI та веб-сайт використовують ту саму бібліотеку промптів, тому використовуйте
          той інтерфейс, який підходить вашому робочому процесу. Промпти організовані в
          пакети та робочі процеси для складних випадків використання.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title="Перегляд"
              description="Досліджуйте куровану колекцію промптів"
              gradient="from-amber-500/20 to-yellow-500/20"
            />
            <FeatureCard
              icon={<Copy className="h-5 w-5" />}
              title="Копіювання"
              description="Миттєво копіюйте промпти до буфера"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Download className="h-5 w-5" />}
              title="Встановлення"
              description="Встановлюйте як skills Claude Code"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Globe className="h-5 w-5" />}
              title="Веб + CLI"
              description="Використовуйте браузер або термінал"
              gradient="from-violet-500/20 to-purple-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Секція 2: Основні команди */}
      <Section title="Основні команди" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'jfp list', description: 'Перелічити всі доступні промпти' },
            { command: 'jfp search <query>', description: 'Шукати промпти' },
            { command: 'jfp show <id>', description: 'Переглянути деталі промпту' },
            { command: 'jfp copy <id>', description: 'Копіювати промпт до буфера' },
            { command: 'jfp install <id>', description: 'Встановити як skill Claude Code' },
            { command: 'jfp installed', description: 'Перелічити встановлені skills' },
          ]}
        />

        <TipBox variant="info">
          Відвідайте <a href="https://jeffreysprompts.com" className="text-blue-400 underline">jeffreysprompts.com</a> для красивого UI для перегляду промптів.
        </TipBox>
      </Section>

      <Divider />

      {/* Секція 3: Швидкий старт */}
      <Section title="Швидкий старт" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <CodeBlock code={`# Browse all prompts
jfp list

# Search for code review prompts
jfp search "code review"

# Install a prompt as a skill
jfp install idea-wizard

# Use in Claude Code
/idea-wizard "build a REST API"`} />
      </Section>
    </div>
  );
}