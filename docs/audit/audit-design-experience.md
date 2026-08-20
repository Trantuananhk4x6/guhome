# Audit — R3 Design direction & R4 Core experience (items 12–19)

Scope: `docs/REQUIREMENTS.md` items 12–19 only.
Method: read the code on disk, then verified every visual and behavioural claim against the
running dev server at `http://localhost:3000` — Playwright at 1600×1000, `curl` against the SSR
HTML and the emitted font CSS, and a live theme write through `/admin/theme` (logged in with
`ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env.local`; the login succeeded and
`src/middleware.ts` correctly bounced `/admin/theme` → `/admin/login?next=%2Fadmin%2Ftheme`
first). `npm run build` was never run. `npx tsc --noEmit` was run twice.
Date of audit: 2026-08-20, 11:40–12:20 local.

**Audit conditions — read this before trusting any line number.** The tree moved under this
audit continuously. `src/animations/camera.ts`, `src/components/sections/Hero3D.tsx`,
`src/components/three/DepthScene.tsx`, `src/components/sections/ImmersiveProject.tsx`,
`src/app/(site)/page.tsx`, `src/lib/theme.ts`, `src/app/layout.tsx`, `src/styles/globals.css`,
`src/components/admin/site/ThemeEditor.tsx` and `src/components/admin/site/contracts.ts` were
all rewritten mid-session; the dev server returned HTTP 500 for roughly six minutes while a
typography refactor landed; and another agent was driving the same Playwright browser and the
same admin session throughout. Every line number below was re-read from disk after the last
change I observed, but this is a moving target. Two findings (items 13 and 17) describe
behaviour that **changed during the audit window** and I say so explicitly in each.

Verdict key — **MET** (proved in the code *and* in the browser) · **PARTIAL** (the mechanism is
there but what a visitor actually gets falls short) · **MISSING** (absent or contradicted).

| # | Requirement | Verdict |
|---|---|---|
| 12 | Warm neutral palette, admin-editable at runtime, no rebuild | **MET** |
| 13 | Display serif (Cormorant Garamond) + clean sans body (Inter) | **PARTIAL** |
| 14 | Oversized typography, large whitespace, asymmetric editorial composition | **MET** |
| 15 | No SaaS-template look, no gaming look, no excessive gradients/neon/rounded cards | **MET** |
| 16 | Priority order photography → architecture → typography → story → 3D → motion | **MET** |
| 17 | 3D is invisible as technology; never obscures the architecture | **PARTIAL** |
| 18 | Homepage narrative Landing → … → contact | **PARTIAL** |
| 19 | Scrolling feels like operating a cinematic camera | **PARTIAL** |

**Totals: MET 4 · PARTIAL 4 · MISSING 0.**

---

## R3 Design direction

### 12. Warm neutral palette, editable from Admin at RUNTIME with no rebuild — MET

The whole path exists and every hop is proved, not assumed.

**Neon → query.** The singleton lives in `theme_settings` (`src/server/db/schema.ts:334`).
`getThemeSettings()` (`src/server/queries/site.ts:54–76`) is a React `cache()` that takes the
newest row and merges it over `DEFAULT_THEME` **key by key**, so a partially-filled row can
never leave a token undefined:

```ts
// src/server/queries/site.ts:67–72
return {
  colors: { ...DEFAULT_THEME.colors, ...row.colors },
  typography: { ...DEFAULT_THEME.typography, ...row.typography },
  ...
}
```

**Query → CSS.** `themeToCssVars()` (`src/lib/theme.ts:192–224`) emits the nine `--c-*`
declarations, sanitising each one through `cssColor()` (`:155–160`) — anything that is not a
hex / functional / named colour is replaced by the default, so a bad DB value cannot inject
into the stylesheet. `themeStyleSheet()` (`:228–230`) wraps them in `:root:root{…}` —
specificity (0,2,0), which deliberately outranks both the Tailwind `@theme` layer and the
`:root` fallbacks in `globals.css`, so stylesheet order at runtime is irrelevant.

**CSS → page.** `src/app/layout.tsx:81–86` injects it:

```tsx
<style id={THEME_STYLE_ID} href="an-atelier-theme" precedence="high"
       dangerouslySetInnerHTML={{ __html: themeStyleSheet(theme) }} />
```

Verified in the served bytes, not in the JSX — `curl -s http://localhost:3000/` returns, inside
`<head>`, before the first script tag:

```html
<style data-precedence="high" data-href="an-atelier-theme">:root:root{--c-canvas:#f4f1ea;
--c-surface:#eae5da;--c-surface-alt:#dcd5c7;--c-ink:#1c1b18;--c-muted:#78736a;--c-line:#d7d0c2;
--c-espresso:#131210;--c-accent:#a07753;--c-accent-soft:#c7a57c;…}</style>
```

**Vars → Tailwind.** `src/styles/globals.css:10–19` maps every utility colour onto the runtime
property, never onto a hex: `--color-canvas: var(--c-canvas)` … `--color-accent-soft:
var(--c-accent-soft)`. `:root` (`:39–47`) holds the same nine values as a no-JS/no-DB fallback.

