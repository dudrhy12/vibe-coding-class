# cert-management Specification

## Purpose
TBD - created by archiving change session3-core-crud. Update Purpose after archive.
## Requirements
### Requirement: 자격증 목록 조회

시스템은 `GET /api/certs`로 등록된 자격증 목록을 반환해야 한다(SHALL).

#### Scenario: 자격증 목록 API 호출

- **WHEN** 클라이언트가 `GET /api/certs`를 호출하면
- **THEN** 등록된 Cert 배열을 JSON으로 반환하고, 없으면 빈 배열을 반환한다

### Requirement: 자격증 등록

시스템은 `POST /api/certs`로 새 자격증을 등록할 수 있어야 한다(SHALL). `name`과 `issuedAt`은 필수값이다.

#### Scenario: 필수값 포함 등록

- **GIVEN** `{ "name": "정보처리기사", "issuedAt": "2024-05-10" }` 요청이 있을 때
- **WHEN** `POST /api/certs`를 호출하면
- **THEN** 201 Created와 함께 생성된 Cert(id 포함)가 반환된다

#### Scenario: 필수값 누락 등록

- **WHEN** `name` 또는 `issuedAt`이 없는 요청을 보내면
- **THEN** 400 Bad Request를 반환한다

### Requirement: 자격증 삭제

시스템은 `DELETE /api/certs/{id}`로 자격증을 삭제할 수 있어야 한다(SHALL).

#### Scenario: 존재하는 자격증 삭제

- **WHEN** 존재하는 id로 `DELETE /api/certs/{id}`를 호출하면
- **THEN** 204 No Content를 반환하고 DB에서 제거된다

#### Scenario: 존재하지 않는 자격증 삭제

- **WHEN** 존재하지 않는 id로 삭제를 시도하면
- **THEN** 404 Not Found를 반환한다

### Requirement: 자격증 목록 UI

프론트엔드는 `/app/certs` 경로에서 자격증 목록을 보여주고 추가·삭제할 수 있어야 한다(SHALL).

#### Scenario: 자격증 없을 때

- **WHEN** 등록된 자격증이 0개일 때 `/app/certs`에 접속하면
- **THEN** EmptyState("아직 등록한 자격증이 없어요")와 "자격증 추가" 버튼이 표시된다

#### Scenario: 자격증 추가

- **WHEN** 폼에 name·issuedAt을 입력하고 저장하면
- **THEN** 목록 상단에 새 카드가 즉시 표시된다

#### Scenario: 자격증 삭제

- **WHEN** 카드의 삭제 버튼을 누르면
- **THEN** confirm 없이 즉시 목록에서 제거되고 undo Toast가 3초간 표시된다

### Requirement: 만료 임박 알림

만료일(`expiresAt`)이 오늘로부터 30일 이내인 자격증이 있으면 AlertBanner를 표시해야 한다(SHALL).

#### Scenario: 만료 30일 이내 자격증

- **WHEN** 만료일이 30일 이내인 자격증이 1개 이상 있으면
- **THEN** 화면 상단 AlertBanner에 해당 자격증 이름과 만료일이 표시된다

