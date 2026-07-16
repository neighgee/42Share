# 42Share – Product Requirements Document (PRD)

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## 1. Purpose

42Share is an internal web application for 42 Singapore students.

Its purpose is to help students discover and coordinate Grab Group Orders with other students.

Students can:

- discover active group orders
- reduce delivery costs
- join existing group orders
- communicate with organisers using their 42 login

42Share coordinates group ordering.

It does not replace Grab.

---

## 2. Problem Statement

Students frequently order food individually because they do not know when others are ordering.

As a result:

- delivery fees are duplicated
- opportunities to save money are lost
- students miss opportunities to interact

42Share makes active food orders visible to everyone on campus.

---

## 3. Goals

The application shall:

- reduce duplicated delivery fees
- make food ordering more collaborative
- make active group orders immediately visible
- encourage interaction between students
- minimise the effort required to organise a group order
- authenticate users exclusively through 42 OAuth

---

## 4. Users

### Primary User

42 Singapore Student

There are no administrator roles.

All authenticated users have identical permissions.

---

## 5. Functional Requirements

### FR-001 Authentication

Users shall authenticate using 42 OAuth.

Successful authentication shall:

- create the local user if necessary
- update the user profile
- create a secure session

Unauthenticated users shall not access the application.

---

### FR-002 View Open Orders

Authenticated users shall view all active group orders.

Each order shall display:

- restaurant
- organiser
- participants
- estimated delivery cost per person
- estimated savings
- remaining time
- optional notes

Orders shall be sorted by earliest expiry.

---

### FR-003 Create Group Order

Authenticated users may create a group order.

Required fields

- Restaurant
- Grab Group Order URL
- Closing Time

Optional fields

- Estimated Total Delivery Fee
- Notes

Successful creation shall:

- save the order
- automatically add the organiser as the first member
- immediately display the order in Open Orders

---

### FR-004 View Order Details

Authenticated users may view:

- restaurant
- organiser
- organiser's 42 login
- estimated total delivery fee
- current participants
- estimated delivery cost per person
- estimated savings
- notes
- Grab Group Order button
- Count Me In button

---

### FR-005 Join Group Order

Authenticated users may join an active order.

Joining shall:

- register the user as a member
- increase the member count
- update savings calculations

A user may only join once.

Members cannot leave after joining.

---

### FR-006 Close Group Order

An order closes when:

- organiser manually closes it
- expiry time is reached
- ten members have joined

Closed orders disappear from Open Orders.

---

### FR-007 Recent Orders

Recent Orders contains:

- manually closed orders
- expired orders
- fully booked orders

Only orders created during the current local calendar day shall appear.

Recent Orders is collapsed by default.

---

## 6. Business Rules

Every order has exactly one organiser.

Every organiser is automatically counted as Member #1.

Maximum members:

10

When the tenth member joins:

- the order automatically closes.

Members cannot leave an order.

Orders cannot be edited.

If details change:

- close the order
- create a new one

The organiser's 42 login is displayed so students can contact them outside the application.

---

## 7. Validation Rules

### Restaurant

Required

2–100 characters

---

### Grab Group Order URL

Required

HTTPS

Must be a valid Grab Group Order URL.

---

### Closing Time

Required

Minimum

30 minutes

Maximum

12 hours

30-minute increments.

---

### Estimated Total Delivery Fee

Optional

Minimum

0

Maximum

100

Two decimal places.

---

### Notes

Optional

Maximum

250 characters.

---

## 8. Savings Calculation

Savings are estimates only.

Calculation

Delivery Per Person

Estimated Delivery Fee ÷ Member Count

Savings Per Person

Estimated Delivery Fee − Delivery Per Person

The application shall never imply these are exact Grab charges.

---

## 9. Visibility

Newly created orders immediately appear in Open Orders.

Orders remain visible until:

- manually closed
- expired
- ten members have joined

---

## 10. Non-Functional Requirements

The application shall:

- support desktop browsers
- support mobile browsers
- remain responsive
- load within two seconds
- use HTTPS

---

## 11. Out of Scope

The application shall not:

- process payments
- replace Grab
- place Grab orders
- host chat
- integrate with Slack
- verify delivery fees
- recommend restaurants
- use AI recommendations

---

## 12. Success Criteria

An authenticated student can:

- log in
- create a group order
- provide an estimated delivery fee
- join an existing order
- view live participant count
- view estimated delivery savings
- open the Grab Group Order
- contact the organiser using their 42 login
- manually close their own order

---

## 13. Future Enhancements

Potential future features

- push notifications
- Slack notifications
- ride sharing
- coffee runs
- study groups
- restaurant metadata
- analytics

These are excluded from the MVP.

---

## 14. Acceptance Criteria

The implementation is complete when every Functional Requirement is satisfied and no Out-of-Scope functionality has been implemented.
