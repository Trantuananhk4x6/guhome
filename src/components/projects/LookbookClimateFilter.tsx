'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { projectsHref } from './StyleFilter'

export interface LookbookClimateFilterProps {
  activeTypology: string | null
  activeClimate: string | null
  activeCategory: string | null
  activeStyle: string | null
  className?: string
}

const TYPOLOGY_OPTIONS = [
  { id: 'penthouse', label: 'Penthouse & Duplex' },
  { id: 'biet-thu', label: 'Biệt Thự Phố Vườn' },
  { id: 'can-ho', label: 'Căn Hộ Cao Cấp' },
] as const

const CLIMATE_OPTIONS = [
  { id: 'huong-tay', label: 'Hướng Tây (Cản nắng)', desc: 'Lam gỗ xoay & tường vôi làm mát' },
  { id: 'huong-nam', label: 'Hướng Nam (Hút gió)', desc: 'Đối lưu gió sông Sài Gòn' },
  { id: 'thong-gio', label: 'Thông Gió Đối Lưu', desc: 'Trục thoáng & logia nhiệt đới' },
] as const

export function LookbookClimateFilter({
  activeTypology,
  activeClimate,
  activeCategory,
  activeStyle,
  className,
}: LookbookClimateFilterProps) {
  return (
    <div className={cn('flex flex-col gap-5 pt-6 border-t border-line/60', className)}>
      {/* Typology Lookbook Filter */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="u-label text-muted/80">Bộ sưu tập Lookbook 2026</span>
          {activeTypology ? (
            <Link
              href={projectsHref({ category: activeCategory, style: activeStyle, typology: null, climate: activeClimate })}
              className="text-xs text-accent hover:underline"
            >
              Đặt lại
            </Link>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPOLOGY_OPTIONS.map((opt) => {
            const isActive = activeTypology === opt.id
            const targetTypology = isActive ? null : opt.id
            return (
              <Link
                key={opt.id}
                href={projectsHref({
                  category: activeCategory,
                  style: activeStyle,
                  typology: targetTypology,
                  climate: activeClimate,
                })}
                className={cn(
                  'u-label px-3 py-1.5 rounded-full border transition-all duration-300 text-xs',
                  isActive
                    ? 'border-accent bg-accent/10 text-accent font-medium'
                    : 'border-line/70 text-muted/80 hover:border-ink/40 hover:text-ink',
                )}
              >
                {opt.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Microclimate Filter */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="u-label text-muted/80">Thách thức vi khí hậu Sài Gòn</span>
          {activeClimate ? (
            <Link
              href={projectsHref({ category: activeCategory, style: activeStyle, typology: activeTypology, climate: null })}
              className="text-xs text-accent hover:underline"
            >
              Đặt lại
            </Link>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {CLIMATE_OPTIONS.map((opt) => {
            const isActive = activeClimate === opt.id
            const targetClimate = isActive ? null : opt.id
            return (
              <Link
                key={opt.id}
                href={projectsHref({
                  category: activeCategory,
                  style: activeStyle,
                  typology: activeTypology,
                  climate: targetClimate,
                })}
                title={opt.desc}
                className={cn(
                  'u-label px-3 py-1.5 rounded-full border transition-all duration-300 text-xs flex items-center gap-1.5',
                  isActive
                    ? 'border-accent bg-accent/10 text-accent font-medium'
                    : 'border-line/70 text-muted/80 hover:border-ink/40 hover:text-ink',
                )}
              >
                <span className={cn('w-1.5 h-1.5 rounded-full', isActive ? 'bg-accent' : 'bg-muted/40')} />
                {opt.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
