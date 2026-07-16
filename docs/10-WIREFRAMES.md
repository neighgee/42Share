# 42Share – Wireframes

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## Purpose

This document defines the intended layout of each screen.

It specifies information hierarchy and component placement.

Visual styling is defined in `06-UI_SPEC.md`.

Reusable components are defined in `11-COMPONENTS.md`.

---

## Screen 1 – Login

```text
+--------------------------------------------------+

                    42Share

          Save together.
          Order together.

            [ Continue with 42 ]

+--------------------------------------------------+
```

Rules

- Single primary action.
- No navigation.
- Vertically centred.

---

## Screen 2 – Home

```text
+--------------------------------------------------+

42Share                                  Avatar

                  [ Start Group Order ]

----------------------------------------------------

Open Orders

┌─────────────────────────────────────────────┐
│ McDonald's                                 │
│ Hosted by Benjamin Tan                     │
│                                            │
│ 2 / 10 Joined                              │
│                                            │
│ 🔥 Need 1 more person                      │
│ Everyone saves ≈ $4 if you join            │
│                                            │
│ Closing in 42 min                          │
│                              View Details →│
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Subway                                     │
│ Hosted by Sarah Lim                        │
│                                            │
│ 5 / 10 Joined                              │
│                                            │
│ ≈ $1.20 Delivery / Person                  │
│ Save ≈ $4.80 Each                          │
│                                            │
│ Closing in 1h 12m                          │
│                              View Details →│
└─────────────────────────────────────────────┘

----------------------------------------------------

Today's Recent Orders ▼

+--------------------------------------------------+
```

Rules

- Open Orders expanded.
- Recent Orders collapsed.
- Earliest expiry first.
- Restaurant name largest.
- Only one primary button.

---

## Screen 3 – Empty Home

```text
+--------------------------------------------------+

42Share                                  Avatar

                 [ Start Group Order ]

----------------------------------------------------

No active group orders.

Be the first to start one today.

+--------------------------------------------------+
```

---

## Screen 4 – Create Group Order Modal

```text
+------------------------------------------------+

Start Group Order

Restaurant *

[________________________________]

Grab Group Order Link *

[________________________________]

Estimated Total Delivery Fee

[______.__]

Closing Time *

▼ 1 hour

Notes (Optional)

[________________________________]

Cancel        Create Group Order

+------------------------------------------------+
```

Rules

- Restaurant appears first.
- Delivery fee optional.
- Closing time dropdown.
- 30-minute increments.
- Maximum 12 hours.

---

## Screen 5 – Order Details

```text
+--------------------------------------------------+

← Back

McDonald's

Hosted by Benjamin Tan

42 Login

btan

----------------------------------------------------

Participants

3 / 10

Estimated Total Delivery Fee

$6.00

Current Delivery Cost

≈ $2.00 / person

Estimated Saving

≈ $4.00

----------------------------------------------------

Notes

Ordering after cluster.

----------------------------------------------------

[ Open Grab Group Order ]

[ Count Me In ]

----------------------------------------------------

Owner Only

[ Mark as Closed ]

+--------------------------------------------------+
```

Rules

- Restaurant is page title.
- Grab button is primary.
- Count Me In hidden if:
  - already joined
  - full
  - closed
  - expired
- Mark as Closed visible only to organiser.

---

## Screen 6 – Full Order

```text
+--------------------------------------------------+

McDonald's

Hosted by Benjamin Tan

10 / 10 Joined

FULL

This order is no longer accepting members.

+--------------------------------------------------+
```

---

## Screen 7 – Recent Orders

```text
+--------------------------------------------------+

Today's Recent Orders

▼

McDonald's

Closed

Benjamin Tan

-----------------------------

Subway

Expired

Sarah Lim

-----------------------------

Din Tai Fung

Full

James Lee

+--------------------------------------------------+
```

Rules

- Read only.
- No actions.
- Today's orders only.

---

## Mobile Layout

Single-column.

Cards expand to available width.

Buttons use full width where appropriate.

Create Group Order modal occupies approximately 90% of viewport width.

---

## Layout Principles

Every screen has one obvious primary action.

Restaurant names receive the highest visual emphasis.

Supporting information never competes with the restaurant.

Whitespace is preferred over information density.

The interface should communicate status at a glance.
