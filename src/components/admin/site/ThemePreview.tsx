'use client'

/**
 * Live theme preview — a miniature hero, card and label rendered with the
 * *in-progress* values, so the palette can be judged before it is saved.
 *
 * The values are injected as CSS custom properties on a scoped class rather
 * than as React inline styles, because the design tokens are two levels deep:
 * `--color-canvas` is declared once at `:root` as `var(--c-canvas)` and is
 * therefore already substituted by the time a descendant inherits it. Re-declaring
 * both layers inside the preview scope is what makes the override take effect.
 *
 * `themeToCssVars()` (from `@/lib/theme`) sanitises every value it emits, so the
 * stylesheet below can never carry arbitrary text out of the form.
 */

import { useMemo } from 'react'

import { themeToCssVars } from '@/lib/theme'
import type { ThemeSettings } from '@/types/content'

const SCOPE = 'an-theme-preview'

function previewStyleSheet(theme: ThemeSettings): string {
  const vars = themeToCssVars(theme)
  return `
.${SCOPE}{
  ${vars};
  --color-canvas:var(--c-canvas);
  --color-surface:var(--c-surface);
  --color-surface-alt:var(--c-surface-alt);
  --color-ink:var(--c-ink);
  --color-muted:var(--c-muted);
  --color-line:var(--c-line);
  --color-espresso:var(--c-espresso);
  --color-accent:var(--c-accent);
  --color-accent-soft:var(--c-accent-soft);
  --font-display:var(--f-display),'Cormorant Garamond',ui-serif,Georgia,serif;
  --font-body:var(--f-body),'Inter',ui-sans-serif,system-ui,sans-serif;
  background-color:var(--c-canvas);
  color:var(--c-ink);
  font-family:var(--font-body);
}
.${SCOPE} .pv-label{
  font-family:var(--font-body);
  font-size:.6875rem;
  font-weight:500;
  letter-spacing:var(--tracking-label);
  text-transform:uppercase;
  color:var(--c-muted);
}
.${SCOPE} .pv-display{
  font-family:var(--font-display);
  font-weight:300;
  line-height:.92;
  letter-spacing:var(--tracking-display);
  font-size:calc(2.75rem * var(--display-scale));
  color:var(--c-ink);
}
.${SCOPE} .pv-display-sm{
  font-family:var(--font-display);
  font-weight:300;
  line-height:1.05;
  letter-spacing:var(--tracking-display);
  font-size:calc(1.375rem * var(--display-scale));
  color:var(--c-ink);
}
.${SCOPE} .pv-body{
  font-family:var(--font-body);
  font-size:calc(.875rem * var(--body-scale));
  line-height:1.7;
  color:var(--c-muted);
}
.${SCOPE} .pv-rule{height:1px;background-color:var(--c-line);}
.${SCOPE} .pv-btn{
  font-family:var(--font-body);
  font-size:.625rem;
  font-weight:500;
  letter-spacing:var(--tracking-label);
  text-transform:uppercase;
  background-color:var(--c-ink);
  color:var(--c-canvas);
  padding:.75rem 1.5rem;
  display:inline-block;
}
.${SCOPE} .pv-card{background-color:var(--c-surface);border:1px solid var(--c-line);}
.${SCOPE} .pv-matte{background-color:var(--c-surface-alt);}
.${SCOPE} .pv-dark{background-color:var(--c-espresso);}
.${SCOPE} .pv-dark .pv-display-sm{color:var(--c-canvas);}
.${SCOPE} .pv-dark .pv-label{color:var(--c-accent-soft);}
.${SCOPE} .pv-accent{color:var(--c-accent);}
`.trim()
}

export function ThemePreview({ theme }: { theme: ThemeSettings }) {
  const sheet = useMemo(() => previewStyleSheet(theme), [theme])
  const brandName = theme.brand.companyName.trim().length > 0 ? theme.brand.companyName : 'GuHomes'
  const tagline = theme.brand.tagline.trim().length > 0 ? theme.brand.tagline : 'Không gian mang tính cách.'

  return (
    <div className="border border-line">
      <style>{sheet}</style>

      <div className={SCOPE} aria-label="Xem trước giao diện">
        {/* hero */}
        <div className="flex flex-col gap-5 px-7 py-9">
          <div className="flex items-center gap-3">
            <span className="pv-accent h-px w-8 bg-current" aria-hidden="true" />
            <span className="pv-label">{brandName}</span>
          </div>
          <p className="pv-display">{tagline}</p>
          <p className="pv-body max-w-[46ch]">
            Studio nội thất và kiến trúc tại TP. Hồ Chí Minh. Vật liệu thật, ánh sáng thật, tỷ lệ được cân nhắc.
          </p>
          <div>
            <span className="pv-btn">Xem dự án</span>
          </div>
        </div>

        <div className="pv-rule" />

        {/* card + dark band */}
        <div className="grid gap-5 px-7 py-8 sm:grid-cols-2">
          <div className="pv-card flex flex-col">
            <div className="pv-matte h-24 w-full" aria-hidden="true" />
            <div className="flex flex-col gap-2 p-5">
              <span className="pv-label">
                <span className="pv-accent">01</span> Căn hộ
              </span>
              <p className="pv-display-sm">Tĩnh Viện</p>
              <p className="pv-body">Gỗ óc chó, đá vôi honed, ánh sáng phía Đông.</p>
            </div>
          </div>

          <div className="pv-dark flex flex-col justify-between gap-6 p-5">
            <span className="pv-label">Philosophy</span>
            <p className="pv-display-sm">Ít vật liệu hơn, nhiều ánh sáng hơn.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
