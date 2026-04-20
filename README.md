# Soccer-4-All

Custom Next.js website rebuild for Soccer-4-All, a nonprofit focused on getting quality soccer gear to underserved children.

## Stack

- Next.js 15
- React 19
- Tailwind CSS
- Vercel-ready API routes

## Features

- Custom nonprofit-focused marketing site
- Responsive pages for Home, Mission, Impact, Stories, Get Involved, Contact, and Donate
- Smooth motion and scroll-based reveal animations
- Real form endpoints for:
  - contact inquiries
  - fundraiser requests
  - partnership inquiries
  - donation intent submissions

## Important Donation Note

Stripe is not wired yet.

The current donation page does **not** process card payments. It collects a donation intent and donor contact information only, so the site can launch safely before online checkout is finalized.

## Local Development

Install dependencies and run the app:

```bash
npm install
npm run dev
```

Preview:

```bash
http://127.0.0.1:3000
```

## Environment Variables

Copy `.env.example` and fill in the values in Vercel:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=
NOTIFICATION_EMAIL=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

## Backend Behavior

The form backend is built with Next.js route handlers in `app/api`.

Each submission can:

1. Send a notification email through Resend
2. Save the submission into Supabase

At least one of those delivery channels needs to be configured in production.

See:

- [docs/backend-setup.md](docs/backend-setup.md)
- [docs/supabase-form-submissions.sql](docs/supabase-form-submissions.sql)

## Deploying to Vercel

1. Push this repo to GitHub
2. Import the repo into Vercel
3. Add the environment variables from `.env.example`
4. If using Supabase, run the SQL in `docs/supabase-form-submissions.sql`
5. Redeploy

## Project Structure

```text
app/          Pages, metadata, and API routes
components/   UI components and client-side form logic
data/         Site content and structured copy
docs/         Backend and deployment setup docs
lib/          Backend helpers for validation and delivery
```

## Status

- Website UI: ready
- Inquiry backend: ready after env setup
- Donation processing: waiting on Stripe
