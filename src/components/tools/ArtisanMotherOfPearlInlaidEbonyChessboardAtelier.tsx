'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WoodSpec {
  id: string
  name: string
  scientificName: string
  density: string
  seasoningTime: string
  tactileFeel: string
  description: string
}

interface InlayMaterial {
  id: string
  name: string
  origin: string
  iridescence: string
  craftProcess: string
  description: string
}

interface ChessEndgamePuzzle {
  id: string
  title: string
  chineseTitle: string
  movesToMate: number
  theme: string
  strategy: string
  boardStateDesc: string
}

interface LightSpectrumScene {
  id: string
  label: string
  kelvin: number
  colorHex: string
  mopReflectionColor: string
  description: string
}

const WOOD_SPECS: WoodSpec[] = [
  {
    id: 'mun-sung-khanh-hoa',
    name: 'Gỗ Mun Sừng Khánh Hòa (Ngự Dụng)',
    scientificName: 'Diospyros mun',
    density: '1.22 g/cm³ (Chìm trong nước)',
    seasoningTime: 'Sấy ủ tự nhiên 36 tháng',
    tactileFeel: 'Bóng mịn tựa ngọc bích đen obsidian, mát lạnh khi chạm',
    description: 'Vua của các dòng gỗ mun Việt Nam, chất gỗ đanh quánh không vân thớ lộ, tạo nên nền đen thăm thẳm tôn vinh trọn vẹn ánh xà cừ ngũ sắc.'
  },
  {
    id: 'trac-do-den-nam-bo',
    name: 'Gỗ Trắc Đỏ Đen Nam Bộ',
    scientificName: 'Dalbergia cochinchinensis',
    density: '1.08 g/cm³',
    seasoningTime: 'Sấy ủ tự nhiên 24 tháng',
    tactileFeel: 'Vân chỉ đen cẩm thạch huyền bí xen sắc đỏ huyết dụ ấm áp',
    description: 'Thớ gỗ dẻo dai đanh thép, mùi thơm nhẹ thanh tao, biểu trưng cho sự uy nghi và cốt cách thâm trầm của bậc tao nhân mặc khách.'
  },
  {
    id: 'hoang-dan-tuyet',
    name: 'Gỗ Hoàng Đàn Tuyết Lạng Sơn',
    scientificName: 'Cupressus torulosa',
    density: '0.85 g/cm³',
    seasoningTime: 'Hong gió tự nhiên 48 tháng',
    tactileFeel: 'Mịn màng như lụa, liên tục tiết lớp tuyết tinh dầu óng ánh',
    description: 'Dòng gỗ thơm quý hiếm bậc nhất phương Bắc, hương thơm vương vấn hàng trăm năm, xua tan tạp khí và nuôi dưỡng tinh thần thư thái.'
  }
]

const INLAY_MATERIALS: InlayMaterial[] = [
  {
    id: 'oc-do-tam-khoi',
    name: 'Ốc Đỏ Tam Khôi Đại Dương',
    origin: 'Vùng biển sâu Nam Thái Bình Dương',
    iridescence: 'Sắc đỏ lửa ruby chuyển cam hoàng kim khi nhìn nghiêng 45°',
    craftProcess: 'Đục lọng thủ công lưỡi cưa thép 0.12mm, mài phẳng nước đá mài',
    description: 'Loài ốc quý hiếm ngàn năm tuổi có lớp xà cừ đỏ rực rỡ như than hồng, được ví như vàng ròng của đại dương trong nghệ thuật khảm cẩn hoàng gia.'
  },
  {
    id: 'xa-cu-vang-singapore',
    name: 'Xà Cừ Vàng Hoàng Kim Singapore',
    origin: 'Vùng vịnh san hô Đông Nam Á',
    iridescence: 'Phản quang 7 màu sắc thái quang phổ với ánh vàng kim lộng lẫy',
    craftProcess: 'Tách lớp mỏng 0.4mm, cẩn chìm ngàm mộng âm dương không gờ ráp',
    description: 'Ánh xà cừ biến ảo kỳ ảo dưới từng góc chiếu ánh sáng, tạo chiều sâu thị giác vô tận cho từng ô cờ và đường viền kỷ hà.'
  },
  {
    id: 'bao-ngu-xanh-new-zealand',
    name: 'Bào Ngư Xanh Khổng Tước (Paua)',
    origin: 'Vách đá ngầm New Zealand',
    iridescence: 'Sắc xanh ngọc bích hòa quyện ánh tím khổng tước huyền bí',
    craftProcess: 'Mài bóng quang học bằng bột đá ngọc thạch tự nhiên',
    description: 'Màu sắc sâu thẳm tựa dải ngân hà, mang đến cảm giác khoáng đạt tĩnh lặng cho không gian đối ẩm luận bàn kỳ đạo.'
  }
]

