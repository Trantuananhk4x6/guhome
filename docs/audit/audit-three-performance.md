# Audit — R8 3D scene system / R9 3D performance (items 35–44)

Scope: `docs/REQUIREMENTS.md` items 35–44 only. Method: read the code on disk, queried the live
Neon database read-only (27 `scenes` rows, 1485 `media` rows), and drove the running dev server at
`http://localhost:3000` in an isolated Playwright context (Chromium, ANGLE / Intel Iris Xe, DPR 1,
1440×900 — a real GPU, so `devicePerf()` scores `high` and every scene actually renders).
Verdicts: **MET** (proved in code *and*, where visual, in the browser) · **PARTIAL** · **MISSING**.

**Snapshot: 2026-08-20 12:25.** The three.js owner was actively rewriting this area *during* the
audit — `DepthScene.tsx` changed four times between 11:54 and 12:21, `ProceduralScene.tsx` was
replaced wholesale at 12:20, `scene-settings.ts` twice, and `src/lib/three/depth-field.ts` did not
exist when the audit began. Everything below is re-verified against the 12:25 tree; where a finding
was true earlier and is no longer, that is said explicitly. `npx tsc --noEmit` reports **zero**
errors in `src/components/three/**` and `src/lib/three/**` at the snapshot (it does report errors in
`src/app/(site)/page.tsx` and `src/app/layout.tsx`, both other owners, both mid-edit — the whole site
was returning 500 between 12:04 and 12:08 because of `layout.tsx:86`).

Tally: **MET 3 · PARTIAL 7 · MISSING 0**

| # | Requirement | Verdict |
|---|---|---|
| 35 | Reusable `InteriorScene` composed of eight limbs | MET |
| 36 | GLB / GLTF / procedural / image-derived / depth 2.5D | **PARTIAL** |
| 37 | Declarative R3F, not one imperative file | MET |
| 38 | GSAP owns transitions, R3F renders, React state UI-only | **PARTIAL** |
| 39 | Per-project scenes, paths, lighting, animation from data | **PARTIAL** |
| 40 | Suspense + lazy + dynamic import for anything importing three | **PARTIAL** |
| 41 | Draco + KTX2 wired; textures resized at build time | **PARTIAL** |
| 42 | LOD / frustum culling / optimised shadows / limited DPR | **PARTIAL** |
| 43 | Listing pages do not load heavy 3D per card | MET |
| 44 | Asset caching and disposal on unmount | **PARTIAL** |

---

## What the seeded content actually contains

Every verdict below leans on this, so it is stated once. Queried live:

```
scenes:  27  →  IMAGE 16 · DEPTH_2_5D 8 · PROCEDURAL_3D 3 · NATIVE_GLB 0
media kinds: image 1485  (zero glb, zero hdri, zero texture, zero depth)
scenes.model_media_id: NULL on all 27      scenes.depth_media_id: NULL on all 27
recon_jobs: 0 rows
distinct scenes.settings = 1 · distinct scenes.waypoints = 2 · distinct env_preset/fov/exposure = 1
```

`find public -name "*.glb" -o -name "*.gltf" -o -name "*.ktx2" -o -name "*.hdr"` → nothing.
So: **no model, no depth map, no HDRI and no compressed texture exists anywhere in this product.**
Eleven project pages carry a canvas (8 depth + 3 procedural); the other 16 scene rows are `IMAGE`.

---

## Item-by-item

### 35. Reusable `InteriorScene` — environment, camera controller, lighting, model, materials, shadows, postprocessing, interaction — **MET**

All eight limbs exist as separate components and are wired from one entry point,
`src/components/three/InteriorScene.tsx`:

| limb | component | mounted at |
|---|---|---|
| environment | `SceneEnvironment` (drei `Environment` + a local `StudioRig` of Lightformers) | `:317` |
| camera controller | `SceneCamera` (PerspectiveCamera + OrbitControls + `PanLimiter`) | `:301` |
| lighting | `SceneLighting` (ambient + hemisphere + 3 directionals) | `:318` |
| model | `ModelViewer` / `DepthScene` / `ProceduralScene`, all `React.lazy` | `:321–329` |
| materials | per-mode (relief `ShaderMaterial` `DepthScene.tsx:203`; GLB materials from the file) | — |
| shadows | `shadows={config.shadows && quality.perf !== 'low' ? 'soft' : false}` `:287`, `ContactShadows` `SceneLighting.tsx:81` | `:287` |
| postprocessing | `SceneEffects` — `EffectComposer` + `SMAA`/`Bloom`/`Vignette` `SceneEffects.tsx:35–49` | `:330` |
| interaction | `CameraPath` (scroll + tour drivers, pointer hand-off) `:302–315`; `OrbitControls` `SceneCamera.tsx:240` | `:302` |

