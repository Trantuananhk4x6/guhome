# Audit — R10 Loading & transitions / R11 Reveal systems (items 45–52)

Scope: `docs/REQUIREMENTS.md` items 45–52 only, against `docs/ARCHITECTURE.md` §6.3 (motion contract),
§8 (performance) and §9 (a11y).

Method: read the code on disk, then verified every visual and behavioural claim against the running
dev server at `http://localhost:3000` in an isolated Playwright context (empty cache per context,
1440×900 and 390×844). Timings are rAF samples of computed style, plus the curtain timeline's own
`tl.duration()` read out of the page. Parallax percentages are measured `DOMMatrix.f` deltas divided
by the live frame height — not read off the source.

Verdict key: **MET** (proved in code *and* in the browser) · **PARTIAL** (mechanism present, but a
named part of the requirement does not reach a visitor) · **MISSING**.

**Tally: MET 3 · PARTIAL 5 · MISSING 0.**

| # | Requirement | Verdict |
|---|---|---|
| 45 | Premium loader: blurred image, PREPARING SPACE, progress, GSAP crossfade, no pop-in | MET |
| 46 | 3D → photography transition uses opacity/scale/clip-path/blur | **PARTIAL** |
| 47 | Global page transition, 0.8–1.2s | MET |
| 48 | Preloader only when needed, 0.8–2s, skipped when cached | **PARTIAL** |
| 49 | Six reveal variants used deliberately | **PARTIAL** |
| 50 | Large typography by line/word/block, never character | MET |
| 51 | Section storytelling: image → title → description → drift → overlap | **PARTIAL** |
| 52 | Pinning sparing; gallery parallax ±10% no more | **PARTIAL** |

Caveat on citations: the tree moved under me during this audit — `src/animations/reveal.ts`,
`scroll.ts`, `text.ts`, `gsap.ts`, `internal.ts`, `src/components/animation/PageTransition.tsx`,
`Reveal.tsx`, `TextReveal.tsx`, `src/components/sections/{Hero3D,Philosophy,ImmersiveProject}.tsx`,
`src/components/three/{SceneFallback,SceneLighting,SceneEnvironment,ProceduralScene,DepthScene}.tsx`
and `src/app/layout.tsx` were all rewritten between 11:41 and 12:08 local while I was reading. Every
line number below was re-verified by `grep -n` against the files as of 12:10; where a browser
measurement predates an edit to the file it measures, I re-ran it.

---

## R10 Loading & transitions

### 45. Premium loader: blurred project image, "PREPARING SPACE", progress, GSAP crossfade, never a sudden model pop-in — **MET**

Every clause is in `src/components/three/ThreeLoader.tsx` and every clause reaches a visitor.

* **Blurred project image behind** — `:109` `<div className="absolute inset-0 scale-110 opacity-45 blur-2xl">`
  wrapping a `next/image` of the project still, with the row's `blurDataURL` as placeholder (`:116`),
  under an `bg-espresso/55` scrim (`:120`). Not a spinner; `:25` says so explicitly.
* **"PREPARING SPACE"** — `:27` `label = 'PREPARING SPACE'` is the default and **no consumer overrides
  it**: the only mount site is `InteriorScene.tsx:343` and it passes `image` and `onDone` only. So the
  literal string in the brief is what ships, on every scene on the site.
* **Progress indication** — two of them: a zero-padded numeral (`:125` `String(shown).padStart(3, '0')`)
  and a hairline whose `scaleX` is GSAP-eased toward `progress / 100` over 0.7s `power2.out` (`:48`),
  so a jumpy `useProgress` still draws smoothly. Source is drei's real loading manager (`:4`, `:28`).
* **GSAP crossfade, no pop-in** — `:73–82` `gsap.to(root, { autoAlpha: 0, duration: 0.95,
  ease: 'power2.inOut', delay: 0.12 })`, and the loader deliberately stays mounted until its own tween
  finishes rather than unmounting on `ready` (`InteriorScene.tsx:341–343`).

**Watched on a cold load of `/` in a fresh context** (viewport 1440×900, `DEPTH_2_5D` hero scene).
Frame by frame, timestamps from navigation commit:

