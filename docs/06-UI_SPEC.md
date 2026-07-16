# 42Share – UI Specification

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## 1. Purpose

This document defines the visual language of 42Share.

It establishes the design system, layout rules and interaction principles.

Implementation details belong in WIREFRAMES.md and COMPONENTS.md.

---

## 2. Design Philosophy

42Share is an internal productivity tool.

The interface should feel:

- modern
- calm
- lightweight
- trustworthy
- fast

Reference products

- Uber
- Linear
- Notion
- Stripe Dashboard

Avoid visual clutter.

---

## 3. Design Principles

Every screen should answer one primary question.

Restaurant names receive the highest visual emphasis.

Important information should be understood within five seconds.

Whitespace is preferred over dense layouts.

Actions should always be obvious.

---

## 4. Colour Palette

Background

White

Primary Text

Near Black

Secondary Text

Neutral Grey

Borders

Light Grey

Primary Buttons

Black

Danger

Red

The interface remains predominantly monochrome.

---

## 5. Typography

Font

Inter

Hierarchy

1. Restaurant Name
2. Section Titles
3. Delivery Savings
4. Supporting Information
5. Labels

Avoid excessive bold text.

---

## 6. Layout

Maximum Width

960px

Single-column layout.

Desktop and mobile use the same structure.

No sidebar.

---

## 7. Navigation

Application contains three screens.

- Login
- Home
- Order Details

Create Group Order opens as a modal.

---

## 8. Home

Layout

Header

↓

Start Group Order

↓

Open Orders

↓

Today's Recent Orders

Open Orders

Expanded.

Sorted by earliest expiry.

Recent Orders

Collapsed.

Contains only today's orders.

---

## 9. Order Card

Displays

- Restaurant
- Organiser
- Participant Count
- Remaining Time
- Optional Notes

Dynamic Status

One Member

Display

"Be the first to join."

Two Members

Display

"Need 1 more person to unlock delivery savings."

Three to Nine Members

Display

Current Delivery Cost

≈ $2.00 / person

Estimated Saving

≈ Save $4.00

Ten Members

Display

Full

The restaurant name remains the most visually prominent element.

---

## 10. Create Group Order

Fields

Restaurant *

Grab Group Order URL *

Estimated Total Delivery Fee

Closing Time *

Notes

Restaurant appears first.

Closing Time uses a dropdown.

Allowed values

30 minutes

↓

12 hours

30-minute increments.

---

## 11. Order Details

Display

Restaurant

Organiser

42 Login

Participant Count

Estimated Total Delivery Fee

Current Delivery Cost Per Person

Estimated Savings

Notes

Actions

Open Grab Group Order

↓

Count Me In

Count Me In is disabled if

- already joined
- full
- closed
- expired

Organiser additionally sees

Mark as Closed

---

## 12. Savings Display

Savings are estimates.

Display only when

participantCount ≥ 3

Example

Current Delivery

≈ $2.00 / person

You Save

≈ $4.00

Below this display

Estimated from organiser's delivery fee.

---

## 13. Empty States

When no Open Orders exist

Display

"No active group orders."

Supporting text

"Be the first to start one today."

Display

Start Group Order

button.

---

## 14. Forms

Labels always remain visible.

Required fields clearly indicated.

Validation appears beneath the field.

Never rely solely on browser validation.

---

## 15. Buttons

Primary

Filled Black

Secondary

Outlined

Danger

Red

Only one primary action per screen.

---

## 16. Loading States

Lists

Skeleton cards.

Buttons

Spinner.

Avoid layout shift.

---

## 17. Error States

Errors should explain the problem.

Examples

- Unable to join order.
- Order is already full.
- You have already joined this order.
- Authentication expired.

Avoid technical language.

---

## 18. Toast Notifications

Display for

- Order created
- Successfully joined
- Order closed
- Unexpected error

Dismiss automatically.

---

## 19. Icons

Use Lucide Icons.

Icons supplement labels.

Never replace labels.

---

## 20. Motion

Animations

150–200ms

Permitted

- Fade
- Scale
- Slide

Avoid unnecessary motion.

---

## 21. Accessibility

Keyboard accessible.

Visible focus states.

Alternative text for images.

Information shall never rely solely on colour.

---

## 22. Responsive Behaviour

Desktop

Single-column.

Mobile

Single-column.

Cards occupy available width.

Modal width

Approximately 90% of viewport.

---

## 23. Information Hierarchy

Order Cards

1. Restaurant
2. Delivery Cost / Savings
3. Participant Count
4. Remaining Time
5. Organiser
6. Notes

The Grab Group Order URL is never displayed on summary cards.

---

## 24. Design Goals

The interface should communicate

"I can save money by joining this order."

Every interaction should encourage participation while remaining uncluttered.

Students should immediately understand:

- how many people have joined
- how much they could save
- whether the order is still available