Plus three robustness limbs the contract asks for: `SceneBoundary` (`:278`), `SceneFallback` (`:274`),
`ThreeLoader` curtain (`:343`), and an explicit `webglcontextlost` grace timer (`:232–243`).

**Consumers that actually render it on a real page** — five, all through `next/dynamic`:
`Hero3D.tsx:18/95`, `ImmersiveProject.tsx:22/269`, `ProjectHero.tsx:26/168`, `Project3D.tsx:24/237`,
and the admin `3d-assets/_components/ScenePreview.tsx:22/63`. Verified live rather than by grep:
`/` renders **two** live canvases (`[data-scene-mode]` roots at y=0 and y=7616, both `DEPTH_2_5D`),
and `/projects/ben-kia-song` renders one (canvas backing store 1309×828 for a 1310 CSS-px box).

Two honest caveats, neither a failure of 35:

* On every scene a visitor can currently reach, the **lighting and shadow limbs are switched off by
  design**. `SceneLighting.tsx:34` `const lit = !usesFlatRelief(config)` and `:60` `if (!lit) return
  null`; `SceneEnvironment.tsx:85–87` returns only a background colour for the same predicate. Since
  `usesFlatRelief` (`scene-settings.ts:281–285`) is true for all 8 depth scenes *and* all 3
  procedural scenes (none has a GLB), no shipped scene has a light in it. That is the right call —
  the photograph is drawn unlit so its own light survives — but "lighting, shadows" as delivered is
  dead weight until a GLB arrives.
* Postprocessing does run: `quality.postprocessing` is true above `low`, and the seeded
  `bloom 0.12` / `vignette 0.35` both clear the `> 0.001` gates at `SceneEffects.tsx:29–30`.

### 36. Supports GLB, GLTF, procedural scene, image-derived scene, depth-based 2.5D — **PARTIAL**

Taking the five in turn, each against a seeded project and, where one exists, against the browser.

**depth-based 2.5D — ships, and at rest it is genuinely good.** 8 seeded projects
(`ben-kia-song`, `bong-go-sam`, `buc-tuong-soi`, `dat-tho`, `hien-nhat-giua-pho`, `hoi-tho-hinoki`,
`may-trang-tang-cao`, `tram-tich-xam`). Looked at `/projects/ben-kia-song`: the EXPLORE SPACE band
renders a full-bleed photograph with correct warm colour, no black bands, no visible tessellation —
exactly the "3D invisible as technology" the brief asks for. The rework is the reason: the material
is now a bespoke unlit `ShaderMaterial` (`DepthScene.tsx:203–213`) whose fragment stage is
`gl_FragColor = texture2D(uMap, vUv)` and nothing else (`:96`), replacing a `meshStandardMaterial`
that lit the photo *and* added an emissive copy of itself; the relief comes from a 128 px,
multiply-blurred field (`src/lib/three/depth-field.ts:264–298`) so it cannot resolve into layers;
and the plane scale is measured against the live camera each frame and ratcheted up
(`DepthScene.tsx:242–273`) instead of being sized once from the viewport.
**But it has no depth map to work from.** `depth_media_id` is `NULL` on all 8, so
`hasMeasured` is false (`:124`) and the relief is inferred from the photo's own luminance at 0.85×
amplitude (`:180`) — `conditionDepthField` (`depth-field.ts:305`) never runs in this product.
And the moment the visitor does what the on-screen copy invites ("Kéo để xoay"), the illusion
breaks: one 300 px horizontal drag exposes the plane's right edge as a hard vertical cut with
~325 px (≈25% of the canvas) of black void beside it. Reproduced on three separate revisions of
`DepthScene.tsx` (11:54, 12:15, 12:21). Cause below, under TOP GAPS.

