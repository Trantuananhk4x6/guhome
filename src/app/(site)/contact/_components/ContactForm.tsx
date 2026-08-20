'use client'

import { useActionState, useEffect, useRef, useState } from 'react'

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
          Thư của bạn đã nằm trong hộp của studio.
        </p>
        <p className="u-body-lg mt-8 max-w-[46ch]">
          Chúng tôi đọc hết và trả lời trong vòng 24 giờ làm việc — thư gửi tối thứ Sáu thì sáng thứ
          Hai bạn có hồi âm. Nếu đề bài cần bàn kỹ, chúng tôi sẽ đề nghị một buổi 60 phút tại studio
          hoặc ngay trong căn nhà của bạn.
        </p>
        <Rule className="mt-12" />
        <p className="mt-6 font-body text-[0.8125rem] leading-relaxed text-muted">
          Gấp hơn thế? Viết thẳng vào{' '}
          <a href={`mailto:${email}`} className="text-ink underline underline-offset-4">
            {email}
          </a>
          , hộp thư đó có người mở mỗi sáng.
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
            {missing.length > 0
              ? `Chưa gửi được. Còn ${missing.length} mục cần xem lại: ${missing.join(', ')} — lý do ghi ngay dưới từng ô.`
              : 'Chưa gửi được, và lỗi nằm ở phía chúng tôi chứ không phải ở những gì bạn vừa viết.'}
          </p>
          {missing.length === 0 ? (
            <p className="mt-2 font-body text-[0.75rem] leading-relaxed text-muted">
              Nội dung bạn nhập vẫn còn nguyên trong ô. Bấm gửi lại sau vài phút, hoặc chép sang một
              lá thư gửi thẳng vào{' '}
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

      <fieldset disabled={pending} className="flex flex-col gap-10 border-0 p-0">
        <legend className="sr-only">Thông tin liên hệ</legend>

        <div className="grid gap-10 sm:grid-cols-2">
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
            hint="Không bắt buộc. Có số thì chúng tôi gọi, thường nhanh hơn viết."
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

          <Field label="Loại công trình" required error={state.fieldErrors.projectType}>
            <Select
              name="projectType"
              options={SELECT_OPTIONS.projectType}
              placeholder="Chọn mục gần đúng nhất"
              value={values.projectType}
              onChange={(event) => set('projectType')(event.currentTarget.value)}
            />
          </Field>
        </div>

        <Field
          label="Ngân sách dự kiến"
          hint="Chỉ để chúng tôi biết nên bàn về đá tự nhiên hay đá nhân tạo. Không phải cam kết, và đổi được về sau."
          error={state.fieldErrors.budget}
        >
          <Select
            name="budget"
            options={SELECT_OPTIONS.budget}
            placeholder="Chọn khoảng gần nhất"
            value={values.budget}
            onChange={(event) => set('budget')(event.currentTarget.value)}
          />
        </Field>

        <Field
          label="Lời nhắn"
          required
          hint="Diện tích, tình trạng bàn giao, thời điểm muốn dọn vào. Ba dòng cụ thể có ích hơn một trang chung chung."
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
      </fieldset>

      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[0.75rem] leading-relaxed text-muted">
          Thông tin này chỉ dùng để trả lời bạn. Chúng tôi không gửi bản tin và không chuyển cho ai
          khác.
        </p>
        <Button type="submit" size="lg" loading={pending} withArrow className="sm:min-w-56">
          {pending ? 'Đang gửi…' : 'Gửi lời nhắn'}
        </Button>
      </div>
    </form>
  )
}
