"use client";

import { motion } from "@/components/motion";
import {
  Bot,
  Key,
  Zap,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Database,
  Sparkles,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Divider,
  GoalBanner,
  BulletList,
  InlineCode,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getAgentsLoginLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getAgentsLoginLessonMessages>;

export function AgentsLoginLesson() {
  const { locale } = useLocale();
  const messages = getAgentsLoginLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>
        {messages.goalBanner.content}
      </GoalBanner>

      {/* The Three Agents */}
      <Section
        title={messages.threeAgents.title}
        icon={<Bot className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          {messages.threeAgents.description.split('AI agents').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="ai-agents">AI agents</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <AgentInfoCard
            name={messages.threeAgents.agents.claudeCode.name}
            command={messages.threeAgents.agents.claudeCode.command}
            alias={messages.threeAgents.agents.claudeCode.alias}
            company={messages.threeAgents.agents.claudeCode.company}
            gradient="from-orange-500 to-amber-500"
            delay={0.1}
          />
          <AgentInfoCard
            name={messages.threeAgents.agents.codexCli.name}
            command={messages.threeAgents.agents.codexCli.command}
            alias={messages.threeAgents.agents.codexCli.alias}
            company={messages.threeAgents.agents.codexCli.company}
            gradient="from-emerald-500 to-teal-500"
            delay={0.2}
          />
          <AgentInfoCard
            name={messages.threeAgents.agents.geminiCli.name}
            command={messages.threeAgents.agents.geminiCli.command}
            alias={messages.threeAgents.agents.geminiCli.alias}
            company={messages.threeAgents.agents.geminiCli.company}
            gradient="from-blue-500 to-indigo-500"
            delay={0.3}
          />
        </div>
      </Section>

      <Divider />

      {/* What The Aliases Do */}
      <Section
        title={messages.whatAliasesDo.title}
        icon={<Zap className="h-5 w-5" />}
        delay={0.15}
      >
        <Paragraph>
          {messages.whatAliasesDo.description.split('aliases').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="alias">aliases</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-8 space-y-6">
          <AliasCard
            alias="cc"
            name="Claude Code"
            code={`NODE_OPTIONS="--max-old-space-size=32768" \\
  claude --dangerously-skip-permissions`}
            features={[
              "Extra memory for large projects",
              "Background tasks enabled by default",
              "No permission prompts",
            ]}
            gradient="from-orange-500/20 to-amber-500/20"
          />

          <AliasCard
            alias={messages.whatAliasesDo.aliases.claudeCode.alias}
            name={messages.whatAliasesDo.aliases.claudeCode.name}
            code={messages.whatAliasesDo.aliases.claudeCode.code}
            features={messages.whatAliasesDo.aliases.claudeCode.features}
            gradient="from-orange-500/20 to-amber-500/20"
          />

          <AliasCard
            alias={messages.whatAliasesDo.aliases.codexCli.alias}
            name={messages.whatAliasesDo.aliases.codexCli.name}
            code={messages.whatAliasesDo.aliases.codexCli.code}
            features={messages.whatAliasesDo.aliases.codexCli.features}
            gradient="from-emerald-500/20 to-teal-500/20"
          />

          <AliasCard
            alias={messages.whatAliasesDo.aliases.geminiCli.alias}
            name={messages.whatAliasesDo.aliases.geminiCli.name}
            code={messages.whatAliasesDo.aliases.geminiCli.code}
            features={messages.whatAliasesDo.aliases.geminiCli.features}
            gradient="from-blue-500/20 to-indigo-500/20"
          />
        </div>
      </Section>

      <Divider />

      {/* First Login */}
      <Section
        title={messages.firstLogin.title}
        icon={<Key className="h-5 w-5" />}
        delay={0.2}
      >
        <Paragraph>
          {messages.firstLogin.description.split('API key').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="api-key">API key</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-8 space-y-6">
          {/* Claude Login */}
          <LoginStep
            agent={messages.firstLogin.loginSteps.claudeCode.agent}
            command={messages.firstLogin.loginSteps.claudeCode.command}
            description={messages.firstLogin.loginSteps.claudeCode.description}
            gradient="from-orange-500/10 to-amber-500/10"
          />

          {/* Codex Login */}
          <LoginStep
            agent={messages.firstLogin.loginSteps.codexCli.agent}
            command={messages.firstLogin.loginSteps.codexCli.command}
            description={messages.firstLogin.loginSteps.codexCli.description}
            gradient="from-emerald-500/10 to-teal-500/10"
          />

          {/* OpenAI Warning */}
          <OpenAIAccountWarning messages={messages} />

          {/* Gemini Login */}
          <LoginStep
            agent={messages.firstLogin.loginSteps.geminiCli.agent}
            command={messages.firstLogin.loginSteps.geminiCli.command}
            description={messages.firstLogin.loginSteps.geminiCli.description}
            gradient="from-blue-500/10 to-indigo-500/10"
          />
        </div>
      </Section>

      <Divider />

      {/* Backup Credentials */}
      <Section
        title={messages.backupCredentials.title}
        icon={<Database className="h-5 w-5" />}
        delay={0.25}
      >
        <Paragraph>
          {messages.backupCredentials.description}
        </Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`caam backup claude my-main-account
caam backup codex my-main-account
caam backup gemini my-main-account`}
          />
        </div>

        <Paragraph>{messages.backupCredentials.instructionsAfter}</Paragraph>

        <div className="mt-6">
          <CodeBlock code="caam activate claude my-other-account" />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.backupCredentials.tipBoxContent}
          </TipBox>
        </div>
      </Section>

      <Divider />

      {/* Test Your Agents */}
      <Section
        title={messages.testAgents.title}
        icon={<Terminal className="h-5 w-5" />}
        delay={0.3}
      >
        <Paragraph>
          {messages.testAgents.description.split('CLI').map((part, i, arr) =>
            i < arr.length - 1 ? <span key={i}>{part}<Jargon term="cli">CLI</Jargon></span> : part
          )}
        </Paragraph>

        <div className="mt-6 space-y-4">
          <CodeBlock code={`cc "Hello! Please confirm you're working."`} />
          <CodeBlock code={`cod "Hello! Please confirm you're working."`} />
          <CodeBlock code={`gmi "Hello! Please confirm you're working."`} />
        </div>
      </Section>

      <Divider />

      {/* Quick Tips */}
      <Section
        title={messages.quickTips.title}
        icon={<Sparkles className="h-5 w-5" />}
        delay={0.35}
      >
        <div className="mt-4">
          <BulletList
            items={messages.quickTips.tips.map((tip, index) => (
              <span key={index + 1}>
                <strong>{tip.title}</strong> - {tip.description}
              </span>
            ))}
          />
        </div>
      </Section>

      <Divider />

      {/* Practice */}
      <Section
        title={messages.practiceNow.title}
        icon={<CheckCircle2 className="h-5 w-5" />}
        delay={0.4}
      >
        <Paragraph>{messages.practiceNow.description}</Paragraph>

        <div className="mt-6">
          <CodeBlock
            code={`# Check which agents are installed
$ which claude codex gemini

# Check your agent credential backups
$ caam ls

# If you haven't logged in yet, start with Claude:
$ claude auth login`}
            showLineNumbers
          />
        </div>

        <div className="mt-6">
          <TipBox variant="tip">
            {messages.practiceNow.tipBoxContent}
          </TipBox>
        </div>
      </Section>
    </div>
  );
}

// =============================================================================
// AGENT INFO CARD - Display agent with gradient styling
// =============================================================================
function AgentInfoCard({
  name,
  command,
  alias,
  company,
  gradient,
  delay,
}: {
  name: string;
  command: string;
  alias: string;
  company: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.15]"
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
      />

      <div className="relative flex flex-col items-center text-center">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg mb-4`}
        >
          <Bot className="h-7 w-7 text-white" />
        </div>
        <span className="font-bold text-white">{name}</span>
        <span className="text-xs text-white/60 mt-1">{company}</span>

        <div className="mt-4 flex flex-col gap-2 w-full">
          <code className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] text-xs font-mono text-white/70">
            {command}
          </code>
          <code className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-xs font-mono text-primary">
            {alias}
          </code>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// ALIAS CARD - Display alias configuration
// =============================================================================
function AliasCard({
  alias,
  name,
  code,
  features,
  gradient,
}: {
  alias: string;
  name: string;
  code: string;
  features: string[];
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/[0.15]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <code className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-lg font-mono font-bold text-primary">
          {alias}
        </code>
        <span className="text-white/60">({name})</span>
      </div>

      <div className="mb-4 rounded-xl bg-black/30 border border-white/[0.06] overflow-hidden">
        <pre className="p-4 text-xs font-mono text-white/80 overflow-x-auto">
          {code}
        </pre>
      </div>

      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// =============================================================================
// LOGIN STEP - Display login command for each agent
// =============================================================================
function LoginStep({
  agent,
  command,
  description,
  gradient,
}: {
  agent: string;
  command: string;
  description: string;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br ${gradient} p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15]`}
    >
      <h4 className="font-bold text-white mb-3 group-hover:text-primary transition-colors">{agent}</h4>
      <div className="mb-3 rounded-xl bg-black/30 border border-white/[0.06] overflow-hidden group-hover:bg-black/40 transition-colors">
        <pre className="p-3 text-sm font-mono text-emerald-400">
          <span className="text-white/50">$ </span>
          {command}
        </pre>
      </div>
      <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{description}</p>
    </motion.div>
  );
}

