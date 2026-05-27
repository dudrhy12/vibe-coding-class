# landing-page Specification

## Purpose
TBD - created by archiving change scaffold-frontend-shell. Update Purpose after archive.
## Requirements
### Requirement: 랜딩 페이지 렌더링

시스템은 루트 경로 `/`에서 마케팅 랜딩 페이지를 렌더링해야 한다(SHALL).

#### Scenario: 루트 경로 방문

- **WHEN** 사용자가 `/`에 접속하면
- **THEN** 히어로 밴드(헤드라인 + 서브카피 + CTA)가 보인다

### Requirement: BMW M 브랜드 트리트먼트

랜딩 페이지는 `docs/DESIGN.md`의 BMW M 디자인 토큰을 적용해야 한다(SHALL): 순흑 캔버스, UPPERCASE 디스플레이 헤드라인, M 트라이컬러 stripe, 제로 라운드(0px) CTA.

#### Scenario: 히어로 시각 언어

- **WHEN** 랜딩 페이지가 렌더링되면
- **THEN** 헤드라인은 대문자 디스플레이 웨이트로, 페이지 바닥은 순흑(canvas)으로, M 트라이컬러 stripe가 브랜드 액센트로 표시된다

#### Scenario: CTA 모양

- **WHEN** 주 CTA 버튼이 렌더링되면
- **THEN** 버튼은 border-radius 0px, 대문자 레터스페이스 라벨을 가진다

### Requirement: `/app` 진입 동선

랜딩의 주 CTA는 `/app` 대시보드로 이동해야 한다(SHALL).

#### Scenario: CTA 클릭

- **WHEN** 사용자가 주 CTA를 클릭하면
- **THEN** 라우트가 `/app`으로 전환되고 대시보드 셸이 렌더링된다

### Requirement: 반응형 동작

랜딩 페이지는 모바일·데스크톱에서 깨지지 않고 동작해야 한다(SHALL).

#### Scenario: 모바일 폭

- **WHEN** 뷰포트 폭이 768px 미만이면
- **THEN** 히어로 헤드라인이 작은 크기로 스케일되고 레이아웃이 단일 컬럼으로 쌓인다