**procedural scene — no longer exists as geometry.** At 12:20 `ProceduralScene.tsx` was reduced to
three lines: `return <DepthScene image={image} depth={null} settings={settings} quality={quality} />`
(`:40–42`), with a doc comment (`:14–38`) explaining why the room box was removed. I saw the old box
first-hand before it went and can confirm the comment is accurate rather than defensive: at rest it
looked like a photograph, but one drag revealed a 6×3×8 m cream box with the photo hung flat on the
far wall and bleached copies of the same photo smeared across floor, ceiling and both side walls
(duplicate chandelier and duplicate plant clearly visible on the right wall), and the box's own
outer edges floating in the void. AUTO EXPLORE walked the camera 5.9 m into that box, shrinking the
photograph to a rectangle in the middle of an empty room. Removing it was correct. The consequence
for this requirement is still that "procedural scene" is now delivered as "the 2.5D relief", and the
real procedural path — `resolveKind` preferring a pipeline-exported GLB (`InteriorScene.tsx:67–71`)
— has nothing to prefer: `recon_jobs` is empty and no GLB exists. Verified in the browser at 12:24:
`/projects/lua-trang` reports `data-scene-mode="PROCEDURAL_3D"` with one canvas showing the flat
relief, and the same edge exposure on one drag (~320 px of void).

**image-derived scene — reaches the visitor as a still photograph, not a scene.** 16 seeded scenes
are `mode = 'IMAGE'`. `resolveKind` maps `IMAGE` to `{ kind: 'none' }` via the `default` arm
(`InteriorScene.tsx:72–74`), which makes `canRender` false (`:175–182`), so no `<Canvas>` is ever
created. Verified on `/projects/chinh-duong`: `data-scene-mode="IMAGE"` root present,
`canvas` count **0**, one `[data-scene-fallback]`. It is a `next/image` with CSS parallax
(`SceneFallback.tsx:65,108`) — perfectly good, but it is not a 3D mode.

**NATIVE_GLB — code complete, zero delivery.** `ModelViewer.tsx` is a real implementation (bounding-
box framing `:52–68`, Draco+KTX2 loader `:43–44`, shadow flags `:73–75`) and the admin exposes the
mode with a model picker (`3d-assets/_components/SceneEditor.tsx:198,480`). No scene row uses it,
`media` contains zero rows of kind `glb`, and no `.glb` exists on disk. No visitor has ever seen it.

**GLTF (as distinct from GLB) — not supported.** `MediaKind` is
`'image' | 'video' | 'glb' | 'hdri' | 'texture' | 'depth'` (`src/types/content.ts:10`) — there is no
`gltf` member — and `resolveKind` accepts a model only when `config.model.kind === 'glb'`
(`InteriorScene.tsx:59`). A `.gltf` + `.bin` + textures upload cannot be selected as a scene model.
The brief names GLTF separately; in practice only the single-file container is reachable.

Two of five modes are visible to a visitor; one is a photograph; one has been folded into another;
one is unreachable. **PARTIAL.**

### 37. Declarative R3F components, not one giant imperative three.js file — **MET**

Twelve components under `src/components/three/` (largest, `InteriorScene.tsx`, 350 lines) plus six
pure modules under `src/lib/three/`. The scene graph is JSX throughout — `<mesh>`, `<planeGeometry>`,
`<meshBasicMaterial>`, `<directionalLight>`, `<ContactShadows>`, `<EffectComposer>`. Adversarially
checked rather than assumed: a grep for `new Scene(`, `new WebGLRenderer(`, `new PerspectiveCamera(`
and `requestAnimationFrame` across `src/components/three/**` and `src/lib/three/**` returns exactly
one hit, `SceneFallback.tsx:70`, which is the **non-WebGL** DOM parallax path and touches no three
object. All imperative work is confined to `useFrame` bodies (`CameraPath.tsx:150`,
`DepthScene.tsx:242` and `:293`, `SceneCamera.tsx:145`) and to refs, which is the correct R3F idiom.
The maths is separated out and framework-free: `src/lib/three/camera-path.ts` (spline, easing table,
tour clock) imports neither React nor three.

### 38. GSAP owns camera/object/material/scene transitions; R3F owns rendering; React state only for UI — **PARTIAL**

The second and third clauses are cleanly satisfied:

* R3F owns rendering — one `<Canvas>` per scene, `dpr`/`frameloop`/`shadows`/`gl` all declarative
  (`InteriorScene.tsx:284–299`).
* **No high-frequency value is in React state anywhere.** Every `useState` in the three tree is
  discrete lifecycle: `caps`, `failed`, `ready`, `curtainDone`, `inView`, `handedOff`
  (`InteriorScene.tsx:129–133,188`), `entered` (`SceneFallback.tsx:41`), `hidden`
  (`ThreeLoader.tsx`). Grepping every `useFrame` body for `setState`/`useState` returns nothing.
  Scroll progress is a `MutableRefObject<number>` written outside React (`animations/camera.ts:58–60`).

