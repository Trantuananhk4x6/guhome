/**
 * The reconstruction contract from docs/ARCHITECTURE.md §6.8, in one import.
 *
 * ⚠ Importing this pulls in the reconstructors, and therefore sharp. Code that
 * only reads or writes job *rows* — a list endpoint, a status poll, a server
 * action — should import `@/server/recon/jobs` and `@/server/recon/types`
 * directly and stay light.
 */
export {
  ANALYSIS_MAX_SIDE,
  DEPTH_MAX_SIDE,
  RUNNABLE_RECON_MODES,
  ReconError,
  TEXTURE_MAX_SIDE,
  errorMessage,
  isReconMode,
  isRunnableReconMode,
  reconKey,
  type ReconInput,
  type ReconMode,
  type Reconstructor,
  type RunnableReconMode,
} from './types'

export { reconstructorFor, runJob, runJobDetailed, type RunJobOptions, type RunOutcome } from './run'