**The palette itself is the warm neutral one.** `src/lib/theme.ts:90–100` — limestone `#F4F1EA`,
oat `#EAE5DA`, `#DCD5C7`, ink `#1C1B18`, muted `#78736A`, line `#D7D0C2`, espresso `#131210`,
bronze-clay accent `#A07753` / `#C7A57C`. Exactly ARCHITECTURE §2. No cool hue anywhere.

**Live proof (this is the part that matters).** Logged in at `/admin/login`, opened
`/admin/theme`, changed the accent hex field from `#A07753` to `#2E5AAC` and clicked
*Lưu giao diện*. `saveTheme()` validates through Zod (`src/server/actions/theme.ts:90–95`),
persists (`:132–167`) and calls `revalidatePath('/', 'layout')` (`:128–130`, invoked at `:188`).
Within about a second, with **no rebuild and no dev-server restart**:

```
$ for p in / /projects /studio; do curl -s "http://localhost:3000$p" | grep -o -- '--c-accent:#[0-9a-f]*'; done
--c-accent:#2e5aac
--c-accent:#2e5aac
--c-accent:#2e5aac
```

and the browser screenshot of `/services` showed the nav underline under *DỊCH VỤ*, the hairline
before the `SERVICES` eyebrow and the `01 02 03` index numerals all repainted blue while
everything else stayed put. I then set it back to `#A07753` and re-verified both by `curl` and
by a final SSR read at 12:20 — the palette is as I found it. Note this survives the
homepage's `export const revalidate = 300` (`src/app/(site)/page.tsx:16`) because the layout-level
revalidation invalidates it.

**One dead thread, not a failure.** `THEME_STYLE_ID` (`src/lib/theme.ts:86`) is documented as
*"id of the injected `<style>` element, so the admin preview can hot-swap it"*. Nothing reads
it (`grep -rn THEME_STYLE_ID src/` returns only the export and the `id=` prop), and it could not
work if something did: React 19 hoists a `<style href precedence>` into `<head>` and drops the
`id` — `grep -c 'id="an-theme-vars"'` on the served HTML returns **0**. Delete the constant or
the comment.

### 13. Display serif (Cormorant Garamond) + clean sans body (Inter) — PARTIAL

**The loading engineering is exemplary and fully MET.** Fonts come from `next/font/google`, so
they are self-hosted: `grep 'fonts.googleapis.com\|fonts.gstatic.com'` on the served homepage
returns **zero** hits, and the global stylesheet carries 24+ locally-served `.woff2` URLs under
`/_next/static/media/`. Subsets are `['latin','latin-ext','vietnamese']` (`src/app/layout.tsx:37`),
and the emitted CSS proves the Vietnamese range really ships —
`unicode-range: U+102-103, U+110-111, …, U+1EA0-1EF9, U+20AB`. `display: 'swap'` on every family.

**A font swap does not shift the layout**, because next/font generates metric-matched local
fallback faces:

```css
@font-face { font-family: Cormorant Garamond Fallback; src: local(Times New Roman);
  ascent-override: 95.27%; descent-override: 29.59%; line-gap-override: 0.0%; size-adjust: 96.98%; }
@font-face { font-family: Inter Fallback; src: local(Arial);
  ascent-override: 90.44%; descent-override: 22.52%; line-gap-override: 0.0%; size-adjust: 107.12%; }
```

and the family variable carries the fallback alongside the real face —
`--font-cormorant-garamond: "Cormorant Garamond", "Cormorant Garamond Fallback"`. The full
computed stack measured in the browser was
`"Cormorant Garamond", "Cormorant Garamond Fallback", "Cormorant Garamond", ui-serif, Georgia, serif`,
i.e. `var(--f-display)` → `@theme --font-display` (`globals.css:21`) → system serif. Three
levels, all present.

**But the families the requirement names are no longer the ones that ship.** During the audit
window a typography refactor landed. As of the final SSR read at 12:20:

```
--f-display:var(--font-playfair-display, 'Playfair Display');
--f-body:var(--font-be-vietnam-pro, 'Be Vietnam Pro')
```

and the computed `h1` on `/studio` is `112px / "Playfair Display"`, weight 500. The sources:

- `src/lib/theme.ts:103–104` — `DEFAULT_TYPOGRAPHY = { displayFont: 'Playfair Display', bodyFont: 'Be Vietnam Pro', … }`
- `src/lib/theme.ts:24–25` — `FONT_VAR_DISPLAY = '--font-playfair-display'`, `FONT_VAR_BODY = '--font-be-vietnam-pro'`
- `src/app/layout.tsx:39–51` — Playfair and Be Vietnam Pro are the only two preloaded; Cormorant
  (`:69–75`) and Inter (`:77–83`) are now `preload: false`
- `src/styles/globals.css:21–22, 49–50` — the CSS fallbacks and the `:root` defaults both name
  Playfair Display / Be Vietnam Pro
- `scripts/seed.ts:560` writes `DEFAULT_THEME` when the theme table is empty, so a fresh seed
  now bakes Playfair/Be Vietnam Pro in, and the admin's *Khôi phục mặc định* does the same

I earlier measured the site rendering Cormorant Garamond + Inter (from the DB row); by the end
of the session the DB row itself carried the new pair. Both requirement families are still
bundled and still offered in the theme editor (`src/components/admin/site/contracts.ts:66–73`),
so restoring the brief's pairing is two dropdowns and a save — no rebuild. That is why this is
PARTIAL and not MISSING.

