'use client'

/**
 * The two editable panels on `/admin/settings`: site-wide SEO defaults and the
 * signed-in admin's own password.
 */

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import { SaveBar } from '@/components/admin/SaveBar'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { changeOwnPassword, saveSeoDefaults } from '@/app/(admin)/admin/settings/actions'
import type { MediaRef } from '@/types/content'

import type { SeoDefaults } from './contracts'
import { ActionMessage } from './Fields'
import { MediaField } from './MediaField'
import { useActionRunner, useEditorDraft } from './useEditorState'

/* ----------------------------------- seo ----------------------------------- */

export interface SeoDefaultsFormProps {
  initial: SeoDefaults
  ogImage: MediaRef | null
}

export function SeoDefaultsForm({ initial, ogImage: initialOgImage }: SeoDefaultsFormProps) {
  const router = useRouter()
  const draft = useEditorDraft<SeoDefaults>(initial)
  const runner = useActionRunner()
  const [ogImage, setOgImage] = useState<MediaRef | null>(initialOgImage)

  const value = draft.value
  const errors = runner.fieldErrors

  const preview = value.titleTemplate.includes('%s')
    ? value.titleTemplate.replace('%s', 'Tĩnh Viện')
    : value.titleTemplate

  return (
    <div className="flex flex-col gap-7">
      <Field
        label="Mẫu tiêu đề"
        hint="Dùng %s làm chỗ đặt tiêu đề của từng trang."
        required
        error={errors['titleTemplate'] ?? null}
      >
        <Input
          value={value.titleTemplate}
          onChange={(event) => draft.set({ ...value, titleTemplate: event.target.value })}
          spellCheck={false}
        />
      </Field>

      <p className="border-l border-line pl-4 font-body text-[0.8125rem] leading-relaxed text-muted">
        Ví dụ: <span className="text-ink">{preview}</span>
      </p>

      <Field
        label="Tiêu đề mặc định"
        hint="Dùng cho trang chủ và bất cứ trang nào không đặt tiêu đề riêng."
        required
        error={errors['defaultTitle'] ?? null}
      >
        <Input
          value={value.defaultTitle}
          onChange={(event) => draft.set({ ...value, defaultTitle: event.target.value })}
        />
      </Field>

      <Field
        label="Mô tả mặc định"
        hint="150–160 ký tự là vừa cho kết quả tìm kiếm."
        required
        error={errors['description'] ?? null}
      >
        <Textarea
          rows={3}
          value={value.description}
          onChange={(event) => draft.set({ ...value, description: event.target.value })}
        />
      </Field>

      <p className="font-body text-[0.75rem] tabular-nums text-muted">{value.description.length} ký tự</p>

      <MediaField
        label="Ảnh chia sẻ mặc định (OG)"
        hint="Tỷ lệ 1200×630. Dùng khi một trang không có ảnh riêng."
        value={ogImage}
        error={errors['ogImageId'] ?? null}
        onChange={(next) => {
          setOgImage(next)
          draft.set({ ...value, ogImageId: next?.id ?? null })
        }}
      />

      <SaveBar
        dirty={draft.dirty}
        saving={runner.pending}
        error={runner.error}
        message={runner.message}
        onSave={() =>
          runner.run(() => saveSeoDefaults(value), {
            success: 'Đã lưu thiết lập SEO.',
            onSuccess: () => {
              draft.commit(value)
              router.refresh()
            },
          })
        }
        onReset={draft.reset}
        saveLabel="Lưu SEO"
      />
    </div>
  )
}

/* --------------------------------- password -------------------------------- */

const EMPTY_PASSWORDS = { currentPassword: '', newPassword: '', confirmPassword: '' }

export function PasswordForm({ email }: { email: string }) {
  const runner = useActionRunner()
  const [values, setValues] = useState(EMPTY_PASSWORDS)

  const errors = runner.fieldErrors

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    runner.run(() => changeOwnPassword(values), {
      success: 'Đã đổi mật khẩu. Mọi phiên đăng nhập khác đã bị thu hồi.',
      onSuccess: () => setValues(EMPTY_PASSWORDS),
    })
  }

  return (
    <form onSubmit={submit} className="flex max-w-xl flex-col gap-7">
      <p className="font-body text-[0.8125rem] leading-relaxed text-muted">
        Tài khoản đang đăng nhập: <span className="text-ink">{email}</span>
      </p>

      <Field label="Mật khẩu hiện tại" required error={errors['currentPassword'] ?? null}>
        <Input
          type="password"
          autoComplete="current-password"
          value={values.currentPassword}
          onChange={(event) => setValues({ ...values, currentPassword: event.target.value })}
        />
      </Field>

      <Field
        label="Mật khẩu mới"
        hint="Ít nhất 10 ký tự, có chữ và số."
        required
        error={errors['newPassword'] ?? null}
      >
        <Input
          type="password"
          autoComplete="new-password"
          value={values.newPassword}
          onChange={(event) => setValues({ ...values, newPassword: event.target.value })}
        />
      </Field>

      <Field label="Nhập lại mật khẩu mới" required error={errors['confirmPassword'] ?? null}>
        <Input
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(event) => setValues({ ...values, confirmPassword: event.target.value })}
        />
      </Field>

      <ActionMessage error={runner.error} message={runner.message} />

      <div>
        <Button type="submit" size="sm" loading={runner.pending}>
          Đổi mật khẩu
        </Button>
      </div>
    </form>
  )
}
