"use client";

import { motion } from "@/components/motion";
import {
  Key,
  Lock,
  Wifi,
  Shield,
  RefreshCw,
  Terminal,
  CheckCircle2,
  HelpCircle,
  Laptop,
  Server,
  ArrowRight,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  FeatureGrid,
  FeatureCard,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getSshBasicsLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getSshBasicsLessonMessages>;

export function SSHBasicsLesson() {
  const { locale } = useLocale();
  const messages = getSshBasicsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is SSH */}
      <Section
        title={messages.whatIsSSH.title}
        icon={<Lock className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="ssh">{messages.whatIsSSH.highlight}</Jargon></Highlight> {messages.whatIsSSH.description}
        </Paragraph>
        <Paragraph>
          {messages.whatIsSSH.tunnelDescription}
        </Paragraph>

        {/* Visual Connection Diagram */}
        <div className="mt-8">
          <ConnectionDiagram messages={messages} />
        </div>
      </Section>

      <Divider />

      {/* How You Got Here */}
      <Section
        title={messages.howYouGotHere.title}
        icon={<Key className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.howYouGotHere.description}
        </Paragraph>

        {/* Stage Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <StageCard
            number={messages.howYouGotHere.stages.passwordLogin.number}
            title={messages.howYouGotHere.stages.passwordLogin.title}
            subtitle={messages.howYouGotHere.stages.passwordLogin.subtitle}
            description={messages.howYouGotHere.stages.passwordLogin.description}
            code="ssh root@YOUR_SERVER_IP"
            gradient="from-amber-500/20 to-orange-500/20"
          />
          <StageCard
            number={messages.howYouGotHere.stages.keyBasedLogin.number}
            title={messages.howYouGotHere.stages.keyBasedLogin.title}
            subtitle={messages.howYouGotHere.stages.keyBasedLogin.subtitle}
            description={messages.howYouGotHere.stages.keyBasedLogin.description}
            code="ssh -i ~/.ssh/acfs_ed25519 ubuntu@YOUR_SERVER_IP"
            gradient="from-emerald-500/20 to-teal-500/20"
          />
        </div>

        {/* Command Breakdown */}
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">
            {messages.howYouGotHere.breakdownTitle}
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <CommandPart
              label={messages.howYouGotHere.commandParts.ssh.label}
              description={messages.howYouGotHere.commandParts.ssh.description}
            />
            <CommandPart
              label={messages.howYouGotHere.commandParts.privateKey.label}
              description={messages.howYouGotHere.commandParts.privateKey.description}
            />
            <CommandPart
              label={messages.howYouGotHere.commandParts.user.label}
              description={messages.howYouGotHere.commandParts.user.description}
            />
            <CommandPart
              label={messages.howYouGotHere.commandParts.serverAddress.label}
              description={messages.howYouGotHere.commandParts.serverAddress.description}
            />
          </div>
        </div>
      </Section>

      <Divider />

      {/* If Connection Drops */}
      <Section
        title={messages.connectionDrops.title}
        icon={<RefreshCw className="h-5 w-5" />}
        delay={0.2}
      >
        <TipBox variant="info">
          {messages.connectionDrops.tipBox.content}
        </TipBox>
      </Section>

      <Divider />

      {/* SSH Keys vs Passwords */}
      <Section
        title={messages.sshKeysVsPasswords.title}
        icon={<Shield className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.sshKeysVsPasswords.description}
        </Paragraph>

        <div className="mt-6">
          <FeatureGrid>
            <FeatureCard
              icon={<Key className="h-5 w-5" />}
              title={messages.sshKeysVsPasswords.keyTypes.privateKey.title}
              description={messages.sshKeysVsPasswords.keyTypes.privateKey.description}
              gradient="from-violet-500/20 to-purple-500/20"
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title={messages.sshKeysVsPasswords.keyTypes.publicKey.title}
              description={messages.sshKeysVsPasswords.keyTypes.publicKey.description}
              gradient="from-sky-500/20 to-blue-500/20"
            />
          </FeatureGrid>
        </div>

        <div className="mt-6">
          <Paragraph>
            {messages.sshKeysVsPasswords.securityNote}
          </Paragraph>
        </div>
      </Section>

      <Divider />

      {/* Keeping Connections Alive */}
      <Section
        title={messages.keepingConnectionsAlive.title}
        icon={<Wifi className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          {messages.keepingConnectionsAlive.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`Host *
    ServerAliveInterval 60
    ServerAliveCountMax 3`}
            language="ssh-config"
            filename="~/.ssh/config"
          />
        </div>

        <Paragraph>{messages.keepingConnectionsAlive.keepaliveNote}</Paragraph>
      </Section>

      <Divider />

      {/* Quick Connect Alias */}
      <Section
        title={messages.quickConnectAlias.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.quickConnectAlias.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`alias vps='ssh -i ~/.ssh/acfs_ed25519 ubuntu@YOUR_SERVER_IP'`}
            language="bash"
          />
        </div>

        <Paragraph>
          {messages.quickConnectAlias.usage}
        </Paragraph>
      </Section>

      <Divider />

      {/* Verify Section */}
      <Section
        title={messages.verifyUnderstanding.title}
        icon={<HelpCircle className="h-5 w-5" />}
        delay={0.4}
      >
        <QuizCards messages={messages} />
      </Section>

      <Divider />

      {/* Practice Commands */}
      <Section
        title={messages.practiceNow.title}
        icon={<CheckCircle2 className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>
          {messages.practiceNow.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# Check your current user (should say "ubuntu")
$ whoami

# Check how long you've been connected
$ w

# View the public keys authorized to access this account
$ cat ~/.ssh/authorized_keys`}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.practiceNow.tipBox.content}
          </TipBox>
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// CONNECTION DIAGRAM - Visual SSH connection
// =============================================================================
function ConnectionDiagram({ messages }: { messages: Messages }) {
  return (
    <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {/* Laptop */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30">
            <Laptop className="h-8 w-8 text-sky-400" />
          </div>
          <span className="text-sm font-medium text-white">{messages.connectionDiagram.yourLaptop}</span>
        </motion.div>

        {/* Encrypted Tunnel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2"
        >
          <div className="hidden md:block h-px w-12 bg-gradient-to-r from-sky-500/50 to-emerald-500/50" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/30">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-white/70">
              <Jargon term="encryption">{messages.connectionDiagram.encryptedSSH}</Jargon>
            </span>
          </div>
          <ArrowRight className="h-5 w-5 text-emerald-400" />
          <div className="hidden md:block h-px w-12 bg-gradient-to-r from-emerald-500/50 to-emerald-500/20" />
        </motion.div>

        {/* Server */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
            <Server className="h-8 w-8 text-emerald-400" />
          </div>
          <span className="text-sm font-medium text-white"><Jargon term="vps">{messages.connectionDiagram.yourVPS}</Jargon></span>
        </motion.div>
      </div>
    </div>
  );
}

// =============================================================================
// STAGE CARD - Login stage display
// =============================================================================
function StageCard({
  number,
  title,
  subtitle,
  description,
  code,
  gradient,
}: {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ delay: 0.2 + number * 0.1 }}
      className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:shadow-lg hover:shadow-primary/10`}
    >
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white text-sm font-bold group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
            {number}
          </div>
          <div>
            <h4 className="font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
            <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">{subtitle}</span>
          </div>
        </div>
        <p className="text-sm text-white/60 mb-4 group-hover:text-white/70 transition-colors">{description}</p>
        <code className="block px-3 py-2 rounded-lg bg-black/30 border border-white/[0.06] text-xs font-mono text-white/80 overflow-x-auto group-hover:border-primary/20 group-hover:bg-black/40 transition-all duration-300">
          {code}
        </code>
      </div>
    </motion.div>
  );
}

// =============================================================================
// COMMAND PART - Breakdown of command components
// =============================================================================
function CommandPart({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 4, scale: 1.02 }}
      className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04]"
    >
      <code className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-xs font-mono text-primary group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
        {label}
      </code>
      <span className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{description}</span>
    </motion.div>
  );
}

// =============================================================================
// QUIZ CARDS - Interactive quiz display
// =============================================================================
function QuizCards({ messages }: { messages: Messages }) {
  const questions = messages.verifyUnderstanding.questions;

  return (
    <div className="space-y-4">
      {questions.map((q: { question: string; answer: string }, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 4, scale: 1.01 }}
          transition={{ delay: i * 0.1 }}
          className="group relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-primary/10"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white group-hover:text-primary transition-colors">{q.question}</p>
              <p className="mt-2 text-sm text-white/50 group-hover:text-white/70 transition-colors">{q.answer}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
