import type { Metadata } from 'next'

import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { requireUser } from '@/server/auth'

import { StylesEditor } from './_components/StylesEditor'
import { listAdminStyles } from './queries'

export const metadata: Metadata = { title: 'Phong cách' }
export const dynamic = 'force-dynamic'

export default async function StylesPage() {
  await requireUser()

  const rows = await listAdminStyles()

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Styles"
        title="Phong cách"
        description="Thư viện phong cách dùng để lọc dự án — Tân cổ điển, Tối giản, Đương đại… Mỗi dự án có thể mang nhiều phong cách; gán ở tab Nội dung của trang sửa dự án."
      />

      <StylesEditor rows={rows} />
    </div>
  )
}
