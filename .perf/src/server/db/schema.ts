import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core'

import type { AppearanceConfig } from '@/lib/appearance'
import type {
  AnalyticsEventType,
  CameraWaypoint,
  MotionConfig,
  ProjectBlockType,
  ReconResult,
  RichTextDoc,
  SceneSettings,
  SeoMeta,
  ThemeColors,
  ThemeTypography,
  BrandConfig,
} from '@/types/content'

/* ---------------------------------- enums ---------------------------------- */

export const userRoleEnum = pgEnum('user_role', ['admin', 'editor'])
export const publishStatusEnum = pgEnum('publish_status', ['draft', 'published', 'archived'])
export const mediaKindEnum = pgEnum('media_kind', ['image', 'video', 'glb', 'hdri', 'texture', 'depth'])
export const sceneModeEnum = pgEnum('scene_mode', [
  'NONE',
  'IMAGE',
  'DEPTH_2_5D',
  'PROCEDURAL_3D',
  'NATIVE_GLB',
])
export const reconStatusEnum = pgEnum('recon_status', ['queued', 'running', 'review', 'approved', 'failed'])
export const blockTypeEnum = pgEnum('block_type', [
  'HERO',
  'SCENE_3D',
  'IMAGE',
  'GALLERY',
  'MASONRY',
  'VIDEO',
  'TEXT',
  'QUOTE',
  'MATERIALS',
  'BEFORE_AFTER',
  'PROJECT_INFO',
  'RELATED',
  'CTA',
])
export const homepageSectionEnum = pgEnum('homepage_section_key', [
  'HERO',
  'FEATURED_PROJECTS',
  'STUDIO',
  'SERVICES',
  'IMMERSIVE_PROJECT',
  'PHILOSOPHY',
  'JOURNAL',
  'CTA',
])
export const navLocationEnum = pgEnum('nav_location', ['header', 'footer'])
export const contactStatusEnum = pgEnum('contact_status', ['new', 'contacted', 'archived'])
export const categoryKindEnum = pgEnum('category_kind', ['project', 'journal'])
export const mediaRoleEnum = pgEnum('media_role', ['cover', 'hero', 'gallery', 'before', 'after'])

/* ---------------------------------- users ---------------------------------- */

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull(),
    name: text('name').notNull(),
    passwordHash: text('password_hash').notNull(),
    role: userRoleEnum('role').notNull().default('editor'),
    active: boolean('active').notNull().default(true),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('users_email_key').on(t.email)],
)

export const sessions = pgTable(
  'sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    tokenHash: text('token_hash').notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    userAgent: text('user_agent'),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('sessions_token_key').on(t.tokenHash), index('sessions_user_idx').on(t.userId)],
)

/* ---------------------------------- media ---------------------------------- */

export const media = pgTable(
  'media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    kind: mediaKindEnum('kind').notNull().default('image'),
    storageKey: text('storage_key').notNull(),
    url: text('url').notNull(),
    width: integer('width'),
    height: integer('height'),
    bytes: integer('bytes'),
    mime: text('mime'),
    blurDataUrl: text('blur_data_url'),
    alt: text('alt'),
    caption: text('caption'),
    folder: text('folder'),
    sourcePath: text('source_path'),
    checksum: text('checksum'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('media_storage_key_key').on(t.storageKey),
    index('media_folder_idx').on(t.folder),
    index('media_kind_idx').on(t.kind),
  ],
)

/* -------------------------------- categories ------------------------------- */

export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    nameEn: text('name_en'),
    description: text('description'),
    kind: categoryKindEnum('kind').notNull().default('project'),
    order: integer('order').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('categories_slug_key').on(t.slug)],
)

/* --------------------------------- projects -------------------------------- */

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    subtitle: text('subtitle'),
    summary: text('summary'),
    description: text('description'),
    categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
    coverMediaId: uuid('cover_media_id').references(() => media.id, { onDelete: 'set null' }),
    status: publishStatusEnum('status').notNull().default('draft'),
    featured: boolean('featured').notNull().default(false),
    order: integer('order').notNull().default(0),
    location: text('location'),
    area: text('area'),
    year: integer('year'),
    client: text('client'),
    duration: text('duration'),
    style: text('style'),
    services: text('services').array().notNull().default(sql`ARRAY[]::text[]`),
    seo: jsonb('seo').$type<SeoMeta>(),
    viewCount: integer('view_count').notNull().default(0),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('projects_slug_key').on(t.slug),
    index('projects_status_idx').on(t.status),
    index('projects_category_idx').on(t.categoryId),
    index('projects_featured_idx').on(t.featured),
  ],
)

export const projectMedia = pgTable(
  'project_media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    mediaId: uuid('media_id')
      .notNull()
      .references(() => media.id, { onDelete: 'cascade' }),
    role: mediaRoleEnum('role').notNull().default('gallery'),
    order: integer('order').notNull().default(0),
  },
  (t) => [
    index('project_media_project_idx').on(t.projectId),
    uniqueIndex('project_media_unique').on(t.projectId, t.mediaId, t.role),
  ],
)

