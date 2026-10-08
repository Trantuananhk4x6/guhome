import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { eq } from 'drizzle-orm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

async function run() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')

  console.log('--- Đang kiểm tra & cập nhật ThemeSettings trong Database ---')
  const existing = await db.select().from(schema.themeSettings).limit(1)

  const updatedBrand = {
    companyName: 'GuHomes',
    shortName: 'GU',
    tagline: 'Nội thất và kiến trúc cho khí hậu Sài Gòn',
    logoMediaId: existing[0]?.brand?.logoMediaId ?? null,
    faviconMediaId: existing[0]?.brand?.faviconMediaId ?? null,
    email: 'guhomesvn@gmail.com',
    phone: '0368 757 916',
    address: '14 Đường 41, Phường An Khánh, TP. Hồ Chí Minh',
    social: [
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594054897878' },
      { label: 'Zalo', href: 'https://zalo.me/0368757916' },
      { label: 'YouTube', href: 'https://www.youtube.com/@guconcept' },
      { label: 'Instagram', href: 'https://www.instagram.com/guconcept.vn' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@guconcept' },
      { label: 'Behance', href: 'https://www.behance.net/guhomes' },
      { label: 'Pinterest', href: 'https://www.pinterest.com/guhomes' },
    ],
  }

  const firstRow = existing[0]
  if (firstRow) {
    await db
      .update(schema.themeSettings)
      .set({
        brand: updatedBrand,
        updatedAt: new Date(),
      })
      .where(eq(schema.themeSettings.id, firstRow.id))
    console.log('✓ Đã cập nhật thành công hàng ThemeSettings (ID:', firstRow.id, ')')
  } else {
    await db.insert(schema.themeSettings).values({
      brand: updatedBrand,
      colors: {
        canvas: '#F4F1EA',
        surface: '#EAE5DA',
        surfaceAlt: '#DCD5C7',
        ink: '#1C1B18',
        muted: '#78736A',
        line: '#D7D0C2',
        espresso: '#131210',
        accent: '#A07753',
        accentSoft: '#C7A57C',
      },
      typography: {
        displayFont: 'Playfair Display',
        bodyFont: 'Be Vietnam Pro',
        displayScale: 1,
        bodyScale: 1,
        tracking: 1,
      },
      motion: {
        enabled: true,
        reducedMotion: 'auto',
        scrollSmoothing: true,
        pageTransition: true,
        textReveal: true,
        imageReveal: true,
        parallax: true,
        threeDAnimation: true,
        cameraAnimation: true,
        intensity: 1,
        transitionSpeed: 1,
      },
      updatedAt: new Date(),
    })
    console.log('✓ Đã khởi tạo hàng ThemeSettings mới.')
  }

  // Verify
  const checked = await db.select().from(schema.themeSettings).limit(1)
  console.log('Brand sau khi cập nhật:', JSON.stringify(checked[0]?.brand, null, 2))
  process.exit(0)
}

run().catch((err) => {
  console.error('Lỗi cập nhật brand:', err)
  process.exit(1)
})
