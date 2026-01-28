'use client';

import {
  GraduationCap,
  Terminal,
  Package,
  Search,
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
import { useLocale, getMsLessonMessages } from '@/lib/i18n';

export function MsLesson() {
  const { locale } = useLocale();
  const messages = getMsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Section 1: What Is Meta Skill */}
      <Section title={messages.sections.whatIsMetaSkill.title} icon={<GraduationCap className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>Meta Skill (ms)</Highlight> {messages.sections.whatIsMetaSkill.intro}
        </Paragraph>
        <Paragraph>
          {messages.sections.whatIsMetaSkill.details}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Package className="h-5 w-5" />}
              title={messages.featureCards.localFirst.title}
              description={messages.featureCards.localFirst.description}
              gradient="from-purple-500/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Download className="h-5 w-5" />}
              title={messages.featureCards.easyInstall.title}
              description={messages.featureCards.easyInstall.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title={messages.featureCards.browseSkills.title}
              description={messages.featureCards.browseSkills.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Settings className="h-5 w-5" />}
              title={messages.featureCards.manage.title}
              description={messages.featureCards.manage.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Essential Commands */}
      <Section title={messages.sections.essentialCommands.title} icon={<Terminal className="h-5 w-5" />} delay={0.2}>
        <CommandList
          commands={messages.commands}
        />

        <TipBox>
          {messages.sections.essentialCommands.tipContent}
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Working with Skills */}
      <Section title={messages.sections.workingWithSkills.title} icon={<Play className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          {messages.sections.workingWithSkills.content}
        </Paragraph>

        <CodeBlock code={messages.codeBlock.content} />
      </Section>
    </div>
  );
}
