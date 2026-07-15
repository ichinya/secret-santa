# AI development brief

## Purpose

This is the reusable implementation brief for an AI coding agent working on the Secret Santa platform. It preserves the unique artifact produced in Chat 71 while correcting two ambiguities in the original prompt:

- the repository already has an accepted stack, so an agent must not choose a different backend or replace the scaffold;
- `santa-secret.ru` is workflow research only, not a source of branding, copy, illustrations, or code.

This brief is an execution aid. It does not replace the product specification, decisions, security rules, or issue acceptance criteria.

## Agent role

Act as the senior full-stack engineer responsible for taking one vertical slice from issue to verified code. Inspect the repository before proposing changes, preserve existing patterns, and deliver implementation, migrations, tests, documentation, and local run instructions together.

Do not respond with another high-level retelling of the product. Start by identifying the requested issue, its dependencies, the affected domain state, and the smallest complete user journey that can be shipped safely.

## Source-of-truth order

When requirements disagree, use this order:

1. The selected GitHub issue and its acceptance criteria.
2. [Product specification](product-spec.md).
3. [Product decisions](decisions.md).
4. [Security and personal data](security-privacy.md).
5. [Draw engine rules](draw-engine.md).
6. [Architecture](architecture.md).
7. [UX and visual design](ui-mockups.md).
8. [Delivery roadmap](roadmap.md).
9. [Reference-site audit](research/santa-secret-page-audit.md).

Stop and record a decision or ADR when a conflict cannot be resolved from these sources. Do not silently hard-code an open product decision.

## Fixed technology baseline

- Backend: Python, FastAPI, Pydantic, SQLAlchemy, Alembic, and Uvicorn.
- Frontend: React, TypeScript, Vite, Tailwind CSS, and Zustand.
- Data: PostgreSQL.
- Background work: Redis and Celery.
- Development email: Mailhog; production email uses a provider adapter.
- Authentication: short-lived access sessions, rotating refresh tokens, and optional Google, VK, and Telegram adapters.
- Local environment: Docker Compose.
- Contracts: OpenAPI and typed frontend clients generated or checked against it.

Do not introduce NestJS, Fastify, Django, Prisma, Redux, or a second frontend framework unless an accepted ADR explicitly changes the baseline.

## Product objective

Build a year-round private gift-exchange service whose primary entry point is Secret Santa. Users can create a box, invite participants, collect cards and wishes, run a validated draw, privately reveal recipients, and manage the exchange without exposing assignments or unnecessary personal data.

The product supports four experiences:

- guest: public pages and quick draw;
- participant: invitation, own card, private recipient, messages, and gift state;
- organizer: box setup, readiness, invitations, draw, settings, archive, and incident actions;
- administrator: tightly scoped support, delivery, moderation, privacy, and operational queues.

## Required functional map

### Public experience

- Home with original event media, `Create a box`, `Quick draw`, four how-it-works steps, FAQ teaser, and compact footer.
- Quick draw for 3-100 name/email rows, optional organizer participation, confirmation, private result delivery, resend, and short retention.
- FAQ with organizer/general/service sections and linkable accessible accordions.
- Neutral resend flow that does not disclose whether an account or draw exists.
- Contact flow that suggests FAQ content before opening a rate-limited support form.
- Versioned privacy page with operator details and processing summary.
- Optional support/donation page; payments are not part of core MVP.

### Account

- Registration, email verification, login/logout, recovery, refresh rotation, and session revocation.
- Name and verified email change, password change, active sessions, notification preferences, and social connections.
- Account deletion with owned-box and active-exchange blockers, asynchronous scrub, and audit evidence.
- Active and archived boxes with organizer/participant role, readiness, date, and next action.

### Box creation

Implement a five-step autosaved wizard:

1. Title, description, event type/date, and unique slug.
2. Optional minimum/maximum gift budget and currency.
3. Wishes, address, phone, participant-name visibility, deadlines, and privacy explanation.
4. Original or licensed cover/theme selection.
5. Review, validation summary, and creation/publish confirmation.

Leaving the wizard must not lose a valid draft. Every blocker links back to the exact field that needs correction.

### Box workspace

- Tabs for participants, own card, recipient, messages, and settings.
- Organizer action menu for invitations, draw, assignment table, archive, and delete.
- Participant roster with invitation state, card readiness, delivery channel, last reminder, and allowed actions.
- Invitation by revocable link and bulk name/email entry with row-level validation and delivery state.
- Participant card with identity, wishes, optional contact/delivery fields, and a field-level visibility preview.
- Readiness endpoint that returns hard blockers and warnings before a draw.
- Dedicated draw confirmation, transactional solver execution, private results, and notification progress.
- Audited warning gate before organizer access to the complete assignment table.
- Settings, read-only archive, explicit restore, and phrase-confirmed deletion.

### Draw rules

- Exactly one recipient and one Santa per participant.
- No self-assignment or duplicate recipient.
- Hard exclusions are validated before execution.
- A draw is an immutable revision; a redraw creates a new revision and revokes old result links.
- Draw requests and notifications are transactional and idempotent.
- Manual locked pairs are post-MVP and must be validated by the same solver.
- Never reveal assignments in shared success pages, list endpoints, analytics, logs, toasts, or browser notifications.

### Notifications

Support templates and delivery events for:

