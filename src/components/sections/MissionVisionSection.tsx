'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/Label'
import { useSocialModalStore } from '@/lib/social'

const VISION_COMMITMENTS = [
  {
    code: '01.1',
    text: 'Thiết kế "may đo" cá nhân hóa: Chuyển hóa thói quen sinh hoạt thực tế của từng thành viên thành ngôn ngữ không gian độc bản, không sao chép mặt bằng mẫu.',
  },
  {
    code: '01.2',
    text: 'Thích ứng vi khí hậu Sài Gòn: Giải quyết triệt để bài toán nắng gắt hướng Tây, đối lưu khí tươi tự nhiên và kiểm soát độ ẩm 75–80% quanh năm.',
  },
  {
    code: '01.3',
    text: 'Vật liệu tự nhiên lên nước theo thời gian: Tuyển chọn gỗ tự nhiên sấy chuẩn EMC 10–12%, đá Travertine nguyên lỗ thở, vữa vôi thủ công và đồng thau mộc.',
  },
  {
    code: '01.4',
    text: 'Chuẩn mực thẩm mỹ tĩnh lặng (Quiet Luxury): Kiến tạo những tổ ấm không chạy theo trào lưu ngắn hạn, càng ở lâu càng đằm thắm và có chiều sâu.',
  },
] as const

const MISSION_COMMITMENTS = [
  {
    code: '02.1',
    text: 'Dự toán minh bạch từ ngày đầu: Bóc tách khối lượng chi tiết trước khi lên phối cảnh 3D, cam kết không chi phí ẩn và không phát sinh ngoài kiểm soát.',
  },
  {
    code: '02.2',
    text: 'Xưởng mộc nội thất 1.200m² tại Thạnh Xuân, Quận 12: Trực tiếp sản xuất, lắp dựng thử (Dry-fit) 100% và kiểm soát dung sai mạch ghép laser ≤ 1.0mm.',
  },
  {
    code: '02.3',
    text: 'Hồ sơ kỹ thuật 1:5 chuẩn xác: Vẽ tới mức người thợ không còn phải đoán; đồng bộ tuyệt đối giữa hệ cơ điện (MEP), kết cấu trần – sàn và đồ gỗ may đo.',
  },
  {
    code: '02.4',
    text: 'Cùng một KTS Trưởng đồng hành: Trực tiếp lắng nghe từ buổi khảo sát đầu tiên đến ngày nghiệm thu ánh sáng 2700K và trao chìa khóa bàn giao.',
  },
] as const

