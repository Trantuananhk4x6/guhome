'use server'

/**
 * Theme editor mutations — palette, typography, motion and brand.
 *
 * Admin-only: the theme is injected into every page's `<style>` tag by the root
 * layout, so a bad value is site-wide. Every write revalidates the whole layout
 * tree and leaves an `audit_logs` row.
 */

import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { DEFAULT_THEME } from '@/lib/theme'
import { requireAdmin } from '@/server/auth'
import { db } from '@/server/db'
import { auditLogs, themeSettings } from '@/server/db/schema'
import type { ActionResult } from '@/components/admin/site/contracts'
import type { ThemeSettings } from '@/types/content'

/* -------------------------------- validation ------------------------------- */

const HEX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
const FONT_NAME = /^[\w\s'.-]{1,48}$/

const color = z
  .string()
  .trim()
  .regex(HEX, 'Cần mã màu dạng #RRGGBB.')

const colorsSchema = z.object({
  canvas: color,
  surface: color,
  surfaceAlt: color,
  ink: color,
  muted: color,
  line: color,
  espresso: color,
  accent: color,
  accentSoft: color,
})

const typographySchema = z.object({
  displayFont: z.string().trim().regex(FONT_NAME, 'Tên phông không hợp lệ.'),
  bodyFont: z.string().trim().regex(FONT_NAME, 'Tên phông không hợp lệ.'),
  displayScale: z.number().min(0.6).max(2),
  bodyScale: z.number().min(0.75).max(1.5),
  tracking: z.number().min(0.25).max(3),
})

const motionSchema = z.object({
  enabled: z.boolean(),
  reducedMotion: z.enum(['auto', 'force', 'off']),
  scrollSmoothing: z.boolean(),
  pageTransition: z.boolean(),
  textReveal: z.boolean(),
  imageReveal: z.boolean(),
  parallax: z.boolean(),
  threeDAnimation: z.boolean(),
  cameraAnimation: z.boolean(),
  intensity: z.number().min(0).max(1),
  transitionSpeed: z.number().min(0.1).max(4),
})

const uuid = z.string().uuid('Media không hợp lệ.')

const brandSchema = z.object({
  companyName: z.string().trim().min(1, 'Chưa nhập tên công ty.').max(80),
  shortName: z.string().trim().min(1, 'Chưa nhập tên rút gọn.').max(24),
  tagline: z.string().trim().max(140),
  logoMediaId: uuid.nullable(),
  faviconMediaId: uuid.nullable(),
  email: z.string().trim().email('Email không hợp lệ.'),
  phone: z.string().trim().max(40),
  address: z.string().trim().max(200),
  social: z
    .array(
      z.object({
        label: z.string().trim().min(1, 'Chưa nhập tên kênh.').max(40),
        href: z
          .string()
          .trim()
          .regex(/^https:\/\/\S+$/, "Liên kết phải bắt đầu bằng 'https://'."),
      }),
    )
    .max(12, 'Tối đa 12 kênh.'),
})

const themeSchema = z.object({
  colors: colorsSchema,
  typography: typographySchema,
  motion: motionSchema,
  brand: brandSchema,
})

/* --------------------------------- helpers --------------------------------- */

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const path = issue.path.map((part) => String(part)).join('.')
    if (!(path in out)) out[path] = issue.message
  }
  return out
}

async function audit(
  userId: string,
  action: string,
  meta: Record<string, unknown>,
  entityId?: string,
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId,
      action,
      entityType: 'theme_settings',
      entityId: entityId ?? null,
      meta,
    })
  } catch (error) {
    console.error('[actions/theme] audit write failed', error)
  }
}

/** Theme lives in `<html>`, so every route must be rebuilt. */
function revalidateEverything(): void {
  revalidatePath('/', 'layout')
}

async function persist(theme: ThemeSettings, userId: string): Promise<string> {
  const existing = await db
    .select({ id: themeSettings.id })
    .from(themeSettings)
    .orderBy(desc(themeSettings.updatedAt))
    .limit(1)

  const row = existing[0]
  if (row) {
    await db
      .update(themeSettings)
      .set({
        colors: theme.colors,
        typography: theme.typography,
        motion: theme.motion,
        brand: theme.brand,
        updatedBy: userId,
        updatedAt: new Date(),
      })
      .where(eq(themeSettings.id, row.id))
    return row.id
  }

  const inserted = await db
    .insert(themeSettings)
    .values({
      colors: theme.colors,
      typography: theme.typography,
      motion: theme.motion,
      brand: theme.brand,
      updatedBy: userId,
    })
    .returning({ id: themeSettings.id })

  return inserted[0]?.id ?? ''
}

/* --------------------------------- actions --------------------------------- */

/** Persist the full theme document. Partial writes are not supported by design. */
export async function saveTheme(input: unknown): Promise<ActionResult> {
  const session = await requireAdmin()

  const parsed = themeSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Một vài giá trị chưa hợp lệ. Vui lòng kiểm tra lại.',
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  const theme: ThemeSettings = parsed.data

  try {
    const id = await persist(theme, session.userId)
    revalidateEverything()
    await audit(
      session.userId,
      'theme.save',
      {
        colors: theme.colors,
        displayFont: theme.typography.displayFont,
        bodyFont: theme.typography.bodyFont,
        motionEnabled: theme.motion.enabled,
      },
      id.length > 0 ? id : undefined,
    )
    return { ok: true }
  } catch (error) {
    console.error('[actions/theme] saveTheme failed', error)
    return { ok: false, error: 'Không lưu được giao diện. Vui lòng thử lại.' }
  }
}

/** Restore `DEFAULT_THEME` — the palette declared in ARCHITECTURE §2. */
export async function resetTheme(): Promise<ActionResult> {
  const session = await requireAdmin()

  try {
    const id = await persist(DEFAULT_THEME, session.userId)
    revalidateEverything()
    await audit(session.userId, 'theme.reset', {}, id.length > 0 ? id : undefined)
    return { ok: true }
  } catch (error) {
    console.error('[actions/theme] resetTheme failed', error)
    return { ok: false, error: 'Không khôi phục được mặc định. Vui lòng thử lại.' }
  }
}
