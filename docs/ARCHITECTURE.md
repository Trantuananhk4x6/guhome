# AN ATELIER — Architecture Contract

Read this **before writing any code**. It is the single source of truth that keeps
parallel work compatible. Do not restate or redefine anything declared here.

Studio brand: **AN ATELIER** — "an" (bình an / stillness) + atelier.
Tagline: *Không gian mang tính cách.* — "Spaces with character."
Positioning: interior architecture studio, Ho Chi Minh City. Content language is
**Vietnamese**, with English used only for small editorial labels (`SELECTED WORKS`,
`STUDIO`, `INDEX 01`). Never machine-translated English body copy.

---

## 0. Ground rules

- **Never edit files outside the paths you own** (see §5). If you need something from
  another area, import it from the documented contract — assume it exists.
- Strict TypeScript. `any` is banned (`@typescript-eslint/no-explicit-any: error`).
  `noUncheckedIndexedAccess` is on: `arr[0]` is `T | undefined`, handle it.
- Use the **Write / Edit tools** for source files. Bash heredocs mangle backslashes
  in this environment — regex literals written through heredoc will silently break.
- Imports use the `@/` alias (`@/components/...`, `@/server/...`, `@/types/content`).
- Server-only modules must not be imported by client components. Client components
  start with `'use client'`.
- No `npm run dev` inside an agent (it never exits). Verify with
  `npx tsc --noEmit` on your own files if you want a check.
- Do not add dependencies. The lockfile is fixed; everything you need is installed.
- Do not touch: `package.json`, `tsconfig.json`, `next.config.ts`, `drizzle.config.ts`,
  `src/types/content.ts`, `src/server/db/schema.ts`, `src/styles/globals.css`,
  `.env.local`. If you truly need a change there, note it in your final report instead.
- **Exception — `tsconfig.json` is co-owned with Next.** `next dev` / `next build` run
  `writeConfigurationDefaults` and rewrite `compilerOptions.jsx` to `react-jsx` (Next 16
  uses the React automatic runtime), append `.next/dev/types/**/*.ts` to `include`, and
  re-pretty-print the file. That is Next asserting its own contract, not an agent editing a
  frozen file — the committed values are Next's. Do not revert them and do not report them
  as a violation; `npx tsc --noEmit` passes either way. Everything else in the file is still
  frozen. Next likewise generates `AGENTS.md` / `CLAUDE.md` at the repo root on every dev
  run; both are committed so the tree stays clean.
- `next dev` and `next build` are for the orchestrator, not for agents: a build inside an
  agent races the dev server and rewrites the file above mid-review. Verify with
  `npx tsc --noEmit` and `npx eslint <paths>`.

## 1. Stack (already installed, versions pinned)

Next 16.3.1 (App Router) · React 19.2 · TypeScript 5.9 · Tailwind **v4** (CSS-first,
no `tailwind.config.js` — tokens live in `src/styles/globals.css` `@theme`) ·
three 0.185 · @react-three/fiber 9.7 · @react-three/drei 10.7 ·
@react-three/postprocessing 3.0 · gsap 3.15 (all plugins free, incl. ScrollTrigger &
SplitText) · lenis 1.3 · zustand 5 · zod 4 · drizzle-orm 0.45 + @neondatabase/serverless ·
jose 6 · sharp 0.35 · framer-motion 13 (only for small UI: menus, modals).

## 2. Design language

Palette (CSS vars in `globals.css`, DB-overridable via theme editor):

| token | hex | use |
|---|---|---|
| `canvas` | `#F4F1EA` | page background, limestone |
| `surface` | `#EAE5DA` | cards, alternating bands, oat |
| `surface-alt` | `#DCD5C7` | insets, image mattes |
| `ink` | `#1C1B18` | primary text |
| `muted` | `#78736A` | secondary text, labels |
| `line` | `#D7D0C2` | hairlines, borders |
| `espresso` | `#131210` | dark cinematic sections, footer |
| `accent` | `#A07753` | bronze-clay: rules, active states, small marks |
| `accent-soft` | `#C7A57C` | hover tints, on-dark accent |

