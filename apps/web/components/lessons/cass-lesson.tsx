"use client";

import { motion } from "@/components/motion";
import {
  Search,
  History,
  Database,
  Terminal,
  Bot,
  FileSearch,
  Filter,
  Sparkles,
  Book,
  Zap,
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
import { useLocale, getCassLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getCassLessonMessages>;

export function CassLesson() {
  const { locale } = useLocale();
  const messages = getCassLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is CASS */}
      <Section
        title={messages.whatIsCass.title}
        icon={<Search className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="cass">{messages.whatIsCass.highlight1}</Jargon></Highlight> {messages.whatIsCass.description1}
        </Paragraph>
        <Paragraph>
          {messages.whatIsCass.description2}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<Database className="h-5 w-5" />}
              title={messages.whatIsCass.features.multiAgentIndex.title}
              description={messages.whatIsCass.features.multiAgentIndex.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<FileSearch className="h-5 w-5" />}
              title={messages.whatIsCass.features.fullTextSearch.title}
              description={messages.whatIsCass.features.fullTextSearch.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<History className="h-5 w-5" />}
              title={messages.whatIsCass.features.crossProject.title}
              description={messages.whatIsCass.features.crossProject.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title={messages.whatIsCass.features.fastRetrieval.title}
              description={messages.whatIsCass.features.fastRetrieval.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
          </FeatureGrid>
        </div>
      </Section>

      <Divider />

      {/* Why Use CASS */}
      <Section
        title={messages.whyUseCass.title}
        icon={<Sparkles className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.whyUseCass.intro.split('context window').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="context-window">context window</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6 space-y-4">
          {messages.whyUseCass.useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              problem={useCase.problem}
              solution={useCase.solution}
            />
          ))}
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.whyUseCass.tipBoxContent}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Essential Commands */}
      <Section
        title={messages.essentialCommands.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.essentialCommands.warning}
        </Paragraph>

        <div className="mt-6">
          <CommandList
            commands={messages.essentialCommands.commands}
          />
        </div>
      </Section>

      <Divider />

      {/* Search Patterns */}
      <Section
        title={messages.searchPatterns.title}
        icon={<Filter className="h-5 w-5" />}
        delay={0.25}
      >
        <div className="space-y-6">
          {Object.values(messages.searchPatterns.patterns).map((pattern: { title: string; description: string; code: string }, index: number) => (
            <SearchPattern
              key={index}
              title={pattern.title}
              description={pattern.description}
              code={pattern.code}
            />
          ))}
        </div>
      </Section>

      <Divider />

      {/* The Search Workflow */}
      <Section
        title={messages.searchWorkflow.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.3}
      >
        <SearchWorkflow messages={messages} />
      </Section>

      <Divider />

      {/* Understanding Output */}
      <Section
        title={messages.understandingOutput.title}
        icon={<FileSearch className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.understandingOutput.description.split('JSON').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="json">JSON</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.understandingOutput.exampleOutput}
            language="json"
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.understandingOutput.tipBoxContent}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Best Practices */}
      <Section
        title={messages.bestPractices.title}
        icon={<Book className="h-5 w-5" />}
        delay={0.4}
      >
        <div className="space-y-4">
          {Object.values(messages.bestPractices.practices).map((practice: { title: string; description: string }, index: number) => (
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
        icon={<Terminal className="h-5 w-5" />}
        delay={0.45}
      >
        <CodeBlock
          code={`# Check your indexing status
$ cass health

# Search for a common pattern
$ cass search "import" --robot --limit 3

# View full documentation
$ cass robot-docs guide`}
          showLineNumbers
        />
      </Section>
    </div>
  );
}

// =============================================================================
// USE CASE CARD
// =============================================================================
function UseCaseCard({
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
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.15]"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-start gap-4 mb-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
          ✗
        </div>
        <p className="text-white/60 pt-1">{problem}</p>
      </div>
      <div className="relative flex items-start gap-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          ✓
        </div>
        <p className="text-white/80 font-medium pt-1">{solution}</p>
      </div>
    </motion.div>
  );
}

// =============================================================================
// SEARCH PATTERN
// =============================================================================
function SearchPattern({
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group space-y-3 p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
    >
      <div>
        <h4 className="font-semibold text-white group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-sm text-white/50">{description}</p>
      </div>
      <CodeBlock code={code} />
    </motion.div>
  );
}

// =============================================================================
// SEARCH WORKFLOW
// =============================================================================
function SearchWorkflow({ messages }: { messages: Messages }) {
  const steps = [
    {
      icon: <Search className="h-5 w-5" />,
      title: messages.searchWorkflow.steps.search.title,
      desc: messages.searchWorkflow.steps.search.description,
    },
    {
      icon: <FileSearch className="h-5 w-5" />,
      title: messages.searchWorkflow.steps.review.title,
      desc: messages.searchWorkflow.steps.review.description,
    },
    {
      icon: <History className="h-5 w-5" />,
      title: messages.searchWorkflow.steps.expand.title,
      desc: messages.searchWorkflow.steps.expand.description,
    },
    {
      icon: <Bot className="h-5 w-5" />,
      title: messages.searchWorkflow.steps.apply.title,
      desc: messages.searchWorkflow.steps.apply.description,
    },
  ];

  return (
    <div className="relative p-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative space-y-5">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-violet-500/50 to-emerald-500/50" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="relative flex items-start gap-4 pl-2 group"
          >
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/40 transition-shadow duration-300">
              {step.icon}
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
      className="group flex items-start gap-4 p-5 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-lg shadow-primary/10 group-hover:shadow-primary/20 transition-shadow">
        <Sparkles className="h-5 w-5" />
      </div>
      <div>
        <p className="font-semibold text-white group-hover:text-primary transition-colors">{title}</p>
        <p className="text-sm text-white/50 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}
