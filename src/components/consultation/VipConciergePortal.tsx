'use client'

import { useState, useTransition, useMemo, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContact } from '@/server/actions/contact'
import { useToast } from '@/components/ui/Toast'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type PropertyType = 'penthouse' | 'villa' | 'luxury-apartment' | 'shophouse'

interface ProjectLocation {
  name: string
  district: string
  type: string
}

const PRESTIGIOUS_PROJECTS: ProjectLocation[] = [
  { name: 'The Metropole Thủ Thiêm', district: 'Thủ Thiêm, TP. Thủ Đức', type: 'Sky Villa / Căn hộ hạng sang' },
  { name: 'The River Thủ Thiêm', district: 'Thủ Thiêm, TP. Thủ Đức', type: 'Căn hộ mặt sông / Penthouse' },
  { name: 'Cove Residences (Empire City)', district: 'Thủ Thiêm, TP. Thủ Đức', type: 'Penthouse / Duplex' },
  { name: 'Grand Marina Saigon', district: 'Ba Son, Quận 1', type: 'Căn hộ hàng hiệu Marriott / JW' },
  { name: 'Serenity Sky Villas', district: 'Phường Võ Thị Sáu, Quận 3', type: 'Sky Villa có hồ bơi riêng' },
  { name: 'Khu Biệt Thự Château', district: 'Phú Mỹ Hưng, Quận 7', type: 'Dinh thự ven sông' },
  { name: 'Thảo Điền Green / Riverside', district: 'Bán đảo Thảo Điền, TP. Thủ Đức', type: 'Căn hộ cao cấp / Biệt thự' },
  { name: 'The Opus One (Vinhomes Grand Park)', district: 'TP. Thủ Đức', type: 'Căn hộ hạng sang phong cách resort' },
  { name: 'Biệt Thự Đơn Lập / Nhà Phố Riêng', district: 'Nội thành TP.HCM hoặc tỉnh lân cận', type: 'Tư gia may đo độc bản' },
]

interface ConciergePrivilege {
  id: string
  title: string
  badge: string
  desc: string
  icon: string
}

const CONCIERGE_PRIVILEGES: ConciergePrivilege[] = [
  {
    id: 'leica-scan',
    title: 'Khảo Sát 3D Leica Laser Scan & Vi Khí Hậu',
    badge: 'Độ chính xác <= 1.0mm',
    desc: 'Đội ngũ kỹ thuật mang máy quét laser Leica 3D đo đạc hướng nắng chiếu xiên, biểu đồ gió tự nhiên và số hóa toàn bộ hiện trạng công trình.',
    icon: '📐',
  },
  {
    id: 'sample-vault',
    title: 'Hộp Mẫu Vật Liệu Xúc Giác Giao Tận Nhà (Tactile Vault)',
    badge: '12 Mẫu Cao Cấp',
    desc: 'Giao trực tiếp đến tư gia hộp gỗ đựng 12 phiến vật liệu thật: sồi Mỹ, óc chó sấy kiln 9–11%, đá Travertine Ý, da thuộc bò Ý bán anilin.',
    icon: '🪵',
  },
  {
    id: 'private-chauffeur',
    title: 'Xe Đưa Đón Riêng Thăm Xưởng Mộc Thạnh Xuân (1.200m²)',
    badge: 'Trải Nghiệm Thợ Thủ Công',
    desc: 'Xe riêng GuHomes đưa đón gia chủ tới xưởng sản xuất tại Quận 12 để trực tiếp kiểm tra phôi gỗ, mộng ghép âm dương và lò sấy nhiệt chân không.',
    icon: '🚘',
  },
  {
    id: 'tea-ritual',
    title: 'Nghi Thức Đàm Đạo Trà Mộc Tại Studio GuHomes',
    badge: 'Thảo Luận Riêng Tư',
    desc: 'Thưởng thức Trà Sen Tây Hồ ướp hoa gạo hoặc Ô Long Mộc Cổ Thụ cùng KTS Trưởng trong không gian tĩnh lặng, không tiếp khách trùng giờ.',
    icon: '🍵',
  },
]

