import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_59_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 59: PHÒNG HÒA ÂM ĐÀN ĐÁ TÂY NGUYÊN, BỂ NGÂM LẠNH ĐÁ BAZAN CỘT & BỘ BÚT LÔNG SƠN MÀI CẨN BẠC]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 59:
"PHÒNG HÒA ÂM ĐÀN ĐÁ TÂY NGUYÊN, BỂ NGÂM LẠNH ĐÁ BAZAN CỘT & BỘ BÚT LÔNG SƠN MÀI CẨN BẠC"

Mục tiêu cốt lõi: Thiết kế không gian thính phòng trưng bày và hòa tấu đàn đá huyền thạch Tây Nguyên cổ xưa vách đá bazan xẻ rãnh tiêu âm; kiến tạo bể ngâm lạnh ngoài trời khoét từ trụ đá bazan lục lăng nguyên khối Gia Lai; và xưởng chế tác bộ bút lông thư họa sơn mài then cẩn bạc xà cừ cùng ống bút gỗ Cẩm lai nguyên khối.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM ĐÀN ĐÁ TIỀN SỬ TÂY NGUYÊN (SaigonAcousticLithophoneSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticLithophoneSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tiếng Vang Của Đất Trời Triệu Năm:
   - Bộ đàn đá 12 thanh huyền nham bazan tự nhiên vùng Tây Nguyên (Khánh Sơn / Đắk Kar) được ghè đẽo thủ công định âm chuẩn ngũ cung; vách phòng ốp đá bazan núi lửa bề mặt xẻ rãnh tiêu âm QRD tự nhiên chống dội âm; RT60 lý tưởng 0.40s; bệ kê đàn đá lót nỉ len cừu triệt rung phản hồi.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng âm sắc gõ thanh đá bazan ngân vang huyền bí qua Web Audio API.
   - Sơ đồ 12 thanh đá với dải tần số âm thanh từ 220Hz đến 1.760Hz.
   - Điều khiển kịch bản ánh sáng hang động huyền ảo 2000K - 2400K.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỂ NGÂM LẠNH TRỤ ĐÁ BAZAN NGUYÊN KHỐI (ArtisanSaigonMonolithicBasaltOutdoorPlungePool.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanSaigonMonolithicBasaltOutdoorPlungePool.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Trầm Mình Vào Lòng Dung Nham Núi Lửa:
   - Bể ngâm lạnh (Cold Plunge) chế tác từ một cột đá bazan lục lăng nguyên khối 1.200kg khai thác tại Gia Lai, đục rỗng lòng đá và mài nhẵn bằng tay; nước làm lạnh Inverter 10°C - 12°C kết hợp hệ thống Ozone & UV-C kháng khuẩn; vòi nước ống tre già hun khói xả tràn tự nhiên; viền ngoài giữ nguyên lớp vỏ phong hóa và rêu ẩm tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - Điều khiển nhiệt độ nước ngâm lạnh: 8°C (Thử thách băng giá), 11°C (Tối ưu phục hồi cơ bắp), 14°C (Thư giãn nhẹ nhàng).
   - Đồng hồ bấm giờ ngâm lạnh chuẩn liệu pháp Wim Hof kèm nhịp thở hướng dẫn.
   - Bảng theo dõi nồng độ Ozone và độ tinh khiết của nước.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ BÚT LÔNG SƠN MÀI CẨN BẠC & ỐNG CẨM LAI (ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Bút Nghiên Truyền Đời - Nét Chữ Nết Người:
   - Bộ 5 cây bút lông thư họa cán sơn mài then bóng gương cẩn hoa văn chỉ bạc 999 và ốc xà cừ; đầu lông phối từ lông chồn tuyết Siberi và lông dê núi sấy nhiệt; ống cắm bút tiện từ khối gỗ Cẩm lai Bà Rịa vân hoa rực rỡ bọc đai đồng thau nguyên chất (\`GU-BRUSH-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính phóng đại 18x soi sợi bạc cẩn trên thân bút sơn mài.
   - Thử nghiệm độ đàn hồi và ngậm mực của từng loại ngòi bút (Tiểu Khải, Trung Khải, Đại Tự).
   - Form may đo khắc triện tên chủ nhân lên ống bút gỗ Cẩm lai.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-59): add SaigonAcousticLithophoneSanctuary, ArtisanSaigonMonolithicBasaltOutdoorPlungePool, and ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier with 100% SEO pass'
`;

async function dispatchSprint59() {
  console.log(`[Master Orchestrator] Dispatching Sprint 59 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-57-sprint-59-lithophone-basaltplunge-lacquerbrush',
    title: 'Phòng Đàn Đá Tây Nguyên, Bể Ngâm Đá Bazan Cột & Bút Lông Cẩn Bạc',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 59 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_59_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint59();
