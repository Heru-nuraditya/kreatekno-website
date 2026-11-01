#!/usr/bin/env node
// Screenshots for reviewing pages, especially the Three.js scene on /solusi.
//
//   npm --prefix site run shots -- /solusi /solusi?cam=fokus
//   npm --prefix site run shots -- --base http://localhost:3001 --live --gpu /solusi
//
// - Needs a running server (dev or `next start`); default base http://localhost:3000.
// - Each route is shot at 1440x900 (desktop) and 375x812 (phone, touch, DPR 2), saved to <repo>/.shots/.
// - Adds `shot` to the query string so the 3D freezes time (see .claude/rules/threejs.md), unless --live.
// - Waits for `window.__solusi3d.ready` when the page defines it, then records `window.__solusi3d.info()`.
// - Writes .shots/report.json and exits 1 when a page logs console errors or throws.
//
// Options: --base <url>  --out <dir>  --live  --gpu (headed Chrome with the real GPU)
//          --reduced-motion  --only desktop|phone  --timeout <ms>
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const flag = (name) => {
  const i = args.indexOf(name);
  if (i === -1) return false;
  args.splice(i, 1);
  return true;
};

const base = opt("--base", "http://localhost:3000").replace(/\/$/, "");
const out = resolve(opt("--out", join(here, "..", "..", ".shots")));
const only = opt("--only", "");
const timeout = Number(opt("--timeout", "20000"));
const live = flag("--live");
const gpu = flag("--gpu");
const reducedMotion = flag("--reduced-motion");
const routes = args.length ? args : ["/solusi"];

const VIEWPORTS = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  { name: "phone", viewport: { width: 375, height: 812 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
].filter((v) => !only || v.name === only);

const slug = (route) =>
  route
    .replace(/^\/+/, "")
    .replace(/[?&=]+/g, "_")
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^[-_]+|[-_]+$/g, "") || "home";

const withShot = (route) => {
  if (live) return route;
  const url = new URL(route, "http://x");
  if (!url.searchParams.has("shot")) url.searchParams.set("shot", "");
  return url.pathname + url.search.replace(/shot=(&|$)/, "shot$1");
};

mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  headless: !gpu,
  // Headless Chromium has no GPU: SwiftShader keeps WebGL working (slower, fine for stills).
  args: gpu ? [] : ["--enable-unsafe-swiftshader", "--use-angle=swiftshader", "--ignore-gpu-blocklist"],
});

const report = { base, live, reducedMotion, shots: [] };
let failed = false;

for (const route of routes) {
  for (const vp of VIEWPORTS) {
    const { name, ...ctxOpts } = vp;
    const context = await browser.newContext({ ...ctxOpts, reducedMotion: reducedMotion ? "reduce" : "no-preference" });
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));

    const target = base + withShot(route);
    const entry = { route, viewport: name, url: target, file: null, info: null, errors };
    try {
      await page.goto(target, { waitUntil: "load", timeout });
      await page.evaluate(() => document.fonts?.ready);
      entry.info = await page.evaluate(async (ms) => {
        const api = window.__solusi3d;
        if (!api) return null;
        await Promise.race([
          api.ready,
          new Promise((_, no) => setTimeout(() => no(new Error("__solusi3d.ready timed out")), ms)),
        ]);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return typeof api.info === "function" ? api.info() : null;
      }, timeout);
      const file = join(out, `${slug(route)}--${name}.png`);
      await page.screenshot({ path: file });
      entry.file = file;
    } catch (e) {
      errors.push(`shots: ${e.message}`);
    }
    if (errors.length) failed = true;
    report.shots.push(entry);
    const stats = entry.info ? ` calls=${entry.info.calls} tris=${entry.info.triangles} q=${entry.info.quality}` : "";
    console.log(
      `${errors.length ? "FAIL" : "ok  "} ${name.padEnd(7)} ${route}${stats}${entry.file ? `  -> ${entry.file}` : ""}`,
    );
    for (const err of errors) console.log(`       ${err}`);
    await context.close();
  }
}

await browser.close();
writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(`report -> ${join(out, "report.json")}`);
process.exit(failed ? 1 : 0);
