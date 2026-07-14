# Secret Santa Platform

Monorepo containing the FastAPI backend and React + TypeScript frontend for the Secret Santa platform.

- `backend/`: FastAPI application configured with SQLAlchemy, Alembic, and Celery.
- `frontend/`: Vite-based React app with Tailwind CSS and Zustand.
- `docs/`: Architecture overview, UI mockups, and setup instructions.
- `infrastructure/`: Dockerfiles for backend and worker services.

Refer to [docs/setup.md](docs/setup.md) for local environment instructions.

## Product documentation

- [Product specification](docs/product-spec.md)
- [Architecture](docs/architecture.md)
- [UX and visual design](docs/ui-mockups.md)
- [Draw engine rules](docs/draw-engine.md)
- [Security and personal data](docs/security-privacy.md)
- [Delivery roadmap](docs/roadmap.md)
- [Product decisions](docs/decisions.md)
- [Reference-site page audit](docs/research/santa-secret-page-audit.md)
