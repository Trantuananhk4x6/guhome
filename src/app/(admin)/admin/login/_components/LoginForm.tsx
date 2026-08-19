'use client'

import { useActionState } from 'react'

import { adminButtonClass } from '@/components/admin/AdminShell'
import { AdminInput, FormRow } from '@/components/admin/FormRow'
import { signInAction, type SignInState } from '@/server/actions/auth'

const INITIAL: SignInState = {}

export interface LoginFormProps {
  /** Where to land after a successful sign-in. Validated again server-side. */
  next: string
}

export function LoginForm({ next }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signInAction, INITIAL)

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="next" value={next} />

      <FormRow label="Email">
        <AdminInput
          name="email"
          type="email"
          autoComplete="username"
          required
          autoFocus
          defaultValue={state.email ?? ''}
          invalid={Boolean(state.error)}
          placeholder="ban@anatelier.vn"
        />
      </FormRow>

      <FormRow label="Mật khẩu">
        <AdminInput
          name="password"
          type="password"
          autoComplete="current-password"
          required
          invalid={Boolean(state.error)}
          placeholder="••••••••"
        />
      </FormRow>

      {state.error ? (
        <p role="alert" className="border border-accent px-3 py-2 font-body text-[0.75rem] leading-5 text-accent">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className={adminButtonClass('solid', 'w-full py-3')}>
        {pending ? 'Đang kiểm tra…' : 'Đăng nhập'}
      </button>
    </form>
  )
}
