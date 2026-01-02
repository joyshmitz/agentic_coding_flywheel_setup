"use client";

import { motion } from "@/components/motion";
import {
  LayoutGrid,
  Play,
  Pause,
  List,
  ArrowLeftRight,
  Copy,
  Scissors,
  Columns,
  Rows,
  Bot,
  Keyboard,
} from "lucide-react";
import {
  Section,
  Paragraph,
  CodeBlock,
  TipBox,
  Highlight,
  Divider,
  GoalBanner,
  BulletList,
} from "./lesson-components";
import { Jargon } from "@/components/jargon";
import { useLocale, getTmuxBasicsLessonMessages } from "@/lib/i18n";

type Messages = ReturnType<typeof getTmuxBasicsLessonMessages>;

export function TmuxBasicsLesson() {
  const { locale } = useLocale();
  const messages = getTmuxBasicsLessonMessages(locale);

  return (
    <div className="space-y-8">
      <GoalBanner>{messages.goalBanner.content}</GoalBanner>

      {/* What Is tmux */}
      <Section
        title={messages.whatIsTmux.title}
        icon={<LayoutGrid className="h-5 w-5" />}
        delay={0.1}
      >
        <Paragraph>
          <Highlight><Jargon term="tmux">{messages.whatIsTmux.highlight}</Jargon></Highlight> {messages.whatIsTmux.description}
        </Paragraph>
        <div className="mt-6">
          <BulletList
            items={messages.whatIsTmux.features}
          />
        </div>
      </Section>

      <Divider />

      {/* Essential Commands */}
      <Section
        title={messages.essentialCommands.title}
        icon={<Play className="h-5 w-5" />}
        delay={0.15}
      >
        {/* Start Session */}
        <div className="space-y-8">
          <CommandSection
            title={messages.essentialCommands.startSession.title}
            code="tmux new -s myproject"
            description={messages.essentialCommands.startSession.description}
            messages={messages}
          />

          <CommandSection
            title={messages.essentialCommands.detachSession.title}
            keyCombo={["Ctrl+a", "d"]}
            description={messages.essentialCommands.detachSession.description}
            messages={messages}
          />

          <CommandSection
            title={messages.essentialCommands.listSessions.title}
            code="tmux ls"
            description={messages.essentialCommands.listSessions.description}
            messages={messages}
          />

          <CommandSection
            title={messages.essentialCommands.reattachSession.title}
            code={`tmux attach -t myproject
# Or just:
tmux a`}
            description={messages.essentialCommands.reattachSession.description}
            messages={messages}
          />
        </div>
      </Section>

      <Divider />

      {/* The Prefix Key */}
      <Section
        title={messages.prefixKey.title}
        icon={<Keyboard className="h-5 w-5" />}
        delay={0.2}
      >
        <TipBox variant="info">
          {messages.prefixKey.tipBox.content}
        </TipBox>
      </Section>

      <Divider />

      {/* Splitting Panes */}
      <Section
        title={messages.splittingPanes.title}
        icon={<Columns className="h-5 w-5" />}
        delay={0.25}
      >
        <KeyboardShortcutGrid
          shortcuts={[
            {
              keys: ["Ctrl+a", "|"],
              action: messages.splittingPanes.shortcuts.splitVertically.action,
              icon: <Columns className="h-4 w-4" />,
            },
            {
              keys: ["Ctrl+a", "-"],
              action: messages.splittingPanes.shortcuts.splitHorizontally.action,
              icon: <Rows className="h-4 w-4" />,
            },
            {
              keys: ["Ctrl+a", "h/j/k/l"],
              action: messages.splittingPanes.shortcuts.moveBetweenPanes.action,
              icon: <ArrowLeftRight className="h-4 w-4" />,
            },
            {
              keys: ["Ctrl+a", "x"],
              action: messages.splittingPanes.shortcuts.closeCurrentPane.action,
              icon: <Scissors className="h-4 w-4" />,
            },
          ]}
        />
      </Section>

      <Divider />

      {/* Windows */}
      <Section
        title={messages.windows.title}
        icon={<LayoutGrid className="h-5 w-5" />}
        delay={0.3}
      >
        <KeyboardShortcutGrid
          shortcuts={[
            {
              keys: ["Ctrl+a", "c"],
              action: messages.windows.shortcuts.newWindow.action,
              icon: <Play className="h-4 w-4" />,
            },
            {
              keys: ["Ctrl+a", "n"],
              action: messages.windows.shortcuts.nextWindow.action,
              icon: <ArrowLeftRight className="h-4 w-4" />,
            },
            {
              keys: ["Ctrl+a", "p"],
              action: messages.windows.shortcuts.previousWindow.action,
              icon: <ArrowLeftRight className="h-4 w-4 rotate-180" />,
            },
            {
              keys: ["Ctrl+a", "0-9"],
              action: messages.windows.shortcuts.goToWindowNumber.action,
              icon: <List className="h-4 w-4" />,
            },
          ]}
        />
      </Section>

      <Divider />

      {/* Copy Mode */}
      <Section
        title={messages.copyMode.title}
        icon={<Copy className="h-5 w-5" />}
        delay={0.35}
      >
        <KeyboardShortcutGrid
          shortcuts={[
            {
              keys: ["Ctrl+a", "["],
              action: messages.copyMode.shortcuts.enterCopyMode.action,
              icon: <Play className="h-4 w-4" />,
            },
            {
              keys: ["j/k", "or arrows"],
              action: messages.copyMode.shortcuts.scroll.action,
              icon: <ArrowLeftRight className="h-4 w-4 rotate-90" />,
            },
            { keys: ["q"], action: messages.copyMode.shortcuts.exitCopyMode.action, icon: <Pause className="h-4 w-4" /> },
            { keys: ["v"], action: messages.copyMode.shortcuts.startSelection.action, icon: <Copy className="h-4 w-4" /> },
            { keys: ["y"], action: messages.copyMode.shortcuts.copySelection.action, icon: <Copy className="h-4 w-4" /> },
          ]}
        />
      </Section>

      <Divider />

      {/* Try It Now */}
      <Section
        title={messages.tryItNow.title}
        icon={<Play className="h-5 w-5" />}
        delay={0.4}
      >
        <CodeBlock
          code={`# Create a session
$ tmux new -s practice

# Split the screen
# Press Ctrl+a, then |

# Move to the new pane
# Press Ctrl+a, then l

# Run something
$ ls -la

# Detach
# Press Ctrl+a, then d

# Verify it's still running
$ tmux ls

# Reattach
$ tmux attach -t practice`}
          showLineNumbers
        />
      </Section>

      <Divider />

      {/* Why This Matters */}
      <Section
        title={messages.whyItMatters.title}
        icon={<Bot className="h-5 w-5" />}
        delay={0.45}
      >
        <WhyItMattersCard messages={messages} />
      </Section>
    </div>
  );
}

