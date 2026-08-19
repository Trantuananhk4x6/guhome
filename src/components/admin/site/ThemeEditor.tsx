'use client'

/**
 * `/admin/theme` — palette, typography, motion and brand, with a live preview
 * that renders the *unsaved* values so the palette can be judged before it goes
 * site-wide.
 */

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ConfirmDialog } from '@/components/admin/ConfirmDialog'
import { SaveBar } from '@/components/admin/SaveBar'
import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { DEFAULT_THEME } from '@/lib/theme'
import { resetTheme, saveTheme } from '@/server/actions/theme'
import type { MediaRef, ThemeColors, ThemeSettings } from '@/types/content'

import {
  BODY_FONTS,
  BUNDLED_FONT_NAMES,
  DISPLAY_FONTS,
  MOTION_TOGGLES,
  REDUCED_MOTION_OPTIONS,
  THEME_COLOR_TOKENS,
} from './contracts'
import { AdminPanel, ColorTokenList, SliderField, SubPanel, ToggleRow } from './Fields'
import { MediaField } from './MediaField'
import { ThemePreview } from './ThemePreview'
import { useActionRunner, useEditorDraft } from './useEditorState'

export interface ThemeEditorProps {
  initial: ThemeSettings
  logo: MediaRef | null
  favicon: MediaRef | null
}

function fontOptions(list: readonly string[]): { value: string; label: string }[] {
  return list.map((name) => ({
    value: name,
    label: BUNDLED_FONT_NAMES.includes(name) ? `${name} — có sẵn` : name,
  }))
}