| t | what is on screen |
|---|---|
| 3.31s | `[data-scene-mode="DEPTH_2_5D"]` mounts. Photo layer `opacity: 1`, `transition: opacity 1.4s cubic-bezier(0.22,1,0.36,1)`. No canvas yet — the cover photograph is the LCP. |
| 3.70s | Loader appears over it: blurred still (`.blur-2xl` present), `PREPARING SPACE  000`. A `<canvas>` now exists **at opacity 0**. |
| 4.20s | `PREPARING SPACE  080` |
| 5.02s | `PREPARING SPACE  000` — the counter regresses (see note) |
| 5.18s | `100`. Loader still fully opaque; **behind it** the photo is at 0.536 and the canvas at 0.416 — the crossfade is happening under full cover. |
| 6.19s | Loader 0.006, photo 0.005, canvas 0.987 |
| 6.76s | Loader unmounted, photo 0, canvas 1 |

That ordering is the whole point of the requirement and it is correct: the model is never revealed
mid-fade, because the photo→canvas crossfade completes *underneath* an opaque curtain, and only then
does the curtain go. There is no pop-in.

Two honest notes, neither a failure:

* The crossfade itself is a **CSS** transition, not GSAP — `InteriorScene.tsx:270–271`
  (`opacity: showPhoto ? 1 : 0`, `transition: 'opacity 1.4s var(--ease-editorial)'`) and `:282`
  (canvas, `1.6s`). GSAP owns only the curtain's exit. The brief asks for "GSAP crossfade"; what
  ships is a GSAP-driven curtain over a CSS crossfade. Visually identical, contractually loose.
* The progress numeral goes **backwards** (080 → 000 → 100). `useProgress` resets between drei
  loading groups and `:48` clamps but never ratchets. A `Math.max` against the previous value would
  fix it; the hairline already reads smoothly because it is tweened.

### 46. 3D → photography transition uses opacity / scale / clip-path / blur so it reads seamless — **PARTIAL**

The handoff exists and it does read seamless — but only **one** of the four named techniques is
actually animated during it, and the *narrative* 3D→photography boundary has no transition at all.

What is animated at the 3D↔photography boundary is opacity, and nothing else:

```
src/components/three/InteriorScene.tsx:270   opacity: showPhoto ? 1 : 0,
src/components/three/InteriorScene.tsx:271   transition: 'opacity 1.4s var(--ease-editorial)',
src/components/three/InteriorScene.tsx:282   style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.6s var(--ease-editorial)' }}
```

The other three techniques are present in the vocabulary but belong to different moments:

* **clip-path + scale** are the photograph's *entrance*, fired once by an IntersectionObserver before
  the canvas exists — `SceneFallback.tsx:114–117` (`transform: translate3d(...) scale(1.08)`,
  `clipPath: revealed ? 'inset(0)' : 'inset(0% 0% 12% 0%)'`, `transition: 'clip-path 1.4s …, opacity 1.2s …'`).
  By the time the canvas fades in, `revealed` is already true and neither value moves again.
* **blur** is the loader backdrop (`ThreeLoader.tsx:109`), a static `blur-2xl`, not a transition.

And the homepage's 3D → photography *narrative* beat — item 18's "camera transition → gallery" — has
no transition component at all. `Hero3D` (`:88` `data-hero-tone="dark"`, `:95` `InteriorScene`) is a
`bg-espresso` 100svh band; the next enabled section is `FEATURED_PROJECTS` on `bg-canvas`. They abut.
Same at the end of the pinned band: `ImmersiveProject.tsx:265` `h-[300vh]` → `:267` `sticky top-0`
holds the scene, and when the sticky panel releases the next section simply begins. Nothing
cross-fades, scales, clips or blurs between the 3D moment and the photography that follows it.

Uncertainty, stated plainly: if the brief means only "the moment the canvas replaces the still", the
shipped opacity crossfade is arguably enough and this is close to MET. If it means the composed
transition *out of* 3D and *into* the photographic run — which is how §17 reads next to §4's
narrative — then the piece is absent. I mark PARTIAL because at minimum three of the four techniques
the requirement names are not animated in the transition it names.

### 47. Global page transition: overlay expands, new page loads, overlay reveals — 0.8–1.2s — **MET**

Mounted globally: `src/app/layout.tsx:15` imports it, `:154` `<PageTransition>{children}</PageTransition>`
inside `<Providers>`, so it wraps every route.

