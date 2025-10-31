# Secret Santa Platform Architecture

## Overview
The Secret Santa platform is a service-oriented web application consisting of a FastAPI backend, a React + TypeScript frontend, and a PostgreSQL database. Infrastructure is containerized via Docker Compose to facilitate local development and deployment.

## Backend
- **Framework:** FastAPI running under Uvicorn with Gunicorn worker management (uvicorn workers).
- **ORM:** SQLAlchemy 2.x with Pydantic v2 for schema validation and Alembic for migrations.
- **Authentication:** JWT access + refresh tokens stored via HTTP-only cookies, with optional OAuth providers (Google, VK, Telegram) implemented through the OAuth 2.1 authorization code flow using `authlib`.
- **Background tasks:** Celery worker powered by Redis for asynchronous jobs (email sending, reminders).
- **Email:** SendGrid transactional email via API, with Mailhog stub for local development.
- **Services:**
  - `api`: main FastAPI application (REST + WebSocket for live updates where necessary).
  - `worker`: Celery worker container sharing the same codebase.

## Frontend
- **Framework:** React 18 + TypeScript + Vite build tool.
- **State Management:** Zustand for lightweight state management, React Query for data fetching.
- **Styling:** Tailwind CSS with custom theme tokens.
- **Routing:** React Router v6.
- **Internationalization:** i18next with RU/EN namespaces stored under `frontend/src/i18n`.

## Database Schema (Initial Draft)

```mermaid
erDiagram
    Users ||--o{ SocialAuth : "has"
    Users ||--o{ Participants : "may map"
    Users ||--o{ Boxes : "organizes"
    Users ||--o{ RefreshTokens : "owns"
    Boxes ||--|{ Participants : "contains"
    Boxes ||--|{ Draws : "generates"
    Participants ||--o{ Draws : "assigned"
    Boxes ||--o{ EmailInvites : "issues"
    Users ||--o{ Settings : "customizes"

    Users {
        uuid id PK
        varchar email UNIQUE
        varchar password_hash NULLABLE
        varchar full_name
        boolean is_active
        boolean is_superuser
        timestamptz created_at
        timestamptz updated_at
    }

    SocialAuth {
        uuid id PK
        uuid user_id FK
        varchar provider
        varchar provider_account_id
        jsonb profile
        timestamptz created_at
    }

    Boxes {
        uuid id PK
        uuid organizer_id FK
        varchar name
        varchar slug UNIQUE
        varchar currency
        numeric min_budget NULLABLE
        numeric max_budget NULLABLE
        text description
        text address
        varchar phone
        boolean is_private_names DEFAULT false
        enum status (draft, ready, drawing, matched, archived)
        timestamptz signup_deadline NULLABLE
        timestamptz shipping_deadline NULLABLE
        timestamptz created_at
        timestamptz updated_at
    }

    Participants {
        uuid id PK
        uuid box_id FK
        uuid user_id NULLABLE FK
        varchar email
        varchar display_name
        text wishes
        text address
        varchar phone
        enum status (invited, active, locked)
        boolean is_organizer
        timestamptz created_at
        timestamptz updated_at
    }

    Draws {
        uuid id PK
        uuid box_id FK
        uuid santa_participant_id FK
        uuid giftee_participant_id FK
        timestamptz created_at
        uuid override_by FK NULLABLE
    }

    EmailInvites {
        uuid id PK
        uuid box_id FK
        varchar email
        varchar invite_code UNIQUE
        enum status (pending, accepted, expired)
        timestamptz created_at
        timestamptz expires_at
    }

    Settings {
        uuid id PK
        uuid user_id FK
        boolean email_notifications DEFAULT true
        boolean vk_notifications DEFAULT false
        boolean telegram_notifications DEFAULT false
        jsonb preferences
        timestamptz created_at
        timestamptz updated_at
    }

    RefreshTokens {
        uuid id PK
        uuid user_id FK
        varchar token_hash
        timestamptz issued_at
        timestamptz expires_at
        varchar user_agent
        varchar ip_address
    }
```

## Security Considerations
- All personally identifiable information (PII) stored encrypted at rest using PostgreSQL column-level encryption where applicable (e.g., phone numbers) with application-layer hashing for invite codes.
- Rate limiting via FastAPI dependencies backed by Redis for brute-force protection.
- Slug collision avoidance through random suffixes and hashed invite codes.
- GDPR compliance via logical deletion (soft delete) followed by async background scrubbing of data.

## Deployment Topology
- Production uses managed PostgreSQL (e.g., AWS RDS) and Redis (Elasticache/Upstash).
- Containers built via multi-stage Dockerfiles, orchestrated by Docker Compose locally and Kubernetes/Swarm in production.
- Continuous integration triggers automated tests, linting, type checks, and Alembic migrations.

## Module Layout
```
backend/
  app/
    api/ (routers, dependencies)
    core/ (config, security)
    models/ (SQLAlchemy ORM models)
    schemas/ (Pydantic models)
    services/ (business logic)
    workers/ (Celery tasks)
    main.py
  alembic/
    env.py
    versions/
frontend/
  src/
    app/
    components/
    features/
    pages/
    store/
    i18n/
    styles/
infrastructure/
  backend.Dockerfile
  frontend.Dockerfile
  worker.Dockerfile
  nginx.conf (future)
```

## Initial Milestone (MVP Core)
1. Authentication & User management
2. Box CRUD & participant invitations
3. Draw execution logic with auditing
4. Email service integration (SendGrid API wrappers)
```
