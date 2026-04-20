# Backend Setup

This site now has Vercel-ready form endpoints for:

- `POST /api/contact`
- `POST /api/fundraiser`
- `POST /api/partner`
- `POST /api/donation-intent`

## What happens on submit

Each route can do either or both of these:

1. Send a notification email through Resend
2. Store the submission in Supabase

The handlers are environment-driven, so you can launch with email only, database only, or both.

## Required environment variables

Add these in Vercel Project Settings -> Environment Variables:

```bash
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=Soccer-4-All <hello@soccer-4-all.org>
NOTIFICATION_EMAIL=soccer4allnow@gmail.com

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

Notes:

- `RESEND_FROM_EMAIL` must use a verified domain/sender in Resend.
- `SUPABASE_SERVICE_ROLE_KEY` must only live on the server. Do not expose it in client code.
- At least one delivery channel must be configured or the form endpoints will return an error.

## Supabase table

Run the SQL in [supabase-form-submissions.sql](/Users/esragumruk/Desktop/Soccer-4-All/docs/supabase-form-submissions.sql) inside the Supabase SQL editor.

## Donation flow

Online card payments are intentionally not wired yet. The donation page now submits a donation intent instead of collecting card details. That keeps the site honest and avoids storing sensitive payment data before Stripe is added.

## Recommended launch setup

For the first Vercel deployment:

1. Configure Resend so every submission emails the nonprofit inbox
2. Configure Supabase so submissions are saved in a dashboard-friendly table
3. Add Stripe later for real payment checkout