The first clause is where it comes apart.

* **Scroll mode:** GSAP does own the drive. `useCameraScroll` runs a scrubbed
  `gsap.to(proxy, { scrollTrigger: { … scrub: smoothing, invalidateOnRefresh: true } })` inside a
  `gsap.context()` and writes the eased value into the ref (`src/animations/camera.ts:56–81`). Good.
* **The pose itself is not GSAP.** `CameraPath` samples a centripetal Catmull–Rom spline whose
  per-segment easing comes from a hand-rolled table (`camera-path.ts:40–65`, GSAP-*compatible* names,
  not GSAP), then applies frame-rate-independent exponential damping from a local `damp()`
  (`camera-path.ts:395–399`) inside `useFrame` (`CameraPath.tsx:179–199`). GSAP never touches the
  camera object.
* **Orbit / AUTO EXPLORE: GSAP is absent entirely, and the GSAP that exists there is dead code.**
  `InteriorScene.tsx:309` sets `driver={mode === 'orbit' ? 'tour' : 'progress'}`; in `'tour'` the
  parameter comes from `createTourClock` (`camera-path.ts:458–511`) and `progressRef` is never read
  (`CameraPath.tsx:169–175`). Meanwhile `Project3D` builds an infinitely repeating GSAP timeline over
  the waypoint stops that writes `progressRef.current` on every tick
  (`Project3D.tsx:105–127`) and hands that ref to `InteriorScene` in `mode="orbit"` (`:240–241`).
  Nothing reads it. This is the same defect the previous audit reported as its item-60 top gap; the
  *symptom* was fixed (the tour now walks the waypoints instead of an `autoRotate` turntable — I
  watched it do so), but the orphaned timeline was left behind, still running.
* No GSAP is used for object, material or scene transitions either: the 3D↔photo crossfades are CSS
  transitions on inline `opacity` (`InteriorScene.tsx:270–272`, `:282`).

Mechanically excellent; not what the requirement says. **PARTIAL.**

### 39. Per-project scenes, camera paths, lighting and animation all come from project data — **PARTIAL**

Nothing is hardcoded *per project* in source — that half is clean. `getSceneForProject` supplies the
row and `SceneConfig` carries `waypoints`, `settings`, `envPreset`, `envIntensity`, `exposure`,
`fov`, `shadows`, `autoExplore`, `animationSpeed`, `scrollSensitivity`, all consumed
(`InteriorScene.tsx:167–170,228,287,306,310`). But three things fall short:

**(a) For every scene currently on the site, the authored camera path is discarded.**
`waypointsFor` (`scene-settings.ts:288–291`) routes anything matching `usesFlatRelief` — which is all
8 depth scenes and all 3 procedural scenes — through `normaliseDepthWaypoints` (`:241–271`), which
keeps only `at`, `ease` and `label` and rebuilds `position`, `target` and `fov` from the fixed
`DEPTH_FRAME` constants (`:72–79`: `start: 4.6`, `end: 4.05`, `drift: 0.3`):

```ts
// src/lib/three/scene-settings.ts:259-265
const next: CameraWaypoint = {
  position: [lateral, rise, distance],
  target: [lateral * 0.4, rise * 0.4, 0],
  fov,
}
```

The rationale is sound (the seeded room-scale path aims a metre above a plane at the origin and
dollies through it), but the consequence is that item 30/31's authored camera — including anything
the admin "chụp vị trí camera" tool captures — is thrown away for the only scenes that render.

**(b) Lighting is only partly data.** `envPreset`, `envIntensity`, `exposure` and `shadows` come from
the row; the three-point rig's positions, intensities and colours are constants
(`SceneLighting.tsx:64–78`), as is the whole `StudioRig` (`SceneEnvironment.tsx:23–69`). And for
flat-relief scenes both are skipped entirely (`SceneLighting.tsx:60`, `SceneEnvironment.tsx:85`), so
`envPreset`/`envIntensity` are inert on every shipped scene.

**(c) The seed makes the whole mechanism invisible.** Across all 27 rows there is **1** distinct
`settings` blob, **2** distinct `waypoints` blobs (one empty for `IMAGE`, one shared by all eleven
3D scenes), **1** distinct `env_preset`, `fov` and `exposure`. Every scene on the site is authored
identically. Nothing a visitor or a reviewer can see demonstrates per-project variation.

