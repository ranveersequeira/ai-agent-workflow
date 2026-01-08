# Agent Library - Complete Overview

This document provides a complete overview of all available agents in the AI Agent Workflow.

---

## 📊 Statistics

- **Total Agents**: 14
- **Universal Agents**: 5
- **Backend Agents**: 3
- **Frontend Agents**: 5
- **Mobile Agents**: 1
- **DevOps Agents**: 1
- **Database Agents**: 1
- **Specialized Agents**: 1 (UI/CSS)

---

## 🌐 Universal Agents (Always Active)

These agents work across all tech stacks and roles:

| # | Agent Name | File | Purpose |
|---|------------|------|---------|
| 1 | System Orchestrator | `system-orchestrator.md` | Enforces workflow loop |
| 2 | Feature Planner | `feature-planner.md` | Creates implementation plans |
| 3 | QA Agent | `qa-agent.md` | Tests and quality assurance |
| 4 | Review Agent | `review-agent.md` | Code review and security |
| 5 | Documentation Agent | `documentation-agent.md` | Updates documentation |

---

## ⚙️ Backend Agents

| # | Agent Name | File | Tech Stack | Key Features |
|---|------------|------|------------|--------------|
| 6 | Backend Node.js | `backend-node-agent.md` | Node.js, Express, TypeScript | RESTful APIs, async/await, error handling |
| 7 | Backend Flask | `backend-flask-agent.md` | Python, Flask, SQLAlchemy | Blueprint patterns, Alembic migrations, marshmallow validation |
| 8 | Backend Django | `backend-django-agent.md` | Python, Django, DRF | Django ORM, MVT pattern, admin customization, DRF ViewSets |

---

## 🎨 Frontend Agents

| # | Agent Name | File | Tech Stack | Key Features |
|---|------------|------|------------|--------------|
| 9 | Frontend React | `frontend-react-agent.md` | React, TypeScript, Tailwind | Hooks, state management, component patterns |
| 10 | Frontend Next.js | `frontend-nextjs-agent.md` | Next.js 14+, App Router | SSR/SSG, API routes, Server Components, SEO |
| 11 | Frontend Vue.js | `frontend-vue-agent.md` | Vue 3, Composition API, Pinia | Reactivity, composables, TypeScript integration |
| 12 | Frontend Angular | `frontend-angular-agent.md` | Angular 16+, RxJS | Standalone components, DI, reactive forms, signals |
| 13 | UI/CSS Expert | `ui-css-expert-agent.md` | CSS, Tailwind, shadcn/ui | Vanilla CSS, Tailwind utilities, shadcn components, a11y |

---

## 📱 Mobile Agents

| # | Agent Name | File | Tech Stack | Key Features |
|---|------------|------|------------|--------------|
| 14 | Mobile Flutter | `mobile-flutter-agent.md` | Flutter, Dart | Cross-platform, Material/Cupertino, state management |

---

## 🚀 DevOps Agents

| # | Agent Name | File | Tech Stack | Key Features |
|---|------------|------|------------|--------------|
| 15 | DevOps Terraform | `devops-terraform-agent.md` | Terraform, HCL | IaC, module design, state management, multi-cloud |

---

## 🗄️ Database Agents

| # | Agent Name | File | Tech Stack | Key Features |
|---|------------|------|------------|--------------|
| 16 | Database MongoDB | `database-mongodb-agent.md` | MongoDB, NoSQL | Document models, aggregation, indexing |

---

## 🎯 Tech Stack Coverage

### Backend Frameworks
✅ Node.js + Express  
✅ Python + Flask  
✅ Python + Django  
🔲 Ruby on Rails (create custom)  
🔲 Go + Gin/Echo (create custom)  
🔲 Java + Spring Boot (create custom)  
🔲 PHP + Laravel (create custom)

### Frontend Frameworks
✅ React  
✅ Next.js  
✅ Vue.js  
✅ Angular  
🔲 Svelte (create custom)  
🔲 Solid.js (create custom)  
🔲 Remix (create custom)

### Mobile Frameworks
✅ Flutter  
🔲 React Native (create custom)  
🔲 SwiftUI (create custom)  
🔲 Kotlin Compose (create custom)

### DevOps & Infrastructure
✅ Terraform  
🔲 Kubernetes (create custom)  
🔲 Ansible (create custom)  
🔲 Docker (create custom)  
🔲 GitHub Actions (create custom)

### Styling & UI
✅ Vanilla CSS  
✅ Tailwind CSS  
✅ shadcn/ui  
🔲 Bootstrap (create custom)  
🔲 Material-UI (create custom)  
🔲 Chakra UI (create custom)

---

## 📖 How to Use This Library

### 1. Browse Available Agents
Review the list above to see which agents are pre-built for your tech stack.

### 2. Install for Your Stack
Run `npx ai-agent-workflow` and select your role to install relevant agents.

### 3. Create Custom Agents
If you don't see your stack, follow the guide: [`CREATE_CUSTOM_AGENT.md`](CREATE_CUSTOM_AGENT.md)

### 4. Mix and Match
Use multiple agents in the same project (e.g., Next.js + Django + Terraform).

---

## 🚀 Upcoming Agents (Community Contributions Welcome!)

Want to contribute? Here are some popular stacks that need agents:

### Backend
- FastAPI (Python)
- Ruby on Rails
- Go (Gin/Echo)
- Spring Boot (Java)
- Laravel (PHP)
- NestJS (Node.js)

### Frontend
- Svelte/SvelteKit
- Solid.js
- Remix
- Astro
- Qwik

### Mobile
- React Native
- SwiftUI
- Jetpack Compose
- Ionic

### Data Engineering
- Apache Airflow
- dbt
- Apache Spark
- Databricks

### DevOps
- Kubernetes
- Ansible
- CloudFormation
- Pulumi
- GitHub Actions
- Jenkins

### Database
- PostgreSQL
- MySQL
- Redis
- Elasticsearch
- Cassandra

---

## 💡 Agent Design Principles

All agents in this library follow these principles:

1. **Single Responsibility**: Each agent focuses on one role/stack
2. **Best Practices**: Enforces industry-standard patterns
3. **Security First**: Security rules built-in
4. **Type Safety**: TypeScript + strong typing where applicable
5. **Testing**: Testing requirements clearly defined
6. **Completion Flow**: Always ends with "INVOKE Review Agent"
7. **Clear Boundaries**: Explicitly states what agent does NOT do

---

## 📝 Contributing

To contribute a new agent:

1. Fork the repository
2. Create agent file: `agents/[role]-[stack]-agent.md`
3. Follow the template in `CREATE_CUSTOM_AGENT.md`
4. Test with `npx ai-agent-workflow`
5. Submit a pull request
6. Update this overview document

---

## 📚 Related Documentation

- **[Available Agents](AGENTS.md)** - Detailed agent reference
- **[Create Custom Agent](CREATE_CUSTOM_AGENT.md)** - Step-by-step guide
- **[Setup Guide](../SETUP.md)** - Installation
- **[Usage Guide](../USAGE.md)** - How to use agents
- **[Main README](../README.md)** - Project overview

---

**Last Updated**: 2026-01-08  
**Total Agents**: 16 (5 universal + 11 specialized)
