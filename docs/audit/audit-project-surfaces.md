# Audit — R12 Project surfaces / R13 Chrome (items 53–66)

Scope: `docs/REQUIREMENTS.md` items 53–66 only. Read-only audit against the code on disk
plus `docs/ARCHITECTURE.md` §5 (ownership), §6 (contracts), §8 (perf), §9 (a11y), §10.

Build is in flight. "File not written yet" is not counted as a finding — every verdict below
assumes each in-flight agent finishes exactly what its ownership row and the contract tell it
to do. Verdicts: **MET** (proved in code), **PLANNED** (owner + contract make it inevitable),
**AT-RISK** (owner exists, instruction will not produce the required result), **GAP** (no owner /
contradicted).

Tally: **MET 10 · PLANNED 0 · AT-RISK 3 · GAP 1**

---

## R12 Project surfaces

### 53. `ImmersiveProjectSection` — 300vh outer, sticky 100vh inner, camera + title + metadata through named stages — **MET**

`src/components/sections/ImmersiveProject.tsx:239` `h-[300vh]`, `:241` `sticky top-0 … h-[100svh]`.
Camera is scrubbed by `useCameraScroll({ sectionRef, progress, sensitivity })` (`:110`) whose
default range is `top top → bottom bottom` (`src/animations/camera.ts:30`) — exactly the 200vh
the sticky panel spends pinned, so progress maps 0→1 across the pin. Stage captions are data
(`sectionList(content, 'stages', …)`, `:150`), the progress bar and the stage index are written
from a rAF loop that reads `progress.current` and writes `bar.style.transform` directly
(`:154–182`); `setStage`/`setResolved` fire only on transition (4–5 renders total for the whole
section), not per frame — consistent with §6.3 "never call setState per frame".
SSR renders the stacked non-pinned sequence and only upgrades after `matchMedia('(min-width:1024px)') && supportsWebGL()`
(`:119–129`), so no layout swap on mobile.

Caveat (not a defect, worth one line in the seed doc): nothing binds `content.stages.length` to
`scene.waypoints.length`. Stage `n` is `floor(progress * stages.length)` while the camera samples
the waypoint spline by `at`. A project seeded with 4 waypoints and an admin who types 6 stage
labels gets captions that drift off the camera moves. The seeded waypoints are labelled
(`scripts/seed.ts:284+` — `Ngưỡng cửa / Tiền sảnh / Phòng khách`) and those labels are never used
by the section; deriving `stages` from `scene.waypoints[].label` when present would remove the
whole class of desync.

### 54. Featured projects showcase — large imagery, side metadata — **MET**

`src/components/sections/FeaturedProjects.tsx:29–113`. Alternating 7/4 column rows on the
12-column grid (`flip = index % 2 === 1`), `revealClip` image entrance, `useParallax` drift on the
image column, metadata column with `Địa điểm / Diện tích / Năm / Phong cách` and a hover lift.
Rendered from `SECTION_COMPONENTS.FEATURED_PROJECTS` (`src/components/sections/index.ts:31`) and
enabled by default even against an empty DB (`src/server/queries/site.ts:80–100`).

### 55. Horizontal project gallery, vertical-scroll-driven, dynamically measured, pinned with scrub — **GAP (no owner)**

The *mechanism* is finished and correct: `useHorizontalScroll` pins the section, translates the
track by `track.scrollWidth - window.innerWidth` through function-based values with
`invalidateOnRefresh: true` and `scrub` (`src/animations/projects.ts:36–85`), wrapped by
`HorizontalScroll` (`src/components/animation/HorizontalScroll.tsx:33–51`). Width is measured, never
hardcoded. But **nothing on the site renders it.** Every reference is the definition or the barrel
re-export:

```
src/animations/index.ts:44        export …useHorizontalScroll
src/components/animation/index.ts:9  export { HorizontalScroll }
```

No consumer. And the two places it could live are blocked or already spoken for:

* Homepage — `HomepageSectionKey` is a closed union of 8 keys in `src/types/content.ts:176–184`,
  a **do-not-touch file** (§0). There is no gallery/rail key, so the home-sections agent cannot add
  a horizontal band without editing a frozen file. (R4 item 18 lists "gallery" in the narrative;
  the type system forbids it.)
