# 42Share – Implementation Tasks

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## Purpose

This document defines the implementation order for 42Share.

Tasks shall be completed sequentially.

Do not begin a new task until the current task satisfies its Definition of Done.

---

## Task 1 – Project Setup

### Objective

Create the project foundation.

### Deliverables

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- ESLint
- Prettier
- Environment variable support

### Definition of Done

- Project starts successfully.
- TypeScript compiles.
- Lint passes.

---

## Task 2 – Project Structure

### Objective

Create the folder structure.

### Deliverables

- app/
- components/
- lib/
- public/
- types/
- docs/

### Definition of Done

Folder structure matches ARCHITECTURE.md.

---

## Task 3 – Database

### Objective

Create the database schema.

### Deliverables

Tables

- users
- orders
- order_members

Constraints

- Foreign Keys
- Primary Keys
- Unique Constraints
- Indexes

### Definition of Done

Schema matches DATABASE.md.

---

## Task 4 – Authentication

### Objective

Implement 42 OAuth.

### Deliverables

- Login
- OAuth callback
- Session management
- Logout

### Definition of Done

Users can authenticate successfully.

---

## Task 5 – User Synchronisation

### Objective

Synchronise users from 42 Intra.

### Deliverables

Synchronise

- id
- login
- display_name
- avatar_url

### Definition of Done

Database reflects latest 42 profile.

---

## Task 6 – Order API

### Objective

Implement order endpoints.

### Deliverables

- GET /api/orders
- GET /api/orders/:id
- POST /api/orders
- PATCH /api/orders/:id/close

### Definition of Done

Endpoints satisfy API.md.

---

## Task 7 – Membership API

### Objective

Implement membership management.

### Deliverables

POST

/api/orders/:id/join

Requirements

- Prevent duplicate joins.
- Prevent joining closed orders.
- Prevent joining full orders.
- Automatically register organiser on order creation.

### Definition of Done

Membership behaves according to PRD.md.

---

## Task 8 – Savings Service

### Objective

Implement server-side savings calculations.

### Deliverables

Compute

- Participant Count
- Remaining Slots
- Delivery Cost Per Person
- Estimated Savings

Do not store computed values.

### Definition of Done

Calculations match PRD.md.

---

## Task 9 – Home Page

### Objective

Build the Home screen.

### Deliverables

Display

- Header
- Start Group Order
- Open Orders
- Recent Orders

Order Cards

Definition of Done

Layout matches UI_SPEC.md.

---

## Task 10 – Create Group Order

### Objective

Implement the Create Group Order modal.

### Deliverables

Fields

- Restaurant
- Grab Group Order URL
- Estimated Total Delivery Fee
- Closing Time
- Notes

Validation

- Client
- Server

### Definition of Done

Valid orders are successfully created.

---

## Task 11 – Order Details

### Objective

Implement the Order Details page.

### Deliverables

Display

- Restaurant
- Organiser
- 42 Login
- Participant Count
- Estimated Total Delivery Fee
- Delivery Cost Per Person
- Estimated Savings
- Notes

Buttons

- Open Grab Group Order
- Count Me In
- Mark as Closed (Owner Only)

### Definition of Done

Matches USER_FLOWS.md.

---

## Task 12 – Join Order

### Objective

Implement Count Me In.

### Deliverables

- Join endpoint integration
- Immediate UI update
- Toast notification

Disable button when

- Already joined
- Full
- Closed
- Expired

### Definition of Done

Membership updates correctly.

---

## Task 13 – Countdown & Auto Close

### Objective

Implement automatic state transitions.

### Deliverables

Countdown timer.

Automatic expiry.

Automatic closure when

participantCount == 10

### Definition of Done

Order lifecycle matches PRD.md.

---

## Task 14 – Recent Orders

### Objective

Display Today's Recent Orders.

### Deliverables

Display

- Closed
- Expired
- Full

Collapsed by default.

### Definition of Done

Only today's orders displayed.

---

## Task 15 – Error Handling

### Objective

Handle expected errors.

### Deliverables

- Validation
- Authentication
- Duplicate Join
- Order Full
- Order Closed
- Network Errors

### Definition of Done

Friendly error handling throughout application.

---

## Task 16 – Responsive Design

### Objective

Optimise layouts.

### Deliverables

Responsive

- Home
- Order Details
- Create Order Modal

### Definition of Done

Application functions correctly on desktop and mobile.

---

## Task 17 – Polish

### Objective

Prepare MVP for deployment.

### Deliverables

- Skeleton loading
- Toasts
- Accessibility review
- Final UI polish
- Remove placeholder data

### Definition of Done

Application satisfies every Acceptance Criterion in PRD.md.

---

## Completion Criteria

Implementation is complete when

- Every task satisfies its Definition of Done.
- TypeScript compiles without errors.
- Lint passes.
- No mocked data remains.
- No placeholder implementations remain.
- Application matches every specification document.