Animation *is* data-driven and reaches the renderer: `animationSpeed` → `createTourClock`
(`camera-path.ts:462–467`), `scrollSensitivity` → `Hero3D.tsx:54`. **PARTIAL.**

### 40. Suspense, lazy loading, dynamic imports for anything importing three — **PARTIAL**

The machinery is complete and correct; the *gate* on it is wrong for a third of the catalogue.

**What is right, proved statically and in the browser:**

* A repo-wide grep for `from 'three'` / `@react-three/` across `src/**` returns files only under
  `src/components/three/**` and `src/lib/three/**`, plus exactly one other —
  `src/app/(admin)/admin/3d-assets/_components/camera.ts`, whose module scope is `import type` only
  and which loads R3F lazily inside the handler (documented at `:1–15`). There is no path by which
  three can be pulled into a page bundle other than through `InteriorScene`.
* All five consumers use `next/dynamic(..., { ssr: false })`: `Hero3D.tsx:18–21`,
  `ImmersiveProject.tsx:22–24`, `ProjectHero.tsx:26–29`, `Project3D.tsx:24–27`,
  `ScenePreview.tsx:22–28` (the last with a `loading:` skeleton).
* A second tier inside the boundary: `ModelViewer`, `DepthScene`, `ProceduralScene` and
  `SceneEffects` are `React.lazy` (`InteriorScene.tsx:33–36`) behind `<Suspense fallback={null}>`
  (`:320–333`), so a depth project never downloads the GLB path; `SceneEnvironment` carries its own
  `<Suspense fallback={rig}>` for the remote HDRI (`SceneEnvironment.tsx:112`).
* `/projects` ships no three at all — see item 43 for the network evidence.

**What is wrong:** both gates treat `IMAGE` as a 3D mode, so the dynamic import fires on pages that
will provably never create a canvas. `ProjectHero.tsx:125`
`const useScene = scene !== null && scene !== undefined && scene.mode !== 'NONE'` and
`Project3D.tsx:204` `if (!scene || scene.mode === 'NONE') return null`. `InteriorScene` then loads,
runs `resolveKind` → `{ kind: 'none' }` (`InteriorScene.tsx:72–74`), sets `canRender` false
(`:175–182`) and renders the photograph it could have rendered without three.

Measured on `/projects/chinh-duong` (an `IMAGE` scene) in a clean context: the browser fetched
`node_modules_three_build_three_core`, `…three_module`, `…three_module_1`, `@react-three/fiber`,
`three-stdlib` and the two `src/components/three` chunks — **3,446,361 bytes** across seven files as
served — and ended with `canvas` count **0** and one `[data-scene-fallback]`. Dev chunks are
unminified, so production would be far smaller; the point is that the whole graph is fetched and
parsed in order to decide not to use it. 16 of 27 seeded scenes are `IMAGE`, so this is 16 project
pages. That is precisely the cost this requirement exists to avoid, so **PARTIAL** rather than MET.

### 41. Draco + KTX2 decoders available and wired; textures resized at build time — **PARTIAL**

**Available — yes, self-hosted, wasm included:**
`public/draco/{draco_decoder.wasm (285 KB), draco_wasm_wrapper.js, draco_decoder.js}` and
`public/basis/{basis_transcoder.wasm (527 KB), basis_transcoder.js}`.

**Wired — yes, and correctly for drei's quirks:** `dracoLoader()` sets `/draco/` and deliberately
omits `decoderConfig` so the wasm decoder wins (`loaders.ts:24–34`); `ktx2Loader(renderer)` sets
`/basis/` and calls `detectSupport(renderer)` (`:37–45`); `configureGltfLoader` attaches both
(`:49–50`); `gltfExtender(gl)` is passed as `useGLTF`'s 4th argument in `ModelViewer.tsx:43–44`; and
`configureDreiLoaders()` runs at import time (`:66–70`) to point drei's own module-level
`DRACOLoader` at `/draco/` — necessary, because drei re-applies its own after `extendLoader`
(`node_modules/@react-three/drei/core/Gltf.js:9–23`). The KTX2 loader survives that overwrite.