Two side effects worth naming:

- `src/styles/globals.css` is on the **do-not-touch** list in `ARCHITECTURE.md` §0 and was edited
  (`:21–22`, `:49–50`) to carry the new families. That is a contract violation regardless of
  whether the change is a good idea.
- Seven families now emit `@font-face` into the global stylesheet — **95 `@font-face` blocks**,
  and the chunk grew from 103,733 to 131,776 bytes — while only two of the seven ever render.
  The face files themselves are not fetched, but ~28 KB of CSS is, on every page.

The one detail that argues the refactor was considered rather than careless: `.u-display`'s
line-height was widened from `0.92` to `1.04` (`globals.css:142`) with the comment *"display
sizes need the same Vietnamese allowance"*, and in the `/studio` screenshot the stacked
diacritics of *Chúng tôi thiết kế / cho mười năm sau,* genuinely clear.

### 14. Oversized typography, large whitespace, asymmetric editorial composition — MET

Judged by looking at `/`, `/projects`, `/studio`, `/services`, `/journal` and `/contact` at
1600×1000, with the computed values behind each screenshot.

**Oversized: yes, measurably.** `.u-display` (`globals.css:137–144`) is
`clamp(2.25rem, 7vw, 8rem)` — measured **112 px** on `/studio` at 1600 px wide, against a 16 px
body. A **7 : 1** display-to-body ratio is architecture-magazine scale, not website scale.
Tracking `-0.02em`, weight 500 (`ls: -2.24px` measured). `.u-display-sm` is
`clamp(1.5rem, 3.4vw, 3.25rem)`; `.u-body-lg` is `clamp(1.0625rem, 1.15vw, 1.25rem)` at
line-height 1.75; `.u-label` is 11 px, `0.18em`, uppercase, muted (`:128–135`). Four steps, a
huge gap between the top two and the bottom two — the correct editorial shape.

**Whitespace: yes.** `--spacing-gutter: clamp(1.25rem, 4vw, 4.5rem)` measures **64 px** of inline
padding at 1600; `--spacing-section: clamp(6rem, 14vh, 12rem)` gives **140 px** of block rhythm at
1000 px tall. The homepage measured **15,999 px** tall across 8 bands — sixteen screenfuls for
eight ideas. `/studio` spends its entire first viewport on an eyebrow, three lines of headline
and a 52-character paragraph; the `/contact` hero leaves the whole right half of a 1600 px frame
empty and is better for it. Nothing is crowded anywhere I looked.

**Asymmetry: yes, and it is real asymmetry, not a centred column.** `FeaturedProjects.tsx:29–113`
alternates 7/4 columns on a 12-column grid with `flip = index % 2 === 1`; the screenshot at
scroll 1900 shows a full-bleed image right, metadata dial left, then the mirror. `/services`
puts a 3-line 112 px headline in the left 45% and a hairline-ruled numbered list in the right
third. `Philosophy.tsx:52` sets a `max-w-[18ch]` blockquote against a 16/6 full-bleed strip.

**The reservation, stated as a critic and not a cheerleader.** The asymmetry is one composition,
applied five times. `/studio:137`, `/services:46`, `/journal:49`, `/contact:46` and
`/projects:67` all open with the identical construction — `Label` eyebrow, then
`<h1 class="u-display mt-10 max-w-[NNch]">`, then `u-body-lg max-w-[52ch]`, then a
`lg:grid-cols-12` band. Land on any four of those pages in a row and they read as the same page
with different words. The brief asked for asymmetric *composition*; what shipped is an
asymmetric *template*. `/projects` suffers worst: the same 112 px class applied to the two-syllable
word *Dự án* leaves an enormous dead field above and to the right that the long headlines on the
other pages fill. This does not sink the requirement — the type, the measure and the air are all
right — but a second and third opening composition (a full-bleed image lede, or a
headline set right against a left rail) is the difference between "editorial" and "a template".

### 15. No SaaS-template look, no gaming look, no excessive gradients/neon/rounded cards — MET

The greps are decisive.

**Rounded cards: zero.** `grep -rn "rounded-2xl\|rounded-3xl\|rounded-xl\|rounded-lg\|rounded-md" src/`
returns **0 hits**. `rounded-full` appears three times, in exactly the two places the contract
allows: `src/components/layout/CustomCursor.tsx:139,150` (the cursor ring) and
`src/components/ui/Spinner.tsx:25`. Squareness is asserted, not assumed —
`rounded-none` is spelled out on the button base (`ui/Button.tsx:75`), the field base
(`ui/Field.tsx:86`), the dialog surface (`ui/DialogSurface.tsx:90`) and the toast
(`ui/ToastViewport.tsx:55`). `src/components/admin/StatusPill.tsx:24` carries the comment
*"Square, hairline status marker. 10px uppercase — never a rounded badge."*

