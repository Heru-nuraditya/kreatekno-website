---
paths:
  - "site/lib/solusi/three/**"
  - "site/components/solusi/**"
  - "site/app/**/solusi/**"
---

# Three.js on the Solusi page

Applies to the 3D shop (camera, cashier, product boxes). Spec: `SOLUSI-SPEC.md` sections 2, 5, 6.

## Version and API

- `three` 0.187.x, vanilla (no React Three Fiber, no drei). Import from `three` and `three/addons/...`. `WebGLRenderer` (not `WebGPURenderer`, so no TSL/NodeMaterial).
- The installed `threejs-*` skills target r186. When an API looks off, check https://threejs.org/docs/llms.txt and the migration guide before guessing. Known traps: `Clock` is deprecated (use `Timer` and call `timer.update(t)` every frame, or elapsed stays 0); `RGBELoader` became `HDRLoader`; WebGL 1 is gone.
- Shapes from code only (Box, Capsule, Sphere, Cylinder, Torus, Extrude). Merge static geometry per material (`BufferGeometryUtils.mergeGeometries`) and use `InstancedMesh` for repeats. No model, HDR or texture files; labels and app glyphs are `CanvasTexture`s.

## Lifecycle inside React / Next.js

- The 3D lives in one client component that dynamically `import()`s the scene module after the HTML is on screen, only on `/solusi`. The server-rendered HTML (H1, shelf labels, receipt text) must work without it.
- Create the renderer, scene and loop in an effect, keep them in refs, never in the component body. The cleanup must undo everything: `renderer.setAnimationLoop(null)`, remove listeners and `ResizeObserver`/`IntersectionObserver`, dispose geometries, materials and textures, `renderer.dispose()`, remove the canvas. React StrictMode mounts twice in dev: a second canvas or a "Too many active WebGL contexts" warning means the cleanup is incomplete.
- One canvas for the shop and every shelf box (scissor/viewport per card), as in `prototype/solusi-etalase.html`.
- Handle `webglcontextlost` (stop the loop, show the static poster) and `webglcontextrestored`.

## Loop, motion and camera

- `renderer.setAnimationLoop`, driven by one `Timer`. Stop rendering when the tab is hidden or the canvas is off screen; render on demand when nothing moves.
- No allocations per frame: reuse `Vector3`/`Quaternion`/`Matrix4` scratch objects.
- Frame-rate independent easing: `THREE.MathUtils.damp(current, target, lambda, dt)` for followers, or a GSAP tween for scripted moves.
- Camera moves: tween a stored position vector and a stored look-at target vector (GSAP on their `x/y/z`), then `camera.lookAt(target)` in `onUpdate`. Never pass a new vector to `lookAt` per step (the view jumps). Keep presets (`hero`, `fokus`, portrait variants) as data in one file.
- Units are metres, Y up, the counter front edge at z = 0. Write positions as named constants, not magic numbers.
- `prefers-reduced-motion`: no idle motion, camera cuts instead of moves, poses snap.

## Debug contract (needed by `npm --prefix site run shots`, Chrome DevTools MCP and the `verify` skill)

- URL params (dev and preview builds; harmless in production):
  - `?shot`: freeze time at a fixed moment, no idle motion, no random values, so screenshots are comparable;
  - `?cam=<preset>`: jump straight to a camera preset;
  - `?hud`: overlay with fps, draw calls, triangles, pixel ratio and quality level;
  - `?quality=low|mid|high`: force a quality level;
  - `?markers`: small coloured spheres and labels at key anchors (counter edge, cashier hands, box slots).
- `window.__solusi3d = { ready: Promise<void>, info(): { calls, triangles, quality, fps, dpr }, setCam(name) }`, set once the first frame has rendered.

## Verifying 3D work

- Claude is weak at spatial reasoning: never assume something is visible or framed because the numbers look right. Check screenshots from the presets (`?cam=` + `?shot`), with `?markers` when placing things.
- Budgets (whole scene): draw calls under ~120, triangles under ~150k, cashier ~2–6k triangles, Three.js chunk ~200 KB gzip or less; LCP stays the H1 text, CLS < 0.1.
- Phones: pixel ratio capped (1.5 desktop, 1 on low quality), no shadows on low, fall back to the static poster when measured fps stays low.
