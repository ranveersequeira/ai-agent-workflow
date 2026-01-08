# Available Agents

This document lists all pre-built agents available in the AI Agent Workflow, organized by role.

---

## 🌐 Universal Agents

These agents work across all roles and tech stacks:

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| **System Orchestrator** | Enforces the workflow loop | Always active - manages the agent flow |
| **Feature Planner** | Creates implementation plans | Start of every new feature or task |
| **QA Agent** | Writes and reviews tests | After implementation, before review |
| **Review Agent** | Code quality and security review | Before merging code |
| **Documentation Agent** | Updates docs and comments | Final step of workflow |

---

## ⚙️ Backend Agents

### Backend Node.js Agent
**File:** `agents/backend-node-agent.md`  
**Tech Stack:** Node.js, Express, TypeScript  
**Best For:**
- RESTful API development
- Microservices architecture
- Real-time applications (WebSockets)
- Server-side JavaScript

### Backend Flask Agent
**File:** `agents/backend-flask-agent.md`  
**Tech Stack:** Python, Flask, SQLAlchemy  
**Best For:**
- Python web APIs
- Data-driven applications
- Machine learning API endpoints
- Rapid prototyping

### Backend FastAPI Agent
**File:** `agents/backend-fastapi-agent.md`  
**Tech Stack:** Python, FastAPI, Pydantic, async/await  
**Best For:**
- High-performance async APIs
- Type-safe API development
- Modern Python applications
- Auto-generated OpenAPI docs

### Backend Django Agent
**File:** `agents/backend-django-agent.md`  
**Tech Stack:** Python, Django, Django REST Framework  
**Best For:**
- Full-featured web applications
- Admin-heavy applications
- MVT architecture
- Batteries-included approach

---

## 🎨 Frontend Agents

### Frontend React Agent
**File:** `agents/frontend-react-agent.md`  
**Tech Stack:** React, TypeScript, Tailwind CSS  
**Best For:**
- Single-page applications (SPAs)
- Complex UI with state management
- Modern web applications
- Component-based architecture

### Frontend Next.js Agent
**File:** `agents/frontend-nextjs-agent.md`  
**Tech Stack:** Next.js 14+, React, App Router  
**Best For:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- SEO-optimized applications
- Full-stack React apps

### Frontend Vue.js Agent
**File:** `agents/frontend-vue-agent.md`  
**Tech Stack:** Vue 3, Composition API, Pinia  
**Best For:**
- Progressive web apps
- Reactive user interfaces
- Gradual framework adoption
- Developer-friendly syntax

### Frontend Angular Agent
**File:** `agents/frontend-angular-agent.md`  
**Tech Stack:** Angular 16+, TypeScript, RxJS  
**Best For:**
- Enterprise applications
- Large-scale SPAs
- TypeScript-first development
- Opinionated architecture

### UI/CSS Expert Agent
**File:** `agents/ui-css-expert-agent.md`  
**Tech Stack:** Vanilla CSS, Tailwind CSS, shadcn/ui  
**Best For:**
- Design system implementation
- Responsive layouts
- Accessibility compliance
- CSS architecture and styling approaches

---

## 📱 Mobile Agents

### Mobile Flutter Agent
**File:** `agents/mobile-flutter-agent.md`  
**Tech Stack:** Flutter, Dart  
**Best For:**
- Cross-platform mobile apps (iOS + Android)
- Native performance requirements
- Material Design and Cupertino UIs
- Rapid mobile development

---

## 🚀 DevOps Agents

### DevOps Terraform Agent
**File:** `agents/devops-terraform-agent.md`  
**Tech Stack:** Terraform, HCL  
**Best For:**
- Infrastructure as Code (IaC)
- Multi-cloud deployments
- Environment provisioning
- Resource management

---

## 🗄️ Database Agents

### Database MongoDB Agent
**File:** `agents/database-mongodb-agent.md`  
**Tech Stack:** MongoDB, NoSQL  
**Best For:**
- Document-based data models
- Schema design and indexing
- Aggregation pipelines
- Performance optimization

