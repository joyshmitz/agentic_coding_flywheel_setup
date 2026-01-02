"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "@/components/motion";
import {
  Sparkles,
  Brain,
  GitBranch,
  Zap,
  Settings,
  Users,
  ChevronDown,
  Check,
  ArrowLeft,
  Copy,
  Layers,
  Terminal,
  Globe,
  Database,
  BarChart3,
  RefreshCw,
  Keyboard,
  ListOrdered,
  Eye,
  GitCommit,
  Lightbulb,
  Target,
  Shield,
  Search,
  Clock,
  ArrowRight,
  Play,
  Cpu,
  MessageSquare,
  FileCode,
  Bug,
  TestTube,
  BookOpen,
  Rocket,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CommandCard } from "@/components/command-card";
import { cn } from "@/lib/utils";
import { useLocale, getWorkflowMessages } from "@/lib/i18n";
import {
  SimplerGuide,
  GuideSection,
  GuideStep,
  GuideExplain,
  GuideTip,
  GuideCaution,
} from "@/components/simpler-guide";
import { springs, fadeUp, staggerContainer } from "@/components/motion";
import { useScrollReveal, staggerDelay } from "@/lib/hooks/useScrollReveal";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Motion-enhanced collapsible section component
function CollapsibleSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
  badge,
  gradient,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  gradient?: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="rounded-2xl border border-border/50 bg-card/50 overflow-hidden backdrop-blur-sm"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={springs.smooth}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl shadow-lg",
              gradient || "bg-gradient-to-br from-primary/80 to-primary"
            )}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={springs.snappy}
          >
            <Icon className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight">{title}</span>
              {badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={springs.snappy}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springs.smooth}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 p-5 space-y-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Code block with copy button
function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  const { locale } = useLocale();
  const messages = getWorkflowMessages(locale);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silent fail
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="relative rounded-xl bg-[oklch(0.13_0.02_260)] border border-border/30 overflow-hidden shadow-lg">
      <div className="flex items-center justify-between px-4 py-2 bg-[oklch(0.11_0.02_260)] border-b border-border/30">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <motion.button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-white/5"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-[oklch(0.72_0.19_145)]" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? messages.ui.copied : messages.ui.copy}
        </motion.button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-[oklch(0.85_0.1_195)] font-mono whitespace-pre-wrap leading-relaxed">{code}</code>
      </pre>
    </div>
  );
}

// Expandable prompt card with animation
function PromptCard({
  label,
  desc,
  prompt,
  commandKey,
  icon: Icon,
}: {
  label: string;
  desc: string;
  prompt: string;
  commandKey: string;
  icon?: React.ElementType;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { locale } = useLocale();
  const messages = getWorkflowMessages(locale);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = prompt;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Silent fail
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <motion.div
      className={cn(
        "rounded-xl border transition-all overflow-hidden",
        isExpanded
          ? "border-primary/40 bg-card/80 shadow-lg shadow-primary/5"
          : "border-border/50 bg-background/50 hover:border-primary/30 hover:shadow-md"
      )}
      whileHover={!isExpanded ? { y: -2 } : {}}
      transition={springs.snappy}
    >
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {Icon && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md font-medium">
                {commandKey}
              </code>
              <span className="font-medium text-sm">{label}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 truncate">{desc}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={springs.snappy}
          className="shrink-0 ml-3"
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springs.smooth}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 p-4">
              <div className="flex justify-end mb-3">
                <motion.button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-[oklch(0.72_0.19_145)]" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? messages.ui.copied : messages.ui.copyPrompt}
                </motion.button>
              </div>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap bg-muted/30 p-4 rounded-xl font-mono leading-relaxed border border-border/30">
                {prompt}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Phase indicator with visual styling
function PhaseIndicator({ number, title, color }: { number: number; title: string; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl font-bold text-white shadow-lg",
        color
      )}>
        {number}
      </div>
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
    </div>
  );
}

// Tool badge component for tech stack display
function ToolBadge({ name, desc, icon: Icon }: { name: string; desc: string; icon?: React.ElementType }) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-colors"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={springs.snappy}
    >
      {Icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      )}
      <div className="min-w-0">
        <span className="text-sm font-medium block">{name}</span>
        <span className="text-xs text-muted-foreground truncate block">{desc}</span>
      </div>
    </motion.div>
  );
}

// Numbered step component for workflows
function WorkflowStep({
  number,
  title,
  children,
  color = "bg-primary"
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg",
          color
        )}>
          {number}
        </div>
        <div className="w-px flex-1 bg-border/50 mt-2" />
      </div>
      <div className="flex-1 pb-8">
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="text-sm text-muted-foreground space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

// Constants
const TECH_STACK = [
  { name: "Next.js 16", desc: "App Router with React 19", icon: Layers },
  { name: "TypeScript", desc: "Strict mode enabled", icon: FileCode },
  { name: "Supabase", desc: "Postgres + Auth + Storage", icon: Database },
  { name: "Drizzle ORM", desc: "Type-safe database access", icon: Database },
  { name: "Vercel AI SDK", desc: "For AI integrations", icon: Cpu },
  { name: "Tailwind CSS", desc: "Utility-first styling", icon: Sparkles },
  { name: "Framer Motion", desc: "Smooth animations", icon: Play },
  { name: "TanStack", desc: "Query, Router, Table, Form", icon: GitBranch },
];

const CLOUD_SERVICES = [
  { name: "Cloudflare", purpose: "Domain purchase, DNS, CDN", tool: "wrangler", icon: Globe },
  { name: "Vercel", purpose: "Frontend hosting & deployment", tool: "vercel", icon: Rocket },
  { name: "Supabase", purpose: "Database, auth, storage", tool: "supabase", icon: Database },
  { name: "Google Cloud", purpose: "Analytics (GA4)", tool: "gcloud", icon: BarChart3 },
];

