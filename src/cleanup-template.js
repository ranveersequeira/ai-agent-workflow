export function generateCleanupScript(tools = ['cursor', 'gemini']) {
    const cursorCleanup = tools.includes('cursor') ? `
# Remove Cursor Rules
if [ -d ".cursor/rules" ]; then
    rm -rf .cursor/rules/*.md
    # Only remove dir if empty
    rmdir .cursor/rules 2>/dev/null || true
    rmdir .cursor 2>/dev/null || true
    echo "   Removed agent rules from .cursor/rules/"
fi

# Clean .cursorrules (Partial removal is hard, we warn)
if [ -f ".cursorrules" ]; then
    echo "   NOTE: Please manually check .cursorrules for residual comments."
fi
` : '';

    const opencodeCleanup = tools.includes('opencode') ? `
# Remove OpenCode Configuration
if [ -d ".opencode" ]; then
    rm -rf .opencode
    echo "   Removed .opencode/ configuration (agents, config, workflow rules)"
fi
` : '';

    const geminiCleanup = tools.includes('gemini') ? `
# Remove Gemini Configuration
if [ -d ".gemini" ]; then
    rm -rf .gemini
    echo "   Removed .gemini/ configuration"
fi
` : '';

    return `#!/bin/bash
# cleanup.sh - Remove AI Agent Workflow configuration

echo "🧹 Cleaning up AI Agent Workflow..."
${cursorCleanup}${opencodeCleanup}${geminiCleanup}
# Remove Project Guide
if [ -f "GEMINI_GUIDE.md" ]; then
    rm GEMINI_GUIDE.md
    echo "   Removed GEMINI_GUIDE.md"
fi

# Remove agent script (if it exists)
if [ -f "agent" ]; then
    rm agent
    echo "   Removed ./agent script"
fi

echo "✨ Cleanup complete. Your repo is back to normal."
rm cleanup.sh
`;
}
