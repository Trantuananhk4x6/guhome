'use client'

import { create } from 'zustand'

export interface MaterialSample {
  readonly id: string
  readonly name: string
  readonly origin: string
  readonly tactileQuality: string
  readonly microclimateAdvantage: string
  readonly craftTechnique: string
  readonly icon: string
}

export const CURATED_SAMPLES: readonly MaterialSample[] = [
  {
    id: 'walnut-fas',
    name: 'Gỗ Óc Chó FAS Bắc Mỹ (American Walnut)',
    origin: 'Nhập khẩu chính ngạch Bắc Mỹ (Kiểm định FSC)',
    tactileQuality: 'Thớ vân mây mềm mại, thẫm màu hạt dẻ ấm áp, độ nhám mịn P800 vuốt êm tay.',
    microclimateAdvantage: 'Sấy chân không đưa độ ẩm cân bằng EMC 10–12%, triệt tiêu co ngót trước độ ẩm 80% Sài Gòn.',
    craftTechnique: 'Chế tác mộng gỗ âm dương, thẩm thấu 3 lớp dầu thực vật Osmo CHLB Đức 0% VOC.',
    icon: '🪵',
  },
  {
    id: 'travertine-rome',
    name: 'Đá Travertine Ý Tự Nhiên (Roman Travertine)',
    origin: 'Tivoli, Roma, Ý (Mỏ đá La Mã cổ đại)',
    tactileQuality: 'Mát lạnh tự nhiên, bề mặt xẻ rãnh thủ công giữ lại các lỗ thở trầm tích hữu cơ.',
    microclimateAdvantage: 'Hấp thụ nhiệt cực chậm, giúp làm dịu không khí nội thất trong những ngày nắng gắt Tây Sài Gòn.',
    craftTechnique: 'Gia công cạnh mộng vát viền, chống ố bằng hoạt chất thẩm thấu gốc nước không đổi màu đá.',
    icon: '🏛️',
  },
  {
    id: 'belgian-linen',
    name: 'Vải Lanh Bỉ Dệt Thô (Belgian Pure Linen)',
    origin: 'Flanders, Vương Quốc Bỉ',
    tactileQuality: 'Sợi lanh dệt tay dày dặn, nếp nhăn tự nhiên quý phái, thoáng mát khi tiếp xúc da.',
    microclimateAdvantage: 'Thoát ẩm tự nhiên gấp 3 lần cotton, không lưu mùi ẩm mốc khi trời nồm hay mưa dài ngày.',
    craftTechnique: 'Nhuộm màu khoáng tự nhiên tông cát oat, bọc đệm sofa may chỉ đôi chịu lực.',
    icon: '🌾',
  },
  {
    id: 'calce-limewash',
    name: 'Vữa Khoáng Calce Ý (Italian Mineral Limewash)',
    origin: 'Veneto, Ý',
    tactileQuality: 'Hiệu ứng bề mặt mờ mịn sần nhẹ tựa vỏ trứng, tán xạ ánh sáng tự nhiên đa chiều.',
    microclimateAdvantage: 'Kiềm tính cao tự nhiên, ức chế nấm mốc 100%, kháng ẩm và cho tường thoát hơi nước dễ dàng.',
    craftTechnique: 'Nghệ nhân dùng bay thép vuốt 3 lớp chuyển tiếp sắc độ, phủ sáp ong bảo vệ bề mặt.',
    icon: '🎨',
  },
]

interface TactileSampleBoxState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useTactileSampleBoxStore = create<TactileSampleBoxState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
