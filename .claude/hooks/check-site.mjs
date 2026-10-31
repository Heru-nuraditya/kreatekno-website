#!/usr/bin/env node
// Stop hook: when files in site/ changed, Claude may only finish its turn once typecheck and lint pass.
// Exit 2 sends Claude back to work with the errors (stderr). Exit 0 lets it stop.
// Skips when nothing in site/ changed, or when the same changes already passed (hash cached in .claude/.site-check).
// Skip once with SKIP_SITE_CHECK=1. Works in Git Bash and PowerShell (plain Node, no shell syntax).
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

if (process.env.SKIP_SITE_CHECK === "1") process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const run = (cmd, args) =>
  spawnSync(cmd, args, { cwd: root, encoding: "utf8", shell: process.platform === "win32", maxBuffer: 32 * 1024 * 1024 });

const status = run("git", ["status", "--porcelain", "--untracked-files=all", "--", "site"]);
if (status.status !== 0) process.exit(0); // not a git checkout: nothing to guard
const changed = status.stdout
  .split("\n")
  .map((l) => l.slice(3).trim())
  .filter((f) => /\.(tsx?|mts|css|json)$/.test(f) && !f.includes("node_modules"));
if (changed.length === 0) process.exit(0);

const diff = run("git", ["diff", "HEAD", "--", "site"]).stdout ?? "";
const untracked = changed
  .filter((f) => existsSync(join(root, f)))
  .map((f) => f + ":" + createHash("sha1").update(readFileSync(join(root, f))).digest("hex"))
  .join("\n");
const hash = createHash("sha1").update(diff + untracked).digest("hex");
const cache = join(root, ".claude", ".site-check");
if (existsSync(cache) && readFileSync(cache, "utf8").trim() === hash) process.exit(0);

for (const script of ["typecheck", "lint"]) {
  const r = run("npm", ["--prefix", "site", "run", script, "--silent"]);
  if (r.status !== 0) {
    const out = ((r.stdout ?? "") + (r.stderr ?? "")).trim().split("\n").slice(-60).join("\n");
    process.stderr.write(`\`npm --prefix site run ${script}\` gagal. Perbaiki dulu sebelum selesai:\n${out}\n`);
    process.exit(2);
  }
}
writeFileSync(cache, hash);
process.exit(0);