const CORE_VALUES_HOME = [
  {
    number: '01',
    tag: 'TÂM & TÍN',
    title: 'Chữ Tín Làm Gốc',
    subtitle: 'Nói thật, làm thật và chịu trách nhiệm trọn vẹn đến cùng.',
    body: 'Minh bạch từng con số dự toán và chủng loại vật tư ngay từ buổi đầu. Đã cam kết mã gỗ óc chó Bắc Mỹ hay đá tự nhiên nào thì nghiệm thu đúng phôi vật liệu đó tại xưởng và công trường.',
    proof: '100% vật tư có biên bản nghiệm thu đầu vào trước khi gia công',
  },
  {
    number: '02',
    tag: 'ĐỘC BẢN',
    title: 'Đúng "Gu" Nếp Sống Thật',
    subtitle: 'May đo theo thói quen sinh hoạt riêng, không áp đặt khuôn mẫu.',
    body: 'Ngôi nhà là chiếc áo may đo cho gia đình bạn. Chúng tôi lắng nghe từ thói quen nấu nướng, góc đọc sách chiều mưa đến kịch bản đèn đêm để thiết kế không gian thuộc về riêng bạn.',
    proof: 'Không tái sử dụng rập khuôn bất kỳ bản vẽ mặt bằng nào',
  },
  {
    number: '03',
    tag: 'CHẾ TÁC 1:5',
    title: 'Chuẩn Mực Từng Milimet',
    subtitle: 'Bản vẽ kỹ thuật tỷ lệ 1:5 & Xưởng mộc 1.200m² Thạnh Xuân.',
    body: 'Mọi khe co ngót gỗ tự nhiên 2mm, đường ron đá hay bản lề âm cửa giấu khuôn đều được định danh trên bản vẽ Shop Drawing và chế tác trực tiếp tại xưởng Quận 12.',
    proof: 'Dung sai lắp đặt kiểm định bằng máy bắn cốt laser ≤ 1.0mm',
  },
  {
    number: '04',
    tag: 'BẢN ĐỊA',
    title: 'Thấu Hiểu Vi Khí Hậu Sài Gòn',
    subtitle: 'Thiết kế chống bức xạ hướng Tây, thông gió đối lưu & kháng ẩm.',
    body: 'Giải quyết tận gốc đặc thù nắng gắt và mùa mưa ẩm 80% của TP.HCM bằng khoảng đệm kiến trúc, lam chắn nắng, khe thoáng tủ âm và giải pháp chống thấm – thoát ẩm đa lớp.',
    proof: 'Giảm 3.0–3.5°C nhiệt độ bề mặt nội thất hướng nắng gắt',
  },
  {
    number: '05',
    tag: 'NGUYÊN BẢN',
    title: 'Tôn Trọng Vật Liệu Thật',
    subtitle: 'Vẻ đẹp xúc giác chân thực của gỗ, đá, vữa vôi và dầu hữu cơ.',
    body: 'Khóa bảng vật liệu ở những chất liệu biết thở và lên nước (Patina) đẹp theo năm tháng. Sử dụng dầu lau gỗ hữu cơ Osmo (0% VOC) an toàn tuyệt đối cho sức khỏe trẻ nhỏ và người lớn tuổi.',
    proof: 'Độ ẩm phôi gỗ kiểm định nghiêm ngặt ở ngưỡng EMC 10–12%',
  },
  {
    number: '06',
    tag: 'KỶ LUẬT',
    title: 'Tận Tâm Trọn Vẹn (12 Công Trình/Năm)',
    subtitle: 'Giới hạn số lượng dự án để giữ trọn chất lượng giám sát.',
    body: 'Mười hai công trình mỗi năm là mức trần tự nguyện của GuHomes. Nhờ đó, KTS Trưởng luôn có mặt trực tiếp tại công trường mỗi tuần và bảo hành – bảo trì định kỳ tận tâm sau bàn giao.',
    proof: 'Bảo hành kỹ thuật 24 tháng & Bảo trì định kỳ 06 tháng/lần',
  },
] as const

