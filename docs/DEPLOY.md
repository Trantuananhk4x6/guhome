# Triển khai GUHOMES lên Vercel + trỏ DNS guhomes.vn

Hai việc tách rời nhau: đưa site lên Vercel, rồi trỏ tên miền vào.
Làm đúng thứ tự này, và **đọc phần cảnh báo về email trước khi sửa DNS**.

---

## 0. Trước khi bắt đầu — một vấn đề phải quyết

`public/media/` đang nặng **564 MB** (1.485 ảnh × 4–5 kích thước).

Điều đó có nghĩa là:

- Mỗi lần deploy phải upload lại 564 MB. Chậm, và tính vào giới hạn dung lượng
  deployment của Vercel.
- Băng thông gói Hobby là 100 GB/tháng. Với ảnh 200–500 KB, khoảng **200.000
  lượt xem ảnh** là hết — nghe nhiều nhưng một khách xem 20 ảnh thì chỉ còn
  10.000 lượt truy cập.
- Hạn ngạch tối ưu ảnh của `next/image` trên Vercel cũng tính riêng.

**Dự án đã có sẵn lối thoát.** `src/server/storage/` có hai driver: `local` và
`s3`. Chuyển sang S3 (hoặc Cloudflare R2 — rẻ hơn nhiều và **miễn phí băng thông
đi ra**) thì `public/media/` không cần nằm trong repo nữa.

| | Deploy thẳng ảnh trong repo | Chuyển sang R2/S3 |
|---|---|---|
| Thời gian dựng | Chậm mỗi lần deploy | Nhanh |
| Băng thông | Tính vào 100 GB của Vercel | R2 miễn phí egress |
| Việc phải làm | Không | Tạo bucket, đổi 4 biến môi trường, upload một lần |

Nếu chỉ muốn **xem thử trước** thì cứ deploy thẳng, chấp nhận chậm. Nếu định
chạy thật, làm S3/R2 trước — càng để lâu càng khó đổi.

---

## 1. Đưa code lên GitHub

Hiện đang bị chặn: máy đang đăng nhập Git bằng `Trantuananhk4x6`, còn repo
`TranTuanAnh01/gumon` thuộc tài khoản khác nên push trả về **403**.

Chọn một trong hai:

- **Cách nhanh:** vào `TranTuanAnh01/gumon` → *Settings* → *Collaborators* →
  mời `Trantuananhk4x6` quyền **Write**. Bấm chấp nhận lời mời, rồi:

  ```bash
  cd d:/guhome/an-atelier
  git push -u origin main
  ```

- **Hoặc** tạo repo mới dưới chính tài khoản đang đăng nhập, rồi:

  ```bash
  git remote set-url origin https://github.com/Trantuananhk4x6/guhomes.git
  git push -u origin main
  ```

Lần push đầu sẽ lâu vì có 564 MB ảnh.

---

## 2. Tạo project trên Vercel

1. Vào <https://vercel.com/new>, đăng nhập bằng GitHub.
2. Chọn repo vừa push → **Import**.
3. Framework Vercel tự nhận là **Next.js**. Không cần đổi Build Command hay
   Output Directory.
4. **Chưa bấm Deploy vội** — khai biến môi trường ở bước 3 trước, vì thiếu
   `DATABASE_URL` là build đổ ngay.

---

## 3. Biến môi trường

Trong *Project → Settings → Environment Variables*, thêm cho cả ba môi trường
(Production, Preview, Development):

| Tên | Giá trị | Ghi chú |
|---|---|---|
| `DATABASE_URL` | chuỗi kết nối Neon | Lấy y hệt trong `.env.local` |
| `AUTH_SECRET` | chuỗi ngẫu nhiên | Tạo bằng `openssl rand -base64 32` |
| `ADMIN_EMAIL` | email đăng nhập CMS | |
| `ADMIN_PASSWORD` | mật khẩu CMS | Đổi ngay sau lần đăng nhập đầu |
| `NEXT_PUBLIC_SITE_URL` | `https://guhomes.vn` | Dùng cho canonical URL, sitemap, OG |
| `STORAGE_DRIVER` | `local` hoặc `s3` | Xem phần 0 |
| `DEPTH_PROVIDER` | `heuristic` | `replicate` nếu có token |

Nếu chọn S3/R2, thêm: `S3_ENDPOINT`, `S3_BUCKET`, `S3_PUBLIC_URL`,
`S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`.