* Project pages — `/projects` renders `ProjectIndex`, a vertical stack of editorial rows
  (`src/app/(site)/projects/page.tsx:86`; `src/components/projects/ProjectIndex.tsx`), and the
  project story is composed from `ProjectBlockType` (`src/types/content.ts:108–121`), which has
  `GALLERY` and `MASONRY` but no horizontal/rail type — also frozen.

`ARCHITECTURE.md` §6.3 publishes the `useHorizontalScroll` signature but no ownership row or
contract line says who must call it, which is why it has ended up owned by nobody.

**Fix (one agent, `src/components/projects/**`):** make `RelatedProjects` the rail it already calls
itself. `src/components/projects/RelatedProjects.tsx:36` renders `<ProjectGrid columns={3} />`
under a doc comment that reads "The rail that closes a project page"; swap it for
`<HorizontalScroll trackClassName="gap-10 px-(--spacing-gutter)">{projects.map(p => <ProjectCard … className="w-[min(78vw,34rem)] shrink-0" />)}</HorizontalScroll>`.
That satisfies 55 on every project page, needs no frozen-type change, and reuses the finished hook.
(If the intent was a homepage band instead, the frozen `HomepageSectionKey` has to be extended —
that is a contract change and must be raised, not worked around.)

### 56. Card hover: image 1→1.05, metadata opacity 0→1 with y 20→0; no aggressive cursor effects — **MET**

`src/components/projects/ProjectCard.tsx:117` `group-hover:scale-105` on a
`duration-[900ms] ease-editorial` transform; `:75` overlay is `translate-y-5` (=1.25rem = 20px) +
`opacity-0` → `group-hover:translate-y-0 group-hover:opacity-100`. Both mirrored on
`group-focus-visible:` so the keyboard path matches (§9). The scrim tops out at `bg-espresso/25`.
`FeaturedProjects.tsx:60` uses the same 1.05 figure. Nothing cursor-aggressive anywhere.

### 57. Desktop-only custom cursor, states default/view/drag/project, off on touch and reduced motion — **AT-RISK (two defects)**

`src/components/layout/CustomCursor.tsx` exists, is mounted in the site shell
(`src/app/(site)/layout.tsx`), keeps the native cursor, moves the ring with `gsap.quickTo` (no
per-frame React state), and gates on `(hover: hover) and (pointer: fine)` (`:53`) — touch is
correctly excluded.

**(a) Three of the four states are unreachable.** The component reads its state from
`target.closest('[data-cursor]')` (`:30`), but `data-cursor` is set by **zero** elements in the
whole repo:

```
$ grep -rn "data-cursor" src/
src/components/layout/CustomCursor.tsx:30   (the reader)
src/components/layout/CustomCursor.tsx:33   (the reader)
src/components/layout/CustomCursor.tsx:43   (a doc comment)
```

`view` / `drag` / `project` will never fire. The attribute is a private convention documented only
in that file's comment — it is not in `ARCHITECTURE.md` §6, so the project-pages, home-sections and
motion agents have no way to know it exists. Result: the shipped cursor is a small ring that only
grows on generic links.
**Fix (one agent, layout owner publishes + three one-line edits):** add `data-cursor` to §6 as part
of the layout contract, then set `data-cursor="project"` on the `ProjectCard` link
(`ProjectCard.tsx:96`), `data-cursor="drag"` on the before/after frame
(`BeforeAfter.tsx` frame div) and on the `HorizontalScroll` track, `data-cursor="view"` on
`ProjectFigure` frames inside galleries.

**(b) `prefers-reduced-motion` does not actually disable it.** `:54`
`setEnabled(fine.matches && motionEnabled('enabled'))` reads a zustand *snapshot* once, inside a
passive effect, and never subscribes. The OS preference reaches the store only from
`useReducedMotion()`'s effect inside `ScrollProvider` (`src/animations/scroll.ts` / `src/lib/motion.ts:127–140`),
and `ScrollProvider` is an **ancestor** of `CustomCursor` (root `Providers` → `ScrollProvider` →
… → `(site)/layout` → `CustomCursor`). React flushes passive effects children-first, so at the
moment `:54` runs, `useMotionStore.getState().reduced` is still its initial `false`. A
reduced-motion visitor gets the custom cursor, permanently, because nothing re-runs `update`.
(The admin `motion.enabled = false` path *is* honoured, because `Providers` seeds `setConfig`
during render.) The same one-shot read pattern is at `Header.tsx:52` (`canHide`), so hide-on-scroll
also survives reduced motion.
**Fix:** replace the snapshot with the reactive hook —
`const reduced = useReducedMotion(); const allowed = useMotionFlag('enabled')` — and include both in
the effect's deps; both hooks already exist in `src/lib/motion.ts:118–147`.

