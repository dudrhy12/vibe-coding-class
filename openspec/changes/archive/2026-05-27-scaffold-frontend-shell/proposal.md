## Why

PRD의 첫 코드 단계다. 현재 저장소엔 애플리케이션 코드가 0줄이라, 이후 모든 기능(자산 CRUD · 공고 허브 · AI 이력서)이 올라갈 **프론트엔드 기반과 화면 골격**이 먼저 필요하다. 백엔드·DB·스토리지는 스택이 미정(`docs/PRD.md` 오픈 이슈)이므로 이번엔 제외하고, 화면으로 즉시 확인 가능한 프론트 셸부터 세워 다음 세션의 작업대를 만든다.

## What Changes

- `frontend/`에 Vite + React + TypeScript + Tailwind CSS 프로젝트 초기화
- React Router로 두 라우트 구성: `/` (랜딩), `/app` (대시보드)
- **랜딩(`/`)**: BMW M 디자인 풀적용 — 풀블리드 히어로 밴드, M 트라이컬러 stripe, UPPERCASE 디스플레이 헤드라인, `/app` 진입 CTA
- **`/app` 대시보드 골격**: 좌측 네비게이션(자격증 · 활동 · 공고 · 이력서 · 포폴), 상단 알림 밴드 placeholder, 빈 대시보드 본문 영역
- `docs/DESIGN.md`의 디자인 토큰(색상 · 타이포그래피 · 간격 · border-radius)을 Tailwind config에 반영
- 데이터 영속화 · 백엔드 · DB · AI · 인증은 **범위 외** (다음 change로 이월)

## Capabilities

### New Capabilities

- `landing-page`: `/` 마케팅 랜딩 페이지. BMW M 히어로 밴드, M 트라이컬러 stripe, `/app`으로 가는 CTA, 반응형 동작.
- `app-shell`: `/app` 대시보드 셸. 좌측 내비게이션(5개 섹션), 상단 알림 밴드 placeholder, 빈 대시보드 본문, 반응형 레이아웃. 실제 데이터·기능은 미포함.

### Modified Capabilities

<!-- 기존 spec 변경 없음 — 첫 코드 change -->

## Impact

- **신규 디렉터리**: `frontend/` (Vite 프로젝트). `docs/ARCHITECTURE.md`의 Source Structure와 정합.
- **의존성 (최소셋, CLAUDE.md "불필요한 의존성 금지" 준수)**: `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `vite`, `typescript`.
- **디자인**: `docs/DESIGN.md` 토큰 → `tailwind.config` 매핑. 향후 모든 화면이 이 토큰을 공유.
- **미영향 (범위 외)**: 백엔드(`backend/`), DB, 파일 스토리지, 인증, Claude API.
