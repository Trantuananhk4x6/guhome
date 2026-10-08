import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_69_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 69: PHÒNG THÍNH PHÒNG TỲ BÀ GỖ MUN, SÂN TRONG THAN ĐƯỚC CẦN GIỜ KHỬ KHUẨN & ĐÔI ĐŨA NGỰ DỤNG MUN SỪNG KHẢM XÀ CỪ BỌC BẠC]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 69:
"PHÒNG THÍNH PHÒNG TỲ BÀ GỖ MUN, SÂN TRONG THAN ĐƯỚC CẦN GIỜ KHỬ KHUẨN & ĐÔI ĐŨA NGỰ DỤNG MUN SỪNG KHẢM XÀ CỪ BỌC BẠC"

Mục tiêu cốt lõi: Thiết kế thính phòng Đàn Tỳ Bà 4 dây tơ tằm cổ truyền vòm trần gỗ Mun sọc và Huỳnh Đường triệt tiêu sóng đứng RT60 = 0.33s; kiến tạo sân trong thiền định lát than đước rừng ngập mặn Cần Giờ nung ém khói hạ nhiệt 3.8°C và khử mùi vi khí hậu nhiệt đới; và chế tác đôi đũa ngự dụng gỗ Mun sừng khảm xà cừ Tam Khôi bọc bạc ta 999 thủ công độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍNH PHÒNG TỲ BÀ GỖ MUN SỌC (SaigonBespokePipaLuteSanctuaryPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBespokePipaLuteSanctuaryPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Dây Tơ Phím Trúc - Hạt Ngọc Rơi Đĩa Ngọc:
   - Thính phòng tôn vinh đàn Tỳ Bà tứ huyền cổ truyền Việt Nam chế tác từ gỗ Mun hoa và gỗ Huỳnh Đường cổ thụ; 4 dây tơ tằm se tay; 16-24 phím trúc già vát góc âm học; vòm trần paraboloid triệt sóng đứng dải trung cao 800Hz - 4.000Hz; thời gian vang RT60 = 0.33s; bục diễn bằng phiến đá xanh bazan thô mộc; tủ bảo tồn vi khí hậu 52.0% RH.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình thưởng âm Tỳ Bà điệu Kim Tiền, Bình Bán Sách qua Web Audio API với kỹ thuật vê dây (tremolo) và vuốt nốt mượt mà.
   - Trình điều chỉnh độ cao 4 dây đàn (A-D-E-A).
   - 3 kịch bản ánh sáng trăng rằm tĩnh lặng (2200K, 2500K, 3000K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: SÂN TRONG THAN ĐƯỚC CẦN GIỜ KHỬ KHUẨN & ION ÂM (SaigonCanalSideMangroveCharcoalCourtyard.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonCanalSideMangroveCharcoalCourtyard.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Than Đước Trắng - Thanh Lọc Vi Khí Hậu Sông Nước:
   - Sân trong thiền định lát than đước rừng ngập mặn Cần Giờ nung ém khói 1.000°C (Binchotan Cần Giờ) có khả năng thanh lọc không khí, hấp thụ bức xạ điện từ và triệt tiêu ẩm mốc mùa mưa Nam Bộ; rãnh nước đá suối ngầm tuần hoàn tạo ion âm; cây bàng vuông và phong ba vi khí hậu hạ nhiệt 3.8°C.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ đo chỉ số thanh lọc không khí (Độ ẩm hấp thụ, Bức xạ hấp thụ, Nồng độ ion âm / cm³).
   - Web Audio tiếng gió luồn qua khe rãnh than đước và tiếng nước suối chảy róc rách.
   - Form tư vấn kiến tạo vi khí hậu sân trong bằng than hoạt tính tự nhiên cho biệt thự ven sông.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: ĐÔI ĐŨA NGỰ DỤNG MUN SỪNG KHẢM XÀ CỪ BỌC BẠC TA (ArtisanSilverInlaidEbonyChopsticksAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanSilverInlaidEbonyChopsticksAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Ẩm Thực Cung Đình - Đôi Đũa Bát Giác Cân Bằng:
   - Bộ đôi đũa ngự dụng chế tác từ gỗ Mun sừng Khánh Hòa đặc quánh chìm trong nước; khảm xà cừ ốc đỏ Singapore họa tiết Tam Khôi; bịt đầu gắp bằng bạc ta 999 nguyên chất có tính kháng khuẩn tự nhiên và khử độc; thân đũa vát bát giác công thái học cân bằng trọng tâm 42% từ chuôi; mã kiểm định độc bản (\`GU-EBONY-CHOPSTICKS-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng kiểm tra trọng tâm công thái học khi cầm gắp.
   - Tùy biến khắc gia huy bằng chỉ bạc 999 dát chìm vào thân gỗ Mun.
   - Form đăng ký chế tác set đũa ngự dụng hoàng gia cho bàn tiệc tư gia cao cấp.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-69): add SaigonBespokePipaLuteSanctuaryPavilion, SaigonCanalSideMangroveCharcoalCourtyard, and ArtisanSilverInlaidEbonyChopsticksAtelier with 100% SEO pass'
`;

async function dispatchSprint69() {
  console.log(`[Master Orchestrator] Dispatching Sprint 69 to Agent \${TARGET_ID}...`);

  let state = { completedDirectives: [], currentDirectiveIndex: 0 };
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-67-sprint-69-pipa-mangrovecharcoal-ebonychopsticks',
    title: 'Phòng Thính Phòng Tỳ Bà, Sân Trong Than Đước Cần Giờ & Đôi Đũa Mun Sừng Bọc Bạc',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[Master Orchestrator] State updated with Sprint 69 directive.');

  const proc = spawn(
    LANGUAGE_SERVER_EXE,
    [
      '--mode=agent_to_agent',
      `--to=${TARGET_ID}`,
      `--message=${SPRINT_69_DIRECTIVE}`
    ],
    { stdio: 'inherit', shell: true }
  );

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Dispatch process closed with code ${code}`);
  });
}

dispatchSprint69().catch(console.error);