### 58. Project open transition: card image expands to fullscreen, then route change (View Transition API, GSAP fallback) — **MET**

`useProjectTransition` (`src/animations/projects.ts:158–265`): plain left-click is intercepted in
`ProjectCard.handleClick` (`:63–70`, modified clicks fall through), the media element is stamped
with `view-transition-name: an-project-media` and `router.push` runs inside
`document.startViewTransition`, resolved by the pathname-change effect with a 1200 ms safety valve;
browsers without the API get a fixed-position FLIP clone plus espresso backdrop expanded to
`100vw/100vh` before the push (`:224–265`). The destination now carries the matching name —
`src/components/projects/ProjectHero.tsx:165` — so the morph is real, not a crossfade.
`suppressNextCurtain()` stops the global page curtain from doubling up.

Two residual notes, both small and both for the project-pages owner:
* The name is only on the `<Image>` branch. When a project has a scene, `ProjectHero` renders
  `InteriorScene` instead (`ProjectHero.tsx:146–154`) and no element carries the name — so the
  flagship 3D projects degrade to the default VT crossfade. Stamping it on the wrapper `div` that
  holds either branch would cover both.
* `FeaturedProjects` rows open through a plain `<Link>` (`FeaturedProjects.tsx:42`), so the
  homepage showcase does not use the expansion at all. Inconsistent with `/projects` and with the
  related rail.

### 59. Detail hero is full-screen image or interactive 3D; text after the visual is established — **MET**

`src/components/projects/ProjectHero.tsx`: `min-h-[92svh]` full-bleed, scene or cover, and the
title block is keyed on `settled` (`:180`) so `useTextReveal(by:'line')` and the metadata reveal only
run after `Image.onLoad` / `InteriorScene.onReady`, with a 1400 ms ceiling (`:129–134`) so a stalled
decode can never hold the `<h1>` hostage.

### 60. EXPLORE SPACE: orbit, zoom, controlled pan, fullscreen, minimal UI, optional AUTO EXPLORE — **AT-RISK (contradicted across two owners)**

The shell is right: `Project3D` (`src/components/projects/Project3D.tsx`) is three hairline text
controls, no HUD, wired into `ProjectBlocks` as `SCENE_3D` (`ProjectBlocks.tsx:221–232`) and seeded
for every project with a scene (`scripts/seed.ts:242`). Orbit + zoom work
(`SceneCamera.tsx:81–97`, sane distance/polar/azimuth envelope derived from waypoint 0).

**AUTO EXPLORE does not walk the waypoints — and `Project3D`'s timeline is dead code.**
`Project3D:94–134` builds a GSAP timeline over the scene's waypoint stops and writes each tick into
`progressRef`. It hands that ref to `InteriorScene` with `mode="orbit"` (`:238–239`). But
`InteriorScene` only mounts the path driver in scroll mode:

```
src/components/three/InteriorScene.tsx:252  <SceneCamera … autoRotate={mode === 'orbit' && explore} />
src/components/three/InteriorScene.tsx:253  {mode === 'scroll' && (
src/components/three/InteriorScene.tsx:254     <CameraPath waypoints={…} progressRef={progressRef} … />
```