---

## 🛠️ Creating Your Own Agent

Don't see your tech stack? Create a custom agent!

### Quick Start Guide

1. **Identify your role**: Backend, Frontend, DevOps, Mobile, Data Engineer, etc.
2. **Choose your tech**: Flask, Django, Vue, Angular, Kubernetes, etc.
3. **Follow the template**: See [`docs/CREATE_CUSTOM_AGENT.md`](CREATE_CUSTOM_AGENT.md)
4. **Create the file**: `agents/[role]-[stack]-agent.md`
5. **Run setup**: `npx ai-agent-workflow`

### Popular Custom Agent Ideas

| Role | Stack | Agent Name |
|------|-------|------------|
| Backend Developer | Django | `backend-django-agent.md` |
| Backend Developer | FastAPI | `backend-fastapi-agent.md` |
| Backend Developer | Ruby on Rails | `backend-rails-agent.md` |
| Frontend Developer | Vue.js | `frontend-vue-agent.md` |
| Frontend Developer | Angular | `frontend-angular-agent.md` |
| Frontend Developer | Svelte | `frontend-svelte-agent.md` |
| Mobile Developer | React Native | `mobile-react-native-agent.md` |
| Mobile Developer | SwiftUI | `mobile-swiftui-agent.md` |
| Mobile Developer | Kotlin Compose | `mobile-kotlin-agent.md` |
| DevOps Engineer | Kubernetes | `devops-kubernetes-agent.md` |
| DevOps Engineer | Ansible | `devops-ansible-agent.md` |
| DevOps Engineer | Docker | `devops-docker-agent.md` |
| Data Engineer | Apache Airflow | `data-airflow-agent.md` |
| Data Engineer | dbt | `data-dbt-agent.md` |
| Data Engineer | Spark | `data-spark-agent.md` |
| Database Engineer | PostgreSQL | `database-postgres-agent.md` |
| Database Engineer | Redis | `database-redis-agent.md` |
| QA Engineer | Selenium | `qa-selenium-agent.md` |
| QA Engineer | Cypress | `qa-cypress-agent.md` |

---

## 📋 Agent Selection Guide

**When running `npx ai-agent-workflow`, you'll be asked: "What do you build?"**

Choose based on your primary role:

```
🎨 Frontend Developer
   → Installs: Feature Planner, Frontend React Agent, QA Agent, Review Agent, Documentation Agent

⚙️ Backend Developer  
   → Installs: Feature Planner, Backend Node/Flask Agent, Database Agent, QA Agent, Review Agent, Documentation Agent

📱 Mobile Developer
   → Installs: Feature Planner, Mobile Flutter Agent, QA Agent, Review Agent, Documentation Agent

🚀 DevOps Engineer
   → Installs: Feature Planner, DevOps Terraform Agent, QA Agent, Review Agent, Documentation Agent

📊 Data Engineer
   → Installs: Feature Planner, Data Agent (custom), Database Agent, QA Agent, Review Agent, Documentation Agent

🛠️ IT Administrator
   → Installs: Feature Planner, IT Agent (custom), QA Agent, Review Agent, Documentation Agent
```

---

## 🔄 Mixing Agents

You can use multiple role-specific agents in the same repository!

**Example: Full-stack monorepo**
```
agents/
├── backend-node-agent.md
├── frontend-react-agent.md
├── database-mongodb-agent.md
├── devops-terraform-agent.md
└── ... (standard agents)
```

Just ensure your `GEMINI_GUIDE.md` or profile defines which agents are allowed for specific tasks.

---

## 📚 Learn More

- **Setup Guide**: [SETUP.md](../SETUP.md)
- **Usage Guide**: [USAGE.md](../USAGE.md)
- **Create Custom Agent**: [docs/CREATE_CUSTOM_AGENT.md](CREATE_CUSTOM_AGENT.md)
- **Main README**: [README.md](../README.md)

---

**Have questions?** Open an issue or discussion in the repository.
