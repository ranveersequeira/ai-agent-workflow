# AI Agent Best Practices & Governance

## 1. Philosophy: "Agents as Context"
Agents are specialized persona definitions that provide context, constraints, and expertise for specific domains (Backend, Frontend, QA, etc.). Instead of one generic AI, we dynamically load the "Brain" needed for the current task.

## 2. Naming Conventions

### File Naming
Use **kebab-case** with a suffix to clearly identify the file type.
- **Format**: `[domain]-[role].md`
- **Examples**:
    - `backend-node-agent.md`
    - `frontend-react-agent.md`
    - `qa-testing-agent.md`

*Note: The `-agent.md` suffix helps human developers and AI tools distinguish these from regular documentation.*

### Agent Naming (Inside the file)
Use a specific "Identity" header.
- **Format**: `GLOBAL AGENT: [Agent Name]`

## 3. Markdown File Structure
Every agent file should follow this standard template to ensure consistent behavior.

```markdown
# GLOBAL AGENT: [Agent Name]

## Identity
You are an expert [Role] specializing in [Tech Stack].

## Triggers
Activate this agent when:
- The user asks about [Topic]
- Users are modifying files in `[Directory]`

## Context
- **Tech Stack**: [List]
- **Architecture**: [Brief Description]

## Rules (The "Law")
- [Rule 1: e.g., Always use TypeScript]
- [Rule 2: e.g., Never leave comments TODO]
- [Rule 3: e.g., Return JSON only]

## Workflow
1. [Step 1]
2. [Step 2]
```

## 4. Directory Structure
Store these agents in a dedicated hidden directory to keep the root clean but accessible.

**Recommended Path**: `.ai/agents/` or `.cursor/rules/`

```
my-project/
├── .cursor/
│   ├── rules/
│   │   ├── backend-node-agent.md
│   │   ├── frontend-react-agent.md
│   │   └── system-orchestrator.md
│   └── .cursorrules  <-- Master file that imports these
```

## 5. Repository Profiles ("The Law of the Land")

While Agents define "Who" does the work, **Profiles** define "What" work is allowed in a specific repository.

### File Naming
- **Layout**: `repo-guide.md` or `GEMINI_GUIDE.md` (placed in repo root)
- **Purpose**: Defines technical constraints, allowed agents, and mandatory workflows.

### Structure
```markdown
# Repository Guide: [Repo Name]

## Scope
- What belongs here? (e.g. UI code)
- What is forbidden? (e.g. DB schema)

## Allowed Agents
- [ ] Frontend Agent
- [x] Backend Agent

## Mandatory Workflow
1. Plan
2. Implement
3. Verify
```

## 6. Enforcement Strategy ("The Local Link")

To enforce these rules across all local repos, we use the **Gemini Agents CLI**:

1.  **Central Truth**: This repository (`gemini-agents-cli`) contains the master definitions.
2.  **Install via Script**: Use the included `install.sh` to sync agents into your active projects.
    ```bash
    ./install.sh /path/to/my-project [profile-name]
    ```
3.  **Master Prompt**: The script automatically manages `.cursorrules` to instruct the AI to read these files.
