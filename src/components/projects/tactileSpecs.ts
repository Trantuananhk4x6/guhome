import { formatArea } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

export interface TactileSpecs {
  area: string
  materials: string
  climateOrientation: string
  craftDuration: string
  typologyBadge: string
}

/**
 * Deterministically generates rich Quiet Luxury tactile specs for any project
 * based on its slug, category, style, and area.
 */
export function getTactileSpecs(project: ProjectSummary): TactileSpecs {
  const areaFormatted = formatArea(project.area) || '120 m²'

  // Hash code from slug for stable, repeatable property derivation
  let hash = 0
  const slug = project.slug || project.id || 'guhomes'
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i)
    hash |= 0
  }
  const posHash = Math.abs(hash)

  const MATERIALS_PALETTE = [
    'Gỗ óc chó FAS Bắc Mỹ & Đá Travertine',
    'Vữa vôi Calce khoáng Ý & Gỗ sồi tự nhiên',
    'Đá phiến xẻ thô & Đồng thau mờ thủ công',
    'Gỗ Teak chịu ẩm cao & Kính gợn sóng Moru',
    'Gỗ tần bì hoàn thiện dầu Osmo & Vải lanh Bỉ',
    'Đá cẩm thạch xám & Gỗ óc chó lau dầu thực vật',
  ]

  const CLIMATE_ORIENTATIONS = [
    'Tây Nam · Hệ lam cản 70% nhiệt xế chiều',
    'Đông Nam · Hút trọn gió sông Sài Gòn đối lưu',
    'Chính Nam · Thông gió xuyên phòng tự nhiên',
    'Đông Bắc · Đón sáng tự nhiên dịu nhẹ ban mai',
    'Tây Bắc · Tường đôi cách âm và tán xạ nhiệt',
  ]

  const CRAFT_DURATIONS = [
    '45 ngày may đo xưởng mộc',
    '60 ngày kiến tạo thủ công',
    '75 ngày hoàn thiện tỉ mỉ',
    '90 ngày may đo & lắp đặt',
  ]

  const TYPOLOGY_BADGES: Record<string, string> = {
    'can-ho': 'Căn hộ cao cấp',
    'nha-pho': 'Nhà phố nhiệt đới',
    'biet-thu': 'Dinh thự sân vườn',
    'thuong-mai': 'Không gian trải nghiệm',
    'khong-gian-chuyen-biet': 'May đo độc bản',
  }

  const categorySlug = project.categorySlug || 'can-ho'
  let typologyBadge = TYPOLOGY_BADGES[categorySlug] || 'Không gian sống'

  if (slug.includes('penthouse') || (project.area && parseInt(project.area, 10) >= 300)) {
    typologyBadge = 'Penthouse Duplex'
  } else if (slug.includes('duplex')) {
    typologyBadge = 'Duplex thông tầng'
  } else if (slug.includes('biet-thu') || slug.includes('villa')) {
    typologyBadge = 'Biệt thự phố vườn'
  }

  const materials = MATERIALS_PALETTE[posHash % MATERIALS_PALETTE.length] ?? MATERIALS_PALETTE[0]!
  const climateOrientation =
    CLIMATE_ORIENTATIONS[(posHash >> 2) % CLIMATE_ORIENTATIONS.length] ?? CLIMATE_ORIENTATIONS[0]!
  const craftDuration = CRAFT_DURATIONS[(posHash >> 4) % CRAFT_DURATIONS.length] ?? CRAFT_DURATIONS[0]!

  return {
    area: areaFormatted,
    materials,
    climateOrientation,
    craftDuration,
    typologyBadge,
  }
}
