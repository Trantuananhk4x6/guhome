'use client'

import type { SocialQrType } from '@/lib/social'

interface SocialQrCodeProps {
  type: SocialQrType | 'general'
  href: string
  label: string
}

const BADGE_BY_TYPE: Record<SocialQrType | 'general', string> = {
  facebook: 'FB',
  tiktok: 'TT',
  zalo: 'ZL',
  youtube: 'YT',
  instagram: 'IG',
  behance: 'BE',
  pinterest: 'PI',
  general: 'GU',
}

const PATTERN_CELLS: Record<SocialQrType | 'general', readonly [number, number][]> = {
  facebook: [
    [36, 8], [44, 8], [52, 8], [60, 8],
    [36, 16], [48, 16], [56, 16],
    [36, 24], [44, 24], [52, 24],
    [8, 36], [16, 36], [24, 36], [32, 36], [68, 36], [76, 36], [84, 36],
    [8, 44], [20, 44], [32, 44], [68, 44], [80, 44], [88, 44],
    [8, 52], [16, 52], [28, 52], [68, 52], [76, 52], [84, 52],
    [8, 60], [24, 60], [36, 60], [44, 60], [56, 60], [68, 60], [80, 60],
    [36, 68], [48, 68], [60, 68], [76, 68], [88, 68],
    [40, 76], [52, 76], [64, 76], [80, 76],
    [36, 84], [44, 84], [56, 84], [68, 84], [84, 84],
  ],
  tiktok: [
    [36, 8], [48, 8], [56, 8],
    [40, 16], [52, 16], [60, 16],
    [36, 24], [48, 24], [60, 24],
    [12, 36], [20, 36], [32, 36], [64, 36], [72, 36], [88, 36],
    [8, 44], [24, 44], [32, 44], [64, 44], [76, 44], [84, 44],
    [12, 52], [20, 52], [32, 52], [64, 52], [72, 52], [88, 52],
    [16, 60], [28, 60], [40, 60], [52, 60], [64, 60], [76, 60],
    [36, 68], [44, 68], [56, 68], [68, 68], [84, 68],
    [36, 76], [48, 76], [60, 76], [72, 76], [88, 76],
    [40, 84], [52, 84], [64, 84], [76, 84], [84, 84],
  ],
  zalo: [
    [40, 8], [48, 8], [60, 8],
    [36, 16], [44, 16], [56, 16],
    [40, 24], [52, 24], [60, 24],
    [8, 36], [20, 36], [28, 36], [68, 36], [80, 36], [88, 36],
    [12, 44], [24, 44], [32, 44], [64, 44], [72, 44], [84, 44],
    [8, 52], [20, 52], [28, 52], [68, 52], [80, 52], [88, 52],
    [12, 60], [24, 60], [36, 60], [48, 60], [60, 60], [72, 60], [84, 60],
    [40, 68], [52, 68], [64, 68], [76, 68], [84, 68],
    [36, 76], [44, 76], [56, 76], [68, 76], [80, 76],
    [40, 84], [48, 84], [60, 84], [72, 84], [88, 84],
  ],
  youtube: [
    [36, 8], [44, 8], [56, 8],
    [40, 16], [48, 16], [60, 16],
    [36, 24], [44, 24], [56, 24],
    [8, 36], [16, 36], [28, 36], [64, 36], [76, 36], [84, 36],
    [16, 44], [24, 44], [32, 44], [68, 44], [76, 44], [88, 44],
    [8, 52], [20, 52], [32, 52], [64, 52], [72, 52], [84, 52],
    [12, 60], [28, 60], [40, 60], [52, 60], [68, 60], [80, 60],
    [36, 68], [48, 68], [56, 68], [72, 68], [84, 68],
    [40, 76], [52, 76], [64, 76], [76, 76], [88, 76],
    [36, 84], [48, 84], [60, 84], [72, 84], [84, 84],
  ],
  instagram: [
    [40, 8], [52, 8], [60, 8],
    [36, 16], [48, 16], [56, 16],
    [40, 24], [52, 24], [60, 24],
    [12, 36], [24, 36], [32, 36], [68, 36], [76, 36], [88, 36],
    [8, 44], [16, 44], [28, 44], [64, 44], [72, 44], [84, 44],
    [12, 52], [24, 52], [32, 52], [68, 52], [80, 52], [88, 52],
    [8, 60], [20, 60], [36, 60], [48, 60], [60, 60], [76, 60],
    [40, 68], [52, 68], [64, 68], [76, 68], [88, 68],
    [36, 76], [48, 76], [60, 76], [72, 76], [84, 76],
    [40, 84], [52, 84], [64, 84], [76, 84], [88, 84],
  ],
  behance: [
    [36, 8], [48, 8], [60, 8],
    [40, 16], [52, 16], [60, 16],
    [36, 24], [44, 24], [56, 24],
    [8, 36], [20, 36], [32, 36], [64, 36], [76, 36], [88, 36],
    [12, 44], [24, 44], [32, 44], [68, 44], [80, 44],
    [8, 52], [16, 52], [28, 52], [64, 52], [76, 52], [88, 52],
    [16, 60], [28, 60], [40, 60], [52, 60], [68, 60], [84, 60],
    [36, 68], [44, 68], [56, 68], [68, 68], [80, 68],
    [40, 76], [52, 76], [64, 76], [76, 76], [88, 76],
    [36, 84], [48, 84], [60, 84], [72, 84], [84, 84],
  ],
  pinterest: [
    [40, 8], [48, 8], [56, 8],
    [36, 16], [44, 16], [60, 16],
    [40, 24], [52, 24], [60, 24],
    [8, 36], [16, 36], [28, 36], [68, 36], [76, 36], [84, 36],
    [12, 44], [20, 44], [32, 44], [64, 44], [72, 44], [88, 44],
    [8, 52], [24, 52], [32, 52], [68, 52], [80, 52], [84, 52],
    [12, 60], [24, 60], [36, 60], [44, 60], [56, 60], [72, 60], [88, 60],
    [36, 68], [48, 68], [60, 68], [72, 68], [84, 68],
    [40, 76], [52, 76], [64, 76], [76, 76],
    [36, 84], [44, 84], [56, 84], [68, 84], [80, 84], [88, 84],
  ],
  general: [
    [36, 8], [44, 8], [52, 8], [60, 8],
    [36, 16], [48, 16], [56, 16],
    [36, 24], [44, 24], [52, 24],
    [8, 36], [16, 36], [24, 36], [32, 36], [68, 36], [76, 36], [84, 36],
    [8, 44], [20, 44], [32, 44], [64, 44], [80, 44], [88, 44],
    [8, 52], [16, 52], [28, 52], [64, 52], [72, 52], [84, 52],
    [8, 60], [24, 60], [36, 60], [44, 60], [52, 60], [68, 60], [80, 60],
    [36, 68], [48, 68], [60, 68], [76, 68], [88, 68],
    [40, 76], [52, 76], [64, 76], [80, 76],
    [36, 84], [44, 84], [56, 84], [68, 84], [84, 84],
  ],
}