const FLYWHEEL_CYCLE = [
  { name: "NTM", desc: "Spawns agents", color: "from-sky-400 to-blue-500", icon: Terminal },
  { name: "Mail", desc: "Coordinates", color: "from-violet-400 to-purple-500", icon: MessageSquare },
  { name: "Beads", desc: "Prioritizes", color: "from-emerald-400 to-teal-500", icon: Target },
  { name: "SLB", desc: "Safety", color: "from-amber-400 to-orange-500", icon: Shield },
  { name: "UBS", desc: "Bug scan", color: "from-rose-400 to-red-500", icon: Bug },
  { name: "CM", desc: "Remembers", color: "from-pink-400 to-fuchsia-500", icon: Brain },
  { name: "CASS", desc: "Searches", color: "from-cyan-400 to-sky-500", icon: Search },
  { name: "CAAM", desc: "Auth switch", color: "from-slate-400 to-zinc-500", icon: Users },
];

// Prompts
const PROMPT_BEST_OF_ALL_WORLDS = `I asked 3 competing LLMs to do the exact same thing and they came up with pretty different plans which you can read below. I want you to REALLY carefully analyze their plans with an open mind and be intellectually honest about what they did that's better than your plan. Then I want you to come up with the best possible revisions to your plan (you should simply update your existing document for your original plan with the revisions) that artfully and skillfully blends the "best of all worlds" to create a true, ultimate, superior hybrid version of the plan that best achieves our stated goals and will work the best in real-world practice to solve the problems we are facing and our overarching goals while ensuring the extreme success of the enterprise as best as possible; you should provide me with a complete series of git-diff style changes to your original plan to turn it into the new, enhanced, much longer and detailed plan that integrates the best of all the plans with every good idea included (you don't need to mention which ideas came from which models in the final revised enhanced plan):`;

const PROMPT_100_IDEAS = `OK so now I want you to come up with your top 10 most brilliant ideas for adding extremely powerful and cool functionality that will make this system far more compelling, useful, intuitive, versatile, powerful, robust, reliable, etc for the users. Use ultrathink. But be pragmatic and don't think of features that will be extremely hard to implement or which aren't necessarily worth the additional complexity burden they would introduce. But I don't want you to just think of 10 ideas: I want you to seriously think hard and come up with one HUNDRED ideas and then only tell me your 10 VERY BEST and most brilliant, clever, and radically innovative and powerful ideas.`;

const PROMPT_CREATE_BEADS = `OK so please take ALL of that and elaborate on it more and then create a comprehensive and granular set of beads for all this with tasks, subtasks, and dependency structure overlaid, with detailed comments so that the whole thing is totally self-contained and self-documenting (including relevant background, reasoning/justification, considerations, etc.-- anything we'd want our "future self" to know about the goals and intentions and thought process and how it serves the over-arching goals of the project.) Use the \`bd\` tool repeatedly to create the actual beads. Use ultrathink.`;

const PROMPT_REVIEW_BEADS = `Check over each bead super carefully-- are you sure it makes sense? Is it optimal? Could we change anything to make the system work better for users? If so, revise the beads. It's a lot easier and faster to operate in "plan space" before we start implementing these things! Use ultrathink.`;

const PROMPT_AGENT_SWARM = `First read ALL of the AGENTS.md file and README.md file super carefully and understand ALL of both! Then use your code investigation agent mode to fully understand the code, and technical architecture and purpose of the project. Then register with MCP Agent Mail and introduce yourself to the other agents. Be sure to check your agent mail and to promptly respond if needed to any messages; then proceed meticulously with your next assigned beads, working on the tasks systematically and meticulously and tracking your progress via beads and agent mail messages. Don't get stuck in "communication purgatory" where nothing is getting done; be proactive about starting tasks that need to be done, but inform your fellow agents via messages when you do so and mark beads appropriately. When you're not sure what to do next, use the bv tool mentioned in AGENTS.md to prioritize the best beads to work on next; pick the next one that you can usefully work on and get started. Make sure to acknowledge all communication requests from other agents and that you are aware of all active agents and their names. Use ultrathink.`;

const PROMPT_RANDOMLY_INSPECT = `I want you to sort of randomly explore the code files in this project, choosing code files to deeply investigate and understand and trace their functionality and execution flows through the related code files which they import or which they are imported by. Once you understand the purpose of the code in the larger context of the workflows, I want you to do a super careful, methodical, and critical check with "fresh eyes" to find any obvious bugs, problems, errors, issues, silly mistakes, etc. and then systematically and meticulously and intelligently correct them. Be sure to comply with ALL rules in AGENTS.md and ensure that any code you write or revise conforms to the best practice guides referenced in the AGENTS.md file.`;

const PROMPT_CHECK_OTHER_AGENTS = `Ok can you now turn your attention to reviewing the code written by your fellow agents and checking for any issues, bugs, errors, problems, inefficiencies, security problems, reliability issues, etc. and carefully diagnose their underlying root causes using first-principle analysis and then fix or revise them if necessary? Don't restrict yourself to the latest commits, cast a wider net and go super deep! Use ultrathink.`;

const PROMPT_FRESH_REVIEW = `Great, now I want you to carefully read over all of the new code you just wrote and other existing code you just modified with "fresh eyes" looking super carefully for any obvious bugs, errors, problems, issues, confusion, etc. Carefully fix anything you uncover.`;

