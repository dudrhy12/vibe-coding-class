## ADDED Requirements

### Requirement: 채용 공고 목록 조회

시스템은 `GET /api/jobs`로 등록된 채용 공고 목록을 반환해야 한다(SHALL).

#### Scenario: 공고 목록 API 호출

- **WHEN** 클라이언트가 `GET /api/jobs`를 호출하면
- **THEN** 등록된 Job 배열을 JSON으로 반환하고, 없으면 빈 배열을 반환한다

### Requirement: 채용 공고 등록

시스템은 `POST /api/jobs`로 새 채용 공고를 등록할 수 있어야 한다(SHALL). `company`, `role`, `deadline`은 필수값이다. 초기 stage는 `대기중`이다.

#### Scenario: 공고 등록

- **GIVEN** `{ "company": "카카오", "role": "백엔드", "deadline": "2026-06-30" }` 요청이 있을 때
- **WHEN** `POST /api/jobs`를 호출하면
- **THEN** 201 Created와 함께 생성된 Job(stage: "대기중" 포함)이 반환된다

### Requirement: 채용 공고 단계 변경

시스템은 `PUT /api/jobs/{id}/stage`로 진행 단계를 변경할 수 있어야 한다(SHALL). 유효한 stage 값: `서류`, `코딩테스트`, `면접_1차`, `면접_2차`, `합격`, `불합격`, `대기중`.

#### Scenario: 단계 변경

- **WHEN** `{ "stage": "면접_1차" }`로 `PUT /api/jobs/{id}/stage`를 호출하면
- **THEN** 해당 Job의 stage가 변경되고 변경된 Job을 반환한다

#### Scenario: 잘못된 단계 값

- **WHEN** 유효하지 않은 stage 값을 전송하면
- **THEN** 400 Bad Request를 반환한다

### Requirement: 채용 공고 삭제

시스템은 `DELETE /api/jobs/{id}`로 공고를 삭제할 수 있어야 한다(SHALL).

#### Scenario: 공고 삭제

- **WHEN** 존재하는 id로 `DELETE /api/jobs/{id}`를 호출하면
- **THEN** 204 No Content를 반환하고 DB에서 제거된다

### Requirement: 채용 공고 목록 UI

프론트엔드는 `/app/jobs` 경로에서 공고 목록과 단계 관리 UI를 제공해야 한다(SHALL).

#### Scenario: 공고 없을 때

- **WHEN** 등록된 공고가 0개일 때 `/app/jobs`에 접속하면
- **THEN** EmptyState("지원할 공고를 등록하고 마감일을 놓치지 마세요")가 표시된다

#### Scenario: 단계 드롭다운 즉시 저장

- **WHEN** JobCard의 단계 드롭다운에서 새 단계를 선택하면
- **THEN** 별도 저장 버튼 없이 즉시 `PUT /api/jobs/{id}/stage`가 호출되고 배지 색이 변경된다

### Requirement: 마감 D-7 알림

deadline이 오늘로부터 7일 이내이고 stage가 합격·불합격이 아닌 공고가 있으면 AlertBanner를 표시해야 한다(SHALL).

#### Scenario: D-7 이내 마감 공고

- **WHEN** 마감일이 7일 이내이고 진행 중인 공고가 있으면
- **THEN** AlertBanner에 해당 공고 회사·직무·마감일이 표시된다