The shape is exactly cover → swap → reveal. `PageTransition.tsx:100` builds
`curtainTimeline({ panel, mark, onCovered: swap })`; `pageTransition.ts:67` `tl.to(panel, { scaleY: 1 })`
from `transformOrigin: '50% 100%'`, `:78–79` `addLabel('covered')` + `tl.call(onCovered)`, `:85–86`
flip the origin to `'50% 0%'` and retract. The swap under cover does the three things a route change
owes: `PageTransition.tsx:80` advances the shown path, `:82` `scrollToTop()` (through Lenis —
`scroll.ts:34–40`), `:85` swaps the frozen tree for the newest children, and `:118`
`ScrollTrigger.refresh()` re-measures every trigger against the layout the reader now sees.

The budget is clamped in code, not by luck: `config.ts:187–192` sums `curtainIn 0.5 + curtainOut 0.6`
(`:26`, `:28`), scales by the admin speed dial, then `Math.min(1.2, Math.max(0.8, raw))`.

**Timed in the browser**, `/studio` → `/services`, a plain header link (a project card would suppress
the curtain — `projects.ts:179` `suppressNextCurtain()`):

```
built dur=1.1 t=10.446
complete t=11.576          → 1.130 s of GSAP ticker time, end to end
```

rAF sampling of the panel agrees: fully covered by ~0.26s, held covered to ~0.43s, `opacity: 0` at
~0.95s from the first visible frame (sampler starts late — `power4.inOut` leaves `scaleY` under
0.0005 for the first ~50ms — and dropped frames under dev load). **1.13s, inside the 0.8–1.2s band.**

Correctly reactive to reduced motion, unlike the one-shot store reads the previous audit flagged in
`CustomCursor`/`Header`: `:37` `const enabled = useMotionFlag('pageTransition')`, in the effect's deps
at `:110`. When disabled or when a card expansion has claimed the navigation (`:91–93`) it swaps
instantly with no curtain.

**Observation, not a verdict:** `PageTransition.tsx` currently carries live debug instrumentation —
`// TEMP-AUDIT` at `:73`, writes to `window.__PTLOG` at `:76`, `:92`, `:101`, and
`tl.eventCallback('onComplete', …)` at `:102` which overwrites the timeline's own `onComplete` hook.
Harmless today (`PageTransition` passes no `onDone`) but it must come out before delivery. I read
`__PTLOG` for the measurement above, so I can confirm it is running in the browser right now.

### 48. Preloader only when needed, 0.8–2s, skipped when assets are cached — **PARTIAL**

**"Only when needed" — MET.** The loader is gated behind the same predicate as the canvas:
`InteriorScene.tsx:343` `{canRender && !curtainDone && <ThreeLoader … />}`, where `canRender`
(`:175–182`) requires WebGL, a non-`low` device, a real scene mode, `threeDAnimation`, and
**not** reduced motion. No WebGL, weak phone, reduced motion, or `SceneMode.NONE` → no curtain at
all, just the photograph. `/projects` ships no canvas and therefore no loader (verified: zero
`<canvas>` on the index).

**"0.8–2s" — borderline. "Skipped when cached" — MISSING.** Nothing in `ThreeLoader.tsx` or
`InteriorScene.tsx` inspects cache state — no `PerformanceResourceTiming.transferSize` check, no
"already mounted this scene" flag, no session marker. The curtain runs its full choreography every
time, and that choreography has a hard floor:

```
src/components/three/ThreeLoader.tsx:86   const timer = window.setTimeout(finish, 180)   // settled path
src/components/three/ThreeLoader.tsx:77           delay: 0.12,
src/components/three/ThreeLoader.tsx:75           duration: 0.95,
```

→ ≥ 1.25s after the loaders go quiet, and on the idle path (`:20` `IDLE_GRACE_MS = 700`, `:90`) —
which is exactly the re-mount-with-everything-cached case, where drei reports no active loads —
the floor is 700 + 120 + 950 = **1.77s of espresso over an already-decoded scene.**

**Measured on a warm reload** (same context, second load, everything in HTTP cache): the loader
appeared, went `PREPARING SPACE 000` → `100` within **185ms** — the work was done almost instantly —
and then sat on screen for a further ~1.9s, unmounting **2.09s** after it appeared. On the cold load
it was visible ~3.05s (3.70s → 6.76s), which is over the 2s ceiling even allowing for dev-server
compile time.

