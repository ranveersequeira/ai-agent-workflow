export function generateCleanupScript() {
    return `#!/bin/bash
# cleanup.sh - Remove Gemini Agents configuration

echo "🧹 Cleaning up Gemini Agents..."

# 1. Remove Rules
if [ -d ".cursor/rules" ]; then
    rm -rf .cursor/rules/*.md
    # Only remove dir if empty
    rmdir .cursor/rules 2>/dev/null || true
    echo "   Removed agent rules from .cursor/rules/"
fi

# 2. Remove Config
if [ -f "GEMINI_GUIDE.md" ]; then
    rm GEMINI_GUIDE.md
    echo "   Removed GEMINI_GUIDE.md"
fi

if [ -d ".gemini" ]; then
    rm -rf .gemini
    echo "   Removed .gemini/ configuration"
fi

# 3. Clean .cursorrules (Partial removal is hard, we warn or check)
# Ideally we only remove the block we added. 
# For safety, we will just print instruction.
echo "   NOTE: Please manually check .cursorrules for residual comments."

# 4. Remove this script and the runner (if it exists)
if [ -f "agent" ]; then
    rm agent
    echo "   Removed ./agent script"
fi

echo "✨ Cleanup complete. Your repo is back to normal."
rm cleanup.sh
`;
}
