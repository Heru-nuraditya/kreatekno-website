#!/usr/bin/env node
// PostToolUse hook (Edit|Write): runs the site's Prettier on the file Claude just edited, if it lives in site/.
// Plain Node (no jq), so it works in Git Bash and PowerShell on Windows. Never blocks: always exits 0.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

let input = {};
try {
  input = JSON.parse(readFileSync(0, "utf8") || "{}");
} catch {
  process.exit(0);
}

const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const raw = input.tool_input?.file_path;
if (!raw) process.exit(0);

const file = isAbsolute(raw) ? raw : resolve(root, raw);
const rel = relative(join(root, "site"), file);
if (rel.startsWith("..") || isAbsolute(rel) || rel.split(sep).includes("node_modules") || rel.startsWith(".next")) {
  process.exit(0);
}
if (!/\.(tsx?|mts|mjs|js|css|json)$/.test(file) || /package-lock\.json$/.test(file)) process.exit(0);

const prettier = join(root, "site", "node_modules", "prettier", "bin", "prettier.cjs");
if (!existsSync(prettier) || !existsSync(file)) process.exit(0);

const r = spawnSync(process.execPath, [prettier, "--write", "--log-level", "warn", file], {
  cwd: join(root, "site"),
  encoding: "utf8",
});
if (r.status !== 0 && r.stderr) process.stderr.write(`prettier: ${r.stderr.trim().split("\n").slice(-5).join("\n")}\n`);
process.exit(0);