So the visitor who has already been to the site still gets a two-second curtain telling them a space
is being prepared that is already prepared. That is the specific thing this requirement exists to
prevent.

---

## R11 Reveal systems

### 49. Six image reveal variants exist and are used *deliberately* — not one variant everywhere — **PARTIAL**

All six exist and are typed end to end — `internal.ts:103–140` (`revealFromVars` / `revealToVars`),
the admin picker `contracts.ts:145–150`, the persisted enum `server/actions/projects.ts:258`. The
delivery is the problem. Census of every non-admin call site plus every seeded block:

| variant | component call sites | reached by seeded content | verdict |
|---|---|---|---|
| `revealUp` | **26** — `ProjectIndex.tsx:35`, `ProjectGrid.tsx:41`, `ProjectInfo.tsx:49,50`, `ProjectText.tsx:36`, `ProjectQuote.tsx:26`, `ProjectCta.tsx:35`, `Project3D.tsx:85`, `BeforeAfter.tsx:54`, `ProjectMaterials.tsx:35`, `ProjectHero.tsx:79`, `Hero3D.tsx:69`, `FeaturedProjects.tsx:37,119`, `StudioIntro.tsx:32,34`, `Philosophy.tsx:22`, `Services.tsx:77,78`, `Journal.tsx:36,78`, `CtaSection.tsx:19`, `ImmersiveProject.tsx:96,115`, `contact/page.tsx:63` | yes, everywhere | ships |
| `revealClip` | **15** + the default of `useImageReveal` (`image.ts:32`), `ProjectFigure` (`:156`), `ProjectImage` (`:53`), `ProjectGallery` (`:59`), `ProjectCard` (`:128`) | yes — `seed.ts:241` `{ width: 'wide', reveal: 'revealClip' }` on every project | ships |
| `revealScale` | **2** — `ProjectMasonry.tsx:58`, `studio/page.tsx:367` | yes — masonry block renders on project pages (verified: 1 `div.columns-1` on `/projects/den-giay-ban-mai`); `/studio` materials grid renders 10 frames | ships, thinly |
| `revealParallax` | **0** | yes, but **only** via `seed.ts:250` `{ width: 'full', reveal: 'revealParallax' }` — verified live (140px frame drift measured on `/projects/den-giay-ban-mai`) | ships by data only |
| `revealLeft` | **0** | **no** | **never renders** |
| `revealRight` | **0** | **no** | **never renders** |

The complete set of references to `revealLeft` / `revealRight` in the repository is three lines each,
all of them plumbing:

```
src/components/admin/project/contracts.ts:147   { value: 'revealLeft', label: 'Trôi từ trái' },
src/components/admin/project/contracts.ts:148   { value: 'revealRight', label: 'Trôi từ phải' },
src/components/admin/project/contracts.ts:155-156   'revealLeft', 'revealRight',
src/server/actions/projects.ts:258   .enum([… 'revealLeft', 'revealRight' …])
```

The requirement is *explicitly* that variants are used deliberately and not one variant everywhere.
What actually ships is a 26 : 15 : 2 : 1 : 0 : 0 distribution. Two of the six are correct, finished,
selectable in the admin — and no visitor will ever see them, because no component chooses them and
the seed never writes them. That is a delivery gap of exactly the kind this audit is asked to catch:
the code is fine, nothing reaches it. `revealScale` and `revealParallax` are one editorial decision
away from the same fate.

### 50. Large typography animates by line / word / block, never character-by-character — **MET**

The splitter can only produce lines and words. `src/animations/text.ts:59–63`:

```
split = new SplitText(el, {
  type: by === 'word' ? 'words' : 'lines,words',
  mask: by === 'word' ? 'words' : 'lines',
  linesClass: 'an-split-line',
  wordsClass: 'an-split-word',
```

`type` never contains `'chars'` and there is **no** `chars` / `charsClass` string anywhere in `src/`
or `scripts/` (grep returns zero). The tween moves whole pieces out of an `overflow: hidden` mask —
`:76` `gsap.set(targets, { yPercent: 108 })` → `yPercent: 0`, with `[data-split-line] { display:block;
overflow:hidden }` at `globals.css:171–174`. If `SplitText` throws on exotic markup it degrades to a
plain `revealUp` fade of the whole element rather than exposing characters (`text.ts:66–73`).
Splitting waits for real font metrics (`internal.ts` `whenFontsReady`, 500ms ceiling).