**Textures resized at build time — yes, and it works end to end.** `scripts/build-media.ts:499–503`
emits one webp per `MEDIA_WIDTHS` ≤ source width; the scene asks for a per-device width
(`DepthScene.tsx:121` `mediaUrl(image, quality.textureWidth)` → 1200 / 1600 / 2400 from
`capability.ts:164,174,184`) and `mediaUrl` (`src/lib/media.ts:98–105`) resolves it to a real
derivative. Note this was the previous audit's item-10 defect and it has since been **fixed
defensively** — `lib/media.ts:44–58` now strips a trailing `-<width>.webp` before re-applying the
requested width, so the seed's concrete `/media/hoi-tho-hinoki/5-1600.webp` URLs no longer pin every
consumer to one file.

**The gap:** neither decoder has anything to decode. There is no `.glb`, no `.gltf` and no `.ktx2`
anywhere in the repo or the `media` table, and `build-media.ts` emits only `.webp` — there is no
KTX2/basis encoding step in the pipeline at all. 813 KB of decoder binaries sit in `public/` wired to
a loader (`useGLTF`) that never runs in the shipped product. **PARTIAL.**

### 42. LOD / frustum culling / optimised shadows / limited DPR — **PARTIAL**

* **Limited DPR — MET.** `dpr={quality.dpr}` (`InteriorScene.tsx:285`) from `recommendedDpr()`
  (`capability.ts:120–131`): `[1,1]` low, `[1, min(1.5, ratio)]` medium, `[1, min(2, ratio)]` high.
  Verified live: canvas backing store 1309×828 for a 1310 CSS-px element — DPR clamped to 1, no
  silent 2× overdraw. `AdaptiveDpr` is mounted below `high` (`:335`) with `performance={{min: 0.4}}`
  (`:288`).
* **Optimised shadows — MET.** Map size 512/1024/2048 by profile (`capability.ts:158,168,178`),
  `bias -0.00045`, `normalBias 0.028`, `radius 2.4` and a shadow camera fitted to the room footprint
  (`SceneLighting.tsx:45–57`), `ContactShadows frames={1}` so it bakes once (`:89`), shadows off
  entirely on `low` and on flat-relief scenes (`:36`).
* **Frustum culling — nominal only.** The single explicit line in the repo is
  `ModelViewer.tsx:75 child.frustumCulled = true`, which restates three's default. Nothing else
  culls; in fairness there is nothing to cull — every shipped scene is a single full-frame mesh.
* **LOD — MISSING.** Grep for `LOD`, `Detailed`, or any distance-based swap across
  `src/components/three/**`, `src/lib/three/**`, `src/components/projects/**` and
  `src/components/sections/**` returns **zero** hits. `DepthScene.tsx:188–193` scales segment count
  to the relief resolution and the device profile, which is a per-device budget, not level of detail
  — it never changes with camera distance.

Three of four clauses are solid; one is absent. **PARTIAL.**

Worth crediting beyond what was asked: the canvas goes to `frameloop="never"` when scrolled out of
view and back to `demand`/`always` when in (`InteriorScene.tsx:204`, IntersectionObserver at
`:154–165` with a 25% root margin), and `CameraPath` calls `invalidate()` only while the dolly is
still settling (`CameraPath.tsx:216–217`).

### 43. Project listing pages do not load heavy 3D scenes per card — **MET**

Proved in the running server, not just by reading. Loading `http://localhost:3000/projects` in a
clean context produced 38 requests; the complete `_next/static/chunks` list contains **no**
`three`, no `@react-three/*`, no `postprocessing`, no `three-stdlib`, no `InteriorScene` chunk.
Independently, I downloaded all 21 chunks the `/projects` HTML references and grepped them for
`WebGLRenderer`, `BufferGeometry`, `node_modules/three` and `react-three` — zero matches in any of
them (`gsap` and `lenis` are present, as expected). `/projects` is a server component with no three
import (`src/app/(site)/projects/page.tsx:1–16`), and `ProjectIndex` / `ProjectCard` / `ProjectGrid`
/ `RelatedProjects` use `next/image` only. The static proof under item 40 — that only
`src/components/three/**`, `src/lib/three/**` and one lazily-loading admin module import three at
all — means no listing page *can* regress into shipping it without an explicit new import.

The related waste on `/projects/[slug]` for `IMAGE`-mode scenes is recorded under item 40, not here;
this requirement is about listing pages and listing pages are clean.

### 44. Asset caching and disposal on unmount — **PARTIAL**

**Disposal on route change — proved live, and it is real.** Instrumenting
`HTMLCanvasElement.prototype.getContext` before load and then clicking the header nav from
`/projects/ben-kia-song` to `/studio` (a client-side navigation through the page-transition curtain):

