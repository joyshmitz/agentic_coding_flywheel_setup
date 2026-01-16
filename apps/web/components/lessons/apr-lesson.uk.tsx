'use client';

import {
  Wrench,
  Terminal,
  RefreshCw,
  FileText,
  Brain,
  CheckCircle,
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

export function AprLessonUk() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Освойте ревізію планів на базі AI за допомогою Automated Plan Reviser Pro.
      </GoalBanner>

      {/* Секція 1: Що таке APR */}
      <Section title="Що таке APR?" icon={<RefreshCw className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>APR (Automated Plan Reviser Pro)</Highlight> автоматизує ітеративне
          удосконалення специфікацій за допомогою розширених міркувань AI. Замість ручного
          проведення 15-20 раундів перевірки, APR організовує процес автоматично.
        </Paragraph>
        <Paragraph>
          Ранні раунди виправляють архітектурні проблеми, середні раунди удосконалюють
          структуру, пізні раунди полірують абстракції. Процес нагадує числову
          оптимізацію, що стабілізується у мінімумі.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Brain className="h-5 w-5" />}
              title="AI-Базований"
              description="Використовує передові LLM для удосконалення планів"
              gradient="from-teal-500/20 to-cyan-500/20"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Підтримка Markdown"
              description="Працює з вашими існуючими файлами планів"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<RefreshCw className="h-5 w-5" />}
              title="Ітеративний"
              description="Удосконалює плани через декілька проходів"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Швидкий"
              description="Отримайте покращені плани за секунди"
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
            { command: 'apr refine plan.md', description: 'Удосконалити файл плану' },
            { command: 'apr refine --output revised.md', description: 'Зберегти у конкретний файл' },
            { command: 'apr --help', description: 'Показати всі опції' },
          ]}
        />

        <TipBox>
          Використовуйте APR після того, як Claude Code згенерує початковий план, щоб отримати більш ретельну версію.
        </TipBox>
      </Section>

      <Divider />

      {/* Секція 3: Типовий робочий процес */}
      <Section title="Типовий робочий процес" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <CodeBlock code={`# 1. Згенеруйте початковий план за допомогою Claude Code
# (Claude створює plan.md)

# 2. Удосконаліть за допомогою APR
apr refine plan.md -o refined-plan.md

# 3. Перегляньте удосконалений план
cat refined-plan.md

# 4. Передайте назад Claude Code для реалізації`} />
      </Section>
    </div>
  );
}