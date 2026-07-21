# 42Share

42Share is a campus-wide web application that helps 42 Singapore students discover and coordinate Grab Group Orders. It is designed to be self-sustaining and support future brand partnerships by providing space for partner food images and logos.

## Overview

### Problem

42 Singapore students often order food individually because active group orders are not visible across campus. Group orders are usually shared only through Slack or direct messages. This makes it harder for students who are new to campus, know fewer people, or are uncomfortable posting publicly. As a result, students rarely share delivery fees beyond their immediate social circles. 42Share makes open orders easier to discover and helps more students share delivery costs.

### Outcome

42Share provides one shared place for authenticated 42 students to create, discover, join, and close Grab Group Orders. The application coordinates participation only; Grab remains responsible for food ordering, payment, and delivery.

## Demo

Recommended user flow:

1. On the login page, select **Continue with 42**.

![42Share demo screenshot 1](assets/readme_1.png)

Enter your 42 login and password.

![42Share demo screenshot 2](assets/readme_2.png)

2. On the home page, join an active order or start a new group order.

![42Share demo screenshot 3](assets/readme_3.png)

![42Share demo screenshot 4](assets/readme_4.png)

3. Create a group order by entering the required details. The delivery fee is optional.

![42Share demo screenshot 5](assets/readme_5.png)

4. The order card changes based on the user's participation.

User who has not joined:

![42Share demo screenshot 6](assets/readme_6.png)

Organiser or existing participant:

![42Share demo screenshot 7](assets/readme_7.png)

5. Review the order details.

![42Share demo screenshot 8](assets/readme_8.png)

The organiser can close the order before it expires.

![42Share demo screenshot 9](assets/readme_9.png)

6. **Today's Recent Orders** shows orders from the current day that are already closed.

![42Share demo screenshot 10](assets/readme_10.png)

## Technology Stack

### Frontend Components

- Next.js 15 App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style local primitives

### Backend Components

- Next.js Route Handlers
- Supabase PostgreSQL
- 42 OAuth
- HTTP-only signed session cookies
- Server-side validation with Zod

## Installation

Node.js 22 or newer is required. Check your version before installing:

```bash
node --version
```

```bash
npm ci
cp .env.example .env.local
```

Apply `supabase/schema.sql` to your Supabase project, then add the Supabase values and `SESSION_SECRET` to `.env.local`. To use real 42 login, also add the 42 OAuth values.

### Session secret

`SESSION_SECRET` signs the application's session cookies. Generate a strong random value:

```bash
openssl rand -base64 32
```

Copy the output into `.env.local`:

```dotenv
SESSION_SECRET=your-generated-secret
```

Keep this value private and never commit `.env.local`. Use a separate secret for each environment; changing it signs users out by invalidating existing sessions.

## Usage

```bash
npm run dev
```

Open `http://localhost:3000`.

### Development test accounts

When the app runs with `npm run dev`, the login page also offers **Test Organiser** and **Test Participant**. These development identities let one developer test multi-user behaviour without a second 42 account. Use the account switcher in the header, or log out and choose another identity.

Test login is disabled in production, where authentication uses 42 OAuth exclusively.

## Project Structure

```text
README.md             Project overview, setup, usage, and structure
.env.example          Safe environment-variable template
app/                  Next.js pages and API route handlers
components/           Reusable UI components
lib/auth/             42 OAuth and signed-session helpers
lib/database/         Supabase client setup
lib/services/         Users, orders, membership, and savings logic
lib/validation/       Server-side input validation
public/               Static images and other public assets
supabase/             Database schema
tests/                Verification notes and future test plan
types/                Shared TypeScript types
docs/                 Product and implementation specifications
docs/ai-dev/          AI tools, process, decisions, and reflection
```

## B1 Submission Notes (AI Use Documentation)

AI development notes and redacted chat logs are documented in [docs/ai-dev/README.md](docs/ai-dev/README.md).

## Constraints

42Share intentionally does not process payments, replace Grab, place orders, host chat, verify delivery fees, recommend restaurants, or implement AI recommendations. These are outside the documented MVP.

## License

See `LICENSE`.
