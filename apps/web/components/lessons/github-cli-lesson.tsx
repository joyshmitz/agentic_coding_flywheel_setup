"use client";

import { motion } from "@/components/motion";
import {
  Github,
  KeyRound,
  CircleDot,
  GitPullRequest,
  Tag,
  Workflow,
  Eye,
  CheckCircle,
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
  InlineCode,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getGithubCliLessonMessages } from "@/lib/i18n";

export function GithubCliLesson() {
  const { locale } = useLocale();
  const messages = getGithubCliLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* What Is GitHub CLI */}
      <Section
        title={messages.whatIsGithubCli.title}
        icon={<Github className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="cli">{messages.whatIsGithubCli.highlightText}</Jargon></Highlight> {messages.whatIsGithubCli.description}
        </Paragraph>

        <div className="mt-8">
          <FeatureGrid>
            <FeatureCard
              icon={<CircleDot className="h-5 w-5" />}
              title={messages.whatIsGithubCli.features.issues.title}
              description={messages.whatIsGithubCli.features.issues.description}
              gradient="from-emerald-500/20 to-teal-500/20"
            />
            <FeatureCard
              icon={<GitPullRequest className="h-5 w-5" />}
              title={messages.whatIsGithubCli.features.pullRequests.title}
              description={messages.whatIsGithubCli.features.pullRequests.description}
              gradient="from-primary/20 to-violet-500/20"
            />
            <FeatureCard
              icon={<Tag className="h-5 w-5" />}
              title={messages.whatIsGithubCli.features.releases.title}
              description={messages.whatIsGithubCli.features.releases.description}
              gradient="from-amber-500/20 to-orange-500/20"
            />
            <FeatureCard
              icon={<Workflow className="h-5 w-5" />}
              title={messages.whatIsGithubCli.features.actions.title}
              description={messages.whatIsGithubCli.features.actions.description}
              gradient="from-blue-500/20 to-indigo-500/20"
            />
          </FeatureGrid>
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.whatIsGithubCli.tip.content}<InlineCode>gh</InlineCode>{messages.whatIsGithubCli.tip.description}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Authentication */}
      <Section
        title={messages.authentication.title}
        icon={<KeyRound className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.authentication.intro.split('OAuth').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="oauth">OAuth</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.authentication.codeExample}
            language="bash"
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.authentication.tip.content}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Issues */}
      <Section
        title={messages.workingWithIssues.title}
        icon={<CircleDot className="h-5 w-5" />}
        delay={0.2}
      >
        <CommandList
          commands={messages.workingWithIssues.commands}
        />

        <div className="mt-6">
          <CodeBlock
            code={messages.workingWithIssues.codeExample}
            language="bash"
          />
        </div>
      </Section>

      <Divider />

      {/* Pull Requests */}
      <Section
        title={messages.pullRequests.title}
        icon={<GitPullRequest className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.pullRequests.intro.split('PRs').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}PRs</span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CommandList
            commands={messages.pullRequests.commands}
          />
        </div>

        <div className="mt-6">
          <CodeBlock
            code={messages.pullRequests.codeExample}
            language="bash"
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.pullRequests.tip.content}<InlineCode>--body &quot;$(cat &lt;&lt;&apos;EOF&apos; ... EOF)&quot;</InlineCode>
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Releases and Tags */}
      <Section
        title={messages.releasesAndTags.title}
        icon={<Tag className="h-5 w-5" />}
        delay={0.3}
      >
        <CommandList
          commands={messages.releasesAndTags.commands}
        />

        <div className="mt-6">
          <CodeBlock
            code={messages.releasesAndTags.codeExample}
            language="bash"
          />
        </div>
      </Section>

      <Divider />

      {/* GitHub Actions */}
      <Section
        title={messages.githubActions.title}
        icon={<Workflow className="h-5 w-5" />}
        delay={0.35}
      >
        <Paragraph>
          {messages.githubActions.intro.split('CI/CD').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="ci-cd">CI/CD</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CommandList
            commands={messages.githubActions.commands}
          />
        </div>

        <div className="mt-6">
          <CodeBlock
            code={messages.githubActions.codeExample}
            language="bash"
          />
        </div>
      </Section>

      <Divider />

      {/* Repository Info */}
      <Section
        title={messages.repositoryOperations.title}
        icon={<Github className="h-5 w-5" />}
        delay={0.4}
      >
        <CommandList
          commands={messages.repositoryOperations.commands}
        />
      </Section>

      <Divider />

      {/* API Access */}
      <Section
        title={messages.directApiAccess.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.45}
      >
        <Paragraph>
          {messages.directApiAccess.intro.split('API').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="api">API</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={messages.directApiAccess.codeExample}
            language="bash"
          />
        </div>

        <div className="mt-6">
          <TipBox variant="info">
            {messages.directApiAccess.tip.content}<InlineCode>gh api</InlineCode>{messages.directApiAccess.tip.description}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Best Practices */}
      <Section
        title={messages.bestPractices.title}
        icon={<CheckCircle className="h-5 w-5" />}
        delay={0.5}
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
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title={messages.tryItNow.title}
        icon={<Eye className="h-5 w-5" />}
        delay={0.55}
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