Rules: accent is used **sparingly** — a hairline, an index number, a hover. No
gradients, no glassmorphism, no rounded-2xl cards, no drop shadows beyond a soft
image shadow. Corners are square (`rounded-none`) except tiny controls (`rounded-full`
for the scroll dot / cursor).

Type: display = **Cormorant Garamond** (300/400, tight leading, large sizes),
body = **Inter** (400/500). Labels: 11px, `tracking-[0.18em]`, uppercase, muted.
Utility classes already exist: `.u-display`, `.u-display-sm`, `.u-label`, `.u-body-lg`,
`.u-gutter`, `.u-rule`.

Layout: 12-column implied grid, generous asymmetry, `--spacing-gutter` inline padding,
`--spacing-section` block rhythm. Images carry captions in `.u-label`.

## 3. Content voice

Project names: evocative Vietnamese, 2–4 words, no client names, no "Căn số 12".
Examples of the register: *Tĩnh Viện*, *Nhà Của Gió*, *Bản Giao Hưởng Óc Chó*,
*Hiên Nắng*, *Mộc Lam*. Every project needs: `title`, `subtitle` (one line, English
label optional), `summary` (35–60 words, luxurious but concrete — materials, light,
proportion), `description` (3–5 paragraphs), plus `location`, `area`, `year`,
`style`, `services[]`. No marketing clichés ("đẳng cấp thượng lưu", "sang trọng bậc
nhất"). Write like an architecture magazine: specific, calm, material-led.

## 4. What already exists (do not recreate)

```
src/types/content.ts     all shared domain types  ← import, never redeclare
src/server/db/schema.ts  drizzle schema, 19 tables (already migrated to Neon)
src/server/db/index.ts   export const db  (drizzle + neon-http, casing: snake_case)
src/lib/utils.ts         cn, slugify, formatArea, formatDate, pad2, clamp, lerp,
                         hashString, readingMinutes
src/lib/env.ts           serverEnv(), siteUrl
src/styles/globals.css   tokens + base layer + Lenis base styles
drizzle/0000_*.sql       applied migration
```

Image library source of truth: `D:/guhome/**` — 1486 photos in 105 leaf folders,
inventory JSON at `docs/inventory.json` (`{dir, count, mb, files[]}`).

## 5. Ownership map

| Area | Owner path(s) — only this agent writes here |
|---|---|
| Media pipeline | `scripts/build-media.ts`, `src/server/storage/**`, `src/lib/media.ts` |
| Content data | `src/data/**` |
| Motion system | `src/animations/**`, `src/components/animation/**`, `src/lib/motion.ts` |
| Three.js system | `src/components/three/**`, `src/lib/three/**` |
| Auth + queries | `src/server/auth/**`, `src/server/queries/**`, `src/middleware.ts` |
| Layout & UI kit | `src/app/layout.tsx`, `src/components/layout/**`, `src/components/ui/**`, `src/lib/theme.ts` |
| Home sections | `src/components/sections/**`, `src/app/(site)/page.tsx` |
| Project pages | `src/components/projects/**`, `src/app/(site)/projects/**` |
| Other public pages | `src/app/(site)/{studio,services,journal,contact}/**` |
| Admin | `src/app/(admin)/**`, `src/components/admin/**`, `src/server/actions/**` |
| Recon pipeline | `src/server/recon/**`, `scripts/jobs-worker.ts`, `src/app/api/recon/**` |
| Seed | `scripts/seed.ts` |
| SEO/analytics | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/lib/seo.ts`, `src/lib/analytics.ts`, `src/app/api/analytics/**` |

## 6. Cross-module contracts (implement exactly these signatures)

### 6.1 Media — `@/lib/media`
```ts
export function mediaUrl(m: MediaRef | null, width?: number): string
export function toMediaRef(row: MediaRow): MediaRef
export const MEDIA_WIDTHS: readonly number[]      // [400,800,1200,1600,2400]
```
Derivatives live at `public/media/<projectSlug>/<index>-<width>.webp`, so a public
URL is `/media/<projectSlug>/<index>-<width>.webp`. `media.storageKey` stores
`<projectSlug>/<index>` (no width, no extension).

### 6.2 Storage — `@/server/storage`
```ts
export interface StorageDriver {
  put(key: string, body: Buffer, contentType: string): Promise<{ url: string }>
  delete(key: string): Promise<void>
  url(key: string): string
}
export function storage(): StorageDriver   // local driver now, s3 driver behind env
```

### 6.3 Motion — `@/animations/*`
```ts
// gsap.ts
export { gsap, ScrollTrigger, SplitText }
export function registerGsap(): void              // idempotent, client-only
// scroll.ts
export function ScrollProvider(props: { children: ReactNode; motion: MotionConfig }): JSX.Element
export function useLenis(): Lenis | null
export function useScrollProgress(ref: RefObject<HTMLElement | null>): MutableRefObject<number>
// reveal.ts
export function useReveal(ref, opts?: { variant?: RevealVariant; delay?: number; stagger?: number }): void
// text.ts
export function useTextReveal(ref, opts?: { by?: 'line' | 'word'; delay?: number }): void
// image.ts
export function useImageReveal(ref, opts?: { variant?: RevealVariant }): void
export function useParallax(ref, opts?: { strength?: number }): void
// projects.ts
export function useHorizontalScroll(sectionRef, trackRef): void
export function useProjectTransition(): { openProject(el: HTMLElement, href: string): void }
// camera.ts
export function useCameraScroll(args: {
  sectionRef: RefObject<HTMLElement | null>
  progress: MutableRefObject<number>
  sensitivity?: number
}): void
// pageTransition.ts
export function PageTransition(props: { children: ReactNode }): JSX.Element
```
Every hook must no-op cleanly when motion is disabled or reduced, must use
`gsap.context()` scoped cleanup, and must never call `setState` per frame.

Motion state store — `@/lib/motion.ts` (zustand):
```ts
export const useMotionStore: UseBoundStore<StoreApi<{
  config: MotionConfig
  reduced: boolean
  setConfig(c: MotionConfig): void
  setReduced(r: boolean): void
}>>
export function motionEnabled(flag: keyof MotionConfig): boolean  // reads store, honours reduced
```

### 6.4 Three — `@/components/three/*`
```tsx
// InteriorScene.tsx  — the one entry point used by every consumer
export function InteriorScene(props: {
  config: SceneConfig
  progressRef?: MutableRefObject<number>   // 0..1 scroll-driven camera
  mode?: 'scroll' | 'orbit'                // scroll = hero/immersive, orbit = explore
  autoExplore?: boolean
  fallbackImage?: MediaRef | null
  className?: string
  onReady?: () => void
}): JSX.Element
```
It must: lazy-load heavy deps, render `ThreeLoader` while suspending, degrade to
`fallbackImage` when `supportsWebGL()` is false / device is weak / reduced motion,
never crash the page (error boundary inside), and drive the camera by mutating
three objects directly (no React state per frame).
`@/lib/three/capability.ts` exports `supportsWebGL(): boolean`,
`devicePerf(): 'low' | 'medium' | 'high'`, `recommendedDpr(): [number, number]`.

### 6.5 Queries — `@/server/queries/*` (server-only, cached)
```ts
// projects.ts
getPublishedProjects(opts?: { limit?: number; categorySlug?: string; featured?: boolean }): Promise<ProjectSummary[]>
getProjectBySlug(slug: string): Promise<ProjectDetail | null>
getRelatedProjects(projectId: string, limit?: number): Promise<ProjectSummary[]>
getAllProjectSlugs(): Promise<string[]>
// articles.ts   getPublishedArticles, getArticleBySlug, getAllArticleSlugs
// site.ts       getThemeSettings(): Promise<ThemeSettings>
//               getHomepageSections(): Promise<HomepageSection[]>
//               getNavigation(location): Promise<NavItem[]>
//               getServices(): Promise<ServiceItem[]>
//               getMaterials(): Promise<MaterialItem[]>
// scenes.ts     getSceneById(id), getSceneForProject(projectId)
```
All return plain serialisable objects shaped by `@/types/content` — never raw rows.

### 6.6 Auth — `@/server/auth/*`
```ts
export async function getSession(): Promise<{ userId: string; email: string; role: UserRole } | null>
export async function requireUser(): Promise<Session>        // redirect('/admin/login') if absent
export async function requireAdmin(): Promise<Session>       // 403 for editors
export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }>
export async function signOut(): Promise<void>
export function hashPassword(pw: string): Promise<string>    // scrypt, salt embedded
export function verifyPassword(pw: string, hash: string): Promise<boolean>
```
Session = signed JWT (jose, HS256) in an httpOnly, sameSite=lax, secure-in-prod cookie
`an_session`, 7-day expiry, plus a `sessions` row so tokens can be revoked.
`src/middleware.ts` guards `/admin/*` except `/admin/login`.

### 6.7 Theme — `@/lib/theme.ts`
```ts
export const DEFAULT_THEME: ThemeSettings          // exactly the palette in §2
export function themeToCssVars(t: ThemeSettings): string   // "--c-canvas:#f4f1ea;..."
```
`src/app/layout.tsx` reads `getThemeSettings()` and injects the vars in a `<style>`
tag on `<html>`, so admin colour changes apply site-wide with no rebuild.

### 6.8 Recon — `@/server/recon/*`
```ts
export interface Reconstructor {
  mode: Exclude<SceneMode, 'NONE' | 'IMAGE'>
  run(input: { sourcePath: string; jobId: string; onProgress(p: number): void }): Promise<ReconResult>
}
export function reconstructorFor(mode): Reconstructor
export async function runJob(jobId: string): Promise<void>
```
Two implementations: `depth25d` (depth map → displaced plane; provider `heuristic`
uses luminance+gradient depth, provider `replicate` calls a real depth model when
`REPLICATE_API_TOKEN` is set) and `procedural` (single-image room-box: estimate
vanishing point, build wall/floor/ceiling planes, project the photo as texture,
export GLB). Jobs never run during page render — only via `scripts/jobs-worker.ts`
or an explicit admin action.

## 7. Routes

Public `(site)`: `/`, `/projects`, `/projects/[slug]`, `/studio`, `/services`,
`/journal`, `/journal/[slug]`, `/contact`.
Admin `(admin)`: `/admin` (dashboard), `/admin/login`, `/admin/projects`,
`/admin/projects/new`, `/admin/projects/[id]`, `/admin/articles`,
`/admin/articles/new`, `/admin/articles/[id]`, `/admin/media`, `/admin/3d-assets`,
`/admin/theme`, `/admin/homepage`, `/admin/navigation`, `/admin/settings`.

## 8. Performance rules

- `next/dynamic` with `ssr: false` for anything importing three/R3F. The projects
  index must not ship three.
- `dpr={recommendedDpr()}`, `frameloop="demand"` where the scene is static.
- Draco + KTX2 loaders configured from `/draco/` and `/basis/` (drei `useGLTF`
  `setDecoderPath`). Textures resized at build time by the media pipeline.
- Images: `next/image` with `sizes`, `placeholder="blur"` from `blurDataURL`.
- No `framer-motion` on the homepage; GSAP only.

## 9. Accessibility

Semantic landmarks, visible focus rings (already styled), keyboard-operable
before/after slider and galleries, `alt` on every image (from `media.alt`),
`prefers-reduced-motion` honoured everywhere, 3D canvases marked
`aria-hidden` with a text alternative nearby.

## 10. Next 16 gotchas (added mid-build — re-read if you are writing pages)

- `params` and `searchParams` are **Promises** in App Router pages, layouts and
  `generateMetadata`. Type them as `Promise<{ slug: string }>` and `await` them:
  ```ts
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
  }
  ```
- `cookies()`, `headers()`, `draftMode()` are async too — `await cookies()`.
- `next lint` is gone; the script is plain `eslint .`.
- Route handlers get the same async-params shape:
  `{ params }: { params: Promise<{ id: string }> }`.
- Client components may not receive functions as props from server components —
  pass ids/strings and bind server actions instead.
- `useSearchParams()` requires a `<Suspense>` boundary above it in a server-rendered
  page, otherwise the route opts out of static rendering with a build error.