Block-level reveal is the third granularity the requirement asks for and it is the `useReveal`
`[data-reveal-item]` mechanism (`internal.ts:55–58`) — e.g. `StudioIntro.tsx:32` staggers label →
heading → body → CTA as four blocks.

**Counted in the browser** after scrolling each route end to end:

| route | `.an-split-line` | `.an-split-word` | `.an-split-char` |
|---|---|---|---|
| `/` | 13 | 42 | **0** |
| `/projects/den-giay-ban-mai` | 12 | 60 | **0** |
| `/studio` | 6 | 20 | **0** |
| `/services` | 3 | 10 | **0** |
| `/journal` | 3 | 8 | **0** |
| `/contact` | 3 | 10 | **0** |

Consumers are real display type, not test fixtures: `Hero3D.tsx:63` (the `<h1>`), `Philosophy.tsx:21`
(the blockquote), `Journal.tsx:35` (card titles), `ProjectHero.tsx:78` (the project `<h1>`).

### 51. Section storytelling: image enters → title → description → image drift → overlap — **PARTIAL**

The first three beats are real, deliberate and repeated; the fourth is real but decoupled; the fifth
does not exist anywhere on the public site.

**image → title → description — present.** The cadence is expressed as explicit delays:

* `Journal.tsx:34–36` — `useImageReveal(frameRef, revealClip)` at delay 0 → `useTextReveal(titleRef,
  { by: 'line', delay: 0.1 })` → `useReveal(metaRef, { delay: 0.15, stagger: 0.06 })`.
* `ProjectHero.tsx:78–79` — the strongest version: the title block does not mount at all until the
  visual has settled (`:174` `onReady`, `:184` `onLoad`, `:132` a 1400ms ceiling), then line reveal at
  `delay: 0.1` and metadata at `delay: 0.55`.
* `ImmersiveProject.tsx:95–96` — stacked stage: image clip, caption at `delay: 0.1`.
* `ProjectText.tsx:36` — heading, then body at `delay: 0.25`.

**image drift — present but not sequenced into the story.** `FeaturedProjects.tsx:36`
`useParallax(figureRef, { strength: 0.45 })`, `Philosophy.tsx:25` `strength: 0.5`,
`ProjectGallery.tsx:61` cycling `[0.22, 0.36, 0.28]`. These are independent `top bottom → bottom top`
scrubs, not a beat that follows the description.

**Two concrete shortfalls:**

1. The flagship storytelling band does not order its own beats. `FeaturedProjects.tsx:35–37`:
   ```
   useReveal(figureRef, { variant: 'revealClip' })
   useParallax(figureRef, { strength: 0.45 })
   useReveal(metaRef, { variant: 'revealUp', stagger: 0.08 })
   ```
   The metadata column carries **no `delay`**, and image and metadata sit in the same grid row
   (`:51` `md:row-start-1 md:col-span-7` vs `:77` `md:row-start-1 md:col-span-4`), so both triggers
   cross `top 82%` together. Title and description arrive *with* the image, not after it. Every other
   surface on the site gets this right; the one that is meant to be the showcase does not.

2. **"Overlap" is absent site-wide.** There is no overlapping composition anywhere in
   `src/components/sections/**`, `src/components/projects/**` or `src/app/(site)/**`: a repo-wide grep
   for negative-margin utilities returns four hits, all in admin chrome (`admin/Dialog.tsx:106`,
   `admin/SaveBar.tsx:55`); there is no negative inline `marginTop`, no `mt-[-…]`, and no z-stacked
   image-over-text. Every "two-column with an image" band is adjacent columns with a gap —
   `FeaturedProjects` 7 + 4 across 12 with `gap-x-8`, `StudioIntro.tsx:54,82` 6 + 5 starting at
   column 8. The editorial asymmetry the brief asks for is there; the overlap is not.

### 52. Pinning is used sparingly; galleries carry subtle parallax (±10%, no more) — **PARTIAL**