const ENDGAME_PUZZLES: ChessEndgamePuzzle[] = [
  {
    id: 'ky-khai-dac-thang',
    title: 'Kỳ Khai Đắc Thắng (Thế Cờ Khởi Đầu Toàn Thắng)',
    chineseTitle: '旗開得勝',
    movesToMate: 3,
    theme: 'Pháo Mã liên hoàn, bức cung đoạt tướng',
    strategy: 'Tiên Pháo quá hà phong tỏa lộ 5, Mã nhảy ngọa tào kẹp cánh, Tốt áp sát yểm trợ kích sát tuyệt đối.',
    boardStateDesc: 'Đỏ: Pháo 8 bình 5, Mã 7 tiến 6, Tốt 5 tiến 1 áp cung đắc thắng.'
  },
  {
    id: 'ma-ngoa-tao',
    title: 'Mã Ngọa Tào Phá Lũy (Cú Nhảy Vượt Phòng Tuyến)',
    chineseTitle: '臥槽馬破壘',
    movesToMate: 4,
    theme: 'Mã ngọa tào khống chế hai cửa tướng',
    strategy: 'Điều chuyển Mã vào vị trí ngọa tào hiểm yếu, kết hợp Xe chiếu rút ép Tướng đối phương lộ diện và khóa chặt đường tháo chạy.',
    boardStateDesc: 'Đỏ: Mã 3 tiến 4 ngọa tào chiếu tướng, Xe 2 tiến 7 trảm Sĩ đoạt thành.'
  },
  {
    id: 'thap-dien-mai-phuc',
    title: 'Thập Diện Mai Phục (Trận Đồ Bủa Vây Tuyệt Đỉnh)',
    chineseTitle: '十面埋伏',
    movesToMate: 5,
    theme: 'Đa binh chủng phối hợp, trùng trùng điệp điệp',
    strategy: 'Tận dụng thế trận khép kín, từng nước cờ điều động binh lực tựa sóng ngầm, ép đối phương vào thế cùng không lối thoát.',
    boardStateDesc: 'Đỏ: Xe Mã Pháo Tốt đồng loạt công kích, tạo thế liên hoàn bích tuyệt sát.'
  }
]

const LIGHT_SPECTRUM_SCENES: LightSpectrumScene[] = [
  {
    id: 'warm-amber',
    label: 'Ánh Nến Ấm Áp (2700K)',
    kelvin: 2700,
    colorHex: '#e6953e',
    mopReflectionColor: '#e06666',
    description: 'Kích hoạt sắc đỏ lửa ruby của ốc đỏ Tam Khôi, làm nổi bật chất bóng sẫm của gỗ Mun sừng.'
  },
  {
    id: 'neutral-sun',
    label: 'Ánh Nắng Ban Mai (4000K)',
    kelvin: 4000,
    colorHex: '#f4ebd0',
    mopReflectionColor: '#e5c158',
    description: 'Cân bằng hoàn hảo giữa ánh vàng kim Singapore và thớ gỗ mun đen, phản chiếu sắc nét đường chỉ bạc 999.'
  },
  {
    id: 'daylight-crystal',
    label: 'Ánh Sáng Ban Trưa (6500K)',
    kelvin: 6500,
    colorHex: '#d8e7ff',
    mopReflectionColor: '#5dade2',
    description: 'Đánh thức dải quang phổ xanh ngọc bích và tím khổng tước, ánh xà cừ óng ánh tựa mặt hồ gợn sóng.'
  }
]

