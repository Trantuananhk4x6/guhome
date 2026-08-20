# Audit — R5 Motion architecture / R6 Hero / R7 Camera (items 20–34)

Scope: `docs/REQUIREMENTS.md` items 20–34 only. Method: read the code on disk, read the live Neon
rows, and drive the **running** dev server at `http://localhost:3000` with Playwright. Three browser
instruments were used and are quoted below as evidence:

* **React commit counting** — a stub `window.__REACT_DEVTOOLS_GLOBAL_HOOK__` installed before page
  load, counting `onCommitFiberRoot` per React root. This separates the app root (`containerInfo`
  is `document`) from the Next dev-overlay root (`NEXTJS-PORTAL`) and from R3F's own reconciler.
* **Camera sampling** — `window.__THREE_DEVTOOLS__` (three.js dispatches `observe` to it from the
  `WebGLRenderer` and `Scene` constructors), then wrapping `renderer.render(scene, camera)` to read
  `camera.position` / `camera.fov` every frame. No app code was modified.
* **Reduced motion** — a Playwright browser context created with `reducedMotion: 'reduce'`, compared
  against an identical `no-preference` context.

Verdicts: **MET** (proved in code *and*, where visual, in the browser) · **PARTIAL** ·
**MISSING**.

Tally: **MET 9 · PARTIAL 6 · MISSING 0**

Note on conditions: the tree is being edited by other agents while this ran. `http://localhost:3000`
returned 500 for several minutes mid-audit on an in-flight `src/app/layout.tsx` edit
(`next/font` called with `subsets: [...SUBSETS]` — "Unexpected spread"). That is a build-in-flight
state, not counted as a finding. Every line number below was re-read after the tree settled.

---

## R5 Motion architecture

### 20. Centralised `src/animations/` modules — gsap, config, scroll, reveal, text, image, pageTransition, camera, projects; no scattered ad-hoc GSAP — **PARTIAL**

All nine named modules exist and the single-entry rule holds hard: `src/animations/gsap.ts:9-11` is
the **only** file in the repo that imports from the `gsap` package, and it re-exports
`gsap`/`ScrollTrigger`/`SplitText` for everyone else. The motion vocabulary is real, not decorative —
`config.ts` `DURATION`/`EASE`/`STAGGER`/`DISTANCE` plus `dist()`/`dur()` (`:173`, `:178`) which scale
every travel and duration by the admin dials.

Two things stop this being a clean MET.

**(a) The declarative wrappers are duplicated four times and the canonical ones are dead.**
`src/components/animation/{Reveal,TextReveal,Parallax}.tsx` exist, are exported from the barrel
(`src/components/animation/index.ts`) and have **zero importers**. The only imports of that barrel
anywhere are:

```
src/components/projects/RelatedProjects.tsx:26  import { HorizontalScroll } from '@/components/animation'
src/app/layout.tsx:15                           import { PageTransition } from '@/components/animation/PageTransition'
```

Meanwhile four route folders each carry their own near-identical copy —
`src/app/(site)/contact/_components/motion.tsx:23`, `journal/_components/motion.tsx:28`,
`services/_components/motion.tsx:28`, `studio/_components/motion.tsx:23` — all four defining
`Reveal` as `useRef` + `useReveal(ref, {variant, delay, stagger})` + `<div data-reveal>`, i.e.
exactly `src/components/animation/Reveal.tsx:70`. `<Reveal>` appears at 33 call sites across
`/studio`, `/services`, `/journal`, `/contact`; not one of them resolves to the shared component.
`useRevealGroup` (`reveal.ts:119`) also has no consumer at all.

**(b) Nine components call GSAP directly.** `PageTransition.tsx:23`, `CustomCursor.tsx:5`,
`Header.tsx:7`, `MobileMenu.tsx:6`, `ScrollProgress.tsx:5`, `BeforeAfter.tsx:19`,
`Project3D.tsx:16`, `ProjectMaterials.tsx:13`, `ThreeLoader.tsx:6`. Most are defensible — bespoke
chrome with no shared hook to own it, all using the `EASE`/`DURATION` tokens and `gsap.context()`.
One is not: `Project3D.tsx:105` builds a `gsap.timeline({ repeat: -1 })` that nothing reads (see 33).

Observation, not a verdict: `PageTransition.tsx:73-76`, `:92`, `:101-102` still carry
`// TEMP-AUDIT` debug instrumentation writing into `window.__PTLOG`. It ships to every page.

### 21. The seven reusable hooks exist — and each has a real consumer — **MET**

Every one of the seven is called from a component that a visitor actually reaches. Named consumers:

| hook | definition | a consumer that really renders |
|---|---|---|
| `useReveal` | `animations/reveal.ts:33` | `Hero3D.tsx:69` (homepage hero foot), plus 32 other sites |
| `useTextReveal` | `animations/text.ts:30` | `Hero3D.tsx:63` (the `<h1>`), `Philosophy.tsx:21`, `ProjectHero.tsx:78` |
| `useImageReveal` | `animations/image.ts:30` | `Journal.tsx` frame, `StudioIntro.tsx:33`, `ProjectFigure.tsx:102` |
| `useParallax` | `animations/image.ts:115` | `FeaturedProjects.tsx:36` (`strength: 0.45`), `Philosophy.tsx:25` |
| `useHorizontalScroll` | `animations/projects.ts:36` | `HorizontalScroll.tsx:38` ← `RelatedProjects.tsx:136` ← `ProjectBlocks.tsx:446` |
| `useCameraScroll` | `animations/camera.ts:29` | `Hero3D.tsx:57`, `ImmersiveProject.tsx:150` |
| `useProjectTransition` | `animations/projects.ts:115` | `ProjectCard.tsx:59` |

The horizontal rail is the one the previous audit found orphaned; it now ships. Measured on
`/projects/hoi-tho-hinoki` at 1440×900: `[data-horizontal-track]` `scrollWidth` **3080 px** against a
1440 px viewport, 6 cards, section `overflow-x: hidden`, and after a 700 px scroll the track read
`matrix(1, 0, 0, 1, -699.4, 0)` with the section pinned at `top: 0` and **1** `.pin-spacer` in the
document. Width is measured, never hardcoded (`projects.ts:59`
`track.scrollWidth - window.innerWidth + endPadding`, inside `invalidateOnRefresh: true`).

`useRevealGroup` (`reveal.ts:119`) is exported and unused — it is not one of the seven, so it does
not affect the verdict, but it is dead surface.

### 22. GSAP plugins registered exactly once, centrally — **MET**

`src/animations/gsap.ts:22` `gsap.registerPlugin(ScrollTrigger, SplitText)` is the only
`registerPlugin` call in the repo, guarded by the module-level `registered` flag (`:14`) and an
SSR guard. `registerGsap()` is called from 21 sites — all idempotent no-ops after the first.
Studio defaults are set once at the same point: `gsap.defaults({ ease: EASE.out, duration:
DURATION.base })` (`:24`), `ScrollTrigger.config({ ignoreMobileResize: true })` (`:29`),
`ScrollTrigger.defaults({ start: 'top 82%', … })` (`:30`).

### 23. One global Lenis; Lenis → rAF → GSAP ticker → `ScrollTrigger.update` — **MET**

`src/animations/scroll.ts` is the only importer of `lenis` (`:14`) and the only `new Lenis` (`:67`),
constructed with `autoRaf: false` so GSAP owns the clock. The chain is exactly the one the
requirement names:

```
scroll.ts:87   instance.on('scroll', onScroll)   // onScroll → ScrollTrigger.update()  (:85)
scroll.ts:92   gsap.ticker.add(tick)             // tick → instance.raf(time * 1000)
scroll.ts:93   gsap.ticker.lagSmoothing(0)
```

A module-level `activeLenis` (`:27`) plus `getLenis()`/`scrollToTop()` gives non-hook callers the
same single instance rather than letting them make another. Teardown restores everything
(`:99-104`: ticker removed, `lagSmoothing(500, 33)` restored, listener off, `instance.destroy()`,
singleton cleared).

Browser: on `/` the document carries `html.lenis` and exactly one instance's classes. Under
`reducedMotion: 'reduce'` the class is **absent** — `scroll.ts:61`
`const smooth = motion.enabled && motion.scrollSmoothing && !reduced` never constructs it, which is
the correct outcome, not a suppressed instance.

### 24. ScrollTrigger recalculates on resize **and** font load; mobile-safe; destroyed on unmount — **MET**

All four clauses, in one effect that runs whether or not Lenis exists (`scroll.ts:110-148`):

* resize — `:135` `window.addEventListener('resize', onResize)`, debounced 180 ms (`:117`,
  `SCROLL.refreshDebounce`).
* **mobile-safe** — `:125-133`: on `(pointer: coarse)` a resize whose `innerWidth` is unchanged is
  ignored, because mobile browsers fire `resize` every time the URL bar collapses; real rotation
  still arrives via `orientationchange` (`:136`). Reinforced by `ScrollTrigger.config({
  ignoreMobileResize: true })` at `gsap.ts:29`.
* **font load** — `:139` `fonts.addEventListener('loadingdone', refresh)` *and* `:140`
  `void fonts.ready.then(() => ScrollTrigger.refresh())`. Separately, `useTextReveal` will not split
  a heading until fonts settle (`internal.ts:70` `whenFontsReady`, 500 ms ceiling), so line breaks
  are measured against real Cormorant metrics.