**Pinning — exemplary.** There is exactly **one** ScrollTrigger with `pin` in the entire repository:

```
src/animations/projects.ts:41   const { scrub = 1, endPadding = 0, pin = true } = opts
src/animations/projects.ts:68   pin,
src/animations/projects.ts:69   anticipatePin: 1,
```

It is reached through exactly one component chain — `HorizontalScroll.tsx:38` →
`RelatedProjects.tsx:136` — i.e. the closing rail of a project detail page, and nowhere else. It is
triple-gated: `projects.ts:58` `mm.add(HORIZONTAL_QUERY, …)` where `HORIZONTAL_QUERY` is
`(min-width:1024px) and (prefers-reduced-motion: no-preference)` (`config.ts:163`); the admin motion
switch (`projects.ts:52`); and `RelatedProjects.tsx:113` refuses to mount the rail unless the track
will actually travel ≥ 320px (`:71` `MIN_TRAVEL_PX`), so it never pins a page it cannot move.

Counted live — `.pin-spacer` in the DOM after scrolling each route top to bottom:

```
/                       0        (the 300vh immersive band uses CSS sticky:
/projects               0         ImmersiveProject.tsx:265 h-[300vh] + :267 sticky top-0 — not a pin)
/studio                 0
/services               0
/journal                0
/contact                0
/projects/[slug]        1        (RelatedProjects)
```

One pin, on one route family. That is "sparingly" by any reading.

**Parallax — over budget, and unenforced.** `useParallax` computes a **fixed pixel** travel with no
reference to the frame it is drifting inside:

```
src/animations/image.ts:133   const travel = dist(DISTANCE.parallax * strength)     // DISTANCE.parallax = 140 (config.ts:78)
```

So the percentage is whatever the viewport makes it. Nothing clamps it — despite two doc comments
promising otherwise:

```
src/components/projects/ProjectFigure.tsx:25   /** Vertical overscan of the inner wrapper, in %. Caps the drift at ±10%. */
src/components/projects/ProjectFigure.tsx:47   /** Slow vertical drift of the image inside its frame. Never exceeds ±10%. */
src/components/projects/ProjectGallery.tsx:43  /** Three drift rates, cycled — all well inside the ±10% ceiling. */
```

Measured travel ÷ live frame height, sampled every 0.2–0.25 viewport through each page:

| surface | strength | travel | frame | ±% of frame |
|---|---|---|---|---|
| `ProjectGallery` plate, 1440px (`ProjectGallery.tsx:61`) | 0.36 | 50.4px | 476px | ±5.3 |
| `FeaturedProjects` figure, 1440px (`:36`) | 0.45 | 63px | 500px | ±6.3 |
| `Philosophy` figure, 1440px (`:25`) | 0.50 | 70px | 534px | ±6.6 |
| **`revealParallax` full-bleed block, 1440px** | — | **140px on the frame + 42px on the media** | 801px | **±11.4 combined** |
| **`Philosophy` figure, 390px** (`:74` `aspect-[16/9]` on mobile) | 0.50 | 70px | **211px** | **±16.6** |
| `ProjectGallery` plate, 390px | 0.36 | 50.4px | 251px | ±10.0 |

Two findings fall out of this:

1. **The seeded full-bleed block runs two parallaxes on nested elements.** `seed.ts:250` writes
   `{ type: 'IMAGE', width: 'full', reveal: 'revealParallax' }` on **every** project. `ProjectImage.tsx:68`
   turns `width === 'full'` into `parallax` with `strength: 0.3` (`:69`), so `ProjectFigure`'s
   `ParallaxFrame` runs `useReveal(frameRef, { variant: 'revealParallax' })` **and**
   `useParallax(frameRef, { strength: 0.3 })` (`ProjectFigure.tsx:126–127`). The first of those is not
   an entrance at all — `reveal.ts:65–83` turns `revealParallax` into a scrubbed `y: +70 → −70` on the
   **frame itself** — while the second drifts the media 42px *inside* that moving frame. Measured on
   `/projects/den-giay-ban-mai`: 140px of frame travel over an 801px frame, plus 42px of media travel.
   The whole plate slides against its neighbours, which is a different and louder gesture than the
   masked drift the brief describes.

