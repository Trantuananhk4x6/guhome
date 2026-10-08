import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_11_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 11: BẢN ĐỒ KHÔNG GIAN SÀI GÒN, TACTILE MOODBOARD STUDIO & LỊCH HẸN VIP KTS TRƯỞNG]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator nồng nhiệt biểu dương toàn đội! Sprint 10 vừa hoàn thành xuất sắc với:
- Xưởng mộc Thạnh Xuân 1.200m² với 5 công đoạn chế tác mộc âm dương độc bản (WoodshopTourSection.tsx).
- Bộ xuất hồ sơ & in ấn dự toán A4 Dossier sang trọng cho gia chủ với con dấu xưởng mộc và chữ ký KTS.
- Hộp Mẫu Vật Liệu Xúc Giác Tận Nhà (TactileSampleBoxModal.tsx) kết nối trực tiếp FloatingContactDock.
- Đồng bộ điều hướng toàn site và 100% routes test PASS, 153/153 static & dynamic pages build thành công (Commit d393c5d).

TIẾP TỤC ĐẨY MẠNH TOÀN LỰC XUYÊN ĐÊM - SPRINT 11:
"BẢN ĐỒ DỰ ÁN KHÔNG GIAN SÀI GÒN, PHÒNG THÍ NGHIỆM TACTILE MOODBOARD & ĐẶT LỊCH VIP CÙNG KTS TRƯỞNG"

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: BẢN ĐỒ KHÔNG GIAN DỰ ÁN SÀI GÒN (ProjectSpatialMap.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/projects/ProjectSpatialMap.tsx\` và tích hợp vào trang danh mục dự án \`src/app/(site)/projects/page.tsx\` và \`src/app/(site)/khu-vuc/page.tsx\`:
1. Bản đồ vector tương tác định vị 6 tâm điểm kiến trúc GuHomes tại TP.HCM:
   - 1. Bán Đảo Thủ Thiêm: The Opera Metropole, The River, Empire City (Penthouse & Duplex sông Sài Gòn).
   - 2. Bán Đảo Thảo Điền: Holm Villas, D'Edge, Q2 Thảo Điền (Biệt thự ven sông thích ứng độ ẩm 85%).
   - 3. Đô Thị Phú Mỹ Hưng: Chateau Villas, Midtown The Peak (Biệt thự phố vườn đối lưu gió Nam).
   - 4. Trung Tâm Ba Son Quận 1: Grand Marina Saigon (Căn hộ ven sông tiêu âm đô thị).
   - 5. Khu Đông The Global City & Vinhomes: Biệt thự compound cản bức xạ nắng Tây.
   - 6. Xưởng Mộc May Đo Thạnh Xuân Q.12: Cơ sở chế tác mộc 1.200m² từ 2016.
2. Tương tác trực quan:
   - Các điểm ghim (map pin) phát xung ánh sáng nhẹ (pulse glow).
   - Khi nhấp/hover vào điểm ghim: Hiển thị card popover sang trọng gồm ảnh công trình thực tế, loại hình, hướng đón gió/nắng và nút "Khám phá công trình".
   - Bộ chuyển đổi chế độ xem (View Toggle) tại \`/projects\`: "Lưới Hình Ảnh" (Gallery View) ↔ "Bản Đồ Không Gian Sài Gòn" (Spatial Map View).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG THỬ NGHIỆM TACTILE MOODBOARD & ÂM HỌC (TactileMoodboardStudio.tsx)
----------------------------------------------------------------------
Xây dựng công cụ tương tác \`src/components/studio/TactileMoodboardStudio.tsx\` tích hợp vào \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/studio/page.tsx\`:
1. 6 Bảng Moodboard tuyển chọn đặc thù:
   - "Hoàng Hôn Thủ Thiêm": Travertine Ý + Gỗ Óc Chó FAS + Vôi khoáng Calce + Đèn Warm Dim 2700K.
   - "Gió Sông Thảo Điền": Gỗ Teak mộc + Vải Lanh Bỉ + Terrazzo nhám + Cây trầu bà Nam Mỹ.
   - "Tĩnh Lặng Chateau": Gỗ Mun sọc + Da thuộc thảo mộc Ý + Kim loại đồng thau xước + Lụa tơ tằm.
   - "Wabi-Sabi Thiền Tự": Gỗ Sồi tự nhiên + Giấy Dó thủ công + Vữa rơm hữu cơ + Đất sét nung.
   - "Hiện Đại Nhiệt Đới": Gỗ Căm Xe tái sinh + Kính gân Moru + Gốm Bát Tràng mờ + Bê tông mài.
   - "Tối Giản Tinh Khiết": Gỗ Ash sáng màu + Đá thạch anh trắng + Nhôm anode mờ + Vải cotton organic.
2. Chỉ số kỹ thuật thời gian thực:
   - Hệ số tiêu âm trung bình NRC (Noise Reduction Coefficient: 0.60 – 0.75).
   - Khả năng chống ẩm nhiệt đới (95% – 98%).
   - Nhiệt độ màu ánh sáng đề xuất (Warm 2700K, CRI >= 97).
3. Nút hành động: "Lưu Bảng Moodboard & Thảo Luận Với KTS" (mở modal đăng ký tư vấn).

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: LỊCH HẸN TƯ VẤN VIP 1-1 CÙNG KTS TRƯỞNG (VipBookingCalendar.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/consultation/VipBookingCalendar.tsx\` và tích hợp vào trang \`src/app/(site)/contact/page.tsx\`:
1. 3 Hình thức gặp mặt riêng tư:
   - "Tại Văn Phòng Studio GuHomes" (Bình Thạnh / Q.1).
   - "Khảo Sát Trực Tiếp Tại Mặt Bằng / Căn Hộ Của Gia Chủ" (Thủ Thiêm, Thảo Điền, Phú Mỹ Hưng...).
   - "Trải Nghiệm Trực Tiếp Tại Xưởng Mộc May Đo Thạnh Xuân, Q.12".
2. Chọn khung giờ linh hoạt:
   - Khung giờ: Sáng (09:00 – 11:30) | Chiều (14:00 – 16:30) | Tối (18:00 – 20:00).
   - Chọn ngày trong tuần hoặc cuối tuần.
3. Form thông tin gia chủ: Họ tên, Số điện thoại/Zalo, Tên dự án/Mặt bằng, Nhu cầu cụ thể.
4. Gửi trực tiếp qua Server Action \`submitContact\` với thông báo xác nhận lịch hẹn sang trọng.

----------------------------------------------------------------------
ĐIỀU PHỐI MULTI-AGENT & QUY CHUẨN THỰC THI:
----------------------------------------------------------------------
- Chạy \`npx tsc --noEmit\` đảm bảo 0 lỗi tuyệt đối.
- Cập nhật \`scripts/test-routes-seo.ts\` kiểm tra toàn diện tất cả các tuyến.
- Biên dịch sản xuất \`npm run build\` đạt Exit Code 0.
- Commit git rõ ràng, chuẩn mực trên nhánh \`enhaceta\`.
- Tự động duy trì chu kỳ làm việc liên tục xuyên đêm!`

async function main() {
  console.log(`Đang phát lệnh Sprint 11 tới Agent ${TARGET_ID}...`)
  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'agentapi',
    'send-message',
    '--title=Master Directive Sprint 11 - Saigon Project Map, Tactile Moodboard Studio and VIP Booking',
    TARGET_ID,
    SPRINT_11_DIRECTIVE
  ], {
    windowsHide: true,
    shell: false
  })

  proc.stdout.on('data', (d) => process.stdout.write(d.toString()))
  proc.stderr.on('data', (d) => process.stderr.write(d.toString()))

  proc.on('close', (code) => {
    console.log(`\nLệnh Sprint 11 đã được gửi thành công tới Agent ${TARGET_ID} (exit code: ${code})`)
  })
}

main().catch(console.error)