// =============================================================================
// COMMAND SECTION - Display a command with description
// =============================================================================
function CommandSection({
  title,
  code,
  keyCombo,
  description,
  messages,
}: {
  title: string;
  code?: string;
  keyCombo?: string[];
  description: string;
  messages?: Messages;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4 }}
      className="group space-y-4 p-4 -mx-4 rounded-xl transition-all duration-300 hover:bg-white/[0.02]"
    >
      <h4 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{title}</h4>
      {code && <CodeBlock code={code} />}
      {keyCombo && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/50">{messages?.commandSection?.pressLabel || "Press"}:</span>
          {keyCombo.map((key, i) => (
            <span key={i} className="flex items-center gap-2">
              <kbd className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-sm font-mono text-white">
                {key}
              </kbd>
              {i < keyCombo.length - 1 && (
                <span className="text-white/30">{messages?.commandSection?.thenLabel || "then"}</span>
              )}
            </span>
          ))}
        </div>
      )}
      <p className="text-white/60">{description}</p>
    </motion.div>
  );
}

// =============================================================================
// KEYBOARD SHORTCUT GRID - Display shortcuts in a grid
// =============================================================================
interface ShortcutItem {
  keys: string[];
  action: string;
  icon: React.ReactNode;
}

function KeyboardShortcutGrid({ shortcuts }: { shortcuts: ShortcutItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {shortcuts.map((shortcut, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -2, scale: 1.01 }}
          className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04]"
        >
          <div className="text-primary group-hover:text-primary/80 transition-colors">{shortcut.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {shortcut.keys.map((key, j) => (
                <span key={j} className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded bg-black/40 border border-white/[0.1] text-xs font-mono text-white">
                    {key}
                  </kbd>
                  {j < shortcut.keys.length - 1 && (
                    <span className="text-white/30 text-xs">+</span>
                  )}
                </span>
              ))}
            </div>
            <span className="text-sm text-white/50">{shortcut.action}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// =============================================================================
// WHY IT MATTERS CARD - Highlight importance
// =============================================================================
function WhyItMattersCard({ messages }: { messages: Messages }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-6 backdrop-blur-xl overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />

      <div className="relative flex items-start gap-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
          <Bot className="h-7 w-7 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-2">
            {messages.whyItMatters.card.title}
          </h4>
          <p className="text-white/60">
            {messages.whyItMatters.card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