- registration and email verification;
- invitation and invitation reminder;
- card/deadline reminder;
- draw result and revoked/redrawn result;
- neutral resend and account recovery;
- account email or security changes.

Use an outbox pattern, signed idempotent provider webhooks, bounce/complaint handling, retry limits, and RU/EN template fixtures. Email subjects and previews must not contain a recipient, address, assignment, or private message.

### Administration and operations

The admin console is an operational tool, not a database browser. Provide separate queues for:

- support requests;
- email delivery failures and suppressed recipients;
- account verification, lock, export, and deletion jobs;
- box and draw incidents;
- abuse reports and moderation cases;
- provider health and failed background jobs;
- audit-event lookup.

Default views show identifiers, state, timestamps, and safe diagnostics. Assignment mappings, addresses, phones, wishes, and private messages remain hidden. Break-glass access requires step-up authentication, a reason, time-limited scope, and an immutable audit event.

## Domain and persistence rules

At minimum, maintain explicit models or aggregates for:

- users, sessions, social accounts, notification settings, and consent records;
- boxes, box settings, participants, participant cards, and invitations;
- draw requests, immutable draw revisions, constraints, and assignments;
- email outbox messages and delivery events;
- support tickets, moderation cases, privacy requests, and audit events.

Participants and users are different concepts: an invitation may exist before an account is linked. Sensitive fields have independent visibility and retention. Store one-time tokens as hashes and protect address, phone, and private content with field or envelope encryption.

Every schema change includes:

- an Alembic migration and downgrade strategy;
- indexes and uniqueness constraints for the access pattern;
- data migration or compatibility behavior for existing rows;
- API and authorization tests;
- backup/rollback notes when the change is destructive.

## UX and visual design contract

Use [ui-mockups.md](ui-mockups.md) as the detailed design source. In every implementation:

- create an independent visual identity and use only original or licensed media;
- use the existing pink, yellow, neutral, and semantic token set without turning the product into a one-hue theme;
- keep cards/panels at 8 px radius or less and avoid cards nested inside cards;
- use Lucide icons for familiar commands, with accessible names and tooltips where needed;
- keep participant flows mobile-first and organizer/admin workspaces dense and scan-friendly;
- implement loading, empty, validation, system-error, success, disabled, expired, revoked, and permission-denied states;
- verify 360, 768, 1024, and 1440 px layouts with screenshots;
- meet WCAG 2.2 AA, keyboard, focus, reduced-motion, and locale-aware content requirements.

The home hero uses an inspectable event image with text over it and leaves the next section visible. It must not copy the reference site's artwork or use a gradient-only placeholder as the finished design.

## Security and privacy contract

- Enforce authorization in backend services, not only by hiding controls.
- Protect against IDOR across boxes, invitations, revisions, assignments, and admin cases.
- Use scoped, random, expiring, revocable links and hashed token storage.
- Apply rate limits to authentication, invitations, draw, resend, contact, and messaging.
- Keep credentials and personal data out of logs, traces, metrics, URLs, and error bodies.
- Implement retention, export, deletion, backup tombstones, and incident procedures from [security-privacy.md](security-privacy.md).
- Treat Russian personal-data, localization, consent, and operator-notification decisions as a production gate; GDPR wording alone is insufficient.

## Implementation protocol

For each issue:

1. Inspect the current code, migrations, tests, and related issues.
2. State the selected vertical slice, dependencies, assumptions, and migration impact.
3. Update a short implementation checklist as work progresses.
4. Implement backend domain behavior before wiring UI placeholders to fake success.
5. Add migrations, typed contracts, background jobs, UI states, and documentation required by the slice.
6. Run targeted tests, then the broader affected suites, linters, builds, migration checks, and screenshot/a11y checks.
7. Report the exact verification performed and any remaining product decision.
8. Commit only the scoped change with a descriptive conventional commit message.

Do not create a second architecture alongside the existing code. Do not leave a route with static success behavior when the issue claims the workflow is complete.

## Delivery order

1. Authentication and account lifecycle.
2. Box draft, five-step wizard, and organizer workspace.
3. Invitations, participant cards, email outbox, and readiness.
4. Solver-backed draw, private result, assignment warning gate, and redraw.
5. Quick draw and public support flows.
6. Production privacy, security, monitoring, and administrative operations.
7. Wishlist, delivery state, advanced constraints, and anonymous messages.
8. Year-round, corporate, integration, and monetization experiments.

## Definition of done

A slice is complete only when:

- its user journey works against the real backend and persisted state;
- authorization and privacy boundaries are covered by tests;
- retries and concurrent requests cannot duplicate critical mutations;
- migration upgrade/downgrade behavior is checked;
- loading, empty, error, success, and permission states are implemented;
- RU/EN content and email templates are covered where applicable;
- desktop/mobile screenshots have no overlap or clipping;
- issue acceptance criteria and affected documentation are updated;
- the working tree contains no unrelated or generated debris.

## Provenance

Chat 71, `Разработка сайта Тайный Санта` (`6903af83-973c-832b-a644-58f153b07b0e`), asked for a full-stack implementation prompt after documenting the pages of `santa-secret.ru`. It uploaded `6193f43f.md` (12,529 bytes, 3,363 indexed tokens), matching the filename, size, and token count of the Chat 68 product brief. The page inventory and broad product concepts are consolidated in the canonical product and research documents; this file preserves the unique AI-agent execution brief.
