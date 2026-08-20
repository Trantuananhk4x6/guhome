# AN ATELIER — Requirement checklist

Derived from the client brief (68 sections). Every line is a verifiable claim about
the built system. Auditors: mark each `MET` / `PARTIAL` / `MISSING` with the file and
line that proves it, or the concrete gap.

## R1 Technology stack (§1)
1. Next.js App Router, strict TypeScript, no `any` outside unavoidable cases.
2. React 19 + Tailwind (v4, CSS-first tokens).
3. three.js + @react-three/fiber + @react-three/drei + @react-three/postprocessing.
4. GSAP + ScrollTrigger; Lenis smooth scroll; Framer Motion only for small UI.
5. Zustand for UI state; Zod for every input boundary.
6. Drizzle ORM against Neon PostgreSQL — no MongoDB, no SQLite in production.
7. Secure authentication with session revocation.
8. Object storage abstraction for media and 3D assets (not blobs in Postgres).

## R2 Database (§2)
9. Tables cover: projects, articles, users, categories, services, materials, project
   blocks, 3D metadata, theme config, homepage config, navigation, contact requests,
   revisions, audit logs.
10. Large assets (images, video, GLB, GLTF, textures, HDRI, depth maps) live in storage,
    referenced by row — never stored in Postgres.
11. Data flow is Next → server actions/route handlers → Drizzle → Neon.

## R3 Design direction (§3, §63, §64)
12. Warm neutral palette, editable from Admin at runtime (no rebuild).
13. Display serif + clean sans body, both carrying a full Vietnamese subset.
    **Superseded 2026-08-20 by the client, who called the original pairing hard to
    read.** Cormorant Garamond at weight 300 with sub-1 leading washes out under
    Vietnamese diacritics, which stack above and below the x-height. Shipping pair
    is now Playfair Display 500 (display) + Be Vietnam Pro (body). Instrument Serif
    and DM Serif Display, named in the brief, are unusable here: neither ships a
    Vietnamese range, so text drops out of the face mid-word. Seven Vietnamese-capable
    families are bundled and switchable from /admin/theme.
14. Oversized typography, large whitespace, asymmetric editorial composition.
15. No SaaS-template look, no gaming look, no excessive gradients/neon/rounded cards.
16. Priority order respected: photography → architecture → typography → story → 3D → motion.
17. 3D is invisible as technology; it never obscures the architecture.

## R4 Core experience (§4)
18. Homepage narrative runs Landing → 3D interior → scroll camera → typography →
    project → camera transition → gallery → studio → services → journal → contact.
19. Scrolling feels like operating a cinematic camera.

## R5 Motion architecture (§5–§8)
20. Centralised `src/animations/` modules: gsap, config, scroll, reveal, text, image,
    pageTransition, camera, projects — no scattered ad-hoc GSAP calls in components.
21. Reusable hooks exist: useReveal, useTextReveal, useImageReveal, useParallax,
    useHorizontalScroll, useCameraScroll, useProjectTransition.
22. GSAP plugins registered exactly once, centrally.
23. One global Lenis instance; Lenis → rAF → GSAP ticker → ScrollTrigger.update wiring.
24. ScrollTrigger recalculates on resize and font load; mobile-safe; destroy on unmount.
25. A MotionConfig controls: enabled, reducedMotion, scrollSmoothing, pageTransition,
    textReveal, imageReveal, parallax, threeDAnimation, cameraAnimation.
26. Admin can disable animation globally; `prefers-reduced-motion` reduces camera
    movement, parallax, large transforms and page transitions automatically.

## R6 Hero (§9, §10, §20)
27. `<Hero3D />` occupies 100vh with ThreeCanvas (camera, environment, lights, model,
    postprocessing) plus an overlay (logo, nav, heading, CTA) and a scroll indicator.
28. Camera moves on scroll: outside/entrance → interior → living room → furniture pan →
    project content, interpolated with GSAP easing, never jumping between positions.
29. Hero heading animates in sequence: logo → heading → description → CTA, subtle stagger.

## R7 Camera system (§11, §12, §30, §61)
30. Camera waypoints are data (position, target, fov, ease, at) stored per project in
    the database — not hardcoded per project in source.
31. Admin can adjust camera start, end, target, speed, scroll distance, rotation, FOV.
32. Easing uses power2.out / power3.out / power4.inOut / expo.out — no linear motion,
    no fast spinning, no camera shake, no game-like movement.
33. AUTO EXPLORE walks waypoints on a GSAP timeline, slowly and elegantly.
34. Scroll → progress → camera controller → three.js camera via refs; no React re-render
    per scroll tick or animation frame.

## R8 3D scene system (§13, §14, §60, §62)
35. Reusable `InteriorScene` composed of environment, camera controller, lighting, model,
    materials, shadows, postprocessing, interaction.
36. Supports GLB, GLTF, procedural scene, image-derived scene, depth-based 2.5D.
37. Declarative R3F components, not one giant imperative three.js file.
38. GSAP owns camera/object/material/scene transitions; R3F owns rendering; React state
    only for UI. No high-frequency values in React state.
39. Per-project scenes, camera paths, lighting and animation all come from project data.

## R9 3D performance (§15, §51, §52)
40. Suspense, lazy loading, dynamic imports for anything importing three.
41. Draco + KTX2 decoders available and wired; textures resized at build time.
42. LOD/frustum culling/optimised shadows/limited DPR (`dpr={[1,1.5]}` style) applied.
43. Project listing pages do not load heavy 3D scenes per card.
44. Asset caching and disposal on unmount.

