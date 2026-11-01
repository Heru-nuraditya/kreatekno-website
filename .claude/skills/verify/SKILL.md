---
name: verify
description: Verify a change to the kreatekno site before calling it done or committing - typecheck, lint, build, screenshots at 1440 and 375 with the 3D frozen, console errors, 3D budgets, and a phone performance check. Use after any change in site/, at the end of every Solusi stage, and before every commit.
---

# Verify a change

Run these in order and report the evidence (commands and their output, screenshot paths), not just "it works". Report what you did NOT check.

## 1. Code checks

```
npm --prefix site run typecheck
npm --prefix site run lint
npm --prefix site run format:check
```

Before a commit or the end of a stage, also `npm --prefix site run build` and confirm the touched routes are listed as prerendered (`○` or `◐`) in both locales.

## 2. Look at it

1. Make sure the dev server runs (Desktop: the `site` entry in `.claude/launch.json`; terminal: `npm --prefix site run dev`).
2. Screenshots, frozen and at fixed sizes:
   ```
   npm --prefix site run shots -- /solusi /solusi?cam=fokus
   ```
   Pass the routes and camera presets the change touched. Output: `.shots/*.png` (1440×900 and 375×812) and `.shots/report.json` (console errors, `window.__solusi3d.info()` per shot). The command fails on console errors.
3. Read every PNG yourself. Check against `SOLUSI-SPEC.md` (section 6) and `prototype/solusi-etalase.html`: framing per camera preset, nothing cropped or overlapping at 375, text readable, the cashier matches `.refs/HERU.png` when that changed.
4. For placement or framing bugs, add `?markers` and look again before changing numbers.
5. For a second opinion, hand the screenshots to the `visual-qa` subagent.

## 3. 3D budgets and phones (when 3D changed)

- From `report.json`: draw calls < ~120, triangles < ~150k, quality level as expected.
- With Chrome DevTools MCP: open `/solusi?hud` at 375×812, `emulate` CPU throttling 4x, record `performance_start_trace` with reload, read LCP/CLS and the fps in the HUD. LCP must stay the H1.
- Reduced motion: `npm --prefix site run shots -- --reduced-motion /solusi` shows no idle motion and a working page.

## 4. Before a commit

- `git status`: nothing from `eksperimen/`, `.refs/` or `.shots/`, no stray files.
- Hand the diff to the `spec-reviewer` subagent for the current stage of `SOLUSI-SPEC.md`; fix real gaps, ignore style.
- Commit only after Heru said the stage is OK (the commit prompts for approval).
