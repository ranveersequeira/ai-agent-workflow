# New Role-Based Setup Flow

## ✅ What Changed

The setup flow has been completely redesigned to use a **role-based approach** instead of asking for tech stack.

---

## 🎯 Old Flow (Before)

```
$ npx ai-agent-workflow

? Tech Stack: (Use arrow keys)
  js
  python

? Framework (e.g. react, django, nextjs): [input]
```

**Problems:**
- Too technical
- Confusing for non-experts
- Limited to js/python
- Didn't match documentation

---

## 🎉 New Flow (After)

```
$ npx ai-agent-workflow

🤖 Starting AI Agent Workflow Setup
Target: /path/to/your/project

? What do you build? (Use arrow keys)
❯ 🎨 Frontend Developer (React, Vue, Angular, Next.js)
  ⚙️  Backend Developer (Node.js, Flask, Django)
  📱 Mobile Developer (Flutter, React Native)
  🚀 DevOps Engineer (Terraform, Kubernetes)
  🎨 UI/CSS Specialist (Tailwind, shadcn/ui)
  🔧 Full-Stack (Install everything)
```

**After selecting a role, you choose your specific stack:**

### Example: Frontend Developer

```
? Which stack/framework? (Use arrow keys)
❯ React
  Next.js
  Vue.js
  Angular
  Other (Custom)
```

### Example: Backend Developer

```
? Which stack/framework? (Use arrow keys)
❯ Node.js (Express)
  Flask (Python)
  Django (Python)
  Other (Custom)
```

---

## 🎯 What Gets Installed

Based on your selection, **only relevant agents** are installed:

### Frontend Developer → React
✅ Universal Agents (5):
- system-orchestrator.md
- feature-planner.md
- qa-agent.md
- review-agent.md
- documentation-agent.md

✅ Role-Specific (1):
- frontend-react-agent.md

**Total: 6 agents**

---

### Frontend Developer → Next.js
✅ Universal Agents (5)
✅ Role-Specific (1):
- frontend-nextjs-agent.md

**Total: 6 agents**

---

### Backend Developer → Flask
✅ Universal Agents (5)
✅ Role-Specific (1):
- backend-flask-agent.md

**Total: 6 agents**

---

### Backend Developer → Django
✅ Universal Agents (5)
✅ Role-Specific (1):
- backend-django-agent.md

**Total: 6 agents**

---

### Full-Stack Developer
✅ **ALL 16 agents** installed:
- All universal agents
- All backend agents
- All frontend agents
- All mobile agents
- All DevOps agents
- All database agents
- All specialized agents

---

## 🔧 Technical Implementation

### Key Changes in `src/setup.js`

1. **New Role Selection:**
   ```javascript
   {
       type: 'list',
       name: 'role',
       message: 'What do you build?',
       choices: [
           { name: '🎨 Frontend Developer', value: 'frontend' },
           { name: '⚙️  Backend Developer', value: 'backend' },
           // ... more roles
       ]
   }
   ```

2. **Stack Selection Based on Role:**
   ```javascript
   function getStackChoicesForRole(role) {
       const stackMap = {
           frontend: ['React', 'Next.js', 'Vue.js', 'Angular'],
           backend: ['Node.js', 'Flask', 'Django'],
           // ... more mappings
       };
       return stackMap[role] || [];
   }
   ```

3. **Selective Agent Installation:**
   ```javascript
   function getAgentsForRole(role, stack) {
       const baseAgents = [
           'system-orchestrator.md',
           'feature-planner.md',
           // ... universal agents
       ];
       
       const roleSpecificAgents = getRoleSpecificAgents(role, stack);
       
       return [...baseAgents, ...roleSpecificAgents];
   }
   ```

---

## 🚀 Benefits

### 1. **User-Friendly**
- Ask "What do you build?" instead of technical jargon
- Clear, emoji-based options
- Intuitive for all skill levels

### 2. **Precise Agent Installation**
- Only install what you need
- No clutter from irrelevant agents
- Faster setup

### 3. **Extensible**
- Easy to add new roles
- Easy to add new stacks within roles
- Supports custom agents

### 4. **Matches Documentation**
- Aligns with README.md
- Consistent with SETUP.md
- Reflects actual agent library

---

## 📋 Role-to-Agent Mapping

| Role | Stack | Agents Installed |
|------|-------|-----------------|
| Frontend | React | Universal (5) + frontend-react-agent.md |
| Frontend | Next.js | Universal (5) + frontend-nextjs-agent.md |
| Frontend | Vue.js | Universal (5) + frontend-vue-agent.md |
| Frontend | Angular | Universal (5) + frontend-angular-agent.md |
| Backend | Node.js | Universal (5) + backend-node-agent.md + database-mongodb-agent.md |
| Backend | Flask | Universal (5) + backend-flask-agent.md |
| Backend | Django | Universal (5) + backend-django-agent.md |
| Mobile | Flutter | Universal (5) + mobile-flutter-agent.md |
| DevOps | Terraform | Universal (5) + devops-terraform-agent.md |
| UI | All | Universal (5) + ui-css-expert-agent.md |
| Full-Stack | All | ALL 16 agents |

---

## 🧪 Testing the New Flow

### Manual Test

```bash
# 1. Navigate to your project
cd ~/Projects/my-awesome-app

# 2. Run setup
npx ai-agent-workflow

# 3. Choose your role (e.g., Frontend Developer)
# 4. Choose your stack (e.g., Next.js)
# 5. Done! Only relevant agents are installed
```

### CI/CD Mode (Skip Prompts)

```bash
npx ai-agent-workflow --yes

# Uses defaults:
# - Role: Full-Stack
# - Installs: ALL agents
```

---

## 🎯 Next Steps

1. ✅ **Test the flow** with different role selections
2. ✅ **Verify agents** are installed correctly
3. ✅ **Check .cursorrules** includes the right agents
4. ✅ **Validate GEMINI_GUIDE.md** reflects the role and stack
5. 🔄 **Publish** to npm for users to try

---

## 🎉 Summary

The AI Agent Workflow now has a **truly role-based, stack-agnostic setup** that:
- Asks "What do you build?" (not "What's your tech stack?")
- Offers 6 clear role options with visual emojis
- Installs only relevant agents (6-16 agents depending on choice)
- Matches all the documentation we created
- Works seamlessly with all 16 agents in the library

**The implementation now matches the vision!** 🚀
