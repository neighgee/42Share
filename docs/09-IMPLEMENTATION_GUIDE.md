# 42Share – Implementation Guide

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## Purpose

This document defines how the implementation agent should build 42Share.

The approved specifications in `docs/` are the source of truth.

If generated code conflicts with the documentation, the documentation is correct.

---

## Documentation Priority

Read and apply documents in the following order:

1. 01-PRD.md
2. 02-CONSTRAINTS.md
3. 03-ARCHITECTURE.md
4. 04-DATABASE.md
5. 05-API.md
6. 06-UI_SPEC.md
7. 07-USER_FLOWS.md
8. 08-TASKS.md
9. 10-WIREFRAMES.md
10. 11-COMPONENTS.md

If documents conflict:

- Stop implementation.
- Explain the conflict.
- Wait for clarification.

Do not guess.

---

## Implementation Strategy

Implement one task at a time.

Do not work on multiple tasks simultaneously.

Complete the current task before beginning the next.

Do not skip tasks.

---

## General Rules

Read every specification before writing code.

Do not invent functionality.

Do not remove documented functionality.

Do not introduce undocumented behaviour.

Prefer simplicity.

When documentation is unclear:

- Stop.
- Explain the ambiguity.
- Wait for clarification.

---

## Project Structure

Follow ARCHITECTURE.md exactly.

Do not introduce additional folders unless required by the documented architecture.

---

## Database

Follow DATABASE.md exactly.

Do not:

- add tables
- rename columns
- modify relationships

unless documentation changes.

Computed values shall never be stored.

---

## Membership

Membership is represented by the `order_members` table.

Never replace membership with a numeric counter.

Participant count shall always be derived from membership records.

Organisers automatically become the first member when an order is created.

Members cannot leave.

---

## Savings Calculation

Savings are computed.

Never store:

- participant count
- delivery cost per person
- estimated savings
- remaining slots

These values are calculated dynamically.

---

## API

Follow API.md exactly.

Validate:

- authentication
- ownership
- duplicate membership
- order availability
- business rules

Do not expose internal database models.

---

## Authentication

Authentication is performed exclusively through 42 OAuth.

Every protected route requires a valid authenticated session.

---

## User Interface

Follow UI_SPEC.md.

The interface shall remain:

- minimal
- monochrome
- uncluttered
- responsive

Restaurant names remain the primary visual element.

The Grab Group Order URL is displayed only on the Order Details page.

---

## Components

Follow COMPONENTS.md.

Components should:

- be reusable
- composable
- presentation-focused

Business logic shall never exist inside React components.

---

## Validation

Client-side validation improves usability.

Server-side validation is authoritative.

Never trust client input.

---

## Error Handling

Expected errors return meaningful messages.

Unexpected errors are logged.

Never expose implementation details.

---

## Security

Never expose:

- environment variables
- secrets
- service keys
- stack traces

Always validate:

- ownership
- authentication
- duplicate joins
- maximum member count

---

## Code Quality

Generated code shall:

- compile successfully
- pass linting
- avoid duplicated logic
- avoid dead code
- follow consistent naming

Prefer readable code over clever code.

---

## Dependencies

Do not introduce additional dependencies unless they provide significant value.

Prefer built-in Next.js functionality.

---

## Definition of Complete

Implementation is complete when:

- every task in TASKS.md is complete
- every acceptance criterion in PRD.md is satisfied
- every documented user flow functions correctly
- no mocked data remains
- no placeholder implementations remain

---

## Expected Behaviour

The implementation agent behaves like a software engineer following an approved specification.

The implementation agent shall never redesign the application.

The implementation agent shall never expand project scope.

When uncertain:

- Stop.
- Explain the issue.
- Request clarification.

Do not make assumptions.