## R10 Loading & transitions (§16, §17, §36, §37)
45. Premium loader: blurred project image behind, "PREPARING SPACE", progress, GSAP
    crossfade into the scene — never a sudden model pop-in.
46. 3D → photography transition uses opacity/scale/clip-path/blur so it reads seamless.
47. Global page transition: overlay expands, new page loads, overlay reveals — 0.8–1.2s.
48. Preloader only when needed, 0.8–2s, skipped when assets are cached.

## R11 Reveal systems (§18, §19, §21, §31)
49. Image reveal variants exist and are used deliberately: revealUp, revealLeft,
    revealRight, revealScale, revealClip, revealParallax — not one variant everywhere.
50. Large typography animates by line/word/block (not character-by-character).
51. Section storytelling: image enters → title → description → image drift → overlap.
52. Pinning is used sparingly; galleries carry subtle parallax (±10%, no more).

## R12 Project surfaces (§22–§29, §32–§35)
53. `ImmersiveProjectSection`: 300vh outer, sticky 100vh inner, scroll drives camera,
    title, metadata and image transitions through named stages.
54. Featured projects showcase with large imagery and side metadata.
55. Horizontal project gallery driven by vertical scroll, width measured dynamically
    (never hardcoded), pinned with scrub.
56. Project card hover: image 1→1.05, metadata opacity 0→1 with y 20→0; no aggressive
    cursor effects.
57. Optional desktop-only custom cursor with default/view/drag/project states, disabled
    on touch and reduced motion.
58. Project open transition: card image expands to fullscreen, then route change
    (View Transition API when available, GSAP fallback).
59. Project detail hero is a full-screen image or interactive 3D; text appears after the
    visual is established.
60. Projects with 3D offer EXPLORE SPACE: orbit, zoom, controlled pan, fullscreen, with
    a minimal, non-game UI, plus optional AUTO EXPLORE.
61. Before/After slider: animates on enter, drag to compare, no continuous auto-motion.
62. Materials section cross-fades material imagery on hover (opacity/scale/clip-path).
63. Services render as numbered editorial rows with hover number/image/title motion.
64. Journal cards reveal image/title/metadata on enter; image scale + arrow move on hover.

## R13 Chrome (§38, §39)
65. Subtle scroll progress indicator (thin line, not a large bar).
66. Header transparent over hero, gains background/blur/border on scroll; subtle nav
    hover; fullscreen staggered mobile menu.

## R14 Responsive & fallback (§40, §41, §54)
67. Mobile is designed intentionally: shorter distances, less parallax, no custom cursor,
    reduced 3D complexity, less pinning — not a scaled-down desktop.
68. WebGL support, device capability, reduced motion and mobile performance are detected;
    unsuitable devices get a high-quality image + CSS parallax fallback.
69. Breakpoints tuned for mobile, tablet, laptop, desktop, large desktop.

## R15 Image → 3D pipeline (§42–§45)
70. Admin workflow: upload image → create reconstruction job → pipeline → quality check →
    preview → approval → publish. Reconstruction never runs during page rendering.
71. 2.5D fallback path: image → depth map → foreground/background separation →
    displacement → three.js layered geometry → camera parallax.
72. Native GLB/GLTF upload supported; per-project mode selector NONE / IMAGE /
    DEPTH_2_5D / PROCEDURAL_3D / NATIVE_GLB.
73. Admin 3D settings: mode, model, camera, target, FOV, exposure, environment,
    environment intensity, shadow, auto explore, animation speed, scroll sensitivity —
    with real-time preview.

## R16 CMS (§46–§49, §68)
74. Theme editor covers brand (logo, favicon, company name), colours, typography,
    motion, navigation — persisted to Neon and applied without a rebuild.
75. Homepage builder reorders/enables the eight sections with per-section content.
76. Project builder supports add/delete/reorder/duplicate/hide/edit of all 13 block
    types with drag-and-drop.
77. Blog CMS supports create, edit, draft, publish, schedule, archive, preview, and rich
    content (headings, paragraphs, images, galleries, videos, quotes, links, project refs).
78. Media library with upload, search, filtering, alt/caption editing and safe delete.
79. Everything genuinely functional against Neon: auth, project CRUD, article CRUD,
    media upload, builders, theme, 3D assets, contact submissions.

## R17 SEO & analytics (§50, §56)
80. Metadata, sitemap, robots.txt, canonical URLs, OpenGraph, Twitter cards.
81. JSON-LD for project, article and organization.
82. Tracked events: project view, 3D open, 3D interaction, 3D auto explore, article view,
    contact CTA, contact submit — with no unnecessary personal data.

## R18 Accessibility (§53)
83. Keyboard navigation, visible focus states, semantic HTML, alt text on every image,
    screen-reader support.
84. Reduced motion disables camera scrub, large parallax and page transitions.

## R19 Robustness (§55)
85. Loading, error and empty states exist; 3D load failure, missing asset, API failure
    and image failure all degrade to something presentable.
86. A failed 3D scene never leaves a blank canvas — it falls back to the project image.

## R20 Routes & architecture (§57, §58, §59)
87. All public and admin routes from the brief exist.
88. Component tree follows the prescribed layout/sections/projects/three/animation split.
89. Every ScrollTrigger animation cleans itself up (gsap.context or equivalent); no
    ScrollTriggers recreated on every render; no memory leaks.

## R21 Delivery (§65, §66, §67)
90. Lint, typecheck and build all pass.
91. Realistic sample content and sample interior projects are present.
92. New projects, articles, 3D scenes and themes can be added without touching source.
