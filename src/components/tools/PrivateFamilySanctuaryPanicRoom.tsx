'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export function PrivateFamilySanctuaryPanicRoom({ className }: { className?: string } = {}) {
  const [pinCode, setPinCode] = useState<string>('')
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false)
  const [biometricScanning, setBiometricScanning] = useState<boolean>(false)
  const [activeCam, setActiveCam] = useState<'cam1' | 'cam2' | 'cam3'>('cam1')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [estateLocation, setEstateLocation] = useState<string>('Thảo Điền, TP. Thủ Đức')

  const vipPasscode = 'GU-SAFE-2026-X'

  const handleDigit = (digit: string) => {
    if (pinCode.length < 4) {
      const next = pinCode + digit
      setPinCode(next)
      if (next === '2026' || next === '8888') {
        setTimeout(() => setIsUnlocked(true), 300)
      }
    }
  }

  const handleClearPin = () => {
    setPinCode('')
    setIsUnlocked(false)
  }

  const triggerBiometricScan = () => {
    setBiometricScanning(true)
    setTimeout(() => {
      setBiometricScanning(false)
      setIsUnlocked(true)
      setPinCode('BIOM')
    }, 1200)
  }

  const handleLock = () => {
    setIsUnlocked(false)
    setPinCode('')
  }

  const handleSubmitConsultation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Phòng An Toàn Trú Ẩn Gia Tộc Panic Room Dinh Thự"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background defensive ambiance */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-red-950/15 blur-[140px]" />
        <div className="absolute -bottom-20 right-10 h-96 w-96 rounded-full bg-stone-800/30 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(120,40,40,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1 text-xs tracking-widest text-red-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            Lá Chắn An Mật Tối Thượng Dinh Thự
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng An Toàn Gia Tộc Giấu Cánh Walk-in Closet
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Ngụy trang 100% sau hệ tủ áo gỗ Walnut Bắc Mỹ. Cửa thép đúc chống đạn tiêu chuẩn NIJ Level IV & chống cháy 240 phút, 
            trang bị hệ thống lọc dưỡng khí CBRN 72 giờ, pin lưu điện 15 kWh và liên lạc vệ tinh Iridium độc lập.
          </p>
        </div>

        {/* Secret Door Interactive Simulator & Vital Dashboard */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 cols: Hidden Door Access Panel */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'h-2.5 w-2.5 rounded-full',
                        isUnlocked ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'
                      )}
                    />
                    <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                      {isUnlocked ? 'Cửa Thép Đã Mở Chốt Cơ Khí' : 'Trạng Thái Khóa Bảo Mật 6 Chấu'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    NIJ Level IV · ASTM F3038
                  </span>
                </div>

                {/* Secret Door Mockup */}
                <div className="mt-6 relative h-48 sm:h-56 rounded-xl border border-stone-800 bg-stone-900 overflow-hidden flex items-center justify-center p-4">
                  {/* Walnut Wood Texture Background */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-r from-amber-950/70 via-stone-900 to-amber-950/60 transition-transform duration-700 ease-out flex items-center justify-center',
                      isUnlocked ? 'translate-x-32 sm:translate-x-44 shadow-2xl border-l border-amber-500/30' : 'translate-x-0'
                    )}
                  >
                    <div className="text-center p-4">
                      <span className="text-xs text-amber-200/80 font-serif block">
                        Cánh Tủ Walk-in Closet Gỗ Walnut Tự Nhiên
                      </span>
                      <span className="text-[11px] text-stone-500 mt-1 block">
                        Bản lề pivot chịu lực 1.200 kg tàng hình
                      </span>
                    </div>
                  </div>

                  {/* Vault Interior Revealed */}
                  <div className="absolute inset-0 -z-0 bg-stone-950 flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                      <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-serif text-stone-100">
                      Không Gian Trú Ẩn Gia Tộc Sẵn Sàng
                    </span>
                    <span className="text-xs text-stone-400 mt-1">
                      Áp suất dương +35 Pa · Dưỡng khí 72 giờ chuẩn CBRN
                    </span>
                  </div>
                </div>

                {/* Pin Keypad & Biometric Actions */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-stone-400">
                      Mã PIN bí mật (Thử: <strong className="text-amber-300">2026</strong> hoặc Quét vân tay):
                    </span>
                    <span className="font-mono text-stone-200 text-sm tracking-widest bg-stone-900 px-3 py-1 rounded border border-stone-800">
                      {pinCode ? pinCode.padEnd(4, '•') : '••••'}
                    </span>
                  </div>

                  {/* Keypad Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Xóa', '0', 'Khóa'].map((btn) => {
                      if (btn === 'Xóa') {
                        return (
                          <button
                            key={btn}
                            type="button"
                            onClick={handleClearPin}
                            className="h-11 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-medium transition-colors"
                          >
                            Xóa
                          </button>
                        )
                      }
                      if (btn === 'Khóa') {
                        return (
                          <button
                            key={btn}
                            type="button"
                            onClick={handleLock}
                            className="h-11 rounded-lg bg-stone-900 hover:bg-red-950/60 text-red-300 border border-red-900/30 text-xs font-medium transition-colors"
                          >
                            Khóa Cửa
                          </button>
                        )
                      }
                      return (
                        <button
                          key={btn}
                          type="button"
                          onClick={() => handleDigit(btn)}
                          className="h-11 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 font-mono text-base font-medium transition-colors"
                        >
                          {btn}
                        </button>
                      )
                    })}
                  </div>

                  {/* Optical Biometric Button */}
                  <button
                    type="button"
                    onClick={triggerBiometricScan}
                    disabled={biometricScanning}
                    className="mt-3 w-full h-11 rounded-xl border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg
                      className={cn(
                        'w-4 h-4',
                        biometricScanning ? 'text-amber-400 animate-spin' : 'text-stone-400'
                      )}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 0015.357 2m1.543-5a11.963 11.963 0 00-3.9-3m-6.4 12a4 4 0 01-4-4" />
                    </svg>
                    {biometricScanning ? 'Đang Xác Thực Vân Tay Quang Học...' : 'Quét Vân Tay / Nhận Diện Khuôn Mặt 3D'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right 6 cols: CBRN Life Support Dashboard & Satellite Link */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Bảng Đo Vi Khí Hậu Sinh Tồn CBRN
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Áp Suất Dương +35 Pa (Active)
                  </span>
                </div>

                {/* Gauges Grid */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
                    <span className="text-[11px] text-stone-400 font-mono block">Nồng Độ Oxy O₂</span>
                    <div className="mt-1 font-mono text-2xl font-semibold text-emerald-400">
                      20.9 %
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Tối ưu cho hô hấp sâu</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
                    <span className="text-[11px] text-stone-400 font-mono block">Khí Thải CO₂</span>
                    <div className="mt-1 font-mono text-2xl font-semibold text-stone-200">
                      480 <span className="text-xs text-stone-400">ppm</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Hấp phụ than hoạt tính</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
                    <span className="text-[11px] text-stone-400 font-mono block">Pin Dự Phòng LiFePO4</span>
                    <div className="mt-1 font-mono text-2xl font-semibold text-cyan-400">
                      15.0 <span className="text-xs text-stone-400">kWh</span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Thời lượng 72 giờ liên tục</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
                    <span className="text-[11px] text-stone-400 font-mono block">Vệ Tinh Iridium</span>
                    <div className="mt-1 font-mono text-2xl font-semibold text-amber-300">
                      100 %
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1 block">Không dây ngoại tuyến</span>
                  </div>
                </div>

                {/* CCTV Multi-Camera Switching */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-stone-400 font-mono">Camera Quan Sát 360° Giấu Kín:</span>
                    <div className="flex gap-1.5">
                      {(['cam1', 'cam2', 'cam3'] as const).map((cam, idx) => (
                        <button
                          key={cam}
                          type="button"
                          onClick={() => setActiveCam(cam)}
                          className={cn(
                            'px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors',
                            activeCam === cam
                              ? 'bg-red-950 text-red-300 border border-red-800/60 font-semibold'
                              : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                          )}
                        >
                          CAM 0{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative h-28 rounded-xl border border-stone-800 bg-black overflow-hidden flex items-center justify-center p-3 text-center">
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[10px] font-mono text-red-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                      REC · {activeCam === 'cam1' ? 'HÀNH LANG TẦNG MASTER' : activeCam === 'cam2' ? 'SÂN VƯỜN VEN SÔNG' : 'CỬA CHÍNH DINH THỰ'}
                    </div>
                    <span className="text-xs text-stone-500 font-mono">
                      Luồng video mã hóa cục bộ AES-256 · Hồng ngoại nhìn đêm 50m
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Mã An Ninh Định Danh:</span>
                <span className="font-mono text-amber-300 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {vipPasscode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Confidential Consultation Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950 p-6 sm:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-mono text-red-400/90 uppercase tracking-widest">
              Bảo Mật Cấp Cao · Cam Kết Thỏa Thuận NDA
            </span>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl text-stone-100">
              Đăng Ký Tư Vấn Giải Pháp Phòng An Toàn Dinh Thự
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-400">
              Mọi bản vẽ kiến trúc kết cấu phòng an toàn được lưu trữ trên máy chủ ngoại tuyến tại GuHomes, 
              chỉ KTS Trưởng và Gia chủ trực tiếp ký kết thỏa thuận bảo mật danh tính.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-6 text-center">
                <div className="mx-auto h-10 w-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-serif text-base text-stone-100">Đã Tiếp Nhận Hồ Sơ Mật</h4>
                <p className="mt-1 text-xs text-stone-400">
                  KTS Trưởng GuHomes sẽ liên hệ trực tiếp qua số {clientPhone} trong vòng 2 giờ làm việc để xếp lịch khảo sát thực địa kín đáo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitConsultation} className="mt-6 space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">
                      Họ và Tên Gia Chủ *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ông / Bà..."
                      className="w-full h-11 rounded-xl bg-stone-900 border border-stone-800 px-3.5 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">
                      Số Điện Thoại Trực Tiếp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full h-11 rounded-xl bg-stone-900 border border-stone-800 px-3.5 text-xs sm:text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-red-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">
                    Vị Trí & Loại Hình Bất Động Sản
                  </label>
                  <select
                    value={estateLocation}
                    onChange={(e) => setEstateLocation(e.target.value)}
                    className="w-full h-11 rounded-xl bg-stone-900 border border-stone-800 px-3.5 text-xs sm:text-sm text-stone-100 focus:outline-none focus:border-red-500/50"
                  >
                    <option value="Thảo Điền, TP. Thủ Đức">Biệt thự ven sông Thảo Điền, TP. Thủ Đức</option>
                    <option value="Phú Mỹ Hưng, Quận 7">Dinh thự Chateau / Nam Viên Phú Mỹ Hưng, Q.7</option>
                    <option value="Ba Son / Thủ Thiêm, Quận 1">Penthouse Grand Marina Ba Son / The Metropole</option>
                    <option value="Vinhomes Riverside / Central Park">Biệt thự The Mansions / Landmark 81</option>
                    <option value="Khu vực khác">Tư gia độc lập khác</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-red-700 hover:bg-red-600 text-white font-medium text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg shadow-red-900/30 flex items-center justify-center gap-2"
                  >
                    <span>Yêu Cầu Khảo Sát & Lập Phương Án Mật (Mã {vipPasscode})</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Technical Specification Footnote */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            Tiêu chuẩn chống cháy: UL 10C / ASTM E119 240 phút · Kết cấu thép Hardox 500
          </div>
          <Link
            href="/du-toan-chi-phi"
            className="text-stone-400 hover:text-stone-200 underline underline-offset-4 transition-colors"
          >
            Xem bảng chi phí chi tiết các module an ninh tích hợp
          </Link>
        </div>
      </div>
    </section>
  )
}