// =============================================================================
// CODEX LOGIN SECTION - Headless VPS auth options
// =============================================================================
function CodexLoginSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15]"
    >
      <h4 className="font-bold text-white mb-3 group-hover:text-primary transition-colors">
        Codex CLI
      </h4>

      <p className="text-sm text-white/60 mb-4">
        <strong className="text-amber-400">On a headless VPS</strong>, Codex requires special handling because its OAuth callback expects{" "}
        <InlineCode>localhost:1455</InlineCode>.
      </p>

      {/* Option 1: Device Auth */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-emerald-400 mb-2">
          Option 1: Device Auth (Recommended)
        </p>
        <ol className="list-decimal list-inside text-xs text-white/60 space-y-1 mb-2 pl-2">
          <li>
            Enable &quot;Device code login&quot; in{" "}
            <a
              href="https://chatgpt.com/settings/security"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              ChatGPT Settings → Security
            </a>
          </li>
          <li>Then run the command below</li>
        </ol>
        <div className="rounded-xl bg-black/30 border border-white/[0.06] overflow-hidden">
          <pre className="p-3 text-sm font-mono text-emerald-400">
            <span className="text-white/50">$ </span>codex login --device-auth
          </pre>
        </div>
      </div>

      {/* Option 2: SSH Tunnel */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-emerald-400 mb-2">
          Option 2: SSH Tunnel
        </p>
        <ol className="list-decimal list-inside text-xs text-white/60 space-y-1 mb-2 pl-2">
          <li>On your laptop, create a tunnel</li>
          <li>Then run <InlineCode>codex login</InlineCode> on VPS</li>
        </ol>
        <div className="rounded-xl bg-black/30 border border-white/[0.06] overflow-hidden">
          <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto">
            <span className="text-white/50"># On laptop:</span>{"\n"}
            <span className="text-white/50">$ </span>ssh -L 1455:localhost:1455 ubuntu@YOUR_VPS_IP{"\n"}
            <span className="text-white/50"># Then on VPS:</span>{"\n"}
            <span className="text-white/50">$ </span>codex login
          </pre>
        </div>
      </div>

      {/* Option 3: Standard */}
      <div>
        <p className="text-xs font-semibold text-white/60 mb-2">
          Option 3: Standard (if you have a browser)
        </p>
        <div className="rounded-xl bg-black/30 border border-white/[0.06] overflow-hidden">
          <pre className="p-3 text-sm font-mono text-emerald-400">
            <span className="text-white/50">$ </span>codex login
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// OPENAI ACCOUNT WARNING - Critical warning about account types
// =============================================================================
function OpenAIAccountWarning({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="group relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-6 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-amber-500/50"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
          <span className="font-bold text-amber-400">
            {messages.firstLogin.openaiWarning.title}
          </span>
        </div>

        {/* Account type comparison */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="p-4 rounded-xl bg-black/20 border border-white/[0.06]">
            <h5 className="font-bold text-white mb-2">
              {messages.firstLogin.openaiWarning.chatgptType.title}
            </h5>
            <ul className="space-y-1 text-xs text-white/60">
              {messages.firstLogin.openaiWarning.chatgptType.items.map((item: string, index: number) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-black/20 border border-white/[0.06]">
            <h5 className="font-bold text-white mb-2">
              {messages.firstLogin.openaiWarning.apiType.title}
            </h5>
            <ul className="space-y-1 text-xs text-white/60">
              {messages.firstLogin.openaiWarning.apiType.items.map((item: string, index: number) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm text-white/70">
          {messages.firstLogin.openaiWarning.description}
        </p>

        <p className="mt-3 text-sm text-amber-400/80">
          {messages.firstLogin.openaiWarning.troubleshooting}
        </p>
      </div>
    </motion.div>
  );
}