**Gradients: six, all functional, none decorative.** Every one is a legibility scrim built from a
single espresso token with alpha — `Header.tsx:171`, `Hero3D.tsx:36–39`,
`ImmersiveProject.tsx:48–51` (all `linear-gradient(… color-mix(in srgb, var(--c-espresso) N%, transparent) …)`),
plus one lens vignette at `three/SceneFallback.tsx:142`. No two-hue gradient, no gradient text,
no gradient border, nothing neon. Hero3D's own comment names the reason: *"Type over a
photograph needs a floor under it. Two shallow gradients — one at each end of the frame — hold
the copy without flattening the picture the way a full-panel scrim does."*

**Shadows: seven, and they are all the same soft image shadow.** Either
`shadow-[0_24px_60px_-40px_rgba(28,27,24,0.55)]` (`BeforeAfter.tsx:177`, `ProjectFigure.tsx:168`,
`ProjectMaterials.tsx:117`, `ProjectVideo.tsx:69`) or
`shadow-[0_50px_90px_-70px_rgba(28,27,24,0.7)]` (`FeaturedProjects.tsx:58`, `Services.tsx:138`,
`StudioIntro.tsx:97`). Zero `shadow-sm/md/lg/xl` — i.e. zero card elevation, which is the single
strongest SaaS-template tell. The shadow colour is ink-tinted, matching the warm ground.

**Blur:** two uses. `Header.tsx:157` `data-[solid=true]:backdrop-blur-md` (which requirement 66
explicitly asks for) and one admin action bar. No glassmorphism panels.

**Accent restraint holds in the public tree.** Every solid `bg-accent` on a public surface is a
1 px rule: `h-px w-8` at `ProjectCard.tsx:151`, `ProjectInfo.tsx:62`, `ProjectMaterials.tsx:75`,
`Project3D.tsx:215`, `h-px w-16` at `ProjectQuote.tsx:31`, the `h-px` scroll indicator
(`ScrollProgress.tsx:31`) and the `h-px` nav underline (`Header.tsx:208`). The block fills of
accent are all inside `(admin)`.

The screenshots agree with the greps: limestone ground, square photo frames, hairline rules,
uppercase 11 px labels, one bronze mark per screen. Nothing about `/projects` or `/services`
suggests a dashboard, and nothing about the hero suggests a game.

### 16. Priority order photography → architecture → typography → story → 3D → motion — MET

**Photography is first, structurally and not just visually.** `InteriorScene` renders the
photograph unconditionally and fades the canvas in over it — the photo layer is at
`InteriorScene.tsx:267–275` and the canvas at `:279–283` with
`opacity: ready ? 1 : 0, transition: 'opacity 1.6s var(--ease-editorial)'`. Capability probing
is client-only *by design* so the server render always emits the photograph (`:148–152`, comment:
*"good for LCP, and nothing shifts when the canvas takes over"*). The fallback is a composed
frame, not an apology — `SceneFallback.tsx:24–28` says so and backs it with parallax and a clip
reveal in pure CSS. And 78 of the 105 seeded projects carry `sceneMode: "NONE"`
(`grep -oh '"sceneMode": "[A-Z_0-9]*"' src/data/content/*.json | sort | uniq -c` → 78 NONE,
16 IMAGE, 8 DEPTH_2_5D, 3 PROCEDURAL_3D), so photography carries the overwhelming majority of
the site with no 3D anywhere near it.

**Architecture over typography.** The type never fights the picture: the hero heading sits at
`z-10` over two shallow end-scrims rather than a full panel (`Hero3D.tsx:36–39`), and the
immersive stage caption occupies one line at the bottom of the frame
(`ImmersiveProject.tsx:311–323`) rather than a slab.

**3D is fifth, and gated as such.** It only mounts when *all* of WebGL support, `devicePerf`
better than `'low'`, `motionFlag(threeDAnimation)`, and not-reduced-motion agree
(`InteriorScene.tsx:175–182`), and the canvas is `aria-hidden` with an `sr-only` description
beside it (`:280`, `:345`; `Hero3D.tsx:109–113`). Pinning is desktop+WebGL only
(`ImmersiveProject.tsx:136–137`).

**Motion is last.** Every hook reads `motionFlag(config, systemReduced, …)` before it does
anything (`reveal.ts:59`, `camera.ts:50`), and `themeToCssVars()` zeroes `--motion-intensity`
and collapses `--motion-duration` when the admin switches motion off (`theme.ts:198–200`).

Two caveats that stop this being a clean sweep but do not overturn the verdict:

1. **In one failure mode motion outranks story.** `globals.css:167–169` sets
   `[data-reveal]:not([data-reveal-ready]) { opacity: 0 }`, the reduced-motion override at
   `:183–185` only fires for `prefers-reduced-motion`, and there is **no `<noscript>` rule
   anywhere in `src/`**. With JS off, every headline, paragraph and CTA on the site is invisible.
   The hooks themselves are careful (`reveal.ts:60, 89, 110` all call `markReady`), so this is a
   no-JS-only hazard — but it bit in practice during this audit, and Hero3D's own comment at
   `:58–63` documents the case it had to be fixed for: *"which leaves the opening paragraph and
   the only call to action invisible until a scroll that may never come"*.
2. **On a project detail page with a scene, the hero photograph is replaced by the WebGL relief**
   (`ProjectHero.tsx:168` renders `InteriorScene` where `:177` would render `<Image priority>`).
   It is the same photograph as a texture, so photography still leads in substance — but it puts
   3D above photography at the top of the money page, and the file's own comment at `:150–158`
   records the cost: the `view-transition-name` morph does not survive the swap.

