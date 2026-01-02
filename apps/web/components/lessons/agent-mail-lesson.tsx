"use client";

import { motion } from "@/components/motion";
import {
  Mail,
  Users,
  FileText,
  Lock,
  MessageSquare,
  Send,
  Inbox,
  Search,
  Bot,
  Workflow,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  FeatureCard,
  FeatureGrid,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale } from "@/lib/i18n";
import { getAgentMailLessonMessages } from "@/lib/i18n/translations";

export function AgentMailLesson() {
  const { locale } = useLocale();
  const messages = getAgentMailLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is Agent Mail */}
      <Section
        title={messages.whatIsAgentMail.title}
        icon={<Mail className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="mcp">MCP</Jargon> <Jargon term="agent-mail">Agent Mail</Jargon></Highlight> {messages.whatIsAgentMail.mcpDescription}
        </Paragraph>
        <Paragraph>
          {messages.whatIsAgentMail.thinkOfIt}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<MessageSquare className="h-5 w-5" />}
              title={messages.whatIsAgentMail.features.messaging.title}
              description={messages.whatIsAgentMail.features.messaging.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Lock className="h-5 w-5" />}
              title={messages.whatIsAgentMail.features.fileReservations.title}
              description={messages.whatIsAgentMail.features.fileReservations.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Search className="h-5 w-5" />}
              title={messages.whatIsAgentMail.features.searchableThreads.title}
              description={messages.whatIsAgentMail.features.searchableThreads.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title={messages.whatIsAgentMail.features.gitPersistence.title}
              description={messages.whatIsAgentMail.features.gitPersistence.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Why Coordination Matters */}
      <Section
        title={messages.whyCoordination.title}
        icon={<Users className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.whyCoordination.intro.split('parallel agents').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="parallel-agents">parallel agents</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.whyCoordination.problems.map((item, index) => (
            <ProblemCard
              key={index}
              problem={item.problem}
              solution={item.solution}
            />
          ))}
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.whyCoordination.tipBox.content}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Core Concepts */}
      <Section
        title={messages.coreConcepts.title}
        icon={<Workflow className="h-5 w-5" />}
        delay={0.2}
      >
        <div className="space-y-8">
          {/* Project & Agents */}
          <ConceptCard
            icon={<Bot className="h-5 w-5" />}
            title={messages.coreConcepts.projectsAndAgents.title}
            description={messages.coreConcepts.projectsAndAgents.description}
          >
            <CodeBlock
              code={messages.coreConcepts.projectsAndAgents.codeComment}
              language="python"
            />
          </ConceptCard>

          {/* Messages */}
          <ConceptCard
            icon={<Send className="h-5 w-5" />}
            title={messages.coreConcepts.sendingMessages.title}
            description={messages.coreConcepts.sendingMessages.description}
          >
            <CodeBlock
              code={messages.coreConcepts.sendingMessages.code}
              language="python"
            />
          </ConceptCard>

          {/* File Reservations */}
          <ConceptCard
            icon={<Lock className="h-5 w-5" />}
            title={messages.coreConcepts.fileReservations.title}
            description={messages.coreConcepts.fileReservations.description}
          >
            <CodeBlock
              code={messages.coreConcepts.fileReservations.code}
              language="python"
            />
          </ConceptCard>

          {/* Inbox */}
          <ConceptCard
            icon={<Inbox className="h-5 w-5" />}
            title={messages.coreConcepts.checkingInbox.title}
            description={messages.coreConcepts.checkingInbox.description}
          >
            <CodeBlock
              code={messages.coreConcepts.checkingInbox.code}
              language="python"
            />
          </ConceptCard>
        </div>
      </Section>

      <Divider />

      {/* Common Patterns */}
      <Section
        title={messages.commonPatterns.title}
        icon={<Workflow className="h-5 w-5" />}
        delay={0.25}
      >
        <div className="space-y-6">
          <PatternCard
            title={messages.commonPatterns.startingSession.title}
            description={messages.commonPatterns.startingSession.description}
            code={messages.commonPatterns.startingSession.code}
          />

          <PatternCard
            title={messages.commonPatterns.replyingToThread.title}
            description={messages.commonPatterns.replyingToThread.description}
            code={messages.commonPatterns.replyingToThread.code}
          />

          <PatternCard
            title={messages.commonPatterns.searchingDiscussions.title}
            description={messages.commonPatterns.searchingDiscussions.description}
            code={messages.commonPatterns.searchingDiscussions.code}
          />
        </div>
      </Section>

      <Divider />

      {/* The Coordination Flow */}
      <Section
        title={messages.coordinationFlow.title}
        icon={<Workflow className="h-5 w-5" />}
        delay={0.3}
      >
        <CoordinationFlow messages={messages} />
      </Section>

      <Divider />

      {/* Best Practices */}
      <Section
        title={messages.bestPractices.title}
        icon={<CheckCircle className="h-5 w-5" />}
        delay={0.35}
      >
        <div className="space-y-4">
          {messages.bestPractices.practices.map((practice, index) => (
            <BestPractice
              key={index}
              title={practice.title}
              description={practice.description}
            />
          ))}
        </div>

        <div className="mt-6">
          <TipBox variant="warning">
            {messages.bestPractices.warningTip.content}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Quick Reference */}
      <Section
        title={messages.quickReference.title}
        icon={<FileText className="h-5 w-5" />}
        delay={0.4}
      >
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
          <div className="p-5 border-b border-white/[0.06] bg-gradient-to-r from-primary/10 to-violet-500/10">
            <span className="font-bold text-white text-lg">{messages.quickReference.keyFunctionsTitle}</span>
          </div>
          <div className="divide-y divide-white/[0.06]">
            {messages.quickReference.functions.map((func, index) => (
              <FunctionRow
                key={index}
                name={func.name}
                purpose={func.purpose}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// PROBLEM CARD
// =============================================================================
function ProblemCard({
  problem,
  solution,
}: {
  problem: string;
  solution: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 group-hover:bg-red-500/30 transition-colors">
        ✗
      </div>
      <div className="flex-1">
        <span className="text-white/50 line-through">{problem}</span>
      </div>
      <div className="text-white/30 group-hover:text-white/50 transition-colors">→</div>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
        ✓
      </div>
      <div className="flex-1">
        <span className="text-white/80 font-medium">{solution}</span>
      </div>
    </motion.div>
  );
}

// =============================================================================
// CONCEPT CARD
// =============================================================================
function ConceptCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative space-y-4 p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.12]"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 border border-primary/30 text-primary shadow-lg shadow-primary/10">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-white text-lg">{title}</h4>
          <p className="text-sm text-white/50">{description}</p>
        </div>
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// =============================================================================
// PATTERN CARD
// =============================================================================
function PatternCard({
  title,
  description,
  code,
}: {
  title: string;
  description: string;
  code: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.15]"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-5 border-b border-white/[0.06] bg-white/[0.02]">
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
      <div className="relative p-4">
        <CodeBlock code={code} language="python" />
      </div>
    </motion.div>
  );
}

// =============================================================================
// COORDINATION FLOW
// =============================================================================
function CoordinationFlow({ messages }: { messages: any }) {
  const steps = [
    {
      icon: <Bot className="h-5 w-5" />,
      title: messages.coordinationFlow.steps[0].title,
      desc: messages.coordinationFlow.steps[0].description,
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: messages.coordinationFlow.steps[1].title,
      desc: messages.coordinationFlow.steps[1].description,
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
    },
    {
      icon: <Send className="h-5 w-5" />,
      title: messages.coordinationFlow.steps[2].title,
      desc: messages.coordinationFlow.steps[2].description,
      color: "from-primary/20 to-violet-500/20",
      borderColor: "border-primary/30",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: messages.coordinationFlow.steps[3].title,
      desc: messages.coordinationFlow.steps[3].description,
      color: "from-sky-500/20 to-cyan-500/20",
      borderColor: "border-sky-500/30",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      title: messages.coordinationFlow.steps[4].title,
      desc: messages.coordinationFlow.steps[4].description,
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
    },
  ];

  return (
    <div className="relative p-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

      <div className="relative flex flex-wrap justify-center items-start gap-3 sm:gap-6">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="group flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} border ${step.borderColor} text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                {step.icon}
              </div>
              <div className="text-center">
                <p className="font-bold text-white text-sm group-hover:text-primary transition-colors duration-300">{step.title}</p>
                <p className="text-xs text-white/50 max-w-[100px]">{step.desc}</p>
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                className="hidden sm:block text-white/30 text-xl font-light"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
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

// =============================================================================
// FUNCTION ROW
// =============================================================================
function FunctionRow({ name, purpose }: { name: string; purpose: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group flex items-center gap-4 p-4 transition-all duration-200 hover:bg-white/[0.02]"
    >
      <code className="text-sm text-primary font-mono font-medium px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/15 transition-colors">
        {name}
      </code>
      <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors">{purpose}</span>
    </motion.div>
  );
}
