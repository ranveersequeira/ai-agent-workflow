# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-01-08

### 🎉 Major Release - Modern CLI & Role-Based Experience

This is a **major release** with breaking changes to the CLI interface and workflow.

### ✨ Added

#### New Agents (17 total)
- **FastAPI Agent** - High-performance async Python APIs
- **Next.js Agent** - Server-side rendering and App Router
- **Vue.js Agent** - Composition API and Pinia
- **Angular Agent** - Standalone components and RxJS
- **Django Agent** - Django REST Framework patterns
- **Flask Agent** - Blueprint patterns and SQLAlchemy
- **Terraform Agent** - Infrastructure as Code
- **Flutter Agent** - Cross-platform mobile development
- **UI/CSS Expert Agent** - Vanilla CSS, Tailwind, shadcn/ui

#### Modern CLI Experience
- **ASCII Art Banner** - Beautiful gradient-colored welcome screen
- **Boxen Borders** - Professional bordered messages
- **Ora Spinners** - Elegant loading indicators for each step
- **Gradient Colors** - Smooth color transitions throughout
- **Success Screens** - Celebratory completion messages
- **Progress Feedback** - Real-time step-by-step visual feedback

#### New Packages
- `figlet` - ASCII art text
- `boxen` - Beautiful terminal boxes
- `gradient-string` - Color gradients
- `ora` - Elegant spinners

#### Documentation
- Complete agent library documentation
- Custom agent creation guide
- Modern CLI experience guide
- Publishing guides (comprehensive & quick start)
- Setup flow documentation

### 🔄 Changed

#### **BREAKING CHANGES**

**CLI Flow Completely Redesigned:**

**v1.0.0 (Old):**
```
? Tech Stack: (js/python)
? Framework: [text input]
```

**v2.0.0 (New):**
```
? What do you build? (Use arrow keys)
  🎨 Frontend Developer
  ⚙️ Backend Developer
  📱 Mobile Developer
  🚀 DevOps Engineer
  🎨 UI/CSS Specialist
  🔧 Full-Stack

? Which stack/framework?
  React / Next.js / Vue.js / Angular
  Node.js / FastAPI / Flask / Django
  Flutter / React Native
  Terraform / Kubernetes
```

**Why This is Breaking:**
- Different prompts mean automation scripts will break
- Interactive flow has changed
- Now role-based instead of tech stack first
- New emoji-enhanced options

**Migration:**
If you have scripts using the old flow with `--yes` flag, they will still work but install all agents. Manual selection now uses the new role-based approach.

### 🎨 Improved

- **Output Clarity** - Removed verbose logging, cleaner console output
- **User Experience** - Professional, modern interface
- **Visual Hierarchy** - Better information organization
- **Error Messages** - Boxed, clear error displays
- **Success Messages** - Gradient-colored, boxed completion screens

### 📦 Dependencies

**New:**
- `boxen@^7.1.1`
- `figlet@^1.7.0`  
- `gradient-string@^2.0.2`
- `ora@^8.0.1`

**Updated:**
- `chalk@^5.3.0` → `^5.6.2`

### 🐛 Fixed

- Selective agent installation (only installs relevant agents for role)
- Better error handling in setup flow
- Auto-detection of dependencies improved

---

## [1.0.0] - 2026-01-XX

### Initial Release

- Basic CLI setup
- 8 initial agents
- Tech stack detection
- Simple prompt flow

---

## Migration Guide: v1.x to v2.0

### For Users

**No action required** - Just run the new command:

```bash
npx ai-agent-workflow@latest
```

You'll experience the new modern interface automatically.

### For Automated Scripts

If you're using `--yes` flag in CI/CD:

```bash
# Still works - installs all agents
npx ai-agent-workflow --yes
```

If you need specific role installation, update to new manual approach or request a feature for programmatic role selection.

### What's Different

| Aspect | v1.0 | v2.0 |
|--------|------|------|
| Prompts | Tech stack → Framework | Role → Stack |
| Agents | 8 agents | 17 agents |
| CLI | Basic text | ASCII art + gradients |
| Progress | Console logs | Spinners & checkmarks |
| Output | Verbose | Clean & minimal |

### Rollback

If you need the old version:

```bash
npx ai-agent-workflow@1.0.0
```

---

## Unreleased

### Planned Features
- Custom agent templates
- Interactive agent customization
- Multi-repo support
- Agent versioning

---

**Links:**
- [npm package](https://www.npmjs.com/package/ai-agent-workflow)
- [GitHub repository](https://github.com/ranveersequeira/ai-agent-workflow)
- [Documentation](https://github.com/ranveersequeira/ai-agent-workflow#readme)
