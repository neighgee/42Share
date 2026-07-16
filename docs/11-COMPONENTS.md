# 42Share – Component Specification

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## Purpose

This document defines the reusable UI components used throughout the application.

Components should be reusable, composable and presentation-focused.

Business logic belongs outside components.

---

## Component Hierarchy

```text
App

├── PageContainer
│
├── AppHeader
│
├── Home
│   ├── PrimaryButton
│   ├── Accordion
│   │   └── OrderCard
│   ├── EmptyState
│   └── LoadingSkeleton
│
├── OrderDetails
│   ├── ParticipantBadge
│   ├── SavingsCard
│   ├── UserAvatar
│   ├── PrimaryButton
│   ├── DangerButton
│   └── ConfirmDialog
│
└── CreateOrderModal
    ├── TextInput
    ├── NumberInput
    ├── TextArea
    ├── Select
    ├── PrimaryButton
    ├── SecondaryButton
    └── ErrorMessage
```

---

## Layout Components

### PageContainer

#### Purpose

Provides consistent page spacing and layout.

#### Responsibilities

- Maximum width
- Horizontal padding
- Vertical spacing
- Responsive layout

Used on

- Login
- Home
- Order Details

---

### AppHeader

#### Displays

- 42Share logo
- User avatar
- Logout button

Appears only on authenticated pages.

---

## Order Components

### OrderCard

#### Purpose

Displays a summary of an active group order.

#### Displays

- Restaurant
- Organiser
- Participant Count
- Remaining Time
- Optional Notes

Dynamic Content

Less than 3 members

Display encouragement message.

3–9 members

Display estimated savings.

10 members

Display Full.

Actions

View Details

Rules

Never display

- Grab URL
- Database IDs
- Technical information

Restaurant remains the primary heading.

---

### ParticipantBadge

#### Purpose

Displays current participation.

Example

```
3 / 10 Joined
```

Used on

- Home
- Order Details

---

### SavingsCard

#### Purpose

Displays delivery savings.

Displayed only when

participantCount ≥ 3

Displays

- Estimated Total Delivery Fee
- Current Delivery Cost
- Estimated Savings

Savings are estimates only.

---

### CountdownBadge

#### Purpose

Displays remaining order time.

Examples

- 30 min
- 1 hr
- 2 hr 30 min
- Expired

Refresh every 60 seconds.

---

### UserAvatar

Displays

- Avatar
- Display Name
- 42 Login

Fallback

First letter of display name.

---

## Form Components

### CreateOrderModal

#### Fields

- Restaurant
- Grab Group Order URL
- Estimated Total Delivery Fee
- Closing Time
- Notes

Actions

- Cancel
- Create Group Order

Rules

Restaurant appears first.

Delivery fee optional.

Closes after successful creation.

---

### TextInput

Used for

- Restaurant
- Grab Group Order URL

---

### NumberInput

Used for

Estimated Total Delivery Fee

Supports

- Two decimal places
- Positive numbers only

---

### TextArea

Used for

Notes

---

### Select

Used for

Closing Time

Values

30 minutes

↓

12 hours

30-minute increments.

---

## Button Components

### PrimaryButton

Examples

- Start Group Order
- Create Group Order
- Open Grab Group Order
- Count Me In

Filled style.

---

### SecondaryButton

Examples

- Cancel
- Back

Outlined style.

---

### DangerButton

Examples

- Mark as Closed

Always requires confirmation.

---

## Feedback Components

### ConfirmDialog

Purpose

Prevent accidental closure.

Actions

- Cancel
- Confirm

---

### LoadingSkeleton

Used on

- Home
- Order Details

Should closely resemble final layout.

---

### EmptyState

Message

"No active group orders."

Supporting text

"Be the first to start one today."

Primary Action

Start Group Order

---

### ErrorMessage

Examples

- Restaurant is required.
- Invalid Grab Group Order URL.
- Order is already full.
- You have already joined this order.

Never expose implementation details.

---

### Toast

Examples

- Order created.
- Successfully joined.
- Order closed.
- Unexpected error.

Dismiss automatically.

---

## Component Rules

Components shall

- be reusable
- receive data through props
- remain presentation-focused
- avoid duplicated UI

Components shall not

- access the database
- perform authentication
- calculate savings
- calculate participant counts
- implement business logic

---

## State Ownership

Components own only local UI state.

Business state belongs to

- Route Handlers
- Server Actions
- Services

Components display state.

They do not compute it.

---

## Naming

Components

PascalCase

Examples

- OrderCard
- SavingsCard
- ParticipantBadge
- CreateOrderModal

Props

camelCase

Examples

- participantCount
- estimatedSavings
- expiresAt
- creator

---

## Definition of Complete

The component library is complete when

- Every screen is built entirely from documented components.
- Components remain reusable.
- No duplicated UI exists.
- Business logic exists only in backend services.
