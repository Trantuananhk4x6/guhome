'use client'

import { useState, type DragEvent, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { DragIcon } from './AdminIcons'

/** Pure array move — exported because reorder actions need the same maths. */
export function moveItem<T>(items: readonly T[], from: number, to: number): T[] {
  const next = items.slice()
  if (from < 0 || from >= next.length) return next
  const [moved] = next.splice(from, 1)
  if (moved === undefined) return next
  const target = Math.min(Math.max(to, 0), next.length)
  next.splice(target, 0, moved)
  return next
}

/** Elements that own their pointer — pressing them must never start a drag. */
const INTERACTIVE = 'input, textarea, select, button, a, [contenteditable="true"]'

/** Props to spread onto an explicit drag handle. */
export interface DragHandleProps {
  onPointerDown: () => void
  onPointerUp: () => void
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void
  'aria-label': string
  tabIndex: number
}

export interface DragListItemContext {
  index: number
  dragging: boolean
  isFirst: boolean
  isLast: boolean
  /** Ready-made handle button using the admin drag glyph. */
  handle: ReactNode
  /** Spread on your own handle element if you'd rather draw it yourself. */
  handleProps: DragHandleProps
  moveUp: () => void
  moveDown: () => void
}

export interface DragListProps<T> {
  items: readonly T[]
  getKey: (item: T, index: number) => string
  renderItem: (item: T, index: number, context: DragListItemContext) => ReactNode
  onReorder: (next: T[], meta: { from: number; to: number }) => void
  disabled?: boolean
  className?: string
  itemClassName?: string
  /** Accessible name for the list. */
  label?: string
  empty?: ReactNode
}

/**
 * Reorderable list on native HTML5 drag events — no dependency, no pointer-math
 * library.
 *
 * A row arms itself for dragging on pointer-down *unless* the press landed on a
 * form control or a button, so rows full of inputs (the block builder, the nav
 * editor) stay editable. An explicit handle is offered through the render
 * context and also moves the row with ArrowUp / ArrowDown for keyboard users.
 */
export function DragList<T>({
  items,
  getKey,
  renderItem,
  onReorder,
  disabled = false,
  className,
  itemClassName,
  label,
  empty,
}: DragListProps<T>) {
  const [armedKey, setArmedKey] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [overAfter, setOverAfter] = useState(false)

  function reset(): void {
    setArmedKey(null)
    setDragIndex(null)
    setOverIndex(null)
    setOverAfter(false)
  }

  function move(from: number, to: number): void {
    if (from === to || from < 0 || to < 0) {
      reset()
      return
    }
    onReorder(moveItem(items, from, to), { from, to })
    reset()
  }

  if (items.length === 0 && empty) {
    return <div className={className}>{empty}</div>
  }

  return (
    <ul aria-label={label} className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => {
        const key = getKey(item, index)
        const dragging = dragIndex === index
        const showBefore = overIndex === index && !overAfter && dragIndex !== null && dragIndex !== index
        const showAfter = overIndex === index && overAfter && dragIndex !== null && dragIndex !== index

        const handleProps: DragHandleProps = {
          onPointerDown: () => {
            if (!disabled) setArmedKey(key)
          },
          onPointerUp: () => setArmedKey(null),
          onKeyDown: (event) => {
            if (disabled) return
            if (event.key === 'ArrowUp' && index > 0) {
              event.preventDefault()
              onReorder(moveItem(items, index, index - 1), { from: index, to: index - 1 })
            } else if (event.key === 'ArrowDown' && index < items.length - 1) {
              event.preventDefault()
              onReorder(moveItem(items, index, index + 1), { from: index, to: index + 1 })
            }
          },
          'aria-label': `Kéo để sắp xếp — vị trí ${index + 1} trên ${items.length}`,
          tabIndex: 0,
        }

        const context: DragListItemContext = {
          index,
          dragging,
          isFirst: index === 0,
          isLast: index === items.length - 1,
          handleProps,
          handle: (
            <button
              type="button"
              {...handleProps}
              disabled={disabled}
              className="cursor-grab border border-transparent p-1 text-muted transition-colors duration-200 hover:border-line hover:text-ink active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
            >
              <DragIcon className="text-base" />
            </button>
          ),
          moveUp: () => {
            if (index > 0) onReorder(moveItem(items, index, index - 1), { from: index, to: index - 1 })
          },
          moveDown: () => {
            if (index < items.length - 1) {
              onReorder(moveItem(items, index, index + 1), { from: index, to: index + 1 })
            }
          },
        }

        return (
          <li
            key={key}
            draggable={!disabled && armedKey === key}
            onPointerDown={(event: PointerEvent<HTMLLIElement>) => {
              if (disabled) return
              const target = event.target
              if (target instanceof Element && target.closest(INTERACTIVE)) return
              event.stopPropagation()
              setArmedKey(key)
            }}
            onPointerUp={() => setArmedKey(null)}
            onDragStart={(event: DragEvent<HTMLLIElement>) => {
              // A DragList inside a DragList — stops inside a homepage block —
              // would otherwise hand every one of these events to the outer list
              // as it bubbles: grabbing a stop would arm the block list too, and
              // a drop that landed a few pixels outside the inner row would
              // reorder the homepage instead of the stops.
              event.stopPropagation()
              event.dataTransfer.effectAllowed = 'move'
              event.dataTransfer.setData('text/plain', key)
              setDragIndex(index)
            }}
            onDragOver={(event: DragEvent<HTMLLIElement>) => {
              if (dragIndex === null) return
              event.stopPropagation()
              event.preventDefault()
              event.dataTransfer.dropEffect = 'move'
              const rect = event.currentTarget.getBoundingClientRect()
              setOverIndex(index)
              setOverAfter(event.clientY - rect.top > rect.height / 2)
            }}
            onDrop={(event: DragEvent<HTMLLIElement>) => {
              event.preventDefault()
              if (dragIndex === null) return
              event.stopPropagation()
              const target = overAfter ? index + 1 : index
              move(dragIndex, dragIndex < target ? target - 1 : target)
            }}
            onDragEnd={reset}
            className={cn(
              'relative list-none transition-opacity duration-200',
              dragging && 'opacity-40',
              itemClassName,
            )}
          >
            {showBefore ? (
              <span aria-hidden="true" className="absolute -top-1.5 left-0 right-0 h-px bg-accent" />
            ) : null}
            {renderItem(item, index, context)}
            {showAfter ? (
              <span aria-hidden="true" className="absolute -bottom-1.5 left-0 right-0 h-px bg-accent" />
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
