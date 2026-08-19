'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'

export interface SceneBoundaryProps {
  children: ReactNode
  /** Rendered instead of `children` after a throw. DOM or R3F, per usage. */
  fallback: ReactNode
  onError?: (error: Error) => void
  /** Changing this remounts the subtree — e.g. a new scene id after a failure. */
  resetKey?: string | number
}

interface SceneBoundaryState {
  failedKey: string | number | null
  failed: boolean
}

/**
 * A 3D scene must never take the page down with it: a missing GLB, a lost
 * WebGL context or a decoder 404 all end here and swap in a still image.
 * Used twice — once outside the Canvas (DOM fallback) and once inside it
 * (three.js fallback for the environment rig).
 */
export class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  constructor(props: SceneBoundaryProps) {
    super(props)
    this.state = { failed: false, failedKey: null }
  }

  static getDerivedStateFromError(): Partial<SceneBoundaryState> {
    return { failed: true }
  }

  static getDerivedStateFromProps(
    props: SceneBoundaryProps,
    state: SceneBoundaryState,
  ): Partial<SceneBoundaryState> | null {
    const key = props.resetKey ?? null
    if (state.failed && state.failedKey !== null && state.failedKey !== key) {
      return { failed: false, failedKey: null }
    }
    return null
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ failedKey: this.props.resetKey ?? null })
    if (process.env.NODE_ENV !== 'production') {
      console.error('[an-atelier/three] scene failed', error, info.componentStack)
    }
    this.props.onError?.(error)
  }

  override render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
