/**
 * `/admin` — the dashboard.
 *
 * A studio-sized overview: what is live, what is waiting, and what happened
 * last. Reads go straight to the database because none of these numbers belong
 * to a public query surface.
 */

import { and, count, desc, eq, inArray } from 'drizzle-orm'
import type { Metadata } from 'next'
import Link from 'next/link'

import { AdminPageHeader, Panel, adminButtonClass } from '@/components/admin/AdminShell'
import { StatusPill } from '@/components/admin/StatusPill'
import type { ContactStatus } from '@/components/admin/site/contracts'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import {
  articles,
  auditLogs,
  contactRequests,
  media,
  projects,
  reconJobs,
  users,
} from '@/server/db/schema'

import { ContactStatusControl } from './_components/ContactStatusControl'

export const metadata: Metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

async function firstCount(query: Promise<{ value: number }[]>): Promise<number> {
  const rows = await query
  return rows[0]?.value ?? 0
}

const DATE_TIME = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})

/** Vietnamese labels for the audit actions this CMS writes. */
const AUDIT_LABELS: Record<string, string> = {
  'auth.sign_in': 'Đăng nhập',
  'auth.sign_out': 'Đăng xuất',
  'auth.sign_in_failed': 'Đăng nhập thất bại',
  'auth.sign_in_blocked': 'Tài khoản bị khoá',
  'project.create': 'Tạo dự án',
  'project.update': 'Cập nhật dự án',
  'project.delete': 'Xoá dự án',
  'project.duplicate': 'Nhân bản dự án',
  'project.toggle_featured': 'Đổi trạng thái nổi bật',
  'project.save_blocks': 'Lưu bố cục dự án',
  'project.attach_media': 'Gắn media vào dự án',
  'project.detach_media': 'Gỡ media khỏi dự án',
  'project.reorder_media': 'Sắp xếp media',
  'contact.status': 'Đổi trạng thái liên hệ',
  'contact.delete': 'Xoá liên hệ',
}

function auditLabel(action: string): string {
  return AUDIT_LABELS[action] ?? action
}

interface StatTileProps {
  label: string
  value: number
  hint?: string
  href?: string
}

function StatTile({ label, value, hint, href }: StatTileProps) {
  const body = (
    <>
      <p className="u-label text-muted">{label}</p>
      <p className="mt-3 font-display text-[2.5rem] font-normal leading-none tabular-nums">{value}</p>
      {hint ? <p className="mt-2 font-body text-[0.6875rem] leading-4 text-muted">{hint}</p> : null}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="block border border-line bg-surface p-4 transition-colors duration-200 hover:border-ink"
      >
        {body}
      </Link>
    )
  }

  return <div className="border border-line bg-surface p-4">{body}</div>
}

