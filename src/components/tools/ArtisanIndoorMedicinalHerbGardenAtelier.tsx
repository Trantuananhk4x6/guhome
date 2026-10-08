'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

interface TeaRecipe {
  id: string
  name: string
  season: string
  ingredients: string[]
  temperature: string
  infusionTime: string
  medicinalBenefit: string
  aromaProfile: string
}

const TEA_RECIPES: TeaRecipe[] = [
  {
    id: 'huong-nhu-sa',
    name: 'Trà Hương Nhu & Sả Chanh Hạ Nhiệt Mùa Nắng',
    season: 'Mùa Nắng Sài Gòn (Tháng 12 – Tháng 4)',
    ingredients: [
      '8 lá hương nhu tía tươi cắt tại giàn gốm',
      '2 nhánh sả chanh Nam Bộ đập dập',
      '3 lát gừng gió tươi mỏng',
      '200ml nước khoáng thiên nhiên 88°C',
    ],
    temperature: '88°C',
    infusionTime: '4 phút',
    medicinalBenefit: 'Hàm lượng Eugenol dồi dào giúp kháng khuẩn đường hô hấp, làm mát cơ thể tự nhiên và giải tỏa độc tố qua tuyến mồ hôi êm dịu.',
    aromaProfile: 'Hương cay nồng ấm áp của hương nhu quyện cùng vị thanh mát the cay của sả tươi.',
  },
  {
    id: 'bac-ha-mat-ong',
    name: 'Trà Bạc Hà Nam Bộ & Mật Ong Khởi Sắc Sớm Mai',
    season: 'Quanh Năm • Khởi Đầu Ngày Mới',
    ingredients: [
      '10 lá bạc hà bản địa vò nhẹ kích hoạt tinh dầu',
      '1 thìa mật ong hoa rừng Đắk Lắk nguyên chất',
      '1 lát chanh đào mỏng nguyên vỏ',
      '220ml nước khoáng 80°C',
    ],
    temperature: '80°C',
    infusionTime: '3 phút',
    medicinalBenefit: 'Kích hoạt hệ thần kinh trung ương với Menthol tự nhiên, đánh thức khả năng tư duy chiến lược và thanh lọc đường ruột.',
    aromaProfile: 'Hương the mát sảng khoái bùng nổ vòm họng cùng vị ngọt hậu sâu lắng.',
  },
  {
    id: 'ngai-cuu-thao-qua',
    name: 'Trà Ngải Cứu Nhung & Kỷ Tử An Thần Đêm Sâu',
    season: 'Mùa Mưa Sài Gòn (Tháng 5 – Tháng 11)',
    ingredients: [
      '5 đọt non ngải cứu nhung mềm mại',
      '1/2 quả thảo quả nướng sơ thơm dịu',
      '6 hạt kỷ tử hữu cơ Ninh Hạ',
      '250ml nước khoáng 92°C',
    ],
    temperature: '92°C',
    infusionTime: '6 phút',
    medicinalBenefit: 'Điều hòa kinh mạch, làm ấm tạng phủ, giúp cơ bắp thả lỏng tuyệt đối để chìm vào chu kỳ giấc ngủ sâu REM.',
    aromaProfile: 'Vị đắng dịu thanh tao của ngải cứu mộc bản quyện mùi thảo mộc rừng già.',
  },
  {
    id: 'sa-huong-thao',
    name: 'Trà Sả Hương Thảo Tập Trung Cao Độ',
    season: 'Phiên Làm Việc Căng Thẳng & Sáng Tạo',
    ingredients: [
      '1 nhánh hương thảo vi khí hậu 10cm',
      '1 lát sả tươi bào mỏng',
      'Vài giọt nước cốt táo hữu cơ',
      '200ml nước khoáng 85°C',
    ],
    temperature: '85°C',
    infusionTime: '5 phút',
    medicinalBenefit: 'Hợp chất 1,8-Cineole và axit Rosmarinic tăng lưu lượng tuần hoàn máu lên vỏ não, nâng cao trí nhớ và độ sắc bén tư duy.',
    aromaProfile: 'Hương thơm thông rừng quý phái, thanh khiết và bền bỉ trong khứu giác.',
  },
]

type LightSpectrumMode = 'dual' | 'blue-leaf' | 'red-oil' | 'aesthetic'