* **destroy on unmount** — `:142-147` removes every listener and clears the timer; every hook wraps
  its tweens in `gsap.context()` and calls `ctx.revert()` (`reveal.ts`, `text.ts`, `image.ts`,
  `camera.ts:79`, `ScrollProgress`, `Header`), and `useHorizontalScroll` reverts its `matchMedia`
  scope (`projects.ts:82`). `PageTransition.tsx:118` re-refreshes after each route swap.

Browser leak probe: four client-side navigations `/ → /projects → / → /projects → /` left
`.pin-spacer` count at 0 on the homepage before and after, and total element count 770 → 792 (page
content differs; no linear growth).

### 25. The full `MotionConfig` surface is honoured — nothing decorative — **MET**

All nine flags are exposed in the admin (`src/components/admin/site/contracts.ts:93` `MOTION_TOGGLES`
plus the master switch and the reduced-motion select in `ThemeEditor.tsx:192`/`:200`) and every one
has a real consumer:

| flag | honoured at |
|---|---|
| `enabled` | `lib/motion.ts:98` `if (!config.enabled) return false` — short-circuits every other flag; also `projects.ts:52`, `BeforeAfter.tsx:69`, `Header.tsx:45`, `MobileMenu.tsx:38`, `CustomCursor.tsx:64`, `RelatedProjects.tsx:108` |
| `reducedMotion` | `lib/motion.ts` `resolveReduced` (auto/force/off) → `motionFlag`, `scroll.ts:61`, `InteriorScene.tsx:140` |
| `scrollSmoothing` | `scroll.ts:61` (sole gate on Lenis) |
| `pageTransition` | `PageTransition.tsx:37`, `projects.ts:171` (card→fullscreen) |
| `textReveal` | `text.ts:41` |
| `imageReveal` | `image.ts:50`, `ProjectMaterials.tsx:43` |
| `parallax` | `image.ts:128`, and `reveal.ts:58` routes the `revealParallax` variant to the parallax flag rather than the master one |
| `threeDAnimation` | `InteriorScene.tsx:141` → `canRender` (`:180`) — false means no canvas at all |
| `cameraAnimation` | `camera.ts:50` (parks progress at 0), `InteriorScene.tsx:142` → `pathDriven` (`:200`) |

Plus the two dials: `intensity` → `config.ts:173` `dist()`, `transitionSpeed` → `:178` `dur()` and
`:188` `curtainDuration()` (clamped to the 0.8–1.2 s brief). Every hook takes `config` and `reduced`
as **effect dependencies** (`reveal.ts:45-46` etc.), so an admin change re-arms live animations
rather than waiting for a remount.

### 26. Admin can disable animation globally; `prefers-reduced-motion` reduces camera, parallax, large transforms and page transitions — **MET**

**Admin path (proved by construction, not by writing to the DB — this is a read-only audit).**
`app/layout.tsx:87` `<Providers motion={theme.motion}>` seeds the store during render
(`Providers.tsx:30`), `ScrollProvider` republishes it (`scroll.ts:57-59`), and
`ThemeEditor.tsx:192` writes `motion.enabled`. The DB currently holds
`{"enabled":true,"reducedMotion":"auto",…}` in `theme_settings.motion`. `enabled:false` enters
`motionFlag` at exactly the same first line (`lib/motion.ts:98`) that the reduced-motion test below
exercises, and `scroll.ts:61` ANDs it into `smooth`, so the same observable outcome follows.

**Reduced motion — measured for real.** Two Playwright contexts, identical except for
`reducedMotion`:

| observation on `/` | `no-preference` | `reduce` |
|---|---|---|
| `matchMedia('(prefers-reduced-motion: reduce)')` | false | true |
| `html.lenis` | **true** | **false** — no Lenis instance |
| `<canvas>` elements | **2** | **0** — no WebGL anywhere |
| `[data-split-line]` (SplitText output) | **13** | **0** — no text splitting |
| `[data-reveal][data-reveal-ready]` | 29 / 29 | 34 / 34 — all copy visible, nothing stuck at `opacity: 0` |
| `IMMERSIVE_PROJECT` outer class | `relative h-[300vh]` (pinned) | `bg-espresso py-[var(--spacing-section)]` (stacked, no pin) |
| hero camera, scroll 0 → 800 | `[0, 0.096, 4.6]` → `[0.013, 0.097, 4.052]` | no canvas to move |

So: camera movement gone, parallax gone (`image.ts:128`), large transforms gone
(`config.ts:173` `dist()` → 0 via `motionIntensity()`), page transitions gone
(`PageTransition.tsx:37`), pinning gone, and — importantly — nothing is left invisible: every
`markReady()` path fires (`internal.ts:27`), backed by the CSS escape at `globals.css:183`
`[data-reveal]:not([data-reveal-ready]) { opacity: 1 }` inside the reduced-motion media query.

