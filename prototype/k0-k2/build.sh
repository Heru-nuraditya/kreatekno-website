#!/bin/sh
# src/scene.js + three + three-mesh-bvh -> one minified module inlined into ../k0-k2-3d.html
set -e
cd "$(dirname "$0")"
npx esbuild src/scene.js --bundle --minify --format=esm --target=es2020 --legal-comments=none --outfile=bundle.js --log-level=warning
node - <<'JS'
const fs = require('fs'), zlib = require('zlib');
const page = fs.readFileSync('src/page.html', 'utf8'), js = fs.readFileSync('bundle.js', 'utf8').replaceAll('</script', '<\\/script');
fs.writeFileSync('../k0-k2-3d.html', page.replace('/*BUNDLE*/', () => js));
console.log('bundle', js.length >> 10, 'KB, gzip', zlib.gzipSync(js, { level: 9 }).length >> 10, 'KB');
JS
rm -f bundle.js