function formatShortUrl(href: string): string {
  try {
    const url = new URL(href)
    const host = url.hostname.replace(/^www\./, '')
    const path = url.pathname === '/' ? '' : url.pathname
    const query = url.search ? url.search : ''
    const combined = `${host}${path}${query}`
    return combined.length > 28 ? `${combined.slice(0, 26)}…` : combined
  } catch {
    return href
  }
}

export function SocialQrCode({ type, href, label }: SocialQrCodeProps) {
  const badge = BADGE_BY_TYPE[type] ?? 'GU'
  const cells = PATTERN_CELLS[type] ?? PATTERN_CELLS.general
  const shortUrl = formatShortUrl(href)

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-none border border-line bg-surface p-4 text-center">
      <div className="relative flex h-36 w-36 items-center justify-center bg-white p-2 shadow-xs sm:h-40 sm:w-40">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full text-espresso"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Outer corner finder patterns */}
          {/* Top-Left */}
          <rect x="5" y="5" width="26" height="26" fill="currentColor" />
          <rect x="9" y="9" width="18" height="18" fill="white" />
          <rect x="13" y="13" width="10" height="10" fill="currentColor" />

          {/* Top-Right */}
          <rect x="69" y="5" width="26" height="26" fill="currentColor" />
          <rect x="73" y="9" width="18" height="18" fill="white" />
          <rect x="77" y="13" width="10" height="10" fill="currentColor" />

          {/* Bottom-Left */}
          <rect x="5" y="69" width="26" height="26" fill="currentColor" />
          <rect x="9" y="73" width="18" height="18" fill="white" />
          <rect x="13" y="77" width="10" height="10" fill="currentColor" />

          {/* Channel-specific data cells */}
          {cells.map(([x, y], index) => (
            <rect key={`${x}-${y}-${index}`} x={x} y={y} width="4" height="4" />
          ))}

          {/* Center Brand / Channel Badge Container */}
          <rect x="38" y="38" width="24" height="24" fill="white" />
          <rect x="40" y="40" width="20" height="20" fill="#131210" />
          <text
            x="50"
            y="53"
            fill="#F4F1EA"
            fontSize="7.5"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
          >
            {badge}
          </text>
        </svg>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="max-w-[22ch] font-body text-[0.75rem] leading-tight text-muted">
          Quét mã để mở kênh <span className="font-medium text-ink">{label}</span>
        </p>
        <span className="font-mono text-[0.6875rem] tracking-tight text-accent">
          {shortUrl}
        </span>
      </div>
    </div>
  )
}
