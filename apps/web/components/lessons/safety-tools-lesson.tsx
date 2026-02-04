"use client";

import type React from "react";
import { motion } from "@/components/motion";
import { useLocale, getSafetyToolsLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getSafetyToolsLessonMessages>;
import {
  Shield,
  Key,
  Users,
  AlertTriangle,
  Lock,
  Terminal,
  CheckCircle,
  XCircle,
  UserCheck,
  RefreshCw,
  Zap,
  Eye,
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

export function SafetyToolsLesson() {
  const { locale } = useLocale();
  const messages = getSafetyToolsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* Introduction */}
      <Section
        title={messages.introduction.title}
        icon={<Shield className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.introduction.intro}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Users className="h-5 w-5" />}
              title={messages.introduction.slb.title}
              description={messages.introduction.slb.description}
              gradient="from-red-500/20 to-rose-500/20"
            />
            <FeatureCard
              icon={<Key className="h-5 w-5" />}
              title={messages.introduction.caam.title}
              description={messages.introduction.caam.description}
              gradient="from-primary/20 to-violet-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* SLB Section */}
      <Section
        title={messages.slbSection.title}
        icon={<Users className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          <Highlight><Jargon term="ai-agents">{messages.slbSection.intro.highlight}</Jargon></Highlight>
          {messages.slbSection.intro.text}
        </Paragraph>

        <div className="mt-8">
          <SlbDiagram messages={messages} />
        </div>
      </Section>

      {/* When to Use SLB */}
      <Section
        title={messages.whenToUseSlb.title}
        icon={<AlertTriangle className="h-5 w-5" />}
        delay={0.2}
      >
        <div className="space-y-4">
          <DangerCard
            command={messages.whenToUseSlb.dangerCards.rmRf.command}
            risk={messages.whenToUseSlb.dangerCards.rmRf.risk}
            slb={messages.whenToUseSlb.dangerCards.rmRf.slb}
          />
          <DangerCard
            command={messages.whenToUseSlb.dangerCards.forcePush.command}
            risk={messages.whenToUseSlb.dangerCards.forcePush.risk}
            slb={messages.whenToUseSlb.dangerCards.forcePush.slb}
          />
          <DangerCard
            command={messages.whenToUseSlb.dangerCards.dropDatabase.command}
            risk={messages.whenToUseSlb.dangerCards.dropDatabase.risk}
            slb={messages.whenToUseSlb.dangerCards.dropDatabase.slb}
          />
          <DangerCard
            command={messages.whenToUseSlb.dangerCards.deleteNamespace.command}
            risk={messages.whenToUseSlb.dangerCards.deleteNamespace.risk}
            slb={messages.whenToUseSlb.dangerCards.deleteNamespace.slb}
          />
        </div>

        <div className="mt-6">
          <TipBox variant="warning">
            {messages.whenToUseSlb.tipBox.content}
          </TipBox>
        </div>
      </Section>

      {/* SLB Commands */}
      <Section
        title={messages.slbCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.25}
      >
        <CommandList
          commands={[
            {
              command: messages.slbCommands.commands.pending.command,
              description: messages.slbCommands.commands.pending.description,
            },
            {
              command: messages.slbCommands.commands.run.command,
              description: messages.slbCommands.commands.run.description,
            },
            {
              command: messages.slbCommands.commands.approve.command,
              description: messages.slbCommands.commands.approve.description,
            },
            {
              command: messages.slbCommands.commands.reject.command,
              description: messages.slbCommands.commands.reject.description,
            },
            {
              command: messages.slbCommands.commands.status.command,
              description: messages.slbCommands.commands.status.description,
            },
          ]}
        />
      </Section>

      <Divider />

      {/* CAAM Section */}
      <Section
        title={messages.caamSection.title}
        icon={<Key className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          <Highlight><Jargon term="api-key">{messages.caamSection.intro.highlight}</Jargon></Highlight>
          {messages.caamSection.intro.text}
        </Paragraph>

        <div className="mt-6 space-y-4">
          <CaamFeature
            icon={<Key className="h-5 w-5" />}
            title={messages.caamSection.features.tokenManagement.title}
            description={messages.caamSection.features.tokenManagement.description}
          />
          <CaamFeature
            icon={<RefreshCw className="h-5 w-5" />}
            title={messages.caamSection.features.instantSwitching.title}
            description={messages.caamSection.features.instantSwitching.description}
          />
          <CaamFeature
            icon={<Eye className="h-5 w-5" />}
            title={messages.caamSection.features.multiTool.title}
            description={messages.caamSection.features.multiTool.description}
          />
          <CaamFeature
            icon={<Lock className="h-5 w-5" />}
            title={messages.caamSection.features.profileBackup.title}
            description={messages.caamSection.features.profileBackup.description}
          />
        </div>
      </Section>

      {/* CAAM Use Cases */}
      <Section
        title={messages.caamUseCases.title}
        icon={<UserCheck className="h-5 w-5" />}
        delay={0.35}
      >
        <div className="space-y-4">
          <UseCase
            scenario={messages.caamUseCases.useCases.personalVsWork.scenario}
            description={messages.caamUseCases.useCases.personalVsWork.description}
          />
          <UseCase
            scenario={messages.caamUseCases.useCases.rateLimits.scenario}
            description={messages.caamUseCases.useCases.rateLimits.description}
          />
          <UseCase
            scenario={messages.caamUseCases.useCases.costSeparation.scenario}
            description={messages.caamUseCases.useCases.costSeparation.description}
          />
          <UseCase
            scenario={messages.caamUseCases.useCases.multiAccount.scenario}
            description={messages.caamUseCases.useCases.multiAccount.description}
          />
        </div>
      </Section>

      {/* CAAM Commands */}
      <Section
        title={messages.caamCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.4}
      >
        <CommandList
          commands={[
            {
              command: messages.caamCommands.commands.list.command,
              description: messages.caamCommands.commands.list.description,
            },
            {
              command: messages.caamCommands.commands.backup.command,
              description: messages.caamCommands.commands.backup.description,
            },
            {
              command: messages.caamCommands.commands.activate.command,
              description: messages.caamCommands.commands.activate.description,
            },
            {
              command: messages.caamCommands.commands.status.command,
              description: messages.caamCommands.commands.status.description,
            },
            {
              command: messages.caamCommands.commands.delete.command,
              description: messages.caamCommands.commands.delete.description,
            },
          ]}
        />
      </Section>

      <Divider />

      {/* Integration with Agents */}
      <Section
        title={messages.integration.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>
          {messages.integration.intro}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.integration.codeExample}
            language="bash"
          />
        </div>
      </Section>

      <Divider />

      {/* Best Practices */}
      <Section
        title={messages.bestPractices.title}
        icon={<CheckCircle className="h-5 w-5" />}
        delay={0.5}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* SLB Best Practices */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
            <h4 className="font-bold text-white flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-red-400" />
              {messages.bestPractices.slbSection.title}
            </h4>
            <div className="space-y-3">
              <BestPractice text={messages.bestPractices.slbSection.practices.neverBypass} />
              <BestPractice text={messages.bestPractices.slbSection.practices.reviewCommands} />
              <BestPractice text={messages.bestPractices.slbSection.practices.useDescriptive} />
              <BestPractice text={messages.bestPractices.slbSection.practices.setupNotifications} />
            </div>
          </div>

          {/* CAAM Best Practices */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <h4 className="font-bold text-white flex items-center gap-2 mb-4">
              <Key className="h-5 w-5 text-primary" />
              {messages.bestPractices.caamSection.title}
            </h4>
            <div className="space-y-3">
              <BestPractice text={messages.bestPractices.caamSection.practices.backupProfiles} />
              <BestPractice text={messages.bestPractices.caamSection.practices.useEmail} />
              <BestPractice text={messages.bestPractices.caamSection.practices.verifyActive} />
              <BestPractice text={messages.bestPractices.caamSection.practices.deleteOld} />
            </div>
          </div>
        </div>
      </Section>

      <Divider />

      {/* Quick Reference */}
      <Section
        title={messages.quickReference.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.55}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <QuickRefCard
            title={messages.introduction.slb.title}
            commands={messages.quickReference.slbCommands}
            color="from-red-500/20 to-rose-500/20"
          />
          <QuickRefCard
            title={messages.introduction.caam.title}
            commands={messages.quickReference.caamCommands}
            color="from-primary/20 to-violet-500/20"
          />
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// SLB DIAGRAM
// =============================================================================
function SlbDiagram({ messages }: { messages: Messages }) {
  return (
    <div className="relative p-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/3 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Command */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 shadow-lg shadow-red-500/10 transition-shadow hover:shadow-xl hover:shadow-red-500/20"
        >
          <AlertTriangle className="h-6 w-6 text-red-400" />
          <div>
            <span className="font-mono text-white text-sm">rm -rf /</span>
            <span className="text-xs text-white/50 block">{messages.slbDiagram.dangerousCommand}</span>
          </div>
        </motion.div>

        {/* Arrow down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white/50 text-xl"
        >
          ↓
        </motion.div>

        {/* Two approvals */}
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 group-hover:shadow-xl group-hover:shadow-emerald-500/20 transition-all duration-300">
              <CheckCircle className="h-7 w-7 text-emerald-400" />
            </div>
            <span className="text-xs text-white/50 font-medium group-hover:text-emerald-400 transition-colors">{messages.slbDiagram.agent1}</span>
          </motion.div>

          <span className="text-white/50 text-xl">+</span>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.05 }}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 group-hover:shadow-xl group-hover:shadow-emerald-500/20 transition-all duration-300">
              <CheckCircle className="h-7 w-7 text-emerald-400" />
            </div>
            <span className="text-xs text-white/50 font-medium group-hover:text-emerald-400 transition-colors">{messages.slbDiagram.agent2}</span>
          </motion.div>
        </div>

        {/* Arrow down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/50 text-xl"
        >
          ↓
        </motion.div>

        {/* Execute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 transition-shadow hover:shadow-xl hover:shadow-emerald-500/20"
        >
          <Shield className="h-6 w-6 text-emerald-400" />
          <div>
            <span className="font-bold text-white">{messages.slbDiagram.safeToExecute}</span>
            <span className="text-xs text-white/50 block">{messages.slbDiagram.twoApprovalsReceived}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// DANGER CARD
// =============================================================================
function DangerCard({
  command,
  risk,
  slb,
}: {
  command: string;
  risk: string;
  slb: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group rounded-2xl border border-red-500/20 bg-red-500/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10"
    >
      <code className="text-sm text-red-400 font-mono font-medium">{command}</code>
      <div className="flex items-start gap-3 mt-3">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20">
          <XCircle className="h-4 w-4 text-red-400" />
        </div>
        <span className="text-sm text-white/60">{risk}</span>
      </div>
      <div className="flex items-start gap-3 mt-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
          <Shield className="h-4 w-4 text-emerald-400" />
        </div>
        <span className="text-sm text-emerald-400/80 font-medium">{slb}</span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// CAAM FEATURE
// =============================================================================
function CaamFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary shrink-0 shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-shadow">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

// =============================================================================
// USE CASE
// =============================================================================
function UseCase({
  scenario,
  description,
}: {
  scenario: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group flex items-center gap-4 p-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-shadow">
        <UserCheck className="h-5 w-5" />
      </div>
      <div>
        <span className="font-medium text-white group-hover:text-primary transition-colors">{scenario}</span>
        <span className="text-white/50 mx-2">—</span>
        <span className="text-sm text-white/50">{description}</span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// BEST PRACTICE
// =============================================================================
function BestPractice({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-3 p-2 -mx-2 rounded-lg transition-colors hover:bg-white/[0.03]"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
      </div>
      <span className="text-sm text-white/70 group-hover:text-white transition-colors">{text}</span>
    </motion.div>
  );
}

// =============================================================================
// QUICK REF CARD
// =============================================================================
function QuickRefCard({
  title,
  commands,
  color,
}: {
  title: string;
  commands: string[];
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${color} p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.2]`}
    >
      {/* Decorative glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <h4 className="relative font-bold text-white mb-4 text-lg">{title}</h4>
      <div className="relative space-y-2">
        {commands.map((cmd) => (
          <code
            key={cmd}
            className="block text-sm text-white/80 font-mono py-1 px-2 -mx-2 rounded-lg transition-colors group-hover:text-white hover:bg-white/[0.05]"
          >
            $ {cmd}
          </code>
        ))}
      </div>
    </motion.div>
  );
}
