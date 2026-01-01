"use client";

import { motion } from "@/components/motion";
import {
  RefreshCw,
  Zap,
  Clock,
  Terminal,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Bot,
  Package,
  Settings,
  PartyPopper,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Divider,
  GoalBanner,
  BulletList,
} from "./lesson-components";
import { useLocale } from "@/lib/i18n";
import { getKeepingUpdatedLessonMessages } from "@/lib/i18n/translations";

export function KeepingUpdatedLesson() {
  const { locale } = useLocale();
  const messages = getKeepingUpdatedLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Why Updates Matter */}
      <Section
        title={messages.whyUpdatesMatter.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.whyUpdatesMatter.intro}
        </Paragraph>

        <div className="mt-6">
          <BulletList
            items={messages.whyUpdatesMatter.benefits}
          />
        </div>

        <div className="mt-6">
          <UpdateBenefitsCard messages={messages.whyUpdatesMatter.updateBenefitsCard} />
        </div>
      </Section>

      <Divider />

      {/* The Update Command */}
      <Section
        title={messages.updateCommand.title}
        icon={<RefreshCw className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.updateCommand.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock code={messages.updateCommand.command} />
        </div>

        <Paragraph>{messages.updateCommand.description}</Paragraph>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {messages.updateCommand.updateItems.map((item, index) => (
            <UpdateItem
              key={index}
              icon={index === 0 ? <Package className="h-4 w-4" /> :
                     index === 1 ? <Terminal className="h-4 w-4" /> :
                     index === 2 ? <Bot className="h-4 w-4" /> :
                     <Settings className="h-4 w-4" />}
              label={item.label}
              description={item.description}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Common Update Patterns */}
      <Section
        title={messages.commonPatterns.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.2}
      >
        <div className="space-y-6">
          {messages.commonPatterns.patterns.map((pattern, index) => (
            <UpdatePattern
              key={index}
              title={pattern.title}
              description={pattern.description}
              command={pattern.command}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Automated Updates */}
      <Section
        title={messages.automatedUpdates.title}
        icon={<Clock className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>{messages.automatedUpdates.intro}</Paragraph>

        <div className="mt-6">
          <CodeBlock code={messages.automatedUpdates.command} />
        </div>

        <Paragraph>
          {messages.automatedUpdates.description}
        </Paragraph>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.automatedUpdates.tip}
          </TipBox>
        </div>

        <div className="mt-6">
          <CodeBlock
            code={`${messages.automatedUpdates.cronExample.comment1}
${messages.automatedUpdates.cronExample.command1}

${messages.automatedUpdates.cronExample.comment2}
${messages.automatedUpdates.cronExample.cronLine}`}
          />
        </div>
      </Section>

      <Divider />

      {/* Checking Update Logs */}
      <Section
        title={messages.checkingLogs.title}
        icon={<FileText className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>{messages.checkingLogs.intro}</Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.checkingLogs.commands.map((cmd) =>
              `${cmd.comment}\n${cmd.command}`
            ).join('\n\n')}
            showLineNumbers
          />
        </div>
      </Section>

      <Divider />

      {/* Troubleshooting */}
      <Section
        title={messages.troubleshooting.title}
        icon={<AlertTriangle className="h-5 w-5" />}
        delay={0.35}
      >
        <div className="space-y-6">
          {messages.troubleshooting.issues.map((issue, index) => (
            <TroubleshootingCard
              key={index}
              title={issue.title}
              description={issue.description}
              solution={issue.solution}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Quick Reference */}
      <Section
        title={messages.quickReference.title}
        icon={<Sparkles className="h-5 w-5" />}
        delay={0.4}
      >
        <QuickReferenceTable messages={messages.quickReference} />
      </Section>

      <Divider />

      {/* How Often to Update */}
      <Section
        title={messages.howOften.title}
        icon={<Clock className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>{messages.howOften.intro}</Paragraph>

        <div className="mt-6 space-y-3">
          {messages.howOften.frequencies.map((freq, index) => (
            <FrequencyItem
              key={index}
              frequency={freq.frequency}
              recommendation={freq.recommendation}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Congratulations */}
      <Section
        title={messages.congratulations.title}
        icon={<PartyPopper className="h-5 w-5" />}
        delay={0.5}
      >
        <CongratulationsCard messages={messages.congratulations} />
      </Section>
    </div>
  );
}

// =============================================================================
// UPDATE BENEFITS CARD
// =============================================================================
function UpdateBenefitsCard({ messages }: { messages: { title: string; benefits: string[] } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-emerald-500/30"
    >
      <h4 className="font-bold text-white mb-4">{messages.title}</h4>
      <div className="space-y-3">
        {messages.benefits.map((benefit, index) => (
          <BenefitRow key={index} icon={<CheckCircle2 />} text={benefit} />
        ))}
      </div>
    </motion.div>
  );
}

function BenefitRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-3 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.02]"
    >
      <div className="text-emerald-400 h-5 w-5 group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-white/70 group-hover:text-white/90 transition-colors">{text}</span>
    </motion.div>
  );
}

// =============================================================================
// UPDATE ITEM
// =============================================================================
function UpdateItem({
  icon,
  label,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
    >
      <div className="text-primary group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{label}</span>
        <span className="text-xs text-white/50 block">{description}</span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// UPDATE PATTERN
// =============================================================================
function UpdatePattern({
  title,
  description,
  command,
}: {
  title: string;
  description: string;
  command: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group space-y-3 p-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
    >
      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
      <p className="text-white/60">{description}</p>
      <CodeBlock code={command} />
    </motion.div>
  );
}

// =============================================================================
// TROUBLESHOOTING CARD
// =============================================================================
function TroubleshootingCard({
  title,
  description,
  solution,
}: {
  title: string;
  description: string;
  solution: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/50"
    >
      <h4 className="font-bold text-amber-400 mb-2">{title}</h4>
      <p className="text-white/60 mb-4">{description}</p>
      <div className="rounded-xl bg-black/30 border border-white/[0.06] overflow-hidden">
        <pre className="p-4 text-sm font-mono text-white/80 overflow-x-auto whitespace-pre-wrap">
          {solution}
        </pre>
      </div>
    </motion.div>
  );
}

// =============================================================================
// QUICK REFERENCE TABLE
// =============================================================================
function QuickReferenceTable({ messages }: {
  messages: {
    commands: { command: string; description: string }[];
    tableHeaders: { command: string; description: string };
  }
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
      <div className="grid grid-cols-[1fr_1fr] divide-x divide-white/[0.06]">
        <div className="p-3 bg-white/[0.02] text-sm font-medium text-white/60">
          {messages.tableHeaders.command}
        </div>
        <div className="p-3 bg-white/[0.02] text-sm font-medium text-white/60">
          {messages.tableHeaders.description}
        </div>
      </div>
      {messages.commands.map((cmd, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_1fr] divide-x divide-white/[0.06] border-t border-white/[0.06]"
        >
          <div className="p-3">
            <code className="text-xs font-mono text-primary">{cmd.command}</code>
          </div>
          <div className="p-3 text-sm text-white/70">{cmd.description}</div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// FREQUENCY ITEM
// =============================================================================
function FrequencyItem({
  frequency,
  recommendation,
}: {
  frequency: string;
  recommendation: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 6, scale: 1.01 }}
      className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all">
        <Clock className="h-5 w-5" />
      </div>
      <div>
        <span className="font-bold text-white group-hover:text-primary transition-colors">{frequency}</span>
        <span className="text-white/50"> - {recommendation}</span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// CONGRATULATIONS CARD
// =============================================================================
function CongratulationsCard({ messages }: {
  messages: {
    title: string;
    subtitle: string;
    description: string;
    achievements: string[];
    finalMessage: string;
  }
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-cyan-500/20 p-8 backdrop-blur-xl overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl" />

      <div className="relative text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl shadow-emerald-500/50 mb-6"
        >
          <PartyPopper className="h-10 w-10 text-white" />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-4">
          {messages.subtitle}
        </h3>

        <p className="text-white/70 mb-6">{messages.description}</p>

        <div className="grid gap-3 sm:grid-cols-2 max-w-lg mx-auto text-left">
          {messages.achievements.map((achievement, index) => (
            <CompletionItem key={index} text={achievement} />
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.1]">
          <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            {messages.finalMessage}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CompletionItem({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, x: 2 }}
      className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.08]"
    >
      <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
      <span className="text-white/80 text-sm group-hover:text-white transition-colors">{text}</span>
    </motion.div>
  );
}
