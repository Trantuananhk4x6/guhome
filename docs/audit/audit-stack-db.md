# Audit — R1 Technology stack & R2 Database (items 1–11)

Scope: `docs/REQUIREMENTS.md` items 1–11 only.
Method: read the code, not the contract. Ran `npx tsc --noEmit` (exit 0) and
`npx tsx scripts/verify.ts` (read-only counts against the live Neon database).
Date of audit: 2026-08-19, build in flight.

Verdict key — **MET** (satisfied today) · **PLANNED** (an owner in
`ARCHITECTURE.md` §5 will satisfy it if they follow the contract) ·
**AT-RISK** (an owner exists but the instruction or existing code will produce
something that fails) · **GAP** (no owner, or actively contradicted).

| # | Requirement | Verdict |
|---|---|---|
| 1 | Next App Router, strict TS, no `any` | MET |
| 2 | React 19 + Tailwind v4 CSS-first tokens | MET |
| 3 | three + fiber + drei + postprocessing | MET |
| 4 | GSAP + ScrollTrigger; Lenis; FM only for small UI | MET (contract conflict — see below) |
| 5 | Zustand for UI state; Zod for **every** input boundary | **AT-RISK** |
| 6 | Drizzle → Neon Postgres, no Mongo/SQLite | MET |
| 7 | Secure auth with session revocation | MET (one small defect) |
| 8 | Object storage abstraction, not blobs in Postgres | MET |
| 9 | Tables cover the 14 named groups | MET |
| 10 | Large assets in storage, referenced by row | **AT-RISK** |
| 11 | Next → server actions/route handlers → Drizzle → Neon | MET |

**Totals: MET 9 · PLANNED 0 · AT-RISK 2 · GAP 0.**

---

## Item-by-item

### 1. Next.js App Router, strict TypeScript, no `any` — MET

- App Router only; `src/app/(site)/**` and `src/app/(admin)/**` route groups, no
  `pages/` directory anywhere.
- `tsconfig.json:6-8` — `"strict": true`, `"noUncheckedIndexedAccess": true`,
  `"noImplicitOverride": true`, `"allowJs": false`.
- `eslint.config.mjs:12` — `'@typescript-eslint/no-explicit-any': 'error'`.
- Verified empirically, not just by config: a repo-wide grep for `: any`,
  `as any`, `<any>` and `any[]` across `src/` and `scripts/` returns **zero**
  hits, and there are **zero** `@ts-ignore` / `@ts-expect-error` / `@ts-nocheck`
  suppressions. The only two `eslint-disable` lines are narrow and justified
  (`src/components/admin/MediaThumb.tsx:64` for `no-img-element`,
  `src/components/projects/BeforeAfter.tsx:103` for `exhaustive-deps`).
- `npx tsc --noEmit` exits 0 on the tree as it stands.

### 2. React 19 + Tailwind v4 (CSS-first tokens) — MET

- `package.json` pins `react@19.2.8`, `react-dom@19.2.8`, `tailwindcss@4.3.3`,
  `@tailwindcss/postcss@4.3.3`.
- No `tailwind.config.js`/`.ts` exists (correct for v4).
  `postcss.config.mjs` loads only `@tailwindcss/postcss`.
- `src/styles/globals.css:1` `@import 'tailwindcss'`, and `:11-35` a single
  `@theme` block. The design is a level better than the requirement asks:
  `@theme` maps `--color-*` onto `var(--c-*)` runtime custom properties defined
  at `:root` (`:38-56`), which is exactly the indirection that lets the admin
  theme editor repaint the site per-request without a rebuild (item 74).

### 3. three.js + @react-three/fiber + drei + postprocessing — MET

All four are installed at the pinned versions and all four are actually used, not
just declared:

- `three` — `src/components/three/{CameraPath,DepthScene,InteriorScene,ModelViewer,ProceduralScene,SceneCamera,SceneEnvironment,SceneLighting}.tsx`, `src/lib/three/{loaders,scene-settings}.ts`
- `@react-three/fiber` — 7 files under `src/components/three/**` plus `src/app/(admin)/admin/3d-assets/_components/camera.ts`
- `@react-three/drei` — 9 files
- `@react-three/postprocessing` — `src/components/three/SceneEffects.tsx:3`
  (`Bloom, EffectComposer, SMAA, Vignette`)

