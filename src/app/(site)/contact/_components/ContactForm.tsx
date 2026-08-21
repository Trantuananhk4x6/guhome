'use client'

import { useActionState, useEffect, useRef, useState, type ReactNode } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import {
  submitContact,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormState,
} from '@/server/actions/contact'

import { BUDGET_RANGES, PROJECT_TYPES } from '../_options'

const INITIAL_STATE: ContactFormState = { ok: false, fieldErrors: {} }

type Values = Record<ContactField, string>

const EMPTY_VALUES: Values = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
}

/** Field order on screen, so the summary reads top to bottom. */
const FIELD_ORDER: readonly ContactField[] = [
  'name',
  'email',
  'phone',
  'projectType',
  'budget',
  'message',
]

const FIELD_LABELS: Record<ContactField, string> = {
  name: 'Họ và tên',
  email: 'Email',
  phone: 'Điện thoại',
  projectType: 'Loại công trình',
  budget: 'Ngân sách dự kiến',
  message: 'Lời nhắn',
}

/**
 * Names the fields that still need work. A summary that says which ones beats
 * a summary that says something went wrong.
 */
function unresolvedFields(errors: ContactFieldErrors): string[] {
  return FIELD_ORDER.filter((field) => typeof errors[field] === 'string').map(
    (field) => FIELD_LABELS[field],
  )
}

const SELECT_OPTIONS = {
  projectType: PROJECT_TYPES.map((option) => ({ value: option.value, label: option.label })),
  budget: BUDGET_RANGES.map((option) => ({ value: option.value, label: option.label })),
}

/**
 * One numbered group of the form.
 *
 * A real `fieldset`/`legend`, so the grouping a sighted reader sees is the same
 * grouping a screen reader announces. The index is `aria-hidden`: it is a
 * counting aid for the eye, and read aloud it just prefixes every legend with a
 * number.
 */
function FormSection({
  index,
  title,
  note,
  children,
}: {
  index: string
  title: string
  note: string
  children: ReactNode
}) {
  return (
    <fieldset className="border-line grid gap-6 border-0 border-t p-0 pt-7 lg:grid-cols-12 lg:gap-8">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-2">
        <span className="u-label text-accent">{index}</span>
        <span className="text-ink font-display text-[1.25rem] leading-none">{title}</span>
        <p className="text-muted hidden text-[0.8125rem] leading-relaxed lg:block">{note}</p>
      </div>
      <div className="lg:col-span-9">{children}</div>
    </fieldset>
  )
}

