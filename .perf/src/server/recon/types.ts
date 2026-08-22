/**
 * Reconstruction contracts — docs/ARCHITECTURE.md §6.8.
 *
 * Server-only. Nothing in `src/server/recon/**` may be imported from a client
 * component, and nothing here may run during page rendering: a job is started
 * either by `scripts/jobs-worker.ts` or by an explicit admin action
 * (`POST /api/recon/jobs/[id]/run`).
 *
 * The npm package `img2threejs` named in the brief does not exist on the
 * registry, so the pipeline is implemented here behind this interface. A hosted
 * model (Replicate, Fal, a private GPU box) can be dropped in later by adding a
 * `Reconstructor` — no caller changes.
 */
import type { ReconResult, SceneMode } from '@/types/content'

/** The scene modes a reconstruction job can target. */
export type ReconMode = Exclude<SceneMode, 'NONE' | 'IMAGE'>

/** Modes a *job* may be created with (NATIVE_GLB assets are uploaded, not derived). */
export const RUNNABLE_RECON_MODES = ['DEPTH_2_5D', 'PROCEDURAL_3D'] as const
export type RunnableReconMode = (typeof RUNNABLE_RECON_MODES)[number]

export function isRunnableReconMode(value: string): value is RunnableReconMode {
  return (RUNNABLE_RECON_MODES as readonly string[]).includes(value)
}

export function isReconMode(value: string): value is ReconMode {
  return value === 'NATIVE_GLB' || isRunnableReconMode(value)
}

export interface ReconInput {
  /** Absolute path to a readable copy of the source photograph. */
  sourcePath: string
  jobId: string
  /** 0..1. Called often; the runner throttles persistence. */
  onProgress(p: number): void
}

export interface Reconstructor {
  mode: ReconMode
  run(input: ReconInput): Promise<ReconResult>
}

/**
 * An error with an operator-facing message. Anything thrown from a
 * reconstructor is stored on `recon_jobs.error`, so messages are written for
 * the person staring at the admin screen, in Vietnamese where it helps.
 */
export class ReconError extends Error {
  readonly code: string

  constructor(message: string, code = 'RECON_FAILED', options?: { cause?: unknown }) {
    super(message, options)
    this.name = 'ReconError'
    this.code = code
  }
}

/** Longest side of the working copy used for analysis (cheap, stable). */
export const ANALYSIS_MAX_SIDE = 384
/**
 * Longest side of the depth map we publish. 768 keeps the PNG around 180 KB
 * while still oversampling the displaced plane (≤ 320 segments per axis).
 */
export const DEPTH_MAX_SIDE = 768
/** Longest side of any texture baked into a GLB. */
export const TEXTURE_MAX_SIDE = 1024

/** Storage key prefix for every artefact a job produces. */
export function reconKey(jobId: string, file: string): string {
  return `recon/${jobId}/${file}`
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Lỗi không xác định'
}
