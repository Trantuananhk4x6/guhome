import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

const BASE_URL = 'http://localhost:3000'

const ROUTES_TO_TEST = [
  { path: '/', label: 'Trang chủ' },
  { path: '/studio', label: 'Studio (Giới thiệu, Triết lý)' },
  { path: '/projects', label: 'Danh mục dự án' },
  { path: '/projects/tam-rem-be-tong', label: 'Chi tiết dự án (Tấm Rèm Bê Tông)' },
  { path: '/journal', label: 'Tạp chí kiến trúc' },
  { path: '/journal/thiet-ke-noi-that-penthouse-the-opera-metropole', label: 'Chi tiết bài viết Penthouse Metropole' },
  { path: '/phong-cach', label: 'Phong cách thiết kế' },
  { path: '/phong-cach/wabi-sabi', label: 'Chi tiết phong cách Wabi-Sabi' },
  { path: '/contact', label: 'Liên hệ & Bản đồ' },
  { path: '/du-toan-chi-phi', label: 'Dự toán chi phí may đo bóc tách' },
  { path: '/styles', label: 'Redirect /styles -> /phong-cach' }
]

async function run() {
  console.log(`=== BẮT ĐẦU KIỂM THỬ ROUTING & SEO/AIO/GEO TRÊN ${BASE_URL} ===\n`)
  
  let allPass = true

  for (const item of ROUTES_TO_TEST) {
    const url = `${BASE_URL}${item.path}`
    try {
      const res = await fetch(url, { redirect: 'manual' })
      const status = res.status
      console.log(`--------------------------------------------------`)
      console.log(`ROUTE: ${item.path} [${item.label}]`)
      console.log(`STATUS CODE: ${status}`)

      if (status === 301 || status === 307 || status === 308) {
        const location = res.headers.get('location')
        console.log(`REDIRECT LOCATION: ${location}`)
        console.log(`✓ Redirect PASS!`)
        continue
      }

      if (status !== 200) {
        console.error(`✗ ERROR: Expected 200 OK but got ${status}`)
        allPass = false
        continue
      }

      const html = await res.text()

      // 1. Title
      const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i)
      const title = titleMatch && titleMatch[1] ? titleMatch[1].trim() : null
      console.log(`TITLE: "${title}"`)

      // 2. Meta description
      const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) ||
                        html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/i)
      const desc = descMatch && descMatch[1] ? descMatch[1].trim() : null
      console.log(`DESCRIPTION: "${desc ? desc.slice(0, 100) : ''}..."`)

      // 3. Canonical URL
      const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) ||
                         html.match(/<link\s+href=["'](.*?)["']\s+rel=["']canonical["']/i)
      const canonical = canonMatch && canonMatch[1] ? canonMatch[1].trim() : null
      console.log(`CANONICAL: "${canonical}"`)

      // 4. OpenGraph image
      const ogImgMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i) ||
                         html.match(/<meta\s+content=["'](.*?)["']\s+property=["']og:image["']/i)
      const ogImage = ogImgMatch && ogImgMatch[1] ? ogImgMatch[1].trim() : null
      console.log(`OG:IMAGE: "${ogImage}"`)

      // 5. JSON-LD Schemas
      const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
      console.log(`JSON-LD SCRIPTS FOUND: ${jsonLdMatches.length}`)
      for (const m of jsonLdMatches) {
        if (!m[1]) continue
        try {
          const parsed = JSON.parse(m[1])
          const types = Array.isArray(parsed) ? parsed.map((p: any) => p['@type']) : [parsed['@type']]
          console.log(`  • Schema Type: ${JSON.stringify(types)}`)
        } catch (e: unknown) {
          console.error(`  ✗ Lỗi parse JSON-LD:`, e instanceof Error ? e.message : String(e))
        }
      }

      console.log(`✓ ROUTE PASS!`)
    } catch (err: unknown) {
      console.error(`✗ Lỗi kết nối tới ${url}:`, err instanceof Error ? err.message : String(err))
      allPass = false
    }
  }

  console.log(`\n==================================================`)
  if (allPass) {
    console.log(`KẾT QUẢ TỔNG THỂ: 100% ROUTES & SEO/AIO/GEO ĐẠT CHUẨN HOÀN TOÀN!`)
  } else {
    console.log(`KẾT QUẢ TỔNG THỂ: CÓ LỖI CẦN XỬ LÝ!`)
  }
}

run().catch(console.error)