```
before: contexts created 2, lost 1, canvases 1     // 2 = capability probe + the scene
after : contexts created 2, lost 2, canvases 0     // context force-lost, canvas removed
```

The probe cleans up after itself too (`capability.ts` calls `WEBGL_lose_context.loseContext()` on its
throwaway context), which is why "created 2 / lost 1" is the healthy steady state.
`THREE.WebGLRenderer: Context Lost.` was logged on every subsequent unmount across a six-cycle
bounce. Component-level disposal is thorough: `DepthScene.tsx:158–162` disposes the relief
`CanvasTexture`, `:164–168` the configured photo clone, `:170–174` releases the loader textures,
`:216–220` disposes the `ShaderMaterial`; `InteriorScene.tsx:216–223` clears the context-restore
timer. Given the app's page transition remounts scenes constantly, this matters and it works.

**Caching — thin.** Only drei's in-session suspense cache. `preloadGltf` and `preloadTextures`
(`loaders.ts:74–82`) are exported and **called from nowhere** — a grep across `src/` and `scripts/`
returns the definitions and nothing else. No scene is warmed before it mounts; the `ThreeLoader`
curtain (`ThreeLoader.tsx:27`, label `PREPARING SPACE`) covers the cold start instead.

**A real leak in the GLB path, latent only because no GLB ships.** `releaseGltf`
(`loaders.ts:133–136`) calls `useGLTF.clear(url)`, which is drei's `useLoader.clear` — it deletes the
cache entry and disposes **nothing** (`node_modules/@react-three/drei/core/Gltf.js:28`). The helper
written for exactly this, `disposeObject3D` (`loaders.ts:119–127`), is never called. `ModelViewer`
compounds it: `scene.clone(true)` (`:50`) creates a second object graph that is also never disposed.
The first project that uploads a GLB will leak its geometries, materials and textures on every route
change.

**One more risk worth a line, currently not firing.** `releaseTextures` disposes the *loader-owned*
texture (`loaders.ts:143–150`). Two scenes on one page sharing a source-image URL would kill each
other's GPU texture when the first unmounts. Today the homepage picks two different projects
(`src/app/(site)/page.tsx:58–62`), so it does not happen — but nothing prevents it.

**PARTIAL.**

---

## Corrections to earlier observations (the tree moved under this audit)

Stated so nobody chases a fixed bug:

* At 11:54 `npx tsc --noEmit` and the dev overlay both reported
  `DepthScene.tsx (185:9): the name 'amplitude' is defined multiple times`. Fixed by 12:15; the
  three system typechecks clean at the 12:25 snapshot.
* Before 12:21, `SceneEnvironment` fetched drei's `apartment` preset from
  `https://raw.githack.com/pmndrs/drei-assets/…/hdri/lebombo_1k.hdr` (with a
  `raw.githubusercontent.com` retry) on **every** scene — two cross-origin requests to third-party
  GitHub CDNs per canvas, captured in the network log. As of 12:21 `usesFlatRelief` short-circuits it
  (`SceneEnvironment.tsx:85`) and a re-run of `/projects/lua-trang` recorded **zero** non-localhost
  requests. The remote path still exists (`:100`) and will fire for any non-flat scene, i.e. the
  first GLB project, since all 27 rows carry `env_preset = 'apartment'`.
* The old room-box `ProceduralScene` is gone (12:20). My screenshots of the cream box with smeared
  photo washes describe code that no longer exists; I kept the description under item 36 only
  because it is the evidence that removing it was the right call.

---

## TOP GAPS

1. **Orbit exposes the edge of the relief plane on every EXPLORE SPACE scene — all eleven.**
   One drag of ~300 px leaves a hard vertical cut and ~25% of the canvas as black void beside the
   photograph; reproduced on both `DEPTH_2_5D` (`ben-kia-song`) and `PROCEDURAL_3D` (`lua-trang`) at
   the 12:25 snapshot. Cause: `orbitEnvelope` grants ±0.8 rad (±46°) of azimuth around the authored
   framing (`src/components/three/SceneCamera.tsx:101–102`) plus a dolly ceiling well past the
   framing distance (`:94`), while the coverage ratchet in `DepthScene.tsx:242–273` sizes the plane
   from the *centre* ray only — which under-covers badly at oblique angles, and cannot cover at all
   near grazing. A flat relief has no sides to show.
   *Remedy: in `SceneCamera.tsx`, branch on `usesFlatRelief(config)` and clamp the envelope to a few
   degrees (`minAzimuthAngle/maxAzimuthAngle` = base ± ~0.12, polar likewise) with `minDistance`
   pinned near `DEPTH_FRAME.end` — or set `enableRotate={false}` and leave the visitor dolly plus the
   limited pan. The `Kéo để xoay` copy in `Project3D.tsx:219` must change with it.*

