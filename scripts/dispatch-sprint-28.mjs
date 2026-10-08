import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_28_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 28: SÀN GỖ TEAK SÂN THƯỢNG, PHÒNG CHIẾU PHIM DOLBY ATMOS & THẢM TƠ SEN DỆT TAY]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 27:
- SaigonMonsoonRainwaterHarvestLab, HandcraftedLacquerArtisanAtelier, và PrivateFamilyArchiveVault đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống thu nước mưa làm mát sàn mái, xưởng sơn mài 18 lớp thếp vàng và két kỷ vật gia đình chống cháy 1000°C đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 28:
"SÀN GỖ TEAK SÂN THƯỢNG, PHÒNG CHIẾU PHIM DOLBY ATMOS & THẢM TƠ SEN DỆT TAY"

Mục tiêu cốt lõi: Làm chủ kỹ nghệ sàn gỗ Teak ngoài trời đi chân trần không bỏng rát cho penthouse; thiết kế âm học phòng chiếu phim Dolby Atmos chuẩn THX với tán âm gỗ óc chó; và cá nhân hóa không gian với thảm dệt tay len lông cừu & tơ sen nhuộm thảo mộc tự nhiên.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: SÀN GỖ TEAK NGOÀI TRỜI KHÁNG MƯA NẮNG (SaigonBespokeTeakDeckingPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokeTeakDeckingPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Gỗ Ngoài Trời Chân Trần Êm Ái:
   - Penthouse và ban công biệt thự chịu nhiệt độ bề mặt nắng gắt 58°C vào mùa khô và mưa dầm mùa mưa. GuHomes ứng dụng gỗ Teak tự nhiên tuổi thọ cao chứa lượng dầu tự nhiên dồi dào, lắp đặt trên hệ khung đà nhôm hàng không định hình với chốt cài âm giấu vít 100%.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Cấu hình Teak Pavilion: Sàn quanh hồ bơi vô cực chống trượt; Vườn thiền trà trên cao; Ban công ngắm hoàng hôn sông Sài Gòn.
   - Thử nghiệm hấp thụ nhiệt độ tương tác: Sàn gạch 58.5°C (bỏng rát) vs Sàn Teak GuHomes 33.8°C (êm dịu mát chân).
   - Hệ thống thoát nước mưa siêu tốc: Khe co giãn 4mm và rãnh thoát nước ngầm chịu bão 120 mm/h không ứ đọng.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG CHIẾU PHIM HI-END TIÊU CHUẨN DOLBY ATMOS (BespokeAcousticHomeCinemaLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/BespokeAcousticHomeCinemaLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Âm Thanh Điện Ảnh Tinh Khiết Tại Gia:
   - Không gian rạp chiếu phim tư gia của thượng khách đòi hỏi sự chính xác tuyệt đối của sóng âm. Triệt tiêu sóng đứng (Standing Waves) dải tần thấp và phản xạ tiếng chói bằng các cấu kiện tán âm QRD (Quadratic Residue Diffuser) phay gỗ óc chó nguyên khối tại xưởng Thạnh Xuân.
2. Tính năng kỹ thuật & UI tương tác:
   - Bẫy âm trầm góc phòng (Bass Trap) bọc len Kvadrat triệt tiêu dải siêu trầm 30Hz - 80Hz.
   - Thời gian âm vang RT60 chuẩn rạp phim 0.3s (so với 1.2s của phòng thông thường).
   - Trình mô phỏng đáp tuyến âm thanh tương tác: Chuyển đổi nghe thử âm thanh trước và sau khi xử lý âm học GuHomes.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG DỆT THẢM TƠ SEN & LEN LÔNG CỪU THỦ CÔNG (ArtisanHandmadeRugStudio.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeRugStudio.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Dệt Nốt Thắt Thủ Công Độc Bản:
   - Thảm trải sàn không dệt máy tổng hợp tích điện. Nghệ nhân dệt tay thủ công từng nút thắt từ sợi tơ sen Đồng Tháp và len lông cừu tự nhiên mềm mại, nhuộm màu thực vật từ củ nâu, lá chàm và vỏ lựu hoàn toàn không hóa chất.
2. Tính năng kỹ thuật & UI tương tác:
   - Mật độ dệt cao cấp 180 nốt thắt/inch vuông (Hand-knotted 180 KPSI) đàn hồi êm ái bước chân.
   - Bộ chọn hoa văn hình học Quiet Luxury hòa hợp với đường vân gỗ óc chó và đá vôi.
   - Form tư vấn may đo kích thước thảm theo tỷ lệ phòng kèm mã tiếp đón VIP \`GU-RUG-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-28): add SaigonBespokeTeakDeckingPavilion, BespokeAcousticHomeCinemaLab, and ArtisanHandmadeRugStudio with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!`;

console.log('Updating master-orchestrator-state.json for Sprint 28...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-26-sprint-28-teak-cinema-rug',
    title: 'Sàn Gỗ Teak Sân Thượng, Phòng Chiếu Phim Dolby Atmos & Thảm Tơ Sen Dệt Tay',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 28 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 28', TARGET_ID, SPRINT_28_DIRECTIVE],
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