### 17. Is the 3D invisible as technology, or does it read as a graphics demo? — PARTIAL

I looked at both surfaces the requirement names.

**At rest, on the homepage hero: invisible. This is a genuine achievement.** At scroll 0 on `/`
at 1600×1000 I see a warm, full-bleed interior — pale hinoki timber, an oak floor, white bouclé
loungers, a shoji screen with a crane motif, track lights on the ceiling, daylight from a window
at the right. It reads as a photograph. Nothing announces geometry: no visible layer edges, no
seams, no plane rim in frame. The only artefact I can find is a soft blur on the circular crane
motif at the centre of the shoji door. Scrolling 450 px pushes the camera further into the room
and the picture stays coherent. The immersive band at 8,075–11,075 px is the same story: a
full-bleed living room, an `IMMERSIVE` eyebrow, a `02 / 04` counter, the stage caption
*Tiền sảnh* in display serif over a bronze progress hairline — a photograph with a caption on it,
not a viewport.

**This became true during the audit.** My first capture at 11:43 showed the opposite: a
desaturated grey-mauve frame, the shoji screens shredded into torn holes, black "drips" hanging
from the ceiling, smeared floor geometry and loose fragments floating in mid-air. That build has
been replaced. `DepthScene.tsx:31–42` documents the fix in its own words — the material used to
stack `map` and `emissiveMap` on the same photo, light the result with the three-point rig and
push it through ACES, *"which is why a warm hinoki interior arrived as grey concrete"*. The
replacement is an unlit `ShaderMaterial` with `toneMapped: false` (`:200–213`) whose fragment
shader is one texel fetch. Amplitude is capped at `0.115 * (1 - e^{-0.9s})` — never more than
~11.5% of frame height (`scene-settings.ts:91–94`) — and the relief field is built at 128 px
precisely so *"the relief can never resolve into visible layers"* (`DepthScene.tsx:102–113`).

**Under interaction, on the EXPLORE SPACE block, it fails hard.** This is the finding. On
`/projects/hoi-tho-hinoki` the `SCENE_3D` block renders the same scene in `mode="orbit"` under
three hairline controls — *TỰ ĐỘNG KHÁM PHÁ · TOÀN MÀN HÌNH · ĐẶT LẠI GÓC NHÌN* — that invite the
visitor to move the camera. I dragged once, 200 px left and 70 px down, from the centre of the
canvas. The result:

- The photograph becomes a **flat, keystoned rectangle floating in a black void**. All four
  corners of the plane are visible in frame; there is pure black above, left and below it. The
  room stops being a room and becomes a picture on a card, rotated in 3D. That is the
  definition of "reads as a graphics demo".
- A second capture, after further orbiting, showed the shader's occlusion cuts
  (`RELIEF_FRAGMENT`: `if ( vEdge > uEdgeCut ) discard;`) punching **large ragged black holes
  through the floor and the furniture** across the lower 40% of the frame.

The mechanism is understandable: `DepthScene`'s coverage ratchet (`useFrame` at `:242–273`)
sizes the plane to what the camera can see of the `z = 0` plane and never shrinks it, which is
correct for the scroll path where the camera stays near the view axis, but orbit swings the
camera off-axis and straight past the plane's edge. `InteriorScene.tsx:229`
`state.gl.setClearAlpha(0)` means what shows through is the espresso ground, i.e. black.

So: invisible where the visitor is a passenger, exposed the moment the product asks them to
drive. PARTIAL.

---

## R4 Core experience

### 18. Homepage narrative Landing → 3D interior → scroll camera → typography → project → camera transition → gallery → studio → services → journal → contact — PARTIAL

I read the order out of the live DOM rather than trusting the seed:

```js
[...document.querySelectorAll('[data-home-section]')].map(e => e.getAttribute('data-home-section'))
// → ["HERO","FEATURED_PROJECTS","STUDIO","SERVICES","IMMERSIVE_PROJECT","PHILOSOPHY","JOURNAL","CTA"]
```

with measured offsets HERO 0–1000 · FEATURED_PROJECTS 1000–5005 · STUDIO 5005–6678 ·
SERVICES 6679–8075 · IMMERSIVE_PROJECT 8075–11075 (a clean 300 vh) · PHILOSOPHY 11075–12610 ·
JOURNAL 12609–13821 · CTA 13821–14822. That order comes from the seeded rows
(`scripts/seed.ts:521–529`), is mirrored by the unseeded default
(`src/server/queries/site.ts:80–89`), and is rendered verbatim by
`src/app/(site)/page.tsx:97–100`.

Beat by beat against the script:

