# 42Share – Architecture Specification

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## 1. Purpose

This document defines the overall software architecture for 42Share.

It describes how the application's major components interact.

Implementation details are defined in later specifications.

---

## 2. Design Principles

The architecture shall prioritise:

- Simplicity
- Maintainability
- Predictability
- Minimal dependencies
- Server-first rendering

Every architectural decision should reduce complexity rather than increase flexibility.

---

## 3. System Overview

42Share acts as a coordination layer.

Responsibilities

42Share

- User authentication
- Group order management
- Member management
- Delivery savings calculation

Grab

- Food ordering
- Payments
- Delivery

42 Intra

- Identity provider

Communication between students occurs outside the application using the organiser's displayed 42 login.

---

## 4. Technology Stack

Frontend

- Next.js 15 (App Router)
- React
- TypeScript

Backend

- Next.js Route Handlers
- Server Actions where appropriate

Styling

- Tailwind CSS
- shadcn/ui

Database

- Supabase PostgreSQL

Authentication

- 42 OAuth

Deployment

- Vercel

---

## 5. High-Level Architecture

```text
                 Browser
                    │
                    ▼
            Next.js Application
             │              │
             │              ▼
             │         42 OAuth
             │
             ▼
      Supabase PostgreSQL
             │
             ▼
        Browser Response

Grab remains an external service.

42Share stores only the Grab Group Order URL.
```

---

## 6. Authentication Flow

1. User opens the application.
2. User selects **Continue with 42**.
3. User authenticates with 42 OAuth.
4. Application exchanges the authorization code.
5. Application retrieves the user's profile.
6. Application creates or updates the local user.
7. Application creates a secure session.
8. User is redirected to Home.

42 OAuth is the only authentication provider.

---

## 7. Request Lifecycle

Every authenticated request follows the same sequence.

```text
Browser

↓

Route Handler / Server Action

↓

Authenticate Session

↓

Validate Input

↓

Authorise Ownership

↓

Execute Business Logic

↓

Database

↓

Return Response
```

Business logic shall never bypass validation.

---

## 8. Application Structure

```text
app/
    api/
    login/
    orders/
    layout.tsx
    page.tsx

components/
    ui/
    order/
    layout/

lib/
    auth/
    database/
    services/
    validation/

types/

public/

docs/
```

---

## 9. Business Layer

Business logic belongs inside dedicated services.

Responsibilities

Authentication Service

- Login
- Logout
- User synchronisation

Order Service

- Create order
- Retrieve orders
- Close order

Member Service

- Join order
- Count members
- Prevent duplicate joins
- Automatically close full orders

Savings Service

- Calculate delivery cost per member
- Calculate estimated savings

Business logic must never exist inside React components.

---

## 10. Session Management

Sessions are managed by the application.

Requirements

- Secure
- HTTP-only cookies
- Server validated
- Destroyed on logout

The database shall not store user sessions.

---

## 11. Order Lifecycle

```text
          Create
             │
             ▼
           OPEN
          / |  \
         /  |   \
        ▼   ▼    ▼
 CLOSED EXPIRED FULL
```

OPEN

Order is accepting members.

CLOSED

Organiser manually closed.

EXPIRED

Expiry time reached.

FULL

Ten members joined.

FULL behaves identically to CLOSED.

---

## 12. Membership Lifecycle

```text
Create Order

↓

Organiser automatically becomes Member #1

↓

Member joins

↓

Member count recalculated

↓

Savings recalculated

↓

Repeat until 10 members

↓

Order automatically closes
```

Members cannot leave.

Duplicate joins are not permitted.

---

## 13. Ownership Model

Every order has exactly one organiser.

Permissions

Any authenticated user may

- View Open Orders
- View Recent Orders
- View Order Details
- Join an Open Order

The organiser may additionally

- Close their own order

No user may modify another user's order.

---

## 14. External Services

42 OAuth

Purpose

- User authentication
- User identity

Grab

Purpose

- External food ordering

42Share stores only the Grab Group Order URL.

42Share never communicates with Grab after storing the URL.

Students communicate separately using the organiser's displayed 42 login.

---

## 15. Savings Calculation

Estimated Delivery Cost Per Person

```
Estimated Delivery Fee ÷ Member Count
```

Estimated Savings Per Person

```
Estimated Delivery Fee − Delivery Cost Per Person
```

Savings are estimates only.

They are calculated dynamically.

They are never stored.

---

## 16. Error Strategy

Expected

- Authentication
- Authorisation
- Validation
- Duplicate Join
- Order Full
- Order Closed
- Resource Not Found

Unexpected

- Logged
- Generic response returned

Internal implementation details must never be exposed.

---

## 17. Security Principles

All business rules are enforced on the server.

Server validates

- Authentication
- Ownership
- Duplicate joins
- Maximum member count
- Grab URL
- Closing time

The client is never trusted.

---

## 18. Performance Principles

Prefer

- Server Components
- Server-side rendering
- Minimal client-side JavaScript

Avoid

- duplicated queries
- unnecessary API calls
- unnecessary re-renders

Countdown timers refresh every 60 seconds.

Savings calculations occur on the server.

---

## 19. Scalability

Future features should reuse the existing architecture.

Examples

- Push notifications
- Slack notifications
- Ride sharing
- Coffee runs
- Study groups

No architectural redesign should be required.

---

## 20. Design Decisions

Authentication

- 42 OAuth only

Database

- Supabase PostgreSQL

Sessions

- Application managed

Membership

- Separate relational table

Order Status

- Computed

Savings

- Computed

Communication

- Outside the application using the organiser's 42 login

Grab

- External service
- URLs stored only

Recent Orders

- Current local calendar day only

Orders

- Unlimited per organiser

Editing

- Not supported