The one-shot-store-snapshot bug the previous audit found is fixed: `CustomCursor.tsx:63-64` and
`Header.tsx:45` now use `useReducedMotion()` / `useMotionFlag('enabled')` reactively.

---

## R6 Hero

### 27. `<Hero3D />` at 100vh — ThreeCanvas (camera, environment, lights, model, postprocessing) + overlay (logo, nav, heading, CTA) + scroll indicator — **MET**

`src/components/sections/Hero3D.tsx:89` `h-[100svh] min-h-[34rem]` — measured 900 px in a 900 px
viewport. `:95` renders `InteriorScene` through `next/dynamic({ ssr: false })` (`:18-21`), which
composes the full rig: `SceneCamera` (`InteriorScene.tsx:301`), `SceneEnvironment` (`:317`),
`SceneLighting` (`:318`), the mode-specific model — `ModelViewer` / `DepthScene` /
`ProceduralScene` (`:321-329`) — and postprocessing `SceneEffects` (`:330`, bloom + vignette + SMAA).
Browser: 2 canvases on `/`, hero wrapper `data-scene-mode="DEPTH_2_5D"`.

Overlay: heading `<h1>` at `:142`, description + CTA at `:155-159`, eyebrow `Label` at `:131`, and
the scroll indicator at `:163-168` (a "Cuộn" label plus a hairline whose 6 px accent runs the
`an-scroll-cue` keyframe on a 2.8 s loop). Logo and nav are not inside `Hero3D` — they come from the
shared `Header` mounted in `src/app/(site)/layout.tsx:31`, which a visitor cannot tell apart:
measured on `/` at scroll 0 the header is `position: fixed`, `top: 0`, background
`rgba(0, 0, 0, 0)`, `data-mode="dark"` (inverted by `data-hero-tone="dark"` at `Hero3D.tsx:88`),
carrying `AN ATELIER · Dự án · Studio · Dịch vụ · Ghi chép · Liên hệ · Đặt hẹn tư vấn`.

Never-empty guarantee: without a scene or WebGL, `:102-110` runs a 28 s ken-burns on the cover photo,
and `InteriorScene` itself shows the still until `ready` (`:258` `showPhoto`).

### 28. Camera moves on scroll — outside/entrance → interior → living room → furniture pan → project content, GSAP easing, no jumps — **PARTIAL**

The *mechanism* is right and the *stated arc* is not delivered.

**What works.** Sampling the hero's camera every frame during a scripted 5 s scroll of the first
viewport, the camera travels monotonically and lands exactly on the authored endpoints — at
`scrollY 0` it sits on resolved waypoint 1 and at `scrollY 900` on resolved waypoint 4 — with no
discontinuity. Coarser sweep, same page: `[0, 1.9, 7.4] → [0.033, 1.905, 7.303] → [0.917, 2.051,
4.719] → [-0.137, 1.957, 3.432] → [0.098, 1.651, 0.905]` against the seeded stops `[0,1.9,7.4]`,
`[0.9,2.05,4.6]`, `[-0.8,1.85,2.6]`, `[0.1,1.65,0.9]`. On the immersive section the walk is
captioned and staged (measured across the 1800 px pin):

```
f=0.00  bar scaleX(0)         01/04   cam [0,      0.096, 4.600]
f=0.30  bar scaleX(0.3)       02/04   cam [0.159,  0.135, 4.417]   "Tiền sảnh"
f=0.60  bar scaleX(0.6)       03/04   cam [-0.300, 0.126, 4.235]   "Phòng khách"
f=1.00  bar scaleX(1)         04/04   cam [0.017,  0.096, 4.050]   "Chi tiết vật liệu"
```

No jumps: `useCameraScroll` scrubs a proxy (`camera.ts:63-72`, `scrub: 0.6`,
`invalidateOnRefresh: true`) and `CameraPath` damps on top of that (`CameraPath.tsx:179`, λ 2.6 for
scroll), sampling a centripetal Catmull–Rom spline (`camera-path.ts:251`) — the interpolation is
C¹ through every waypoint by construction.

**Why PARTIAL.**