export default async function AdminDashboardPage() {
  await requireUser()

  const [
    publishedProjects,
    draftProjects,
    articleCount,
    mediaCount,
    newContacts,
    pendingJobs,
    recentContacts,
    recentAudit,
  ] = await Promise.all([
    firstCount(
      db.select({ value: count() }).from(projects).where(eq(projects.status, 'published')),
    ),
    firstCount(db.select({ value: count() }).from(projects).where(eq(projects.status, 'draft'))),
    firstCount(db.select({ value: count() }).from(articles)),
    firstCount(db.select({ value: count() }).from(media)),
    firstCount(
      db.select({ value: count() }).from(contactRequests).where(eq(contactRequests.status, 'new')),
    ),
    firstCount(
      db
        .select({ value: count() })
        .from(reconJobs)
        .where(inArray(reconJobs.status, ['queued', 'running', 'review'])),
    ),
    db
      .select({
        id: contactRequests.id,
        name: contactRequests.name,
        email: contactRequests.email,
        projectType: contactRequests.projectType,
        message: contactRequests.message,
        status: contactRequests.status,
        createdAt: contactRequests.createdAt,
      })
      .from(contactRequests)
      .orderBy(desc(contactRequests.createdAt))
      .limit(5),
    db
      .select({
        id: auditLogs.id,
        action: auditLogs.action,
        entityType: auditLogs.entityType,
        entityId: auditLogs.entityId,
        createdAt: auditLogs.createdAt,
        email: users.email,
      })
      .from(auditLogs)
      .leftJoin(users, eq(auditLogs.userId, users.id))
      .orderBy(desc(auditLogs.createdAt))
      .limit(8),
  ])

  const featuredCount = await firstCount(
    db
      .select({ value: count() })
      .from(projects)
      .where(and(eq(projects.featured, true), eq(projects.status, 'published'))),
  )

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Tình trạng nội dung của studio: dự án đang chạy, thư mới từ khách, và những thay đổi gần nhất."
        actions={
          <>
            <Link href="/admin/projects/new" className={adminButtonClass('solid')}>
              Dự án mới
            </Link>
            <Link href="/" className={adminButtonClass('outline')}>
              Xem website
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatTile
          label="Dự án đã xuất bản"
          value={publishedProjects}
          hint={`${featuredCount} đang nổi bật`}
          href="/admin/projects?status=published"
        />
        <StatTile label="Dự án nháp" value={draftProjects} href="/admin/projects?status=draft" />
        <StatTile label="Bài viết" value={articleCount} href="/admin/articles" />
        <StatTile label="Media" value={mediaCount} href="/admin/media" />
        <StatTile label="Liên hệ mới" value={newContacts} href="/admin/settings#inbox" />
        <StatTile label="Job 3D đang chờ" value={pendingJobs} href="/admin/3d-assets" />
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Panel
          title="Liên hệ gần đây"
          description="Năm yêu cầu mới nhất. Toàn bộ hộp thư nằm ở Cài đặt."
          actions={
            <Link href="/admin/settings#inbox" className={adminButtonClass('ghost')}>
              Hộp thư
            </Link>
          }
          flush
        >
          {recentContacts.length === 0 ? (
            <p className="px-4 py-12 text-center font-body text-[0.8125rem] text-muted">
              Chưa có liên hệ nào.
            </p>
          ) : (
            <ul>
              {recentContacts.map((row) => (
                <li key={row.id} className="border-b border-line/70 px-4 py-4 last:border-b-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <p className="font-body text-[0.875rem] text-ink">
                      {row.name}
                      <span className="ml-2 font-body text-[0.75rem] text-muted">{row.email}</span>
                    </p>
                    <p className="u-label text-muted">{DATE_TIME.format(row.createdAt)}</p>
                  </div>

                  {row.projectType ? (
                    <p className="mt-1 font-body text-[0.75rem] text-muted">{row.projectType}</p>
                  ) : null}

                  {row.message ? (
                    <p className="mt-2 line-clamp-2 font-body text-[0.8125rem] leading-6 text-muted">
                      {row.message}
                    </p>
                  ) : null}

                  <div className="mt-3">
                    <ContactStatusControl id={row.id} status={row.status as ContactStatus} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="flex flex-col gap-8">
          <Panel title="Nhật ký hoạt động" description="Tám thao tác gần nhất." flush>
            {recentAudit.length === 0 ? (
              <p className="px-4 py-10 text-center font-body text-[0.8125rem] text-muted">
                Chưa có hoạt động nào.
              </p>
            ) : (
              <ul>
                {recentAudit.map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-baseline justify-between gap-3 border-b border-line/70 px-4 py-3 last:border-b-0"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-body text-[0.8125rem] text-ink">
                        {auditLabel(entry.action)}
                      </span>
                      <span className="block truncate font-body text-[0.6875rem] text-muted">
                        {entry.email ?? 'hệ thống'}
                      </span>
                    </span>
                    <span className="u-label shrink-0 text-muted">{DATE_TIME.format(entry.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Lối tắt">
            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                { href: '/admin/projects/new', label: 'Tạo dự án' },
                { href: '/admin/media', label: 'Tải ảnh lên' },
                { href: '/admin/3d-assets', label: 'Dựng cảnh 3D' },
                { href: '/admin/theme', label: 'Sửa giao diện' },
                { href: '/admin/homepage', label: 'Sắp xếp trang chủ' },
                { href: '/admin/navigation', label: 'Chỉnh menu' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between border border-line bg-canvas px-3 py-3 font-body text-[0.8125rem] text-ink transition-colors duration-200 hover:border-ink"
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Tình trạng">
            <div className="flex flex-wrap gap-2">
              <StatusPill tone={newContacts > 0 ? 'accentSolid' : 'neutral'} dot>
                {newContacts > 0 ? `${newContacts} thư chưa đọc` : 'Hộp thư sạch'}
              </StatusPill>
              <StatusPill tone={pendingJobs > 0 ? 'accent' : 'neutral'} dot>
                {pendingJobs > 0 ? `${pendingJobs} job 3D đang chờ` : 'Không có job 3D'}
              </StatusPill>
              <StatusPill tone={draftProjects > 0 ? 'muted' : 'neutral'} dot>
                {draftProjects > 0 ? `${draftProjects} dự án còn nháp` : 'Không có bản nháp'}
              </StatusPill>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