2. **Three of the five required scene modes never reach a visitor.**
   `NATIVE_GLB`: 0 scene rows, 0 `media` rows of kind `glb`, no `.glb` on disk. Plain **GLTF**: not
   representable — `MediaKind` has no `gltf` member (`src/types/content.ts:10`) and `resolveKind`
   accepts only `kind === 'glb'` (`InteriorScene.tsx:59`). **Procedural**: `ProceduralScene.tsx:40–42`
   now delegates to `DepthScene`, and the GLB it would prefer (`InteriorScene.tsx:67–71`) will never
   exist because `recon_jobs` is empty. `IMAGE` renders no canvas at all.
   *Remedy: seed one project with a real GLB and one with a real depth map (`scripts/seed.ts`), so
   `ModelViewer`, the Draco/KTX2 wiring and `conditionDepthField` are exercised by shipped content —
   or record the scope reduction against §60/§62 explicitly.*

3. **Every `IMAGE`-mode project page downloads the whole three.js client graph to render a
   photograph.** 16 of 27 seeded scenes; measured 3,446,361 bytes across seven dev chunks on
   `/projects/chinh-duong`, ending in `canvas` count 0. Both gates are wrong:
   `ProjectHero.tsx:125` (`scene.mode !== 'NONE'`) and `Project3D.tsx:204`
   (`if (!scene || scene.mode === 'NONE') return null`).
   *Remedy: export a shared predicate next to `usesFlatRelief` in `src/lib/three/scene-settings.ts`
   — `sceneRendersCanvas(scene)` = mode is `DEPTH_2_5D | PROCEDURAL_3D | NATIVE_GLB` — and gate both
   components on it, so an `IMAGE` scene renders `SceneFallback`/`next/image` without ever touching
   the dynamic import.*

4. **The authored camera path is discarded for every scene that currently renders.**
   `waypointsFor` (`src/lib/three/scene-settings.ts:288–291`) sends all flat-relief scenes through
   `normaliseDepthWaypoints` (`:241–271`), which keeps only `at`/`ease`/`label` and rebuilds
   position, target and fov from the `DEPTH_FRAME` constants. Combined with a seed that writes one
   identical `settings` blob and one identical `waypoints` blob to all 27 rows, requirement 39 is
   satisfied in the type system and invisible in the product.
   *Remedy: two changes. In `scene-settings.ts`, preserve the authored `fov` and the authored
   relative distance ordering instead of overwriting both, so an editor's framing still reads. In
   `scripts/seed.ts`, give at least the eight featured projects distinct waypoint counts, distinct
   `displacementScale`/`parallaxStrength` and distinct `animationSpeed`, so the data path is
   demonstrable.*

5. **The GLB release path frees the cache entry but not the GPU.**
   `releaseGltf` (`src/lib/three/loaders.ts:133–136`) calls only `useGLTF.clear(url)`, which drei
   implements as a cache delete with no disposal; `disposeObject3D` (`:119–127`) — written for this —
   is never called anywhere, and `ModelViewer.tsx:50` `scene.clone(true)` adds a second graph that is
   also never disposed. Latent today because no GLB ships; it becomes a per-route-change GPU leak the
   day one does, on an app whose page transition remounts scenes constantly.
   *Remedy: in `ModelViewer.tsx:83–88`, call `disposeObject3D(model)` and
   `disposeObject3D(scene, { textures: false })` before `releaseGltf(url)`.*

6. **No LOD, anywhere.** Zero occurrences of `LOD` / `Detailed` / any distance-based swap in the
   three system. `DepthScene.tsx:188–193` budgets segments per device, which is not the same thing.
   Low practical impact while every scene is one full-frame mesh, but it is a named clause of
   item 42 with nothing behind it.
   *Remedy: either implement it where it will matter — a `<Detailed>` wrapper in
   `src/components/three/ModelViewer.tsx` keyed on camera distance, once real GLBs exist — or record
   it as consciously deferred against §15.*