const PROMPT_SCRUTINIZE_UI = `Great, now I want you to super carefully scrutinize every aspect of the application workflow and implementation and look for things that just seem sub-optimal or even wrong/mistaken to you, things that could very obviously be improved from a user-friendliness and intuitiveness standpoint, places where our UI/UX could be improved and polished to be slicker, more visually appealing, and more premium feeling and just ultra high quality, like Stripe-level apps.`;

const PROMPT_WORK_ON_BEADS = `OK, so start systematically and methodically and meticulously and diligently executing those remaining beads tasks that you created in the optimal logical order! Don't forget to mark beads as you work on them.`;

const PROMPT_GIT_COMMIT = `Now, based on your knowledge of the project, commit all changed files now in a series of logically connected groupings with super detailed commit messages for each and then push. Take your time to do it right. Don't edit the code at all. Don't commit obviously ephemeral files. Use ultrathink.`;

const PROMPT_NEXT_BEAD = `Pick the next bead you can actually do usefully now and start coding on it immediately; communicate what you're working on to your fellow agents and mark beads appropriately as you work. And respond to any agent mail messages you've received.`;

const PROMPT_ANALYZE_BEADS = `Re-read AGENTS.md first. Then, can you try using bv to get some insights on what each agent should most usefully work on? Then share those insights with the other agents via agent mail and strongly suggest in your messages the optimal work for each one and explain how/why you came up with that using bv. Use ultrathink.`;

const PROMPT_LEVERAGE_TANSTACK = `Ok I want you to look through the ENTIRE project and look for areas where, if we leveraged one of the many TanStack libraries (e.g., query, table, forms, etc), we could make part of the code much better, simpler, more performant, more maintainable, elegant, shorter, more reliable, etc.`;

const PROMPT_BUILD_UI_UX = `I also want you to do a spectacular job building absolutely world-class UI/UX components, with an intense focus on making the most visually appealing, user-friendly, intuitive, slick, polished, "Stripe level" of quality UI/UX possible for this that leverages the good libraries that are already part of the project.`;

const PROMPT_FIX_BUG = `I want you to very carefully diagnose and then fix the root underlying cause of the bugs/errors shown here, but fix them FOR REAL, not a superficial "bandaid" fix! Here are the details:`;

const PROMPT_CHECK_ORM_SCHEMAS = `Now reread AGENTS.md, read your README.md, and then I want you to use ultrathink to super carefully and critically read the entire data ORM schema/models and look for any issues or problems, conceptual mistakes, logical errors, or anything that doesn't fit your understanding of the business strategy and accepted best practices for the design and architecture of databases for these sorts of ecommerce/saas projects/companies.`;

const PROMPT_APPLY_UBS = `Read about the ubs tool in AGENTS.md. Now run UBS and investigate and fix literally every single UBS issue once you determine (after reasoned consideration and close inspection) that it's legit.`;

const PROMPT_CREATE_TESTS = `Do we have full unit test coverage without using mocks/fake stuff? What about complete e2e integration test scripts with great, detailed logging? If not, then create a comprehensive and granular set of beads for all this with tasks, subtasks, and dependency structure overlaid with detailed comments.`;

const PROMPT_COMPLETE_DOCS = `Now I need you to look through the existing documentation in our docusaurus site here and look for the (many, many) instances of functionality in our project that are not described or explained at all yet (or explained inadequately) in the docusaurus site, and then create and expand the documentation in the site to cover these in an exhaustive, intuitive, helpful, useful, pragmatic way. Don't just make a dump of methods, parameters, etc. Add actually well-written narrative explaining what the stuff does, how it is organized, etc. to help another developer understand how it all works so that they can usefully contribute to the system.`;

const PROMPT_IMPROVE_README = `What else can we put in there to make the README longer and more detailed about what we built, why it's useful, how it works, the algorithms/design principles used, etc. This is incremental NEW content, not replacement for what is there already.`;

const PROMPT_DO_GH_FLOW = `Do all the GitHub stuff: commit, deploy, create tag, bump version, release, monitor gh actions, compute checksums, etc.`;

const PROMPT_DO_ALL_OF_IT = `OK, please do ALL of that now. Track work via bd beads (no markdown TODO lists): create/claim/update/close beads as you go so nothing gets lost, and keep communicating via Agent Mail when you start/finish work.`;

const PROMPT_CHECK_MAIL = `Be sure to check your agent mail and to promptly respond if needed to any messages, and also acknowledge any contact requests; make sure you know the names of all active agents using the MCP Agent Mail system.`;

const PROMPT_INTRODUCE_TO_AGENTS = `Before doing anything else, read ALL of AGENTS.md, then register with MCP Agent Mail and introduce yourself to the other agents.`;

const PROMPT_START_WITH_MAIL = `Be sure to check your agent mail and to promptly respond if needed to any messages; then proceed meticulously with your next assigned beads, working on the tasks systematically and meticulously and tracking your progress via beads and agent mail messages. Don't get stuck in "communication purgatory" where nothing is getting done; be proactive about starting tasks that need to be done, but inform your fellow agents via messages when you do so and mark beads appropriately. When you're really not sure what to do, pick the next bead that you can usefully work on and get started. Make sure to acknowledge all communication requests from other agents and that you are aware of all active agents and their names. Use ultrathink.`;

const PROMPT_READ_AND_INVESTIGATE = `First read ALL of the AGENTS.md file and README.md file super carefully and understand ALL of both! Then use your code investigation agent mode to fully understand the code, and technical architecture and purpose of the project.`;

const PROMPT_REREAD_AGENTS = `Reread AGENTS.md so it's still fresh in your mind.`;

