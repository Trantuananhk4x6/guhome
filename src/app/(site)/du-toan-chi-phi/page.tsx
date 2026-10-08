import type { Metadata } from 'next'
import Link from 'next/link'
import { SpatialBudgetCalculator } from '@/components/sections/SpatialBudgetCalculator'
import { TactileMaterialLab } from '@/components/sections/TactileMaterialLab'
import { TenEngineeringNormsSection } from '@/components/sections/TenEngineeringNormsSection'
import { WesternSolarHeatCalculator } from '@/components/tools/WesternSolarHeatCalculator'
import { DigitalHandoverVault } from '@/components/services/DigitalHandoverVault'
import { Label } from '@/components/ui/Label'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Dự Toán Chi Phí Nội Thất',
  description:
    'Công cụ bóc tách dự toán nội thất từng mét vuông căn hộ, nhà phố và biệt thự tại TP. Hồ Chí Minh. Tính toán minh bạch, bóc tách theo phòng và không phát sinh chi phí từ xưởng mộc GuHomes.',
  path: '/du-toan-chi-phi',
})

export default function DuToanChiPhiPage() {
  return (
    <div className="pb-[var(--spacing-section)]">
      {/* Page Header Banner */}
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)] pb-12 bg-surface border-b border-line/60">
        <div className="mx-auto w-full max-w-[110rem]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-ink">Dự toán chi phí</span>
          </nav>

          <Label rule index="01" tone="accent">
            Dự toán minh bạch
          </Label>

          <h1 className="u-display mt-8 max-w-[20ch] text-ink">
            Biết trước chi phí, an tâm tạo tác tổ ấm.
          </h1>

          <p className="u-body-lg mt-6 max-w-[56ch] text-muted">
            Tại GuHomes, chúng tôi tin rằng một không gian đẹp bắt đầu từ sự trung thực tài chính. Bảng tính dưới đây giúp bạn bóc tách khối lượng thi công thực tế cho từng phòng, từ cốt thô vi khí hậu đến nội thất may đo tại xưởng mộc gia truyền.
          </p>
        </div>
      </section>

      {/* Main Interactive Spatial Budget Calculator */}
      <SpatialBudgetCalculator />

      {/* Material Exploration */}
      <div className="mt-[var(--spacing-section)]">
        <TactileMaterialLab />
      </div>

      {/* 10 Engineering Norms Manifesto */}
      <TenEngineeringNormsSection className="mt-[var(--spacing-section)]" />

      {/* Western Solar Heat Radiation Calculator */}
      <WesternSolarHeatCalculator className="mt-[var(--spacing-section)]" />

      {/* Digital Handover & Warranty Vault */}
      <DigitalHandoverVault className="mt-[var(--spacing-section)]" />
    </div>
  )
}