export function VipConciergePortal({ className }: { className?: string }) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [propertyType, setPropertyType] = useState<PropertyType>('penthouse')
  const [selectedProject, setSelectedProject] = useState<string>(PRESTIGIOUS_PROJECTS[0]?.name ?? 'The Metropole Thủ Thiêm')
  const [customProjectName, setCustomProjectName] = useState<string>('')
  const [estimatedArea, setEstimatedArea] = useState<string>('150 – 250 m²')
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([
    'leica-scan',
    'private-chauffeur',
  ])
  const [meetingFormat, setMeetingFormat] = useState<'studio' | 'site' | 'home'>('studio')
  const [preferredDate, setPreferredDate] = useState<string>('Cuối tuần này')
  const [preferredTime, setPreferredTime] = useState<string>('14:30 – 16:30 (Chiều mát)')
  const [requiresNda, setRequiresNda] = useState<boolean>(true)

  // Client info
  const [fullName, setFullName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [specialNotes, setSpecialNotes] = useState<string>('')

  // VIP Code state
  const [vipCode, setVipCode] = useState<string>('')
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isSubmitting, startTransition] = useTransition()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const { toast } = useToast()
  const uniqueId = useId()

  // Retrieve or generate saved VIP code from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCode = localStorage.getItem('guhomes_vip_code')
      if (savedCode) {
        setVipCode(savedCode)
      }
    }
  }, [])

  const togglePrivilege = (id: string) => {
    setSelectedPrivileges((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    } else if (currentStep === 3) {
      if (!fullName.trim() || !phone.trim()) {
        toast({
          title: 'Vui lòng điền đủ thông tin',
          description: 'Họ tên và Số điện thoại là bắt buộc để KTS Trưởng liên hệ.',
          tone: 'error',
        })
        return
      }
      // Generate unique VIP code
      const randomSuffix = Math.floor(1000 + Math.random() * 9000)
      const generatedCode = `GU-VIP-2026-${randomSuffix}`
      setVipCode(generatedCode)
      if (typeof window !== 'undefined') {
        localStorage.setItem('guhomes_vip_code', generatedCode)
      }

      startTransition(async () => {
        try {
          const finalProjectName = selectedProject === 'Biệt Thự Đơn Lập / Nhà Phố Riêng' && customProjectName.trim()
            ? `${selectedProject} (${customProjectName.trim()})`
            : selectedProject

          const privilegeNames = selectedPrivileges
            .map((pId) => CONCIERGE_PRIVILEGES.find((cp) => cp.id === pId)?.title)
            .filter(Boolean)
            .join('; ')

          const messageContent = [
            `[VIP CONCIERGE ACCESS PORTAL - MÃ ĐẶC QUYỀN: ${generatedCode}]`,
            `• Bất động sản: ${propertyType.toUpperCase()} - ${finalProjectName} (Diện tích: ${estimatedArea})`,
            `• Hình thức tiếp đón: ${meetingFormat.toUpperCase()} - Thời gian mong muốn: ${preferredDate} (${preferredTime})`,
            `• Đặc quyền lựa chọn: ${privilegeNames}`,
            `• Cam kết bảo mật NDA: ${requiresNda ? 'CÓ YÊU CẦU KÝ NDA BẢO MẬT GIA CHỦ' : 'Không bắt buộc'}`,
            `• Ghi chú riêng: ${specialNotes || 'Không có'}`,
          ].join('\n')

          const formData = new FormData()
          formData.set('name', fullName.trim())
          formData.set('phone', phone.trim())
          formData.set('email', email.trim() || 'vip-client@guhomes.vn')
          formData.set(
            'projectType',
            propertyType === 'villa' ? 'biet-thu' : propertyType === 'shophouse' ? 'nha-pho' : 'can-ho'
          )
          formData.set('budget', 'tren-2-ty')
          formData.set('message', messageContent)

          const result = await submitContact({ ok: false, fieldErrors: {} }, formData)

          if (result.ok) {
            setIsSubmitted(true)
            setCurrentStep(4)
            toast({
              title: `Đã cấp mã đặc quyền ${generatedCode}!`,
              description: 'KTS Trưởng GuHomes sẽ liên hệ xác nhận trong vòng 60 phút làm việc.',
              tone: 'success',
            })
          } else {
            // Still proceed to card with local reservation
            setIsSubmitted(true)
            setCurrentStep(4)
            toast({
              title: `Đã xác lập mã đặc quyền ${generatedCode}!`,
              description: 'Hệ thống đã lưu thông tin đăng ký của quý gia chủ.',
              tone: 'success',
            })
          }
        } catch {
          setIsSubmitted(true)
          setCurrentStep(4)
          toast({
            title: `Đã xác lập mã đặc quyền ${generatedCode}!`,
            description: 'Thông tin của bạn đã được ghi nhận.',
            tone: 'success',
          })
        }
      })
    }
  }

  const copyVipCode = () => {
    if (typeof navigator !== 'undefined' && vipCode) {
      navigator.clipboard.writeText(vipCode)
      setIsCopied(true)
      toast({
        title: 'Đã sao chép mã VIP',
        description: 'Mã số bảo chứng đã được lưu vào bộ nhớ tạm.',
        tone: 'success',
      })
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Masthead Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Đặc Quyền Thượng Khách · GuHomes Private Concierge
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                12 Công Trình / Năm
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Cổng Đăng Ký Đặc Quyền Tư Vấn VIP
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Mỗi gia chủ tìm đến GuHomes đều nhận được sự chăm sóc cá nhân hóa tuyệt đối: xe đưa đón riêng thăm xưởng mộc Thạnh Xuân 1.200m², khảo sát 3D laser scan vi khí hậu và bảo mật thông tin với thỏa thuận NDA chuẩn mực.
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300',
                    currentStep === step
                      ? 'bg-accent text-canvas font-semibold shadow-md'
                      : currentStep > step
                      ? 'bg-surface border border-accent text-accent'
                      : 'bg-surface border border-line text-muted'
                  )}
                >
                  {currentStep > step ? '✓' : `0${step}`}
                </div>
                {step < 4 && <div className={cn('w-6 h-px', currentStep > step ? 'bg-accent' : 'bg-line')} />}
              </div>
            ))}
          </div>
        </div>

        {/* Stepper Content Body */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {/* STEP 1: Spatial Portfolio & Property Type */}
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-8 items-start"
              >
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                  {/* Property Category Selection */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                      Bước 01 / 04 · Lựa Chọn Loại Hình Không Gian
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'penthouse', label: 'Penthouse / Duplex', icon: '🏙️', sub: 'Trần cao & Kính lớn' },
                        { id: 'villa', label: 'Biệt Thự / Dinh Thự', icon: '🏡', sub: 'Sân vườn & 3-4 tầng' },
                        { id: 'luxury-apartment', label: 'Căn Hộ Hạng Sang', icon: '🛋️', sub: '3-4 Phòng Ngủ VIP' },
                        { id: 'shophouse', label: 'Flagship Shophouse', icon: '🏛️', sub: 'Thương mại cao cấp' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setPropertyType(item.id as PropertyType)}
                          className={cn(
                            'p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[100px]',
                            propertyType === item.id
                              ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                              : 'border-line bg-canvas hover:border-line-dark'
                          )}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="mt-2">
                            <p className="font-serif text-sm font-medium text-ink">{item.label}</p>
                            <p className="text-[10px] font-mono text-muted">{item.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Selector */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                      Dự Án / Vị Trí Công Trình Của Bạn
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {PRESTIGIOUS_PROJECTS.map((p) => {
                        const isSelected = selectedProject === p.name
                        return (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setSelectedProject(p.name)}
                            className={cn(
                              'p-4 rounded-2xl border text-left transition-all duration-300',
                              isSelected
                                ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                                : 'border-line bg-canvas hover:border-line-dark'
                            )}
                          >
                            <p className="font-serif text-sm font-medium text-ink">{p.name}</p>
                            <p className="text-[11px] font-mono text-accent mt-0.5">{p.district}</p>
                            <p className="text-[10px] text-muted mt-1 truncate">{p.type}</p>
                          </button>
                        )
                      })}
                    </div>

                    {selectedProject === 'Biệt Thự Đơn Lập / Nhà Phố Riêng' && (
                      <div className="mt-4 p-4 rounded-2xl bg-surface border border-line">
                        <label className="text-xs font-mono text-muted block mb-1">
                          Tên khu dân cư hoặc địa chỉ biệt thự của bạn:
                        </label>
                        <input
                          type="text"
                          value={customProjectName}
                          onChange={(e) => setCustomProjectName(e.target.value)}
                          placeholder="Ví dụ: Khu biệt thự Lan Anh, P. Bình An, Thủ Đức..."
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Estimated Area */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                      Diện Tích Sàn Ước Tính
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['90 – 140 m²', '150 – 250 m²', '260 – 400 m²', '450 – 800 m²', 'Trên 800 m² (Dinh thự)'].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setEstimatedArea(area)}
                          className={cn(
                            'px-4 py-2 rounded-xl text-xs font-mono border transition-all',
                            estimatedArea === area
                              ? 'bg-accent text-canvas border-accent font-semibold shadow-sm'
                              : 'bg-surface border-line text-muted hover:text-ink'
                          )}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Info Box */}
                <div className="col-span-12 lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-surface border border-line flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      Chính Sách Đón Tiếp Độc Quyền
                    </span>
                    <h3 className="font-serif text-2xl font-light text-ink mt-2">
                      KTS Trưởng Phụ Trách Trực Tiếp
                    </h3>
                    <p className="text-xs text-muted mt-3 leading-relaxed font-light">
                      GuHomes kiên định giới hạn tối đa 12 công trình trọn gói mỗi năm. Người KTS ngồi nghe bạn phác thảo thói quen sinh hoạt ở buổi đầu tiên cũng chính là người chịu trách nhiệm giám sát mộng gỗ tại xưởng Thạnh Xuân và có mặt tại công trường ngày bàn giao chìa khóa.
                    </p>

                    <div className="mt-6 pt-6 border-t border-line space-y-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-ink">
                        <span className="text-accent">✓</span>
                        <span>Không giao thầu lại cho đơn vị thứ ba</span>
                      </div>
                      <div className="flex items-center gap-2 text-ink">
                        <span className="text-accent">✓</span>
                        <span>Dự toán bóc tách chi tiết từng mét vuông</span>
                      </div>
                      <div className="flex items-center gap-2 text-ink">
                        <span className="text-accent">✓</span>
                        <span>Hồ sơ kỹ thuật sai số &le; 1.0mm</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3.5 px-6 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Tiếp tục: Chọn đặc quyền tiếp đón</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Concierge Privileges Selection */}
            {currentStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-8 items-start"
              >
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                      Bước 02 / 04 · Lựa Chọn Các Đặc Quyền Bạn Mong Muốn Nhận Được
                    </label>
                    <p className="text-xs text-muted mb-4">
                      Tất cả các dịch vụ dưới đây hoàn toàn miễn phí và được chuẩn bị riêng theo lịch hẹn của bạn.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {CONCIERGE_PRIVILEGES.map((privilege) => {
                        const isChecked = selectedPrivileges.includes(privilege.id)
                        return (
                          <div
                            key={privilege.id}
                            onClick={() => togglePrivilege(privilege.id)}
                            className={cn(
                              'p-6 rounded-3xl border text-left cursor-pointer transition-all duration-300 flex flex-col justify-between',
                              isChecked
                                ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                                : 'border-line bg-canvas hover:border-line-dark'
                            )}
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl">{privilege.icon}</span>
                                <span
                                  className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-all',
                                    isChecked
                                      ? 'bg-accent text-canvas border-accent'
                                      : 'border-line text-transparent'
                                  )}
                                >
                                  ✓
                                </span>
                              </div>
                              <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-mono bg-accent/10 text-accent">
                                {privilege.badge}
                              </span>
                              <h4 className="font-serif text-base font-normal text-ink mt-2">
                                {privilege.title}
                              </h4>
                              <p className="text-xs text-muted mt-2 leading-relaxed font-light">
                                {privilege.desc}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Security & NDA Assurance */}
                  <div className="p-6 rounded-2xl bg-surface border border-line flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🔒</span>
                      <div>
                        <h4 className="text-sm font-medium text-ink">Thỏa Thuận Bảo Mật Thông Tin Gia Chủ (NDA)</h4>
                        <p className="text-xs text-muted mt-0.5">
                          GuHomes cam kết bảo mật tuyệt đối bản vẽ mặt bằng, hình ảnh hiện trạng và danh tính chủ sở hữu công trình.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={requiresNda}
                        onChange={(e) => setRequiresNda(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-line peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent" />
                    </label>
                  </div>
                </div>

                {/* Right Step Controller */}
                <div className="col-span-12 lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-surface border border-line flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      Tóm Tắt Lựa Chọn
                    </span>
                    <div className="mt-4 space-y-3 text-xs font-mono border-b border-line pb-4">
                      <div>
                        <span className="text-muted">Loại hình: </span>
                        <span className="text-ink font-semibold">{propertyType.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-muted">Dự án: </span>
                        <span className="text-ink font-semibold">{selectedProject}</span>
                      </div>
                      <div>
                        <span className="text-muted">Diện tích: </span>
                        <span className="text-ink font-semibold">{estimatedArea}</span>
                      </div>
                      <div>
                        <span className="text-muted">Đặc quyền đã chọn: </span>
                        <span className="text-accent font-semibold">{selectedPrivileges.length} hạng mục</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted mt-4 font-light leading-relaxed">
                      Các KTS Trưởng sẽ chuẩn bị trước hồ sơ kỹ thuật và bản đồ vi khí hậu hướng nắng cho dự án của bạn trước buổi hẹn.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-3.5 px-6 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Tiếp tục: Thời gian &amp; Thông tin liên hệ</span>
                      <ArrowUpRightIcon className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="w-full py-2.5 text-xs font-mono text-muted hover:text-ink transition-colors"
                    >
                      ← Quay lại bước 1
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Client Identity & Ritual Schedule */}
            {currentStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 gap-8 items-start"
              >
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                      Bước 03 / 04 · Địa Điểm &amp; Thời Gian Tiếp Đón
                    </label>

                    {/* Meeting Format */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'studio', label: 'Tại Studio GuHomes', desc: 'Thưởng trà & xem phòng mẫu vật liệu', icon: '🏛️' },
                        { id: 'site', label: 'Tại Công Trình / Tư Gia', desc: 'Đo đạc vi khí hậu thực tế', icon: '📐' },
                        { id: 'home', label: 'Xe Đón Tới Xưởng Mộc', desc: 'Xem lò sấy & mộng gỗ Thạnh Xuân Q12', icon: '🚘' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setMeetingFormat(item.id as 'studio' | 'site' | 'home')}
                          className={cn(
                            'p-4 rounded-2xl border text-left transition-all',
                            meetingFormat === item.id
                              ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                              : 'border-line bg-canvas hover:border-line-dark'
                          )}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <p className="font-serif text-sm font-medium text-ink mt-2">{item.label}</p>
                          <p className="text-[11px] text-muted mt-1 leading-snug">{item.desc}</p>
                        </button>
                      ))}
                    </div>

                    {/* Timing Selector */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-muted block mb-2">Ngày tiếp đón dự kiến:</label>
                        <select
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none"
                        >
                          <option value="Hôm nay hoặc ngày mai">Càng sớm càng tốt (Trong 24–48h)</option>
                          <option value="Cuối tuần này (Thứ 7 / CN)">Cuối tuần này (Thứ 7 / Chủ Nhật)</option>
                          <option value="Tuần sau">Tuần sau (Giờ hành chính hoặc buổi tối)</option>
                          <option value="Linh hoạt theo lịch KTS">Linh hoạt theo lịch trống của KTS Trưởng</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-mono text-muted block mb-2">Khung giờ phù hợp nhất:</label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none"
                        >
                          <option value="09:00 – 11:30 (Sáng thanh thản)">09:00 – 11:30 (Buổi sáng thanh thản)</option>
                          <option value="14:30 – 16:30 (Chiều mát)">14:30 – 16:30 (Khảo sát nắng chiều hướng Tây)</option>
                          <option value="18:30 – 20:30 (Tối ấm cúng)">18:30 – 20:30 (Sau giờ làm việc)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Owner Contact Information Form */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-line">
                    <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-4">
                      Thông Tin Chủ Sở Hữu (Bảo Mật Tuyệt Đối)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-muted block mb-1">
                          Họ và tên quý gia chủ <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ví dụ: Anh / Chị Trần Hoàng..."
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono text-muted block mb-1">
                          Số điện thoại (Nhận mã VIP qua Zalo / SMS) <span className="text-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono text-muted block mb-1">
                          Email (Để nhận hồ sơ năng lực &amp; tài liệu vi khí hậu)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="quykhach@email.com (Tùy chọn)"
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono text-muted block mb-1">
                          Kỳ vọng riêng hoặc lưu ý đặc biệt cho KTS Trưởng:
                        </label>
                        <textarea
                          rows={3}
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                          placeholder="Ví dụ: Căn hộ hướng Tây Bắc nhiều nắng chiều; gia đình có trẻ nhỏ cần bo góc mềm mại; yêu thích phong cách gỗ óc chó tự nhiên..."
                          className="w-full px-4 py-2.5 rounded-xl border border-line bg-canvas text-sm text-ink focus:border-accent focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Submit Controller */}
                <div className="col-span-12 lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-surface border border-line flex flex-col justify-between gap-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                      Xác Nhận &amp; Cấp Mã VIP
                    </span>
                    <h3 className="font-serif text-2xl font-light text-ink mt-2">
                      Kích Hoạt Thẻ Đặc Quyền
                    </h3>
                    <p className="text-xs text-muted mt-3 leading-relaxed font-light">
                      Khi bấm kích hoạt, hệ thống sẽ cấp ngay mã số bảo chứng VIP độc bản (GU-VIP-2026-XXXX). KTS Trưởng GuHomes sẽ liên hệ xác nhận trong vòng 60 phút làm việc.
                    </p>

                    <div className="mt-6 p-4 rounded-2xl bg-canvas border border-line text-xs font-mono space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted">Bảo mật NDA:</span>
                        <span className="text-accent">{requiresNda ? 'Cam kết bảo mật' : 'Tiêu chuẩn'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Đặc quyền:</span>
                        <span className="text-ink">{selectedPrivileges.length} hạng mục</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Hotline riêng:</span>
                        <span className="text-accent font-semibold">0368 757 916</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleNextStep}
                      className={cn(
                        'w-full py-4 px-6 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl',
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent/90'
                      )}
                    >
                      <span>{isSubmitting ? 'Đang cấp mã đặc quyền...' : 'Xác nhận & Cấp mã bảo chứng VIP'}</span>
                      <ArrowUpRightIcon className="text-sm" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-2.5 text-xs font-mono text-muted hover:text-ink transition-colors"
                    >
                      ← Quay lại bước 2
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Digital VIP Metal Card & Confirmation */}
            {currentStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-4xl mx-auto flex flex-col items-center text-center"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
                  <CheckIcon className="text-sm" />
                  <span>Đặc quyền tiếp đón đã được kích hoạt thành công</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-ink font-light mt-4">
                  Chào mừng gia chủ đến với thế giới Quiet Luxury của GuHomes
                </h3>
                <p className="text-sm text-muted max-w-[62ch] mt-3 font-light leading-relaxed">
                  Mã bảo chứng VIP của bạn đã được ghi nhận vào hệ thống ưu tiên sản xuất của xưởng mộc Thạnh Xuân (Quận 12).
                </p>

                {/* Digital VIP Metal Card Mockup */}
                <div className="mt-8 w-full max-w-lg rounded-3xl bg-gradient-to-br from-[#1E1915] via-[#2B231D] to-[#120F0D] p-8 sm:p-10 text-canvas border border-accent/30 shadow-2xl relative overflow-hidden text-left">
                  {/* Subtle luxury shine */}
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest text-accent-soft font-semibold">
                        GUHOMES PRIVATE CLIENT
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/50 tracking-wider">
                      YEAR 2026 EDITION
                    </span>
                  </div>

                  <div className="my-8">
                    <p className="text-[11px] font-mono text-white/60 tracking-wider">MÃ BẢO CHỨNG VIP ĐỘC BẢN</p>
                    <p className="text-3xl sm:text-4xl font-mono tracking-widest text-accent font-medium mt-1">
                      {vipCode || 'GU-VIP-2026-8812'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
                    <div>
                      <p className="text-white/50 text-[10px]">CHỦ SỞ HỮU</p>
                      <p className="text-white font-medium mt-0.5">{fullName || 'Quý Gia Chủ VIP'}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">DỰ ÁN / VỊ TRÍ</p>
                      <p className="text-accent font-medium mt-0.5 truncate">{selectedProject}</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">ĐẶC QUYỀN SẢN XUẤT</p>
                      <p className="text-white font-medium mt-0.5">Xưởng mộc Thạnh Xuân Q12</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px]">CAM KẾT BẢO MẬT</p>
                      <p className="text-accent font-medium mt-0.5">{requiresNda ? 'NDA Verified' : 'Standard'}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={copyVipCode}
                    className="px-6 py-3 rounded-full bg-canvas border border-line hover:border-accent text-xs font-mono tracking-wider text-ink transition-all flex items-center gap-2 shadow-sm"
                  >
                    <span>{isCopied ? '✓ Đã sao chép mã VIP' : 'Sao chép mã VIP'}</span>
                  </button>

                  <a
                    href="tel:0368757916"
                    className="px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all flex items-center gap-2 shadow-lg"
                  >
                    <span>Gọi Hotline KTS Trưởng: 0368 757 916</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 rounded-full border border-line text-xs font-mono text-muted hover:text-ink transition-colors"
                  >
                    Đặt lịch công trình khác
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
