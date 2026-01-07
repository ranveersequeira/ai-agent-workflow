# Gemini Usage Guide – Frontend Repository

This repository contains the React frontend.
Gemini must be used strictly according to the workflow defined below.

---

## 1. Repository Scope

This repo owns:
- React UI
- Client-side state
- API consumption
- UX and performance optimizations

This repo does NOT own:
- Business logic
- Database schemas
- Backend authorization rules

---

## 2. Tech Stack

- **Core:** React 19, TypeScript, Vite (SWC)
- **Styling:** Tailwind CSS 4, shadcn/ui, Lucide React
- **Routing:** TanStack Router
- **State Management:** Zustand (Client), TanStack Query (Server)
- **Forms:** React Hook Form, Zod
- **Authentication:** Better Auth
- **Audio:** ElevenLabs, Wavesurfer.js
- **Tooling:** ESLint, Prettier, Knip

---

## 3. Allowed AI Agents

Only the following agents are allowed in this repo:

- Generic Feature Planner
- System Orchestrator
- Frontend React Agent
- Test & Quality Agent
- Review Agent
- Documentation Agent

❌ Backend Node Agent is NOT allowed  
❌ Database MongoDB Agent is NOT allowed

---

## 4. Mandatory Workflow (DO NOT SKIP)

### STEP 1 — PLAN (NO CODE)

Use [Generic Feature Planner](.cursor/rules/feature-planner.md).
Discuss UI behavior and API contract only.
STOP if requirements are unclear.

---

### STEP 2 — BREAKDOWN

Use [System Orchestrator](.cursor/rules/system-orchestrator.md).
Confirm frontend-only tasks.

---

### STEP 3 — IMPLEMENT

Use [Frontend React Agent](.cursor/rules/frontend-react-agent.md).
Implement the agreed UI changes.

---

### STEP 4 — TEST

Use [Test & Quality Agent](.cursor/rules/qa-agent.md).
Add or update frontend tests.

---

### STEP 5 — REVIEW

Use [Review Agent](.cursor/rules/review-agent.md).
Review frontend code only.

---

### STEP 6 — DOCUMENT

Use [Documentation Agent](.cursor/rules/documentation-agent.md).
Update README and UI-related documentation.

---

## 5. Definition of Done

A change is considered complete only if:
- Planning is approved
- Tests are added or updated
- Review is approved
- Documentation is updated
