import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_38_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 38: PHÒNG THƯ VIỆN ĐĨA THAN HI-END, BỒN LỬA ĐÁ NGUYÊN KHỐI & HẦM MUỐI HIMALAYA]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 37:
- ArtisanHelicalRibbonStaircaseVault, CollectorAutomotiveCleanroomVault, và ArtisanBotanicalCurtainAtelier đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống cầu thang xoắn dải lụa ribbon, hầm đỗ siêu xe áp suất dương và xưởng may rèm tơ tằm Bảo Lộc đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 38:
"PHÒNG THƯ VIỆN ĐĨA THAN HI-END, BỒN LỬA ĐÁ NGUYÊN KHỐI & HẦM MUỐI HIMALAYA"

Mục tiêu cốt lõi: Thiết kế phòng nghe nhạc đĩa than Hi-End đạt chuẩn âm học RT60 = 0.35s với mâm xoay đệm từ trường chống rung; chế tác bồn lửa ngoài trời sunken lounge đá bazan Thanh Hóa nguyên khối đốt bioethanol không khói ven sông; và kiến tạo phòng trị liệu muối khoáng hồng Himalaya ion âm tái tạo năng lượng cho gia chủ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THƯ VIỆN ÂM THANH ĐĨA THAN HI-END (SaigonAudiophileVinylSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAudiophileVinylSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Học Tinh Tế & Bảo Tồn Âm Sắc Nguyên Bản:
   - Phòng thẩm âm biệt lập xử lý âm học RT60 = 0.35s chuẩn thính phòng quốc tế. Hệ vách tán âm 3D gỗ óc chó FAS đục lỗ âm kết hợp sợi len cừu tự nhiên triệt tiêu sóng đứng. Mâm đĩa than cơ khí chính xác mạ vàng 24K nâng bằng đệm từ trường lơ lửng trên bệ đá phiến 800kg cách ly hoàn toàn rung chấn sàn nhà. Nguồn điện đồng OFC tinh khiết có hệ thống biến áp cách ly riêng biệt.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 chế độ âm học kỹ thuật số mô phỏng (Vinyl Master, Live Orchestra, Vocal Acoustic, Late Night Low-Level).
   - Biểu đồ đáp ứng tần số phẳng 20Hz - 20kHz hiển thị thời gian thực.
   - Thanh trượt điều khiển mức độ triệt tiêu rung chấn micro-vibration damping.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỒN LỬA SUNKEN LOUNGE ĐÁ NGUYÊN KHỐI VEN SÔNG (SaigonRiversideOutdoorFirePitVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRiversideOutdoorFirePitVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Giao Hòa Lửa & Nước Trong Gió Đêm Sài Gòn:
   - Khu lounge hạ âm (sunken pit) bên bờ sông với bồn lửa tròn tiện từ khối đá Thanh Hóa 1.8 tấn. Đầu đốt bioethanol sinh học không khói, không tàn tro, an toàn tuyệt đối trước gió sông nhiệt đới. Băng ghế tròn gỗ Teak Miến Điện lau dầu hữu cơ chống mối mọt kết hợp đệm bọc vải Sunbrella Bỉ trượt nước. Viền đèn LED âm 1800K ấm áp soi bóng gờ đá thô mộc.
2. Tính năng kỹ thuật & UI tương tác:
   - Điều khiển ngọn lửa 3 chế độ: Ánh than hồng Ember (20%), Sưởi ấm Warmth (50%), Bùng sáng Lễ hội Feast Glow (100%).
   - Trình giả lập âm thanh lửa reo tí tách và sóng nước bờ sông qua Web Audio API.
   - Cơ chế ngắt tự động cảm biến gió an toàn bảo vệ gia đình.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: PHÒNG TRỊ LIỆU MUỐI KHOÁNG HIMALAYA ION ÂM (PrivateHimalayanSaltCaveWellnessVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/PrivateHimalayanSaltCaveWellnessVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Hơi Thở Tinh Khiết Giữa Lòng Đô Thị Nhiệt Đới:
   - Vách phòng xây từ 3.5 tấn gạch đá muối hồng Himalaya tự nhiên rọi đèn sợi đốt 2200K ấm áp, giải phóng mật độ ion âm cao 2.500 ions/cm³ thanh lọc đường hô hấp. Máy tạo khí dung muối khô y khoa hạt mịn 1-5 micron. Giường cát muối hồng sưởi nhiệt 38°C kích thích lưu thông tuần hoàn máu. Ghế tựa công thái học gỗ tần bì uốn nhiệt (\`GU-SALT-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình chọn liệu trình trị liệu: 20 phút sảng khoái, 45 phút phục hồi sâu, 60 phút thiền định.
   - Bảng đồng hồ hiển thị vi khí hậu thời gian thực: Nhiệt độ, Độ ẩm, Mật độ ion âm.
   - Form tư vấn giải pháp phòng muối khoáng dinh thự cao cấp.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-38): add SaigonAudiophileVinylSanctuary, SaigonRiversideOutdoorFirePitVault, and PrivateHimalayanSaltCaveWellnessVault with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 38 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-36-sprint-38-vinyl-firepit-saltcave',
    title: 'Phòng Thư Viện Đĩa Than Hi-End, Bồn Lửa Đá Nguyên Khối & Hầm Muối Himalaya',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 38.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_38_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 38 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-38:', err);
  process.exit(1);
});
