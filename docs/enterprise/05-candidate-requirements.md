# Блок 5: Вимоги до кандидатів

## Зміст

- [Огляд ролей](#огляд-ролей)
- [Hard Skills](#hard-skills)
- [Soft Skills](#soft-skills)
- [Рівні експертизи](#рівні-експертизи)
- [Критерії оцінювання](#критерії-оцінювання)
- [Матриця компетенцій](#матриця-компетенцій)

---

## Огляд ролей

### Основні ролі в ACFS екосистемі

| Роль | Фокус | Ключові інструменти |
|------|-------|---------------------|
| **AI-Augmented Developer** | Розробка з AI-асистентами | Claude Code, Codex, NTM |
| **Agent Orchestrator** | Координація multi-agent workflows | Agent Mail, NTM, CASS |
| **Safety Engineer** | Безпека та якість коду | UBS, DCG, SLB, ast-grep |
| **Platform Engineer** | Інфраструктура та tooling | Docker, Tailscale, RCH |
| **DevOps/SRE** | Deployment та operations | Vercel, Supabase, Vault |

---

## Hard Skills

### Категорія 1: Core Programming

| Skill | Junior | Middle | Senior |
|-------|--------|--------|--------|
| **JavaScript/TypeScript** | Базовий синтаксис, DOM | Async/await, generics, testing | Architecture, performance optimization |
| **Python** | Scripting, basic OOP | Async, decorators, typing | System design, C extensions |
| **Rust** | Ownership, borrowing basics | Lifetimes, traits, error handling | Unsafe, macros, performance |
| **Go** | Goroutines, channels basics | Interfaces, testing, profiling | Concurrency patterns, internals |
| **SQL** | CRUD operations | Joins, indexes, transactions | Query optimization, partitioning |

### Категорія 2: AI/LLM Tools

| Skill | Junior | Middle | Senior |
|-------|--------|--------|--------|
| **Prompt Engineering** | Basic prompts, simple tasks | Context management, chain of thought | System prompts, few-shot, fine-tuning |
| **Claude Code** | Basic commands, file editing | MCP servers, skills, workflows | Custom tooling, integration |
| **Multi-Agent Coordination** | Following agent instructions | Designing agent workflows | Orchestrating complex multi-agent systems |
| **LLM Limitations** | Awareness of hallucinations | Verification strategies | Mitigation patterns, fallbacks |

### Категорія 3: CLI & Unix

| Skill | Junior | Middle | Senior |
|-------|--------|--------|--------|
| **Shell Scripting** | Basic commands | Scripting, pipes, process management | Advanced bash, zsh customization |
| **tmux** | Basic navigation | Sessions, windows, panes | Scripting, plugins, automation |
| **Git** | Add, commit, push, pull | Branching, merging, rebasing | Reflog, bisect, hooks, internals |
| **Modern CLI Tools** | Usage of rg, fd, fzf | Integration in workflows | Customization, scripting |

### Категорія 4: DevOps & Infrastructure

| Skill | Junior | Middle | Senior |
|-------|--------|--------|--------|
| **Docker** | Run containers | Compose, networking, volumes | Multi-stage builds, optimization |
| **CI/CD** | Understanding pipelines | Writing pipelines, testing | Design patterns, optimization |
| **Cloud Platforms** | Basic deployment | Service configuration | Architecture, cost optimization |
| **Networking** | TCP/IP basics | VPN, DNS, load balancing | Security, troubleshooting |

### Категорія 5: Security

| Skill | Junior | Middle | Senior |
|-------|--------|--------|--------|
| **OWASP Top 10** | Awareness | Detection, prevention | Threat modeling, architecture |
| **Authentication** | Using auth libraries | OAuth, JWT implementation | Zero-trust, SSO design |
| **Static Analysis** | Running scanners | Interpreting results, fixing | Custom rules, integration |
| **Secrets Management** | .env files | Vault basics | Rotation, audit, compliance |

---

## Soft Skills

### Категорія 1: Communication

| Skill | Опис | Важливість |
|-------|------|------------|
| **Technical Writing** | Документація, ADRs, specs | ★★★★★ |
| **Async Communication** | Agent Mail, Slack, email | ★★★★★ |
| **Code Review Feedback** | Конструктивний feedback | ★★★★☆ |
| **Incident Communication** | Clear status updates | ★★★★☆ |
| **Cross-team Collaboration** | Робота з різними командами | ★★★☆☆ |

### Категорія 2: Problem Solving

| Skill | Опис | Важливість |
|-------|------|------------|
| **Debugging** | Systematic issue isolation | ★★★★★ |
| **Research** | Finding solutions efficiently | ★★★★★ |
| **Pattern Recognition** | Identifying recurring issues | ★★★★☆ |
| **Root Cause Analysis** | Going beyond symptoms | ★★★★☆ |
| **Trade-off Evaluation** | Weighing options objectively | ★★★☆☆ |

### Категорія 3: AI Collaboration

| Skill | Опис | Важливість |
|-------|------|------------|
| **AI Output Verification** | Not blindly trusting AI | ★★★★★ |
| **Context Provision** | Giving AI good context | ★★★★★ |
| **Iterative Refinement** | Improving AI outputs | ★★★★☆ |
| **Knowing When to Stop** | Manual vs AI trade-off | ★★★★☆ |
| **Feedback Loop** | Learning from AI interactions | ★★★☆☆ |

### Категорія 4: Self-Management

| Skill | Опис | Важливість |
|-------|------|------------|
| **Task Prioritization** | Using bv, focusing on impact | ★★★★★ |
| **Time Management** | Efficient work sessions | ★★★★☆ |
| **Continuous Learning** | Keeping up with tools | ★★★★☆ |
| **Documentation Habit** | Recording decisions | ★★★☆☆ |
| **Work-Life Balance** | Sustainable productivity | ★★★☆☆ |

---

## Рівні експертизи

### Junior (0-2 роки досвіду)

#### Очікування

- Виконує чітко визначені завдання
- Потребує code review для всіх змін
- Вчиться використовувати інструменти
- Запитує допомогу коли застряг

#### Типові задачі

- Bug fixes з чітким reproduction
- Small features з готовими specs
- Documentation updates
- Test coverage improvement

#### Підтримка

- Daily check-ins
- Pair programming sessions
- Detailed task descriptions
- Dedicated mentor

#### Критерії готовності до Middle

- [ ] Самостійно вирішує типові баги
- [ ] Ефективно використовує AI-асистентів
- [ ] Code review проходить з мінімальними правками
- [ ] Документує свої рішення
- [ ] Допомагає іншим junior розробникам

### Middle (2-5 років досвіду)

#### Очікування

- Самостійно виконує features
- Проводить code review для juniors
- Пропонує покращення processes
- Mentoring нових членів команди

#### Типові задачі

- Feature development end-to-end
- Architecture для невеликих систем
- Multi-agent workflow design
- Performance optimization

#### Підтримка

- Weekly 1:1s
- Design review для великих змін
- Доступ до senior для консультацій

#### Критерії готовності до Senior

- [ ] Designs scalable solutions
- [ ] Orchestrates multi-agent workflows
- [ ] Leads technical initiatives
- [ ] Mentors multiple juniors effectively
- [ ] Contributes to tooling improvements

### Senior (5+ років досвіду)

#### Очікування

- Architectural decisions
- Cross-team technical leadership
- Tool ecosystem development
- Incident response leadership

#### Типові задачі

- System architecture design
- Critical infrastructure components
- Process optimization
- Technical strategy

#### Підтримка

- Monthly strategy discussions
- Budget for tooling experiments
- Conference participation
- Industry networking

---

## Критерії оцінювання

### Technical Assessment

#### Coding Test (2-3 години)

**Структура:**

| Етап | Тривалість | Фокус |
|------|------------|-------|
| 1. Bug Fix | 30 хв | Debug skills, code reading |
| 2. Feature Implementation | 1 год | Design, implementation, testing |
| 3. AI-Assisted Task | 45 хв | Claude Code usage, verification |
| 4. Code Review | 30 хв | Review skills, communication |

**Критерії оцінки:**

| Критерій | Вага | Опис |
|----------|------|------|
| **Correctness** | 25% | Code works as expected |
| **Code Quality** | 20% | Readable, maintainable, testable |
| **AI Collaboration** | 20% | Effective use of AI tools |
| **Problem Solving** | 20% | Approach, debugging, research |
| **Communication** | 15% | Explanation of decisions |

### AI Tool Proficiency Assessment

#### Scenarios:

**Scenario 1: Basic Claude Code Usage**
```
Task: Use Claude Code to implement a simple API endpoint
Evaluate:
- Prompt quality
- Output verification
- Iteration on AI output
```

**Scenario 2: Multi-Agent Coordination**
```
Task: Coordinate two agents to complete a feature
Evaluate:
- Task breakdown
- Agent Mail usage
- Conflict resolution
```

**Scenario 3: Safety-First Development**
```
Task: Implement feature with security considerations
Evaluate:
- UBS usage
- DCG awareness
- Security patterns
```

### Behavioral Assessment

| Competency | Junior | Middle | Senior |
|------------|--------|--------|--------|
| **Ownership** | Takes responsibility for assigned tasks | Owns features end-to-end | Owns systems and processes |
| **Collaboration** | Participates in team activities | Facilitates collaboration | Builds collaborative culture |
| **Learning** | Actively learns new tools | Shares knowledge | Drives learning initiatives |
| **Impact** | Completes tasks on time | Delivers features that matter | Shapes technical direction |

---

## Матриця компетенцій

### AI-Augmented Developer

```
┌────────────────────────────────────────────────────────────────┐
│                   COMPETENCY MATRIX                            │
├────────────────────────────────────────────────────────────────┤
│                          SENIOR                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ • Custom AI tooling development                          │ │
│  │ • Multi-agent system architecture                        │ │
│  │ • LLM fine-tuning and optimization                       │ │
│  │ • Safety-critical system design                          │ │
│  └──────────────────────────────────────────────────────────┘ │
│                          MIDDLE                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ • Complex feature development with AI                    │ │
│  │ • Multi-agent workflow orchestration                     │ │
│  │ • Code review with AI assistance                         │ │
│  │ • Integration testing and debugging                      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                          JUNIOR                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ • Basic Claude Code proficiency                          │ │
│  │ • Simple task completion with AI                         │ │
│  │ • Following established workflows                        │ │
│  │ • Learning tool ecosystem                                │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### Skill Requirements by Role

| Skill Area | AI Developer | Orchestrator | Safety Eng | Platform Eng |
|------------|--------------|--------------|------------|--------------|
| Claude Code | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ |
| Agent Mail | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★☆☆☆ |
| NTM | ★★★★☆ | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| UBS/DCG/SLB | ★★★☆☆ | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| Docker | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★★★ |
| Tailscale/VPN | ★★☆☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★★★ |
| beads_rust | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★☆☆☆ |
| RCH | ★★☆☆☆ | ★★☆☆☆ | ★☆☆☆☆ | ★★★★★ |

---

## Checklist для самооцінки

### Junior → Middle Transition

```
[ ] Можу самостійно debug complex issues
[ ] Ефективно використовую Claude Code для більшості задач
[ ] Пишу чистий, testable код
[ ] Проводжу корисні code reviews
[ ] Документую свої рішення
[ ] Допомагаю іншим junior розробникам
[ ] Розумію архітектуру проекту
[ ] Вмію координувати з іншими агентами (Agent Mail)
```

### Middle → Senior Transition

```
[ ] Проектую scalable системи
[ ] Оркеструю складні multi-agent workflows
[ ] Веду технічні ініціативи
[ ] Менторю кількох developers
[ ] Вношу покращення в tooling
[ ] Приймаю архітектурні рішення
[ ] Веду incident response
[ ] Впливаю на технічну стратегію команди
```

---

## Наступні кроки

- **Гайд для HR:** [Блок 6](./06-hr-guide.md)
- **Робочі процеси:** [Блок 4](./04-workflows.md)

---

*Див. також: [Workflows](./04-workflows.md) | [README](./README.md)*
