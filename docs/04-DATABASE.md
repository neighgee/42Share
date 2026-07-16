# 42Share – Database Specification

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## 1. Purpose

This document defines the database schema for 42Share.

Only the schema defined in this document may exist.

Business logic shall derive computed values from the database.

---

## 2. Database

Engine

PostgreSQL

Provider

Supabase

Timezone

UTC

Primary Keys

UUID unless otherwise specified.

Foreign Keys

Mandatory.

Soft Deletes

Not used.

---

## 3. Entity Relationship

```text
users
  │
  │ 1
  │
  └──────────────∞
                 │
               orders
                 │
                 │1
                 │
                 └──────────────∞
                                │
                         order_members
                                │
                                │∞
                                │
                                1
                             users
```

A user may create many orders.

A user may join many orders.

Every order has exactly one organiser.

---

## 4. Table: users

Purpose

Stores authenticated 42 students.

42 Intra is the source of truth.

---

### Columns

#### id

Type

BIGINT

Constraints

- Primary Key
- Required
- Immutable

Source

42 Intra User ID

---

#### login

Type

TEXT

Constraints

- Required
- Unique

Example

```
btan
```

Purpose

42 Login displayed to other students.

---

#### display_name

Type

TEXT

Required.

---

#### avatar_url

Type

TEXT

Optional.

---

#### created_at

TIMESTAMPTZ

Default

NOW()

---

#### updated_at

TIMESTAMPTZ

Automatically updated.

---

## 5. Table: orders

Purpose

Stores group orders.

---

### Columns

#### id

UUID

Primary Key.

---

#### creator_id

BIGINT

Foreign Key

users.id

---

#### restaurant

TEXT

Required

2–100 characters

---

#### group_order_url

TEXT

Required.

HTTPS.

Valid Grab Group Order URL.

---

#### estimated_delivery_fee

NUMERIC(5,2)

Optional.

Represents the organiser's estimated total delivery fee.

Example

```
6.00
```

---

#### notes

TEXT

Optional.

Maximum

250 characters.

---

#### expires_at

TIMESTAMPTZ

Required.

---

#### closed_at

TIMESTAMPTZ

Nullable.

---

#### created_at

TIMESTAMPTZ

Default

NOW()

---

#### updated_at

TIMESTAMPTZ

Automatically updated.

---

## 6. Table: order_members

Purpose

Stores membership for each group order.

A row indicates a user has committed to joining.

---

### Columns

#### order_id

UUID

Foreign Key

orders.id

Required.

---

#### user_id

BIGINT

Foreign Key

users.id

Required.

---

#### joined_at

TIMESTAMPTZ

Default

NOW()

---

### Constraints

Primary Key

(order_id, user_id)

This prevents duplicate joins.

---

## 7. Computed Values

The following values are never stored.

---

### Member Count

```
COUNT(order_members)
```

---

### Remaining Slots

```
10 - Member Count
```

---

### Delivery Cost Per Person

```
estimated_delivery_fee
÷
member_count
```

Rounded to two decimal places.

---

### Estimated Savings

```
estimated_delivery_fee
-
delivery_cost_per_person
```

Rounded to two decimal places.

---

### Order Status

OPEN

```
closed_at IS NULL

AND

expires_at > NOW()

AND

member_count < 10
```

---

CLOSED

```
closed_at IS NOT NULL
```

---

EXPIRED

```
closed_at IS NULL

AND

expires_at <= NOW()
```

---

FULL

```
member_count >= 10
```

Status Priority

1. CLOSED
2. EXPIRED
3. FULL
4. OPEN

---

## 8. Relationships

users

1

↓

orders

Many

---

orders

1

↓

order_members

Many

---

users

1

↓

order_members

Many

Deleting users is not supported.

Deleting orders is not supported.

---

## 9. Indexes

users.login

Unique

---

orders.creator_id

Index

---

orders.expires_at

Index

---

orders.created_at

Index

---

order_members.order_id

Index

---

order_members.user_id

Index

---

## 10. Validation Rules

Restaurant

2–100 characters.

---

Grab Group Order URL

HTTPS.

Valid Grab Group Order URL.

---

Estimated Delivery Fee

Optional.

0–100.

Two decimal places.

---

Closing Time

30 minutes

↓

12 hours

30-minute increments.

---

Notes

Maximum

250 characters.

---

## 11. Retention

Users

Retained indefinitely.

Orders

Retained indefinitely.

Membership records

Retained indefinitely.

Visibility is controlled by application logic.

---

## 12. Data Ownership

Users may

- create orders
- join orders
- close their own orders

Users may not

- edit orders
- join twice
- close another user's order

---

## 13. Synchronisation

User information is refreshed from 42 Intra at every successful login.

Updated fields

- login
- display_name
- avatar_url

---

## 14. Migration Rules

Any schema modification requires updates to

- PRD.md
- DATABASE.md
- API.md

No undocumented schema changes are permitted.
