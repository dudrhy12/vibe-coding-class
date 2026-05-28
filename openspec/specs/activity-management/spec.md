# activity-management Specification

## Purpose
TBD - created by archiving change session3-core-crud. Update Purpose after archive.
## Requirements
### Requirement: 대외활동 목록 조회

시스템은 `GET /api/activities`로 등록된 대외활동 목록을 반환해야 한다(SHALL).

#### Scenario: 활동 목록 API 호출

- **WHEN** 클라이언트가 `GET /api/activities`를 호출하면
- **THEN** 등록된 Activity 배열을 JSON으로 반환하고, 없으면 빈 배열을 반환한다

### Requirement: 대외활동 등록

시스템은 `POST /api/activities`로 새 활동을 등록할 수 있어야 한다(SHALL). `name`은 필수값이다. `tags`는 문자열 배열이며 생략 가능하다.

#### Scenario: 활동 등록 (태그 포함)

- **GIVEN** `{ "name": "UX 연구 동아리", "tags": ["디자인", "리서치"] }` 요청이 있을 때
- **WHEN** `POST /api/activities`를 호출하면
- **THEN** 201 Created와 함께 생성된 Activity(tags 포함)가 반환된다

### Requirement: 대외활동 삭제

시스템은 `DELETE /api/activities/{id}`로 활동을 삭제할 수 있어야 한다(SHALL).

#### Scenario: 활동 삭제

- **WHEN** 존재하는 id로 `DELETE /api/activities/{id}`를 호출하면
- **THEN** 204 No Content를 반환하고 DB에서 제거된다

### Requirement: 대외활동 목록 UI

프론트엔드는 `/app/activities` 경로에서 활동 목록과 태그 필터를 제공해야 한다(SHALL).

#### Scenario: 활동 없을 때

- **WHEN** 등록된 활동이 0개일 때 `/app/activities`에 접속하면
- **THEN** EmptyState("활동 이력을 등록하면 이력서 쓸 때 훨씬 편해져요")가 표시된다

### Requirement: 태그 필터

사용자는 태그 칩을 클릭하여 해당 태그를 포함한 활동만 필터링할 수 있어야 한다(SHALL).

#### Scenario: 태그 칩 선택

- **WHEN** 사용자가 태그 칩("마케팅")을 클릭하면
- **THEN** "마케팅" 태그를 포함한 활동만 목록에 표시된다

#### Scenario: 태그 필터 해제

- **WHEN** 선택된 태그 칩을 다시 클릭하면
- **THEN** 필터가 해제되고 전체 활동 목록이 복귀한다

#### Scenario: 매칭 결과 없음

- **WHEN** 선택한 태그와 일치하는 활동이 없으면
- **THEN** "조건에 맞는 활동이 없습니다" 안내 문구가 표시된다

