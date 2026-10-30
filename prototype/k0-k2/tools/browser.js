// Shared Playwright launch for render.js, frames.js and tune.js.
// playwright-core has no bundled browser: it drives the installed Chrome (PW_CHANNEL=msedge for Edge, PW_CHANNEL=chromium for a Playwright download).
// WebGL runs on SwiftShader like the container, so renders stay comparable; PW_GL=gpu uses the real GPU (ANGLE D3D11) for speed and timing.
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const GL = {
  swiftshader: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
  gpu: ['--use-gl=angle', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--enable-gpu-rasterization'],
};
const launch = () => {
  const channel = process.env.PW_CHANNEL || 'chrome', gl = process.env.PW_GL || 'swiftshader';
  return chromium.launch({ channel: channel === 'chromium' ? undefined : channel, args: GL[gl] });
};
// file:// URL that also works for Windows paths (C:\...), with the dev query string appended
const pageUrl = (file, query) => pathToFileURL(path.resolve(file)).href + '?' + query;
const outDir = d => (fs.mkdirSync(d, { recursive: true }), d);
module.exports = { launch, pageUrl, outDir };
