# Using AI Agent Workflow

This guide details how to use the **AI Agent Workflow** with your existing AI coding tools.

## The Core Concept

The `ai-agent-workflow` package installs "Laws" (agent rules) and "Configuration" into your repository. This forces your AI tools to behave like a team of specialists with defined roles and workflows.

---

## Checkpoint-Based Workflow

**Critical Feature:** The workflow enforces strict checkpoints between agents.

### How It Works

1. **One agent at a time** - Each agent completes their task independently
2. **Checkpoint after each agent** - Shows summary and waits for you
3. **You control progression** - Say "continue" to proceed or give feedback to redo

### Example Flow

```
You: "Add a user authentication feature"

🎯 Orchestrator: "No plan exists. INVOKE Feature Planner"

---
✅ Feature Planner - Complete

What was done:
- Created implementation_plan.md
- Defined 3 new files and 2 modifications

Next step: Frontend React Agent

Options:
- Say "continue" → start implementation
- Say "revise" → update the plan
---

You: "continue"

[Frontend React Agent implements the feature]

---
✅ Frontend React Agent - Complete

What was done:
- Created LoginForm.tsx, AuthContext.tsx
- Modified App.tsx

Next step: Review Agent

Options:
- Say "continue" → proceed to review
- Say "redo" → revise implementation
---

You: "continue"

[And so on through Review → Docs → Git...]
```

### Commands

| You Say | What Happens |
|---------|--------------|
| "continue" / "next" | Proceed to next agent |
| "redo" / feedback | Redo current agent's work |
| "stop" / "pause" | Halt the workflow |
| "skip" | Skip optional agent |
| "back" | Return to previous agent |

### Checkpoints Work Across All Tools

The checkpoint enforcement is configured for:

**Cursor** - via `.cursorrules` file
**Gemini CLI** - via `.gemini/system.md` with enforcement header
**OpenCode** - via `.opencode/opencode.json` instructions + `WORKFLOW_RULES.md`

All three tools will:
1. Show the same checkpoint format
2. Wait for your "continue" command
3. Allow "redo" with feedback
4. Support "stop" to pause

---

## Workflow Types

### Standard Workflow
**Best for:** Regular feature development

**Flow:**
```
Orchestrator → Feature Planner → Developer → Reviewer → Done
```

**How it works:**
1. Orchestrator ensures you have a plan before coding
2. Feature Planner creates `implementation_plan.md`
3. Developer implements based on the plan
4. Reviewer checks quality and asks for approval

### Full Pipeline Workflow
**Best for:** Production-grade development with full checks

**Flow:**
```
Orchestrator → Planner → Developer → Tester → Reviewer → Documentation → Git Agent → Done
```

**How it works:**
1. Orchestrator manages the entire flow
2. Feature Planner creates the implementation plan
3. Developer implements the feature
4. QA Agent writes and runs tests
5. Reviewer checks quality
6. Documentation Agent updates docs
7. Git Agent proposes a commit

### Minimal Workflow
**Best for:** Quick fixes and hotfixes

**Flow:**
```
Developer → Reviewer → Done
```

**How it works:**
1. Start coding directly (no planning phase)
2. Reviewer checks your changes
3. Done when approved

---

## Tool-Specific Usage

### Workflow with Gemini CLI

Since the setup configured `.gemini/system.md`, the native `gemini` command now acts as the **System Orchestrator**.

#### 1. Start a Task
```bash
gemini "I need to add a dark mode toggle"
```

#### 2. The Native Loop
The Orchestrator will reply:
- It will **instruct** you to Invoke the Feature Planner
- **You** must simply copy/paste or type the command it gives you

*Example:*
> **Orchestrator**: "State: Unplanned. Command: INVOKE Feature Planner"
> **You**: `gemini "INVOKE Feature Planner"`

This manual loop keeps you in full control while enforcing the process.

### Workflow with Cursor IDE

Since the setup installed `.cursor/rules/*.md`:

1. Open **Cursor**
2. Open **Composer** (Cmd+I or Cmd+L)
3. Type: `"Plan a dark mode toggle"`
4. The **Feature Planner** rule will trigger (or explicitly mention `@Feature Planner`)
5. Follow the prompts from the agent

### Workflow with OpenCode CLI

After setup configures `.opencode/agents/`:

#### 1. Start a Task
```bash
opencode "I need to add a dark mode toggle"
```

#### 2. Follow the Workflow
OpenCode reads agents from `.opencode/agents/` and follows the configured workflow based on your setup.

