## Context

저장소에 애플리케이션 코드가 아직 없다. 이 change는 프론트엔드 프로젝트를 처음 세우고, 랜딩(`/`)과 대시보드 셸(`/app`)을 만든다. 백엔드·DB는 스택 미정이라 범위 외(`docs/PRD.md` 오픈 이슈). 디자인은 `docs/DESIGN.md`의 BMW M 시스템을 따른다. 제약은 `CLAUDE.md`: 불필요한 의존성 금지, 작은 변경 유지.

핵심 긴장 하나를 먼저 짚는다 — DESIGN.md는 **마케팅 페이지** 언어(풀블리드 자동차 사진, "크롬은 물러난다")인데, 이 제품의 본체는 **데이터 대시보드**다. 랜딩에는 BMW M이 완벽히 맞지만 `/app`에는 직접 안 맞는다. 이 design은 그 경계를 명시한다.

## Goals / Non-Goals

**Goals:**
- `frontend/`에 Vite + React + TS + Tailwind 작동하는 프로젝트
- `docs/DESIGN.md` 토큰을 **한 곳(Tailwind config)** 에 인코딩 → 이후 모든 화면이 공유
- 마케팅 면(`/`)과 앱 셸(`/app`)의 시각 언어 경계를 코드로 분리
- 다음 세션이 곧장 기능을 얹을 수 있는 라우팅·레이아웃 골격

**Non-Goals:**
- 데이터·영속화·백엔드·API 호출·인증·AI (전부 다음 change)
- 실제 알림 로직, 네비 링크의 실제 목적지 (이번엔 placeholder)
- 자동차 사진 소싱 (히어로는 시각 슬롯만 두고 비워둠)

## Decisions

**D1 — 빌드 도구는 Vite (Next.js 아님).**
`CLAUDE.md` Tech Stack이 React(Vite)로 명시. `docs/PRD.md` 마일스톤표의 "Next.js 초기화"는 잔재 → Vite 기준으로 진행하며 PRD는 별도 정정 대상. *대안:* Next.js(SSR/파일라우팅) — MVP에 SSR 불필요하고 SPA로 충분해 기각.

**D2 — 라우팅은 react-router-dom, 레이아웃 분리.**
`/`는 `MarketingLayout`, `/app`은 `AppShellLayout`으로 분리해 두 시각 언어가 섞이지 않게 한다. *대안:* 단일 레이아웃 + 조건부 — 경계가 흐려져 기각.

**D3 — DESIGN.md 토큰 → `tailwind.config` `theme.extend`.**
색상(canvas/surface/hairline/body/M-tricolor), 간격(4px 베이스, section 96px 등), `borderRadius`(기본 0, full만 예외), 타이포 스케일을 토큰으로 1회 정의. 인라인 hex 금지. **폰트:** BMW Type Next Latin은 라이선스라 불가 → DESIGN.md 권고대로 **Inter**(700/300) 대체, 디스플레이 트래킹 -0.5px.

**D4 — `/`는 BMW M 풀적용, `/app`은 "토큰만 가져온 대시보드 변주".**
랜딩: 풀블리드 히어로 밴드, UPPERCASE 디스플레이, M 트라이컬러 stripe, 제로 라운드 CTA. `/app`: 같은 토큰(순흑 캔버스·제로 라운드·트라이컬러 액센트·대문자 라벨)을 쓰되 **풀블리드 사진은 버린다**(대시보드엔 사진 자리가 없음). 대신 spec-cell류 그리드/하이라인 카드로 데이터 면을 구성할 토대만. 이 경계가 이번 change의 핵심 설계.

**D5 — 의존성 최소.**
상태관리 라이브러리·UI 컴포넌트 라이브러리·아이콘 패키지 도입하지 않음(`CLAUDE.md` 경계). 필요한 것만: react, react-dom, react-router-dom, tailwindcss(+postcss/autoprefixer), vite, typescript.

**D6 — 폴더 구조(frontend/src).**
`routes/`(Landing, App), `layouts/`(MarketingLayout, AppShellLayout), `components/`(공용 UI: Button, MStripe, NavItem 등), `styles/`. 토큰은 tailwind.config + 최소 글로벌 CSS.

## Risks / Trade-offs

- **[마케팅 미학 ↔ 데이터 대시보드 불일치]** → D4로 경계를 코드 레벨에서 분리. 토큰은 공유, 풀블리드 사진은 랜딩 전용.
- **[자동차 사진이 취업 앱에 안 맞음]** → 히어로에 사진 슬롯만 두고 비움. 콘텐츠(워크스페이스/커리어 비주얼 등)는 후속 결정. 그라데이션 배경은 금지(DESIGN.md) 준수.
- **[폰트 라이선스]** → Inter 대체, 트래킹 보정으로 BMW Type 느낌 근사.
- **[네비 링크가 빈 placeholder라 "미완성"으로 보일 수 있음]** → 셸 골격임을 명확히. 각 섹션은 다음 세션에 라우트로 채움.

## Open Questions

- 히어로 비주얼 콘텐츠를 무엇으로? (사진 vs 타입-온리 블랙)
- 서비스명 미정(SpecBook / JobTrack) — 랜딩 워드마크에 영향. 임시 placeholder로 진행.
- `/app` 네비 항목을 빈 placeholder 라우트로 둘지, 시각 표시만 할지.
