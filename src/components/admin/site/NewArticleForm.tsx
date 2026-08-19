'use client'

/**
 * `/admin/articles/new` — the smallest possible first step.
 *
 * A journal piece needs a stable id before media can be attached, so this form
 * creates an empty draft and hands the editor over; everything else is done in
 * `/admin/articles/[id]`.
 */

import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { slugify } from '@/lib/utils'
import { createArticle } from '@/server/actions/articles'

import { ActionMessage } from './Fields'
import { useActionRunner } from './useEditorState'

export function NewArticleForm() {
  const router = useRouter()
  const runner = useActionRunner()

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugTouched, setSlugTouched] = useState(false)

  const errors = runner.fieldErrors
  const effectiveSlug = slugTouched ? slug : slugify(title)

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    runner.run(() => createArticle({ title, slug: effectiveSlug }), {
      success: 'Đã tạo bản nháp.',
      onSuccess: (result) => {
        const id = 'id' in result && typeof result.id === 'string' ? result.id : null
        if (id) router.push(`/admin/articles/${id}`)
        else router.push('/admin/articles')
      },
    })
  }

  return (
    <form onSubmit={submit} className="flex max-w-2xl flex-col gap-8">
      <Field label="Tiêu đề" required error={errors['title'] ?? null}>
        <Input
          value={title}
          autoFocus
          placeholder="Ánh sáng phía Đông và thói quen buổi sáng"
          onChange={(event) => setTitle(event.target.value)}
        />
      </Field>

      <Field
        label="Slug"
        hint={`Đường dẫn công khai: /journal/${effectiveSlug || '…'}`}
        error={errors['slug'] ?? null}
      >
        <Input
          value={effectiveSlug}
          spellCheck={false}
          onChange={(event) => {
            setSlugTouched(true)
            setSlug(event.target.value)
          }}
          onBlur={(event) => setSlug(slugify(event.target.value))}
        />
      </Field>

      <ActionMessage error={runner.error} message={runner.message} />

      <div className="flex items-center gap-5">
        <Button type="submit" size="sm" loading={runner.pending} disabled={title.trim().length === 0}>
          Tạo bản nháp
        </Button>
        <Button href="/admin/articles" variant="underline" size="sm">
          Huỷ
        </Button>
      </div>
    </form>
  )
}
