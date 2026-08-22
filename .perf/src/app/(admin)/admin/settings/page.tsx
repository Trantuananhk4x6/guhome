import type { Metadata } from 'next'

import { ContactInbox, type ContactInboxRow } from '@/components/admin/site/ContactInbox'
import { AdminPanel } from '@/components/admin/site/Fields'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { PasswordForm, SeoDefaultsForm } from '@/components/admin/site/SettingsForms'
import type { ContactStatus } from '@/components/admin/site/contracts'
import { requireAdmin } from '@/server/auth'
import { getMediaMap } from '@/server/queries/media'

import { countContactRequests, environmentSummary, listContactRequests } from './queries'
import { getSiteSeoDefaults } from './site-settings'

export const metadata: Metadata = { title: 'Thiết lập' }
export const dynamic = 'force-dynamic'

interface SettingsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function readParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

function readStatus(value: string): ContactStatus | 'all' {
  if (value === 'new' || value === 'contacted' || value === 'archived') return value
  return 'all'
}

/** One row of the read-only environment table. */
function EnvRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-4 last:border-b-0">
      <div className="flex flex-col gap-1">
        <span className="u-label text-ink">{label}</span>
        {note ? <span className="text-[0.75rem] leading-relaxed text-muted">{note}</span> : null}
      </div>
      <code className="font-body text-[0.8125rem] text-accent">{value}</code>
    </div>
  )
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const session = await requireAdmin()
  const params = await searchParams

  const status = readStatus(readParam(params['status']))
  const search = readParam(params['q'])

  const [seo, contacts, counts] = await Promise.all([
    getSiteSeoDefaults(),
    listContactRequests({ status, search }),
    countContactRequests(),
  ])

  const mediaMap = await getMediaMap([seo.ogImageId])
  const ogImage = seo.ogImageId ? (mediaMap.get(seo.ogImageId) ?? null) : null

  const env = environmentSummary()

  const rows: ContactInboxRow[] = contacts.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    projectType: row.projectType,
    budget: row.budget,
    message: row.message,
    status: row.status,
    source: row.source,
    createdAt: row.createdAt.toISOString(),
  }))

  return (
    <div className="flex flex-col gap-10 pb-24">
      <AdminPageHeader
        eyebrow="Settings"
        title="Thiết lập"
        description="Mặc định SEO, hộp thư liên hệ, tài khoản của bạn và bảng tóm tắt môi trường vận hành."
      />

      <AdminPanel
        eyebrow="SEO"
        title="Mặc định tìm kiếm & chia sẻ"
        description="Áp dụng cho mọi trang không khai báo metadata riêng."
      >
        <SeoDefaultsForm initial={seo} ogImage={ogImage} />
      </AdminPanel>

      <div id="inbox" className="scroll-mt-8">
        <AdminPanel
          eyebrow="Inbox"
          title="Hộp thư liên hệ"
          description="Mỗi yêu cầu gửi từ trang Liên hệ. Chuyển trạng thái theo luồng Mới → Đã liên hệ → Lưu trữ."
        >
          <ContactInbox rows={rows} counts={counts} status={status} search={search} />
        </AdminPanel>
      </div>

      <AdminPanel
        eyebrow="Account"
        title="Tài khoản"
        description="Đổi mật khẩu của chính bạn. Cần nhập đúng mật khẩu hiện tại; sau khi đổi, mọi phiên đăng nhập khác bị thu hồi."
      >
        <PasswordForm email={session.email} />
      </AdminPanel>

      <AdminPanel
        eyebrow="Environment"
        title="Môi trường vận hành"
        description="Chỉ đọc. Bảng này không bao giờ hiển thị khoá bí mật — chỉ tên driver, tên máy chủ và trạng thái cấu hình."
      >
        <div className="flex flex-col">
          <EnvRow label="Storage driver" value={env.storageDriver} note="Nơi lưu tệp media đã xử lý." />
          <EnvRow label="Storage target" value={env.storageTarget} note="Thư mục cục bộ hoặc tên bucket." />
          <EnvRow label="Depth provider" value={env.depthProvider} note="Bộ dựng bản đồ chiều sâu cho cảnh 2.5D." />
          <EnvRow
            label="Depth model token"
            value={env.depthModelConfigured ? 'đã cấu hình' : 'chưa cấu hình'}
            note="Chỉ hiển thị trạng thái, không hiển thị giá trị."
          />
          <EnvRow label="Database host" value={env.databaseHost} note="Máy chủ Neon đang phục vụ." />
          <EnvRow label="Database name" value={env.databaseName} />
          <EnvRow label="Media source" value={env.mediaSourceRoot} note="Thư mục ảnh gốc dùng cho pipeline media." />
          <EnvRow label="Node env" value={env.nodeEnv} />
        </div>
      </AdminPanel>
    </div>
  )
}