const PROMPT_USE_BV = `Use bv with the robot flags (see AGENTS.md for info on this) to find the most impactful bead(s) to work on next and then start on it. Remember to mark the beads appropriately and communicate with your fellow agents.`;

// Organized prompt library
const PROMPT_LIBRARY = {
  analysis: [
    { key: "fresh_review", label: "Fresh Review", prompt: PROMPT_FRESH_REVIEW, desc: "Self-review new code for bugs", icon: Eye },
    { key: "check_other_agents", label: "Check Other Agents", prompt: PROMPT_CHECK_OTHER_AGENTS, desc: "Peer review agent work", icon: Users },
    { key: "randomly_inspect", label: "Randomly Inspect", prompt: PROMPT_RANDOMLY_INSPECT, desc: "Deep code exploration", icon: Search },
    { key: "scrutinize_ui", label: "Scrutinize UI/UX", prompt: PROMPT_SCRUTINIZE_UI, desc: "Polish to Stripe-level quality", icon: Sparkles },
    { key: "check_orm", label: "Check ORM/Schemas", prompt: PROMPT_CHECK_ORM_SCHEMAS, desc: "Review database design", icon: Database },
    { key: "apply_ubs", label: "Apply UBS", prompt: PROMPT_APPLY_UBS, desc: "Run bug scanner and fix all issues", icon: Bug },
  ],
  coding: [
    { key: "fix_bug", label: "Fix Bug", prompt: PROMPT_FIX_BUG, desc: "Diagnose and fix root cause", icon: Bug },
    { key: "create_tests", label: "Create Tests", prompt: PROMPT_CREATE_TESTS, desc: "Comprehensive test coverage", icon: TestTube },
    { key: "leverage_tanstack", label: "Leverage TanStack", prompt: PROMPT_LEVERAGE_TANSTACK, desc: "Use TanStack libs where beneficial", icon: Layers },
    { key: "build_ui_ux", label: "Build UI/UX", prompt: PROMPT_BUILD_UI_UX, desc: "World-class component development", icon: Sparkles },
  ],
  planning: [
    { key: "combine_plans", label: "Combine Plans", prompt: PROMPT_BEST_OF_ALL_WORLDS, desc: "Synthesize best of 3 AI plans", icon: Brain },
    { key: "100_ideas", label: "Generate Ideas", prompt: PROMPT_100_IDEAS, desc: "Think of 100, show best 10", icon: Lightbulb },
    { key: "create_beads", label: "Create Beads", prompt: PROMPT_CREATE_BEADS, desc: "Transform plan into tasks", icon: Target },
    { key: "improve_beads", label: "Improve Beads", prompt: PROMPT_REVIEW_BEADS, desc: "Iterate in 'plan space'", icon: RefreshCw },
    { key: "work_on_beads", label: "Work on Beads", prompt: PROMPT_WORK_ON_BEADS, desc: "Execute tasks in order", icon: Play },
    { key: "next_bead", label: "Next Bead", prompt: PROMPT_NEXT_BEAD, desc: "Pick and start next task", icon: ArrowRight },
    { key: "use_bv", label: "Use BV", prompt: PROMPT_USE_BV, desc: "Find most impactful bead", icon: BarChart3 },
    { key: "analyze_beads", label: "Analyze & Allocate", prompt: PROMPT_ANALYZE_BEADS, desc: "Distribute work to agents", icon: Users },
    { key: "do_all", label: "Do All Of It", prompt: PROMPT_DO_ALL_OF_IT, desc: "Execute everything with tracking", icon: Zap },
  ],
  agents: [
    { key: "new_agent", label: "New Agent", prompt: PROMPT_AGENT_SWARM, desc: "Initialize and join swarm", icon: Cpu },
    { key: "introduce", label: "Introduce", prompt: PROMPT_INTRODUCE_TO_AGENTS, desc: "Register with Agent Mail", icon: MessageSquare },
    { key: "check_mail", label: "Check Mail", prompt: PROMPT_CHECK_MAIL, desc: "Process agent messages", icon: MessageSquare },
    { key: "start_with_mail", label: "Start With Mail", prompt: PROMPT_START_WITH_MAIL, desc: "Check mail then work", icon: Play },
  ],
  git: [
    { key: "git_commit", label: "Git Commit", prompt: PROMPT_GIT_COMMIT, desc: "Smart grouped commits + push", icon: GitCommit },
    { key: "gh_flow", label: "GH Flow", prompt: PROMPT_DO_GH_FLOW, desc: "Full GitHub workflow", icon: GitBranch },
  ],
  investigation: [
    { key: "read_investigate", label: "Read & Investigate", prompt: PROMPT_READ_AND_INVESTIGATE, desc: "Deep project understanding", icon: BookOpen },
    { key: "reread_agents", label: "Reread AGENTS.md", prompt: PROMPT_REREAD_AGENTS, desc: "Refresh context", icon: RefreshCw },
  ],
  documentation: [
    { key: "complete_docs", label: "Complete Docs", prompt: PROMPT_COMPLETE_DOCS, desc: "Expand Docusaurus site", icon: BookOpen },
    { key: "improve_readme", label: "Improve README", prompt: PROMPT_IMPROVE_README, desc: "Add incremental content", icon: FileCode },
  ],
};