1. **The named stages are captions, not camera moves, on every seeded scene.** `waypointsFor`
   (`scene-settings.ts:274-278`) rewrites all `DEPTH_2_5D` paths through
   `normaliseDepthWaypoints` (`:241-272`) into `DEPTH_FRAME` (`:72-79`): `start: 4.6`, `end: 4.05`,
   `drift: 0.3`. The whole "outside → entrance → interior → living room → furniture pan" therefore
   becomes a **0.55-unit dolly toward a flat relief with ±0.3 of lateral drift** — which is exactly
   what the browser measured above. The rationale in the doc comment (`:229-240`) is sound — a 2.5D
   plane cannot be walked through — but the result is that the four Vietnamese stage labels assert a
   journey the camera does not take. 8 of the 11 scenes with waypoints are `DEPTH_2_5D`.
2. **Sixteen of the twenty-seven seeded scenes are `IMAGE` mode with zero waypoints**
   (`select mode, count(*) from scenes group by mode` → `IMAGE 16 / DEPTH_2_5D 8 / PROCEDURAL_3D 3`).
   `resolveKind` (`InteriorScene.tsx:58-75`) returns `{kind:'none'}` for `IMAGE`, so those projects
   never open a canvas at all.
3. **The hero and the immersive section run the same single path** (see 30), so the narrative is one
   move repeated rather than a progression from entrance to project content.
4. Minor and defensible: the easing is *GSAP-compatible* rather than GSAP. The path eases are
   evaluated by `easingByName` (`camera-path.ts:77`), a hand-written table matching GSAP's exponents
   (`:29-38`); GSAP itself only supplies the scrub proxy in `useCameraScroll`.

The "→ project content" half *is* delivered: `ImmersiveProject.tsx:198-201` flips `resolved` past
`progress > 0.84` and reveals the project title, facts and CTA.

### 29. Hero heading animates logo → heading → description → CTA with a subtle stagger — **PARTIAL**

Two of the four steps exist. `Hero3D.tsx:63` `useTextReveal(headingRef, { by: 'line', delay: 0.15 })`
and `:69` `useReveal(footRef, { variant: 'revealUp', delay: 0.55, start: 'top bottom' })`.

* **The logo step never animates.** The hero's eyebrow `Label` (`:131`) carries no `data-reveal` and
  no hook. Neither does the real logo: `Header.tsx` has no entrance tween anywhere — its only GSAP
  work is the scroll-driven hide/show at `:113-143`.
* **Description and CTA are one step, not two.** `footRef` (`:151`) wraps both the paragraph
  (`:156`) and the CTA `Button` (`:157`). `revealTargets` (`internal.ts:55`) staggers only children
  marked `[data-reveal-item]`; there are none inside the foot, so it falls back to `[el]` and the
  two move together as a single block.

Net: the visitor sees `heading (0.15 s) → description+CTA (0.55 s)`. The stagger machinery is right
there — `STAGGER.base` and the `data-reveal-item` convention are already used correctly by
`ProjectHero.tsx:79` and `FeaturedProjects.tsx:37` — it simply is not applied here.

---

## R7 Camera system

### 30. Camera waypoints are data, stored per project in the database — not hardcoded per project in source — **MET (with a content caveat that matters)**

Proved end to end, not just at the schema:

* Column: `src/server/db/schema.ts:243` `waypoints: jsonb().$type<CameraWaypoint[]>().notNull().default([])`.
* Read: `src/server/queries/scenes.ts:36` `waypoints: row.waypoints ?? []` into `SceneConfig`.
* Consumed: `InteriorScene.tsx:168` `waypointsFor(config)` → `CameraPath waypoints={waypoints}`
  (`:304`), and `SceneCamera.tsx:192` for the opening frame.
* **Nothing in `src/` hardcodes a per-project camera.** The only literal coordinates are
  `defaultWaypoints` (`scene-settings.ts:183-227`), which is keyed on `config.mode` and derived from
  `roomDepth`/`roomHeight`, used only when the row is empty (`:275`), and `FALLBACK_WAYPOINT`
  (`camera-path.ts:143`).
* Live data: all 11 3D scenes carry four waypoints with `at` 0 / 0.33 / 0.66 / 1, eases
  `power2.out`, `power2.inOut`, `power3.inOut`, `expo.out`, and labels
  `Ngưỡng cửa / Tiền sảnh / Phòng khách / Chi tiết vật liệu`.
* **Arithmetically verified against the render.** The rendered camera positions are an exact
  function of the DB rows. `normaliseDepthWaypoints` (`scene-settings.ts:241-272`) maps waypoint *i*
  to `[lateral, rise, distance]` where `rise = (pos.y − tgt.y)/tallest × 0.3 × 0.45`. For
  `hoi-tho-hinoki`, `tallest = 2.05 − 1.35 = 0.7`, so waypoint 1 → `(1.9−1.4)/0.7 × 0.135 =
  0.09642857…`. The browser reported the camera at `y = 0.09642857142857153`. Waypoints 2–4 match to
  three decimals on all axes. The database really is driving the camera.

**Caveat (delivery, not architecture): every seeded scene has the same path.**

