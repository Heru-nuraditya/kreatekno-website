# Kreatekno website

@site/AGENTS.md

New kreatekno.com: a Next.js 16 app in `site/`, plus planning docs and HTML prototypes at the root.
Start from `PLAN.md` (milestones, decisions, log). Current task: the **Solusi** page (a 3D shop in Three.js), see `SOLUSI-SPEC.md`.

## Commands (repo root; PowerShell or Git Bash)

- Install: `npm --prefix site ci`, then once per machine `npm --prefix site exec playwright install chromium`
- Dev server: `npm --prefix site run dev` (http://localhost:3000). In the desktop app use the `site` entry of `.claude/launch.json`.
- Typecheck: `npm --prefix site run typecheck` (runs `next typegen` first; plain `tsc` fails on `LayoutProps`)
- Lint / format: `npm --prefix site run lint`, `npm --prefix site run format:check`
- Build: `npm --prefix site run build` (every page must prerender as static HTML in both locales)
- Screenshots: `npm --prefix site run shots -- /solusi /solusi?cam=fokus` (needs the dev server; 1440×900 + 375×812, 3D frozen, output in `.shots/`, fails on console errors)

## How Heru works with Claude (always)

- Reply in Indonesian. Plain words, no jargon without a short explanation.
- Before each stage: research current docs and best practice online, report anything that changes the plan, then ask until you are 98% sure. Only then plan, and only then build.
- Stop at the end of every stage for review: send the screenshots (desktop 1440, phone 375) in the chat and list what was checked and what was not.
- Commit only when Heru says the stage is OK (`git commit`/`git push` ask for approval). Never push to `iwilwildan/kreatekno-website`: push a branch to the fork `Heru-nuraditya/kreatekno-website` (remote `fork`; `origin` is Wildan's repo) and open a PR to Wildan's repo.
- New npm packages need Heru's approval (`npm install` asks). Propose the package, version and why first.
- Reference images (e.g. `HERU.png`) go in `.refs/` (gitignored). Google Drive only for files Heru names. Never commit reference images.

## Check your own work

- The `verify` skill is the checklist: code checks, `shots`, reading the PNGs, 3D budgets, phone performance. Run it at the end of every stage and before every commit.
- Hooks: Prettier runs on every file you edit in `site/`; a Stop hook runs typecheck + lint when `site/` changed (skip once with `SKIP_SITE_CHECK=1`).
- Subagents: `spec-reviewer` (diff against `SOLUSI-SPEC.md`, read-only) and `visual-qa` (screenshots against the spec and `HERU.png`, read-only).
- Chrome DevTools MCP (`.mcp.json`): resize, CPU throttling, performance traces, console, for phone performance checks.
- Path rules load on their own: `.claude/rules/threejs.md` (3D), `nextjs.md` (Next.js), `content.md` (copy and Solusi data). The `threejs-*` skills are API references for three.js r186.

## Boundaries

- Solusi 3D is built in code from basic shapes: no model files (GLB/FBX), no external 3D assets, and nothing imported or copied from `prototype/k0-k2/` or `eksperimen/`.
- `prototype/` holds reference HTML (never imported into `site/`); `prototype/solusi-etalase.html` is the Solusi behaviour reference. `archive/` is history only.
- `prototype/k0-k2/` is the Three.js Home take, continued by Wildan: do not change it during Solusi work.
- `eksperimen/` is Heru's local experiment folder (in `.git/info/exclude`, never committed until Heru decides). One subfolder per experiment, named `<tanggal> <Bln> - <judul singkat>`, e.g. `31 Okt - karakter heru blender`. New experiments go there; touch existing ones only when Heru asks.

## Windows gotchas

- The desktop app does not read PowerShell profiles: `node`, `npm`, `git` must be on the Windows user PATH.
- Hooks run in Git Bash (they are plain Node scripts, so PowerShell works too).
- If the `chrome-devtools` MCP server fails to start, change its command in `.mcp.json` to `cmd` with args `["/c", "npx", ...]`.