> **`NEXT_PUBLIC_SITE_URL` phải là `https://`, không có dấu `/` ở cuối.**
> Sai một trong hai thứ đó thì sitemap và thẻ OpenGraph sẽ sinh ra URL hỏng, và
> lỗi này chỉ lộ ra khi đem đi chia sẻ link.

Xong thì bấm **Deploy**.

---

## 4. Trỏ DNS guhomes.vn

Đây là bảng DNS hiện tại. **Chỉ sửa 2 dòng, và đừng động vào phần còn lại.**

### Sửa

| STT | Host | Loại | Giá trị cũ | Đổi thành |
|---|---|---|---|---|
| 6 | `@` | A | `112.213.89.124` | **`76.76.21.21`** |
| 7 | `www` | A | `112.213.89.124` | Xoá dòng A này, thêm **CNAME** → `cname.vercel-dns.com` |

Nếu nhà cung cấp không cho `www` dùng CNAME, để nguyên loại A và đặt giá trị
`76.76.21.21` cũng chạy được, chỉ là kém linh hoạt hơn.

### Tuyệt đối giữ nguyên

| STT | Host | Loại | Lý do |
|---|---|---|---|
| 3 | `@` | MX → `mail.guhomes.vn` | Xoá là **mất toàn bộ email** |
| 5 | `mail` | A → `112.213.89.124` | Máy chủ mail vẫn nằm ở đây |
| 4 | `ftp` | A | Vẫn dùng để lên hosting cũ |
| 2 | `*` | A | Wildcard cho subdomain cũ |

### ⚠️ Cái bẫy: bản ghi SPF sẽ âm thầm sai

Dòng số 1 đang là:

```
@   TXT   v=spf1 a mx ~all
```

Chữ **`a`** ở đó nghĩa là *"cho phép IP trong bản ghi A của guhomes.vn gửi mail"*.

Ngay khi bạn đổi bản ghi A của `@` sang IP Vercel, `a` sẽ trỏ tới **máy chủ của
Vercel** — nơi không bao giờ gửi mail của bạn — và IP máy chủ mail thật
`112.213.89.124` **không còn được SPF cho phép nữa**, trừ khi nó lọt qua nhờ cơ
chế `mx`.

Ở đây `mx` vẫn cứu được, vì `mail.guhomes.vn` trỏ đúng `112.213.89.124`. Nhưng
đó là may, không phải thiết kế. Sửa cho chắc — đổi dòng 1 thành:

```
v=spf1 ip4:112.213.89.124 mx ~all
```

Nói thẳng IP máy chủ mail, không phụ thuộc vào việc bản ghi A trỏ đi đâu.

**Làm việc này *trước* khi đổi bản ghi A**, để không có khoảng thời gian nào SPF
bị hở.

### Sau khi sửa

- TTL đang là 360 giây, nên khoảng **6 phút** là lan xong. Một số ISP giữ cache
  lâu hơn.
- Kiểm tra:

  ```bash
  nslookup guhomes.vn
  nslookup www.guhomes.vn
  nslookup -type=mx guhomes.vn      # phải vẫn là mail.guhomes.vn
  nslookup -type=txt guhomes.vn     # kiểm tra SPF
  ```

- Trong Vercel: *Project → Settings → Domains* → thêm `guhomes.vn` **và**
  `www.guhomes.vn`. Vercel tự cấp chứng chỉ SSL sau khi thấy DNS đã trỏ đúng,
  thường trong vài phút.

---

## 5. Sau khi lên production

```bash
npm run db:migrate      # nếu Neon chưa chạy migration
npm run db:seed         # chỉ chạy nếu database còn trống
npx tsx scripts/verify.ts
```

Rồi đăng nhập `/admin/login` và **đổi mật khẩu ngay**.

Worker ảnh→3D (`npm run jobs:worker`) là tiến trình chạy dài, **không chạy được
trên Vercel serverless**. Chạy nó ở máy bạn hoặc trên một VPS nhỏ, trỏ vào cùng
`DATABASE_URL`.

---

## Những gì tôi chưa làm được

Tôi **không deploy hộ được** — cần bạn đăng nhập Vercel, và tôi không xin token
của bạn qua chat. Mọi thứ trong repo đã sẵn sàng: `npm run build` chạy xanh, 117
trang prerender, lint và typecheck sạch.

Việc bạn cần tự làm: mở khoá quyền push GitHub, tạo project trên Vercel, khai
biến môi trường, sửa 2 dòng DNS (và dòng SPF).