export const projectBlocks = pgTable(
  'project_blocks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    type: blockTypeEnum('type').notNull(),
    order: integer('order').notNull().default(0),
    enabled: boolean('enabled').notNull().default(true),
    data: jsonb('data').$type<Record<string, unknown>>().notNull().default({}),
  },
  (t) => [index('project_blocks_project_idx').on(t.projectId)],
)

/* ---------------------------------- scenes --------------------------------- */

export const scenes = pgTable(
  'scenes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id, { onDelete: 'cascade' }),
    name: text('name'),
    mode: sceneModeEnum('mode').notNull().default('NONE'),
    modelMediaId: uuid('model_media_id').references(() => media.id, { onDelete: 'set null' }),
    sourceMediaId: uuid('source_media_id').references(() => media.id, { onDelete: 'set null' }),
    depthMediaId: uuid('depth_media_id').references(() => media.id, { onDelete: 'set null' }),
    envPreset: text('env_preset').notNull().default('apartment'),
    envIntensity: real('env_intensity').notNull().default(1),
    exposure: real('exposure').notNull().default(1),
    fov: real('fov').notNull().default(45),
    shadows: boolean('shadows').notNull().default(true),
    autoExplore: boolean('auto_explore').notNull().default(true),
    animationSpeed: real('animation_speed').notNull().default(1),
    scrollSensitivity: real('scroll_sensitivity').notNull().default(1),
    waypoints: jsonb('waypoints').$type<CameraWaypoint[]>().notNull().default([]),
    settings: jsonb('settings').$type<SceneSettings>().notNull().default({}),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('scenes_project_idx').on(t.projectId)],
)

export const reconJobs = pgTable(
  'recon_jobs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id').references(() => projects.id, { onDelete: 'set null' }),
    sceneId: uuid('scene_id').references(() => scenes.id, { onDelete: 'set null' }),
    sourceMediaId: uuid('source_media_id')
      .notNull()
      .references(() => media.id, { onDelete: 'cascade' }),
    mode: sceneModeEnum('mode').notNull().default('DEPTH_2_5D'),
    status: reconStatusEnum('status').notNull().default('queued'),
    progress: real('progress').notNull().default(0),
    provider: text('provider').notNull().default('heuristic'),
    result: jsonb('result').$type<ReconResult>(),
    error: text('error'),
    createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    startedAt: timestamp('started_at', { withTimezone: true }),
    finishedAt: timestamp('finished_at', { withTimezone: true }),
  },
  (t) => [index('recon_jobs_status_idx').on(t.status), index('recon_jobs_project_idx').on(t.projectId)],
)

/* --------------------------------- articles -------------------------------- */

export const articles = pgTable(
  'articles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    coverMediaId: uuid('cover_media_id').references(() => media.id, { onDelete: 'set null' }),
    categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
    content: jsonb('content').$type<RichTextDoc>().notNull().default({ nodes: [] }),
    status: publishStatusEnum('status').notNull().default('draft'),
    tags: text('tags').array().notNull().default(sql`ARRAY[]::text[]`),
    readingMinutes: integer('reading_minutes'),
    authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
    seo: jsonb('seo').$type<SeoMeta>(),
    viewCount: integer('view_count').notNull().default(0),
    scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('articles_slug_key').on(t.slug), index('articles_status_idx').on(t.status)],
)

/* -------------------------- services & materials --------------------------- */

export const services = pgTable(
  'services',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    indexLabel: text('index_label').notNull().default('01'),
    title: text('title').notNull(),
    summary: text('summary'),
    description: text('description'),
    coverMediaId: uuid('cover_media_id').references(() => media.id, { onDelete: 'set null' }),
    order: integer('order').notNull().default(0),
    enabled: boolean('enabled').notNull().default(true),
  },
  (t) => [uniqueIndex('services_slug_key').on(t.slug)],
)

export const materials = pgTable(
  'materials',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    mediaId: uuid('media_id').references(() => media.id, { onDelete: 'set null' }),
    order: integer('order').notNull().default(0),
    enabled: boolean('enabled').notNull().default(true),
  },
  (t) => [uniqueIndex('materials_slug_key').on(t.slug)],
)

/* ------------------------- theme / homepage / nav -------------------------- */

export const themeSettings = pgTable('theme_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  singleton: boolean('singleton').notNull().default(true),
  colors: jsonb('colors').$type<ThemeColors>().notNull(),
  typography: jsonb('typography').$type<ThemeTypography>().notNull(),
  motion: jsonb('motion').$type<MotionConfig>().notNull(),
  brand: jsonb('brand').$type<BrandConfig>().notNull(),
  /**
   * Which palette a visitor gets, and whether they may change it.
   *
   * Deliberately its own column rather than a key inside `colors`: `colors` is a
   * single palette and this decides *between* palettes, so folding it in would
   * make the shape of the theme row depend on its own contents. Typed in
   * `@/lib/appearance` rather than in the frozen `@/types/content`.
   */
  appearance: jsonb('appearance').$type<AppearanceConfig>(),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})

