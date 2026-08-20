/**
 * The phrasing of /projects — which treatment each band of the run takes.
 *
 * WHY THIS IS ITS OWN MODULE. It is a pure function of the project list, so it
 * can be run and checked without React, a browser or a database: given the 104
 * projects the index actually renders, the band sequence it produces is
 * something you can print and measure. That is how the defect below was proved
 * in the first place.
 *
 * THE DEFECT. The score used to be eight beats written out and cycled —
 * `pair bleed list solo pair list bleed list`, sizes 2·1·4·1·2·3·1·5 — which
 * consumes exactly 19 projects. 19 shares no factor with 8, which was the
 * argument for it, but that only staggers the *sizes*: the sequence of
 * treatments is the score itself, and the score is a loop of eight. Across 104
 * projects it repeats five and a half times, verbatim. A reader who notices the
 * loop once notices it five more times.
 *
 * THE FIX. There is no written score any more. Each band is chosen one at a
 * time from the treatments that are still legal after the previous one, with a
 * weight per treatment, and the choice is resolved by a number read off the
 * projects standing at the cursor — cover orientation, year, title length,
 * whether the editor featured it — plus the cursor itself. Those change down
 * the catalogue without repeating, so the treatment sequence does too, and the
 * `list` band takes 3, 4, 5 or 6 rows from the same number, so even two
 * identical stretches of treatments consume different numbers of projects.
 *
 * WHAT STAYS TRUE. Two adjacent bands never share a treatment, and the two
 * quiet treatments — the full-bleed plate and the single centred plate — never
 * stand next to each other, which is the adjacency the original score existed
 * to prevent. The catalogue can double in size without any of that changing.
 */

import type { ProjectSummary } from '@/types/content'

export type BandKind = 'pair' | 'bleed' | 'list' | 'solo'

export interface Band {
  kind: BandKind
  items: ProjectSummary[]
  /** Editorial number of `items[0]`. */
  from: number
}

/**
 * How often each treatment comes up when it is legal.
 *
 * `list` is the dense one and carries most of the run's volume; `pair` is the
 * ordinary medium band. The two quiet treatments are deliberately scarcer —
 * a full-bleed plate spends 610px on one project, and the gesture stops being
 * one if it arrives every third band.
 */
const WEIGHT: Record<BandKind, number> = { pair: 3, bleed: 2, list: 4, solo: 2 }

const KINDS: readonly BandKind[] = ['pair', 'bleed', 'list', 'solo']

/** The two treatments that leave the reader with one project and a lot of air. */
function isQuiet(kind: BandKind): boolean {
  return kind === 'bleed' || kind === 'solo'
}

function isLegal(kind: BandKind, previous: BandKind | null): boolean {
  if (previous === null) return true
  if (kind === previous) return false
  return !(isQuiet(kind) && isQuiet(previous))
}

/**
 * A number that changes down the run because the projects do.
 *
 * Every term is a column on the project row. `cursor` is in there so a run of
 * projects that happen to tally the same still moves; everything else is what
 * makes the movement irregular rather than a counter.
 */
export function beatKey(project: ProjectSummary | undefined, cursor: number): number {
  if (!project) return cursor
  const cover = project.cover
  const orientation = cover?.width && cover.height ? (cover.width > cover.height ? 2 : 5) : 0
  return (
    cursor +
    orientation +
    (project.year ?? 0) +
    project.title.length +
    (project.location?.length ?? 0) +
    (project.featured ? 7 : 0)
  )
}

/** The weighted draw, resolved by `key` rather than by a random number. */
function pickKind(previous: BandKind | null, key: number): BandKind {
  const pool: BandKind[] = []
  for (const kind of KINDS) {
    if (!isLegal(kind, previous)) continue
    for (let i = 0; i < WEIGHT[kind]; i += 1) pool.push(kind)
  }
  return pool[Math.abs(key) % pool.length] ?? 'list'
}

/** How many projects a band consumes. Only `list` varies, and it varies by data. */
function beatSize(kind: BandKind, key: number): number {
  if (kind === 'pair') return 2
  if (kind === 'list') return 3 + (Math.abs(key) % 4)
  return 1
}

/**
 * Slices the run into bands.
 *
 * A short list — a filtered category with three projects — simply stops
 * mid-phrase; every band renders only what it was handed, so a phrase is never
 * padded out with an empty column. The one case that would leave a hole is a
 * `pair` that receives a single project, which draws a seven-column landscape
 * with five empty columns beside it. That band becomes a `bleed` — the run's
 * loudest single gesture — unless the band before it was already quiet, in
 * which case it becomes a one-row `list`, because a quiet band after a quiet
 * band is the one adjacency this whole function exists to prevent and closing
 * the index by breaking it would be worse than closing it on a footnote.
 */
export function phraseIndex(projects: readonly ProjectSummary[], startIndex: number): Band[] {
  const bands: Band[] = []
  let cursor = 0
  let previous: BandKind | null = null

  while (cursor < projects.length) {
    const key = beatKey(projects[cursor], cursor)
    const chosen = pickKind(previous, key)
    const items = projects.slice(cursor, cursor + beatSize(chosen, key))

    let kind = chosen
    if (kind === 'pair' && items.length < 2) {
      kind = previous !== null && isQuiet(previous) ? 'list' : 'bleed'
    }

    bands.push({ kind, items, from: startIndex + cursor })
    cursor += items.length
    previous = kind
  }

  return bands
}
