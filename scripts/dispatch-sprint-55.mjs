import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_55_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 55: PHÒNG HÒA TẤU ĐÀN CLAVECIN BAROQUE, SÂN TRONG LÒ GỐM GIA ĐỊNH & XƯỞNG DAO CHẶT DAMASCUS THỚT NGHIẾN]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 55:
"PHÒNG HÒA TẤU ĐÀN CLAVECIN BAROQUE, SÂN TRONG LÒ GỐM GIA ĐỊNH & XƯỞNG DAO CHẶT DAMASCUS THỚT NGHIẾN"

Mục tiêu cốt lõi: Thiết kế phòng hòa tấu đàn Harpsichord/Clavecin vỏ gỗ Dổi sơn ta thếp vàng thế kỷ 18 tiêu âm vòm sóng; kiến tạo sân trong lưu giữ nét gốm nung củi Gia Định xưa với lu chứa nước mưa tro trấu; và xưởng chế tác dao chặt thép Damascus rồng cuộn 256 lớp cùng thớt gỗ Nghiến đá Lạng Sơn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA TẤU ĐÀN CLAVECIN BAROQUE SƠN TA (SaigonHarpsichordClavecinSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonHarpsichordClavecinSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Rung Dây Quẩy Gẩy Baroque:
   - Phòng hòa tấu riêng cho đàn Clavecin/Harpsichord hai tầng phím; vỏ đàn đóng bằng gỗ Dổi cổ thụ sơn ta then cẩn vỏ trứng và dát vàng lá; hệ nan tiêu âm sóng vòm lượn parabol làm từ gỗ Hương vân đỏ; sàn nâng cách âm Sylomer ba lớp triệt tiêu rung chấn tần số thấp; RT60 tiêu chuẩn 0.32s; hệ thống kiểm soát nhiệt ẩm 22°C - 58% RH bảo vệ dây kim loại và phím đàn.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ tổng hợp âm thanh dây gẩy đặc trưng của Harpsichord qua Web Audio API: Bach Prelude in C Minor (BWV 847), Rameau Les Sauvages.
   - Chuyển đổi 2 tầng phím: Bàn phím chính (Lower manual 8' + 4'), Bàn phím phụ (Upper manual 8' Lute stop).
   - Đo đạc thông số âm học phòng: Tỷ lệ phân rã năng lượng EDT, Độ rõ âm C80 > +3dB.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: SÂN TRONG LÒ GỐM GIA ĐỊNH & LU NƯỚC MƯA TRO TRẤU (ArtisanGiaDinhCeramicKilnCourtyardSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanGiaDinhCeramicKilnCourtyardSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Men Tro Cổ Bản & Nước Mưa Thanh Khiết:
   - Sân trong biệt thự tái hiện lò gốm củi truyền thống Chợ Lớn - Gia Định; cụm chum lu da lươn men tro trấu nung củi 1.250°C hứng dòng nước mưa tự nhiên từ máng đồng xối; thảm rêu nhung địa phương phủ trên nền gạch tàu đất nung xốp giữ ẩm hạ nhiệt 4°C cho toàn bộ tầng trệt.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình duyệt bộ sưu tập 4 dòng men gốm Gia Định xưa: Men Da Lươn, Men Rêu Tam Thái, Men Xanh Đồng, Men Bạch Thổ.
   - Bộ đo vi khí hậu sân trong: Nhiệt độ bức xạ bề mặt, Bốc hơi nước tự nhiên, Độ ẩm khu vực rêu xanh.
   - Trình phát tiếng nước nhỏ giọt vào lu sành qua Web Audio API.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG DAO CHẶT DAMASCUS & THỚT NGHIẾN LẠNG SƠN (ArtisanHandmadeDamascusCleaverCulinaryAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHandmadeDamascusCleaverCulinaryAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Bếp Đẳng Cấp - Trọng Đao & Gỗ Nghiến Cổ Thụ:
   - Dao chặt thủ công 256 lớp thép Damascus hoa văn cuộn sóng ngâm axit hữu cơ tôn vinh vân thép; chuôi dao gỗ Mun sừng nguyên khối khâu đồng thau; thớt gỗ Nghiến đá rừng núi Lạng Sơn đường kính 450mm dày 100mm được hấp sấy hút chân không ngâm dầu hạt lanh tự nhiên, viền đai đồng tán thủ công không dùng đinh kẽm (\`GU-CLEAVER-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình tương tác xoay 360° dao chặt Damascus và kiểm tra độ bén cạo lông tay góc 22°.
   - Máy tính cân nặng và lực chặt tối ưu cho thớt Nghiến không để lại mùn gỗ.
   - Form đăng ký may đo dao chặt khắc tên gia chủ và chứng nhận thép rèn độc bản.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-55): add SaigonHarpsichordClavecinSanctuary, ArtisanGiaDinhCeramicKilnCourtyardSanctuary, and ArtisanHandmadeDamascusCleaverCulinaryAtelier with 100% SEO pass'
`;

async function dispatchSprint55() {
  console.log(`[Master Orchestrator] Dispatching Sprint 55 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-53-sprint-55-clavecin-giadinhkiln-damascuscleaver',
    title: 'Phòng Clavecin Baroque, Sân Gốm Gia Định & Dao Chặt Damascus Thớt Nghiến',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 55 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_55_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint55();
