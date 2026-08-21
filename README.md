# GuHomes

Website studio nội thất & kiến trúc — portfolio 3D tương tác + CMS.

Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 · Three.js / R3F ·
GSAP + ScrollTrigger + Lenis · Drizzle ORM · Neon PostgreSQL.

---

## Chạy lần đầu

```bash
npm install
cp .env.example .env.local     # điền DATABASE_URL, AUTH_SECRET, ADMIN_*
npm run db:migrate             # tạo 19 bảng trên Neon
npm run media:build            # 1486 ảnh gốc -> webp nhiều kích thước + blur
npm run db:seed                # nạp dự án, bài viết, dịch vụ, theme, menu
npx tsx scripts/verify.ts      # kiểm tra DB + media trước khi chạy
npm run dev                    # http://localhost:3000
```

Admin: `/admin/login`. Hàng `users` trong DB đã có sẵn tài khoản quản trị
`admin@guhomes.vn` — trước đây nó nằm ở tên miền của thương hiệu cũ và đã được đổi
cùng đợt đổi tên. `ADMIN_EMAIL` / `ADMIN_PASSWORD` trong `.env.local` chỉ được
`npm run db:seed` dùng để **tạo mới** tài khoản; seed bỏ qua nếu email đó đã tồn tại.
Vì vậy nếu `ADMIN_EMAIL` không khớp với hàng đang có, lần seed sau sẽ tạo thêm một
tài khoản admin thứ hai — hãy đặt `ADMIN_EMAIL="admin@guhomes.vn"`.
**Đổi mật khẩu ngay sau lần đăng nhập đầu tiên** (Cài đặt → Tài khoản).

## Scripts

| Lệnh | Việc |
|---|---|
| `npm run dev` | dev server |
| `npm run build` / `start` | build + chạy production |
| `npm run lint` / `typecheck` | ESLint · `tsc --noEmit` |
| `npm run db:generate` | sinh migration từ `src/server/db/schema.ts` |
| `npm run db:migrate` | áp migration lên Neon |
| `npm run db:studio` | Drizzle Studio |
| `npm run db:seed` | seed nội dung (idempotent, upsert theo slug) |
| `npm run media:build` | dựng lại toàn bộ derivative ảnh |
| `npm run jobs:worker` | worker chạy hàng đợi ảnh→3D |
| `npx tsx scripts/inspect.ts` | soi trang bằng HTML đã render — không mở trình duyệt |

`media:build` có cờ: `--only=<chuỗi trong tên thư mục>`, `--limit=<n ảnh/thư mục>`, `--force`.

## Cấu trúc

```
src/
  app/(site)      trang public          app/(admin)   CMS
  components/     sections · projects · three · animation · layout · ui · admin
  animations/     gsap · scroll(Lenis) · reveal · text · image · camera · projects
  server/         db · auth · queries · actions · storage · recon
  types/content.ts  hợp đồng kiểu dùng chung
scripts/          build-media · seed · verify · jobs-worker
docs/             ARCHITECTURE.md (bắt buộc đọc trước khi sửa) · RUNBOOK.md
```

Nguồn ảnh gốc: `D:/guhome/**` (1486 ảnh, 105 thư mục) — chỉ đọc, không sửa.
Bản tối ưu nằm ở `public/media/` (không commit).

## Nội dung

- Ảnh, tên dự án, mô tả nạp từ `src/data/content/batch-*.json` + `site.json`.
- Thêm dự án mới **không cần sửa code**: thêm thư mục ảnh → `media:build` → tạo dự án
  trong Admin, hoặc thêm entry vào một batch JSON rồi `db:seed`.
- Trang chủ, menu, màu sắc, font, mức độ chuyển động: sửa trong Admin, không rebuild.

## 3D

Mỗi dự án chọn một chế độ: `NONE` · `IMAGE` · `DEPTH_2_5D` · `PROCEDURAL_3D` · `NATIVE_GLB`.
Camera đi theo waypoint cấu hình được trong Admin (vị trí, target, FOV, easing, tốc độ,
độ nhạy scroll) — không hardcode dự án nào trong source.

Pipeline ảnh→3D chạy nền qua `recon_jobs`: tạo job trong Admin → worker xử lý →
trạng thái `review` → admin duyệt → áp vào scene. Mặc định dùng depth heuristic
(không cần API key); đặt `DEPTH_PROVIDER=replicate` + `REPLICATE_API_TOKEN` để dùng
mô hình depth thật.

Không có WebGL / thiết bị yếu / `prefers-reduced-motion` → tự động rơi về ảnh tĩnh
chất lượng cao kèm parallax CSS. Trang vẫn đẹp, không bao giờ để canvas trắng.

## Triển khai

1. Neon: dùng chính `DATABASE_URL` (pooler) — đã bật `sslmode=require`.
2. Vercel: import repo, đặt biến môi trường như `.env.example`, build command mặc định.
3. Ảnh: `public/media/` sinh lúc build không bền vững trên serverless — với production
   thật, đặt `STORAGE_DRIVER=s3` và điền `S3_*` để media đi qua object storage
   (interface `StorageDriver` đã có sẵn driver S3-compatible).
4. Worker ảnh→3D chạy tách biệt (`npm run jobs:worker`) trên một máy có Node —
   không chạy trong quá trình render trang.
