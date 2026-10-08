import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_51_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 51: PHÒNG THÍNH ÂM VĨ CẦM STRADIVARIUS, VỌNG LÂU TRÀ VEN SÔNG & BỘ DAO THÌA BẠC 925 GÒ TAY]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 51:
"PHÒNG THÍNH ÂM VĨ CẦM STRADIVARIUS, VỌNG LÂU TRÀ VEN SÔNG & BỘ DAO THÌA BẠC 925 GÒ TAY"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm vĩ cầm vòm gỗ Vân Sam Val di Fiemme cấu trúc Stradivarius; kiến tạo vọng lâu trà đạo đón hoàng hôn ven sông với hệ lam Teak xoay cản nắng hướng Tây; và chế tác bộ dao thìa nĩa bạc 925 gò tay thủ công Định Công.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍNH ÂM VĨ CẦM VÒM GỖ VÂN SAM (SaigonAcousticViolinSanctuaryVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticViolinSanctuaryVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tiếng Tơ Đồng Vút Lên Tầng Không:
   - Phòng hòa âm vĩ cầm mô phỏng cấu trúc âm học hộp đàn Stradivarius 1715 với vòm gỗ Vân Sam cộng hưởng (Resonance Spruce) nhập khẩu từ thung lũng Val di Fiemme (Ý); sàn đá Carrara cách chấn; hệ thống rèm nhung lụa Ý kéo điện thay đổi thời gian vang RT60 từ 0.32s (Chamber) đến 0.45s (Concert Soloist); tủ kính trưng bày kiểm soát ẩm 50% RH & 21°C bằng cảm biến quang học.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử âm sắc vĩ cầm qua Web Audio API (Mendelssohn Violin Concerto, Bach Chaconne in D Minor).
   - Thanh trượt điều chỉnh rèm âm học và hiển thị biến thiên thời gian vang RT60 thời gian thực.
   - Bộ chọn kịch bản chiếu sáng Soloist CRI 99 UGR < 10.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: VỌNG LÂU TRÀ ĐẠO ĐÓN HOÀNG HÔN VEN SÔNG (SaigonRiversideSunsetTeaObservatory.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRiversideSunsetTeaObservatory.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Ngắm Dòng Trôi - Thưởng Nốt Hương Trà:
   - Vọng lâu trà đạo ngoài trời hướng sông Sài Gòn với hệ lam gỗ Teak Miến Điện xoay 0° - 90° cản bức xạ nắng Tây gay gắt; bàn trà gỗ Gõ Đỏ uốn lượn theo dòng chảy sông; hệ béc phun sương nano hạ nhiệt 8°C trong những buổi chiều oi ả; đèn hắt màu hổ phách 2200K ấm dịu hòa vào ánh hoàng hôn đỏ tím trên mặt nước.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ điều khiển góc xoay hệ lam Teak (0° cản nắng hoàn toàn, 45° lấy gió đối lưu, 90° ngắm toàn cảnh sông).
   - Mô phỏng 3 sắc độ hoàng hôn Sài Gòn (Vàng Mật Ong 17:00 -> Đỏ Rực Hướng Tây 17:40 -> Tím Hoàng Hôn 18:15).
   - Phát âm thanh tiếng sóng sông vỗ bờ và tiếng chim về tổ qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ DAO THÌA BẠC 925 GÒ TAY THỦ CÔNG (ArtisanBespokeSilverCutleryVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBespokeSilverCutleryVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Dạ Yến Vương Giả Trong Từng Chi Tiết Chạm:
   - Bộ đồ ăn cao cấp 24 món gò từ bạc nguyên chất 925 chuẩn Định Công kết hợp chuôi cầm gỗ Mun sừng nguyên khối; bề mặt đánh bóng gương bằng bột ngọc trai tự nhiên; đặc tính kháng khuẩn ion bạc Ag+ bảo vệ sức khỏe gia chủ; hộp đựng gỗ Óc Chó lót da cừu nhung chống xỉn màu (\`GU-SILVER-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình xoay 360° bộ dao thìa nĩa bạc với ánh sáng phản quang kim loại quý.
   - Kính phóng đại 20x soi dấu triện bạc 925 và vết búa rèn tay độc bản.
   - Form may đo khắc gia huy dòng họ và số lượng khách mời bàn tiệc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-51): add SaigonAcousticViolinSanctuaryVault, SaigonRiversideSunsetTeaObservatory, and ArtisanBespokeSilverCutleryVault with 100% SEO pass'
`;

async function dispatchSprint51() {
  console.log(`[Master Orchestrator] Dispatching Sprint 51 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-49-sprint-51-violin-teaocean-silvercutlery',
    title: 'Phòng Thính Âm Vĩ Cầm, Vọng Lâu Trà Ven Sông & Bộ Dao Thìa Bạc 925',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 51 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_51_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint51();