2. **On mobile the drift breaks out of its own overscan.** `Philosophy.tsx:76` insets the media layer
   by `top-[-8%] bottom-[-8%]`; at 390×844 the figure is 211px tall, so that overscan is ±16.9px
   against a ±35px drift. The frame edge shows. Confirmed by pixel geometry rather than inference —
   at `scrollY = 11732` the media layer's top sits **12.55px below** the frame's top, exposing a band
   of `rgb(220, 213, 199)` = `--c-surface-alt` `#DCD5C7`; at `scrollY = 12660` the same band appears
   at the bottom (15.3px). `ProjectFigure`'s 12% overscan (`:26`, `:140`) protects its own frames, but
   the hand-rolled 8% wrappers in `FeaturedProjects.tsx:60` and `Philosophy.tsx:76` do not, and
   nothing in the hook knows the difference.

Interpretive honesty: read as "half-travel ≤ 10% of the frame" — which is the reading
`ProjectFigure.tsx:25` itself takes, pairing "±10%" with a 12% overscan — the desktop gallery, featured
and philosophy figures all pass, and only the mobile Philosophy figure (±16.6%) and the composite
`revealParallax` block (±11.4%) fail. Read as "total travel ≤ 10%", most of the table fails. Either
way the mechanism has no cap in it, so which side of the line any given figure lands on is an accident
of viewport and aspect ratio, not a decision.

---

## Failure-mode check — reload `/projects`, nothing stuck invisible above the fold

Requested explicitly, and it **passes**. The anti-flash rule is
`globals.css:167–169` `[data-reveal]:not([data-reveal-ready]) { opacity: 0 }`, released by
`markReady()` (`internal.ts:27–31`), which every hook calls on *every* path — including the
motion-disabled early return (`reveal.ts:59–61`), the zero-travel parallax path (`:67`), before the
tween (`:89`), and again in cleanup (`:110`).

Measured on a healthy server, hard reload, sampled at 2s intervals from 2s to 15s after
`domcontentloaded`:

```
/projects            210 [data-reveal] elements, 0 above the fold without [data-reveal-ready]   (stable at every sample)
/                    0 stuck
/studio /services /journal /contact /projects/[slug]    0 stuck, 0 console errors, no error boundary
```

Nothing waits for a scroll that never comes: `ProjectIndex.tsx:35` arms per row and `markReady`
fires in the layout effect regardless of whether the trigger has been crossed.

Two caveats worth recording:

* The rule is **JS-gated with no `<noscript>` escape** — a repo-wide grep for `noscript` returns
  zero. If hydration never completes, every `[data-reveal]` element stays at `opacity: 0` permanently.
  I saw exactly this transient once, on a dev server so overloaded it was taking 90s to serve a route:
  the first `IndexRow` (`ProjectIndex.tsx:38`) and its `ProjectFigure` frame were both above the fold
  at `opacity: 0` without the ready attribute. It resolved as soon as the chunks landed, and did not
  reproduce on a healthy server. The `prefers-reduced-motion` branch already has the right escape
  (`globals.css:183–185` sets it back to `opacity: 1`); a `<noscript><style>` doing the same would
  close the last hole.
* The homepage returned an HTTP 500 on my very first request, with the `(site)` error boundary
  catching a `ScrollTrigger.refresh()` recursion (`Cannot read properties of undefined (reading 'end')`)
  raised from a `useReveal` context in `<ProjectInfo>`. It did not reproduce on any subsequent load,
  and other agents were editing `reveal.ts` at the time, so I record it as observed-once rather than
  as a finding — but a refresh recursion out of `useReveal` is worth someone re-checking once the
  tree stops moving.

---

## TOP GAPS