```sql
select count(distinct waypoints::text), count(*) from scenes where jsonb_array_length(waypoints) > 0;
→ 1, 11
```

All eleven rows hold byte-identical waypoints — the generic fallback emitted by
`scripts/seed.ts:284-289`. The authored-path branch (`seed.ts:276-281`, reading
`FolderDetail.waypoints`) is real and correct, but no content file supplies one:
`grep -c waypoints src/data/content/*.json` returns 0 for all four. So the whole point of item 30 —
a camera composed for *this* room — is invisible to a visitor on every project. Counted against
item 28 in the gap list below, since that is where the visitor feels it.

### 31. Admin can adjust camera start, end, target, speed, scroll distance, rotation, FOV — **PARTIAL**

Present and genuinely wired, with a live preview:
`src/app/(admin)/admin/3d-assets/_components/SceneEditor.tsx:317` "Vị trí bắt đầu" (Vec3, writes
waypoint 0), `:322` "Điểm nhìn bắt đầu" (target), `:327` FOV 10–120°, `:336` "Tốc độ hoạt cảnh"
(`animationSpeed`), `:344` "Độ nhạy cuộn" (`scrollSensitivity`), `:353` "Tự khám phá".
`WaypointEditor.tsx` gives the *end* and every stop between: add/capture/reorder/delete
(`:49-59`, `:113-145`), per-waypoint position and target (`:150-159`), `at` 0–1 (`:163`), per-waypoint
FOV (`:171`), ease (`:180`), and label (`:104`). "Chụp vị trí hiện tại" (`:69`) reads the live
preview camera. Preview is real-time — `ScenePreview` at `SceneEditor.tsx:509` with an orbit/scroll
toggle (`:521`) and a scroll simulator that writes `progressRef.current` directly (`:539-554`).

Three gaps against the requirement's list:

* **No scroll distance.** The pinned travel is hardcoded in source:
  `ImmersiveProject.tsx:265` `h-[300vh]` and `Hero3D.tsx:89` `h-[100svh]`. The admin can only change
  `scrollSensitivity`, a multiplier on progress (`camera.ts:58-59`) — it changes how far along the
  path a given scroll gets you, not how much scroll the moment occupies.
* **No camera rotation.** `SceneEditor.tsx:496` "Xoay mô hình" is `settings.modelRotation`, the
  model's rotation, not the camera's. Camera orientation is only reachable indirectly, through the
  target vector.
* **On `DEPTH_2_5D` the typed coordinates are not the coordinates used.** `waypointsFor`
  (`scene-settings.ts:274-278`) rewrites them through `normaliseDepthWaypoints`, so an editor who
  types `y = 1.9` gets a camera at `y = 0.096`. The preview shows the truth, so this is not a
  silent lie — but the numeric fields are, for the majority of 3D scenes, advisory. (I am confident
  about the mechanism; I am less certain whether this is intended UX or an oversight — the doc
  comment at `:229-240` reads as deliberate.)

### 32. Easing is power2.out / power3.out / power4.inOut / expo.out — never linear, never spinning, never shaking — **PARTIAL**

**The vocabulary is exactly right.** `src/animations/config.ts:37-48` defines precisely the four the
brief names — `out: 'power2.out'`, `strong: 'power3.out'`, `inOut: 'power4.inOut'`,
`expo: 'expo.out'` — plus `none: 'none'` (`:47`) reserved for scrubbed tweens, where GSAP's own
documentation requires it because the scrollbar supplies the timing (`camera.ts:66`, `image.ts:145`,
`projects.ts:63`). That is not "linear motion" in the sense item 32 forbids.

**No spinning, no shake.** The turntable the previous audit flagged is gone.
`grep -rn autoRotate src/` returns nothing, and `SceneCamera.tsx:183-185` now says so explicitly:
"There is no turntable. A constant-speed spin around the authored target is the one camera idiom the
brief rules out." Confirmed in the browser: with auto-explore running the camera translated along
the path and never orbited a fixed point. Pan is now genuinely *controlled* rather than absent —
`OrbitControls enablePan screenSpacePanning={false} panSpeed={0.45}` (`:245-248`) plus a rubber-band
`PanLimiter` (`:134-174`, `:257`) that eases the pivot back into a box a fifth of the room wide.

**Why PARTIAL — the admin can only choose eases the brief excludes.**
`WaypointEditor.tsx:15-22` offers exactly six options:

```
{ value: 'none',         label: 'Tuyến tính' }   ← linear, the first item in the list
{ value: 'sine.inOut',   … }
{ value: 'power1.inOut', … }
{ value: 'power2.inOut', … }
{ value: 'power3.inOut', … }
{ value: 'expo.inOut',   … }
```

