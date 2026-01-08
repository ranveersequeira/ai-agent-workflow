# Using the AI Agent Workflow Plugin

Once you have installed the plugin (see [README.md](README.md)), here is how to utilize the new workflow capabilities in your projects.

## 1. Setup Phase

The plugin's primary job is **Bootstrap**. It does not run permanently; it simply installs the "Brains" (Agents) into your project.

### Trigger Phrases
Use these prompts with Gemini or Claude to trigger the setup:

*   *"Initialize the AI agents for this repo."*
*   *"Setup a frontend react workflow."*
*   *"Add mobile flutter agents."*
*   *"Configure devops terraform roles."*

### Interactive vs Automatic
*   **Prompts**: If you don't specify a stack, the AI might ask you (or the tool defaults to interactive prompts if run directly, but the plugin tries to infer).
*   **Arguments**: You can be specific: *"Setup agent workflow for role=backend stack=django"*.

## 2. Development Phase

After the plugin runs, your project now contains `.cursor/rules` and `.gemini/system.md`.

### The "Loop"
The installed agents enforce a strict loop:

1.  **Orchestrator**: "I see you want a feature. Let's call the Planner."
2.  **Planner**: "Here is the `implementation_plan.md`."
3.  **User**: "Looks good. Implement Extension 1."
4.  **Developer Agent**: Writes the code.
5.  **Reviewer**: "I found a bug in line 42."

### In Gemini CLI
Since `.gemini/system.md` is present:
```bash
gemini "Implement the login feature based on the plan"
```
*The CLI will automatically adopt the Orchestrator persona.*

### In Claude Code / Cursor
Since `.cursor/rules` are present:
*   Use `@Feature Planner` to start a task.
*   Use `@Frontend Developer` to write code.
*   The system prompt references these rules to keep the context active.

## 3. Customization

You can modify the installed agents in `.cursor/rules/` at any time. The plugin just provides the starter templates.
