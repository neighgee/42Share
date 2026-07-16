# Decisions And Verification

## Technical Decisions

### Authentication

Decision: use 42 OAuth only.

Reason: required by `docs/01-PRD.md` and `docs/02-CONSTRAINTS.md`.

### Sessions

Decision: use signed HTTP-only cookies.

Reason: sessions must be application-managed, secure, server-validated, and not stored in the database.

### Database

Decision: use only `users`, `orders`, and `order_members`.

Reason: `docs/04-DATABASE.md` explicitly defines the allowed schema.

### Membership

Decision: store one row per committed member in `order_members`.

Reason: participant count must be derived from membership records. Numeric counters are not stored.

### Order Status

Decision: compute `OPEN`, `CLOSED`, `EXPIRED`, and `FULL` dynamically.

Reason: status is not stored according to the database and implementation specifications.

### Savings

Decision: compute estimated delivery cost and savings server-side.

Reason: the API specification says the frontend must not compute business values.

### UI

Decision: keep the interface monochrome, minimal, and single-column.

Reason: required by the UI specification and implementation constraints.

### B1 Documentation

Decision: add `README.md`, `docs/ai-dev/README.md`, and `docs/ai-dev/Extra/`.

Reason: the B1 Builders Programme asks for project documentation, AI usage notes, and extra AI chat logs.

## Issues Found

### Missing Node/npm

Issue: Node and npm were not installed.

Resolution: installed Node through Homebrew.

### npm Install Sandbox

Issue: npm could not access the registry or write the default home cache in the sandbox.

Resolution: used a workspace-local cache:

```bash
npm install --cache .npm-cache
```

### npm Audit Warning

Issue: `next@15.5.20` bundles `postcss@8.4.31`, which npm audit flags as moderate severity.

Resolution: did not apply `npm audit fix --force` because it proposed a breaking downgrade. The app does not accept user-supplied CSS, so the practical risk is low for this MVP.

### Hydration Mismatch

Issue: a browser extension injected an attribute into the `body` element.

Resolution: added `suppressHydrationWarning` to the root body.

### Supabase Table Missing

Issue: Supabase returned:

```text
PGRST205: Could not find the table 'public.users' in the schema cache
```

Resolution: apply `supabase/schema.sql` in the Supabase SQL Editor.

### Back Navigation

Issue: the order details page relied on browser back navigation.

Resolution: added an in-page Back button.

## Verification Commands

```bash
npm run typecheck --cache .npm-cache
npm run lint --cache .npm-cache
npm run build --cache .npm-cache
```

## Verification Results

At the time this documentation was created:

- TypeScript check passed.
- ESLint passed.
- Production build passed.

## Remaining Setup Required

Before a full demo:

1. Fill `.env.local` with Supabase and 42 OAuth credentials.
2. Apply `supabase/schema.sql` in Supabase.
3. Configure the 42 OAuth callback URL:

```text
http://localhost:3000/api/auth/callback
```

4. Start the app:

```bash
npm run dev --cache .npm-cache
```
