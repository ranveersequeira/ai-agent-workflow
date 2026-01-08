#!/bin/bash

# Pre-Publish Checklist Script
# Run this before publishing to npm

echo "🔍 AI Agent Workflow - Pre-Publish Checklist"
echo "=============================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
passed=0
failed=0

# Function to check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((passed++))
    else
        echo -e "${RED}✗${NC} $1"
        ((failed++))
    fi
}

# 1. Check Node version
echo "📦 Checking Node.js version..."
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -ge 18 ]; then
    echo -e "${GREEN}✓${NC} Node.js >= 18 (current: $(node -v))"
    ((passed++))
else
    echo -e "${RED}✗${NC} Node.js >= 18 required (current: $(node -v))"
    ((failed++))
fi

# 2. Check package.json exists
echo ""
echo "📄 Checking required files..."
test -f package.json
check "package.json exists"

test -f README.md
check "README.md exists"

test -f LICENSE
check "LICENSE exists"

test -f SETUP.md
check "SETUP.md exists"

test -f USAGE.md
check "USAGE.md exists"

test -f .npmignore
check ".npmignore exists"

# 3. Check bin file
test -f bin/cli.js
check "bin/cli.js exists"

test -x bin/cli.js
check "bin/cli.js is executable"

# 4. Check agents directory
test -d agents
check "agents/ directory exists"

agent_count=$(ls -1 agents/*.md 2>/dev/null | wc -l)
if [ "$agent_count" -ge 15 ]; then
    echo -e "${GREEN}✓${NC} Found $agent_count agent files"
    ((passed++))
else
    echo -e "${RED}✗${NC} Expected at least 15 agents, found $agent_count"
    ((failed++))
fi

# 5. Check dependencies installed
echo ""
echo "📚 Checking dependencies..."
if [ -d node_modules ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
    ((passed++))
else
    echo -e "${RED}✗${NC} node_modules missing (run: pnpm install)"
    ((failed++))
fi

# 6. Test CLI
echo ""
echo "🧪 Testing CLI..."
if node bin/cli.js --version > /dev/null 2>&1; then
    version=$(node bin/cli.js --version)
    echo -e "${GREEN}✓${NC} CLI works (version: $version)"
    ((passed++))
else
    echo -e "${RED}✗${NC} CLI test failed"
    ((failed++))
fi

if node bin/cli.js --help > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} --help flag works"
    ((passed++))
else
    echo -e "${RED}✗${NC} --help flag failed"
    ((failed++))
fi

# 7. Check package.json fields
echo ""
echo "🔧 Checking package.json configuration..."

if grep -q '"author"' package.json; then
    if grep -q '"author": ""' package.json; then
        echo -e "${YELLOW}⚠${NC}  Author field is empty (update before publishing)"
    else
        echo -e "${GREEN}✓${NC} Author field set"
        ((passed++))
    fi
else
    echo -e "${RED}✗${NC} Author field missing"
    ((failed++))
fi

if grep -q '"repository"' package.json; then
    if grep -q 'yourusername' package.json; then
        echo -e "${YELLOW}⚠${NC}  Repository URL contains placeholder (update before publishing)"
    else
        echo -e "${GREEN}✓${NC} Repository URL set"
        ((passed++))
    fi
else
    echo -e "${RED}✗${NC} Repository field missing"
    ((failed++))
fi

if grep -q '"license": "MIT"' package.json; then
    echo -e "${GREEN}✓${NC} License is MIT"
    ((passed++))
else
    echo -e "${YELLOW}⚠${NC}  License might not be MIT"
fi

# 8. Check npm pack
echo ""
echo "📦 Testing package creation..."
if npm pack --dry-run > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} npm pack test passed"
    ((passed++))
else
    echo -e "${RED}✗${NC} npm pack test failed"
    ((failed++))
fi

# Summary
echo ""
echo "=============================================="
echo "📊 Summary"
echo "=============================================="
echo -e "Passed: ${GREEN}$passed${NC}"
echo -e "Failed: ${RED}$failed${NC}"
echo ""

if [ "$failed" -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! Ready to publish.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Update package.json author and repository fields if needed"
    echo "2. Run: npm login"
    echo "3. Run: npm publish --dry-run (to verify)"
    echo "4. Run: npm publish --access public"
    echo ""
    echo "See PUBLISHING.md for detailed instructions."
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Fix issues before publishing.${NC}"
    echo ""
    echo "See PUBLISHING.md for troubleshooting."
    exit 1
fi
