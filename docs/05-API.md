# 42Share – API Specification

- **Version:** 2.0
- **Status:** Approved
- **Project:** 42Share

---

## 1. Purpose

This document defines the backend API for 42Share.

Frontend components shall communicate exclusively through these endpoints.

Frontend components shall never communicate directly with the database.

---

## 2. API Principles

The API shall:

- be RESTful
- return JSON
- validate all input server-side
- validate authentication
- validate ownership
- never expose internal database models

All timestamps use ISO 8601 UTC.

Business calculations are performed on the server.

---

## 3. Authentication

Authentication uses secure HTTP-only session cookies.

Protected endpoints require a valid session.

Unauthenticated requests return

401 Unauthorized

---

## 4. Standard Response

Success

```json
{
  "success": true,
  "data": {}
}
```

Failure

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Restaurant is required."
  }
}
```

---

## 5. Authentication Endpoints

---

### GET /api/auth/login

Redirect user to 42 OAuth.

---

### GET /api/auth/callback

OAuth callback.

Flow

1. Validate OAuth code
2. Exchange token
3. Retrieve user
4. Create/update local profile
5. Create session
6. Redirect Home

---

### POST /api/auth/logout

Destroy current session.

---

### GET /api/me

Returns authenticated user.

```json
{
  "success": true,
  "data": {
    "id": 12345,
    "login": "btan",
    "displayName": "Benjamin Tan",
    "avatarUrl": "..."
  }
}
```

---

## 6. Order Endpoints

---

### GET /api/orders

Returns Open Orders.

Default sort

Earliest expiry first.

Each order returns

```json
{
  "id": "...",
  "restaurant": "McDonald's",
  "estimatedDeliveryFee": 6,
  "participantCount": 3,
  "remainingSlots": 7,
  "deliveryCostPerPerson": 2,
  "estimatedSavings": 4,
  "expiresAt": "...",
  "status": "OPEN",
  "notes": "...",
  "creator": {
    "id": 12345,
    "login": "btan",
    "displayName": "Benjamin Tan",
    "avatarUrl": "..."
  }
}
```

---

### GET /api/orders?status=recent

Returns

- CLOSED
- EXPIRED
- FULL

Only orders created during the current local calendar day.

Newest first.

---

### GET /api/orders/:id

Returns complete order details.

```json
{
  "success": true,
  "data": {
    "id": "...",
    "restaurant": "McDonald's",
    "groupOrderUrl": "...",
    "estimatedDeliveryFee": 6,
    "participantCount": 3,
    "remainingSlots": 7,
    "deliveryCostPerPerson": 2,
    "estimatedSavings": 4,
    "expiresAt": "...",
    "notes": "...",
    "status": "OPEN",
    "isMember": false,
    "creator": {
      "login": "btan",
      "displayName": "Benjamin Tan",
      "avatarUrl": "..."
    }
  }
}
```

---

### POST /api/orders

Creates a new order.

Request

```json
{
  "restaurant": "McDonald's",
  "groupOrderUrl": "...",
  "estimatedDeliveryFee": 6,
  "expiryMinutes": 120,
  "notes": "Ordering after cluster."
}
```

Successful Flow

1. Validate input
2. Create order
3. Register organiser as first member
4. Return order

---

### PATCH /api/orders/:id/close

Close order.

Only organiser.

Flow

1. Validate session
2. Validate ownership
3. Verify order still OPEN
4. Set closed_at
5. Return updated order

---

## 7. Membership Endpoints

---

### POST /api/orders/:id/join

Join an order.

Flow

1. Validate session
2. Verify order OPEN
3. Verify user has not already joined
4. Verify order has fewer than 10 members
5. Create membership
6. Recalculate computed values
7. Automatically close if member count reaches 10

Response

```json
{
  "success": true,
  "data": {
    "participantCount": 4,
    "remainingSlots": 6,
    "deliveryCostPerPerson": 1.5,
    "estimatedSavings": 4.5,
    "status": "OPEN"
  }
}
```

Possible Errors

- Already joined
- Order full
- Order closed
- Order expired

---

## 8. Computed Fields

The backend computes

- participantCount
- remainingSlots
- deliveryCostPerPerson
- estimatedSavings
- status

The frontend shall never compute business values.

---

## 9. Business Rules

The API enforces

- authentication
- ownership
- duplicate join prevention
- maximum of 10 members
- organiser automatically joins
- expiry validation
- Grab URL validation

---

## 10. Error Codes

Possible errors

- VALIDATION_ERROR
- INVALID_GRAB_URL
- INVALID_EXPIRY
- ALREADY_JOINED
- ORDER_FULL
- ORDER_CLOSED
- ORDER_EXPIRED
- ORDER_NOT_FOUND
- UNAUTHORIZED
- FORBIDDEN
- INTERNAL_SERVER_ERROR

---

## 11. Versioning

Single API version.

No version prefix.

Future versions may introduce

/api/v2/

without breaking the MVP.

---

## 12. Future Compatibility

New response fields may be added.

Existing fields should not be renamed or removed during the MVP.
