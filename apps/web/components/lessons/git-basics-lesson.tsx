"use client";

import { motion } from "@/components/motion";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  History,
  Terminal,
  AlertTriangle,
  Shield,
  FileX,
  Undo2,
  Eye,
  CheckCircle,
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
  InlineCode,
} from "./lesson-components";
import { useLocale, getGitBasicsLessonMessages } from "@/lib/i18n";

export function GitBasicsLesson() {
  const { locale } = useLocale();
  const messages = getGitBasicsLessonMessages(locale);
  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is Git */}
      <Section
        title={messages.whatIsGit.title}
        icon={<GitBranch className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight>{messages.whatIsGit.highlightText}</Highlight> {messages.whatIsGit.description}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<History className="h-5 w-5" />}
              title={messages.whatIsGit.features.fullHistory.title}
              description={messages.whatIsGit.features.fullHistory.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<GitBranch className="h-5 w-5" />}
              title={messages.whatIsGit.features.branching.title}
              description={messages.whatIsGit.features.branching.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<GitMerge className="h-5 w-5" />}
              title={messages.whatIsGit.features.collaboration.title}
              description={messages.whatIsGit.features.collaboration.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title={messages.whatIsGit.features.safetyNet.title}
              description={messages.whatIsGit.features.safetyNet.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Core Concepts */}
      <Section
        title={messages.coreConcepts.title}
        icon={<GitCommit className="h-5 w-5" />}
        delay={0.15}
      >
        <div className="space-y-6">
          {messages.coreConcepts.concepts.map((concept, index) => (
            <ConceptCard
              key={index}
              term={concept.term}
              definition={concept.definition}
              example={concept.example}
            />
          ))}
        </div>
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
      </Section>

      <Divider />

      {/* .gitignore */}
      <Section
        title={messages.understandingGitignore.title}
        icon={<FileX className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.understandingGitignore.intro}<InlineCode>.gitignore</InlineCode>{messages.understandingGitignore.description}<strong>{messages.understandingGitignore.criticalText}</strong>{messages.understandingGitignore.because}
        </Paragraph>

        <div className="mt-6 space-y-3">
          {messages.understandingGitignore.ignoreItems.map((item, index) => (
            <IgnoreItem
              key={index}
              pattern={item.pattern}
              reason={item.reason}
              critical={item.critical}
            />
          ))}
        </div>

        <div className="mt-6">
          <TipBox variant="warning">
            <strong>{messages.understandingGitignore.warning.bold}</strong>{messages.understandingGitignore.warning.text}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Branches */}
      <Section
        title={messages.workingWithBranches.title}
        icon={<GitBranch className="h-5 w-5" />}
        delay={0.3}
      >
        <CommandList
          commands={messages.workingWithBranches.commands}
        />

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.workingWithBranches.tip.content}<InlineCode>main</InlineCode>{messages.workingWithBranches.tip.stable}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* DANGEROUS OPERATIONS - THE CRITICAL SECTION */}
      <Section
        title={messages.dangerousOperations.title}
        icon={<AlertTriangle className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          <strong className="text-red-400">
            {messages.dangerousOperations.warning.bold}
          </strong>{" "}
          {messages.dangerousOperations.warning.text}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.dangerousOperations.commands.map((cmd, index) => (
            <DangerousCommand
              key={index}
              command={cmd.command}
              effect={cmd.effect}
              alternative={cmd.alternative}
            />
          ))}
        </div>

        <div className="mt-8">
          <TipBox variant="warning">
            <strong>{messages.dangerousOperations.warningTip.bold}</strong>
            <br />
            1. {messages.dangerousOperations.warningTip.steps[0]}<InlineCode>git status</InlineCode>{messages.dangerousOperations.warningTip.steps[1]}
            <br />
            2. {messages.dangerousOperations.warningTip.steps[2]}<InlineCode>git stash</InlineCode>{messages.dangerousOperations.warningTip.steps[3]}
            <br />
            3. {messages.dangerousOperations.warningTip.steps[4]}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Recovery Tools */}
      <Section
        title={messages.recoveryTools.title}
        icon={<Undo2 className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>
          {messages.recoveryTools.intro}
        </Paragraph>

        <CommandList
          commands={messages.recoveryTools.commands}
        />

        <div className="mt-6">
          <CodeBlock
            code={messages.recoveryTools.codeExample}
            language="bash"
          />
        </div>
      </Section>

      <Divider />

      {/* Best Practices */}
      <Section
        title={messages.bestPracticesWithAgents.title}
        icon={<Shield className="h-5 w-5" />}
        delay={0.45}
      >
        <div className="space-y-4">
          {messages.bestPracticesWithAgents.practices.map((practice, index) => (
            <BestPractice
              key={index}
              title={practice.title}
              description={practice.description}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title={messages.tryItNow.title}
        icon={<Eye className="h-5 w-5" />}
        delay={0.5}
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
// CONCEPT CARD
// =============================================================================
function ConceptCard({
  term,
  definition,
  example,
}: {
  term: string;
  definition: string;
  example: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
    >
      <h4 className="font-bold text-primary text-lg">{term}</h4>
      <p className="text-white/70 mt-2">{definition}</p>
      <p className="text-sm text-white/50 mt-2 italic">Example: {example}</p>
    </motion.div>
  );
}

// =============================================================================
// IGNORE ITEM
// =============================================================================
function IgnoreItem({
  pattern,
  reason,
  critical,
}: {
  pattern: string;
  reason: string;
  critical?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className={`group flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
        critical
          ? "border-red-500/30 bg-red-500/10 hover:border-red-500/50"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
      }`}
    >
      <code className={`font-mono text-sm px-2 py-1 rounded ${critical ? "bg-red-500/20 text-red-400" : "bg-white/[0.05] text-primary"}`}>
        {pattern}
      </code>
      <span className="text-sm text-white/60">{reason}</span>
      {critical && (
        <span className="ml-auto text-xs font-medium text-red-400 uppercase">Security Risk</span>
      )}
    </motion.div>
  );
}

// =============================================================================
// DANGEROUS COMMAND
// =============================================================================
function DangerousCommand({
  command,
  effect,
  alternative,
}: {
  command: string;
  effect: string;
  alternative: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group rounded-2xl border border-red-500/30 bg-red-500/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20">
          <AlertTriangle className="h-4 w-4 text-red-400" />
        </div>
        <code className="font-mono text-red-400 font-medium">{command}</code>
      </div>
      <p className="text-sm text-white/60 mb-2">
        <strong className="text-red-400">Effect:</strong> {effect}
      </p>
      <p className="text-sm text-emerald-400/80">
        <strong>Alternative:</strong> {alternative}
      </p>
    </motion.div>
  );
}

// =============================================================================
// BEST PRACTICE
// =============================================================================
function BestPractice({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-500/10"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover:shadow-emerald-500/20 transition-shadow">
        <CheckCircle className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{title}</p>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
