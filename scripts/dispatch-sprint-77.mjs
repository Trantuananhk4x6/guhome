import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const stateFile = 'scripts/master-orchestrator-state.json';
let state = { currentDirectiveIndex: 104, completedDirectives: [] };
try {
  state = JSON.parse(readFileSync(stateFile, 'utf8'));
} catch (e) {
  console.log('Initializing state file');
}

const directive77 = {
  directiveId: 'dir-75-sprint-77-castanets-cantileveredbonsai-ebonychessboard',
  title: 'Thính Phòng Phách Castanets Vòm Cẩm Lai, Vọng Cảnh Bonsai Cần Console & Bàn Cờ Thế Mun Sừng Cẩn Xà Cừ',
  sentAt: new Date().toISOString(),
  targetAgent: '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22',
  description: `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 77: THÍNH PHÒNG PHÁCH CASTANETS VÒM CẨM LAI, VỌNG CẢNH BONSAI CẦN CONSOLE & BÀN CỜ THẾ MUN SỪNG CẨN XÀ CỪ]

Kính gửi KTS Trưởng & Đồng nghiệp Kỹ sư Agent 2f5ce5fe:
Master Orchestrator biểu dương thành quả Sprint 76 xuất sắc (+1.730 lines, commit 8e98be6) và xử lý triệt để Directive 1 seed data (commit 1d563a0). Nay ban hành lệnh triển khai SPRINT 77:

I. BỘ BA CÔNG TRÌNH VÀ CÔNG CỤ TINH HOA:
1. Component 1: src/components/studio/SaigonAcousticCastanetsSanctuarySalon.tsx
   - Thính phòng độc bản hòa âm phách gỗ Castanets & Flamenco.
   - Vòm trần gỗ Cẩm Lai Bà Rịa tuyển chọn vân hoa lửa, soundboard phụ gỗ Hoàng Đàn tuyết Lạng Sơn tỏa hương thơm thanh khiết.
   - Nan vòm Fibonacci tán âm dải tần 1.500Hz - 6.500Hz, RT60 = 0.30s, chống dội âm đanh chói của tiếng phách ngà voi và gỗ mun.
   - Web Audio API mô phỏng 3 vũ khúc Tây Ban Nha cổ điển (Seville Fiesta, Granada Romance, Cadiz Rhythm), tương tác 3 kỹ thuật gõ (Carretilla, Golpes, Trino).
   - Tích hợp tại: /studio, /phong-cach, /projects.

2. Component 2: src/components/studio/SaigonRiversideCantileveredBonsaiPavilion.tsx
   - Vọng cảnh Bonsai vươn console 4.2m vượt mép sông Sài Gòn trên kết cấu dầm thép chịu lực bọc gỗ Teak Myanmar ngâm dầu chống muối mặn.
   - Sàn kính cường lực Low-E 3 lớp 36mm tràn viền ngắm đàn cá bơi lội dưới chân, lan can kính giấu chân nhôm Anode Champagne.
   - Vi khí hậu: Đón luồng gió lộng mát mẻ từ mặt nước sông, hạ nhiệt cục bộ 5.0°C; hệ thống tưới sương vi bọt siêu mịn bảo dưỡng bộ rễ Bonsai tùng la hán cổ thụ.
   - Tương tác: Điều khiển góc vươn cantilever và giám sát tải trọng gió giật mùa mưa bão Sài Gòn.
   - Tích hợp tại: /studio, /phong-cach, /du-toan-chi-phi.

3. Component 3: src/components/tools/ArtisanMotherOfPearlInlaidEbonyChessboardAtelier.tsx
   - Bàn cờ thế ngự dụng hoàng gia chế tác từ khối gỗ Mun sừng Khánh Hòa chìm dưới đáy sông, cẩn xà cừ Tam Khôi ốc đỏ và xà cừ vàng Singapore phản quang 7 màu.
   - Quân cờ tiện tay nguyên khối 32 quân (16 quân Mun sừng - 16 quân Cẩm Lai), đáy lót dạ nhung hoàng gia đỏ Bordeaux giảm chấn, vòng viền bạc ta 999 bọc góc khắc triện (GU-CHESSBOARD-2026-X).
   - Bàn xoay 3D 360 độ ngắm thế cờ và vân xà cừ dưới 3 nguồn sáng (Nến 2000K, Halogen 2700K, Triển lãm 4000K).
   - Form cá nhân hóa: Chọn bộ cờ Tướng / Cờ Vua, khắc triện gia huy gia chủ trên hộp chứa quân cờ.
   - Tích hợp tại: /du-toan-chi-phi, /studio, /contact.

II. TIÊU CHUẨN THƯƠNG HIỆU & CHẤT LƯỢNG THÉP:
- Tuyệt đối 0 em-dash (—) hoặc en-dash (–), chỉ dùng regular hyphen (-).
- Thông tin định danh: Hotline 0368 757 916, email guhomesvn@gmail.com, Xưởng mộc Thạnh Xuân 1.200m², trần 12 công trình/năm.
- noUncheckedIndexedAccess: true an toàn tuyệt đối.
- 3 Cổng QA Thép:
  + Gate 1: npx tsc --noEmit -> 0 errors.
  + Gate 2: npx tsx scripts/test-routes-seo.ts -> 153/153 routes PASS (100%).
  + Gate 3: npm run build -> 153/153 static pages compiled, Exit Code 0.
- Commit git atomic sau khi pass cả 3 gate.`
};

state.completedDirectives.push(directive77);
state.currentDirectiveIndex = 105;
state.lastDispatchedAt = Date.now();
writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');

console.log('Sprint 77 Directive recorded and ready for dispatch!');
