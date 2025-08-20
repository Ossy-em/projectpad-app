# Research Workspace – AI-Powered Project Assistant

The Research Workspace is a full‑stack web app that helps students, academics, professionals, and independent researchers plan, organize, and execute research projects. It centralizes documents, notes, and citations; provides AI-powered document analysis and writing assistance; and guides users from idea to structured output.

---

## Core Objectives

* Centralize all project materials in one workspace
* Organize documents, notes, and citations with clear structure
* Provide AI-powered document analysis and context-aware writing help
* Move users from low clarity to a concrete plan and draft
* Support clean export/hand‑off to other tools or collaborators

---

## Features

### Project Creation & Onboarding

* Two-step flow: Project Type → Details & Research Stage
* Project types: Thesis, Capstone, Essay, Market Research, Self Research, Other
* Research stages:

  * Just getting started
  * Have topic, need sources
  * Have sources, need organization
  * Ready to write
* Smart next-step guidance based on the selected stage

### Research Workspace (Three-Panel Layout)

* Left: Project structure, folders, and documents (collapsible)
* Center: Block-based writing editor (headings, paragraphs, quotes)
* Right: AI insights and citations panel

### Document Management

* Drag-and-drop uploads with visual feedback
* File states: uploading → processing → analyzed
* Per-document status badges and relevance scores
* View full document, remove, or reprocess
* Current dev mode includes simulated processing that generates summaries, key points, citations, and relevance scores

### Writing Experience

* Notion-style blocks (headings, text, quotes)
* Natural Enter behavior (new line, not a new block by default)
* Hover "add block" controls and active-block indicator
* Inline source insertion: “Add citation” places at cursor

### AI Insights Panel

* Auto summaries and key point extraction (simulated in dev)
* Citation suggestions and relevance scoring
* Quick actions: insert quote, use data, add citation
* Graceful empty states when no analyzed documents exist

### Collaboration & Export (Planned)

* Project-level collaboration from the sidebar
* Export to DOCX/Markdown/PDF

---

## Architecture

```mermaid
flowchart TD
    U[User] --> F[Next.js Frontend]
    F -->|REST/JSON| B[Django API (DRF)]
    F --> UP[File Upload]
    UP --> S3[(Object Storage: S3/Local)]
    B --> DB[(PostgreSQL/SQLite)]
    B --> Q[Task Queue: Celery/Redis]
    Q --> P[Document Processor]
    P --> XT[Text Extraction (PyMuPDF/pdfminer)]
    XT --> AI[AI Provider (OpenAI/Claude)]
    AI --> AN[Analysis: summary, key points, citations, relevance]
    AN --> B
    B --> F
```

Data flow (happy path): Upload PDF → Store → Extract text → AI analysis → Persist insights → Display in workspace → User integrates into writing.

---

## Tech Stack

**Frontend**

* Next.js + React
* Tailwind CSS
* Component patterns compatible with shadcn/ui

**Backend**

* Django + Django REST Framework
* Celery + Redis for background jobs (optional in dev)
* PDF/Text extraction: PyMuPDF (fitz) or pdfminer.six

**AI Layer**

* OpenAI (e.g., GPT‑4-class models) initially
* Pluggable provider interface for Claude or others

**Data & Infra**

* Database: PostgreSQL (prod), SQLite (dev)
* Storage: Local or S3-compatible
* Auth: Django sessions or JWT (choose per deployment)

---

## Repository Structure

```
research-workspace/
├─ frontend/              # Next.js app (UI, pages, components)
│  ├─ public/
│  ├─ src/
│  └─ .env.local.example
├─ backend/               # Django app (API, workers, extraction)
│  ├─ core/
│  ├─ api/
│  ├─ requirements.txt
│  └─ .env.example
├─ docs/                  # Screens, wireframes, architecture diagrams
├─ .editorconfig
├─ README.md
└─ LICENSE
```

---

## Installation

### Prerequisites

* Node.js 18+
* Python 3.11+
* PostgreSQL (or SQLite for dev)
* Redis (only if running Celery workers)
* Optional: S3-compatible storage (e.g., MinIO, AWS S3)

### 1) Clone

```bash
git clone https://github.com/your-username/research-workspace.git
cd research-workspace
```

### 2) Backend Setup (Django)

Create and populate `backend/.env` (or use system env):

```bash
# backend/.env
DJANGO_SECRET_KEY=replace-me
DJANGO_DEBUG=1
DATABASE_URL=sqlite:///db.sqlite3  # or postgres://user:pass@localhost:5432/research
ALLOWED_HOSTS=*
OPENAI_API_KEY=sk-...
# Toggle to use simulated AI results during development
AI_USE_SIMULATION=1
FILE_STORAGE_BACKEND=local  # local | s3
AWS_S3_BUCKET=optional
AWS_ACCESS_KEY_ID=optional
AWS_SECRET_ACCESS_KEY=optional
AWS_S3_REGION=optional
```

Install and run:

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver 0.0.0.0:8000
```

(Optional) start background workers if not simulating:

```bash
# In another terminal
cd backend && source .venv/bin/activate
celery -A core worker -l info
# If you schedule reprocessing
celery -A core beat -l info
```

### 3) Frontend Setup (Next.js)

Create `frontend/.env.local`:

```bash
# frontend/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# If you proxy via Next.js, set API routes accordingly
```

Install and run:

```bash
cd ../frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## API Overview (selected)

* `POST /api/projects/` – create project (type, details, stage)
* `GET /api/projects/:id/` – project detail with workspace data
* `POST /api/documents/upload/` – upload file (multipart)
* `GET /api/documents/:id/` – document status, metadata, relevance
* `POST /api/insights/analyze/` – trigger analysis (simulated or real)
* `GET /api/insights/:doc_id/` – summaries, key points, citations

---

---

## Testing

Backend:

```bash
cd backend && source .venv/bin/activate
pytest -q
```

Frontend:

```bash
cd frontend
npm test
```

---

## Why This Project

* Demonstrates end-to-end research tooling with AI augmentation
* Combines document ingestion, analysis, and structured writing
* Shows practical UX patterns for complex, status-driven workflows
* Scales from solo students to professional research teams

---

## Contributing

Pull requests are welcome. For major changes, open an issue to discuss what you’d like to change.

---

## License

MIT