1. **Item 48 — the preloader is never skipped, and never short.** Nothing in
   `src/components/three/ThreeLoader.tsx` looks at whether the assets are already there. Measured
   **2.09s** of espresso curtain on a warm reload where the progress hairline reached 100 in 185ms,
   and the idle path floor is 700 + 120 + 950 = **1.77s** (`:20`, `:77`, `:75`, `:90`). The one thing
   the requirement asks be conditional is unconditional.
   *Remedy — `src/components/three/ThreeLoader.tsx`:* when the first `useProgress` sample already
   reports `!active && progress === 0` **and** the fallback image's `PerformanceResourceTiming.transferSize
   === 0` (or a module-level `Set` of scene ids already mounted this session says so), skip the curtain
   entirely — `setHidden(true)` and call `onDone()` synchronously — instead of running `IDLE_GRACE_MS`
   plus the 0.95s fade.

2. **Item 52 — parallax travel is a pixel budget with no percentage cap, and it visibly breaks the
   frame on mobile.** `src/animations/image.ts:133` `travel = dist(DISTANCE.parallax * strength)` never
   looks at the element it is moving, so `Philosophy.tsx:25`'s `strength: 0.5` is ±6.6% of a 534px
   desktop frame and ±16.6% of a 211px mobile one — past the ±16.9px overscan at
   `Philosophy.tsx:76`, exposing a measured 12.55px band of `--c-surface-alt` inside the figure.
   `ProjectFigure.tsx:25` and `:47` document a ±10% cap that no code enforces.
   *Remedy — `src/animations/image.ts`:* clamp inside `useParallax` against the measured element —
   `const travel = Math.min(dist(DISTANCE.parallax * strength), el.offsetHeight * 0.2)` (±10% each way),
   recomputed in an `invalidateOnRefresh` function-based value so a resize re-measures. That fixes every
   call site at once and makes the two doc comments true.

3. **Item 49 — `revealLeft` and `revealRight` are unreachable.** Zero component call sites and zero
   seeded blocks; the only references are the admin picker (`contracts.ts:147–148`, `:155–156`) and the
   Zod enum (`server/actions/projects.ts:258`). Meanwhile `revealUp` and `revealClip` account for 41 of
   the 44 shipped choices, which is the "one variant everywhere" the requirement names.
   *Remedy — `scripts/seed.ts` around `:241–250`:* alternate the IMAGE blocks' reveal by index —
   `reveal: ['revealClip','revealLeft','revealScale','revealRight'][i % 4]` for the `wide` plates —
   so every variant renders in the sample content; and give `FeaturedProjects.tsx:35` a
   side-aware variant (`flip ? 'revealRight' : 'revealLeft'`), which is what the alternating layout is
   already asking for.

4. **Item 51 — the showcase band fires its own beats simultaneously, and nothing on the site
   overlaps.** `FeaturedProjects.tsx:37` reveals the metadata column with no `delay` while
   `:35` reveals the image on the same `top 82%` line and the same grid row, so image, title and
   description arrive together — the one band where the storytelling cadence matters most is the one
   band that does not have it. Separately, "overlap" exists nowhere: no negative margin or z-stacked
   composition in any public component.
   *Remedy — `src/components/sections/FeaturedProjects.tsx`:* `useReveal(metaRef, { variant: 'revealUp',
   delay: 0.35, stagger: 0.08 })` at `:37` to put the copy behind the image; and pull the metadata
   column one column into the image (`md:col-start-8` against the image's `md:col-span-7`, with
   `relative z-10` and a `bg-canvas` inset) to supply the overlap beat the requirement's last clause asks
   for.

5. **Item 46 — the 3D↔photography handoff animates opacity only, and the narrative boundary has no
   transition at all.** `InteriorScene.tsx:270–271` and `:282` are pure opacity cross-fades; the
   clip-path and scale live in `SceneFallback.tsx:114–117` as a one-shot *entrance* that has already
   finished by then, and the blur is a static backdrop in `ThreeLoader.tsx:109`. Between `Hero3D`'s
   espresso 3D band and the `bg-canvas` photography that follows it, nothing transitions.
   *Remedy — `src/components/three/InteriorScene.tsx`:* drive the two layers with a single GSAP timeline
   at the `ready` flip instead of two independent CSS transitions — photo `{ opacity: 0, scale: 1.04,
   filter: 'blur(6px)', clipPath: 'inset(0% 0% 8% 0%)' }` against canvas `{ opacity: 1, scale: 1,
   clipPath: 'inset(0)' }`, `1.4s power2.inOut` — so all four techniques the requirement names are
   actually in the transition it names.

**Also, before delivery:** remove the `// TEMP-AUDIT` instrumentation left in
`src/components/animation/PageTransition.tsx:73–76`, `:92`, `:101–102` — it writes to `window.__PTLOG`
on every navigation and its `tl.eventCallback('onComplete', …)` at `:102` overwrites
`curtainTimeline`'s own completion hook.
