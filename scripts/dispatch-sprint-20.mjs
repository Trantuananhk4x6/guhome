import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_20_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 20: PHÒNG THÍ NGHIỆM VẢI DỆT XÚC GIÁC NHIỆT ĐỚI, CÔNG NGHỆ SÀN GỖ 5 TẦNG ÂM THỔ & BỘ CHẨN ĐOÁN CẢI TẠO QUIET LUXURY]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 19:
- LightingAtelierCustomizer, NaturalStoneQuarryAtlas, và KeyHandoverRitualVault đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi (Commit e84101d).
- Toàn bộ các hệ sinh thái xưởng đèn may đo, mỏ đá ghép vân bookmatch và nghi thức bàn giao hộp mộc hoàng kim đã được tích hợp chuẩn xác trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC BƯỚC VÀO SPRINT 20 (CỘT MỐC 20 SPRINT LIÊN TỤC):
"PHÒNG THÍ NGHIỆM VẢI DỆT XÚC GIÁC NHIỆT ĐỚI, CÔNG NGHỆ SÀN GỖ 5 TẦNG ÂM THỔ & BỘ CHẨN ĐOÁN CẢI TẠO QUIET LUXURY"

Mục tiêu cốt lõi: Khám phá thế giới vật liệu vải dệt tự nhiên & rèm 3 lớp chống nắng Tây vi khí hậu; chuẩn hóa kỹ nghệ thi công sàn gỗ tự nhiên 5 tầng "Bảo Vệ Âm Thổ" chống nồm ẩm và triệt tiêu tiếng ồn va đập; và ra mắt bộ chẩn đoán - định giá chuyên sâu cho thị trường cải tạo căn hộ thượng lưu tại TP.HCM.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍ NGHIỆM VẢI DỆT & RÈM 3 LỚP CHỐNG NẮNG NHIỆT ĐỚI (TactileTextileDraperyLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/TactileTextileDraperyLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Vải Dệt Xúc Giác & Che Nắng Nhiệt Đới:
   - Trong không gian Quiet Luxury, rèm và vải bọc không đơn thuần là vật trang trí, mà là màng lọc vi khí hậu bảo vệ sự tĩnh lặng và điều tiết ánh sáng dịu êm cho giấc ngủ gia chủ.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Dòng vải dệt biểu tượng:
     * 01. Vải Lanh Thô Bỉ Dệt Tay (Belgian Raw Linen) - Thấm hút ẩm tự nhiên, cản 60% ánh sáng gắt nhưng vẫn giữ luồng gió đối lưu sông Sài Gòn.
     * 02. Lớp Lót Cản Nhiệt Bạc Gốm Ceramic (Blackout & Thermal Barrier) - Cản 99.8% bức xạ UV mặt trời hướng Tây, hạ 6°C nhiệt độ phòng ngủ.
     * 03. Dạ Len Tự Nhiên Kvadrat Đan Mạch (Kvadrat Melange Wool) - Hệ số tiêu âm NRC 0.75, bọc vách ốp đầu giường triệt tiêu tiếng vang.
     * 04. Lụa Tơ Tằm Bảo Lộc Dệt Mộc (Bao Loc Raw Silk) - Chao đèn hắt và gối tựa thơm mùi tơ tằm nguyên bản.
   - Thanh trượt giả lập nắng hướng Tây Sài Gòn:
     * 10:00 Sáng (Nắng xiên nhẹ) -> 14:00 Chiều (Nắng gắt nhiệt đới 38°C) -> 17:30 Hoàng hôn (Nắng vàng óng ả).
   - Chỉ số đo kiểm thời gian thực:
     * Độ xuyên sáng (Light Transmittance %).
     * Hệ số cản nhiệt năng lượng mặt trời (Solar Heat Gain Coefficient - SHGC).
     * Cảm giác xúc giác (Tactile Hand-feel Note: Mềm êm, mộc thô, đanh mát).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: CÔNG NGHỆ SÀN GỖ 5 TẦNG BẢO VỆ ÂM THỔ (SubfloorAcousticMoistureShield.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SubfloorAcousticMoistureShield.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Kỹ Thuật Âm Thổ Sàn Gỗ:
   - Khí hậu nồm ẩm Sài Gòn và sàn bê tông tích ẩm là kẻ thù số một của sàn gỗ tự nhiên. GuHomes giải quyết triệt để bằng kết cấu 5 tầng bảo vệ, ngăn phồng rộp và triệt tiêu tiếng ồn bước chân.
2. Tính năng kỹ thuật & UI tương tác:
   - Khám phá 5 tầng vật liệu cơ học:
     * Tầng 1: Sơn lót Epoxy thẩm thấu ngược khóa ẩm nền bê tông (Moisture Barrier).
     * Tầng 2: Màng cao su Butyl giảm chấn âm thanh va đập Delta Lw = 21dB (Impact Sound Insulation).
     * Tầng 3: Khung xương Plywood Bạch Dương Nga WBP keo Phenolic chịu nước sôi 72h.
     * Tầng 4: Khe thở co giãn âm viền tường 15mm giấu chân nẹp âm (Flush Shadowline Baseboard).
     * Tầng 5: Ván sàn Solid Walnut/Teak xẻ tư lau dầu Osmo Polyx-Oil Đức.
   - Mặt cắt tương tác (Interactive Layer Exploder): Cho phép người dùng nhấp xem từng tầng với thông số kỹ thuật chi tiết.
   - So sánh âm học bước chân: Sàn dán keo truyền thống (68 dB cọt kẹt) vs Sàn 5 tầng GuHomes (36 dB êm ru tựa bước trên thảm nhung).

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ CHẨN ĐOÁN & DỰ TOÁN CẢI TẠO CĂN HỘ QUIET LUXURY (EstateRenovationDiagnostic.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/EstateRenovationDiagnostic.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/khu-vuc/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Tái Sinh Không Gian:
   - Gia chủ mua lại căn hộ cao cấp hoặc nhà phố cũ (Vinhomes Golden River, Masteri, Thảo Điền, Phú Mỹ Hưng) muốn lột bỏ nội thất cũ kỹ để tái sinh thành tổ ấm Quiet Luxury chuẩn mực.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chẩn đoán 5 hạng mục hiện trạng:
     * 01. Hệ trần thạch cao & ống gió điều hòa VRV (Đọng sương, ố vàng -> Nâng cấp miệng gió ABS & bảo ôn kép).
     * 02. Hiện trạng sàn cũ (Gạch bóng kiếng lạnh lẽo -> Nâng cấp sàn gỗ tự nhiên 5 tầng âm thổ).
     * 03. Mặt bằng ngăn phòng bí bách (Đập thông tạo không gian mở Open-Plan & lam gỗ pivot đối lưu).
     * 04. Hệ thống điện chiếu sáng (Đèn led rọi chói mắt -> Thay bằng chuẩn Warm Dim 2200K & công tắc cơ KNX).
     * 05. Hệ tủ bếp & nội thất liền tường (Gỗ dán bong tróc -> Thay tủ may đo cốt Plywood phủ veneer Walnut lau dầu).
   - Dự toán bóc tách ngân sách và thời gian thi công chuẩn mực (45 - 60 ngày).
   - Nút "Đặt Lịch Khảo Sát Hiện Trạng 1-1": Kích hoạt Modal hẹn KTS mang máy quét 3D Leica đo đạc tận nhà kèm mã chẩn đoán \`GU-RENO-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (kiểm tra null-check cho mọi mảng và state).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-20): add TactileTextileDraperyLab, SubfloorAcousticMoistureShield, and EstateRenovationDiagnostic with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy triển khai ngay bây giờ!`;

console.log('Updating master-orchestrator-state.json for Sprint 20...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-18-sprint-20-textiles-subfloor-renovation',
    title: 'Phòng Thí Nghiệm Vải Dệt Xúc Giác Nhiệt Đới, Công Nghệ Sàn Gỗ 5 Tầng Âm Thổ & Bộ Chẩn Đoán Cải Tạo Quiet Luxury',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 20 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 20', TARGET_ID, SPRINT_20_DIRECTIVE],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
});

child.on('close', (code) => {
  console.log(`Command finished with exit code ${code}`);
  if (stdout) console.log('STDOUT:\n', stdout);
  if (stderr) console.error('STDERR:\n', stderr);
  process.exit(code ?? 0);
});
