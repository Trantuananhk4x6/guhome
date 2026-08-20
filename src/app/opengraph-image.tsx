import { ImageResponse } from 'next/og'

import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

/**
 * Default OpenGraph / Twitter card: espresso ground, oversized wordmark, a
 * hairline bronze rule, the tagline.
 *
 * Edge-safe by construction — no filesystem access and no font fetched at
 * runtime. Satori renders with the font bundled into `next/og`, whose glyph
 * coverage includes the full Vietnamese diacritic set, so the tagline is safe
 * to typeset here; the declared serif stack is a hint only.
 */

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const COLORS = {
  espresso: '#131210',
  canvas: '#F4F1EA',
  muted: '#8A8377',
  accent: '#A07753',
  accentSoft: '#C7A57C',
} as const

const SERIF = "'Cormorant Garamond', 'Times New Roman', Georgia, ui-serif, serif"

export default function OpengraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLORS.espresso,
          color: COLORS.canvas,
          padding: '68px 80px',
          fontFamily: SERIF,
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 20,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: COLORS.muted,
          }}
        >
          <span style={{ display: 'flex' }}>Interior Architecture</span>
          <span style={{ display: 'flex' }}>Ho Chi Minh City</span>
        </div>

        {/* wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 150,
              lineHeight: 1,
              letterSpacing: '0.14em',
              color: COLORS.canvas,
            }}
          >
            {SITE_NAME}
          </div>

          {/* hairline accent rule */}
          <div
            style={{
              display: 'flex',
              width: 220,
              height: 1,
              marginTop: 54,
              marginBottom: 38,
              backgroundColor: COLORS.accent,
            }}
          />

          <div
            style={{
              display: 'flex',
              fontSize: 42,
              letterSpacing: '0.01em',
              color: COLORS.accentSoft,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        {/* footer rule + index */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: 28,
            borderTop: `1px solid rgba(244, 241, 234, 0.14)`,
            fontSize: 20,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: COLORS.muted,
          }}
        >
          <span style={{ display: 'flex' }}>Studio</span>
          <span style={{ display: 'flex' }}>guhomes.vn</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