export function ArtisanMotherOfPearlInlaidEbonyChessboardAtelier() {
  const [selectedWoodIndex, setSelectedWoodIndex] = useState<number>(0)
  const [selectedInlayIndex, setSelectedInlayIndex] = useState<number>(0)
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState<number>(0)
  const [selectedLightIndex, setSelectedLightIndex] = useState<number>(0)
  const [boardRotationAngle, setBoardRotationAngle] = useState<number>(0)
  const [showInlayMagnifier, setShowInlayMagnifier] = useState<boolean>(false)
  const [inlaySilverGauge] = useState<string>('0.40mm')

  const selectedWood = (WOOD_SPECS[selectedWoodIndex] ?? WOOD_SPECS[0]) as WoodSpec
  const selectedInlay = (INLAY_MATERIALS[selectedInlayIndex] ?? INLAY_MATERIALS[0]) as InlayMaterial
  const selectedPuzzle = (ENDGAME_PUZZLES[selectedPuzzleIndex] ?? ENDGAME_PUZZLES[0]) as ChessEndgamePuzzle
  const selectedLight = (LIGHT_SPECTRUM_SCENES[selectedLightIndex] ?? LIGHT_SPECTRUM_SCENES[0]) as LightSpectrumScene

  // Craftsmanship metrics
  const artisanHours = 380
  const certificateCode = 'GU-CHESSBOARD-2026-X'

  return (
    <section className="relative w-full bg-[#0a0807] text-[#eee7df] py-24 px-4 sm:px-6 lg:px-8 border-y border-[#261d16] overflow-hidden">
      {/* Dynamic Spectral Ambient Light Glow */}
      <div
        className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[150px] opacity-20 pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: selectedLight.mopReflectionColor }}
      />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full blur-[140px] bg-[#d4af37]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 border-b border-[#201711] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18110c] border border-[#3b2716] text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              Imperial Xiangqi Atelier · GuHomes Custom Curation
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#faf5ee] tracking-tight">
              Bàn Cờ Thế Ngự Dụng Gỗ Mun Sừng Khảm Xà Cừ Tam Khôi
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#a49382] max-w-2xl font-light leading-relaxed">
              Kiệt tác cờ tướng độc bản chế tác từ gỗ Mun sừng Khánh Hòa chìm đáy nước, cẩn ốc đỏ đại dương lấp lánh quang phổ 7 màu, kẻ chỉ bạc 999 0.40mm và 32 quân cờ tiện tay nguyên khối lót dạ nhung hoàng gia.
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[11px] font-mono text-[#8a7664] uppercase tracking-wider">Mã Chứng Thực Tác Phẩm</span>
            <span className="text-lg md:text-xl font-mono text-[#d4af37] font-semibold tracking-wider">{certificateCode}</span>
            <span className="text-xs text-[#00b894] mt-0.5">Xưởng mộc Thạnh Xuân 1.200m² · 380 Giờ Đục Lọng</span>
          </div>
        </div>

        {/* Lighting Spectrum Selector Strip */}
        <div className="mb-8 p-4 rounded-xl bg-[#140e0a] border border-[#261a11] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#a49382] font-mono">Quang phổ ánh sáng thử nghiệm:</span>
          </div>

          <div className="flex items-center gap-2">
            {LIGHT_SPECTRUM_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                type="button"
                onClick={() => setSelectedLightIndex(idx)}
                className={cn(
                  "px-3.5 py-2 rounded-lg border text-xs font-medium transition-all min-h-[44px] cursor-pointer flex items-center gap-2",
                  selectedLightIndex === idx
                    ? "border-[#d4af37] bg-[#22160e] text-[#fbf6ee] shadow-sm"
                    : "border-[#251910] bg-[#0f0b08] text-[#8a7664] hover:text-[#fbf6ee]"
                )}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scene.colorHex }} />
                <span>{scene.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Interactive 3D Chessboard Stage (7 cols) + Atelier Config (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Interactive Chessboard Display (7 cols) */}
          <div className="lg:col-span-7 bg-[#130d09] rounded-2xl p-6 md:p-8 border border-[#26180e] shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#21140c]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Mô Phỏng Không Gian Bàn Cờ</span>
                <h3 className="text-lg font-serif text-[#faf5ee] mt-0.5">Tác Phẩm Thế Cờ: {selectedPuzzle.title}</h3>
              </div>

              {/* Angle Rotation Button */}
              <button
                type="button"
                onClick={() => setBoardRotationAngle((prev) => (prev + 90) % 360)}
                className="px-3 py-1.5 rounded-lg border border-[#392415] bg-[#1a110a] text-xs font-mono text-[#d4af37] hover:border-[#d4af37] transition-all min-h-[44px] cursor-pointer flex items-center gap-1.5"
              >
                <span>Xoay Góc Nhìn ({boardRotationAngle}°)</span>
              </button>
            </div>

            {/* Stylized Chessboard Simulation Grid */}
            <div
              className="relative w-full aspect-[10/9] bg-[#0c0806] rounded-xl border-4 border-[#3a2517] p-5 shadow-inner transition-transform duration-700 overflow-hidden flex flex-col justify-between"
              style={{
                transform: `rotate(${boardRotationAngle}deg)`,
                boxShadow: `0 0 30px ${selectedLight.mopReflectionColor}20`
              }}
            >
              {/* Wood Grain Texture Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />

              {/* Mother of Pearl Border Inlay Simulation */}
              <div
                className="absolute inset-1.5 border border-dashed rounded pointer-events-none transition-colors duration-500"
                style={{ borderColor: selectedLight.mopReflectionColor }}
              />

              {/* Chessboard Grid Lines (Xiangqi River & Palace) */}
              <div className="relative w-full h-full border border-[#442c1b] flex flex-col justify-between p-2">
                {/* Top Half (Opponent Camp) */}
                <div className="h-[44%] w-full grid grid-cols-8 grid-rows-4 border-b border-[#442c1b] relative">
                  {/* Palace Diagonal Cross */}
                  <div className="absolute top-0 left-[37.5%] w-[25%] h-full border border-dashed border-[#573722]/50 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-[10px] text-[#63422a]">
                    <span>Sĩ</span>
                    <span>Tượng</span>
                    <span>Mã</span>
                    <span>Xa</span>
                  </div>
                </div>

                {/* River Boundary (Sở Hà Hán Giới) */}
                <div className="h-[12%] w-full flex items-center justify-around px-4 border-y border-[#573722] bg-[#160f0a]">
                  <span className="text-xs font-serif tracking-widest text-[#d4af37]">楚 河 (SỞ HÀ)</span>
                  <span
                    className="text-[10px] font-mono transition-colors duration-500"
                    style={{ color: selectedLight.mopReflectionColor }}
                  >
                    Chỉ Bạc 999 · Xà Cừ Tam Khôi
                  </span>
                  <span className="text-xs font-serif tracking-widest text-[#d4af37]">漢 界 (HÁN GIỚI)</span>
                </div>

                {/* Bottom Half (Player Camp) */}
                <div className="h-[44%] w-full grid grid-cols-8 grid-rows-4 border-t border-[#442c1b] relative">
                  {/* Palace Diagonal Cross */}
                  <div className="absolute top-0 left-[37.5%] w-[25%] h-full border border-dashed border-[#573722]/50 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-[10px] text-[#8c6b47]">
                    <span>Xa</span>
                    <span>Mã</span>
                    <span>Tượng</span>
                    <span>Sĩ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Endgame Puzzle Strategy Information */}
            <div className="mt-5 p-4 rounded-xl bg-[#19100a] border border-[#2b1b10]">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-mono text-[#d4af37] font-semibold">{selectedPuzzle.chineseTitle}</span>
                <span className="text-[11px] font-mono text-[#00b894]">Khóa tướng trong {selectedPuzzle.movesToMate} nước</span>
              </div>
              <p className="text-xs text-[#a49382] leading-relaxed mb-2">
                <strong className="text-[#faf5ee]">Chiến lược:</strong> {selectedPuzzle.strategy}
              </p>
              <div className="text-[11px] font-mono text-[#8a7664] bg-[#110b07] p-2 rounded border border-[#21150c]">
                {selectedPuzzle.boardStateDesc}
              </div>
            </div>

            {/* Inlay Microscopic Magnifier Toggle */}
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#20140b]">
              <span className="text-xs text-[#a49382]">Độ khít rãnh cẩn xà cừ & mộng bạc:</span>
              <button
                type="button"
                onClick={() => setShowInlayMagnifier(!showInlayMagnifier)}
                className="text-xs font-mono text-[#d4af37] hover:underline cursor-pointer min-h-[44px] flex items-center"
              >
                {showInlayMagnifier ? "Ẩn kính soi hiển vi 0.01mm" : "Soi hiển vi quang học 0.01mm"}
              </button>
            </div>

            {/* Optical Magnifier Simulation Box */}
            <AnimatePresence>
              {showInlayMagnifier && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 rounded-xl bg-[#1b110b] border border-[#3e2615] text-xs text-[#a49382]"
                >
                  <div className="flex items-center gap-2 text-[#d4af37] font-mono mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <span>Kính Phóng Đại Vi Mô Quang Học · Sai Số Kỹ Thuật &lt; 0.02mm</span>
                  </div>
                  <p className="leading-relaxed">
                    Đường chỉ bạc 999 được gõ chìm trực tiếp vào rãnh khắc lọng mộng đuôi én trên gỗ Mun sừng Khánh Hòa. Khi miết đầu ngón tay qua bề mặt, gia chủ không cảm nhận bất kỳ độ gợn hay khe hở nào - độ phẳng tuyệt đối đạt chuẩn chế tác ngự bảo.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Configuration & Selection Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Endgame Puzzles Selector */}
            <div className="bg-[#130d09] rounded-2xl p-6 border border-[#26180e] shadow-xl">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                Kỳ Đạo Luận Bàn
              </span>
              <h3 className="text-lg font-serif text-[#faf5ee] mb-4">Các Thế Cờ Kinh Điển</h3>

              <div className="flex flex-col gap-2.5">
                {ENDGAME_PUZZLES.map((puzzle, idx) => (
                  <button
                    key={puzzle.id}
                    type="button"
                    onClick={() => setSelectedPuzzleIndex(idx)}
                    className={cn(
                      "p-3.5 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer",
                      selectedPuzzleIndex === idx
                        ? "border-[#d4af37] bg-[#22150d]"
                        : "border-[#22150c] bg-[#0e0906] hover:border-[#352113]"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-serif font-semibold text-[#faf5ee]">{puzzle.title}</span>
                      <span className="text-[10px] font-mono text-[#d4af37]">{puzzle.movesToMate} nước</span>
                    </div>
                    <p className="text-[11px] text-[#8a7664] line-clamp-1">{puzzle.theme}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Inlay Material Selector */}
            <div className="bg-[#130d09] rounded-2xl p-6 border border-[#26180e] shadow-xl">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                Chất Liệu Xà Cừ Cẩn Mặt
              </span>
              <h3 className="text-base font-serif text-[#faf5ee] mb-4">Ốc Đỏ Tam Khôi & Xà Cừ Hoàng Gia</h3>

              <div className="flex flex-col gap-2.5">
                {INLAY_MATERIALS.map((mat, idx) => (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => setSelectedInlayIndex(idx)}
                    className={cn(
                      "p-3.5 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer",
                      selectedInlayIndex === idx
                        ? "border-[#d4af37] bg-[#22150d]"
                        : "border-[#22150c] bg-[#0e0906] hover:border-[#352113]"
                    )}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs font-semibold text-[#faf5ee]">{mat.name}</span>
                      <span className="text-[10px] font-mono text-[#8a7664]">{mat.origin}</span>
                    </div>
                    <span className="block text-[11px] text-[#c5a880] mb-1">{mat.iridescence}</span>
                    <p className="text-[10px] text-[#8a7664] line-clamp-1">{mat.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Wood Selection & Specs */}
            <div className="p-6 rounded-2xl bg-[#150e09] border border-[#27190f]">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
                Gỗ Lõi Cổ Thụ Tuyển Chọn
              </span>
              <div className="flex gap-2 mb-3">
                {WOOD_SPECS.map((wood, idx) => (
                  <button
                    key={wood.id}
                    type="button"
                    onClick={() => setSelectedWoodIndex(idx)}
                    className={cn(
                      "flex-1 p-2 rounded-lg border text-xs font-medium transition-all min-h-[44px] cursor-pointer text-center",
                      selectedWoodIndex === idx
                        ? "border-[#d4af37] bg-[#24170e] text-[#fbf6ee]"
                        : "border-[#22150c] bg-[#0e0906] text-[#8a7664] hover:text-[#fbf6ee]"
                    )}
                  >
                    {wood.name.split(' (')[0]}
                  </button>
                ))}
              </div>

              <div className="text-xs text-[#a49382] space-y-1.5 bg-[#0e0906] p-3 rounded-lg border border-[#20140b]">
                <div><strong className="text-[#faf5ee]">Tên khoa học:</strong> {selectedWood.scientificName}</div>
                <div><strong className="text-[#faf5ee]">Tỷ trọng khô:</strong> {selectedWood.density}</div>
                <div><strong className="text-[#faf5ee]">Thời gian sấy mộc:</strong> {selectedWood.seasoningTime}</div>
                <div><strong className="text-[#faf5ee]">Cảm giác xúc giác:</strong> {selectedWood.tactileFeel}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Artisan Heritage Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#130d09] border border-[#26180e]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-2">01 · Kỹ Thuật Ghép Mộng Hoàng Gia</span>
            <h4 className="text-lg font-serif text-[#faf5ee] mb-2">Mộng Âm Dương Khóa Góc</h4>
            <p className="text-xs text-[#a49382] leading-relaxed">
              Khung bàn cờ được ráp bằng mộng mang cá và ngàm chốt gỗ mun, hoàn toàn không sử dụng đinh vít kim loại, triệt tiêu độ co ngót và giãn nở qua 4 mùa nhiệt đới.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#130d09] border border-[#26180e]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-2">02 · Chỉ Bạc 999 Kẻ Lòng Bàn Cờ</span>
            <h4 className="text-lg font-serif text-[#faf5ee] mb-2">Chỉ Bạc Dày {inlaySilverGauge}</h4>
            <p className="text-xs text-[#a49382] leading-relaxed">
              Từng đường kinh tuyến vĩ tuyến của bàn cờ được khảm chỉ bạc 999 nguyên chất, đánh bóng mộc bằng sáp ong tự nhiên, tỏa sắc bạc thanh khiết bền bỉ trường tồn.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#130d09] border border-[#26180e]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-2">03 · 32 Quân Cờ Tiện Tay Độc Bản</span>
            <h4 className="text-lg font-serif text-[#faf5ee] mb-2">Đáy Lót Dạ Nhung Thêu Triện</h4>
            <p className="text-xs text-[#a49382] leading-relaxed">
              Mỗi quân cờ có trọng lượng đầm tay 42 gram, đáy lót dạ nhung lụa tơ tằm dệt thủ công giúp âm thanh hạ cờ đanh vang trầm ấm mà không làm xước mặt xà cừ.
            </p>
          </div>
        </div>

        {/* Footer Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-[#100b07] border border-[#23150c] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="text-xs text-[#a49382] font-medium">
              Tác phẩm bàn cờ thế cẩn xà cừ được giám định trực tiếp và cấp chứng thư nghệ nhân độc bản của GuHomes
            </span>
          </div>
          <span className="text-xs font-mono text-[#d4af37]">Hotline đặt tác phẩm độc bản: 0368 757 916</span>
        </div>
      </div>
    </section>
  )
}