export function MissionVisionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useReveal(containerRef, { variant: 'revealUp', stagger: 0.08 })
  const { openModal } = useSocialModalStore()

  return (
    <section
      id="tam-nhin-su-menh-gia-tri"
      data-home-section="MISSION_VISION"
      className="u-gutter relative isolate border-y border-line bg-surface py-[clamp(4.5rem,10vh,8rem)]"
    >
      <div ref={containerRef} className="mx-auto w-full max-w-[110rem]">
        {/* Section Heading */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Label rule tone="accent">
              Tầm nhìn · Sứ mệnh · Giá trị cốt lõi
            </Label>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-normal leading-[1.28] text-ink">
              Kiến tạo không gian nguyên bản, nâng tầm phong cách sống Việt.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="font-body text-[clamp(0.95rem,1.25vw,1.0625rem)] leading-[1.8] text-ink/75">
              Khởi nguồn từ thực tiễn thi công và xưởng mộc gia công trực tiếp từ năm 2016 tại TP. Hồ Chí Minh, GuHomes kiên định với con đường kiến trúc & nội thất may đo độc bản — nơi mỗi công trình là sự giao hòa giữa vi khí hậu bản địa, kỷ luật chế tác 1:5 và nếp sống thật của gia chủ.
            </p>
          </div>
        </div>

        {/* Architectural Diptych: Vision (Daylight Canvas) & Mission (Espresso Night) */}
        <div className="mt-14 grid gap-0 border border-line lg:grid-cols-2">
          {/* 01. TẦM NHÌN (VISION) — Daylight Canvas */}
          <article
            data-reveal-item
            className="group relative flex flex-col justify-between border-b border-line bg-canvas p-8 sm:p-12 lg:border-r lg:border-b-0"
          >
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  01 · Tầm nhìn dài hạn (Vision)
                </span>
                <span className="font-mono text-[0.75rem] uppercase tracking-widest text-muted">
                  ARCH-DIPTYCH / 01
                </span>
              </div>

              <h3 className="mt-7 font-display text-[1.5rem] font-normal leading-[1.35] text-ink sm:text-[1.875rem]">
                Trở thành studio kiến trúc và nội thất may đo biểu tượng tại Việt Nam.
              </h3>

              <p className="mt-4 font-body text-[0.9375rem] font-medium leading-[1.75] text-ink/90">
                Tiên phong định hình chuẩn mực không gian sống nguyên bản: mỗi ngôi nhà là một thực thể độc bản, hòa quyện vi khí hậu nhiệt đới, lưu giữ nếp sống riêng (&ldquo;đúng Gu&rdquo;) và trường tồn cùng năm tháng.
              </p>

              <p className="mt-3 font-body text-[0.875rem] leading-[1.8] text-ink/70">
                GuHomes không đo lường thành công bằng số lượng công trình đại trà, mà bằng chiều sâu cảm xúc và độ bền vật lý trong từng mét vuông được tạo tác — nơi thẩm mỹ không lấn át con người và mỗi góc nhà là chốn neo đậu bình yên.
              </p>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <span className="u-label text-muted">Chỉ mục định hướng chiến lược:</span>
              <dl className="mt-4 flex flex-col gap-3">
                {VISION_COMMITMENTS.map((item) => (
                  <div
                    key={item.code}
                    className="grid grid-cols-[2.75rem_1fr] items-baseline gap-2 border-l-2 border-accent/40 pl-3"
                  >
                    <dt className="font-mono text-[0.75rem] font-semibold text-accent">
                      {item.code}
                    </dt>
                    <dd className="font-body text-[0.875rem] leading-snug text-ink/85">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* 02. SỨ MỆNH (MISSION) — Espresso Night */}
          <article
            data-reveal-item
            className="group relative flex flex-col justify-between bg-espresso p-8 text-canvas sm:p-12"
          >
            <div>
              <div className="flex items-center justify-between border-b border-canvas/15 pb-4">
                <span className="inline-flex items-center gap-2 border border-accent-soft/40 bg-accent/20 px-3 py-1 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-accent-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                  02 · Sứ mệnh phụng sự (Mission)
                </span>
                <span className="font-mono text-[0.75rem] uppercase tracking-widest text-canvas/50">
                  ARCH-DIPTYCH / 02
                </span>
              </div>

              <h3 className="mt-7 font-display text-[1.5rem] font-normal leading-[1.35] text-canvas sm:text-[1.875rem]">
                Phụng sự tổ ấm bằng sự tử tế, dự toán minh bạch và kỷ luật xưởng mộc.
              </h3>

              <p className="mt-4 font-body text-[0.9375rem] font-medium leading-[1.75] text-canvas/90">
                Chuyên sâu thiết kế, thi công, sản xuất và lắp đặt nội thất trọn gói theo yêu cầu: Giải phóng gia chủ khỏi mọi âu lo, chi phí phát sinh và sự bất an trong suốt hành trình xây dựng tổ ấm.
              </p>

              <p className="mt-3 font-body text-[0.875rem] leading-[1.8] text-canvas/70">
                Bằng quy trình khép kín từ bản vẽ kỹ thuật 1:5 đến xưởng gia công mộc trực tiếp 1.200m² tại Thạnh Xuân, Quận 12, chúng tôi trao gửi một không gian sống chuẩn xác hơn cả phối cảnh 3D — đủ ấm cúng để trở về và đủ tinh tế để tự hào đón tiếp người thân quý.
              </p>
            </div>

            <div className="mt-8 border-t border-canvas/15 pt-6">
              <span className="u-label text-canvas/50">Cam kết thực thi công trình:</span>
              <dl className="mt-4 flex flex-col gap-3">
                {MISSION_COMMITMENTS.map((item) => (
                  <div
                    key={item.code}
                    className="grid grid-cols-[2.75rem_1fr] items-baseline gap-2 border-l-2 border-accent-soft/50 pl-3"
                  >
                    <dt className="font-mono text-[0.75rem] font-semibold text-accent-soft">
                      {item.code}
                    </dt>
                    <dd className="font-body text-[0.875rem] leading-snug text-canvas/85">
                      {item.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        </div>

        {/* 6 Core Values Ledger ("Your Peace, Our Craft") */}
        <div className="mt-16">
          <div className="flex flex-col gap-3 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="u-label text-accent font-medium">
                Sáu trụ cột danh dự · &ldquo;Your Peace, Our Craft&rdquo;
              </span>
              <h3 className="mt-2 font-display text-[1.75rem] font-normal text-ink sm:text-[2.125rem]">
                06 Giá trị cốt lõi định hình bản sắc GuHomes
              </h3>
            </div>
            <p className="max-w-[46ch] font-body text-[0.875rem] leading-relaxed text-muted">
              Mỗi nguyên tắc đều đi kèm chỉ số kiểm định thực tế tại xưởng sản xuất 1.200m² và nhật ký giám sát hiện trường.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES_HOME.map((val) => (
              <article
                key={val.number}
                data-reveal-item
                className="group flex flex-col justify-between border border-line bg-canvas p-6 sm:p-7 transition-all duration-300 hover:border-accent hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line/80 pb-3">
                    <span className="font-mono text-[0.875rem] font-semibold text-accent">
                      {val.number} / 06
                    </span>
                    <span className="border border-line bg-surface px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-wider text-muted">
                      {val.tag}
                    </span>
                  </div>

                  <h4 className="mt-4 font-display text-[1.3125rem] font-normal text-ink transition-colors group-hover:text-accent">
                    {val.title}
                  </h4>
                  <p className="mt-1.5 font-body text-[0.8125rem] font-medium text-accent">
                    {val.subtitle}
                  </p>
                  <p className="mt-3 font-body text-[0.875rem] leading-[1.75] text-ink/75">
                    {val.body}
                  </p>
                </div>

                <div className="mt-5 border-t border-line/70 pt-3">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                    Bảo chứng kỹ thuật:
                  </span>
                  <p className="mt-0.5 font-mono text-[0.75rem] font-medium text-ink">
                    ✓ {val.proof}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Bottom Connection Strip: Studio Page + Social Content & Showcase Projects */}
        <div className="mt-12 flex flex-col justify-between gap-6 border border-line bg-canvas p-6 sm:p-8 lg:flex-row lg:items-center">
          <div className="max-w-[56ch]">
            <span className="u-label text-accent">Hồ sơ năng lực & Kênh truyền thông thực tế</span>
            <p className="mt-2 font-body text-[0.9375rem] leading-relaxed text-ink/85">
              Khám phá trọn vẹn triết lý thiết kế, quy trình 4 giai đoạn tại trang Studio hoặc xem trực tiếp <strong>Lịch phát sóng & 06 Dự án trọng điểm</strong> trên kênh Facebook & TikTok chính thức của GuHomes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openModal('facebook', 'projects')}
              className="group inline-flex min-h-[44px] items-center gap-2.5 border border-espresso bg-espresso px-5 py-2.5 font-body text-[0.875rem] font-medium text-canvas transition-all duration-300 hover:border-accent hover:bg-accent cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-accent-soft animate-pulse" />
              <span>Xem 06 Dự án & Lịch Content FB/TikTok</span>
              <ArrowUpRightIcon className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <Link
              href="/studio#tam-nhin-su-menh"
              className="group inline-flex min-h-[44px] items-center gap-2 border border-line bg-surface px-5 py-2.5 font-body text-[0.875rem] font-medium text-ink transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <span>Đọc hồ sơ Tầm nhìn & Sứ mệnh tại Studio</span>
              <ArrowUpRightIcon className="text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