export const homepageSections = pgTable(
  'homepage_sections',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    key: homepageSectionEnum('key').notNull(),
    enabled: boolean('enabled').notNull().default(true),
    order: integer('order').notNull().default(0),
    content: jsonb('content').$type<Record<string, unknown>>().notNull().default({}),
    settings: jsonb('settings').$type<Record<string, unknown>>().notNull().default({}),
  },
  (t) => [uniqueIndex('homepage_sections_key_key').on(t.key)],
)

export const navigation = pgTable(
  'navigation',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    location: navLocationEnum('location').notNull().default('header'),
    label: text('label').notNull(),
    href: text('href').notNull(),
    order: integer('order').notNull().default(0),
    parentId: uuid('parent_id'),
    enabled: boolean('enabled').notNull().default(true),
  },
  (t) => [index('navigation_location_idx').on(t.location)],
)

/* ------------------------ contact / revisions / logs ----------------------- */

export const contactRequests = pgTable(
  'contact_requests',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    phone: text('phone'),
    projectType: text('project_type'),
    budget: text('budget'),
    message: text('message'),
    status: contactStatusEnum('status').notNull().default('new'),
    source: text('source'),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('contact_requests_status_idx').on(t.status)],
)

export const revisions = pgTable(
  'revisions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    entityType: text('entity_type').notNull(),
    entityId: uuid('entity_id').notNull(),
    data: jsonb('data').$type<Record<string, unknown>>().notNull(),
    note: text('note'),
    createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('revisions_entity_idx').on(t.entityType, t.entityId)],
)

export const auditLogs = pgTable(
  'audit_logs',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
    action: text('action').notNull(),
    entityType: text('entity_type'),
    entityId: uuid('entity_id'),
    meta: jsonb('meta').$type<Record<string, unknown>>(),
    ipHash: text('ip_hash'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('audit_logs_user_idx').on(t.userId), index('audit_logs_created_idx').on(t.createdAt)],
)

export const analyticsEvents = pgTable(
  'analytics_events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    type: text('type').$type<AnalyticsEventType>().notNull(),
    entityType: text('entity_type'),
    entityId: uuid('entity_id'),
    sessionHash: text('session_hash'),
    meta: jsonb('meta').$type<Record<string, unknown>>(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('analytics_type_idx').on(t.type), index('analytics_created_idx').on(t.createdAt)],
)

/* -------------------------------- relations -------------------------------- */

export const projectsRelations = relations(projects, ({ one, many }) => ({
  category: one(categories, { fields: [projects.categoryId], references: [categories.id] }),
  cover: one(media, { fields: [projects.coverMediaId], references: [media.id] }),
  gallery: many(projectMedia),
  blocks: many(projectBlocks),
  scenes: many(scenes),
}))

export const projectMediaRelations = relations(projectMedia, ({ one }) => ({
  project: one(projects, { fields: [projectMedia.projectId], references: [projects.id] }),
  media: one(media, { fields: [projectMedia.mediaId], references: [media.id] }),
}))

export const projectBlocksRelations = relations(projectBlocks, ({ one }) => ({
  project: one(projects, { fields: [projectBlocks.projectId], references: [projects.id] }),
}))

export const scenesRelations = relations(scenes, ({ one }) => ({
  project: one(projects, { fields: [scenes.projectId], references: [projects.id] }),
  model: one(media, { fields: [scenes.modelMediaId], references: [media.id] }),
  source: one(media, { fields: [scenes.sourceMediaId], references: [media.id] }),
  depth: one(media, { fields: [scenes.depthMediaId], references: [media.id] }),
}))

export const articlesRelations = relations(articles, ({ one }) => ({
  cover: one(media, { fields: [articles.coverMediaId], references: [media.id] }),
  author: one(users, { fields: [articles.authorId], references: [users.id] }),
  category: one(categories, { fields: [articles.categoryId], references: [categories.id] }),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  projects: many(projects),
}))

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

/* ------------------------------ inferred types ----------------------------- */

export type UserRow = typeof users.$inferSelect
export type MediaRow = typeof media.$inferSelect
export type ProjectRow = typeof projects.$inferSelect
export type ProjectBlockRow = typeof projectBlocks.$inferSelect
export type SceneRow = typeof scenes.$inferSelect
export type ArticleRow = typeof articles.$inferSelect
export type ServiceRow = typeof services.$inferSelect
export type MaterialRow = typeof materials.$inferSelect
export type CategoryRow = typeof categories.$inferSelect
export type ThemeRow = typeof themeSettings.$inferSelect
export type HomepageSectionRow = typeof homepageSections.$inferSelect
export type NavigationRow = typeof navigation.$inferSelect
export type ContactRequestRow = typeof contactRequests.$inferSelect
export type ReconJobRow = typeof reconJobs.$inferSelect
export type ProjectBlockTypeDb = (typeof blockTypeEnum.enumValues)[number]
export type BlockTypeCheck = ProjectBlockType extends ProjectBlockTypeDb ? true : never
