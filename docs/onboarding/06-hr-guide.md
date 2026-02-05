# Блок 6: Гайд для HR

## Зміст

- [Профілі кандидатів](#профілі-кандидатів)
- [Job Descriptions](#job-descriptions)
- [Ключові питання для співбесіди](#ключові-питання-для-співбесіди)
- [Тестові завдання](#тестові-завдання)
- [Критерії відбору](#критерії-відбору)
- [Процес онбордингу](#процес-онбордингу)
- [Red Flags та Green Flags](#red-flags-та-green-flags)

---

## Профілі кандидатів

### AI-Augmented Developer

**Ідеальний профіль:**

| Характеристика | Опис |
|----------------|------|
| **Background** | Software developer з 2+ років досвіду |
| **Key Trait** | Цікавість до AI tools та automation |
| **Tech Stack** | TypeScript/Python + willingness to learn |
| **Mindset** | Pragmatic, verification-oriented |

**Де шукати:**
- GitHub (активні contributors з AI-related projects)
- LinkedIn (keywords: "AI coding", "Claude", "ChatGPT development")
- Discord/Slack communities (Claude Code, OpenAI developers)
- Reddit (r/ClaudeAI, r/ChatGPT, r/programming)

**Типові попередні ролі:**
- Full-stack developer
- Backend engineer
- DevOps engineer with coding focus

---

### Agent Orchestrator

**Ідеальний профіль:**

| Характеристика | Опис |
|----------------|------|
| **Background** | Technical project manager або senior developer |
| **Key Trait** | Systems thinking, coordination skills |
| **Tech Stack** | CLI proficiency, scripting |
| **Mindset** | Process-oriented, communication-focused |

**Де шукати:**
- Technical project managers
- DevOps leads
- Senior developers з leadership досвідом

**Типові попередні ролі:**
- Tech lead
- Scrum master з technical background
- Senior full-stack developer

---

### Safety Engineer

**Ідеальний профіль:**

| Характеристика | Опис |
|----------------|------|
| **Background** | Security engineer або QA з security focus |
| **Key Trait** | Paranoid mindset, attention to detail |
| **Tech Stack** | Static analysis tools, OWASP |
| **Mindset** | Risk-aware, thorough |

**Де шукати:**
- Security conferences (BSides, OWASP events)
- Bug bounty platforms (HackerOne, Bugcrowd)
- Security-focused communities

**Типові попередні ролі:**
- Application security engineer
- Security-focused QA
- Penetration tester

---

## Job Descriptions

### Template: AI-Augmented Developer

```markdown
## AI-Augmented Developer

### About the Role
Join our team working with cutting-edge AI coding tools. You'll leverage AI assistants
like Claude Code and Codex to accelerate development while maintaining high code quality.

### What You'll Do
- Develop features using AI-assisted workflows
- Collaborate with AI agents and human team members
- Review and verify AI-generated code
- Contribute to tooling improvements
- Participate in multi-agent development sessions

### Requirements
- 2+ years of software development experience
- Proficiency in TypeScript or Python
- Experience with command-line tools
- Familiarity with Git workflows
- Strong written communication skills

### Nice to Have
- Experience with AI coding assistants (Claude Code, GitHub Copilot, Cursor)
- Familiarity with tmux or similar terminal multiplexers
- Background in DevOps or automation
- Contributions to open-source projects

### Our Tech Stack
- AI: Claude Code, Codex CLI, Gemini CLI
- Coordination: NTM (tmux), Agent Mail, CASS
- Safety: UBS, DCG, SLB
- Infrastructure: Docker, Tailscale, Vercel
```

### Template: Agent Orchestrator

```markdown
## Agent Orchestrator

### About the Role
Lead multi-agent workflows, coordinating AI assistants to tackle complex development tasks.
You'll design workflows, manage agent communication, and ensure smooth collaboration.

### What You'll Do
- Design and implement multi-agent workflows
- Coordinate AI agents for parallel development
- Manage inter-agent communication via Agent Mail
- Optimize task distribution and prioritization
- Document and improve orchestration patterns

### Requirements
- 4+ years of software development experience
- Experience leading technical projects
- Strong CLI and scripting skills
- Excellent written communication
- Process improvement mindset

### Our Coordination Stack
- NTM (Named Tmux Manager)
- MCP Agent Mail
- CASS (session search)
- beads_rust (task tracking)
```

---

## Ключові питання для співбесіди

### Screening Call (30 хвилин)

#### Загальні питання

1. **"Розкажіть про свій досвід з AI coding tools."**
   - Looking for: Hands-on experience, specific examples
   - Red flag: Never tried any AI tools

2. **"Як ви перевіряєте код, згенерований AI?"**
   - Looking for: Verification strategies, skepticism
   - Red flag: "I just trust the AI"

3. **"Опишіть ситуацію, коли AI дав неправильне рішення."**
   - Looking for: Critical thinking, problem-solving
   - Red flag: "Never happened" or no strategy

#### CLI & Tools

4. **"Які CLI tools ви використовуєте щодня?"**
   - Looking for: git, ripgrep/grep, tmux, docker
   - Red flag: Only GUI tools

5. **"Як ви організовуєте робочі сесії?"**
   - Looking for: Session management, productivity patterns
   - Red flag: No system, chaotic workflow

### Technical Interview (60-90 хвилин)

#### Coding & AI Collaboration

1. **Live coding з Claude Code** (30 хв)
   ```
   Task: Implement a simple REST endpoint with validation

   Evaluate:
   - How they formulate prompts
   - How they verify AI output
   - How they iterate on the solution
   ```

2. **Bug fix scenario** (20 хв)
   ```
   Task: Given a failing test, debug and fix the issue

   Evaluate:
   - Debugging approach
   - Use of AI for assistance
   - Balance between AI and manual work
   ```

#### Architecture & Design

3. **System design with AI constraints** (20 хв)
   ```
   Task: Design a feature knowing AI agents will implement it

   Evaluate:
   - Task breakdown skills
   - Clear specification writing
   - Understanding of AI limitations
   ```

#### Communication

4. **Agent Mail scenario** (10 хв)
   ```
   Task: Write a message to another agent explaining a technical decision

   Evaluate:
   - Clarity of communication
   - Technical accuracy
   - Appropriate level of detail
   ```

### Behavioral Interview (45 хвилин)

#### Collaboration

1. **"Розкажіть про ситуацію, коли вам довелося координувати роботу з кількома людьми над одним завданням."**

2. **"Як ви вирішуєте конфлікти в коді (merge conflicts)?"**

#### Problem Solving

3. **"Опишіть найскладніший баг, який ви виправляли. Як ви підходили до вирішення?"**

4. **"Що ви робите, коли застрягли на задачі?"**

#### Learning

5. **"Як ви вчитесь новим інструментам?"**

6. **"Розкажіть про останній новий інструмент, який ви освоїли."**

---

## Тестові завдання

### Take-Home Assignment (4-6 годин)

#### Option 1: Feature Implementation

```markdown
## Task: Build a CLI Tool with AI Assistance

### Requirements
1. Create a simple CLI tool that:
   - Accepts a command-line argument
   - Processes input (e.g., file parsing, API call)
   - Outputs formatted results

2. Document your AI interaction:
   - Save the chat history with AI
   - Note what worked and what didn't
   - Describe how you verified the code

### Deliverables
- Working code in a Git repository
- README with setup instructions
- AI interaction log (chat exports)
- Brief writeup (500 words) on your experience

### Evaluation Criteria
- Code quality and correctness
- Effective use of AI assistance
- Verification and testing approach
- Documentation quality
```

#### Option 2: Debug Challenge

```markdown
## Task: Debug and Document

### Given
A codebase with 3 intentional bugs:
- One obvious bug
- One subtle logic error
- One security issue

### Requirements
1. Find and fix all bugs
2. Use AI assistance where helpful
3. Document your debugging process

### Deliverables
- Fixed code with commits for each bug
- Debugging journal (how you found each bug)
- AI interaction log
- Brief security analysis

### Evaluation Criteria
- Bug identification accuracy
- Debugging methodology
- AI tool effectiveness
- Security awareness
```

### Live Coding Session (2 години, on-site або remote)

#### Structure

| Phase | Duration | Focus |
|-------|----------|-------|
| 1. Setup | 15 min | Environment check, introductions |
| 2. Bug Fix | 30 min | Debug a failing test |
| 3. Feature | 45 min | Implement a small feature with AI |
| 4. Review | 15 min | Code review of provided PR |
| 5. Q&A | 15 min | Candidate questions |

#### Evaluation Form

```
Candidate: _____________  Date: _____________

Bug Fix (30 points)
[ ] Found root cause (10)
[ ] Fix is correct (10)
[ ] Used appropriate tools (5)
[ ] Explained approach (5)

Feature Implementation (40 points)
[ ] Feature works correctly (15)
[ ] Code quality (10)
[ ] Effective AI use (10)
[ ] Testing (5)

Code Review (20 points)
[ ] Identified issues (10)
[ ] Constructive feedback (5)
[ ] Clear communication (5)

Communication (10 points)
[ ] Explains thinking (5)
[ ] Asks clarifying questions (5)

Total: ___/100

Notes:
_________________________
```

---

## Критерії відбору

### Must-Have Criteria

| Criterion | How to Assess |
|-----------|---------------|
| **Technical competence** | Coding test score ≥ 70/100 |
| **AI tool awareness** | Can describe verification strategies |
| **Written communication** | Clear take-home documentation |
| **CLI proficiency** | Comfortable in terminal during live coding |
| **Growth mindset** | Shows curiosity, asks good questions |

### Nice-to-Have Criteria

| Criterion | How to Assess |
|-----------|---------------|
| **Open source contributions** | GitHub profile review |
| **AI tool experience** | Specific projects using AI |
| **Automation mindset** | Examples of workflow automation |
| **Security awareness** | Mentions security in solutions |

### Scoring Matrix

```
HIRE DECISION MATRIX

Technical Score: ___/100
Behavioral Score: ___/100
Culture Fit: ___/10

Total Weighted Score: Technical (50%) + Behavioral (30%) + Culture (20%)

< 60: No Hire
60-70: Maybe (discuss with team)
70-85: Hire (standard offer)
> 85: Strong Hire (consider signing bonus)
```

---

## Процес онбордингу

### Day 1: Environment Setup

```
09:00 - Welcome, team introductions
10:00 - Laptop setup, access provisioning
11:00 - ACFS installation on personal VPS
12:00 - Lunch with team
13:00 - Tool walkthrough:
        - Claude Code basics
        - NTM session management
        - Agent Mail registration
15:00 - First simple task with buddy
17:00 - Day 1 check-in
```

### Week 1: Tool Familiarization

| Day | Focus | Goal |
|-----|-------|------|
| 1 | Setup | Environment ready |
| 2 | Claude Code | Complete 3 simple tasks |
| 3 | Safety tools | UBS scan, understand DCG |
| 4 | Coordination | Send/receive Agent Mail |
| 5 | Review | Week retrospective |

### Week 2: Guided Practice

| Day | Focus | Goal |
|-----|-------|------|
| 1 | Bug fix | Fix real bug with AI |
| 2 | Feature | Small feature end-to-end |
| 3 | Multi-agent | Coordinate with another agent |
| 4 | Code review | Review PR from team member |
| 5 | Planning | Plan next week independently |

### Week 3-4: Supervised Independence

- Work on real tasks with decreasing supervision
- Daily check-ins → every other day → weekly
- Full code review → spot checks → trust
- Simple tasks → medium complexity → full features

### Onboarding Checklist

```
ONBOARDING CHECKLIST

Week 1:
[ ] Laptop configured
[ ] All access provisioned (GitHub, Vercel, etc.)
[ ] VPS set up with ACFS
[ ] Claude Code working
[ ] NTM session created
[ ] Agent Mail registered
[ ] First commit merged

Week 2:
[ ] Bug fix completed independently
[ ] Feature shipped
[ ] Code review given
[ ] Agent Mail coordination done
[ ] Safety tools understood

Week 3-4:
[ ] Working independently on most tasks
[ ] Participating in team discussions
[ ] Contributing to documentation
[ ] Helping other new hires (if applicable)

Sign-off:
Manager: _____________  Date: _____________
Buddy: _____________   Date: _____________
New Hire: ___________  Date: _____________
```

### Buddy System

**Buddy responsibilities:**

1. Daily check-ins first week
2. Pair programming sessions
3. Answering questions
4. Reviewing first PRs
5. Introducing to team culture

**Buddy selection:**

| Good Buddy | Not Good Buddy |
|------------|----------------|
| Patient communicator | Too busy with critical work |
| 6+ months on team | New themselves |
| Good with tools | Still learning basics |
| Available for questions | Frequently in meetings |

---

## Red Flags та Green Flags

### Red Flags 🚩

| Observation | Why It's Concerning |
|-------------|---------------------|
| "AI is always right" | Lacks critical thinking |
| Never used CLI | Steep learning curve |
| "I don't need to test AI output" | Quality issues incoming |
| Resistant to learning new tools | Won't adapt to ecosystem |
| Poor written communication | Agent coordination will suffer |
| "Security is someone else's job" | Safety culture mismatch |
| Can't explain their code | Doesn't understand AI output |
| Defensive about feedback | Won't improve |

### Green Flags ✅

| Observation | Why It's Positive |
|-------------|-------------------|
| "I always verify AI output" | Quality-minded |
| Asks clarifying questions | Thorough thinker |
| Excited about tooling | Will contribute to ecosystem |
| Documents their work | Good practices |
| Mentions edge cases | Thorough testing mindset |
| Security-conscious | Fits safety culture |
| Admits when stuck | Good collaboration |
| Gives constructive feedback | Team player |

---

## Quick Reference Cards

### For Recruiters: Screening Questions

```
QUICK SCREENING CHECKLIST

1. Do they have hands-on AI coding tool experience?
   [ ] Yes (proceed)  [ ] No but interested (maybe)  [ ] Not interested (pass)

2. Are they comfortable with command line?
   [ ] Daily user (proceed)  [ ] Occasional (maybe)  [ ] Never (pass)

3. Can they describe how they verify AI output?
   [ ] Clear strategy (proceed)  [ ] Vague (maybe)  [ ] "I trust it" (pass)

4. Are they excited about the role?
   [ ] Enthusiastic (proceed)  [ ] Neutral (maybe)  [ ] Not really (pass)

If 3+ "proceed": Move to technical interview
If 2+ "pass": Politely decline
Otherwise: Discuss with hiring manager
```

### For Interviewers: Evaluation Summary

```
INTERVIEW EVALUATION SUMMARY

Candidate: _____________
Position: _____________
Date: _____________

Technical Skills: ___/5
AI Tool Proficiency: ___/5
Communication: ___/5
Problem Solving: ___/5
Culture Fit: ___/5

Overall: ___/25

Recommendation:
[ ] Strong Hire
[ ] Hire
[ ] Maybe
[ ] No Hire

Key Strengths:
1. _____________
2. _____________

Areas for Development:
1. _____________
2. _____________

Interviewer: _____________
```

---

## Наступні кроки

- Повернутися до [README](./README.md)
- Переглянути [Вимоги до кандидатів](./05-candidate-requirements.md)
- Дивитися [Робочі процеси](./04-workflows.md)

---

*Версія: 1.0.0*
*Останнє оновлення: 2026-02*
