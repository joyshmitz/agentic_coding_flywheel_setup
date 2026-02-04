"use client";

import { motion } from "@/components/motion";
import {
  Bug,
  Shield,
  Terminal,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Search,
  FileCode,
  GitCommit,
  Lightbulb,
} from "lucide-react";
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
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getUbsLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getUbsLessonMessages>;

export function UbsLesson() {
  const { locale } = useLocale();
  const messages = getUbsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is UBS */}
      <Section
        title={messages.whatIsUbs.title}
        icon={<Bug className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="ubs">{messages.whatIsUbs.highlightText}</Jargon></Highlight> {messages.whatIsUbs.description}
        </Paragraph>
        <Paragraph>
          {messages.whatIsUbs.analogy}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title={messages.whatIsUbs.features.securityScanning.title}
              description={messages.whatIsUbs.features.securityScanning.description}
              gradient="from-red-500/20 to-rose-500/20"
            />
            <FeatureCard
              icon={<Bug className="h-5 w-5" />}
              title={messages.whatIsUbs.features.bugDetection.title}
              description={messages.whatIsUbs.features.bugDetection.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title={messages.whatIsUbs.features.fastFeedback.title}
              description={messages.whatIsUbs.features.fastFeedback.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<FileCode className="h-5 w-5" />}
              title={messages.whatIsUbs.features.multiLanguage.title}
              description={messages.whatIsUbs.features.multiLanguage.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* The Golden Rule */}
      <Section
        title={messages.goldenRule.title}
        icon={<GitCommit className="h-5 w-5" />}
        delay={0.15}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-6 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                Run <code className="text-amber-400">ubs</code> {messages.goldenRule.mainRule}
              </p>
              <p className="text-white/60 mt-1">
                {messages.goldenRule.explanation}
              </p>
            </div>
          </div>
        </motion.div>
      </Section>

      <Divider />

      {/* Essential Commands */}
      <Section
        title={messages.essentialCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.2}
      >
        <CommandList
          commands={messages.essentialCommands.commands}
        />

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.essentialCommands.tip.content}
            <code>ubs file.ts</code>{messages.essentialCommands.tip.example1}
            <code>ubs .</code>{messages.essentialCommands.tip.example2}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Understanding Output */}
      <Section
        title={messages.understandingOutput.title}
        icon={<Search className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>{messages.understandingOutput.intro}</Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.understandingOutput.outputCode}
            language="text"
            filename="ubs output"
          />
        </div>

        <div className="mt-6 space-y-4">
          {messages.understandingOutput.explainers.map((explainer, index) => (
            <OutputExplainer
              key={index}
              pattern={explainer.pattern}
              meaning={explainer.meaning}
              color={index === 0 ? "text-emerald-400" : index === 1 ? "text-amber-400" : "text-primary"}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Bug Severity */}
      <Section
        title={messages.bugSeverityGuide.title}
        icon={<AlertTriangle className="h-5 w-5" />}
        delay={0.3}
      >
        <div className="space-y-4">
          <SeverityCard
            level={messages.bugSeverityGuide.levels.critical.level}
            icon={<XCircle className="h-5 w-5" />}
            color="from-red-500/20 to-rose-500/20"
            border="border-red-500/30"
            examples={messages.bugSeverityGuide.levels.critical.examples}
            action={messages.bugSeverityGuide.levels.critical.action}
          />
          <SeverityCard
            level={messages.bugSeverityGuide.levels.important.level}
            icon={<AlertTriangle className="h-5 w-5" />}
            color="from-amber-500/20 to-orange-500/20"
            border="border-amber-500/30"
            examples={messages.bugSeverityGuide.levels.important.examples}
            action={messages.bugSeverityGuide.levels.important.action}
          />
          <SeverityCard
            level={messages.bugSeverityGuide.levels.contextual.level}
            icon={<CheckCircle className="h-5 w-5" />}
            color="from-primary/20 to-violet-500/20"
            border="border-primary/30"
            examples={messages.bugSeverityGuide.levels.contextual.examples}
            action={messages.bugSeverityGuide.levels.contextual.action}
          />
        </div>
      </Section>

      <Divider />

      {/* The Fix Workflow */}
      <Section
        title={messages.fixWorkflow.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.35}
      >
        <FixWorkflow messages={messages} />
      </Section>

      <Divider />

      {/* Pre-Commit Hook */}
      <Section
        title={messages.preCommitIntegration.title}
        icon={<GitCommit className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>
          {messages.preCommitIntegration.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.preCommitIntegration.codeExample}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.preCommitIntegration.tip.content}<code>ubs</code>{messages.preCommitIntegration.tip.automatically}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title={messages.tryItNow.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.45}
      >
        <CodeBlock
          code={messages.tryItNow.code}
          showLineNumbers
        />
      </Section>
    </div>
  );
}

// =============================================================================
// OUTPUT EXPLAINER
// =============================================================================
function OutputExplainer({
  pattern,
  meaning,
  color,
}: {
  pattern: string;
  meaning: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      <code className={`font-mono text-sm font-medium ${color}`}>{pattern}</code>
      <span className="text-white/50 group-hover:text-white/70 transition-colors">→</span>
      <span className="text-white/60 group-hover:text-white/80 transition-colors">{meaning}</span>
    </motion.div>
  );
}

// =============================================================================
// SEVERITY CARD
// =============================================================================
function SeverityCard({
  level,
  icon,
  color,
  border,
  examples,
  action,
}: {
  level: string;
  icon: React.ReactNode;
  color: string;
  border: string;
  examples: string[];
  action: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative rounded-2xl border ${border} bg-gradient-to-br ${color} p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.2]`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white shadow-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-lg mb-3">{level}</h4>
          <ul className="space-y-2 mb-4">
            {examples.map((ex, i) => (
              <li key={i} className="text-sm text-white/70 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                {ex}
              </li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-white/90 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {action}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// FIX WORKFLOW
// =============================================================================
function FixWorkflow({ messages }: { messages: Messages }) {
  const steps = messages.fixWorkflow.steps;

  return (
    <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative space-y-5">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-red-500/50 via-amber-500/50 to-emerald-500/50" />

        {steps.map((step: { title: string; desc: string }, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="relative flex items-start gap-4 pl-2 group"
          >
            <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-white text-sm font-bold shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-shadow duration-300">
              {i + 1}
            </div>
            <div className="pt-1">
              <h4 className="font-semibold text-white group-hover:text-primary transition-colors duration-300">{step.title}</h4>
              <p className="text-sm text-white/50">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
