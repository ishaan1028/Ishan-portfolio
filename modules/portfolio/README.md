# Portfolio module

The portfolio rendered at `/` (`app/page.tsx`). All content comes from
`content/portfolio.json`, typed by `PortfolioContent` in `types.ts`.

## Structure

```
modules/portfolio/
├── types.ts               # Content model for content/portfolio.json
├── actions/
│   └── sendMessage.ts     # Contact form Server Action (Resend)
├── lib/
│   ├── content.ts         # portfolioContent — the typed JSON
│   ├── contact.ts         # contact validation (self-check: npx tsx lib/contact.check.ts)
│   ├── images.ts          # which image srcs go through next/image optimization
│   ├── site.ts            # siteUrl for canonical links, sitemap and share image
│   └── video.ts           # getYouTubeId (self-check: npx tsx lib/video.check.ts)
└── components/
    ├── PortfolioNav.tsx   # Fixed nav, scroll spy, mobile sheet  (client)
    ├── Hero.tsx           # Availability, headline, CTAs, portrait
    ├── About.tsx          # Bio, quick facts, highlight cards
    ├── Skills.tsx         # Grouped skill tags
    ├── Experience.tsx     # Timeline + education
    ├── Projects.tsx       # Project showcase: gallery, scores, features, links
    ├── ProjectGallery.tsx # Image preview + thumbnail strip  (client)
    ├── ProjectVideo.tsx   # "Watch video" YouTube modal  (client)
    ├── Contact.tsx        # CTA panel + form
    ├── ContactForm.tsx    # Contact form, pending/error/success states  (client)
    ├── PortfolioFooter.tsx
    ├── ProfileImage.tsx   # next/image with a designed monogram fallback
    ├── FadeIn.tsx         # CSS-only entrance (above the fold)
    ├── Reveal.tsx         # IntersectionObserver reveal (below the fold) (client)
    ├── ScrollToTop.tsx    # Floating back-to-top button  (client)
    └── SectionHeading.tsx # Section shell + heading
```

Only `PortfolioNav`, `ContactForm`, `ProjectGallery`, `ProjectVideo`, `Reveal` and `ScrollToTop` are client components; everything else renders
on the server, and the whole page is statically generated at build time.

Adding a field: add it to `types.ts`, fill it in `content/portfolio.json`, and
render it in the relevant component.

## Theming

Colors are CSS variables (space-separated RGB) in `app/globals.css` (`:root`
and `.dark`), mapped to Tailwind colors in `tailwind.config.ts`. Portfolio
utilities (`bg-grid`, `text-gradient`, `.reveal`) live in
the same CSS file; animations are registered in `tailwind.config.ts`. All motion
respects `prefers-reduced-motion`.
