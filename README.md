# Ishan's portfolio

Personal portfolio — a frontend-only Next.js 14 app (App Router, TypeScript,
Tailwind CSS). No backend, database or environment variables needed.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

Everything on the page — profile, stats, skills, experience, projects,
testimonials — lives in [`content/portfolio.json`](content/portfolio.json).
Images go in `public/` and are referenced by path (e.g. `/portfolio/me.jpg`).

## Structure

| Path                 | Contents                                         |
| -------------------- | ------------------------------------------------ |
| `app/`               | Layout, page, 404, global styles                 |
| `content/`           | Portfolio content (JSON)                         |
| `modules/portfolio/` | Portfolio sections — see its own README          |
| `modules/shared/`    | Theme provider and light/dark toggle             |
| `modules/ui/`        | shadcn/ui primitives (button, sheet, dropdown)   |
| `public/`            | Static assets                                    |

## Scripts

```bash
pnpm dev      # dev server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
pnpm format   # prettier
```