| Brief's beat | Delivered | Where |
|---|---|---|
| Landing | ✅ | `Hero3D.tsx:115–158` — eyebrow, project meta, `<h1>`, body, CTA, scroll cue |
| 3D interior | ✅ | `Hero3D.tsx:88–95` — `InteriorScene mode="scroll"` full-bleed |
| scroll camera | ✅ | `Hero3D.tsx:57–62` — `useCameraScroll({ end: 'bottom top' })` |
| typography | ✅ | the 112 px `u-display` `<h1>` at `Hero3D.tsx:128`, then `FEATURED_PROJECTS`' own heading |
| project | ✅ | `FEATURED_PROJECTS`, 4,005 px of alternating 7/4 rows |
| camera transition | ⚠️ **out of order** | `IMMERSIVE_PROJECT` is 5th, after studio and services |
| gallery | ❌ **absent** | see below |
| studio | ⚠️ **out of order** | 3rd, should be 8th |
| services | ⚠️ **out of order** | 4th, should be 9th |
| journal | ✅ | 7th |
| contact | ✅ | `CTA` → `/contact` |
| *(extra)* | — | `PHILOSOPHY` is not in the brief's script; harmless |

**The gallery beat has nowhere to live.** `HomepageSectionKey` is a closed union of exactly
eight keys (`src/types/content.ts:176–184`) with no gallery member, and `src/types/content.ts`
is on the do-not-touch list. The only gallery data reaching the homepage is
`data.immersive.gallery`, and it is consumed at exactly one place:

```tsx
// src/components/sections/ImmersiveProject.tsx:207
const stills = stages.map((_, index) => gallery[index] ?? cover)
```

which sits inside the `if (!pinned || scene === null)` branch (`:206`) — the **degraded**,
non-pinned, small-screen / no-WebGL / reduced-motion path. A desktop visitor with WebGL takes
the pinned branch at `:262` and never sees those images. The finished `HorizontalScroll` rail
now has a consumer (`src/components/projects/RelatedProjects.tsx:136–155`), but it is on project
pages, not the homepage.

**The ordering half is a data fix, not a code fix** — `/admin/homepage` reorders these rows at
runtime and `page.tsx:104` sorts by `order`, so the sequence can be corrected without touching
source. That is why this is PARTIAL rather than MISSING. But as seeded and as served today, the
narrative delivers the studio and the services pitch *before* the camera transition that is
supposed to earn them, and never shows a gallery at all.

One content note that showed up in the browser: the stage captions are the generic seeded
waypoint labels (`scripts/seed.ts:288–291` — *Ngưỡng cửa / Tiền sảnh / Phòng khách / Chi tiết vật liệu*),
and I photographed *Tiền sảnh* ("foyer") captioning a full-bleed **living room**. There are no
authored per-folder waypoints — `src/data/content/detail/` does not exist and
`grep -c waypoints src/data/content/*.json` returns 0 everywhere — so every seeded scene gets the
same four generic stops and the same four generic labels.

### 19. Does scrolling feel like operating a cinematic camera? — PARTIAL

**The mapping, hop by hop, with line numbers.**

1. **Wheel → scroll position.** One Lenis instance, `duration: 1.05` with an expo-out easing
   `t => min(1, 1.001 - 2^{-10t})` (`src/animations/scroll.ts:42, 67–79`), driven off the GSAP
   ticker with `lagSmoothing(0)` and pushing `ScrollTrigger.update()` on every scroll event
   (`:84–93`). One clock for scroll, tweens and triggers.
2. **Scroll position → 0..1.** `useCameraScroll` (`src/animations/camera.ts:29–83`) creates one
   proxy tween scrubbed by a ScrollTrigger with `scrub: smoothing` where `smoothing = 0.6`
   seconds (`:37`, `:71`), `invalidateOnRefresh: true` and an `onRefresh` write so a resize does
   not strand the value. The `onUpdate` writes a clamped number into a **ref** (`:58–61`) — never
   state. The whole thing lives in a `gsap.context()` reverted on unmount (`:56`, `:78–81`), and
   the hook parks progress at 0 and does nothing at all when `motionFlag(…, 'cameraAnimation')`
   is false (`:50–54`).
3. **Range.** Hero: `top top → bottom top` over a 100 vh section (`Hero3D.tsx:57–62`, `:89`).
   Immersive: default `top top → bottom bottom` over a `h-[300vh]` outer with a
   `sticky top-0 h-[100svh]` inner (`ImmersiveProject.tsx:150–155`, `:265–267`) — exactly the
   200 vh the panel spends pinned, so progress maps 0→1 across the pin.
4. **0..1 → camera pose.** `CameraPath` (`src/components/three/CameraPath.tsx:150–218`) reads the
   ref inside `useFrame`, applies frame-rate-independent exponential damping —
   `damp(previous, goal, 2.6, step)` (`:65`, `:179`; `damp` at `camera-path.ts:395–399`) — samples
   the path allocation-free (`:182`) and writes `camera.position.set(…)`, `camera.lookAt(…)` and
   `camera.fov` directly (`:197–207`). No React state, no re-render per frame; a `useState` fires
   only on a pointer handover (`InteriorScene.tsx:188–194`).
5. **The path itself.** Centripetal Catmull–Rom (`alpha = 0.5`) through position *and* target
   (`camera-path.ts:251–260, 345–360`), each segment's local parameter eased by the ease of the
   waypoint being *approached* (`:341–343`), FOV lerped on the eased parameter with an explicit
   note that a spline there would make the lens breathe (`:361–363`).

