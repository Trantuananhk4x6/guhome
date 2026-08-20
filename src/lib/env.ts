import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(16),
  ADMIN_EMAIL: z.string().email().default('admin@guhomes.vn'),
  ADMIN_PASSWORD: z.string().min(8).default('AnAtelier@2026'),
  STORAGE_DRIVER: z.enum(['local', 's3']).default('local'),
  STORAGE_LOCAL_ROOT: z.string().default('./public/media'),
  MEDIA_SOURCE_ROOT: z.string().default('D:/guhome'),
  DEPTH_PROVIDER: z.enum(['heuristic', 'replicate']).default('heuristic'),
  REPLICATE_API_TOKEN: z.string().optional().default(''),
  S3_ENDPOINT: z.string().optional().default(''),
  S3_REGION: z.string().optional().default('auto'),
  S3_BUCKET: z.string().optional().default(''),
  S3_ACCESS_KEY_ID: z.string().optional().default(''),
  S3_SECRET_ACCESS_KEY: z.string().optional().default(''),
  S3_PUBLIC_URL: z.string().optional().default(''),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

let cached: ServerEnv | null = null

/** Server-only. Throws at first use if required variables are missing. */
export function serverEnv(): ServerEnv {
  if (cached) return cached
  const parsed = serverEnvSchema.safeParse(process.env)
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    throw new Error(`Invalid server environment — ${issues}`)
  }
  cached = parsed.data
  return cached
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
