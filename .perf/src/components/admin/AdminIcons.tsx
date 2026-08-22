import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

export type AdminIconProps = SVGProps<SVGSVGElement>

/**
 * Admin-only hairline icons. The public kit (`@/components/ui/icons`) covers the
 * site; these are the extra tool glyphs the CMS needs. Same drawing rules:
 * 1px strokes, square caps, 24px box, `currentColor`.
 */
function Svg({ className, children, ...rest }: AdminIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
      className={cn('h-[1em] w-[1em] shrink-0', className)}
      {...rest}
    >
      {children}
    </svg>
  )
}

export function PlusIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Svg>
  )
}

export function MinusIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  )
}

export function TrashIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </Svg>
  )
}

export function PencilIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h4L20 8l-4-4L4 16v4z" />
    </Svg>
  )
}

export function DuplicateIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M9 3h12v12" />
      <path d="M3 9h12v12H3z" />
    </Svg>
  )
}

export function EyeIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" />
      <circle cx="12" cy="12" r="2.5" />
    </Svg>
  )
}

export function EyeOffIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M2 12s4-6 10-6c1.6 0 3 .4 4.2 1" />
      <path d="M21.5 13.6C20 15.7 16.7 18 12 18c-1.7 0-3.2-.3-4.5-.9" />
      <path d="M4 20L20 4" />
    </Svg>
  )
}

export function DragIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M9 6h.01" />
      <path d="M15 6h.01" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M9 18h.01" />
      <path d="M15 18h.01" />
    </Svg>
  )
}

export function SearchIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </Svg>
  )
}

export function ImageIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M3 4h18v16H3z" />
      <path d="M3 16l5-5 4 4 3-3 6 6" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </Svg>
  )
}

export function CubeIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 2.5l9 5v9l-9 5-9-5v-9z" />
      <path d="M3 7.5l9 5 9-5" />
      <path d="M12 12.5V21" />
    </Svg>
  )
}

export function LayersIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Svg>
  )
}

export function ChevronRightIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M9 5l7 7-7 7" />
    </Svg>
  )
}

export function LogoutIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M10 4H4v16h6" />
      <path d="M14 8l4 4-4 4" />
      <path d="M18 12H9" />
    </Svg>
  )
}

export function GaugeIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 18l4.5-6" />
    </Svg>
  )
}

export function MailIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M3 5h18v14H3z" />
      <path d="M3 6l9 7 9-7" />
    </Svg>
  )
}

export function SlidersIcon(props: AdminIconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M4 17h16" />
      <circle cx="9" cy="7" r="2" />
      <circle cx="16" cy="17" r="2" />
    </Svg>
  )
}