---

## Available Agents

### Universal Agents (All Workflows)

| Agent | Purpose | When Used |
|-------|---------|-----------|
| **System Orchestrator** | Enforces the workflow loop | Always active (Standard/Full) |
| **Feature Planner** | Creates implementation plans | Start of every feature (Standard/Full) |
| **Review Agent** | Code quality reviews | After implementation |

### Full Pipeline Agents

| Agent | Purpose | When Used |
|-------|---------|-----------|
| **QA Agent** | Writes and reviews tests | After implementation |
| **Documentation Agent** | Updates documentation | After review approval |
| **Git Agent** | Proposes commits | Final step before done |

### Role-Specific Agents

| Role | Agents |
|------|--------|
| Frontend | React/Vue/Angular/Next.js Agent + UI/CSS Expert |
| Backend | Node/Flask/Django/FastAPI Agent |
| Mobile | Flutter Agent |
| DevOps | Terraform Agent |

---

## Git Agent (Full Pipeline)

After review approval, the Git Agent handles version control.

### What It Does
1. Summarizes all changes made during the session
2. Proposes a conventional commit message
3. Shows files to be staged
4. Waits for your confirmation before committing

### Example Interaction

```
### Proposed Commit

**Type**: feat
**Scope**: ui
**Message**: add dark mode toggle with system preference detection

### Files to Stage
- src/components/ThemeToggle.tsx (new)
- src/hooks/useTheme.ts (new)
- src/styles/dark-mode.css (new)
- src/App.tsx (modified)

### Commit Command Preview
git add src/components/ThemeToggle.tsx src/hooks/useTheme.ts src/styles/dark-mode.css src/App.tsx
git commit -m "feat(ui): add dark mode toggle with system preference detection"

---

**Ready to commit? (y/n)**
```

### Conventional Commit Types
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation changes
- `style` - Formatting changes
- `test` - Adding/updating tests
- `chore` - Build/config changes

---

## Enhancing with Skills

### Vercel React Best Practices

Install 40+ React performance rules:

```bash
npx add-skill vercel-labs/agent-skills
```

**What's included:**
- Critical: Eliminating async waterfalls, reducing bundle size
- High priority: Server-side performance, data fetching
- Medium priority: Re-render optimization, rendering performance

### Skills Installation Locations

After installation, skills are placed in agent-specific directories:
- **Cursor**: `.cursor/skills/`
- **OpenCode**: `.opencode/skills/`
- **Claude Code**: `~/.claude/skills/`

### Available Options

```bash
# List available skills
npx add-skill vercel-labs/agent-skills --list

# Install specific skill
npx add-skill vercel-labs/agent-skills --skill react-best-practices

# Global install for specific agent
npx add-skill vercel-labs/agent-skills -g -a cursor -y
```

---

## Using Additional Agents

If you added extra agents during setup (like a backend developer adding UI/CSS Expert), you can invoke them explicitly:

### In Cursor
```
@UI CSS Expert Agent - Help me style this component with Tailwind
```

### In Gemini CLI
```bash
gemini "INVOKE UI CSS Expert Agent to review my CSS"
```

### In OpenCode
```bash
opencode "Use the UI/CSS Expert to create a responsive navbar"
```

### Common Use Cases

| Your Role | Additional Agent | Use For |
|-----------|-----------------|---------|
| Backend | UI/CSS Expert | Admin dashboards, API documentation styling |
| Frontend | Database MongoDB | Data modeling, query optimization |
| DevOps | Documentation Agent | Infrastructure docs, runbooks |
| Mobile | QA Agent | Test coverage for mobile apps |

---

## Custom Agents

Don't see your stack? **Create your own agent!**

See the comprehensive guide: [`docs/CREATE_CUSTOM_AGENT.md`](docs/CREATE_CUSTOM_AGENT.md)

**Popular Custom Agent Ideas:**
- Backend Django/Rails agent
- Frontend Svelte agent
- DevOps Kubernetes/Ansible agent
- Data Engineer dbt/Airflow agent
- IT Admin Bash/PowerShell agent

---

## Cleaning Up

If you want to remove the agent configuration from your repository:

```bash
./cleanup.sh
```

This removes:
- `.cursor/rules/` (Cursor agents)
- `.opencode/` (OpenCode config)
- `.gemini/` (Gemini CLI config)
- `GEMINI_GUIDE.md` (Project guide)
