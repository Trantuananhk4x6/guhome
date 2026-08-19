import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type DataTableAlign = 'left' | 'center' | 'right'

export interface DataTableColumn<T> {
  /** Stable key — also the React key for every cell in the column. */
  key: string
  header: ReactNode
  cell: (row: T, index: number) => ReactNode
  /** Applied to the header cell *and* every body cell — width, wrapping, etc. */
  className?: string
  headerClassName?: string
  cellClassName?: string
  align?: DataTableAlign
  /** Any CSS width, e.g. `'6rem'`. */
  width?: string
}

export interface DataTableProps<T> {
  columns: readonly DataTableColumn<T>[]
  rows: readonly T[]
  getKey: (row: T, index: number) => string
  /** Rendered inside the frame when there are no rows. */
  empty?: ReactNode
  caption?: string
  dense?: boolean
  className?: string
  /** Minimum table width before horizontal scrolling kicks in. */
  minWidth?: string
}

const ALIGN: Record<DataTableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

/**
 * The CMS table. Server-safe and generic: cells return nodes, so anything
 * interactive comes in as a client component rendered by the caller.
 */
export function DataTable<T>({
  columns,
  rows,
  getKey,
  empty,
  caption,
  dense = false,
  className,
  minWidth = '48rem',
}: DataTableProps<T>) {
  if (rows.length === 0 && empty) {
    return <div className={cn('border border-line bg-surface', className)}>{empty}</div>
  }

  const cellPadding = dense ? 'px-3 py-2' : 'px-3 py-3'

  return (
    <div className={cn('w-full overflow-x-auto border border-line bg-surface', className)}>
      <table className="w-full border-collapse text-left" style={{ minWidth }}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="border-b border-line">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                style={column.width ? { width: column.width } : undefined}
                className={cn(
                  'u-label whitespace-nowrap px-3 py-3 align-middle text-[0.5625rem] text-muted',
                  ALIGN[column.align ?? 'left'],
                  column.className,
                  column.headerClassName,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={getKey(row, index)}
              className="border-b border-line/70 align-middle transition-colors duration-200 last:border-b-0 hover:bg-canvas"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'font-body text-[0.8125rem] leading-5 text-ink',
                    cellPadding,
                    ALIGN[column.align ?? 'left'],
                    column.className,
                    column.cellClassName,
                  )}
                >
                  {column.cell(row, index)}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-10 text-center font-body text-[0.8125rem] text-muted"
              >
                Không có dữ liệu.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  )
}
