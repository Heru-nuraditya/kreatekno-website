---
paths:
  - "site/app/**"
  - "site/components/**"
  - "site/i18n/**"
  - "site/lib/**"
  - "site/proxy.ts"
  - "site/next.config.ts"
---

# Next.js 16 in `site/`

- This Next.js differs from older versions: read the guide in `site/node_modules/next/dist/docs/` before writing Next.js code.
- Cache Components is on. No `new Date()`, `Math.random()`, `cookies()`, `headers()` or `searchParams` in server components unless behind `'use cache'` or `<Suspense>`. Read query strings in client components inside `<Suspense>`. Every page must still prerender as static HTML in both locales (`npm --prefix site run build`).
- Internal links: `Link`/`getPathname` from `site/i18n/navigation.ts`, never `next/link`. A new route needs an entry in `site/i18n/routing.ts` `pathnames` (ID and EN slug).
- All UI text lives in `site/messages/id.json` and `en.json` (same keys; `id.json` types them through `global.d.ts`).
- Tailwind's default palette is off: brand tokens only (`site/styles/globals.css`). Fonts: Bricolage Grotesque (display), Plus Jakarta Sans (body).
- Main action is "Konsultasi gratis" through `WhatsAppButton` with a `section` prop (analytics). No prices.
- Animate only `transform` and `opacity`. Respect `prefers-reduced-motion`. Three.js and GSAP load only on the pages that use them, after the HTML.
