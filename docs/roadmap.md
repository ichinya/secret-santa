# Delivery roadmap

The roadmap turns the product specification into independently testable workstreams. GitHub issues are the execution record; this document defines ordering, dependencies, and completion criteria.

## Current baseline

The repository already contains:

- FastAPI/SQLAlchemy/Alembic project structure;
- initial `User`, `Box`, `Participant`, `Draw`, `EmailInvite`, settings, social-auth, and refresh-token models;
- React/Vite shell with public pages and account placeholders;
- Docker Compose for PostgreSQL, Redis, Mailhog, backend, worker, and frontend;
- initial architecture, setup, and UI documentation.

Most UI is static and the backend currently exposes only root/health behavior. The next milestone is a vertical slice rather than more disconnected placeholders.

## Milestone 1: Core exchange MVP

### WS-01 Authentication and account lifecycle

- register, verify email, log in/out, refresh and revoke sessions;
- profile, password, social-account placeholders, and notification settings;
- account deletion workflow with owned-box blockers;
- authorization tests and neutral account-recovery responses.

**Done when:** a user can create an account, maintain it, and delete it without exposing another account's existence or data.

### WS-02 Box wizard and organizer workspace

- box CRUD and lifecycle state transitions;
- five-step wizard with autosave and validation;
- active/archive views and organizer/participant role labels;
- settings, archive, restore, and confirmed deletion;
- participant-readiness calculation and next-action UI.

**Done when:** an organizer can create, resume, publish, archive, and delete a box from mobile and desktop.

### WS-03 Invitations and participant cards

- revocable share link and bulk email invitations;
- invitation state, acceptance, card completion, reminders, and removal;
- required wishes/address/phone rules and field-level visibility;
- Mailhog-tested templates, delivery webhooks, retries, and resend flow.

**Done when:** participants can join and complete cards, while organizers see readiness but not unnecessary private fields.

### WS-04 Draw and private result

- solver-backed validation and draw execution;
- idempotent, transactional, immutable draw revision;
- result notification and scoped result link;
- recipient page and organizer aggregate delivery status;
- audited assignment table and redraw workflow.

**Done when:** property-based tests prove every invariant and concurrent requests cannot create multiple active draws.

### WS-05 Quick draw and public support flows

- real quick-draw backend for 3-100 participants;
- FAQ, resend, contact, privacy, and support forms connected to backend behavior;
- localized transactional messages and accessible result states.

**Done when:** a guest can complete a one-off draw and recover a missed email without creating a box.

### WS-06 Production privacy and operations gate

- processing inventory, policy/consent versions, retention and deletion jobs;
- field-level encryption, hashed tokens, rate limits, audit events;
- localization/cross-border/provider review and operator-notification decision;
- backup/restore, incident response, monitoring, and redacted logs.

**Done when:** the production checklist in [security-privacy.md](security-privacy.md) has evidence and owners.

## Milestone 2: Rich exchange

### WS-07 Wishlist and gift workflow

- structured wishlist items, priorities, price ranges, and links;
- reservation without revealing Santa;
- choosing/purchased/sent/delivered states;
- reminders tied to event deadlines.

### WS-08 Advanced rules and history

- explicit pair and household exclusions;
- reciprocal-pair setting;
- no-repeat history across cloned/recurring boxes;
- manual locked pairs with solver validation;
- actionable impossible-constraint diagnostics.

### WS-09 Anonymous communication

- Santa-to-recipient thread without identity disclosure;
- rate limits, report/block, moderation case, and retention;
- email/push notification without private message previews.

## Milestone 3: Year-round growth

- event templates and recurring annual events;
- clone workflow without copying private card data;
- organizer aggregate analytics and delivery reports;
- corporate imports, roles, and optional branding;
- gift feedback/gallery with explicit consent;
- additional locales, currencies, and delivery integrations.

## Experiments requiring separate approval

- AI gift recommendations;
- social-profile interest import;
- group payments and marketplace partnerships;
- reputation/karma;
- time-capsule messages and public gift galleries.

These require product validation plus privacy, moderation, and payment-specific reviews before implementation.

## Verification strategy

- backend: unit, API, authorization, migration, property-based draw, and worker retry tests;
- frontend: component, route, accessibility, and end-to-end tests for organizer/participant/guest journeys;
- email: template snapshots and delivery-event integration tests;
- operations: migration rollback plan, backup restore drill, and redaction checks;
- design: screenshots at 360, 768, 1024, and 1440 px with no clipping or overlap.