**Everything the brief rules out is ruled out.** Default segment ease is `power2.inOut`
(`camera-path.ts:73`) with a comment explaining that `.out` per segment would restart the dolly
at full speed at every waypoint *"which reads as a game camera"*. `EASE.none` (`config.ts:46–47`)
is used only for scrubbed proxies, where linear is correct because the scrub curve is the
easing. There is no roll, no shake, and — since the last rewrite — no turntable:
`SceneCamera.tsx:178–186` says *"There is no turntable. A constant-speed spin around the authored
target is the one camera idiom the brief rules out"*, and AUTO EXPLORE now walks the waypoints on
a real schedule with 1.1 s holds at every stop (`camera-path.ts:415–422, 458–510`).

**So why is this PARTIAL? Because on every scene a visitor actually reaches, the authored journey
is thrown away before it gets to the camera.**

```ts
// src/lib/three/scene-settings.ts:267–271
export function waypointsFor(config: SceneConfig): CameraWaypoint[] {
  const authored = config.waypoints.length > 0 ? config.waypoints : defaultWaypoints(config)
  if (config.mode !== 'DEPTH_2_5D') return authored
  return normaliseDepthWaypoints(authored, config.fov > 1 ? config.fov : 45)
}
```

`normaliseDepthWaypoints` (`:234–263`) rewrites **every** position to `[lateral, rise, distance]`
and **every** target to `[lateral*0.4, rise*0.4, 0]`, where `distance` runs linearly from
`DEPTH_FRAME.start = 4.6` to `DEPTH_FRAME.end = 4.05` and the lateral/vertical drift is capped
at `DEPTH_FRAME.drift = 0.3` (`:72–79`). Only `at`, `ease` and `label` survive. The comment is
honest about why — *"at 40% the parallax between the near and far parts of the relief becomes
legible as geometry, and the illusion that the visitor is looking at a photograph is gone"* —
and it is the same decision that earns item 17's "invisible at rest". But run the seeded default
path (`scripts/seed.ts:287–292`) through it and the entire 200 vh of the pinned immersive
section moves the camera **0.55 world units toward the wall — a 12% dolly — and at most 0.30
units sideways.**

That is what every homepage visitor gets, because **all eight featured projects are
`DEPTH_2_5D`** (`may-trang-tang-cao`, `buc-tuong-soi`, `bong-go-sam`, `ben-kia-song`,
`tram-tich-xam`, `hien-nhat-giua-pho`, `dat-tho`, `hoi-tho-hinoki`), the three `PROCEDURAL_3D`
projects are not featured, and there are **zero** `NATIVE_GLB` scenes anywhere in the seed. The
homepage showcase can only pick from featured projects (`src/app/(site)/page.tsx:53–61`), and I
confirmed both live canvases report `data-scene-mode="DEPTH_2_5D"`. The section's own copy
promises what the normaliser has already made impossible: *"Cuộn để đi xuyên qua căn nhà — từ
mặt tiền, qua tiền sảnh, tới chỗ ngồi quen thuộc"* (`ImmersiveProject.tsx:162–166`).

**And the hero spends its camera move on a section that is leaving the screen.** `Hero3D` is
`h-[100svh]` with no `sticky` (`:89`) and `end: 'bottom top'` (`:61`), so progress 0→1 elapses
while the hero itself scrolls off. Comparing my captures at scroll 0 and scroll 450, almost all
of the apparent change is the page moving, not the lens. The one place a scroll genuinely *is* a
camera — because nothing else moves — is the pinned immersive band, and there the whole move is
that 12% push-in.

Verdict: the machinery is the real thing — spline, per-waypoint easing, damping, holds, FOV
interpolation, no linear, no spin, no shake, nothing in React state per frame. The delivered
experience is a slow, tasteful 12% push-in on a flat photograph. That is a lovely *effect*; it
is not yet "operating a cinematic camera".

---

## TOP GAPS

1. **Item 17 — one drag on EXPLORE SPACE turns the room into a photo floating in a void.**
   On `/projects/hoi-tho-hinoki` a 200 × 70 px drag on the `SCENE_3D` canvas puts all four
   corners of the relief plane in frame with black on three sides; further orbiting exposes the
   shader's `discard` cuts as ragged black holes through the floor and furniture. The coverage
   ratchet in `src/components/three/DepthScene.tsx:242–273` sizes the plane against a
   near-on-axis view, which orbit mode violates by design, and
   `src/components/three/InteriorScene.tsx:229` `setClearAlpha(0)` makes the overrun read as pure
   black. This is the surface whose own buttons invite the visitor to move the camera.
   *Remedy (three owner, `src/components/three/DepthScene.tsx`):* for `mode === 'orbit'`, size the
   plane against the **orbit envelope** rather than the current frame — take
   `limits.maxDistance` / `maxPolarAngle` / `maxAzimuthAngle` from
   `SceneCamera.orbitEnvelope` and compute coverage for the worst-case pose once, instead of
   ratcheting per frame. Failing that, tighten `SceneCamera.tsx:250–255`'s polar/azimuth window
   for `DEPTH_2_5D` scenes specifically so the camera can never see the rim, and fill behind the
   plane (a large backing quad at the photo's mean colour) so an overrun degrades to a matte
   rather than to black.

2. **Item 13 — the site no longer ships the two families the requirement names.**
   `src/lib/theme.ts:103–104` now defaults to Playfair Display + Be Vietnam Pro,
   `src/app/layout.tsx:39–51` preloads only those two and marks Cormorant and Inter
   `preload: false`, and `src/styles/globals.css:21–22, 49–50` — a file frozen by
   `ARCHITECTURE.md` §0 — was edited to name them. `scripts/seed.ts:560` and the admin's
   *Khôi phục mặc định* will both write the new pair. Seven families' `@font-face` blocks (95 of
   them, +28 KB of CSS) now ship on every page for two that render.
   *Remedy (layout/theme owner, `src/lib/theme.ts:103–104`):* set `DEFAULT_TYPOGRAPHY` back to
   `{ displayFont: 'Cormorant Garamond', bodyFont: 'Inter' }`, move `preload: true` onto those
   two in `src/app/layout.tsx`, and restore `globals.css:21–22, 49–50` to name them as the CSS
   fallbacks. Keep `FONT_LIBRARY` and the enlarged editor list — offering Playfair as an option
   is a genuine improvement; making it the default is a requirement change, and if it is
   intended it needs to be raised against `REQUIREMENTS.md` 13 and `ARCHITECTURE.md` §2 rather
   than landed silently in a frozen file.

