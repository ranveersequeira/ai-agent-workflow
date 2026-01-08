# AI Agent Workflow - Setup Guide

## Prerequisites

1.  **Node.js**: v18 or higher.
2.  **Tooling**:
    -   **Gemini Chat CLI**: (`npm install -g gemini-chat-cli`)
    -   OR **Cursor IDE**.

## Installation

### 1. Go to your Project
```bash
cd ~/Projects/my-awesome-app
```

### 2. Run the Setup Tool
```bash
npx ai-agent-workflow
```

### 3. What Gets Installed?
The tool injects configuration files directly into your repository:

-   `GEMINI_GUIDE.md`: Project-specific coding standards.
-   `.cursor/rules/*.md`: The definitions for all agents.
-   `.cursorrules`: Instructions for the IDE to use the rules.
-   `.gemini/system.md`: Instructions for the CLI to use the Orchestrator.
-   `cleanup.sh`: A script to easily remove all of the above.

### 4. Configure .gitignore (Recommended)

To avoid committing the generated configuration files to your repository, add the following entries to your `.gitignore` file:

```gitignore
# AI Agent Workflow - Generated files
cleanup.sh
.cursorrules
.gemini/
.cursor/
```

**Note**: Since these files are generated automatically by the setup tool, they should typically not be committed. Each developer should run the setup tool in their local environment.

## Verifying Installation

**CLI Verification**:
Run `gemini "Hello"`. It should reply as the **System Orchestrator**.

**Cursor Verification**:
Open a file and look for the agent specific rules in the context window or try invoking `@Feature Planner`.

## Removal
To uninstall:
```bash
./cleanup.sh
```
