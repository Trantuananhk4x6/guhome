import { Label } from '@/components/ui/Label'

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="u-gutter flex min-h-[72vh] items-center py-[calc(var(--spacing-section)*0.75)]"
    >
      <div className="mx-auto w-full max-w-[100rem]">
        <Label>Đang tải</Label>

        {/* A hairline that breathes — the quietest loader in the system. */}
        <div className="mt-8 h-px w-full max-w-[28rem] bg-line">
          <div className="h-px w-1/3 animate-pulse bg-accent" />
        </div>

        <p className="mt-10 max-w-[34ch] font-display text-[1.5rem] font-normal leading-snug text-muted">
          Chữ đến trước. Ảnh công trình để nguyên ở bản gốc nên về sau một nhịp.
        </p>
      </div>
    </div>
  )
}
