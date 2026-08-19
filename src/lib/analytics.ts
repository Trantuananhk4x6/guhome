'use client'

/**
 * Client analytics — deliberately tiny and anonymous.
 *
 * What leaves the browser: an event type, an optional entity reference, a small
 * meta bag, and a random per-tab session id. Never a name, an email, a referrer
 * or anything derived from the visitor. The server hashes the request IP and
 * stores nothing else about it (see `src/app/api/analytics/route.ts`).
 *
 * Every call is fire-and-forget: `sendBeacon` first so the request survives a
 * page unload, `fetch(..., { keepalive: true })` as the fallback. Failures are
 * swallowed — analytics must never surface as a broken interaction.
 */

import { useEffect, useRef } from 'react'

import type { AnalyticsEventType } from '@/types/content'

export const ANALYTICS_ENDPOINT = '/api/analytics'
export const SESSION_STORAGE_KEY = 'an_analytics_sid'

/** Same type + entity inside this window is treated as one event. */
const DEDUPE_MS = 2_000

export interface AnalyticsPayload {
  /** e.g. `'project'`, `'article'`, `'scene'`. */
  entityType?: string
  /** UUID of the row the event is about, when there is one. */
  entityId?: string
  meta?: Record<string, unknown>
}

interface AnalyticsBody extends AnalyticsPayload {
  type: AnalyticsEventType
  sessionId: string
}

const lastSent = new Map<string, number>()

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/** Honour an explicit Do-Not-Track signal. */
function trackingRefused(): boolean {
  const nav: Navigator & { msDoNotTrack?: string } = navigator
  const win: Window & { doNotTrack?: string } = window
  return nav.doNotTrack === '1' || nav.msDoNotTrack === '1' || win.doNotTrack === '1'
}

function randomId(): string {
  const c: Crypto | undefined = typeof crypto !== 'undefined' ? crypto : undefined
  if (c && typeof c.randomUUID === 'function') return c.randomUUID()
  if (c && typeof c.getRandomValues === 'function') {
    const bytes = c.getRandomValues(new Uint8Array(16))
    return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

/**
 * Random id for this tab, kept in `sessionStorage` so it dies with the tab.
 * Returns `null` when storage is unavailable (private mode, blocked cookies) —
 * the event is still sent, just without a session key.
 */
export function getSessionId(): string | null {
  if (!isBrowser()) return null
  try {
    const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (existing && existing.length > 0) return existing
    const created = randomId()
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, created)
    return created
  } catch {
    return null
  }
}

/** Drops repeats of the same type+entity inside `DEDUPE_MS`. */
function shouldSend(key: string, now: number): boolean {
  const previous = lastSent.get(key)
  if (previous !== undefined && now - previous < DEDUPE_MS) return false

  lastSent.set(key, now)
  if (lastSent.size > 64) {
    for (const [k, t] of lastSent) {
      if (now - t > DEDUPE_MS * 10) lastSent.delete(k)
    }
  }
  return true
}

function post(body: AnalyticsBody): void {
  const json = JSON.stringify(body)

  try {
    if (typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([json], { type: 'application/json' })
      if (navigator.sendBeacon(ANALYTICS_ENDPOINT, blob)) return
    }
  } catch {
    /* fall through to fetch */
  }

  try {
    void fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: json,
      keepalive: true,
      cache: 'no-store',
    }).catch(() => undefined)
  } catch {
    /* analytics is never worth an exception */
  }
}

/**
 * Record one event. No-op on the server, under Do-Not-Track, and for a repeat of
 * the same type+entity within two seconds.
 */
export function trackEvent(type: AnalyticsEventType, payload: AnalyticsPayload = {}): void {
  if (!isBrowser()) return
  if (trackingRefused()) return

  const now = Date.now()
  if (!shouldSend(`${type}:${payload.entityId ?? ''}`, now)) return

  const sessionId = getSessionId() ?? randomId()

  post({
    type,
    sessionId,
    entityType: payload.entityType,
    entityId: payload.entityId,
    meta: payload.meta,
  })
}

/**
 * Fires one event per mount — the standard "this page was viewed" hook.
 * Re-fires only when the type or the entity changes, and survives React Strict
 * Mode's double effect invocation without sending twice.
 */
export function useTrackView(
  type: AnalyticsEventType,
  entityId?: string | null,
  payload?: Omit<AnalyticsPayload, 'entityId'>,
): void {
  const sentFor = useRef<string | null>(null)
  const extra = useRef<Omit<AnalyticsPayload, 'entityId'> | undefined>(payload)

  // Kept in an effect rather than assigned during render, so the ref is never
  // mutated in the render phase.
  useEffect(() => {
    extra.current = payload
  })

  useEffect(() => {
    const key = `${type}:${entityId ?? ''}`
    if (sentFor.current === key) return
    sentFor.current = key

    trackEvent(type, {
      ...extra.current,
      ...(entityId ? { entityId } : {}),
    })
  }, [type, entityId])
}