export default function WorkflowPage() {
  const { ref: heroRef, isInView: heroInView } = useScrollReveal({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();
  const { locale } = useLocale();
  const messages = getWorkflowMessages(locale);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-[oklch(0.7_0.2_330/0.08)] blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-[oklch(0.75_0.18_195/0.06)] blur-[80px]" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/30 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <Link
            href="/wizard/launch-onboarding"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {messages.header.backLink}
          </Link>

          <motion.div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="flex items-start gap-5"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={springs.smooth}
          >
            <motion.div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.7_0.2_330)] to-primary shadow-xl shadow-primary/20"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={springs.snappy}
            >
              <Sparkles className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                {messages.hero.title} <span className="text-gradient-cosmic">{messages.hero.titleHighlight}</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {messages.hero.subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10 space-y-8">

        {/* Overview Card */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
        >
          <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {messages.overview.title}
            </h2>
            <p className="text-muted-foreground mb-5">
              {messages.overview.description}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Brain, label: messages.overview.features[0].label, color: "text-[oklch(0.7_0.2_330)]" },
                { icon: Target, label: messages.overview.features[1].label, color: "text-[oklch(0.72_0.19_145)]" },
                { icon: Users, label: messages.overview.features[2].label, color: "text-[oklch(0.75_0.18_195)]" },
                { icon: MessageSquare, label: messages.overview.features[3].label, color: "text-[oklch(0.65_0.18_290)]" },
                { icon: Shield, label: messages.overview.features[4].label, color: "text-[oklch(0.78_0.16_75)]" },
                { icon: RefreshCw, label: messages.overview.features[5].label, color: "text-primary" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/30"
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springs.smooth, delay: staggerDelay(i, 0.05) }}
                >
                  <item.icon className={cn("h-5 w-5", item.color)} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Investment reminder */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
        >
          <Card className="p-4 border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.08)]">
            <p className="text-sm flex items-start gap-3">
              <Clock className="h-5 w-5 text-[oklch(0.78_0.16_75)] shrink-0 mt-0.5" />
              <span>
                <strong>{messages.investment.label}</strong> {messages.investment.description}
              </span>
            </p>
          </Card>
        </motion.div>

        {/* Flywheel Visualization */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
        >
          <Card className="p-6 border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="text-center mb-6">
              <div className="mb-5 md:mb-6 flex items-center justify-center gap-2">
                <div className="h-px w-8 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{messages.flywheel.badge}</span>
                <div className="h-px w-8 bg-gradient-to-l from-transparent via-primary/50 to-transparent" />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-2">{messages.flywheel.title}</h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                {messages.flywheel.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {FLYWHEEL_CYCLE.map((tool, i) => {
                const localizedTool = messages.flywheel.tools[i];
                return (
                  <motion.div
                    key={tool.name}
                    className="flex flex-col items-center gap-2"
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...springs.smooth, delay: staggerDelay(i, 0.06) }}
                    whileHover={{ scale: 1.1, y: -4 }}
                  >
                    <div className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                      tool.color
                    )}>
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-center">
                      <span className="text-xs font-bold block">{localizedTool.name}</span>
                      <span className="text-[10px] text-muted-foreground">{localizedTool.desc}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Phase 1: Ideation and Planning */}
        <CollapsibleSection
          title={messages.phases.phase1.title}
          icon={Lightbulb}
          defaultOpen={true}
          badge={messages.phases.phase1.badge}
          gradient="bg-gradient-to-br from-amber-500 to-orange-600"
        >
          <PhaseIndicator number={1} title={messages.phases.phase1.indicator} color="bg-gradient-to-br from-amber-500 to-orange-600" />

          <p className="text-muted-foreground mb-6">
            {messages.phases.phase1.description}
          </p>

          <div className="space-y-2">
            <WorkflowStep number={1} title={messages.phases.phase1.steps.step1.title} color="bg-amber-500">
              <p>
                {messages.phases.phase1.steps.step1.content}
              </p>
            </WorkflowStep>

            <WorkflowStep number={2} title={messages.phases.phase1.steps.step2.title} color="bg-amber-500">
              <p>
                {messages.phases.phase1.steps.step2.content}
              </p>
            </WorkflowStep>

            <WorkflowStep number={3} title={messages.phases.phase1.steps.step3.title} color="bg-amber-500">
              <p className="mb-3">
                {messages.phases.phase1.steps.step3.content}
              </p>
              <CodeBlock code={PROMPT_BEST_OF_ALL_WORLDS} language="prompt" />
              <p className="mt-3 text-xs">
                {messages.phases.phase1.steps.step3.proTip}
              </p>
            </WorkflowStep>

            <WorkflowStep number={4} title={messages.phases.phase1.steps.step4.title} color="bg-amber-500">
              <p className="mb-3">
                {messages.phases.phase1.steps.step4.content}
              </p>
              <CodeBlock code={PROMPT_100_IDEAS} language="prompt" />
              <p className="mt-3 text-xs">
                {messages.phases.phase1.steps.step4.note}
              </p>
            </WorkflowStep>
          </div>

          <SimplerGuide>
            <GuideTip>
              <strong>{messages.phases.phase1.guide.tip.title}</strong> {messages.phases.phase1.guide.tip.content}
            </GuideTip>
            <GuideExplain term={messages.phases.phase1.guide.explain.term}>
              {messages.phases.phase1.guide.explain.content}
            </GuideExplain>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Phase 2: Task Breakdown */}
        <CollapsibleSection
          title={messages.phases.phase2.title}
          icon={GitBranch}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
        >
          <PhaseIndicator number={2} title={messages.phases.phase2.indicator} color="bg-gradient-to-br from-emerald-500 to-teal-600" />

          <p className="text-muted-foreground mb-6">
            {messages.phases.phase2.description}
          </p>

          <div className="space-y-2">
            <WorkflowStep number={1} title={messages.phases.phase2.steps.step1.title} color="bg-emerald-500">
              <CommandCard
                command="ntm new myproject"
                description={messages.phases.phase2.steps.step1.commandDesc}
              />
            </WorkflowStep>

            <WorkflowStep number={2} title={messages.phases.phase2.steps.step2.title} color="bg-emerald-500">
              <p className="mb-3">
                {messages.phases.phase2.steps.step2.content}
              </p>
              <CodeBlock code={PROMPT_CREATE_BEADS} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={3} title={messages.phases.phase2.steps.step3.title} color="bg-emerald-500">
              <p className="mb-3">
                {messages.phases.phase2.steps.step3.content}
              </p>
              <CodeBlock code={PROMPT_REVIEW_BEADS} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={4} title={messages.phases.phase2.steps.step4.title} color="bg-emerald-500">
              <p className="mb-3">
                {messages.phases.phase2.steps.step4.content}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {messages.phases.phase2.steps.step4.commands.map((cmd) => (
                  <div key={cmd.command} className="rounded-lg border border-border/50 p-3 bg-card/50">
                    <code className="text-sm font-mono text-primary">{cmd.command}</code>
                    <p className="text-xs text-muted-foreground mt-1">{cmd.desc}</p>
                  </div>
                ))}
              </div>
            </WorkflowStep>
          </div>

          <SimplerGuide>
            <GuideExplain term={messages.phases.phase2.guide.explain.term}>
              {messages.phases.phase2.guide.explain.content}
              <ul className="mt-2 space-y-1">
                {messages.phases.phase2.guide.explain.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
              {messages.phases.phase2.guide.explain.note}
            </GuideExplain>
            <GuideTip>
              {messages.phases.phase2.guide.tip}
            </GuideTip>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Phase 3: Agent Swarm Implementation */}
        <CollapsibleSection
          title={messages.phases.phase3.title}
          icon={Users}
          gradient="bg-gradient-to-br from-violet-500 to-purple-600"
        >
          <PhaseIndicator number={3} title={messages.phases.phase3.indicator} color="bg-gradient-to-br from-violet-500 to-purple-600" />

          <p className="text-muted-foreground mb-6">
            {messages.phases.phase3.description}
          </p>

          <div className="space-y-2">
            <WorkflowStep number={1} title={messages.phases.phase3.steps.step1.title} color="bg-violet-500">
              <p className="mb-3">
                {messages.phases.phase3.steps.step1.content}
              </p>
              <CommandCard
                command="ntm spawn myproject 8"
                description={messages.phases.phase3.steps.step1.commandDesc}
              />
              <p className="text-xs mt-2">
                {messages.phases.phase3.steps.step1.note}
              </p>
            </WorkflowStep>

            <WorkflowStep number={2} title={messages.phases.phase3.steps.step2.title} color="bg-violet-500">
              <p className="mb-3">
                {messages.phases.phase3.steps.step2.content}
              </p>
              <CodeBlock code={PROMPT_AGENT_SWARM} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={3} title={messages.phases.phase3.steps.step3.title} color="bg-violet-500">
              <p className="mb-3">{messages.phases.phase3.steps.step3.content}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {messages.phases.phase3.steps.step3.commands.map((cmd) => (
                  <div key={cmd.command} className="rounded-lg border border-border/50 p-3 bg-card/50">
                    <code className="text-sm font-mono text-primary">{cmd.command}</code>
                    <p className="text-xs text-muted-foreground mt-1">{cmd.desc}</p>
                  </div>
                ))}
              </div>
            </WorkflowStep>

            <WorkflowStep number={4} title={messages.phases.phase3.steps.step4.title} color="bg-violet-500">
              <p>
                {messages.phases.phase3.steps.step4.content}
              </p>
            </WorkflowStep>
          </div>

          <SimplerGuide>
            <GuideCaution>
              {messages.phases.phase3.guide.caution}
            </GuideCaution>
            <GuideTip>
              {messages.phases.phase3.guide.tip}
            </GuideTip>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Phase 4: Review, Testing, Polish */}
        <CollapsibleSection
          title={messages.phases.phase4.title}
          icon={TestTube}
          gradient="bg-gradient-to-br from-cyan-500 to-sky-600"
        >
          <PhaseIndicator number={4} title={messages.phases.phase4.indicator} color="bg-gradient-to-br from-cyan-500 to-sky-600" />

          <p className="text-muted-foreground mb-6">
            {messages.phases.phase4.description}
          </p>

          <div className="space-y-2">
            <WorkflowStep number={1} title={messages.phases.phase4.steps.step1.title} color="bg-cyan-500">
              <p className="mb-3">{messages.phases.phase4.steps.step1.content}</p>
              <CodeBlock code={PROMPT_FRESH_REVIEW} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={2} title={messages.phases.phase4.steps.step2.title} color="bg-cyan-500">
              <p className="mb-3">{messages.phases.phase4.steps.step2.content}</p>
              <CodeBlock code={PROMPT_CHECK_OTHER_AGENTS} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={3} title={messages.phases.phase4.steps.step3.title} color="bg-cyan-500">
              <p className="mb-3">{messages.phases.phase4.steps.step3.content}</p>
              <CodeBlock code={PROMPT_SCRUTINIZE_UI} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={4} title={messages.phases.phase4.steps.step4.title} color="bg-cyan-500">
              <p className="mb-3">{messages.phases.phase4.steps.step4.content}</p>
              <CodeBlock code={PROMPT_APPLY_UBS} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={5} title={messages.phases.phase4.steps.step5.title} color="bg-cyan-500">
              <p className="mb-3">{messages.phases.phase4.steps.step5.content}</p>
              <CodeBlock code={PROMPT_CREATE_TESTS} language="prompt" />
            </WorkflowStep>
          </div>

          <SimplerGuide>
            <GuideExplain term={messages.phases.phase4.guide.explain.term}>
              {messages.phases.phase4.guide.explain.content}
            </GuideExplain>
            <GuideTip>
              {messages.phases.phase4.guide.tip}
            </GuideTip>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Phase 5: Deploy and Maintenance */}
        <CollapsibleSection
          title={messages.phases.phase5.title}
          icon={Rocket}
          gradient="bg-gradient-to-br from-rose-500 to-red-600"
        >
          <PhaseIndicator number={5} title={messages.phases.phase5.indicator} color="bg-gradient-to-br from-rose-500 to-red-600" />

          <p className="text-muted-foreground mb-6">
            {messages.phases.phase5.description}
          </p>

          <div className="space-y-2">
            <WorkflowStep number={1} title={messages.phases.phase5.steps.step1.title} color="bg-rose-500">
              <p className="mb-3">{messages.phases.phase5.steps.step1.content}</p>
              <CodeBlock code={PROMPT_GIT_COMMIT} language="prompt" />
              <p className="text-xs mt-2">{messages.phases.phase5.steps.step1.note}</p>
            </WorkflowStep>

            <WorkflowStep number={2} title={messages.phases.phase5.steps.step2.title} color="bg-rose-500">
              <p className="mb-3">{messages.phases.phase5.steps.step2.content}</p>
              <CodeBlock code={PROMPT_DO_GH_FLOW} language="prompt" />
            </WorkflowStep>

            <WorkflowStep number={3} title={messages.phases.phase5.steps.step3.title} color="bg-rose-500">
              <p>
                {messages.phases.phase5.steps.step3.content}
              </p>
            </WorkflowStep>
          </div>

          <SimplerGuide>
            <GuideCaution>
              {messages.phases.phase5.guide.caution}
            </GuideCaution>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Daily Autopilot Mode */}
        <CollapsibleSection
          title={messages.dailyMaintenance.title}
          icon={RefreshCw}
          gradient="bg-gradient-to-br from-indigo-500 to-blue-600"
        >
          <Card className="p-5 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              {messages.dailyMaintenance.philosophy.title}
            </h4>
            <div className="space-y-3 text-sm">
              {messages.dailyMaintenance.philosophy.paragraphs.map((p, i) => (
                <p key={i} className="text-muted-foreground">{p}</p>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                {messages.dailyMaintenance.sections.randomInspection.title}
              </h4>
              <CodeBlock code={PROMPT_RANDOMLY_INSPECT} language="prompt" />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                {messages.dailyMaintenance.sections.peerReview.title}
              </h4>
              <CodeBlock code={PROMPT_CHECK_OTHER_AGENTS} language="prompt" />
            </div>

            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                {messages.dailyMaintenance.sections.uiPolish.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {messages.dailyMaintenance.sections.uiPolish.note}
              </p>
              <CodeBlock code={PROMPT_SCRUTINIZE_UI} language="prompt" />
            </div>
          </div>

          <SimplerGuide>
            <GuideSection title={messages.dailyMaintenance.guide.hierarchy.title}>
              <ul className="space-y-2 text-sm">
                {messages.dailyMaintenance.guide.hierarchy.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </GuideSection>
            <GuideSection title={messages.dailyMaintenance.guide.routine.title}>
              <div className="space-y-4 mt-3">
                {messages.dailyMaintenance.guide.routine.steps.map((step, i) => (
                  <GuideStep key={i} number={i + 1} title={step.title}>
                    {step.content}
                  </GuideStep>
                ))}
              </div>
            </GuideSection>
            <GuideCaution>
              {messages.dailyMaintenance.guide.caution}
            </GuideCaution>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Complete Prompt Library */}
        <CollapsibleSection
          title={messages.promptLibrary.title}
          icon={Keyboard}
          gradient="bg-gradient-to-br from-fuchsia-500 to-pink-600"
        >
          <p className="text-muted-foreground mb-6">
            {messages.promptLibrary.description}
          </p>

          {/* Analysis & Review */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.analysis.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.analysis.map((p, i) => {
                const localized = messages.promptLibrary.categories.analysis.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          {/* Coding & Development */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.coding.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.coding.map((p, i) => {
                const localized = messages.promptLibrary.categories.coding.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          {/* Planning & Beads */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.planning.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.planning.map((p, i) => {
                const localized = messages.promptLibrary.categories.planning.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          {/* Agent Coordination */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.agents.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.agents.map((p, i) => {
                const localized = messages.promptLibrary.categories.agents.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          {/* Git & Operations */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.git.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.git.map((p, i) => {
                const localized = messages.promptLibrary.categories.git.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          {/* Investigation */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.investigation.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.investigation.map((p, i) => {
                const localized = messages.promptLibrary.categories.investigation.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          {/* Documentation */}
          <div className="mb-6">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              {messages.promptLibrary.categories.documentation.title}
            </h4>
            <div className="grid gap-2">
              {PROMPT_LIBRARY.documentation.map((p, i) => {
                const localized = messages.promptLibrary.categories.documentation.prompts[i];
                return (
                  <PromptCard key={p.key} label={localized.label} desc={localized.desc} prompt={p.prompt} commandKey={p.key} icon={p.icon} />
                );
              })}
            </div>
          </div>

          <SimplerGuide>
            <GuideExplain term={messages.promptLibrary.guide.explain.term}>
              {messages.promptLibrary.guide.explain.content}
            </GuideExplain>
            <GuideTip>
              {messages.promptLibrary.guide.tip}
            </GuideTip>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Queued Workflows */}
        <CollapsibleSection
          title={messages.queuedWorkflows.title}
          icon={ListOrdered}
          gradient="bg-gradient-to-br from-lime-500 to-green-600"
        >
          <Card className="p-4 border-[oklch(0.78_0.16_75/0.3)] bg-[oklch(0.78_0.16_75/0.08)] mb-6">
            <p className="text-sm">
              {messages.queuedWorkflows.note}
            </p>
          </Card>

          <p className="text-muted-foreground mb-6">
            {messages.queuedWorkflows.description}
          </p>

          <div className="space-y-4">
            <h4 className="font-medium">{messages.queuedWorkflows.cycleTitle}</h4>
            <p className="text-sm text-muted-foreground mb-4">
              {messages.queuedWorkflows.cycleDescription}
            </p>

            <div className="space-y-4">
              {[
                { num: 1, title: messages.queuedWorkflows.steps[0].title, code: PROMPT_SCRUTINIZE_UI },
                { num: 2, title: messages.queuedWorkflows.steps[1].title, code: PROMPT_CREATE_BEADS },
                { num: 3, title: messages.queuedWorkflows.steps[2].title, code: PROMPT_REVIEW_BEADS },
                { num: 4, title: messages.queuedWorkflows.steps[3].title, code: PROMPT_WORK_ON_BEADS },
                { num: 5, title: messages.queuedWorkflows.steps[4].title, code: "proceed" },
                { num: 6, title: messages.queuedWorkflows.steps[5].title, code: PROMPT_FRESH_REVIEW },
                { num: 7, title: messages.queuedWorkflows.steps[6].title, code: PROMPT_GIT_COMMIT },
              ].map((step) => (
                <div key={step.num} className="flex gap-3">
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white",
                    step.num === 7 ? "bg-[oklch(0.72_0.19_145)]" : "bg-primary/80"
                  )}>
                    {step.num}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">{step.title}</p>
                    <CodeBlock code={step.code} language="prompt" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SimplerGuide>
            <GuideTip>
              {messages.queuedWorkflows.guide.tip}
            </GuideTip>
            <GuideCaution>
              {messages.queuedWorkflows.guide.caution}
            </GuideCaution>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Post-Install Setup */}
        <CollapsibleSection
          title={messages.postInstall.title}
          icon={Settings}
          gradient="bg-gradient-to-br from-slate-500 to-zinc-600"
        >
          <p className="text-muted-foreground mb-4">
            {messages.postInstall.description}
          </p>

          <CommandCard
            command="acfs services-setup"
            description={messages.postInstall.commandDesc}
          />

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {CLOUD_SERVICES.map((service, i) => {
              const localized = messages.postInstall.services[i];
              return (
                <motion.div
                  key={service.name}
                  className="rounded-xl border border-border/50 p-4 bg-card/50"
                  whileHover={{ y: -2 }}
                  transition={springs.snappy}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="h-5 w-5 text-primary" />
                    <span className="font-medium">{localized.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{localized.purpose}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    bun add -g {localized.tool}
                  </code>
                </motion.div>
              );
            })}
          </div>

          <SimplerGuide>
            <GuideExplain term={messages.postInstall.guide.explain.term}>
              {messages.postInstall.guide.explain.content}
            </GuideExplain>
            <GuideTip>
              {messages.postInstall.guide.tip}
            </GuideTip>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Recommended Tech Stack */}
        <CollapsibleSection
          title={messages.techStack.title}
          icon={Layers}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        >
          <p className="text-muted-foreground mb-6">
            {messages.techStack.description}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_STACK.map((tool, i) => {
              const localized = messages.techStack.tools[i];
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springs.smooth, delay: staggerDelay(i, 0.05) }}
                >
                  <ToolBadge name={localized.name} desc={localized.desc} icon={tool.icon} />
                </motion.div>
              );
            })}
          </div>

          <SimplerGuide>
            <GuideTip>
              {messages.techStack.guide.tip}
            </GuideTip>
            <GuideExplain term={messages.techStack.guide.explain.term}>
              {messages.techStack.guide.explain.content}
            </GuideExplain>
          </SimplerGuide>
        </CollapsibleSection>

        {/* Summary */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springs.smooth}
        >
          <Card className="p-6 border-2 border-[oklch(0.72_0.19_145/0.3)] bg-gradient-to-br from-[oklch(0.72_0.19_145/0.05)] to-transparent">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <Zap className="h-5 w-5 text-[oklch(0.72_0.19_145)]" />
              {messages.summary.title}
            </h2>
            <motion.ol
              className="space-y-4 text-sm"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { color: "from-amber-500 to-orange-600", text: messages.summary.steps[0] },
                { color: "from-amber-500 to-orange-600", text: messages.summary.steps[1] },
                { color: "from-emerald-500 to-teal-600", text: messages.summary.steps[2] },
                { color: "from-emerald-500 to-teal-600", text: messages.summary.steps[3] },
                { color: "from-violet-500 to-purple-600", text: messages.summary.steps[4] },
                { color: "from-cyan-500 to-sky-600", text: messages.summary.steps[5] },
                { color: "from-rose-500 to-red-600", text: messages.summary.steps[6] },
              ].map((step, i) => (
                <motion.li
                  key={i}
                  className="flex gap-4"
                  variants={fadeUp}
                >
                  <span className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white bg-gradient-to-br",
                    step.color
                  )}>
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step.text}</span>
                </motion.li>
              ))}
            </motion.ol>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="text-center py-10 border-t border-border/50">
          <p className="text-muted-foreground mb-6">
            {messages.footer.message}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/wizard/launch-onboarding">
              <Button variant="outline" className="border-border/50 hover:bg-muted/50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {messages.footer.backButton}
              </Button>
            </Link>
            <Link href="/wizard/os-selection">
              <Button className="bg-primary text-primary-foreground">
                {messages.footer.startButton}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
