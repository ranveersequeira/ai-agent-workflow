# Using AI Agent Workflow

This guide details how to use the **AI Agent Workflow** directly with your existing tools.

## The Core Concept
The `ai-agent-workflow` package installs a "Law" (Cursor Rules) and "Configuration" (Gemini System Prompt) into your repository. This forces your AI tools to behave like a team of specialists.

## Workflow with Gemini CLI

Since the setup configured `.gemini/system.md`, the native `gemini` command now acts as the **System Orchestrator**.

### 1. Start a Task
Run the standard CLI command:

```bash
gemini "I need to add a dark mode toggle"
```

### 2. The Native Loop
The Orchestrator will reply.
-   It will **instruct** you to Invoke the Feature Planner.
-   **You** must simply copy/paste or type the command it gives you.

*Example:*
> **Orchestrator**: "State: Unplanned. Command: INVOKE Feature Planner"
> **You**: `gemini "INVOKE Feature Planner"`

This manual loop (Model -> specific command -> You run command -> Model) keeps you in full control while enforcing the process.

## Available Agents (Role-Based)

The workflow includes specialized agents based on your role:

### Standard Agents (All Roles)
- **System Orchestrator**: Enforces the workflow loop
- **Feature Planner**: Creates implementation plans
- **QA Agent**: Writes and reviews tests
- **Review Agent**: Code quality reviews
- **Documentation Agent**: Updates documentation

### Role-Specific Agents
- **Backend Node Agent**: Node.js/Express APIs
- **Backend Flask Agent**: Python Flask APIs
- **Frontend React Agent**: React applications
- **Mobile Flutter Agent**: Cross-platform mobile apps
- **DevOps Terraform Agent**: Infrastructure as Code
- **Database MongoDB Agent**: MongoDB operations

### Custom Agents

Don't see your stack? **Create your own agent!**

See the comprehensive guide: [`docs/CREATE_CUSTOM_AGENT.md`](docs/CREATE_CUSTOM_AGENT.md)

**Example Use Cases:**
- Backend Django agent for Python/Django projects
- Frontend Vue agent for Vue.js applications
- DevOps Ansible agent for configuration management
- Data Engineer DBT agent for data transformation
- IT Admin Bash agent for system scripting

The workflow is **stack-agnostic** — you can create agents for any technology you use.

## Workflow with Cursor IDE

Since the setup installed `.cursor/rules/*.md`:

1.  Open **Cursor**.
2.  Open **Composer** (Cmd+I or Cmd+L).
3.  Type: `"Plan a dark mode toggle"`.
4.  The **Feature Planner** rule will likely trigger (or you can explicitly mention `@Feature Planner`).
5.  Follow the prompts from the agent.

## Cleaning Up
If you want to remove the agent configuration from your repository:

```bash
./cleanup.sh
```
This removes `.cursor/rules`, `.gemini`, and `GEMINI_GUIDE.md`.
