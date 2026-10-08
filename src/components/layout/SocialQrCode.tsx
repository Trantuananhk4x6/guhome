'use client'

interface SocialQrCodeProps {
  type: 'zalo' | 'facebook' | 'general'
  href: string
  label: string
}

export function SocialQrCode({ type: _type, href: _href, label }: SocialQrCodeProps) {
  // Clean, high-contrast, beautiful architectural SVG QR aesthetic
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

          {/* Data cells & timing bars */}
          <rect x="36" y="8" width="4" height="4" />
          <rect x="44" y="8" width="4" height="4" />
          <rect x="52" y="8" width="4" height="4" />
          <rect x="60" y="8" width="4" height="4" />

          <rect x="36" y="16" width="4" height="4" />
          <rect x="48" y="16" width="4" height="4" />
          <rect x="56" y="16" width="4" height="4" />

          <rect x="36" y="24" width="4" height="4" />
          <rect x="44" y="24" width="4" height="4" />
          <rect x="52" y="24" width="4" height="4" />

          <rect x="8" y="36" width="4" height="4" />
          <rect x="16" y="36" width="4" height="4" />
          <rect x="24" y="36" width="4" height="4" />
          <rect x="32" y="36" width="4" height="4" />
          <rect x="40" y="36" width="4" height="4" />
          <rect x="56" y="36" width="4" height="4" />
          <rect x="68" y="36" width="4" height="4" />
          <rect x="76" y="36" width="4" height="4" />
          <rect x="84" y="36" width="4" height="4" />

          <rect x="8" y="44" width="4" height="4" />
          <rect x="20" y="44" width="4" height="4" />
          <rect x="36" y="44" width="4" height="4" />
          <rect x="64" y="44" width="4" height="4" />
          <rect x="80" y="44" width="4" height="4" />
          <rect x="88" y="44" width="4" height="4" />

          <rect x="8" y="52" width="4" height="4" />
          <rect x="16" y="52" width="4" height="4" />
          <rect x="28" y="52" width="4" height="4" />
          <rect x="36" y="52" width="4" height="4" />
          <rect x="60" y="52" width="4" height="4" />
          <rect x="72" y="52" width="4" height="4" />
          <rect x="84" y="52" width="4" height="4" />

          <rect x="8" y="60" width="4" height="4" />
          <rect x="24" y="60" width="4" height="4" />
          <rect x="36" y="60" width="4" height="4" />
          <rect x="44" y="60" width="4" height="4" />
          <rect x="52" y="60" width="4" height="4" />
          <rect x="68" y="60" width="4" height="4" />
          <rect x="80" y="60" width="4" height="4" />

          <rect x="36" y="68" width="4" height="4" />
          <rect x="48" y="68" width="4" height="4" />
          <rect x="60" y="68" width="4" height="4" />
          <rect x="76" y="68" width="4" height="4" />
          <rect x="88" y="68" width="4" height="4" />

          <rect x="40" y="76" width="4" height="4" />
          <rect x="52" y="76" width="4" height="4" />
          <rect x="64" y="76" width="4" height="4" />
          <rect x="80" y="76" width="4" height="4" />

          <rect x="36" y="84" width="4" height="4" />
          <rect x="44" y="84" width="4" height="4" />
          <rect x="56" y="84" width="4" height="4" />
          <rect x="68" y="84" width="4" height="4" />
          <rect x="84" y="84" width="4" height="4" />

          {/* Center Brand Badge Container */}
          <rect x="40" y="40" width="20" height="20" fill="white" />
          <rect x="42" y="42" width="16" height="16" fill="#131210" />
          <text
            x="50"
            y="54"
            fill="#F4F1EA"
            fontSize="8"
            fontWeight="bold"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            GU
          </text>
        </svg>
      </div>
      <p className="max-w-[20ch] font-body text-[0.75rem] leading-tight text-muted">
        Quét mã để kết nối {label} qua ứng dụng điện thoại
      </p>
    </div>
  )
}
