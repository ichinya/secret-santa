# Draw engine specification

## Purpose

The draw engine creates a valid one-to-one assignment while preserving secrecy, respecting organizer rules, and producing an auditable immutable revision. This is core domain logic and must use a proven constraint solver rather than a custom random retry loop.

Recommended implementation: Google OR-Tools CP-SAT behind a small domain adapter. A simple bipartite matching implementation is insufficient once reciprocal-pair and history constraints are enabled.

## Invariants

For a box with `N` active participants:

1. Exactly `N` Santa-to-recipient assignments are produced.
2. Every active participant is a Santa exactly once.
3. Every active participant is a recipient exactly once.
4. No participant is assigned to themselves.
5. Every configured hard exclusion is respected.
6. All assignments reference participants from the same box and draw snapshot.
7. A successful draw is persisted atomically; partial assignments never become visible.

## Constraint types

### MVP hard constraints

- self-assignment prohibition;
- active/ready participants only;
- explicit blocked Santa-recipient pairs;
- one giver and one receiver per participant.

### Phase 2 constraints

- household/family groups;
- no assignment to the same person within a configured number of previous events;
- optional reciprocal-pair prohibition;
- manual locked pairs validated by the same solver;
- organizer-defined groups or color markers.

Soft preferences must never silently weaken hard constraints. If preferences are introduced, the result records which preferences were satisfied.

## Validation before draw

The validation endpoint returns a machine-readable readiness result:

```json
{
  "ready": false,
  "participant_count": 8,
  "hard_errors": [
    {"code": "CARD_INCOMPLETE", "participant_ids": ["..."]},
    {"code": "CONSTRAINTS_UNSATISFIABLE", "participant_ids": ["...", "..."]}
  ],
  "warnings": [
    {"code": "PENDING_INVITATIONS", "count": 2}
  ]
}
```

Diagnostics must not reveal a potential assignment. For an impossible graph, report the smallest useful participant/constraint subset when the solver can identify it.

## Execution model

1. Lock the box and create an immutable participant/constraint snapshot.
2. Generate a cryptographically strong random seed and store its encrypted value plus a public hash.
3. Build CP-SAT Boolean variables `x[santa, recipient]` only for allowed pairs.
4. Add row/column equality constraints and configured rule constraints.
5. Randomize among valid solutions through seeded randomized weights or solver order.
6. Solve with a strict timeout and record solver/algorithm versions.
7. Persist the complete revision and outbox notification events in one database transaction.
8. Release result links only after commit.

The HTTP endpoint accepts an idempotency key. Repeating a timed-out client request returns the existing draw revision instead of running a second draw.

## Redraw policy

- A draw cannot be edited in place.
- Redraw requires organizer confirmation and a reason.
- The old revision remains in the audit history but is no longer active.
- Participants are told that previous assignments are invalid.
- Result links are revision-bound and old links show a revoked state.
- Redraw is blocked after a configured delivery milestone unless an administrator handles an incident.

## Result disclosure

- Participants access only their own assignment.
- Result tokens are random, scoped, expiring, hashed at rest, and single-purpose.
- Organizer assignment-table access is a separate audited permission and UI action.
- Assignment data never appears in analytics, URLs with readable IDs, email subject lines, or frontend logs.
- Notification providers receive only the minimum content required to deliver the private link.

## Quick draw

Quick draw uses the same invariants and solver but creates an expiring draw record without a reusable box. It supports 3-100 participants and no advanced constraints in MVP. Duplicate normalized emails are rejected.

## Test matrix

At minimum, automated tests cover:

- 3, 4, 10, and 100 participants;
- duplicate email, inactive participant, and incomplete required card;
- every participant excluded from one candidate but a solution still exists;
- impossible two-group and over-constrained cases;
- reciprocal pairs allowed and prohibited;
- fixed pair plus remaining valid assignments;
- no-repeat history across multiple events;
- transaction rollback after solver success but before commit;
- repeated idempotency key and concurrent draw requests;
- revoked links after redraw;
- property-based verification of all invariants across generated graphs.

## Observability

Record participant count, constraint count, validation duration, solve duration, outcome, and failure code. Never log names, emails, addresses, pair mappings, tokens, or raw constraint payloads.
