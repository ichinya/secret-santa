# Product decisions

This register records decisions established by the current repository and the Chat 68/71 product research. Unresolved items stay explicit instead of becoming accidental implementation choices.

## Accepted decisions

### D-001: Build a year-round gift exchange

**Decision:** New Year Secret Santa is the primary entry point, but the domain supports arbitrary event types and seasonal presentation.

**Reason:** The same invitation, participant, draw, and delivery mechanics apply to birthdays, corporate events, weddings, school events, and other occasions.

### D-002: Keep the box terminology

**Decision:** Use "box" in the product UI and `Box` in the current backend aggregate.

**Reason:** It gives users a concrete container for settings, participants, and one draw. Event type is metadata rather than a second aggregate competing with `Box`.

### D-003: Use the existing monorepo stack

**Decision:** FastAPI, SQLAlchemy, Alembic, PostgreSQL, Redis/Celery, React, TypeScript, Vite, Tailwind, Zustand, and Docker Compose remain the baseline.

**Reason:** The repository already implements this architecture. The product research does not justify a framework rewrite.

### D-004: Separate persistent boxes from quick draw

**Decision:** Quick draw is an intentionally reduced flow for 3-100 participants. It does not create a reusable box, wishlist, delivery workflow, or organizer assignment view.

**Reason:** A short-lived draw should not require account and event setup or imply storage of unnecessary personal data.

### D-005: Treat assignments as immutable draw revisions

**Decision:** A completed draw is not edited pair by pair. Redraw creates a new revision, records the actor and reason, and sends new notifications.

**Reason:** Silent edits break trust and can leave participants with conflicting assignments.

### D-006: Require explicit review for sensitive organizer actions

**Decision:** Viewing the complete assignment table, redrawing, archiving, deleting, or exporting personal data requires a dedicated confirmation state and audit event.

**Reason:** These actions can disclose secrets or irreversibly change an active exchange.

### D-007: Use field-level privacy

**Decision:** Names, wishes, address, phone, assignment, messages, and delivery data have separate visibility policies. Organizers do not automatically receive every sensitive field.

**Reason:** Participants need to understand who sees each value, and the service must minimize personal-data access.

### D-008: Implement structured wishlists after the core draw

**Decision:** Free-form wishes are part of MVP. Structured wishlist items, reservation state, anonymous messages, and delivery tracking are Phase 2.

**Reason:** They improve retention but are not required to prove the core exchange workflow.

### D-009: Keep monetization outside the core exchange

**Decision:** Core private exchanges remain usable without payment. Donations, corporate packages, partner offers, and premium analytics are evaluated separately.

**Reason:** A payment dependency would increase MVP scope and undermine the simple social use case.

### D-010: Treat competitor research as workflow evidence only

**Decision:** The `santa-secret.ru` page audit informs information architecture and expected states. Do not copy its name, copywriting, illustrations, icons, or visual composition.

**Reason:** The new service needs an independent brand and implementation.

### D-011: Keep AI implementation briefs subordinate to canonical docs

**Decision:** An AI coding agent follows the selected issue, product specification, decision register, security rules, architecture, UX specification, and roadmap in that order. The reusable agent brief cannot select a replacement framework or silently resolve an open decision.

**Reason:** The Chat 71 prompt offered multiple backend stacks because it was written before inspecting the repository. The current FastAPI and React monorepo is already an accepted implementation baseline.

### D-012: Make administration a narrow audited operations surface

**Decision:** The admin console exposes support, email delivery, privacy jobs, moderation, incidents, provider health, and audit queues. It is not a general database browser. Sensitive content or assignment access requires a reason, step-up authentication, a time-limited break-glass grant, and an audit event.

**Reason:** Operational support is required, but unrestricted access would violate field-level privacy and turn administrator convenience into a systemic disclosure risk.

## Open decisions

1. Final product name and primary domain.
2. Whether an organizer may view the full assignment table by default or only enable it before drawing.
3. Minimum supported participant count: two is technically possible, but three gives meaningful anonymity.
4. Whether reciprocal pairs are prohibited by default or exposed as an optional rule.
5. Exact deletion retention window for support, abuse prevention, and legal claims.
6. Initial production email provider and fallback strategy.
7. Whether Telegram/VK notifications launch in MVP or remain email-only until Phase 2.
8. Whether manual pair assignment is needed before the first corporate release.
9. Whether gift delivery status is visible to the recipient before the event date.

Each open decision should be resolved in an issue or ADR before implementation hard-codes the behavior.
