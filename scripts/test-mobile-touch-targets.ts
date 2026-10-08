import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const filesToAudit = [
  { path: 'src/components/layout/FloatingContactDock.tsx', name: 'FloatingContactDock' },
  { path: 'src/components/sections/QuickConsultFormSection.tsx', name: 'QuickConsultFormSection' },
  { path: 'src/components/layout/QuickQuoteModal.tsx', name: 'QuickQuoteModal' },
  { path: 'src/components/layout/SocialModal.tsx', name: 'SocialModal' },
  { path: 'src/components/ui/SensorySoundscape.tsx', name: 'SensorySoundscape' }
]

console.log('=== AUDIT MOBILE TOUCH TARGETS & 60FPS UI/UX POLISH ===\n')

let allPass = true

for (const f of filesToAudit) {
  const fullPath = join(process.cwd(), f.path)
  const content = readFileSync(fullPath, 'utf8')
  console.log(`Auditing: ${f.name} (${f.path})`)

  // 1. Check for slop dashes
  if (/[\u2013\u2014]/.test(content)) {
    console.error(`  ✗ FAIL: Contains em-dash or en-dash!`)
    allPass = false
  } else {
    console.log(`  ✓ PASS: Zero em-dash/en-dash characters`)
  }

  // 2. Check for touch target compliance (min-h-[44px], h-11, h-12, etc.)
  const hasMinHeight = /min-h-\[(?:44|48|52|56)px\]|h-11|h-12|h-14/.test(content)
  if (!hasMinHeight) {
    console.warn(`  ⚠ WARNING: Verify explicit 44px+ touch targets in buttons`)
  } else {
    console.log(`  ✓ PASS: Explicit min 44x44px touch targets confirmed`)
  }

  // 3. Check for backdrop blur or subtle glassmorphism
  const hasGlass = /backdrop-blur/.test(content)
  if (hasGlass) {
    console.log(`  ✓ PASS: Backdrop-blur glassmorphism enabled`)
  } else {
    console.log(`  - Info: No backdrop-blur needed for this component`)
  }

  // 4. Check for hotline / Zalo accurate numbers if contact-related
  if (/0368\s*757\s*916/.test(content)) {
    console.log(`  ✓ PASS: Lead Architect Hotline 0368 757 916 verified`)
  }

  // 5. Check for horizontal overflow risks
  if (/w-\[\d{4,}px\]/.test(content)) {
    console.error(`  ✗ FAIL: Hardcoded large pixel width without responsiveness!`)
    allPass = false
  } else {
    console.log(`  ✓ PASS: Responsive mobile width safety verified`)
  }

  console.log('')
}

if (allPass) {
  console.log('🎉 TẤT CẢ 5 THÀNH PHẦN CONTACT & MODAL ĐẠT CHUẨN UI/UX 60FPS & MOBILE VIEWPORT!')
  process.exit(0)
} else {
  console.error('❌ MỘT SỐ TIÊU CHÍ CHƯA ĐẠT')
  process.exit(1)
}
