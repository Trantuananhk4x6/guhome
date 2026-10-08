'use client'

import { useState, type ReactNode } from 'react'
import { ProjectSpatialMap } from './ProjectSpatialMap'
import { cn } from '@/lib/utils'

export function ProjectsViewSwitcher({
  children,
}: {
  children: ReactNode
}) {
  const [viewMode, setViewMode] = useState<'gallery' | 'map'>('gallery')

  return (
    <div className="w-full">
      {/* View Toggle Bar */}
      <div className="u-gutter mx-auto w-full max-w-[110rem] flex items-center justify-between pb-6 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted uppercase tracking-wider hidden sm:inline">
            Chế độ hiển thị:
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-full border border-line bg-surface/90 backdrop-blur-md shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('gallery')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-mono transition-all',
              viewMode === 'gallery'
                ? 'bg-ink text-canvas font-medium shadow-xs'
                : 'text-muted hover:text-ink',
            )}
          >
            Lưới Hình Ảnh (Gallery)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={cn(
              'px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5',
              viewMode === 'map'
                ? 'bg-accent text-white font-medium shadow-xs'
                : 'text-muted hover:text-ink',
            )}
          >
            <span>Bản Đồ Không Gian Sài Gòn</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="mb-14">
          <ProjectSpatialMap />
        </div>
      ) : null}

      <div>
        {children}
      </div>
    </div>
  )
}
