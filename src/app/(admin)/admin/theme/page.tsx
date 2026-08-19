import type { Metadata } from 'next'

import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { ThemeEditor } from '@/components/admin/site/ThemeEditor'
import { requireAdmin } from '@/server/auth'
import { getMediaMap } from '@/server/queries/media'
import { getThemeSettings } from '@/server/queries/site'

export const metadata: Metadata = { title: 'Giao diện' }
export const dynamic = 'force-dynamic'

export default async function ThemePage() {
  await requireAdmin()

  const theme = await getThemeSettings()
  const mediaMap = await getMediaMap([theme.brand.logoMediaId, theme.brand.faviconMediaId])

  const logo = theme.brand.logoMediaId ? (mediaMap.get(theme.brand.logoMediaId) ?? null) : null
  const favicon = theme.brand.faviconMediaId ? (mediaMap.get(theme.brand.faviconMediaId) ?? null) : null

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Theme"
        title="Giao diện"
        description="Bảng màu, chữ, chuyển động và thương hiệu. Thay đổi được ghi vào một hàng cấu hình duy nhất và áp dụng cho toàn site ngay sau khi lưu — không cần build lại."
      />

      <ThemeEditor initial={theme} logo={logo} favicon={favicon} />
    </div>
  )
}