In orbit mode `progressRef` is read by nobody. What the visitor actually gets when they press
*Tự động khám phá* is `OrbitControls autoRotate` at `autoRotateSpeed={0.28}` — a turntable spin
around a fixed target, i.e. exactly the "game-like" idiom §32/item 32 rules out, and not the
"walks waypoints on a GSAP timeline" of item 33. The UI copy actively promises the opposite:
`Project3D.tsx:220` "camera đi theo hành trình đã dựng sẵn" (the camera follows the pre-built
journey). The scene's authored waypoints — the whole point of item 30 — are invisible in explore
mode.
**Fix (one agent, three owner):** render `CameraPath` in orbit mode too when `autoExplore` is on,
and let it own the camera while it runs — e.g. drop the `mode === 'scroll'` guard to
`{(mode === 'scroll' || explore) && <CameraPath … />}`, pass `enabled` through, and set
`OrbitControls enabled={!explore} autoRotate={false}` so the two drivers never fight. Delete
`autoRotate` from `SceneCamera`'s contract afterwards.

Secondary: item 60 asks for **controlled pan**; `SceneCamera.tsx:86` sets `enablePan={false}`,
which is not "controlled", it is "absent". A clamped pan (`enablePan` with
`screenSpacePanning={false}` plus a target-offset clamp) is what the brief describes.

### 61. Before/After slider: animates on enter, drag to compare, no continuous auto-motion — **MET**

`src/components/projects/BeforeAfter.tsx`: one `ScrollTrigger … once: true` nudge on enter that
aborts the moment the reader touches it (`:73–103`), pointer-capture drag, and a real
`role="slider"` with arrows / PageUp-Down / Home / End (`:136–163`). The handle position is a CSS
custom property written straight to the DOM — no React state per pointer move. No looping tween
anywhere. Keyboard-operable comparison as §9 requires.

Note (delivery, not correctness): neither `defaultBlocks()` (`ProjectBlocks.tsx:63–105`) nor the
seed (`scripts/seed.ts:224–271`) ever emits a `BEFORE_AFTER` block, so this surface renders in the
shipped sample content exactly never. It is correct code that nobody will look at, and any later
regression in it goes unnoticed. One seeded renovation project with a before/after pair fixes that.

### 62. Materials section cross-fades material imagery on hover — **MET**

`src/components/projects/ProjectMaterials.tsx:33–63`: hover/focus/click sets the active index and a
GSAP tween cross-fades `autoAlpha` + a shallow `clip-path` wipe (`inset(0% 0% 12% 0%)` →
`inset(0)`) at `0.7s power2.out`, gated by `motionEnabled('imageReveal')` with a `gsap.set` branch
when motion is off. Reachable in the real product: `ProjectBlocks.tsx:299` renders the `MATERIALS`
block and `scripts/seed.ts:266` seeds one per project that has materials. Requirement lists
"opacity/scale/clip-path"; this uses opacity + clip-path, which reads as the intended subtlety.

### 63. Services as numbered editorial rows with hover number/image/title motion — **MET**

`src/components/sections/Services.tsx:100–140`: hairline-ruled rows, index label lifting
(`group-hover:-translate-y-1.5`), title block sliding (`group-hover:translate-x-2`), arrow easing
right, and a sticky preview image on the right that cross-fades to the hovered/focused row
(`:145–160`). Falls back to five authored Vietnamese services when the table is empty.

### 64. Journal cards reveal image/title/metadata on enter; image scale + arrow move on hover — **MET**

`src/components/sections/Journal.tsx:20–72`: `useImageReveal(revealClip)` on the frame,
`useTextReveal(by:'line')` on the title, `useReveal(revealUp, stagger)` on the metadata block, then
`group-hover:scale-[1.05]` on the image and a diagonal arrow move
(`group-hover:translate-x-1 group-hover:-translate-y-1`). Focus-visible variants present.

---

## R13 Chrome

### 65. Subtle scroll progress indicator — thin line, not a large bar — **MET**

`src/components/layout/ScrollProgress.tsx`: a single `h-px` accent rule, `fixed inset-x-0 top-0`,
`aria-hidden`, scaled by `gsap.quickSetter(bar,'scaleX')` from one `ScrollTrigger.create({start:0,end:'max'})`
inside a `gsap.context()` that is reverted on unmount. No React state per tick, no memory leak.
Mounted once in the public shell (`src/app/(site)/layout.tsx`).

### 66. Header transparent over hero → background/blur/border on scroll; subtle nav hover; fullscreen staggered mobile menu — **AT-RISK**

