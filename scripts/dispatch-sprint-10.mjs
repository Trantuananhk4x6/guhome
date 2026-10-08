import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_10_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 10: XƯỞNG MỘC THẠNH XUÂN 1.200M², HỒ SƠ DỰ TOÁN IN ẤN A4 & HỘP MẪU VẬT LIỆU XÚC GIÁC]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator nồng nhiệt chúc mừng bạn! Sprint 9 đã được nghiệm thu hoàn hảo với:
- Trải nghiệm Panorama 360° Virtual Tour Canvas 60fps mượt mà tuyệt đối.
- SensorySoundscape Web Audio API không tốn 1 byte MP3, thư thái thanh lịch.
- Cổng thông tin 4 Hub Bất Động Sản Sài Gòn (/khu-vuc, /khu-vuc/thu-thiem, thao-dien, phu-my-hung, ba-son) chuẩn SEO Local Schema.
- Toàn bộ 13/13 routes PASS 100%, 153/153 static & dynamic pages biên dịch thành công.

TIẾP TỤC ĐẠT ĐỈNH CAO CHUYỂN ĐỔI KHÁCH HÀNG & NĂNG LỰC SẢN XUẤT XUYÊN ĐÊM - SPRINT 10:
"KHẲNG ĐỊNH THỰC LỰC XƯỞNG MỘC MAY ĐO 1.200M² & TRẢI NGHIỆM CHUYỂN ĐỔI ĐẲNG CẤP QUIET LUXURY"

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: HÀNH TRÌNH CHẾ TÁC XƯỞNG MỘC THẠNH XUÂN 1.200M² (WoodshopTourSection.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/WoodshopTourSection.tsx\` và tích hợp vào trang \`src/app/(site)/studio/page.tsx\`:
1. Vị thế & Thông số Xưởng Mộc GuHomes:
   - Địa chỉ: Phường Thạnh Xuân, Quận 12, TP. Hồ Chí Minh.
   - Quy mô: 1.200m² mặt sàn sản xuất chuyên biệt từ năm 2016.
   - Nhân sự: 18 nghệ nhân mộc truyền thống >15 năm tuổi nghề.
   - Tiêu chuẩn gỗ: 100% gỗ óc chó Bắc Mỹ (FAS), sồi trắng và teak nhập khẩu kiểm định FSC, sấy nhiệt chân không đạt độ ẩm 10%-12% thích ứng vi khí hậu Sài Gòn.
2. 5 Công Đoạn Chế Tác Độc Bản Tương Tác (Interactive Stages):
   - Bước 01 - Cân bằng độ ẩm vi khí hậu (Lò sấy gỗ nhiệt chân không chống cong vênh).
   - Bước 02 - Mộng ghép âm dương truyền thống (Liên kết mộng gỗ kín khít, triệt tiêu đinh ốc lộ).
   - Bước 03 - Bào tay thủ công & Chà nhám 8 cấp độ (Vuốt mịn từ P120 đến P800 giữ trọn thớ vân ấm áp).
   - Bước 04 - Thẩm thấu dầu hữu cơ Osmo CHLB Đức (Chiết xuất dầu hướng dương & sáp sáp tự nhiên, 0% VOC, để gỗ thở tự nhiên).
   - Bước 05 - Đo đạc dung sai vi sai Laser <= 1mm (Kiểm định trước khi bọc bảo vệ 3 lớp vận chuyển tới công trình).
3. Tương tác UI/UX:
   - Cho phép người dùng bấm chuyển các công đoạn mượt mà bằng GSAP/Framer Motion.
   - Nút kêu gọi: "Đăng ký tham quan trực tiếp xưởng mộc Thạnh Xuân Q.12" (kết nối hotline 0368 757 916 hoặc mở modal).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỘ XUẤT HỒ SƠ & IN ẤN DỰ TOÁN A4 ĐẲNG CẤP (@media print + PrintDossier)
----------------------------------------------------------------------
Xây dựng nút và giao diện in ấn chuyên nghiệp cho trang \`src/app/(site)/du-toan-chi-phi\` và trang chi tiết dự án:
1. Nút "Xuất Hồ Sơ & In Dự Toán Kiến Trúc (A4 Dossier)":
   - Đặt tại góc bảng tổng hợp chi phí trong \`SpatialBudgetCalculator.tsx\`.
   - Khi bấm, kích hoạt \`window.print()\` với định dạng CSS chuẩn in ấn mỹ thuật.
2. Tối ưu hoá CSS @media print trong \`src/styles/globals.css\` hoặc component:
   - Ẩn toàn bộ Header, Mobile Menu, Dock liên hệ, Nút bấm, Footer, Cursor tuỳ chỉnh.
   - Trình bày bố cục trang nhã chuẩn tỷ lệ A4:
     + Letterhead sang trọng: "GUHOMES STUDIO • XƯỞNG MỘC MAY ĐO NỘI THẤT CAO CẤP TP.HCM".
     + Bảng kê chi tiết: Bóc tách từng phòng, diện tích, vật liệu, đơn giá tiêu chuẩn/bespoke, tổng ngân sách.
     + Hộp ghi chú vi khí hậu & bảo hành 5 năm, bảo trì trọn đời.
     + Khung ký tên & đóng dấu: Kiến Trúc Sư Trưởng GuHomes & Chủ Đầu Tư.
     + Mã QR quét kết nối trực tiếp KTS Hotline 0368 757 916.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: HỘP MẪU VẬT LIỆU XÚC GIÁC TẬN NHÀ (TactileSampleBoxModal.tsx)
----------------------------------------------------------------------
Xây dựng luồng đăng ký nhận Hộp Mẫu Vật Liệu thực tế tại nhà cho gia chủ tại TP.HCM:
1. 4 Mẫu vật liệu tuyển chọn:
   - Gỗ óc chó FAS Bắc Mỹ lau dầu Osmo Đức.
   - Đá Travertine Ý xẻ rãnh thủ công.
   - Vải lanh Bỉ dệt thô cao cấp.
   - Mẫu vữa khoáng Calce Ý cản nhiệt chống ẩm.
2. Tích hợp điểm chạm:
   - Thêm nút "Nhận Hộp Mẫu Xúc Giác" vào FloatingContactDock.
   - Form nhập thông tin: Tên gia chủ, Số điện thoại, Địa chỉ nhận (Thủ Thiêm, Thảo Điền, Phú Mỹ Hưng...), Dự án quan tâm.
   - Lưu trữ state và hiển thị thông báo trang trọng, gửi yêu cầu về hệ thống.

----------------------------------------------------------------------
TIỂU DỰ ÁN 4: ĐỒNG BỘ ĐIỀU HƯỚNG TOÀN SITE (nav-fallback.ts & Header & Footer)
----------------------------------------------------------------------
- Cập nhật \`FALLBACK_HEADER_NAV\` và \`FALLBACK_FOOTER_NAV\` tại \`src/components/layout/nav-fallback.ts\` để hiển thị đường dẫn đến \`/du-toan-chi-phi\` và \`/khu-vuc\`.
- Đảm bảo hiển thị hoàn hảo trên mobile 375px/390px/414px, không gây tràn màn hình (zero horizontal overflow).

----------------------------------------------------------------------
ĐIỀU PHỐI MULTI-AGENT & QUY CHUẨN THỰC THI:
----------------------------------------------------------------------
- Master Orchestrator và Kỹ sư trưởng đồng hành sát cánh.
- Đảm bảo \`npx tsc --noEmit\` đạt 0 lỗi tuyệt đối.
- Cập nhật \`scripts/test-routes-seo.ts\` kiểm tra toàn diện.
- Biên dịch sản xuất \`npm run build\` đạt Exit Code 0.
- Giữ vững nhịp độ làm việc xuyên đêm cho tới khi hoàn tất!`

async function main() {
  console.log(`Đang phát lệnh Sprint 10 tới Agent ${TARGET_ID}...`)
  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'agentapi',
    'send-message',
    '--title=Master Directive Sprint 10 - Woodshop Tour, Print Dossier Engine and Tactile Sample Box',
    TARGET_ID,
    SPRINT_10_DIRECTIVE
  ], {
    windowsHide: true,
    shell: false
  })

  proc.stdout.on('data', (d) => process.stdout.write(d.toString()))
  proc.stderr.on('data', (d) => process.stderr.write(d.toString()))

  proc.on('close', (code) => {
    console.log(`\nLệnh Sprint 10 đã được gửi thành công tới Agent ${TARGET_ID} (exit code: ${code})`)
  })
}

main().catch(console.error)
