# 42Share – User Flows

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## 1. Purpose

This document defines the expected behaviour of the application from a user's perspective.

All flows assume the application follows the requirements defined in the PRD.

---

## Flow 1 – User Login

### Actor

42 Student

### Preconditions

- User is not authenticated.

### Trigger

User opens the application.

### Flow

1. User clicks **Continue with 42**.
2. User is redirected to 42 OAuth.
3. User authenticates successfully.
4. Application retrieves the user's profile.
5. Application creates or updates the local user.
6. Application creates a secure session.
7. User is redirected to Home.

### Result

Authenticated session created.

---

## Flow 2 – View Home

### Actor

Authenticated User

### Preconditions

Authenticated session exists.

### Trigger

Home page loads.

### Flow

1. Application validates the session.
2. Application retrieves Open Orders.
3. Application computes participant counts.
4. Application computes delivery savings.
5. Application retrieves Today's Recent Orders.
6. Home page renders.

Open Orders

- Expanded
- Sorted by earliest expiry

Recent Orders

- Collapsed
- Today's orders only

---

## Flow 3 – Create Group Order

### Actor

Authenticated User

### Trigger

User clicks **Start Group Order**.

### Flow

1. Modal opens.
2. User enters restaurant.
3. User pastes Grab Group Order URL.
4. User optionally enters Estimated Total Delivery Fee.
5. User selects Closing Time.
6. User optionally enters Notes.
7. User submits.

Application

1. Validates input.
2. Creates order.
3. Automatically registers organiser as Member #1.
4. Returns success.
5. Home refreshes.

### Result

Order immediately appears in Open Orders.

---

## Flow 4 – View Order Details

### Actor

Authenticated User

### Trigger

User selects **View Details**.

### Flow

Application displays

- Restaurant
- Organiser
- 42 Login
- Participant Count
- Estimated Total Delivery Fee
- Delivery Cost Per Person
- Estimated Savings
- Notes
- Open Grab Group Order
- Count Me In (if eligible)

---

## Flow 5 – Open Grab

### Actor

Authenticated User

### Trigger

User clicks **Open Grab Group Order**.

### Flow

Browser opens Grab.

User reviews menu.

Application state does not change.

---

## Flow 6 – Join Order

### Actor

Authenticated User

### Preconditions

- Order is OPEN.
- User has not already joined.
- Order has fewer than 10 members.

### Trigger

User clicks **Count Me In**.

### Flow

1. Application validates session.
2. Application validates membership.
3. Application creates membership.
4. Participant count updates.
5. Savings recalculate.
6. Order Details refreshes.
7. Home refreshes.

### Result

User becomes a member.

---

## Flow 7 – Automatic Full Order

### Actor

System

### Trigger

10th member joins.

### Flow

1. Membership created.
2. Participant count becomes 10.
3. Order becomes FULL.
4. Order removed from Open Orders.
5. Order appears in Today's Recent Orders.

---

## Flow 8 – Manual Close

### Actor

Organiser

### Preconditions

User owns the order.

### Trigger

User clicks **Mark as Closed**.

### Flow

1. Confirmation dialog appears.
2. User confirms.
3. Ownership validated.
4. Order closed.
5. Home refreshes.

---

## Flow 9 – Automatic Expiry

### Actor

System

### Trigger

Current time exceeds expires_at.

### Flow

1. Order becomes EXPIRED.
2. Removed from Open Orders.
3. Added to Today's Recent Orders.

---

## Flow 10 – Contact Organiser

### Actor

Authenticated User

### Trigger

User requires clarification.

### Flow

1. User opens Order Details.
2. User views organiser's 42 Login.
3. User contacts organiser externally.

42Share provides no messaging functionality.

---

## Flow 11 – Empty Home

### Trigger

No Open Orders exist.

### Display

No active group orders.

Supporting text

Be the first to start one today.

Primary Action

Start Group Order

---

## Flow 12 – Logout

### Actor

Authenticated User

### Trigger

Logout selected.

### Flow

1. Session destroyed.
2. Cookie removed.
3. Redirect Login.

---

## Error Flows

### Invalid Restaurant

Inline validation shown.

Order not created.

---

### Invalid Grab URL

Inline validation shown.

Order not created.

---

### Invalid Closing Time

Inline validation shown.

Order not created.

---

### Invalid Delivery Fee

Inline validation shown.

Order not created.

---

### Already Joined

Display

"You have already joined this order."

---

### Order Full

Display

"This group order is already full."

---

### Order Closed

Display

"This group order has closed."

---

### Authentication Expired

Redirect Login.

---

### Order Not Found

Display friendly error.

---

## Global Behaviour

- All protected actions require authentication.
- Organiser automatically becomes the first member.
- Users may only join once.
- Members cannot leave.
- Maximum members: 10.
- Savings are computed server-side.
- Countdown timers refresh every 60 seconds.
- Open Orders sort by earliest expiry.
- Recent Orders display today's orders only.
