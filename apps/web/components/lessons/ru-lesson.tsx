'use client';

import { motion } from '@/components/motion';
import {
  RefreshCw,
  Terminal,
  Zap,
  FolderSync,
  Bot,
  Shield,
  Clock,
  Settings,
  CheckCircle,
  Play,
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
import { useLocale } from '@/lib/i18n';
import { getRuLessonMessages } from '@/lib/i18n/translations';

export function RuLesson() {
  const { locale } = useLocale();
  const messages = getRuLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Section 1: What Is RU */}
      <Section title={messages.whatIsRu.title} icon={<RefreshCw className="h-5 w-5" />} delay={0.1}>
        <Paragraph>
          <Highlight>RU (Repo Updater)</Highlight> {messages.whatIsRu.description}
        </Paragraph>
        <Paragraph>
          {messages.whatIsRu.withoutRu}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<FolderSync className="h-5 w-5" />}
              title={messages.whatIsRu.features.parallelSync.title}
              description={messages.whatIsRu.features.parallelSync.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
            <FeatureCard
              icon={<Bot className="h-5 w-5" />}
              title={messages.whatIsRu.features.agentSweep.title}
              description={messages.whatIsRu.features.agentSweep.description}
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Clock className="h-5 w-5" />}
              title={messages.whatIsRu.features.resumeSupport.title}
              description={messages.whatIsRu.features.resumeSupport.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title={messages.whatIsRu.features.gitPlumbing.title}
              description={messages.whatIsRu.features.gitPlumbing.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Section 2: Essential Commands */}
      <Section title={messages.essentialCommands.title} icon={<Terminal className="h-5 w-5" />} delay={0.15}>
        <Paragraph>
          {messages.essentialCommands.intro}
        </Paragraph>

        <CommandList commands={messages.essentialCommands.commands} />

        <TipBox variant="tip">
          Use <code>ru sync --resume</code> if sync was interrupted. RU remembers progress!
        </TipBox>
      </Section>

      <Divider />

      {/* Section 3: Agent Sweep */}
      <Section title={messages.agentSweep.title} icon={<Bot className="h-5 w-5" />} delay={0.2}>
        <Paragraph>
          {messages.agentSweep.description}
        </Paragraph>

        <CodeBlock
          code={messages.agentSweep.threePhaseWorkflow.code}
          filename={messages.agentSweep.threePhaseWorkflow.filename}
          language={messages.agentSweep.threePhaseWorkflow.language}
        />

        <CommandList commands={messages.agentSweep.commands} />

        <TipBox variant="warning">
          Always run <code>--dry-run</code> first to preview the commit plan!
        </TipBox>
      </Section>

      <Divider />

      {/* Section 4: AI Code Review */}
      <Section title={messages.aiCodeReview.title} icon={<CheckCircle className="h-5 w-5" />} delay={0.23}>
        <Paragraph>
          {messages.aiCodeReview.description}
        </Paragraph>

        <CommandList commands={messages.aiCodeReview.commands} />

        <TipBox variant="tip">
          Combine with <code>ubs</code> for comprehensive coverage: run <code>ubs .</code> for
          static analysis, then <code>ru review</code> for semantic understanding.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 5: Configuration */}
      <Section title={messages.configuration.title} icon={<Settings className="h-5 w-5" />} delay={0.25}>
        <Paragraph>
          {messages.configuration.description}
        </Paragraph>

        <CodeBlock
          code={messages.configuration.configExample.code}
          filename={messages.configuration.configExample.filename}
          language={messages.configuration.configExample.language}
        />

        <CodeBlock
          code={messages.configuration.reposExample.code}
          filename={messages.configuration.reposExample.filename}
          language={messages.configuration.reposExample.language}
        />

        <TipBox variant="tip">
          Run <code>ru init --example</code> to create starter config files.
        </TipBox>
      </Section>

      <Divider />

      {/* Section 6: Integration */}
      <Section title={messages.toolIntegration.title} icon={<Zap className="h-5 w-5" />} delay={0.3}>
        <Paragraph>
          {messages.toolIntegration.description}
        </Paragraph>

        <div className="space-y-4">
          {messages.toolIntegration.integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              className="p-4 rounded-xl border border-border/50 bg-card/30"
            >
              <h4 className="font-semibold text-primary mb-2">{integration.name}</h4>
              <p className="text-muted-foreground text-sm">
                {integration.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Section 7: Exit Codes */}
      <Section title={messages.exitCodes.title} icon={<Play className="h-5 w-5" />} delay={0.35}>
        <Paragraph>
          {messages.exitCodes.description}
        </Paragraph>

        <div className="grid gap-3 sm:grid-cols-2">
          {messages.exitCodes.codes.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/30`}
            >
              <code className={`text-${item.color}-400 font-mono`}>{item.code}</code>
              <span className="text-white/80 ml-2">{item.label}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