export function ThemeEditor({ initial, logo: initialLogo, favicon: initialFavicon }: ThemeEditorProps) {
  const router = useRouter()
  const draft = useEditorDraft<ThemeSettings>(initial)
  const runner = useActionRunner()

  const [logo, setLogo] = useState<MediaRef | null>(initialLogo)
  const [favicon, setFavicon] = useState<MediaRef | null>(initialFavicon)
  const [confirmReset, setConfirmReset] = useState(false)

  const theme = draft.value
  const errors = runner.fieldErrors

  const setColors = (key: keyof ThemeColors, next: string): void => {
    draft.set((current) => ({ ...current, colors: { ...current.colors, [key]: next } }))
  }

  const setTypography = <K extends keyof ThemeSettings['typography']>(
    key: K,
    next: ThemeSettings['typography'][K],
  ): void => {
    draft.set((current) => ({ ...current, typography: { ...current.typography, [key]: next } }))
  }

  const setMotion = <K extends keyof ThemeSettings['motion']>(key: K, next: ThemeSettings['motion'][K]): void => {
    draft.set((current) => ({ ...current, motion: { ...current.motion, [key]: next } }))
  }

  const setBrand = <K extends keyof ThemeSettings['brand']>(key: K, next: ThemeSettings['brand'][K]): void => {
    draft.set((current) => ({ ...current, brand: { ...current.brand, [key]: next } }))
  }

  const motionOff = !theme.motion.enabled || theme.motion.reducedMotion === 'force'

  const handleSave = (): void => {
    runner.run(() => saveTheme(theme), {
      success: 'Đã lưu giao diện. Toàn site đã cập nhật.',
      onSuccess: () => {
        draft.commit(theme)
        router.refresh()
      },
    })
  }

  const handleReset = (): void => {
    setConfirmReset(false)
    runner.run(() => resetTheme(), {
      success: 'Đã khôi phục bảng màu mặc định.',
      onSuccess: () => {
        draft.commit(DEFAULT_THEME)
        setLogo(null)
        setFavicon(null)
        router.refresh()
      },
    })
  }

  return (
    <div className="flex flex-col gap-10 pb-28">
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_26rem]">
        {/* ------------------------------ controls ----------------------------- */}
        <div className="flex flex-col gap-8">
          <AdminPanel
            eyebrow="Palette"
            title="Bảng màu"
            description="Chín token dựng nên toàn bộ site. Accent dùng thật tiết chế — một nét kẻ, một số thứ tự, một trạng thái hover."
          >
            <ColorTokenList
              tokens={THEME_COLOR_TOKENS}
              colors={theme.colors}
              onChange={setColors}
              fieldErrors={errors}
            />
          </AdminPanel>

          <AdminPanel
            eyebrow="Typography"
            title="Chữ"
            description="Phông hiển thị dùng cho tiêu đề cỡ lớn; phông nội dung cho chữ đọc. Chỉ Cormorant Garamond và Inter được nhúng sẵn — các phông khác phụ thuộc thiết bị người xem."
          >
            <div className="flex flex-col gap-7">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Phông hiển thị" error={errors['typography.displayFont'] ?? null}>
                  <Select
                    value={theme.typography.displayFont}
                    options={fontOptions(DISPLAY_FONTS)}
                    onChange={(event) => setTypography('displayFont', event.target.value)}
                  />
                </Field>

                <Field label="Phông nội dung" error={errors['typography.bodyFont'] ?? null}>
                  <Select
                    value={theme.typography.bodyFont}
                    options={fontOptions(BODY_FONTS)}
                    onChange={(event) => setTypography('bodyFont', event.target.value)}
                  />
                </Field>
              </div>

              <div className="flex flex-col">
                <SliderField
                  label="Tỷ lệ chữ hiển thị"
                  note="Nhân với mọi cỡ chữ tiêu đề."
                  value={theme.typography.displayScale}
                  min={0.6}
                  max={2}
                  step={0.01}
                  onChange={(next) => setTypography('displayScale', next)}
                  format={(value) => `${value.toFixed(2)}×`}
                />
                <SliderField
                  label="Tỷ lệ chữ nội dung"
                  note="Nhân với cỡ chữ đọc."
                  value={theme.typography.bodyScale}
                  min={0.75}
                  max={1.5}
                  step={0.01}
                  onChange={(next) => setTypography('bodyScale', next)}
                  format={(value) => `${value.toFixed(2)}×`}
                />
                <SliderField
                  label="Giãn chữ"
                  note="Nhân với tracking của nhãn (0.18em) và tiêu đề (-0.02em)."
                  value={theme.typography.tracking}
                  min={0.25}
                  max={3}
                  step={0.05}
                  onChange={(next) => setTypography('tracking', next)}
                  format={(value) => `${value.toFixed(2)}×`}
                />
              </div>
            </div>
          </AdminPanel>

          <AdminPanel
            eyebrow="Motion"
            title="Chuyển động"
            description="Tắt công tắc tổng là toàn site đứng yên. Chế độ giảm chuyển động 'Tự động' tôn trọng thiết lập của người xem."
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col">
                <ToggleRow
                  label="Bật chuyển động"
                  note="Công tắc tổng — tắt là mọi hiệu ứng ngừng, kể cả 3D."
                  checked={theme.motion.enabled}
                  onChange={(next) => setMotion('enabled', next)}
                />
              </div>

              <Field
                label="Giảm chuyển động"
                hint="'Tự động' theo prefers-reduced-motion của hệ điều hành."
                error={errors['motion.reducedMotion'] ?? null}
              >
                <Select
                  value={theme.motion.reducedMotion}
                  options={REDUCED_MOTION_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
                  onChange={(event) => {
                    const value = event.target.value
                    if (value === 'auto' || value === 'force' || value === 'off') setMotion('reducedMotion', value)
                  }}
                />
              </Field>

              <SubPanel title="Từng hiệu ứng" note={motionOff ? 'Đang tắt toàn bộ — các công tắc dưới không có tác dụng.' : undefined}>
                <div className="flex flex-col">
                  {MOTION_TOGGLES.map((toggle) => (
                    <ToggleRow
                      key={toggle.key}
                      label={toggle.label}
                      note={toggle.note}
                      checked={theme.motion[toggle.key]}
                      disabled={motionOff}
                      onChange={(next) => setMotion(toggle.key, next)}
                    />
                  ))}
                </div>
              </SubPanel>

              <div className="flex flex-col">
                <SliderField
                  label="Cường độ"
                  note="Hệ số nhân toàn cục cho biên độ mọi hiệu ứng."
                  value={theme.motion.intensity}
                  min={0}
                  max={1}
                  step={0.05}
                  onChange={(next) => setMotion('intensity', next)}
                  format={(value) => `${Math.round(value * 100)}%`}
                />
                <SliderField
                  label="Tốc độ chuyển"
                  note="Thời lượng cơ sở của mọi chuyển cảnh, tính bằng giây."
                  value={theme.motion.transitionSpeed}
                  min={0.1}
                  max={4}
                  step={0.05}
                  onChange={(next) => setMotion('transitionSpeed', next)}
                  format={(value) => `${value.toFixed(2)}s`}
                />
              </div>
            </div>
          </AdminPanel>

          <AdminPanel eyebrow="Brand" title="Thương hiệu" description="Tên, câu định vị và thông tin liên hệ dùng chung cho header, footer và metadata.">
            <div className="flex flex-col gap-8">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Tên công ty" required error={errors['brand.companyName'] ?? null}>
                  <Input value={theme.brand.companyName} onChange={(event) => setBrand('companyName', event.target.value)} />
                </Field>
                <Field label="Tên rút gọn" hint="Dùng cho logo chữ và tab trình duyệt." required error={errors['brand.shortName'] ?? null}>
                  <Input value={theme.brand.shortName} onChange={(event) => setBrand('shortName', event.target.value)} />
                </Field>
              </div>

              <Field label="Câu định vị" error={errors['brand.tagline'] ?? null}>
                <Input value={theme.brand.tagline} onChange={(event) => setBrand('tagline', event.target.value)} />
              </Field>

              <div className="grid gap-7 sm:grid-cols-2">
                <MediaField
                  label="Logo"
                  hint="SVG hoặc PNG nền trong suốt."
                  value={logo}
                  error={errors['brand.logoMediaId'] ?? null}
                  onChange={(next) => {
                    setLogo(next)
                    setBrand('logoMediaId', next?.id ?? null)
                  }}
                />
                <MediaField
                  label="Favicon"
                  hint="Vuông, tối thiểu 256×256."
                  value={favicon}
                  error={errors['brand.faviconMediaId'] ?? null}
                  onChange={(next) => {
                    setFavicon(next)
                    setBrand('faviconMediaId', next?.id ?? null)
                  }}
                />
              </div>

              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Email" required error={errors['brand.email'] ?? null}>
                  <Input
                    type="email"
                    value={theme.brand.email}
                    onChange={(event) => setBrand('email', event.target.value)}
                  />
                </Field>
                <Field label="Điện thoại" error={errors['brand.phone'] ?? null}>
                  <Input value={theme.brand.phone} onChange={(event) => setBrand('phone', event.target.value)} />
                </Field>
              </div>

              <Field label="Địa chỉ" error={errors['brand.address'] ?? null}>
                <Textarea
                  rows={2}
                  value={theme.brand.address}
                  onChange={(event) => setBrand('address', event.target.value)}
                />
              </Field>

              <SubPanel title="Mạng xã hội" note="Liên kết phải bắt đầu bằng https://">
                <div className="flex flex-col gap-5">
                  {theme.brand.social.map((row, index) => (
                    <div key={index} className="grid items-end gap-4 sm:grid-cols-[10rem_minmax(0,1fr)_auto]">
                      <Field label="Tên kênh" error={errors[`brand.social.${index}.label`] ?? null}>
                        <Input
                          value={row.label}
                          onChange={(event) => {
                            const label = event.target.value
                            setBrand(
                              'social',
                              theme.brand.social.map((item, i) => (i === index ? { ...item, label } : item)),
                            )
                          }}
                        />
                      </Field>
                      <Field label="Liên kết" error={errors[`brand.social.${index}.href`] ?? null}>
                        <Input
                          value={row.href}
                          onChange={(event) => {
                            const href = event.target.value
                            setBrand(
                              'social',
                              theme.brand.social.map((item, i) => (i === index ? { ...item, href } : item)),
                            )
                          }}
                        />
                      </Field>
                      <Button
                        type="button"
                        variant="underline"
                        size="sm"
                        onClick={() =>
                          setBrand(
                            'social',
                            theme.brand.social.filter((_, i) => i !== index),
                          )
                        }
                      >
                        Xoá
                      </Button>
                    </div>
                  ))}

                  <div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setBrand('social', [...theme.brand.social, { label: '', href: 'https://' }])}
                    >
                      Thêm kênh
                    </Button>
                  </div>
                </div>
              </SubPanel>
            </div>
          </AdminPanel>
        </div>

        {/* ------------------------------ preview ------------------------------ */}
        <div className="xl:sticky xl:top-8 xl:h-fit">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="u-label text-ink">Live preview</span>
              <span className="font-body text-[0.75rem] text-muted">Giá trị chưa lưu</span>
            </div>
            <ThemePreview theme={theme} />
            <p className="text-[0.75rem] leading-relaxed text-muted">
              Khung xem trước dùng đúng các biến CSS mà site thật đọc, nên màu và tỷ lệ chữ ở đây khớp với kết quả sau
              khi lưu.
            </p>
          </div>
        </div>
      </div>

      <SaveBar
        dirty={draft.dirty}
        saving={runner.pending}
        error={runner.error}
        message={runner.message}
        onSave={handleSave}
        onReset={draft.reset}
        saveLabel="Lưu giao diện"
      >
        <Button type="button" variant="underline" size="sm" onClick={() => setConfirmReset(true)}>
          Khôi phục mặc định
        </Button>
      </SaveBar>

      <ConfirmDialog
        open={confirmReset}
        title="Khôi phục giao diện mặc định?"
        description="Toàn bộ bảng màu, chữ, chuyển động và thương hiệu sẽ trở về giá trị gốc của AN ATELIER. Thao tác này ghi đè bản đang lưu."
        confirmLabel="Khôi phục"
        cancelLabel="Huỷ"
        tone="danger"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  )
}