### 4. GSAP + ScrollTrigger; Lenis; Framer Motion only for small UI — MET, with a contract conflict

- GSAP is correctly funnelled: `src/animations/gsap.ts` is the **only** file in
  the repo that imports from the `gsap` package (`:9-11`), and it re-exports
  `gsap`/`ScrollTrigger`/`SplitText` for everyone else. Registration is guarded
  and idempotent (`:14-31`).
- Both plugins physically exist in the installed package
  (`node_modules/gsap/ScrollTrigger.js`, `node_modules/gsap/SplitText.js`,
  v3.15.0) — the "all plugins free" claim in the contract holds, so the
  `gsap/SplitText` import will not break the build.
- Lenis: `src/animations/scroll.ts` is the only importer of `lenis`.
- Framer Motion is confined to two files, both genuinely small UI:
  `src/components/ui/Dialog.tsx:3` and `src/components/ui/Toast.tsx:3`.
  `MobileMenu.tsx` deliberately uses GSAP instead and says so at `:23`.

**Conflict (worth one agent's attention, not a requirement failure):**
`ARCHITECTURE.md` §8 states *"No `framer-motion` on the homepage; GSAP only."*
That rule is already violated by the layering, silently:

```
src/app/layout.tsx:8,87        → <Providers>
src/components/layout/Providers.tsx:6,35 → ToastProvider
src/components/ui/Toast.tsx:3            → import { AnimatePresence, motion } from 'framer-motion'
```

`Providers` is the root client boundary, so framer-motion is in the shared
client chunk of **every public page including `/`**. Nothing about this is
wrong per requirement 4 (a toast is small UI), but it costs tens of KB gzipped
on the homepage and the contract promises the opposite. Fix (one agent, layout
owner): make `ToastProvider` render its portal via
`next/dynamic(..., { ssr: false })`, or move `ToastProvider` out of the root
layout and into the `(admin)` layout, which is the only place toasts are used.

### 5. Zustand for UI state; Zod for every input boundary — AT-RISK

Zustand: MET. `src/lib/motion.ts` is the only `zustand` importer and holds the
`MotionConfig` + reduced-motion state, matching §6.3.

Zod: 13 modules import `zod` — `src/lib/env.ts`, all ten `src/server/actions/*`,
`src/app/(admin)/admin/settings/actions.ts`, and `src/app/api/analytics/route.ts`
(schema at `:38-45`, `safeParse` at `:131`). Env parsing is schema-validated at
`src/lib/env.ts:3-19`.

**The exception is the single largest untrusted-input surface in the app:**
`src/app/api/upload/route.ts` has **no Zod schema at all**. Its file checks are
good — session gate `:143`, `content-length` cap `:146`, extension allowlist
`:162-169`, MIME cross-check `:173`, per-group byte cap `:176`, kind allowlist
`:180-186` — but the *text* fields are read through a bare helper with no
constraints whatsoever:

```ts
// src/app/api/upload/route.ts:133-138
function readString(form: FormData, key: string): string | null {
  const value = form.get(key)
  if (typeof value !== 'string') return null
  const clean = value.trim()
  return clean.length === 0 ? null : clean
}
```

and the results go straight into `text` columns:

```ts
// src/app/api/upload/route.ts:188-190, 264-267
const folder = readString(form, 'folder')
const alt    = readString(form, 'alt')
const caption = readString(form, 'caption')
...
.values({ ..., alt, caption, folder, sourcePath: file.name, ... })
```

Concrete failure: any authenticated editor (not just an admin — the route only
calls `getSession()`) can POST a 10 MB `alt` value and it is persisted verbatim
in Postgres. `sourcePath: file.name` is likewise stored unbounded and
unsanitised. This is precisely the class of thing "Zod for every input boundary"
exists to stop.

**Fix (one agent, media-pipeline / API owner, ~15 lines):** add
```ts
const metaSchema = z.object({
  kind: z.enum(['image','depth','texture']).optional(),
  folder: z.string().trim().max(120).optional(),
  alt: z.string().trim().max(300).optional(),
  caption: z.string().trim().max(500).optional(),
})
```
and parse `Object.fromEntries(form)` (minus `file`) through it, returning the
existing `jsonError(..., 400)` on failure. Also clamp `file.name` before it
becomes `sourcePath`.

### 6. Drizzle ORM against Neon PostgreSQL — MET

- `src/server/db/index.ts:1-14` — `neon()` from `@neondatabase/serverless` +
  `drizzle-orm/neon-http`, `casing: 'snake_case'`, fails loudly if
  `DATABASE_URL` is absent. `drizzle.config.ts` targets `dialect: 'postgresql'`.
- No MongoDB, MySQL, Prisma or SQLite package is installed. (The `sqlite3` /
  `better-sqlite3` / `@prisma/client` strings in `package-lock.json` around
  `:4331-4390` are drizzle-orm's *optional* peer-dependency metadata, nothing
  installed.)
- **Verified against the live database**, not just the config: `scripts/verify.ts`
  ran 15 `count(*)` queries against
  `ep-super-thunder-ax6hvmwk-pooler…neon.tech/neondb` and every one returned
  successfully, so all 19 tables of migration `0000_fearless_sasquatch` really
  are applied on Neon.
- Adversarial check passed: `drizzle-orm/neon-http` cannot do interactive
  transactions (`db.transaction()` throws at runtime). There is **no**
  `db.transaction(` anywhere in `src/` or `scripts/`. The one multi-statement
  write uses the supported form — `src/server/actions/projects.ts:702`
  `await db.batch([clear, db.insert(projectBlocks).values(rows)])`.

### 7. Secure authentication with session revocation — MET (one small defect)

Revocation is real and layered, not decorative:

- `src/server/auth/session.ts:169-175` — every issued JWT gets a `sessions` row
  keyed on `sha256(token)`, so the raw token is never stored.
- `:125-157` `resolveSession()` requires **both** a valid JWT **and** a live,
  unexpired `sessions` row **and** `users.active` — deleting the row or
  deactivating the user kills the session immediately, and identity is re-read
  from `users` so a role demotion takes effect without re-login.
- `:182-193` `destroySession()` / `revokeUserSessions()`; `:196-198`
  `purgeExpiredSessions()`.
- Revocation is actually **wired**, not merely exported:
  `src/app/(admin)/admin/settings/actions.ts:169` revokes every session on
  password change.
- Supporting hygiene: scrypt with embedded salt+cost and `timingSafeEqual`
  (`src/server/auth/password.ts:47-82`); a constant-time decoy hash so unknown
  emails cannot be enumerated (`:93-97`); an identical error string for
  no-such-user / bad-password / disabled (`src/server/auth/index.ts:38`);
  per-`email|ip` rate limiting (`:44-83`); audit rows on every outcome;
  httpOnly + sameSite=lax + secure-in-prod cookie (`session.ts:86-97`).
- Edge middleware does signature-only verification and documents why
  (`src/middleware.ts:1-12`) — correct, since `node:crypto` and the DB driver
  are unavailable on Edge, and it deliberately never redirects away from
  `/admin/login`, avoiding the revoked-token redirect loop.
- Seed/runtime hash formats are compatible (checked because the comment at
  `password.ts:35-37` flags the risk): `scripts/seed.ts:53-56` emits
  `scrypt$16384$<salt>$<key>` with `scryptSync(pw, salt, 64)` — Node's defaults
  are `N=16384, r=8, p=1`, identical to `derive()`. The seeded admin **can** log
  in.

**Defect (small, one-line fix):**
```ts
// src/app/(admin)/admin/settings/actions.ts:169-171
await revokeUserSessions(user.id)
await signIn(user.email, newPassword)   // ← return value discarded
```
`signIn()` can legitimately return `{ ok: false }` here: it is rate-limited on
`email|ip` (`auth/index.ts:171-173`), so an admin who fumbled five logins in the
last ten minutes and then changes their password has every session revoked and
the re-issue silently refused — locked out of the admin with no error shown.
Fix: capture the result and, when `!ok`, return
`{ ok: true, notice: 'Đã đổi mật khẩu — vui lòng đăng nhập lại.' }` (or call
`createSession()` directly, bypassing the login throttle, since the password was
just verified).

### 8. Object storage abstraction for media and 3D assets — MET

- `src/server/storage/index.ts:13-17` implements §6.2 exactly; `storage()`
  (`:71-93`) memoises a driver chosen by `STORAGE_DRIVER`, with
  `createLocalDriver` (`local.ts`) and a dependency-free SigV4
  `createS3Driver` (`s3.ts`) behind the same interface. Key normalisation
  (`index.ts:26-32`) plus a resolved-path guard (`local.ts:17-23`) block
  `../` traversal in both drivers.
- The abstraction covers **3D assets**, not just images:
  `contentTypeFor` (`index.ts:35-66`) knows `glb`, `gltf`, `hdr`, `ktx2`, and
  `POST /api/upload` accepts and stores `glb/gltf/hdr/exr` verbatim through
  `driver.put` (`route.ts:243-246`). The recon pipeline has its key convention
  reserved (`src/server/recon/types.ts:70-72`, `reconKey()` → `recon/<jobId>/…`).
- Nothing binary lands in Postgres. Every write path stores a `storageKey` +
  `url` string. Deletion is symmetric and reference-checked:
  `src/server/actions/media.ts:83-104` expands a base key back into its full
  `MEDIA_WIDTHS` derivative set before deleting, and `findReferences()`
  (`:124+`) refuses to orphan a row still used by a project, scene, article,
  service, material or recon job.
- Caveat, not a violation: `scripts/build-media.ts` is a build-time tool and
  writes derivatives to the filesystem directly (`:39` `OUT_ROOT`, `:438`,
  `:489`) rather than through `storage()`. That is defensible for a batch
  pipeline, but it means the S3 path has never executed for the bulk of the
  media. It becomes a real problem only in combination with item 10 below.

### 9. Tables cover the 14 named groups — MET

All fourteen groups exist in `src/server/db/schema.ts`, and all 19 tables are
present in the applied migration `drizzle/0000_fearless_sasquatch.sql`
(19 `CREATE TABLE`, 11 `CREATE TYPE`), confirmed live on Neon (item 6).

| Brief's group | Table | schema.ts |
|---|---|---|
| projects | `projects` | :154 |
| articles | `articles` | :276 |
| users | `users` | :75 |
| categories | `categories` | :137 |
| services | `services` | :302 |
| materials | `materials` | :318 |
| project blocks | `project_blocks` | :208 |
| 3D metadata | `scenes` (+ `recon_jobs`) | :225, :251 |
| theme config | `theme_settings` | :334 |
| homepage config | `homepage_sections` | :345 |
| navigation | `navigation` | :358 |
| contact requests | `contact_requests` | :374 |
| revisions | `revisions` | :392 |
| audit logs | `audit_logs` | :406 |

Plus `sessions`, `media`, `project_media`, `analytics_events` — all needed by
other requirements (7, 8, 82).

Two notes, neither a requirement failure:

1. **`site_settings` is squatting inside `revisions`.**
   `src/app/(admin)/admin/settings/site-settings.ts:5-12` explains it plainly:
   the schema is frozen, so site-wide SEO defaults are written as `revisions`
   rows with `entity_type = 'site_settings'` and a sentinel
   `entity_id = '00000000-0000-4000-8000-000000000001'`. It works, but any
   "revision history for entity X" screen now has to filter out a pseudo-entity,
   and the newest-row-wins read (`:44-51`) makes an append-only log the source of
   truth for current settings. The file already carries the right TODO. Fix
   (schema owner, at the next migration): add a `site_settings` singleton table
   — or fold the four fields into `theme_settings.brand`, which is already a
   singleton `jsonb` — and keep the module's API unchanged.
2. `navigation.parentId` (`:366`) is a bare `uuid` with no self-referencing FK,
   so an orphaned `parent_id` is possible. `NavItem.children` (§types) depends on
   it resolving. Low severity; a `references(() => navigation.id)` at the next
   migration closes it.

### 10. Large assets in storage, referenced by row — AT-RISK

The *no-blobs* half of the requirement is cleanly MET: every asset reference in
the data model is an id or a key string —
`projects.coverMediaId`, `project_media.mediaId`,
`scenes.{modelMediaId,sourceMediaId,depthMediaId}`, `ReconResult.{depthMediaId,
modelMediaId,textureMediaIds}` (`src/types/content.ts:308-315`), every
`ProjectBlock` variant (`:139-155`), every `RichTextNode` image/gallery/video
(`:161-166`). No `bytea`, no base64 payload column. The only inline binary is
`media.blurDataUrl` — a 24 px webp placeholder of a few hundred bytes, which is
the correct place for it.

**But the row-level reference itself is written in two incompatible shapes, and
the reader silently degrades rather than failing.** `src/lib/media.ts:5-9`
documents the invariant — `media.url` holds the *base*, no width and no
extension — and `mediaUrl()` appends the right derivative:

```ts
// src/lib/media.ts:60-67
export function mediaUrl(m: MediaRef | null, width?: number): string {
  ...
  if (m.kind !== 'image' || isConcreteFile(base)) return base   // ← :64
  const stem = base.endsWith('/') ? base.slice(0, -1) : base
  return `${stem}-${pickMediaWidth(width, m.width)}.webp`
}
```

`POST /api/upload` honours that invariant (`route.ts:239-241`: `storageKey = base`,
`url = driver.url(base)`). **`scripts/seed.ts` does not:**

```ts
// scripts/seed.ts:195
url: `/media/${entry.storageKey}-${Math.max(...entry.widths)}.webp`,
```

`toMediaRef()` (`lib/media.ts:81-92`) passes `row.url` through untouched, so
`isConcreteFile()` matches `.webp` and `mediaUrl()` short-circuits at line 64 for
every seeded image. Consequences, all silent — no type error, no build error,
`tsc` passes:

- **Every seeded photo is served at its widest derivative, always.** The 28 call
  sites that pass a width — `mediaUrl(media, 400)` in the admin picker
  (`src/components/admin/site/MediaField.tsx:25`), `mediaUrl(media, width)` in
  every responsive figure (`SectionImage.tsx:39`, `ProjectFigure.tsx:69`,
  `studio/_components/ImageFrame.tsx:50`, …) — all get the same file back. The
  request for a small image is ignored.
- **`mediaSrcSet()` returns `''` for every seeded image** (`lib/media.ts:70-78`
  bails on `isConcreteFile`), so there is no responsive `srcset` on the public
  site at all.
- **Worst case is 3D:** `src/components/three/DepthScene.tsx:35` calls
  `mediaUrl(image, quality.textureWidth)` precisely so a weak device gets a small
  texture — it will receive the full-size webp instead, on the devices least able
  to decode it. Same at `ProceduralScene.tsx:29`.
- **It also hardcodes the `/media/` prefix**, bypassing `driver.url()`, so under
  `STORAGE_DRIVER=s3` every seeded row points at a dead local path — the item 8
  abstraction is real but seeded content routes around it.

The root cause is an under-specified contract: `ARCHITECTURE.md` §6.1 pins the
shape of `media.storageKey` but says nothing about `media.url`, so two agents
each picked a reasonable convention.

**Fix (one agent, seed owner, one line):**
```ts
// scripts/seed.ts:195
url: `/media/${entry.storageKey}`,
```
and add to §6.1: *"`media.url` holds the same base as `storageKey`, prefixed by
the driver's public root — never a width, never an extension. `mediaUrl()` adds
those."* If a defensive reader is also wanted, change `lib/media.ts:64` to strip
a trailing `-<width>.webp` before falling through instead of returning early.

### 11. Data flow Next → server actions / route handlers → Drizzle → Neon — MET

- Eleven server-action modules, each opening with `'use server'` (verified on all
  of `src/server/actions/*.ts` + `src/app/(admin)/admin/settings/actions.ts`),
  and two route handlers (`api/upload`, `api/analytics`), both pinned
  `runtime = 'nodejs'` — necessary, since both touch `node:crypto`/`sharp` and
  the neon driver.
- The client/server boundary holds. Every `'use client'` file that imports from
  `@/server` imports **only** a `'use server'` action module — checked
  exhaustively; the seven such files are `contact/_components/ContactForm.tsx`,
  `admin/media/{MediaDetails,MediaLibrary}.tsx`,
  `admin/site/{ContactInbox,HomepageBuilder,NavigationEditor,ThemeEditor}.tsx`.
  No client component imports `@/server/db` or `@/server/queries`.
- The read path is a proper layer, not ad-hoc SQL in pages: `src/server/queries/*`
  wraps every reader in React `cache()` (18 call sites) and returns
  `@/types/content` shapes via `toMediaRef`/`getMediaMap`, never raw rows — as
  §6.5 requires.
- No content bypasses the database. `src/data/content/*.json` is imported only by
  `scripts/seed.ts`; the one runtime import from `@/data` is the `CATEGORY_SEEDS`
  label list in `projects/page.tsx:13`. The `_content.ts` / `content.ts` /
  `nav-fallback.ts` modules are explicitly *fallbacks* layered under a DB read
  (e.g. `src/app/(site)/layout.tsx:13-17` queries first, then
  `withFallbackNav`), which is the right shape for requirement 85 and does not
  violate 11.
- Only soft gap: no module carries the `server-only` import guard, so the
  boundary is maintained by convention. Cheap hardening — add
  `import 'server-only'` to `src/server/db/index.ts` and each
  `src/server/queries/*.ts` — but nothing violates the requirement today.

---

## Out-of-slice observations (for whoever owns them)

- **The Neon database is completely empty.** `npx tsx scripts/verify.ts` reports
  12 FAILUREs — 0 users, 0 categories, 0 projects, 0 media, 0 services,
  0 materials, 0/8 homepage sections, 0 navigation, 0 theme rows. The schema is
  migrated; the seed has not been run. That is items 79/91, not 1–11, but nothing
  downstream can be verified until `npm run db:seed` executes. Note that running
  it *now* would bake in the item-10 URL defect across all 1486 media rows —
  fix `seed.ts:195` first.
- `public/media/manifest.json` held only 4 entries at audit time while
  `public/media/` already had a dozen slug folders; the media build was mid-run.
  Not reported as a finding.

---

## TOP GAPS

1. **`scripts/seed.ts:195` writes `media.url` in a shape `src/lib/media.ts:64`
   refuses to process** — every seeded image ships at its widest derivative,
   `mediaSrcSet()` returns empty for the whole site, weak devices get full-size
   3D textures, and S3 storage is bypassed. Silent: no type or build error.
   *Remedy: `url: \`/media/${entry.storageKey}\`` (drop the `-<width>.webp`), and
   pin `media.url`'s shape in ARCHITECTURE §6.1.*
2. **`src/app/api/upload/route.ts` has no Zod schema** — the file itself is well
   guarded, but `alt`, `caption`, `folder` and `sourcePath` are read through an
   uncapped helper (`:133-138`) and persisted verbatim, so any authenticated
   editor can write multi-megabyte strings into Postgres. This is the one
   boundary requirement 5 does not cover.
   *Remedy: parse the non-file form fields through a `z.object` with `.max()` on
   every string; clamp `file.name` before it becomes `sourcePath`.*
3. **framer-motion ships on the homepage** via
   `app/layout.tsx:87 → Providers.tsx:35 → ui/Toast.tsx:3`, directly
   contradicting ARCHITECTURE §8. Toasts are only ever used in `(admin)`.
   *Remedy: move `ToastProvider` into the `(admin)` layout, or load it with
   `next/dynamic(..., { ssr: false })`.*
4. **`changeOwnPassword` discards `signIn()`'s result**
   (`admin/settings/actions.ts:169-171`) — a rate-limited admin who changes their
   password has every session revoked and the re-issue silently refused, locking
   them out with a success message on screen.
   *Remedy: check the returned `ok`, or call `createSession()` directly since the
   password was just verified.*
5. **Site SEO settings are stored as `revisions` rows**
   (`admin/settings/site-settings.ts:5-12`) because the schema is frozen — an
   append-only audit table is now the source of truth for current settings, and
   every revision-history view must filter a pseudo-entity out.
   *Remedy: at the next migration, add a `site_settings` singleton table (or fold
   the four fields into `theme_settings.brand`); the module's API is already
   shaped to absorb the change.*

Nothing in R1/R2 is unowned, and nothing in the contract makes any of items 1–11
impossible. The stack and the data model are in good shape; findings 1 and 2 are
the two that will actually be visible in the finished product.
