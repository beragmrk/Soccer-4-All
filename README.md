# Soccer-4-All

Custom Next.js website rebuild for Soccer-4-All, a nonprofit focused on getting quality soccer gear to underserved children.

## Stack

- Next.js 15
- React 19
- Tailwind CSS
- Vercel-ready API routes

## Features

- Custom nonprofit-focused website
- Responsive pages for Home, Mission, Impact, Stories, Get Involved, Contact, and Donate
- Smooth motion and scroll-based reveal animations
- Form handling prepared for deployment

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

Use `.env.example` as a template for deployment configuration in Vercel.

## Deploying to Vercel

1. Push this repo to GitHub
2. Import the repo into Vercel
3. Add the required environment variables
4. Redeploy

## Project Structure

```text
app/          Pages, metadata, and API routes
components/   UI components and client-side form logic
data/         Site content and structured copy
docs/         Backend and deployment setup docs
lib/          Backend helpers for validation and delivery
```

## Notes

- Keep production secrets in Vercel environment variables, not in the repository.
