import type { Metadata } from 'next'

import { NavigationEditor } from '@/components/admin/site/NavigationEditor'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { requireUser } from '@/server/auth'

import { listNavigation } from './queries'

export const metadata: Metadata = { title: 'Điều hướng' }
export const dynamic = 'force-dynamic'

export default async function NavigationPage() {
  await requireUser()

  const [header, footer] = await Promise.all([listNavigation('header'), listNavigation('footer')])

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Navigation"
        title="Điều hướng"
        description="Menu đầu trang và chân trang. Kéo để đổi thứ tự; một mục bị tắt vẫn được lưu nhưng không hiển thị. Đường dẫn nội bộ bắt đầu bằng '/', liên kết ngoài bằng 'https://'."
      />

      <NavigationEditor header={header} footer={footer} />
    </div>
  )
}
