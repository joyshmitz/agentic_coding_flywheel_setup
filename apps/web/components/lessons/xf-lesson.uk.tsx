'use client';

import {
  Search,
  Terminal,
  Zap,
  Database,
  Clock,
  FileText,
  Play,
  Archive,
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

export function XfLessonUk() {
  return (
    <div className="space-y-8">
      <GoalBanner>
        Шукайте по вашому архіву X/Twitter з суб-мілісекундними запитами за допомогою xf.
      </GoalBanner>

      {/* Секція 1: Що таке XF */}
      <Section title="Що таке XF?" icon={<Archive className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>XF</Highlight> надає блискавично швидкий повнотекстовий пошук по вашому
          особистому архіву X/Twitter: твіти, лайки, DM та розмови з Grok. Побудований з
          Tantivy, він забезпечує суб-мілісекундні запити з гібридним BM25 та семантичним пошуком.
        </Paragraph>
        <Paragraph>
          Все індексування відбувається локально на вашій машині. Жодні дані не залишають
          вашу систему. Індексуйте один раз зі швидкістю ~10,000 документів/секунда,
          потім миттєво шукайте по роках контенту.
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Ультра-швидкий"
              description="Суб-мілісекундний час запитів"
              gradient="from-slate-500/20 to-gray-500/20"
            />
            <FeatureCard
              icon={<Database className="h-5 w-5" />}
              title="Tantivy + SQLite"
              description="Повнотекстовий пошук з метаданими"
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title="Діапазони дат"
              description="Фільтрування за часовими періодами"
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Експорт"
              description="Вивід у JSON, CSV або простий текст"
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
            { command: 'xf index <archive-path>', description: 'Індексуйте ваш архів Twitter' },
            { command: 'xf search <query>', description: 'Шукайте ваші твіти' },
            { command: 'xf search --from 2023-01-01', description: 'Пошук з фільтром дати' },
            { command: 'xf --help', description: 'Показати всі опції' },
          ]}
        />

        <TipBox variant="info">
          Завантажте ваш архів з налаштувань X/Twitter, потім запустіть <code>xf index</code> один раз.
        </TipBox>
      </Section>

      <Divider />

      {/* Секція 3: Приклади пошуків */}
      <Section title="Приклади пошуків" icon={<Play className="h-5 w-5" />} delay={0.3}>
        <CodeBlock code={`# Індексуйте ваш архів (одноразово)
xf index ~/Downloads/twitter-archive

# Шукайте за темою
xf search "machine learning"

# Пошук у діапазоні дат
xf search "rust" --from 2024-01-01 --to 2024-06-30

# Експортуйте результати в JSON
xf search "AI" --format json > results.json`} />
      </Section>
    </div>
  );
}