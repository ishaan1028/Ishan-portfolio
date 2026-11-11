# Ishan's portfolio

Personal portfolio — a Next.js 14 app (App Router, TypeScript, Tailwind CSS).
No database. The only server code is the contact form's Server Action.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form

Messages are emailed through [Resend](https://resend.com) by the Server Action
in `modules/portfolio/actions/sendMessage.ts`. Copy `.env.example` to
`.env.local` and set:

| Variable             | Value                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `RESEND_API_KEY`     | API key from resend.com/api-keys                                  |
| `CONTACT_TO_EMAIL`   | Your inbox (your Resend account email until a domain is verified) |
| `CONTACT_FROM_EMAIL` | Optional sender; needs a verified domain                          |

Set the same variables in Vercel for production. Without them, the form shows a
friendly "email me instead" error.

## Editing content

Everything on the page — profile, about, skills, experience, projects — lives in [`content/portfolio.json`](content/portfolio.json).
Images go in `public/` and are referenced by path (e.g. `/portfolio/me.jpg`).

## Structure

| Path                 | Contents                                       |
| -------------------- | ---------------------------------------------- |
| `app/`               | Layout, page, 404, global styles               |
| `content/`           | Portfolio content (JSON)                       |
| `modules/portfolio/` | Portfolio sections — see its own README        |
| `modules/shared/`    | Theme provider and light/dark toggle           |
| `modules/ui/`        | shadcn/ui primitives (button, input, sheet, …) |
| `public/`            | Static assets                                  |

## Scripts

```bash
pnpm dev      # dev server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
pnpm format   # prettier
```
