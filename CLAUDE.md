# Kreatekno website

@site/AGENTS.md

New kreatekno.com: a Next.js app in `site/`, plus planning docs and HTML prototypes at the root.
Start from `PLAN.md` (milestones, decisions, progress log). Current task: the **Solusi** page, see `SOLUSI-SPEC.md`.

## Commands (run from the repo root; work in PowerShell and Git Bash)

- Install: `npm --prefix site ci`
- Dev server: `npm --prefix site run dev` (http://localhost:3000; on a phone in the same Wi-Fi: `http://<laptop-ip>:3000`)
- Typecheck: `npm --prefix site run typecheck` (runs `next typegen` first; plain `tsc` fails on `LayoutProps`)
- Lint / format: `npm --prefix site run lint`, `npm --prefix site run format:check`
- Build: `npm --prefix site run build` (every page must prerender as static HTML in both locales)
- A Stop hook (`.claude/hooks/check-site.mjs`) runs typecheck + lint when files in `site/` changed. Skip it once with `SKIP_SITE_CHECK=1`.

## How Heru works with Claude (always)

- Reply in Indonesian. Plain words, no jargon without a short explanation.
- Before each stage: research the current docs and best practice online, report anything that changes the plan, then ask until you are 98% sure. Only then plan, and only then build.
- Stop at the end of every stage for review: send screenshots (desktop 1440, phone 375) in the chat, list what was checked and what was not.
- Heru reviews on his laptop. Commit only when he says the stage is OK. Never push to `iwilwildan/kreatekno-website`: push a branch to the fork `Heru-nuraditya/kreatekno-website` (remote `fork` in Heru's local clone; `origin` there is Wildan's repo) and open a PR to Wildan's repo.
- Reference images (e.g. `HERU.png`): Heru puts them in `.refs/` (gitignored). Use Google Drive only for files Heru names. Never commit reference images.
- Solusi 3D is built in code from basic shapes: no model files (GLB/FBX), no external 3D assets, and nothing imported or copied from `prototype/k0-k2/` or `eksperimen/`.

## Conventions and gotchas

- Next.js 16 differs from older versions: read `site/node_modules/next/dist/docs/` before writing Next.js code.
- Cache Components is on. No `new Date()`, `Math.random()`, `cookies()`, `headers()` or `searchParams` in server components unless behind `'use cache'` or `<Suspense>`; read query strings in client components inside `<Suspense>`.
- Internal links: `Link`/`getPathname` from `site/i18n/navigation.ts`, never `next/link`. New routes need an entry in `site/i18n/routing.ts` `pathnames`.
- All UI text lives in `site/messages/id.json` and `en.json` (same keys; `id.json` types them). Solusi content lives in `site/content/solusi/` (zod-checked, see `site/lib/solusi/schema.ts`).
- Tailwind's default palette is off: brand tokens only (`site/styles/globals.css`). Fonts: Bricolage Grotesque (display), Plus Jakarta Sans (body).
- Visible copy never names a platform, except on Solusi pages, which may name the apps the client sees (WhatsApp, Google Sheets...). Never name backend tools or AI models, and never describe workflow mechanics a competitor could copy (failover numbers, price/route matching, auto-cancel rules).
- Main action is "Konsultasi gratis" through `WhatsAppButton` (with a `section` prop for analytics). No prices.
- Animate only `transform` and `opacity`. Respect `prefers-reduced-motion`. Three.js and GSAP load only on the pages that use them, after the HTML.
- `prototype/` holds reference HTML (do not import it into `site/`). `archive/` is history only.
- `prototype/k0-k2/` is the Three.js Home take, continued by Wildan: do not change it during Solusi work.
- `eksperimen/` is Heru's local experiment folder (listed in `.git/info/exclude`, never committed until Heru decides). One subfolder per experiment, named `<tanggal> <Bln> - <judul singkat>`, e.g. `31 Okt - karakter heru blender`. New experiments go there; touch existing ones only when Heru asks.