Not one of `power2.out`, `power3.out`, `power4.inOut`, `expo.out` is selectable, and **linear is**.
An editor following the UI will produce exactly the motion item 32 forbids. The path default is also
outside the set — `camera-path.ts:73` `DEFAULT_EASE = 'power2.inOut'` — and the seeded rows use
`power2.inOut` / `power3.inOut` on two of four legs. The `.inOut` choice is argued for at `:67-71`
(velocity continuity across waypoints) and I think the argument is correct; the defect is that the
brief's own eases cannot be picked at all.

### 33. AUTO EXPLORE walks the waypoints on a GSAP timeline, slowly and elegantly — **PARTIAL**

**The behaviour is fixed and I watched it work.** On `/projects/hoi-tho-hinoki`, pressing
*Tự động khám phá* (`Project3D.tsx:252`, `aria-pressed` flips to `true`, label becomes
*Dừng khám phá*) produces a real walkthrough. Sampled every 700 ms:

```
[0,      0.096, 4.600]   ← waypoint 1 (home)
[0.159,  0.135, 4.417]   ← waypoint 2, then a hold
[-0.300, 0.125, 4.233]   ← waypoint 3, then a hold
[0.017,  0.096, 4.050]   ← waypoint 4, then a hold
[-0.120, 0.135, 4.310] … [0, 0.096, 4.600]   ← closing leg home, then loops
```

Every one of those is the resolved DB waypoint to three decimals. It holds at each stop, closes the
loop rather than snapping, and never spins. The patch that made this work is visible:
`InteriorScene.tsx:200` `const pathDriven = motionAllowsCamera && (mode === 'scroll' || explore) &&
!handedOff`, mounting `CameraPath` in orbit mode too (`:302-315`) with `driver="tour"` (`:309`),
`blendSeconds={1.4}` so switching it on eases from wherever the visitor left the camera (`:311`),
and `yieldOnPointer` (`:312`) so the first drag hands the camera back — one state change, not one
per frame (`:188-194`).

**Why PARTIAL — the walk is not on a GSAP timeline, and the GSAP timeline that remains is orphaned.**
The schedule is `createTourClock` (`camera-path.ts:458-510`: 4.5 s per full-span leg, 1.1 s holds,
`TOUR_LEG_SECONDS`/`TOUR_HOLD_SECONDS` at `:415`/`:422`) advanced by `elapsed += delta` inside
`CameraPath`'s `useFrame` (`:169-171`). In that branch `progressRef` is **never read** (`:173` is the
`else`). Yet `Project3D.tsx:94-134` still builds:

```ts
// src/components/projects/Project3D.tsx:105
const timeline = gsap.timeline({ repeat: -1, onUpdate: write })   // write → progressRef.current = proxy.value
```

an infinitely repeating GSAP timeline over `waypointStops(scene)` that writes into a ref nobody
reads, running on the shared GSAP ticker for as long as auto-explore is on. It is dead work with a
live cost, and the file's own header (`:9-11`, "AUTO EXPLORE walks the scene's camera waypoints on a
GSAP timeline that writes into `progressRef`") now documents a mechanism that drives nothing. The
requirement's letter ("on a GSAP timeline") is not met either; the spirit ("slowly and elegantly") is.

### 34. Scroll → progress → camera controller → three.js camera via refs; no React re-render per scroll tick or animation frame — **MET**

Counted, not assumed.

* **Hero, 4 s continuous 60 fps scroll driven from inside the page** (`window.scrollTo` on every
  `requestAnimationFrame`, ~240 frames, plus 2 s settle):
  app React root **0 commits**; the Next dev-overlay root 10.
* **Immersive section, full 1800 px scrub in 8 steps × 1.8 s** (850+ rendered frames):
  app React root **15 commits** — accounted for by the 4 stage transitions, the `resolved` flip and
  Next dev noise (an idle 5 s baseline on the same page costs 3 app commits, against 53 for the
  dev overlay).

The code matches. `useCameraScroll` writes a plain number into a ref inside a scrubbed proxy tween
(`camera.ts:63-72`) — no `setState` anywhere in the module. `CameraPath` reads `progressRef.current`
in `useFrame` (`:173`) and mutates `camera.position` / `camera.fov` / `controls.target` directly
(`:197-213`), with every intermediate held in `useRef` (`:102-111`) so the render loop allocates
nothing. `ImmersiveProject.tsx:186-206` runs its own rAF that writes `bar.style.transform` straight
to the DOM (`:189`) and calls `setStage`/`setResolved` only on a transition (`:191-201`) — measured
above as ~5 renders for the whole section. `useScrollProgress` (`scroll.ts:148+`) does the same for
`ProjectHero`. `InteriorScene`'s one per-interaction state change is `handedOff` (`:188`), documented
at `:186-187` as "one state change per handover — not per frame".