Mostly right. `src/components/layout/Header.tsx` paints from one ScrollTrigger writing *data
attributes*, never state: `data-solid` past 24px drives
`data-[solid=true]:bg-canvas/85 data-[solid=true]:backdrop-blur-md` plus a `bg-line` hairline that
fades in via `group-data-[solid=true]/hdr:opacity-100`. Nav hover is an opacity shift with an
accent underline on the active item — subtle, no bounce. `MobileMenu` is a full-screen espresso
panel with `expo.inOut` panel wipe and `stagger: 0.055` items, GSAP not framer-motion (correct per
§8: it ships on the homepage), Lenis stopped, Escape/`inert`/focus-return handled.

**Defect: the transparent-over-hero inversion only works on the homepage.** The header decides its
text colour from `document.querySelector('[data-hero-tone="dark"]')` (`Header.tsx:54`), and exactly
one component in the repo sets that attribute:

```
$ grep -rn "data-hero-tone" src/
src/components/layout/Header.tsx:32,54      (the reader)
src/components/sections/Hero3D.tsx:77       (the only writer)
```

`ProjectHero` — a `min-h-[92svh]` `bg-espresso` hero with a `bg-espresso/45` scrim over a
photograph (`ProjectHero.tsx:137–169`) — never sets it. On every `/projects/[slug]`, the header
renders `data-mode="light"` → `text-ink` (`#1C1B18`) with no background, over a dark photo. Logo,
nav and the "Đặt hẹn tư vấn" CTA are effectively invisible for the first 24 px of scroll, i.e. on
arrival at the money page. `data-hero-tone` is a private convention in a comment; it is not in
`ARCHITECTURE.md` §6, so the project-pages agent had no reason to know about it.
**Fix (one line, project-pages owner):** add `data-hero-tone="dark"` to the `<section>` in
`ProjectHero.tsx:137`; and add the attribute to §6 as part of the layout contract so
`/journal/[slug]` and any future dark hero honour it too.

Secondary (same class as 57b): `Header.tsx:52` computes `canHide = motionEnabled('enabled')` from a
one-shot store snapshot inside a passive effect that runs before `ScrollProvider` has published the
OS `prefers-reduced-motion` value, so hide-on-scroll-down still runs for reduced-motion users. Use
`useMotionFlag('enabled')` / `useReducedMotion()` and put them in the deps.

---

## TOP GAPS

1. **Item 55 — the horizontal project gallery has no owner and no home.** `useHorizontalScroll` and
   `HorizontalScroll` are finished and correct but called from nowhere, and both frozen unions
   (`HomepageSectionKey`, `ProjectBlockType` in `src/types/content.ts`) lack a key for it.
   *Remedy:* turn `RelatedProjects.tsx:36` from a `ProjectGrid` into the `HorizontalScroll` rail its
   own doc comment already claims it is.
2. **Item 60 — AUTO EXPLORE never walks the waypoints.** `InteriorScene.tsx:253` mounts `CameraPath`
   only in scroll mode, so `Project3D`'s waypoint timeline (`Project3D.tsx:94–134`) writes into a
   ref nobody reads; explore mode is an `OrbitControls` turntable while the UI promises a composed
   journey. *Remedy:* mount `CameraPath` when `explore` is true and disable `OrbitControls` for its
   duration, instead of `autoRotate`.
3. **Item 66 — the header is unreadable over the project-detail hero.** Only `Hero3D` sets
   `data-hero-tone="dark"`; `ProjectHero` does not, so ink-coloured nav sits on a dark photograph.
   *Remedy:* add `data-hero-tone="dark"` to `ProjectHero.tsx:137` and publish the attribute in
   `ARCHITECTURE.md` §6.
4. **Item 57 — three of the four cursor states can never fire.** No element anywhere sets
   `data-cursor`, and the convention is not in the contract. *Remedy:* document `data-cursor` in §6
   and set it on the project card, the before/after frame and the gallery figures.
5. **Item 57/66 — reduced motion is read once, too early, and never re-read.**
   `CustomCursor.tsx:54` and `Header.tsx:52` call `motionEnabled('enabled')` in a child effect that
   runs before `ScrollProvider` publishes the OS preference, so reduced-motion visitors keep the
   custom cursor and the hide-on-scroll header. *Remedy:* swap both snapshots for
   `useMotionFlag('enabled')` + `useReducedMotion()` and add them to the effect deps.
