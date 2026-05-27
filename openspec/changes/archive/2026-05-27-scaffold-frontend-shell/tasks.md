## 1. 프로젝트 셋업

- [x] 1.1 `frontend/`에 Vite + React + TypeScript 프로젝트 초기화 (react-ts 템플릿)
- [x] 1.2 Tailwind CSS + postcss + autoprefixer 설치 및 초기화 (`tailwind.config`, `postcss.config`)
- [x] 1.3 react-router-dom 설치
- [x] 1.4 의존성이 최소셋(react, react-dom, react-router-dom, tailwindcss, vite, typescript)인지 확인하고 `npm run dev` 구동 확인

## 2. 디자인 토큰 (DESIGN.md → Tailwind)

- [x] 2.1 `tailwind.config`의 `theme.extend.colors`에 canvas/surface(soft·card·elevated)/hairline/body/muted + M 트라이컬러(blue-light·blue-dark·red) 매핑
- [x] 2.2 `theme.extend.spacing`에 4px 베이스 토큰(xxs~section 96px) 매핑
- [x] 2.3 `borderRadius` 기본 0(none)으로, `full`만 예외로 설정
- [x] 2.4 타이포 스케일(display-xl~caption, button/label-uppercase 트래킹 1.5px) 설정, 폰트는 Inter(700/300) 대체 + 디스플레이 트래킹 -0.5px
- [x] 2.5 글로벌 CSS: body를 canvas(순흑)/body 텍스트 색으로, Inter 폰트 로드

## 3. 라우팅 & 레이아웃

- [x] 3.1 `BrowserRouter`로 `/`(Landing), `/app`(App) 두 라우트 구성
- [x] 3.2 `MarketingLayout`(랜딩 전용)과 `AppShellLayout`(앱 전용) 레이아웃 컴포넌트 분리
- [x] 3.3 공용 컴포넌트 골격 생성: `Button`(제로 라운드·대문자), `MStripe`(4px 트라이컬러 divider)

## 4. 랜딩 페이지 (`/`)

- [x] 4.1 풀블리드 히어로 밴드: UPPERCASE 디스플레이 헤드라인 + 서브카피 + 시각 슬롯(placeholder)
- [x] 4.2 M 트라이컬러 stripe를 브랜드 액센트로 배치
- [x] 4.3 주 CTA(제로 라운드, 대문자 레터스페이스) → 클릭 시 `/app`으로 이동
- [x] 4.4 모바일(<768px)에서 헤드라인 스케일 다운 + 단일 컬럼 스택 확인

## 5. 대시보드 셸 (`/app`)

- [x] 5.1 좌측 내비게이션: 자격증·활동·공고·이력서·포트폴리오 5개 항목(대문자 라벨, 활성 표시는 트라이컬러 액센트)
- [x] 5.2 상단 알림 밴드 placeholder 영역(만료·마감 알림 자리, 내용 없음)
- [x] 5.3 빈 대시보드 본문 영역(순흑 캔버스, 제로 라운드 표면 토대)
- [x] 5.4 모바일(<768px)에서 좌측 내비 접힘 + 본문 전체 폭 확인

## 6. 마무리 검증

- [x] 6.1 `/`와 `/app` 라우트 전환 동작 확인 (CTA → /app)
- [x] 6.2 두 화면 모두 DESIGN.md 토큰(순흑·제로 라운드·대문자·트라이컬러 액센트) 적용 확인
- [x] 6.3 빌드(`npm run build`) 통과 확인
