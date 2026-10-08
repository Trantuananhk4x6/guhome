'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useReveal } from '@/animations/reveal'
import { Label } from '@/components/ui/Label'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export function MissionVisionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useReveal(containerRef, { variant: 'revealUp', stagger: 0.08 })

  return (
    <section
      id="tam-nhin-su-menh-gia-tri"
      data-home-section="MISSION_VISION"
      className="u-gutter relative isolate bg-surface py-[clamp(4.5rem,10vh,8rem)]"
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Heading */}
        <div className="max-w-[54rem]">
          <Label rule tone="accent">
            Định hướng & Triết lý cốt lõi
          </Label>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] font-normal leading-[1.25] text-ink mt-6">
            Kiến tạo không gian, nâng tầm phong cách sống.
          </h2>
          <p className="mt-6 font-body text-[clamp(1rem,1.4vw,1.1875rem)] leading-relaxed text-ink/75">
            Kế thừa kinh nghiệm và xưởng mộc gia công trực tiếp từ năm 2016, GuHomes kiên định với mô hình kiến trúc & nội thất may đo độc bản: mỗi công trình là một giải pháp tối ưu vi khí hậu bản địa, tôn trọng nếp sống thật và bền vững cùng năm tháng.
          </p>
        </div>

        {/* Vision & Mission Two-Card Grid */}
        <div ref={containerRef} className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* 1. Tầm nhìn (Vision) */}
          <div
            data-reveal-item
            className="group relative flex flex-col justify-between overflow-hidden border border-line bg-canvas p-8 sm:p-12 transition-all duration-500 hover:border-accent hover:shadow-[0_20px_50px_rgba(160,119,83,0.12)]"
          >
            {/* Corner Accents */}
            <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />

            {/* Background Watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-6 select-none font-display text-[7.5rem] font-bold tracking-tighter text-ink/[0.03] transition-all duration-700 group-hover:text-accent/[0.08] group-hover:scale-105"
            >
              VISION
            </span>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[0.75rem] font-medium tracking-wide text-accent uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Tầm nhìn dài hạn
                </span>
                <span className="font-mono text-[0.8125rem] text-muted">01 / 02</span>
              </div>

              <h3 className="mt-6 font-display text-[1.5rem] font-normal leading-[1.3] text-ink sm:text-[1.75rem] transition-colors duration-300 group-hover:text-accent">
                Trở thành studio kiến trúc – nội thất trọn gói biểu tượng tại Việt Nam.
              </h3>

              <p className="mt-4 font-body text-[0.9375rem] font-medium leading-relaxed text-ink/85">
                Tiên phong định hình chuẩn mực không gian sống nguyên bản: mỗi ngôi nhà là một thực thể độc bản, hòa quyện vi khí hậu nhiệt đới, lưu giữ nếp sống riêng (&ldquo;đúng Gu&rdquo;) và trường tồn cùng năm tháng.
              </p>

              <p className="mt-3 font-body text-[0.875rem] leading-relaxed text-ink/70">
                GuHomes không đo lường sự thành công bằng số lượng công trình trải dài khắp thành phố, mà bằng chiều sâu cảm xúc trong từng mét vuông được tạo tác. Nơi thẩm mỹ không lấn át con người, nơi vật liệu mộc được thở cùng khí trời, và nơi mỗi góc nhà trở thành chốn neo đậu bình yên.
              </p>

              <div className="mt-8 border-t border-line/80 pt-6">
                <span className="u-label text-muted">Cam kết cốt lõi:</span>
                <ul className="mt-3 flex flex-col gap-2.5">
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-ink/80">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    <span>Thiết kế &ldquo;may đo&rdquo; cá nhân hóa — tôn trọng thói quen sinh hoạt thật của gia chủ</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-ink/80">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    <span>Thích ứng vi khí hậu Sài Gòn: đón gió đối lưu, lấy sáng thông minh, chống ẩm bền bỉ</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-ink/80">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    <span>Mô hình trọn gói khép kín: từ ý niệm kiến trúc đến xưởng mộc gia công trực tiếp Quận 12</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Sứ mệnh (Mission) */}
          <div
            data-reveal-item
            className="group relative flex flex-col justify-between overflow-hidden border border-line bg-canvas p-8 sm:p-12 transition-all duration-500 hover:border-accent hover:shadow-[0_20px_50px_rgba(160,119,83,0.12)]"
          >
            {/* Corner Accents */}
            <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />

            {/* Background Watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-6 select-none font-display text-[7.5rem] font-bold tracking-tighter text-ink/[0.03] transition-all duration-700 group-hover:text-accent/[0.08] group-hover:scale-105"
            >
              MISSION
            </span>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[0.75rem] font-medium tracking-wide text-accent uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Sứ mệnh phụng sự
                </span>
                <span className="font-mono text-[0.8125rem] text-muted">02 / 02</span>
              </div>

              <h3 className="mt-6 font-display text-[1.5rem] font-normal leading-[1.3] text-ink sm:text-[1.75rem] transition-colors duration-300 group-hover:text-accent">
                Phụng sự tổ ấm bằng sự tử tế, minh bạch và kỷ luật công trường.
              </h3>

              <p className="mt-4 font-body text-[0.9375rem] font-medium leading-relaxed text-ink/85">
                Chuyên sâu thiết kế, thi công, cung cấp và lắp đặt nội thất trọn gói theo yêu cầu của khách hàng — bằng sự tận tâm chân thành, quy trình minh bạch rõ ràng và kỷ luật công trường nghiêm cẩn.
              </p>

              <p className="mt-3 font-body text-[0.875rem] leading-relaxed text-ink/70">
                Sứ mệnh của GuHomes là hiện thực hóa trọn vẹn giấc mơ tổ ấm của gia chủ, giải phóng bạn khỏi mọi âu lo, căng thẳng và sự bất an thường trực trong hành trình xây dựng. Bằng xưởng gia công mộc trực tiếp và quy trình khép kín, chúng tôi trao gửi một không gian đủ ấm để trở về.
              </p>

              <div className="mt-8 border-t border-line/80 pt-6">
                <span className="u-label text-muted">Cam kết cốt lõi:</span>
                <ul className="mt-3 flex flex-col gap-2.5">
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-ink/80">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    <span>Dự toán minh bạch tuyệt đối — nói giá trước khi vẽ, không chi phí ẩn, không phát sinh</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-ink/80">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    <span>Kiểm soát chất lượng đồng bộ từ xưởng sản xuất đến hiện trường lắp đặt ngoài thực tế</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-[0.875rem] text-ink/80">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-2.5 w-2.5" />
                    </span>
                    <span>Cùng một người đồng hành: từ buổi lắng nghe đầu tiên đến ngày trao chìa khóa vào tay gia chủ</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values 4-Column Strip */}
        <div className="mt-16">
          <div className="flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="u-label text-accent font-medium">Bốn cột trụ danh dự</span>
              <h3 className="font-display text-[1.625rem] text-ink mt-1">Giá trị cốt lõi (Core Values)</h3>
            </div>
            <p className="text-[0.875rem] text-muted max-w-[36ch]">
              Những nguyên tắc bất di bất dịch định hình mọi quyết định tại GuHomes.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 01: Chữ Tín Làm Đầu */}
            <div
              data-reveal-item
              className="flex flex-col justify-between border border-line bg-canvas p-6 transition-all duration-300 hover:border-accent hover:shadow-sm"
            >
              <div>
                <span className="font-mono text-xs text-accent">01 / TÂM & TÍN</span>
                <h4 className="mt-3 font-display text-[1.25rem] text-ink">Chữ Tín Làm Đầu</h4>
                <p className="mt-2 text-xs font-medium text-accent">Nói thật, làm thật và chịu trách nhiệm đến cùng.</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink/75">
                  Minh bạch từng con số dự toán ngay từ buổi đầu, không chi phí ẩn. Đã cam kết loại gỗ, mã đá nào thì nhập đúng chuẩn loại đó. Đã hẹn ngày dọn vào thì không để gia chủ phải chờ đợi.
                </p>
              </div>
            </div>

            {/* 02: Đúng "Gu" Bản Sắc */}
            <div
              data-reveal-item
              className="flex flex-col justify-between border border-line bg-canvas p-6 transition-all duration-300 hover:border-accent hover:shadow-sm"
            >
              <div>
                <span className="font-mono text-xs text-accent">02 / ĐỘC BẢN</span>
                <h4 className="mt-3 font-display text-[1.25rem] text-ink">Đúng &ldquo;Gu&rdquo; Bản Sắc</h4>
                <p className="mt-2 text-xs font-medium text-accent">May đo theo nếp sống thật, không sao chép khuôn mẫu.</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink/75">
                  Không áp đặt cái tôi của KTS lên người ở. Chúng tôi kiên nhẫn lắng nghe thói quen sinh hoạt và chuyển hóa thành ngôn ngữ hình khối, ánh sáng độc bản dành riêng cho gia đình bạn.
                </p>
              </div>
            </div>

            {/* 03: Chuẩn Mực & Xưởng Mộc */}
            <div
              data-reveal-item
              className="flex flex-col justify-between border border-line bg-canvas p-6 transition-all duration-300 hover:border-accent hover:shadow-sm"
            >
              <div>
                <span className="font-mono text-xs text-accent">03 / XƯỞNG MỘC</span>
                <h4 className="mt-3 font-display text-[1.25rem] text-ink">Chuẩn Mực & Tỉ Mỉ</h4>
                <p className="mt-2 text-xs font-medium text-accent">Bản vẽ chi tiết 1:5; gia công sắc nét từng milimet.</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink/75">
                  Từng khe co ngót, đường chỉ ron đá đến hướng vân gỗ ghép đều quy định rõ trên bản vẽ. Xưởng mộc trực tiếp tại Quận 12 giúp kiểm soát chất lượng từ phôi gỗ đến lớp hoàn thiện.
                </p>
              </div>
            </div>

            {/* 04: Bền Vững Nhiệt Đới */}
            <div
              data-reveal-item
              className="flex flex-col justify-between border border-line bg-canvas p-6 transition-all duration-300 hover:border-accent hover:shadow-sm"
            >
              <div>
                <span className="font-mono text-xs text-accent">04 / KHÍ HẬU</span>
                <h4 className="mt-3 font-display text-[1.25rem] text-ink">Bền Vững Nhiệt Đới</h4>
                <p className="mt-2 text-xs font-medium text-accent">Thích ứng nắng gắt và độ ẩm 80% của Sài Gòn.</p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink/75">
                  Ưu tiên vật liệu có lỗ thở tự nhiên: đá travertine, gỗ tự nhiên lau dầu, vữa vôi thủ công — những chất liệu càng đi qua thời gian, càng trầm tích vẻ đẹp phong sương và ấm áp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
