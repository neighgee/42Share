# Tests

The project does not yet have a standalone automated test suite.

Current verification uses:

```bash
npm run typecheck --cache .npm-cache
npm run lint --cache .npm-cache
npm run build --cache .npm-cache
```

These checks verify:

- TypeScript correctness.
- ESLint rules.
- Next.js production build.

Recommended additions:

- Order validation unit tests.
- Savings calculation unit tests.
- Membership duplicate-join tests.
- API route integration tests with a test database.
