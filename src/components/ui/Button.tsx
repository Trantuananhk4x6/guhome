import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from 'react'

import { cn } from '@/lib/utils'

import { ArrowRightIcon } from './icons'
import { Spinner } from './Spinner'

export type ButtonVariant = 'solid' | 'ghost' | 'underline'
export type ButtonSize = 'sm' | 'md' | 'lg'
/** `light` = sitting on espresso / imagery, `accent` = bronze-clay. */
export type ButtonTone = 'ink' | 'light' | 'accent'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  tone?: ButtonTone
  /** Trailing arrow that slides on hover. */
  withArrow?: boolean
  loading?: boolean
  block?: boolean
  className?: string
  children: ReactNode
}

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps | 'ref'> & {
    href: string
    /** Renders a plain `<a target="_blank">` instead of `next/link`. */
    external?: boolean
    ref?: Ref<HTMLAnchorElement>
  }

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps | 'ref'> & {
    href?: undefined
    external?: undefined
    ref?: Ref<HTMLButtonElement>
  }

export type ButtonProps = ButtonAsLink | ButtonAsButton

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 gap-2 px-4 text-[0.625rem]',
  md: 'h-11 gap-3 px-6 text-[0.6875rem]',
  lg: 'h-14 gap-3 px-8 text-[0.75rem]',
}

const SOLID: Record<ButtonTone, string> = {
  ink: 'bg-ink text-canvas hover:bg-espresso',
  light: 'bg-canvas text-espresso hover:bg-surface',
  accent: 'bg-accent text-canvas hover:bg-accent-soft',
}

const GHOST: Record<ButtonTone, string> = {
  ink: 'border border-line text-ink hover:border-ink hover:bg-ink hover:text-canvas',
  light: 'border border-canvas/25 text-canvas hover:border-canvas hover:bg-canvas hover:text-espresso',
  accent: 'border border-accent text-accent hover:bg-accent hover:text-canvas',
}

const UNDERLINE: Record<ButtonTone, string> = {
  ink: 'text-ink',
  light: 'text-canvas',
  accent: 'text-accent',
}

function buttonClasses({
  variant,
  size,
  tone,
  block,
  className,
}: Required<Pick<ButtonBaseProps, 'variant' | 'size' | 'tone' | 'block'>> & { className?: string }): string {
  const base =
    'group/btn relative inline-flex select-none items-center justify-center rounded-none font-body font-medium uppercase tracking-label leading-none transition-colors duration-500 ease-editorial disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40'

  if (variant === 'underline') {
    return cn(
      base,
      'h-auto gap-2 border-b border-current/25 px-0 pb-2 text-[0.6875rem]',
      UNDERLINE[tone],
      block && 'flex w-full justify-between',
      className,
    )
  }

  return cn(
    base,
    SIZES[size],
    variant === 'solid' ? SOLID[tone] : GHOST[tone],
    block && 'flex w-full',
    className,
  )
}

function ButtonInner({
  children,
  variant,
  withArrow,
  loading,
}: {
  children: ReactNode
  variant: ButtonVariant
  withArrow: boolean
  loading: boolean
}) {
  return (
    <>
      {variant === 'underline' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-editorial group-hover/btn:origin-left group-hover/btn:scale-x-100"
        />
      ) : null}
      <span className="relative">{children}</span>
      {loading ? (
        <Spinner size="xs" className="relative" />
      ) : withArrow ? (
        <ArrowRightIcon className="relative text-[1.15em] transition-transform duration-500 ease-editorial group-hover/btn:translate-x-1" />
      ) : null}
    </>
  )
}

/**
 * The one call-to-action primitive. Square corners, label typography,
 * renders as `next/link`, `<a>` or `<button>` depending on props.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      external,
      variant = 'solid',
      size = 'md',
      tone = 'ink',
      withArrow = false,
      loading = false,
      block = false,
      className,
      children,
      ...rest
    } = props
    const classes = buttonClasses({ variant, size, tone, block, className })
    const inner = (
      <ButtonInner variant={variant} withArrow={withArrow} loading={loading}>
        {children}
      </ButtonInner>
    )

    if (external || /^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          aria-busy={loading || undefined}
          {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          {...rest}
        >
          {inner}
        </a>
      )
    }

    return (
      <Link href={href} className={classes} aria-busy={loading || undefined} {...rest}>
        {inner}
      </Link>
    )
  }

  const {
    variant = 'solid',
    size = 'md',
    tone = 'ink',
    withArrow = false,
    loading = false,
    block = false,
    className,
    children,
    type = 'button',
    disabled,
    external: _external,
    href: _href,
    ...rest
  } = props

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, tone, block, className })}
      {...rest}
    >
      <ButtonInner variant={variant} withArrow={withArrow} loading={loading}>
        {children}
      </ButtonInner>
    </button>
  )
}
