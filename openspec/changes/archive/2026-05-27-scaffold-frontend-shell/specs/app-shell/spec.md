## ADDED Requirements

### Requirement: 대시보드 셸 렌더링

시스템은 경로 `/app`에서 대시보드 셸을 렌더링해야 한다(SHALL): 좌측 내비게이션, 상단 알림 밴드 placeholder, 빈 본문 영역.

#### Scenario: /app 방문

- **WHEN** 사용자가 `/app`에 접속하면
- **THEN** 좌측 내비게이션, 상단 알림 밴드 영역, 빈 대시보드 본문이 함께 보인다

### Requirement: 좌측 내비게이션 섹션

좌측 내비게이션은 5개 섹션 항목을 표시해야 한다(SHALL): 자격증, 활동, 공고, 이력서, 포트폴리오.

#### Scenario: 내비게이션 항목 표시

- **WHEN** 대시보드 셸이 렌더링되면
- **THEN** 자격증 · 활동 · 공고 · 이력서 · 포트폴리오 항목이 대문자 라벨로 보인다

### Requirement: 상단 알림 밴드 placeholder

대시보드 상단에는 만료·마감 알림이 들어갈 밴드 영역이 placeholder로 존재해야 한다(SHALL). 이번 change에서 실제 알림 로직은 포함하지 않는다.

#### Scenario: 알림 밴드 영역

- **WHEN** 대시보드 셸이 렌더링되면
- **THEN** 본문 상단에 알림 밴드 영역이 자리잡고 있다(내용은 placeholder)

### Requirement: 디자인 토큰 적용

셸은 `docs/DESIGN.md` 토큰을 적용해야 한다(SHALL): 순흑 캔버스, 제로 라운드(0px) 표면, 대문자 라벨, M 트라이컬러를 액센트로만 사용. 풀블리드 사진은 사용하지 않는다.

#### Scenario: 셸 시각 언어

- **WHEN** 대시보드 셸이 렌더링되면
- **THEN** 표면은 border-radius 0px, 페이지 바닥은 순흑이며, 트라이컬러는 액센트(예: 활성 표시)로만 쓰인다

### Requirement: 반응형 셸

대시보드 셸은 모바일에서 좌측 내비게이션을 접을 수 있어야 한다(SHALL).

#### Scenario: 모바일 폭

- **WHEN** 뷰포트 폭이 768px 미만이면
- **THEN** 좌측 내비게이션이 접히고 본문이 전체 폭을 차지한다