3. **Item 19 — the depth normaliser discards the authored camera journey on every scene a
   visitor can reach.** `src/lib/three/scene-settings.ts:267–271` routes every `DEPTH_2_5D` scene
   through `normaliseDepthWaypoints` (`:234–263`), which replaces all positions and targets with
   a canned 4.6 → 4.05 dolly plus ≤0.3 units of drift. All eight featured projects are
   `DEPTH_2_5D` and no `NATIVE_GLB` scene exists, so the "walk through the house" the immersive
   section's own copy promises (`ImmersiveProject.tsx:162–166`) is never delivered anywhere on
   the site.
   *Remedy (three + seed owners):* the normaliser is right for what it protects, so fix the
   content rather than the maths — seed at least one featured project with
   `sceneMode: 'PROCEDURAL_3D'` or a real GLB in `src/data/content/batch-*.json` so
   `waypointsFor` returns the authored path untouched and the homepage showcase can pick it
   (`src/app/(site)/page.tsx:57–61` already prefers a project with a scene). Separately, widen
   `DEPTH_FRAME` in `scene-settings.ts:72–79` only if a side-by-side proves the relief still
   holds, and soften the immersive body copy so it stops promising a journey the depth path
   cannot make.

4. **Item 18 — the "gallery" beat of the homepage narrative does not exist for a desktop
   visitor.** `HomepageSectionKey` (`src/types/content.ts:176–184`) has no gallery key and the
   file is frozen; the only gallery data on the page is consumed at
   `src/components/sections/ImmersiveProject.tsx:207`, inside the degraded non-pinned branch that
   a desktop WebGL visitor never takes.
   *Remedy (home-sections owner, `src/components/sections/ImmersiveProject.tsx`):* render the
   gallery in the pinned branch too — a strip of `gallery[0..3]` in the band immediately after
   the sticky panel releases, reusing `HorizontalScroll` from `@/components/animation` exactly as
   `RelatedProjects.tsx:136–155` now does. That satisfies the beat without touching the frozen
   union. If a standalone band is wanted instead, extending `HomepageSectionKey` is a contract
   change and must be raised, not worked around.

5. **Item 18 — the seeded narrative puts studio and services before the camera transition.**
   `scripts/seed.ts:521–529` and the unseeded default `src/server/queries/site.ts:80–89` both
   order `HERO, FEATURED_PROJECTS, STUDIO, SERVICES, IMMERSIVE_PROJECT, PHILOSOPHY, JOURNAL, CTA`,
   which sells the studio and the service list before the immersive moment that is meant to earn
   them. Verified in the live DOM, not just the seed.
   *Remedy (seed owner, `scripts/seed.ts:521–529`, one array reorder):* move `IMMERSIVE_PROJECT`
   to index 2 (straight after `FEATURED_PROJECTS`) and let `STUDIO` and `SERVICES` follow it —
   `HERO, FEATURED_PROJECTS, IMMERSIVE_PROJECT, STUDIO, SERVICES, PHILOSOPHY, JOURNAL, CTA` —
   and make the same edit to `HOMEPAGE_ORDER` in `src/server/queries/site.ts:80–89` so an
   unseeded database agrees. No code change is needed beyond that; `/admin/homepage` can already
   do it at runtime.

---

## Out-of-slice observations

- `npx tsc --noEmit` currently fails with one error left over from live debugging:
  `src/components/animation/PageTransition.tsx(101,7): error TS18048: 'w.__PTLOG' is possibly 'undefined'`.
  That blocks requirement 90; noting it because nobody in items 12–19 owns it.
- `src/styles/globals.css` and `src/app/layout.tsx` were both edited during this session in ways
  that touch the frozen-file list in `ARCHITECTURE.md` §0 (globals.css) and the documented
  font-variable contract in `@/lib/theme` (which was updated in step, so the pair is at least
  internally consistent). Worth one line in the delivery review.
- `THEME_STYLE_ID` (`src/lib/theme.ts:86`) is unreachable at runtime — React 19 drops the `id`
  when it hoists a `<style href precedence>` — and nothing reads it. Dead constant with a
  misleading comment.
