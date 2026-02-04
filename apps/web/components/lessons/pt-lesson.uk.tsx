'use client';

import {
  Wrench,
  Terminal,
  Activity,
  Search,
  Zap,
  Shield,
  Play,
  AlertTriangle,
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

export function PtLessonUk() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Освойте інтелектуальне управління процесами за допомогою Process Triage.
      </GoalBanner>

      {/* Секція 1: Що таке PT */}
      <Section title="Що таке Process Triage?" icon={<Activity className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>PT (Process Triage)</Highlight> ідентифікує та знищує покинуті або
          зомбі-процеси, використовуючи алгоритм оцінки, натхненний Байєсівським підходом.
          Він оцінює тип процесу, вік, статус сироти та використання ресурсів для
          обчислення імовірності покинутості.
        </Paragraph>
        <Paragraph>
          PT запам&#39;ятовує ваші рішення про знищення/збереження схожих процесів,
          покращуючи рекомендації з часом. Він вимагає явного підтвердження і
          спочатку намагається м&#39;яке завершення (SIGTERM).
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title="Розумний пошук"
              description="Знаходьте процеси за назвою, PID або використанням ресурсів"
              gradient="from-lime-500/20 to-green-500/20"
            />
            <FeatureCard
              icon={<Activity className="h-5 w-5" />}
              title="Аналіз ресурсів"
              description="Бачте CPU, пам'ять та I/O з першого погляду"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<AlertTriangle className="h-5 w-5" />}
              title="Виявлення проблем"
              description="Ідентифікуйте втікачі та зомбі-процеси"
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Безпечні дії"
              description="Сигналізуйте процесам з підтвердженням"
              gradient="from-red-500/20 to-rose-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Секція 2: Основні команди */}
      <Section title="Основні команди" icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={[
            { command: 'pt', description: 'Показати огляд процесів' },
            { command: 'pt --top', description: 'Показати найбільших споживачів ресурсів' },
            { command: 'pt search <name>', description: 'Знайти процеси за назвою' },
            { command: 'pt --help', description: 'Показати всі опції' },
          ]}
        />

        <TipBox>
          PT корисний, коли агентам потрібно діагностувати, чому збірки повільні або що споживає ресурси.
        </TipBox>
      </Section>

      <Divider />

      {/* Секція 3: Типові сценарії */}
      <Section title="Типові сценарії" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <CodeBlock code={`# Find what's using CPU
pt --top

# Search for node processes
pt search node

# Find processes using port 3000
pt --port 3000`} />
      </Section>
    </div>
  );
}