export function ArtisanIndoorMedicinalHerbGardenAtelier({ className }: { className?: string } = {}) {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('huong-nhu-sa')
  const [photoperiodHours, setPhotoperiodHours] = useState<number>(14)
  const [spectrumMode, setSpectrumMode] = useState<LightSpectrumMode>('dual')
  const [dripFrequency, setDripFrequency] = useState<'2x' | 'sensor'>('sensor')
  
  // Consultation form state
  const [spaceType, setSpaceType] = useState<string>('logia')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const headingId = useId()
  const activeRecipe = TEA_RECIPES.find((r) => r.id === selectedRecipeId) ?? TEA_RECIPES[0]!

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Biophilic & Plant Grow Spectrum Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-emerald-950/25 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-rose-950/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs tracking-widest text-emerald-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Nông Nghiệp Vi Khí Hậu Dinh Thự
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Vườn Thảo Mộc Gốm Bát Tràng &amp; Quầy Trà Tươi Cắt Tại Chỗ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Hệ thống giàn treo gốm nung củi mộc bản địa tích hợp tưới nhỏ giọt tự động và dải quang phổ sinh học 450nm &amp; 660nm. 
            Mỗi sớm mai, gia chủ tự tay thu hoạch những búp hương nhu, bạc hà Nam Bộ và hương thảo tươi mọng đẫm sương, 
            pha chế thành những tách trà dược liệu thượng hạng với mã tư vấn độc quyền <span className="font-mono text-emerald-300">GU-HERB-2026-X</span>.
          </p>
        </div>

        {/* Interactive Garden & Tea Atelier Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Tea Recipe Studio & Fresh Brew Ritual */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-medium">
                      Nghi Thức Pha Trà Thảo Mộc Tươi Sớm Mai
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeRecipe.name}
                    </h3>
                  </div>

                  {/* Botanical Purity Badges */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">100% Organic</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">Gốm Bát Tràng</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">Zero Hóa Chất</span>
                  </div>
                </div>

                {/* Recipe Selector Tabs */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TEA_RECIPES.map((recipe) => {
                    const isSelected = recipe.id === selectedRecipeId
                    return (
                      <button
                        key={recipe.id}
                        type="button"
                        onClick={() => setSelectedRecipeId(recipe.id)}
                        className={cn(
                          'rounded-xl border p-2.5 text-left transition-all duration-300',
                          isSelected
                            ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-100 shadow'
                            : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div className="text-[10px] font-mono text-emerald-400">
                          {recipe.season.split('•')[0]}
                        </div>
                        <div className="mt-1 font-serif text-xs font-medium text-stone-200 line-clamp-2">
                          {recipe.name}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Active Recipe Brewing Card */}
                <div className="mt-6 rounded-xl border border-emerald-900/60 bg-gradient-to-br from-stone-900 via-emerald-950/20 to-stone-950 p-6 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800/80">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                        🍵
                      </span>
                      <div>
                        <div className="text-xs text-stone-400">Thời điểm uống lý tưởng:</div>
                        <div className="text-xs font-serif text-emerald-300">{activeRecipe.season}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div>
                        <span className="text-stone-500">Nhiệt độ hãm: </span>
                        <span className="text-amber-400 font-semibold">{activeRecipe.temperature}</span>
                      </div>
                      <div>
                        <span className="text-stone-500">Thời gian ủ: </span>
                        <span className="text-cyan-400 font-semibold">{activeRecipe.infusionTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Checklist */}
                  <div className="mt-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                      Định Lượng Nguyên Liệu Cắt Tại Vườn:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                      {activeRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Medicinal & Aroma Descriptions */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800/80 text-xs">
                    <div className="rounded-lg bg-stone-900/60 p-3 border border-stone-800/50">
                      <span className="font-mono text-amber-300 uppercase text-[10px] block mb-1">
                        Dược Tính Trị Liệu:
                      </span>
                      <p className="text-stone-300 leading-relaxed font-light">
                        {activeRecipe.medicinalBenefit}
                      </p>
                    </div>
                    <div className="rounded-lg bg-stone-900/60 p-3 border border-stone-800/50">
                      <span className="font-mono text-emerald-300 uppercase text-[10px] block mb-1">
                        Hương Thơm Thảo Mộc:
                      </span>
                      <p className="text-stone-300 leading-relaxed font-light">
                        {activeRecipe.aromaProfile}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Craft Ceramic Note */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-xs text-stone-400 leading-relaxed">
                <span className="font-serif text-amber-300 font-medium">Kỹ Nghệ Gốm Mộc Bát Tràng: </span>
                Các chậu treo được vuốt tay từ đất sét phù sa sông Hồng nung củi ở nhiệt độ 1.250°C. Thân gốm có độ xốp vi mô hoàn hảo giúp rễ thảo mộc thở tự nhiên, hoàn toàn không bị ngập úng trong mùa mưa ẩm phương Nam.
              </div>
            </div>

            {/* Right 5 cols: Grow Lights, Drip Controller & Bespoke Consultation Form */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Photoperiod & Light Spectrum Controller */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                      Bộ Điều Khiển Quang Phổ Sinh Học
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">LED 450nm &amp; 660nm</span>
                </div>

                {/* Spectrum Mode Selector */}
                <div className="mt-4">
                  <span className="text-xs text-stone-300 font-medium">Chế Độ Quang Phổ Dược Liệu:</span>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setSpectrumMode('dual')}
                      className={cn(
                        'rounded-lg border p-2 text-left transition-all',
                        spectrumMode === 'dual'
                          ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400'
                      )}
                    >
                      <div className="font-mono font-semibold text-[11px]">Kép (450 + 660nm)</div>
                      <div className="text-[10px] text-stone-400">Tối đa hóa tinh dầu</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpectrumMode('blue-leaf')}
                      className={cn(
                        'rounded-lg border p-2 text-left transition-all',
                        spectrumMode === 'blue-leaf'
                          ? 'border-cyan-500 bg-cyan-950/60 text-cyan-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400'
                      )}
                    >
                      <div className="font-mono font-semibold text-[11px]">450nm Xanh Lam</div>
                      <div className="text-[10px] text-stone-400">Lá dày &amp; xanh giòn</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpectrumMode('red-oil')}
                      className={cn(
                        'rounded-lg border p-2 text-left transition-all',
                        spectrumMode === 'red-oil'
                          ? 'border-rose-500 bg-rose-950/60 text-rose-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400'
                      )}
                    >
                      <div className="font-mono font-semibold text-[11px]">660nm Đỏ Sâu</div>
                      <div className="text-[10px] text-stone-400">Kích thích hoa &amp; rễ</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSpectrumMode('aesthetic')}
                      className={cn(
                        'rounded-lg border p-2 text-left transition-all',
                        spectrumMode === 'aesthetic'
                          ? 'border-amber-500 bg-amber-950/60 text-amber-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400'
                      )}
                    >
                      <div className="font-mono font-semibold text-[11px]">4000K Warm White</div>
                      <div className="text-[10px] text-stone-400">Ánh sáng nội thất sang</div>
                    </button>
                  </div>
                </div>

                {/* Photoperiod Slider */}
                <div className="mt-4 pt-3 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span>Quang Chu Kỳ Chiếu Sáng:</span>
                    <span className="font-mono text-emerald-400 font-semibold">{photoperiodHours} Giờ/Ngày</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    value={photoperiodHours}
                    onChange={(e) => setPhotoperiodHours(Number(e.target.value))}
                    aria-label="Quang chu kỳ chiếu sáng đèn LED thảo dược"
                    className="mt-2 w-full accent-emerald-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>8h (Mùa Đông)</span>
                    <span>14h (Chuẩn Kích Dầu)</span>
                    <span>18h (Tăng Trưởng Nhanh)</span>
                  </div>
                </div>

                {/* Automated Drip Irrigation Toggle */}
                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                  <div className="text-xs">
                    <div className="text-stone-300 font-medium">Tưới Nhỏ Giọt Sinh Học:</div>
                    <div className="text-[10px] text-stone-500">Bộ châm phân bón vi sinh trùn quế</div>
                  </div>
                  <div className="flex rounded-md border border-stone-800 p-0.5 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setDripFrequency('2x')}
                      className={cn(
                        'rounded px-2 py-1 transition-colors',
                        dripFrequency === '2x' ? 'bg-emerald-950 text-emerald-300' : 'text-stone-400'
                      )}
                    >
                      Cố Định 2 Lần/Ngày
                    </button>
                    <button
                      type="button"
                      onClick={() => setDripFrequency('sensor')}
                      className={cn(
                        'rounded px-2 py-1 transition-colors',
                        dripFrequency === 'sensor' ? 'bg-emerald-950 text-emerald-300' : 'text-stone-400'
                      )}
                    >
                      Cảm Biến Ẩm Rễ
                    </button>
                  </div>
                </div>
              </div>

              {/* Bespoke Consultation Form with VIP Code */}
              <div className="rounded-xl border border-emerald-900/60 bg-stone-950/90 p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h4 className="font-serif text-sm text-stone-200 font-medium">
                    Tư Vấn Thiết Kế Vườn Thảo Dược Dinh Thự
                  </h4>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
                    VIP: GU-HERB-2026-X
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="mt-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 p-4 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                    <p className="font-serif text-emerald-200 text-sm">
                      Yêu cầu khảo sát đã được tiếp nhận thành công.
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      Chuyên gia sinh thái cảnh quan GuHomes sẽ liên hệ gửi bản vẽ bố trí vi khí hậu trong vòng 24 giờ.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                        Không Gian Dự Kiến:
                      </label>
                      <select
                        value={spaceType}
                        onChange={(e) => setSpaceType(e.target.value)}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="logia">Logia Master Phòng Khách (6 – 12m²)</option>
                        <option value="atrium">Giếng Trời Thông Tầng Penthouse (15 – 30m²)</option>
                        <option value="kitchen-island">Quầy Bar / Đảo Bếp Kẹp Thảo Mộc Tươi</option>
                        <option value="rooftop">Sân Thượng Biệt Thự Sông</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                        Số Điện Thoại / Zalo Gia Chủ:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-gradient-to-r from-emerald-800 to-emerald-600 px-4 py-2.5 text-xs font-medium text-emerald-100 hover:from-emerald-700 hover:to-emerald-500 transition-all shadow-md"
                    >
                      <span>Gửi Bản Yêu Cầu Thiết Kế (Mã GU-HERB-2026-X)</span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="mt-3 text-[10px] text-stone-500 text-center">
                  Gói dịch vụ gồm giàn treo gốm, giống cây dược liệu thuần chủng và hệ vi tưới tự động.
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
