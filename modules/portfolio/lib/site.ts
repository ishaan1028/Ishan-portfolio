/**
 * Public origin of the site, for canonical URLs, the sitemap and share images.
 * Set NEXT_PUBLIC_SITE_URL for a custom domain; on Vercel the production
 * domain is used automatically.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);
