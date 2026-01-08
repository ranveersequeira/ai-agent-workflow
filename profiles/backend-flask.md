# Gemini Usage Guide – Backend Flask Repository

This repository contains the Flask backend API.
Gemini must be used strictly according to the workflow defined below.

---

## 1. Repository Scope

This repo owns:
- RESTful API endpoints
- Business logic implementation
- Database models and migrations (SQLAlchemy)
- Authentication & authorization
- Server-side validation
- API documentation

This repo does NOT own:
- Frontend UI components
- Infrastructure provisioning (Terraform, Docker, etc.)
- Client-side state management
- Mobile applications

---

## 2. Tech Stack

- **Core:** Python 3.11+, Flask 3.x
- **Database:** PostgreSQL, SQLAlchemy 2.x, Alembic
- **Auth:** Flask-Login or JWT (PyJWT)
- **Validation:** marshmallow or pydantic
- **Testing:** pytest, pytest-cov, Flask test client
- **Linting:** ruff, black, mypy
- **API Docs:** Flask-RESTX or swagger

---

## 3. Allowed AI Agents

Only the following agents are allowed in this repo:

- Generic Feature Planner
- System Orchestrator
- Backend Flask Agent
- Test & Quality Agent
- Review Agent
- Documentation Agent

❌ Frontend React Agent is NOT allowed  
❌ Mobile Flutter Agent is NOT allowed  
❌ DevOps Terraform Agent is NOT allowed

---

## 4. Mandatory Workflow (DO NOT SKIP)

### STEP 1 — PLAN (NO CODE)

Use [Generic Feature Planner](.cursor/rules/feature-planner.md).
Discuss API contracts, endpoints, and business logic only.
STOP if requirements are unclear.

---

### STEP 2 — BREAKDOWN

Use [System Orchestrator](.cursor/rules/system-orchestrator.md).
Confirm backend-only tasks.
Identify database schema changes if needed.

---

### STEP 3 — IMPLEMENT

Use [Backend Flask Agent](.cursor/rules/backend-flask-agent.md).
Implement the agreed API changes following Flask best practices.

---

### STEP 4 — TEST

Use [Test & Quality Agent](.cursor/rules/qa-agent.md).
Add or update unit and integration tests.
Ensure minimum 70% code coverage.

---

### STEP 5 — REVIEW

Use [Review Agent](.cursor/rules/review-agent.md).
Review backend code quality, security, and performance.

---

### STEP 6 — DOCUMENT

Use [Documentation Agent](.cursor/rules/documentation-agent.md).
Update API documentation and README.

---

## 5. Definition of Done

A change is considered complete only if:
- Planning is approved
- API endpoints are RESTful and documented
- Database migrations are created (if schema changes)
- Tests are added or updated (>70% coverage)
- Code review is approved
- API documentation is updated
- Security best practices are followed

---

## 6. Common Tasks

### Adding a New Endpoint
1. Plan the API contract (Feature Planner)
2. Create Blueprint route (Flask Agent)
3. Add request/response validation (Flask Agent)
4. Write unit tests (QA Agent)
5. Update API docs (Documentation Agent)

### Database Schema Changes
1. Plan the model changes (Feature Planner)
2. Update SQLAlchemy models (Flask Agent)
3. Generate Alembic migration (Flask Agent)
4. Test migration up/down (QA Agent)
5. Document schema changes (Documentation Agent)

### Adding Authentication
1. Plan auth flow (Feature Planner)
2. Implement JWT or session-based auth (Flask Agent)
3. Add middleware for protected routes (Flask Agent)
4. Test auth flows (QA Agent)
5. Document auth requirements (Documentation Agent)

---

## 7. Never Do This

❌ Skip input validation  
❌ Commit secrets or API keys  
❌ Write SQL queries directly (use SQLAlchemy)  
❌ Return internal error details in production  
❌ Skip database migrations  
❌ Use synchronous blocking calls for long operations  
❌ Ignore CORS configuration  
❌ Deploy without tests

---

*Enforce this workflow. No exceptions.*
