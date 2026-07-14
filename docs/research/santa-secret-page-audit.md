# Reference-site page audit

## Scope

This document records a manual browser audit of `santa-secret.ru` performed in October 2025 during Chat 68. It captures expected Secret Santa workflows and page states for product planning.

The audit is a point-in-time observation, not a current availability check. No screenshots or transferable design assets survived in the export. The reference site's branding, copy, illustrations, icons, and layout must not be copied.

## Observed information architecture

| Area | Observed purpose | Important controls and states |
| --- | --- | --- |
| Home | Explain the game and start a flow | Header, profile/boxes navigation, language switch, `Create box`, `Quick draw`, four how-it-works steps, FAQ teaser |
| Quick draw | One-off draw without a box | Name/email rows, organizer participation option, immediate email delivery, 100-person limit, no wishes or tracking |
| FAQ | Self-service support | Organizer/general/service tabs, accordion answers, definitions for organizer and box |
| Account | Personal details and security | Separate name/email saves, email/VK/Telegram notifications, Google/VK/Telegram linking, password change, profile deletion |
| Boxes | Active work and history | `My boxes` and `Archive`, participant count, organizer marker, links to support pages |
| Create box | Guided configuration | Five steps: name/slug, budget, required participant fields, cover, confirmation |
| Box workspace | Run one exchange | Participants, `My card`, `Recipient`, organizer actions, empty/readiness/matched states |
| Invitations | Recruit participants | Organizer-card reminder, share link, bulk name/email rows, send-now option, acceptance/readiness statuses |
| Box settings | Change pre-draw rules | Name, cover, budget/currency, wishes, required address/phone, participant-name visibility |
| Archive/delete | Controlled destructive actions | Read-only archive explanation, exact confirmation phrases, irreversible-delete warning |
| Assignment table | Organizer diagnostics | Santa-to-recipient mapping after draw; empty state before participants/draw |
| Resend email | Recover notification delivery | Inbox/spam guidance, email form, resend result without exposing unrelated accounts |
| Contact | Escalate unresolved support | FAQ-first fork, email/message form, service-hours expectation |
| Privacy | Explain processing | Personal-data terms, purposes, safeguards, rights, and operator information |
| Support project | Donation flow | Funding explanation, payment method, preset/custom amount, optional comment |

## Detailed page behavior

### Home

- The first viewport presents the service name and two primary commands.
- The explainer describes creating a box, filling participant cards, running the draw, and organizer status control.
- Footer navigation exposes quick draw, FAQ, resend, contact, privacy, and project support.

### Quick draw

- Intended for an immediate email-based result rather than a managed event.
- The source described a limit of 100 participants.
- It deliberately omits wishes, addresses, delivery tracking, and persistent organizer controls.

### Account and boxes

- Account settings separate identity, notification channels, social connections, credentials, and deletion.
- Boxes are split into active and archived views.
- Cards show title, participant count, and the user's role.

### Create box wizard

1. Name and URL slug.
2. Optional minimum/maximum gift price and currency.
3. Switches for wishes, required address, required phone, and participant-name visibility.
4. Cover/icon selection.
5. Review and creation.

The new product adds event type, dates, draw rules, autosave, and readiness validation to this baseline.

### Box workspace

- `Participants`: roster or a clear empty state with an invitation command.
- `My card`: name/pseudonym, optional phone, wishes, and address.
- `Recipient`: after the draw, the assigned person's permitted data.
- Organizer menu: invite, draw, assignment table, settings, archive, and delete.

The observed empty test box was named `ФыВ` and contained no participants. It is test evidence only and not product data.

### Invitations

- The organizer is reminded to create their own participant card.
- A unique link can be copied to messengers.
- Name/email rows support direct invitations.
- Participant status distinguishes invitation from completed card readiness.

### Settings and destructive actions

- Budget controls have an explicit enable switch plus amount range and currency.
- Participant data requirements are individually configurable.
- Archive and delete are separate operations with exact confirmation text.
- Archive is read-only; delete warns that recovery is impossible.

### Assignment table

The complete Santa-to-recipient table is an organizer-only diagnostic. The new product must place it behind a warning and audit access because opening it breaks the normal secrecy boundary.

### Email recovery and support

- Resend gives delivery troubleshooting before accepting an email.
- Contact guides users through FAQ first, then exposes an email/message form.
- The observed service stated human response hours in the support copy.

### Privacy and donations

- Privacy copy referenced Russian personal-data law and user rights.
- The donation page explained operating costs and offered YooMoney, card, or mobile-account payment with preset and custom amounts.
- Payment and donations remain outside the initial product scope.

## Product lessons adopted

1. Keep the setup wizard short and defer advanced rules until needed.
2. Show readiness rather than forcing the organizer to infer it from a participant list.
3. Separate the participant's own card from the recipient card.
4. Make notification recovery a first-class flow.
5. Treat archive, delete, redraw, and assignment-table access as distinct sensitive operations.
6. Preserve quick draw as a reduced product, not a hidden mode of a normal box.

## Product lessons intentionally changed

- The service is year-round and event-aware rather than visually tied only to New Year.
- The draw engine exposes exclusion diagnostics before execution.
- Personal-data visibility is documented per field.
- Design, copy, imagery, and brand are original.
- Recurring events, no-repeat history, structured wishlists, anonymous messages, and delivery status are staged after MVP.