export function ContactForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(submitContact, INITIAL_STATE)
  const [values, setValues] = useState<Values>(EMPTY_VALUES)

  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLParagraphElement>(null)

  const set = (field: ContactField) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  // Move the reader to the outcome: the confirmation, or the first field that
  // needs attention.
  useEffect(() => {
    if (state === INITIAL_STATE) return
    if (state.ok) {
      successRef.current?.focus()
      return
    }
    const invalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
    invalid?.focus()
  }, [state])

  if (state.ok) {
    return (
      <div className="border-t border-line pt-12">
        <Label rule tone="accent">
          Đã nhận
        </Label>
        <p
          ref={successRef}
          tabIndex={-1}
          className="u-display-sm mt-8 max-w-[20ch] text-ink outline-none"
        >
          Thư của bạn đã nằm trong hộp thư của studio.
        </p>
        <p className="u-body-lg mt-8 max-w-[46ch]">
          Thư gửi tối thứ Sáu thì sáng thứ Hai bạn có hồi âm, và chúng tôi đọc hết, cả những lá
          dài. Nếu đề bài cần ngồi xuống bàn cho ra nhẽ, chúng tôi sẽ hẹn bạn một buổi, ở studio
          hoặc ngay trong căn nhà đang nói tới.
        </p>
        <Rule className="mt-12" />
        <p className="mt-6 font-body text-[0.8125rem] leading-relaxed text-muted">
          Gấp hơn thế? Viết thẳng vào{' '}
          <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">
            {email}
          </a>
          . Hộp thư đó có người mở mỗi sáng.
        </p>
      </div>
    )
  }

  const missing = unresolvedFields(state.fieldErrors)

  return (
    <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-10">
      {state.formError ? (
        <div role="alert" className="border-l border-accent pl-4">
          <p className="font-body text-[0.8125rem] leading-relaxed text-accent">
            {missing.length === 1
              ? `Thư chưa đi được. Còn một mục cần bạn xem lại — ${missing.join('')} — và lý do nằm ngay dưới ô đó.`
              : missing.length > 1
                ? `Thư chưa đi được. Còn ${missing.length} mục cần bạn xem lại — ${missing.join(', ')} — và lý do nằm ngay dưới từng ô.`
                : 'Thư chưa đi được, và lần này là lỗi của chúng tôi, không phải của những gì bạn vừa viết.'}
          </p>
          {missing.length === 0 ? (
            <p className="mt-2 font-body text-[0.75rem] leading-relaxed text-muted">
              Chữ bạn gõ vẫn còn nguyên trong ô, không mất chữ nào. Thử bấm gửi lại sau vài phút;
              nếu vẫn vậy thì chép sang một lá thư gửi thẳng vào{' '}
              <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">
                {email}
              </a>
              {' '}— đường đó không đi qua form nên chắc chắn tới.
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Honeypot — visually and semantically hidden from people. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="an-company">Công ty</label>
        <input id="an-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/*
        Three groups, not one list of seven fields.

        A form is judged before it is read: seven controls in a column reads as
        long, and a reader deciding whether to bother counts rows. The same seven
        under three headings reads as three short questions — who you are, what
        the job is, what you want to say — and each heading tells the reader why
        it is being asked, which is the part that actually gets a phone number
        typed in.

        Every group is its own `fieldset`, so the grouping is real to a screen
        reader rather than a visual arrangement it cannot hear.
      */}
      <fieldset disabled={pending} className="flex flex-col gap-12 border-0 p-0">
        <legend className="sr-only">Thông tin liên hệ</legend>

        <FormSection index="01" title="Liên hệ" note="Để chúng tôi biết gọi ai, và gọi bằng cách nào.">
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Họ và tên" required error={state.fieldErrors.name}>
            <Input
              name="name"
              autoComplete="name"
              placeholder="Nguyễn Minh An"
              value={values.name}
              onChange={(event) => set('name')(event.currentTarget.value)}
            />
          </Field>

          <Field label="Email" required error={state.fieldErrors.email}>
            <Input
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ban@email.com"
              value={values.email}
              onChange={(event) => set('email')(event.currentTarget.value)}
            />
          </Field>

          <Field
            label="Điện thoại"
            hint="Không bắt buộc. Nhưng có số thì chúng tôi gọi, và một cuộc gọi năm phút thường gỡ được thứ mà năm cái email không gỡ nổi."
            error={state.fieldErrors.phone}
          >
            <Input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="09xx xxx xxx"
              value={values.phone}
              onChange={(event) => set('phone')(event.currentTarget.value)}
            />
          </Field>
        </div>
        </FormSection>

        <FormSection
          index="02"
          title="Công trình"
          note="Hai câu này quyết định ai trong studio đọc thư của bạn trước."
        >
        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Loại công trình" required error={state.fieldErrors.projectType}>
            <Select
              name="projectType"
              options={SELECT_OPTIONS.projectType}
              placeholder="Chọn mục gần đúng nhất"
              value={values.projectType}
              onChange={(event) => set('projectType')(event.target.value)}
            />
          </Field>

        <Field
          label="Ngân sách dự kiến"
          hint="Chỉ để chúng tôi biết nên bàn về đá tự nhiên hay đá nhân tạo. Không phải cam kết, và đổi được bất cứ lúc nào."
          error={state.fieldErrors.budget}
        >
          <Select
            name="budget"
            options={SELECT_OPTIONS.budget}
            placeholder="Khoảng nào gần nhất cũng được"
            value={values.budget}
            onChange={(event) => set('budget')(event.target.value)}
          />
        </Field>
        </div>
        </FormSection>

        <FormSection index="03" title="Lời nhắn" note="Phần duy nhất không có ô nào chọn sẵn.">
        <Field
          label="Lời nhắn"
          required
          hint="Ba dòng thật có ích hơn một trang viết cho hay."
          error={state.fieldErrors.message}
        >
          <Textarea
            name="message"
            rows={6}
            placeholder="Căn hộ 96 m² ở Thảo Điền, mới nhận bàn giao thô, hai vợ chồng và một bé ba tuổi. Muốn dọn vào trước Tết."
            value={values.message}
            onChange={(event) => set('message')(event.currentTarget.value)}
          />
        </Field>
        </FormSection>
      </fieldset>

      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[0.75rem] leading-relaxed text-muted">
          Những gì bạn viết ở đây chỉ dùng để trả lời bạn. Studio không gửi bản tin, và không chuyển
          địa chỉ của ai cho bên nào khác.
        </p>
        <Button type="submit" size="lg" loading={pending} withArrow className="sm:min-w-56">
          {pending ? 'Đang gửi…' : 'Gửi lời nhắn'}
        </Button>
      </div>
    </form>
  )
}