---

## TOP GAPS

1. **Item 33 — an orphan infinite GSAP timeline is still running under AUTO EXPLORE.**
   `src/components/projects/Project3D.tsx:105` builds `gsap.timeline({ repeat: -1 })` writing into
   `progressRef`, but `CameraPath.tsx:169-171` uses its own tour clock in `driver="tour"` and never
   reads that ref. The walk works; the timeline is dead work on the shared ticker, and the file
   header (`:9-11`) documents a mechanism that drives nothing.
   *Remedy:* in `Project3D.tsx`, delete the `useEffect` at `:94-134` together with `waypointStops`
   (`:56`), `LEG_SECONDS` (`:30`) and `HOLD_SECONDS` (`:32`) — `camera-path.ts:415/422` already own
   those numbers — keep `progressRef` only for `handleReset` (`:198`), and rewrite the header
   comment to say the tour clock in `CameraPath` owns the walk.

2. **Item 32 — the admin's ease dropdown offers linear and none of the brief's four eases.**
   `src/app/(admin)/admin/3d-assets/_components/WaypointEditor.tsx:15-22` lists
   `none` ("Tuyến tính"), `sine.inOut`, `power1.inOut`, `power2.inOut`, `power3.inOut`,
   `expo.inOut`. An editor cannot pick `power2.out` / `power3.out` / `power4.inOut` / `expo.out`, and
   *can* pick linear — the one thing §32 rules out.
   *Remedy:* replace the `EASES` array in `WaypointEditor.tsx` with the four brief eases plus
   `power2.inOut` (keep it as the default at `:54`/`:182`, it is the right default for mid-path
   continuity) and drop the `none` entry entirely.

3. **Item 28 / 30 — all eleven seeded scenes share one identical camera path, so the narrative arc
   is one move repeated.** `select count(distinct waypoints::text) from scenes where
   jsonb_array_length(waypoints) > 0` returns **1** across 11 rows; every one is the generic
   fallback from `scripts/seed.ts:284-289`. The authored branch (`seed.ts:276-281`) is correct but
   `src/data/content/batch-*.json` contains no `waypoints` key at all, and 16 further scenes are
   `IMAGE` mode with no path and no canvas.
   *Remedy:* author a `waypoints` array per folder in `src/data/content/batch-1-apartments.json`
   (and the other two batches) — `FolderDetail.waypoints` already exists in
   `src/data/detail-types.ts:51` and the seed already prefers it — starting with the three or four
   flagship projects so the stage captions and the camera describe the same room.

4. **Item 31 — scroll distance is not adjustable; it is hardcoded in two components.**
   `src/components/sections/ImmersiveProject.tsx:265` `h-[300vh]` and
   `src/components/sections/Hero3D.tsx:89` `h-[100svh]` fix how much scroll each camera moment
   occupies. `scrollSensitivity` (`SceneEditor.tsx:344`) rescales progress but cannot lengthen or
   shorten the moment.
   *Remedy:* add a `scrollDistance` (in vh) to the homepage section content read by
   `sectionText`/`sectionList` in `ImmersiveProject.tsx`, default 300, and drive the outer height
   from it — the camera range `top top → bottom bottom` (`camera.ts:38-39`) already follows whatever
   height the section has.

5. **Item 29 — the hero sequence is two steps, not four.** In
   `src/components/sections/Hero3D.tsx` the eyebrow/logo `Label` (`:131`) has no reveal at all, and
   the description (`:156`) and CTA (`:157`) share one `useReveal` target (`:151`) with no
   `data-reveal-item` children, so they rise together.
   *Remedy:* in `Hero3D.tsx`, add `data-reveal-item` to the `<p>` at `:156` and to the `Button`
   wrapper at `:157` (`useReveal` already staggers marked children via
   `internal.ts:55`), and give the eyebrow block at `:130-140` its own
   `useReveal(eyebrowRef, { variant: 'revealUp' })` ahead of the heading's `delay: 0.15`.

6. **Item 20 — the shared reveal wrappers are dead while four route folders re-implement them.**
   `src/components/animation/Reveal.tsx`, `TextReveal.tsx` and `Parallax.tsx` have zero importers;
   `src/app/(site)/{contact,journal,services,studio}/_components/motion.tsx` each define their own
   copy, feeding 33 `<Reveal>` and 6 `<TextReveal>` call sites.
   *Remedy:* delete the four `_components/motion.tsx` duplicates and import `Reveal` / `TextReveal` /
   `Parallax` from `@/components/animation` (the barrel is already `'use client'`, so the pages stay
   server components); keep only the genuinely route-specific `ImageFrame` variants.
