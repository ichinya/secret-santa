# Local Development Setup

## Prerequisites
- Docker & Docker Compose
- Make (optional)

## First Run
```bash
docker compose up --build
```
This command starts PostgreSQL, Redis, Mailhog, FastAPI, Celery worker, and the Vite dev server.

## Database Migrations
Run migrations inside the backend container:
```bash
docker compose exec backend alembic upgrade head
```

## Backend Lint & Tests
```bash
docker compose exec backend poetry run ruff check
docker compose exec backend poetry run pytest
```

## Frontend Tooling
Install dependencies locally if you prefer native tooling:
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Copy the sample env file if running outside Docker:
```bash
cp backend/.env.example backend/.env
```

Set `SENDGRID_API_KEY` to a valid token and configure OAuth credentials before production use.
