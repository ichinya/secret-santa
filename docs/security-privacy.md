# Security and personal-data requirements

## Scope

The service processes email addresses, names, wishes, postal addresses, phone numbers, social-account identifiers, assignments, anonymous messages, and delivery status. Addresses, phones, assignments, and private messages require stricter access and retention controls than ordinary profile fields.

This document is an engineering baseline, not legal advice. Before production launch, obtain a legal review for the operator's jurisdiction, hosting model, notification duties, consent text, retention periods, and cross-border providers.

## Regulatory baseline

For a service directed at Russian users, review and implement the applicable requirements of:

- [Federal Law No. 152-FZ "On Personal Data"](https://ips.pravo.gov.ru/api/ips/legislation/document?baseid=None&hash=98490812b3409e2a8d78a11ca9010f434ea3d9250a11dbbdb78690cd5551bdd6), including purpose limitation, a legal basis for processing, data-subject rights, operator duties, and a published processing policy;
- [Federal Law No. 242-FZ](https://publication.pravo.gov.ru/Document/View/0001201407220042) and the current localization rules for records collected from Russian citizens;
- the current [Roskomnadzor operator guidance](https://82.rkn.gov.ru/directions/pers/p15375/) and whether an operator notification is required before processing starts.

If EU residents are deliberately served, assess GDPR obligations separately. Do not label the product "GDPR compliant" without a documented scope and review.

## Data inventory and purpose

| Data | Purpose | Default visibility | Retention trigger |
| --- | --- | --- | --- |
| Email | Account, invitation, private result delivery | User, required delivery systems | Account/event deletion plus bounded recovery period |
| Display name | Participant identification | Organizer; participants only when configured | Event/account deletion |
| Wishes/wishlist | Help Santa choose a gift | Assigned Santa after draw | Event deletion or participant removal |
| Address/phone | Gift delivery | Assigned Santa after draw; organizer only for support with audit | Scrub after event retention period |
| Assignment | Run exchange | Assigned participant; exceptional organizer view | Event deletion plus short dispute window |
| Anonymous messages | Gift clarification | Sender and recipient | Event deletion/moderation retention |
| OAuth identifiers | Login/account linking | Account owner and auth service | Unlink/account deletion |
| Audit events | Security and dispute investigation | Restricted operators | Fixed security retention period |

Every new field requires an owner, purpose, legal basis, visibility rule, and deletion behavior before migration approval.

## Consent and transparency

- Show the privacy policy at every collection point through a stable link.
- Explain who will see address, phone, wishes, and recipient information before the user submits a card.
- Keep optional marketing, gift gallery, social import, and AI recommendation consent separate from core service processing.
- Record policy/consent version, timestamp, locale, and actor.
- Provide access, correction, export, withdrawal where applicable, and deletion request flows.
- Never use silence or preselected optional checkboxes as consent.

## Authorization matrix

| Capability | Participant | Organizer | Administrator |
| --- | --- | --- | --- |
| Read own card | Yes | Only if organizer is that participant | Support access only with reason |
| Read recipient card | After active draw | Only organizer's own recipient | Support access only with reason |
| Read all names | Only when box policy allows | Yes | Restricted |
| Read all addresses/phones | No | No by default | Break-glass, audited |
| Read assignment table | No | Explicit warning and policy | Break-glass, audited |
| Read anonymous messages | Own conversation | No | Moderation case only |
| Export/delete box data | No | Controlled organizer flow | Controlled support flow |

Authorization is enforced in backend queries and service methods, not only by hiding frontend controls.

## Storage and cryptography

- TLS for every external and internal connection carrying personal data.
- Encrypt high-risk columns or envelopes for address, phone, provider tokens, and private message bodies; keys live outside the database.
- Passwords use a current memory-hard password hash with per-user salt.
- Refresh tokens, invite codes, result links, and reset tokens are random and stored only as hashes.
- Use separate secrets per environment and rotate them through a documented process.
- Backups are encrypted, access-controlled, restore-tested, and covered by deletion/expiry procedures.
- Do not place personal data in object keys, URLs, metrics labels, tracing attributes, or exception messages.

## Invitations and email

- Invitation and result URLs are scoped, expiring, revocable, and rate-limited.
- Resend returns the same neutral response whether or not an email exists.
- Normalize and validate email without exposing account membership.
- Sign provider webhooks and make delivery-event processing idempotent.
- Store provider message IDs and status, not full private email bodies.
- Apply per-IP, per-account, per-box, and per-recipient sending limits.

## Deletion and retention

- Archive makes an event read-only but does not imply deletion.
- User and box deletion enter a short recoverable state only if the policy promises one; after that, an async scrub removes or irreversibly anonymizes personal content.
- Deleting a participant before draw revokes invitations and removes card data.
- After draw, removal/redraw follows an incident workflow to avoid orphaned commitments.
- Backups expire on a documented schedule; restored backups must replay deletion tombstones.
- Analytics use aggregated or anonymized data and never retain assignment mappings.

## Abuse and incident response

- Rate-limit auth, invitation, draw, contact, and anonymous-message endpoints.
- Provide report/block controls for anonymous messages.
- Maintain an audited break-glass support role.
- Define detection, containment, evidence preservation, user/regulator notification assessment, and post-incident review.
- Security logs contain identifiers sufficient for correlation but not private content.

## Production gate

Production launch is blocked until all are complete:

- operator/legal entity and data-controller contacts are known;
- policy, consent, processing register, retention schedule, and processor list are approved;
- localization and cross-border data flows are documented;
- Roskomnadzor notification applicability is resolved;
- threat model, authorization tests, token tests, rate limits, backups, and incident runbook are verified;
- email, analytics, error tracking, object storage, and social-auth providers are covered by contracts and configuration review.
